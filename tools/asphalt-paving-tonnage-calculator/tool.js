(() => {
  'use strict';
  const lEl = document.getElementById('ash-len'), wEl = document.getElementById('ash-wid'), tEl = document.getElementById('ash-thick');
  const tResEl = document.getElementById('ash-res-tons'), sResEl = document.getElementById('ash-res-sqft');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), thickIn = parseFloat(tEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(thickIn) || L <= 0 || W <= 0 || thickIn <= 0) return;

    const sqFt = L * W;
    const cuFt = sqFt * (thickIn / 12);
    const cuYds = cuFt / 27;

    // Standard compacted hot-mix asphalt density: 145 lbs / cu ft
    const totalLbs = cuFt * 145;
    // Add 5% contingency buffer
    const tonsWithBuffer = (totalLbs / 2000) * 1.05;
    const metricTonnes = tonsWithBuffer * 0.907185;

    tResEl.textContent = tonsWithBuffer.toFixed(2) + ' US Tons (' + metricTonnes.toFixed(2) + ' Metric Tonnes)';
    sResEl.textContent = Math.round(sqFt).toLocaleString() + ' sq ft (' + cuYds.toFixed(2) + ' cu yds)';
  }

  [lEl, wEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();