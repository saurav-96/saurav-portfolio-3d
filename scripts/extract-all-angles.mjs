// scripts/extract-all-angles.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 8820;
const DEBUG_PORT = 9570;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const uploadedBase = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\cd22af7d-af27-43e1-a231-5c9921362c73\\.user_uploaded';

const imagesToProcess = [
  { id: 1, file: 'media_1793763986213_09ef69ab.jpg', desc: 'Front-Right ~70°' },
  { id: 2, file: 'media_1793764117048_af29c667.jpg', desc: 'Back-Right ~140°' },
  { id: 3, file: 'media_1793764156949_45be5c6a.jpg', desc: 'Full Back ~190°' },
  { id: 4, file: 'media_1793764231555_2057c7a6.jpg', desc: 'Left ~290°' }
];

const htmlPage = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>BG Remove Batch</title></head>
<body>
<script type="module">
import { AutoModel, AutoProcessor, RawImage, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.3.3';

env.allowLocalModels = false;

let model = null;
let processor = null;

window.initModel = async () => {
  model = await AutoModel.from_pretrained('briaai/RMBG-1.4', {
    config: { model_type: 'custom' }
  });
  processor = await AutoProcessor.from_pretrained('briaai/RMBG-1.4', {
    config: {
      do_normalize: true,
      do_pad: false,
      do_rescale: true,
      do_resize: true,
      image_mean: [0.5, 0.5, 0.5],
      feature_extractor_type: 'ImageFeatureExtractor',
      image_std: [1, 1, 1],
      resample: 2,
      rescale_factor: 0.00392156862745098,
      size: { width: 1024, height: 1024 }
    }
  });
  return true;
};

window.segmentImage = async (imgUrl) => {
  const image = await RawImage.fromURL(imgUrl);
  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });

  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');

  const imgEl = new Image();
  imgEl.src = imgUrl;
  await new Promise(r => imgEl.onload = r);
  ctx.drawImage(imgEl, 0, 0);

  const pixelData = ctx.getImageData(0, 0, image.width, image.height);
  const w = image.width;
  const h = image.height;

  for (let i = 0; i < mask.data.length; ++i) {
    let a = mask.data[i];
    if (a < 24) {
      a = 0;
    }

    const r = pixelData.data[4 * i];
    const g = pixelData.data[4 * i + 1];
    const b = pixelData.data[4 * i + 2];
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));

    // Zero out any remaining checkerboard pixels
    if (maxDiff <= 5 && ((r >= 112 && r <= 145) || (r >= 38 && r <= 62))) {
      // Checkerboard color
      if (a < 230) {
        a = 0;
      }
    }

    // Smooth bottom 3% fade so torso blends into pedestal ring
    const y = Math.floor(i / w);
    const bottomFadeStart = Math.floor(h * 0.96);
    if (y > bottomFadeStart) {
      const fade = 1 - (y - bottomFadeStart) / (h - bottomFadeStart);
      a = Math.round(a * Math.max(0, fade));
    }

    pixelData.data[4 * i + 3] = a;
  }

  ctx.putImageData(pixelData, 0, 0);
  return { ok: true, dataUrl: canvas.toDataURL('image/png') };
};
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/batch.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(htmlPage);
    return;
  }
  if (url.startsWith('/uploaded/')) {
    const filename = url.replace('/uploaded/', '');
    const filepath = path.join(uploadedBase, filename);
    if (fs.existsSync(filepath)) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  }
  res.writeHead(404);
  res.end('Not found');
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const chromeProc = spawn(
  CHROME_PATH,
  [
    '--headless=new',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${process.env.TEMP}\\bg-chrome-${DEBUG_PORT}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json();
    break;
  } catch {
    await sleep(200);
  }
}

const page = targets.find((t) => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let msgId = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.consoleAPICalled') {
    const txt = (m.params.args || []).map((a) => a.value || a.description || '').join(' ');
    console.log('[Browser]', txt);
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
await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/batch.html` });
await sleep(2500);

console.log('Initializing RMBG-1.4 model...');
await send('Runtime.evaluate', {
  awaitPromise: true,
  returnByValue: true,
  expression: `window.initModel()`
});
console.log('Model ready. Processing images...');

const outDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\cd22af7d-af27-43e1-a231-5c9921362c73\\scratch';

for (const item of imagesToProcess) {
  console.log(`Processing ${item.id}: ${item.desc} (${item.file})...`);
  const res = await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `window.segmentImage('/uploaded/${item.file}')`
  });

  const val = res.result?.value;
  if (val && val.ok && val.dataUrl) {
    const base64 = val.dataUrl.replace(/^data:image\/png;base64,/, '');
    const outPath = path.join(outDir, `cutout_angle_${item.id}.png`);
    fs.writeFileSync(outPath, Buffer.from(base64, 'base64'));
    console.log(`SUCCESS: Saved ${outPath}`);
  } else {
    console.error(`Failed ${item.id}:`, val);
  }
}

ws.close();
chromeProc.kill();
server.close();
console.log('All 4 unique angle images processed cleanly!');
process.exit(0);
