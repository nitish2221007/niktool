(() => {
  'use strict';
  const h1El = document.getElementById('ws-h1'), v1El = document.getElementById('ws-v1');
  const h2El = document.getElementById('ws-h2'), tEl = document.getElementById('ws-terr');
  const v2ResEl = document.getElementById('ws-res-v2'), gnResEl = document.getElementById('ws-res-gain');

  function update() {
    const h1 = parseFloat(h1El.value), v1 = parseFloat(v1El.value);
    const h2 = parseFloat(h2El.value), alpha = parseFloat(tEl.value);

    if (isNaN(h1) || isNaN(v1) || isNaN(h2) || isNaN(alpha) || h1 <= 0 || v1 <= 0 || h2 <= 0) return;

    const v2 = v1 * Math.pow(h2 / h1, alpha);
    const pwrRatio = Math.pow(v2 / v1, 3);
    const pwrGainPct = (pwrRatio - 1) * 100;

    v2ResEl.textContent = v2.toFixed(2) + ' m/s @ ' + h2 + ' m (' + (v2 * 2.23694).toFixed(1) + ' mph)';
    gnResEl.textContent = '+' + pwrGainPct.toFixed(1) + '% Kinetic Power Gain (' + pwrRatio.toFixed(2) + '× v³ Multiplier vs 10m Mast)';
  }

  [h1El, v1El, h2El].forEach(el => el.addEventListener('input', update));
  tEl.addEventListener('change', update);
  update();
})();