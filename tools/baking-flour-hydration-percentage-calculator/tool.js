(() => {
  'use strict';
  const fEl = document.getElementById('bh-flour'), wEl = document.getElementById('bh-water'), sEl = document.getElementById('bh-salt');
  const hEl = document.getElementById('bh-res-hydr'), tEl = document.getElementById('bh-res-tot'), spEl = document.getElementById('bh-res-salt-pct');

  function update() {
    const flour = parseFloat(fEl.value), water = parseFloat(wEl.value), salt = parseFloat(sEl.value) || 0;
    if (isNaN(flour) || isNaN(water) || flour <= 0 || water <= 0) return;

    const hydrPct = (water / flour) * 100;
    const saltPct = (salt / flour) * 100;
    const totalWeight = flour + water + salt;

    hEl.textContent = hydrPct.toFixed(1) + '% Hydration';
    tEl.textContent = Math.round(totalWeight) + ' g';
    spEl.textContent = saltPct.toFixed(1) + '% Salt';
  }

  [fEl, wEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();