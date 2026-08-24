(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2'), fEl = document.getElementById('gw-f');
  const mcResEl = document.getElementById('gw-res-mchirp'), dfResEl = document.getElementById('gw-res-dfdt');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), f_gw = parseFloat(fEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(f_gw) || m1 <= 0 || m2 <= 0 || f_gw <= 0) return;

    // Chirp mass M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)  [Solar masses]
    const M_chirp_solar = Math.pow(m1 * m2, 0.6) / Math.pow(m1 + m2, 0.2);
    const M_chirp_kg = M_chirp_solar * M_sun_kg;

    // Frequency chirp rate df/dt:
    // df/dt = (96/5) * pi^(8/3) * ( (G * M_chirp) / c^3 )^(5/3) * f^(11/3)  [Hz / s]
    const geomFactor = (G * M_chirp_kg) / Math.pow(c, 3);
    const df_dt = (96.0 / 5.0) * Math.pow(Math.PI, 8.0/3.0) * Math.pow(geomFactor, 5.0/3.0) * Math.pow(f_gw, 11.0/3.0);

    // Time to merger tau_merge = (5/256) * ( c^3 / (G * M_chirp) )^(5/3) * ( pi * f_gw )^(-8/3)  [seconds]
    const tau_merge_sec = (5.0 / 256.0) * Math.pow(geomFactor, -5.0/3.0) * Math.pow(Math.PI * f_gw, -8.0/3.0);
    const tau_merge_ms = tau_merge_sec * 1000.0;

    mcResEl.textContent = 'ℳ = ' + M_chirp_solar.toFixed(2) + ' M_☉ (Total M = ' + (m1 + m2).toFixed(1) + ' M_☉)';
    dfResEl.textContent = 'Chirp df/dt = +' + Math.round(df_dt).toLocaleString() + ' Hz/s | Time to Merger: ' + (tau_merge_ms < 1000 ? tau_merge_ms.toFixed(1) + ' ms' : tau_merge_sec.toFixed(2) + ' s') + ' @ ' + f_gw + ' Hz';
  }

  [m1El, m2El, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();