(() => {
  'use strict';
  const mEl = document.getElementById('me-m'), hEl = document.getElementById('me-h');
  const vResEl = document.getElementById('me-res-v'), eResEl = document.getElementById('me-res-e');

  const g = 9.80665;

  function update() {
    const mass = parseFloat(mEl.value), h = parseFloat(hEl.value);
    if (isNaN(mass) || isNaN(h) || mass <= 0 || h < 0) return;

    // E_p = m * g * h  [Joules]
    const E_p = mass * g * h;
    const E_kJ = E_p / 1000.0;

    // By conservation of energy: E_p = E_k = 0.5 * m * v^2 => v = sqrt( 2 * g * h )
    const v = Math.sqrt(2.0 * g * h);
    const v_kmh = v * 3.6;

    vResEl.textContent = 'Bottom Speed v = ' + v.toFixed(2) + ' m/s (' + v_kmh.toFixed(1) + ' km/h)';
    eResEl.textContent = 'Total Mechanical Energy E = ' + E_kJ.toFixed(1) + ' kJ (m = ' + mass + ' kg @ h = ' + h + ' m, g = 9.81 m/s²)';
  }

  mEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();