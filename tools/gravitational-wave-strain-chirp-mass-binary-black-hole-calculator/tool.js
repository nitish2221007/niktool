(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2'), dEl = document.getElementById('gw-dist');
  const chResEl = document.getElementById('gw-res-chirp'), stResEl = document.getElementById('gw-res-strain');

  const G = 6.67430e-11, c = 299792458, M_sun_kg = 1.98847e30;
  const Mpc_to_m = 3.085677581e22;

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), d_Mpc = parseFloat(dEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(d_Mpc) || m1 <= 0 || m2 <= 0 || d_Mpc <= 0) return;

    const M_total = m1 + m2;

    // Chirp mass: M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)  [M_sun]
    const M_chirp = Math.pow(m1 * m2, 3.0 / 5.0) / Math.pow(M_total, 1.0 / 5.0);

    const M_chirp_kg = M_chirp * M_sun_kg;
    const r_m = d_Mpc * Mpc_to_m;

    // Peak GW frequency at ISCO: f_gw_peak = c^3 / ( 6^(3/2) * pi * G * M_total_kg )
    const M_total_kg = M_total * M_sun_kg;
    const f_peak = Math.pow(c, 3) / (Math.pow(6.0, 1.5) * Math.PI * G * M_total_kg);

    // Approximate strain amplitude at peak: h ~ (4 / r) * (G * M_chirp / c^2)^(5/3) * (pi * f / c)^(2/3)
    const h_strain = (4.0 / r_m) * Math.pow((G * M_chirp_kg) / Math.pow(c, 2), 5.0 / 3.0) * Math.pow((Math.PI * f_peak) / c, 2.0 / 3.0);

    // Displacement on 4km LIGO arm: Delta_L = h * L
    const delta_L = h_strain * 4000.0;

    chResEl.textContent = 'Chirp Mass ℳ = ' + M_chirp.toFixed(1) + ' M_sun (Total = ' + M_total.toFixed(1) + ' M_sun)';
    stResEl.textContent = 'Strain h ≈ ' + h_strain.toExponential(2) + ' (f_peak ≈ ' + Math.round(f_peak) + ' Hz | ΔL = ' + delta_L.toExponential(2) + ' m on 4 km arm)';
  }

  [m1El, m2El, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();