/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/portrait-360.js — Interactive 3D Model Portrait Controller
   Features:
   - Uses authentic original portrait (saurav-cutout.png) as initial thumbnail
   - Continuous sub-frame cross-fading (alpha blending) between adjacent frames
     for buttery smooth 3D model rotation (eliminates photo-slideshow popping)
   - Auto-spin removed per user request for authentic 3D model feel
   - Intelligent Idle Auto-Return: After 3.5s of no dragging/interaction,
     smoothly transitions back to 0° and cross-fades into the original picture
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
  const IDLE_RETURN_DELAY_MS = 3500; // 3.5 seconds after user stops dragging

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
    let isDragging = false;
    let hasActivated = false;
    let lastRoundedAngle = -1;

    let lastPointerX = 0;
    let lastPointerTime = 0;
    let velocity = 0;
    let rafId = null;

    // Smooth return-to-original state & timer
    let idleReturnTimer = null;
    let isAutoReturning = false;
    let returnStartAngle = 0;
    let returnDeltaAngle = 0;
    let returnStartTime = 0;
    let returnDuration = 800;

    // 3D Perspective Tilt state
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    // Sub-frame crossfade rendering: True two-pass alpha blending (alphaA = 1 - blend, alphaB = blend)
    // Ensures sum of opacities is always strictly 1.0 (zero ghosting / zero double-vision)
    function renderCrossfadedAngle(angle) {
      const normAngle = ((angle % 360) + 360) % 360;
      const fracIndex = normAngle / DEGREES_PER_FRAME;
      const frameA = Math.floor(fracIndex) % TOTAL_FRAMES;
      const frameB = (frameA + 1) % TOTAL_FRAMES;
      const blend = fracIndex - Math.floor(fracIndex); // 0.0 to 1.0

      ctx.clearRect(0, 0, logicalW, logicalH);

      const imgA = images[frameA];
      const imgB = images[frameB];

      if (blend <= 0.04) {
        // Crisp single frame at key angle
        if (imgA && loaded[frameA]) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(imgA, 0, 0, logicalW, logicalH);
        }
      } else if (blend >= 0.96) {
        if (imgB && loaded[frameB]) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(imgB, 0, 0, logicalW, logicalH);
        }
      } else {
        // True two-pass linear crossfade
        if (imgA && loaded[frameA]) {
          ctx.globalAlpha = 1.0 - blend;
          ctx.drawImage(imgA, 0, 0, logicalW, logicalH);
        }
        if (imgB && loaded[frameB]) {
          ctx.globalAlpha = blend;
          ctx.drawImage(imgB, 0, 0, logicalW, logicalH);
        }
        ctx.globalAlpha = 1.0;
      }

      // Cached DOM updates to prevent style recalculation storms during drag
      const roundedAngle = Math.round(normAngle);
      if (lastRoundedAngle !== roundedAngle) {
        lastRoundedAngle = roundedAngle;
        if (angleBadge) {
          angleBadge.textContent = `${roundedAngle}°`;
        }
        if (orbitRing) {
          const ringRot = (normAngle * 0.4).toFixed(1);
          orbitRing.style.transform = `translateX(-50%) rotateX(72deg) rotateZ(${ringRot}deg)`;
        }
      }
    }

    function activate3D() {
      cancelIdleReturn();
      if (!hasActivated) {
        hasActivated = true;
        if (fallbackImg) {
          fallbackImg.style.transition = 'opacity 0.28s ease';
          fallbackImg.style.opacity = '0';
          setTimeout(() => {
            if (hasActivated && fallbackImg) {
              fallbackImg.style.display = 'none';
            }
          }, 300);
        }
      }
    }

    function restoreOriginalPicture() {
      if (fallbackImg) {
        fallbackImg.style.display = 'block';
        void fallbackImg.offsetWidth; // Force layout reflow
        fallbackImg.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        fallbackImg.style.opacity = '1';
      }
      hasActivated = false;
      isAutoReturning = false;
    }

    function scheduleIdleReturn() {
      cancelIdleReturn();
      const norm = ((currentAngle % 360) + 360) % 360;
      // Only schedule if rotated away from 0° front pose
      if (norm >= 1.5 && norm <= 358.5) {
        idleReturnTimer = setTimeout(() => {
          triggerSmoothReturn(850);
        }, IDLE_RETURN_DELAY_MS);
      }
    }

    function cancelIdleReturn() {
      if (idleReturnTimer) {
        clearTimeout(idleReturnTimer);
        idleReturnTimer = null;
      }
      isAutoReturning = false;
    }

    function triggerSmoothReturn(duration = 800) {
      if (isDragging) return;

      const norm = ((currentAngle % 360) + 360) % 360;
      if (norm < 1.0 || norm > 359.0) {
        currentAngle = 0;
        targetAngle = 0;
        renderCrossfadedAngle(0);
        restoreOriginalPicture();
        return;
      }

      // Shortest circular path to 0°
      let diff = 0 - norm;
      if (diff < -180) diff += 360;
      if (diff > 180) diff -= 360;

      returnStartAngle = norm;
      returnDeltaAngle = diff;
      returnStartTime = performance.now();
      // Natural spring duration scaling
      returnDuration = Math.max(600, Math.min(1050, duration || Math.abs(diff) * 4.2));
      isAutoReturning = true;
      velocity = 0;
      wakeLoop();
    }

    // Animation Loop (handles inertia, return-to-original lerp & 3D tilt lerp)
    function tick() {
      // 3D Perspective Tilt Lerp
      currentTiltX += (targetTiltX - currentTiltX) * 0.12;
      currentTiltY += (targetTiltY - currentTiltY) * 0.12;
      canvas.style.transform = `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      let keepLooping = false;

      // Handle active user dragging via smooth RAF lerp
      if (isDragging) {
        let diff = targetAngle - currentAngle;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        // Smooth responsive interpolation: eliminates mouse polling jitter & renders at native 60/120Hz
        currentAngle = ((currentAngle + diff * 0.45) % 360 + 360) % 360;
        renderCrossfadedAngle(currentAngle);
        keepLooping = true;
      } else if (isAutoReturning) {
        // Handle Smooth Return Animation to 0°
        const now = performance.now();
        const elapsed = now - returnStartTime;
        const progress = Math.min(1, elapsed / returnDuration);

        // Cubic ease-out curve for natural deceleration
        const ease = 1 - Math.pow(1 - progress, 3);
        currentAngle = ((returnStartAngle + returnDeltaAngle * ease) % 360 + 360) % 360;
        targetAngle = currentAngle;
        renderCrossfadedAngle(currentAngle);

        if (progress >= 1) {
          currentAngle = 0;
          targetAngle = 0;
          renderCrossfadedAngle(0);
          restoreOriginalPicture();
        } else {
          keepLooping = true;
        }
      } else if (Math.abs(velocity) > MIN_VELOCITY) {
        // Inertia deceleration
        currentAngle = ((currentAngle + velocity) % 360 + 360) % 360;
        targetAngle = currentAngle;
        velocity *= INERTIA_FRICTION;
        renderCrossfadedAngle(currentAngle);
        keepLooping = true;
      } else if (velocity !== 0) {
        velocity = 0;
        targetAngle = currentAngle;
        // Schedule idle return once inertia has fully settled
        scheduleIdleReturn();
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

      cancelIdleReturn();
      activate3D();
      isDragging = true;
      targetAngle = currentAngle;

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

      cancelIdleReturn();

      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTime);
      const deltaX = e.clientX - lastPointerX;

      // Invert delta so dragging left rotates right (natural turntable behavior)
      const angleDelta = -deltaX * DRAG_SENSITIVITY;
      targetAngle = ((targetAngle + angleDelta) % 360 + 360) % 360;

      // Filter velocity with moving average for smooth release fling
      const rawVel = (angleDelta / dt) * 16.6;
      velocity = velocity * 0.3 + rawVel * 0.7;

      lastPointerX = e.clientX;
      lastPointerTime = now;
      // Note: Rendering is cleanly handled by requestAnimationFrame (tick) to avoid jank
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      targetAngle = currentAngle;
      container.classList.remove('is-dragging');

      if (canvas.releasePointerCapture) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      // Smooth inertia fling cap
      const MAX_FLING = 3.2;
      velocity = Math.max(-MAX_FLING, Math.min(MAX_FLING, velocity));

      // Schedule idle return to 0° after inactivity
      scheduleIdleReturn();
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

    // Step Buttons: Left & Right rotate by with smooth inertia
    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.preventDefault();
        cancelIdleReturn();
        activate3D();
        targetAngle = currentAngle;
        velocity = -1.6;
        scheduleIdleReturn();
        wakeLoop();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.preventDefault();
        cancelIdleReturn();
        activate3D();
        targetAngle = currentAngle;
        velocity = 1.6;
        scheduleIdleReturn();
        wakeLoop();
      });
    }

    // Reset Button: Immediately triggers the smooth return animation to 0°
    if (btnReset) {
      btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        cancelIdleReturn();
        activate3D();
        targetAngle = currentAngle;
        triggerSmoothReturn(550);
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
