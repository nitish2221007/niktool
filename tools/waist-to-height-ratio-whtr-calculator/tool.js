(() => {
  'use strict';
  const wEl = document.getElementById('whtr-waist'), hEl = document.getElementById('whtr-ht');
  const valEl = document.getElementById('whtr-res-val'), catEl = document.getElementById('whtr-res-cat');

  function update() {
    const waist = parseFloat(wEl.value), ht = parseFloat(hEl.value);
    if (isNaN(waist) || isNaN(ht) || waist <= 0 || ht <= 0) return;

    const whtr = waist / ht;
    valEl.textContent = whtr.toFixed(2);

    if (whtr < 0.40) {
      catEl.textContent = 'Underweight (WHtR < 0.40)';
      catEl.style.color = '#2563eb';
    } else if (whtr <= 0.49) {
      catEl.textContent = 'Healthy (0.40 - 0.49: Optimal Longevity)';
      catEl.style.color = '#22543d';
    } else if (whtr <= 0.59) {
      catEl.textContent = 'Increased Risk (0.50 - 0.59: Overweight)';
      catEl.style.color = '#d97706';
    } else {
      catEl.textContent = 'High Health Risk (WHtR ≥ 0.60)';
      catEl.style.color = '#c53030';
    }
  }

  wEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();