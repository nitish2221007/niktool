(() => {
  'use strict';
  const inEl = document.getElementById('sha512-input'), outEl = document.getElementById('sha512-output');
  const copyBtn = document.getElementById('copy-sha512-btn');

  async function update() {
    const text = inEl.value;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
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