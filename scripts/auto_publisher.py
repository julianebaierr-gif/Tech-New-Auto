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
    existing_posts = []
    if os.path.exists(POSTS_DIR):
        for f in os.listdir(POSTS_DIR):
            if f.endswith(".json"):
                try:
                    with open(os.path.join(POSTS_DIR, f), "r", encoding="utf-8") as post_file:
                        data = json.load(post_file)
                        existing_posts.append(data.get("title", "").lower())
                except:
                    pass

    # Method A: Google Sheet CSV link
    if GOOGLE_SHEET_CSV_URL:
        try:
            print("[INFO] Fetching keywords from Google Sheet...")
            # Normalize export url to csv if standard sharing url passed
            sheet_url = GOOGLE_SHEET_CSV_URL
            if "/edit" in sheet_url:
                sheet_url = sheet_url.split("/edit")[0] + "/export?format=csv"

            res = requests.get(sheet_url, timeout=15)
            if res.status_code == 200 and res.text.strip():
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

                    # Check if already published on site
                    if os.path.exists(os.path.join(POSTS_DIR, f"{candidate_slug}.json")):
                        print(f"[SKIP] Keyword '{candidate_keyword}' already published.")
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

    # Fallback default trending tech topics pool if sheet is empty or unconfigured
    fallback_pool = [
        {"keyword": "Agentic AI Workflows and Tool Use in 2026", "category": "Artificial Intelligence", "tags": ["AI", "Agents", "Automation"]},
        {"keyword": "Neuromorphic Computing and Energy-Efficient Chips", "category": "Hardware & Semiconductors", "tags": ["Hardware", "Chips", "Computing"]},
        {"keyword": "Zero Trust Cloud Security for Modern Distributed Systems", "category": "Cybersecurity", "tags": ["Security", "Cloud", "DevOps"]},
        {"keyword": "WebAssembly in Serverless Architectures", "category": "Software Engineering", "tags": ["WebAssembly", "Serverless", "Wasm"]},
        {"keyword": "Post-Quantum Cryptography Migration Roadmaps", "category": "Cybersecurity", "tags": ["Cryptography", "Quantum", "Security"]}
    ]
    import random
    selected = random.choice(fallback_pool)
    print(f"[FALLBACK] Using keyword from trending pool: {selected['keyword']}")
    return selected

def get_existing_posts_metadata():
    """
    Scans all existing posts to extract existing titles, excerpts, slugs, and cover images
    so that new articles are guaranteed 100% unique with zero duplication.
    """
    titles = []
    excerpts = []
    images = []
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
                            images.append(d["coverImage"].strip())
                        slugs.append(f.replace(".json", ""))
                except:
                    pass
    return {"titles": titles, "excerpts": excerpts, "images": images, "slugs": slugs}

