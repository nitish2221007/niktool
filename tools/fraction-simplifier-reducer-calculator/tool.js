(() => {
  'use strict';
  const numEl = document.getElementById('fr-num'), denEl = document.getElementById('fr-den');
  const simpEl = document.getElementById('fr-res-simp'), mixEl = document.getElementById('fr-res-mixed'), decEl = document.getElementById('fr-res-dec');

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  function update() {
    const num = parseInt(numEl.value, 10);
    const den = parseInt(denEl.value, 10);

    if (isNaN(num) || isNaN(den) || den === 0) return;

    const common = gcd(num, den);
    const sNum = num / common;
    const sDen = den / common;
    const dec = num / den;

    simpEl.textContent = sNum + ' / ' + sDen;
    decEl.textContent = dec.toFixed(4);

    if (Math.abs(num) >= Math.abs(den)) {
      const whole = Math.floor(Math.abs(num) / Math.abs(den));
      const rem = Math.abs(num) % Math.abs(den);
      const remSimp = rem / common;
      mixEl.textContent = (num < 0 ? '-' : '') + whole + (rem !== 0 ? ' ' + remSimp + '/' + sDen : '');
    } else {
      mixEl.textContent = 'Proper Fraction (No whole integer)';
    }
  }

  numEl.addEventListener('input', update);
  denEl.addEventListener('input', update);
  update();
})();