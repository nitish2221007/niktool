(() => {
  'use strict';
  const tdbEl = document.getElementById('psy-tdb'), rhEl = document.getElementById('psy-rh');
  const dpResEl = document.getElementById('psy-res-dp'), prResEl = document.getElementById('psy-res-prop');

  function update() {
    const T_db = parseFloat(tdbEl.value), RH = parseFloat(rhEl.value);
    if (isNaN(T_db) || isNaN(RH) || RH <= 0 || RH > 100) return;

    // Magnus-Tetens formula for saturation vapor pressure P_sat in hPa (mbar):
    const a = 17.27, b = 237.7;
    const alpha = ((a * T_db) / (b + T_db)) + Math.log(RH / 100.0);
    const T_dp = (b * alpha) / (a - alpha);

    // Saturation vapor pressure at T_db in kPa:
    const P_sat_kPa = 0.61078 * Math.exp((17.27 * T_db) / (T_db + 237.3));
    // Actual partial vapor pressure P_v:
    const P_v_kPa = (RH / 100.0) * P_sat_kPa;

    // Atmospheric pressure P_atm = 101.325 kPa
    // Humidity ratio omega = 0.622 * P_v / ( P_atm - P_v )  [kg_water / kg_dry_air]
    const P_atm = 101.325;
    const omega = 0.622 * (P_v_kPa / (P_atm - P_v_kPa));
    const omega_g_kg = omega * 1000.0;

    // Specific enthalpy h = 1.006 * T_db + omega * (2501 + 1.86 * T_db)  [kJ / kg]
    const h_kJ_kg = (1.006 * T_db) + (omega * (2501.0 + (1.86 * T_db)));

    dpResEl.textContent = 'Dew Point T_dp = ' + T_dp.toFixed(2) + ' °C';
    prResEl.textContent = 'Humidity Ratio ω = ' + omega_g_kg.toFixed(2) + ' g/kg | Enthalpy h = ' + h_kJ_kg.toFixed(1) + ' kJ/kg (' + T_db + '°C, ' + RH + '% RH)';
  }

  tdbEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();