(() => {
  'use strict';
  const rEl = document.getElementById('hp-r'), lEl = document.getElementById('hp-l');
  const dpEl = document.getElementById('hp-dp'), muEl = document.getElementById('hp-mu');
  const qResEl = document.getElementById('hp-res-q'), shResEl = document.getElementById('hp-res-shear');

  function update() {
    const R_mm = parseFloat(rEl.value), L_mm = parseFloat(lEl.value);
    const dP_kPa = parseFloat(dpEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(R_mm) || isNaN(L_mm) || isNaN(dP_kPa) || isNaN(mu_cP) || R_mm <= 0 || L_mm <= 0 || dP_kPa <= 0 || mu_cP <= 0) return;

    const R_m = R_mm * 1e-3;
    const L_m = L_mm * 1e-3;
    const dP_Pa = dP_kPa * 1000.0;
    const mu_Pa_s = mu_cP * 1e-3;

    // Hagen-Poiseuille: Q = ( pi * R^4 * dP ) / ( 8 * mu * L )  [m^3 / s]
    const Q_m3_s = (Math.PI * Math.pow(R_m, 4) * dP_Pa) / (8.0 * mu_Pa_s * L_m);
    const Q_mL_min = Q_m3_s * 1e6 * 60.0;

    // Mean velocity v = Q / (pi * R^2)
    const v_mean = Q_m3_s / (Math.PI * Math.pow(R_m, 2));

    // Wall shear stress: tau_w = ( R * dP ) / ( 2 * L )  [Pa]
    const tau_w = (R_m * dP_Pa) / (2.0 * L_m);

    qResEl.textContent = 'Flow Rate Q = ' + Q_mL_min.toFixed(2) + ' mL / min';
    shResEl.textContent = 'Wall Shear τ_w = ' + tau_w.toFixed(1) + ' Pa | Mean Velocity v = ' + v_mean.toFixed(3) + ' m/s (R=' + R_mm + ' mm @ ' + mu_cP + ' cP)';
  }

  [rEl, lEl, dpEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();