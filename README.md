# Saurav Bhusal — 3D Interactive Developer & UI/UX Design Portfolio

**DESIGN • DEVELOP • INNOVATE**

A production-ready, multi-page 3D interactive portfolio website built for **Saurav Bhusal** (Creative Web Developer | UI/UX Designer | AI Automation Enthusiast).

---

## 1. Project Architecture

```text
portfolio/
├── index.html                  # Page 1: Homepage (Hero, Featured Projects, Philosophy Bento, Services Preview, CTA)
├── about.html                  # Page 2: About Me, Interactive Skills Categories, Genuine Achievements & Vision
├── projects.html               # Page 3: Project Portfolio (Category Filters, 7 Projects, Expandable Case-Study Modal)
├── services.html               # Page 4: Freelance Services (4 Detailed Service Sections + 4-Step Working Process)
├── contact.html                # Page 5: Contact & Hire Me (Upwork, Freelancer.com, Professional Links, Validated Form)
├── 404.html                    # Custom 404 Error Page
├── sitemap.xml                 # SEO XML Sitemap
├── robots.txt                  # Search Crawler Directives
│
├── assets/
│   ├── images/                 # Portrait assets (saurav-cutout.png, saurav-portrait.jpg)
│   ├── projects/               # Project screenshots & SVG design artifacts
│   ├── icons/                  # Custom 3D prism favicon.svg
│   ├── certificates/           # Folder for optional certificate image uploads
│   └── documents/              # Printable / downloadable CV (Saurav-Bhusal-CV.html)
│
├── css/
│   ├── style.css               # Shared design tokens, glassmorphism, layout & components
│   ├── animations.css          # Keyframes, floating motion, tilt & prefers-reduced-motion rules
│   └── responsive.css          # Mobile, tablet & desktop breakpoints + mobile navigation drawer
│
├── js/
│   ├── main.js                 # App initialization & Lucide icon rendering
│   ├── navigation.js           # Active page detection, mobile drawer & scroll progress bar
│   ├── three-scene.js          # Fixed full-viewport Three.js WebGL background (icosahedron + particles)
│   ├── animations.js           # Synchronized Lenis + GSAP ScrollTrigger reveals, 3D tilt & magnetic buttons
│   ├── projects.js             # Category filtering, URL deep-linking & interactive case-study modal
│   └── contact.js              # Accessible form validation, Formspree/Web3Forms integration & mailto fallback
│
└── README.md                   # Setup, configuration & deployment documentation
```

---

## 2. Local Development Instructions

Because this project uses standard semantic HTML5, modular CSS, and ES6+ JavaScript, no complex build step is required to run it locally.

### Option A: Using Python HTTP Server
```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option B: Using Node.js `npx serve`
```bash
npx serve . -l 8080
```

### Option C: VS Code Live Server
Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 3. Deploying to GitHub Pages

1. Initialize or push this directory to your GitHub repository (e.g., `saurav-96.github.io` or a dedicated repository):
   ```bash
   git init
   git add .
   git commit -m "Build multi-page 3D interactive portfolio"
   git branch -M main
   git remote add origin https://github.com/saurav-96/<your-repo-name>.git
   git push -u origin main
   ```
2. Open your repository on GitHub → **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, select `main` and `/ (root)`, and click **Save**.
4. Your site will be live within 1–2 minutes, with `404.html`, `sitemap.xml`, and `robots.txt` automatically served.

---

## 4. External Services & Assets Configuration Checklist

### Contact Form Serverless Backend (`js/contact.js`)
By default, the contact form validates all fields and provides a zero-failure **Direct Email Client Dispatch + One-Click Copy Brief** fallback. To enable automatic background email delivery:
1. Create a free form endpoint at [Formspree](https://formspree.io/) or get an access key from [Web3Forms](https://web3forms.com/).
2. Open `js/contact.js` and paste your endpoint or key into `CONTACT_CONFIG`:
   ```js
   const CONTACT_CONFIG = {
     formspreeEndpoint: 'https://formspree.io/f/your_form_id',
     web3FormsAccessKey: '',
     recipientEmail: 'sauravbhusal369@gmail.com',
     upworkUrl: 'https://www.upwork.com/freelancers/~010a6e73c111779a15'
   };
   ```

### Optional Assets You Can Supply Later
- **Certificates (`assets/certificates/`):** The Harvard CS50x achievement currently links directly to your official verified certificate URL (`https://certificates.cs50.io/c95716f9-c771-4c7b-91b5-c0e45c322f56`). If you scan or export image copies of your **NIT LEGEND Web Design Hackathon 2026** or **UX/UI Design Competition 2025** certificates, place them in `assets/certificates/`.
- **PDF Resume (`assets/documents/`):** A print-optimized HTML CV is included at `assets/documents/Saurav-Bhusal-CV.html` (click "Print / Save as PDF" in any browser to save a PDF copy).
