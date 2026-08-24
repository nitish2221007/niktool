(() => {
  'use strict';
  const hEl = document.getElementById('as-h'), glEl = document.getElementById('as-gl'), ntuEl = document.getElementById('as-ntu');
  const efResEl = document.getElementById('as-res-eff'), rResEl = document.getElementById('as-res-r');

  function update() {
    const H_prime = parseFloat(hEl.value), G_over_L = parseFloat(glEl.value), NTU = parseFloat(ntuEl.value);
    if (isNaN(H_prime) || isNaN(G_over_L) || isNaN(NTU) || H_prime <= 0 || G_over_L <= 0 || NTU <= 0) return;

    // Stripping factor: R = H_prime * (G / L)
    const R = H_prime * G_over_L;

    if (R <= 1.0) {
      efResEl.textContent = 'POOR REMOVAL (Stripping Factor R ≤ 1.0)';
      efResEl.style.color = '#c53030';
      rResEl.textContent = 'R = ' + R.toFixed(2) + ' (Insufficient air flow G/L: Gas becomes saturated with VOC)';
      return;
    }

    // Onda / Treybal removal efficiency formula for packed tower:
    // Fraction remaining: C_out / C_in = (R - 1) / ( R * exp( NTU * (R - 1) / R ) - 1 )
    const num = R - 1.0;
    const den = (R * Math.exp(NTU * (R - 1.0) / R)) - 1.0;
    const frac_remaining = num / den;

    const removal_eff_pct = (1.0 - frac_remaining) * 100.0;

    efResEl.textContent = 'Removal η = ' + removal_eff_pct.toFixed(2) + '%';
    efResEl.style.color = '#22543d';
    rResEl.textContent = 'Stripping Factor R = ' + R.toFixed(2) + ' | NTU = ' + NTU + ' (Air/Water G/L = ' + G_over_L + ', H'=' + H_prime + ')';
  }

  [hEl, glEl, ntuEl].forEach(el => el.addEventListener('input', update));
  update();
})();