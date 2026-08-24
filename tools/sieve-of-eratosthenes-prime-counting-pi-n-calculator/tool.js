(() => {
  'use strict';
  const nEl = document.getElementById('sv-n');
  const piResEl = document.getElementById('sv-res-pi'), pntResEl = document.getElementById('sv-res-pnt');

  function sieve(n) {
    const isPrime = new Uint8Array(n + 1);
    isPrime.fill(1);
    isPrime[0] = 0;
    isPrime[1] = 0;
    for (let p = 2; p * p <= n; p++) {
      if (isPrime[p]) {
        for (let i = p * p; i <= n; i += p) isPrime[i] = 0;
      }
    }
    let count = 0, lastPrime = 2;
    for (let i = 2; i <= n; i++) {
      if (isPrime[i]) {
        count++;
        lastPrime = i;
      }
    }
    return { count, lastPrime };
  }

  function update() {
    const n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 2 || n > 200000) return;

    const { count, lastPrime } = sieve(n);
    const density = (count / n) * 100.0;

    // Prime number theorem estimate: n / ln(n)
    const pnt = n / Math.log(n);

    piResEl.textContent = 'π(' + n + ') = ' + count + ' Primes (' + density.toFixed(1) + '% Density)';
    pntResEl.textContent = 'PNT n / ln(n) = ' + pnt.toFixed(1) + ' | Largest Prime ≤ ' + n + ' is ' + lastPrime;
  }

  nEl.addEventListener('input', update);
  update();
})();