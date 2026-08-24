(() => {
  'use strict';
  const g1El = document.getElementById('gpa-g1'), c1El = document.getElementById('gpa-c1');
  const g2El = document.getElementById('gpa-g2'), c2El = document.getElementById('gpa-c2');
  const valResEl = document.getElementById('gpa-res-val'), hnResEl = document.getElementById('gpa-res-honor');

  function update() {
    const g1 = parseFloat(g1El.value), c1 = parseFloat(c1El.value) || 0;
    const g2 = parseFloat(g2El.value), c2 = parseFloat(c2El.value) || 0;

    const totalCredits = c1 + c2;
    if (totalCredits <= 0) return;

    const totalQualityPoints = (g1 * c1) + (g2 * c2);
    const GPA = totalQualityPoints / totalCredits;

    let honor = '';
    let color = '#22543d';

    if (GPA >= 3.90) {
      honor = 'SUMMA CUM LAUDE / PRESIDENT'S HONOR ROLL (GPA 3.90 - 4.00)';
      color = '#22543d';
    } else if (GPA >= 3.75) {
      honor = 'MAGNA CUM LAUDE / DEAN'S LIST (GPA 3.75 - 3.89)';
      color = '#22543d';
    } else if (GPA >= 3.50) {
      honor = 'CUM LAUDE / DEAN'S COMMENDATION (GPA 3.50 - 3.74)';
      color = '#2563eb';
    } else if (GPA >= 3.00) {
      honor = 'GOOD ACADEMIC STANDING (GPA 3.00 - 3.49: Graduate School Eligible)';
      color = '#22543d';
    } else {
      honor = 'ACADEMIC WARNING / PROBATION RISK (GPA < 2.00)';
      color = '#c53030';
    }

    valResEl.textContent = 'Semester GPA = ' + GPA.toFixed(2) + ' / 4.00';
    valResEl.style.color = color;
    hnResEl.textContent = honor + ' (' + totalQualityPoints.toFixed(1) + ' Quality Points across ' + totalCredits + ' Credits)';
    hnResEl.style.color = color;
  }

  [g1El, c1El, g2El, c2El].forEach(el => el.addEventListener('input', update));
  [g1El, g2El].forEach(el => el.addEventListener('change', update));
  update();
})();