(() => {
  'use strict';
  const rEl = document.getElementById('sc-r'), hEl = document.getElementById('sc-h');
  const vEl = document.getElementById('sc-res-vol'), arEl = document.getElementById('sc-res-area'), brEl = document.getElementById('sc-res-base-r');

  function update() {
    const R = parseFloat(rEl.value), h = parseFloat(hEl.value);
    if (isNaN(R) || isNaN(h) || R <= 0 || h <= 0 || h > 2 * R) return;

    // V = (1/3) * pi * h^2 * (3*R - h)
    const vol = (1/3) * Math.PI * Math.pow(h, 2) * (3 * R - h);
    // A_curved = 2 * pi * R * h
    const curvedArea = 2 * Math.PI * R * h;
    // Base radius a = sqrt(h * (2R - h))
    const baseR = Math.sqrt(h * (2 * R - h));

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = curvedArea.toFixed(2) + ' sq units';
    brEl.textContent = baseR.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();