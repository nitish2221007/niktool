(() => {
  'use strict';
  const inEl = document.getElementById('b32-input'), outEl = document.getElementById('b32-output');
  const encBtn = document.getElementById('b32-encode-btn'), decBtn = document.getElementById('b32-decode-btn');
  const copyBtn = document.getElementById('copy-b32-btn'), msgEl = document.getElementById('tool-message');

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bits = 0, value = 0, output = '';
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
      bits += 8;
      while (bits >= 5) {
        output += ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += ALPHABET[(value << (5 - bits)) & 31];
    }
    while (output.length % 8 !== 0) output += '=';
    return output;
  }

  function decode(str) {
    const clean = str.replace(/=+$/, '').toUpperCase();
    let bits = 0, value = 0;
    const bytes = [];
    for (let i = 0; i < clean.length; i++) {
      const idx = ALPHABET.indexOf(clean[i]);
      if (idx === -1) throw new Error('Invalid Base32 character: ' + clean[i]);
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bytes.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }

  encBtn.addEventListener('click', () => {
    try {
      outEl.value = encode(inEl.value);
      setMsg('Text encoded to Base32.');
    } catch (e) { setMsg(e.message, true); }
  });

  decBtn.addEventListener('click', () => {
    try {
      outEl.value = decode(inEl.value);
      setMsg('Base32 decoded successfully.');
    } catch (e) { setMsg(e.message, true); }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Copied to clipboard.');
  });
})();