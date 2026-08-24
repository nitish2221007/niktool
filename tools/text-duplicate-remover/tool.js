(() => {
  'use strict';
  const inEl = document.getElementById('dup-input');
  const caseEl = document.getElementById('dup-case-sensitive');
  const sortEl = document.getElementById('dup-sort-az');
  const trimEl = document.getElementById('dup-trim-ws');

  const outEl = document.getElementById('dup-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-dup-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dup-res-card');

  const statOrig = document.getElementById('dup-stat-orig');
  const statUnique = document.getElementById('dup-stat-unique');
  const statRemoved = document.getElementById('dup-stat-removed');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function dedupe() {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter a list to deduplicate.', true);
      resCard.style.display = 'none';
      return;
    }

    let lines = raw.split('\n');
    const totalLines = lines.length;
    const isCase = caseEl.checked;
    const doTrim = trimEl.checked;
    const doSort = sortEl.checked;

    const seen = new Set();
    const result = [];

    for (let line of lines) {
      if (doTrim) line = line.trim();
      if (!line) continue;
      const key = isCase ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    if (doSort) {
      result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: isCase ? 'case' : 'base' }));
    }

    statOrig.textContent = totalLines.toString();
    statUnique.textContent = result.length.toString();
    statRemoved.textContent = (totalLines - result.length).toString();

    outEl.value = result.join('\n');
    resCard.style.display = 'block';
    setMsg('Removed ' + (totalLines - result.length) + ' duplicate lines.');
  }

  btn.addEventListener('click', dedupe);
  caseEl.addEventListener('change', dedupe);
  sortEl.addEventListener('change', dedupe);
  trimEl.addEventListener('change', dedupe);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Deduplicated list copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();