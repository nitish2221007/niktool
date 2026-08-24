(() => {
  'use strict';
  const aEl = document.getElementById('cg-age'), wEl = document.getElementById('cg-wt');
  const sEl = document.getElementById('cg-scr'), sxEl = document.getElementById('cg-sex');
  const cResEl = document.getElementById('cg-res-crcl'), stResEl = document.getElementById('cg-res-stage');

  function update() {
    const age = parseFloat(aEl.value), wtKg = parseFloat(wEl.value);
    const scr = parseFloat(sEl.value), sexFactor = parseFloat(sxEl.value);

    if (isNaN(age) || isNaN(wtKg) || isNaN(scr) || isNaN(sexFactor) || age <= 0 || wtKg <= 0 || scr <= 0) return;

    // Cockcroft-Gault: CrCl = [ (140 - Age) * Weight_kg * (0.85 if female) ] / ( 72 * Scr_mg_dL )  [mL/min]
    const crcl = ((140 - age) * wtKg * sexFactor) / (72 * scr);

    cResEl.textContent = crcl.toFixed(1) + ' mL / min';

    if (crcl >= 90) {
      stResEl.textContent = 'Normal Kidney Function (CrCl ≥ 90 mL/min)';
      stResEl.style.color = '#22543d';
    } else if (crcl >= 60) {
      stResEl.textContent = 'Mild Renal Impairment (60 to 89 mL/min)';
      stResEl.style.color = '#2563eb';
    } else if (crcl >= 30) {
      stResEl.textContent = 'Moderate Renal Impairment (30 to 59 mL/min: Dose Reduction Required)';
      stResEl.style.color = '#d97706';
    } else if (crcl >= 15) {
      stResEl.textContent = 'Severe Renal Impairment (15 to 29 mL/min)';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'End-Stage Renal Disease / Kidney Failure (< 15 mL/min: Dialysis)';
      stResEl.style.color = '#c53030';
    }
  }

  [aEl, wEl, sEl, sxEl].forEach(el => el.addEventListener('input', update));
  sxEl.addEventListener('change', update);
  update();
})();