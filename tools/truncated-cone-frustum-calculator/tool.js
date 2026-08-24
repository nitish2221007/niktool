(() => {
  'use strict';
  const rEl = document.getElementById('frust-r'), capREl = document.getElementById('frust-cap-r'), hEl = document.getElementById('frust-h');
  const vEl = document.getElementById('frust-res-vol'), sEl = document.getElementById('frust-res-slant'), latEl = document.getElementById('frust-res-lat');

  function update() {
    const r = parseFloat(rEl.value), R = parseFloat(capREl.value), h = parseFloat(hEl.value);
    if (isNaN(r) || isNaN(R) || isNaN(h) || r <= 0 || R <= 0 || h <= 0) return;

    // V = (1/3) * pi * h * (R^2 + r^2 + R*r)
    const vol = (1/3) * Math.PI * h * (Math.pow(R, 2) + Math.pow(r, 2) + (R * r));
    // Slant height s = sqrt((R - r)^2 + h^2)
    const slant = Math.sqrt(Math.pow(R - r, 2) + Math.pow(h, 2));
    // Lateral area = pi * (R + r) * s
    const lateralArea = Math.PI * (R + r) * slant;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    sEl.textContent = slant.toFixed(2) + ' units';
    latEl.textContent = lateralArea.toFixed(2) + ' sq units';
  }

  [rEl, capREl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();