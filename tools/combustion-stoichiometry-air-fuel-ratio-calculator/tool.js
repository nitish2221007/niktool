(() => {
  'use strict';
  const fEl = document.getElementById('afr-fuel'), fmEl = document.getElementById('afr-fmass'), amEl = document.getElementById('afr-amass');
  const lamEl = document.getElementById('afr-res-lambda'), actEl = document.getElementById('afr-res-actual'), stEl = document.getElementById('afr-res-status');

  function update() {
    const stoichAfr = parseFloat(fEl.value);
    const fuelMass = parseFloat(fmEl.value);
    const airMass = parseFloat(amEl.value);
    if (isNaN(stoichAfr) || isNaN(fuelMass) || isNaN(airMass) || fuelMass <= 0 || airMass <= 0) return;

    // Actual AFR = Air Mass / Fuel Mass
    const actualAfr = airMass / fuelMass;
    // Lambda = Actual AFR / Stoichiometric AFR
    const lambda = actualAfr / stoichAfr;

    lamEl.textContent = 'λ = ' + lambda.toFixed(3);
    actEl.textContent = actualAfr.toFixed(2) + ' : 1';

    if (Math.abs(lambda - 1.0) < 0.02) {
      stEl.textContent = 'Stoichiometric (Optimal Emissions & Fuel Economy)';
      stEl.style.color = '#22543d';
    } else if (lambda < 0.98) {
      stEl.textContent = 'Rich Mixture (λ < 1.0: Maximum Power, Higher CO)';
      stEl.style.color = '#2563eb';
    } else {
      stEl.textContent = 'Lean Mixture (λ > 1.0: High Efficiency, Higher NOx)';
      stEl.style.color = '#d97706';
    }
  }

  [fEl, fmEl, amEl].forEach(el => el.addEventListener('input', update));
  update();
})();