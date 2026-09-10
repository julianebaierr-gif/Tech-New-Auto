import os
import re
import json
import glob
import random

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

        # Strip any previous full-title link injections
        cleaned_content = re.sub(r'\s*<em>For further architectural context, see our analysis on <a href="[^"]+"[^>]*>.*?</a>\.</em>', '', content)
        # Strip any previous (explore our technical breakdown on ...) notes if re-run
        cleaned_content = re.sub(r'\s*\((?:explore our technical breakdown on|see also detailed insights on)\s+<a href="[^"]+"[^>]*>.*?</a>\)\.?', '.', cleaned_content)

        paras = list(re.finditer(r'<p>([\s\S]*?)</p>', cleaned_content))
        if len(paras) < 5:
            d["content"] = cleaned_content
            with open(filepath, "w", encoding="utf-8") as out_fp:
                json.dump(d, out_fp, indent=2)
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
                scored_candidates.append((score, other["slug"], o_data))

        scored_candidates.sort(key=lambda x: x[0], reverse=True)

        desired_count = random.choice([4, 5, 6])
        available_count = min(len(scored_candidates), desired_count)
        if available_count < 3:
            d["content"] = cleaned_content
            with open(filepath, "w", encoding="utf-8") as out_fp:
                json.dump(d, out_fp, indent=2)
            continue

        chosen = scored_candidates[:available_count]

        num_paras = len(paras)
        k = len(chosen)

        # Distribute links evenly across middle paragraphs
        step = (num_paras - 2) / (k + 1)
        link_indices = [int(1 + round(step * (i + 1))) for i in range(k)]

        unique_indices = []
        for idx in link_indices:
            clamped = min(max(1, idx), num_paras - 2)
            if clamped not in unique_indices:
                unique_indices.append(clamped)
            else:
                for offset in [1, -1, 2, -2]:
                    cand_idx = clamped + offset
                    if 1 <= cand_idx <= num_paras - 2 and cand_idx not in unique_indices:
                        unique_indices.append(cand_idx)
                        break

        sorted_indices = sorted(unique_indices)[:len(chosen)]

        new_content = cleaned_content
        for i, p_idx in enumerate(sorted_indices):
            target_slug = chosen[i][1]
            target_data = chosen[i][2]

            p_match = paras[p_idx]
            p_text = p_match.group(1)

            # Determine concise keyword phrase (target_keyword, primary tag, or top 2-3 words of title)
            cand_kw = target_data.get("target_keyword", "").strip()
            if not cand_kw and target_data.get("tags"):
                cand_kw = target_data["tags"][0]
            if not cand_kw:
                words = [w for w in target_data.get("title", "").split() if w.lower() not in ["the", "a", "an", "and", "or", "for", "to", "in", "of", "with", "how", "what", "top", "best"]]
                cand_kw = " ".join(words[:3]) if words else target_data.get("title", "")

            clean_kw_anchor = re.sub(r'[\'"]', '', cand_kw).strip()

            # Attempt natural replacement on exact technical keyword match
            replaced = False
            pattern = re.compile(rf'\b({re.escape(clean_kw_anchor)})\b(?![^<]*>|[^<>]*<\/a>)', re.IGNORECASE)
            if pattern.search(p_text):
                new_p_text = pattern.sub(rf'<a href="/{target_slug}" class="text-blue-600 font-semibold hover:underline">\1</a>', p_text, count=1)
                new_content = new_content.replace(p_match.group(0), f'<p>{new_p_text}</p>', 1)
                replaced = True
            else:
                first_tag = (target_data.get("tags") or [""])[0]
                if first_tag and len(first_tag) > 3:
                    tag_pat = re.compile(rf'\b({re.escape(first_tag)})\b(?![^<]*>|[^<>]*<\/a>)', re.IGNORECASE)
                    if tag_pat.search(p_text):
                        new_p_text = tag_pat.sub(rf'<a href="/{target_slug}" class="text-blue-600 font-semibold hover:underline">\1</a>', p_text, count=1)
                        new_content = new_content.replace(p_match.group(0), f'<p>{new_p_text}</p>', 1)
                        replaced = True

            # If no direct keyword match in paragraph, weave smoothly on concise keyword anchor
            if not replaced:
                natural_phrasing = random.choice([
                    f' (explore our technical breakdown on <a href="/{target_slug}" class="text-blue-600 font-semibold hover:underline">{clean_kw_anchor}</a>).',
                    f' (see also detailed insights on <a href="/{target_slug}" class="text-blue-600 font-semibold hover:underline">{clean_kw_anchor}</a>).'
                ])
                if p_text.rstrip().endswith('.'):
                    new_p_text = p_text.rstrip()[:-1] + natural_phrasing
                else:
                    new_p_text = p_text.rstrip() + natural_phrasing
                new_content = new_content.replace(p_match.group(0), f'<p>{new_p_text}</p>', 1)

        d["content"] = new_content

        with open(filepath, "w", encoding="utf-8") as out_fp:
            json.dump(d, out_fp, indent=2)

        updated_count += 1

    print(f"Successfully processed and updated internal links for {updated_count} articles.")

if __name__ == "__main__":
    backfill_internal_links()
