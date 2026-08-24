(() => {
  'use strict';
  const b5El = document.getElementById('bod-b5'), k20El = document.getElementById('bod-k20');
  const tEl = document.getElementById('bod-temp'), tmEl = document.getElementById('bod-t');
  const buResEl = document.getElementById('bod-res-bu'), btResEl = document.getElementById('bod-res-bt');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(k20El.value);
    const Tc = parseFloat(tEl.value), tDays = parseFloat(tmEl.value);

    if (isNaN(BOD5) || isNaN(k20) || isNaN(Tc) || isNaN(tDays) || BOD5 <= 0 || k20 <= 0 || tDays <= 0) return;

    // Standard BOD5 is measured at 20°C: BOD5 = BOD_u * ( 1 - exp(-k20 * 5) )
    const BOD_u = BOD5 / (1.0 - Math.exp(-k20 * 5.0));

    // Temperature correction: k_T = k20 * (1.047)^(T - 20)
    const k_T = k20 * Math.pow(1.047, Tc - 20.0);

    // BOD exerted at target time t at temperature T: BOD_t = BOD_u * ( 1 - exp(-k_T * t) )
    const BOD_t = BOD_u * (1.0 - Math.exp(-k_T * tDays));
    const exertedPct = (BOD_t / BOD_u) * 100;

    buResEl.textContent = 'BOD_u = ' + BOD_u.toFixed(1) + ' mg / L Ultimate Oxygen Demand';
    btResEl.textContent = 'BOD(' + tDays + 'd @ ' + Tc + '°C) = ' + BOD_t.toFixed(1) + ' mg/L (' + exertedPct.toFixed(1) + '% Exerted, k_T = ' + k_T.toFixed(3) + ' day⁻¹)';
  }

  [b5El, k20El, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();