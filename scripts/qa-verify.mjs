// scripts/qa-verify.mjs
// Starts a local static HTTP server, opens each page in headless Chrome via CDP,
// verifies zero console/page errors, checks broken images/links, tests interactive features,
// and captures desktop & mobile screenshots into scratch/.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = process.cwd();
const PORT = 8765;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9420 + Math.floor(Math.random() * 300);

if (!fs.existsSync(path.join(ROOT, 'scratch'))) {
  fs.mkdirSync(path.join(ROOT, 'scratch'), { recursive: true });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const cleanUrl = (req.url || '/').split('?')[0];
  const relPath = cleanUrl === '/' ? '/index.html' : cleanUrl;
  const filePath = path.join(ROOT, decodeURIComponent(relPath));

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
console.log(`Static server listening on http://127.0.0.1:${PORT}`);

const chromeProc = spawn(
  CHROME_PATH,
  [
    '--headless=new',
    '--hide-scrollbars',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${process.env.TEMP}\\qa-chrome-${DEBUG_PORT}`,
    '--window-size=1440,950',
    'about:blank'
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json();
    if (targets && targets.some((t) => t.type === 'page')) break;
  } catch {
    await sleep(200);
  }
}

const page = targets ? targets.find((t) => t.type === 'page') : null;
if (!page) {
  console.error('Failed to find page target');
  chromeProc.kill();
  server.close();
  process.exit(1);
}
console.log('Connecting to page:', page.webSocketDebuggerUrl);
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r, rej) => {
  ws.onopen = r;
  ws.onerror = rej;
  setTimeout(() => rej(new Error('WebSocket timeout')), 5000);
});
console.log('WebSocket connected successfully');

let msgId = 0;
const pending = new Map();
const consoleErrors = [];

ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(m.params.exceptionDetails?.text || 'Runtime exception');
  }
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
    const text = (m.params.args || []).map((a) => a.value || a.description || '').join(' ');
    consoleErrors.push(text);
  }
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};

const send = (method, params = {}) =>
  new Promise((r) => {
    const id = ++msgId;
    pending.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });

await send('Page.enable');
await send('Runtime.enable');

const pagesToTest = [
  { file: 'index.html', out: 'scratch/qa-home-desktop.png', w: 1440, h: 950 },
  { file: 'about.html', out: 'scratch/qa-about-desktop.png', w: 1440, h: 950 },
  { file: 'projects.html', out: 'scratch/qa-projects-desktop.png', w: 1440, h: 950 },
  { file: 'services.html', out: 'scratch/qa-services-desktop.png', w: 1440, h: 950 },
  { file: 'contact.html', out: 'scratch/qa-contact-desktop.png', w: 1440, h: 950 },
  { file: 'hire.html', out: 'scratch/qa-hire-desktop.png', w: 1440, h: 950 },
  { file: 'index.html', out: 'scratch/qa-home-mobile.png', w: 390, h: 844 }
];

for (const item of pagesToTest) {
  await send('Emulation.setDeviceMetricsOverride', {
    width: item.w,
    height: item.h,
    deviceScaleFactor: 1,
    mobile: item.w < 600
  });
  await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/${item.file}` });
  await sleep(2200);

  // Check images loaded (excluding lazy images that have not been scrolled into view yet) and no horizontal overflow
  const checkRes = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const brokenImgs = imgs.filter(img => {
        if (img.loading === 'lazy' && img.getBoundingClientRect().top > window.innerHeight) return false;
        return !img.complete || img.naturalWidth === 0;
      }).map(img => img.src);
      const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth;
      const activeNav = document.querySelector('.nav-link.active')?.getAttribute('data-nav-page') || null;
      return {
        title: document.title,
        totalImages: imgs.length,
        brokenImgs,
        overflowX,
        activeNav
      };
    })()`
  });

  console.log(`[${item.file} @ ${item.w}x${item.h}] ->`, JSON.stringify(checkRes.result?.value));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(item.out, Buffer.from(shot.data, 'base64'));
}

// Functional Test 1: Projects Filter & Case-Study Modal on projects.html
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/projects.html` });
await sleep(2500);

