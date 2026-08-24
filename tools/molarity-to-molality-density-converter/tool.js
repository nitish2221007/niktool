(() => {
  'use strict';
  const mEl = document.getElementById('mm-molar'), dEl = document.getElementById('mm-dens'), mwEl = document.getElementById('mm-mw');
  const molResEl = document.getElementById('mm-res-molal'), wtResEl = document.getElementById('mm-res-wtpct');

  function update() {
    const M = parseFloat(mEl.value), d = parseFloat(dEl.value), MW = parseFloat(mwEl.value);
    if (isNaN(M) || isNaN(d) || isNaN(MW) || M <= 0 || d <= 0 || MW <= 0) return;

    // Mass of 1 Liter of solution = 1000 * d (grams)
    const massSoln = 1000 * d;
    // Mass of solute in 1 Liter = M * MW (grams)
    const massSolute = M * MW;
    // Mass of solvent in 1 Liter = massSoln - massSolute (grams)
    const massSolvent = massSoln - massSolute;

    if (massSolvent <= 0) {
      molResEl.textContent = 'Invalid parameters (Solute mass exceeds solution mass)';
      return;
    }

    // Molality m = Moles / (massSolvent / 1000) = (1000 * M) / massSolvent
    const molality = (1000 * M) / massSolvent;
    // Weight % = (massSolute / massSoln) * 100
    const wtPct = (massSolute / massSoln) * 100;

    molResEl.textContent = molality.toFixed(3) + ' mol / kg (molal)';
    wtResEl.textContent = wtPct.toFixed(2) + '% by Mass (w/w)';
  }

  [mEl, dEl, mwEl].forEach(el => el.addEventListener('input', update));
  update();
})();