/* Site behaviour: navigation, scroll-spy, reveal, demo tabs, lightbox, brief form */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---- Year ---- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Mobile menu ---- */
  const toggle = $('#menu-toggle');
  const nav = $('#primary-nav');
  const mq = window.matchMedia('(max-width: 1120px)');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open && mq.matches ? 'hidden' : '';
  }
  // On small screens the closed nav must not be reachable by keyboard.
  function syncInert() {
    const hidden = mq.matches && toggle.getAttribute('aria-expanded') !== 'true';
    nav.toggleAttribute('inert', hidden);
  }
  toggle.addEventListener('click', () => { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); syncInert(); });
  $$('a', nav).forEach((a) => a.addEventListener('click', () => { if (mq.matches) { setMenu(false); syncInert(); } }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); syncInert(); toggle.focus(); }
    // keep focus inside the open mobile menu
    if (e.key === 'Tab' && mq.matches && toggle.getAttribute('aria-expanded') === 'true') {
      const f = [toggle, ...$$('a', nav)];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  mq.addEventListener('change', () => { setMenu(false); syncInert(); });
  syncInert();

  /* ---- Scroll-spy ---- */
  const links = $$('[data-nav]');
  const map = { home: 'home', web: 'web', ai: 'ai', design: 'design', about: 'about', process: 'about', contact: 'contact' };
  const targets = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const key = map[en.target.id];
        links.forEach((l) => {
          const on = l.dataset.nav === key;
          l.classList.toggle('is-active', on);
          if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => spy.observe(t));
  }

  /* ---- Reveal on scroll ---- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Demo tabs (WAI-ARIA tabs pattern) ---- */
  const tabs = $$('.demo-tab');
  function selectTab(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab, false));
    tab.addEventListener('keydown', (e) => {
      let n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true); }
    });
  });

  /* ---- Lightbox for design gallery ---- */
  const lb = $('#lightbox');
  if (lb && typeof lb.showModal === 'function') {
    let opener = null;
    $$('.g-card').forEach((card) => {
      card.addEventListener('click', () => {
        opener = card;
        $('#lb-img').src = card.dataset.src;
        $('#lb-img').alt = card.dataset.alt || '';
        $('#lb-title').textContent = card.dataset.title;
        $('#lb-meta').textContent = card.dataset.meta + ' · self-initiated concept';
        const dl = $('#lb-download');
        dl.href = card.dataset.src;
        dl.setAttribute('download', card.dataset.src.split('/').pop());
        lb.showModal();
      });
    });
    $('#lb-close').addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', () => { if (opener) opener.focus(); });
  } else {
    // Fallback: open the artwork itself
    $$('.g-card').forEach((c) => c.addEventListener('click', () => window.open(c.dataset.src, '_blank', 'noopener')));
  }

  /* ---- Project brief (no backend: build + copy text) ---- */
  const form = $('#brief-form');
  if (form) {
    const status = $('#brief-status');
    const name = $('#b-name'), details = $('#b-details');
    const setErr = (el, errEl, bad) => {
      errEl.hidden = !bad;
      el.setAttribute('aria-invalid', String(bad));
      if (bad) el.setAttribute('aria-describedby', errEl.id); else el.removeAttribute('aria-describedby');
    };
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const badName = !name.value.trim(), badDetails = !details.value.trim();
      setErr(name, $('#b-name-err'), badName);
      setErr(details, $('#b-details-err'), badDetails);
      if (badName || badDetails) { (badName ? name : details).focus(); status.style.color = '#fca5a5'; status.textContent = ''; return; }
      const text = `Hi Saurav, I'm ${name.value.trim()}.\n\nI'm looking for: ${$('#b-type').value}\n\nProject details:\n${details.value.trim()}`;
      status.style.color = '#86efac';
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = 'Brief copied! Paste it into a message on Fiverr, LinkedIn, Upwork or Freelancer.';
      } catch {
        // Clipboard unavailable (e.g. insecure context): select the text for manual copy
        details.value = text; details.select();
        status.textContent = 'Copy blocked by the browser. The brief is selected above — press Ctrl+C.';
      }
    });
  }

  /* ========================================================
     3D MOTION & INTERACTIVE PARALLAX SYSTEM
     Hardware-accelerated perspective transforms with
     graceful degradation and reduced-motion support.
     ======================================================== */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. 3D Scroll Progress Bar ---- */
  const progressBar = $('#scroll-progress');
  if (progressBar) {
    let ticking = false;
    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
        progressBar.style.width = pct.toFixed(2) + '%';
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  }

  if (!reducedMotion) {
    /* ---- 2. Ambient Cursor Light Follower ---- */
    const ambient = $('#cursor-ambient');
    if (ambient && window.matchMedia('(pointer: fine)').matches) {
      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;
      let currentX = targetX;
      let currentY = targetY;
      let rafId = null;

      window.addEventListener('pointermove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!rafId) rafId = requestAnimationFrame(renderCursor);
      }, { passive: true });

      function renderCursor() {
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        ambient.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;
        if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
          rafId = requestAnimationFrame(renderCursor);
        } else {
          rafId = null;
        }
      }
    }

    /* ---- 3. Hero Cutout & Floating 3D Badges Parallax ---- */
    const heroSection = $('#home');
    const heroStage = $('#hero-stage');
    const cutoutWrap = $('#portrait-3d-wrap');
    const auraOrbs = $$('.glow-orb', heroStage);
    const badges = $$('.float-badge', heroStage);

    if (heroSection && cutoutWrap && window.matchMedia('(pointer: fine)').matches) {
      let heroRaf = null;
      let mouseX = 0, mouseY = 0;
      let targetRotX = 0, targetRotY = 0;
      let curRotX = 0, curRotY = 0;

      function onHeroMove(e) {
        const rect = heroSection.getBoundingClientRect();
        // Normalized between -1 and +1
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        targetRotY = Math.max(-10, Math.min(10, x * 10));
        targetRotX = Math.max(-8, Math.min(8, -y * 8));
        mouseX = x;
        mouseY = y;
        if (!heroRaf) heroRaf = requestAnimationFrame(renderHero3D);
      }

      function onHeroLeave() {
        targetRotX = 0;
        targetRotY = 0;
        mouseX = 0;
        mouseY = 0;
        if (!heroRaf) heroRaf = requestAnimationFrame(renderHero3D);
      }

      function renderHero3D() {
        curRotX += (targetRotX - curRotX) * 0.1;
        curRotY += (targetRotY - curRotY) * 0.1;

        // Portrait 3D perspective tilt
        cutoutWrap.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;

        // Ambient orbs reverse shift
        auraOrbs.forEach((orb, i) => {
          const factor = (i + 1) * 12;
          orb.style.transform = `translate3d(${(-curRotY * factor * 0.1).toFixed(1)}px, ${(curRotX * factor * 0.1).toFixed(1)}px, 0)`;
        });

        // Floating badges variable depth parallax
        badges.forEach((b) => {
          const depth = parseFloat(b.dataset.depth) || 25;
          const shiftX = (curRotY * depth * 0.22).toFixed(1);
          const shiftY = (-curRotX * depth * 0.18).toFixed(1);
          b.style.transform = `translate3d(${shiftX}px, ${shiftY}px, ${depth}px) rotateX(${(curRotX * 0.5).toFixed(1)}deg) rotateY(${(curRotY * 0.5).toFixed(1)}deg)`;
        });

        if (Math.abs(targetRotX - curRotX) > 0.05 || Math.abs(targetRotY - curRotY) > 0.05) {
          heroRaf = requestAnimationFrame(renderHero3D);
        } else {
          heroRaf = null;
        }
      }

      heroSection.addEventListener('pointermove', onHeroMove, { passive: true });
      heroSection.addEventListener('pointerleave', onHeroLeave, { passive: true });
    }

    /* ---- 4. 3D Card Hover & Specular Spotlight Sheen ---- */
    const cards = $$('.card-3d');
    cards.forEach((card) => {
      let cardRaf = null;
      let rotX = 0, rotY = 0;

      function onCardMove(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables for the specular radial spotlight
        card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
        card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);

        // Compute 3D rotation angles
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rx = ((y - centerY) / centerY) * -7;
        const ry = ((x - centerX) / centerX) * 7;

        rotX = Math.max(-8, Math.min(8, rx));
        rotY = Math.max(-8, Math.min(8, ry));

        if (!cardRaf) {
          cardRaf = requestAnimationFrame(() => {
            card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px) scale3d(1.018, 1.018, 1.018)`;
            cardRaf = null;
          });
        }
      }

      function onCardLeave() {
        if (cardRaf) cancelAnimationFrame(cardRaf);
        card.style.transform = '';
      }

      card.addEventListener('pointermove', onCardMove, { passive: true });
      card.addEventListener('pointerleave', onCardLeave, { passive: true });
    });
  }
})();

