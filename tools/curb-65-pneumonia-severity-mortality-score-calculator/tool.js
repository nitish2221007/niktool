(() => {
  'use strict';
  const cEl = document.getElementById('c65-c'), uEl = document.getElementById('c65-u');
  const rEl = document.getElementById('c65-r'), bEl = document.getElementById('c65-b'), a65El = document.getElementById('c65-65');
  const scResEl = document.getElementById('c65-res-score'), stResEl = document.getElementById('c65-res-strat');

  function update() {
    let score = 0;
    if (cEl.checked) score++;
    if (uEl.checked) score++;
    if (rEl.checked) score++;
    if (bEl.checked) score++;
    if (a65El.checked) score++;

    let strat = '', color = '#22543d';
    if (score <= 1) {
      strat = 'LOW RISK (0.6 - 2.7% 30-Day Mortality): Outpatient Home Treatment Suitable';
      color = '#22543d';
    } else if (score === 2) {
      strat = 'MODERATE RISK (6.8% Mortality): Short Hospital Inpatient Stay or Supervised Outpatient';
      color = '#ea580c';
    } else {
      strat = 'SEVERE PNEUMONIA (' + (score === 3 ? '14.0%' : '27.8%+') + ' Mortality): Urgent Hospital Inpatient / ICU Admission';
      color = '#c53030';
    }

    scResEl.textContent = 'CURB-65 Score = ' + score + ' / 5';
    scResEl.style.color = color;
    stResEl.textContent = strat;
    stResEl.style.color = color;
  }

  [cEl, uEl, rEl, bEl, a65El].forEach(el => el.addEventListener('change', update));
  update();
})();