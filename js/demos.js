/* AI-automation demos. All logic runs locally in the browser — no network calls, no API keys.
   They are rule-based/statistical prototypes that show the *workflow*; an LLM step could be
   plugged in server-side later. */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const STOP = new Set(('a an and are as at be but by for from has have he her his i if in into is it its of on or our she so that the their them then there these they this to was we were what when which who will with you your not can also more most than very just about over such other been being do does did how all any each both few many much own same too'
    + ' would could should may might must shall us up out one two new use used using').split(' '));

  /* ---------- Shared text helpers ---------- */
  const sentencesOf = (t) => (t.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+(?:["')\]]+)?|[^.!?]+$/g) || []).map((s) => s.trim()).filter((s) => s.length > 3);
  const wordsOf = (t) => (t.toLowerCase().match(/[a-z][a-z'-]{1,}/g) || []);

  /* ---------- Demo A: research summariser ---------- */
  const SAMPLE_A = `Remote work has changed how small teams organise their days. Surveys from several research groups suggest that many employees report fewer interruptions at home, but they also report weaker links with colleagues. Teams that write down decisions in shared documents tend to stay aligned even when members work in different time zones. Managers often say that clear goals matter more than hours spent online. In one study of 1,200 workers, about 62% said flexible schedules helped them focus on deep work. However, the same study found that new hires struggled to learn unwritten norms without in-person contact. Companies that mix short weekly check-ins with documented processes usually report smoother onboarding. Tools alone do not solve the problem, because habits and expectations shape how people communicate. Overall, the evidence points to a balanced approach: protect focus time, document decisions, and make space for human contact.`;

  function summarise(text, count) {
    const sents = sentencesOf(text);
    const all = wordsOf(text).filter((w) => !STOP.has(w) && w.length > 2);
    const freq = new Map();
    all.forEach((w) => freq.set(w, (freq.get(w) || 0) + 1));
    const scored = sents.map((s, i) => {
      const ws = wordsOf(s).filter((w) => !STOP.has(w) && w.length > 2);
      let score = ws.reduce((a, w) => a + (freq.get(w) || 0), 0) / Math.sqrt(ws.length || 1);
      if (i === 0) score *= 1.15;               // lead sentences often carry the topic
      if (/\d/.test(s)) score *= 1.1;            // concrete figures
      return { s, i, score };
    });
    const picked = scored.slice().sort((a, b) => b.score - a.score).slice(0, Math.min(count, scored.length)).sort((a, b) => a.i - b.i);
    const topics = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8).map(([w, n]) => ({ w, n }));
    const figures = [...new Set((text.match(/\$?\d[\d,]*(?:\.\d+)?%?/g) || []).filter((x) => x.replace(/\D/g, '').length > 0))].slice(0, 8);
    return { sents: sents.length, words: wordsOf(text).length, picked, topics, figures };
  }

  function runResearch(root) {
    const text = $('#r-input', root).value.trim();
    const out = $('[data-out]', root);
    if (sentencesOf(text).length < 3) { out.innerHTML = '<p class="placeholder">Please paste at least three sentences so there is something to summarise.</p>'; return; }
    const r = summarise(text, +$('#r-count', root).value);
    out.innerHTML = `
      <div class="stat-row"><span><b>${r.words}</b> words</span><span><b>${r.sents}</b> sentences</span><span>Kept <b>${r.picked.length}</b></span></div>
      <h4>Key sentences</h4>
      <ol>${r.picked.map((p) => `<li>${esc(p.s)}</li>`).join('')}</ol>
      <h4>Recurring topics</h4>
      <ul class="pill-list">${r.topics.map((t) => `<li>${esc(t.w)} ×${t.n}</li>`).join('')}</ul>
      <h4>Figures mentioned</h4>
      ${r.figures.length ? `<ul class="pill-list">${r.figures.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : '<p class="placeholder">No numbers found.</p>'}
      <h4>Next step</h4><p>Review against the source before using — this is a first-pass aid, not a verified summary.</p>`;
  }

  /* ---------- Demo B: content review ---------- */
  const SAMPLE_B = `Our new productivity app is really very good and basically helps you do things faster. It has a lot of features that many people find useful, and we think that it could possibly change the way that you work every single day because it was designed by a team that cares about quality and that has been working on it for a long time without stopping.`;
  const FILLER = ['really', 'very', 'basically', 'actually', 'just', 'simply', 'literally', 'quite', 'a lot of', 'in order to', 'possibly', 'things'];
  const CTA = /\b(try|start|get|join|learn|sign up|subscribe|download|book|contact|buy|read|see|discover|click|visit|reply|message)\b/i;

  function reviewContent(text) {
    const sents = sentencesOf(text);
    const words = wordsOf(text);
    const avg = words.length / (sents.length || 1);
    const long = sents.filter((s) => wordsOf(s).length > 28);
    const lower = text.toLowerCase();
    const fillers = FILLER.map((f) => ({ f, n: (lower.match(new RegExp('\\b' + f + '\\b', 'g')) || []).length })).filter((x) => x.n);
    const passive = (text.match(/\b(is|are|was|were|been|being|be)\s+\w+(ed|en)\b/gi) || []).length;
    const checks = [
      { ok: words.length >= 25 && words.length <= 250, t: 'Length', d: `${words.length} words (aim for roughly 25–250 for a short piece).` },
      { ok: avg <= 22, t: 'Sentence length', d: `Average ${avg.toFixed(1)} words per sentence${long.length ? `; ${long.length} sentence(s) over 28 words` : ''}.` },
      { ok: fillers.length === 0, t: 'Filler words', d: fillers.length ? 'Found: ' + fillers.map((x) => `“${x.f}” ×${x.n}`).join(', ') : 'No common filler detected.' },
      { ok: passive <= 1, t: 'Passive voice', d: passive ? `${passive} possible passive construction(s).` : 'None detected.' },
      { ok: CTA.test(text), t: 'Call to action', d: CTA.test(text) ? 'An action verb was found.' : 'No clear next step for the reader.' },
      { ok: sents.length >= 2, t: 'Structure', d: `${sents.length} sentence(s). Short drafts read better with a clear opening and a closing line.` },
    ];
    const score = Math.round((checks.filter((c) => c.ok).length / checks.length) * 100);
    return { checks, score, long };
  }

  function runContent(root) {
    const text = $('#c-input', root).value.trim();
    const out = $('[data-out]', root);
    if (wordsOf(text).length < 8) { out.innerHTML = '<p class="placeholder">Paste a few sentences of draft copy to review.</p>'; return; }
    const r = reviewContent(text);
    out.innerHTML = `
      <h4>Checklist score</h4>
      <p class="score">${r.score}<small>/ 100 — automated checks only</small></p>
      <h4>Review checklist</h4>
      <ul class="check-list">${r.checks.map((c) => `<li class="${c.ok ? 'ok' : 'warn'}"><span class="mark" aria-hidden="true">${c.ok ? '✓' : '!'}</span><span><b>${esc(c.t)}</b> <span class="sr-only">${c.ok ? '(passed)' : '(needs attention)'}</span><small>${esc(c.d)}</small></span></li>`).join('')}</ul>
      ${r.long.length ? `<h4>Longest sentence</h4><p>${esc(r.long.sort((a, b) => b.length - a.length)[0])}</p>` : ''}
      <h4>Next step</h4><p>A human editor reviews the flagged items and approves or rewrites the draft.</p>`;
  }

  /* ---------- Demo C: data clean-up pipeline ---------- */
  const SAMPLE_C = `  maria lopez
John SMITH

aisha khan <aisha.khan@example.com>
john smith
 Ravi Patel
sam.o'neil@example.org
maria lopez
Li Wei   `;
  const STEPS = {
    trim: (l) => l.map((x) => x.trim()),
    blank: (l) => l.filter((x) => x.trim() !== ''),
    title: (l) => l.map((x) => x.toLowerCase().replace(/(^|[\s\-'])([a-z])/g, (m, a, b) => a + b.toUpperCase())),
    dedupe: (l) => { const seen = new Set(); return l.filter((x) => { const k = x.trim().toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; }); },
    sort: (l) => l.slice().sort((a, b) => a.localeCompare(b)),
    emails: (l) => l.flatMap((x) => x.match(/[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []),
  };
  const ORDER = ['trim', 'blank', 'emails', 'title', 'dedupe', 'sort'];
  let lastClean = '';

  function runCleaner(root) {
    const out = $('[data-out]', root);
    const raw = $('#d-input', root).value;
    if (!raw.trim()) { out.innerHTML = '<p class="placeholder">Paste a list first.</p>'; return; }
    const active = new Set([...root.querySelectorAll('.steps input:checked')].map((i) => i.value));
    let lines = raw.split(/\r?\n/);
    const before = lines.length;
    const log = [];
    ORDER.forEach((k) => {
      if (!active.has(k)) return;
      const n = lines.length;
      lines = STEPS[k](lines);
      log.push(`${k}: ${n} → ${lines.length} lines`);
    });
    lastClean = lines.join('\n');
    out.innerHTML = `
      <div class="stat-row"><span><b>${before}</b> lines in</span><span><b>${lines.length}</b> lines out</span></div>
      <h4>Result</h4><pre>${esc(lastClean) || '(empty)'}</pre>
      <h4>Pipeline log</h4>
      ${log.length ? `<ul class="plain">${log.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` : '<p class="placeholder">No steps selected.</p>'}`;
  }

  async function copyCleaner(root) {
    const out = $('[data-out]', root);
    if (!lastClean) { runCleaner(root); }
    if (!lastClean) return;
    try { await navigator.clipboard.writeText(lastClean); out.insertAdjacentHTML('afterbegin', '<p class="stat-row"><b>Copied to clipboard.</b></p>'); }
    catch { out.insertAdjacentHTML('afterbegin', '<p class="stat-row"><b>Copy blocked by the browser — select the result and press Ctrl+C.</b></p>'); }
  }

  /* ---------- Wire up ---------- */
  const cfg = {
    research: { input: '#r-input', sample: SAMPLE_A, run: runResearch },
    content: { input: '#c-input', sample: SAMPLE_B, run: runContent },
    cleaner: { input: '#d-input', sample: SAMPLE_C, run: runCleaner, copy: copyCleaner },
  };
  document.querySelectorAll('[data-demo]').forEach((root) => {
    const c = cfg[root.dataset.demo];
    if (!c) return;
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const a = btn.dataset.action;
      if (a === 'sample') { $(c.input, root).value = c.sample; c.run(root); }
      else if (a === 'run') c.run(root);
      else if (a === 'copy' && c.copy) c.copy(root);
    });
  });
})();
