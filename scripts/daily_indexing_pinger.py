import os
import json
import glob
import time
import requests
from datetime import datetime

GOOGLE_INDEXING_KEY = os.environ.get("GOOGLE_INDEXING_KEY") or os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
SITE_URL = (os.environ.get("SITE_URL") or "https://www.compors.com").rstrip("/")

def get_all_website_urls():
    priority_slugs = [
        "architecting-a-secure-remote-desktop-connection",
        "architecting-ai-resume-builder-free",
        "architecting-scalable-systems-chat-with-ai",
        "architecting-systems-ai-writing-tools-updates",
        "architectural-realities-when-you-check-wifi-speed",
        "chip-industry-updates-today-manufacturing-realities",
        "engineering-realities-behind-ai-detector-turnitin",
        "engineering-resilient-enterprise-cyber-security-solutions",
        "evaluating-best-ai-apps-for-modern-software-work",
        "evaluating-modern-ai-generator-free-tools-in-systems",
        "evaluating-modern-character-ai-alternatives",
        "evaluating-the-true-practical-chatgpt-plus-cost",
        "grammarly-ai-detector-architectural-analysis",
        "modem-vs-router-architecture-networking",
        "optimizing-modern-data-center-solutions-for-scale",
        "quantum-computing-applications-in-modern-enterprise-it",
        "scaling-remote-infrastructure-with-google-remote-desktop",
        "sora-app-invite-codes-architecture-and-access-reality"
    ]

    urls = [f"{SITE_URL}/{slug}/" for slug in priority_slugs]

    urls += [
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

    # Published Articles (append remaining)
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    posts_dir = os.path.join(repo_root, "content", "posts")
    if not os.path.exists(posts_dir):
        posts_dir = os.path.join(os.getcwd(), "content", "posts")
    if os.path.exists(posts_dir):
        post_files = sorted(glob.glob(os.path.join(posts_dir, "*.json")), key=os.path.getmtime, reverse=True)
        for pf in post_files:
            slug = os.path.basename(pf).replace(".json", "")
            post_url = f"{SITE_URL}/{slug}/"
            if post_url not in urls:
                urls.append(post_url)

    # Return deduplicated preserving order
    seen = set()
    deduped = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            deduped.append(u)

    return deduped

def ping_google_indexing(url_list):
    raw_key = GOOGLE_INDEXING_KEY
    if not raw_key:
        print("[WARN] No GOOGLE_INDEXING_KEY or GOOGLE_SERVICE_ACCOUNT_JSON found. Skipping Google Indexing API.")
        return

    try:
        if os.path.exists(raw_key):
            key_data = json.load(open(raw_key, 'r', encoding='utf-8'))
        else:
            key_data = json.loads(raw_key)

        scopes = ["https://www.googleapis.com/auth/indexing"]
        endpoint = "https://indexing.googleapis.com/v3/urlNotifications:publish"

        try:
            from google.oauth2 import service_account
            from google.auth.transport.requests import Request
            credentials = service_account.Credentials.from_service_account_info(key_data, scopes=scopes)
            credentials.refresh(Request())
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {credentials.token}"
            }
            use_requests = True
        except ImportError:
            from oauth2client.service_account import ServiceAccountCredentials
            import httplib2
            credentials = ServiceAccountCredentials.from_json_keyfile_dict(key_data, scopes=scopes)
            http = credentials.authorize(httplib2.Http())
            use_requests = False

        print(f"\n[GOOGLE INDEXING] Submitting {len(url_list)} URLs to Googlebot for immediate crawling...")
        success_count = 0
        for idx, url in enumerate(url_list, 1):
            try:
                payload = json.dumps({"url": url, "type": "URL_UPDATED"})
                if use_requests:
                    res = requests.post(endpoint, headers=headers, data=payload, timeout=15)
                    status = res.status_code
                else:
                    response, content = http.request(endpoint, method="POST", body=payload, headers={"Content-Type": "application/json"})
                    status = response.status

                if status in [200, 201, 202]:
                    success_count += 1
                    print(f"[{idx}/{len(url_list)}] [OK {status}] {url}")
                elif status == 429:
                    print(f"[{idx}/{len(url_list)}] [QUOTA 429] Daily Google Indexing API quota limit reached. Stopping batch.")
                    break
                else:
                    print(f"[{idx}/{len(url_list)}] [STATUS {status}] {url}")
                time.sleep(0.2)
            except Exception as e:
                print(f"[ERR] Failed to submit {url}: {e}")

        print(f"\n[SUMMARY] Successfully notified Googlebot for {success_count}/{len(url_list)} URLs.")
    except Exception as err:
        print(f"[ERROR] Error during Google Indexing batch submission: {err}")

def ping_indexnow(url_list):
    indexnow_key = "8e728390f9e840bcaaea591763f6bba9"
    host = "www.compors.com"
    payload = {
        "host": host,
        "key": indexnow_key,
        "keyLocation": f"https://{host}/{indexnow_key}.txt",
        "urlList": url_list[:1000]
    }
    print(f"\n[INDEXNOW PING] Submitting {len(url_list)} URLs to IndexNow (Bing, Yandex, Seznam, Naver)...")
    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow"
    ]
    for ep in endpoints:
        try:
            r = requests.post(ep, json=payload, headers={"Content-Type": "application/json; charset=utf-8"}, timeout=15)
            print(f"[INDEXNOW PING] {ep} -> HTTP {r.status_code}")
        except Exception as e:
            print(f"[INDEXNOW PING] {ep} failed: {e}")

def ping_search_engines():
    sitemap_url = f"{SITE_URL}/sitemap.xml"
    print(f"\n[SITEMAP CHECK] Verifying live sitemap availability: {sitemap_url}...")
    try:
        r = requests.get(sitemap_url, timeout=10)
        print(f"[SITEMAP CHECK] {sitemap_url} -> HTTP {r.status_code}")
    except Exception as e:
        print(f"[SITEMAP CHECK] Failed to fetch sitemap: {e}")

if __name__ == "__main__":
    print(f"=== COMPORS DAILY INDEXING & CRAWL ENFORCER ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ===")
    all_urls = get_all_website_urls()
    ping_google_indexing(all_urls)
    ping_indexnow(all_urls)
    ping_search_engines()
    print("=== DAILY INDEXING RUN FINISHED ===\n")
