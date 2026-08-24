(() => {
  'use strict';
  const nEl = document.getElementById('phi-n');
  const vResEl = document.getElementById('phi-res-val'), fResEl = document.getElementById('phi-res-fact');

  function primeFactorize(n) {
    const factors = {};
    let d = 2, temp = n;
    while (d * d <= temp) {
      if (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp = Math.floor(temp / d);
      } else {
        d = d === 2 ? 3 : d + 2;
      }
    }
    if (temp > 1) factors[temp] = (factors[temp] || 0) + 1;
    return factors;
  }

  function update() {
    let n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 1) return;

    if (n === 1) {
      vResEl.textContent = 'φ(1) = 1';
      fResEl.textContent = 'Prime Factors: 1 (by convention)';
      return;
    }

    const factors = primeFactorize(n);
    const uniquePrimes = Object.keys(factors).map(Number);

    // Euler product: phi(n) = n * prod( 1 - 1/p )
    let phi = n;
    uniquePrimes.forEach(p => {
      phi = Math.floor((phi * (p - 1)) / p);
    });

    const factorStr = uniquePrimes.map(p => p + (factors[p] > 1 ? '^' + factors[p] : '')).join(' × ');

    vResEl.textContent = 'φ(' + n + ') = ' + phi;
    fResEl.textContent = 'Prime Factors: ' + factorStr + ' | Formula: ' + n + ' · ∏(1 - 1/p) = ' + phi + (uniquePrimes.length === 1 && factors[uniquePrimes[0]] === 1 ? ' (PRIME NUMBER: φ(p) = p - 1)' : '');
  }

  nEl.addEventListener('input', update);
  update();
})();