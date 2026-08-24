(() => {
  'use strict';
  const pEl = document.getElementById('dh-p'), gEl = document.getElementById('dh-g');
  const aEl = document.getElementById('dh-a'), bEl = document.getElementById('dh-b');
  const sResEl = document.getElementById('dh-res-sec'), pubResEl = document.getElementById('dh-res-pub');

  function modExp(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      exp = exp / 2n;
      base = (base * base) % mod;
    }
    return res;
  }

  function update() {
    try {
      const p = BigInt(pEl.value), g = BigInt(gEl.value);
      const a = BigInt(aEl.value), b = BigInt(bEl.value);

      if (p <= 2n || g <= 1n || a <= 0n || b <= 0n) return;

      const A = modExp(g, a, p);
      const B = modExp(g, b, p);
      const s_alice = modExp(B, a, p);

      sResEl.textContent = 'Shared Secret s = ' + s_alice.toString() + ' (Identical for Alice & Bob!)';
      pubResEl.textContent = 'Alice Public A = ' + A.toString() + ' | Bob Public B = ' + B.toString() + ' (mod ' + p.toString() + ')';
    } catch (err) {}
  }

  [pEl, gEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();