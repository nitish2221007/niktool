(() => {
  'use strict';
  const cpnEl = document.getElementById('ytm-cpn'), pEl = document.getElementById('ytm-price');
  const mEl = document.getElementById('ytm-par'), nEl = document.getElementById('ytm-n');
  const ytmResEl = document.getElementById('ytm-res-val'), stResEl = document.getElementById('ytm-res-status');

  function update() {
    const cpn_pct = parseFloat(cpnEl.value), P = parseFloat(pEl.value);
    const M = parseFloat(mEl.value), n = parseFloat(nEl.value);

    if (isNaN(cpn_pct) || isNaN(P) || isNaN(M) || isNaN(n) || P <= 0 || M <= 0 || n <= 0) return;

    const C = (cpn_pct / 100.0) * M;

    // Approximate YTM formula: YTM = [ C + (M - P)/n ] / [ (M + P) / 2 ]
    const num = C + ((M - P) / n);
    const den = (M + P) / 2.0;
    const approxYTM = (num / den) * 100.0;

    const currentYield = (C / P) * 100.0;
    const diff = P - M;

    let trade = '';
    let color = '#22543d';

    if (diff < -1) { trade = 'DISCOUNT BOND (Price < Par -> YTM > Coupon Rate)'; color = '#22543d'; }
    else if (diff > 1) { trade = 'PREMIUM BOND (Price > Par -> YTM < Coupon Rate)'; color = '#2563eb'; }
    else { trade = 'PAR BOND (Price = Par -> YTM = Coupon Rate)'; color = '#22543d'; }

    ytmResEl.textContent = 'YTM ≈ ' + approxYTM.toFixed(2) + '%';
    ytmResEl.style.color = color;
    stResEl.textContent = 'Current Yield = ' + currentYield.toFixed(2) + '% | ' + trade;
    stResEl.style.color = color;
  }

  [cpnEl, pEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();