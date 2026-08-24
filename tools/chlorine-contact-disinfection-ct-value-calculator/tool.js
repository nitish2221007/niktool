(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t'), pEl = document.getElementById('ct-path');
  const ctResEl = document.getElementById('ct-res-val'), stResEl = document.getElementById('ct-res-status');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(tEl.value), reqCT = parseFloat(pEl.value);
    if (isNaN(C) || isNaN(T10) || isNaN(reqCT) || C <= 0 || T10 <= 0) return;

    // CT = C * T10 (mg*min / L)
    const ctDelivered = C * T10;
    const ratio = ctDelivered / reqCT;
    const pct = ratio * 100;

    ctResEl.textContent = ctDelivered.toFixed(1) + ' mg·min / L (C · T₁₀)';

    if (ctDelivered >= reqCT) {
      stResEl.textContent = 'COMPLIES (' + pct.toFixed(1) + '% of Required CT: Safe 3-Log Kill)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'DEFICIT (' + pct.toFixed(1) + '% of Required ' + reqCT + ' mg·min/L Target)';
      stResEl.style.color = '#c53030';
    }
  }

  [cEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();