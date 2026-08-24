(() => {
  'use strict';
  const y1El = document.getElementById('hj-y1'), v1El = document.getElementById('hj-v1');
  const y2ResEl = document.getElementById('hj-res-y2'), elResEl = document.getElementById('hj-res-eloss');

  const g = 9.80665; // m/s^2

  function update() {
    const y1 = parseFloat(y1El.value), v1 = parseFloat(v1El.value);
    if (isNaN(y1) || isNaN(v1) || y1 <= 0 || v1 <= 0) return;

    // Upstream Froude number: Fr1 = v1 / sqrt( g * y1 )
    const Fr1 = v1 / Math.sqrt(g * y1);

    if (Fr1 <= 1.0) {
      y2ResEl.textContent = 'NO HYDRAULIC JUMP (Fr₁ = ' + Fr1.toFixed(2) + ' ≤ 1.0: Flow is subcritical, jump cannot form)';
      elResEl.textContent = 'Supercritical flow (Fr₁ > 1.0) is mandatory for a hydraulic jump';
      return;
    }

    // Belanger's sequent depth equation: y2 / y1 = 0.5 * ( sqrt( 1 + 8 * Fr1^2 ) - 1 )
    const ratio_y2_y1 = 0.5 * (Math.sqrt(1.0 + 8.0 * Math.pow(Fr1, 2)) - 1.0);
    const y2 = y1 * ratio_y2_y1;

    // Specific energy loss: deltaE = ( y2 - y1 )^3 / ( 4 * y1 * y2 )  [meters]
    const deltaE = Math.pow(y2 - y1, 3) / (4.0 * y1 * y2);

    // Initial specific energy E1 = y1 + v1^2 / (2*g)
    const E1 = y1 + (Math.pow(v1, 2) / (2.0 * g));
    const loss_pct = (deltaE / E1) * 100.0;

    let jumpType = '';
    if (Fr1 < 1.7) jumpType = 'Undular Jump';
    else if (Fr1 < 2.5) jumpType = 'Weak Jump (Low dissipation)';
    else if (Fr1 < 4.5) jumpType = 'Oscillating Jump';
    else if (Fr1 < 9.0) jumpType = 'Steady Well-Behaved Jump (45-70% Energy Dissipation)';
    else jumpType = 'Strong Choppy Jump (>85% Dissipation)';

    y2ResEl.textContent = 'Post-Jump y₂ = ' + y2.toFixed(2) + ' m (' + ratio_y2_y1.toFixed(2) + '× Depth Rise)';
    elResEl.textContent = 'Energy Head Loss ΔE = ' + deltaE.toFixed(2) + ' m (' + loss_pct.toFixed(1) + '% Dissipated | Fr₁ = ' + Fr1.toFixed(2) + ' ' + jumpType + ')';
  }

  y1El.addEventListener('input', update);
  v1El.addEventListener('input', update);
  update();
})();