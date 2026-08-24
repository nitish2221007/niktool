(() => {
  'use strict';
  const diEl = document.getElementById('gg-di'), thEl = document.getElementById('gg-theta'), altEl = document.getElementById('gg-alt');
  const tgResEl = document.getElementById('gg-res-tgg'), stResEl = document.getElementById('gg-res-stab');

  const mu_earth = 398600.4418;
  const R_earth = 6378.137;

  function update() {
    const delta_I = parseFloat(diEl.value), theta_deg = parseFloat(thEl.value), h_km = parseFloat(altEl.value);
    if (isNaN(delta_I) || isNaN(theta_deg) || isNaN(h_km) || delta_I <= 0 || h_km < 0) return;

    const r_km = R_earth + h_km;
    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const omega0 = Math.sqrt(mu_earth / Math.pow(r_km, 3));
    const Period_min = (2.0 * Math.PI / omega0) / 60.0;
    const T_GG_Nm = 1.5 * Math.pow(omega0, 2) * delta_I * Math.sin(2.0 * theta_rad);
    const T_GG_uNm = T_GG_Nm * 1e6;

    tgResEl.textContent = 'Restoring Torque T_GG = ' + T_GG_uNm.toFixed(1) + ' μN · m (' + T_GG_Nm.toExponential(2) + ' N·m)';
    stResEl.textContent = 'Passive Nadir Lock Active (ω₀ = ' + (omega0*1000).toFixed(3) + ' mrad/s, Orbit Period T = ' + Period_min.toFixed(1) + ' min @ h=' + h_km + ' km)';
  }

  [diEl, thEl, altEl].forEach(el => el.addEventListener('input', update));
  update();
})();