(() => {
  'use strict';
  const aEl = document.getElementById('mi-a'), mEl = document.getElementById('mi-m');
  const invResEl = document.getElementById('mi-res-inv'), bzResEl = document.getElementById('mi-res-bezout');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const res = extGCD(b, a % b);
    return {
      gcd: res.gcd,
      x: res.y,
      y: res.x - Math.floor(a / b) * res.y
    };
  }

  function update() {
    let a = parseInt(aEl.value, 10), m = parseInt(mEl.value, 10);
    if (isNaN(a) || isNaN(m) || m <= 1) return;

    // Bring a into [0, m-1]
    let a_mod = ((a % m) + m) % m;
    if (a_mod === 0) {
      invResEl.textContent = 'NO MODULAR INVERSE (a is a multiple of m: gcd = ' + m + ')';
      bzResEl.textContent = 'Inverse exists if and only if gcd(a, m) = 1';
      return;
    }

    const { gcd, x, y } = extGCD(a_mod, m);

    if (gcd !== 1) {
      invResEl.textContent = 'NO MODULAR INVERSE (gcd(' + a + ', ' + m + ') = ' + gcd + ' ≠ 1)';
      bzResEl.textContent = 'a and m must be coprime (relatively prime) to possess a modular inverse';
      return;
    }

    let inv = ((x % m) + m) % m;

    invResEl.textContent = 'Inverse a⁻¹ mod m = ' + inv;
    bzResEl.textContent = 'gcd(' + a + ', ' + m + ') = 1 | Bézout: ' + a + '·(' + x + ') + ' + m + '·(' + y + ') = 1 (' + a + ' · ' + inv + ' mod ' + m + ' = 1)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();