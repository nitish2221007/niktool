(() => {
  'use strict';
  const fiEl = document.getElementById('ag-fio2'), pco2El = document.getElementById('ag-paco2');
  const paEl = document.getElementById('ag-pao2'), agEl = document.getElementById('ag-age');
  const aaResEl = document.getElementById('ag-res-aa'), alResEl = document.getElementById('ag-res-alv');

  const P_atm = 760.0, P_H2O = 47.0, R = 0.80; // Respiratory quotient

  function update() {
    const FiO2 = parseFloat(fiEl.value), PaCO2 = parseFloat(pco2El.value);
    const PaO2 = parseFloat(paEl.value), age = parseFloat(agEl.value);

    if (isNaN(FiO2) || isNaN(PaCO2) || isNaN(PaO2) || isNaN(age) || FiO2 <= 0 || PaCO2 <= 0 || PaO2 <= 0) return;

    // Alveolar Gas Equation: P_A O2 = FiO2 * (P_atm - P_H2O) - (PaCO2 / R)
    const P_A_O2 = FiO2 * (P_atm - P_H2O) - (PaCO2 / R);

    // A-a Gradient = P_A O2 - PaO2
    const Aa_gradient = P_A_O2 - PaO2;

    // Expected normal A-a gradient: (Age / 4) + 4
    const expected_Aa = (age / 4.0) + 4.0;

    let diag = '', color = '#22543d';
    if (Aa_gradient <= expected_Aa + 5.0) {
      diag = 'NORMAL A-a GRADIENT (Hypoventilation / High Altitude / Low FiO₂)';
      color = '#22543d';
    } else {
      diag = 'ELEVATED A-a GRADIENT (V/Q Mismatch, Intrapulmonary Shunt, Diffusion Impairment - PE / Pneumonia / ARDS)';
      color = '#c53030';
    }

    aaResEl.textContent = 'A-a Gradient = ' + Aa_gradient.toFixed(1) + ' mmHg (' + (Aa_gradient > expected_Aa + 5 ? 'WIDENED' : 'NORMAL') + ')';
    aaResEl.style.color = color;
    alResEl.textContent = 'Alveolar P_A O₂ = ' + P_A_O2.toFixed(1) + ' mmHg | Expected Normal ≤ ' + expected_Aa.toFixed(1) + ' mmHg (' + diag.split(' (')[0] + ')';
    alResEl.style.color = color;
  }

  [fiEl, pco2El, paEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();