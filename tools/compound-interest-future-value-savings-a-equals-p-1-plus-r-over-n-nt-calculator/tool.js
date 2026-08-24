(() => {
  'use strict';
  const pEl = document.getElementById('ci-p'), rEl = document.getElementById('ci-r');
  const tEl = document.getElementById('ci-t'), nEl = document.getElementById('ci-n');
  const aResEl = document.getElementById('ci-res-a'), intResEl = document.getElementById('ci-res-int');

  function update() {
    const P = parseFloat(pEl.value), r_pct = parseFloat(rEl.value);
    const t = parseFloat(tEl.value), n = parseFloat(nEl.value);

    if (isNaN(P) || isNaN(r_pct) || isNaN(t) || isNaN(n) || P <= 0 || r_pct <= 0 || t <= 0) return;

    const r = r_pct / 100.0;

    // Formula: A = P * ( 1 + r/n )^(n * t)
    const A = P * Math.pow(1.0 + (r / n), n * t);
    const totalInterest = A - P;
    const gainPct = (totalInterest / P) * 100.0;

    aResEl.textContent = 'Future Balance A = $' + Math.round(A).toLocaleString();
    intResEl.textContent = 'Interest Earned = $' + Math.round(totalInterest).toLocaleString() + ' (+' + gainPct.toFixed(1) + '% Return @ ' + r_pct + '% for ' + t + ' yrs)';
  }

  [pEl, rEl, tEl, nEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();