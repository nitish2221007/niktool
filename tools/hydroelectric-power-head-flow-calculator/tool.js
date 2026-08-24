(() => {
  'use strict';
  const hEl = document.getElementById('hp-h'), qEl = document.getElementById('hp-q'), effEl = document.getElementById('hp-eff');
  const pResEl = document.getElementById('hp-res-p'), aResEl = document.getElementById('hp-res-annual');

  const rhoWater = 1000; // kg / m^3
  const gGrav = 9.80665; // m / s^2

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), effPct = parseFloat(effEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(effPct) || H <= 0 || Q <= 0 || effPct <= 0) return;

    // P = eta * rho * g * Q * H (Watts)
    const pWatts = (effPct / 100) * rhoWater * gGrav * Q * H;
    const pKw = pWatts / 1000;
    const pMw = pKw / 1000;

    // Annual energy (8,760 hours/yr at 100% capacity factor)
    const gwhYear = (pMw * 8760) / 1000;

    pResEl.textContent = pMw >= 1.0 ? pMw.toFixed(2) + ' MW (' + Math.round(pKw).toLocaleString() + ' kW)' : Math.round(pKw) + ' kW';
    aResEl.textContent = gwhYear.toFixed(1) + ' GWh / year (~' + Math.round(gwhYear * 1000 / 10.5).toLocaleString() + ' homes powered)';
  }

  [hEl, qEl, effEl].forEach(el => el.addEventListener('input', update));
  update();
})();