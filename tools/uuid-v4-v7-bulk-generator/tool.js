(() => {
  'use strict';
  const countEl = document.getElementById('uuid-count'), verEl = document.getElementById('uuid-version');
  const caseEl = document.getElementById('uuid-case'), outEl = document.getElementById('uuid-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-uuid-btn'), msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function genV4() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function genV7() {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, '0');
    const rand = Array.from(crypto.getRandomValues(new Uint8Array(10)))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    // Format: 018e47f2-xxxx-7xxx-yxxx-xxxxxxxxxxxx
    return (
      timeHex.slice(0, 8) + '-' +
      timeHex.slice(8, 12) + '-' +
      '7' + rand.slice(0, 3) + '-' +
      ((parseInt(rand.slice(3, 4), 16) & 0x3) | 0x8).toString(16) + rand.slice(4, 7) + '-' +
      rand.slice(7, 19)
    );
  }

  function generate() {
    const count = Math.min(500, Math.max(1, parseInt(countEl.value, 10) || 10));
    const ver = verEl.value;
    const isUpper = caseEl.value === 'upper';

    const list = [];
    for (let i = 0; i < count; i++) {
      let id = ver === 'v7' ? genV7() : genV4();
      list.push(isUpper ? id.toUpperCase() : id.toLowerCase());
    }

    outEl.value = list.join('\n');
    setMsg('Generated ' + count + ' ' + ver.toUpperCase() + ' UUIDs.');
  }

  btn.addEventListener('click', generate);
  verEl.addEventListener('change', generate);
  caseEl.addEventListener('change', generate);

  generate();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('UUIDs copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();