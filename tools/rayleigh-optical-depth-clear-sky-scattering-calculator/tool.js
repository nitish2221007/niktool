(() => {
  'use strict';
  const lEl = document.getElementById('ray-lam'), pEl = document.getElementById('ray-p'), amEl = document.getElementById('ray-am');
  const tResEl = document.getElementById('ray-res-tau'), trResEl = document.getElementById('ray-res-trans');

  function update() {
    const lambda_um = parseFloat(lEl.value), p_mbar = parseFloat(pEl.value), AM = parseFloat(amEl.value);
    if (isNaN(lambda_um) || isNaN(p_mbar) || isNaN(AM) || lambda_um <= 0 || p_mbar <= 0 || AM <= 0) return;

    // Hansen & Travis / Bodhaine formula for Rayleigh optical depth:
    // tau_R = 0.008569 * lambda^-4 * ( 1 + 0.0113 * lambda^-2 + 0.00013 * lambda^-4 ) * ( p / 1013.25 )
    const lam_sq = Math.pow(lambda_um, 2);
    const lam_4 = Math.pow(lambda_um, 4);
    const p_ratio = p_mbar / 1013.25;

    const tau_R = (0.008569 / lam_4) * (1.0 + (0.0113 / lam_sq) + (0.00013 / lam_4)) * p_ratio;

    // Beer-Lambert transmittance T = exp( - tau_R * AM )
    const Transmittance = Math.exp(-tau_R * AM);
    const TransPct = Transmittance * 100.0;
    const ScatterPct = 100.0 - TransPct;

    tResEl.textContent = 'τ_R = ' + tau_R.toFixed(4) + ' (@ ' + Math.round(lambda_um * 1000) + ' nm)';
    trResEl.textContent = 'Transmittance T = ' + TransPct.toFixed(1) + '% (Scattered: ' + ScatterPct.toFixed(1) + '% @ AM = ' + AM.toFixed(2) + ', p = ' + p_mbar + ' mbar)';
  }

  [lEl, pEl, amEl].forEach(el => el.addEventListener('input', update));
  update();
})();