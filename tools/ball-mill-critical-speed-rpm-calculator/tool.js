(() => {
  'use strict';
  const dEl = document.getElementById('bm-diam'), pEl = document.getElementById('bm-pct');
  const nopResEl = document.getElementById('bm-res-nop'), ncResEl = document.getElementById('bm-res-nc');

  function update() {
    const D = parseFloat(dEl.value), pct = parseFloat(pEl.value);
    if (isNaN(D) || isNaN(pct) || D <= 0 || pct <= 0) return;

    // Critical speed in metric units: N_c = 42.29 / sqrt(D)  [RPM]
    const Nc = 42.29 / Math.sqrt(D);
    // Operating speed N_op = Nc * (pct / 100)
    const Nop = Nc * (pct / 100);

    nopResEl.textContent = Nop.toFixed(2) + ' RPM (' + pct + '% of N_c)';
    ncResEl.textContent = Nc.toFixed(2) + ' RPM (100% Centrifuging Threshold)';
  }

  dEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();