(() => {
  'use strict';
  const t0El = document.getElementById('lc-t0'), tiEl = document.getElementById('lc-ti');
  const tauEl = document.getElementById('lc-tau'), tEl = document.getElementById('lc-t');
  const tmpResEl = document.getElementById('lc-res-temp'), drpResEl = document.getElementById('lc-res-drop');

  function update() {
    const T0 = parseFloat(t0El.value), Tinf = parseFloat(tiEl.value);
    const tau = parseFloat(tauEl.value), tSec = parseFloat(tEl.value);
    if (isNaN(T0) || isNaN(Tinf) || isNaN(tau) || isNaN(tSec) || tau <= 0 || tSec < 0) return;

    // T(t) = Tinf + (T0 - Tinf) * exp(-t / tau)
    const currentT = Tinf + (T0 - Tinf) * Math.exp(-tSec / tau);
    const tempDrop = T0 - currentT;
    const totalDelta = T0 - Tinf;
    const pctCooled = (tempDrop / totalDelta) * 100;

    tmpResEl.textContent = currentT.toFixed(2) + ' °C';
    drpResEl.textContent = (tempDrop >= 0 ? '-' : '+') + Math.abs(tempDrop).toFixed(2) + ' °C (' + pctCooled.toFixed(1) + '% of Equilibrium)';
  }

  [t0El, tiEl, tauEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();