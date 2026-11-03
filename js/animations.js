/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/animations.js — Lenis Smooth Scroll, GSAP ScrollTrigger, 3D Card Tilt,
                      Magnetic Buttons, and Cursor-Following Radial Glare
   Audited & Upgraded with UI/UX Pro Max GSAP & Accessibility Guidelines
   ========================================================================== */

(function () {
  'use strict';

  function initAnimationsAndMicroInteractions() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    // 1. Cursor-Following Radial Glare on .glass-card elements
    if (!isTouchDevice) {
      document.querySelectorAll('.glass-card').forEach((card) => {
        card.addEventListener(
          'mousemove',
          (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          },
          { passive: true }
        );
      });
    }

    // 2. 3D Card Tilt Micro-Interaction on [data-tilt] elements (Subtle 4.5deg max to prevent jitter)
    if (!prefersReducedMotion && !isTouchDevice) {
      document.querySelectorAll('[data-tilt]').forEach((el) => {
        const maxTilt = parseFloat(el.getAttribute('data-tilt-max') || '4.5');
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          const rotX = (-relY * maxTilt * 2).toFixed(2);
          const rotY = (relX * maxTilt * 2).toFixed(2);
          el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
      });
    }

    // 3. Magnetic Button Micro-Interaction on [data-magnetic] elements
    if (!prefersReducedMotion && !isTouchDevice) {
      document.querySelectorAll('[data-magnetic]').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          btn.style.transform = `translate(${(dx * 0.15).toFixed(1)}px, ${(dy * 0.18).toFixed(1)}px)`;
        });

        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0px, 0px)';
        });
      });
    }

    // 4. Synchronized Lenis + GSAP ScrollTrigger Setup
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
          duration: 1.0,
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

    // 5. Hero Entrance Choreography (ui-ux-pro-max Subtle/Standard Tier: 12-16px offset, 0.35-0.45s, power2.out)
    const heroItems = document.querySelectorAll('[data-hero-reveal]');
    if (heroItems.length > 0) {
      gsap.fromTo(
        heroItems,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        }
      );
    }

    // 6. Scroll-Triggered Section & Card Reveals (12px y-offset, 0.38s duration, 0.05s stagger)
    if (typeof window.ScrollTrigger !== 'undefined') {
      document.querySelectorAll('[data-reveal-group]').forEach((group) => {
        const children = group.querySelectorAll('[data-reveal-item]');
        if (children.length === 0) return;

        gsap.fromTo(
          children,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.38,
            stagger: 0.05,
            ease: 'power1.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: group,
              start: 'top 88%',
              once: true
            }
          }
        );
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationsAndMicroInteractions);
  } else {
    initAnimationsAndMicroInteractions();
  }
})();
