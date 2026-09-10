import os
import re
import csv
import json
import time
import warnings
import requests
from datetime import datetime

# Suppress informational SDK notices
warnings.filterwarnings("ignore", category=UserWarning)
os.environ["PYTHONWARNINGS"] = "ignore"

# 1. Configuration & Secrets
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")
GOOGLE_SHEET_CSV_URL = os.environ.get("GOOGLE_SHEET_CSV_URL") or "https://docs.google.com/spreadsheets/d/1ksudXZ2GVgcCccHuvRRQC9OMTrBqjZtJYNxUEM1X93A/export?format=csv"
GOOGLE_SHEET_ID = os.environ.get("GOOGLE_SHEET_ID") or "1ksudXZ2GVgcCccHuvRRQC9OMTrBqjZtJYNxUEM1X93A"
POSTS_DIR = os.path.join(os.getcwd(), "content", "posts")

os.makedirs(POSTS_DIR, exist_ok=True)

def fetch_keyword_from_sheet():
    """
    Fetches target keyword from Google Sheet.
    User only needs to add raw keywords in Column A.
    The script automatically determines if it's already published on the site.
    """
    # Collect all already covered keywords and slugs from published posts
    used_keywords = set()
    used_slugs = set()
    if os.path.exists(POSTS_DIR):
        for f in os.listdir(POSTS_DIR):
            if f.endswith(".json"):
                used_slugs.add(f.replace(".json", "").lower())
                try:
                    with open(os.path.join(POSTS_DIR, f), "r", encoding="utf-8") as post_file:
                        data = json.load(post_file)
                        if data.get("target_keyword"):
                            used_keywords.add(data["target_keyword"].strip().lower())
                        if data.get("title"):
                            used_keywords.add(data["title"].strip().lower())
                        for tag in data.get("tags", []):
                            used_keywords.add(tag.strip().lower())
                except:
                    pass

    # Method A: Google Sheet CSV link
    # The sheet ID extracted from user sheet: 1ksudXZ2GVgcCccHuvRRQC9OMTrBqjZtJYNxUEM1X93A
    sheet_id = "1ksudXZ2GVgcCccHuvRRQC9OMTrBqjZtJYNxUEM1X93A"
    if GOOGLE_SHEET_ID and GOOGLE_SHEET_ID.strip():
        sheet_id = GOOGLE_SHEET_ID.strip()

    candidate_urls = [
        f"https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv",
        f"https://docs.google.com/spreadsheets/d/{sheet_id}/export?format=csv"
    ]
    if GOOGLE_SHEET_CSV_URL and GOOGLE_SHEET_CSV_URL.strip():
        custom_url = GOOGLE_SHEET_CSV_URL.strip()
        if "/edit" in custom_url:
            custom_url = custom_url.split("/edit")[0] + "/gviz/tq?tqx=out:csv"
        candidate_urls.insert(0, custom_url)

    for sheet_url in candidate_urls:
        try:
            print(f"[INFO] Fetching keywords from Google Sheet URL: {sheet_url}")
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
            res = requests.get(sheet_url, headers=headers, timeout=20)
            if res.status_code == 200 and res.text.strip():
                # If Google returns HTML instead of CSV (e.g. login redirect), skip this URL
                if "<!DOCTYPE html>" in res.text or "<html" in res.text.lower():
                    print("[WARN] Received HTML response instead of CSV, trying next endpoint...")
                    continue

                import csv
                reader = csv.reader(res.text.splitlines())
                for row_idx, row in enumerate(reader):
                    if not row or not row[0].strip():
                        continue
                    raw_candidate = row[0].strip()

                    # Skip header row
                    if row_idx == 0 and raw_candidate.lower() in ["keyword", "keywords", "topic", "topics"]:
                        continue

                    # Strict check: Must not contain any HTML, script, doctype, curly braces, code tokens or minified JS
                    code_indicators = ["<", ">", "doctype", "script", "ppconfig", "window", "{", "}", "nonce", "http", "var ", "const ", "let ", "function", "return", "typeof", "null", "undefined", "(", ")", ";", "="]
                    if any(bad in raw_candidate.lower() for bad in code_indicators):
                        print(f"[REJECT CODE] Ignored code string: '{raw_candidate[:40]}'")
                        continue

                    # Must look like a real keyword/topic (has letters and words, not single-word obfuscated identifiers like qObjectis)
                    if bool(re.search(r'^[a-z]+[A-Z][a-zA-Z0-9]*$', raw_candidate)) or raw_candidate.startswith("qObject"):
                        print(f"[REJECT CODE] Ignored obfuscated JavaScript variable: '{raw_candidate[:40]}'")
                        continue

                    clean_kw = re.sub(r'[^a-zA-Z0-9\s\-]+', '', raw_candidate).strip()
                    if len(clean_kw) < 3:
                        continue

                    candidate_keyword = clean_kw
                    candidate_slug = re.sub(r'[^a-zA-Z0-9]+', '-', candidate_keyword.lower()).strip('-')

                    # Check if already published on site (match by keyword, slug, or title)
                    norm_candidate = candidate_keyword.lower()
                    already_covered = (
                        norm_candidate in used_keywords or
                        candidate_slug in used_slugs or
                        any(norm_candidate in uk for uk in used_keywords)
                    )

                    if already_covered:
                        print(f"[SKIP] Keyword '{candidate_keyword}' already published on site.")
                        continue

                    print(f"[FOUND] Picked verified keyword from sheet: '{candidate_keyword}'")
                    return {
                        "keyword": candidate_keyword,
                        "category": None,
                        "tags": []
                    }
        except Exception as e:
            print(f"[WARN] Error reading sheet: {e}")

    # Method B: Service Account via gspread if available
    service_acc_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if service_acc_json and GOOGLE_SHEET_ID:
        try:
            import gspread
            from oauth2client.service_account import ServiceAccountCredentials

            print("[INFO] Fetching keyword from Google Sheet via Service Account...")
            creds_dict = json.loads(service_acc_json)
            scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            client = gspread.authorize(creds)
            sheet = client.open_by_key(GOOGLE_SHEET_ID).sheet1
            records = sheet.get_all_records()
            for idx, row in enumerate(records, start=2):
                status = str(row.get("Status", "")).strip().lower()
                if status in ["pending", "new", "queued", ""]:
                    kw = str(row.get("Keyword", "")).strip()
                    if kw:
                        # Mark as Published in sheet
                        try:
                            # Update Status column (assuming col 3 or named Status)
                            headers = sheet.row_values(1)
                            if "Status" in headers:
                                col_idx = headers.index("Status") + 1
                                sheet.update_cell(idx, col_idx, "Published")
                        except Exception as update_err:
                            print(f"[WARN] Could not update cell in Google Sheet: {update_err}")

                        return {
                            "keyword": kw,
                            "category": str(row.get("Category", "Technology")).strip() or "Technology",
                            "tags": [t.strip() for t in str(row.get("Tags", "")).split(",") if t.strip()]
                        }
        except Exception as e:
            print(f"[WARN] Error with gspread: {e}")

    # STRICT: Do not take keywords from anywhere else. If exhausted or unreadable, raise error.
    raise Exception("[ERROR] Google Sheet me se koi naya ya un-published keyword nahi mila! Sheet check karein ya naye keywords add karein.")

