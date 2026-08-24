(() => {
  'use strict';
  const v0El = document.getElementById('cstr-v0'), xEl = document.getElementById('cstr-x'), kEl = document.getElementById('cstr-k');
  const vResEl = document.getElementById('cstr-res-vol'), ratResEl = document.getElementById('cstr-res-ratio');

  function update() {
    const v0 = parseFloat(v0El.value), xPct = parseFloat(xEl.value), k = parseFloat(kEl.value);
    if (isNaN(v0) || isNaN(xPct) || isNaN(k) || v0 <= 0 || xPct <= 0 || xPct >= 100 || k <= 0) return;

    const X = xPct / 100;
    // For 1st order CSTR: tau = X / (k * (1 - X))  [min]
    const tauCstr = X / (k * (1 - X));
    const vCstr = v0 * tauCstr;

    // Equivalent PFR: tau = -ln(1 - X) / k
    const tauPfr = -Math.log(1 - X) / k;
    const vPfr = v0 * tauPfr;
    const ratio = vCstr / vPfr;

    vResEl.textContent = Math.round(vCstr).toLocaleString() + ' Liters (' + (vCstr / 1000).toFixed(2) + ' m³, τ = ' + tauCstr.toFixed(1) + ' min)';
    ratResEl.textContent = ratio.toFixed(2) + 'x Larger than PFR (' + Math.round(vPfr).toLocaleString() + ' L PFR)';
  }

  [v0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();