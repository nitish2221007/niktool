(() => {
  'use strict';
  const aEl = document.getElementById('cd-a'), kEl = document.getElementById('cd-k'), lEl = document.getElementById('cd-l');
  const alEl = document.getElementById('cd-alpha'), btEl = document.getElementById('cd-beta');
  const yResEl = document.getElementById('cd-res-y'), mpResEl = document.getElementById('cd-res-mp');

  function update() {
    const A = parseFloat(aEl.value), K = parseFloat(kEl.value), L = parseFloat(lEl.value);
    const alpha = parseFloat(alEl.value), beta = parseFloat(btEl.value);

    if (isNaN(A) || isNaN(K) || isNaN(L) || isNaN(alpha) || isNaN(beta) || A <= 0 || K <= 0 || L <= 0 || alpha <= 0 || beta <= 0) return;

    // Y = A * K^alpha * L^beta
    const Y = A * Math.pow(K, alpha) * Math.pow(L, beta);

    // Marginal Product of Capital: MPK = alpha * Y / K
    const MPK = (alpha * Y) / K;
    // Marginal Product of Labor: MPL = beta * Y / L
    const MPL = (beta * Y) / L;

    const rts = alpha + beta;
    let rtsStr = '';
    if (Math.abs(rts - 1.0) < 0.01) rtsStr = 'Constant Returns to Scale (CRS: α + β = 1.00)';
    else if (rts > 1.0) rtsStr = 'Increasing Returns to Scale (IRS: α + β = ' + rts.toFixed(2) + ' > 1.0)';
    else rtsStr = 'Decreasing Returns to Scale (DRS: α + β = ' + rts.toFixed(2) + ' < 1.0)';

    yResEl.textContent = 'Output Y = ' + Y.toFixed(2) + ' Units';
    mpResEl.textContent = 'MPK = ' + MPK.toFixed(2) + ' | MPL = ' + MPL.toFixed(2) + ' | ' + rtsStr;
  }

  [aEl, kEl, lEl, alEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();