(() => {
  'use strict';
  const ageEl = document.getElementById('cg-age'), wEl = document.getElementById('cg-w');
  const scrEl = document.getElementById('cg-scr'), sexEl = document.getElementById('cg-sex');
  const clResEl = document.getElementById('cg-res-crcl'), dsResEl = document.getElementById('cg-res-dose');

  function update() {
    const age = parseFloat(ageEl.value), W = parseFloat(wEl.value), Scr = parseFloat(scrEl.value);
    const isFemale = sexEl.value === 'female';

    if (isNaN(age) || isNaN(W) || isNaN(Scr) || age <= 0 || W <= 0 || Scr <= 0) return;

    // Cockcroft-Gault: CrCl = ( (140 - Age) * W ) / ( 72 * Scr ) * (0.85 if female)
    let CrCl = ((140.0 - age) * W) / (72.0 * Scr);
    if (isFemale) CrCl *= 0.85;

    let guide = '', color = '#22543d';
    if (CrCl >= 90) { guide = 'Normal Renal Clearance (≥ 90 mL/min: Standard 100% dosing)'; color = '#22543d'; }
    else if (CrCl >= 60) { guide = 'Mild Impairment (60 - 89 mL/min: Standard to mild dose reduction)'; color = '#22543d'; }
    else if (CrCl >= 30) { guide = 'Moderate Impairment (30 - 59 mL/min: Reduce dose / extend interval)'; color = '#ea580c'; }
    else if (CrCl >= 15) { guide = 'Severe Renal Impairment (15 - 29 mL/min: Significant dose reduction mandatory)'; color = '#c53030'; }
    else { guide = 'End-Stage Renal Failure (< 15 mL/min: Avoid nephrotoxic drugs / Dialysis dosing)'; color = '#c53030'; }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL / min';
    clResEl.style.color = color;
    dsResEl.textContent = guide;
    dsResEl.style.color = color;
  }

  [ageEl, wEl, scrEl].forEach(el => el.addEventListener('input', update));
  sexEl.addEventListener('change', update);
  update();
})();