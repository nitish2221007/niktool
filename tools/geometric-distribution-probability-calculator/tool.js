(() => {
  'use strict';
  const pEl = document.getElementById('gm-p'), kEl = document.getElementById('gm-k');
  const exResEl = document.getElementById('gm-res-exact'), cmResEl = document.getElementById('gm-res-cumul'), mResEl = document.getElementById('gm-res-mean');

  function update() {
    const p = parseFloat(pEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(p) || isNaN(k) || p <= 0 || p > 1 || k < 1) return;

    // P(X = k) = (1 - p)^(k - 1) * p
    const pExact = Math.pow(1 - p, k - 1) * p;
    // P(X <= k) = 1 - (1 - p)^k
    const pCumul = 1 - Math.pow(1 - p, k);
    const expected = 1 / p;

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = (pCumul * 100).toFixed(1) + '% Cumulative P(X ≤ ' + k + ')';
    mResEl.textContent = 'E[X] = ' + expected.toFixed(1) + ' Trials Average';
  }

  pEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();