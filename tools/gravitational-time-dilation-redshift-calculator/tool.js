(() => {
  'use strict';
  const mEl = document.getElementById('td-mass'), rEl = document.getElementById('td-r');
  const gmResEl = document.getElementById('td-res-gamma'), zResEl = document.getElementById('td-res-z');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const M_solar = parseFloat(mEl.value), r_km = parseFloat(rEl.value);
    if (isNaN(M_solar) || isNaN(r_km) || M_solar <= 0 || r_km <= 0) return;

    const M_kg = M_solar * M_sun_kg;
    const r_m = r_km * 1000.0;

    // Schwarzschild radius r_s = 2GM / c^2  [meters]
    const r_s_m = (2.0 * G * M_kg) / Math.pow(c, 2);

    if (r_m <= r_s_m) {
      gmResEl.textContent = 'TIME FREEZES (Inside Event Horizon)';
      zResEl.textContent = 'Infinite Redshift z = ∞ (Zero light escapes to infinity)';
      return;
    }

    // Time dilation factor tau / t_inf = sqrt( 1 - r_s / r )
    const time_factor = Math.sqrt(1.0 - (r_s_m / r_m));

    // Gravitational redshift z = 1 / sqrt( 1 - r_s / r ) - 1
    const z_redshift = (1.0 / time_factor) - 1.0;

    gmResEl.textContent = 'Time Factor: ' + time_factor.toFixed(4) + ' (Clocks run ' + ((1.0 - time_factor)*100).toFixed(2) + '% slower)';
    zResEl.textContent = 'Gravitational Redshift z = +' + z_redshift.toFixed(4) + ' (r_s = ' + (r_s_m/1000).toFixed(2) + ' km @ r = ' + r_km + ' km)';
  }

  mEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();