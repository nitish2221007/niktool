(() => {
  'use strict';
  const muEl = document.getElementById('gr-mu'), i0El = document.getElementById('gr-i0'), xEl = document.getElementById('gr-x');
  const iResEl = document.getElementById('gr-res-i'), hvResEl = document.getElementById('gr-res-hvl');

  function update() {
    const mu_cm1 = parseFloat(muEl.value), I0 = parseFloat(i0El.value), x_cm = parseFloat(xEl.value);
    if (isNaN(mu_cm1) || isNaN(I0) || isNaN(x_cm) || mu_cm1 <= 0 || I0 <= 0 || x_cm < 0) return;

    // Half-Value Layer: HVL = ln(2) / mu  [cm]
    const HVL_cm = Math.LN2 / mu_cm1;

    // Tenth-Value Layer: TVL = ln(10) / mu  [cm]
    const TVL_cm = Math.LN10 / mu_cm1;

    // Transmitted intensity (narrow-beam Beer-Lambert Law): I = I0 * exp(-mu * x)
    const I_trans = I0 * Math.exp(-mu_cm1 * x_cm);
    const reduction_factor = I0 / I_trans;
    const blocked_pct = (1.0 - (I_trans / I0)) * 100.0;
    const num_hvls = x_cm / HVL_cm;

    iResEl.textContent = 'Transmitted I = ' + I_trans.toFixed(1) + ' mR/hr (' + blocked_pct.toFixed(1) + '% Blocked)';
    hvResEl.textContent = 'HVL = ' + HVL_cm.toFixed(3) + ' cm | TVL = ' + TVL_cm.toFixed(3) + ' cm (' + num_hvls.toFixed(2) + ' HVLs = ' + reduction_factor.toFixed(1) + '× Attenuation @ x=' + x_cm + ' cm)';
  }

  [muEl, i0El, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();