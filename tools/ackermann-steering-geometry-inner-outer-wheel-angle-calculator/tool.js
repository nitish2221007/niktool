(() => {
  'use strict';
  const lEl = document.getElementById('ack-l'), wEl = document.getElementById('ack-w'), diEl = document.getElementById('ack-di');
  const doResEl = document.getElementById('ack-res-do'), dfResEl = document.getElementById('ack-res-diff');

  function update() {
    const L = parseFloat(lEl.value), w = parseFloat(wEl.value), delta_i_deg = parseFloat(diEl.value);
    if (isNaN(L) || isNaN(w) || isNaN(delta_i_deg) || L <= 0 || w <= 0 || delta_i_deg <= 0 || delta_i_deg >= 90) return;

    const delta_i_rad = (delta_i_deg * Math.PI) / 180;

    // True Ackermann relation: cot(delta_o) - cot(delta_i) = w / L
    // cot(delta_o) = cot(delta_i) + (w / L)
    const cot_delta_i = 1.0 / Math.tan(delta_i_rad);
    const cot_delta_o = cot_delta_i + (w / L);

    const delta_o_rad = Math.atan(1.0 / cot_delta_o);
    const delta_o_deg = (delta_o_rad * 180) / Math.PI;

    const deltaDiff = delta_i_deg - delta_o_deg;

    // Centerline turn radius R = L / tan(delta_avg)
    const R_center = L / Math.tan((delta_i_rad + delta_o_rad) / 2);

    doResEl.textContent = 'Outer Angle δ_o = ' + delta_o_deg.toFixed(1) + '° (Inner: ' + delta_i_deg + '°)';
    dfResEl.textContent = 'Toe-Out on Turn: Δδ = ' + deltaDiff.toFixed(2) + '° | Common Center Turn Radius R = ' + R_center.toFixed(2) + ' m (Zero Tire Scrub)';
  }

  [lEl, wEl, diEl].forEach(el => el.addEventListener('input', update));
  update();
})();