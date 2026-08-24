(() => {
  'use strict';
  const mEl = document.getElementById('brn-meat'), wEl = document.getElementById('brn-water'), pEl = document.getElementById('brn-pct');
  const sResEl = document.getElementById('brn-res-salt'), tResEl = document.getElementById('brn-res-tot');

  function update() {
    const meatG = parseFloat(mEl.value), waterG = parseFloat(wEl.value), saltPct = parseFloat(pEl.value);
    if (isNaN(meatG) || isNaN(waterG) || isNaN(saltPct) || meatG <= 0 || waterG < 0 || saltPct <= 0 || saltPct >= 100) return;

    // Equilibrium formula: Salt / (Meat + Water + Salt) = (saltPct / 100)
    // Salt * (1 - saltPct/100) = (Meat + Water) * (saltPct / 100)
    // Salt = (Meat + Water) * (saltPct / 100) / (1 - (saltPct / 100))
    const p = saltPct / 100;
    const saltG = ((meatG + waterG) * p) / (1 - p);
    const totalMass = meatG + waterG + saltG;

    sResEl.textContent = saltG.toFixed(1) + ' g Salt (Pure Kosher/Sea Salt)';
    tResEl.textContent = Math.round(totalMass).toLocaleString() + ' g System (' + saltPct.toFixed(1) + '% Equilibrium Salinity)';
  }

  [mEl, wEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();