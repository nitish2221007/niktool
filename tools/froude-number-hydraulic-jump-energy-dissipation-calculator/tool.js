(() => {
  'use strict';
  const y1El = document.getElementById('fr-y1'), v1El = document.getElementById('fr-v1');
  const frResEl = document.getElementById('fr-res-fr'), jmResEl = document.getElementById('fr-res-jump');

  const g = 9.80665; // m/s^2

  function update() {
    const y1 = parseFloat(y1El.value), v1 = parseFloat(v1El.value);
    if (isNaN(y1) || isNaN(v1) || y1 <= 0 || v1 <= 0) return;

    // Froude number: Fr1 = v1 / sqrt(g * y1)
    const Fr1 = v1 / Math.sqrt(g * y1);

    if (Fr1 <= 1.0) {
      frResEl.textContent = 'Froude Number Fr₁ = ' + Fr1.toFixed(2) + ' (SUBCRITICAL: Fr < 1)';
      frResEl.style.color = '#22543d';
      jmResEl.textContent = 'No Hydraulic Jump occurs (Flow is already subcritical tranquil: v < wave celerity c)';
      return;
    }

    // Bélanger equation for sequent depth: y2 = (y1 / 2) * ( sqrt(1 + 8 * Fr1^2) - 1 )
    const y2 = (y1 / 2.0) * (Math.sqrt(1.0 + (8.0 * Math.pow(Fr1, 2))) - 1.0);

    // Specific energy before jump: E1 = y1 + v1^2 / (2g)
    const E1 = y1 + (Math.pow(v1, 2) / (2.0 * g));

    // Energy dissipation head loss: Delta_E = (y2 - y1)^3 / ( 4 * y1 * y2 )  [meters]
    const delta_E = Math.pow(y2 - y1, 3) / (4.0 * y1 * y2);
    const loss_pct = (delta_E / E1) * 100.0;

    let jumpClass = '';
    if (Fr1 < 2.5) jumpClass = 'Weak / Oscillating Jump';
    else if (Fr1 < 4.5) jumpClass = 'Oscillating / Steady Jump (Good Energy Dissipation)';
    else if (Fr1 < 9.0) jumpClass = 'Steady Strong Jump (45% - 70% Energy Dissipation)';
    else jumpClass = 'Rough Choppy Jump (> 70% Dissipation)';

    frResEl.textContent = 'Froude Fr₁ = ' + Fr1.toFixed(2) + ' (SUPERCRITICAL: ' + jumpClass + ')';
    frResEl.style.color = '#22543d';
    jmResEl.textContent = 'Sequent Depth y₂ = ' + y2.toFixed(2) + ' m | Head Loss ΔE = ' + delta_E.toFixed(2) + ' m (' + loss_pct.toFixed(1) + '% Energy Dissipated | E₁=' + E1.toFixed(2) + ' m)';
  }

  y1El.addEventListener('input', update);
  v1El.addEventListener('input', update);
  update();
})();