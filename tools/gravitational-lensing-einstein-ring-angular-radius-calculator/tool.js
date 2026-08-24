(() => {
  'use strict';
  const mEl = document.getElementById('gl-mass'), dlEl = document.getElementById('gl-dl'), dsEl = document.getElementById('gl-ds');
  const thResEl = document.getElementById('gl-res-theta'), phResEl = document.getElementById('gl-res-phys');

  const G = 6.67430e-11, c = 299792458, M_sun_kg = 1.98847e30;
  const Mpc_to_m = 3.085677581e22;

  function update() {
    const M_sun = parseFloat(mEl.value), D_L_Mpc = parseFloat(dlEl.value), D_S_Mpc = parseFloat(dsEl.value);
    if (isNaN(M_sun) || isNaN(D_L_Mpc) || isNaN(D_S_Mpc) || M_sun <= 0 || D_L_Mpc <= 0 || D_S_Mpc <= D_L_Mpc) return;

    const D_LS_Mpc = D_S_Mpc - D_L_Mpc;

    const M_kg = M_sun * M_sun_kg;
    const D_L_m = D_L_Mpc * Mpc_to_m;
    const D_S_m = D_S_Mpc * Mpc_to_m;
    const D_LS_m = D_LS_Mpc * Mpc_to_m;

    // Einstein angle: theta_E = sqrt( (4 * G * M / c^2) * (D_LS / (D_L * D_S)) )  [radians]
    const theta_E_rad = Math.sqrt(((4.0 * G * M_kg) / Math.pow(c, 2)) * (D_LS_m / (D_L_m * D_S_m)));
    const theta_E_arcsec = theta_E_rad * (180.0 / Math.PI) * 3600.0;

    // Physical radius at lens plane: R_E = theta_E * D_L  [kpc]
    const R_E_kpc = (theta_E_rad * D_L_m) / (3.085677581e19);
    const R_E_ly = R_E_kpc * 3261.56;

    thResEl.textContent = 'Einstein Radius θ_E = ' + theta_E_arcsec.toFixed(2) + ' Arcseconds';
    phResEl.textContent = 'Physical Radius R_E = ' + R_E_kpc.toFixed(2) + ' kpc (' + Math.round(R_E_ly).toLocaleString() + ' Light-Years | Mass: ' + M_sun.toExponential(1) + ' M_sun)';
  }

  [mEl, dlEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();