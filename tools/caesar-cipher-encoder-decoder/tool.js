(() => {
  'use strict';
  const inEl = document.getElementById('csr-in'), sEl = document.getElementById('csr-shift'), outEl = document.getElementById('csr-out');

  function update() {
    const str = inEl.value;
    const shift = parseInt(sEl.value, 10) || 0;

    let res = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) { // Uppercase
        res += String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      } else if (code >= 97 && code <= 122) { // Lowercase
        res += String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      } else {
        res += str[i];
      }
    }

    outEl.value = res;
  }

  inEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();