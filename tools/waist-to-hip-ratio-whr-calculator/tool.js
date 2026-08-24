(() => {
  'use strict';
  const gEl = document.getElementById('whr-gender'), wEl = document.getElementById('whr-waist'), hEl = document.getElementById('whr-hip');
  const valEl = document.getElementById('whr-res-val'), rskEl = document.getElementById('whr-res-risk');

  function update() {
    const isMale = gEl.value === 'male';
    const waist = parseFloat(wEl.value), hip = parseFloat(hEl.value);
    if (isNaN(waist) || isNaN(hip) || waist <= 0 || hip <= 0) return;

    const whr = waist / hip;
    valEl.textContent = whr.toFixed(2);

    if (isMale) {
      if (whr < 0.90) {
        rskEl.textContent = 'Low Health Risk (WHR < 0.90)';
        rskEl.style.color = '#22543d';
      } else if (whr <= 0.99) {
        rskEl.textContent = 'Moderate Health Risk (0.90 - 0.99)';
        rskEl.style.color = '#d97706';
      } else {
        rskEl.textContent = 'High Cardiovascular Risk (WHR ≥ 1.0)';
        rskEl.style.color = '#c53030';
      }
    } else {
      if (whr < 0.80) {
        rskEl.textContent = 'Low Health Risk (WHR < 0.80)';
        rskEl.style.color = '#22543d';
      } else if (whr <= 0.84) {
        rskEl.textContent = 'Moderate Health Risk (0.80 - 0.84)';
        rskEl.style.color = '#d97706';
      } else {
        rskEl.textContent = 'High Cardiovascular Risk (WHR ≥ 0.85)';
        rskEl.style.color = '#c53030';
      }
    }
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();