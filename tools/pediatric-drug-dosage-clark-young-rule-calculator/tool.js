(() => {
  'use strict';
  const adEl = document.getElementById('pd-adult'), wEl = document.getElementById('pd-w'), agEl = document.getElementById('pd-age');
  const clResEl = document.getElementById('pd-res-clark'), ygResEl = document.getElementById('pd-res-young');

  function update() {
    const adultDose = parseFloat(adEl.value), W_kg = parseFloat(wEl.value), age = parseFloat(agEl.value);
    if (isNaN(adultDose) || isNaN(W_kg) || isNaN(age) || adultDose <= 0 || W_kg <= 0 || age <= 0) return;

    // Convert kg to lbs:
    const W_lbs = W_kg * 2.20462;

    // Clark's Rule: Child Dose = Adult Dose * (Weight_lbs / 150)
    const clarkDose = adultDose * (W_lbs / 150.0);

    // Young's Rule: Child Dose = Adult Dose * (Age / (Age + 12))
    const youngDose = adultDose * (age / (age + 12.0));

    const fracPct = (clarkDose / adultDose) * 100.0;

    clResEl.textContent = 'Clark's Dose = ' + clarkDose.toFixed(1) + ' mg';
    ygResEl.textContent = 'Young's Dose = ' + youngDose.toFixed(1) + ' mg | Weight = ' + W_lbs.toFixed(1) + ' lbs (' + fracPct.toFixed(1) + '% of ' + adultDose + ' mg adult dose)';
  }

  [adEl, wEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();