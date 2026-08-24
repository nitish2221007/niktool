(() => {
  'use strict';
  const lEl = document.getElementById('fp-l'), rEl = document.getElementById('fp-r'), nEl = document.getElementById('fp-n');
  const fsrResEl = document.getElementById('fp-res-fsr'), finResEl = document.getElementById('fp-res-fin');

  const c_mps = 299792458; // m / s

  function update() {
    const lMm = parseFloat(lEl.value), rPct = parseFloat(rEl.value), n = parseFloat(nEl.value);
    if (isNaN(lMm) || isNaN(rPct) || isNaN(n) || lMm <= 0 || rPct <= 0 || rPct >= 100 || n <= 0) return;

    const lM = lMm * 1e-3;
    const R = rPct / 100;

    // FSR = c / (2 * n * L)  [Hz]
    const fsrHz = c_mps / (2 * n * lM);
    const fsrGhz = fsrHz / 1e9;

    // Finesse F = (pi * sqrt(R)) / (1 - R)
    const finesse = (Math.PI * Math.sqrt(R)) / (1 - R);
    // Linewidth delta_nu = FSR / Finesse  [Hz]
    const linewidthHz = fsrHz / finesse;
    const linewidthMhz = linewidthHz / 1e6;

    fsrResEl.textContent = (fsrGhz >= 1.0 ? fsrGhz.toFixed(2) + ' GHz' : (fsrGhz * 1000).toFixed(1) + ' MHz') + ' (FSR)';
    finResEl.textContent = 'ℱ = ' + finesse.toFixed(1) + ' Finesse | Δν = ' + linewidthMhz.toFixed(1) + ' MHz FWHM';
  }

  [lEl, rEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();