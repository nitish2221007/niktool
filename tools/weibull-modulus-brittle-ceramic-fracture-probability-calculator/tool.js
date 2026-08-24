(() => {
  'use strict';
  const sEl = document.getElementById('wb-s'), s0El = document.getElementById('wb-s0'), mEl = document.getElementById('wb-m');
  const pfResEl = document.getElementById('wb-res-pf'), dsResEl = document.getElementById('wb-res-desc');

  function update() {
    const sigma = parseFloat(sEl.value), sigma_0 = parseFloat(s0El.value), m = parseFloat(mEl.value);
    if (isNaN(sigma) || isNaN(sigma_0) || isNaN(m) || sigma < 0 || sigma_0 <= 0 || m <= 0) return;

    // Weibull cumulative failure probability: P_f = 1 - exp( - (sigma / sigma_0)^m )
    const ratio = sigma / sigma_0;
    const P_f = 1.0 - Math.exp(-Math.pow(ratio, m));
    const P_f_pct = P_f * 100.0;
    const R_pct = (1.0 - P_f) * 100.0;

    let qual = '', color = '#22543d';
    if (m >= 15.0) qual = 'EXCELLENT UNIFORMITY (m ≥ 15: Low flaw scatter, engineered ceramic)';
    else if (m >= 8.0) qual = 'GOOD STRUCTURAL CERAMIC (m = 8 - 14: Si₃N₄, SiC, Al₂O₃)';
    else qual = 'BROAD FLAW DISTRIBUTION (m < 8: High scatter, traditional pottery/glass)';

    pfResEl.textContent = 'Failure P_f = ' + P_f_pct.toFixed(2) + '% (Survival R = ' + R_pct.toFixed(2) + '%)';
    dsResEl.textContent = qual + ' [σ = ' + sigma + ' MPa vs σ₀ = ' + sigma_0 + ' MPa @ m = ' + m + ']';
  }

  [sEl, s0El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();