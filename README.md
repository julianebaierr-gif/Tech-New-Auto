# TechPulse (Tech-New-Auto) 🚀

Autonomous AI-driven technology publication engine built with **Next.js (App Router)**, **Tailwind CSS**, **Google Gemini**, **Google Sheets**, and **Unsplash API**, scheduled via **GitHub Actions** every 4 hours and continuously deployed on **Vercel**.

---

## 🌟 Key Features

1. **Modern Tech Design System**:
   - Sleek dark aesthetic with cyan / neon accents tailored for deep tech coverage.
   - Fully responsive, mobile-optimized navigation, reading view, and footer.
   - Clean typographic hierarchy with dedicated code, blockquote, and list stylings.

2. **Core Pages Included**:
   - / - **Home**: Dynamic hero, featured headline, latest dispatches, and architecture highlights.
   - /blog - **Articles Archive**: Complete paginated/filtered library of generated stories.
   - /blog/[slug] - **Full Article Reader**: Dedicated reading experience with metadata, author badge, and tags.
   - /about - **About Us**: Detailed explanation of the autonomous data pipeline, mission, and quality standards.
   - /contact - **Contact Us**: Interactive contact form with editorial ticket categories.
   - /privacy-policy - **Privacy Policy**: GDPR/CCPA compliant privacy declaration.
   - /terms - **Terms & Conditions**: AI-generated content disclaimer and acceptable use guidelines.

3. **Autonomous 4-Hour GitHub Actions Automation (.github/workflows/auto-publish.yml)**:
   - **Google Sheets Sync**: Fetches queued keywords, target categories, and tags.
   - **Google Gemini Engine (gemini-2.5-flash)**: Researches and generates in-depth, structured, SEO-rich tech articles.
   - **Unsplash API**: Pulls high-resolution contextual cover imagery.
   - **Auto Commit & Push**: Commits new articles directly into content/posts/.
   - **Vercel Auto-Deploy**: Automatically triggers production deployment on new commits.

---

## ⚙️ Setup & Configuration

### 1. GitHub Secrets Configuration
In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add the following repository secrets:

| Secret Name | Description | Mandatory? |
|-------------|-------------|------------|
| GEMINI_API_KEY | Google Gemini API key for article generation. | **Yes** (Fallback sample generator runs if missing) |
| UNSPLASH_ACCESS_KEY | Unsplash Developer Access Key for photos. | No (Curated tech fallback used if omitted) |
| GOOGLE_SHEET_CSV_URL | Public CSV export URL of your Google Sheet. | Optional (Quickest sheet setup) |
| GOOGLE_SHEET_ID | Google Sheet Document ID (if using Service Account). | Optional |
| GOOGLE_SERVICE_ACCOUNT_JSON | Service Account JSON string for 2-way read/write. | Optional |

#### Quick Google Sheet Setup (Recommended):
Create a Google Sheet with headers:
`csv
Keyword,Category,Tags,Status
Quantum Computing in 2026,Hardware,Quantum,Pending
Agentic AI Systems,Artificial Intelligence,AI,Pending
WebAssembly for Cloud Native,Software Engineering,Cloud,Pending
`
Then go to **File > Share > Publish to web > Select Sheet1 > Comma-separated values (.csv)** and paste the link into GOOGLE_SHEET_CSV_URL.

---

## 🚀 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New... > Project**.
3. Import your GitHub repository: julianebaierr-gif/Tech-New-Auto.
4. Keep the default Next.js framework preset.
5. Click **Deploy**.
6. Every time GitHub Actions commits a new post every 4 hours, Vercel will rebuild and publish automatically!

---

## 💻 Local Development

`ash
# Install dependencies
npm install

# Run dev server
npm run dev

# Test autonomous publisher script locally
python scripts/auto_publisher.py

# Build for production
npm run build
`
