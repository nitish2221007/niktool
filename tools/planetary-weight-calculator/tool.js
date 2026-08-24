(() => {
  'use strict';
  const wtEl = document.getElementById('planet-earth-wt');
  const moonEl = document.getElementById('pw-moon'), marsEl = document.getElementById('pw-mars'), venusEl = document.getElementById('pw-venus');
  const jupEl = document.getElementById('pw-jupiter'), satEl = document.getElementById('pw-saturn'), mercEl = document.getElementById('pw-mercury');

  const GRAVITY = {
    moon: 0.166, mars: 0.379, venus: 0.907,
    jupiter: 2.528, saturn: 1.065, mercury: 0.378
  };

  function update() {
    const w = parseFloat(wtEl.value);
    if (isNaN(w) || w <= 0) return;

    moonEl.textContent = (w * GRAVITY.moon).toFixed(1);
    marsEl.textContent = (w * GRAVITY.mars).toFixed(1);
    venusEl.textContent = (w * GRAVITY.venus).toFixed(1);
    jupEl.textContent = (w * GRAVITY.jupiter).toFixed(1);
    satEl.textContent = (w * GRAVITY.saturn).toFixed(1);
    mercEl.textContent = (w * GRAVITY.mercury).toFixed(1);
  }

  wtEl.addEventListener('input', update);
  update();
})();