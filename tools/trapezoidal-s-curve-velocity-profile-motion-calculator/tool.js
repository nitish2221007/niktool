(() => {
  'use strict';
  const dEl = document.getElementById('vp-d'), vmEl = document.getElementById('vp-vmax'), aEl = document.getElementById('vp-a');
  const tmResEl = document.getElementById('vp-res-time'), phResEl = document.getElementById('vp-res-phases');

  function update() {
    const D = parseFloat(dEl.value), v_max = parseFloat(vmEl.value), a = parseFloat(aEl.value);
    if (isNaN(D) || isNaN(v_max) || isNaN(a) || D <= 0 || v_max <= 0 || a <= 0) return;

    // Time to reach v_max: t_acc = v_max / a
    const t_acc = v_max / a;

    // Distance covered during acceleration: d_acc = 0.5 * a * t_acc^2 = 0.5 * v_max^2 / a
    const d_acc = 0.5 * Math.pow(v_max, 2) / a;

    // Total distance needed for both accel and decel: d_crit = 2 * d_acc
    const d_crit = 2.0 * d_acc;

    let T_total = 0, t_cruise = 0, d_cruise = 0, v_peak = v_max;

    if (D >= d_crit) {
      // True Trapezoidal Profile (reaches full v_max):
      d_cruise = D - d_crit;
      t_cruise = d_cruise / v_max;
      T_total = (2.0 * t_acc) + t_cruise;

      tmResEl.textContent = 'Total Move Time T = ' + T_total.toFixed(3) + ' s';
      phResEl.textContent = 'Accel: ' + t_acc.toFixed(3) + 's (' + d_acc.toFixed(1) + 'mm) | Cruise: ' + t_cruise.toFixed(3) + 's (' + d_cruise.toFixed(1) + 'mm) | Decel: ' + t_acc.toFixed(3) + 's';
    } else {
      // Triangular Profile (stroke too short to reach v_max):
      v_peak = Math.sqrt(a * D);
      const t_tri_acc = v_peak / a;
      T_total = 2.0 * t_tri_acc;

      tmResEl.textContent = 'Total Move Time T = ' + T_total.toFixed(3) + ' s (TRIANGULAR PROFILE)';
      phResEl.textContent = 'Peak Speed = ' + v_peak.toFixed(1) + ' mm/s (Stroke ' + D + ' mm too short for ' + v_max + ' mm/s | Accel: ' + t_tri_acc.toFixed(3) + 's)';
    }
  }

  [dEl, vmEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();