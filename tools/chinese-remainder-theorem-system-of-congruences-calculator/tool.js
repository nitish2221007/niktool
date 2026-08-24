(() => {
  'use strict';
  const a1El = document.getElementById('crt-a1'), m1El = document.getElementById('crt-m1');
  const a2El = document.getElementById('crt-a2'), m2El = document.getElementById('crt-m2');
  const a3El = document.getElementById('crt-a3'), m3El = document.getElementById('crt-m3');
  const xResEl = document.getElementById('crt-res-x'), chkResEl = document.getElementById('crt-res-check');

  function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

  function modInverse(a, m) {
    const { gcd: g, x } = extGCD(((a % m) + m) % m, m);
    return g === 1 ? ((x % m) + m) % m : null;
  }

  function update() {
    const a1 = parseInt(a1El.value, 10), m1 = parseInt(m1El.value, 10);
    const a2 = parseInt(a2El.value, 10), m2 = parseInt(m2El.value, 10);
    const a3 = parseInt(a3El.value, 10), m3 = parseInt(m3El.value, 10);

    if (isNaN(a1) || isNaN(m1) || isNaN(a2) || isNaN(m2) || isNaN(a3) || isNaN(m3) || m1 <= 1 || m2 <= 1 || m3 <= 1) return;

    // Check pairwise coprimality:
    if (gcd(m1, m2) !== 1 || gcd(m1, m3) !== 1 || gcd(m2, m3) !== 1) {
      xResEl.textContent = 'MODULI NOT COPRIME (gcd ≠ 1)';
      chkResEl.textContent = 'm₁, m₂, m₃ must be pairwise coprime for the standard Chinese Remainder Theorem';
      return;
    }

    const M = m1 * m2 * m3;
    const M1 = M / m1, M2 = M / m2, M3 = M / m3;

    const y1 = modInverse(M1, m1);
    const y2 = modInverse(M2, m2);
    const y3 = modInverse(M3, m3);

    if (y1 === null || y2 === null || y3 === null) return;

    let x = (a1 * M1 * y1 + a2 * M2 * y2 + a3 * M3 * y3) % M;
    x = ((x % M) + M) % M;

    const c1 = x % m1 === ((a1 % m1) + m1) % m1;
    const c2 = x % m2 === ((a2 % m2) + m2) % m2;
    const c3 = x % m3 === ((a3 % m3) + m3) % m3;

    xResEl.textContent = 'Unique Solution x ≡ ' + x + ' (mod ' + M + ')';
    chkResEl.textContent = 'Check: ' + x + ' mod ' + m1 + ' = ' + (x % m1) + (c1 ? ' ✓' : ' ✗') + ' | ' + x + ' mod ' + m2 + ' = ' + (x % m2) + (c2 ? ' ✓' : ' ✗') + ' | ' + x + ' mod ' + m3 + ' = ' + (x % m3) + (c3 ? ' ✓' : ' ✗') + ' (x = ' + x + ' + ' + M + 'k)';
  }

  [a1El, m1El, a2El, m2El, a3El, m3El].forEach(el => el.addEventListener('input', update));
  update();
})();