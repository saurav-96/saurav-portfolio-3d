/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/navigation.js — Shared Floating Glassmorphic Navbar, Mobile Menu & Scroll Bar
   ========================================================================== */

(function () {
  'use strict';

  function initNavigation() {
    const navbarGlass = document.querySelector('.navbar-glass');
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const progressBar = document.getElementById('scroll-progress-bar');

    // Determine active page filename
    const rawPath = window.location.pathname.split('/').pop();
    const currentPage = rawPath && rawPath.length > 0 ? rawPath.toLowerCase() : 'index.html';

    // Highlight active nav links (desktop + mobile)
    document.querySelectorAll('[data-nav-page]').forEach((link) => {
      const targetPage = (link.getAttribute('data-nav-page') || '').toLowerCase();
      if (targetPage === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Mobile drawer toggle
    if (mobileBtn && mobileDrawer) {
      mobileBtn.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('open');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
        const iconMenu = mobileBtn.querySelector('.icon-menu');
        const iconClose = mobileBtn.querySelector('.icon-close');
        if (iconMenu && iconClose) {
          iconMenu.classList.toggle('hidden', isOpen);
          iconClose.classList.toggle('hidden', !isOpen);
        }
      });

      // Close mobile drawer when clicking outside or on a link
      document.addEventListener('click', (e) => {
        if (
          mobileDrawer.classList.contains('open') &&
          !mobileDrawer.contains(e.target) &&
          !mobileBtn.contains(e.target)
        ) {
          mobileDrawer.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
          const iconMenu = mobileBtn.querySelector('.icon-menu');
          const iconClose = mobileBtn.querySelector('.icon-close');
          if (iconMenu && iconClose) {
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
          }
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
          mobileDrawer.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', 'false');
          mobileBtn.focus();
        }
      });
    }

    // Scroll state for navbar & top progress bar
    function updateScrollUI() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (navbarGlass) {
        if (scrollY > 28) {
          navbarGlass.classList.add('scrolled');
        } else {
          navbarGlass.classList.remove('scrolled');
        }
      }

      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
        progressBar.style.width = pct.toFixed(2) + '%';
      }
    }

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
