(() => {
  'use strict';
  const hEl = document.getElementById('hh-hco3'), pEl = document.getElementById('hh-paco2');
  const phResEl = document.getElementById('hh-res-ph'), dgResEl = document.getElementById('hh-res-diag');

  const pKa = 6.10;
  const alpha = 0.0307; // Solubility coefficient of CO2 in plasma (mM / mmHg)

  function update() {
    const hco3 = parseFloat(hEl.value), paco2 = parseFloat(pEl.value);
    if (isNaN(hco3) || isNaN(paco2) || hco3 <= 0 || paco2 <= 0) return;

    // Dissolved CO2 = alpha * PaCO2
    const dissolvedCO2 = alpha * paco2;
    // Henderson-Hasselbalch: pH = 6.10 + log10( [HCO3-] / dissolvedCO2 )
    const ratio = hco3 / dissolvedCO2;
    const pH = pKa + Math.log10(ratio);

    phResEl.textContent = 'pH ' + pH.toFixed(2) + ' (Ratio 20:1 = ' + ratio.toFixed(1) + ':1)';

    if (pH >= 7.35 && pH <= 7.45) {
      dgResEl.textContent = 'Normal Acid-Base Homeostasis (pH 7.35 to 7.45)';
      dgResEl.style.color = '#22543d';
    } else if (pH < 7.35) {
      let cause = (paco2 > 45 && hco3 < 22) ? 'Mixed Respiratory & Metabolic Acidosis' : (paco2 > 45 ? 'Respiratory Acidosis (CO₂ Retention)' : 'Metabolic Acidosis (Low HCO₃⁻)');
      dgResEl.textContent = 'ACIDEMIA (pH < 7.35): ' + cause;
      dgResEl.style.color = '#c53030';
    } else {
      let cause = (paco2 < 35 && hco3 > 26) ? 'Mixed Alkalosis' : (paco2 < 35 ? 'Respiratory Alkalosis (Hyperventilation)' : 'Metabolic Alkalosis (Excess HCO₃⁻)');
      dgResEl.textContent = 'ALKALEMIA (pH > 7.45): ' + cause;
      dgResEl.style.color = '#d97706';
    }
  }

  hEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();