(() => {
  'use strict';
  const viEl = document.getElementById('c3-vinf'), altEl = document.getElementById('c3-alt');
  const c3ResEl = document.getElementById('c3-res-c3'), tmResEl = document.getElementById('c3-res-tmi');

  const mu_E = 398600.4418; // km^3 / s^2
  const R_E = 6378.137; // km

  function update() {
    const v_inf = parseFloat(viEl.value), h_km = parseFloat(altEl.value);
    if (isNaN(v_inf) || isNaN(h_km) || v_inf < 0 || h_km < 0) return;

    // Characteristic energy C3: C3 = v_inf^2  [km^2 / s^2]
    const C3 = Math.pow(v_inf, 2);

    const r_park = R_E + h_km;

    // Circular parking velocity: v_park = sqrt( mu / r )
    const v_park = Math.sqrt(mu_E / r_park);

    // Escape velocity from parking orbit: v_esc = sqrt( 2 * mu / r )
    const v_esc = Math.sqrt(2.0 * mu_E / r_park);

    // Hyperbolic injection velocity at periapsis: v_inj = sqrt( v_esc^2 + v_inf^2 ) = sqrt( 2*mu/r + C3 )
    const v_inj = Math.sqrt(Math.pow(v_esc, 2) + C3);

    // Injection delta-v: Delta_v_inj = v_inj - v_park
    const delta_v_inj = v_inj - v_park;

    c3ResEl.textContent = 'Launch Energy C3 = ' + C3.toFixed(2) + ' km² / s²';
    tmResEl.textContent = 'Injection Burn Δv = ' + delta_v_inj.toFixed(3) + ' km/s (v_inj = ' + v_inj.toFixed(3) + ' km/s vs v_park = ' + v_park.toFixed(3) + ' km/s @ ' + h_km + ' km LEO)';
  }

  viEl.addEventListener('input', update);
  altEl.addEventListener('input', update);
  update();
})();