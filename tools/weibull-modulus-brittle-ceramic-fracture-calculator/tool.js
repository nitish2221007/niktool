(() => {
  'use strict';
  const sigEl = document.getElementById('wb-sig'), s0El = document.getElementById('wb-sig0'), mEl = document.getElementById('wb-m');
  const pfResEl = document.getElementById('wb-res-pf'), sfResEl = document.getElementById('wb-res-safe');

  function update() {
    const sigma = parseFloat(sigEl.value), sigma0 = parseFloat(s0El.value), m = parseFloat(mEl.value);
    if (isNaN(sigma) || isNaN(sigma0) || isNaN(m) || sigma <= 0 || sigma0 <= 0 || m <= 0) return;

    // Weibull two-parameter failure probability: P_f = 1 - exp( -(sigma / sigma0)^m )
    const stressRatio = sigma / sigma0;
    const exponent = Math.pow(stressRatio, m);
    const P_f = 1.0 - Math.exp(-exponent);
    const P_f_pct = P_f * 100;
    const reliability_pct = (1.0 - P_f) * 100;

    // Allowable stress for 1 ppm failure (P_f = 1e-6): sigma_safe = sigma0 * ( -ln(1 - 1e-6) )^(1/m) approx sigma0 * (1e-6)^(1/m)
    const sigma_safe_ppm = sigma0 * Math.pow(1e-6, 1.0 / m);

    let statClass = '';
    let color = '#22543d';

    if (P_f <= 0.01) {
      statClass = 'HIGH RELIABILITY (Failure risk < 1%): Safe structural design zone';
      color = '#22543d';
    } else if (P_f <= 0.10) {
      statClass = 'MODERATE RISK (1% - 10% Failure): Requires proof testing or proof stress screening';
      color = '#d97706';
    } else {
      statClass = 'UNSAFE / HIGH FAILURE RISK (>10% Failure): Catastrophic brittle fracture likely!';
      color = '#c53030';
    }

    pfResEl.textContent = 'P_f = ' + (P_f_pct < 0.01 ? P_f.toExponential(2) : P_f_pct.toFixed(2) + '%') + ' (Survival: ' + reliability_pct.toFixed(2) + '%)';
    pfResEl.style.color = color;
    sfResEl.textContent = 'Safe Stress for 1 PPM Failure: σ = ' + sigma_safe_ppm.toFixed(1) + ' MPa | ' + statClass;
  }

  [sigEl, s0El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();