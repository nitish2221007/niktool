(() => {
  'use strict';
  const mEl = document.getElementById('vig-mode'), kEl = document.getElementById('vig-key');
  const inEl = document.getElementById('vig-in'), outEl = document.getElementById('vig-out');

  function update() {
    const isEnc = mEl.value === 'enc';
    const rawKey = kEl.value.toUpperCase().replace(/[^A-Z]/g, '');
    const str = inEl.value;

    if (!rawKey) { outEl.value = 'Please enter a valid key (A-Z)'; return; }

    let res = '';
    let keyIdx = 0;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const code = str.charCodeAt(i);
      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;

      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const p = code - base;
        const k = rawKey.charCodeAt(keyIdx % rawKey.length) - 65;

        let c = 0;
        if (isEnc) {
          c = (p + k) % 26;
        } else {
          c = (p - k + 26) % 26;
        }

        res += String.fromCharCode(c + base);
        keyIdx++;
      } else {
        res += ch;
      }
    }

    outEl.value = res;
  }

  [mEl, kEl, inEl].forEach(el => el.addEventListener('input', update));
  update();
})();