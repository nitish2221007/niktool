(() => {
  'use strict';
  const t0El = document.getElementById('rk-t0'), y0El = document.getElementById('rk-y0'), hEl = document.getElementById('rk-h');
  const y1ResEl = document.getElementById('rk-res-y1'), erResEl = document.getElementById('rk-res-err');

  // Test differential equation: dy/dt = f(t, y) = -y + cos(t)
  function f(t, y) {
    return -y + Math.cos(t);
  }

  function update() {
    const t0 = parseFloat(t0El.value), y0 = parseFloat(y0El.value), h = parseFloat(hEl.value);
    if (isNaN(t0) || isNaN(y0) || isNaN(h) || h <= 0) return;

    // RK4 intermediate slope evaluations:
    // k1 = f(t0, y0)
    const k1 = f(t0, y0);
    // k2 = f(t0 + h/2, y0 + h*k1/2)
    const k2 = f(t0 + (h / 2.0), y0 + (h * k1 / 2.0));
    // k3 = f(t0 + h/2, y0 + h*k2/2)
    const k3 = f(t0 + (h / 2.0), y0 + (h * k2 / 2.0));
    // k4 = f(t0 + h, y0 + h*k3)
    const k4 = f(t0 + h, y0 + (h * k3));

    // Updated state y1 = y0 + (h / 6) * (k1 + 2*k2 + 2*k3 + k4)
    const y1 = y0 + (h / 6.0) * (k1 + (2.0 * k2) + (2.0 * k3) + k4);
    const t1 = t0 + h;

    // Euler method for error comparison: y1_euler = y0 + h*k1
    const y1_euler = y0 + (h * k1);
    const diff = Math.abs(y1 - y1_euler);

    y1ResEl.textContent = 'y(' + t1.toFixed(2) + ') = ' + y1.toFixed(7);
    erResEl.textContent = 'Slopes: k₁=' + k1.toFixed(3) + ', k₂=' + k2.toFixed(3) + ', k₃=' + k3.toFixed(3) + ', k₄=' + k4.toFixed(3) + ' (Euler diff: ' + diff.toFixed(5) + ')';
  }

  [t0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();