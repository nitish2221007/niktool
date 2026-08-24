(() => {
  'use strict';
  const zinEl = document.getElementById('qwt-zin'), zlEl = document.getElementById('qwt-zl');
  const fEl = document.getElementById('qwt-freq'), erEl = document.getElementById('qwt-er');
  const z0ResEl = document.getElementById('qwt-res-z0'), lResEl = document.getElementById('qwt-res-len');

  const c_light = 299792458; // m / s

  function update() {
    const Zin = parseFloat(zinEl.value), Zl = parseFloat(zlEl.value);
    const fGhz = parseFloat(fEl.value), eps_r = parseFloat(erEl.value);

    if (isNaN(Zin) || isNaN(Zl) || isNaN(fGhz) || isNaN(eps_r) || Zin <= 0 || Zl <= 0 || fGhz <= 0 || eps_r < 1.0) return;

    const fHz = fGhz * 1e9;

    // Matching section impedance Z0 = sqrt( Zin * Zl )  [Ohms]
    const Z0 = Math.sqrt(Zin * Zl);

    // Effective dielectric constant approximation for microstrip: eps_eff approx = (eps_r + 1)/2 + (eps_r - 1)/2 * (1 / sqrt(1 + 12*h/w))
    // Approximate eps_eff ~ 0.7 * eps_r + 0.3
    const eps_eff = (0.70 * eps_r) + 0.30;

    // Guided wavelength lambda_g = c / ( f * sqrt(eps_eff) )  [meters]
    const lambda_g_m = c_light / (fHz * Math.sqrt(eps_eff));
    const lambda_g_mm = lambda_g_m * 1000;

    // Quarter-wave length L = lambda_g / 4  [mm]
    const length_mm = lambda_g_mm / 4;

    z0ResEl.textContent = 'Z₀ = ' + Z0.toFixed(2) + ' Ω Matching Line';
    lResEl.textContent = 'Length λ/4 = ' + length_mm.toFixed(2) + ' mm (λ_g = ' + lambda_g_mm.toFixed(1) + ' mm | Perfect Match Γ = 0, VSWR = 1.00 @ ' + fGhz + ' GHz)';
  }

  [zinEl, zlEl, fEl, erEl].forEach(el => el.addEventListener('input', update));
  update();
})();