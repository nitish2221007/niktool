(() => {
  'use strict';
  const mEl = document.getElementById('grv-mat'), lEl = document.getElementById('grv-len'), wEl = document.getElementById('grv-wid'), dEl = document.getElementById('grv-depth');
  const tResEl = document.getElementById('grv-res-tons'), yResEl = document.getElementById('grv-res-yds');

  function update() {
    const density = parseFloat(mEl.value);
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), depthIn = parseFloat(dEl.value);
    if (isNaN(density) || isNaN(L) || isNaN(W) || isNaN(depthIn) || L <= 0 || W <= 0 || depthIn <= 0) return;

    // Cubic feet = L * W * (depth / 12)
    const cuFt = L * W * (depthIn / 12);
    const cuYds = cuFt / 27;
    const cuMeters = cuYds * 0.764555;

    // Total US tons = cuYds * density
    const usTons = cuYds * density;
    const metricTonnes = usTons * 0.907185;

    tResEl.textContent = usTons.toFixed(2) + ' US Tons (' + metricTonnes.toFixed(2) + ' Metric Tonnes)';
    yResEl.textContent = cuYds.toFixed(2) + ' Cu. Yds (' + cuMeters.toFixed(2) + ' m³)';
  }

  [mEl, lEl, wEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();