(() => {
  'use strict';
  const vEl = document.getElementById('hr-vol'), rEl = document.getElementById('hr-rad'), lEl = document.getElementById('hr-len');
  const f0ResEl = document.getElementById('hr-res-f0'), crResEl = document.getElementById('hr-res-corr');

  const c_sound = 343.0; // m / s @ 20°C

  function update() {
    const vLiters = parseFloat(vEl.value), rMm = parseFloat(rEl.value), lMm = parseFloat(lEl.value);
    if (isNaN(vLiters) || isNaN(rMm) || isNaN(lMm) || vLiters <= 0 || rMm <= 0 || lMm < 0) return;

    const VM3 = vLiters * 1e-3;
    const rM = rMm * 1e-3;
    const lM = lMm * 1e-3;

    // Cross-sectional neck area A = pi * r^2  [m^2]
    const Area = Math.PI * Math.pow(rM, 2);

    // End correction: Delta_L = 0.85 * r (one end) or 1.6 * r (both ends flanged/open)
    const endCorrectionM = 1.6 * rM;
    const Leff_m = lM + endCorrectionM;
    const Leff_mm = Leff_m * 1000;

    // Helmholtz frequency: f0 = ( c / (2 * pi) ) * sqrt( A / ( V * Leff ) )  [Hz]
    const f0 = (c_sound / (2 * Math.PI)) * Math.sqrt(Area / (VM3 * Leff_m));

    f0ResEl.textContent = 'f₀ = ' + f0.toFixed(1) + ' Hz (Acoustic Resonance)';
    crResEl.textContent = 'L_eff = ' + Leff_mm.toFixed(1) + ' mm (Neck L: ' + lMm + ' mm + End Correction: ' + (endCorrectionM*1000).toFixed(1) + ' mm, Area A = ' + (Area*1e4).toFixed(1) + ' cm²)';
  }

  [vEl, rEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();