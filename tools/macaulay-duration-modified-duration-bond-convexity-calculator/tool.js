(() => {
  'use strict';
  const cpnEl = document.getElementById('dur-cpn'), ytmEl = document.getElementById('dur-ytm');
  const matEl = document.getElementById('dur-mat'), dyEl = document.getElementById('dur-dy');
  const macResEl = document.getElementById('dur-res-mac'), modResEl = document.getElementById('dur-res-mod');

  function update() {
    const cpn_pct = parseFloat(cpnEl.value), ytm_pct = parseFloat(ytmEl.value);
    const N = parseInt(matEl.value, 10), dy_bps = parseFloat(dyEl.value);

    if (isNaN(cpn_pct) || isNaN(ytm_pct) || isNaN(N) || isNaN(dy_bps) || N <= 0 || ytm_pct <= 0) return;

    const y = ytm_pct / 100.0;
    const c = cpn_pct / 100.0;
    const M = 1000.0; // Par value
    const coupon = c * M;

    // Calculate bond price P and weighted time sum:
    let P = 0, weightedTimeSum = 0;
    for (let t = 1; t <= N; t++) {
      const cf = (t === N) ? (coupon + M) : coupon;
      const pv = cf / Math.pow(1.0 + y, t);
      P += pv;
      weightedTimeSum += t * pv;
    }

    // Macaulay Duration D_mac = sum( t * PV_t ) / P
    const D_mac = weightedTimeSum / P;

    // Modified Duration D_mod = D_mac / (1 + y)
    const D_mod = D_mac / (1.0 + y);

    // Price change: %DeltaP approx = -D_mod * Delta_y
    const dy = (dy_bps / 10000.0); // 1 bps = 0.0001
    const pctPriceChange = -D_mod * dy * 100.0;

    macResEl.textContent = 'Macaulay Duration = ' + D_mac.toFixed(2) + ' Years';
    modResEl.textContent = 'Modified Duration = ' + D_mod.toFixed(2) + ' | Price Change: ' + (pctPriceChange >= 0 ? '+' : '') + pctPriceChange.toFixed(2) + '% for a ' + (dy_bps >= 0 ? '+' : '') + dy_bps + ' bps rate shift';
  }

  [cpnEl, ytmEl, matEl, dyEl].forEach(el => el.addEventListener('input', update));
  update();
})();