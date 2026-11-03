/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/main.js — Application Entry, Icon Accessibility, Certificate Lightbox & Copy ID
   ========================================================================== */

(function () {
  'use strict';

  // Universal Modal Scroll Lock Helpers (Synchronized with Lenis & CSS)
  window.lockModalScroll = function () {
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    if (window.portfolioLenis && typeof window.portfolioLenis.stop === 'function') {
      window.portfolioLenis.stop();
    }
  };

  window.unlockModalScroll = function () {
    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
    if (window.portfolioLenis && typeof window.portfolioLenis.start === 'function') {
      window.portfolioLenis.start();
    }
  };

  function initApp() {
    // 1. Ensure all decorative <i data-lucide> icons carry aria-hidden="true"
    document.querySelectorAll('[data-lucide]').forEach((iconEl) => {
      if (!iconEl.hasAttribute('aria-label')) {
        iconEl.setAttribute('aria-hidden', 'true');
      }
    });

    // 2. Initialize Lucide SVG icons if loaded
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({
        attrs: {
          'aria-hidden': 'true',
          focusable: 'false'
        }
      });
    }

    // 3. Dynamic copyright year fallback
    document.querySelectorAll('[data-current-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });

    // 4. One-Click Certificate ID Copy Buttons
    document.querySelectorAll('[data-copy-text]').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.getAttribute('data-copy-text');
        if (!text) return;
        const original = btn.innerHTML;
        try {
          await navigator.clipboard.writeText(text);
          btn.innerHTML = '<span class="text-emerald-300">✓ Copied ID</span>';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 1800);
        } catch {
          // Fallback
        }
      });
    });

    // 5. Interactive Certificate Full-Screen Lightbox Modal
    const certModal = document.getElementById('cert-lightbox-modal');
    const certModalImg = document.getElementById('cert-lightbox-img');
    const certModalTitle = document.getElementById('cert-lightbox-title');
    const certModalMeta = document.getElementById('cert-lightbox-meta');
    const certModalVerify = document.getElementById('cert-lightbox-verify');
    const certModalClose = document.getElementById('cert-lightbox-close');
    const certGallerySection = document.getElementById('cert-gallery-section');
    const certShowCertBtn = document.getElementById('cert-show-cert-btn');
    let lastCertTrigger = null;
    let originalCertSrc = '';
    let originalCertTitle = '';

    function openCertLightbox(trigger) {
      if (!certModal || !certModalImg) return;
      lastCertTrigger = trigger;
      const src = trigger.getAttribute('data-cert-src') || '';
      const title = trigger.getAttribute('data-cert-title') || 'Certificate Preview';
      const meta = trigger.getAttribute('data-cert-meta') || '';
      const verifyUrl = trigger.getAttribute('data-cert-url') || '';
      const hasGallery = trigger.getAttribute('data-has-gallery') === 'true';

      originalCertSrc = src;
      originalCertTitle = title;

      certModalImg.src = src;
      certModalImg.alt = title;
      if (certModalTitle) certModalTitle.textContent = title;
      if (certModalMeta) certModalMeta.textContent = meta;

      if (certModalVerify) {
        if (verifyUrl) {
          certModalVerify.href = verifyUrl;
          certModalVerify.classList.remove('hidden');
        } else {
          certModalVerify.classList.add('hidden');
        }
      }

      if (certGallerySection) {
        if (hasGallery) {
          certGallerySection.classList.remove('hidden');
        } else {
          certGallerySection.classList.add('hidden');
        }
      }

      certModal.classList.add('open');
      certModal.setAttribute('aria-hidden', 'false');
      window.lockModalScroll();
      if (certModalClose) certModalClose.focus();
    }

    function closeCertLightbox() {
      if (!certModal) return;
      certModal.classList.remove('open');
      certModal.setAttribute('aria-hidden', 'true');
      window.unlockModalScroll();
      if (lastCertTrigger && typeof lastCertTrigger.focus === 'function') {
        lastCertTrigger.focus();
      }
    }

    document.querySelectorAll('[data-cert-src]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openCertLightbox(el);
      });
    });

    document.querySelectorAll('[data-gallery-src]').forEach((thumb) => {
      const handleSelect = (e) => {
        e.preventDefault();
        const imgSrc = thumb.getAttribute('data-gallery-src');
        const imgTitle = thumb.getAttribute('data-gallery-title') || 'Award Photo';
        if (certModalImg && imgSrc) {
          certModalImg.style.opacity = '0';
          setTimeout(() => {
            certModalImg.src = imgSrc;
            certModalImg.alt = imgTitle;
            if (certModalTitle) certModalTitle.textContent = imgTitle;
            certModalImg.style.opacity = '1';
          }, 150);
        }
      };

      thumb.addEventListener('click', handleSelect);
      thumb.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleSelect(e);
        }
      });
    });

    if (certShowCertBtn) {
      certShowCertBtn.addEventListener('click', () => {
        if (certModalImg && originalCertSrc) {
          certModalImg.style.opacity = '0';
          setTimeout(() => {
            certModalImg.src = originalCertSrc;
            certModalImg.alt = originalCertTitle;
            if (certModalTitle) certModalTitle.textContent = originalCertTitle;
            certModalImg.style.opacity = '1';
          }, 150);
        }
      });
    }

    if (certModalClose) {
      certModalClose.addEventListener('click', closeCertLightbox);
    }

    if (certModal) {
      certModal.addEventListener('click', (e) => {
        if (e.target === certModal) closeCertLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
        closeCertLightbox();
      }
    });

    // 6. Interactive Developer Console Specs Copy (services.html)
    const copySpecsBtn = document.getElementById('copy-specs-btn');
    if (copySpecsBtn) {
      copySpecsBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const specsText = [
          'Saurav Bhusal — Full-Stack & UI/UX Developer Specs:',
          '- Primary Stack: Vanilla JS (ES6+), React, Tailwind CSS, Three.js, GSAP',
          '- Architecture: WebGL Canvas, Lenis Smooth Scroll, Accessible Semantic HTML5',
          '- Performance Guarantee: 95+ Lighthouse Target across Desktop & Mobile',
          '- Location / Timezone: Nepal (UTC+5:45) — Available Remote / WFH',
          '- CS50x Harvard Verified Alum | Web Design Hackathon 2026 Winner',
          '- Collaboration: 1-on-1 WhatsApp, Upwork Escrow, Fast-Track Portal',
          '- Portfolio: https://github.com/saurav-96'
        ].join('\n');
        try {
          await navigator.clipboard.writeText(specsText);
          const originalHtml = copySpecsBtn.innerHTML;
          copySpecsBtn.innerHTML = '<span class="text-emerald-300 font-mono text-xs font-semibold">✓ Dev Specs Copied!</span>';
          setTimeout(() => {
            copySpecsBtn.innerHTML = originalHtml;
          }, 2200);
        } catch {
          // fallback
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