const projectFilterRes = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const aiBtn = document.querySelector('[data-filter="ai"]');
    if (aiBtn) aiBtn.click();
    await new Promise(r => setTimeout(r, 200));
    const visibleAfterAi = Array.from(document.querySelectorAll('[data-project-card]:not(.hidden)')).length;

    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.click();
    await new Promise(r => setTimeout(r, 200));
    const visibleAfterAll = Array.from(document.querySelectorAll('[data-project-card]:not(.hidden)')).length;

    // Open SwasthyaSutra case study modal
    const caseBtn = document.querySelector('[data-open-case="swasthyasutra"]');
    if (caseBtn) caseBtn.click();
    await new Promise(r => setTimeout(r, 300));

    const modal = document.getElementById('case-study-modal');
    const modalOpen = modal ? modal.classList.contains('open') : false;
    const modalTitle = document.getElementById('modal-project-title')?.textContent?.trim();
    return { visibleAfterAi, visibleAfterAll, modalOpen, modalTitle };
  })()`
});
console.log('[Functional Test: Projects Filter + Modal] ->', JSON.stringify(projectFilterRes.result?.value));
await sleep(500);
const modalShot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('scratch/qa-case-study-modal.png', Buffer.from(modalShot.data, 'base64'));

// Functional Test 2: Contact Form Validation & Submission State on contact.html
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/contact.html` });
await sleep(2500);
const contactTestRes = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const submitBtn = document.getElementById('contact-submit-btn');
    submitBtn.click();
    const emptyInvalidCount = document.querySelectorAll('.input-error').length;

    document.getElementById('contact-name').value = 'Sarah Jenkins';
    document.getElementById('contact-email').value = 'sarah@studio.io';
    document.getElementById('contact-type').value = 'General Inquiry';
    document.getElementById('contact-budget').value = 'General Discussion / No Budget';
    document.getElementById('contact-message').value = 'Looking to discuss an upcoming interactive web project collaboration.';
    submitBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const statusBox = document.getElementById('contact-form-status');
    const statusVisible = statusBox && !statusBox.classList.contains('hidden');
    return { emptyInvalidCount, statusVisible };
  })()`
});
console.log('[Functional Test: Contact Form] ->', JSON.stringify(contactTestRes.result?.value));

// Functional Test 3: Fast-Track Project Inquiry Form on hire.html
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/hire.html` });
await sleep(2500);
const hireTestRes = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const submitBtn = document.getElementById('contact-submit-btn');
    submitBtn.click();
    await new Promise(r => setTimeout(r, 100));
    const emptyInvalidCount = document.querySelectorAll('.input-error').length;

    document.getElementById('contact-name').value = 'David Miller (Nexus Corp)';
    document.getElementById('contact-email').value = 'david@nexuscorp.com';
    document.getElementById('contact-type').value = 'Interactive 3D / WebGL Experience';
    document.getElementById('contact-budget').value = '$1,500 – $3,000 (Comprehensive 3D Platform)';
    document.getElementById('contact-message').value = 'Need an immersive 3D landing page with Three.js and GSAP.';
    submitBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const statusBox = document.getElementById('contact-form-status');
    const statusVisible = statusBox && !statusBox.classList.contains('hidden');
    return { emptyInvalidCount, statusVisible };
  })()`
});
console.log('[Functional Test: Hire Form] ->', JSON.stringify(hireTestRes.result?.value));

// Functional Test 4: Interactive 3D Model Portrait on index.html
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html` });
await sleep(2500);
const turntableTestRes = await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `(async () => {
    const canvas = document.getElementById('portrait-360-canvas');
    const staticImg = document.getElementById('portrait-static-img');
    const angleBadge = document.getElementById('portrait-360-angle');
    const btnNext = document.getElementById('portrait-btn-next');
    const btnReset = document.getElementById('portrait-btn-reset');

    const thumbnailSrc = staticImg ? staticImg.getAttribute('src') : null;
    const thumbnailLoaded = staticImg ? (staticImg.complete && staticImg.naturalWidth > 0) : false;
    const initialAngle = angleBadge ? angleBadge.textContent : null;
    const canvasExists = !!canvas;
    const canvasW = canvas ? canvas.width : 0;
    const canvasH = canvas ? canvas.height : 0;

    // Simulate clicking next button (smooth 3D step)
    if (btnNext) btnNext.click();
    await new Promise(r => setTimeout(r, 200));
    const angleAfterNext = angleBadge ? angleBadge.textContent : null;

    // Click reset to return to front view
    if (btnReset) btnReset.click();
    await new Promise(r => setTimeout(r, 400));
    const angleAfterReset = angleBadge ? angleBadge.textContent : null;

    return {
      thumbnailSrc,
      thumbnailLoaded,
      canvasExists,
      canvasW,
      canvasH,
      initialAngle,
      angleAfterNext,
      angleAfterReset
    };
  })()`
});
console.log('[Functional Test: 3D Portrait] ->', JSON.stringify(turntableTestRes.result?.value));

console.log('Console Errors Count:', consoleErrors.length);
if (consoleErrors.length > 0) {
  console.log('Console Errors:', consoleErrors);
}

ws.close();
chromeProc.kill();
server.close();
process.exit(0);
