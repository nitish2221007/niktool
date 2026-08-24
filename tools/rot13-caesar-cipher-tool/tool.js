(() => {
  'use strict';
  const inEl = document.getElementById('rot-input'), typeEl = document.getElementById('rot-type');
  const shiftEl = document.getElementById('rot-shift-val'), grpShift = document.getElementById('grp-rot-shift');
  const outEl = document.getElementById('rot-output'), btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn'), copyBtn = document.getElementById('copy-rot-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rot-res-card');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  typeEl.addEventListener('change', () => {
    grpShift.style.display = typeEl.value === 'custom' ? 'block' : 'none';
    cipher();
  });

  function cipher() {
    const raw = inEl.value;
    if (!raw) { outEl.value = ''; resCard.style.display = 'none'; return; }

    const shift = typeEl.value === '13' ? 13 : (parseInt(shiftEl.value, 10) || 3) % 26;

    const res = raw.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });

    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('Cipher generated successfully with shift key ' + shift + '.');
  }

  btn.addEventListener('click', cipher);
  inEl.addEventListener('input', cipher);
  shiftEl.addEventListener('input', cipher);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Cipher copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();