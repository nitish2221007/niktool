(() => {
  'use strict';
  const mEl = document.getElementById('lg-m'), l0El = document.getElementById('lg-l0');
  const kEl = document.getElementById('lg-k'), tEl = document.getElementById('lg-t');
  const qResEl = document.getElementById('lg-res-q'), pwResEl = document.getElementById('lg-res-pwr');

  function update() {
    const M = parseFloat(mEl.value), L0 = parseFloat(l0El.value);
    const k = parseFloat(kEl.value), t = parseFloat(tEl.value);

    if (isNaN(M) || isNaN(L0) || isNaN(k) || isNaN(t) || M <= 0 || L0 <= 0 || k <= 0 || t < 0) return;

    // EPA LandGEM equation for annual methane generation:
    // Q_CH4 = 2 * k * L0 * M * exp( - k * t )  [m^3 / year]
    // (factor of 2 converts methane volume to total biogas if 50% CH4)
    const Q_CH4_m3_yr = k * L0 * M * Math.exp(-k * t);
    const Q_CH4_m3_hr = Q_CH4_m3_yr / 8760.0;

    // Power: 36 MJ/m^3 CH4 => 36e6 J / (8760 * 3600 s) = 1.1415 W per m^3/yr
    const power_thermal_kW = (Q_CH4_m3_yr * 36.0) / 31536.0;
    const power_electric_MW = (power_thermal_kW * 0.38) / 1000.0;

    qResEl.textContent = 'Methane Q = ' + (Q_CH4_m3_yr / 1e6).toFixed(2) + ' × 10⁶ m³/year (' + Math.round(Q_CH4_m3_hr) + ' m³/hr)';
    pwResEl.textContent = 'Power = ' + (power_thermal_kW / 1000).toFixed(2) + ' MW Thermal (' + power_electric_MW.toFixed(2) + ' MW Electric @ ' + t + ' yrs post-placement)';
  }

  [mEl, l0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();