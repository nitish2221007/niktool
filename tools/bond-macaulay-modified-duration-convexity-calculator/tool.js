(() => {
  'use strict';
  const cEl = document.getElementById('bnd-coup'), yEl = document.getElementById('bnd-ytm');
  const mEl = document.getElementById('bnd-mat'), dyEl = document.getElementById('bnd-dy');
  const dResEl = document.getElementById('bnd-res-dur'), pResEl = document.getElementById('bnd-res-pdrop');

  function update() {
    const couponPct = parseFloat(cEl.value), ytmPct = parseFloat(yEl.value);
    const nYears = parseInt(mEl.value, 10), dyBps = parseFloat(dyEl.value);

    if (isNaN(couponPct) || isNaN(ytmPct) || isNaN(nYears) || isNaN(dyBps) || nYears <= 0 || ytmPct <= 0) return;

    const c = couponPct / 100;
    const y = ytmPct / 100;
    const dy = dyBps / 10000; // bps to decimal (100 bps = 0.01)

    // Calculate bond price P = sum( C / (1+y)^t ) + Face / (1+y)^N where Face = 100
    let price = 0;
    let macNum = 0;
    let convNum = 0;

    for (let t = 1; t <= nYears; t++) {
      const cashflow = t === nYears ? (100 * c) + 100 : (100 * c);
      const pv = cashflow / Math.pow(1 + y, t);
      price += pv;
      macNum += t * pv;
      convNum += t * (t + 1) * pv;
    }

    // Macaulay duration = macNum / Price  [years]
    const D_mac = macNum / price;
    // Modified duration = D_mac / (1 + y)  [years]
    const D_mod = D_mac / (1 + y);

    // Convexity C = convNum / ( Price * (1+y)^2 )
    const Convexity = convNum / (price * Math.pow(1 + y, 2));

    // Taylor series price change: deltaP_P = -D_mod * dy + 0.5 * Convexity * dy^2
    const deltaP_P_linear = -D_mod * dy;
    const deltaP_P_convex = deltaP_P_linear + (0.5 * Convexity * Math.pow(dy, 2));
    const deltaP_pct = deltaP_P_convex * 100;

    dResEl.textContent = 'D_mod = ' + D_mod.toFixed(2) + ' Years (Macaulay: ' + D_mac.toFixed(2) + ' Years)';
    pResEl.textContent = 'Price Change: ' + (deltaP_pct >= 0 ? '+' : '') + deltaP_pct.toFixed(2) + '% for ' + (dyBps >= 0 ? '+' : '') + dyBps + ' bps shift (Bond Price: $' + price.toFixed(2) + ', Convexity: ' + Convexity.toFixed(1) + ')';
  }

  [cEl, yEl, mEl, dyEl].forEach(el => el.addEventListener('input', update));
  update();
})();