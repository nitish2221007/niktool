(() => {
  'use strict';
  const lamEl = document.getElementById('ps-lam'), kEl = document.getElementById('ps-k');
  const exResEl = document.getElementById('ps-res-exact'), cmResEl = document.getElementById('ps-res-cumul');

  function fact(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function poissonP(lambda, k) {
    if (k < 0) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k);
  }

  function update() {
    const lam = parseFloat(lamEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(lam) || isNaN(k) || lam <= 0 || k < 0 || k > 100) return;

    const pExact = poissonP(lam, k);
    let pCumul = 0;
    for (let i = 0; i <= k; i++) pCumul += poissonP(lam, i);

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = 'P(X ≤ ' + k + ') = ' + (pCumul * 100).toFixed(2) + '% (Variance σ² = ' + lam.toFixed(1) + ')';
  }

  lamEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();