(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass'), prEl = document.getElementById('bh-preset');
  const rsResEl = document.getElementById('bh-res-rs'), hkResEl = document.getElementById('bh-res-hawk');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;
  const hbar = 1.054571817e-34;
  const kB = 1.380649e-23;

  const PRESETS = {
    'sgrA': 4.154e6,
    'm87': 6.5e9,
    'stellar': 14.8,
    'earth': 5.972e24 / M_sun_kg
  };

  function update() {
    const M_solar = parseFloat(mEl.value);
    if (isNaN(M_solar) || M_solar <= 0) return;

    const M_kg = M_solar * M_sun_kg;

    // Schwarzschild radius r_s = (2 * G * M) / c^2  [meters]
    const r_s_m = (2.0 * G * M_kg) / Math.pow(c, 2);
    const r_s_km = r_s_m / 1000.0;
    const r_s_au = r_s_m / 1.495978707e11;

    // Photon sphere r_ph = 1.5 * r_s
    const r_ph_km = 1.5 * r_s_km;

    // Hawking temperature T_H = ( hbar * c^3 ) / ( 8 * pi * G * M * kB )  [Kelvin]
    const T_H_K = (hbar * Math.pow(c, 3)) / (8.0 * Math.PI * G * M_kg * kB);

    let rStr = '';
    if (r_s_km >= 1e6) rStr = (r_s_km / 1e6).toFixed(2) + ' Million km (' + r_s_au.toFixed(2) + ' AU)';
    else if (r_s_km >= 1.0) rStr = r_s_km.toFixed(2) + ' km';
    else rStr = (r_s_m * 1000).toFixed(1) + ' mm (Coin Sized)';

    rsResEl.textContent = 'r_s = ' + rStr + ' Event Horizon';
    hkResEl.textContent = 'Hawking T_H = ' + T_H_K.toExponential(2) + ' K | Photon Sphere r_ph = ' + (r_ph_km >= 1e6 ? (r_ph_km/1e6).toFixed(2) + 'M km' : r_ph_km.toFixed(1) + ' km') + ' (ISCO = 3·r_s)';
  }

  mEl.addEventListener('input', update);
  prEl.addEventListener('change', () => {
    mEl.value = PRESETS[prEl.value];
    update();
  });
  update();
})();