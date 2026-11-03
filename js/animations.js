/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/animations.js — Lenis Smooth Scroll, Universal 3D ScrollTrigger
                       Choreography, Perspective 3D Component Fly-Ins,
                       Magnetic Buttons, and Cursor-Following Radial Glare
   ========================================================================== */

(function () {
  'use strict';

  function initAnimationsAndMicroInteractions() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // 1. Automatically Upgrade All .glass-card Elements into Interactive 3D Components
    const allGlassCards = document.querySelectorAll('.glass-card');
    allGlassCards.forEach((card) => {
      if (!card.hasAttribute('data-tilt')) {
        card.setAttribute('data-tilt', '');
      }
    });

    // 2. High-Performance rAF-Throttled 3D Card Tilt + Cursor Radial Glare
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

    // 3. 3D Portrait Stage Interactive Tilt & Depth Sync
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

    // 4. Magnetic Button Micro-Interaction on [data-magnetic], .btn-primary, .btn-secondary
    if (!prefersReducedMotion && !isTouchDevice) {
      document.querySelectorAll('[data-magnetic], .btn-primary, .btn-secondary').forEach((btn) => {
        let btnRaf = null;
        btn.addEventListener(
          'mousemove',
          (e) => {
            if (btnRaf) cancelAnimationFrame(btnRaf);
            btnRaf = requestAnimationFrame(() => {
              const rect = btn.getBoundingClientRect();
              const dx = e.clientX - (rect.left + rect.width / 2);
              const dy = e.clientY - (rect.top + rect.height / 2);
              btn.style.transform = `translate3d(${(dx * 0.16).toFixed(1)}px, ${(dy * 0.2).toFixed(1)}px, 8px)`;
            });
          },
          { passive: true }
        );

        btn.addEventListener(
          'mouseleave',
          () => {
            if (btnRaf) cancelAnimationFrame(btnRaf);
            btn.style.transform = 'translate3d(0px, 0px, 0px)';
          },
          { passive: true }
        );
      });
    }

    // 5. Synchronized Lenis + GSAP ScrollTrigger Setup
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
          smoothWheel: true
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

    // 6. 3D Hero Entrance Choreography (Perspective 3D Unfold on initial view)
    const heroItems = document.querySelectorAll('[data-hero-reveal]');
    if (heroItems.length > 0) {
      gsap.fromTo(
        heroItems,
        {
          y: 40,
          opacity: 0,
          rotationX: -14,
          z: -65,
          scale: 0.94,
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

    if (typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    // 7. Universal 3D Scroll-Triggered Section Header Reveals
    // As visitor scrolls, each section title, eyebrow badge & description gracefully glides into place
    const sectionHeaders = document.querySelectorAll('section:not(:first-of-type) [data-reveal-item]:not(.glass-card):not(.project-card), section:not(:first-of-type) > div > .max-w-2xl, section:not(:first-of-type) .eyebrow-badge');
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

    // 8. Universal 3D Component Fly-Ins: Every Card Group & Grid
    // As visitor scrolls down, cards and components fly in from 3D space with rotationX, depth, scale, and stagger
    const animatedCardsSet = new Set();

    // Group-based 3D reveals (Grids with [data-reveal-group] or cards inside .grid)
    const revealGroups = document.querySelectorAll('[data-reveal-group], section:not(:first-of-type) .grid');
    revealGroups.forEach((group) => {
      // Find cards directly belonging to this group
      const cards = Array.from(group.querySelectorAll('[data-reveal-item], .glass-card, .project-card')).filter(
        (card) => card.closest('[data-reveal-group], section .grid') === group
      );
      if (cards.length === 0) return;

      cards.forEach((c) => animatedCardsSet.add(c));

      gsap.fromTo(
        cards,
        {
          y: 60,
          opacity: 0,
          rotationX: -18,
          rotationY: (i) => (i % 2 === 0 ? -4 : 4),
          z: -95,
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
              // Clear transform so data-tilt 3D hover interactions are 100% responsive
              card.style.transform = '';
              card.style.opacity = '1';
            });
          }
        }
      );
    });

    // Standalone 3D Cards (Cards not already caught by a group)
    const allRemainingCards = Array.from(document.querySelectorAll('.glass-card, .project-card')).filter(
      (card) => !animatedCardsSet.has(card) && !card.closest('[data-hero-reveal]')
    );

    allRemainingCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 54,
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

    // 9. Interactive 4-Step Working Process Timeline 3D Stagger (services.html)
    const timelineSteps = document.querySelectorAll('.pl-4.space-y-6 > .relative.flex.items-start');
    if (timelineSteps.length > 0) {
      gsap.fromTo(
        timelineSteps,
        {
          x: 36,
          opacity: 0,
          rotationY: 14,
          z: -45,
          transformPerspective: 1000
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          z: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: timelineSteps[0].parentElement,
            start: 'top 84%',
            once: true
          }
        }
      );
    }

    // 10. Scroll-Based Parallax Sync for Hero Portrait, Studio Aura & Base Orbit Ring
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
