(() => {
  'use strict';
  const rEl = document.getElementById('cc-r'), hEl = document.getElementById('cc-h');
  const cVolEl = document.getElementById('cc-res-cone-vol'), cyVolEl = document.getElementById('cc-res-cyl-vol'), slEl = document.getElementById('cc-res-slant');

  function update() {
    const r = parseFloat(rEl.value), h = parseFloat(hEl.value);
    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return;

    const cylVol = Math.PI * Math.pow(r, 2) * h;
    const coneVol = cylVol / 3;
    const slant = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));

    cVolEl.textContent = coneVol.toFixed(2) + ' cu units';
    cyVolEl.textContent = cylVol.toFixed(2) + ' cu units';
    slEl.textContent = slant.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();