(() => {
  'use strict';
  const nEl = document.getElementById('mr-n'), aEl = document.getElementById('mr-a');
  const prResEl = document.getElementById('mr-res-prime'), dcResEl = document.getElementById('mr-res-decomp');

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
    const n = parseInt(nEl.value, 10);
    const a = parseInt(aEl.value, 10);

    if (isNaN(n) || isNaN(a) || n < 3 || n % 2 === 0 || a < 2 || a >= n) return;

    // Decompose n - 1 = 2^s * d with d odd
    let d = n - 1, s = 0;
    while (d % 2 === 0) {
      d = Math.floor(d / 2);
      s++;
    }

    // Compute x = a^d mod n
    let x = modExp(a, d, n);
    let isProbablePrime = false;

    if (x === 1 || x === n - 1) {
      isProbablePrime = true;
    } else {
      for (let r = 1; r < s; r++) {
        x = modExp(x, 2, n);
        if (x === n - 1) {
          isProbablePrime = true;
          break;
        }
      }
    }

    let status = '', color = '#22543d';
    if (isProbablePrime) {
      status = 'PROBABLY PRIME to Base a = ' + a;
      color = '#22543d';
    } else {
      status = 'DEFINITELY COMPOSITE (Base a = ' + a + ' is a witness)';
      color = '#c53030';
    }

    prResEl.textContent = status;
    prResEl.style.color = color;
    dcResEl.textContent = (n - 1) + ' = 2^' + s + ' · ' + d + ' | Initial a^d mod n = ' + modExp(a, d, n) + ' (Base a = ' + a + ')';
    dcResEl.style.color = color;
  }

  nEl.addEventListener('input', update);
  aEl.addEventListener('input', update);
  update();
})();