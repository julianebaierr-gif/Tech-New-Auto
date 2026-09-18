import os
import json
import glob
import time
import requests
from datetime import datetime

GOOGLE_INDEXING_KEY = os.environ.get("GOOGLE_INDEXING_KEY") or os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
SITE_URL = (os.environ.get("SITE_URL") or "https://www.compors.com").rstrip("/")

def get_all_website_urls():
    urls = [
        f"{SITE_URL}/",
        f"{SITE_URL}/blog/",
        f"{SITE_URL}/authors/",
        f"{SITE_URL}/about/",
        f"{SITE_URL}/contact/",
        f"{SITE_URL}/privacy-policy/",
        f"{SITE_URL}/terms/",
    ]

    # Categories
    categories = [
        "artificial-intelligence",
        "cloud-computing",
        "cybersecurity",
        "software-engineering",
        "hardware-semiconductors",
        "future-tech",
        "web-development",
    ]
    for cat in categories:
        urls.append(f"{SITE_URL}/category/{cat}/")

    # Authors
    authors = ["cora-lee", "kellie-anne"]
    for auth in authors:
        urls.append(f"{SITE_URL}/author/{auth}/")

    # Published Articles
    posts_dir = os.path.join(os.getcwd(), "content", "posts")
    if os.path.exists(posts_dir):
        post_files = sorted(glob.glob(os.path.join(posts_dir, "*.json")), key=os.path.getmtime, reverse=True)
        for pf in post_files:
            slug = os.path.basename(pf).replace(".json", "")
            urls.append(f"{SITE_URL}/{slug}/")

    return urls

def ping_google_indexing(url_list):
    if not GOOGLE_INDEXING_KEY:
        print("[WARN] No GOOGLE_INDEXING_KEY found. Cannot ping Google Indexing API.")
        return

    try:
        from oauth2client.service_account import ServiceAccountCredentials
        import httplib2

        key_data = json.loads(GOOGLE_INDEXING_KEY)
        scopes = ["https://www.googleapis.com/auth/indexing"]
        credentials = ServiceAccountCredentials.from_json_keyfile_dict(key_data, scopes=scopes)
        http = credentials.authorize(httplib2.Http())
        endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

        print(f"\n[GOOGLE INDEXING] Submitting {len(url_list)} URLs to Googlebot for immediate crawling...")
        success_count = 0
        for idx, url in enumerate(url_list, 1):
            try:
                payload = json.dumps({"url": url, "type": "URL_UPDATED"})
                response, content = http.request(endpoint, method="POST", body=payload, headers={"Content-Type": "application/json"})
                if response.status in [200, 201, 202]:
                    success_count += 1
                    print(f"[{idx}/{len(url_list)}] [OK {response.status}] {url}")
                else:
                    print(f"[{idx}/{len(url_list)}] [STATUS {response.status}] {url}")
                time.sleep(0.2)  # respectful pacing
            except Exception as e:
                print(f"[ERR] Failed to submit {url}: {e}")

        print(f"\n[SUMMARY] Successfully notified Googlebot for {success_count}/{len(url_list)} URLs.")
    except Exception as err:
        print(f"[ERROR] Error during Google Indexing batch submission: {err}")

def ping_search_engines():
    sitemap_url = f"{SITE_URL}/sitemap.xml"
    print(f"\n[SITEMAP PING] Pinging Search Engines with sitemap: {sitemap_url}...")
    ping_urls = [
        f"https://www.google.com/ping?sitemap={sitemap_url}",
        f"https://www.bing.com/ping?sitemap={sitemap_url}",
    ]
    for pu in ping_urls:
        try:
            r = requests.get(pu, timeout=10)
            print(f"[SITEMAP PING] {pu} -> HTTP {r.status_code}")
        except Exception as e:
            print(f"[SITEMAP PING] {pu} failed: {e}")

if __name__ == "__main__":
    print(f"=== COMPORS DAILY INDEXING & CRAWL ENFORCER ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ===")
    all_urls = get_all_website_urls()
    ping_google_indexing(all_urls)
    ping_search_engines()
    print("=== DAILY INDEXING RUN FINISHED ===\n")
