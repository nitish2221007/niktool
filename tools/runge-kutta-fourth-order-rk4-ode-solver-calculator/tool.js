(() => {
  'use strict';
  const odeEl = document.getElementById('rk-ode'), x0El = document.getElementById('rk-x0');
  const y0El = document.getElementById('rk-y0'), hEl = document.getElementById('rk-h');
  const yendResEl = document.getElementById('rk-res-yend'), slResEl = document.getElementById('rk-res-slopes');

  function f(type, x, y) {
    if (type === 'decay') return -2.0 * y;
    if (type === 'growth') return y;
    if (type === 'linear') return x + y;
    return y * (1.0 - y);
  }

  function update() {
    const odeType = odeEl.value;
    let x = parseFloat(x0El.value), y = parseFloat(y0El.value);
    const h = parseFloat(hEl.value);
    const targetX = 1.0;

    if (isNaN(x) || isNaN(y) || isNaN(h) || h <= 0 || x >= targetX) return;

    let k1 = 0, k2 = 0, k3 = 0, k4 = 0;
    let steps = 0;

    while (x < targetX - 1e-6 && steps < 1000) {
      const step_h = Math.min(h, targetX - x);
      k1 = f(odeType, x, y);
      k2 = f(odeType, x + 0.5 * step_h, y + 0.5 * step_h * k1);
      k3 = f(odeType, x + 0.5 * step_h, y + 0.5 * step_h * k2);
      k4 = f(odeType, x + step_h, y + step_h * k3);

      y = y + (step_h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
      x += step_h;
      steps++;
    }

    yendResEl.textContent = 'y(' + targetX.toFixed(1) + ') ≈ ' + y.toFixed(6);
    slResEl.textContent = 'Last Slopes: k₁=' + k1.toFixed(3) + ', k₂=' + k2.toFixed(3) + ', k₃=' + k3.toFixed(3) + ', k₄=' + k4.toFixed(3) + ' (' + steps + ' RK4 Steps)';
  }

  [odeEl, x0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  odeEl.addEventListener('change', update);
  update();
})();