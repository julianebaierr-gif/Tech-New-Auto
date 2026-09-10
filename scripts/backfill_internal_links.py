import os
import re
import json
import glob

POSTS_DIR = os.path.join(os.getcwd(), "content", "posts")

def backfill_internal_links():
    files = glob.glob(os.path.join(POSTS_DIR, "*.json"))
    posts = []
    for f in files:
        with open(f, "r", encoding="utf-8") as fp:
            d = json.load(fp)
            slug = os.path.splitext(os.path.basename(f))[0]
            posts.append({
                "slug": slug,
                "filepath": f,
                "data": d
            })

    print(f"Total posts to process: {len(posts)}")

    updated_count = 0

    for item in posts:
        slug = item["slug"]
        d = item["data"]
        filepath = item["filepath"]
        content = d.get("content", "")

        # Strip existing injected link notes if rerun
        cleaned_content = re.sub(r'\s*<em>For further architectural context, see our analysis on <a href="[^"]+"[^>]*>.*?</a>\.</em>', '', content)

        paras = list(re.finditer(r'<p>([\s\S]*?)</p>', cleaned_content))
        if len(paras) < 4:
            continue

        curr_cat = (d.get("category") or "").lower()
        curr_tags = set(t.lower() for t in (d.get("tags") or []))
        curr_words = set(re.findall(r'\b[a-z]{4,}\b', (d.get("title") or "").lower()))

        scored_candidates = []
        for other in posts:
            if other["slug"] == slug:
                continue

            o_data = other["data"]
            score = 0
            if (o_data.get("category") or "").lower() == curr_cat:
                score += 5

            o_tags = set(t.lower() for t in (o_data.get("tags") or []))
            score += len(curr_tags.intersection(o_tags)) * 4

            o_words = set(re.findall(r'\b[a-z]{4,}\b', (o_data.get("title") or "").lower()))
            score += len(curr_words.intersection(o_words)) * 2

            if score > 0:
                scored_candidates.append((score, other["slug"], o_data.get("title", "")))

        scored_candidates.sort(key=lambda x: x[0], reverse=True)
        chosen = scored_candidates[:2]

        link_indices = []
        if len(paras) >= 6 and len(chosen) >= 2:
            link_indices = [(len(paras) // 3, chosen[0]), ((len(paras) * 2) // 3, chosen[1])]
        elif len(paras) >= 4 and len(chosen) >= 1:
            link_indices = [(len(paras) // 2, chosen[0])]

        new_content = cleaned_content
        for p_idx, target in link_indices:
            target_slug = target[1]
            target_title = target[2]
            p_match = paras[p_idx]
            p_text = p_match.group(1).rstrip()
            clean_title = re.sub(r'[\'"]', '', target_title).strip()
            link_note = f' <em>For further architectural context, see our analysis on <a href="/{target_slug}" class="text-blue-600 font-semibold hover:underline">{clean_title}</a>.</em>'
            new_content = new_content.replace(p_match.group(0), f'<p>{p_text}{link_note}</p>', 1)

        d["content"] = new_content

        with open(filepath, "w", encoding="utf-8") as out_fp:
            json.dump(d, out_fp, indent=2)

        updated_count += 1

    print(f"Successfully backfilled internal links for {updated_count} articles.")

if __name__ == "__main__":
    backfill_internal_links()
