(() => {
  'use strict';
  const aaEl = document.getElementById('pi-aa'), phEl = document.getElementById('pi-ph');
  const piResEl = document.getElementById('pi-res-pi'), chResEl = document.getElementById('pi-res-charge');

  function update() {
    const parts = aaEl.value.split('_');
    const name = parts[0];
    const pK1 = parseFloat(parts[1]); // alpha-COOH
    const pK2 = parseFloat(parts[2]); // alpha-NH3+
    const pKR = parseFloat(parts[3]); // side chain
    const pH = parseFloat(phEl.value);

    if (isNaN(pH) || pH < 0 || pH > 14) return;

    let pI = 0;
    if (pKR === 0) {
      // Neutral amino acid: pI = (pK1 + pK2) / 2
      pI = (pK1 + pK2) / 2.0;
    } else if (name === 'glu' || name === 'asp') {
      // Acidic side chain: pI = (pK1 + pKR) / 2
      pI = (pK1 + pKR) / 2.0;
    } else {
      // Basic side chain: pI = (pK2 + pKR) / 2
      pI = (pK2 + pKR) / 2.0;
    }

    // Net charge via Henderson-Hasselbalch:
    // alpha-COOH charge = -1 / ( 1 + 10^(pK1 - pH) )
    const q_cooh = -1.0 / (1.0 + Math.pow(10.0, pK1 - pH));
    // alpha-NH3+ charge = +1 / ( 1 + 10^(pH - pK2) )
    const q_nh3 = 1.0 / (1.0 + Math.pow(10.0, pH - pK2));

    let q_side = 0;
    if (name === 'glu' || name === 'asp') {
      q_side = -1.0 / (1.0 + Math.pow(10.0, pKR - pH));
    } else if (name === 'lys' || name === 'arg' || name === 'his') {
      q_side = 1.0 / (1.0 + Math.pow(10.0, pH - pKR));
    }

    const netCharge = q_cooh + q_nh3 + q_side;

    piResEl.textContent = 'Isoelectric Point pI = ' + pI.toFixed(2);
    chResEl.textContent = 'Net Charge @ pH ' + pH.toFixed(2) + ' = ' + (netCharge >= 0 ? '+' : '') + netCharge.toFixed(2) + ' (' + (Math.abs(pH - pI) < 0.2 ? 'ZWITTERION Neutral' : (netCharge > 0 ? 'CATION (+)' : 'ANION (-)')) + ')';
  }

  aaEl.addEventListener('change', update);
  phEl.addEventListener('input', update);
  update();
})();