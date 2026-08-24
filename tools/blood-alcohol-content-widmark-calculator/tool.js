(() => {
  'use strict';
  const gEl = document.getElementById('bac-gender'), wEl = document.getElementById('bac-wt');
  const dEl = document.getElementById('bac-drinks'), hEl = document.getElementById('bac-hours');
  const valEl = document.getElementById('bac-res-val'), sobEl = document.getElementById('bac-res-sober');

  function update() {
    const isMale = gEl.value === 'male';
    const r = isMale ? 0.68 : 0.55;
    const wtKg = parseFloat(wEl.value);
    const drinks = parseFloat(dEl.value);
    const hours = parseFloat(hEl.value);

    if (isNaN(wtKg) || isNaN(drinks) || isNaN(hours) || wtKg <= 0 || drinks < 0 || hours < 0) return;

    // Grams alcohol = drinks * 14 grams
    const alcoholGrams = drinks * 14;
    // Widmark BAC = (Grams / (Weight_g * r)) * 100 - (0.015 * hours)
    const wtGrams = wtKg * 1000;
    const peakBac = (alcoholGrams / (wtGrams * r)) * 100;
    let currentBac = peakBac - (0.015 * hours);
    if (currentBac < 0) currentBac = 0;

    const timeToZero = currentBac / 0.015;

    valEl.textContent = currentBac.toFixed(3) + '%';
    valEl.style.color = currentBac >= 0.08 ? '#c53030' : (currentBac >= 0.05 ? '#d97706' : '#22543d');
    sobEl.textContent = timeToZero > 0 ? timeToZero.toFixed(1) + ' Hours' : '0.0 Hours (Sober)';
  }

  [gEl, wEl, dEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();