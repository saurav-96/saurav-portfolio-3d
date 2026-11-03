/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/three-scene.js — Fixed Full-Viewport WebGL Background (Three.js)
   Features:
   - Wireframe Icosahedron + Inner Torus Knot + Orbital Rings
   - Floating 3D Particle Starfield
   - Electric Violet (#7C3AED), Neon Purple (#A855F7), and Cyber Cyan (#06B6D4) lighting
   - Smooth Mouse Parallax + Scroll-Linked Camera & Rotation
   - Pauses when tab is inactive; respects prefers-reduced-motion; degrades gracefully
   ========================================================================== */

(function () {
  'use strict';

  window.PortfolioThreeScene = {
    scrollProgress: 0
  };

  function initThreeScene() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof window.THREE === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 768;
    const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: !isSmallScreen && !isLowPower,
        powerPreference: 'high-performance'
      });
    } catch (err) {
      // Graceful fallback if WebGL context is unavailable
      canvas.style.display = 'none';
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07070c, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11);

    // Lighting: Purple & Cyan Atmospheric Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 3.2, 32);
    purpleLight.position.set(6, 5, 6);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3.0, 32);
    cyanLight.position.set(-6, -4, 5);
    scene.add(cyanLight);

    // Master Group positioned subtly to complement page content
    const mainGroup = new THREE.Group();
    const pageType = document.body.getAttribute('data-page') || 'home';
    if (pageType === 'home' && !isSmallScreen) {
      mainGroup.position.set(3.2, 0.4, -1.5);
    } else if (pageType === 'services' && !isSmallScreen) {
      mainGroup.position.set(2.8, 1.2, -2.0);
    } else {
      mainGroup.position.set(2.2, 0.2, -2.5);
    }
    scene.add(mainGroup);

    // 1. Wireframe Icosahedron (Faceted Cyber Polyhedron)
    const icoGeo = new THREE.IcosahedronGeometry(2.35, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.35,
      wireframe: true,
      transparent: true,
      opacity: isSmallScreen ? 0.16 : 0.28
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    mainGroup.add(icosahedron);

    // 2. Inner Solid/Translucent Core Facets
    const coreGeo = new THREE.IcosahedronGeometry(1.45, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0e17,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.22,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: isSmallScreen ? 0.25 : 0.42,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 3. Cyber Cyan Wireframe Torus Ring
    const torusGeo = new THREE.TorusGeometry(3.35, 0.018, 16, 96);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: isSmallScreen ? 0.2 : 0.38
    });
    const orbitalRing = new THREE.Mesh(torusGeo, torusMat);
    orbitalRing.rotation.x = Math.PI * 0.38;
    orbitalRing.rotation.y = Math.PI * 0.12;
    mainGroup.add(orbitalRing);

    // 4. Floating 3D Particles Field
    const particleCount = isSmallScreen ? 110 : isLowPower ? 180 : 320;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorIndigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 28;
      positions[i3 + 1] = (Math.random() - 0.5) * 22;
      positions[i3 + 2] = (Math.random() - 0.5) * 16 - 2;

      const pick = Math.random();
      const c = pick < 0.45 ? colorViolet : pick < 0.8 ? colorCyan : colorIndigo;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: isSmallScreen ? 0.045 : 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.68
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Mouse Parallax Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    if (!isSmallScreen) {
      window.addEventListener(
        'mousemove',
        (e) => {
          targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
          targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true }
      );
    }

    // Track Scroll Progress for Scroll-Synchronized 3D Depth & Rotation
    function updateScrollValue() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      window.PortfolioThreeScene.scrollProgress = (window.scrollY || 0) / maxScroll;
    }
    window.addEventListener('scroll', updateScrollValue, { passive: true });
    updateScrollValue();

    // Pause WebGL loop when page is hidden
    let isPageVisible = !document.hidden;
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Render Single Static Frame if Reduced Motion is Enabled
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    // Efficient RequestAnimationFrame Loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!isPageVisible) return;

      const elapsed = clock.getElapsedTime();
      const scrollProg = window.PortfolioThreeScene.scrollProgress || 0;

      // Smooth Lerp for Mouse Parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.045;
      currentMouseY += (targetMouseY - currentMouseY) * 0.045;

      // Rotate Icosahedron & Core synchronized with time + scroll
      icosahedron.rotation.y = elapsed * 0.16 + scrollProg * Math.PI * 1.4;
      icosahedron.rotation.x = elapsed * 0.11 + scrollProg * Math.PI * 0.8;

      coreMesh.rotation.y = -elapsed * 0.22 - scrollProg * Math.PI;
      coreMesh.rotation.z = elapsed * 0.14;

      orbitalRing.rotation.z = elapsed * 0.18 + scrollProg * 2.0;

      // Subtle Floating Motion & Parallax
      mainGroup.rotation.y = currentMouseX * 0.32;
      mainGroup.rotation.x = -currentMouseY * 0.24;
      mainGroup.position.y = Math.sin(elapsed * 0.7) * 0.25 - scrollProg * 1.2;

      // Particle Field Drift + Scroll Depth
      particleSystem.rotation.y = elapsed * 0.025 + scrollProg * 0.45;
      particleSystem.position.x = -currentMouseX * 0.45;
      particleSystem.position.y = currentMouseY * 0.35 + scrollProg * 1.6;

      // Subtle Camera Depth Shift on Scroll
      camera.position.z = 11 - scrollProg * 1.35;

      renderer.render(scene, camera);
    }

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
  } else {
    initThreeScene();
  }
})();
