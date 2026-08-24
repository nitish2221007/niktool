(() => {
  'use strict';
  const wtEl = document.getElementById('cr-wt'), stEl = document.getElementById('cr-strat');
  const loadEl = document.getElementById('cr-res-load'), maintEl = document.getElementById('cr-res-maint');

  function update() {
    const wt = parseFloat(wtEl.value), strat = stEl.value;
    if (isNaN(wt) || wt <= 0) return;

    if (strat === 'fast') {
      // 0.3g / kg / day split into 4 doses
      const totalLoadG = Math.round(wt * 0.3);
      const splitDose = (totalLoadG / 4).toFixed(1);
      loadEl.textContent = totalLoadG + ' g / day (4x ' + splitDose + 'g doses for 5-7 days)';
      maintEl.textContent = Math.max(3, Math.round(wt * 0.04)) + ' to 5.0 g / day';
    } else {
      loadEl.textContent = 'No Loading Required (Steady Saturation in ~28 days)';
      maintEl.textContent = '5.0 g / day (Single daily dose)';
    }
  }

  wtEl.addEventListener('input', update);
  stEl.addEventListener('change', update);
  update();
})();