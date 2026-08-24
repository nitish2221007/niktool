(() => {
  'use strict';
  const zEl = document.getElementById('as-z'), hEl = document.getElementById('as-h');
  const rh0El = document.getElementById('as-rho0'), p0El = document.getElementById('as-p0');
  const rhResEl = document.getElementById('as-res-rho'), pResEl = document.getElementById('as-res-p');

  function update() {
    const z_km = parseFloat(zEl.value), H_km = parseFloat(hEl.value);
    const rho0 = parseFloat(rh0El.value), p0_kPa = parseFloat(p0El.value);

    if (isNaN(z_km) || isNaN(H_km) || isNaN(rho0) || isNaN(p0_kPa) || z_km < 0 || H_km <= 0 || rho0 <= 0 || p0_kPa <= 0) return;

    const exponent = - z_km / H_km;
    const factor = Math.exp(exponent);
    const rho_z = rho0 * factor;
    const p_z_kPa = p0_kPa * factor;
    const p_z_mbar = p_z_kPa * 10.0;
    const pct_surface = factor * 100.0;

    rhResEl.textContent = 'Air Density ρ = ' + rho_z.toFixed(3) + ' kg / m³ (' + pct_surface.toFixed(1) + '% Sea Level)';
    pResEl.textContent = 'Pressure p = ' + p_z_kPa.toFixed(2) + ' kPa (' + Math.round(p_z_mbar) + ' mbar) | z = ' + z_km + ' km (' + (z_km/H_km).toFixed(2) + ' e-folds @ H=' + H_km + ' km)';
  }

  [zEl, hEl, rh0El, p0El].forEach(el => el.addEventListener('input', update));
  update();
})();