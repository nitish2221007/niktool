(() => {
  'use strict';
  const lEl = document.getElementById('fp-len'), rEl = document.getElementById('fp-r'), nEl = document.getElementById('fp-n');
  const fsrResEl = document.getElementById('fp-res-fsr'), finResEl = document.getElementById('fp-res-fin');

  const c_light = 299792458; // m / s

  function update() {
    const L_mm = parseFloat(lEl.value), R = parseFloat(rEl.value), n_idx = parseFloat(nEl.value);
    if (isNaN(L_mm) || isNaN(R) || isNaN(n_idx) || L_mm <= 0 || R <= 0 || R >= 1.0 || n_idx <= 0) return;

    const L_m = L_mm * 1e-3;

    // Free Spectral Range FSR = c / ( 2 * n * L )  [Hz -> GHz]
    const FSR_hz = c_light / (2.0 * n_idx * L_m);
    const FSR_ghz = FSR_hz / 1e9;

    // Cavity finesse script F = ( pi * sqrt(R) ) / ( 1 - R )
    const Finesse = (Math.PI * Math.sqrt(R)) / (1.0 - R);

    // Resonance Full-Width at Half-Maximum linewidth delta_nu = FSR / Finesse  [MHz]
    const linewidth_hz = FSR_hz / Finesse;
    const linewidth_mhz = linewidth_hz / 1e6;

    // Photon cavity lifetime tau_c = 1 / ( 2 * pi * delta_nu )  [ns]
    const tau_c_ns = (1.0 / (2.0 * Math.PI * linewidth_hz)) * 1e9;

    fsrResEl.textContent = 'FSR = ' + FSR_ghz.toFixed(2) + ' GHz (Optical Spacing)';
    finResEl.textContent = 'Finesse ℱ = ' + Finesse.toFixed(1) + ' | Linewidth Δν = ' + linewidth_mhz.toFixed(1) + ' MHz (Photon Lifetime τ_c = ' + tau_c_ns.toFixed(2) + ' ns @ R = ' + (R*100).toFixed(1) + '%)';
  }

  [lEl, rEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();