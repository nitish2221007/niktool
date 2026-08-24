(() => {
  'use strict';
  const maEl = document.getElementById('ce-ma'), mbEl = document.getElementById('ce-mb');
  const sgEl = document.getElementById('ce-sigma'), tEl = document.getElementById('ce-t'), pEl = document.getElementById('ce-p');
  const dabResEl = document.getElementById('ce-res-dab'), dtResEl = document.getElementById('ce-res-details');

  function update() {
    const MA = parseFloat(maEl.value), MB = parseFloat(mbEl.value);
    const sigma = parseFloat(sgEl.value), T = parseFloat(tEl.value), P = parseFloat(pEl.value);

    if (isNaN(MA) || isNaN(MB) || isNaN(sigma) || isNaN(T) || isNaN(P) || MA <= 0 || MB <= 0 || sigma <= 0 || T <= 0 || P <= 0) return;

    // Reduced molecular mass factor: sqrt( 1/MA + 1/MB )
    const mass_factor = Math.sqrt((1.0 / MA) + (1.0 / MB));

    // Collision integral Omega_D approx 1.05 at moderate reduced temperatures:
    const Omega_D = 1.05;

    // Chapman-Enskog formula: D_AB = 1.8583e-3 * ( T^(1.5) * sqrt(1/MA + 1/MB) ) / ( P * sigma^2 * Omega_D )  [cm^2 / s]
    const num = 1.8583e-3 * Math.pow(T, 1.5) * mass_factor;
    const den = P * Math.pow(sigma, 2) * Omega_D;
    const D_AB_cm2_s = num / den;
    const D_AB_m2_s = D_AB_cm2_s * 1e-4;

    const mu_AB = (MA * MB) / (MA + MB);

    dabResEl.textContent = 'D_AB = ' + D_AB_cm2_s.toFixed(3) + ' cm²/s (' + D_AB_m2_s.toExponential(2) + ' m²/s)';
    dtResEl.textContent = 'Collision Ω_D = 1.05 | μ_AB = ' + mu_AB.toFixed(2) + ' g/mol (T=' + T + ' K, P=' + P + ' atm @ σ=' + sigma + ' Å)';
  }

  [maEl, mbEl, sgEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();