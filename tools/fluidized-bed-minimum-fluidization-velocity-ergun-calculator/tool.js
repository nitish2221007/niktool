(() => {
  'use strict';
  const dpEl = document.getElementById('fb-dp'), rhosEl = document.getElementById('fb-rhos');
  const rhofEl = document.getElementById('fb-rhof'), epsEl = document.getElementById('fb-eps');
  const umfResEl = document.getElementById('fb-res-umf'), arResEl = document.getElementById('fb-res-arch');

  const g = 9.80665;
  const mu_air = 1.8e-5; // Pa * s

  function update() {
    const d_p_mm = parseFloat(dpEl.value), rho_s = parseFloat(rhosEl.value);
    const rho_g = parseFloat(rhofEl.value), eps = parseFloat(epsEl.value);

    if (isNaN(d_p_mm) || isNaN(rho_s) || isNaN(rho_g) || isNaN(eps) || d_p_mm <= 0 || rho_s <= rho_g || rho_g <= 0 || eps <= 0 || eps >= 1) return;

    const d_p = d_p_mm / 1000.0;
    const deltaRho = rho_s - rho_g;

    // Archimedes number Ar = ( d_p^3 * rho_g * deltaRho * g ) / mu^2
    const Ar = (Math.pow(d_p, 3) * rho_g * deltaRho * g) / Math.pow(mu_air, 2);

    // Wen and Yu simplified correlation for Re_mf:
    // Re_mf = sqrt( 27.2^2 + 0.0408 * Ar ) - 27.2
    const Re_mf = Math.sqrt(Math.pow(27.2, 2) + (0.0408 * Ar)) - 27.2;

    // u_mf = ( Re_mf * mu ) / ( d_p * rho_g )
    const u_mf = (Re_mf * mu_air) / (d_p * rho_g);

    let geldart = '';
    if (d_p_mm < 0.03) geldart = 'Geldart Group C (Cohesive fine powders)';
    else if (d_p_mm < 0.10 && rho_s < 1400) geldart = 'Geldart Group A (Aeratable easily fluidized)';
    else if (d_p_mm < 0.80) geldart = 'Geldart Group B (Sand-like bubbling fluidization)';
    else geldart = 'Geldart Group D (Coarse spoutable particles)';

    umfResEl.textContent = 'u_mf = ' + u_mf.toFixed(3) + ' m / s (' + (u_mf * 100).toFixed(1) + ' cm/s)';
    arResEl.textContent = 'Archimedes Ar = ' + Math.round(Ar).toLocaleString() + ' | ' + geldart + ' (d_p = ' + d_p_mm + ' mm, ρ_s = ' + rho_s + ' kg/m³)';
  }

  [dpEl, rhosEl, rhofEl, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();