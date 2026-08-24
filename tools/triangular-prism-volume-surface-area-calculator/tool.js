(() => {
  'use strict';
  const bEl = document.getElementById('tp-b'), hEl = document.getElementById('tp-h'), lEl = document.getElementById('tp-l');
  const vEl = document.getElementById('tp-res-vol'), baseEl = document.getElementById('tp-res-base');

  function update() {
    const b = parseFloat(bEl.value), h = parseFloat(hEl.value), L = parseFloat(lEl.value);
    if (isNaN(b) || isNaN(h) || isNaN(L) || b <= 0 || h <= 0 || L <= 0) return;

    // Base area = 0.5 * b * h
    const baseArea = 0.5 * b * h;
    // Volume = baseArea * L
    const vol = baseArea * L;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    baseEl.textContent = baseArea.toFixed(2) + ' sq units';
  }

  [bEl, hEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();