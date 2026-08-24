(() => {
  'use strict';
  const tEl = document.getElementById('lcl-t'), tdEl = document.getElementById('lcl-td');
  const hResEl = document.getElementById('lcl-res-ht'), sResEl = document.getElementById('lcl-res-spread');

  function update() {
    const T = parseFloat(tEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(T) || isNaN(Td) || T < Td) return;

    // Dew point depression
    const spread = T - Td;

    // Espy formula: z_LCL (meters) approx = 125 * (T - Td)
    const zMeters = 125 * spread;
    const zFeet = zMeters * 3.28084;

    // Dry adiabatic lapse rate = 9.8 °C / km
    // Cloud base temperature T_lcl = T - (9.8 * zMeters / 1000)
    const T_lcl = T - (9.8 * (zMeters / 1000));

    hResEl.textContent = Math.round(zMeters).toLocaleString() + ' m (' + Math.round(zFeet).toLocaleString() + ' ft AGL)';
    sResEl.textContent = 'Dew Point Spread: ' + spread.toFixed(1) + '°C | Condensation Temp at Cloud Base: ' + T_lcl.toFixed(1) + '°C';
  }

  tEl.addEventListener('input', update);
  tdEl.addEventListener('input', update);
  update();
})();