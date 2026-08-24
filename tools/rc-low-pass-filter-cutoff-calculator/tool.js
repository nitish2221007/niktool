(() => {
  'use strict';
  const rEl = document.getElementById('lpf-r'), cEl = document.getElementById('lpf-c');
  const fcEl = document.getElementById('lpf-res-fc'), tauEl = document.getElementById('lpf-res-tau');

  function update() {
    const R = parseFloat(rEl.value), cUf = parseFloat(cEl.value);
    if (isNaN(R) || isNaN(cUf) || R <= 0 || cUf <= 0) return;

    const C = cUf * 1e-6;
    // fc = 1 / (2 * pi * R * C)
    const fc = 1 / (2 * Math.PI * R * C);
    const tauSec = R * C;
    const tauMs = tauSec * 1000;

    fcEl.textContent = fc >= 1e6 ? (fc / 1e6).toFixed(2) + ' MHz' : (fc >= 1e3 ? (fc / 1e3).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz');
    tauEl.textContent = tauMs >= 1000 ? (tauMs / 1000).toFixed(2) + ' s' : (tauMs < 1 ? (tauMs * 1000).toFixed(1) + ' μs' : tauMs.toFixed(2) + ' ms');
  }

  rEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  update();
})();