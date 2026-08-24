(() => {
  'use strict';
  const xaEl = document.getElementById('ra-xa'), paEl = document.getElementById('ra-pa'), pbEl = document.getElementById('ra-pb');
  const totResEl = document.getElementById('ra-res-tot'), vapResEl = document.getElementById('ra-res-vap');

  function update() {
    const x_A = parseFloat(xaEl.value), P_A_pure = parseFloat(paEl.value), P_B_pure = parseFloat(pbEl.value);
    if (isNaN(x_A) || isNaN(P_A_pure) || isNaN(P_B_pure) || x_A < 0 || x_A > 1 || P_A_pure <= 0 || P_B_pure <= 0) return;

    const x_B = 1.0 - x_A;

    // Raoult's Law: P_A = x_A * P_A*, P_B = x_B * P_B*
    const P_A = x_A * P_A_pure;
    const P_B = x_B * P_B_pure;

    // Dalton's Law of Partial Pressures: P_total = P_A + P_B
    const P_total = P_A + P_B;

    // Vapor phase mole fraction: y_A = P_A / P_total
    const y_A = P_total > 0 ? (P_A / P_total) : 0;
    const y_B = 1.0 - y_A;

    // Relative volatility alpha = (y_A / x_A) / (y_B / x_B) = P_A* / P_B*
    const alpha = P_A_pure / P_B_pure;

    totResEl.textContent = 'P_total = ' + P_total.toFixed(2) + ' kPa (P_A: ' + P_A.toFixed(1) + ' + P_B: ' + P_B.toFixed(1) + ' kPa)';
    vapResEl.textContent = 'Vapor y_A = ' + y_A.toFixed(3) + ' (' + (y_A * 100).toFixed(1) + '% A) | Relative Volatility α = ' + alpha.toFixed(2) + ' (Enriched from ' + (x_A * 100).toFixed(1) + '% liquid)';
  }

  [xaEl, paEl, pbEl].forEach(el => el.addEventListener('input', update));
  update();
})();