(() => {
  'use strict';
  const kgEl = document.getElementById('wt-kg'), lbsEl = document.getElementById('wt-lbs');
  const gEl = document.getElementById('wt-g'), ozEl = document.getElementById('wt-oz'), stEl = document.getElementById('wt-st');

  function updateFromKg(kg) {
    lbsEl.value = (kg * 2.20462).toFixed(2);
    gEl.value = (kg * 1000).toFixed(0);
    ozEl.value = (kg * 35.274).toFixed(2);
    stEl.value = (kg * 0.157473).toFixed(2);
  }

  kgEl.addEventListener('input', () => {
    const v = parseFloat(kgEl.value);
    if (!isNaN(v)) updateFromKg(v);
  });

  lbsEl.addEventListener('input', () => {
    const v = parseFloat(lbsEl.value);
    if (!isNaN(v)) {
      const kg = v / 2.20462;
      kgEl.value = kg.toFixed(2);
      gEl.value = (kg * 1000).toFixed(0);
      ozEl.value = (kg * 35.274).toFixed(2);
      stEl.value = (kg * 0.157473).toFixed(2);
    }
  });

  updateFromKg(70);
})();