(() => {
  'use strict';
  const tEl = document.getElementById('jn-temp'), nEl = document.getElementById('jn-dens');
  const msResEl = document.getElementById('jn-res-mass'), lnResEl = document.getElementById('jn-res-len');

  const k_B = 1.380649e-23, G = 6.67430e-11, m_H = 1.6735575e-27;
  const mu_mol = 2.3; // mean molecular weight for cold H2/He cloud
  const M_sun_kg = 1.98847e30;
  const pc_meters = 3.085677581e16;

  function update() {
    const T = parseFloat(tEl.value), n_cm3 = parseFloat(nEl.value);
    if (isNaN(T) || isNaN(n_cm3) || T <= 0 || n_cm3 <= 0) return;

    // Density rho = n * mu * m_H  [kg / m^3]
    const n_m3 = n_cm3 * 1e6;
    const rho = n_m3 * mu_mol * m_H;

    // Isothermal sound speed: c_s = sqrt( k_B * T / (mu * m_H) )  [m / s]
    const c_s = Math.sqrt((k_B * T) / (mu_mol * m_H));

    // Jeans Length: lambda_J = c_s * sqrt( pi / (G * rho) )  [meters]
    const lambda_J_m = c_s * Math.sqrt(Math.PI / (G * rho));
    const lambda_J_pc = lambda_J_m / pc_meters;
    const lambda_J_au = lambda_J_m / 1.495978707e11;

    // Jeans Mass: M_J = (4/3) * pi * rho * (lambda_J / 2)^3  [kg]
    const M_J_kg = (Math.PI / 6.0) * rho * Math.pow(lambda_J_m, 3);
    const M_J_sun = M_J_kg / M_sun_kg;

    msResEl.textContent = 'Jeans Mass M_J = ' + M_J_sun.toFixed(2) + ' M_sun';
    lnResEl.textContent = 'Jeans Length λ_J = ' + lambda_J_pc.toFixed(3) + ' pc (' + Math.round(lambda_J_au).toLocaleString() + ' AU | c_s = ' + (c_s/1000).toFixed(2) + ' km/s @ ' + T + ' K)';
  }

  tEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();