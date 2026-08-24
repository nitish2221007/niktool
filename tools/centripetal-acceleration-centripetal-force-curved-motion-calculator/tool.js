(() => {
  'use strict';
  const mEl = document.getElementById('ca-m'), vEl = document.getElementById('ca-v'), rEl = document.getElementById('ca-r');
  const acResEl = document.getElementById('ca-res-acc'), fcResEl = document.getElementById('ca-res-force');

  const g = 9.80665; // m/s^2

  function update() {
    const m = parseFloat(mEl.value), v = parseFloat(vEl.value), r = parseFloat(rEl.value);
    if (isNaN(m) || isNaN(v) || isNaN(r) || m <= 0 || v <= 0 || r <= 0) return;

    // Centripetal acceleration a_c = v^2 / r  [m / s^2]
    const a_c = Math.pow(v, 2) / r;
    const g_force = a_c / g;

    // Centripetal force F_c = m * a_c  [Newtons]
    const F_c = m * a_c;

    // Ideal frictionless roadway bank angle: tan(theta) = v^2 / (g * r)
    const tan_theta = Math.pow(v, 2) / (g * r);
    const bank_deg = (Math.atan(tan_theta) * 180.0) / Math.PI;

    acResEl.textContent = 'a_c = ' + a_c.toFixed(2) + ' m / s² (' + g_force.toFixed(2) + ' g-force)';
    fcResEl.textContent = 'Force F_c = ' + Math.round(F_c).toLocaleString() + ' N (' + (F_c/1000).toFixed(2) + ' kN) | Bank Angle θ = ' + bank_deg.toFixed(1) + '° (Speed: ' + (v * 3.6).toFixed(0) + ' km/h @ r = ' + r + ' m)';
  }

  [mEl, vEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();