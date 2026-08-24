(() => {
  'use strict';
  const gEl = document.getElementById('lbm-gender'), wEl = document.getElementById('lbm-wt'), hEl = document.getElementById('lbm-ht');
  const boerEl = document.getElementById('lbm-res-boer'), fatEl = document.getElementById('lbm-res-fat');

  function update() {
    const isMale = gEl.value === 'male';
    const W = parseFloat(wEl.value);
    const H = parseFloat(hEl.value);
    if (isNaN(W) || isNaN(H) || W <= 0 || H <= 0) return;

    // Boer Formula:
    // Male: LBM = 0.407 * W + 0.267 * H - 19.2
    // Female: LBM = 0.252 * W + 0.473 * H - 48.3
    let lbm = isMale ? (0.407 * W + 0.267 * H - 19.2) : (0.252 * W + 0.473 * H - 48.3);
    if (lbm < 10) lbm = 10;
    if (lbm > W) lbm = W * 0.95;

    const fatKg = W - lbm;
    const fatPct = (fatKg / W) * 100;
    const lbmLbs = lbm * 2.20462;

    boerEl.textContent = lbm.toFixed(1) + ' kg (' + lbmLbs.toFixed(1) + ' lbs)';
    fatEl.textContent = fatKg.toFixed(1) + ' kg (' + fatPct.toFixed(1) + '%)';
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();