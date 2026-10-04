import os
import re
import json
import argparse

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
POSTS_DIR = os.path.join(REPO_ROOT, "content", "posts")
IMAGES_DIR = os.path.join(REPO_ROOT, "public", "images", "posts")

def build_editorial_prompt(title, keyword, category):
    """
    Constructs a photorealistic, ultra-high-definition 16:9 visual prompt
    specifically designed for enterprise tech publications.
    """
    domain_contexts = {
        "Cybersecurity": "high-security data center operations room, server racks with glowing cyan security indicators, holographic zero-trust network topology dashboard, encrypted data stream visualization",
        "Cloud Computing": "modern enterprise cloud infrastructure server room, fiber-optic patch panels, dynamic telemetry dashboards, distributed cluster monitoring lights",
        "Artificial Intelligence": "futuristic neural compute cluster, tensor processing units, matrix multiplication visual overlays, sleek glass server enclosures with neon amber and teal accent lights",
        "Hardware & Semiconductors": "silicon wafer fabrication cleanroom, microscopic macro photo of advanced nanometer die architecture, glowing circuit traces, precision microchip packaging",
        "Software Engineering": "high-end dual-monitor software engineering workstation, dark-mode terminal interfaces, distributed microservices trace diagrams, clean ergonomic studio lighting",
        "Web Development": "modern full-stack developer architecture environment, responsive UI wireframe holograms, edge CDN latency graphs on sleek ultrawide monitors",
    }
    
    context = domain_contexts.get(category, "advanced enterprise server architecture and digital computing infrastructure")
    prompt = (
        f"A high-end editorial tech visualization for '{title}': {context}, "
        f"focusing on {keyword}. Cinematic studio lighting, ultra-detailed 8k resolution, "
        f"sleek corporate technology aesthetic, 16:9 widescreen aspect ratio, no watermarks, professional tech journal photography."
    )
    return prompt

def audit_all_post_images():
    """Audits which posts have local AI images vs external stock URLs."""
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR, exist_ok=True)

    posts = [f for f in os.listdir(POSTS_DIR) if f.endswith(".json")]
    report = []
    local_count = 0
    external_count = 0

    for pf in sorted(posts):
        slug = pf.replace(".json", "")
        with open(os.path.join(POSTS_DIR, pf), "r", encoding="utf-8") as f:
            data = json.load(f)
        
        cover = data.get("coverImage", "")
        is_local = cover.startswith("/images/posts/")
        if is_local:
            local_count += 1
        else:
            external_count += 1

        prompt = build_editorial_prompt(data.get("title", ""), data.get("target_keyword", ""), data.get("category", ""))
        report.append({
            "slug": slug,
            "title": data.get("title"),
            "is_local": is_local,
            "coverImage": cover,
            "recommended_prompt": prompt
        })

    print(f"\n=== COMPORS IMAGE SYSTEM AUDIT ===")
    print(f"Total Posts: {len(posts)}")
    print(f"Local AI Images: {local_count}")
    print(f"External Stock Images: {external_count}")
    return report

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Com Pors AI Image System")
    parser.add_argument("--slug", help="Slug of the post to generate an AI image prompt for")
    parser.add_argument("--audit", action="store_true", help="Audit all post images across the site")
    args = parser.parse_args()

    if args.slug:
        post_path = os.path.join(POSTS_DIR, f"{args.slug}.json")
        if os.path.exists(post_path):
            with open(post_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            prompt = build_editorial_prompt(data.get("title", ""), data.get("target_keyword", ""), data.get("category", ""))
            print(f"\n[POST]: {data.get('title')}")
            print(f"[CURRENT COVER]: {data.get('coverImage')}")
            print(f"\n[GENERATED AI PROMPT]:\n{prompt}\n")
        else:
            print(f"Error: Post '{args.slug}.json' not found.")
    else:
        audit_all_post_images()
