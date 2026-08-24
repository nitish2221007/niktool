(() => {
  'use strict';
  const toutEl = document.getElementById('hp-tout'), tinEl = document.getElementById('hp-tin'), carEl = document.getElementById('hp-carnot');
  const copResEl = document.getElementById('hp-res-cop'), savResEl = document.getElementById('hp-res-save');

  function update() {
    const ToutC = parseFloat(toutEl.value), TinC = parseFloat(tinEl.value), carRatio = parseFloat(carEl.value);
    if (isNaN(ToutC) || isNaN(TinC) || isNaN(carRatio) || TinC <= ToutC) return;

    const Thot = TinC + 273.15;
    const Tcold = ToutC + 273.15;

    // Ideal Carnot Heating COP = Thot / (Thot - Tcold)
    const copCarnot = Thot / (Thot - Tcold);
    // Real COP = carnotRatio * copCarnot
    const copReal = Math.max(1.0, carRatio * copCarnot);

    // Savings vs 1.0 COP electric resistance = (1 - 1/COP) * 100
    const savingsPct = ((copReal - 1) / copReal) * 100;

    copResEl.textContent = 'COP = ' + copReal.toFixed(2) + ' (' + (copReal * 100).toFixed(0) + '% Thermal Output)';
    savResEl.textContent = savingsPct.toFixed(1) + '% Electricity Savings (vs COP 1.0 Heaters)';
  }

  [toutEl, tinEl, carEl].forEach(el => el.addEventListener('input', update));
  update();
})();