(() => {
  'use strict';
  const lEl = document.getElementById('con-len'), wEl = document.getElementById('con-wid'), tEl = document.getElementById('con-thick');
  const yResEl = document.getElementById('con-res-yards'), b80ResEl = document.getElementById('con-res-b80'), b60ResEl = document.getElementById('con-res-b60');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), thickIn = parseFloat(tEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(thickIn) || L <= 0 || W <= 0 || thickIn <= 0) return;

    // Volume in cubic feet = L * W * (thick / 12)
    const cuFt = L * W * (thickIn / 12);
    // Add 10% safety buffer for uneven ground / spillage
    const cuFtWithWaste = cuFt * 1.10;

    // 1 Cubic Yard = 27 Cubic Feet
    const cuYards = cuFtWithWaste / 27;
    const cuMeters = cuYards * 0.764555;

    // 1 bag 80 lb yields approx 0.60 cu ft
    const bags80 = Math.ceil(cuFtWithWaste / 0.60);
    // 1 bag 60 lb yields approx 0.45 cu ft
    const bags60 = Math.ceil(cuFtWithWaste / 0.45);

    yResEl.textContent = cuYards.toFixed(2) + ' Cu. Yds (' + cuMeters.toFixed(2) + ' m³)';
    b80ResEl.textContent = bags80 + ' Bags (80 lb)';
    b60ResEl.textContent = bags60 + ' Bags (60 lb)';
  }

  [lEl, wEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();