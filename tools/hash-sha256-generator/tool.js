(() => {
  'use strict';
  const inEl = document.getElementById('sha-input'), outEl = document.getElementById('sha-output');
  const copyBtn = document.getElementById('copy-sha-btn');

  async function update() {
    const text = inEl.value;
    if (!text) { outEl.value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; return; }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    outEl.value = hashHex;
  }

  inEl.addEventListener('input', update);
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();