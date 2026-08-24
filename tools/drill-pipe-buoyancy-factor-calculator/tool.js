(() => {
  'use strict';
  const mwEl = document.getElementById('bf-mw'), airEl = document.getElementById('bf-air');
  const bfResEl = document.getElementById('bf-res-bf'), hkResEl = document.getElementById('bf-res-hook');

  function update() {
    const mw = parseFloat(mwEl.value), airKlbs = parseFloat(airEl.value);
    if (isNaN(mw) || isNaN(airKlbs) || mw <= 0 || airKlbs <= 0) return;

    // Density of steel = 490 lbs/cu ft = 65.5 ppg
    // Buoyancy Factor BF = 1 - (MW / 65.5)
    const BF = 1 - (mw / 65.5);
    const buoyedKlbs = airKlbs * BF;
    const buoyedMetricTons = buoyedKlbs * 0.453592;
    const reducedPct = (1 - BF) * 100;

    bfResEl.textContent = 'BF = ' + BF.toFixed(4) + ' (' + reducedPct.toFixed(1) + '% Weight Relief)';
    hkResEl.textContent = buoyedKlbs.toFixed(1) + ' klbs (' + buoyedMetricTons.toFixed(1) + ' Metric Tons)';
  }

  mwEl.addEventListener('input', update);
  airEl.addEventListener('input', update);
  update();
})();