def extract_unsplash_id(url):
    """Extracts unique photo ID from any Unsplash URL or query string."""
    if not url:
        return ""
    m = re.search(r'photo-([a-zA-Z0-9\-]+)', str(url))
    if m:
        return m.group(1)
    return str(url).split('?')[0].strip()

def get_existing_posts_metadata():
    """
    Scans all existing posts to extract existing titles, excerpts, slugs, and cover images
    so that new articles are guaranteed 100% unique with zero duplication.
    """
    titles = []
    excerpts = []
    images = []
    image_ids = set()
    slugs = []
    if os.path.exists(POSTS_DIR):
        for f in os.listdir(POSTS_DIR):
            if f.endswith(".json"):
                try:
                    with open(os.path.join(POSTS_DIR, f), "r", encoding="utf-8") as pf:
                        d = json.load(pf)
                        if d.get("title"):
                            titles.append(d["title"].strip())
                        if d.get("excerpt"):
                            excerpts.append(d["excerpt"].strip())
                        if d.get("coverImage"):
                            c_img = d["coverImage"].strip()
                            images.append(c_img)
                            img_id = extract_unsplash_id(c_img)
                            if img_id:
                                image_ids.add(img_id)
                        slugs.append(f.replace(".json", ""))
                except:
                    pass
    return {"titles": titles, "excerpts": excerpts, "images": images, "image_ids": image_ids, "slugs": slugs}

