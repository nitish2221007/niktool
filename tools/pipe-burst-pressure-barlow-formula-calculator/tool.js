(() => {
  'use strict';
  const sEl = document.getElementById('bp-s'), tEl = document.getElementById('bp-t');
  const dEl = document.getElementById('bp-d'), dfEl = document.getElementById('bp-df');
  const bResEl = document.getElementById('bp-res-burst'), mResEl = document.getElementById('bp-res-maop');

  function update() {
    const S = parseFloat(sEl.value), t = parseFloat(tEl.value);
    const D = parseFloat(dEl.value), F = parseFloat(dfEl.value);

    if (isNaN(S) || isNaN(t) || isNaN(D) || isNaN(F) || S <= 0 || t <= 0 || D <= 0 || t >= D) return;

    // Barlow's Formula: P = (2 * S * t) / D  [psi]
    const pBurst = (2 * S * t) / D;
    const pMaop = pBurst * F;
    const pBurstBar = pBurst * 0.0689476;
    const pMaopBar = pMaop * 0.0689476;

    bResEl.textContent = Math.round(pBurst).toLocaleString() + ' psi (' + pBurstBar.toFixed(1) + ' bar)';
    mResEl.textContent = Math.round(pMaop).toLocaleString() + ' psi MAOP (' + pMaopBar.toFixed(1) + ' bar, F = ' + F + ')';
  }

  [sEl, tEl, dEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();