# Changelog & Version History — Saurav Bhusal Portfolio

All notable changes, milestones, and design iterations for **Saurav Bhusal's 3D Interactive Developer & UI/UX Portfolio** are tracked in this file and via Git tags.

---

## [v2.6.0] — 2026-11-03 (Custom Avatar Logo, Fiverr Integration & Enhanced 3D Scroll Perspective)

### Added
- **Custom Illustrated Avatar Logo:**
  - Integrated Saurav's custom illustrated cyberpunk portrait (`assets/images/saurav-avatar-logo.jpg`) into a circular brand logo frame with cyan/purple/magenta neon gradient ring (`assets/images/saurav-logo.png`).
  - Updated high-resolution PNG & ICO favicons (`assets/icons/favicon.png`, `assets/icons/favicon.ico`).
- **Fiverr Account Integration:**
  - Added verified **Fiverr** profile card on `contact.html` with direct order link (`https://www.fiverr.com/sellers/saurav_bhusal`).
  - Added Fiverr links across all page footers, home credibility strip (`Upwork, Fiverr & Freelancer`), structured JSON-LD schema, and downloadable CV (`assets/documents/Saurav-Bhusal-CV.html`).
- **Dynamic 3D Background & Scroll-Triggered Perspective Fly-Ins:**
  - Upgraded Three.js background with direct mouse wheel momentum, dynamic camera flight depth along Z-axis, scroll velocity inertia, and warp starfield particle drift.
  - Upgraded GSAP ScrollTrigger reveals with 3D perspective depth (`perspective(1200px) rotateX(-16deg) translate3d(0, 52px, -85px) scale(0.92)`) smoothly unfurling into place as the user scrolls.

---

## [v2.5.0] — 2026-11-03 (Verified Credentials, 3D Component Motion & Custom Project Showcase)

### Added
- **Verified Credentials & Certifications Showcase (`about.html`):**
  - Added 6 authentic developer credentials with certificate IDs, dates, and direct verification links:
    1. First Runner-Up — Web Design Hackathon 2026 (NIT LEGEND & Mayor of Butwal Sub-Metropolitan City)
    2. UX/UI Design Competition 2025 (Sagarmatha Secondary Boarding School & Swarnim IT Club)
    3. Harvard CS50x Certificate (`c95716f9-c771-4c7b-91b5-c0e45c322f56`)
    4. freeCodeCamp — Legacy Responsive Web Design V8 (`fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76`)
    5. freeCodeCamp — Legacy JavaScript Algorithms & Data Structures V8 (`fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76`)
    6. freeCodeCamp — Legacy JavaScript Algorithms & Data Structures V7 (`fcc-fb9ff4ab-867a-4946-9bc0-614b82559f76`)
  - Interactive full-screen Certificate Lightbox modal viewer with zoom preview and one-click ID copy.
- **Custom Project Showcase Thumbnails:**
  - Integrated high-craft project showcase thumbnails for `SwasthyaSutra`, `KeyFlow`, `E-Government Platform (Butwal SmartGov)`, and `TubeKit (YouTube Power-Tools)` on both `index.html` and `projects.html`.
  - Updated case study modal data (`js/projects.js`) with React 19, Vite 6, SanjeevanAI, and Chrome Extension MV3 details.
- **3D Interactive Background & Component Architecture:**
  - Upgraded Three.js scene (`js/three-scene.js`) with outer wireframe icosahedron, cyan vertex points, crystalline core, signature wireframe torus knot, triple gyroscopic orbital rings, floating 3D polyhedron satellites, and multi-color 3D particle starfield synced with scroll progress, scroll velocity, mouse parallax, and pointer impulse.
  - All cards across the site upgraded into interactive 3D components (`data-tilt`) with perspective rotation, cursor-following radial glare, and inner elements (icons, thumbnail wraps, status badges) that pop forward in 3D space (`translateZ`).
  - Added GSAP 3D perspective scroll reveals (`rotationX`, `scale`, `transformPerspective: 1100`) and hero portrait scroll parallax.
- **Clean Transparent Portrait Cutout:**
  - Removed photographic studio background using high-precision neural segmentation, cleaned specks with connected component analysis, and saved as a crisp RGBA PNG (`assets/images/saurav-cutout.png`).
  - Synced portrait rim lighting with background neon aura and orbital ring.
- **Bold & Attractive Navigation Typography:**
  - Upgraded brand logo to uppercase Space Grotesk 800 (`SAURAV.`) with cyan neon drop-glow.
  - Upgraded navigation links to bold Space Grotesk 700 with high-contrast text, glass active pill, glowing cyan/purple active indicator bar, and hover text-shadow.

---

## [v2.0.0] — 2026-11-03 (Multi-Page 3D Interactive + UI/UX Pro Max Upgrade)

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
