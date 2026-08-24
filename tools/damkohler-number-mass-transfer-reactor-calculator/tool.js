(() => {
  'use strict';
  const kEl = document.getElementById('dam-k'), tauEl = document.getElementById('dam-tau');
  const daResEl = document.getElementById('dam-res-da'), cnResEl = document.getElementById('dam-res-conv');

  function update() {
    const k = parseFloat(kEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(k) || isNaN(tau) || k <= 0 || tau <= 0) return;

    // First Damkohler number for 1st order: Da = k * tau
    const Da = k * tau;
    // PFR Conversion X_pfr = 1 - exp(-Da)
    const X_pfr = (1 - Math.exp(-Da)) * 100;
    // CSTR Conversion X_cstr = Da / (1 + Da)
    const X_cstr = (Da / (1 + Da)) * 100;

    daResEl.textContent = 'Da_I = ' + Da.toFixed(2);

    if (Da > 10.0) {
      cnResEl.textContent = 'Diffusion/Flow Controlled (Da > 10: Near 100% Conversion)';
      cnResEl.style.color = '#22543d';
    } else if (Da >= 1.0) {
      cnResEl.textContent = X_pfr.toFixed(1) + '% PFR Conversion (' + X_cstr.toFixed(1) + '% CSTR Conversion)';
      cnResEl.style.color = '#22543d';
    } else {
      cnResEl.textContent = 'Kinetically Controlled (Da < 1: Low Conversion ' + X_pfr.toFixed(1) + '%)';
      cnResEl.style.color = '#d97706';
    }
  }

  kEl.addEventListener('input', update);
  tauEl.addEventListener('input', update);
  update();
})();