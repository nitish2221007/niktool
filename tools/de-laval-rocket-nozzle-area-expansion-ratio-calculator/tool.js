(() => {
  'use strict';
  const mEl = document.getElementById('dl-m'), gEl = document.getElementById('dl-gam');
  const epsResEl = document.getElementById('dl-res-eps'), prResEl = document.getElementById('dl-res-prat');

  function update() {
    const M = parseFloat(mEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(M) || isNaN(gamma) || M <= 1.0 || gamma <= 1.05 || gamma >= 1.67) return;

    const expTerm = (gamma + 1) / (2 * (gamma - 1));
    const bracket = (2 / (gamma + 1)) * (1 + (((gamma - 1) / 2) * Math.pow(M, 2)));
    const epsilon = (1 / M) * Math.pow(bracket, expTerm);
    const pr = Math.pow(1 + (((gamma - 1) / 2) * Math.pow(M, 2)), -gamma / (gamma - 1));

    epsResEl.textContent = 'ε = ' + epsilon.toFixed(1) + ' : 1 (A_e / A*)';
    prResEl.textContent = 'Exit Pressure p_e / p₀ = ' + (pr * 100).toFixed(3) + '% of Chamber Pressure (M_e = ' + M.toFixed(1) + ')';
  }

  mEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();