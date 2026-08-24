(() => {
  'use strict';
  const scrEl = document.getElementById('gfr-scr'), ageEl = document.getElementById('gfr-age'), sexEl = document.getElementById('gfr-sex');
  const gfrResEl = document.getElementById('gfr-res-gfr'), stgResEl = document.getElementById('gfr-res-stage');

  function update() {
    const Scr = parseFloat(scrEl.value), age = parseFloat(ageEl.value);
    const isFemale = sexEl.value === 'female';

    if (isNaN(Scr) || isNaN(age) || Scr <= 0 || age <= 0) return;

    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const sexFactor = isFemale ? 1.012 : 1.0;

    const ratio = Scr / kappa;
    const term1 = Math.pow(Math.min(ratio, 1.0), alpha);
    const term2 = Math.pow(Math.max(ratio, 1.0), -1.200);
    const term3 = Math.pow(0.9938, age);

    const eGFR = 142.0 * term1 * term2 * term3 * sexFactor;

    let stage = '', color = '#22543d';
    if (eGFR >= 90.0) { stage = 'STAGE G1: Normal (≥ 90 mL/min/1.73m²)'; color = '#22543d'; }
    else if (eGFR >= 60.0) { stage = 'STAGE G2: Mildly Decreased (60 - 89 mL/min/1.73m²)'; color = '#22543d'; }
    else if (eGFR >= 45.0) { stage = 'STAGE G3a: Mild-Moderate (45 - 59 mL/min/1.73m²)'; color = '#ea580c'; }
    else if (eGFR >= 30.0) { stage = 'STAGE G3b: Moderate-Severe (30 - 44 mL/min/1.73m²)'; color = '#ea580c'; }
    else if (eGFR >= 15.0) { stage = 'STAGE G4: Severely Decreased (15 - 29 mL/min/1.73m²)'; color = '#c53030'; }
    else { stage = 'STAGE G5: Kidney Failure (< 15 mL/min)'; color = '#c53030'; }

    gfrResEl.textContent = 'eGFR = ' + Math.round(eGFR) + ' mL / min / 1.73 m²';
    gfrResEl.style.color = color;
    stgResEl.textContent = stage;
    stgResEl.style.color = color;
  }

  [scrEl, ageEl, sexEl].forEach(el => el.addEventListener('input', update));
  sexEl.addEventListener('change', update);
  update();
})();