# Changelog & Version History — Saurav Bhusal Portfolio

All notable changes, milestones, and design iterations for **Saurav Bhusal's 3D Interactive Developer & UI/UX Portfolio** are tracked in this file and via Git tags.

---

## [v3.2.0] — 2026-11-03 (Universal Reduced-Motion & Touch Blockers Removal, Persistent 3D Scroll-Trigger System)

### Fixed & Enhanced
- **Eliminated Accessibility & OS Reduced-Motion Execution Blockers:**
  - Diagnosed that in Windows environments with remote display / accessibility visual effects minimized, `window.matchMedia('(prefers-reduced-motion: reduce)')` was evaluating to `true`.
  - Removed early return guards in `js/three-scene.js` and `js/animations.js` that were completely shutting off the Three.js render loop, Lenis, and GSAP ScrollTrigger.
  - Removed aggressive CSS `@media (prefers-reduced-motion: reduce)` overrides (`animation-duration: 0.01ms !important`) that were nullifying CSS keyframes.
- **Removed Touchscreen / Hybrid Device Execution Blockers:**
  - Removed `isTouchDevice` conditional blocks from 3D card tilt, portrait stage interactive tracking, ambient spotlight, and magnetic button physics so laptops and desktops with touch support still run 100% of mouse-driven 3D animations.
- **Persistent 3D Scroll-Driven Component Animation System:**
  - Upgraded ScrollTrigger on all cards and components with `toggleActions: 'play none none reverse'` and `start: 'top 92%'`.
  - Cards dynamically glide and rotate into place in 3D perspective (`rotateX: -18deg`, `rotationY: ±4deg`, `translateZ: -95px`, `translateY: 65px`, `scale: 0.91`) whenever the visitor scrolls into view.
- **Headline Gradient Text Preservation:**
  - Fixed hero headline text rendering to guarantee that `<span class="text-gradient">intuitive, impactful</span>` is 100% visible, fully gradient colored, and completely animated without clipping artifacts.

---

## [v3.1.0] — 2026-11-03 (3D Stacking Context Resolution, 3D Spatial Card Pop & Vibrant Holographic Mesh)

### Fixed & Enhanced
- **WebGL Background Stacking Context Resolution (`css/style.css`):**
  - Resolved a critical CSS stacking issue where `.ambient-backdrop` sat above `#webgl-canvas` with an opaque `rgb(6, 6, 11)` background, which was completely obscuring the 3D scene from view.
  - Set `#webgl-canvas` to `z-index: 1; opacity: 1; pointer-events: none;` and `.ambient-backdrop` to `z-index: 0; background: transparent;`, revealing the full 3D interactive WebGL sculpture and cosmic particle field with crystal clarity.
- **Enhanced 3D Spatial Depth & Component Layering (`css/style.css` & `js/animations.js`):**
  - Added `transform-style: preserve-3d; perspective: 1200px;` to all `.glass-card` elements.
  - Elevated card contents along the Z-axis: project thumbnails and icon boxes pop forward by `translateZ(28px)` (hover `translateZ(40px) scale(1.02)`), and badges/tags float at `translateZ(22px)`, creating unmistakable physical depth when tilting.
  - Upgraded card hover tilt translation to `translate3d(0, -8px, 24px)`.
- **Three.js Visual Luminescence & 3D Satellites Upgrade (`js/three-scene.js`):**
  - Increased wireframe icosahedron opacity to `0.65` with emissive intensity `0.85`.
  - Scaled glowing cyan vertex nodes to `0.14` with `0.95` opacity.
  - Thickened cyber cyan (`0.038`) and neon purple (`0.032`) gyroscopic orbital rings with enhanced luminescence (`0.72` and `0.62` opacity).
  - Expanded floating 3D satellite polyhedra to 10 orbiting nodes (octahedrons, tetrahedrons, icosahedrons, dodecahedrons) distributed across the entire viewport.
  - Scaled living starfield particle size to `0.11` with forward continuous velocity drift and boundary wrapping.

---

## [v3.0.0] — 2026-11-03 (Ultimate 3D Transformation, Lenis Smooth Motion, Masked Word Reveals & Performance Engine)

