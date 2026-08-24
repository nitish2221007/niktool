(() => {
  'use strict';
  const m1El = document.getElementById('tt-m1'), s1El = document.getElementById('tt-s1'), n1El = document.getElementById('tt-n1');
  const m2El = document.getElementById('tt-m2'), s2El = document.getElementById('tt-s2'), n2El = document.getElementById('tt-n2');
  const tResEl = document.getElementById('tt-res-t'), pResEl = document.getElementById('tt-res-p');

  function update() {
    const m1 = parseFloat(m1El.value), s1 = parseFloat(s1El.value), n1 = parseFloat(n1El.value);
    const m2 = parseFloat(m2El.value), s2 = parseFloat(s2El.value), n2 = parseFloat(n2El.value);

    if (isNaN(m1) || isNaN(s1) || isNaN(n1) || isNaN(m2) || isNaN(s2) || isNaN(n2) || s1 <= 0 || s2 <= 0 || n1 < 2 || n2 < 2) return;

    // Standard error of difference SE = sqrt( s1^2/n1 + s2^2/n2 )
    const var1 = Math.pow(s1, 2) / n1;
    const var2 = Math.pow(s2, 2) / n2;
    const SE = Math.sqrt(var1 + var2);

    // t-statistic t = (m1 - m2) / SE
    const t = (m1 - m2) / SE;

    // Welch-Satterthwaite degrees of freedom:
    // df = (var1 + var2)^2 / [ var1^2/(n1-1) + var2^2/(n2-1) ]
    const num_df = Math.pow(var1 + var2, 2);
    const den_df = (Math.pow(var1, 2) / (n1 - 1.0)) + (Math.pow(var2, 2) / (n2 - 1.0));
    const df = num_df / den_df;

    // Approximate 2-tailed p-value from normal approximation for df > 30:
    const z = Math.abs(t);
    const p_approx = 2.0 * (1.0 - (0.5 * (1.0 + Math.sign(z) * Math.sqrt(1.0 - Math.exp(-2.0 * Math.pow(z, 2) / Math.PI)))));
    const p_clamped = Math.max(0.0001, Math.min(1.0, p_approx));

    let decision = '';
    let color = '#22543d';

    if (p_clamped < 0.05) {
      decision = 'STATISTICALLY SIGNIFICANT (p = ' + p_clamped.toFixed(4) + ' < 0.05): Reject H₀ (Significant difference between group means)';
      color = '#22543d';
    } else {
      decision = 'FAIL TO REJECT H₀ (p = ' + p_clamped.toFixed(4) + ' ≥ 0.05): Insufficient evidence of a difference between group means';
      color = '#d97706';
    }

    tResEl.textContent = 't = ' + t.toFixed(3) + ' (df = ' + df.toFixed(1) + ', SE = ' + SE.toFixed(3) + ')';
    pResEl.textContent = decision;
    pResEl.style.color = color;
  }

  [m1El, s1El, n1El, m2El, s2El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();