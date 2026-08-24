(() => {
  'use strict';
  const curEl = document.getElementById('fin-cur'), tgtEl = document.getElementById('fin-tgt'), wtEl = document.getElementById('fin-wt');
  const ndResEl = document.getElementById('fin-res-need'), mgResEl = document.getElementById('fin-res-msg');

  function update() {
    const cur = parseFloat(curEl.value), tgt = parseFloat(tgtEl.value), wt = parseFloat(wtEl.value);
    if (isNaN(cur) || isNaN(tgt) || isNaN(wt) || wt <= 0 || wt > 100) return;

    const w_final = wt / 100.0;
    const w_current = 1.0 - w_final;

    // Formula: G_needed = ( G_target - G_current * w_current ) / w_final
    const needed = (tgt - (cur * w_current)) / w_final;

    let msg = '';
    let color = '#22543d';

    if (needed <= 0) {
      msg = 'YOU ALREADY SECURED THIS GRADE: Even with a 0% on the final, your grade will be at least ' + (cur * w_current).toFixed(1) + '%!';
      color = '#22543d';
    } else if (needed <= 70.0) {
      msg = 'EASILY ACHIEVABLE: Scoring a ' + needed.toFixed(1) + '% (C- range) secures your ' + tgt + '% target';
      color = '#22543d';
    } else if (needed <= 90.0) {
      msg = 'REALISTIC TARGET: Scoring ' + needed.toFixed(1) + '% (B+/A- range) secures your ' + tgt + '% target';
      color = '#2563eb';
    } else if (needed <= 100.0) {
      msg = 'HIGH PRESSURE: You need ' + needed.toFixed(1) + '% on the final. Intensive study recommended!';
      color = '#d97706';
    } else {
      msg = 'MATHEMATICALLY IMPOSSIBLE (Need ' + needed.toFixed(1) + '%): Max attainable grade with 100% on final is ' + ((cur * w_current) + (100 * w_final)).toFixed(1) + '%';
      color = '#c53030';
    }

    ndResEl.textContent = 'Need ' + needed.toFixed(2) + '% on Final';
    ndResEl.style.color = color;
    mgResEl.textContent = msg;
    mgResEl.style.color = color;
  }

  [curEl, tgtEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();