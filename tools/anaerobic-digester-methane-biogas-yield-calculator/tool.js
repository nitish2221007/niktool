(() => {
  'use strict';
  const qEl = document.getElementById('ad-q'), codEl = document.getElementById('ad-cod');
  const effEl = document.getElementById('ad-eff'), pch4El = document.getElementById('ad-pch4');
  const ch4ResEl = document.getElementById('ad-res-ch4'), enResEl = document.getElementById('ad-res-energy');

  function update() {
    const Q = parseFloat(qEl.value), COD_in = parseFloat(codEl.value);
    const eff_pct = parseFloat(effEl.value), pch4_pct = parseFloat(pch4El.value);

    if (isNaN(Q) || isNaN(COD_in) || isNaN(eff_pct) || isNaN(pch4_pct) || Q <= 0 || COD_in <= 0 || eff_pct <= 0 || pch4_pct <= 0) return;

    // Daily COD mass removed: COD_destructed = Q * COD_in * (eff / 100)  [kg COD / day]
    const COD_destructed = Q * COD_in * (eff_pct / 100.0);

    // Stoichiometric methane generation at STP: 0.35 m^3 CH4 per kg COD converted
    const V_CH4_m3_day = 0.35 * COD_destructed;

    // Total raw biogas volume:
    const V_biogas_m3_day = V_CH4_m3_day / (pch4_pct / 100.0);

    // Heating value of pure methane approx 36.0 MJ / m^3:
    const energy_MJ_day = V_CH4_m3_day * 36.0;
    const thermal_kW = energy_MJ_day / 86.4; // 1 kW = 86.4 MJ/day
    const electric_kW = thermal_kW * 0.38; // 38% electrical generator efficiency

    ch4ResEl.textContent = 'Methane = ' + Math.round(V_CH4_m3_day).toLocaleString() + ' m³ CH₄ / day (Biogas ' + Math.round(V_biogas_m3_day).toLocaleString() + ' m³/day)';
    enResEl.textContent = 'Thermal = ' + thermal_kW.toFixed(1) + ' kW (' + Math.round(energy_MJ_day).toLocaleString() + ' MJ/day) | CHP Electric = ' + electric_kW.toFixed(1) + ' kW (COD removed: ' + Math.round(COD_destructed) + ' kg/day)';
  }

  [qEl, codEl, effEl, pch4El].forEach(el => el.addEventListener('input', update));
  update();
})();