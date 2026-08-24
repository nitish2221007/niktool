(() => {
  'use strict';
  const canEl = document.getElementById('wd-can'), parEl = document.getElementById('wd-par');
  const bedEl = document.getElementById('wd-bed'), tenEl = document.getElementById('wd-ten');
  const legEl = document.getElementById('wd-leg'), calfEl = document.getElementById('wd-calf');
  const pitEl = document.getElementById('wd-pit'), collEl = document.getElementById('wd-coll');
  const altEl = document.getElementById('wd-alt');
  const scResEl = document.getElementById('wd-res-score'), prResEl = document.getElementById('wd-res-prob');

  function update() {
    let score = 0;
    if (canEl.checked) score += 1;
    if (parEl.checked) score += 1;
    if (bedEl.checked) score += 1;
    if (tenEl.checked) score += 1;
    if (legEl.checked) score += 1;
    if (calfEl.checked) score += 1;
    if (pitEl.checked) score += 1;
    if (collEl.checked) score += 1;
    if (altEl.checked) score -= 2;

    let prob = '', color = '#22543d';
    if (score <= 1) {
      prob = 'DVT UNLIKELY (~5% Pretest Prevalence: D-dimer test can safely rule out DVT without ultrasound)';
      color = '#22543d';
    } else {
      prob = 'DVT LIKELY (≥ 2 Points / ~28% Prevalence: Order urgent Lower Extremity Duplex Ultrasound)';
      color = '#c53030';
    }

    scResEl.textContent = 'Wells Score = ' + score;
    scResEl.style.color = color;
    prResEl.textContent = prob;
    prResEl.style.color = color;
  }

  [canEl, parEl, bedEl, tenEl, legEl, calfEl, pitEl, collEl, altEl].forEach(el => el.addEventListener('change', update));
  update();
})();