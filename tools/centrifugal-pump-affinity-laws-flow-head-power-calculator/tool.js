(() => {
  'use strict';
  const n1El = document.getElementById('pa-n1'), q1El = document.getElementById('pa-q1');
  const h1El = document.getElementById('pa-h1'), p1El = document.getElementById('pa-p1'), n2El = document.getElementById('pa-n2');
  const npResEl = document.getElementById('pa-res-newp'), qhResEl = document.getElementById('pa-res-qh');

  function update() {
    const N1 = parseFloat(n1El.value), Q1 = parseFloat(q1El.value);
    const H1 = parseFloat(h1El.value), P1 = parseFloat(p1El.value), N2 = parseFloat(n2El.value);

    if (isNaN(N1) || isNaN(Q1) || isNaN(H1) || isNaN(P1) || isNaN(N2) || N1 <= 0 || Q1 <= 0 || H1 <= 0 || P1 <= 0 || N2 <= 0) return;

    const ratio = N2 / N1;

    // Affinity Laws:
    // Flow Q2 = Q1 * ratio
    const Q2 = Q1 * ratio;
    // Head H2 = H1 * ratio^2
    const H2 = H1 * Math.pow(ratio, 2);
    // Power P2 = P1 * ratio^3
    const P2 = P1 * Math.pow(ratio, 3);

    const powerSavedPct = ((P1 - P2) / P1) * 100.0;

    npResEl.textContent = 'New Power P₂ = ' + P2.toFixed(2) + ' kW (' + powerSavedPct.toFixed(1) + '% Energy Savings)';
    qhResEl.textContent = 'New Flow Q₂ = ' + Q2.toFixed(1) + ' m³/h | New Head H₂ = ' + H2.toFixed(1) + ' m (Speed Ratio = ' + (ratio * 100).toFixed(0) + '%)';
  }

  [n1El, q1El, h1El, p1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();