/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/main.js — Application Entry, Icon Accessibility, Certificate Lightbox & Copy ID
   ========================================================================== */

(function () {
  'use strict';

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
    let lastCertTrigger = null;

    function openCertLightbox(trigger) {
      if (!certModal || !certModalImg) return;
      lastCertTrigger = trigger;
      const src = trigger.getAttribute('data-cert-src') || '';
      const title = trigger.getAttribute('data-cert-title') || 'Certificate Preview';
      const meta = trigger.getAttribute('data-cert-meta') || '';
      const verifyUrl = trigger.getAttribute('data-cert-url') || '';

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

      certModal.classList.add('open');
      certModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (certModalClose) certModalClose.focus();
    }

    function closeCertLightbox() {
      if (!certModal) return;
      certModal.classList.remove('open');
      certModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
