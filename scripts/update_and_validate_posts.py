import glob
import json
import os
import re

POSTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'content', 'posts')

UPDATES = {
    'architecting-a-secure-remote-desktop-connection.json': {
        'title': 'Architecting a Secure Remote Desktop Connection',
        'excerpt': 'Configuring an enterprise remote desktop connection requires hardened TLS tunnels, multi-factor authentication, and strict packet latency controls.'
    },
    'architecting-ai-resume-builder-free.json': {
        'title': 'Architecting an AI Resume Builder Free in Production',
        'excerpt': 'Evaluating an ai resume builder free requires assessing parsing accuracy, template schemas, and ATS compatibility for software engineering candidates.'
    },
    'architecting-business-technology-solutions.json': {
        'title': 'Architecting Business Technology Solutions in Cloud IT',
        'excerpt': 'Business technology solutions enhance enterprise operations through high-throughput cloud stacks, microservices, and reliable distributed databases.'
    },
    'architecting-scalable-systems-chat-with-ai.json': {
        'title': 'Architecting Scalable Systems That Chat With AI',
        'excerpt': 'Deploying real-time chat with ai interfaces requires low-latency websocket channels, scalable model routing, and strict state management across users.'
    },
    'architecting-silicon-era-technology-1980s.json': {
        'title': 'Architecting the Silicon Era: Technology of the 1980s',
        'excerpt': 'Analyzing the technology of the 1980s reveals foundational microprocessor breakthroughs, CMOS scaling limits, and early enterprise networking architectures.'
    },
    'architecting-systems-ai-writing-tools-updates.json': {
        'title': 'Architecting Systems for AI Writing Tools Updates',
        'excerpt': 'Tracking ai writing tools updates 2026 reveals key benchmarks across language generation quality, context window expansion, and latency optimizations.'
    },
    'architectural-realities-when-you-check-wifi-speed.json': {
        'title': 'Architectural Realities When You Check Wifi Speed',
        'excerpt': 'When you check wifi speed on enterprise networks, packet loss, channel interference, and bufferbloat dictate real user throughput beyond raw bandwidth.'
    },
    'chip-industry-updates-today-manufacturing-realities.json': {
        'title': 'Chip Industry Updates Today: Manufacturing Realities',
        'excerpt': 'Current chip industry updates today highlight extreme ultraviolet lithography, fab capacity limits, and packaging breakthroughs across global foundries.'
    },
    'demystifying-what-is-a-neural-network.json': {
        'title': 'What Is a Neural Network in Systems',
        'excerpt': 'Understanding what is a neural network requires analyzing multilayer perceptrons, backpropagation gradients, and activation functions in live inference.'
    },
    'engineering-managed-technology-services-infrastructure.json': {
        'title': 'Managed Technology Services in Scalable Organizations',
        'excerpt': 'Managed technology services deliver round-the-clock monitoring, outsourced cloud management, and proactive enterprise cybersecurity defense mechanisms.'
    },
    'engineering-realities-behind-ai-detector-turnitin.json': {
        'title': 'Engineering Realities Behind the AI Detector Turnitin',
        'excerpt': 'Evaluating an ai detector turnitin model requires reviewing perplexity metrics, burstiness heuristics, and false positive rates in enterprise grading.'
    },
    'engineering-resilient-enterprise-cyber-security-solutions.json': {
        'title': 'Resilient Enterprise Cyber Security Solutions',
        'excerpt': 'Deploying cyber security solutions across distributed infrastructure demands zero-trust architecture, endpoint isolation, and automated incident response.'
    },
    'evaluating-best-ai-apps-for-modern-software-work.json': {
        'title': 'Evaluating Best AI Apps for Software Engineering',
        'excerpt': 'Selecting the best ai apps requires benchmarking context retention, local inference privacy, and developer productivity gains across production tasks.'
    },
    'evaluating-modern-ai-generator-free-tools-in-systems.json': {
        'title': 'Evaluating AI Generator Free Tools in Systems',
        'excerpt': 'Assessing an ai generator free ecosystem requires balancing token rate limits, prompt caching costs, and license compliance across open source models.'
    },
    'evaluating-modern-character-ai-alternatives.json': {
        'title': 'Evaluating Top Character AI Alternatives',
        'excerpt': 'Benchmarking top character ai alternatives reveals significant variations in persona fidelity, memory persistence, safety filters, and response latency.'
    },
    'evaluating-the-true-practical-chatgpt-plus-cost.json': {
        'title': 'Evaluating the True Practical ChatGPT Plus Cost',
        'excerpt': 'Analyzing real-world chatgpt plus cost involves measuring token consumption quotas, productivity dividends, and enterprise privacy trade-offs for teams.'
    },
    'grammarly-ai-detector-architectural-analysis.json': {
        'title': 'Grammarly AI Detector: How Classifiers Score Text',
        'excerpt': 'The grammarly ai detector uses statistical classifiers to flag synthetic text. We examine detector accuracy thresholds and false positive rates in testing.'
    },
    'granular-recovery-technology-in-enterprise-systems.json': {
        'title': 'Granular Recovery Technology in Enterprise Systems',
        'excerpt': 'Implementing granular recovery technology allows IT teams to restore single application items from disk images without mounting entire monolithic backups.'
    },
    'instructional-technology-services-modern-enterprise-it.json': {
        'title': 'Instructional Technology Services in Enterprise IT',
        'excerpt': 'Deploying instructional technology services requires integrating LMS platforms, SCORM standards, and accessibility compliance for hybrid workforce learning.'
    },
    'modem-vs-router-architecture-networking.json': {
        'title': 'Modem vs Router: Core Architecture and Networking',
        'excerpt': 'Evaluating modem vs router differences requires analyzing OSI layer boundaries, IP routing tables, signal modulation, and local network packet switching.'
    },
    'modern-technology-information-management-systems.json': {
        'title': 'Technology Information Management in Systems',
        'excerpt': 'Technology information management governs data integrity, schema catalogs, and access permissions across distributed enterprise computing environments.'
    },
    'optimizing-modern-data-center-solutions-for-scale.json': {
        'title': 'Optimizing Data Center Solutions for Scale',
        'excerpt': 'Scaling data center solutions requires high-efficiency power distribution units, liquid cooling loops, and high-density leaf-spine network topologies.'
    },
    'quantum-computing-applications-in-modern-enterprise-it.json': {
        'title': 'Quantum Computing Applications in Enterprise IT',
        'excerpt': 'Evaluating quantum computing applications reveals promising breakthroughs in lattice cryptography, portfolio optimization, and complex molecular simulation.'
    },
    'scaling-remote-infrastructure-with-google-remote-desktop.json': {
        'title': 'Scaling Systems with Google Remote Desktop',
        'excerpt': 'Running google remote desktop across corporate fleets demands WebRTC performance tuning, credential isolation, and strict network perimeter security rules.'
    },
    'scaling-systems-with-a-technology-solutions-professional.json': {
        'title': 'Systems with a Technology Solutions Professional',
        'excerpt': 'Hiring a technology solutions professional ensures direct alignment between business objectives, cloud microservices, and enterprise automation workflows.'
    },
    'scaling-systems-with-people-process-technology.json': {
        'title': 'Systems with the People Process Technology Model',
        'excerpt': 'The people process technology framework balances engineering talent, deployment agility, and infrastructure automation to eliminate organizational waste.'
    },
    'sora-app-invite-codes-architecture-and-access-reality.json': {
        'title': 'Sora App Invite Codes: Architecture and Access Reality',
        'excerpt': 'Managing sora app invite codes requires analyzing cryptographic token verification, anti-scraping controls, and rate-limited user provisioning systems.'
    },
    'the-role-of-an-information-technology-specialist.json': {
        'title': 'The Role of an Information Technology Specialist',
        'excerpt': 'An information technology specialist engineers scalable network infrastructure, enforces enterprise cybersecurity, and automates server deployments today.'
    },
    'understanding-what-is-an-algorithm-in-software-design.json': {
        'title': 'Understanding What Is An Algorithm in Software Design',
        'excerpt': 'Learning what is an algorithm involves analyzing time complexity Big-O notation, data structure traversal, and computational efficiency in software systems.'
    },
    'understanding-what-is-ram-and-system-performance.json': {
        'title': 'Understanding What Is RAM and System Performance',
        'excerpt': 'Analyzing what is ram requires evaluating memory bus bandwidth, DDR5 CAS latency, and virtual paging mechanics across high-speed computer motherboards.'
    },
    'what-is-malware-architecture-threats-defense.json': {
        'title': 'What Is Malware: Architecture, Threats, and Defense',
        'excerpt': 'Understanding what is malware requires dissecting polymorphic payloads, memory injection techniques, and zero-day defense mechanisms across enterprise IT.'
    }
}

