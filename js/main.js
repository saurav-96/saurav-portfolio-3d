/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/main.js — Application Entry, Icon Accessibility & Shared Helpers
   Audited with UI/UX Pro Max Icon Contextual Semantics Rules
   ========================================================================== */

(function () {
  'use strict';

  function initApp() {
    // Ensure all decorative <i data-lucide> icons carry aria-hidden="true" before & after replacement
    document.querySelectorAll('[data-lucide]').forEach((iconEl) => {
      if (!iconEl.hasAttribute('aria-label')) {
        iconEl.setAttribute('aria-hidden', 'true');
      }
    });

    // Initialize Lucide SVG icons if loaded
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons({
        attrs: {
          'aria-hidden': 'true',
          focusable: 'false'
        }
      });
    }

    // Dynamic copyright year fallback
    document.querySelectorAll('[data-current-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
