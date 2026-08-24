(() => {
  'use strict';
  const hEl = document.getElementById('torr-h'), diaEl = document.getElementById('torr-dia');
  const velEl = document.getElementById('torr-res-vel'), flowEl = document.getElementById('torr-res-flow');

  const g = 9.80665;

  function update() {
    const h = parseFloat(hEl.value), diaCm = parseFloat(diaEl.value);
    if (isNaN(h) || isNaN(diaCm) || h <= 0 || diaCm <= 0) return;

    // v = sqrt(2 * g * h)
    const v = Math.sqrt(2 * g * h);
    const rM = (diaCm / 100) / 2;
    const area = Math.PI * Math.pow(rM, 2);
    const flowM3s = area * v;
    const flowLps = flowM3s * 1000;

    velEl.textContent = v.toFixed(2) + ' m/s (' + (v * 3.6).toFixed(1) + ' km/h)';
    flowEl.textContent = flowLps.toFixed(2) + ' L/s (' + (flowLps * 60).toFixed(0) + ' L/min)';
  }

  hEl.addEventListener('input', update);
  diaEl.addEventListener('input', update);
  update();
})();