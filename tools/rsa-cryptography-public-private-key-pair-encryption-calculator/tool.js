(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), msgEl = document.getElementById('rsa-msg');
  const cResEl = document.getElementById('rsa-res-cipher'), kResEl = document.getElementById('rsa-res-keys');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return { gcd: res.gcd, x: res.y, y: res.x - Math.floor(a / b) * res.y };
  }

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
    const p = parseInt(pEl.value, 10), q = parseInt(qEl.value, 10);
    const e = parseInt(eEl.value, 10), m = parseInt(msgEl.value, 10);

    if (isNaN(p) || isNaN(q) || isNaN(e) || isNaN(m) || p <= 1 || q <= 1 || p === q || e <= 1 || m < 0) return;

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    const { gcd, x } = extGCD(e, phi);
    if (gcd !== 1) {
      cResEl.textContent = 'INVALID EXPONENT e (gcd(e, φ(n)) = ' + gcd + ' ≠ 1)';
      kResEl.textContent = 'e must be coprime to φ(n) = ' + phi;
      return;
    }

    const d = ((x % phi) + phi) % phi;

    if (m >= n) {
      cResEl.textContent = 'MESSAGE m MUST BE LESS THAN n (' + m + ' ≥ ' + n + ')';
      kResEl.textContent = 'Split large messages into chunks smaller than n';
      return;
    }

    // Encrypt: c = m^e mod n
    const c = modExp(m, e, n);
    // Decrypt: m_dec = c^d mod n
    const m_dec = modExp(c, d, n);

    cResEl.textContent = 'Ciphertext c = ' + c + ' | Decrypted m = ' + m_dec + (m_dec === m ? ' ✓' : ' ✗');
    kResEl.textContent = 'Public Key: (e=' + e + ', n=' + n + ') | Private Key: (d=' + d + ', n=' + n + ') | Modulus n = ' + n + ', φ(n) = ' + phi;
  }

  [pEl, qEl, eEl, msgEl].forEach(el => el.addEventListener('input', update));
  update();
})();