/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/portrait-360.js — Interactive 3D Model Portrait Controller
   Features:
   - Uses authentic original portrait (saurav-cutout.png) as initial thumbnail
   - Butter-smooth 60fps/120fps 3D model rotation with 36 high-res frames
   - Zero-latency 1:1 drag tracking with micro-filtered jitter smoothing
   - High-fidelity single-frame rendering: eliminates ghosting, blur, and laggy crossfades
   - Immediate parallel preloading & GPU texture decoding for instant response
   - Natural inertia physics with momentum fling & bearing friction decay
   - Interactive 3D perspective tilt (rotateX, rotateY) & studio rim lighting
   - Intelligent Idle Auto-Return: Smoothly spins back to 0° after 3.5s of inactivity
   - Mobile touch safe (touch-action: pan-y preserves natural vertical scrolling)
   ========================================================================== */

(function () {
  'use strict';

  const TOTAL_FRAMES = 36;
  const DEGREES_PER_FRAME = 360 / TOTAL_FRAMES; // 10 deg per frame
  const FRAME_PATH = 'assets/images/portrait-360/frame-';
  const FRAME_EXT = '.png';

  // Physics & Interaction constants
  const DRAG_SENSITIVITY = 0.48; // Natural 1:1 turntable drag feel
  const INERTIA_FRICTION = 0.92; // Smooth friction decay
  const MIN_VELOCITY = 0.02;     // Inertia cutoff
  const MAX_FLING = 3.6;         // Maximum flick velocity
  const IDLE_RETURN_DELAY_MS = 3500; // 3.5s inactivity before smooth return

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

    let lastRenderedFrame = -1;
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

    // Butter-smooth frame rendering: Renders crisp, authentic 3D model frame
    // Eliminates double-vision ghosting and laggy cross-dissolve transitions
    function renderFrame(angle, force = false) {
      const normAngle = ((angle % 360) + 360) % 360;
      const frameIndex = Math.round(normAngle / DEGREES_PER_FRAME) % TOTAL_FRAMES;

      if (!force && frameIndex === lastRenderedFrame) {
        updateUI(normAngle);
        return;
      }

      // Locate target frame or nearest loaded fallback
      let img = images[frameIndex];
      if (!img || !loaded[frameIndex]) {
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = (frameIndex - offset + TOTAL_FRAMES) % TOTAL_FRAMES;
          if (images[prev] && loaded[prev]) { img = images[prev]; break; }
          const next = (frameIndex + offset) % TOTAL_FRAMES;
          if (images[next] && loaded[next]) { img = images[next]; break; }
        }
      }

      if (img) {
        ctx.clearRect(0, 0, logicalW, logicalH);
        ctx.drawImage(img, 0, 0, logicalW, logicalH);
        lastRenderedFrame = frameIndex;
      }

      updateUI(normAngle);
    }

    // Cached UI DOM updates to eliminate style recalculation lag during drag
    function updateUI(normAngle) {
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
          fallbackImg.style.transition = 'opacity 0.25s ease';
          fallbackImg.style.opacity = '0';
          setTimeout(() => {
            if (hasActivated && fallbackImg) {
              fallbackImg.style.display = 'none';
            }
          }, 270);
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
        renderFrame(0, true);
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
      returnDuration = Math.max(550, Math.min(950, duration || Math.abs(diff) * 3.8));
      isAutoReturning = true;
      velocity = 0;
      wakeLoop();
    }

    // Animation Loop: Handles 60/120fps RAF synchronization, inertia & perspective tilt
    function tick() {
      // 3D Perspective Tilt Lerp (smoothly tilts towards cursor position)
      currentTiltX += (targetTiltX - currentTiltX) * 0.12;
      currentTiltY += (targetTiltY - currentTiltY) * 0.12;
      canvas.style.transform = `perspective(1200px) rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;

      let keepLooping = false;

      // Handle active user dragging: direct 1:1 high-frequency tracking
      if (isDragging) {
        let diff = targetAngle - currentAngle;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;

        // Snappy, butter-smooth 1:1 tracking: eliminates mouse polling jitter while keeping instant response
        currentAngle = ((currentAngle + diff * 0.85) % 360 + 360) % 360;
        renderFrame(currentAngle);
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
        renderFrame(currentAngle);

        if (progress >= 1) {
          currentAngle = 0;
          targetAngle = 0;
          renderFrame(0, true);
          restoreOriginalPicture();
        } else {
          keepLooping = true;
        }
      } else if (Math.abs(velocity) > MIN_VELOCITY) {
        // Inertia glide with friction decay
        currentAngle = ((currentAngle + velocity) % 360 + 360) % 360;
        targetAngle = currentAngle;
        velocity *= INERTIA_FRICTION;
        renderFrame(currentAngle);
        keepLooping = true;
      } else if (velocity !== 0) {
        velocity = 0;
        targetAngle = currentAngle;
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

      targetTiltY = normX * 8.0;
      targetTiltX = -normY * 6.0;

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
      velocity = velocity * 0.2 + rawVel * 0.8;

      lastPointerX = e.clientX;
      lastPointerTime = now;
      // Rendering is cleanly synced with requestAnimationFrame (tick) for locked 60/120Hz
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
        velocity = -1.8;
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
        velocity = 1.8;
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

    // Immediate Parallel Preloading & GPU Texture Decoding
    // Loads all 36 frames into memory concurrently so dragging never drops frames
    function preloadAllFrames() {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const pad = i.toString().padStart(2, '0');
        img.src = `${FRAME_PATH}${pad}${FRAME_EXT}`;
        img.onload = () => {
          images[i] = img;
          loaded[i] = true;
          loadedCount++;
          // When current frame loads, paint immediately
          const currentFrame = Math.round(((currentAngle % 360) + 360) % 360 / DEGREES_PER_FRAME) % TOTAL_FRAMES;
          if (i === currentFrame && hasActivated) {
            renderFrame(currentAngle, true);
          }
        };
        // Decode image asynchronously to avoid jank on first draw
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      }
    }

    preloadAllFrames();

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
