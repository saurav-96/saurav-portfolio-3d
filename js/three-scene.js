/* ==========================================================================
   SAURAV BHUSAL — PREMIUM 3D INTERACTIVE PORTFOLIO
   js/three-scene.js — High-Craft Interactive 3D WebGL Background (Three.js)
   Features:
   - Dynamic 3D Sculpture: Wireframe Icosahedron + Outer Glowing Vertex Nodes +
     Inner Octahedron Core + Signature Torus Knot + Triple Gyroscopic Orbital Rings
   - Interactive Scroll Inertia: Mouse wheel scroll drives camera flight depth,
     rotational momentum, and 3D warp particle drift
   - Vibrant Atmospheric Colors: Electric Violet (#7C3AED), Neon Purple (#A855F7),
     Cyber Cyan (#06B6D4) & Deep Indigo (#4F46E5)
   - Real-time Mouse Parallax + Pointerdown Energy Pulse
   ========================================================================== */

(function () {
  'use strict';

  window.PortfolioThreeScene = {
    scrollProgress: 0,
    scrollVelocity: 0,
    targetVelocity: 0,
    pulseEnergy: 0,
    mouseX: 0,
    mouseY: 0
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
      canvas.style.display = 'none';
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.25 : 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060b, 0.026);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11.5);

    // Vibrant Atmospheric Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4.8, 42);
    purpleLight.position.set(6, 5, 7);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 4.6, 42);
    cyanLight.position.set(-6, -4, 6);
    scene.add(cyanLight);

    const indigoRimLight = new THREE.PointLight(0x4f46e5, 3.4, 34);
    indigoRimLight.position.set(0, 6, -5);
    scene.add(indigoRimLight);

    // Master 3D Sculpture Group
    const mainGroup = new THREE.Group();
    const pageType = document.body.getAttribute('data-page') || 'home';
    const basePos = { x: 2.8, y: 0.25, z: -1.6 };
    if (pageType === 'home' && !isSmallScreen) {
      basePos.x = 3.35;
      basePos.y = 0.45;
      basePos.z = -1.1;
    } else if (pageType === 'services' && !isSmallScreen) {
      basePos.x = 2.9;
      basePos.y = 0.85;
      basePos.z = -1.6;
    } else if (pageType === 'projects' && !isSmallScreen) {
      basePos.x = 3.6;
      basePos.y = 0.65;
      basePos.z = -2.2;
    }
    mainGroup.position.set(basePos.x, basePos.y, basePos.z);
    scene.add(mainGroup);

    // 1. Outer Faceted Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.58,
      wireframe: true,
      transparent: true,
      opacity: isSmallScreen ? 0.24 : 0.44
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    mainGroup.add(icosahedron);

    // 2. Outer Vertex Glow Points on the Icosahedron
    const icoPointsMat = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: isSmallScreen ? 0.07 : 0.1,
      transparent: true,
      opacity: 0.9
    });
    const icoVertexPoints = new THREE.Points(icoGeo, icoPointsMat);
    mainGroup.add(icoVertexPoints);

    // 3. Inner Translucent Crystalline Core
    const coreGeo = new THREE.OctahedronGeometry(1.55, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0d0e17,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.45,
      roughness: 0.12,
      metalness: 0.9,
      transparent: true,
      opacity: isSmallScreen ? 0.32 : 0.58,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 4. Inner Wireframe Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(0.88, 0.22, 92, 14);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: isSmallScreen ? 0.2 : 0.36
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    mainGroup.add(torusKnot);

    // 5. Primary Cyber Cyan Gyroscopic Orbital Ring
    const torusGeo1 = new THREE.TorusGeometry(3.6, 0.026, 16, 128);
    const torusMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: isSmallScreen ? 0.28 : 0.56
    });
    const orbitalRing1 = new THREE.Mesh(torusGeo1, torusMat1);
    orbitalRing1.rotation.x = Math.PI * 0.38;
    orbitalRing1.rotation.y = Math.PI * 0.14;
    mainGroup.add(orbitalRing1);

    // 6. Secondary Neon Purple Gyroscopic Orbital Ring
    const torusGeo2 = new THREE.TorusGeometry(4.2, 0.02, 16, 128);
    const torusMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: isSmallScreen ? 0.2 : 0.4
    });
    const orbitalRing2 = new THREE.Mesh(torusGeo2, torusMat2);
    orbitalRing2.rotation.x = -Math.PI * 0.32;
    orbitalRing2.rotation.y = -Math.PI * 0.22;
    mainGroup.add(orbitalRing2);

    // 7. Tertiary Deep Indigo Equatorial Halo Ring
    const torusGeo3 = new THREE.TorusGeometry(4.8, 0.014, 12, 128);
    const torusMat3 = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: isSmallScreen ? 0.14 : 0.28
    });
    const orbitalRing3 = new THREE.Mesh(torusGeo3, torusMat3);
    orbitalRing3.rotation.x = Math.PI * 0.48;
    mainGroup.add(orbitalRing3);

    // 8. Floating Mini Polyhedron Satellites
    const satellitesGroup = new THREE.Group();
    scene.add(satellitesGroup);
    const satGeos = [
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.TetrahedronGeometry(0.38, 0),
      new THREE.IcosahedronGeometry(0.32, 0),
      new THREE.DodecahedronGeometry(0.3, 0)
    ];
    const satPositions = [
      [-6.0, 2.9, -2.8],
      [-4.6, -2.8, -2.2],
      [6.4, -2.7, -3.2],
      [-2.1, 3.7, -3.8],
      [1.4, -3.5, -2.9],
      [-6.8, -0.4, -4.2]
    ];
    const satellites = [];
    if (!isSmallScreen) {
      satPositions.forEach((pos, idx) => {
        const mat = new THREE.MeshStandardMaterial({
          color: idx % 2 === 0 ? 0x22d3ee : 0xc084fc,
          emissive: idx % 2 === 0 ? 0x06b6d4 : 0x7c3aed,
          emissiveIntensity: 0.6,
          wireframe: true,
          transparent: true,
          opacity: 0.55
        });
        const mesh = new THREE.Mesh(satGeos[idx % satGeos.length], mat);
        mesh.position.set(pos[0], pos[1], pos[2]);
        mesh.userData = { baseY: pos[1], baseX: pos[0], speedOffset: idx * 0.7 };
        satellitesGroup.add(mesh);
        satellites.push(mesh);
      });
    }

    // 9. Vibrant 3D Starfield Particle Warp System
    const particleCount = isSmallScreen ? 160 : isLowPower ? 260 : 460;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0xc084fc);
    const colorCyan = new THREE.Color(0x22d3ee);
    const colorIndigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 34;
      positions[i3 + 1] = (Math.random() - 0.5) * 28;
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 2;

      const pick = Math.random();
      const c = pick < 0.45 ? colorViolet : pick < 0.82 ? colorCyan : colorIndigo;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: isSmallScreen ? 0.052 : 0.072,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Interactive Mouse Parallax & Click Energy Impulse
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
          window.PortfolioThreeScene.mouseX = targetMouseX;
          window.PortfolioThreeScene.mouseY = targetMouseY;
        },
        { passive: true }
      );

      window.addEventListener(
        'pointerdown',
        () => {
          window.PortfolioThreeScene.pulseEnergy = 1.0;
        },
        { passive: true }
      );

      // Direct Mouse Wheel Momentum on 3D Background
      window.addEventListener(
        'wheel',
        (e) => {
          window.PortfolioThreeScene.targetVelocity += e.deltaY * 0.0025;
          window.PortfolioThreeScene.targetVelocity = Math.max(-2.5, Math.min(2.5, window.PortfolioThreeScene.targetVelocity));
        },
        { passive: true }
      );
    }

    // Track Scroll Progress
    let lastScrollY = window.scrollY || 0;
    function updateScrollValue() {
      const currentY = window.scrollY || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      window.PortfolioThreeScene.scrollProgress = currentY / maxScroll;
      const delta = currentY - lastScrollY;
      window.PortfolioThreeScene.targetVelocity += delta * 0.008;
      window.PortfolioThreeScene.targetVelocity = Math.max(-2.5, Math.min(2.5, window.PortfolioThreeScene.targetVelocity));
      lastScrollY = currentY;
    }
    window.addEventListener('scroll', updateScrollValue, { passive: true });
    updateScrollValue();

    // Pause WebGL loop when page is hidden
    let isPageVisible = !document.hidden;
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
    });

    // Debounced Resize Handler
    let resizeTimer = null;
    window.addEventListener(
      'resize',
      () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }, 60);
      },
      { passive: true }
    );

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    const clock = new THREE.Clock();
    let smoothScroll = window.PortfolioThreeScene.scrollProgress || 0;
    let smoothVelocity = 0;

    function animate() {
      requestAnimationFrame(animate);
      if (!isPageVisible) return;

      const elapsed = clock.getElapsedTime();
      const targetScroll = window.PortfolioThreeScene.scrollProgress || 0;
      smoothScroll += (targetScroll - smoothScroll) * 0.08;

      // Smooth Inertia Decay on Scroll Velocity
      smoothVelocity += (window.PortfolioThreeScene.targetVelocity - smoothVelocity) * 0.12;
      window.PortfolioThreeScene.targetVelocity *= 0.91;
      window.PortfolioThreeScene.scrollVelocity = smoothVelocity;

      // Decay Click Pulse Energy
      window.PortfolioThreeScene.pulseEnergy *= 0.93;
      const pulse = window.PortfolioThreeScene.pulseEnergy;
      const vel = smoothVelocity;

      // Smooth Lerp for Mouse Parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.055;
      currentMouseY += (targetMouseY - currentMouseY) * 0.055;

      // Dynamic Rotation with Scroll Velocity Momentum
      const rotY = elapsed * 0.24 + smoothScroll * Math.PI * 2.4 + vel * 0.35 + pulse * 0.45;
      const rotX = elapsed * 0.15 + smoothScroll * Math.PI * 1.3 + vel * 0.25;

      icosahedron.rotation.y = rotY;
      icosahedron.rotation.x = rotX;
      icoVertexPoints.rotation.y = rotY;
      icoVertexPoints.rotation.x = rotX;

      const scalePulse = 1 + pulse * 0.14 + Math.sin(elapsed * 1.6) * 0.03 + Math.abs(vel) * 0.04;
      icosahedron.scale.setScalar(scalePulse);
      icoVertexPoints.scale.setScalar(scalePulse * 1.02);

      coreMesh.rotation.y = -elapsed * 0.3 - smoothScroll * Math.PI * 1.5 - vel * 0.3;
      coreMesh.rotation.z = elapsed * 0.2 + vel * 0.15;

      torusKnot.rotation.x = elapsed * 0.38 + smoothScroll * 3.0 + vel * 0.4;
      torusKnot.rotation.y = elapsed * 0.28 - smoothScroll * 1.8;

      orbitalRing1.rotation.z = elapsed * 0.28 + smoothScroll * 3.2 + vel * 0.4;
      orbitalRing2.rotation.z = -elapsed * 0.22 - smoothScroll * 2.5 - vel * 0.3;
      orbitalRing3.rotation.y = elapsed * 0.16 + smoothScroll * 2.0;

      // Floating 3D Satellites Reaction
      satellites.forEach((sat, i) => {
        sat.rotation.x = elapsed * (0.35 + i * 0.07) + smoothScroll * 2.2 + vel * 0.2;
        sat.rotation.y = elapsed * (0.28 + i * 0.06);
        sat.position.y =
          sat.userData.baseY +
          Math.sin(elapsed * 1.4 + sat.userData.speedOffset) * 0.35 +
          smoothScroll * (i % 2 === 0 ? 1.3 : -1.2);
        sat.position.z += vel * 0.05 * (i % 2 === 0 ? 1 : -1);
      });

      // Dynamic 3D Trajectory of Main Sculpture
      const scrollWaveX = Math.sin(smoothScroll * Math.PI) * (isSmallScreen ? 0.4 : -1.8);
      mainGroup.rotation.y = currentMouseX * 0.45 + smoothScroll * 0.48;
      mainGroup.rotation.x = -currentMouseY * 0.35 + vel * 0.18;
      mainGroup.position.x = basePos.x + scrollWaveX + currentMouseX * 0.35;
      mainGroup.position.y =
        basePos.y + Math.sin(elapsed * 0.9) * 0.3 - smoothScroll * 0.9 - currentMouseY * 0.25;

      // Dynamic Particle Starfield Warp Reaction
      particleSystem.rotation.y = elapsed * 0.035 + smoothScroll * 0.85 + vel * 0.15;
      particleSystem.rotation.x = smoothScroll * 0.3 + vel * 0.1;
      particleSystem.position.x = -currentMouseX * 0.7;
      particleSystem.position.y = currentMouseY * 0.5 + smoothScroll * 2.4;
      particleSystem.position.z = Math.sin(elapsed * 0.5) * 0.8 + vel * 0.8;

      // Dynamic Camera Depth Flight on Scroll
      camera.position.z = 11.5 - Math.sin(smoothScroll * Math.PI * 0.85) * 2.0 + Math.abs(vel) * 0.3;
      camera.rotation.x = -vel * 0.06;

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
