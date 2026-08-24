(() => {
  'use strict';
  const altEl = document.getElementById('geo-alt');
  const perResEl = document.getElementById('geo-res-per'), spdResEl = document.getElementById('geo-res-spd');

  const mu_earth = 398600.4418, R_earth = 6378.137;

  function update() {
    const h_km = parseFloat(altEl.value);
    if (isNaN(h_km) || h_km < 100) return;

    const a_km = R_earth + h_km;

    // Kepler's Third Law: T = 2 * pi * sqrt( a^3 / mu )  [seconds]
    const T_sec = 2.0 * Math.PI * Math.sqrt(Math.pow(a_km, 3) / mu_earth);
    const T_min = T_sec / 60.0;
    const T_hours = T_sec / 3600.0;

    // Circular orbital speed: v = sqrt( mu / a )  [km / s]
    const v_kms = Math.sqrt(mu_earth / a_km);
    const v_kmh = v_kms * 3600.0;

    let regime = '';
    if (Math.abs(h_km - 35786) < 200) {
      regime = 'GEOSTATIONARY ORBIT (GEO: Matches 23.93h sidereal day - Fixed over ground)';
    } else if (h_km < 2000) {
      regime = 'LOW EARTH ORBIT (LEO: Fast 90-120 min period)';
    } else if (h_km < 35786) {
      regime = 'MEDIUM EARTH ORBIT (MEO: GPS / Navigation ~12h period)';
    } else {
      regime = 'HIGH EARTH ORBIT (HEO: Super-synchronous period > 24h)';
    }

    perResEl.textContent = 'Period T = ' + (T_hours >= 1 ? T_hours.toFixed(2) + ' Hours (' + Math.round(T_min) + ' min)' : T_min.toFixed(1) + ' min');
    spdResEl.textContent = 'Speed v = ' + v_kms.toFixed(2) + ' km/s (' + Math.round(v_kmh).toLocaleString() + ' km/h) | ' + regime;
  }

  altEl.addEventListener('input', update);
  update();
})();