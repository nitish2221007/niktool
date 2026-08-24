(() => {
  'use strict';
  const tEl = document.getElementById('wav-t'), dEl = document.getElementById('wav-d');
  const cResEl = document.getElementById('wav-res-c'), lResEl = document.getElementById('wav-res-l');

  const g = 9.80665;

  function update() {
    const T = parseFloat(tEl.value), d = parseFloat(dEl.value);
    if (isNaN(T) || isNaN(d) || T <= 0 || d <= 0) return;

    const L0 = (g * Math.pow(T, 2)) / (2 * Math.PI);
    let L = L0;
    for (let i = 0; i < 25; i++) {
      L = L0 * Math.tanh((2 * Math.PI * d) / L);
    }

    const c = L / T;
    const dOverL = d / L;

    let regime = '';
    if (dOverL >= 0.5) regime = 'Deep Water (d ≥ L/2: c = 1.56·T)';
    else if (dOverL <= 0.05) regime = 'Shallow Water (d ≤ L/20: c = √(g·d) Tsunami Speed)';
    else regime = 'Transitional Intermediate Water (0.05 < d/L < 0.5)';

    cResEl.textContent = c.toFixed(2) + ' m / s (' + (c * 3.6).toFixed(1) + ' km/h, ' + (c * 1.94384).toFixed(1) + ' knots)';
    lResEl.textContent = 'Wavelength L = ' + L.toFixed(1) + ' m (L₀_deep = ' + L0.toFixed(1) + ' m | ' + regime + ')';
  }

  tEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();