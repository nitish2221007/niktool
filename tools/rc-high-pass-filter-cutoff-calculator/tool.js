(() => {
  'use strict';
  const cEl = document.getElementById('hpf-c'), rEl = document.getElementById('hpf-r');
  const fcEl = document.getElementById('hpf-res-fc'), tauEl = document.getElementById('hpf-res-tau');

  function update() {
    const cUf = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(cUf) || isNaN(R) || cUf <= 0 || R <= 0) return;

    const C = cUf * 1e-6;
    // fc = 1 / (2 * pi * R * C)
    const fc = 1 / (2 * Math.PI * R * C);
    const tauSec = R * C;

    fcEl.textContent = fc >= 1e3 ? (fc / 1e3).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz';
    tauEl.textContent = (tauSec * 1000).toFixed(1) + ' ms';
  }

  cEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();