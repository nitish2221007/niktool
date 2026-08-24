(() => {
  'use strict';
  const v0El = document.getElementById('pfr-v0'), xEl = document.getElementById('pfr-x'), kEl = document.getElementById('pfr-k');
  const vResEl = document.getElementById('pfr-res-vol'), tauResEl = document.getElementById('pfr-res-tau');

  function update() {
    const v0 = parseFloat(v0El.value), xPct = parseFloat(xEl.value), k = parseFloat(kEl.value);
    if (isNaN(v0) || isNaN(xPct) || isNaN(k) || v0 <= 0 || xPct <= 0 || xPct >= 100 || k <= 0) return;

    const X = xPct / 100;
    // For 1st order PFR: tau = -ln(1 - X) / k  [min]
    const tau = -Math.log(1 - X) / k;
    // Volume V = v0 * tau  [Liters]
    const V_liters = v0 * tau;
    const V_m3 = V_liters / 1000;

    vResEl.textContent = V_liters.toFixed(1) + ' Liters (' + V_m3.toFixed(3) + ' m³)';
    tauResEl.textContent = 'τ = ' + tau.toFixed(2) + ' Minutes (' + Math.round(tau * 60) + ' seconds Residence Time)';
  }

  [v0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();