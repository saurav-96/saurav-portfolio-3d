/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/services-modal.js — Interactive Services Deep-Dive Modal & FAQ Accordions
   ========================================================================== */

(function () {
  'use strict';

  const SERVICES_DATA = {
    'web-development': {
      id: 'web-development',
      title: 'Web Development',
      badge: 'Frontend & Interactive',
      icon: 'code-2',
      iconClass: 'text-purple-300',
      description:
        'Modern, responsive, and performance-focused websites engineered with clean semantic code, smooth motion design, and cross-device reliability. From high-converting landing pages to interactive WebGL applications.',
      included: [
        'Custom responsive website engineering (HTML5, CSS3, JavaScript, React)',
        'Three.js / WebGL 3D interactive graphics and scene integration',
        'Fluid animations using GSAP, ScrollTrigger, and Lenis smooth scrolling',
        'Mobile-first responsive architecture with 0 layout overflow',
        'Performance optimization, lazy loading, and Lighthouse 95+ metrics',
        'Clean, accessible semantic markup and SEO metadata integration'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React 19', 'Tailwind CSS', 'Three.js', 'GSAP', 'Vite'],
      deliverables: [
        'Production-ready, minified, and fully tested source code repository',
        'Cross-browser verified web application (Chrome, Safari, Firefox, Edge)',
        'Clean deployment instructions (GitHub Pages, Netlify, Vercel, or custom hosting)',
        'Full asset pack (optimized images, SVG icons, and web fonts)'
      ],
      workflow: [
        { step: '01', title: 'Technical Discovery', desc: 'Analyzing project scope, technical requirements, target audiences, and brand goals.' },
        { step: '02', title: 'Architecture & Layout', desc: 'Establishing semantic component structure, design tokens, and animation choreography.' },
        { step: '03', title: 'Development & Polish', desc: 'Writing modular code, integrating interactive 3D/GSAP effects, and mobile-first styling.' },
        { step: '04', title: 'QA & Deployment', desc: 'Rigorous cross-device testing, performance audit, and production deployment.' }
      ],
      benefits: [
        'Sub-second load times and lightweight code footprints without framework bloat',
        'Awwwards-quality interactive motion that retains user attention and boosts conversion',
        'Flawless responsiveness on smartphones, tablets, laptops, and ultra-wide screens',
        'Zero-dependency vanilla resilience that is easy to maintain and scale'
      ],
      projects: ['SwasthyaSutra', 'KeyFlow', 'E-Government Platform', 'Saurav Bhusal 3D Portfolio'],
      ctaText: 'Inquire About Web Development',
      ctaUrl: 'contact.html?service=Web%20Development',
      faqs: [
        {
          q: 'What type of websites do you develop?',
          a: 'I specialize in custom responsive business websites, high-converting product landing pages, React web applications, interactive 3D WebGL experiences with Three.js, and browser extensions.'
        },
        {
          q: 'How long does a typical web development project take?',
          a: 'A focused landing page or portfolio typically takes 4–7 business days, while full multi-page web applications or custom interactive platforms typically require 2–3 weeks depending on scope.'
        },
        {
          q: 'Will my website work smoothly on mobile phones?',
          a: 'Yes, 100%. Every project is built with a strict mobile-first philosophy, fluid clamp() typography, responsive touch controls, and zero horizontal overflow.'
        },
        {
          q: 'Can you integrate 3D animations and smooth scrolling?',
          a: 'Absolutely. I integrate Three.js WebGL scenes, GSAP ScrollTrigger timelines, and Lenis smooth scrolling while keeping GPU and CPU resource usage performant.'
        },
        {
          q: 'How do you handle revisions and communication?',
          a: 'I provide regular staging links, live previews, and same-day communication via WhatsApp, Email, or Upwork. Every milestone includes dedicated revision cycles until you are fully satisfied.'
        }
      ]
    },

    'ui-ux-design': {
      id: 'ui-ux-design',
      title: 'UI/UX & Design',
      badge: 'User-Centered Design',
      icon: 'figma',
      iconClass: 'text-cyan-300',
      description:
        'Intuitive, conversion-focused digital interfaces designed from user flows and wireframes up to polished, developer-ready Figma design systems. Bridging design thinking with practical engineering feasibility.',
      included: [
        'End-to-end website and web app interface design in Figma',
        'Mobile application wireframing and high-fidelity mockups',
        'Comprehensive design systems with auto-layout and reusable variants',
        'Interactive, clickable prototypes demonstrating micro-interactions',
        'Information architecture, user flow mapping, and journey diagrams',
        'Developer-ready asset exports and component token documentation'
      ],
      technologies: ['Figma', 'FigJam', 'Canva', 'Design Systems', 'Auto-Layout 5.0', 'Interactive Prototyping'],
      deliverables: [
        'Organized Figma master file (.fig) with structured pages and frames',
        'Reusable component library with responsive auto-layout constraints',
        'Interactive clickable prototype link for stakeholder and user testing',
        'Complete asset export bundle (SVGs, PNGs, color palettes, and typography guide)'
      ],
      workflow: [
        { step: '01', title: 'User Research & Wireframing', desc: 'Understanding user pain points and sketching low-fidelity layout structures in FigJam.' },
        { step: '02', title: 'Visual Identity & Tokens', desc: 'Defining typography scales, high-contrast color palettes, and glassmorphic surface styles.' },
        { step: '03', title: 'High-Fidelity Mockups', desc: 'Crafting pixel-perfect screens in Figma using modern auto-layout and component variants.' },
        { step: '04', title: 'Prototyping & Handoff', desc: 'Connecting interactions and delivering developer-ready design specifications.' }
      ],
      benefits: [
        'Clear, intuitive user journeys that reduce bounce rates and friction',
        'Developer-ready specifications that eliminate guesswork during implementation',
        'Cohesive visual branding that builds authority, credibility, and trust',
        'Recognized design craft: Hackathon Award winner in UI/UX and Web Design'
      ],
      projects: ['Mindful You (Concept)', 'SwasthyaSutra Telemedicine UI', 'KeyFlow Tactile Command Center'],
      ctaText: 'Inquire About UI/UX Design',
      ctaUrl: 'contact.html?service=UI/UX%20Design',
      faqs: [
        {
          q: 'What deliverables do I receive from a UI/UX project?',
          a: 'You receive full access to the organized Figma master file with auto-layout components, color/typography styles, interactive prototype links, and exported production assets.'
        },
        {
          q: 'Do you design for both mobile and desktop screens?',
          a: 'Yes. Every project includes dedicated mobile and desktop responsive views, ensuring consistent usability across all viewport sizes.'
        },
        {
          q: 'Can you redesign an existing website that is underperforming?',
          a: 'Yes. I analyze your current interface, identify user friction points, and deliver a modern, high-converting redesign while preserving your core business identity.'
        },
        {
          q: 'Can you build the frontend code for the designs you create?',
          a: 'Yes! As a hybrid Creative Technologist who codes in HTML5, CSS3, JavaScript, and React, I can seamlessly design in Figma and code the exact frontend.'
        }
      ]
    },

    'ai-automation': {
      id: 'ai-automation',
      title: 'AI Automation',
      badge: 'Workflow Efficiency',
      icon: 'cpu',
      iconClass: 'text-indigo-300',
      description:
        'Smart scripts, Chromium browser extensions, and AI-assisted pipelines designed to eliminate repetitive manual work and streamline digital operations.',
      included: [
        'Custom Python automation scripts for data extraction and file processing',
        'Chromium browser extensions (Manifest V3) for in-browser productivity',
        'REST API integrations connecting SaaS tools and databases',
        'AI workflow automations utilizing modern LLM APIs (Gemini, OpenAI)',
        'Command-line utilities and scheduled background automation tasks'
      ],
      technologies: ['Python 3', 'JavaScript (ES6+)', 'Chrome Extension MV3', 'REST APIs', 'SQLite', 'Node.js'],
      deliverables: [
        'Documented Python scripts or compiled Chromium extension package (.zip)',
        'Clear configuration and setup guide (.env, dependencies, instructions)',
        'Sample execution logs and automated test verification',
        '1-on-1 walkthrough and deployment assistance'
      ],
      workflow: [
        { step: '01', title: 'Bottleneck Audit', desc: 'Identifying repetitive manual steps and defining automated input/output pipelines.' },
        { step: '02', title: 'Script & Logic Architecture', desc: 'Writing clean, robust scripts with error handling, logging, and retry logic.' },
        { step: '03', title: 'Testing & Verification', desc: 'Validating against edge cases, rate limits, and data integrity requirements.' },
        { step: '04', title: 'Deployment & Automation', desc: 'Delivering easy-to-run CLI scripts, cron jobs, or browser extensions.' }
      ],
      benefits: [
        'Saves dozens of hours weekly by eliminating repetitive manual copy-pasting',
        'Reduces human error in data formatting and file organization to zero',
        'Lightweight, fast execution using clean Python and vanilla JavaScript',
        'Direct developer communication without agency markup or delays'
      ],
      projects: ['TubeKit (YouTube Power-Tools MV3)', 'AI Automation R&D Lab Scripts'],
      ctaText: 'Inquire About AI Automation',
      ctaUrl: 'contact.html?service=AI%20Automation',
      faqs: [
        {
          q: 'What kind of tasks can you automate?',
          a: 'I automate file processing, data scraping, media extraction, repetitive browser tasks via Chrome Extensions, API data syncing, and batch file organization.'
        },
        {
          q: 'Do I need technical skills to run the automations?',
          a: 'No. I provide simple one-click execution files, intuitive browser extensions, or step-by-step guides so anyone on your team can run them effortlessly.'
        },
        {
          q: 'Are your browser extensions built with Manifest V3?',
          a: 'Yes. All browser extensions strictly follow modern Google Chrome Manifest V3 guidelines with secure service workers and content scripts.'
        }
      ]
    },

    'graphic-design': {
      id: 'graphic-design',
      title: 'Graphic Design',
      badge: 'Visual Identity',
      icon: 'palette',
      iconClass: 'text-pink-300',
      description:
        'Compelling visual communication assets designed to elevate your brand presence, attract clicks, and communicate clearly across digital channels. Tailored for creators, startups, and modern brands.',
      included: [
        'High-converting YouTube thumbnail design with high visual contrast',
        'Logo concepts and vector brand identity marks',
        'Promotional posters, event flyers, and launch graphics',
        'Social media visual suites (banners, carousel covers, avatars)',
        'Digital presentation slides and pitch deck visuals'
      ],
      technologies: ['Figma', 'Canva Pro', 'Vector Assets', 'Color Grading', 'Visual Hierarchy'],
      deliverables: [
        'High-resolution exported assets in WebP, PNG, JPG, and vector SVG',
        'Editable source files with organized layers and typography styles',
        'Multiple size variations optimized for YouTube, Instagram, and web',
        'Color palette hex codes and font pairing documentation'
      ],
      workflow: [
        { step: '01', title: 'Creative Brief', desc: 'Discussing your target audience, core messaging, visual tone, and competitors.' },
        { step: '02', title: 'Concept Exploration', desc: 'Exploring high-impact visual angles, typography pairings, and composition sketches.' },
        { step: '03', title: 'Refinement & Polish', desc: 'Refining contrast, color grading, lighting effects, and focal points.' },
        { step: '04', title: 'Final Delivery', desc: 'Exporting optimized web assets and organized source files.' }
      ],
      benefits: [
        'Significantly higher click-through rates (CTR) on YouTube and social platforms',
        'Consistent, memorable brand aesthetic across all digital touchpoints',
        'Fast delivery turnaround (24–48 hours for thumbnails and campaign assets)',
        'Professional composition grounded in color psychology and visual contrast'
      ],
      projects: ['Creative Design & Visual Communication Suite', 'NodeLoop Brand Concept'],
      ctaText: 'Inquire About Graphic Design',
      ctaUrl: 'contact.html?service=Graphic%20Design',
      faqs: [
        {
          q: 'What is your turnaround time for YouTube thumbnails or graphics?',
          a: 'Standard turnaround for YouTube thumbnails and social graphics is 24 to 48 hours.'
        },
        {
          q: 'Can you provide the editable source files?',
          a: 'Yes. Full project handoffs include high-resolution exports as well as editable source files in Figma or Canva.'
        },
        {
          q: 'What makes your thumbnails and visual graphics effective?',
          a: 'I focus on focal-point isolation, expressive typography, high-contrast color grading, and emotional resonance that draws the eye on crowded mobile feeds.'
        }
      ]
    }
  };

  function initServicesModal() {
    const modalBackdrop = document.getElementById('service-detail-modal');
    const modalBody = document.getElementById('service-modal-body');
    const modalCloseBtn = document.getElementById('service-modal-close');
    let lastServiceTrigger = null;

    if (!modalBackdrop || !modalBody) return;

    function renderServiceHTML(svc) {
      const includedHTML = (svc.included || [])
        .map(
          (item) => `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <span class="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
              <span>${item}</span>
            </li>
          `
        )
        .join('');

      const deliverablesHTML = (svc.deliverables || [])
        .map(
          (item) => `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
              <span class="text-purple-300 font-bold shrink-0 mt-0.5">📦</span>
              <span>${item}</span>
            </li>
          `
        )
        .join('');

      const workflowHTML = (svc.workflow || [])
        .map(
          (wf) => `
            <div class="p-3.5 rounded-xl bg-white/[0.025] border border-white/10">
              <div class="font-mono text-xs text-cyan-300 font-bold">${wf.step} / ${wf.title}</div>
              <p class="text-xs text-slate-300 mt-1 leading-relaxed">${wf.desc}</p>
            </div>
          `
        )
        .join('');

      const techHTML = (svc.technologies || [])
        .map((t) => `<span class="tech-pill">${t}</span>`)
        .join('');

      const faqsHTML = (svc.faqs || [])
        .map(
          (faq, idx) => `
            <div class="faq-accordion-item" data-faq-index="${idx}">
              <button type="button" class="faq-trigger" aria-expanded="false" aria-controls="faq-ans-${svc.id}-${idx}">
                <span>${faq.q}</span>
                <span class="faq-chevron" aria-hidden="true">▼</span>
              </button>
              <div id="faq-ans-${svc.id}-${idx}" class="faq-content">
                <p>${faq.a}</p>
              </div>
            </div>
          `
        )
        .join('');

      return `
        <div class="space-y-6">
          <!-- Header -->
          <div class="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/25 border border-purple-400/40 flex items-center justify-center shrink-0">
                <i data-lucide="${svc.icon}" class="w-7 h-7 ${svc.iconClass}"></i>
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-mono text-xs uppercase tracking-wider text-purple-300">PROFESSIONAL SERVICE</span>
                  <span class="status-badge status-live">${svc.badge}</span>
                </div>
                <h3 class="font-heading text-2xl sm:text-3xl font-bold text-white">${svc.title}</h3>
              </div>
            </div>
            <div>
              <a href="${svc.ctaUrl}" class="btn-primary text-xs py-2 px-4" data-magnetic>
                <span>${svc.ctaText}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <!-- Description -->
          <div class="p-4 rounded-xl bg-white/[0.025] border border-white/10">
            <p class="text-sm sm:text-base text-slate-200 leading-relaxed">
              ${svc.description}
            </p>
          </div>

          <!-- What Is Included & Typical Deliverables -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div class="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/25">
              <h4 class="font-mono text-xs uppercase tracking-wider text-cyan-300 mb-3">
                What Is Included
              </h4>
              <ul class="space-y-2">
                ${includedHTML}
              </ul>
            </div>

            <div class="p-4 rounded-xl bg-purple-950/20 border border-purple-500/25">
              <h4 class="font-mono text-xs uppercase tracking-wider text-purple-300 mb-3">
                Typical Deliverables
              </h4>
              <ul class="space-y-2">
                ${deliverablesHTML}
              </ul>
            </div>
          </div>

          <!-- 4-Step Working Process -->
          <div>
            <h4 class="font-mono text-xs uppercase tracking-wider text-slate-300 mb-3">
              Workflow &amp; Working Process
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${workflowHTML}
            </div>
          </div>

          <!-- Tech Stack & Tools -->
          <div>
            <h4 class="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2">
              Technologies &amp; Tools Used
            </h4>
            <div class="flex flex-wrap gap-1.5">
              ${techHTML}
            </div>
          </div>

          <!-- Dedicated Accordion FAQ Section -->
          <div class="pt-2">
            <div class="flex items-center gap-2 mb-3">
              <span class="font-mono text-xs uppercase tracking-wider text-cyan-300">FREQUENTLY ASKED QUESTIONS</span>
              <span class="text-xs text-slate-400">(${svc.faqs.length} Answers)</span>
            </div>
            <div class="faq-accordion-container">
              ${faqsHTML}
            </div>
          </div>

          <!-- Direct CTA Footer -->
          <div class="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="font-heading text-sm font-bold text-white">Have a project in mind for ${svc.title}?</div>
              <div class="text-xs text-slate-400">Direct 1-on-1 collaboration • Rapid turnaround • Milestone escrow</div>
            </div>
            <div class="flex items-center gap-3">
              <a href="https://wa.me/9779766271244?text=Hi%20Saurav,%20I'm%20interested%20in%20your%20${encodeURIComponent(svc.title)}%20service" target="_blank" rel="noopener noreferrer" class="btn-secondary text-xs py-2 px-3.5">
                <span>Chat on WhatsApp</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="${svc.ctaUrl}" class="btn-primary text-xs py-2 px-4" data-magnetic>
                <span>Start Project Inquiry</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    function attachAccordionListeners() {
      const items = modalBody.querySelectorAll('.faq-accordion-item');
      items.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          items.forEach((other) => {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-trigger');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    function openServiceModal(serviceId, triggerEl) {
      const data = SERVICES_DATA[serviceId];
      if (!data) return;

      lastServiceTrigger = triggerEl || document.activeElement;
      modalBody.innerHTML = renderServiceHTML(data);
      attachAccordionListeners();

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

    function closeServiceModal() {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');

      if (typeof window.unlockModalScroll === 'function') {
        window.unlockModalScroll();
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }

      if (lastServiceTrigger && typeof lastServiceTrigger.focus === 'function') {
        lastServiceTrigger.focus();
      }
    }

    document.querySelectorAll('[data-open-service]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceId = el.getAttribute('data-open-service');
        openServiceModal(serviceId, el);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeServiceModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeServiceModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeServiceModal();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesModal);
  } else {
    initServicesModal();
  }
})();
