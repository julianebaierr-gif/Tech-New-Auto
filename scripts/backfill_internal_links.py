import os
import re
import json
import glob

POSTS_DIR = os.path.join(os.getcwd(), "content", "posts")

def remove_all_in_content_internal_links():
    files = glob.glob(os.path.join(POSTS_DIR, "*.json"))
    print(f"Total posts to process: {len(files)}")
    cleaned_count = 0

    for f in files:
        with open(f, "r", encoding="utf-8") as fp:
            d = json.load(fp)

        content = d.get("content", "")
        original_content = content

        # 1. Remove previous full-title link injections
        content = re.sub(r'\s*<em>For further architectural context, see our analysis on <a href="[^"]+"[^>]*>.*?</a>\.</em>', '', content)

        # 2. Remove previous (see also detailed insights on ...) / (explore our technical breakdown on ...) notes
        content = re.sub(r'\s*\((?:explore our technical breakdown on|see also detailed insights on)\s+<a href="[^"]+"[^>]*>.*?</a>\)\.?', '.', content)

        # 3. Strip any internal links pointing to /<slug> but preserve the inner text
        # Relative internal links only: href="/..." (leaves authoritative external https:// links intact)
        content = re.sub(r'<a\s+[^>]*href=["\']/(?!blog/)[^"\']*["\'][^>]*>([\s\S]*?)</a>', r'\1', content)
        content = re.sub(r'<a\s+[^>]*href=["\']/blog/[^"\']*["\'][^>]*>([\s\S]*?)</a>', r'\1', content)

        # Clean duplicate periods or abnormal spaces
        content = re.sub(r'\.\.+', '.', content)
        content = re.sub(r'\s{2,}', ' ', content)

        if content != original_content:
            d["content"] = content
            with open(f, "w", encoding="utf-8") as fp:
                json.dump(d, fp, indent=2)
            cleaned_count += 1

    print(f"Successfully cleaned in-content internal links from {cleaned_count} articles.")

if __name__ == "__main__":
    remove_all_in_content_internal_links()
