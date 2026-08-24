(() => {
  'use strict';
  const gmEl = document.getElementById('ak-gamma'), acEl = document.getElementById('ak-act'), dsEl = document.getElementById('ak-dist');
  const kResEl = document.getElementById('ak-res-k'), hResEl = document.getElementById('ak-res-h');

  function update() {
    const Gamma_delta = parseFloat(gmEl.value), A_MBq = parseFloat(acEl.value), d_m = parseFloat(dsEl.value);
    if (isNaN(Gamma_delta) || isNaN(A_MBq) || isNaN(d_m) || Gamma_delta <= 0 || A_MBq <= 0 || d_m <= 0) return;

    // Air Kerma Rate: K_dot = Gamma_delta * A / d^2  [uGy / hr]
    const K_dot_uGy_hr = (Gamma_delta * A_MBq) / Math.pow(d_m, 2);

    // Ambient Dose Equivalent H*(10): H*(10) approx 1.20 * K_air for Cs-137 / Co-60 photons
    const H_star_uSv_hr = 1.20 * K_dot_uGy_hr;

    kResEl.textContent = 'Air Kerma Rate = ' + K_dot_uGy_hr.toFixed(1) + ' μGy / hr (' + (K_dot_uGy_hr/1000).toFixed(3) + ' mGy/hr)';
    hResEl.textContent = 'Dose Equivalent H*(10) = ' + H_star_uSv_hr.toFixed(1) + ' μSv / hr (' + (H_star_uSv_hr/1000).toFixed(3) + ' mSv/hr @ d=' + d_m + ' m, A=' + A_MBq + ' MBq)';
  }

  [gmEl, acEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();