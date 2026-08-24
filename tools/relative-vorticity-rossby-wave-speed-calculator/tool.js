(() => {
  'use strict';
  const uEl = document.getElementById('ros-u'), wEl = document.getElementById('ros-wlen'), latEl = document.getElementById('ros-lat');
  const cResEl = document.getElementById('ros-res-c'), stResEl = document.getElementById('ros-res-stat');

  const omega = 7.2921159e-5;
  const R_earth = 6.371e6; // meters

  function update() {
    const u = parseFloat(uEl.value), L_km = parseFloat(wEl.value), lat = parseFloat(latEl.value);
    if (isNaN(u) || isNaN(L_km) || isNaN(lat) || L_km <= 0 || Math.abs(lat) > 90) return;

    const latRad = (lat * Math.PI) / 180;
    // Beta = 2 * omega * cos(lat) / R_earth  [m^-1 s^-1]
    const beta = (2 * omega * Math.cos(latRad)) / R_earth;

    const L_m = L_km * 1000;
    // Wavenumber k = 2 * pi / L
    const k = (2 * Math.PI) / L_m;

    // Phase speed c = u - (beta / k^2)  [m / s]
    const c = u - (beta / Math.pow(k, 2));
    const cKmh = c * 3.6;

    // Stationary wavelength L_s where c = 0 => k_s^2 = beta / u => L_s = 2*pi*sqrt(u / beta)
    const Ls_m = 2 * Math.PI * Math.sqrt(u / beta);
    const Ls_km = Ls_m / 1000;

    let dir = c >= 0 ? 'Eastward Progressive' : 'Westward Retrograde';
    cResEl.textContent = 'c = ' + (c >= 0 ? '+' : '') + c.toFixed(1) + ' m / s (' + cKmh.toFixed(1) + ' km/h ' + dir + ')';
    stResEl.textContent = 'Stationary Wavelength L_s = ' + Math.round(Ls_km).toLocaleString() + ' km (Waves longer than L_s retrogress westward)';
  }

  [uEl, wEl, latEl].forEach(el => el.addEventListener('input', update));
  update();
})();