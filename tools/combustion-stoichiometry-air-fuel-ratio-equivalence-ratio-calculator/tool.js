(() => {
  'use strict';
  const fEl = document.getElementById('cb-fuel'), afrEl = document.getElementById('cb-afr');
  const lamResEl = document.getElementById('cb-res-lam'), mixResEl = document.getElementById('cb-res-mix');

  function update() {
    const parts = fEl.value.split('_');
    const stoichAFR = parseFloat(parts[0]);
    const fuelName = parts[1];

    const actualAFR = parseFloat(afrEl.value);
    if (isNaN(actualAFR) || isNaN(stoichAFR) || actualAFR <= 0) return;

    // Lambda = actualAFR / stoichAFR
    const lambda = actualAFR / stoichAFR;
    // Equivalence ratio phi = 1 / lambda
    const phi = 1.0 / lambda;

    let state = '', color = '#22543d';

    if (Math.abs(lambda - 1.0) < 0.02) {
      state = 'STOICHIOMETRIC (λ = 1.00: Ideal for catalytic converter conversion efficiency)';
      color = '#22543d';
    } else if (lambda > 1.0) {
      state = 'LEAN MIXTURE (λ = ' + lambda.toFixed(3) + ' > 1.0: Excess air / oxygen, lower CO but higher NOx)';
      color = '#2563eb';
    } else {
      state = 'RICH MIXTURE (λ = ' + lambda.toFixed(3) + ' < 1.0: Excess fuel, maximum power but high unburned hydrocarbons / CO)';
      color = '#c53030';
    }

    lamResEl.textContent = 'Lambda λ = ' + lambda.toFixed(3) + ' (' + state.split(' (')[0] + ')';
    lamResEl.style.color = color;
    mixResEl.textContent = state + ' | Equivalence Ratio φ = ' + phi.toFixed(3) + ' (Stoichiometric AFR = ' + stoichAFR + ':1)';
    mixResEl.style.color = color;
  }

  fEl.addEventListener('change', update);
  afrEl.addEventListener('input', update);
  update();
})();