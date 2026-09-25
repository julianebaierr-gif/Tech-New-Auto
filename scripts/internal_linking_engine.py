import os
import re
import json
from typing import List, Dict, Any, Optional

def get_all_published_posts(posts_dir: str) -> List[Dict[str, Any]]:
    """
    Scans the content/posts directory and extracts metadata from all published articles.
    """
    posts = []
    if not os.path.exists(posts_dir):
        return posts

    for fname in os.listdir(posts_dir):
        if fname.endswith(".json"):
            fpath = os.path.join(posts_dir, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as fp:
                    data = json.load(fp)
                    slug = fname.replace(".json", "")
                    posts.append({
                        "slug": slug,
                        "title": data.get("title", "").strip(),
                        "target_keyword": data.get("target_keyword", "").strip(),
                        "category": data.get("category", "").strip(),
                        "tags": data.get("tags", []),
                        "file_path": fpath
                    })
            except Exception:
                pass
    return posts


def find_relevant_internal_posts(
    target_keyword: str,
    category: str,
    all_posts: List[Dict[str, Any]],
    current_slug: Optional[str] = None,
    top_n: int = 4
) -> List[Dict[str, Any]]:
    """
    Finds the most contextually relevant internal articles from all published posts.
    Scores based on keyword token overlap, category alignment, and tag similarity.
    """
    stop_words = {"what", "is", "an", "the", "in", "and", "or", "for", "with", "how", "to", "vs", "a", "of", "on"}
    kw_tokens = set(re.findall(r'\b[a-zA-Z]{3,}\b', target_keyword.lower())) - stop_words

    scored_posts = []
    for p in all_posts:
        if current_slug and p["slug"].lower() == current_slug.lower():
            continue

        score = 0
        p_text = f"{p['title']} {p['target_keyword']} {' '.join(p['tags'])}".lower()
        p_tokens = set(re.findall(r'\b[a-zA-Z]{3,}\b', p_text)) - stop_words

        # Category match gives strong baseline relevance (builds Google topical cluster / silo)
        if category and p.get("category") and p["category"].lower() == category.lower():
            score += 25

        # Direct token matches between keywords/topics
        overlap = kw_tokens.intersection(p_tokens)
        score += len(overlap) * 8

        # Target keyword partial phrase match
        if p.get("target_keyword") and any(t in p["target_keyword"].lower() for t in kw_tokens):
            score += 5

        # Check tag overlap
        p_tags_tokens = set(re.findall(r'\b[a-zA-Z]{3,}\b', ' '.join(p.get("tags", [])).lower()))
        tag_overlap = kw_tokens.intersection(p_tags_tokens)
        score += len(tag_overlap) * 4

        scored_posts.append((score, p))

    # Sort descending by relevance score
    scored_posts.sort(key=lambda x: x[0], reverse=True)

    # Pick top_n distinct posts
    selected = [item[1] for item in scored_posts[:top_n] if item[0] > 0]

    # Fallback: if fewer than top_n matches, add any posts from same or related categories
    if len(selected) < top_n:
        seen_slugs = {p["slug"] for p in selected}
        for item in scored_posts:
            p = item[1]
            if p["slug"] not in seen_slugs and (not current_slug or p["slug"] != current_slug):
                selected.append(p)
                seen_slugs.add(p["slug"])
            if len(selected) >= top_n:
                break

    return selected


def format_internal_links_prompt(relevant_posts: List[Dict[str, Any]]) -> str:
    """
    Generates structured prompt instructions for Gemini to weave 2-3 internal links naturally.
    """
    if not relevant_posts:
        return ""

    lines = []
    for idx, p in enumerate(relevant_posts[:4], 1):
        slug = p["slug"].strip("/")
        kw = p.get("target_keyword") or p.get("title")
        lines.append(f"  {idx}. Title: \"{p['title']}\" | Target Link: `/{slug}/` | Context/Anchor Concept: \"{kw}\"")

    post_list_str = "\n".join(lines)

    return f"""
MANDATORY CONTEXTUAL INTERNAL LINKING (STRICTLY 2 TO 3 INTERNAL LINKS):
- You MUST naturally weave 2 to 3 internal links to the following relevant Com Pors articles into the body text:
{post_list_str}
- The anchor text MUST be natural, descriptive, and seamlessly part of the sentence (e.g. `<a href="/{relevant_posts[0]['slug'].strip('/')}/" class="text-blue-600 font-semibold hover:underline">anchor text</a>`).
- NEVER create bullet lists of links or robotic 'See also' sections. Integrate them directly into the discussion of related architecture or security topics.
- Every link MUST use the exact relative URL path starting and ending with a forward slash (e.g. `/{relevant_posts[0]['slug'].strip('/')}/`).
"""


def count_internal_post_links(html_content: str) -> List[str]:
    """
    Counts existing in-content links pointing to other blog posts (excluding static pages).
    """
    links = re.findall(r'href=["\'](/[^"\'#]+/)["\']', html_content)
    static_paths = {"/category/", "/about/", "/contact/", "/terms/", "/privacy-policy/", "/author/"}
    return [l for l in links if not any(l.startswith(sp) for sp in static_paths)]


def inject_internal_links_if_missing(
    html_content: str,
    relevant_posts: List[Dict[str, Any]],
    min_links: int = 2,
    max_links: int = 3
) -> str:
    """
    Safety net ensuring every published article has at least 2 natural internal links.
    Finds matching concepts in paragraphs or smoothly weaves a contextual link.
    """
    existing_links = count_internal_post_links(html_content)
    if len(existing_links) >= min_links:
        return html_content

    needed = min_links - len(existing_links)
    existing_slugs = {l.strip("/").lower() for l in existing_links}

    # Candidate posts not yet linked
    candidates = [p for p in relevant_posts if p["slug"].lower() not in existing_slugs]
    if not candidates:
        return html_content

    modified_html = html_content

    # Strategy A: Find exact or near-exact target keyword mentions in paragraphs that are NOT already inside <a> tags
    for post in candidates:
        if needed <= 0:
            break

        slug = post["slug"].strip("/")
        link_url = f"/{slug}/"
        kw = post.get("target_keyword", "").strip()
        if not kw:
            continue

        # Look for target keyword in a paragraph that doesn't already contain a link
        kw_pattern = rf'(?<![">])\b({re.escape(kw)})\b(?![^<]*>)'
        match = re.search(kw_pattern, modified_html, re.IGNORECASE)
        if match:
            anchor_html = f'<a href="{link_url}" class="text-blue-600 font-semibold hover:underline">{match.group(1)}</a>'
            modified_html = modified_html[:match.start()] + anchor_html + modified_html[match.end():]
            needed -= 1
            existing_slugs.add(slug.lower())

    # Strategy B: If still needed, seamlessly weave a natural contextual sentence into suitable paragraphs
    if needed > 0:
        paragraphs = list(re.finditer(r'<p>([\s\S]*?)</p>', modified_html))
        # Use paragraphs from middle or later sections (avoiding callout boxes or code)
        eligible_p = [p for p in paragraphs if "<a" not in p.group(0) and "<code" not in p.group(0)]

        for post in candidates:
            if needed <= 0 or not eligible_p:
                break
            slug = post["slug"].strip("/")
            if slug.lower() in existing_slugs:
                continue

            link_url = f"/{slug}/"
            kw = post.get("target_keyword") or post.get("title")

            # Choose an eligible paragraph (e.g. from the middle)
            target_p = eligible_p.pop(len(eligible_p) // 2 if len(eligible_p) > 1 else 0)
            original_p_text = target_p.group(1).rstrip()

            # Smooth natural contextual extension
            natural_additions = [
                f' Teams evaluating these requirements can review our architectural breakdown of <a href="{link_url}" class="text-blue-600 font-semibold hover:underline">{kw}</a> to align their implementation with industry benchmarks.',
                f' For broader system context, explore our analysis covering <a href="{link_url}" class="text-blue-600 font-semibold hover:underline">{kw}</a> across distributed production environments.',
                f' Practitioners addressing similar challenges should also inspect our guidelines on <a href="{link_url}" class="text-blue-600 font-semibold hover:underline">{kw}</a> for proven deployment strategies.'
            ]
            import random
            addition = random.choice(natural_additions)
            new_p_tag = f'<p>{original_p_text}{addition}</p>'

            modified_html = modified_html.replace(target_p.group(0), new_p_tag, 1)
            needed -= 1
            existing_slugs.add(slug.lower())

    return modified_html
