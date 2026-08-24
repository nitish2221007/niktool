(() => {
  'use strict';
  const p1El = document.getElementById('sy-p1'), p2El = document.getElementById('sy-p2');
  const snResEl = document.getElementById('sy-res-syn'), wnResEl = document.getElementById('sy-res-window');

  function update() {
    const P1 = parseFloat(p1El.value), P2 = parseFloat(p2El.value);
    if (isNaN(P1) || isNaN(P2) || P1 <= 0 || P2 <= 0 || P1 === P2) return;

    // 1 / P_syn = | 1/P1 - 1/P2 |
    const diff = Math.abs((1.0 / P1) - (1.0 / P2));
    const P_syn_yr = 1.0 / diff;
    const P_syn_days = P_syn_yr * 365.256;
    const P_syn_months = P_syn_yr * 12.0;

    snResEl.textContent = 'Synodic Period P_syn = ' + P_syn_yr.toFixed(3) + ' Years (' + Math.round(P_syn_days) + ' Days)';
    wnResEl.textContent = 'Alignment repeats every ' + P_syn_months.toFixed(1) + ' Months (' + Math.round(P_syn_days) + ' Days between successive close approaches)';
  }

  p1El.addEventListener('input', update);
  p2El.addEventListener('input', update);
  update();
})();