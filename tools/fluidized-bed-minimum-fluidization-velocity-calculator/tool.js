(() => {
  'use strict';
  const dpEl = document.getElementById('fb-dp'), rhosEl = document.getElementById('fb-rhos');
  const rhogEl = document.getElementById('fb-rhog'), muEl = document.getElementById('fb-mu');
  const umfResEl = document.getElementById('fb-res-umf'), arResEl = document.getElementById('fb-res-arch');

  const g = 9.80665; // m/s^2

  function update() {
    const dp_mm = parseFloat(dpEl.value), rho_s = parseFloat(rhosEl.value);
    const rho_g = parseFloat(rhogEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(dp_mm) || isNaN(rho_s) || isNaN(rho_g) || isNaN(mu_cP) || dp_mm <= 0 || rho_s <= rho_g || rho_g <= 0 || mu_cP <= 0) return;

    const dp_m = dp_mm * 1e-3;
    const mu_Pa_s = mu_cP * 1e-3;

    // Archimedes number: Ar = ( d_p^3 * rho_g * (rho_s - rho_g) * g ) / mu^2
    const Ar = (Math.pow(dp_m, 3) * rho_g * (rho_s - rho_g) * g) / Math.pow(mu_Pa_s, 2);

    // Wen & Yu simplified correlation for small particles (Re_mf < 20):
    // Re_mf = sqrt( 27.2^2 + 0.0408 * Ar ) - 27.2
    const Re_mf = Math.sqrt(Math.pow(27.2, 2) + (0.0408 * Ar)) - 27.2;

    // u_mf = ( Re_mf * mu ) / ( rho_g * dp )  [m / s]
    const u_mf = (Re_mf * mu_Pa_s) / (rho_g * dp_m);
    const u_mf_cm_s = u_mf * 100.0;

    let geldart = '';
    if (dp_mm < 0.03) geldart = 'Geldart Group C (Cohesive fine powders)';
    else if (dp_mm <= 0.15) geldart = 'Geldart Group A (Aeratable FCC cracking catalyst)';
    else if (dp_mm <= 1.0) geldart = 'Geldart Group B (Bubbling sand size)';
    else geldart = 'Geldart Group D (Spouting large particles)';

    umfResEl.textContent = 'u_mf = ' + u_mf.toFixed(4) + ' m/s (' + u_mf_cm_s.toFixed(2) + ' cm/s)';
    arResEl.textContent = 'Archimedes Ar = ' + Ar.toFixed(1) + ' | Re_mf = ' + Re_mf.toFixed(3) + ' (' + geldart + ')';
  }

  [dpEl, rhosEl, rhogEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();