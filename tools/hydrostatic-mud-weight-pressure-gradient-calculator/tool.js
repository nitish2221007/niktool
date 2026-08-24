(() => {
  'use strict';
  const mwEl = document.getElementById('hyd-mw'), tvdEl = document.getElementById('hyd-tvd');
  const pResEl = document.getElementById('hyd-res-psi'), gResEl = document.getElementById('hyd-res-grad');

  function update() {
    const mwPpg = parseFloat(mwEl.value), tvdFt = parseFloat(tvdEl.value);
    if (isNaN(mwPpg) || isNaN(tvdFt) || mwPpg <= 0 || tvdFt <= 0) return;

    // Gradient = 0.052 * MW (psi / ft)
    const gradient = 0.052 * mwPpg;
    // Hydrostatic Pressure P = 0.052 * MW * TVD (psi)
    const pressurePsi = gradient * tvdFt;
    const pressureBar = pressurePsi * 0.0689476;

    pResEl.textContent = Math.round(pressurePsi).toLocaleString() + ' psi (' + pressureBar.toFixed(1) + ' bar)';
    gResEl.textContent = gradient.toFixed(3) + ' psi / ft (' + (gradient * 22.62).toFixed(2) + ' kPa/m)';
  }

  mwEl.addEventListener('input', update);
  tvdEl.addEventListener('input', update);
  update();
})();