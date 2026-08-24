(() => {
  'use strict';
  const cEl = document.getElementById('bl-c'), rEl = document.getElementById('bl-r');
  const p1El = document.getElementById('bl-p1'), p2El = document.getElementById('bl-p2');
  const p3El = document.getElementById('bl-p3'), p4El = document.getElementById('bl-p4');
  const blResEl = document.getElementById('bl-res-bleu'), bpResEl = document.getElementById('bl-res-bp');

  function update() {
    const c = parseFloat(cEl.value), r = parseFloat(rEl.value);
    const p1 = parseFloat(p1El.value), p2 = parseFloat(p2El.value);
    const p3 = parseFloat(p3El.value), p4 = parseFloat(p4El.value);

    if (isNaN(c) || isNaN(r) || isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(p4) || c <= 0 || r <= 0 || p1 <= 0 || p2 <= 0 || p3 <= 0 || p4 <= 0) return;

    // Brevity Penalty: BP = 1 if c > r else exp(1 - r/c)
    const BP = c > r ? 1.0 : Math.exp(1.0 - (r / c));

    // Geometric mean of 4-gram precisions: exp( 0.25 * (ln p1 + ln p2 + ln p3 + ln p4) )
    const log_mean = 0.25 * (Math.log(p1) + Math.log(p2) + Math.log(p3) + Math.log(p4));
    const geom_mean = Math.exp(log_mean);

    const BLEU = BP * geom_mean * 100.0;

    let qual = '', color = '#22543d';
    if (BLEU >= 50.0) { qual = 'VERY HIGH QUALITY (Fluent & accurate)'; color = '#22543d'; }
    else if (BLEU >= 40.0) { qual = 'HIGH QUALITY (Readable & mostly accurate)'; color = '#22543d'; }
    else if (BLEU >= 30.0) { qual = 'UNDERSTANDABLE (Acceptable translation)'; color = '#ea580c'; }
    else if (BLEU >= 20.0) { qual = 'ROUGH TRANSLATION (Substantial errors)'; color = '#ea580c'; }
    else { qual = 'POOR QUALITY (Hard to understand)'; color = '#c53030'; }

    blResEl.textContent = 'BLEU-4 Score = ' + BLEU.toFixed(1) + ' (' + qual.split(' (')[0] + ')';
    blResEl.style.color = color;
    bpResEl.textContent = 'Brevity Penalty BP = ' + BP.toFixed(3) + ' | Geometric Mean Precision = ' + (geom_mean * 100).toFixed(1) + '% (c=' + c + ', r=' + r + ')';
  }

  [cEl, rEl, p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('input', update));
  update();
})();