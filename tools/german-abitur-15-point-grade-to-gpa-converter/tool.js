(() => {
  'use strict';
  const ndEl = document.getElementById('bav-nd'), maxEl = document.getElementById('bav-nmax'), minEl = document.getElementById('bav-nmin');
  const gpaResEl = document.getElementById('bav-res-gpa'), dscResEl = document.getElementById('bav-res-desc');

  function update() {
    const N_d = parseFloat(ndEl.value), N_max = parseFloat(maxEl.value), N_min = parseFloat(minEl.value);
    if (isNaN(N_d) || isNaN(N_max) || isNaN(N_min) || N_max <= N_min || N_d < 0) return;

    if (N_d < N_min) {
      gpaResEl.textContent = 'German Grade: 5.0 / 6.0 (Nicht Genügend / Fail)';
      gpaResEl.style.color = '#c53030';
      dscResEl.textContent = 'Score below minimum passing cutoff (N_d < N_min): Ineligible for university admission';
      dscResEl.style.color = '#c53030';
      return;
    }

    // Modified Bavarian Formula: N = 1 + 3 * ( N_max - N_d ) / ( N_max - N_min )
    const german_gpa = 1.0 + (3.0 * (N_max - N_d) / (N_max - N_min));
    const rounded_gpa = Math.min(4.0, Math.max(1.0, german_gpa));

    let germanDesc = '';
    let color = '#22543d';

    if (rounded_gpa <= 1.5) {
      germanDesc = 'Sehr Gut (Very Good / Excellent: 1.0 - 1.5)';
      color = '#22543d';
    } else if (rounded_gpa <= 2.5) {
      germanDesc = 'Gut (Good: 1.6 - 2.5 - Strong TU9 Engineering Eligibility)';
      color = '#22543d';
    } else if (rounded_gpa <= 3.5) {
      germanDesc = 'Befriedigend (Satisfactory: 2.6 - 3.5)';
      color = '#2563eb';
    } else {
      germanDesc = 'Ausreichend (Sufficient / Pass: 3.6 - 4.0)';
      color = '#d97706';
    }

    gpaResEl.textContent = 'German GPA = ' + rounded_gpa.toFixed(1) + ' (' + germanDesc.split(' (')[0] + ')';
    gpaResEl.style.color = color;
    dscResEl.textContent = germanDesc + ' | Formula: N = 1 + 3·(' + N_max + ' - ' + N_d + ')/(' + N_max + ' - ' + N_min + ')';
    dscResEl.style.color = color;
  }

  [ndEl, maxEl, minEl].forEach(el => el.addEventListener('input', update));
  update();
})();