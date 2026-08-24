(() => {
  'use strict';
  const v1El = document.getElementById('sr-v1'), v2El = document.getElementById('sr-v2'), tiEl = document.getElementById('sr-ti');
  const z1ResEl = document.getElementById('sr-res-z1'), xcResEl = document.getElementById('sr-res-xc');

  function update() {
    const v1 = parseFloat(v1El.value), v2 = parseFloat(v2El.value), ti_ms = parseFloat(tiEl.value);
    if (isNaN(v1) || isNaN(v2) || isNaN(ti_ms) || v1 <= 0 || v2 <= v1 || ti_ms <= 0) return;

    const ti_s = ti_ms * 1e-3;

    // Snell's Law critical angle: sin(theta_c) = v1 / v2
    const sin_theta_c = v1 / v2;
    const theta_c_rad = Math.asin(sin_theta_c);
    const theta_c_deg = (theta_c_rad * 180.0) / Math.PI;

    // Bedrock depth: z1 = (ti * v1 * v2) / ( 2 * sqrt(v2^2 - v1^2) )  [meters]
    const den = Math.sqrt(Math.pow(v2, 2) - Math.pow(v1, 2));
    const z1 = (ti_s * v1 * v2) / (2.0 * den);

    // Crossover distance x_c = 2 * z1 * sqrt( (v2 + v1) / (v2 - v1) )
    const x_c = 2.0 * z1 * Math.sqrt((v2 + v1) / (v2 - v1));

    z1ResEl.textContent = 'Bedrock Depth z₁ = ' + z1.toFixed(2) + ' m';
    xcResEl.textContent = 'Critical Angle θ_c = ' + theta_c_deg.toFixed(2) + '° | Crossover x_c = ' + x_c.toFixed(1) + ' m (v₁=' + v1 + ' m/s, v₂=' + v2 + ' m/s)';
  }

  [v1El, v2El, tiEl].forEach(el => el.addEventListener('input', update));
  update();
})();