(() => {
  'use strict';
  const rEl = document.getElementById('log-r'), x0El = document.getElementById('log-x0');
  const regResEl = document.getElementById('log-res-reg'), orbResEl = document.getElementById('log-res-orb');

  const delta_feigenbaum = 4.669201609;
  const r_infinity = 3.5699456;

  function update() {
    const r = parseFloat(rEl.value), x0 = parseFloat(x0El.value);
    if (isNaN(r) || isNaN(x0) || r < 0 || r > 4.0 || x0 <= 0 || x0 >= 1.0) return;

    // Iterate logistic map x_(n+1) = r * x_n * (1 - x_n) for 300 warm-up steps
    let x = x0;
    for (let i = 0; i < 300; i++) {
      x = r * x * (1.0 - x);
    }

    // Collect last 16 values to detect orbit period
    const orbit = [];
    for (let i = 0; i < 16; i++) {
      x = r * x * (1.0 - x);
      orbit.push(x);
    }

    let regime = '';
    let color = '#22543d';

    if (r < 3.0) {
      regime = 'PERIOD-1 FIXED POINT (Stable single equilibrium x* = ' + (1.0 - 1.0/r).toFixed(3) + ')';
      color = '#22543d';
    } else if (r < 3.449) {
      regime = 'PERIOD-2 STABLE CYCLE (Oscillates between 2 values)';
      color = '#2563eb';
    } else if (r < 3.544) {
      regime = 'PERIOD-4 STABLE CYCLE (Oscillates between 4 values)';
      color = '#2563eb';
    } else if (r < r_infinity) {
      regime = 'PERIOD-8 / PERIOD-16 CASCADE (Dense period doubling toward chaos)';
      color = '#d97706';
    } else if (r >= 3.8284 && r <= 3.8415) {
      regime = 'PERIOD-3 TANGENT WINDOW ("Period 3 Implies Chaos" - Li-Yorke Theorem)';
      color = '#ea580c';
    } else {
      regime = 'FULLY DEVELOPED DETERMINISTIC CHAOS (Aperiodic, sensitive to initial x₀)';
      color = '#c53030';
    }

    regResEl.textContent = regime;
    regResEl.style.color = color;
    orbResEl.textContent = 'Orbit Samples: {' + orbit.slice(0, 4).map(v => v.toFixed(3)).join(', ') + '} | Feigenbaum δ = ' + delta_feigenbaum.toFixed(4) + ' (r_∞ = 3.5699)';
  }

  rEl.addEventListener('input', update);
  x0El.addEventListener('input', update);
  update();
})();