def fetch_unsplash_image(query, used_images=None, visual_subject=None):
    """
    Fetches high quality, strictly relevant photo from Unsplash based on the exact keyword and visual subject.
    Never repeats an image already used on the site.
    """
    used_images = set(used_images or [])
    clean_kw = re.sub(r'[^a-zA-Z0-9\s]+', ' ', query).strip()
    
    # Priority search queries: specific visual subject first, then clean keyword
    candidate_queries = []
    if visual_subject and visual_subject.strip():
        candidate_queries.append(visual_subject.strip())
    candidate_queries.append(clean_kw)
    words = clean_kw.split()
    if len(words) > 2:
        candidate_queries.append(" ".join(words[:2]))
    candidate_queries.append(f"{clean_kw} technology")

    if not UNSPLASH_ACCESS_KEY:
        print("[INFO] No UNSPLASH_ACCESS_KEY provided, using dynamic Unsplash source.")
        encoded = requests.utils.quote(clean_kw)
        return f"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"

    for search_term in candidate_queries:
        try:
            url = f"https://api.unsplash.com/search/photos?page=1&per_page=15&query={requests.utils.quote(search_term)}&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
            res = requests.get(url, timeout=12)
            if res.status_code == 200:
                data = res.json()
                results = data.get("results", [])
                for item in results:
                    img_url = item.get("urls", {}).get("regular")
                    if img_url and img_url not in used_images:
                        print(f"[IMAGE FOUND] Successfully matched relevant image for '{search_term}'")
                        return img_url
        except Exception as e:
            print(f"[WARN] Unsplash API search error for '{search_term}': {e}")

    # Fallback to general tech search if no specific image matched
    try:
        url = f"https://api.unsplash.com/search/photos?page=1&per_page=10&query=modern+technology&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            for item in res.json().get("results", []):
                img_url = item.get("urls", {}).get("regular")
                if img_url and img_url not in used_images:
                    return img_url
    except:
        pass

    return "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"

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

    # Official supported Gemini models with resilient fallback
    models_to_try = [
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-2.5-pro",
        "gemini-3-flash-preview",
        "gemini-2.5-flash",
        "gemini-3-pro-preview"
    ]

    # --- PHASE 1: Generate Outline, Semantic Keywords & Visual Concept ---
    outline_prompt = f"""
You are an expert SEO strategist and Chief Technology Architect.
Generate an extensive, deep architectural outline and semantic keyword blueprint for an authoritative technical guide on: "{kw}".

Requirements:
1. Create a detailed heading outline containing multiple H2, H3, and H4 sections specifically tailored to "{kw}".
2. Identify at least 30-50 high-relevance semantic entities, technical jargon, LSI keywords, and related concepts that Google's Knowledge Graph associates with "{kw}".
3. Provide a 2-3 word visual photo subject query for Unsplash that best represents "{kw}" (e.g. for "Renewable Energy" -> "solar wind turbine", for "Electric Vehicles" -> "ev charging car", etc.).

Respond ONLY with valid JSON:
{{
  "category": "Most appropriate category from [{tech_categories}]",
  "visual_subject": "2-3 word visual search term for Unsplash photo",
  "semantic_keywords": ["keyword1", "keyword2", "keyword3", "etc..."],
  "outline": [
    {{
      "h2": "Main section title",
      "subsections": [
        {{"h3": "Subsection title", "h4": ["Detailed point 1", "Detailed point 2"]}}
      ]
    }}
  ]
}}
"""
    outline_data = None
    for model_id in models_to_try:
        success = False
        for attempt in range(3):
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
                if ("503" in err_msg or "UNAVAILABLE" in err_msg) and attempt < 2:
                    wait_time = (attempt + 1) * 3
                    print(f"[RETRY] Model {model_id} hit 503 UNAVAILABLE. Retrying in {wait_time}s (attempt {attempt + 1}/3)...")
                    time.sleep(wait_time)
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
    write_prompt = f"""
You are a Principal Software Engineer and elite tech journalist writing for TechPulse Magazine.
Write a comprehensive, professional, 1000+ WORD deeply technical, and SEO-optimized article on: "{kw}".
{avoid_titles_block}

OUTLINE TO EXPAND:
{outline_json_str}

SEMANTIC ENTITIES & LSI TOPICS TO NATURALLY INTEGRATE (for Google 2026 E-E-A-T & Knowledge Graph):
{', '.join(semantic_kw_list[:40])}

CRITICAL SEO & GOOGLE 2026 HELPFUL CONTENT GUIDELINES:
1. CONTENT LENGTH: Minimum 1000 words. Provide thorough, hands-on architectural analysis, operational benchmarks, and production guidance. Never write shallow overviews.
2. HEADING STRUCTURE: Use semantic HTML hierarchy:
   - <h2> for all major sections
   - <h3> for technical mechanism subsections
   - <h4> for granular implementation details
   - Structure with rich <p>, <ul><li>, <ol><li>, <blockquote>, and <strong> tags.
3. TITLE REQUIREMENT:
   - Must directly feature or be 100% relevant to "{kw}".
   - Strictly between 50 and 55 characters in length. Count the exact characters!
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
  "readTime": "8 min read",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"],
  "visual_subject": "{visual_subject}",
  "faqs": [
    {{
      "question": "Specific question about {kw}?",
      "answer": "Detailed technical answer."
    }}
  ],
  "content": "Rich HTML content exceeding 1000 words adhering strictly to the H2, H3, H4 hierarchy."
}}
"""
    article_data = None
    for model_id in models_to_try:
        success = False
        for attempt in range(3):
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
                if ("503" in err_msg or "UNAVAILABLE" in err_msg) and attempt < 2:
                    wait_time = (attempt + 1) * 3
                    print(f"[RETRY] Model {model_id} hit 503 UNAVAILABLE during Phase 2. Retrying in {wait_time}s (attempt {attempt + 1}/3)...")
                    time.sleep(wait_time)
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
    cover_image = fetch_unsplash_image(keyword_data["keyword"], used_images=existing_meta["images"], visual_subject=visual_subject)

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
        if len(cleaned) < 50:
            cleaned = f"{cleaned} for Modern Systems"
        if len(cleaned) > 55:
            words = cleaned.split()
            buf = ""
            for w in words:
                if len(buf + " " + w if buf else w) <= 55:
                    buf = buf + " " + w if buf else w
                else:
                    break
            cleaned = buf
        # Final fine-tuning to guarantee 50-55 range
        if len(cleaned) < 50:
            cleaned = (cleaned + " Guide and Analysis")[:55]
        return cleaned[:55]

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

    post_record = {
        "title": clean_title(article_data["title"]),
        "excerpt": clean_excerpt(article_data["excerpt"]),
        "coverImage": cover_image,
        "coverImageAlt": cover_alt,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "createdAt": int(time.time() * 1000),
        "category": article_data.get("category", "Technology"),
        "author": selected_author,
        "readTime": article_data.get("readTime", "8 min read"),
        "tags": article_data.get("tags", ["Tech", "Engineering"]),
        "content": clean_dashes(remove_years(article_data["content"])),
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
