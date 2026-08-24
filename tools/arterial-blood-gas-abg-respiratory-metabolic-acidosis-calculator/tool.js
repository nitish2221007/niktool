(() => {
  'use strict';
  const phEl = document.getElementById('abg-ph'), co2El = document.getElementById('abg-paco2'), hcoEl = document.getElementById('abg-hco3');
  const dgResEl = document.getElementById('abg-res-diag'), cpResEl = document.getElementById('abg-res-comp');

  function update() {
    const pH = parseFloat(phEl.value), PaCO2 = parseFloat(co2El.value), HCO3 = parseFloat(hcoEl.value);
    if (isNaN(pH) || isNaN(PaCO2) || isNaN(HCO3) || pH <= 0 || PaCO2 <= 0 || HCO3 <= 0) return;

    let diagnosis = '', compensation = '';
    let color = '#22543d';

    if (pH < 7.35) {
      // Acidemia
      if (PaCO2 > 45 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'UNCOMPENSATED RESPIRATORY ACIDOSIS';
        compensation = 'Hypoventilation causing CO₂ retention; renal kidneys have not yet retained bicarbonate';
        color = '#c53030';
      } else if (HCO3 < 22 && PaCO2 >= 35 && PaCO2 <= 45) {
        diagnosis = 'UNCOMPENSATED METABOLIC ACIDOSIS';
        // Winter's formula expected PaCO2 = 1.5 * HCO3 + 8 +/- 2
        const expCO2 = (1.5 * HCO3) + 8.0;
        compensation = 'Low bicarbonate; Winter's Expected PaCO₂ = ' + Math.round(expCO2) + ' mmHg for complete respiratory compensation';
        color = '#c53030';
      } else if (PaCO2 > 45 && HCO3 > 26) {
        diagnosis = 'PARTIALLY COMPENSATED RESPIRATORY ACIDOSIS';
        compensation = 'Chronic respiratory acidosis with compensatory renal HCO₃⁻ retention';
        color = '#ea580c';
      } else if (HCO3 < 22 && PaCO2 < 35) {
        diagnosis = 'PARTIALLY COMPENSATED METABOLIC ACIDOSIS';
        compensation = 'Metabolic acidosis with hyperventilatory respiratory CO₂ blowing off';
        color = '#ea580c';
      } else {
        diagnosis = 'MIXED RESPIRATORY & METABOLIC ACIDOSIS';
        compensation = 'Combined respiratory failure and severe metabolic acid accumulation';
        color = '#c53030';
      }
    } else if (pH > 7.45) {
      // Alkalemia
      if (PaCO2 < 35 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'UNCOMPENSATED RESPIRATORY ALKALOSIS';
        compensation = 'Hyperventilation / Panic attack / Sepsis blowing off CO₂';
        color = '#2563eb';
      } else if (HCO3 > 26 && PaCO2 >= 35 && PaCO2 <= 45) {
        diagnosis = 'UNCOMPENSATED METABOLIC ALKALOSIS';
        compensation = 'Elevated bicarbonate from vomiting or diuretic overuse';
        color = '#2563eb';
      } else {
        diagnosis = 'COMPENSATED / MIXED ALKALOSIS';
        compensation = 'Combined respiratory and metabolic alkalotic processes';
        color = '#2563eb';
      }
    } else {
      // Normal pH (7.35 - 7.45)
      if (PaCO2 >= 35 && PaCO2 <= 45 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'NORMAL ARTERIAL BLOOD GAS (EUMIC)';
        compensation = 'Normal acid-base homeostasis (pH 7.35-7.45, PaCO₂ 35-45, HCO₃⁻ 22-26)';
        color = '#22543d';
      } else {
        diagnosis = 'FULLY COMPENSATED ACID-BASE DISORDER';
        compensation = 'pH normalized into reference range by renal or respiratory compensation';
        color = '#22543d';
      }
    }

    dgResEl.textContent = diagnosis;
    dgResEl.style.color = color;
    cpResEl.textContent = compensation + ' (pH: ' + pH + ', PaCO₂: ' + PaCO2 + ' mmHg, HCO₃⁻: ' + HCO3 + ' mEq/L)';
    cpResEl.style.color = color;
  }

  [phEl, co2El, hcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();