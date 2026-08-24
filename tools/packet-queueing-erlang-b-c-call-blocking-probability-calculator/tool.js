(() => {
  'use strict';
  const aEl = document.getElementById('er-a'), cEl = document.getElementById('er-c');
  const ebResEl = document.getElementById('er-res-eb'), ecResEl = document.getElementById('er-res-ec');

  function erlangB(c, A) {
    let B = 1.0;
    for (let k = 1; k <= c; k++) {
      B = (A * B) / (k + (A * B));
    }
    return B;
  }

  function erlangC(c, A) {
    const B = erlangB(c, A);
    const rho = A / c;
    if (rho >= 1.0) return 1.0;
    return B / (1.0 - rho + (rho * B));
  }

  function update() {
    const A = parseFloat(aEl.value), c = parseInt(cEl.value, 10);
    if (isNaN(A) || isNaN(c) || A <= 0 || c < 1) return;

    const B_prob = erlangB(c, A);
    const B_pct = B_prob * 100.0;

    const C_prob = erlangC(c, A);
    const C_pct = Math.min(100.0, C_prob * 100.0);

    const carried = A * (1.0 - B_prob);
    const blocked = A * B_prob;

    let gos = '';
    let color = '#22543d';

    if (B_pct <= 1.0) {
      gos = 'EXCELLENT (GoS ≤ 1%: Enterprise Grade Telco Quality)';
      color = '#22543d';
    } else if (B_pct <= 5.0) {
      gos = 'STANDARD (GoS 1-5%: Standard Cellular / Call Center Dimensioning)';
      color = '#22543d';
    } else {
      gos = 'CONGESTED (GoS > 5%: High dropped calls, add more trunks/agents!)';
      color = '#c53030';
    }

    ebResEl.textContent = 'Erlang B Blocking = ' + B_pct.toFixed(2) + '% (' + gos.split(' (')[0] + ')';
    ebResEl.style.color = color;
    ecResEl.textContent = 'Erlang C Delay = ' + C_pct.toFixed(2) + '% | Carried = ' + carried.toFixed(2) + ' Erlangs (Blocked: ' + blocked.toFixed(2) + ' Erlangs @ c = ' + c + ')';
    ecResEl.style.color = color;
  }

  aEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  update();
})();