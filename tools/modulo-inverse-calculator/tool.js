(() => {
  'use strict';
  const aEl = document.getElementById('mod-a'), mEl = document.getElementById('mod-m');
  const xEl = document.getElementById('mod-res-x'), chkEl = document.getElementById('mod-res-check');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const { gcd, x: x1, y: y1 } = extGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return { gcd, x, y };
  }

  function update() {
    const a = parseInt(aEl.value, 10);
    const m = parseInt(mEl.value, 10);
    if (isNaN(a) || isNaN(m) || m <= 1) return;

    const { gcd, x } = extGCD(a, m);
    if (gcd !== 1) {
      xEl.textContent = 'No Inverse Exists';
      xEl.style.color = '#c53030';
      chkEl.textContent = 'GCD(' + a + ', ' + m + ') = ' + gcd + ' ≠ 1 (Not Coprime)';
      return;
    }

    const inv = ((x % m) + m) % m;
    xEl.textContent = 'x = ' + inv;
    xEl.style.color = '#22543d';
    chkEl.textContent = '(' + a + ' × ' + inv + ') mod ' + m + ' = ' + ((a * inv) % m);
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();