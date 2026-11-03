/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/animations.js — Lenis Smooth Scroll, Universal 3D ScrollTrigger
                       Choreography, Masked Editorial Word Reveals,
                       Perspective 3D Component Fly-Ins, Magnetic Physics,
                       Dynamic Process Timeline & Animation Performance Engine
   ========================================================================== */

(function () {
  'use strict';

  function initAnimationsAndMicroInteractions() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // 1. Performance Engine: Pause offscreen section animations (optimize-web-animations)
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
          });
        },
        { threshold: 0.02, rootMargin: '120px 0px 120px 0px' }
      );
      document.querySelectorAll('section, footer').forEach((sec) => {
        sectionObserver.observe(sec);
      });
    }

    // 2. Automatically Upgrade All .glass-card Elements into Interactive 3D Components
    const allGlassCards = document.querySelectorAll('.glass-card');
    allGlassCards.forEach((card) => {
      if (!card.hasAttribute('data-tilt')) {
        card.setAttribute('data-tilt', '');
      }
    });

    // 3. High-Performance rAF-Throttled 3D Card Tilt + Cursor Radial Glare
    if (!isTouchDevice) {
      allGlassCards.forEach((card) => {
        const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '7.5');
        let rafId = null;

        card.addEventListener(
          'mousemove',
          (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              // Update radial glare coordinates
              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              if (!prefersReducedMotion) {
                const relX = x / rect.width - 0.5;
                const relY = y / rect.height - 0.5;
                const rotX = (-relY * maxTilt * 2).toFixed(2);
                const rotY = (relX * maxTilt * 2).toFixed(2);
                card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -6px, 14px)`;
              }
            });
          },
          { passive: true }
        );

        card.addEventListener(
          'mouseleave',
          () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (!prefersReducedMotion) {
              card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px)';
            }
          },
          { passive: true }
        );
      });
    }

    // 4. 3D Portrait Stage Interactive Tilt & Depth Sync
    const portraitStage = document.querySelector('.hero-portrait-stage');
    if (portraitStage && !prefersReducedMotion && !isTouchDevice) {
      let stageRaf = null;
      window.addEventListener(
        'mousemove',
        (e) => {
          if (stageRaf) cancelAnimationFrame(stageRaf);
          stageRaf = requestAnimationFrame(() => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            const rotY = (nx * 8.5).toFixed(2);
            const rotX = (-ny * 6.5).toFixed(2);
            portraitStage.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
          });
        },
        { passive: true }
      );
    }

    // 5. Ambient Cursor Spotlight (Luxury Editorial Focus)
    if (!prefersReducedMotion && !isTouchDevice && typeof window.gsap !== 'undefined') {
      let spotlight = document.querySelector('.ambient-cursor-spotlight');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'ambient-cursor-spotlight';
        spotlight.setAttribute('aria-hidden', 'true');
        document.body.appendChild(spotlight);
      }
      const setX = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power2.out' });
      const setY = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power2.out' });

      window.addEventListener(
        'mousemove',
        (e) => {
          if (!document.body.classList.contains('cursor-active')) {
            document.body.classList.add('cursor-active');
          }
          setX(e.clientX);
          setY(e.clientY);
        },
        { passive: true }
      );

      window.addEventListener(
        'mouseleave',
        () => {
          document.body.classList.remove('cursor-active');
        },
        { passive: true }
      );
    }

    // 6. Magnetic Button Physics with GSAP quickTo (smooth spring feel)
    if (!prefersReducedMotion && !isTouchDevice && typeof window.gsap !== 'undefined') {
      document.querySelectorAll('[data-magnetic], .btn-primary, .btn-secondary').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.32, ease: 'power2.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.32, ease: 'power2.out' });

        btn.addEventListener(
          'mousemove',
          (e) => {
            const rect = btn.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            xTo(dx * 0.22);
            yTo(dy * 0.25);
          },
          { passive: true }
        );

        btn.addEventListener(
          'mouseleave',
          () => {
            xTo(0);
            yTo(0);
          },
          { passive: true }
        );
      });
    }

    // 7. Synchronized Lenis + GSAP ScrollTrigger Setup
    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
      return;
    }

    if (typeof window.ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Initialize Lenis if available and synchronize with ScrollTrigger
    if (typeof window.Lenis !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && !isTouchDevice) {
      try {
        const lenis = new Lenis({
          duration: 1.05,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1.0
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        window.portfolioLenis = lenis;
      } catch (e) {
        // Fallback to native smooth scroll
      }
    }

    // 8. Masked Editorial Word Reveals (masked-reveal skill)
    // Traverses headline DOM safely preserving inner tags like <span class="text-gradient"> and <br>
    function splitWordsSafely(element) {
      if (element.dataset.maskedSplitDone === 'true') return [];
      const words = [];

      function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          const tokens = text.split(/(\s+)/);
          tokens.forEach((token) => {
            if (!token) return;
            if (/^\s+$/.test(token)) {
              frag.appendChild(document.createTextNode(token));
            } else {
              const mask = document.createElement('span');
              mask.className = 'word-mask';
              mask.setAttribute('aria-hidden', 'true');
              const inner = document.createElement('span');
              inner.className = 'word-reveal';
              inner.textContent = token;
              mask.appendChild(inner);
              frag.appendChild(mask);
              words.push(inner);
            }
          });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName.toLowerCase() === 'br') return;
          Array.from(node.childNodes).forEach(traverse);
        }
      }

      const originalText = element.textContent.trim();
      element.setAttribute('aria-label', originalText);
      Array.from(element.childNodes).forEach(traverse);
      element.dataset.maskedSplitDone = 'true';
      return words;
    }

    // 9. 3D Hero Entrance Choreography (Perspective 3D Unfold + Word-by-Word Reveal)
    const heroHeading = document.querySelector('h1[data-hero-reveal]');
    let headlineWords = [];
    if (heroHeading) {
      headlineWords = splitWordsSafely(heroHeading);
    }

    const heroItems = document.querySelectorAll('[data-hero-reveal]');
    if (heroItems.length > 0) {
      // Animate headline masked words
      if (headlineWords.length > 0) {
        gsap.to(headlineWords, {
          y: '0%',
          opacity: 1,
          duration: 0.85,
          stagger: 0.026,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });
      }

      // Animate remaining hero elements (eyebrow, subcopy, CTA buttons)
      const otherHeroItems = Array.from(heroItems).filter((item) => item !== heroHeading);
      if (otherHeroItems.length > 0) {
        gsap.fromTo(
          otherHeroItems,
          {
            y: 36,
            opacity: 0,
            rotationX: -12,
            z: -50,
            scale: 0.96,
            transformPerspective: 1200
          },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            z: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'transform,opacity'
          }
        );
      }
    }

    if (typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    // 10. Universal 3D Scroll-Triggered Section Header Reveals
    const sectionHeaders = document.querySelectorAll(
      'section:not(:first-of-type) [data-reveal-item]:not(.glass-card):not(.project-card), section:not(:first-of-type) > div > .max-w-2xl, section:not(:first-of-type) .eyebrow-badge'
    );
    sectionHeaders.forEach((header) => {
      if (header.closest('[data-hero-reveal]')) return;
      gsap.fromTo(
        header,
        {
          y: 38,
          opacity: 0,
          rotationX: -12,
          z: -50,
          transformPerspective: 1100
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // 11. Universal 3D Component Fly-Ins: Every Card Group & Grid
    const animatedCardsSet = new Set();

    const revealGroups = document.querySelectorAll('[data-reveal-group], section:not(:first-of-type) .grid');
    revealGroups.forEach((group) => {
      const cards = Array.from(group.querySelectorAll('[data-reveal-item], .glass-card, .project-card')).filter(
        (card) => card.closest('[data-reveal-group], section .grid') === group
      );
      if (cards.length === 0) return;

      cards.forEach((c) => animatedCardsSet.add(c));

      gsap.fromTo(
        cards,
        {
          y: 58,
          opacity: 0,
          rotationX: -18,
          rotationY: (i) => (i % 2 === 0 ? -4 : 4),
          z: -90,
          scale: 0.91,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 0.82,
          stagger: 0.085,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true
          },
          onComplete: () => {
            cards.forEach((card) => {
              card.style.transform = '';
              card.style.opacity = '1';
            });
          }
        }
      );
    });

    // Standalone 3D Cards
    const allRemainingCards = Array.from(document.querySelectorAll('.glass-card, .project-card')).filter(
      (card) => !animatedCardsSet.has(card) && !card.closest('[data-hero-reveal]')
    );

    allRemainingCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 52,
          opacity: 0,
          rotationX: -16,
          z: -80,
          scale: 0.92,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 0.76,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 87%',
            once: true
          },
          onComplete: () => {
            card.style.transform = '';
            card.style.opacity = '1';
          }
        }
      );
    });

    // 12. Dynamic Scroll-Progress Timeline Controller (services.html)
    const timelineContainer = document.getElementById('working-process-timeline');
    const timelineFill = document.getElementById('timeline-progress-fill');
    if (timelineContainer && timelineFill) {
      const steps = timelineContainer.querySelectorAll('.timeline-step');
      ScrollTrigger.create({
        trigger: timelineContainer,
        start: 'top 78%',
        end: 'bottom 60%',
        scrub: 0.35,
        onUpdate: (self) => {
          const p = self.progress;
          timelineFill.style.transform = `scaleY(${p})`;
          steps.forEach((step, idx) => {
            const stepThreshold = steps.length > 1 ? idx / (steps.length - 1) : 0;
            if (p >= stepThreshold - 0.06) {
              step.classList.add('is-active');
            } else {
              step.classList.remove('is-active');
            }
          });
        }
      });
    }

    // 13. Scroll-Based Parallax Sync for Hero Portrait, Studio Aura & Base Orbit Ring
    if (portraitStage && !isTouchDevice) {
      gsap.to('.portrait-frame', {
        y: -36,
        z: 42,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitStage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      gsap.to('.neon-orbit-ring', {
        rotationX: 84,
        rotationZ: 45,
        scale: 1.15,
        opacity: 0.85,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitStage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });

      gsap.to('.portrait-glow-aura', {
        scale: 1.25,
        y: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitStage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationsAndMicroInteractions);
  } else {
    initAnimationsAndMicroInteractions();
  }
})();
