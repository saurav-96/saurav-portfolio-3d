/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/skills-modal.js — Interactive Skills & Technologies Deep-Dive Modal System
   ========================================================================== */

(function () {
  'use strict';

  const SKILLS_DATA = {
    html5: {
      id: 'html5',
      name: 'HTML5',
      category: 'Frontend Development',
      badgeClass: 'status-live',
      icon: 'file-code-2',
      iconColor: 'text-orange-400',
      tagline: 'Semantic, accessible, and standards-compliant document architecture.',
      description:
        'The structural bedrock of the modern web. I engineer semantic HTML5 documents using landmark elements (<main>, <nav>, <section>, <article>, <aside>, <header>, <footer>) to maximize organic search engine visibility, screen reader readability, and high Lighthouse accessibility ratings.',
      capabilities: [
        'Semantic DOM structure and accessible landmarks',
        'ARIA attributes, roles, live regions, and screen-reader accessibility',
        'Open Graph protocol and JSON-LD structured data for rich SERP snippets',
        'HTML5 Canvas 2D / WebGL rendering pipelines',
        'Modern responsive picture, video, and source elements'
      ],
      practicalApplications:
        'Architected semantic structures across SwasthyaSutra healthcare dashboards, Butwal SmartGov civic hub, and this portfolio website achieving strict semantic validation.',
      ecosystem: ['Semantic HTML5', 'ARIA 1.2', 'Schema.org JSON-LD', 'HTML Canvas API', 'Web Components'],
      proficiencyLevel: 'Proficient & Core Foundation (4+ Years Practical Experience)'
    },

    css3: {
      id: 'css3',
      name: 'CSS3',
      category: 'Frontend Development',
      badgeClass: 'status-live',
      icon: 'paintbrush',
      iconColor: 'text-sky-400',
      tagline: 'Modern responsive layouts, hardware-accelerated animations, and design tokens.',
      description:
        'Deep mastery of cascading style sheets, covering CSS Grid, Flexbox, custom properties (CSS variables), container queries, and 3D matrix transforms. Focuses on GPU-accelerated styling with will-change and transform3d to guarantee 60 FPS transitions without layout recalculations.',
      capabilities: [
        'CSS Grid & Flexbox complex multi-column responsive systems',
        'Hardware-accelerated 3D transforms (perspective, rotateX, rotateY, translate3d)',
        'CSS custom properties and multi-theme design token engines',
        'Fluid clamp() typography and container query ergonomics',
        'Glassmorphism, backdrop filters, and blend modes'
      ],
      practicalApplications:
        'Engineered the luxury cyberpunk glassmorphic visual language, 3D card tilt matrices, and neon edge glow shaders across this portfolio and KeyFlow.',
      ecosystem: ['CSS Grid', 'Flexbox', 'CSS 3D Transforms', 'Backdrop Filter', 'Keyframe Animations', 'CSS Variables'],
      proficiencyLevel: 'Advanced (freeCodeCamp Responsive Web Design Certified)'
    },

    javascript: {
      id: 'javascript',
      name: 'JavaScript (ES6+)',
      category: 'Frontend Development',
      badgeClass: 'status-live',
      icon: 'braces',
      iconColor: 'text-amber-300',
      tagline: 'Asynchronous event loops, modern DOM manipulation, and modular architecture.',
      description:
        'Modern JavaScript using ES modules, async/await, closures, and browser APIs. I focus on writing vanilla JavaScript with minimal memory footprints, using passive event listeners, IntersectionObserver, and requestAnimationFrame throttling to avoid frame drops.',
      capabilities: [
        'Async programming, Promises, Fetch API, and RESTful integrations',
        'Vanilla DOM orchestration without unnecessary framework overhead',
        'Observer APIs: IntersectionObserver, ResizeObserver, MutationObserver',
        'LocalStorage / SessionStorage state persistence and JSON parsing',
        'Performance profiling, garbage collection awareness, and memory leak prevention'
      ],
      practicalApplications:
        'Engineered the custom filter state machine, client-side search, modal focus management, and Chrome extension background logic for TubeKit.',
      ecosystem: ['ES6+ Modules', 'Async/Await', 'Fetch API', 'DOM APIs', 'Canvas API', 'Chrome Extension APIs'],
      proficiencyLevel: 'Advanced (freeCodeCamp JS Algorithms & Data Structures Certified)'
    },

    react: {
      id: 'react',
      name: 'React (18 / 19)',
      category: 'Frontend Development',
      badgeClass: 'status-live',
      icon: 'atom',
      iconColor: 'text-cyan-400',
      tagline: 'Component-driven user interfaces, state management, and modern hooks.',
      description:
        'Building reusable, reactive component trees using modern React paradigms (useState, useEffect, useMemo, useCallback, useRef, custom hooks). Experienced with Vite build bundling, modular component design, and optimized re-renders.',
      capabilities: [
        'Component composition and atomic design patterns',
        'Custom hooks for state extraction and browser API synchronizations',
        'Integration with animation libraries (GSAP, Framer Motion)',
        'Optimistic UI updates, controlled form inputs, and modal portals',
        'Lightning-fast build workflows using Vite 6'
      ],
      practicalApplications:
        'Developed SwasthyaSutra (AI Telemedicine and vitals monitoring platform), KeyFlow (keyboard shortcut SaaS app), and the Butwal SmartGov civic portal.',
      ecosystem: ['React 18 / 19', 'Vite 6', 'React Hooks', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
      proficiencyLevel: 'Proficient & Actively Utilized in Production Concepts'
    },

    tailwind: {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'Frontend Development',
      badgeClass: 'status-live',
      icon: 'wind',
      iconColor: 'text-teal-300',
      tagline: 'Utility-first CSS architecture for rapid, maintainable design systems.',
      description:
        'Expertise in crafting bespoke user interfaces with utility classes, custom theme extensions, arbitrary values, and design token configurations. Enables clean, maintainable styles without style sheet bloat or naming collisions.',
      capabilities: [
        'Custom theme configuration (colors, spacing, typography scales, glass utilities)',
        'Mobile-first responsive class orchestration (sm, md, lg, xl, 2xl)',
        'Dark mode theming and high-contrast accessibility tokens',
        'Arbitrary variants, group-hover, and peer-checked interactions',
        'Zero-runtime overhead with automated purge and tree-shaking'
      ],
      practicalApplications:
        'Primary styling framework across SwasthyaSutra, KeyFlow, E-Government Platform, and all pages of this 3D portfolio.',
      ecosystem: ['Tailwind CSS v3', 'Tailwind Config', 'Autoprefixer', 'PostCSS', 'Lucide Icons'],
      proficiencyLevel: 'Expert Utility Architecture'
    },

    threejs: {
      id: 'threejs',
      name: 'Three.js & WebGL',
      category: 'Frontend Development',
      badgeClass: 'status-lab',
      icon: 'box',
      iconColor: 'text-purple-400',
      tagline: 'Interactive 3D geometry, particle starfields, and WebGL rendering.',
      description:
        'Creating real-time 3D graphics in the browser using Three.js, WebGL renderers, perspective cameras, procedural BufferGeometries, and luminous custom lighting. Implements requestAnimationFrame loops with delta-time smoothing and offscreen pause observers.',
      capabilities: [
        'Scene graphs, PerspectiveCamera, and responsive aspect recalculation',
        'BufferGeometry creation: starfield particle matrices, icosahedrons, orbitals',
        'Material composition: MeshBasicMaterial, MeshStandardMaterial, PointsMaterial',
        'Scroll-synchronized 3D camera travel and velocity interpolation',
        'Pointer tracking for interactive 3D scene tilt and parallax dynamics'
      ],
      practicalApplications:
        'Engineered the living cosmic WebGL background featuring 3D wireframe polyhedra, glowing vertex nodes, gyroscopic rings, and 1,800 flowing stars across this website.',
      ecosystem: ['Three.js r128', 'WebGL', 'BufferGeometry', 'PointsMaterial', 'GSAP Ticker'],
      proficiencyLevel: 'Intermediate & Actively Expanding'
    },

    figma: {
      id: 'figma',
      name: 'Figma',
      category: 'UI/UX & Design',
      badgeClass: 'status-concept',
      icon: 'figma',
      iconColor: 'text-pink-400',
      tagline: 'Design systems, auto-layout, interactive component variants, and prototypes.',
      description:
        'Industry-standard tool for end-to-end product design. I create structured design systems featuring auto-layout components, variant properties, responsive constraints, typography scales, and interactive wireframes ready for seamless developer handoff.',
      capabilities: [
        'Auto-layout 5.0 with min/max dimensions and wrapping',
        'Interactive component sets, boolean properties, and design variables',
        'Design systems with reusable tokens for colors, elevation, and typography',
        'High-fidelity clickable prototypes with realistic transition states',
        'Pixel-perfect developer handoff specifications and asset exports'
      ],
      practicalApplications:
        'Created the complete UI wireframes, high-fidelity mockups, and component libraries for Mindful You, SwasthyaSutra, and KeyFlow.',
      ecosystem: ['Figma Components', 'Auto-Layout', 'Design Variables', 'Interactive Prototyping', 'FigJam'],
      proficiencyLevel: 'Advanced & Hackathon Recognized (Sagarmatha UX/UI 2025)'
    },

    figjam: {
      id: 'figjam',
      name: 'FigJam',
      category: 'UI/UX & Design',
      badgeClass: 'status-concept',
      icon: 'workflow',
      iconColor: 'text-purple-300',
      tagline: 'User journey mapping, information architecture, and workflow diagramming.',
      description:
        'Collaborative whiteboard for planning digital product architecture before code is written. Used to map out user flows, state charts, information hierarchies, and feature roadmaps.',
      capabilities: [
        'User journey mapping and persona journey touchpoints',
        'Information architecture and site tree sitemaps',
        'Decision matrices and low-fidelity brainstorm sketching',
        'Developer-designer workflow alignment'
      ],
      practicalApplications:
        'Mapped the multi-step appointment and vitals workflow for SwasthyaSutra and the civic department hierarchy for Butwal SmartGov.',
      ecosystem: ['FigJam', 'User Flows', 'Sitemaps', 'Affinity Diagrams'],
      proficiencyLevel: 'Proficient Workflow Planning'
    },

    webflow: {
      id: 'webflow',
      name: 'Webflow',
      category: 'UI/UX & Design',
      badgeClass: 'status-concept',
      icon: 'globe',
      iconColor: 'text-indigo-400',
      tagline: 'Visual web design, responsive layouts, and CMS structure.',
      description:
        'Visual development platform bridging design and production code. Capable of translating Figma designs directly into responsive, semantic Webflow structures with clean class names and CMS collections.',
      capabilities: [
        'Box-model visual layout building using clean class architecture',
        'Dynamic CMS collection structure and template pages',
        'Responsive breakpoint styling across desktop, tablet, and mobile',
        'Interactions and micro-animations'
      ],
      practicalApplications:
        'Prototyping responsive editorial landing pages and client concept demonstrations.',
      ecosystem: ['Webflow CMS', 'Client-First Naming', 'Responsive Breakpoints'],
      proficiencyLevel: 'Working Knowledge & Visual Development'
    },

    canva: {
      id: 'canva',
      name: 'Canva',
      category: 'UI/UX & Design',
      badgeClass: 'status-concept',
      icon: 'palette',
      iconColor: 'text-cyan-300',
      tagline: 'High-converting YouTube thumbnails, marketing posters, and visual assets.',
      description:
        'Rapid asset creation for digital marketing and social media visual identity. Focused on high-contrast compositions, typography balancing, and eye-catching branding graphics that achieve high click-through rates.',
      capabilities: [
        'High-converting YouTube thumbnail design with focal-point composition',
        'Promotional event posters and social media campaign graphics',
        'Brand asset preparation, color grading, and typography pairing',
        'Vector and raster asset exports for web integration'
      ],
      practicalApplications:
        'Designed promotional graphics, YouTube thumbnails, and visual marketing assets featured in the Creative Design showcase.',
      ecosystem: ['Canva Pro', 'Typography Hierarchy', 'Color Theory', 'Visual Contrast'],
      proficiencyLevel: 'Advanced Visual Communication'
    },

    'graphic-design': {
      id: 'graphic-design',
      name: 'Graphic Design',
      category: 'UI/UX & Design',
      badgeClass: 'status-live',
      icon: 'sparkles',
      iconColor: 'text-pink-400',
      tagline: 'Visual composition, brand identities, social media creatives, and marketing layouts.',
      description:
        'Creating clear, compelling visual designs that communicate value and elevate digital products. Focusing on visual balance, typography hierarchy, high-contrast focal points, and cohesive brand systems for online audiences.',
      capabilities: [
        'Visual composition and optical balance across digital touchpoints',
        'Brand identity guidelines, logo design, and vector assets',
        'Social media graphics optimized for Instagram, Facebook, and LinkedIn',
        'High-CTR YouTube thumbnail design with emotional visual hooks',
        'Promotional poster design, digital banners, and creative layouts',
        'Typography pairing, scale systems, and cohesive palette curation'
      ],
      practicalApplications:
        'Crafted the brand identity, logo, and social media creative suite for TubeKit, civic banners for Butwal SmartGov, and promotional graphics across web development projects.',
      ecosystem: ['Canva', 'Figma', 'Vector Layouts', 'Brand Architecture', 'Typography Hierarchy', 'Color Theory'],
      proficiencyLevel: 'Practical Design & Visual Branding (2+ Years Real-World Production)'
    },

    'responsive-design': {
      id: 'responsive-design',
      name: 'Responsive Design',
      category: 'UI/UX & Design',
      badgeClass: 'status-live',
      icon: 'smartphone',
      iconColor: 'text-emerald-300',
      tagline: 'Fluid layouts, mobile-first breakpoints, and touch ergonomics.',
      description:
        'A mobile-first philosophy ensuring every interface adapts naturally from 320px mobile screens up to 4K ultra-wide monitors. Employs flexible CSS Grid, fluid clamp() formulas, touch targets >= 44px, and zero horizontal overflow.',
      capabilities: [
        'Mobile-first responsive architecture and progressive enhancement',
        'Fluid typography and fluid spacing with CSS clamp()',
        'Touch ergonomics, swipe gestures, and accessible tap targets',
        'Cross-browser rendering QA across iOS Safari, Chrome, Firefox, and Edge'
      ],
      practicalApplications:
        'Verified 100% responsive coverage with 0 horizontal overflow across all 5 pages and 7 project case studies in this portfolio.',
      ecosystem: ['Media Queries', 'Clamp()', 'Touch Ergonomics', 'Device Emulation'],
      proficiencyLevel: 'Expert Mobile-First Implementation'
    },

    prototyping: {
      id: 'prototyping',
      name: 'Interactive Prototyping',
      category: 'UI/UX & Design',
      badgeClass: 'status-concept',
      icon: 'layers',
      iconColor: 'text-amber-300',
      tagline: 'Clickable wireframes, stateful interaction models, and motion feedback.',
      description:
        'Simulating real user experiences through interactive prototypes before engineering. Focuses on realistic screen transitions, loading states, modal behaviors, and micro-interactions.',
      capabilities: [
        'Multi-state component prototyping and variant transitions',
        'Smart animate easing curves and realistic spring physics',
        'Usability testing simulation and feedback gathering',
        'Interactive form inputs and modal states'
      ],
      practicalApplications:
        'Created interactive prototypes for Mindful You and the SwasthyaSutra SanjeevanAI consultation flow.',
      ecosystem: ['Figma Smart Animate', 'Stateful Components', 'Micro-Interactions'],
      proficiencyLevel: 'Proficient Interaction Design'
    },

    c: {
      id: 'c',
      name: 'C Programming',
      category: 'Programming Foundations',
      badgeClass: 'status-live',
      icon: 'cpu',
      iconColor: 'text-blue-400',
      tagline: 'Low-level memory management, pointers, and foundational algorithms.',
      description:
        'Studied extensively through Harvard University CS50x. Focuses on manual memory management (malloc, free), pointers, bit manipulation, custom structs, and foundational data structures (linked lists, hash tables, tries, binary search trees).',
      capabilities: [
        'Manual memory allocation, pointer arithmetic, and buffer overflow prevention',
        'Data structure implementation: Linked lists, hash tables, tries, binary trees',
        'Algorithm analysis: Big-O time and space complexity evaluation',
        'Valgrind memory leak debugging and segmentation fault prevention',
        'File I/O operations and binary file manipulation'
      ],
      practicalApplications:
        'Completed rigorous Harvard CS50x problem sets including Speller (hash table dictionary), Filter (image processing algorithms), and Tideman (graph-based voting system).',
      ecosystem: ['C99 / C11', 'GCC / Clang', 'Valgrind', 'Makefiles', 'CS50 Library'],
      proficiencyLevel: 'Harvard CS50x Verified Credential'
    },

    python: {
      id: 'python',
      name: 'Python',
      category: 'Programming Foundations',
      badgeClass: 'status-live',
      icon: 'code',
      iconColor: 'text-amber-300',
      tagline: 'Automation scripting, data processing, CLI utilities, and algorithms.',
      description:
        'Practical scripting and algorithmic problem-solving using Python 3. Leveraged for file automation, REST API consumption, data extraction, and backend logic in web experiments.',
      capabilities: [
        'Clean, PEP 8-compliant Python syntax and object-oriented programming',
        'File system automation, regex pattern matching, and batch data processing',
        'REST API integration with requests and JSON serialization',
        'SQLite database interactions and relational query modeling',
        'CLI utilities with structured arguments and error handling'
      ],
      practicalApplications:
        'Automated file processing scripts, AI workflow pipelines in the AI Automation lab, and CS50x Python web problem sets.',
      ecosystem: ['Python 3.11+', 'SQLite3', 'Requests', 'Pip / Virtualenv', 'CLI Scripting'],
      proficiencyLevel: 'Harvard CS50x Verified & Active Scripting'
    },

    php: {
      id: 'php',
      name: 'PHP',
      category: 'Programming Foundations',
      badgeClass: 'status-concept',
      icon: 'server',
      iconColor: 'text-purple-300',
      tagline: 'Server-side scripting, form processing, and dynamic web templating.',
      description:
        'Server-side web development fundamentals, handling HTTP requests, sanitizing user inputs, database connectivity, and rendering dynamic HTML templates.',
      capabilities: [
        'Server-side form handling, POST/GET parameter sanitization, and CSRF defense',
        'Session management and state persistence across page loads',
        'MySQL / MariaDB database querying with PDO prepared statements',
        'Integration with traditional CMS platforms like WordPress'
      ],
      practicalApplications:
        'Backend scripting experiments and custom WordPress theme template modifications.',
      ecosystem: ['PHP 8+', 'PDO / MySQL', 'Apache / Nginx', 'WordPress'],
      proficiencyLevel: 'Foundation & Practical Scripting'
    },

    git: {
      id: 'git',
      name: 'Git Version Control',
      category: 'Tools & Ecosystem',
      badgeClass: 'status-live',
      icon: 'git-branch',
      iconColor: 'text-orange-400',
      tagline: 'Branching workflows, semantic commits, and merge management.',
      description:
        'Disciplined version control using Git. Maintains clean, auditable commit histories following conventional commits (feat, fix, perf, docs, refactor), feature branches, and tag-based release milestones.',
      capabilities: [
        'Branching workflows (feature branches, hotfixes, rebasing, merge resolutions)',
        'Conventional commit standards and structured release tagging (v3.0.0, v3.3.0)',
        'Stash management, interactive staging (git add -p), and reflog recovery',
        'Git hooks and local automated checks'
      ],
      practicalApplications:
        'All portfolio code and open-source projects are strictly tracked with Git, including verified tags and clean commit logs.',
      ecosystem: ['Git CLI', 'Conventional Commits', 'Semantic Versioning', 'Git Hooks'],
      proficiencyLevel: 'Proficient & Daily Core Tool'
    },

    github: {
      id: 'github',
      name: 'GitHub',
      category: 'Tools & Ecosystem',
      badgeClass: 'status-live',
      icon: 'github',
      iconColor: 'text-slate-200',
      tagline: 'Repository hosting, GitHub Pages deployment, and open-source collaboration.',
      description:
        'Hosting source repositories, managing documentation, deploying live static web apps with GitHub Pages, and showcasing transparent open-source code.',
      capabilities: [
        'GitHub Pages automated static deployment pipelines',
        'Repository configuration: README.md, LICENSE, issue templates, branch rules',
        'Pull request code reviews, diff inspections, and milestone tracking',
        'Live demo hosting for SwasthyaSutra, KeyFlow, and SmartGov'
      ],
      practicalApplications:
        'Active GitHub profile (@saurav-96) hosting all public repositories, live Pages demos, and CS50x final project code.',
      ecosystem: ['GitHub Pages', 'GitHub Actions', 'Markdown', 'Git LFS'],
      proficiencyLevel: 'Proficient & Active'
    },

    wordpress: {
      id: 'wordpress',
      name: 'WordPress',
      category: 'Tools & Ecosystem',
      badgeClass: 'status-concept',
      icon: 'layout',
      iconColor: 'text-sky-300',
      tagline: 'Content management systems, theme customization, and page design.',
      description:
        'Building and customizing content-managed websites for small businesses and clients who require straightforward editorial control without touching code.',
      capabilities: [
        'Theme configuration, child theme customization, and template overrides',
        'Block editor (Gutenberg) layout creation and element styling',
        'Plugin setup, security hardening, and performance caching',
        'Domain setup, hosting configuration, and site migrations'
      ],
      practicalApplications:
        'Client business website demonstrations and content management deployments.',
      ecosystem: ['WordPress Core', 'Gutenberg Blocks', 'WooCommerce Basics', 'cPanel / Hosting'],
      proficiencyLevel: 'Practical Client Deployment'
    },

    'ai-tools': {
      id: 'ai-tools',
      name: 'AI Dev Tools & Automation',
      category: 'Tools & Ecosystem',
      badgeClass: 'status-lab',
      icon: 'sparkles',
      iconColor: 'text-purple-300',
      tagline: 'AI-assisted coding, developer productivity workflows, and modern pipelines.',
      description:
        'Leveraging cutting-edge AI developer tools, LLM APIs, and agentic coding workflows to accelerate frontend architecture, optimize repetitive tasks, and design intelligent web utilities.',
      capabilities: [
        'Agentic AI pair-programming and refactoring workflows',
        'API integration with modern generative models (Gemini, OpenAI)',
        'Prompt engineering for code generation, testing, and documentation',
        'Developer workflow acceleration, automated QA scripts, and shell scripts'
      ],
      practicalApplications:
        'Built automated testing suites in Node.js, explored SanjeevanAI integration concepts in SwasthyaSutra, and optimized this 3D portfolio.',
      ecosystem: ['Google Gemini API', 'AI Agent Tooling', 'Node.js Scripts', 'VS Code AI'],
      proficiencyLevel: 'Advanced Practical Workflow Integration'
    },

    'browser-extensions': {
      id: 'browser-extensions',
      name: 'Browser Extension Engineering (MV3)',
      category: 'Tools & Ecosystem',
      badgeClass: 'status-live',
      icon: 'puzzle',
      iconColor: 'text-cyan-300',
      tagline: 'Chromium Manifest V3, content scripts, background workers, and Canvas APIs.',
      description:
        'Engineering performant browser extensions using modern Chromium Manifest V3 specifications. Built around background service workers, content script DOM injection, chrome.storage synchronization, and Canvas video frame capture.',
      capabilities: [
        'Chromium Manifest V3 architecture (declarativeNetRequest, service workers)',
        'Isolated world content script injection and DOM manipulation',
        'Lossless HTML5 Canvas video frame grabber and download triggers',
        'Synchronized chrome.storage state and global keyboard shortcut handlers',
        'Cross-browser Chromium compatibility (Chrome, Edge, Brave, Opera)'
      ],
      practicalApplications:
        'Engineered TubeKit (YouTube Power-Tools), the Harvard CS50x final project extension with 7 in-player features and sub-frame screenshot capture.',
      ecosystem: ['Manifest V3', 'Chrome APIs', 'Service Workers', 'Content Scripts', 'HTML5 Canvas'],
      proficiencyLevel: 'Certified (Harvard CS50x Final Project: TubeKit)'
    }
  };

  function initSkillsModal() {
    const modalBackdrop = document.getElementById('skill-detail-modal');
    const modalBody = document.getElementById('skill-modal-body');
    const modalCloseBtn = document.getElementById('skill-modal-close');
    let lastSkillTrigger = null;

    if (!modalBackdrop || !modalBody) return;

    function renderSkillHTML(skill) {
      const capsHTML = (skill.capabilities || [])
        .map(
          (cap) => `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <span class="text-cyan-400 font-bold shrink-0 mt-0.5">✦</span>
              <span>${cap}</span>
            </li>
          `
        )
        .join('');

      const ecosystemHTML = (skill.ecosystem || [])
        .map(
          (tool) => `
            <span class="tech-pill">${tool}</span>
          `
        )
        .join('');

      return `
        <div class="space-y-6">
          <!-- Header -->
          <div class="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/25 border border-cyan-400/40 flex items-center justify-center shrink-0">
                <i data-lucide="${skill.icon}" class="w-7 h-7 ${skill.iconColor}"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-mono text-xs uppercase tracking-wider text-cyan-300">${skill.category}</span>
                  <span class="status-badge ${skill.badgeClass}">Active Tool</span>
                </div>
                <h3 class="font-heading text-2xl sm:text-3xl font-bold text-white">${skill.name}</h3>
              </div>
            </div>
            <div class="text-right">
              <span class="font-mono text-xs text-slate-400">CREDENTIAL / PROFICIENCY</span>
              <div class="text-xs sm:text-sm font-semibold text-emerald-300 mt-0.5">${skill.proficiencyLevel}</div>
            </div>
          </div>

          <!-- Tagline & Description -->
          <div class="p-4 rounded-xl bg-white/[0.025] border border-white/10">
            <p class="font-medium text-white text-sm sm:text-base leading-relaxed mb-3">
              "${skill.tagline}"
            </p>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ${skill.description}
            </p>
          </div>

          <!-- Capabilities -->
          <div>
            <h4 class="font-mono text-xs uppercase tracking-wider text-purple-300 mb-3">
              Key Capabilities &amp; Technical Execution
            </h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${capsHTML}
            </ul>
          </div>

          <!-- Practical Applications -->
          <div class="p-4 rounded-xl bg-purple-950/20 border border-purple-500/25">
            <h4 class="font-mono text-xs uppercase tracking-wider text-cyan-300 mb-1.5">
              Practical Applications in Saurav's Projects
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              ${skill.practicalApplications}
            </p>
          </div>

          <!-- Ecosystem & Tools -->
          <div>
            <h4 class="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
              Related Tools, Standards &amp; Libraries
            </h4>
            <div class="flex flex-wrap gap-1.5">
              ${ecosystemHTML}
            </div>
          </div>

          <!-- Modal Action Footer -->
          <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <span class="font-mono text-xs text-slate-400">Want to use ${skill.name} for your next project?</span>
            <a href="contact.html?skill=${encodeURIComponent(skill.name)}" class="btn-primary text-xs py-2.5 px-4" data-magnetic>
              <span>Discuss Project Using ${skill.name}</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      `;
    }

    function openSkillModal(skillId, triggerEl) {
      const data = SKILLS_DATA[skillId];
      if (!data) return;

      lastSkillTrigger = triggerEl || document.activeElement;
      modalBody.innerHTML = renderSkillHTML(data);

      if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }

      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');

      if (typeof window.lockModalScroll === 'function') {
        window.lockModalScroll();
      } else {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
      }

      if (modalCloseBtn) modalCloseBtn.focus();
    }

    function closeSkillModal() {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');

      if (typeof window.unlockModalScroll === 'function') {
        window.unlockModalScroll();
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }

      if (lastSkillTrigger && typeof lastSkillTrigger.focus === 'function') {
        lastSkillTrigger.focus();
      }
    }

    document.querySelectorAll('[data-skill-id]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const skillId = el.getAttribute('data-skill-id');
        openSkillModal(skillId, el);
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const skillId = el.getAttribute('data-skill-id');
          openSkillModal(skillId, el);
        }
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeSkillModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeSkillModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeSkillModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsModal);
  } else {
    initSkillsModal();
  }
})();
