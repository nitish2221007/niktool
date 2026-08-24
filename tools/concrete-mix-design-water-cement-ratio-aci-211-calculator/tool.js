(() => {
  'use strict';
  const fcEl = document.getElementById('cm-fc'), volEl = document.getElementById('cm-vol'), slEl = document.getElementById('cm-slump');
  const cmResEl = document.getElementById('cm-res-cement'), agResEl = document.getElementById('cm-res-agg');

  function update() {
    const fc = parseFloat(fcEl.value), vol = parseFloat(volEl.value), slump = parseFloat(slEl.value);
    if (isNaN(fc) || isNaN(vol) || isNaN(slump) || fc <= 0 || vol <= 0) return;

    // ACI 211.1 empirical w/c ratio correlation:
    // w/c approx = 1.15 - 0.0215 * fc (capped between 0.35 and 0.65)
    let wc = Math.max(0.35, Math.min(0.65, 1.15 - (0.0215 * fc)));

    // Standard water demand for 100 mm slump: ~190 kg/m^3
    let water_kg_m3 = 190.0 + ((slump - 100.0) / 25.0) * 5.0;
    let cement_kg_m3 = water_kg_m3 / wc;

    // Coarse gravel: ~1120 kg/m^3, Fine sand: remainder to reach ~2400 kg/m^3
    let gravel_kg_m3 = 1120.0;
    let sand_kg_m3 = Math.max(500.0, 2400.0 - cement_kg_m3 - water_kg_m3 - gravel_kg_m3);

    const totalCement = Math.round(cement_kg_m3 * vol);
    const totalWater = Math.round(water_kg_m3 * vol);
    const totalGravel = Math.round(gravel_kg_m3 * vol);
    const totalSand = Math.round(sand_kg_m3 * vol);

    cmResEl.textContent = 'Cement = ' + totalCement + ' kg | Water = ' + totalWater + ' kg (w/c = ' + wc.toFixed(2) + ')';
    agResEl.textContent = 'Gravel = ' + totalGravel + ' kg | Sand = ' + totalSand + ' kg (Batch for ' + vol + ' m³ @ target ' + fc + ' MPa)';
  }

  [fcEl, volEl, slEl].forEach(el => el.addEventListener('input', update));
  update();
})();