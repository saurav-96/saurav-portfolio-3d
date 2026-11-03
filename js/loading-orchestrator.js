/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/loading-orchestrator.js — Coordinated Page Loading, Seamless Navigation Transitions,
                               Asset Synchronization & FOUC Prevention
   ========================================================================== */

(function () {
  'use strict';

  function initLoadingOrchestrator() {
    const preloader = document.getElementById('site-preloader');
    const progressBar = document.getElementById('preloader-progress-bar');
    const statusText = document.getElementById('preloader-status-text');

    const isSubsequentVisit = sessionStorage.getItem('portfolio_visited') === 'true';
    const targetDuration = isSubsequentVisit ? 220 : 480;
    const startTime = performance.now();

    let currentProgress = 0;
    let isFinished = false;

    function setProgress(val, status) {
      currentProgress = Math.min(100, Math.max(currentProgress, val));
      if (progressBar) {
        progressBar.style.width = `${currentProgress}%`;
      }
      if (statusText && status) {
        statusText.textContent = status;
      }
    }

    // Stepwise progress updates
    setProgress(25, 'Loading core environment...');

    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

    Promise.all([
      fontPromise,
      new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      })
    ]).then(() => {
      setProgress(85, 'Synchronizing 3D scene...');
    });

    // Smooth progress ticker
    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progressFraction = Math.min(1, elapsed / targetDuration);
      const computedProgress = Math.floor(progressFraction * 100);

      if (computedProgress > currentProgress) {
        setProgress(computedProgress, computedProgress > 80 ? 'Ready' : 'Synchronizing assets...');
      }

      if (elapsed >= targetDuration && !isFinished) {
        isFinished = true;
        clearInterval(interval);
        completeLoading();
      }
    }, 20);

    function completeLoading() {
      setProgress(100, 'Ready');
      sessionStorage.setItem('portfolio_visited', 'true');

      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('is-loaded');
        }
        document.documentElement.classList.add('page-ready');
        document.body.classList.add('page-ready');

        // Trigger GSAP hero entrance if available
        if (typeof window.triggerHeroEntrance === 'function') {
          window.triggerHeroEntrance();
        }

        // Clean up preloader from DOM after transition
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.setAttribute('aria-hidden', 'true');
          }
        }, 600);
      }, 120);
    }

    // Coordinated section-to-section navigation smoothing
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.target === '_blank' ||
        link.hasAttribute('download')
      ) {
        return;
      }

      link.addEventListener('click', (e) => {
        // Only smooth for internal same-origin links
        const targetUrl = new URL(href, window.location.href);
        if (targetUrl.origin === window.location.origin && targetUrl.pathname !== window.location.pathname) {
          // Subtle page exit transition
          document.body.classList.add('page-transitioning');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingOrchestrator);
  } else {
    initLoadingOrchestrator();
  }
})();
