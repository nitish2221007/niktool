(() => {
  'use strict';
  const hEl = document.getElementById('hyp-h'), vinfEl = document.getElementById('hyp-vinf');
  const dvResEl = document.getElementById('hyp-res-dv'), v0ResEl = document.getElementById('hyp-res-v0');

  const mu_earth = 398600.4418; // km^3 / s^2
  const R_E = 6378.137;         // Earth radius in km

  function update() {
    const hKm = parseFloat(hEl.value), v_inf = parseFloat(vinfEl.value);
    if (isNaN(hKm) || isNaN(v_inf) || hKm <= 100 || v_inf < 0) return;

    const r0 = R_E + hKm;

    // Circular parking orbit velocity v_circ = sqrt( mu / r0 )  [km / s]
    const v_circ = Math.sqrt(mu_earth / r0);

    // Escape velocity from parking orbit v_esc = sqrt( 2 * mu / r0 )
    const v_esc = Math.sqrt(2.0 * mu_earth / r0);

    // Hyperbolic departure injection velocity v_inj = sqrt( v_esc^2 + v_inf^2 )
    const v_inj = Math.sqrt(Math.pow(v_esc, 2) + Math.pow(v_inf, 2));

    // Required burn delta-V: Delta_v = v_inj - v_circ  [km / s]
    const Delta_v = v_inj - v_circ;

    // Characteristic launch energy C3 = v_inf^2  [km^2 / s^2]
    const C3 = Math.pow(v_inf, 2);

    dvResEl.textContent = 'Δv_inj = ' + Delta_v.toFixed(2) + ' km / s (' + Math.round(Delta_v * 1000).toLocaleString() + ' m/s Burn)';
    v0ResEl.textContent = 'v_inj = ' + v_inj.toFixed(2) + ' km/s (C₃ = ' + C3.toFixed(2) + ' km²/s² | Circular v_circ = ' + v_circ.toFixed(2) + ' km/s, v_esc = ' + v_esc.toFixed(2) + ' km/s)';
  }

  hEl.addEventListener('input', update);
  vinfEl.addEventListener('input', update);
  update();
})();