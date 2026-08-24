(() => {
  'use strict';
  const aEl = document.getElementById('tb-a'), rEl = document.getElementById('tb-r'), etaEl = document.getElementById('tb-eta');
  const cyResEl = document.getElementById('tb-res-cycle'), anResEl = document.getElementById('tb-res-ann');

  const g = 9.80665;
  const rho_sea = 1025;

  function update() {
    const aKm2 = parseFloat(aEl.value), R = parseFloat(rEl.value), etaPct = parseFloat(etaEl.value);
    if (isNaN(aKm2) || isNaN(R) || isNaN(etaPct) || aKm2 <= 0 || R <= 0 || etaPct <= 0) return;

    const aM2 = aKm2 * 1e6;
    const eta = etaPct / 100;
    const eJoules = 0.5 * aM2 * rho_sea * g * Math.pow(R, 2);
    const eMwh = (eJoules / 3.6e9) * eta;
    const annualGwh = (eMwh * 705) / 1000;
    const avgPowerMw = (annualGwh * 1000) / 8760;

    cyResEl.textContent = Math.round(eMwh).toLocaleString() + ' MWh / Tide Cycle';
    anResEl.textContent = Math.round(annualGwh).toLocaleString() + ' GWh / Year (Average Capacity: ' + avgPowerMw.toFixed(1) + ' MW, R² Scaling)';
  }

  [aEl, rEl, etaEl].forEach(el => el.addEventListener('input', update));
  update();
})();