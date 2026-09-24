import os
import glob
import re
from urllib.parse import urlparse

OUT_DIR = os.path.join(os.getcwd(), "out")
if not os.path.exists(OUT_DIR):
    print("out/ directory does not exist")
    exit(1)

html_files = glob.glob(os.path.join(OUT_DIR, "**", "*.html"), recursive=True)
print(f"Total generated HTML files: {len(html_files)}")

issues = []

for hf in html_files:
    rel_path = os.path.relpath(hf, OUT_DIR)
    with open(hf, "r", encoding="utf-8") as f:
        html = f.read()

    # Find all hrefs
    links = re.findall(r'href=["\']([^"\']+)["\']', html)
    for link in links:
        if link.startswith("/") or "compors.com" in link:
            clean_link = link.split("#")[0].split("?")[0]
            parsed = urlparse(clean_link)
            path = parsed.path
            if path and not path.endswith("/"):
                last_segment = path.split("/")[-1]
                if "." not in last_segment:
                    issues.append((rel_path, link))

    # Also check JSON-LD schemas
    schemas = re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', html)
    for s in schemas:
        urls = re.findall(r'"url"\s*:\s*"([^"]+)"', s)
        for u in urls:
            if "compors.com" in u:
                clean_u = u.split("#")[0].split("?")[0]
                p = urlparse(clean_u).path
                if p and not p.endswith("/"):
                    last = p.split("/")[-1]
                    if "." not in last:
                        issues.append((rel_path, f"[JSON-LD] {u}"))

if not issues:
    print("\nSUCCESS! ZERO internal links or schemas without trailing slash found across all HTML files!")
else:
    print(f"\nFOUND {len(issues)} issues:")
    for file, lnk in issues[:20]:
        print(f"  {file} -> {lnk}")
