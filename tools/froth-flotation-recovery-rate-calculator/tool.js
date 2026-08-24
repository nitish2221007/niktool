(() => {
  'use strict';
  const fEl = document.getElementById('flt-f'), cEl = document.getElementById('flt-c'), tEl = document.getElementById('flt-t');
  const recResEl = document.getElementById('flt-res-rec'), kResEl = document.getElementById('flt-res-k');

  function update() {
    const f = parseFloat(fEl.value), c = parseFloat(cEl.value), t = parseFloat(tEl.value);
    if (isNaN(f) || isNaN(c) || isNaN(t) || f <= t || c <= f || t < 0) return;

    // Two-product metallurgical mass balance:
    // Recovery R = 100 * (c * (f - t)) / (f * (c - t))
    const recovery = 100 * ((c * (f - t)) / (f * (c - t)));
    // Ratio of Concentration K = (c - t) / (f - t)
    const K = (c - t) / (f - t);
    // Enrichment ratio = c / f
    const enrichment = c / f;

    recResEl.textContent = recovery.toFixed(2) + '% Recovery';
    kResEl.textContent = K.toFixed(2) + ' : 1 (Enrichment ' + enrichment.toFixed(1) + 'x)';
  }

  [fEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();