(() => {
  'use strict';
  const engEl = document.getElementById('ossd-eng'), c2El = document.getElementById('ossd-c2');
  const c3El = document.getElementById('ossd-c3'), c4El = document.getElementById('ossd-c4');
  const c5El = document.getElementById('ossd-c5'), c6El = document.getElementById('ossd-c6');
  const avgResEl = document.getElementById('ossd-res-avg'), adResEl = document.getElementById('ossd-res-admis');

  function update() {
    const scores = [
      parseFloat(engEl.value) || 0,
      parseFloat(c2El.value) || 0,
      parseFloat(c3El.value) || 0,
      parseFloat(c4El.value) || 0,
      parseFloat(c5El.value) || 0,
      parseFloat(c6El.value) || 0
    ];

    const sum = scores.reduce((a, b) => a + b, 0);
    const avg = sum / 6.0;

    let rating = '';
    let color = '#22543d';

    if (avg >= 95.0) {
      rating = 'TOP TIER (95%+): Competitive for Waterloo Software Eng / U of T Engineering Science';
      color = '#22543d';
    } else if (avg >= 90.0) {
      rating = 'HIGHLY COMPETITIVE (90-94%): Eligible for U of T, McGill, UBC Engineering & CS';
      color = '#22543d';
    } else if (avg >= 85.0) {
      rating = 'STRONG ADMISSION (85-89%): Eligible for McMaster, Queen's, Western Commerce & Life Sci';
      color = '#2563eb';
    } else if (avg >= 75.0) {
      rating = 'GENERAL ADMISSION (75-84%): Meets general arts, social sciences, and tech program minimums';
      color = '#d97706';
    } else {
      rating = 'BELOW STANDARD DIRECT ENTRY CUTOFF';
      color = '#c53030';
    }

    avgResEl.textContent = 'Top 6 Average = ' + avg.toFixed(2) + '%';
    avgResEl.style.color = color;
    adResEl.textContent = rating;
    adResEl.style.color = color;
  }

  [engEl, c2El, c3El, c4El, c5El, c6El].forEach(el => el.addEventListener('input', update));
  update();
})();