### Added & Transformed
- **Agent Skills Architecture Installation (`.agents/skills/`):**
  - Inspected, verified, and installed 9 high-craft GitHub agent skills from `https://github.com/SoftwareInFocus/threejs-skills`:
    1. `gsap` — Advanced timelines, ScrollTrigger, staggers, and easing best practices.
    2. `threejs` — 3D scene architecture, WebGL shaders, geometries, lighting, and GPU performance.
    3. `animation-on-scroll` — IntersectionObserver triggers and scroll-linked state machines.
    4. `cinematic-gsap-lenis-motion-system` — Editorial smooth scrolling, pinned sections, and mouse-reactive motion systems.
    5. `cinematic-scroll-storytelling` — Section-by-section scroll-scrubbed transitions and sticky narratives.
    6. `gsap-scrolltrigger-storytelling` — Coordinated 3D component entrances, depth layering, and scroll synchronization.
    7. `optimize-web-animations` — Frame-rate auditing, offscreen keyframe pausing, memory-leak prevention, and RAF throttling.
    8. `scroll-progress-timeline` — Data-driven scroll progress rails, dynamic fill states, and step indicators.
    9. `masked-reveal` — Masked word-by-word typography reveals through overflow masks.
- **Lenis Smooth Scroll Engine (`js/animations.js` & `css/animations.css`):**
  - Integrated Lenis 1.1.13 smooth scrolling synchronized directly with GSAP's ticker (`gsap.ticker.add((time) => lenis.raf(time * 1000))`) and `ScrollTrigger.update`.
  - Added zero-lag smoothing (`gsap.ticker.lagSmoothing(0)`) and touch-aware graceful fallbacks.
- **Masked Editorial Word Reveals (`masked-reveal` skill):**
  - Built a non-destructive DOM traversal splitter that wraps words in `.word-mask > .word-reveal` while cleanly preserving nested gradient spans (`<span class="text-gradient">`), line breaks, and CSS classes.
  - Applied word-by-word staggered reveal (`0.026s`) on hero headlines across pages with screen-reader accessible `aria-label` and `aria-hidden` attributes.
- **Ambient Cursor Spotlight Micro-Interaction:**
  - Implemented `.ambient-cursor-spotlight` with dual radial gradient (violet/cyan) tracked smoothly using `gsap.quickTo` on desktop viewports.
- **Magnetic Button Physics Upgrade:**
  - Upgraded all `[data-magnetic]`, `.btn-primary`, and `.btn-secondary` elements with `gsap.quickTo` spring dynamics.
- **Section-by-Section Storytelling WebGL Camera Motion (`js/three-scene.js`):**
  - Implemented cinematic camera flight along Z and Y axes synchronized with scroll progress and mouse position.
  - Added delta time clamping (`Math.min(delta, 0.1)`) to eliminate particle and geometry jumps when switching back from inactive browser tabs.
  - Added `IntersectionObserver` on `#webgl-canvas` to pause WebGL rendering loops when offscreen.
- **Scroll-Progress Process Timeline (`services.html`):**
  - Implemented dynamic vertical progress rail with gradient fill (`#timeline-progress-fill`) linked to GSAP ScrollTrigger and active step glow badges (`.timeline-step.is-active`).
- **Animation Performance & Resource Optimization (`optimize-web-animations`):**
  - Added section-level `IntersectionObserver` that toggles `.is-offscreen` on offscreen sections and footers to pause background CSS keyframe animations when out of view.
- **Comprehensive Automated QA Verification:**
  - Verified 0 broken images, 0 console errors, 0 horizontal overflow, fully functioning project case-study modals, and verified contact form submission across all 5 pages.

---

## [v2.9.0] — 2026-11-03 (Hero Portrait Upscale & Balanced Stage Presence)

### Changed & Refined
- **Hero Portrait Upscale & Proportions (`css/style.css` & `css/responsive.css`):**
  - Enlarged hero portrait frame maximum width from `445px` to `535px` and maximum height from `500px` to `580px`, giving Saurav a commanding, prominent presence in the hero stage.
  - Increased portrait stage height to `560px` and enlarged dual-tone background glow aura to `540px × 540px` with enhanced blur (`48px`) and rim glow shadows.
  - Expanded base neon orbit ring from `400px` to `480px` to perfectly frame his wider shoulders, folded arms, and waist.
  - Added responsive scaling in `css/responsive.css` for tablet (`max-width: 470px`, `max-height: 520px`) and mobile devices (`max-width: 360px`, `max-height: 440px`).
- **Bio Portrait & Avatar Badge Upscale:**
  - Added `scale-105 origin-bottom` to the framed bio portrait in `about.html` to fill the card with higher visual impact.
  - Upgraded developer identity and access avatar badges on `contact.html`, `services.html`, and `projects.html` from `w-16 h-16` to `w-20 h-20` (80px × 80px).

