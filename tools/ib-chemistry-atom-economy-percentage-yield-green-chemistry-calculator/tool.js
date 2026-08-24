(() => {
  'use strict';
  const desEl = document.getElementById('ae-desired'), recEl = document.getElementById('ae-reactants');
  const actEl = document.getElementById('ae-actual'), thEl = document.getElementById('ae-theory');
  const aeResEl = document.getElementById('ae-res-ae'), yResEl = document.getElementById('ae-res-yield');

  function update() {
    const des = parseFloat(desEl.value), rec = parseFloat(recEl.value);
    const act = parseFloat(actEl.value), theory = parseFloat(thEl.value);

    if (isNaN(des) || isNaN(rec) || isNaN(act) || isNaN(theory) || des <= 0 || rec <= 0 || act < 0 || theory <= 0) return;

    // Atom Economy = ( molar mass desired product / sum molar mass all reactants ) * 100
    // Note: for glucose fermentation C6H12O6 -> 2 C2H5OH + 2 CO2, 2 * 46.07 / 180.16 = 51.1%
    const atom_economy = (Math.min(des, rec) / rec) * 100.0;

    // Percentage Yield = ( actual yield / theoretical yield ) * 100
    const percent_yield = (act / theory) * 100.0;

    aeResEl.textContent = 'Atom Economy = ' + atom_economy.toFixed(1) + '%';
    yResEl.textContent = 'Percentage Yield = ' + percent_yield.toFixed(1) + '% (Waste by-products = ' + (100 - atom_economy).toFixed(1) + '% of reactant mass)';
  }

  [desEl, recEl, actEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();