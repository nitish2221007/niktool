(() => {
  'use strict';
  const pEl = document.getElementById('dh-p'), gEl = document.getElementById('dh-g');
  const aEl = document.getElementById('dh-a'), bEl = document.getElementById('dh-b');
  const sResEl = document.getElementById('dh-res-secret'), exResEl = document.getElementById('dh-res-ex');

  function modExp(base, exp, mod) {
    let res = 1n, b = BigInt(base) % BigInt(mod), e = BigInt(exp), m = BigInt(mod);
    while (e > 0n) {
      if (e % 2n === 1n) res = (res * b) % m;
      b = (b * b) % m;
      e = e / 2n;
    }
    return Number(res);
  }

  function update() {
    const p = parseInt(pEl.value, 10), g = parseInt(gEl.value, 10);
    const a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10);

    if (isNaN(p) || isNaN(g) || isNaN(a) || isNaN(b) || p <= 2 || g <= 1 || a <= 0 || b <= 0) return;

    // Alice calculates public A = g^a mod p
    const A = modExp(g, a, p);

    // Bob calculates public B = g^b mod p
    const B = modExp(g, b, p);

    // Alice computes K_A = B^a mod p
    const K_A = modExp(B, a, p);

    // Bob computes K_B = A^b mod p
    const K_B = modExp(A, b, p);

    sResEl.textContent = 'Shared Secret Key K = ' + K_A + (K_A === K_B ? ' (MATCHES ✓)' : ' (ERROR)');
    exResEl.textContent = 'Alice Public A = ' + A + ' | Bob Public B = ' + B + ' (K = ' + g + '^(' + a + '·' + b + ') mod ' + p + ' = ' + K_A + ')';
  }

  [pEl, gEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();