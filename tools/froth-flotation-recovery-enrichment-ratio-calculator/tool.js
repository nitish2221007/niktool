(() => {
  'use strict';
  const fEl = document.getElementById('flt-f'), cEl = document.getElementById('flt-c'), tEl = document.getElementById('flt-t');
  const rResEl = document.getElementById('flt-res-rec'), eResEl = document.getElementById('flt-res-enr');

  function update() {
    const f = parseFloat(fEl.value), c = parseFloat(cEl.value), t = parseFloat(tEl.value);
    if (isNaN(f) || isNaN(c) || isNaN(t) || f <= 0 || c <= f || t >= f || t < 0) return;

    // Two-product flotation mass balance:
    // Concentrate mass fraction (Yield) Y = (f - t) / (c - t)
    const yieldFrac = (f - t) / (c - t);
    const yieldPct = yieldFrac * 100;

    // Recovery R = (c * (f - t)) / (f * (c - t)) * 100 = (c / f) * Y
    const recoveryPct = (c / f) * yieldPct;

    // Enrichment ratio = c / f
    const enrichment = c / f;

    rResEl.textContent = recoveryPct.toFixed(1) + '% Metallurgical Recovery';
    eResEl.textContent = 'Enrichment: ' + enrichment.toFixed(2) + '× (' + f + '% to ' + c + '%) | Mass Pull: ' + yieldPct.toFixed(2) + '% of Feed';
  }

  [fEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();