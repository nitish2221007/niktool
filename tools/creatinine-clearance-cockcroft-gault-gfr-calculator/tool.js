(() => {
  'use strict';
  const agEl = document.getElementById('cr-age'), wtEl = document.getElementById('cr-wt');
  const scrEl = document.getElementById('cr-scr'), sxEl = document.getElementById('cr-sex');
  const clResEl = document.getElementById('cr-res-cl'), ckdResEl = document.getElementById('cr-res-ckd');

  function update() {
    const age = parseFloat(agEl.value), weight = parseFloat(wtEl.value), scr = parseFloat(scrEl.value);
    const isFemale = sxEl.value === 'female';

    if (isNaN(age) || isNaN(weight) || isNaN(scr) || age <= 0 || weight <= 0 || scr <= 0) return;

    // Cockcroft-Gault equation:
    // CrCl = ( (140 - Age) * Weight ) / ( 72 * Scr ) * (0.85 if female)  [mL / min]
    let CrCl = ((140.0 - age) * weight) / (72.0 * scr);
    if (isFemale) CrCl *= 0.85;

    let stage = '';
    let color = '#22543d';

    if (CrCl >= 90.0) {
      stage = 'NORMAL / STAGE 1 (CrCl ≥ 90 mL/min: Normal renal function, standard drug dosing)';
      color = '#22543d';
    } else if (CrCl >= 60.0) {
      stage = 'MILD RENAL IMPAIRMENT / STAGE 2 (60 - 89 mL/min: Minor clearance decline)';
      color = '#22543d';
    } else if (CrCl >= 30.0) {
      stage = 'MODERATE IMPAIRMENT / STAGE 3 (30 - 59 mL/min: Reduce dose/extend interval for aminoglycosides/vancomycin)';
      color = '#d97706';
    } else if (CrCl >= 15.0) {
      stage = 'SEVERE IMPAIRMENT / STAGE 4 (15 - 29 mL/min: Strict therapeutic drug monitoring required)';
      color = '#ea580c';
    } else {
      stage = 'END-STAGE RENAL DISEASE / STAGE 5 (CrCl < 15 mL/min: Dialysis indicated)';
      color = '#c53030';
    }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL/min';
    clResEl.style.color = color;
    ckdResEl.textContent = stage;
    ckdResEl.style.color = color;
  }

  [agEl, wtEl, scrEl].forEach(el => el.addEventListener('input', update));
  sxEl.addEventListener('change', update);
  update();
})();