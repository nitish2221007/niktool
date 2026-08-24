(() => {
  'use strict';
  const capeEl = document.getElementById('cape-val'), cinEl = document.getElementById('cape-cin');
  const wResEl = document.getElementById('cape-res-wmax'), sResEl = document.getElementById('cape-res-sev');

  function update() {
    const cape = parseFloat(capeEl.value), cin = parseFloat(cinEl.value);
    if (isNaN(cape) || isNaN(cin) || cape < 0 || cin < 0) return;

    // W_max = sqrt( 2 * CAPE )  [m / s]
    const wmax_ms = Math.sqrt(2 * cape);
    const wmax_kmh = wmax_ms * 3.6;
    const wmax_mph = wmax_ms * 2.23694;

    let stormSeverity = '';
    let color = '#22543d';

    if (cape < 1000) {
      stormSeverity = 'MARGINAL INSTABILITY (Weak Ordinary Showers / Garden Thunderstorms)';
      color = '#2563eb';
    } else if (cape < 2500) {
      stormSeverity = 'MODERATE INSTABILITY (Strong Multicell Storms, Small Hail Risk)';
      color = '#d97706';
    } else if (cape < 3500) {
      stormSeverity = 'VERY HIGH INSTABILITY (Severe Supercells, Large Damaging Hail >2 inches)';
      color = '#c53030';
    } else {
      stormSeverity = 'EXTREME EXPLOSIVE INSTABILITY (Violent Tornadoes & Giant Hailstones)';
      color = '#c53030';
    }

    wResEl.textContent = 'W_max = ' + wmax_ms.toFixed(1) + ' m/s (' + wmax_kmh.toFixed(0) + ' km/h / ' + wmax_mph.toFixed(0) + ' mph)';
    sResEl.textContent = stormSeverity + ' | CIN Cap: ' + cin + ' J/kg';
    sResEl.style.color = color;
  }

  capeEl.addEventListener('input', update);
  cinEl.addEventListener('input', update);
  update();
})();