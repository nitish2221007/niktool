(() => {
  'use strict';
  const bEl = document.getElementById('esc-body');
  const vResEl = document.getElementById('esc-res-vesc'), gResEl = document.getElementById('esc-res-g');

  const G = 6.67430e-11;

  function update() {
    const parts = bEl.value.split('_');
    const M_kg = parseFloat(parts[0]);
    const R_km = parseFloat(parts[1]);

    if (isNaN(M_kg) || isNaN(R_km) || M_kg <= 0 || R_km <= 0) return;

    const R_m = R_km * 1000.0;

    // Escape velocity: v_esc = sqrt( 2 * G * M / R )  [m / s]
    const v_esc_mps = Math.sqrt((2.0 * G * M_kg) / R_m);
    const v_esc_kms = v_esc_mps / 1000.0;
    const v_esc_kmh = v_esc_kms * 3600.0;

    // Surface gravity: g = G * M / R^2  [m / s^2]
    const g_surf = (G * M_kg) / Math.pow(R_m, 2);
    const g_ratio = g_surf / 9.80665;

    // Specific kinetic energy to escape: E = 0.5 * v_esc^2  [J / kg -> MJ / kg]
    const E_spec_MJ = (0.5 * Math.pow(v_esc_mps, 2)) / 1e6;

    vResEl.textContent = 'Escape Velocity v_esc = ' + v_esc_kms.toFixed(2) + ' km / s (' + Math.round(v_esc_kmh).toLocaleString() + ' km/h)';
    gResEl.textContent = 'Surface Gravity g = ' + g_surf.toFixed(2) + ' m/s² (' + g_ratio.toFixed(2) + ' g) | Binding Energy = ' + E_spec_MJ.toFixed(1) + ' MJ/kg';
  }

  bEl.addEventListener('change', update);
  update();
})();