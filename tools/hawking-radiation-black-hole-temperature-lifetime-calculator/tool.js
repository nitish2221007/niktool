(() => {
  'use strict';
  const mEl = document.getElementById('hw-mass'), tpEl = document.getElementById('hw-type');
  const tResEl = document.getElementById('hw-res-temp'), lfResEl = document.getElementById('hw-res-life');

  const M_sun_kg = 1.98847e30;
  // Hawking temp constant: T_H = (hbar * c^3) / (8 * pi * G * M * k_B) approx 1.227e23 / M (kg)
  const T_const = 1.227e23; // K * kg

  // Lifetime constant: t_evap = (5120 * pi * G^2 * M^3) / (hbar * c^4) approx 2.098e-16 * M^3 (seconds)
  // In years: t_evap_yr approx 2.098e-16 * M^3 / 3.15576e7 approx 6.648e-24 * M^3 (years)

  function update() {
    let mass_input = parseFloat(mEl.value);
    const isSolar = tpEl.value === 'msun';

    if (isNaN(mass_input) || mass_input <= 0) return;

    const M_kg = isSolar ? mass_input * M_sun_kg : mass_input;

    // Hawking temperature: T_H = T_const / M_kg  [K]
    const T_H_K = T_const / M_kg;

    // Lifetime in years: t_yr = 6.648e-24 * (M_kg)^3
    const t_evap_yr = 6.648e-24 * Math.pow(M_kg, 3);

    // Radiative power: P = (hbar * c^6) / (15360 * pi * G^2 * M^2) approx 3.562e32 / M^2  [Watts]
    const P_watts = 3.562e32 / Math.pow(M_kg, 2);

    tResEl.textContent = 'Hawking Temp T_H = ' + T_H_K.toExponential(2) + ' K';
    lfResEl.textContent = 'Lifetime t_evap = ' + t_evap_yr.toExponential(2) + ' Years | Power = ' + P_watts.toExponential(2) + ' Watts (M = ' + (isSolar ? mass_input + ' M_sun' : M_kg.toExponential(2) + ' kg') + ')';
  }

  mEl.addEventListener('input', update);
  tpEl.addEventListener('change', update);
  update();
})();