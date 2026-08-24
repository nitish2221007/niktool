(() => {
  'use strict';
  const gEl = document.getElementById('ghg-gas'), eEl = document.getElementById('ghg-kwh'), fEl = document.getElementById('ghg-fly');
  const totResEl = document.getElementById('ghg-res-tot'), brkResEl = document.getElementById('ghg-res-break');

  function update() {
    const gas_m3 = parseFloat(gEl.value) || 0;
    const elec_kwh = parseFloat(eEl.value) || 0;
    const fly_km = parseFloat(fEl.value) || 0;

    // Natural gas: ~2.03 kg CO2e / m^3
    const s1_tco2e = (gas_m3 * 2.03) / 1000.0;
    // Grid electricity: ~0.414 kg CO2e / kWh
    const s2_tco2e = (elec_kwh * 0.414) / 1000.0;
    // Commercial flight: ~0.155 kg CO2e / passenger-km
    const s3_tco2e = (fly_km * 0.155) / 1000.0;

    const total_tco2e = s1_tco2e + s2_tco2e + s3_tco2e;
    const trees = Math.round(total_tco2e * 45.4);

    totResEl.textContent = 'Total: ' + total_tco2e.toFixed(2) + ' tCO₂e';
    brkResEl.textContent = 'Scope 1: ' + s1_tco2e.toFixed(2) + ' t | Scope 2: ' + s2_tco2e.toFixed(2) + ' t | Scope 3: ' + s3_tco2e.toFixed(2) + ' t (~' + trees.toLocaleString() + ' Trees needed to offset)';
  }

  [gEl, eEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();