# Changelog & Version History — Saurav Bhusal Portfolio

All notable changes, milestones, and design iterations for **Saurav Bhusal's 3D Interactive Developer & UI/UX Portfolio** are tracked in this file and via Git tags.

---

## [v2.0.0] — 2026-11-03 (Current Release — Multi-Page 3D Interactive + UI/UX Pro Max Upgrade)

### Added
- **5-Page Modular Architecture:**
  - `index.html` — Split-screen Hero with actual portrait cutout, neon rim ring, floating 3D polyhedra, `developer.config.ts` glass code card, 3 Featured Projects (`SwasthyaSutra`, `KeyFlow`, `E-Government Platform`), 4-column Creative Philosophy Bento, 4 Services Preview cards, and Closing CTA.
  - `about.html` — Personal story, `Caveat` handwritten signature, 4 interactive Skill & Technology categories, 3 genuine Achievements (**First Runner-Up — Web Design Hackathon 2026 at NIT LEGEND**, **UX/UI Design Competition 2025**, **Harvard CS50x Certificate**), and Vision statement.
  - `projects.html` — Interactive category filter system (`All Projects`, `Web Development`, `UI/UX Design`, `AI & Automation`, `Graphic Design`), 7 complete project cards, and expandable Case-Study Modal (`js/projects.js`).
  - `services.html` — 4 comprehensive freelance service sections (`Web Development`, `UI/UX Design`, `AI Automation`, `Graphic Design`) with dedicated CTAs + 4-step **Our Working Process** timeline.
  - `contact.html` — Verified **Upwork** and **Freelancer.com** cards, **GitHub**, **LinkedIn**, and **Portfolio** links, plus accessible validated project inquiry form (`js/contact.js`).
- **3D WebGL & Motion Engine:**
  - Full-viewport Three.js scene (`js/three-scene.js`) with wireframe icosahedron, translucent core, cyan orbital torus ring, and 3D particle starfield.
  - Synchronized Lenis smooth scrolling + GSAP ScrollTrigger reveals (`js/animations.js`), 3D card tilt, magnetic buttons, and radial cursor glare.
- **UI/UX Pro Max Design System Polish:**
  - Persisted master design system in `design-system/saurav-bhusal-portfolio/MASTER.md` and workspace skill in `.agents/skills/ui-ux-pro-max/`.
  - Multi-layered specular glassmorphism (`inset` rim highlights), 8dp spacing tokens, `text-wrap: balance` on headings, 44px minimum touch targets, `scroll-padding-top` focus clearance, modal `Tab` focus trapping, and focusable `role="alert"` form error summary.
- **SEO & Supporting Files:**
  - Added `404.html`, `sitemap.xml`, `robots.txt`, printable CV (`assets/documents/Saurav-Bhusal-CV.html`), and automated QA script (`scripts/qa-verify.mjs`).

---

## [v1.0.0] — Initial Single-Page Portfolio Baseline (Archived Snapshot from `portfolio/1`)

### Added
- Original single-page portfolio layout (`index.html`, `css/styles.css`, `js/main.js`, `js/demos.js`) with interactive demos and initial asset collection (`assets/img/`, `assets/design/`).
