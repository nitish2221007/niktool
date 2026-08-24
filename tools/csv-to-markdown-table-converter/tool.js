(() => {
  'use strict';
  const inEl = document.getElementById('csv-input'), outEl = document.getElementById('csv-output');
  const btn = document.getElementById('conv-csv-btn'), copyBtn = document.getElementById('copy-csv-md-btn');
  const msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function convert() {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please paste CSV data.', true); return; }

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    const rows = lines.map(line => line.split(',').map(c => c.trim()));
    if (rows.length === 0) return;

    const header = rows[0];
    const sep = header.map(() => '---');

    const md = [];
    md.push('| ' + header.join(' | ') + ' |');
    md.push('| ' + sep.join(' | ') + ' |');
    for (let i = 1; i < rows.length; i++) {
      md.push('| ' + rows[i].join(' | ') + ' |');
    }

    outEl.value = md.join('\n');
    setMsg('Converted ' + rows.length + ' rows to Markdown table.');
  }

  btn.addEventListener('click', convert);
  convert();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Markdown table copied.');
  });
})();