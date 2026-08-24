(() => {
  'use strict';
  const mEl = document.getElementById('neet-marks'), cEl = document.getElementById('neet-cat');
  const rResEl = document.getElementById('neet-res-rank'), colResEl = document.getElementById('neet-res-col');

  function update() {
    const marks = parseFloat(mEl.value);
    if (isNaN(marks) || marks < 0 || marks > 720) return;

    // Empirical 2024/2025/2026 score-to-rank curve calibration
    let AIR = 1;
    let percentile = 99.99;

    if (marks >= 715) { AIR = Math.round(1 + (720 - marks) * 15); percentile = 99.999; }
    else if (marks >= 700) { AIR = Math.round(75 + (715 - marks) * 120); percentile = 99.95; }
    else if (marks >= 680) { AIR = Math.round(1900 + (700 - marks) * 350); percentile = 99.85; }
    else if (marks >= 650) { AIR = Math.round(8900 + (680 - marks) * 650); percentile = 99.50; }
    else if (marks >= 620) { AIR = Math.round(28400 + (650 - marks) * 1100); percentile = 98.60; }
    else if (marks >= 580) { AIR = Math.round(61400 + (620 - marks) * 1600); percentile = 96.50; }
    else if (marks >= 500) { AIR = Math.round(125000 + (580 - marks) * 2000); percentile = 92.00; }
    else if (marks >= 400) { AIR = Math.round(285000 + (500 - marks) * 2500); percentile = 82.00; }
    else { AIR = Math.round(535000 + (400 - marks) * 3000); percentile = Math.max(10, (marks/720)*100); }

    let college = '';
    let color = '#22543d';

    if (marks >= 660) {
      college = 'PREMIER AIIMS / TOP GOVT MEDICAL COLLEGE (AIIMS Delhi/Jodhpur, MAMC, KGMU Assured)';
      color = '#22543d';
    } else if (marks >= 615) {
      college = 'ALL INDIA QUOTA (15% AIQ) GOVERNMENT MBBS SEAT CONFIRMED in State GMCs';
      color = '#22543d';
    } else if (marks >= 560) {
      college = 'STATE 85% QUOTA GOVT MBBS / Top Private Semi-Government College Seat Eligible';
      color = '#2563eb';
    } else if (marks >= 450) {
      college = 'GOVERNMENT BDS (Dental) / BAMS / BHMS / Top Deemed University MBBS Eligible';
      color = '#d97706';
    } else {
      college = 'QUALIFIED FOR PRIVATE / DEEMED UNIVERSITY MBBS & STUDY MEDICINE ABROAD (MBBS Russia/Philippines)';
      color = '#4b5563';
    }

    rResEl.textContent = 'AIR ≈ ' + AIR.toLocaleString() + ' (~' + percentile.toFixed(2) + '%ile)';
    rResEl.style.color = color;
    colResEl.textContent = college + ' (' + marks + '/720 Marks)';
    colResEl.style.color = color;
  }

  mEl.addEventListener('input', update);
  cEl.addEventListener('change', update);
  update();
})();