(() => {
  'use strict';
  const lEl = document.getElementById('ak-l'), wEl = document.getElementById('ak-w'), dlEl = document.getElementById('ak-delta');
  const rdResEl = document.getElementById('ak-res-rad'), otResEl = document.getElementById('ak-res-outer');

  function update() {
    const L = parseFloat(lEl.value), w = parseFloat(wEl.value), delta_i_deg = parseFloat(dlEl.value);
    if (isNaN(L) || isNaN(w) || isNaN(delta_i_deg) || L <= 0 || w <= 0 || delta_i_deg <= 0 || delta_i_deg >= 85) return;

    const delta_i_rad = (delta_i_deg * Math.PI) / 180.0;

    // Ackermann formula: cot(delta_o) = cot(delta_i) + (w / L)
    const cot_delta_i = 1.0 / Math.tan(delta_i_rad);
    const cot_delta_o = cot_delta_i + (w / L);
    const delta_o_rad = Math.atan(1.0 / cot_delta_o);
    const delta_o_deg = (delta_o_rad * 180.0) / Math.PI;

    // Center turning radius R from rear axle center: R_rear = L / tan(delta_center) approx L / tan((delta_i + delta_o)/2)
    const delta_avg = (delta_i_rad + delta_o_rad) / 2.0;
    const R_rear = L / Math.tan(delta_avg);
    const R_center = Math.sqrt(Math.pow(R_rear, 2) + Math.pow(L / 2.0, 2));

    rdResEl.textContent = 'Turning Radius R = ' + R_center.toFixed(2) + ' m (Diameter ' + (R_center * 2).toFixed(1) + ' m)';
    otResEl.textContent = 'Outer Wheel δ_o = ' + delta_o_deg.toFixed(1) + '° (Inner δ_i = ' + delta_i_deg.toFixed(1) + '°: Δδ = ' + (delta_i_deg - delta_o_deg).toFixed(1) + '° Difference)';
  }

  [lEl, wEl, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();