(() => {
  'use strict';
  const baseEl = document.getElementById('ty-base'), pxEl = document.getElementById('ty-px');
  const remEl = document.getElementById('ty-res-rem'), emEl = document.getElementById('ty-res-em');
  const ptEl = document.getElementById('ty-res-pt'), pctEl = document.getElementById('ty-res-pct');

  function update() {
    const base = parseFloat(baseEl.value);
    const px = parseFloat(pxEl.value);
    if (isNaN(base) || isNaN(px) || base <= 0 || px < 0) return;

    const rem = px / base;
    const pt = px * 0.75;
    const pct = (px / base) * 100;

    remEl.textContent = rem.toFixed(3) + ' rem';
    emEl.textContent = rem.toFixed(3) + ' em';
    ptEl.textContent = pt.toFixed(1) + ' pt';
    pctEl.textContent = Math.round(pct) + '%';
  }

  baseEl.addEventListener('input', update);
  pxEl.addEventListener('input', update);
  update();
})();