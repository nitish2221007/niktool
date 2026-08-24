(() => {
  'use strict';
  const solEl = document.getElementById('mp-solute'), solvEl = document.getElementById('mp-solvent');
  const pctEl = document.getElementById('mp-res-pct'), totEl = document.getElementById('mp-res-total');

  function update() {
    const solute = parseFloat(solEl.value), solvent = parseFloat(solvEl.value);
    if (isNaN(solute) || isNaN(solvent) || solute <= 0 || solvent <= 0) return;

    const total = solute + solvent;
    const pct = (solute / total) * 100;

    pctEl.textContent = pct.toFixed(2) + '% (w/w)';
    totEl.textContent = total.toFixed(2) + ' grams';
  }

  solEl.addEventListener('input', update);
  solvEl.addEventListener('input', update);
  update();
})();