(() => {
  'use strict';
  const n1El = document.getElementById('tir-n1'), n2El = document.getElementById('tir-n2');
  const crResEl = document.getElementById('tir-res-crit'), spResEl = document.getElementById('tir-res-spd');

  const c_light = 2.99792e8; // m/s

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || n1 <= n2) {
      crResEl.textContent = 'No Total Internal Reflection (n₁ must be > n₂)';
      crResEl.style.color = '#c53030';
      spResEl.textContent = 'TIR only occurs when light travels from a denser to rarer medium.';
      return;
    }

    // Critical angle sin(theta_c) = n2 / n1
    const sin_theta = n2 / n1;
    const theta_c_rad = Math.asin(sin_theta);
    const theta_c_deg = (theta_c_rad * 180.0) / Math.PI;

    // Speed in medium 1: v = c / n1
    const v_med = c_light / n1;

    crResEl.textContent = 'θ_c = ' + theta_c_deg.toFixed(2) + '° (Critical Angle)';
    crResEl.style.color = '#22543d';
    spResEl.textContent = 'Speed in Core = ' + (v_med / 1e8).toFixed(2) + ' × 10⁸ m/s | 100% Light Trapped for θ_inc > ' + theta_c_deg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();