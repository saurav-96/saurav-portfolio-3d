// Usage: node scripts/shot.mjs <url> <out.png> [width] [height] [waitMs] [fullPage]
// Captures a screenshot with headless Chrome via the DevTools protocol (no dependencies).
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const [url, out, w = '1440', h = '900', wait = '4000', full = '0'] = process.argv.slice(2);
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`,
  `--user-data-dir=${process.env.TEMP}\\shot-${port}`, `--window-size=${w},${h}`, 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); }
}
const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Emulation.setDeviceMetricsOverride', { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 600 });
await send('Page.enable');
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url });
await sleep(+wait);
if (full === '1') {
  await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}window.scrollTo(0,0);await new Promise(r=>setTimeout(r,800));})()` });
}
if (process.env.SECTION) {
  await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{document.documentElement.style.scrollBehavior='auto';const el=document.querySelector(${JSON.stringify(process.env.SECTION)});window.scrollTo(0,el.getBoundingClientRect().top+scrollY-${+(process.env.OFFSET||72)});await new Promise(r=>setTimeout(r,1500));})()` });
}
if (process.env.EVAL) {
  const r = await send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: process.env.EVAL });
  if (r.result && r.result.value !== undefined) console.log('EVAL:', JSON.stringify(r.result.value));
  if (r.exceptionDetails) console.log('EVAL ERROR:', JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails));
  await sleep(600);
}
let clip;
if (full === '1') {
  const m = await send('Page.getLayoutMetrics');
  const sz = m.cssContentSize || m.contentSize;
  clip = { x: 0, y: 0, width: sz.width, height: sz.height, scale: 1 };
}
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full === '1', ...(clip ? { clip } : {}) });
writeFileSync(out, Buffer.from(shot.data, 'base64'));
ws.close(); proc.kill();
console.log('saved', out);
process.exit(0);
