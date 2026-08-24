(() => {
  'use strict';
  const iEl = document.getElementById('kr-i'), n2El = document.getElementById('kr-n2');
  const lEl = document.getElementById('kr-l'), lmEl = document.getElementById('kr-lambda');
  const phResEl = document.getElementById('kr-res-phi'), dnResEl = document.getElementById('kr-res-dn');

  function update() {
    const I_GW_cm2 = parseFloat(iEl.value), n2_scaled = parseFloat(n2El.value);
    const L_m = parseFloat(lEl.value), lambda_nm = parseFloat(lmEl.value);

    if (isNaN(I_GW_cm2) || isNaN(n2_scaled) || isNaN(L_m) || isNaN(lambda_nm) || I_GW_cm2 <= 0 || n2_scaled <= 0 || L_m <= 0 || lambda_nm <= 0) return;

    // Intensity: 1 GW/cm^2 = 1e9 W/cm^2
    const I_W_cm2 = I_GW_cm2 * 1e9;
    const n2_cm2_W = n2_scaled * 1e-16;

    // Nonlinear index change: Delta_n = n2 * I
    const delta_n = n2_cm2_W * I_W_cm2;

    // SPM Phase shift (B-integral): Phi_NL = ( 2 * pi / lambda_m ) * Delta_n * L_m  [radians]
    const lambda_m = lambda_nm * 1e-9;
    const Phi_NL_rad = (2.0 * Math.PI / lambda_m) * delta_n * L_m;
    const pi_fractions = Phi_NL_rad / Math.PI;

    phResEl.textContent = 'Nonlinear Shift Φ_NL = ' + Phi_NL_rad.toFixed(2) + ' rad (' + pi_fractions.toFixed(2) + ' π rad)';
    dnResEl.textContent = 'Index Change Δn = ' + delta_n.toExponential(2) + ' | B-Integral = ' + Phi_NL_rad.toFixed(2) + ' (L=' + L_m + ' m @ I=' + I_GW_cm2 + ' GW/cm²)';
  }

  [iEl, n2El, lEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();