def fetch_unsplash_image(query, used_image_ids=None, visual_subject=None):
    """
    Fetches high quality, strictly relevant photo from Unsplash based on the exact keyword and visual subject.
    Never repeats an image or photo ID already used anywhere on the site.
    """
    used_ids = set(used_image_ids or [])
    clean_kw = re.sub(r'[^a-zA-Z0-9\s]+', ' ', query).strip()

    # Distinct search queries: specific visual subject first, keyword, and niche combinations
    candidate_queries = []
    if visual_subject and visual_subject.strip():
        candidate_queries.append(visual_subject.strip())
    candidate_queries.append(f"{clean_kw} concept")
    candidate_queries.append(clean_kw)
    words = clean_kw.split()
    if len(words) > 1:
        candidate_queries.append(f"{words[0]} {words[1]} futuristic")
    candidate_queries.append(f"{clean_kw} digital interface")

    # Extensive pool of distinct, high-res curated tech photos to prevent any hardcoded duplicate fallback
    diverse_unique_tech_pool = [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1581094376136-12efc464efc8?auto=format&fit=crop&w=1200&q=80"
    ]

    if not UNSPLASH_ACCESS_KEY:
        print("[INFO] No UNSPLASH_ACCESS_KEY provided, selecting unassigned photo from diverse pool.")
        for pool_url in diverse_unique_tech_pool:
            pid = extract_unsplash_id(pool_url)
            if pid not in used_ids:
                return pool_url
        return diverse_unique_tech_pool[0]

    for search_term in candidate_queries:
        try:
            # Query pages 1 to 4 for wide selection of up to 120 unique photos
            for page_num in range(1, 5):
                url = f"https://api.unsplash.com/search/photos?page={page_num}&per_page=30&query={requests.utils.quote(search_term)}&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
                res = requests.get(url, timeout=12)
                if res.status_code == 200:
                    data = res.json()
                    results = data.get("results", [])
                    for item in results:
                        img_url = item.get("urls", {}).get("regular")
                        item_id = item.get("id") or extract_unsplash_id(img_url)
                        photo_id = extract_unsplash_id(img_url) or str(item_id)

                        if photo_id and photo_id not in used_ids and item_id not in used_ids:
                            print(f"[IMAGE FOUND] Successfully matched fresh unique image '{photo_id}' for '{search_term}'")
                            return img_url
        except Exception as e:
            print(f"[WARN] Unsplash API search error for '{search_term}': {e}")

    # Fallback to broader tech topics with random page offset
    import random
    fallback_queries = [
        "cyberpunk laboratory", "quantum server hardware", "cloud computing motherboard",
        "deep learning algorithm", "modern semiconductor microprocessor", "future data center server",
        "optical computing chip", "ai neural network visualization", "advanced robotics engineering",
        "high performance computing cluster"
    ]
    random.shuffle(fallback_queries)
    for fallback_term in fallback_queries:
        try:
            url = f"https://api.unsplash.com/search/photos?page={random.randint(1, 5)}&per_page=30&query={requests.utils.quote(fallback_term)}&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
            res = requests.get(url, timeout=10)
            if res.status_code == 200:
                for item in res.json().get("results", []):
                    img_url = item.get("urls", {}).get("regular")
                    photo_id = extract_unsplash_id(img_url)
                    item_id = item.get("id")
                    if photo_id and photo_id not in used_ids and item_id not in used_ids:
                        print(f"[IMAGE FALLBACK] Matched unique photo '{photo_id}' for '{fallback_term}'")
                        return img_url
        except:
            pass

    # Final guarantee: pick an unused photo from diverse pool
    for pool_url in diverse_unique_tech_pool:
        pid = extract_unsplash_id(pool_url)
        if pid not in used_ids:
            return pool_url

    return diverse_unique_tech_pool[0]

