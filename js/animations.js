/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/animations.js — Dynamic 3D ScrollTrigger System, Perspective Component Fly-Ins,
                       rAF 3D Card Tilt, Magnetic Physics & Smooth Motion Engine
   ========================================================================== */

(function () {
  'use strict';

  function initAnimationsAndMicroInteractions() {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Automatically Upgrade All .glass-card & .project-card Elements into Interactive 3D Components
    const allGlassCards = document.querySelectorAll('.glass-card, .project-card');
    allGlassCards.forEach((card) => {
      if (!card.hasAttribute('data-tilt')) {
        card.setAttribute('data-tilt', '');
      }
    });

    // 2. High-Performance 3D Card Tilt + Cursor Radial Glare (Active only on pointer/mouse devices)
    if (isFinePointer) {
      allGlassCards.forEach((card) => {
        const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '8.5');
        let rafId = null;
        let cachedRect = null;

        card.addEventListener(
          'mouseenter',
          () => {
            cachedRect = card.getBoundingClientRect();
          },
          { passive: true }
        );

        card.addEventListener(
          'mousemove',
          (e) => {
            if (!cachedRect) {
              cachedRect = card.getBoundingClientRect();
            }
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              const x = e.clientX - cachedRect.left;
              const y = e.clientY - cachedRect.top;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              const relX = x / cachedRect.width - 0.5;
              const relY = y / cachedRect.height - 0.5;
              const rotX = (-relY * maxTilt * 2).toFixed(2);
              const rotY = (relX * maxTilt * 2).toFixed(2);
              card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -8px, 24px)`;
            });
          },
          { passive: true }
        );

        card.addEventListener(
          'mouseleave',
          () => {
            if (rafId) cancelAnimationFrame(rafId);
            cachedRect = null;
            card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0px, 0px)';
          },
          { passive: true }
        );
      });
    }

    // 3. 3D Portrait Stage Interactive Tilt & Depth Tracking (Mouse viewports only)
    const portraitStage = document.querySelector('.hero-portrait-stage');
    if (portraitStage && isFinePointer) {
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

    // 4. Ambient Cursor Spotlight (Luxury Editorial Focus — Mouse only)
    if (typeof window.gsap !== 'undefined' && isFinePointer) {
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

    // 5. Magnetic Button Physics with GSAP quickTo (Spring feel — Mouse only)
    if (typeof window.gsap !== 'undefined' && isFinePointer) {
      document.querySelectorAll('[data-magnetic], .btn-primary, .btn-secondary').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.32, ease: 'power2.out' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.32, ease: 'power2.out' });
        let btnRect = null;

        btn.addEventListener(
          'mouseenter',
          () => {
            btnRect = btn.getBoundingClientRect();
          },
          { passive: true }
        );

        btn.addEventListener(
          'mousemove',
          (e) => {
            if (!btnRect) btnRect = btn.getBoundingClientRect();
            const dx = e.clientX - (btnRect.left + btnRect.width / 2);
            const dy = e.clientY - (btnRect.top + btnRect.height / 2);
            xTo(dx * 0.22);
            yTo(dy * 0.25);
          },
          { passive: true }
        );

        btn.addEventListener(
          'mouseleave',
          () => {
            btnRect = null;
            xTo(0);
            yTo(0);
          },
          { passive: true }
        );
      });
    }

    // 6. Lenis Smooth Scroll Setup Synchronized with GSAP
    if (typeof window.gsap === 'undefined') {
      return;
    }

    if (typeof window.ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      // Prevent mobile address-bar hide/show from triggering expensive layout recalculations
      ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
      });
    }

    if (typeof window.Lenis !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.05,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.95,
          syncTouch: false,
          touchMultiplier: 1.0
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(500, 33);
        window.portfolioLenis = lenis;
      } catch (e) {
        // Fallback to native scroll
      }
    }

    // 6B. Offscreen Section Observer (optimize-web-animations — stops offscreen continuous work)
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('is-offscreen');
            } else {
              entry.target.classList.add('is-offscreen');
            }
          });
        },
        { rootMargin: '120px 0px 120px 0px', threshold: 0 }
      );

      document.querySelectorAll('section').forEach((sec) => {
        sectionObserver.observe(sec);
      });
    }

    // 7. Hero Section 3D Entrance
    const heroElements = document.querySelectorAll('[data-hero-reveal]');
    if (heroElements.length > 0) {
      gsap.fromTo(
        heroElements,
        {
          opacity: 0,
          y: 35,
          z: -55,
          rotationX: -12,
          scale: 0.95,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        }
      );
    }

    if (typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    // 8. UNIVERSAL SCROLL-BASED 3D COMPONENT ANIMATION
    // As the visitor scrolls down, cards glide in from 3D space with rotationX, depth, scale, and stagger
    const scrollComponents = document.querySelectorAll(
      'section:not(:first-of-type) .glass-card, section:not(:first-of-type) .project-card, [data-reveal-group] > *'
    );

    scrollComponents.forEach((card, index) => {
      // Exclude hero elements and carousel cards (which receive dedicated smooth choreography below)
      if (card.closest('[data-hero-reveal]') || card.closest('.projects-carousel-track')) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 65,
          z: -95,
          rotationX: -18,
          rotationY: index % 2 === 0 ? -4 : 4,
          scale: 0.91,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          },
          onComplete: () => {
            card.style.transform = '';
            card.style.opacity = '1';
          }
        }
      );
    });

    // 8B. DEDICATED FEATURED PROJECTS CAROUSEL SMOOTH SCROLL REVEAL
    const projectsCarouselTrack = document.getElementById('projects-carousel-track');
    if (projectsCarouselTrack) {
      const carouselSection = projectsCarouselTrack.closest('section');
      const sectionHeader = carouselSection ? carouselSection.querySelector('[data-reveal-item]') : null;
      const initialCards = Array.from(projectsCarouselTrack.querySelectorAll('.project-card')).slice(0, 3);
      const remainingCards = Array.from(projectsCarouselTrack.querySelectorAll('.project-card')).slice(3);

      gsap.set(remainingCards, { opacity: 1, y: 0, scale: 1 });

      const carouselTl = gsap.timeline({
        scrollTrigger: {
          trigger: carouselSection || projectsCarouselTrack,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });

      if (sectionHeader) {
        carouselTl.fromTo(
          sectionHeader,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        );
      }

      carouselTl.fromTo(
        initialCards,
        {
          opacity: 0,
          y: 52,
          scale: 0.94,
          rotationX: -10,
          transformPerspective: 1200
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.95,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        },
        '-=0.45'
      );
    }

    // 9. Section Headings & Badges 3D Scroll Entrance
    const sectionHeaders = document.querySelectorAll(
      'section:not(:first-of-type) .eyebrow-badge, section:not(:first-of-type) h2, section:not(:first-of-type) > div > .max-w-2xl'
    );
    sectionHeaders.forEach((header) => {
      if (header.closest('[data-hero-reveal]')) return;
      gsap.fromTo(
        header,
        {
          opacity: 0,
          y: 35,
          z: -50,
          rotationX: -14,
          transformPerspective: 1100
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          },
          onComplete: () => {
            header.style.transform = '';
            header.style.opacity = '1';
          }
        }
      );
    });

    // 10. Scroll-Based Parallax on Hero Portrait, Studio Aura & Base Orbit Ring
    if (portraitStage) {
      gsap.to('.portrait-frame', {
        y: -32,
        z: 40,
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

    // 11. Dynamic Scroll-Progress Timeline Controller (services.html)
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

    // 12. IntersectionObserver to Pause Offscreen Keyframes
    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
          });
        },
        { threshold: 0.02, rootMargin: '100px 0px 100px 0px' }
      );
      document.querySelectorAll('section, footer').forEach((sec) => {
        sectionObserver.observe(sec);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationsAndMicroInteractions);
  } else {
    initAnimationsAndMicroInteractions();
  }
})();
