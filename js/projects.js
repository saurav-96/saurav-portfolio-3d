/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/projects.js — Portfolio Filtering, Deep-Linking & Case-Study Modal System
   ========================================================================== */

(function () {
  'use strict';

  const PROJECT_CASE_STUDIES = {
    swasthyasutra: {
      id: 'swasthyasutra',
      number: 'PROJECT 01',
      title: 'SwasthyaSutra',
      category: 'Healthcare Technology',
      filterGroup: 'web',
      projectNature: 'Personal Web Application Prototype (Live Demo)',
      statusClass: 'status-live',
      thumbnail: 'assets/projects/swasthyasutra-thumb.png',
      liveUrl: 'https://saurav-96.github.io/SwasthyaSutra/',
      githubUrl: 'https://github.com/saurav-96/SwasthyaSutra',
      overview:
        'A healthcare-focused digital platform designed to make healthcare information, real-time vitals dashboards, and digital health services more accessible and intuitive.',
      problem:
        'Many digital health portals suffer from cluttered interfaces, confusing navigation, and poor mobile responsiveness, making it difficult for users to quickly understand health metrics or book appointments.',
      objective:
        'Design and build an accessible, dark-mode-ready healthcare web experience that presents health monitoring insights, appointment pathways, and AI-assisted guidance (SanjeevanAI concept) in a clean visual hierarchy.',
      contribution:
        'End-to-end UI/UX Architecture, Visual Identity, Frontend Engineering (React, Tailwind CSS, JavaScript), Interactive Dashboard Components, and Responsive Layout Implementation.',
      designProcess:
        'Structured around high-contrast data cards, calm cyan/blue medical trust accents, and clear call-to-action buttons so users can move from overview metrics to specific health tools without cognitive overload.',
      techStack: ['React', 'Tailwind CSS', 'SanjeevanAI Engine', 'Real-Time Vitals UI', 'Telemedicine Portal', 'Responsive UX'],
      challenges:
        'Balancing dense health metric visualizations (heart rate BPM, sync indicators, and AI insight cards) while maintaining generous whitespace and fast load performance on mobile browsers.',
      outcomes:
        'Delivered a functional, multi-section live web application demonstrating healthcare dashboard UI design and responsive frontend implementation.'
    },

    keyflow: {
      id: 'keyflow',
      number: 'PROJECT 02',
      title: 'KeyFlow',
      category: 'Productivity Web Application',
      filterGroup: 'web',
      projectNature: 'Personal Web Application (Live Demo)',
      statusClass: 'status-live',
      thumbnail: 'assets/projects/keyflow-thumb.png',
      liveUrl: 'https://saurav-96.github.io/KeyFlow/',
      githubUrl: 'https://github.com/saurav-96/KeyFlow',
      overview:
        'A productivity-focused web experience designed around keyboard shortcut organization, workflow management, and rapid muscle-memory lookup.',
      problem:
        'Developers and designers switch between VS Code, Figma, Chrome, and OS environments daily, often forgetting time-saving keyboard shortcuts or burying them in static text notes.',
      objective:
        'Create a tactile, searchable personal keyboard command center where users can filter shortcuts by application, pin favorites, add custom bindings, and import/export collections.',
      contribution:
        'Product Concept, UI/UX Component System (tactile 3D keycaps, live key capture, workspace sidebar, quick-filter chips), State & LocalStorage Persistence, and RFC 4180 CSV/JSON Portability.',
      designProcess:
        'Designed with a clean dashboard layout featuring instant application filters (VS Code, Chrome, Windows, Figma, Photoshop), one-click copy actions, and OS-aware keycap notation.',
      techStack: ['React 19', 'Vite 6', 'Tailwind CSS', 'Lucide Icons', 'Vitest Tested', 'LocalStorage Persistence'],
      challenges:
        'Designing keycap combinations so multi-key bindings (such as Ctrl + Shift + P) remain readable, aligned, and scannable across both desktop and mobile viewports.',
      outcomes:
        'Published as a live interactive web application that showcases stateful frontend logic, clean dashboard typography, and practical developer productivity tooling.'
    },

    egov: {
      id: 'egov',
      number: 'PROJECT 03',
      title: 'E-Government Platform (Butwal SmartGov)',
      category: 'Civic Technology',
      filterGroup: 'web',
      projectNature: 'Civic Tech Concept & Live Portal Prototype',
      statusClass: 'status-live',
      thumbnail: 'assets/projects/egov-thumb.png',
      liveUrl: 'https://saurav-96.github.io/E-Governmet-platform/',
      githubUrl: 'https://github.com/saurav-96/E-Governmet-platform',
      overview:
        'A digital governance platform concept (Butwal SmartGov) focused on making municipal public services, department statuses, and civic announcements more accessible through modern web technologies.',
      problem:
        'Traditional municipal websites are often difficult to navigate, text-heavy, and lack clear status visibility across public departments like healthcare, traffic safety, education, and agriculture.',
      objective:
        'Reimagine how a local sub-metropolitan portal can organize civic services, real-time department indicators, and public announcements into a modern, transparent dashboard.',
      contribution:
        'Information Architecture, Civic Dashboard UI Design, Bilingual-ready Navigation Structure, Department Status Cards, and Responsive Frontend Development.',
      designProcess:
        'Organized municipal workflows into a clear left-hand department directory paired with an executive overview dashboard highlighting citizen service categories and recent city notices.',
      techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Lucide Icons'],
      challenges:
        'Structuring municipal departments (Health, Agriculture, Traffic Safety, Environment, Education, IT, Tourism, Business, Gov Services) into an intuitive navigation system.',
      outcomes:
        'Created a live civic technology demonstration hosted on GitHub Pages that illustrates how thoughtful UI/UX can modernize public-sector digital portals.'
    },

    youtubepowertools: {
      id: 'youtubepowertools',
      number: 'PROJECT 04',
      title: 'YouTube Power-Tools (TubeKit)',
      category: 'Browser Extension / JavaScript',
      filterGroup: 'web',
      projectNature: 'CS50x Final Project & Browser Extension',
      statusClass: 'status-live',
      thumbnail: 'assets/projects/tubekit-thumb.png',
      liveUrl: 'https://github.com/saurav-96/TubeKit',
      githubUrl: 'https://github.com/saurav-96/TubeKit',
      overview:
        'A browser extension project exploring useful YouTube productivity features, including 0.10x–4.00x precision playback speed controls, HD thumbnail capture, lossless PNG frame screenshots, and custom keyboard shortcuts.',
      problem:
        'Students, researchers, and creators watching educational content on YouTube frequently need quick frame captures, high-resolution thumbnails, or fine-grained playback speed adjustments without leaving the player.',
      objective:
        'Build a lightweight Chromium browser extension using Manifest V3 that injects a glassmorphic 7-control utility bar directly into the YouTube watch experience.',
      contribution:
        'Chrome Extension Architecture (Manifest V3), Content Script DOM Integration, Popup Interface Design, Canvas Frame Capture Logic, and Keyboard Shortcut Handlers.',
      designProcess:
        'Focused on zero-clutter ergonomics so utility triggers blend naturally with YouTube’s dark interface while providing instant feedback.',
      featureBreakdown: {
        implemented: [
          '7-element glassmorphic in-player control pill (0.10x–4.00x speed)',
          'One-click lossless PNG video frame screenshot capture via HTML5 Canvas',
          'High-resolution YouTube video thumbnail extractor',
          'Custom keyboard shortcut bindings & Chrome Storage Sync'
        ],
        planned: [
          'Timestamped markdown note export for study sessions',
          'Custom A–B loop segment bookmarking across sessions',
          'Cloud sync for saved video timestamps'
        ]
      },
      techStack: ['Chrome Extension MV3', 'JavaScript (ES6+)', 'HTML5 Canvas & Video API', 'Chrome Storage Sync', 'CS50x Final Project'],
      challenges:
        'Handling YouTube’s Single-Page Application (SPA) dynamic DOM updates reliably so injected controls persist cleanly when navigating between videos.',
      outcomes:
        'Completed as the capstone final project for Harvard University’s CS50x Introduction to Computer Science and open-sourced on GitHub.'
    },

    mindfulyou: {
      id: 'mindfulyou',
      number: 'PROJECT 05',
      title: 'Mindful You',
      category: 'UI/UX Design Concept',
      filterGroup: 'uiux',
      projectNature: 'UI/UX Design Concept & Interactive Prototype',
      statusClass: 'status-concept',
      thumbnail: 'assets/projects/mindful-you.svg',
      liveUrl: '',
      githubUrl: '',
      overview:
        'A modern wellness landing page and mobile interface concept focused on clean layouts, intuitive user journeys, and conversion-oriented visual design.',
      problem:
        'Wellness and meditation apps often overwhelm new visitors with complex subscription tiers before communicating a sense of calm and product clarity.',
      objective:
        'Craft a cohesive desktop landing page and companion mobile session screen concept that guides users smoothly from value discovery to starting a guided breathing session.',
      contribution:
        'User Flow Mapping, Wireframing, High-Fidelity Visual Design in Figma, Typography & Color System Selection, and Conversion-Focused Landing Page Layout.',
      designProcess:
        'Paired serene violet-cyan gradients with generous breathing room, clear typographic hierarchy, and tactile mobile player cards to evoke mindfulness while maintaining strong CTA visibility.',
      techStack: ['Figma', 'UI/UX Wireframing', 'Interactive Prototyping', 'Design Systems', 'Responsive Layout'],
      challenges:
        'Maintaining high WCAG text contrast and clear visual hierarchy while working with soft atmospheric gradients and glassmorphic surfaces.',
      outcomes:
        'Produced a complete multi-screen UI/UX design concept demonstrating landing page conversion thinking and mobile interface craft.'
    },

    aiautomation: {
      id: 'aiautomation',
      number: 'PROJECT 06',
      title: 'AI & Automation Experiments',
      category: 'AI / Python',
      filterGroup: 'ai',
      projectNature: 'Personal R&D Sandbox & Workflow Scripts',
      statusClass: 'status-lab',
      thumbnail: 'assets/projects/ai-automation-lab.svg',
      liveUrl: '',
      githubUrl: 'https://github.com/saurav-96',
      overview:
        'An evolving collection of personal experiments exploring Python automation, AI-assisted workflows, and practical scripting integrations.',
      problem:
        'Repetitive digital tasks—such as organizing project assets, formatting structured notes, or extracting metadata—consume valuable creative and development time.',
      objective:
        'Explore how Python scripts, CLI utilities, and LLM prompt workflows can automate recurring local and web tasks reliably.',
      contribution:
        'Python Scripting, Prompt Workflow Structuring, File & Data Parsing Utilities, and Browser/API Automation Exploration.',
      designProcess:
        'Built as modular, testable Python scripts and CLI experiments rather than monolithic apps, focusing on clean input/output schemas and practical daily utility.',
      techStack: ['Python', 'C', 'AI Prompt Workflows', 'JSON Schema Parsing', 'CLI Scripting'],
      challenges:
        'Structuring AI-assisted outputs so scripts handle edge cases and malformed responses gracefully with deterministic fallbacks.',
      outcomes:
        'Ongoing personal laboratory of automation scripts and workflow experiments that inform my approach to developer productivity.'
    },

    creativedesign: {
      id: 'creativedesign',
      number: 'PROJECT 07',
      title: 'Creative Design Showcase',
      category: 'Graphic Design',
      filterGroup: 'graphic',
      projectNature: 'Visual Communication & Brand Explorations',
      statusClass: 'status-concept',
      thumbnail: 'assets/projects/creative-design-suite.svg',
      galleryAssets: [
        { title: 'NodeLoop Brand Identity', src: 'assets/projects/brand-nodeloop.svg' },
        { title: 'Automation Thumbnail Concept', src: 'assets/projects/thumbnail-automation.svg' },
        { title: 'BuildNext Event Poster', src: 'assets/projects/poster-buildnext.svg' },
        { title: 'Social Media Campaign Kit', src: 'assets/projects/social-campaign.svg' }
      ],
      liveUrl: '',
      githubUrl: '',
      overview:
        'A curated collection of graphic design work including logo concepts, website visual concepts, high-contrast YouTube thumbnails, promotional posters, and branding explorations.',
      problem:
        'Digital brands and creators need visual assets that capture attention immediately in crowded feeds while staying consistent with their core identity.',
      objective:
        'Develop versatile visual communication pieces across brand marks, promotional posters, and social/video thumbnails with strong focal points and typography.',
      contribution:
        'Logo Concept Design, Typography Composition, Color Direction, YouTube Thumbnail Framing, and Promotional Poster Layout.',
      designProcess:
        'Iterative sketching and digital composition in Figma and Canva, testing readability at both small thumbnail scales and full-screen poster dimensions.',
      techStack: ['Figma', 'Canva', 'Visual Identity', 'Typography', 'Vector Illustration'],
      challenges:
        'Creating bold visual impact in compact formats like YouTube thumbnails without resorting to cluttered text or unreadable contrast.',
      outcomes:
        'A versatile graphic design portfolio supporting content creators, student events, and brand identity concepts.'
    }
  };

  function initProjectsSystem() {
    // 1. Category Filter Logic (on projects.html)
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('[data-project-card]');
    const projectCountLabel = document.getElementById('project-count-label');

    function applyFilter(category) {
      let visibleCount = 0;
      projectCards.forEach((card) => {
        const cats = (card.getAttribute('data-categories') || '').split(',').map((s) => s.trim());
        const matches = category === 'all' || cats.includes(category);

        if (matches) {
          card.classList.remove('hidden');
          visibleCount++;
          if (typeof window.gsap !== 'undefined') {
            gsap.fromTo(
              card,
              { opacity: 0, y: 14, scale: 0.985 },
              { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform' }
            );
          }
        } else {
          card.classList.add('hidden');
        }
      });

      if (projectCountLabel) {
        projectCountLabel.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? '' : 's'}`;
      }

      if (typeof window.ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    if (filterButtons.length > 0) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-filter') || 'all';
          filterButtons.forEach((b) => {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          applyFilter(cat);
        });
      });
    }

    // 2. Expandable Case-Study Modal Logic (works on both index.html and projects.html)
    const modalBackdrop = document.getElementById('case-study-modal');
    const modalContent = document.getElementById('case-study-modal-body');
    const modalCloseBtn = document.getElementById('case-study-modal-close');
    let lastFocusedTrigger = null;

    function renderCaseStudyHTML(data) {
      const featureComparisonHTML = data.featureBreakdown
        ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <h4 class="font-heading text-sm font-semibold text-emerald-300 uppercase tracking-wider mb-2">
                ✓ Implemented Features
              </h4>
              <ul class="space-y-1.5 text-sm text-slate-200 list-disc pl-4">
                ${data.featureBreakdown.implemented.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
              <h4 class="font-heading text-sm font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                ◎ Planned Roadmap Features
              </h4>
              <ul class="space-y-1.5 text-sm text-slate-300 list-disc pl-4">
                ${data.featureBreakdown.planned.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        `
        : '';

      const galleryHTML = data.galleryAssets
        ? `
          <div class="my-6">
            <h4 class="font-mono text-xs uppercase tracking-widest text-purple-300 mb-3">Visual Design Artifacts</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${data.galleryAssets
                .map(
                  (g) => `
                <div class="rounded-xl overflow-hidden border border-white/10 bg-[#07070C] p-2">
                  <img src="${g.src}" alt="${g.title}" class="w-full h-40 object-cover rounded-lg mb-2" loading="lazy" />
                  <p class="text-xs font-mono text-slate-300 px-1">${g.title}</p>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
        : '';

      const liveBtnHTML = data.liveUrl
        ? `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-sm">
             <span>${data.liveUrl.includes('github.com') ? 'View Repository' : 'Launch Live Demo'}</span>
             <span aria-hidden="true">↗</span>
           </a>`
        : `<span class="tech-pill text-cyan-300 border-cyan-500/30 py-2 px-4">Design Concept / Local Prototype</span>`;

      const repoBtnHTML =
        data.githubUrl && data.githubUrl !== data.liveUrl
          ? `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
               <span>GitHub Repository</span>
               <span aria-hidden="true">↗</span>
             </a>`
          : '';

      return `
        <div class="p-6 sm:p-8">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs uppercase tracking-widest text-cyan-400">${data.number}</span>
              <span class="text-slate-600">•</span>
              <span class="font-mono text-xs text-purple-300">${data.category}</span>
            </div>
            <span class="status-badge ${data.statusClass}">${data.projectNature}</span>
          </div>

          <h2 id="modal-project-title" class="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            ${data.title}
          </h2>
          <p class="text-slate-300 text-base leading-relaxed mb-6">${data.overview}</p>

          <div class="rounded-2xl overflow-hidden border border-purple-500/25 bg-[#07070C] mb-6">
            <img src="${data.thumbnail}" alt="${data.title} showcase preview" class="w-full max-h-[440px] object-contain mx-auto" />
          </div>

          ${featureComparisonHTML}
          ${galleryHTML}

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-purple-400 mb-1.5">The Problem</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.problem}</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-1.5">Objective</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.objective}</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-purple-400 mb-1.5">My Contribution</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.contribution}</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-1.5">Design & Engineering Process</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.designProcess}</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-purple-400 mb-1.5">Key Challenges</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.challenges}</p>
            </div>
            <div class="p-4 rounded-xl bg-white/[0.02] border border-white/10">
              <h3 class="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-1.5">Outcomes</h3>
              <p class="text-sm text-slate-300 leading-relaxed">${data.outcomes}</p>
            </div>
          </div>

          <div class="mb-7">
            <h3 class="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2.5">Technology Stack</h3>
            <div class="flex flex-wrap gap-2">
              ${data.techStack.map((t) => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10">
            <div class="flex flex-wrap items-center gap-3">
              ${liveBtnHTML}
              ${repoBtnHTML}
            </div>
            <a href="contact.html?project=${encodeURIComponent(data.title)}" class="text-sm font-medium text-purple-300 hover:text-cyan-300 transition">
              Build something similar together →
            </a>
          </div>
        </div>
      `;
    }

    function openCaseStudy(projectId, triggerEl) {
      const data = PROJECT_CASE_STUDIES[projectId];
      if (!data || !modalBackdrop || !modalContent) return;

      lastFocusedTrigger = triggerEl || document.activeElement;
      modalContent.innerHTML = renderCaseStudyHTML(data);
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      if (typeof window.lockModalScroll === 'function') {
        window.lockModalScroll();
      } else {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
      }

      if (modalCloseBtn) {
        modalCloseBtn.focus();
      }
    }

    // Keyboard Focus Trap inside Case Study Modal
    if (modalBackdrop) {
      modalBackdrop.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab' || !modalBackdrop.classList.contains('open')) return;
        const focusable = modalBackdrop.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      });
    }

    function closeCaseStudy() {
      if (!modalBackdrop) return;
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      if (typeof window.unlockModalScroll === 'function') {
        window.unlockModalScroll();
      } else {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      }
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
      }
    }

    // -------------------------------------------------------------------------
    // Featured Projects Carousel Controller (Home Page)
    // -------------------------------------------------------------------------
    // FEATURED PROJECTS CAROUSEL (GSAP Smooth Motion & Inertial Drag System)
    // -------------------------------------------------------------------------
    const carouselTrack = document.getElementById('projects-carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev-btn');
    const carouselNextBtn = document.getElementById('carousel-next-btn');
    const progressIndicator = document.getElementById('carousel-progress-indicator');
    const currentIndexLabel = document.getElementById('carousel-current-index');

    if (carouselTrack) {
      let activeSlideTween = null;
      const allCards = Array.from(carouselTrack.querySelectorAll('.project-card'));
      const totalCards = allCards.length || 7;

      function getSingleCardStep() {
        const firstCard = allCards[0] || carouselTrack.querySelector('.project-card');
        if (firstCard) {
          const cardWidth = firstCard.getBoundingClientRect().width;
          const style = window.getComputedStyle(carouselTrack);
          const gap = parseFloat(style.columnGap || style.gap || '28') || 28;
          return cardWidth + gap;
        }
        return 380;
      }

      function getSlideStep() {
        const trackWidth = carouselTrack.clientWidth;
        const singleStep = getSingleCardStep();
        if (trackWidth >= 1050) {
          // Slide 3 cards on desktop
          return singleStep * 3;
        } else if (trackWidth >= 680) {
          // Slide 2 cards on tablet
          return singleStep * 2;
        }
        // Slide 1 card on mobile
        return singleStep;
      }

      function updateCardSpatialDepth() {
        if (allCards.length === 0) return;
        const trackRect = carouselTrack.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        allCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const dist = Math.abs(trackCenter - cardCenter);
          const maxDist = trackRect.width * 0.75;
          const normDist = Math.min(1, dist / maxDist);

          // Subtle cinematic scaling & opacity drop for flanking cards
          const scale = 1 - normDist * 0.04;
          const opacity = 1 - normDist * 0.12;

          card.style.transform = `scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
        });
      }

      function updateCarouselControls() {
        const scrollLeft = carouselTrack.scrollLeft;
        const maxScroll = Math.max(0, carouselTrack.scrollWidth - carouselTrack.clientWidth);
        const singleStep = getSingleCardStep();

        // Update Prev / Next button disabled states
        if (carouselPrevBtn) {
          const isAtStart = scrollLeft <= 8;
          carouselPrevBtn.disabled = isAtStart;
          carouselPrevBtn.setAttribute('aria-disabled', isAtStart ? 'true' : 'false');
        }

        if (carouselNextBtn) {
          const isAtEnd = scrollLeft >= maxScroll - 8;
          carouselNextBtn.disabled = isAtEnd;
          carouselNextBtn.setAttribute('aria-disabled', isAtEnd ? 'true' : 'false');
        }

        // Update Live Progress Bar Indicator
        if (progressIndicator) {
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          const minWidthPct = (1 / totalCards) * 100;
          const currentWidthPct = minWidthPct + progress * (100 - minWidthPct);
          progressIndicator.style.width = `${Math.min(100, Math.max(minWidthPct, currentWidthPct)).toFixed(1)}%`;
        }

        // Update Current Project Number Counter (e.g., 01, 02, ..., 07)
        if (currentIndexLabel) {
          const activeIndex = Math.min(totalCards, Math.max(1, Math.round(scrollLeft / singleStep) + 1));
          currentIndexLabel.textContent = String(activeIndex).padStart(2, '0');
        }

        // Update depth perspective on cards
        updateCardSpatialDepth();
      }

      function smoothSlideTo(target, duration = 0.95) {
        const maxScroll = Math.max(0, carouselTrack.scrollWidth - carouselTrack.clientWidth);
        const clampedTarget = Math.max(0, Math.min(maxScroll, target));

        if (typeof window.gsap !== 'undefined') {
          if (activeSlideTween) activeSlideTween.kill();

          carouselTrack.classList.add('is-animating');

          activeSlideTween = gsap.to(carouselTrack, {
            scrollLeft: clampedTarget,
            duration,
            ease: 'power3.out',
            onUpdate: updateCarouselControls,
            onComplete: () => {
              carouselTrack.classList.remove('is-animating');
              updateCarouselControls();
              activeSlideTween = null;
            }
          });
        } else {
          carouselTrack.scrollTo({ left: clampedTarget, behavior: 'smooth' });
        }
      }

      function smoothSlide(direction) {
        const step = getSlideStep();
        const singleStep = getSingleCardStep();

        let current = carouselTrack.scrollLeft;
        if (activeSlideTween && activeSlideTween.isActive()) {
          current = activeSlideTween.vars.scrollLeft;
        }

        let target = current + direction * step;
        target = Math.round(target / singleStep) * singleStep;
        smoothSlideTo(target, 0.95);
      }

      if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          smoothSlide(1);
        });
      }

      if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          smoothSlide(-1);
        });
      }

      // -----------------------------------------------------------------------
      // Interactive Pointer & Touch Drag with Momentum Physics
      // -----------------------------------------------------------------------
      let isPointerDown = false;
      let startX = 0;
      let startScrollLeft = 0;
      let lastX = 0;
      let lastTime = 0;
      let velocityX = 0;
      let hasDraggedSignificantly = false;

      carouselTrack.addEventListener('pointerdown', (e) => {
        // Only primary mouse button or touch
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        isPointerDown = true;
        hasDraggedSignificantly = false;
        startX = e.clientX;
        lastX = e.clientX;
        lastTime = performance.now();
        startScrollLeft = carouselTrack.scrollLeft;
        velocityX = 0;

        if (activeSlideTween) activeSlideTween.kill();
        carouselTrack.classList.add('is-dragging');
        carouselTrack.setPointerCapture(e.pointerId);
      });

      carouselTrack.addEventListener('pointermove', (e) => {
        if (!isPointerDown) return;
        const now = performance.now();
        const dt = now - lastTime;
        const currentX = e.clientX;
        const deltaX = currentX - startX;

        if (Math.abs(deltaX) > 6) {
          hasDraggedSignificantly = true;
        }

        if (dt > 10) {
          velocityX = (currentX - lastX) / dt;
          lastX = currentX;
          lastTime = now;
        }

        carouselTrack.scrollLeft = startScrollLeft - deltaX;
        updateCarouselControls();
      });

      function handleDragRelease(e) {
        if (!isPointerDown) return;
        isPointerDown = false;
        carouselTrack.classList.remove('is-dragging');

        try {
          if (carouselTrack.hasPointerCapture(e.pointerId)) {
            carouselTrack.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}

        if (hasDraggedSignificantly) {
          // Suppress accidental click navigation immediately after drag release
          const singleStep = getSingleCardStep();
          // Momentum throw distance
          const momentumOffset = -velocityX * 160;
          let target = carouselTrack.scrollLeft + momentumOffset;
          target = Math.round(target / singleStep) * singleStep;
          smoothSlideTo(target, 0.85);

          // Suppress child clicks for 180ms
          const suppressHandler = (clickEvent) => {
            clickEvent.stopPropagation();
            clickEvent.preventDefault();
          };
          carouselTrack.addEventListener('click', suppressHandler, { capture: true, once: true });
          setTimeout(() => {
            carouselTrack.removeEventListener('click', suppressHandler, { capture: true });
          }, 180);
        } else {
          // Subtle snap to nearest card if released without velocity
          const singleStep = getSingleCardStep();
          const target = Math.round(carouselTrack.scrollLeft / singleStep) * singleStep;
          smoothSlideTo(target, 0.45);
        }
      }

      carouselTrack.addEventListener('pointerup', handleDragRelease);
      carouselTrack.addEventListener('pointercancel', handleDragRelease);

      // -----------------------------------------------------------------------
      // Wheel & Trackpad Horizontal Smooth Deflection
      // -----------------------------------------------------------------------
      let wheelTimeout = null;
      carouselTrack.addEventListener(
        'wheel',
        (e) => {
          // Only intercept when horizontal intent is present or shift key held
          const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
          if (delta !== 0) {
            e.preventDefault();
            carouselTrack.classList.add('is-animating');
            carouselTrack.scrollLeft += delta * 0.9;
            updateCarouselControls();

            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
              carouselTrack.classList.remove('is-animating');
              const singleStep = getSingleCardStep();
              const target = Math.round(carouselTrack.scrollLeft / singleStep) * singleStep;
              smoothSlideTo(target, 0.5);
            }, 120);
          }
        },
        { passive: false }
      );

      // Scroll event synchronization
      let carouselTicking = false;
      carouselTrack.addEventListener(
        'scroll',
        () => {
          if (!carouselTicking) {
            requestAnimationFrame(() => {
              updateCarouselControls();
              carouselTicking = false;
            });
            carouselTicking = true;
          }
        },
        { passive: true }
      );

      window.addEventListener('resize', updateCarouselControls, { passive: true });
      setTimeout(updateCarouselControls, 100);
    }

    document.querySelectorAll('[data-open-case]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.getAttribute('data-open-case');
        openCaseStudy(projectId, btn);
      });
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeCaseStudy);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
          closeCaseStudy();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
        closeCaseStudy();
      }
    });

    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get('category');
    if (initialCategory && filterButtons.length > 0) {
      const targetBtn = document.querySelector(`[data-filter="${initialCategory}"]`);
      if (targetBtn) targetBtn.click();
    }

    const initialCase = params.get('case');
    if (initialCase && PROJECT_CASE_STUDIES[initialCase]) {
      setTimeout(() => openCaseStudy(initialCase, null), 250);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsSystem);
  } else {
    initProjectsSystem();
  }
})();
