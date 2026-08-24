(() => {
  'use strict';
  const aEl = document.getElementById('so-a'), mEl = document.getElementById('so-m');
  const soResEl = document.getElementById('so-res-soi'), hlResEl = document.getElementById('so-res-hill');

  const M_sun = 1.98847e30; // kg
  const AU_km = 149597870.7; // km

  function update() {
    const a_AU = parseFloat(aEl.value), m_scaled = parseFloat(mEl.value);
    if (isNaN(a_AU) || isNaN(m_scaled) || a_AU <= 0 || m_scaled <= 0) return;

    const a_km = a_AU * AU_km;
    const m_planet_kg = m_scaled * 1e24;

    // Mass ratio:
    const mu_ratio = m_planet_kg / M_sun;

    // Laplace SOI radius: r_SOI = a * (m / M)^(2/5)  [km]
    const r_SOI_km = a_km * Math.pow(mu_ratio, 0.40);

    // Hill sphere radius: r_H = a * ( m / (3*M) )^(1/3)  [km]
    const r_H_km = a_km * Math.pow(mu_ratio / 3.0, 1.0 / 3.0);

    soResEl.textContent = 'Laplace SOI = ' + Math.round(r_SOI_km).toLocaleString() + ' km (' + (r_SOI_km / 6378.137).toFixed(1) + ' Earth Radii)';
    hlResEl.textContent = 'Hill Sphere r_H = ' + Math.round(r_H_km).toLocaleString() + ' km (' + (r_H_km / 6378.137).toFixed(1) + ' R_E @ a=' + a_AU + ' AU)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();