(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), mEl = document.getElementById('rsa-m');
  const cResEl = document.getElementById('rsa-res-ciph'), kResEl = document.getElementById('rsa-res-keys');

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

  function modInverse(e, phi) {
    let [m0, y, x] = [phi, 0n, 1n];
    if (phi === 1n) return 0n;
    while (e > 1n) {
      if (phi === 0n) return null;
      let q = e / phi;
      let t = phi;
      phi = e % phi;
      e = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0n) x += m0;
    return x;
  }

  function update() {
    try {
      const p = BigInt(pEl.value), q = BigInt(qEl.value);
      const e = BigInt(eEl.value), M = BigInt(mEl.value);

      if (p <= 1n || q <= 1n || p === q || e <= 1n || M < 0n) return;

      const n = p * q;
      const phi = (p - 1n) * (q - 1n);
      const d = modInverse(e, phi);
      if (!d) {
        cResEl.textContent = 'Error: e is not coprime to φ(n)';
        return;
      }

      const C = modExp(M, e, n);
      const M_dec = modExp(C, d, n);

      cResEl.textContent = 'Ciphertext C = ' + C.toString() + ' (Decrypted: ' + M_dec.toString() + ')';
      kResEl.textContent = 'Public (n=' + n.toString() + ', e=' + e.toString() + ') | Private d=' + d.toString() + ' (φ=' + phi.toString() + ')';
    } catch (err) {}
  }

  [pEl, qEl, eEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();