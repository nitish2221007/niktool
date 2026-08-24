(() => {
  'use strict';
  const aEl = document.getElementById('ped-adult'), wEl = document.getElementById('ped-wt'), agEl = document.getElementById('ped-age');
  const clkResEl = document.getElementById('ped-res-clark'), yngResEl = document.getElementById('ped-res-young');

  function update() {
    const adultDose = parseFloat(aEl.value), weightKg = parseFloat(wEl.value), ageYears = parseFloat(agEl.value);
    if (isNaN(adultDose) || isNaN(weightKg) || isNaN(ageYears) || adultDose <= 0 || weightKg <= 0 || ageYears <= 0) return;

    // Convert kg to lbs: 1 kg = 2.20462 lbs
    const weightLbs = weightKg * 2.20462;

    // Clark's Rule (Weight-based): Child Dose = ( Weight in lbs / 150 ) * Adult Dose
    const clarkDose = (weightLbs / 150.0) * adultDose;

    // Young's Rule (Age-based for children 1-12 yrs): Child Dose = ( Age / (Age + 12) ) * Adult Dose
    const youngDose = (ageYears / (ageYears + 12.0)) * adultDose;

    clkResEl.textContent = Math.round(clarkDose) + ' mg (Clark's Rule)';
    yngResEl.textContent = 'Young's Rule = ' + Math.round(youngDose) + ' mg | Child Wt: ' + weightKg + ' kg (' + weightLbs.toFixed(1) + ' lbs) @ Adult Dose ' + adultDose + ' mg';
  }

  [aEl, wEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();