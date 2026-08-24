(() => {
  'use strict';
  const wEl = document.getElementById('hf-width'), hEl = document.getElementById('hf-height'), dEl = document.getElementById('hf-depth');
  const fResEl = document.getElementById('hf-res-force'), cpResEl = document.getElementById('hf-res-cp'), tResEl = document.getElementById('hf-res-tons');

  const rho = 1000; // Water density kg/m^3
  const g = 9.80665;

  function update() {
    const w = parseFloat(wEl.value), h = parseFloat(hEl.value), dTop = parseFloat(dEl.value);
    if (isNaN(w) || isNaN(h) || isNaN(dTop) || w <= 0 || h <= 0 || dTop < 0) return;

    const area = w * h;
    // Depth to centroid hc = dTop + h/2
    const hc = dTop + (h / 2);
    // Resultant force F = rho * g * hc * A
    const forceN = rho * g * hc * area;
    const forceKn = forceN / 1000;
    const forceTons = forceKn / 9.80665;

    // Second moment of area Ixc = (w * h^3) / 12
    const Ixc = (w * Math.pow(h, 3)) / 12;
    // Center of pressure y_cp = hc + (Ixc / (hc * A))
    const yCp = hc + (Ixc / (hc * area));

    fResEl.textContent = forceKn.toFixed(2) + ' kN';
    cpResEl.textContent = yCp.toFixed(2) + ' meters deep';
    tResEl.textContent = forceTons.toFixed(2) + ' Metric Tons';
  }

  [wEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();