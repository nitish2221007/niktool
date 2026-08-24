(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), rmEl = document.getElementById('rc-rhom'), rsEl = document.getElementById('rc-rhos');
  const flResEl = document.getElementById('rc-res-fluid'), rgResEl = document.getElementById('rc-res-rigid');

  function update() {
    const R_M = parseFloat(rEl.value), rho_M = parseFloat(rmEl.value), rho_m = parseFloat(rsEl.value);
    if (isNaN(R_M) || isNaN(rho_M) || isNaN(rho_m) || R_M <= 0 || rho_M <= 0 || rho_m <= 0) return;

    // Rigid body Roche limit: d_rigid = R_M * ( 2 * rho_M / rho_m )^(1/3) approx 1.26 * R_M * (rho_M / rho_m)^(1/3)
    const d_rigid = R_M * Math.pow((2.0 * rho_M) / rho_m, 1.0 / 3.0);

    // Fluid body Roche limit: d_fluid = 2.44 * R_M * ( rho_M / rho_m )^(1/3)
    const d_fluid = 2.44 * R_M * Math.pow(rho_M / rho_m, 1.0 / 3.0);

    const ratio_fluid = d_fluid / R_M;
    const ratio_rigid = d_rigid / R_M;

    flResEl.textContent = 'Fluid Roche Limit d = ' + Math.round(d_fluid).toLocaleString() + ' km (' + ratio_fluid.toFixed(2) + ' R_planet)';
    rgResEl.textContent = 'Rigid Limit d = ' + Math.round(d_rigid).toLocaleString() + ' km (' + ratio_rigid.toFixed(2) + ' R_planet | Disruption occurs inside limit)';
  }

  [rEl, rmEl, rsEl].forEach(el => el.addEventListener('input', update));
  update();
})();