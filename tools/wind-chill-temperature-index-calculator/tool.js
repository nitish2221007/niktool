(() => {
  'use strict';
  const tEl = document.getElementById('wc-temp'), wEl = document.getElementById('wc-wind');
  const cResEl = document.getElementById('wc-res-chill'), dResEl = document.getElementById('wc-res-danger');

  function update() {
    const T = parseFloat(tEl.value), V = parseFloat(wEl.value);
    if (isNaN(T) || isNaN(V) || V < 3 || T > 50) {
      cResEl.textContent = 'Enter T ≤ 50°F and V ≥ 3 mph';
      return;
    }

    // NWS Formula: T_wc = 35.74 + 0.6215*T - 35.75*(V^0.16) + 0.4275*T*(V^0.16)
    const vPow = Math.pow(V, 0.16);
    const wcF = 35.74 + (0.6215 * T) - (35.75 * vPow) + (0.4275 * T * vPow);
    const wcC = (wcF - 32) * (5 / 9);

    cResEl.textContent = wcF.toFixed(1) + ' °F (' + wcC.toFixed(1) + ' °C)';

    if (wcF < -35) {
      dResEl.textContent = 'EXTREME DANGER: Frostbite in Under 10 Mins!';
      dResEl.style.color = '#c53030';
    } else if (wcF < -18) {
      dResEl.textContent = 'DANGER: Frostbite in Under 30 Mins!';
      dResEl.style.color = '#c53030';
    } else if (wcF < 0) {
      dResEl.textContent = 'Caution: Hypothermia Risk on Exposed Skin';
      dResEl.style.color = '#d97706';
    } else {
      dResEl.textContent = 'Low Immediate Frostbite Risk';
      dResEl.style.color = '#22543d';
    }
  }

  tEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();