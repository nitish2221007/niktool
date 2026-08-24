(() => {
  'use strict';
  const q0El = document.getElementById('tr-q0'), qfEl = document.getElementById('tr-qf');
  const tEl = document.getElementById('tr-t'), tmEl = document.getElementById('tr-time');
  const psResEl = document.getElementById('tr-res-pos'), pkResEl = document.getElementById('tr-res-peak');

  function update() {
    const q0 = parseFloat(q0El.value), qf = parseFloat(qfEl.value);
    const T = parseFloat(tEl.value), t_cur = parseFloat(tmEl.value);

    if (isNaN(q0) || isNaN(qf) || isNaN(T) || isNaN(t_cur) || T <= 0 || t_cur < 0) return;

    const delta_q = qf - q0;
    const t = Math.min(T, t_cur);

    // Quintic polynomial boundary conditions: v0=0, vf=0, a0=0, af=0
    // s(t) = q0 + delta_q * ( 10*(t/T)^3 - 15*(t/T)^4 + 6*(t/T)^5 )
    const tau = t / T;
    const s_norm = (10.0 * Math.pow(tau, 3)) - (15.0 * Math.pow(tau, 4)) + (6.0 * Math.pow(tau, 5));
    const s_dot_norm = (30.0 * Math.pow(tau, 2)) - (60.0 * Math.pow(tau, 3)) + (30.0 * Math.pow(tau, 4));
    const s_ddot_norm = (60.0 * tau) - (180.0 * Math.pow(tau, 2)) + (120.0 * Math.pow(tau, 3));

    const q_t = q0 + (delta_q * s_norm);
    const v_t = (delta_q / T) * s_dot_norm;
    const a_t = (delta_q / Math.pow(T, 2)) * s_ddot_norm;

    // Peak limits for quintic:
    const v_max = (15.0 / 8.0) * (Math.abs(delta_q) / T); // 1.875 * Delta_q / T
    const a_max = (10.0 / (Math.sqrt(3))) * (Math.abs(delta_q) / Math.pow(T, 2)); // 5.77 * Delta_q / T^2

    psResEl.textContent = 'Position q(t) = ' + q_t.toFixed(1) + '° | Speed q̇(t) = ' + v_t.toFixed(2) + ' °/s | Accel q̈ = ' + a_t.toFixed(1) + ' °/s²';
    pkResEl.textContent = 'Peak Velocity = ' + v_max.toFixed(2) + ' °/s | Peak Accel = ' + a_max.toFixed(1) + ' °/s² (t=' + t.toFixed(2) + 's / ' + T + 's)';
  }

  [q0El, qfEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();