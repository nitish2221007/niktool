(() => {
  'use strict';
  const vEl = document.getElementById('ld-v'), sEl = document.getElementById('ld-s');
  const rEl = document.getElementById('ld-rho'), clEl = document.getElementById('ld-cl');
  const lftResEl = document.getElementById('ld-res-lift'), gldResEl = document.getElementById('ld-res-glide');

  function update() {
    const v_kts = parseFloat(vEl.value), S_m2 = parseFloat(sEl.value);
    const rho = parseFloat(rEl.value), C_L = parseFloat(clEl.value);

    if (isNaN(v_kts) || isNaN(S_m2) || isNaN(rho) || isNaN(C_L) || v_kts <= 0 || S_m2 <= 0 || rho <= 0 || C_L <= 0) return;

    const v_mps = v_kts * 0.514444;
    const q_Pa = 0.5 * rho * Math.pow(v_mps, 2);

    const Lift_N = q_Pa * S_m2 * C_L;
    const Lift_kN = Lift_N / 1000.0;
    const Lift_tons = Lift_N / 9806.65;

    const C_D = 0.018 + 0.042 * Math.pow(C_L, 2);
    const Drag_N = q_Pa * S_m2 * C_D;
    const Drag_kN = Drag_N / 1000.0;

    const LD_ratio = C_L / C_D;

    lftResEl.textContent = 'Lift L = ' + Lift_kN.toFixed(1) + ' kN (' + Lift_tons.toFixed(1) + ' Metric Tons)';
    gldResEl.textContent = 'Drag D = ' + Drag_kN.toFixed(1) + ' kN (C_D = ' + C_D.toFixed(3) + ') | L/D = ' + LD_ratio.toFixed(1) + ':1 (' + LD_ratio.toFixed(1) + ' km glide per 1 km altitude loss)';
  }

  [vEl, sEl, rEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();