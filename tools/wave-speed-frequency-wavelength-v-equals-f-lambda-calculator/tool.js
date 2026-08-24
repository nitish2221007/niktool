(() => {
  'use strict';
  const fEl = document.getElementById('wv-f'), lEl = document.getElementById('wv-l');
  const vResEl = document.getElementById('wv-res-v'), tResEl = document.getElementById('wv-res-t');

  function update() {
    const f = parseFloat(fEl.value), lambda = parseFloat(lEl.value);
    if (isNaN(f) || isNaN(lambda) || f <= 0 || lambda <= 0) return;

    // Wave speed v = f * lambda  [m/s]
    const v = f * lambda;
    const period_s = 1.0 / f;
    const period_ms = period_s * 1000.0;

    let type = '';
    if (Math.abs(v - 3e8) / 3e8 < 0.1) type = 'Electromagnetic Light / Radio Wave (c ≈ 3.00 × 10⁸ m/s)';
    else if (v >= 300 && v <= 400) type = 'Acoustic Sound Wave in Air (~343 m/s @ 20°C)';
    else if (v >= 1400 && v <= 1600) type = 'Acoustic Sound Wave in Water (~1500 m/s)';
    else type = 'General Wave Propagation';

    vResEl.textContent = 'v = ' + (v >= 1e6 ? v.toExponential(2) : v.toFixed(1)) + ' m/s';
    tResEl.textContent = 'Wave Period T = ' + (period_ms < 1 ? (period_s * 1e6).toFixed(1) + ' μs' : period_ms.toFixed(2) + ' ms') + ' | ' + type;
  }

  fEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();