(() => {
  'use strict';
  const aaEl = document.getElementById('hw-aa'), abEl = document.getElementById('hw-ab'), bbEl = document.getElementById('hw-bb');
  const fResEl = document.getElementById('hw-res-freq'), cResEl = document.getElementById('hw-res-chi');

  function update() {
    const nAA = parseInt(aaEl.value, 10), nAa = parseInt(abEl.value, 10), naa = parseInt(bbEl.value, 10);
    if (isNaN(nAA) || isNaN(nAa) || isNaN(naa) || nAA < 0 || nAa < 0 || naa < 0) return;

    const N_total = nAA + nAa + naa;
    if (N_total === 0) return;

    const totalAlleles = 2 * N_total;

    // Allele frequency p = ( 2*nAA + nAa ) / ( 2*N )
    const p = ((2 * nAA) + nAa) / totalAlleles;
    const q = 1.0 - p;

    // Expected genotype counts under HWE:
    // Exp(AA) = p^2 * N
    // Exp(Aa) = 2*p*q * N
    // Exp(aa) = q^2 * N
    const expAA = Math.pow(p, 2) * N_total;
    const expAa = 2 * p * q * N_total;
    const expaa = Math.pow(q, 2) * N_total;

    // Chi-square test statistic: sum( (Obs - Exp)^2 / Exp )
    const chi2 = (Math.pow(nAA - expAA, 2) / expAA) + (Math.pow(nAa - expAa, 2) / expAa) + (Math.pow(naa - expaa, 2) / expaa);

    // Critical value for 1 degree of freedom at alpha = 0.05 is 3.841
    let status = '';
    let color = '#22543d';

    if (chi2 <= 3.841) {
      status = 'χ² = ' + chi2.toFixed(3) + ' ≤ 3.841 (IN EQUILIBRIUM: Random mating, no significant selection/drift)';
      color = '#22543d';
    } else {
      status = 'χ² = ' + chi2.toFixed(3) + ' > 3.841 (DEVIATES FROM HWE: Evidence of selection, non-random mating, or migration)';
      color = '#c53030';
    }

    fResEl.textContent = 'p(A) = ' + p.toFixed(3) + ' | q(a) = ' + q.toFixed(3) + ' (Total N = ' + N_total.toLocaleString() + ')';
    cResEl.textContent = status + ' | Expected: ' + expAA.toFixed(0) + ' AA, ' + expAa.toFixed(0) + ' Aa, ' + expaa.toFixed(0) + ' aa';
    cResEl.style.color = color;
  }

  [aaEl, abEl, bbEl].forEach(el => el.addEventListener('input', update));
  update();
})();