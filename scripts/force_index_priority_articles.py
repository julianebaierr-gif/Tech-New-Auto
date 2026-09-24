import os
import json
import time
import requests
from datetime import datetime

PRIORITY_URLS = [
    "https://www.compors.com/architecting-a-secure-remote-desktop-connection/",
    "https://www.compors.com/architecting-ai-resume-builder-free/",
    "https://www.compors.com/architecting-scalable-systems-chat-with-ai/",
    "https://www.compors.com/architecting-systems-ai-writing-tools-updates/",
    "https://www.compors.com/architectural-realities-when-you-check-wifi-speed/",
    "https://www.compors.com/chip-industry-updates-today-manufacturing-realities/",
    "https://www.compors.com/engineering-realities-behind-ai-detector-turnitin/",
    "https://www.compors.com/engineering-resilient-enterprise-cyber-security-solutions/",
    "https://www.compors.com/evaluating-best-ai-apps-for-modern-software-work/",
    "https://www.compors.com/evaluating-modern-ai-generator-free-tools-in-systems/",
    "https://www.compors.com/evaluating-modern-character-ai-alternatives/",
    "https://www.compors.com/evaluating-the-true-practical-chatgpt-plus-cost/",
    "https://www.compors.com/grammarly-ai-detector-architectural-analysis/",
    "https://www.compors.com/modem-vs-router-architecture-networking/",
    "https://www.compors.com/optimizing-modern-data-center-solutions-for-scale/",
    "https://www.compors.com/quantum-computing-applications-in-modern-enterprise-it/",
    "https://www.compors.com/scaling-remote-infrastructure-with-google-remote-desktop/",
    "https://www.compors.com/sora-app-invite-codes-architecture-and-access-reality/"
]

def submit_indexnow(urls):
    indexnow_key = "8e728390f9e840bcaaea591763f6bba9"
    host = "www.compors.com"
    payload = {
        "host": host,
        "key": indexnow_key,
        "keyLocation": f"https://{host}/{indexnow_key}.txt",
        "urlList": urls
    }

    endpoints = [
        "https://api.indexnow.org/indexnow",
        "https://www.bing.com/indexnow",
        "https://yandex.com/indexnow"
    ]

    print(f"\n[INDEXNOW] Forcefully submitting {len(urls)} target URLs to search engines...")
    for ep in endpoints:
        try:
            r = requests.post(ep, json=payload, headers={"Content-Type": "application/json; charset=utf-8"}, timeout=15)
            print(f"  {ep} -> HTTP {r.status_code}")
        except Exception as e:
            print(f"  {ep} -> ERROR: {e}")

def submit_google_indexing(urls):
    raw_key = os.environ.get("GOOGLE_INDEXING_KEY") or os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not raw_key:
        print("\n[GOOGLE INDEXING] No local key found (handled securely via GitHub Actions runner).")
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

        print(f"\n[GOOGLE INDEXING] Forcefully notifying Googlebot for {len(urls)} target URLs...")
        for idx, url in enumerate(urls, 1):
            try:
                payload = json.dumps({"url": url, "type": "URL_UPDATED"})
                if use_requests:
                    res = requests.post(endpoint, headers=headers, data=payload, timeout=15)
                    status = res.status_code
                else:
                    response, _ = http.request(endpoint, method="POST", body=payload, headers={"Content-Type": "application/json"})
                    status = response.status

                print(f"  [{idx}/{len(urls)}] HTTP {status} -> {url}")
                time.sleep(0.2)
            except Exception as e:
                print(f"  [{idx}/{len(urls)}] ERR -> {url}: {e}")
    except Exception as err:
        print(f"[GOOGLE INDEXING] Error: {err}")

if __name__ == "__main__":
    print(f"=== FORCE PRIORITY INDEXING RUN ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ===")
    submit_indexnow(PRIORITY_URLS)
    submit_google_indexing(PRIORITY_URLS)
    print("=== FINISHED ===")
