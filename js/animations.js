/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/animations.js — Lenis Smooth Scroll, 3D ScrollTrigger Choreography,
                      Perspective 3D Section & Card Fly-Ins,
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

    // 6. 3D Hero Entrance Choreography (Perspective 3D Unfold)
    const heroItems = document.querySelectorAll('[data-hero-reveal]');
    if (heroItems.length > 0) {
      gsap.fromTo(
        heroItems,
        {
          y: 35,
          opacity: 0,
          rotationX: -14,
          z: -60,
          scale: 0.95,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    }

    if (typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    // 7. Scroll-Triggered 3D Perspective Section & Card Fly-Ins
    // When user scrolls down, elements sweep in from 3D space with rotationX, z-depth and scale
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      const children = group.querySelectorAll('[data-reveal-item]');
      if (children.length === 0) return;

      gsap.fromTo(
        children,
        {
          y: 52,
          opacity: 0,
          rotationX: -16,
          rotationY: (i) => (i % 2 === 0 ? -3 : 3),
          z: -85,
          scale: 0.92,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          z: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.085,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // 8. Scroll-Based 3D Cards on Pages without explicit [data-reveal-group] (e.g. Projects Grid & Service Articles)
    const standaloneCards = Array.from(document.querySelectorAll('.project-card, #web-development, #ui-ux-design, #ai-automation, #graphic-design')).filter(
      (el) => !el.closest('[data-reveal-group]')
    );
    standaloneCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: 48,
          opacity: 0,
          rotationX: -15,
          z: -75,
          scale: 0.93,
          transformPerspective: 1200
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            once: true
          }
        }
      );
    });

    // 9. Scroll-Based Parallax Sync for Hero Portrait & Floating 3D Polyhedra
    if (portraitStage && !isTouchDevice) {
      gsap.to('.portrait-frame', {
        y: -32,
        z: 36,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitStage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });

      gsap.to('.floating-poly', {
        y: -48,
        rotation: 32,
        ease: 'none',
        scrollTrigger: {
          trigger: portraitStage,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
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
