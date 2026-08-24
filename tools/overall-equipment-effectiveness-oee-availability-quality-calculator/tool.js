(() => {
  'use strict';
  const aEl = document.getElementById('oee-a'), pEl = document.getElementById('oee-p'), qEl = document.getElementById('oee-q');
  const oeeResEl = document.getElementById('oee-res-val'), lsResEl = document.getElementById('oee-res-loss');

  function update() {
    const A_pct = parseFloat(aEl.value), P_pct = parseFloat(pEl.value), Q_pct = parseFloat(qEl.value);
    if (isNaN(A_pct) || isNaN(P_pct) || isNaN(Q_pct) || A_pct <= 0 || P_pct <= 0 || Q_pct <= 0) return;

    // OEE = (A / 100) * (P / 100) * (Q / 100) * 100
    const A = A_pct / 100;
    const P = P_pct / 100;
    const Q = Q_pct / 100;
    const OEE = A * P * Q * 100;

    let benchmark = '';
    let color = '#22543d';

    if (OEE >= 85.0) {
      benchmark = 'WORLD CLASS OEE (≥85%: Top-tier lean manufacturing benchmark)';
      color = '#22543d';
    } else if (OEE >= 70.0) {
      benchmark = 'TYPICAL GOOD PERFORMANCE (70 - 84%: Stable plant operations)';
      color = '#2563eb';
    } else if (OEE >= 50.0) {
      benchmark = 'LOW OEE (50 - 69%: Significant hidden capacity opportunities in changeover & speed)';
      color = '#d97706';
    } else {
      benchmark = 'CRITICAL LOSSES (<50%: Major unmanaged downtime bottlenecks)';
      color = '#c53030';
    }

    oeeResEl.textContent = 'OEE = ' + OEE.toFixed(1) + '% (' + benchmark + ')';
    oeeResEl.style.color = color;
    lsResEl.textContent = 'Unutilized Loss: ' + (100 - OEE).toFixed(1) + '% (A: ' + A_pct + '%, P: ' + P_pct + '%, Q: ' + Q_pct + '%)';
  }

  [aEl, pEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();