(() => {
  'use strict';
  const nEl = document.getElementById('bn-n'), pEl = document.getElementById('bn-p'), kEl = document.getElementById('bn-k');
  const exResEl = document.getElementById('bn-res-exact'), cmResEl = document.getElementById('bn-res-cumul');

  function logFact(n) {
    let ans = 0;
    for (let i = 2; i <= n; i++) ans += Math.log(i);
    return ans;
  }

  function nCr(n, r) {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    return Math.round(Math.exp(logFact(n) - logFact(r) - logFact(n - r)));
  }

  function binomP(n, k, p) {
    if (k < 0 || k > n) return 0;
    const coeff = nCr(n, k);
    return coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  function update() {
    const n = parseInt(nEl.value, 10), p = parseFloat(pEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(n) || isNaN(p) || isNaN(k) || n < 1 || p < 0 || p > 1 || k < 0 || k > n) return;

    const pExact = binomP(n, k, p);
    let pCumul = 0;
    for (let i = 0; i <= k; i++) pCumul += binomP(n, i, p);

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = 'P(X ≤ ' + k + ') = ' + (pCumul * 100).toFixed(2) + '% (E[X] = ' + (n * p).toFixed(1) + ')';
  }

  [nEl, pEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();