(() => {
  'use strict';
  const gEl = document.getElementById('hn-gas'), pEl = document.getElementById('hn-pgas');
  const cResEl = document.getElementById('hn-res-conc'), mResEl = document.getElementById('hn-res-molar');

  function update() {
    const parts = gEl.value.split('_');
    const gasName = parts[0];
    const k_H = parseFloat(parts[1]); // mol / (L * atm)
    const molarMass = parseFloat(parts[2]); // g / mol

    const P_atm = parseFloat(pEl.value);
    if (isNaN(P_atm) || P_atm <= 0) return;

    // Henry's law: C = k_H * P_gas  [mol / L]
    const C_mol_L = k_H * P_atm;

    // Convert to mg/L (ppm): C_mg_L = C_mol_L * molarMass * 1000
    const C_mg_L = C_mol_L * molarMass * 1000.0;

    cResEl.textContent = 'C = ' + (C_mg_L >= 100 ? C_mg_L.toFixed(1) : C_mg_L.toFixed(2)) + ' mg / L (' + (C_mg_L).toFixed(1) + ' ppm)';
    mResEl.textContent = 'Molarity = ' + C_mol_L.toExponential(2) + ' mol/L (' + (C_mol_L * 1000).toFixed(3) + ' mM @ P_gas = ' + P_atm.toFixed(2) + ' atm)';
  }

  gEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();