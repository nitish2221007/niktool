(() => {
  'use strict';
  const lEl = document.getElementById('pn-len'), gEl = document.getElementById('pn-g');
  const tResEl = document.getElementById('pn-res-t'), fqResEl = document.getElementById('pn-res-freq');

  function update() {
    const L = parseFloat(lEl.value), g = parseFloat(gEl.value);
    if (isNaN(L) || isNaN(g) || L <= 0 || g <= 0) return;

    // Simple pendulum period: T = 2 * pi * sqrt( L / g )  [seconds]
    const T = 2.0 * Math.PI * Math.sqrt(L / g);
    const freq = 1.0 / T;

    tResEl.textContent = 'Period T = ' + T.toFixed(3) + ' Seconds';
    fqResEl.textContent = 'Frequency f = ' + freq.toFixed(3) + ' Hz (' + (freq * 60).toFixed(1) + ' BPM | Length L = ' + L + ' m @ g = ' + g + ' m/s²)';
  }

  lEl.addEventListener('input', update);
  gEl.addEventListener('change', update);
  update();
})();