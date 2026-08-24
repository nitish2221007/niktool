(() => {
  'use strict';
  const gEl = document.getElementById('rp-gender'), aEl = document.getElementById('rp-age'), wEl = document.getElementById('rp-wt-lbs');
  const tEl = document.getElementById('rp-time-min'), hrEl = document.getElementById('rp-hr');
  const vo2El = document.getElementById('rp-res-vo2'), catEl = document.getElementById('rp-res-cat');

  function update() {
    const gender = parseInt(gEl.value, 10);
    const age = parseFloat(aEl.value);
    const wtLbs = parseFloat(wEl.value);
    const timeMins = parseFloat(tEl.value);
    const hr = parseFloat(hrEl.value);

    if (isNaN(age) || isNaN(wtLbs) || isNaN(timeMins) || isNaN(hr) || age <= 0 || wtLbs <= 0 || timeMins <= 0 || hr <= 0) return;

    // Rockport formula:
    // VO2 max = 132.853 - (0.0769 * Weight_lbs) - (0.3877 * Age) + (6.315 * Gender) - (3.2649 * Time_min) - (0.1565 * HeartRate)
    const vo2 = 132.853 - (0.0769 * wtLbs) - (0.3877 * age) + (6.315 * gender) - (3.2649 * timeMins) - (0.1565 * hr);

    vo2El.textContent = vo2.toFixed(1) + ' mL/kg/min';

    if (vo2 >= 50) {
      catEl.textContent = 'Superior / Elite Cardio Capacity';
      catEl.style.color = '#22543d';
    } else if (vo2 >= 42) {
      catEl.textContent = 'Excellent Aerobic Fitness';
      catEl.style.color = '#22543d';
    } else if (vo2 >= 35) {
      catEl.textContent = 'Good / Average Fitness';
      catEl.style.color = '#2563eb';
    } else {
      catEl.textContent = 'Below Average (Aerobic Training Recommended)';
      catEl.style.color = '#c53030';
    }
  }

  [gEl, aEl, wEl, tEl, hrEl].forEach(el => el.addEventListener('input', update));
  update();
})();