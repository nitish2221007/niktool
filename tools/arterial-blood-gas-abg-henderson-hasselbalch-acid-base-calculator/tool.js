(() => {
  'use strict';
  const phEl = document.getElementById('abg-ph'), pco2El = document.getElementById('abg-paco2'), hco3El = document.getElementById('abg-hco3');
  const dgResEl = document.getElementById('abg-res-diag'), cpResEl = document.getElementById('abg-res-comp');

  function update() {
    const pH = parseFloat(phEl.value), PaCO2 = parseFloat(pco2El.value), HCO3 = parseFloat(hco3El.value);
    if (isNaN(pH) || isNaN(PaCO2) || isNaN(HCO3) || pH <= 0 || PaCO2 <= 0 || HCO3 <= 0) return;

    let diag = '', comp = '', color = '#22543d';

    if (pH < 7.35) {
      if (HCO3 < 22 && PaCO2 <= 40) {
        diag = 'PRIMARY METABOLIC ACIDOSIS (Low pH, Low HCO₃⁻)';
        color = '#c53030';
        const expPCO2 = 1.5 * HCO3 + 8.0;
        comp = 'Winter's Expected PaCO₂ = ' + expPCO2.toFixed(1) + ' ± 2 mmHg (' + (Math.abs(PaCO2 - expPCO2) <= 2 ? 'Appropriate Respiratory Compensation ✓' : 'Mixed Disorder') + ')';
      } else if (PaCO2 > 45 && HCO3 >= 22) {
        diag = 'PRIMARY RESPIRATORY ACIDOSIS (Low pH, High PaCO₂)';
        color = '#c53030';
        comp = 'Renal Bicarbonate Retention Compensation Active';
      } else {
        diag = 'MIXED ACIDOSIS';
        color = '#c53030';
      }
    } else if (pH > 7.45) {
      if (HCO3 > 26) {
        diag = 'PRIMARY METABOLIC ALKALOSIS (High pH, High HCO₃⁻)';
        color = '#2563eb';
        comp = 'Respiratory Hypoventilation Compensation';
      } else if (PaCO2 < 35) {
        diag = 'PRIMARY RESPIRATORY ALKALOSIS (High pH, Low PaCO₂)';
        color = '#2563eb';
        comp = 'Renal Bicarbonate Excretion Active';
      } else {
        diag = 'MIXED ALKALOSIS';
        color = '#2563eb';
      }
    } else {
      diag = 'NORMAL ACID-BASE BALANCE (pH 7.35 - 7.45)';
      comp = 'PaCO₂ = ' + PaCO2 + ' mmHg, HCO₃⁻ = ' + HCO3 + ' mEq/L';
    }

    dgResEl.textContent = diag;
    dgResEl.style.color = color;
    cpResEl.textContent = comp;
  }

  [phEl, pco2El, hco3El].forEach(el => el.addEventListener('input', update));
  update();
})();