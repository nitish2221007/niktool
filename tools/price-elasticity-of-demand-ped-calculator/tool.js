(() => {
  'use strict';
  const p1El = document.getElementById('ped-p1'), q1El = document.getElementById('ped-q1');
  const p2El = document.getElementById('ped-p2'), q2El = document.getElementById('ped-q2');
  const pedResEl = document.getElementById('ped-res-ped'), revResEl = document.getElementById('ped-res-rev');

  function update() {
    const P1 = parseFloat(p1El.value), Q1 = parseFloat(q1El.value);
    const P2 = parseFloat(p2El.value), Q2 = parseFloat(q2El.value);

    if (isNaN(P1) || isNaN(Q1) || isNaN(P2) || isNaN(Q2) || P1 <= 0 || Q1 <= 0 || P2 <= 0 || Q2 <= 0 || P1 === P2) return;

    // Midpoint Arc formula:
    // %dQ = (Q2 - Q1) / ((Q1 + Q2) / 2)
    // %dP = (P2 - P1) / ((P1 + P2) / 2)
    const pctDQ = (Q2 - Q1) / ((Q1 + Q2) / 2);
    const pctDP = (P2 - P1) / ((P1 + P2) / 2);
    const pedRaw = pctDQ / pctDP;
    const absPed = Math.abs(pedRaw);

    const rev1 = P1 * Q1;
    const rev2 = P2 * Q2;
    const revDiff = rev2 - rev1;
    const revPct = (revDiff / rev1) * 100;

    let elasticDesc = '';
    if (absPed > 1.05) elasticDesc = ' (Elastic Demand: |PED| > 1)';
    else if (absPed < 0.95) elasticDesc = ' (Inelastic Demand: |PED| < 1)';
    else elasticDesc = ' (Unitary Elastic: |PED| ≈ 1)';

    pedResEl.textContent = '|PED| = ' + absPed.toFixed(2) + elasticDesc;

    if (revDiff > 0) {
      revResEl.textContent = 'Revenue Rises +$' + Math.round(revDiff).toLocaleString() + ' (+' + revPct.toFixed(1) + '%)';
      revResEl.style.color = '#22543d';
    } else if (revDiff < 0) {
      revResEl.textContent = 'Revenue Drops -$' + Math.round(Math.abs(revDiff)).toLocaleString() + ' (' + revPct.toFixed(1) + '%)';
      revResEl.style.color = '#c53030';
    } else {
      revResEl.textContent = 'Revenue Unchanged (Total Revenue Maximized)';
      revResEl.style.color = '#2563eb';
    }
  }

  [p1El, q1El, p2El, q2El].forEach(el => el.addEventListener('input', update));
  update();
})();