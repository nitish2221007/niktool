(() => {
  'use strict';
  const p1El = document.getElementById('ped-p1'), q1El = document.getElementById('ped-q1');
  const p2El = document.getElementById('ped-p2'), q2El = document.getElementById('ped-q2');
  const pedResEl = document.getElementById('ped-res-ped'), trResEl = document.getElementById('ped-res-tr');

  function update() {
    const P1 = parseFloat(p1El.value), Q1 = parseFloat(q1El.value);
    const P2 = parseFloat(p2El.value), Q2 = parseFloat(q2El.value);

    if (isNaN(P1) || isNaN(Q1) || isNaN(P2) || isNaN(Q2) || P1 <= 0 || Q1 <= 0 || P2 <= 0 || Q2 <= 0 || P1 === P2) return;

    // Midpoint formula:
    const deltaQ_pct = (Q2 - Q1) / ((Q1 + Q2) / 2.0);
    const deltaP_pct = (P2 - P1) / ((P1 + P2) / 2.0);

    const PED = deltaQ_pct / deltaP_pct;
    const absPED = Math.abs(PED);

    // Total Revenue: TR1 = P1 * Q1, TR2 = P2 * Q2
    const TR1 = P1 * Q1;
    const TR2 = P2 * Q2;
    const diffTR = TR2 - TR1;

    let classification = '', color = '#22543d';

    if (absPED > 1.05) {
      classification = 'ELASTIC (|PED| > 1.0: Quantity demanded is highly sensitive to price changes)';
      color = '#22543d';
    } else if (absPED < 0.95) {
      classification = 'INELASTIC (|PED| < 1.0: Essential good; raising price increases revenue)';
      color = '#2563eb';
    } else {
      classification = 'UNIT ELASTIC (|PED| ≈ 1.0: Revenue maximized at this price level)';
      color = '#d97706';
    }

    pedResEl.textContent = 'PED = ' + PED.toFixed(2) + ' (' + classification.split(' (')[0] + ')';
    pedResEl.style.color = color;
    trResEl.textContent = 'Total Revenue: $' + Math.round(TR1) + ' -> $' + Math.round(TR2) + ' (' + (diffTR >= 0 ? '+$' : '-$') + Math.abs(Math.round(diffTR)) + ' | ' + (diffTR >= 0 ? 'Revenue Increased' : 'Revenue Decreased') + ')';
    trResEl.style.color = color;
  }

  [p1El, q1El, p2El, q2El].forEach(el => el.addEventListener('input', update));
  update();
})();