---

## [v2.8.0] — 2026-11-03 (Universal 3D Scroll-Trigger Choreography & Full Portrait Cutout Across All Pages)

### Added & Refined
- **Universal 3D Scroll-Based Component Choreography (`js/animations.js`):**
  - Upgraded GSAP ScrollTrigger to orchestrate every section header, project card, service article, skill module, certificate card, timeline step, and CTA banner into position 3-dimensionally as the visitor scrolls down.
  - Cards fly into position with spatial 3D perspective (`perspective: 1200px`, `rotateX: -18deg`, alternating `rotateY: ±4deg`, `translateZ: -95px`, `translateY: 60px`, `scale: 0.91`) smoothly expanding to `scale: 1` with `power3.out` easing.
  - Added grouped row-based stagger (`0.085s`) for every project grid, skill category, and certificate collection, preventing static pop-ins.
  - Cleaned up transform properties upon tween completion (`clearProps: 'transform'`) to ensure vanilla-tilt (`data-tilt`) and hover 3D states remain 100% responsive without CSS property lock.
  - Added dedicated 3D slide-in stagger for the 4-step Working Process timeline in `services.html` and section titles across all pages.
- **New Full-Silhouette Portrait Cutout Across All 5 Pages:**
  - Processed user's uploaded portrait (`media_1793702110933_271d7f46.jpg`) through an automated alpha-feathering pipeline to eliminate the faux-checkerboard background and produce a clean, genuine transparent RGBA PNG (`assets/images/saurav-cutout.png`, 657x1008).
  - Deployed this high-resolution cutout across all 5 pages:
    1. **Home (`index.html`):** Hero stage framed with glowing neon orbit ring, dual-tone studio rim lighting, and living 3D cosmic background.
    2. **About (`about.html`):** Bio showcase portrait with live status badge and discipline highlights.
    3. **Projects (`projects.html`):** Bottom consultation CTA banner featuring Saurav's avatar.
    4. **Services (`services.html`):** Direct Developer 1-on-1 Access card in the working process sidebar.
    5. **Contact (`contact.html`):** Verified Creator identity card with real-time "Remote Ready" status badge.

---

## [v2.7.0] — 2026-11-03 (Continuous Living Background Motion, Studio Rim Lighting Sync & Hero Polish)

### Changed & Refined
- **Continuous Living Background Motion:**
  - Upgraded CSS `.ambient-backdrop` with dual silky aurora nebulae (`::before` purple drifting orb, `::after` cyber cyan drifting orb) powered by smooth counter-harmonic keyframes (`auroraDrift1`, `auroraDrift2`) that continuously glide across the viewport.
  - Added continuous fluid architectural grid movement (`gridFlow` 38s linear infinite) on `.bg-grid-overlay`.
  - Upgraded Three.js particle system with individual 3D velocity vectors (`velocities`) for continuous forward cosmic drift and boundary wrapping, plus responsive acceleration on mouse wheel scroll momentum.
- **Studio Rim Lighting Synchronization with Portrait:**
  - Removed obsolete decorative SVG polyhedra from the hero stage in `index.html` to eliminate artificial clutter around Saurav's head.
  - Updated dual-tone `.portrait-glow-aura` with cyan gradient at `28% 36%` (matching the teal rim light on his hair and ear) and vivid purple gradient at `72% 54%` (matching the purple rim light on his shoulder and collar) with breathing pulse animation (`auraBreathe`).
  - Tuned `.portrait-img` multi-layer drop shadows (`-16px -8px 24px rgba(6, 182, 212, 0.42)` and `18px 10px 28px rgba(168, 85, 247, 0.46)`).
  - Synchronized Three.js 3D point lights with portrait orientation: Electric Cyan (`#06B6D4`) at `(-6.5, -3.5, 6.0)` on the left, and Neon Purple (`#A855F7`) at `(6.5, 4.5, 6.0)` on the right.
  - Adjusted 3D sculpture framing depth (`z: -2.8`, `x: 3.85`) and scaled outer halo geometry (`radius: 3.2`) so 3D wireframe lines never collide with Saurav's face, framing him as a cybernetic holographic portal instead.
- **Scroll Parallax Upgrades:**
  - Bound `.neon-orbit-ring` and `.portrait-glow-aura` to GSAP scroll parallax for a three-dimensional depth transition as the visitor scrolls down.

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
