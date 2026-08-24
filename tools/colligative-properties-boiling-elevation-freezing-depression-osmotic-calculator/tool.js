(() => {
  'use strict';
  const iEl = document.getElementById('cp-i'), mEl = document.getElementById('cp-m'), tEl = document.getElementById('cp-temp');
  const tfResEl = document.getElementById('cp-res-tf'), tbResEl = document.getElementById('cp-res-tb');

  const K_f_water = 1.86; // °C * kg / mol
  const K_b_water = 0.512; // °C * kg / mol
  const R_gas = 0.082057; // L * atm / (mol * K)

  function update() {
    const i = parseFloat(iEl.value), m = parseFloat(mEl.value), temp_C = parseFloat(tEl.value);
    if (isNaN(i) || isNaN(m) || isNaN(temp_C) || i < 1 || m < 0) return;

    const T_K = temp_C + 273.15;

    // Freezing point depression: deltaT_f = i * K_f * m
    const deltaT_f = i * K_f_water * m;
    const new_Tf = 0.0 - deltaT_f;

    // Boiling point elevation: deltaT_b = i * K_b * m
    const deltaT_b = i * K_b_water * m;
    const new_Tb = 100.0 + deltaT_b;

    // Osmotic pressure: Pi = i * M * R * T (approximating M approx m for dilute water)
    const Pi_atm = i * m * R_gas * T_K;

    tfResEl.textContent = 'Freezing Point = ' + new_Tf.toFixed(2) + ' °C (ΔT_f = ' + deltaT_f.toFixed(2) + '°C)';
    tbResEl.textContent = 'Boiling Point = ' + new_Tb.toFixed(2) + ' °C (+ΔT_b = ' + deltaT_b.toFixed(2) + '°C) | Osmotic Pressure Π = ' + Pi_atm.toFixed(2) + ' atm (' + (Pi_atm * 101.325).toFixed(0) + ' kPa)';
  }

  [iEl, mEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();