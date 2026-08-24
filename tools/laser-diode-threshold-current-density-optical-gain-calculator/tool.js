(() => {
  'use strict';
  const lEl = document.getElementById('ld-l'), wEl = document.getElementById('ld-w');
  const aiEl = document.getElementById('ld-alphai'), rEl = document.getElementById('ld-r');
  const itResEl = document.getElementById('ld-res-ith'), amResEl = document.getElementById('ld-res-am');

  function update() {
    const L_um = parseFloat(lEl.value), w_um = parseFloat(wEl.value);
    const alpha_i = parseFloat(aiEl.value), R = parseFloat(rEl.value);

    if (isNaN(L_um) || isNaN(w_um) || isNaN(alpha_i) || isNaN(R) || L_um <= 0 || w_um <= 0 || alpha_i < 0 || R <= 0 || R >= 1) return;

    const L_cm = L_um * 1e-4;
    const w_cm = w_um * 1e-4;

    // Optical cavity mirror loss: alpha_m = (1 / (2 * L_cm)) * ln( 1 / R^2 ) = (1 / L_cm) * ln( 1 / R )  [cm^-1]
    const alpha_m = (1.0 / L_cm) * Math.log(1.0 / R);

    // Total threshold modal optical gain required: g_th = alpha_i + alpha_m
    const g_th = alpha_i + alpha_m;

    // Empirical threshold current density for quantum well laser: J_th approx g_th / 0.0405 A/cm^2
    const J_th = (g_th / 32.8) * 808.0; // scaled benchmark

    // Active junction area: Area = L * w  [cm^2]
    const Area_cm2 = L_cm * w_cm;

    // Threshold current: I_th = J_th * Area  [A -> mA]
    const I_th_A = J_th * Area_cm2;
    const I_th_mA = I_th_A * 1000.0;

    itResEl.textContent = 'Threshold Current I_th = ' + I_th_mA.toFixed(1) + ' mA';
    amResEl.textContent = 'Mirror Loss α_m = ' + alpha_m.toFixed(1) + ' cm⁻¹ | Total g_th = ' + g_th.toFixed(1) + ' cm⁻¹ | J_th = ' + Math.round(J_th) + ' A/cm² (L=' + L_um + ' μm, R=' + R + ')';
  }

  [lEl, wEl, aiEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();