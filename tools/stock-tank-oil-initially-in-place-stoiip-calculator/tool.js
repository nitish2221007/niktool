(() => {
  'use strict';
  const aEl = document.getElementById('st-area'), hEl = document.getElementById('st-h');
  const pEl = document.getElementById('st-phi'), swEl = document.getElementById('st-sw'), bEl = document.getElementById('st-boi');
  const sResEl = document.getElementById('st-res-stoiip'), rResEl = document.getElementById('st-res-recov');

  function update() {
    const A = parseFloat(aEl.value), h = parseFloat(hEl.value);
    const phiPct = parseFloat(pEl.value), swPct = parseFloat(swEl.value), Boi = parseFloat(bEl.value);

    if (isNaN(A) || isNaN(h) || isNaN(phiPct) || isNaN(swPct) || isNaN(Boi) || A <= 0 || h <= 0 || phiPct <= 0 || Boi <= 0) return;

    const phi = phiPct / 100;
    const Sw = swPct / 100;

    // STOIIP = (7758 * A * h * phi * (1 - Sw)) / Boi  [Stock Tank Barrels]
    const stoiipBarrels = (7758 * A * h * phi * (1 - Sw)) / Boi;
    const stoiipMmstb = stoiipBarrels / 1e6;
    const recoverableMmstb = stoiipMmstb * 0.35; // Standard 35% recovery factor

    sResEl.textContent = stoiipMmstb.toFixed(2) + ' MMSTB (Million Barrels)';
    rResEl.textContent = recoverableMmstb.toFixed(2) + ' MMSTB Recoverable (~35% Recovery Factor)';
  }

  [aEl, hEl, pEl, swEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();