(() => {
  'use strict';
  const lEl = document.getElementById('rlc-l'), cEl = document.getElementById('rlc-c'), rEl = document.getElementById('rlc-r');
  const f0El = document.getElementById('rlc-res-f0'), qEl = document.getElementById('rlc-res-q'), bwEl = document.getElementById('rlc-res-bw');

  function update() {
    const lMh = parseFloat(lEl.value), cNf = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(lMh) || isNaN(cNf) || isNaN(R) || lMh <= 0 || cNf <= 0 || R <= 0) return;

    const L = lMh * 1e-3;
    const C = cNf * 1e-9;

    // f0 = 1 / (2 * pi * sqrt(L * C))
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
    // Q (series) = (1 / R) * sqrt(L / C)
    const Q = (1 / R) * Math.sqrt(L / C);
    // Bandwidth BW = f0 / Q
    const bw = f0 / Q;

    f0El.textContent = f0 >= 1e6 ? (f0 / 1e6).toFixed(3) + ' MHz' : (f0 >= 1e3 ? (f0 / 1e3).toFixed(2) + ' kHz' : f0.toFixed(1) + ' Hz');
    qEl.textContent = 'Q = ' + Q.toFixed(2);
    bwEl.textContent = bw >= 1e3 ? (bw / 1e3).toFixed(2) + ' kHz' : bw.toFixed(1) + ' Hz';
  }

  [lEl, cEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();