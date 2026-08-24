(() => {
  'use strict';
  const inEl = document.getElementById('html-input');
  const modeEl = document.getElementById('html-mode');
  const outEl = document.getElementById('html-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-html-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('html-res-card');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function encodeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  function decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  btn.addEventListener('click', () => {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter text to encode or decode.', true);
      resCard.style.display = 'none';
      return;
    }
    const mode = modeEl.value;
    const res = mode === 'encode' ? encodeHTML(raw) : decodeHTML(raw);
    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('HTML entities ' + mode + 'd successfully.');
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();