/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/portrait-360.js — Interactive 3D Model Portrait Controller
   Features:
   - Uses authentic original portrait (saurav-cutout.png) as initial thumbnail
   - Continuous sub-frame cross-fading (alpha blending) between adjacent frames
     for buttery smooth 3D model rotation (eliminates photo-slideshow popping)
   - Auto-spin removed per user request for authentic 3D model feel
   - Inertia momentum with physics damping
   - Coordinated 3D perspective tilt (rotateX, rotateY) & studio rim lighting
   - One-click animated reset back to front view (0°)
   - Mobile touch safe (touch-action: pan-y preserves natural vertical scrolling)
   ========================================================================== */

(function () {
  'use strict';

  const TOTAL_FRAMES = 36;
  const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg per frame
  const FRAME_PATH = 'assets/images/portrait-360/frame-';
  const FRAME_EXT = '.png';

  // Physics & Interaction constants
  const DRAG_SENSITIVITY = 0.36;
  const INERTIA_FRICTION = 0.91;
  const MIN_VELOCITY = 0.015;

  function initPortrait360() {
    const container = document.getElementById('hero-portrait-360');
    const canvas = document.getElementById('portrait-360-canvas');
    const fallbackImg = document.getElementById('portrait-static-img');
    const angleBadge = document.getElementById('portrait-360-angle');
    const btnPrev = document.getElementById('portrait-btn-prev');
    const btnNext = document.getElementById('portrait-btn-next');
    const btnReset = document.getElementById('portrait-btn-reset');
    const orbitRing = document.querySelector('.neon-orbit-ring');

    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // High-DPI Canvas Setup matching saurav-cutout.png (657x1008)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalW = 657;
    const logicalH = 1008;

    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.scale(dpr, dpr);

    // State
    const images = new Array(TOTAL_FRAMES).fill(null);
    const loaded = new Array(TOTAL_FRAMES).fill(false);
    let loadedCount = 0;

    let currentAngle = 0; // 0 to 360
    let targetAngle = 0;
    let isResetting = false;
    let isDragging = false;
    let hasActivated = false;

    let lastPointerX = 0;
    let lastPointerTime = 0;
    let velocity = 0;
    let rafId = null;

    // 3D Perspective Tilt state
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Sub-frame crossfade rendering: blends frameA and frameB for continuous 3D model fluidity
    function renderCrossfadedAngle(angle) {
      const normAngle = ((angle % 360) + 360) % 360;
      const fracIndex = normAngle / DEGREES_PER_FRAME;
      const frameA = Math.floor(fracIndex) % TOTAL_FRAMES;
      const frameB = (frameA + 1) % TOTAL_FRAMES;
      const blend = fracIndex - Math.floor(fracIndex); // 0.0 to 1.0

      ctx.clearRect(0, 0, logicalW, logicalH);

      const imgA = images[frameA];
      const imgB = images[frameB];

      if (imgA && loaded[frameA]) {
        ctx.globalAlpha = 1.0;
        ctx.drawImage(imgA, 0, 0, logicalW, logicalH);
      }

      // Smoothly blend in adjacent frame to eliminate any sudden jumping
      if (imgB && loaded[frameB] && blend > 0.02) {
        ctx.globalAlpha = blend;
        ctx.drawImage(imgB, 0, 0, logicalW, logicalH);
      }

      ctx.globalAlpha = 1.0;

      // Update UI angle badge
      if (angleBadge) {
        angleBadge.textContent = `${Math.round(normAngle)}°`;
      }

      // Synchronize orbit ring tilt and rotation
      if (orbitRing) {
        const ringRot = (normAngle * 0.4).toFixed(1);
        orbitRing.style.transform = `translateX(-50%) rotateX(72deg) rotateZ(${ringRot}deg)`;
      }
    }

    function activate3D() {
      if (!hasActivated) {
        hasActivated = true;
        if (fallbackImg) {
          fallbackImg.style.transition = 'opacity 0.25s ease';
          fallbackImg.style.opacity = '0';
          setTimeout(() => {
            fallbackImg.style.display = 'none';
          }, 260);
        }
      }
    }

    // Animation Loop (handles inertia, reset lerp & 3D tilt lerp)
    function tick() {
      // 3D Perspective Tilt Lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.12;
      currentTiltY += (targetTiltY - currentTiltY) * 0.12;
      canvas.style.transform = `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      let keepLooping = false;

      // Handle animated reset back to 0°
      if (isResetting) {
        let diff = targetAngle - currentAngle;
        // Shortest circular path
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;

        if (Math.abs(diff) > 0.3) {
          currentAngle += diff * 0.15;
          renderCrossfadedAngle(currentAngle);
          keepLooping = true;
        } else {
          currentAngle = 0;
          renderCrossfadedAngle(0);
          isResetting = false;
        }
      } else if (!isDragging && Math.abs(velocity) > MIN_VELOCITY) {
        // Inertia deceleration
        currentAngle = ((currentAngle + velocity) % 360 + 360) % 360;
        velocity *= INERTIA_FRICTION;
        renderCrossfadedAngle(currentAngle);
        keepLooping = true;
      } else if (!isDragging) {
        velocity = 0;
      }

      // Keep loop running if tilt hasn't settled
      if (Math.abs(targetTiltX - currentTiltX) > 0.05 || Math.abs(targetTiltY - currentTiltY) > 0.05) {
        keepLooping = true;
      }

      if (keepLooping || isDragging) {
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

    // Pointer Events (Mouse Drag & Touch Swipe)
    function onPointerDown(e) {
      if (e.target.closest('button')) return;

      activate3D();
      isDragging = true;
      isResetting = false;

      lastPointerX = e.clientX;
      lastPointerTime = performance.now();
      velocity = 0;

      container.classList.add('is-dragging');
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      }

      wakeLoop();
    }

    function onPointerMove(e) {
      // 3D Perspective Tilt from container center
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

      targetTiltY = normX * 7.0;
      targetTiltX = -normY * 5.0;

      wakeLoop();

      if (!isDragging) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTime);
      const deltaX = e.clientX - lastPointerX;

      // Invert delta so dragging left rotates right (natural turntable behavior)
      const angleDelta = -deltaX * DRAG_SENSITIVITY;
      currentAngle = ((currentAngle + angleDelta) % 360 + 360) % 360;
      renderCrossfadedAngle(currentAngle);

      velocity = (angleDelta / dt) * 16.6;
      lastPointerX = e.clientX;
      lastPointerTime = now;
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      container.classList.remove('is-dragging');

      if (canvas.releasePointerCapture) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      // Smooth inertia fling cap
      const MAX_FLING = 3.2;
      velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, velocity));

      wakeLoop();
    }

    function onPointerLeave() {
      if (!isDragging) {
        targetTiltX = 0;
        targetTiltY = 0;
        wakeLoop();
      }
    }

    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // Step Buttons: Left & Right rotate by 15° with smooth inertia
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        activate3D();
        isResetting = false;
        velocity = -1.6;
        wakeLoop();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        activate3D();
        isResetting = false;
        velocity = 1.6;
        wakeLoop();
      });
    }

    // Reset Button: Smoothly lerps view back to front 0° thumbnail
    if (btnReset) {
      btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        activate3D();
        targetAngle = 0;
        velocity = 0;
        isResetting = true;
        wakeLoop();
      });
    }

    // Preload image sequence (Frame 00 is original saurav-cutout.png)
    // Frame 00 loads first, remainder load in background without blocking
    const img0 = new Image();
    img0.onload = () => {
      images[0] = img0;
      loaded[0] = true;
      loadedCount++;
      loadRemainingFrames();
    };
    img0.src = `${FRAME_PATH}00${FRAME_EXT}`;

    function loadRemainingFrames() {
      let nextIndex = 1;

      function loadNextBatch() {
        const batchSize = 4;
        for (let b = 0; b < batchSize && nextIndex < TOTAL_FRAMES; b++) {
          const idx = nextIndex++;
          const img = new Image();
          const pad = idx.toString().padStart(2, '0');

          img.onload = () => {
            images[idx] = img;
            loaded[idx] = true;
            loadedCount++;
            if (hasActivated) {
              renderCrossfadedAngle(currentAngle);
            }
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

    // Initialize Lucide icons
    if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
      try { window.lucide.createIcons(); } catch (_) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortrait360);
  } else {
    initPortrait360();
  }
})();
