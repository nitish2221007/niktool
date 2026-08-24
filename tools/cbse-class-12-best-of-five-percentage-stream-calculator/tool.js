(() => {
  'use strict';
  const engEl = document.getElementById('c12-eng'), s2El = document.getElementById('c12-s2');
  const s3El = document.getElementById('c12-s3'), s4El = document.getElementById('c12-s4'), s5El = document.getElementById('c12-s5');
  const pctResEl = document.getElementById('c12-res-pct'), divResEl = document.getElementById('c12-res-div');

  function update() {
    const eng = parseFloat(engEl.value) || 0;
    const s2 = parseFloat(s2El.value) || 0;
    const s3 = parseFloat(s3El.value) || 0;
    const s4 = parseFloat(s4El.value) || 0;
    const s5 = parseFloat(s5El.value) || 0;

    const total = eng + s2 + s3 + s4 + s5;
    const pct = total / 5.0;

    let divStr = '';
    let color = '#22543d';

    if (pct >= 90.0) {
      divStr = 'FIRST DIVISION WITH DISTINCTION (≥ 90%): 75% JEE/NEET Criteria Cleared & Top DU College Eligible';
      color = '#22543d';
    } else if (pct >= 75.0) {
      divStr = 'FIRST DIVISION (75 - 89%): JEE Main / Advanced 75% Criteria Fully Satisfied';
      color = '#22543d';
    } else if (pct >= 60.0) {
      divStr = 'FIRST DIVISION (60 - 74%): Standard University / College Admission Eligible';
      color = '#2563eb';
    } else if (pct >= 33.0) {
      divStr = 'PASSED (33 - 59%): Basic Passing Threshold Cleared';
      color = '#d97706';
    } else {
      divStr = 'ESSENTIAL REPEAT / COMPARTMENT (Score < 33% in Subject)';
      color = '#c53030';
    }

    pctResEl.textContent = 'Best of 5 = ' + pct.toFixed(2) + '% (' + total + ' / 500)';
    pctResEl.style.color = color;
    divResEl.textContent = divStr;
    divResEl.style.color = color;
  }

  [engEl, s2El, s3El, s4El, s5El].forEach(el => el.addEventListener('input', update));
  update();
})();