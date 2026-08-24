(() => {
  'use strict';
  const l0El = document.getElementById('cpt-lambda'), thEl = document.getElementById('cpt-theta');
  const dlResEl = document.getElementById('cpt-res-dlam'), lpResEl = document.getElementById('cpt-res-prime'), keResEl = document.getElementById('cpt-res-ke');

  const lambdaC = 2.42631023867; // Compton wavelength in picometers (pm)
  const hc_keV_pm = 1239.841984; // h*c in keV * pm

  function update() {
    const l0Pm = parseFloat(l0El.value), deg = parseFloat(thEl.value);
    if (isNaN(l0Pm) || isNaN(deg) || l0Pm <= 0) return;

    const rad = (deg * Math.PI) / 180;
    // Delta_lambda = lambda_c * (1 - cos(theta))  [pm]
    const deltaLambda = lambdaC * (1 - Math.cos(rad));
    const lambdaPrime = l0Pm + deltaLambda;

    // Energies: E = hc / lambda
    const e0 = hc_keV_pm / l0Pm;
    const ePrime = hc_keV_pm / lambdaPrime;
    const recoilKe = e0 - ePrime;

    dlResEl.textContent = '+' + deltaLambda.toFixed(3) + ' pm';
    lpResEl.textContent = lambdaPrime.toFixed(3) + ' pm (' + ePrime.toFixed(2) + ' keV)';
    keResEl.textContent = recoilKe.toFixed(2) + ' keV Recoil Energy';
  }

  l0El.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();