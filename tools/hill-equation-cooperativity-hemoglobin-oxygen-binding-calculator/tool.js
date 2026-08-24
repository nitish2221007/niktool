(() => {
  'use strict';
  const po2El = document.getElementById('hl-po2'), p50El = document.getElementById('hl-p50'), nEl = document.getElementById('hl-n');
  const satResEl = document.getElementById('hl-res-sat'), evResEl = document.getElementById('hl-res-eval');

  function update() {
    const pO2 = parseFloat(po2El.value), P50 = parseFloat(p50El.value), n = parseFloat(nEl.value);
    if (isNaN(pO2) || isNaN(P50) || isNaN(n) || pO2 < 0 || P50 <= 0 || n <= 0) return;

    const po2_n = Math.pow(pO2, n);
    const p50_n = Math.pow(P50, n);
    const theta = po2_n / (p50_n + po2_n);
    const sat_pct = theta * 100.0;

    let coop = '', color = '#22543d';
    if (n > 1.05) {
      coop = 'POSITIVE COOPERATIVITY (n=' + n + ' > 1: Sigmoidal Binding Curve)';
      color = '#22543d';
    } else if (n < 0.95) {
      coop = 'NEGATIVE COOPERATIVITY (n=' + n + ' < 1: Decreasing Affinity)';
      color = '#ea580c';
    } else {
      coop = 'NON-COOPERATIVE INDEPENDENT SITES (n=1.0: Hyperbolic Myoglobin Binding)';
      color = '#22543d';
    }

    satResEl.textContent = 'Saturation SO₂ = ' + sat_pct.toFixed(1) + '% (Fraction θ = ' + theta.toFixed(3) + ')';
    evResEl.textContent = coop + ' [pO₂ = ' + pO2 + ' mmHg @ P₅₀ = ' + P50 + ' mmHg]';
    evResEl.style.color = color;
  }

  [po2El, p50El, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();