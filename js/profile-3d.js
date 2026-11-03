/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/profile-3d.js — Interactive 3D Profile Card with Free Orbit Drag,
                      360° Inspection, Holographic Foil & Inertia Physics
   ========================================================================== */

(function () {
  'use strict';

  function initProfile3D() {
    const stage = document.getElementById('interactive-profile-stage');
    const card = document.getElementById('profile-3d-card');
    const hintPill = document.getElementById('profile-3d-hint');

    if (!stage || !card) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let velX = 0;
    let velY = 0;
    let lastX = 0;
    let lastY = 0;
    let rafId = null;
    let hasInteracted = false;

    const SENSITIVITY = 0.52;
    const DAMPING = 0.085;
    const FRICTION = 0.94;

    function renderCard() {
      // Smooth interpolation towards target
      currentRotX += (targetRotX - currentRotX) * DAMPING;
      currentRotY += (targetRotY - currentRotY) * DAMPING;

      if (!isDragging) {
        targetRotX += velX;
        targetRotY += velY;
        velX *= FRICTION;
        velY *= FRICTION;

        // Auto-dampen tiny velocity
        if (Math.abs(velX) < 0.001) velX = 0;
        if (Math.abs(velY) < 0.001) velY = 0;
      }

      // Dynamic specular glare and shadow projection
      const radY = (currentRotY * Math.PI) / 180;
      const radX = (currentRotX * Math.PI) / 180;
      const shadowX = Math.sin(radY) * -24;
      const shadowY = Math.sin(radX) * 24 + 20;

      card.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      card.style.filter = `drop-shadow(${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 30px rgba(0, 0, 0, 0.75))`;

      // Update light glare coordinates
      const normY = ((currentRotY % 360) + 360) % 360;
      const glareX = 50 + Math.sin(radY) * 40;
      const glareY = 50 - Math.sin(radX) * 40;
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);

      // Keep animation loop alive during dragging or deceleration
      if (
        isDragging ||
        Math.abs(targetRotX - currentRotX) > 0.02 ||
        Math.abs(targetRotY - currentRotY) > 0.02 ||
        Math.abs(velX) > 0.01 ||
        Math.abs(velY) > 0.01
      ) {
        rafId = requestAnimationFrame(renderCard);
      } else {
        rafId = null;
      }
    }

    function wakeLoop() {
      if (!rafId) {
        rafId = requestAnimationFrame(renderCard);
      }
    }

    function handleStart(clientX, clientY) {
      isDragging = true;
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastY = clientY;
      velX = 0;
      velY = 0;
      stage.classList.add('is-dragging');

      if (!hasInteracted) {
        hasInteracted = true;
        if (hintPill) {
          hintPill.classList.add('has-interacted');
        }
      }
      wakeLoop();
    }

    function handleMove(clientX, clientY) {
      if (!isDragging) return;

      const dx = clientX - lastX;
      const dy = clientY - lastY;

      lastX = clientX;
      lastY = clientY;

      velX = -dy * 0.18;
      velY = dx * 0.18;

      targetRotY += dx * SENSITIVITY;
      // Clamp pitch between -75 and 75 degrees for natural ergonomics
      targetRotX = Math.max(-75, Math.min(75, targetRotX - dy * SENSITIVITY));

      wakeLoop();
    }

    function handleEnd() {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      wakeLoop();
    }

    // Pointer Events (Mouse)
    stage.addEventListener('pointerdown', (e) => {
      // Only main button
      if (e.button !== 0) return;
      stage.setPointerCapture(e.pointerId);
      handleStart(e.clientX, e.clientY);
    });

    stage.addEventListener('pointermove', (e) => {
      if (isDragging) {
        handleMove(e.clientX, e.clientY);
      }
    });

    stage.addEventListener('pointerup', (e) => {
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}
      handleEnd();
    });

    stage.addEventListener('pointercancel', (e) => {
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}
      handleEnd();
    });

    // Touch Support with passive cancel prevention
    stage.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length === 1) {
          handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: true }
    );

    stage.addEventListener(
      'touchmove',
      (e) => {
        if (isDragging && e.touches.length === 1) {
          // Prevent scroll while rotating object
          e.preventDefault();
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      },
      { passive: false }
    );

    stage.addEventListener('touchend', handleEnd, { passive: true });
    stage.addEventListener('touchcancel', handleEnd, { passive: true });

    // Double Click / Double Tap to reset view
    let lastTapTime = 0;
    stage.addEventListener('click', (e) => {
      const now = performance.now();
      if (now - lastTapTime < 300) {
        resetOrientation();
      }
      lastTapTime = now;
    });

    function resetOrientation() {
      // Find nearest full turn (360) so it spins back gracefully
      const nearestTurnY = Math.round(targetRotY / 360) * 360;
      targetRotX = 0;
      targetRotY = nearestTurnY;
      velX = 0;
      velY = 0;
      wakeLoop();
    }

    const resetBtn = document.getElementById('profile-3d-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetOrientation();
      });
    }

    // Initial wake
    wakeLoop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile3D);
  } else {
    initProfile3D();
  }
})();