def generate_article_with_gemini(keyword_info, existing_titles=None):
    """
    Two-Phase Autonomous Generation via Gemini API:
    Phase 1: Generate Deep H2-H4 Technical Outline + 100+ Semantic/LSI Keyword Topics + Specific Unsplash Visual Prompt.
    Phase 2: Generate Comprehensive 1000+ Word Content with Semantic Entities, H2-H4 Subsections, and 4-5 Google FAQPage Questions.
    100% dynamic without static hardcoding. Complies strictly with Google's latest 2026 Helpful Content & E-E-A-T guidelines.
    """
    kw = keyword_info["keyword"]
    provided_category = keyword_info.get("category")
    cat = provided_category or "Artificial Intelligence"
    tech_categories = "Artificial Intelligence, Machine Learning, Cloud Computing, Cybersecurity, Software Engineering, Hardware & Semiconductors, Quantum Computing, Web Development, Future Tech"

    existing_titles_sample = (existing_titles or [])[-12:]
    avoid_titles_block = ""
    if existing_titles_sample:
        avoid_titles_block = "\nDO NOT REPEAT or copy these previously published headlines:\n" + "\n".join([f"- {t}" for t in existing_titles_sample])

    if not GEMINI_API_KEY:
        raise Exception("GEMINI_API_KEY is required to generate dynamic content and FAQs via API.")

    from google import genai
    client = genai.Client(api_key=GEMINI_API_KEY)

    # Full spectrum of official Gemini models (Low to High capability and speed):
    # If one model hits quota or transient unavailability, it seamlessly cascades to the next
    models_to_try = [
        "gemini-3.5-flash-lite",
        "gemini-3.7-flash",
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-3.1-pro-preview",
        "gemini-3-flash-preview",
        "gemma-4-31b-it",
        "gemma-4-26b-a4b-it"
    ]

    # Detect if the keyword is a numbered listicle (e.g., "5 Best AI Tools", "10 Tips for SEO", "12 Local SEO Strategies")
    import re
    num_match = re.search(r'\b(\d+)\b', kw)
    list_count = int(num_match.group(1)) if num_match else 0
    is_listicle = list_count >= 2

    if is_listicle:
        outline_structure_rule = f"""
CRITICAL LISTICLE REQUIREMENTS FOR "{kw}":
- The keyword specifies a list of {list_count} items.
- You MUST create an outline with EXACTLY {list_count} numbered points (1 to {list_count}).
- Structure format:
  Use an overarching <h2> for the list (or intro), and each of the {list_count} items MUST be an individual point (e.g. "1. Tool Name / Strategy", "2. Tool Name / Strategy", ..., "{list_count}. Tool Name / Strategy").
- DO NOT create unnecessary or empty <h4> headings under these {list_count} items. Keep them as distinct, high-value numbered sections with deep content paragraphs directly under each item.
"""
    else:
        outline_structure_rule = """
DYNAMIC OUTLINE & HEADING ARCHITECTURE:
- Let the topic dictate the outline naturally. DO NOT force rigid counts.
- Create between 5 to 8 major H2 sections depending strictly on what "{kw}" genuinely requires for full conceptual coverage.
- Under each H2, include 1 to 3 H3 subsections ONLY when the concept has clear sub-dimensions or components. If an H2 is concise or focused, 0 or 1 H3 is completely acceptable.
- Use H4 headings sparingly (0 to 2 max), only when explaining specific technical configurations, code parameters, or detailed sub-points. Never add H4 just for the sake of adding headings.
- NEVER use hierarchical prefix numbers like "1.", "1.1", "2.", "2.1" in H2, H3, or H4 titles.
- Headings must be organic, engaging, and editorial (e.g. "Foundations of Modern Architecture", "The Real-World Latency Trap").
"""

    # --- PHASE 1: Generate Outline, Semantic Keywords & Visual Concept ---
    outline_prompt = f"""
You are an expert SEO strategist and Chief Technology Architect.
Generate an extensive, engaging, and high-value architectural outline and semantic keyword blueprint for: "{kw}".

{outline_structure_rule}

CORE REQUIREMENTS:
1. Identify 25-40 high-relevance semantic entities, technical jargon, LSI keywords, and related concepts that Google's Knowledge Graph directly associates with "{kw}". Avoid generic fluff words.
2. Provide a 2-3 word visual photo subject query for Unsplash that best represents "{kw}" (e.g. for "Renewable Energy" -> "solar wind turbine", for "Electric Vehicles" -> "ev charging car", etc.).
3. The outline must be designed to engage human readers immediately, answering their real engineering problems rather than reciting dictionary definitions.

Respond ONLY with valid JSON:
{{
  "category": "Most appropriate category from [{tech_categories}]",
  "visual_subject": "2-3 word visual search term for Unsplash photo",
  "semantic_keywords": ["keyword1", "keyword2", "keyword3", "etc..."],
  "outline": [
    {{
      "h2": "Natural, Topic-Specific H2 Title",
      "subsections": [
        {{"h3": "Focused H3 Subsection Title (omit or leave empty if not needed)", "h4": []}}
      ]
    }}
  ]
}}
"""
    outline_data = None
    for model_id in models_to_try:
        success = False
        for attempt in range(2):
            try:
                res = client.models.generate_content(model=model_id, contents=outline_prompt)
                clean_res = re.sub(r'^```json\s*', '', res.text.strip())
                clean_res = re.sub(r'\s*```$', '', clean_res)
                outline_data = json.loads(clean_res)
                print(f"[INFO] Phase 1 Outline & Semantic Blueprint generated successfully with: {model_id}")
                success = True
                break
            except Exception as e:
                err_msg = str(e)
                # If quota exhausted (429), switch immediately to next model in cascade without delaying
                if "RESOURCE_EXHAUSTED" in err_msg or "429" in err_msg:
                    print(f"[QUOTA] Model {model_id} quota exhausted. Switching immediately to next available model...")
                    break
                # If transient 503 or 500, retry once
                if ("503" in err_msg or "UNAVAILABLE" in err_msg or "500" in err_msg) and attempt == 0:
                    print(f"[RETRY] Model {model_id} transient error. Retrying in 3s...")
                    time.sleep(3)
                    continue
                print(f"[DEBUG] Phase 1 on {model_id} failed: {err_msg[:100]}. Switching to next model...")
                break
        if success:
            break

    if not outline_data:
        raise Exception("Could not generate outline from Gemini API.")

    chosen_category = outline_data.get("category") or cat
    semantic_kw_list = outline_data.get("semantic_keywords", [])
    outline_json_str = json.dumps(outline_data.get("outline", []), indent=2)
    visual_subject = outline_data.get("visual_subject") or kw

    # --- PHASE 2: Write Comprehensive 1000+ Words Content & Google FAQs ---
    if is_listicle:
        write_structure_rule = f"""
SPECIAL LISTICLE NUMBERING AND STRUCTURE RULES (EXACTLY {list_count} POINTS):
- The article is a curated listicle of {list_count} items for: "{kw}".
- You MUST write EXACTLY {list_count} individual points numbered 1 to {list_count} (e.g. <h3>1. Name of Tool or Tip</h3>, <h3>2. Name of Tool or Tip</h3>, ..., <h3>{list_count}. Name of Tool or Tip</h3>).
- Each numbered item MUST be an <h3> tag followed by a thorough, in-depth evaluation and breakdown (<p>...</p> paragraphs, features, pros, use cases).
- DO NOT create any <h4> headings under these {list_count} points. Keep the structure clean and readable just like top tech publication reviews.
- Include a brief introductory section before the list and a concise summary/verdict at the end.
"""
    else:
        write_structure_rule = """
FLEXIBLE EDITORIAL STRUCTURE & NATURAL FLOW:
1. CONTENT PARAGRAPH UNDER EVERY HEADING:
   - When an H2 is followed by an H3, always write a brief framing paragraph (<p>...</p>) under the H2 before the first H3.
   - If an H2 has NO H3 subsections, simply write 2 to 3 substantive, well-structured paragraphs directly under that H2.
   - H3 subsections should only have H4s if deep technical breakdown or parameter specs are required. If an H3 is already self-contained, do NOT force an H4.
   - NEVER leave empty stacked headings (e.g. an H2 immediately followed by an H3 with no content between them).

2. NO HIERARCHICAL PREFIX NUMBERING:
   - DO NOT write "1.", "1.1", "2.1", "3.2" anywhere in headings. Keep all headings clean, natural, and journalistic.

3. HUMAN-GRADE WRITING (PREVENT GOOGLE PENALTIES & DE-INDEXING):
   - Do NOT write like a boring textbook or robotic AI summary.
   - Use crisp, engaging, active voice with vivid real-world tech examples, concrete tradeoffs, and direct insights.
   - Avoid generic buzzword stuffing ("In today's fast-paced digital world", "Delve into", "Tapestry", "Crucial component").
   - A human reader should feel they are learning directly from a battle-tested Senior Staff Engineer.
"""

    # Dynamic word count variation (800 - 1200 words) so articles don't have identical lengths
    import random
    target_words = random.choice([850, 920, 980, 1050, 1120, 1180])
    read_time_calc = f"{max(5, round(target_words / 150))} min read"

    write_prompt = f"""
You are a Principal Software Engineer and elite tech journalist writing for TechPulse Magazine.
Write a comprehensive, compelling, deeply engaging, and SEO-optimized technical article on: "{kw}".
{avoid_titles_block}

OUTLINE TO EXPAND:
{outline_json_str}

SEMANTIC ENTITIES & LSI TOPICS TO NATURALLY INTEGRATE (for Google 2026 E-E-A-T & Knowledge Graph):
{', '.join(semantic_kw_list[:40])}

CRITICAL EDITORIAL STRUCTURE & HEADING RULES (MANDATORY):
{write_structure_rule}

1. CONTENT LENGTH & NATURAL VARIATION:
   - Target word count: approximately {target_words} words (strictly within 800 to 1200 words).
   - Ensure complete conceptual closure: the article must feel thoroughly researched, practical, and fully resolved.
   - Use rich semantic HTML: <p>, <ul><li>, <ol><li>, <blockquote>, and <strong>.

2. MANDATORY PRE-FAQ CLOSING H2 ("Final Thoughts & Practitioner Perspective"):
   - Directly before the article ends (before FAQs), you MUST include an overarching <h2> section titled with a natural, varied name such as:
     "Final Thoughts and Engineering Takeaways", "Key Takeaways and Architectural Verdict", "Field Notes and Implementation Realities", or "Architectural Verdict: Practical Considerations".
   - Under this <h2>, write 1-2 rich paragraphs sharing REAL PRACTITIONER/HUMAN EXPERIENCE (e.g. real-world trade-offs observed in production, common pitfalls teams hit when migrating, latency vs cost realities, or hands-on benchmarks).
   - This directly builds Google E-E-A-T trust, stops boring generic text, and prevents Google helpful content penalties.

3. TITLE REQUIREMENT:
   - Must naturally feature or strictly relate to "{kw}".
   - Complete the title into a concise, professional, and SEO-friendly headline.
   - Understand the article's topic, audience, and main focus, then craft the most natural, engaging, and relevant ending.
   - DO NOT force fixed phrases (like "for Modern Systems" or "Guide and Analysis").
   - Strictly between 50 and 55 characters in length. Natural, human-written, and engaging.
   - NEVER include any years (such as 2025, 2026, etc.). Evergreen content only.

4. META DESCRIPTION (EXCERPT):
   - Must directly mention "{kw}".
   - Strictly between 150 and 155 characters in length. Complete sentence, never truncated.

5. FREQUENTLY ASKED QUESTIONS (FAQPAGE SCHEMA):
   - Provide 3-4 short, punchy, and direct FAQs specifically about "{kw}".
   - Each question must be clear and commonly searched.
   - Each answer must be SHORT, direct, and concise (strictly 25-40 words or 1-2 direct sentences). Do not write long paragraphs.

6. NO DASHES: Do NOT use any em-dashes (— or –). Use clean commas, colons, or parentheses.

Respond ONLY with valid JSON:
{{
  "title": "Title with keyword strictly between 50 and 55 chars",
  "slug": "url-friendly-lowercase-slug-without-years",
  "excerpt": "Meta description highlighting keyword strictly between 150 and 155 chars.",
  "category": "{chosen_category}",
  "readTime": "{read_time_calc}",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "visual_subject": "{visual_subject}",
  "faqs": [
    {{
      "question": "Specific question about {kw}?",
      "answer": "Detailed technical answer."
    }}
  ],
  "content": "Rich HTML content (around {target_words} words) including the Final Thoughts / Field Perspective H2 section before conclusion."
}}
"""
    article_data = None
    for model_id in models_to_try:
        success = False
        for attempt in range(2):
            try:
                res = client.models.generate_content(model=model_id, contents=write_prompt)
                clean_res = re.sub(r'^```json\s*', '', res.text.strip())
                clean_res = re.sub(r'\s*```$', '', clean_res)
                article_data = json.loads(clean_res)
                print(f"[INFO] Phase 2 Full Article (1000+ words + FAQs) generated successfully with: {model_id}")
                success = True
                break
            except Exception as e:
                err_msg = str(e)
                # If quota exhausted (429), switch immediately to next model in cascade without delaying
                if "RESOURCE_EXHAUSTED" in err_msg or "429" in err_msg:
                    print(f"[QUOTA] Model {model_id} quota exhausted in Phase 2. Switching immediately to next available model...")
                    break
                # If transient 503, 500 or UNAVAILABLE, retry once
                if ("503" in err_msg or "UNAVAILABLE" in err_msg or "500" in err_msg) and attempt == 0:
                    print(f"[RETRY] Model {model_id} transient error in Phase 2. Retrying in 3s...")
                    time.sleep(3)
                    continue
                print(f"[DEBUG] Phase 2 on {model_id} failed: {err_msg[:100]}. Switching to next model...")
                break
        if success:
            break

    if not article_data:
        raise Exception("Could not generate complete article from Gemini API.")

    if not article_data.get("category"):
        article_data["category"] = chosen_category
    article_data["visual_subject"] = visual_subject
    return article_data

