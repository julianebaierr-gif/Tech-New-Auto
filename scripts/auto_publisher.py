import os
import re
import csv
import json
import time
import requests
from datetime import datetime

# 1. Configuration & Secrets
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")
GOOGLE_SHEET_CSV_URL = os.environ.get("GOOGLE_SHEET_CSV_URL")
GOOGLE_SHEET_ID = os.environ.get("GOOGLE_SHEET_ID")
POSTS_DIR = os.path.join(os.getcwd(), "content", "posts")

os.makedirs(POSTS_DIR, exist_ok=True)

def fetch_keyword_from_sheet():
    """
    Fetches target keyword and topic from Google Sheet.
    Supports both public published CSV URL or gspread with service account.
    """
    keyword_data = None

    # Method A: Google Sheet CSV link
    if GOOGLE_SHEET_CSV_URL:
        try:
            print("[INFO] Fetching keyword queue from GOOGLE_SHEET_CSV_URL...")
            res = requests.get(GOOGLE_SHEET_CSV_URL, timeout=15)
            if res.status_code == 200:
                reader = csv.DictReader(res.text.splitlines())
                for row in reader:
                    status = row.get("Status", "").strip().lower()
                    if status in ["pending", "new", "queued", ""]:
                        keyword_data = {
                            "keyword": row.get("Keyword", "").strip(),
                            "category": row.get("Category", "Tech & AI").strip() or "Tech & AI",
                            "tags": [t.strip() for t in row.get("Tags", "").split(",") if t.strip()]
                        }
                        if keyword_data["keyword"]:
                            print(f"[FOUND] Found pending keyword: {keyword_data['keyword']}")
                            return keyword_data
        except Exception as e:
            print(f"[WARN] Error fetching from GOOGLE_SHEET_CSV_URL: {e}")

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

def fetch_unsplash_image(query):
    """
    Fetches high quality tech photo from Unsplash.
    """
    default_img = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    if not UNSPLASH_ACCESS_KEY:
        print("[INFO] No UNSPLASH_ACCESS_KEY provided, using curated tech cover.")
        return default_img

    try:
        url = f"https://api.unsplash.com/search/photos?page=1&per_page=1&query={query}&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            if data.get("results"):
                return data["results"][0]["urls"]["regular"]
    except Exception as e:
        print(f"[WARN] Unsplash API error: {e}")

    return default_img

def generate_article_with_gemini(keyword_info):
    """
    Generates a full SEO-rich tech article using Gemini API.
    """
    kw = keyword_info["keyword"]
    category = keyword_info.get("category", "Technology")

    if not GEMINI_API_KEY:
        print("[WARN] GEMINI_API_KEY not configured. Generating high-quality deterministic article.")
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', kw.lower()).strip('-')
        return {
            "title": f"The Evolution of {kw}: Strategic Insights for Modern Engineering",
            "slug": slug,
            "excerpt": f"An in-depth technical analysis of {kw}, examining architectural trade-offs, industry adoption benchmarks, and future engineering trends.",
            "category": category,
            "readTime": "5 min read",
            "tags": keyword_info.get("tags") or ["Tech", "Engineering", "Innovation"],
            "content": f"<p>As technology infrastructures become increasingly sophisticated, <strong>{kw}</strong> has emerged as a cornerstone for forward-thinking engineering organizations.</p><h2>Architectural Foundations and Market Context</h2><p>Addressing the demands of modern computing requires balancing scalability, maintainability, and latency. In the context of {kw}, systems must be designed to adapt dynamically to evolving traffic patterns and workload complexities.</p><h2>Key Implementation Considerations</h2><ul><li><strong>Performance Optimization:</strong> Ensuring computational workloads minimize redundant overhead.</li><li><strong>Resilience & Fault Tolerance:</strong> Designing decoupled components that isolate failure domains.</li><li><strong>Ecosystem Integration:</strong> Leveraging standardized APIs and protocols.</li></ul><blockquote>'Modern engineering is about reducing cycle time while maximizing system reliability and continuous observability.'</blockquote><h2>Future Outlook</h2><p>Looking ahead, organizations that integrate {kw} effectively will maintain an agility advantage over competitors tied to legacy monoliths.</p>"
        }

    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)

        prompt = f"""
You are an elite technical author and software architect writing for TechPulse, a premier technology journal.
Write a comprehensive, professional, and SEO-optimized tech article based on this keyword/topic: "{kw}".

Respond ONLY with valid JSON in this exact structure:
{{
  "title": "Engaging, authoritative title",
  "slug": "url-friendly-lowercase-slug-without-special-characters",
  "excerpt": "Compelling 2-sentence summary of the article for social sharing and search meta",
  "category": "{category}",
  "readTime": "5 min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "content": "Rich HTML content using <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong> tags. Minimum 450 words of deep technical insights."
}}
"""
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        raw_text = response.text.strip()
        # Clean potential markdown fences ```json ... ```
        raw_text = re.sub(r'^```json\s*', '', raw_text)
        raw_text = re.sub(r'\s*```$', '', raw_text)

        article = json.loads(raw_text)
        return article
    except Exception as e:
        print(f"[ERROR] Gemini generation failed: {e}")
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', kw.lower()).strip('-')
        return {
            "title": f"Advancements in {kw}: Technical Deep Dive",
            "slug": slug,
            "excerpt": f"Comprehensive overview and practical implementation insights regarding {kw}.",
            "category": category,
            "readTime": "4 min read",
            "tags": ["Technology", "Software", "AI"],
            "content": f"<p>Deep dive into {kw} and how modern engineering workflows are being transformed by high-speed automation and intelligent toolchains.</p>"
        }

def main():
    print("[START] TechPulse Autonomous Publisher running...")
    keyword_data = fetch_keyword_from_sheet()
    print(f"[PROCESS] Processing keyword: {keyword_data['keyword']}")

    article_data = generate_article_with_gemini(keyword_data)

    cover_image = fetch_unsplash_image(keyword_data["keyword"])

    slug = article_data.get("slug") or re.sub(r'[^a-zA-Z0-9]+', '-', article_data["title"].lower()).strip('-')
    target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    # Prevent overwriting if already exists
    if os.path.exists(target_file):
        slug = f"{slug}-{int(time.time())}"
        target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    post_record = {
        "title": article_data["title"],
        "excerpt": article_data["excerpt"],
        "coverImage": cover_image,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "category": article_data.get("category", "Technology"),
        "author": {
            "name": "TechPulse Autonomous Bot",
            "avatar": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            "role": "AI Research & Publishing Engine"
        },
        "readTime": article_data.get("readTime", "5 min read"),
        "tags": article_data.get("tags", ["Tech", "AI", "Automation"]),
        "content": article_data["content"]
    }

    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(post_record, f, indent=2)

    print(f"[SUCCESS] Successfully published: {target_file}")

if __name__ == "__main__":
    main()
