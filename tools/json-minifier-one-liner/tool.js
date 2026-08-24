(() => {
  'use strict';
  const inEl = document.getElementById('json-min-input'), outEl = document.getElementById('json-min-output');
  const minBtn = document.getElementById('btn-minify-json'), escBtn = document.getElementById('btn-escape-json');
  const copyBtn = document.getElementById('copy-min-json-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  minBtn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please paste JSON data.', true); return; }
    try {
      const obj = JSON.parse(raw);
      const min = JSON.stringify(obj);
      outEl.value = min;
      const saved = ((raw.length - min.length) / raw.length) * 100;
      setMsg('JSON minified successfully (Size reduced by ' + saved.toFixed(1) + '%).');
    } catch (e) {
      setMsg('Invalid JSON syntax: ' + e.message, true);
    }
  });

  escBtn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) return;
    try {
      const obj = JSON.parse(raw);
      const min = JSON.stringify(obj);
      outEl.value = JSON.stringify(min);
      setMsg('JSON stringified & escaped for env variables.');
    } catch (e) {
      setMsg('Invalid JSON syntax.', true);
    }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Minified JSON copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();