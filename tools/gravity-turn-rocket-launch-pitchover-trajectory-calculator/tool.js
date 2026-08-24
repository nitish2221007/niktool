(() => {
  'use strict';
  const vEl = document.getElementById('gt-v'), gEl = document.getElementById('gt-gamma'), aEl = document.getElementById('gt-alt');
  const gdResEl = document.getElementById('gt-res-gdot'), grResEl = document.getElementById('gt-res-grav');

  const g0 = 9.80665;
  const R_E = 6378.137; // km

  function update() {
    const v = parseFloat(vEl.value), gammaDeg = parseFloat(gEl.value), hKm = parseFloat(aEl.value);
    if (isNaN(v) || isNaN(gammaDeg) || isNaN(hKm) || v <= 0 || gammaDeg <= 0 || gammaDeg > 90 || hKm < 0) return;

    const r_km = R_E + hKm;
    const r_m = r_km * 1000.0;

    // Altitude-dependent local gravity g = g0 * (R_E / r)^2
    const g_local = g0 * Math.pow(R_E / r_km, 2);

    const gammaRad = (gammaDeg * Math.PI) / 180;

    // Gravity turn flight path rate: gamma_dot = - (g_local / v) * cos(gamma) + (v / r_m) * cos(gamma)  [rad / s]
    const gamma_dot_rad = (-(g_local / v) + (v / r_m)) * Math.cos(gammaRad);
    const gamma_dot_deg = (gamma_dot_rad * 180.0) / Math.PI;

    // Instantaneous gravity drag loss a_grav = g_local * sin(gamma)  [m / s^2]
    const a_grav = g_local * Math.sin(gammaRad);

    gdResEl.textContent = 'γ̇ = ' + gamma_dot_deg.toFixed(3) + ' ° / second (Pitching Down)';
    grResEl.textContent = 'Gravity Drag: ' + a_grav.toFixed(2) + ' m/s² (g_local = ' + g_local.toFixed(2) + ' m/s² @ h = ' + hKm + ' km, v = ' + v + ' m/s)';
  }

  [vEl, gEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();