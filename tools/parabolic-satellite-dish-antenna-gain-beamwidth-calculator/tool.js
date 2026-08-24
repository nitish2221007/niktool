(() => {
  'use strict';
  const dEl = document.getElementById('ds-d'), fEl = document.getElementById('ds-f'), etEl = document.getElementById('ds-eta');
  const gResEl = document.getElementById('ds-res-g'), bwResEl = document.getElementById('ds-res-bw');

  const c_light = 2.99792458e8;

  function update() {
    const D_m = parseFloat(dEl.value), f_GHz = parseFloat(fEl.value), eta = parseFloat(etEl.value);
    if (isNaN(D_m) || isNaN(f_GHz) || isNaN(eta) || D_m <= 0 || f_GHz <= 0 || eta <= 0 || eta > 1) return;

    // Wavelength: lambda = c / f  [m]
    const f_Hz = f_GHz * 1e9;
    const lambda_m = c_light / f_Hz;
    const lambda_cm = lambda_m * 100.0;

    // Linear Gain: G_lin = eta * ( pi * D / lambda )^2
    const G_lin = eta * Math.pow(Math.PI * D_m / lambda_m, 2);
    const G_dBi = 10.0 * Math.log10(G_lin);

    // 3-dB Half-power beamwidth in degrees: theta_3dB = 70 * lambda / D
    const theta_3dB_deg = 70.0 * (lambda_m / D_m);

    gResEl.textContent = 'Antenna Gain G = ' + G_dBi.toFixed(2) + ' dBi (' + Math.round(G_lin).toLocaleString() + '×)';
    bwResEl.textContent = '3-dB Beamwidth θ = ' + theta_3dB_deg.toFixed(2) + '° | λ = ' + lambda_cm.toFixed(2) + ' cm (D=' + D_m + ' m @ ' + f_GHz + ' GHz)';
  }

  [dEl, fEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();