(() => {
  'use strict';
  const gEl = document.getElementById('adj-gender'), wEl = document.getElementById('adj-act-wt'), hEl = document.getElementById('adj-ht');
  const adjEl = document.getElementById('adj-res-adj'), ibwEl = document.getElementById('adj-res-ibw'), pctEl = document.getElementById('adj-res-pct');

  function update() {
    const isMale = gEl.value === 'male';
    const actWt = parseFloat(wEl.value), hCm = parseFloat(hEl.value);
    if (isNaN(actWt) || isNaN(hCm) || actWt <= 0 || hCm <= 100) return;

    const hInches = hCm / 2.54;
    const over5Ft = Math.max(0, hInches - 60);
    const ibw = isMale ? (50.0 + 2.3 * over5Ft) : (45.5 + 2.3 * over5Ft);

    // AdjBW = IBW + 0.4 * (Actual - IBW)
    let adjBw = ibw;
    if (actWt > ibw) {
      adjBw = ibw + 0.4 * (actWt - ibw);
    }

    const pctOfIbw = (actWt / ibw) * 100;

    adjEl.textContent = adjBw.toFixed(1) + ' kg (' + (adjBw * 2.20462).toFixed(1) + ' lbs)';
    ibwEl.textContent = ibw.toFixed(1) + ' kg';
    pctEl.textContent = pctOfIbw.toFixed(1) + '% of IBW' + (pctOfIbw > 120 ? ' (AdjBW Required)' : ' (Use Actual Wt)');
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();