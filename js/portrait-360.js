/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/portrait-360.js — Interactive 360° Turntable Portrait Controller
   Features:
   - High-DPI Retina HTML5 Canvas Rendering
   - Smooth 360° Circular Frame Turntable (36 frames, 10° per step)
   - Inertia Momentum with Physics Damping & Friction Deceleration
   - Non-Blocking Multi-Phase Preloader (Frame 00 instant, remainder cached in background)
   - Dynamic 3D Perspective Tilt Tracking
   - Coordinated Studio Rim Lighting & Orbit Ring Glow
   - Mobile Touch-Optimized with touch-action: pan-y (no vertical scroll trapping)
   - Ambient Cinematic Idle Turntable Drift with Instant-Resume on Inactivity
   - Real-time Angle & Direction Readout Badge
   ========================================================================== */

(function () {
  'use strict';

  const TOTAL_FRAMES = 36;
  const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg
  const FRAME_PATH = 'assets/images/portrait-360/frame-';
  const FRAME_EXT = '.png';

  // Physics constants
  const DRAG_SENSITIVITY = 0.38;
  const INERTIA_FRICTION = 0.925;
  const MIN_VELOCITY = 0.015;
  const AUTO_SPIN_VELOCITY = 0.16;
  const IDLE_DELAY_MS = 2800;

  function initPortrait360() {
    const container = document.getElementById('hero-portrait-360');
    const canvas = document.getElementById('portrait-360-canvas');
    const fallbackImg = document.getElementById('portrait-static-img');
    const angleBadge = document.getElementById('portrait-360-angle');
    const badgeContainer = document.getElementById('portrait-360-badge');
    const btnPrev = document.getElementById('portrait-btn-prev');
    const btnNext = document.getElementById('portrait-btn-next');
    const btnAuto = document.getElementById('portrait-btn-auto');
    const autoIcon = document.getElementById('portrait-auto-icon');
    const orbitRing = document.querySelector('.neon-orbit-ring');

    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High-DPI Canvas Setup
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalW = 540;
    const logicalH = 760;

    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.scale(dpr, dpr);

    // State
    const images = new Array(TOTAL_FRAMES).fill(null);
    const loaded = new Array(TOTAL_FRAMES).fill(false);
    let loadedCount = 0;

    let currentAngle = 0; // 0 to 360
    let currentFrameIndex = 0;
    let isDragging = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let velocity = 0;
    let rafId = null;
    let isAutoSpinning = false;
    let idleTimer = null;
    let hasUserInteracted = false;

    // 3D Tilt perspective state
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // 1. Draw frame to canvas
    function drawFrame(index) {
      const img = images[index];
      if (!img || !loaded[index]) {
        // Fallback to nearest loaded frame if current isn't ready
        let fallbackIndex = -1;
        for (let dist = 1; dist < TOTAL_FRAMES; dist++) {
          const prev = (index - dist + TOTAL_FRAMES) % TOTAL_FRAMES;
          const next = (index + dist) % TOTAL_FRAMES;
          if (loaded[prev]) { fallbackIndex = prev; break; }
          if (loaded[next]) { fallbackIndex = next; break; }
        }
        if (fallbackIndex === -1 && loaded[0]) fallbackIndex = 0;
        if (fallbackIndex !== -1 && images[fallbackIndex]) {
          renderImage(images[fallbackIndex]);
        }
        return;
      }
      renderImage(img);
    }

    function renderImage(img) {
      ctx.clearRect(0, 0, logicalW, logicalH);
      ctx.drawImage(img, 0, 0, logicalW, logicalH);

      // Hide fallback image once canvas has rendered successfully
      if (fallbackImg && fallbackImg.style.display !== 'none') {
        fallbackImg.style.display = 'none';
      }
    }

    // 2. Update angle and frame index
    function setAngle(angle, updateUI = true) {
      // Normalize angle to [0, 360)
      currentAngle = ((angle % 360) + 360) % 360;
      const newFrame = Math.floor(currentAngle / DEGREES_PER_FRAME) % TOTAL_FRAMES;

      if (newFrame !== currentFrameIndex || !loadedCount) {
        currentFrameIndex = newFrame;
        drawFrame(currentFrameIndex);
      }

      if (updateUI && angleBadge) {
        angleBadge.textContent = `${Math.round(currentAngle)}°`;
      }

      // Synchronize orbit ring tilt and rotation
      if (orbitRing) {
        const ringRot = (currentAngle * 0.4).toFixed(1);
        orbitRing.style.transform = `translateX(-50%) rotateX(72deg) rotateZ(${ringRot}deg)`;
      }
    }

    // 3. Animation loop (handles physics deceleration, auto-spin & 3D tilt lerp)
    function tick() {
      // 3D Perspective Tilt Lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.12;
      currentTiltY += (targetTiltY - currentTiltY) * 0.12;
      canvas.style.transform = `perspective(1000px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      if (isDragging) {
        // Active pointer drag is handled in pointermove
        rafId = requestAnimationFrame(tick);
        return;
      }

      let keepLooping = false;

      // Handle Inertia Deceleration
      if (Math.abs(velocity) > MIN_VELOCITY) {
        setAngle(currentAngle + velocity);
        velocity *= INERTIA_FRICTION;
        keepLooping = true;
      } else {
        velocity = 0;
      }

      // Handle Auto-Spin
      if (isAutoSpinning) {
        setAngle(currentAngle + AUTO_SPIN_VELOCITY);
        keepLooping = true;
      }

      // Keep loop running if tilt hasn't settled
      if (Math.abs(targetTiltX - currentTiltX) > 0.05 || Math.abs(targetTiltY - currentTiltY) > 0.05) {
        keepLooping = true;
      }

      if (keepLooping) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    function wakeLoop() {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function resetIdleTimer() {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!isDragging && !isAutoSpinning) {
          isAutoSpinning = true;
          if (btnAuto) btnAuto.classList.add('active');
          wakeLoop();
        }
      }, IDLE_DELAY_MS);
    }

    function stopAutoSpin(userAction = true) {
      if (isAutoSpinning) {
        isAutoSpinning = false;
        if (btnAuto) btnAuto.classList.remove('active');
      }
      if (userAction) {
        hasUserInteracted = true;
        if (badgeContainer) badgeContainer.classList.add('has-interacted');
        resetIdleTimer();
      }
    }

    // 4. Pointer Events (Desktop Drag + Mobile Touch)
    function onPointerDown(e) {
      // Don't drag if clicking buttons
      if (e.target.closest('button')) return;

      isDragging = true;
      stopAutoSpin(true);

      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
      lastPointerX = e.clientX;
      lastPointerTime = performance.now();
      velocity = 0;

      container.classList.add('is-dragging');
      if (canvas.setPointerCapture) {
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (_) {}
      }

      wakeLoop();
    }

    function onPointerMove(e) {
      // Calculate 3D perspective tilt from container center
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      targetTiltY = normX * 8.0;
      targetTiltX = -normY * 6.0;

      wakeLoop();

      if (!isDragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTime);
      const deltaX = e.clientX - lastPointerX;

      // Invert delta so dragging left rotates right (natural turntable behavior)
      const angleDelta = -deltaX * DRAG_SENSITIVITY;
      setAngle(currentAngle + angleDelta);

      // Instantaneous angular velocity for inertia release
      velocity = (angleDelta / dt) * 16.6;

      lastPointerX = e.clientX;
      lastPointerTime = now;
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('is-dragging');

      if (canvas.releasePointerCapture) {
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }

      // Cap maximum fling velocity for smooth physics
      const MAX_FLING = 4.5;
      velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, velocity));

      resetIdleTimer();
      wakeLoop();
    }

    function onPointerLeave() {
      if (!isDragging) {
        targetTiltX = 0;
        targetTiltY = 0;
        wakeLoop();
      }
    }

    // Attach pointer listeners to container
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // 5. Button Navigation Controls
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoSpin(true);
        velocity = -1.8;
        wakeLoop();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        stopAutoSpin(true);
        velocity = 1.8;
        wakeLoop();
      });
    }

    if (btnAuto) {
      btnAuto.addEventListener('click', (e) => {
        e.preventDefault();
        if (isAutoSpinning) {
          isAutoSpinning = false;
          btnAuto.classList.remove('active');
          velocity = 0;
        } else {
          isAutoSpinning = true;
          btnAuto.classList.add('active');
          wakeLoop();
        }
      });
    }

    // 6. Non-Blocking Two-Phase Preloader
    // Phase 1: Frame 00 loads immediately and paints on canvas
    const img0 = new Image();
    img0.onload = () => {
      images[0] = img0;
      loaded[0] = true;
      loadedCount++;
      drawFrame(0);
      loadRemainingFrames();
    };
    img0.src = `${FRAME_PATH}00${FRAME_EXT}`;

    // Phase 2: Remainder (01-35) loads in background without blocking main thread
    function loadRemainingFrames() {
      let nextIndex = 1;

      function loadNextBatch() {
        const batchSize = 4;
        let batchLoaded = 0;

        for (let b = 0; b < batchSize && nextIndex < TOTAL_FRAMES; b++) {
          const idx = nextIndex++;
          const img = new Image();
          const pad = idx.toString().padStart(2, '0');

          img.onload = () => {
            images[idx] = img;
            loaded[idx] = true;
            loadedCount++;
            batchLoaded++;

            // If user is currently looking at this frame, redraw
            if (currentFrameIndex === idx) {
              drawFrame(idx);
            }
          };

          img.onerror = () => {
            console.warn(`[Portrait-360] Frame ${pad} failed to load.`);
          };

          img.src = `${FRAME_PATH}${pad}${FRAME_EXT}`;
        }

        if (nextIndex < TOTAL_FRAMES) {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(loadNextBatch, { timeout: 400 });
          } else {
            setTimeout(loadNextBatch, 60);
          }
        }
      }

      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadNextBatch, { timeout: 200 });
      } else {
        setTimeout(loadNextBatch, 50);
      }
    }

    // Re-trigger Lucide icons for quick-action buttons
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (_) {}
    }

    // Start idle drift timer
    resetIdleTimer();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortrait360);
  } else {
    initPortrait360();
  }
})();
