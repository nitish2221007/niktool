(() => {
  'use strict';
  const b0El = document.getElementById('lr-b0'), gmEl = document.getElementById('lr-gamma');
  const f0ResEl = document.getElementById('lr-res-f0'), rfResEl = document.getElementById('lr-res-rf');

  const c_light = 2.99792458e8;

  function update() {
    const B0_T = parseFloat(b0El.value), gamma_MHz_T = parseFloat(gmEl.value);
    if (isNaN(B0_T) || isNaN(gamma_MHz_T) || B0_T <= 0 || gamma_MHz_T <= 0) return;

    // Larmor frequency in MHz: f0 = gamma * B0
    const f0_MHz = gamma_MHz_T * B0_T;
    const f0_Hz = f0_MHz * 1e6;

    // RF Wavelength in vacuum: lambda = c / f0  [meters]
    const lambda_m = c_light / f0_Hz;

    // 1 ppm chemical shift in Hz:
    const shift_1ppm_Hz = f0_MHz;

    f0ResEl.textContent = 'Larmor Frequency f₀ = ' + f0_MHz.toFixed(2) + ' MHz';
    rfResEl.textContent = 'RF Wavelength λ = ' + lambda_m.toFixed(2) + ' m (VHF Band) | 1 ppm Shift = ' + shift_1ppm_Hz.toFixed(1) + ' Hz (@ B₀ = ' + B0_T + ' Tesla)';
  }

  b0El.addEventListener('input', update);
  gmEl.addEventListener('input', update);
  update();
})();