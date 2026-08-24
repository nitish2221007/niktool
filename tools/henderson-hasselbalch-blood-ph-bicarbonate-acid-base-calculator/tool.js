(() => {
  'use strict';
  const hco3El = document.getElementById('hh-hco3'), paco2El = document.getElementById('hh-paco2');
  const phResEl = document.getElementById('hh-res-ph'), dgResEl = document.getElementById('hh-res-diag');

  const pKa = 6.10;
  const alpha_CO2 = 0.0307; // mmol/L per mmHg PaCO2

  function update() {
    const HCO3 = parseFloat(hco3El.value), PaCO2 = parseFloat(paco2El.value);
    if (isNaN(HCO3) || isNaN(PaCO2) || HCO3 <= 0 || PaCO2 <= 0) return;

    // Dissolved CO2 in mmol/L:
    const dCO2 = alpha_CO2 * PaCO2;

    // Blood pH: pH = 6.10 + log10( [HCO3-] / dCO2 )
    const pH = pKa + Math.log10(HCO3 / dCO2);

    let status = '', color = '#22543d';
    if (pH < 7.35) {
      color = '#c53030';
      if (HCO3 < 22.0 && PaCO2 <= 40.0) status = 'METABOLIC ACIDOSIS (Low HCO₃⁻)';
      else if (PaCO2 > 45.0 && HCO3 >= 24.0) status = 'RESPIRATORY ACIDOSIS (CO₂ Retention)';
      else status = 'MIXED ACIDOSIS';
    } else if (pH > 7.45) {
      color = '#c53030';
      if (HCO3 > 26.0 && PaCO2 >= 40.0) status = 'METABOLIC ALKALOSIS (High HCO₃⁻)';
      else if (PaCO2 < 35.0 && HCO3 <= 24.0) status = 'RESPIRATORY ALKALOSIS (Hyperventilation)';
      else status = 'MIXED ALKALOSIS';
    } else {
      status = 'NORMAL ARTERIAL ACID-BASE BALANCE';
      color = '#22543d';
    }

    phResEl.textContent = 'Arterial Blood pH = ' + pH.toFixed(2) + ' (' + status + ')';
    phResEl.style.color = color;
    dgResEl.textContent = status + ' | Dissolved CO₂ = ' + dCO2.toFixed(2) + ' mmol/L (HCO₃⁻/CO₂ Ratio = ' + (HCO3/dCO2).toFixed(1) + ':1 @ PaCO₂=' + PaCO2 + ' mmHg)';
  }

  hco3El.addEventListener('input', update);
  paco2El.addEventListener('input', update);
  update();
})();