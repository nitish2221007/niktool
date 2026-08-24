(() => {
  'use strict';
  const lEl = document.getElementById('ld-len'), r1El = document.getElementById('ld-r1');
  const r2El = document.getElementById('ld-r2'), aiEl = document.getElementById('ld-alphai');
  const ithResEl = document.getElementById('ld-res-ith'), lsResEl = document.getElementById('ld-res-loss');

  function update() {
    const L_um = parseFloat(lEl.value), R1 = parseFloat(r1El.value);
    const R2 = parseFloat(r2El.value), alpha_i = parseFloat(aiEl.value);

    if (isNaN(L_um) || isNaN(R1) || isNaN(R2) || isNaN(alpha_i) || L_um <= 0 || R1 <= 0 || R2 <= 0 || R1 >= 1.0 || R2 >= 1.0) return;

    const L_cm = L_um * 1e-4; // um to cm

    // Mirror loss alpha_m = ( 1 / (2 * L_cm) ) * ln( 1 / (R1 * R2) )  [cm^-1]
    const alpha_m = (1.0 / (2.0 * L_cm)) * Math.log(1.0 / (R1 * R2));

    // Total threshold modal gain g_th = alpha_i + alpha_m  [cm^-1]
    const g_th = alpha_i + alpha_m;

    // Threshold current empirical scaling: I_th approx = (L_cm * W_cm) * J_th
    // Typical single-mode ridge waveguide (W = 3 um = 3e-4 cm):
    const W_cm = 3e-4;
    const J_0 = 400.0; // A / cm^2 transparency current density
    const J_th = J_0 + (g_th * 15.0); // A / cm^2
    const I_th_A = J_th * (L_cm * W_cm);
    const I_th_mA = I_th_A * 1000.0;

    ithResEl.textContent = 'I_th = ' + I_th_mA.toFixed(1) + ' mA Threshold Current';
    lsResEl.textContent = 'Mirror Loss α_m = ' + alpha_m.toFixed(1) + ' cm⁻¹ | Total Cavity Loss α_tot = ' + g_th.toFixed(1) + ' cm⁻¹ (L = ' + L_um + ' μm)';
  }

  [lEl, r1El, r2El, aiEl].forEach(el => el.addEventListener('input', update));
  update();
})();