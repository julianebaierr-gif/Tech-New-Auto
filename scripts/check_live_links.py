import requests
import re
from urllib.parse import urljoin, urlparse

BASE_URL = "https://www.compors.com"

pages_to_check = [
    "/",
    "/blog/",
    "/authors/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/terms/",
    "/category/cybersecurity/",
    "/category/artificial-intelligence/",
]

all_no_slash_links = set()
visited = set()

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

for page in pages_to_check:
    url = urljoin(BASE_URL, page)
    try:
        res = requests.get(url, headers=headers, timeout=10)
        links = re.findall(r'href=["\']([^"\']+)["\']', res.text)
        for link in links:
            if link.startswith("/") or "compors.com" in link:
                clean_link = link.split("#")[0].split("?")[0]
                parsed = urlparse(clean_link)
                path = parsed.path
                if path and not path.endswith("/"):
                    # Check if it has file extension like .png, .xml, .txt
                    last_part = path.split("/")[-1]
                    if "." not in last_part:
                        all_no_slash_links.add((page, link))
    except Exception as e:
        print(f"Error fetching {page}: {e}")

print(f"\n--- AUDIT RESULTS ---")
if not all_no_slash_links:
    print("SUCCESS: 0 internal links without trailing slash found across key pages!")
else:
    print(f"FOUND {len(all_no_slash_links)} links without trailing slash:")
    for src, lnk in all_no_slash_links:
        print(f"  Source: {src} -> Link: {lnk}")
