(() => {
  'use strict';
  const vrEl = document.getElementById('dd-vr'), vlEl = document.getElementById('dd-vl'), lEl = document.getElementById('dd-l');
  const knResEl = document.getElementById('dd-res-kin'), icResEl = document.getElementById('dd-res-icc');

  function update() {
    const vr = parseFloat(vrEl.value), vl = parseFloat(vlEl.value), L = parseFloat(lEl.value);
    if (isNaN(vr) || isNaN(vl) || isNaN(L) || L <= 0) return;

    // Linear velocity: v = (vr + vl) / 2
    const v = (vr + vl) / 2.0;

    // Angular velocity: omega = (vr - vl) / L  [rad / s]
    const omega = (vr - vl) / L;
    const omega_deg = (omega * 180.0) / Math.PI;

    // ICC Turning Radius R = (L / 2) * (vr + vl) / (vr - vl) = v / omega
    let icc_text = '';
    if (Math.abs(omega) > 1e-5) {
      const R = v / omega;
      icc_text = 'ICC Radius R = ' + Math.abs(R).toFixed(2) + ' m (' + (omega > 0 ? 'Left Turn Arc' : 'Right Turn Arc') + ')';
    } else {
      icc_text = 'STRAIGHT LINE MOTION (R = ∞, ω = 0)';
    }

    if (Math.abs(v) < 1e-5 && Math.abs(omega) > 1e-5) {
      icc_text = 'ZERO-RADIUS IN-PLACE SPIN (Rotate about center point R = 0)';
    }

    knResEl.textContent = 'Linear v = ' + v.toFixed(2) + ' m/s | Turning ω = ' + (omega >= 0 ? '+' : '') + omega.toFixed(2) + ' rad/s (' + omega_deg.toFixed(1) + '°/s)';
    icResEl.textContent = icc_text + ' [Track L = ' + L + ' m, v_r=' + vr + ' m/s, v_l=' + vl + ' m/s]';
  }

  [vrEl, vlEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();