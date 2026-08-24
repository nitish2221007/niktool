(() => {
  'use strict';
  const q1El = document.getElementById('gn-q1'), q2El = document.getElementById('gn-q2');
  const q3El = document.getElementById('gn-q3'), q4El = document.getElementById('gn-q4'), q5El = document.getElementById('gn-q5');
  const gnResEl = document.getElementById('gn-res-gini'), dsResEl = document.getElementById('gn-res-desc');

  function update() {
    const q1 = parseFloat(q1El.value) || 0, q2 = parseFloat(q2El.value) || 0;
    const q3 = parseFloat(q3El.value) || 0, q4 = parseFloat(q4El.value) || 0, q5 = parseFloat(q5El.value) || 0;

    const total = q1 + q2 + q3 + q4 + q5;
    if (total <= 0) return;

    // Cumulative income shares (Lorenz points L0, L1, L2, L3, L4, L5):
    const L0 = 0.0;
    const L1 = q1 / total;
    const L2 = (q1 + q2) / total;
    const L3 = (q1 + q2 + q3) / total;
    const L4 = (q1 + q2 + q3 + q4) / total;
    const L5 = 1.0;

    // Area B under Lorenz curve via trapezoidal rule (dx = 0.20):
    const B = 0.20 * (0.5 * L0 + L1 + L2 + L3 + L4 + 0.5 * L5);

    // Gini G = 1 - 2 * B
    const Gini = Math.max(0, Math.min(1.0, 1.0 - (2.0 * B)));

    // Palma ratio = Top 10% (approx q5) / Bottom 40% (q1 + q2)
    const palma = (q1 + q2) > 0 ? (q5 / (q1 + q2)) : 0;

    let tier = '';
    let color = '#22543d';

    if (Gini < 0.30) {
      tier = 'LOW INEQUALITY (Gini < 0.30: Nordic Model - Sweden, Denmark, Norway)';
      color = '#22543d';
    } else if (Gini <= 0.40) {
      tier = 'MODERATE INEQUALITY (Gini 0.30 - 0.40: Western Europe, Canada, Australia)';
      color = '#2563eb';
    } else if (Gini <= 0.50) {
      tier = 'HIGH INEQUALITY (Gini 0.40 - 0.50: United States, India, Mexico)';
      color = '#ea580c';
    } else {
      tier = 'EXTREME INEQUALITY (Gini > 0.50: South Africa, Brazil)';
      color = '#c53030';
    }

    gnResEl.textContent = 'Gini Index = ' + Gini.toFixed(3) + ' (' + tier.split(' (')[0] + ')';
    gnResEl.style.color = color;
    dsResEl.textContent = 'Palma Ratio = ' + palma.toFixed(2) + ' | Lorenz Area B = ' + B.toFixed(3) + ' | ' + tier;
    dsResEl.style.color = color;
  }

  [q1El, q2El, q3El, q4El, q5El].forEach(el => el.addEventListener('input', update));
  update();
})();