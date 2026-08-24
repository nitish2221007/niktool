(() => {
  'use strict';
  const ageEl = document.getElementById('cg-age'), wtEl = document.getElementById('cg-wt');
  const scrEl = document.getElementById('cg-scr'), sexEl = document.getElementById('cg-sex');
  const clResEl = document.getElementById('cg-res-crcl'), dsResEl = document.getElementById('cg-res-dose');

  function update() {
    const age = parseFloat(ageEl.value), wt = parseFloat(wtEl.value);
    const SCr = parseFloat(scrEl.value), sexFactor = parseFloat(sexEl.value);

    if (isNaN(age) || isNaN(wt) || isNaN(SCr) || age <= 0 || wt <= 0 || SCr <= 0) return;

    // Cockcroft-Gault formula: CrCl = [ (140 - Age) * Weight ] / ( 72 * SCr ) * (0.85 if female)
    const CrCl = ((140.0 - age) * wt) / (72.0 * SCr) * sexFactor;

    let stage = '', color = '#22543d';
    if (CrCl >= 90.0) {
      stage = 'NORMAL KIDNEY FUNCTION (CrCl ≥ 90 mL/min)';
      color = '#22543d';
    } else if (CrCl >= 60.0) {
      stage = 'MILD RENAL IMPAIRMENT (CrCl 60-89 mL/min)';
      color = '#22543d';
    } else if (CrCl >= 30.0) {
      stage = 'MODERATE RENAL IMPAIRMENT (CrCl 30-59 mL/min - Reduce Doses of Renally Cleared Drugs)';
      color = '#ea580c';
    } else if (CrCl >= 15.0) {
      stage = 'SEVERE RENAL IMPAIRMENT (CrCl 15-29 mL/min - Major Dose Reductions Required)';
      color = '#c53030';
    } else {
      stage = 'END-STAGE RENAL DISEASE (CrCl < 15 mL/min - Dialysis Dependent)';
      color = '#c53030';
    }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL / min';
    clResEl.style.color = color;
    dsResEl.textContent = stage + ' [SCr = ' + SCr + ' mg/dL, Age = ' + age + ' y, Wt = ' + wt + ' kg]';
  }

  [ageEl, wtEl, scrEl, sexEl].forEach(el => el.addEventListener('input', update));
  update();
})();