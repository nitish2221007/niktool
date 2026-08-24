(() => {
  'use strict';
  const lEl = document.getElementById('pl-lambda'), tEl = document.getElementById('pl-temp');
  const bResEl = document.getElementById('pl-res-b'), qResEl = document.getElementById('pl-res-quant');

  const h = 6.62607015e-34, c = 299792458, k_B = 1.380649e-23;

  function update() {
    const lambda_nm = parseFloat(lEl.value), T = parseFloat(tEl.value);
    if (isNaN(lambda_nm) || isNaN(T) || lambda_nm <= 0 || T <= 0) return;

    const lambda_m = lambda_nm * 1e-9;

    // Planck's Law: B_lambda = (2 * h * c^2) / ( lambda^5 * ( exp( (h*c)/(lambda * k_B * T) ) - 1 ) )
    const expTerm = (h * c) / (lambda_m * k_B * T);
    const expValue = Math.exp(expTerm);

    const B_lambda = (2.0 * h * Math.pow(c, 2)) / (Math.pow(lambda_m, 5) * (expValue - 1.0));

    // Classical Rayleigh-Jeans: B_RJ = 2 * c * k_B * T / lambda^4
    const B_RJ = (2.0 * c * k_B * T) / Math.pow(lambda_m, 4);
    const rj_ratio = B_RJ / B_lambda;

    bResEl.textContent = 'Radiance B_λ = ' + B_lambda.toExponential(2) + ' W / (sr · m³)';
    qResEl.textContent = 'B_λ = ' + (B_lambda / 1e12).toFixed(2) + ' kW/(sr·m²·nm) | Rayleigh-Jeans Error = ' + (rj_ratio >= 10 ? Math.round(rj_ratio) + '× Divergence' : rj_ratio.toFixed(2) + '×');
  }

  lEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();