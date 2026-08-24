(() => {
  'use strict';
  const matEl = document.getElementById('shld-mat'), thkEl = document.getElementById('shld-thk'), i0El = document.getElementById('shld-i0');
  const iResEl = document.getElementById('shld-res-i'), hvlResEl = document.getElementById('shld-res-hvl');

  const SHIELDS = {
    'lead':     { hvl_cm: 0.55, mu_cm: 1.26, name: 'Lead' },
    'steel':    { hvl_cm: 1.60, mu_cm: 0.433, name: 'Steel' },
    'concrete': { hvl_cm: 4.80, mu_cm: 0.144, name: 'Concrete' },
    'water':    { hvl_cm: 10.5, mu_cm: 0.066, name: 'Water' }
  };

  function update() {
    const s = SHIELDS[matEl.value];
    const xCm = parseFloat(thkEl.value), I0 = parseFloat(i0El.value);

    if (isNaN(xCm) || isNaN(I0) || xCm < 0 || I0 <= 0) return;

    // Number of HVLs = x / HVL
    const numHvl = xCm / s.hvl_cm;

    // Attenuated dose rate I = I0 * (0.5)^numHvl = I0 * exp(-mu * x)
    const I = I0 * Math.pow(0.5, numHvl);
    const attenPct = ((I0 - I) / I0) * 100;
    const reductionFactor = I0 / I;

    iResEl.textContent = (I < 0.01 ? I.toExponential(2) : I.toFixed(2)) + ' mSv / h (' + attenPct.toFixed(1) + '% Blocked)';
    hvlResEl.textContent = numHvl.toFixed(2) + ' HVLs (' + s.name + ' Shield: ' + reductionFactor.toFixed(1) + '× Dose Reduction, TVL = ' + (s.hvl_cm * 3.322).toFixed(1) + ' cm)';
  }

  matEl.addEventListener('change', update);
  thkEl.addEventListener('input', update);
  i0El.addEventListener('input', update);
  update();
})();