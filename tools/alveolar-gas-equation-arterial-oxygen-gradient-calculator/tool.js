(() => {
  'use strict';
  const fio2El = document.getElementById('ag-fio2'), pao2El = document.getElementById('ag-pao2');
  const paco2El = document.getElementById('ag-paco2'), ageEl = document.getElementById('ag-age');
  const grResEl = document.getElementById('ag-res-grad'), paResEl = document.getElementById('ag-res-pao2');

  const Patm = 760.0;  // Sea level atmospheric pressure mmHg
  const PH2O = 47.0;   // Saturated water vapor pressure @ 37°C mmHg
  const RQ = 0.8;      // Standard respiratory exchange ratio

  function update() {
    const FiO2 = parseFloat(fio2El.value), PaO2 = parseFloat(pao2El.value);
    const PaCO2 = parseFloat(paco2El.value), age = parseFloat(ageEl.value);

    if (isNaN(FiO2) || isNaN(PaO2) || isNaN(PaCO2) || isNaN(age) || FiO2 <= 0 || FiO2 > 1 || PaO2 <= 0 || PaCO2 <= 0 || age < 0) return;

    // Alveolar Gas Equation: P_A_O2 = FiO2 * (Patm - PH2O) - (PaCO2 / RQ)  [mmHg]
    const P_A_O2 = (FiO2 * (Patm - PH2O)) - (PaCO2 / RQ);

    // A-a Gradient: A-a = P_A_O2 - PaO2
    const Aa_gradient = P_A_O2 - PaO2;

    // Age-adjusted expected normal upper limit: (Age / 4) + 4
    const normal_Aa_limit = (age / 4.0) + 4.0;

    let eval_text = '', color = '#22543d';
    if (Aa_gradient > normal_Aa_limit) {
      eval_text = 'ELEVATED A-a GRADIENT (V/Q Mismatch, Shunt, or Diffusion Defect: PE, Pneumonia, ARDS)';
      color = '#c53030';
    } else {
      eval_text = 'NORMAL A-a GRADIENT (Normal gas exchange; hypoventilation or low FiO₂ if hypoxic)';
      color = '#22543d';
    }

    grResEl.textContent = 'A-a Gradient = ' + Aa_gradient.toFixed(1) + ' mmHg (' + (Aa_gradient <= normal_Aa_limit ? 'NORMAL' : 'ELEVATED') + ')';
    grResEl.style.color = color;
    paResEl.textContent = 'Alveolar P_A O₂ = ' + P_A_O2.toFixed(1) + ' mmHg | Age ' + age + ' Expected Upper Limit ≤ ' + normal_Aa_limit.toFixed(1) + ' mmHg [FiO₂=' + FiO2 + ']';
  }

  [fio2El, pao2El, paco2El, ageEl].forEach(el => el.addEventListener('input', update));
  update();
})();