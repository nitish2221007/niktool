(() => {
  'use strict';
  const nEl = document.getElementById('qnt-n'), pEl = document.getElementById('qnt-p'), qEl = document.getElementById('qnt-q');
  const mResEl = document.getElementById('qnt-res-m'), fResEl = document.getElementById('qnt-res-fail');

  function update() {
    const n = parseInt(nEl.value, 10), p = parseFloat(pEl.value), qMv = parseFloat(qEl.value);
    if (isNaN(n) || isNaN(p) || isNaN(qMv) || n <= 0 || p <= 0 || p >= 1.0 || qMv <= 0) return;

    // Mean quantal content m = n * p
    const m = n * p;
    // Mean evoked EPSP amplitude E = m * q
    const meanEpspMv = m * qMv;

    // Failure probability P(0) = (1 - p)^n
    const pZero = Math.pow(1.0 - p, n);
    const pZeroPct = pZero * 100;

    // Binomial variance sigma^2 = n * p * (1 - p)
    const variance = n * p * (1.0 - p);
    const stdDev = Math.sqrt(variance);
    const CV = stdDev / m; // coefficient of variation

    mResEl.textContent = 'm = ' + m.toFixed(2) + ' Vesicles (' + meanEpspMv.toFixed(2) + ' mV EPSP)';
    fResEl.textContent = 'Failure Rate P₀ = ' + pZeroPct.toFixed(2) + '% | Variance σ² = ' + variance.toFixed(2) + ' (CV = ' + CV.toFixed(3) + ', n = ' + n + ', p = ' + p.toFixed(2) + ')';
  }

  [nEl, pEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();