BANNED_WORDS = [
    'modern', 'adopting', 'adopt', 'adopts', 'discover', 'explore', 'uncover',
    'dive into', 'delve', 'delving', 'pipeline', 'pipelines', 'seamless', 'robust',
    'game-changer', 'crucial', 'vital', 'beacon', 'pivotal', 'tapestry', 'testament',
    'ultimate', 'comprehensive', 'deep dive', 'demystifying', 'unpacking', 'navigating',
    'fast-paced', 'foster', 'embark', 'realm', 'moreover', 'furthermore', 'at its core'
]

def main():
    posts = sorted(glob.glob(os.path.join(POSTS_DIR, '*.json')))
    print(f"Total post files found: {len(posts)}")
    assert len(posts) == len(UPDATES), f"Mismatch: {len(posts)} posts vs {len(UPDATES)} updates"

    errors = []
    excerpts = []

    for p in posts:
        fn = os.path.basename(p)
        if fn not in UPDATES:
            errors.append(f"Missing update mapping for {fn}")
            continue

        with open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)

        kw = (data.get('target_keyword') or '').strip()
        new_title = UPDATES[fn]['title'].strip()
        new_excerpt = UPDATES[fn]['excerpt'].strip()
        excerpts.append(new_excerpt)

        # 1. Target keyword check
        if kw.lower() not in new_excerpt.lower():
            errors.append(f"[{fn}] Keyword '{kw}' is NOT in excerpt!")

        # 2. Excerpt length check (135 - 158)
        if not (135 <= len(new_excerpt) <= 158):
            errors.append(f"[{fn}] Excerpt length {len(new_excerpt)} out of range [135, 158]!")

        # 3. Title length check (<= 54)
        if len(new_title) > 54:
            errors.append(f"[{fn}] Title length {len(new_title)} > 54 chars!")

        # 4. Banned words check
        for bw in BANNED_WORDS:
            if re.search(r'\b' + re.escape(bw) + r'\b', new_excerpt, re.IGNORECASE):
                errors.append(f"[{fn}] Banned word '{bw}' found in excerpt: '{new_excerpt}'")
            if re.search(r'\b' + re.escape(bw) + r'\b', new_title, re.IGNORECASE):
                errors.append(f"[{fn}] Banned word '{bw}' found in title: '{new_title}'")

    if len(set(excerpts)) != len(excerpts):
        errors.append("Duplicate excerpts found!")

    if errors:
        print("VALIDATION FAILED WITH ERRORS:")
        for err in errors:
            print(f"  - {err}")
        return False

    print("VALIDATION PASSED! Applying updates to all 31 post JSON files...")
    for p in posts:
        fn = os.path.basename(p)
        with open(p, 'r', encoding='utf-8') as f:
            data = json.load(f)

        data['title'] = UPDATES[fn]['title'].strip()
        data['excerpt'] = UPDATES[fn]['excerpt'].strip()

        with open(p, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write('\n')

    print("All 31 posts updated successfully!")
    return True

if __name__ == '__main__':
    success = main()
    if not success:
        exit(1)
