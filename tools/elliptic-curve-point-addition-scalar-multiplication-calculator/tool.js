(() => {
  'use strict';
  const aEl = document.getElementById('ec-a'), bEl = document.getElementById('ec-b'), pEl = document.getElementById('ec-p');
  const pxEl = document.getElementById('ec-px'), pyEl = document.getElementById('ec-py');
  const dbResEl = document.getElementById('ec-res-double'), cvResEl = document.getElementById('ec-res-curve');

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
    const a = parseInt(aEl.value, 10), b = parseInt(bEl.value, 10), p = parseInt(pEl.value, 10);
    const px = parseInt(pxEl.value, 10), py = parseInt(pyEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(p) || isNaN(px) || isNaN(py) || p <= 2) return;

    // Check non-singular discriminant: 4a^3 + 27b^2 != 0 mod p
    const disc = (4 * Math.pow(a, 3) + 27 * Math.pow(b, 2)) % p;
    if (disc === 0) {
      dbResEl.textContent = 'SINGULAR CURVE (4a³ + 27b² ≡ 0 mod p)';
      cvResEl.textContent = 'Singular curves are cryptographically broken';
      return;
    }

    // Verify P is on the curve: y^2 = x^3 + a*x + b mod p
    const lhs = (py * py) % p;
    const rhs = (Math.pow(px, 3) + a * px + b) % p;
    const rhs_pos = ((rhs % p) + p) % p;

    if (lhs !== rhs_pos) {
      dbResEl.textContent = 'POINT NOT ON CURVE';
      cvResEl.textContent = 'y₁² (' + lhs + ') ≠ x₁³ + ax₁ + b (' + rhs_pos + ') mod ' + p;
      return;
    }

    // Point Doubling 2P = P + P:
    // lambda = (3*px^2 + a) / (2*py) mod p
    const num = (3 * px * px + a) % p;
    const den = (2 * py) % p;
    const den_inv = modInverse(den, p);

    if (den_inv === null) {
      dbResEl.textContent = '2P = O (POINT AT INFINITY)';
      cvResEl.textContent = 'Tangent line is vertical (2y₁ = 0 mod p)';
      return;
    }

    const lambda = ((num * den_inv) % p + p) % p;

    // x3 = lambda^2 - 2*px mod p
    let x3 = (lambda * lambda - 2 * px) % p;
    x3 = ((x3 % p) + p) % p;

    // y3 = lambda*(px - x3) - py mod p
    let y3 = (lambda * (px - x3) - py) % p;
    y3 = ((y3 % p) + p) % p;

    dbResEl.textContent = '2P = (' + x3 + ', ' + y3 + ') on y² = x³ + ' + a + 'x + ' + b + ' mod ' + p;
    cvResEl.textContent = 'Slope λ = ' + lambda + ' | Point P(' + px + ',' + py + ') verified on curve ✓';
  }

  [aEl, bEl, pEl, pxEl, pyEl].forEach(el => el.addEventListener('input', update));
  update();
})();