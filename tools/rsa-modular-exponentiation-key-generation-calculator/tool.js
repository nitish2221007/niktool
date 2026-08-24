(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), mEl = document.getElementById('rsa-m');
  const kResEl = document.getElementById('rsa-res-keys'), cResEl = document.getElementById('rsa-res-cipher');

  // Extended Euclidean algorithm for modular inverse
  function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0, x1 = 1;
    if (m === 1) return 0;
    while (a > 1) {
      q = Math.floor(a / m);
      t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  }

  // Modular exponentiation (base^exp mod mod)
  function powerMod(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  }

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function update() {
    const p = parseInt(pEl.value, 10), q = parseInt(qEl.value, 10);
    const e = parseInt(eEl.value, 10), m = parseInt(mEl.value, 10);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m) || p <= 1 || q <= 1 || p === q || m < 0) return;

    // Modulus n = p * q
    const n = p * q;
    // Euler totient phi(n) = (p - 1) * (q - 1)
    const phi = (p - 1) * (q - 1);

    if (gcd(e, phi) !== 1) {
      kResEl.textContent = 'Invalid e: gcd(e, φ(n)) must be 1!';
      return;
    }

    // Private key d = e^-1 mod phi
    const d = modInverse(e, phi);

    // Encrypt ciphertext c = m^e mod n
    const c = powerMod(m, e, n);

    // Decrypt decrypted = c^d mod n
    const decrypted = powerMod(c, d, n);

    kResEl.textContent = 'Public (e=' + e + ', n=' + n + ') | Private d = ' + d + ' (φ = ' + phi + ')';
    cResEl.textContent = 'Ciphertext c = ' + c + ' | Decrypted: ' + decrypted + ' (Match: ' + (decrypted === m ? 'VERIFIED OK' : 'FAIL') + ')';
  }

  [pEl, qEl, eEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();