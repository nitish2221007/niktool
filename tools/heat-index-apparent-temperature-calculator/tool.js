(() => {
  'use strict';
  const tEl = document.getElementById('hi-temp'), rhEl = document.getElementById('hi-rh');
  const hiResEl = document.getElementById('hi-res-hi'), alResEl = document.getElementById('hi-res-alert');

  function update() {
    const T = parseFloat(tEl.value), RH = parseFloat(rhEl.value);
    if (isNaN(T) || isNaN(RH) || T < 80 || RH < 0 || RH > 100) {
      hiResEl.textContent = 'Enter T ≥ 80°F and RH 0-100%';
      return;
    }

    // NOAA Rothfusz full regression formula:
    const HI = -42.379 + (2.04901523 * T) + (10.14333127 * RH) - (0.22475541 * T * RH) - (0.00683783 * T * T) - (0.05481717 * RH * RH) + (0.00122874 * T * T * RH) + (0.00085282 * T * RH * RH) - (0.00000199 * T * T * RH * RH);
    const hiC = (HI - 32) * (5 / 9);

    hiResEl.textContent = HI.toFixed(1) + ' °F (' + hiC.toFixed(1) + ' °C)';

    if (HI >= 130) {
      alResEl.textContent = 'EXTREME DANGER: Heatstroke Imminent (130°F+)';
      alResEl.style.color = '#7f1d1d';
    } else if (HI >= 105) {
      alResEl.textContent = 'DANGER: Heat Exhaustion Likely with Prolonged Activity (105-129°F)';
      alResEl.style.color = '#c53030';
    } else if (HI >= 90) {
      alResEl.textContent = 'Extreme Caution: Heat Cramps & Fatigue Possible (90-104°F)';
      alResEl.style.color = '#d97706';
    } else {
      alResEl.textContent = 'Caution: Fatigue Possible (80-89°F)';
      alResEl.style.color = '#22543d';
    }
  }

  tEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();