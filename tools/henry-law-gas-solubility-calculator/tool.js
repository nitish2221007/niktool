(() => {
  'use strict';
  const gEl = document.getElementById('hen-gas'), pEl = document.getElementById('hen-p');
  const cEl = document.getElementById('hen-res-conc'), mEl = document.getElementById('hen-res-mass');

  const MW = { '0.034': 44.01, '0.0013': 32.00, '0.00061': 28.01, '0.00078': 2.02 };

  function update() {
    const kH = parseFloat(gEl.value), P = parseFloat(pEl.value);
    if (isNaN(kH) || isNaN(P) || kH <= 0 || P <= 0) return;

    // C = kH * P (mol / L)
    const concMol = kH * P;
    const mw = MW[gEl.value] || 44.01;
    const concGpl = concMol * mw;

    cEl.textContent = concMol >= 0.001 ? concMol.toFixed(3) + ' mol / L' : concMol.toExponential(2) + ' mol / L';
    mEl.textContent = concGpl >= 1.0 ? concGpl.toFixed(2) + ' g / L' : (concGpl * 1000).toFixed(1) + ' mg / L';
  }

  gEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();