(() => {
  'use strict';
  const gEl = document.getElementById('hb-gender'), wEl = document.getElementById('hb-wt');
  const hEl = document.getElementById('hb-ht'), aEl = document.getElementById('hb-age');
  const bmrEl = document.getElementById('hb-res-bmr'), hrEl = document.getElementById('hb-res-hr');

  function update() {
    const isMale = gEl.value === 'male';
    const W = parseFloat(wEl.value), H = parseFloat(hEl.value), A = parseFloat(aEl.value);
    if (isNaN(W) || isNaN(H) || isNaN(A) || W <= 0 || H <= 0 || A <= 0) return;

    // Revised Harris-Benedict (1984):
    // Men: BMR = 88.362 + (13.397 * W) + (4.799 * H) - (5.677 * A)
    // Women: BMR = 447.593 + (9.247 * W) + (3.098 * H) - (4.330 * A)
    let bmr = isMale ? (88.362 + (13.397 * W) + (4.799 * H) - (5.677 * A)) : (447.593 + (9.247 * W) + (3.098 * H) - (4.330 * A));

    bmrEl.textContent = Math.round(bmr).toLocaleString() + ' kcal / day';
    hrEl.textContent = (bmr / 24).toFixed(1) + ' kcal / hr';
  }

  [gEl, wEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();