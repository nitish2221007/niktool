(() => {
  'use strict';
  const qEl = document.getElementById('gp-q'), uEl = document.getElementById('gp-u');
  const hEl = document.getElementById('gp-h'), xEl = document.getElementById('gp-x');
  const cResEl = document.getElementById('gp-res-c'), sgResEl = document.getElementById('gp-res-sig');

  function update() {
    const Q = parseFloat(qEl.value), u = parseFloat(uEl.value);
    const H = parseFloat(hEl.value), x_km = parseFloat(xEl.value);

    if (isNaN(Q) || isNaN(u) || isNaN(H) || isNaN(x_km) || Q <= 0 || u <= 0 || H < 0 || x_km <= 0) return;

    // Pasquill-Gifford dispersion parameters (Class C Neutral/Slightly Unstable approximation):
    // sigma_y approx 104 * x^0.89 [m], sigma_z approx 61 * x^0.91 [m]
    const sigma_y = 104.0 * Math.pow(x_km, 0.89);
    const sigma_z = 61.0 * Math.pow(x_km, 0.91);

    // Gaussian Plume Ground-Level Centerline Concentration (y = 0, z = 0 with ground reflection factor of 2):
    // C(x, 0, 0) = ( Q / (pi * u * sigma_y * sigma_z) ) * exp( - H^2 / (2 * sigma_z^2) )  [g/m^3 -> ug/m^3]
    const exp_term = Math.exp(-Math.pow(H, 2) / (2.0 * Math.pow(sigma_z, 2)));
    const C_g_m3 = (Q / (Math.PI * u * sigma_y * sigma_z)) * exp_term;
    const C_ug_m3 = C_g_m3 * 1e6;

    cResEl.textContent = 'Ground Conc C = ' + C_ug_m3.toFixed(1) + ' μg / m³ (' + (C_ug_m3/1000).toFixed(3) + ' mg/m³)';
    sgResEl.textContent = 'Dispersion: σ_y = ' + sigma_y.toFixed(1) + ' m, σ_z = ' + sigma_z.toFixed(1) + ' m (H=' + H + ' m @ x=' + x_km + ' km downwind, u=' + u + ' m/s)';
  }

  [qEl, uEl, hEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();