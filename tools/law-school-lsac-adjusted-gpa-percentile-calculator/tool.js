(() => {
  'use strict';
  const lsatEl = document.getElementById('ls-lsat'), gpaEl = document.getElementById('ls-gpa');
  const idxResEl = document.getElementById('ls-res-idx'), trResEl = document.getElementById('ls-res-tier');

  function update() {
    const lsat = parseInt(lsatEl.value, 10), gpa = parseFloat(gpaEl.value);
    if (isNaN(lsat) || isNaN(gpa) || lsat < 120 || lsat > 180 || gpa < 0 || gpa > 4.33) return;

    // Standard Law School Composite Index weighting (approx Index = (LSAT * 0.1) + (GPA * 2.0)):
    const indexScore = (lsat * 0.10) + (gpa * 1.80);

    let tier = '';
    let color = '#22543d';

    if (lsat >= 173 && gpa >= 3.90) {
      tier = 'TOP 3 (HYS: Harvard, Yale, Stanford Law Competitive)';
      color = '#22543d';
    } else if (lsat >= 168 && gpa >= 3.80) {
      tier = 'T14 LAW SCHOOLS (Top 14 ABA: Columbia, Chicago, NYU, Penn, UVA, Berkeley, Michigan)';
      color = '#22543d';
    } else if (lsat >= 162 && gpa >= 3.50) {
      tier = 'TOP 50 LAW SCHOOLS (Strong regional flagship law programs with high bar passage)';
      color = '#2563eb';
    } else if (lsat >= 152 && gpa >= 3.00) {
      tier = 'TIER 2 / TIER 3 LAW SCHOOLS (Solid regional employment)';
      color = '#d97706';
    } else {
      tier = 'BELOW NATIONAL MEDIAN (Consider LSAT retake for scholarship funding)';
      color = '#c53030';
    }

    idxResEl.textContent = 'Index = ' + indexScore.toFixed(2);
    idxResEl.style.color = color;
    trResEl.textContent = tier + ' (LSAT: ' + lsat + ' | GPA: ' + gpa.toFixed(2) + ')';
    trResEl.style.color = color;
  }

  lsatEl.addEventListener('input', update);
  gpaEl.addEventListener('input', update);
  update();
})();