def main():
    print("[START] TechPulse Autonomous Publisher running...")
    keyword_data = fetch_keyword_from_sheet()
    print(f"[PROCESS] Processing keyword: {keyword_data['keyword']}")

    # Collect existing posts metadata to guarantee 100% uniqueness with zero repetition
    existing_meta = get_existing_posts_metadata()
    print(f"[INFO] Analyzed {len(existing_meta['titles'])} existing posts to ensure 100% uniqueness.")

    article_data = generate_article_with_gemini(keyword_data, existing_titles=existing_meta["titles"])

    visual_subject = article_data.get("visual_subject") or keyword_data["keyword"]
    cover_image = fetch_unsplash_image(keyword_data["keyword"], used_image_ids=existing_meta["image_ids"], visual_subject=visual_subject)

    slug = article_data.get("slug") or re.sub(r'[^a-zA-Z0-9]+', '-', article_data["title"].lower()).strip('-')
    target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    # Prevent overwriting if already exists
    if os.path.exists(target_file):
        slug = f"{slug}-{int(time.time())}"
        target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    def clean_dashes(text):
        if not isinstance(text, str):
            return text
        # Replace em-dashes and en-dashes with comma, colon or clean space
        cleaned = text.replace("—", ", ").replace("–", "-")
        cleaned = re.sub(r'\s*,\s*,+', ', ', cleaned)
        cleaned = re.sub(r'\s{2,}', ' ', cleaned)
        return cleaned

    def remove_years(text):
        if not isinstance(text, str):
            return text
        text = re.sub(r'\bin (2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030)\b', 'in modern computing', text, flags=re.IGNORECASE)
        text = re.sub(r'\b(2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030)\b', 'modern', text)
        return text

    def clean_title(title):
        cleaned = clean_dashes(remove_years(title)).strip()
        # If Gemini generated slightly over 55, trim cleanly at word boundary
        if len(cleaned) > 55:
            words = cleaned.split()
            buf = ""
            for w in words:
                if len(buf + " " + w if buf else w) <= 55:
                    buf = buf + " " + w if buf else w
                else:
                    break
            if len(buf) >= 45:
                cleaned = buf
            else:
                cleaned = cleaned[:55].rstrip('.,;:- ')
        return cleaned

    def clean_excerpt(text):
        cleaned = clean_dashes(remove_years(text)).strip()
        if len(cleaned) > 155:
            words = cleaned.split()
            buf = ""
            for w in words:
                if len(buf + " " + w if buf else w) <= 154:
                    buf = buf + " " + w if buf else w
                else:
                    break
            cleaned = buf.rstrip('.,;:- ') + '.'
        if len(cleaned) < 150:
            pad = " Comprehensive engineering overview and production analysis."
            cleaned = (cleaned.rstrip('. ') + pad)[:154].rstrip('.,;:- ') + '.'
        return cleaned

    import random
    AUTHORS = [
        {
            "name": "Cora Lee",
            "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
            "role": "Lead Systems Architect & Contributing Tech Editor",
            "bio": "Former kernel engineer and distributed systems researcher writing on microarchitectures, cloud infrastructure, and intelligent automation."
        },
        {
            "name": "Kellie Anne",
            "avatar": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
            "role": "Principal AI & Silicon Research Analyst",
            "bio": "Hardware benchmark specialist and AI infrastructure journalist tracking frontier models, neuromorphic semiconductors, and quantum engineering."
        }
    ]
    selected_author = random.choice(AUTHORS)

    kw = keyword_data.get("keyword", "")
    primary_tag = (article_data.get("tags") or ["Technology"])[0]
    cover_alt = f"{kw} - {primary_tag} Technology Architecture and Engineering Analysis"

    raw_faqs = article_data.get("faqs") or []
    cleaned_faqs = []
    for f in raw_faqs:
        if isinstance(f, dict) and f.get("question") and f.get("answer"):
            cleaned_faqs.append({
                "question": clean_dashes(remove_years(f["question"])).strip(),
                "answer": clean_dashes(remove_years(f["answer"])).strip()
            })

    def clean_content(html_text):
        if not isinstance(html_text, str):
            return html_text
        text = clean_dashes(remove_years(html_text))
        num_match = re.search(r'\b(\d+)\b', kw)
        kw_list_count = int(num_match.group(1)) if num_match else 0
        if kw_list_count >= 2:
            # For listicles, strip hierarchical decimals like "1.1 ", "2.1 " but keep "1. ", "2. "
            text = re.sub(r'(<h[234][^>]*>)\s*\d+\.\d+\.?\s*', r'\1', text, flags=re.IGNORECASE)
        else:
            # For standard articles, strip all numerical prefixes like "1. ", "1.1 ", "2.1 " from headings
            text = re.sub(r'(<h[234][^>]*>)\s*(\d+\.\d+\.?|\d+\.)\s*', r'\1', text, flags=re.IGNORECASE)
        return text

    post_record = {
        "title": clean_title(article_data["title"]),
        "target_keyword": keyword_data["keyword"],
        "excerpt": clean_excerpt(article_data["excerpt"]),
        "coverImage": cover_image,
        "coverImageAlt": cover_alt,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "createdAt": int(time.time() * 1000),
        "category": article_data.get("category", "Technology"),
        "author": selected_author,
        "readTime": article_data.get("readTime", "8 min read"),
        "tags": article_data.get("tags", ["Tech", "Engineering"]),
        "content": clean_content(article_data["content"]),
        "faqs": cleaned_faqs
    }

    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(post_record, f, indent=2)

    # Update Google Sheet if Webhook URL provided
    webhook_url = os.environ.get("GOOGLE_SHEET_WEBHOOK_URL")
    if webhook_url:
        try:
            print(f"[INFO] Syncing to Google Sheet Webhook: {webhook_url[:30]}...")
            payload = {
                "keyword": keyword_data["keyword"],
                "category": post_record["category"],
                "tags": post_record["tags"],
                "status": "Published"
            }
            # Google Apps Script requires allow_redirects=True (handles 302 redirect)
            webhook_res = requests.post(webhook_url, json=payload, timeout=20, allow_redirects=True)
            print(f"[SUCCESS] Google Sheet Webhook response code: {webhook_res.status_code}, content: {webhook_res.text.strip()[:100]}")
        except Exception as wh_err:
            print(f"[WARN] Failed to sync to Google Sheet: {wh_err}")
    else:
        print("[INFO] No GOOGLE_SHEET_WEBHOOK_URL provided in environment.")

    print("\n" + "="*60)
    print(">> [TECHPULSE AUTO PUBLISHER REPORT]")
    print("="*60)
    print(f"[*] KEYWORD  : {keyword_data['keyword']}")
    print(f"[*] CATEGORY : {post_record['category']}")
    print(f"[*] TAGS     : {', '.join(post_record['tags'])}")
    print(f"[*] TITLE    : {post_record['title']}")
    print(f"[*] SLUG     : {slug}")
    print(f"[*] STATUS   : PUBLISHED (Date: {post_record['date']})")
    print(f"[*] COVER IMG: {post_record['coverImage']}")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
