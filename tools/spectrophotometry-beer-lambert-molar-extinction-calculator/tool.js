(() => {
  'use strict';
  const aEl = document.getElementById('beer-abs'), epsEl = document.getElementById('beer-eps'), bEl = document.getElementById('beer-b');
  const cResEl = document.getElementById('beer-res-conc'), trResEl = document.getElementById('beer-res-trans');

  function update() {
    const A = parseFloat(aEl.value), eps = parseFloat(epsEl.value), b = parseFloat(bEl.value);
    if (isNaN(A) || isNaN(eps) || isNaN(b) || A < 0 || eps <= 0 || b <= 0) return;

    // Concentration c = A / ( eps * b )  [mol / L]
    const c_M = A / (eps * b);
    const c_uM = c_M * 1e6;
    const c_mM = c_M * 1e3;

    // Transmittance %T = 10^(-A) * 100
    const Trans_pct = Math.pow(10, -A) * 100.0;

    let rangeStatus = '';
    let color = '#22543d';

    if (A >= 0.1 && A <= 1.5) {
      rangeStatus = 'OPTIMAL LINEAR BEER-LAMBERT RANGE (0.1 ≤ A ≤ 1.5: High detector photometric accuracy)';
      color = '#22543d';
    } else if (A > 1.5) {
      rangeStatus = 'NON-LINEAR REGIME (A > 1.5: Stray light saturation causes severe underestimation; dilute sample!)';
      color = '#c53030';
    } else {
      rangeStatus = 'LOW ABSORBANCE (A < 0.1: Near detector noise floor; increase concentration or path length)';
      color = '#d97706';
    }

    cResEl.textContent = 'c = ' + (c_uM < 1000 ? c_uM.toFixed(2) + ' μM' : c_mM.toFixed(3) + ' mM') + ' (' + c_M.toExponential(2) + ' M)';
    cResEl.style.color = color;
    trResEl.textContent = 'Transmittance %T = ' + Trans_pct.toFixed(1) + '% | ' + rangeStatus;
    trResEl.style.color = color;
  }

  [aEl, epsEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();