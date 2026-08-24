(() => {
  'use strict';
  const kuEl = document.getElementById('zn-ku'), tuEl = document.getElementById('zn-tu');
  const pidResEl = document.getElementById('zn-res-pid'), otResEl = document.getElementById('zn-res-other');

  function update() {
    const K_u = parseFloat(kuEl.value), T_u = parseFloat(tuEl.value);
    if (isNaN(K_u) || isNaN(T_u) || K_u <= 0 || T_u <= 0) return;

    // Classic Ziegler-Nichols Closed-Loop PID Tuning Rules:
    // P-only: Kp = 0.5 * Ku
    const Kp_p = 0.5 * K_u;

    // PI: Kp = 0.45 * Ku, Ti = Tu / 1.2 => Ki = Kp / Ti
    const Kp_pi = 0.45 * K_u;
    const Ti_pi = T_u / 1.2;
    const Ki_pi = Kp_pi / Ti_pi;

    // Full PID: Kp = 0.6 * Ku, Ti = 0.5 * Tu, Td = 0.125 * Tu
    const Kp_pid = 0.60 * K_u;
    const Ti_pid = 0.50 * T_u;
    const Td_pid = 0.125 * T_u;
    const Ki_pid = Kp_pid / Ti_pid;
    const Kd_pid = Kp_pid * Td_pid;

    pidResEl.textContent = 'PID: K_p = ' + Kp_pid.toFixed(2) + ' | K_i = ' + Ki_pid.toFixed(2) + ' | K_d = ' + Kd_pid.toFixed(2);
    otResEl.textContent = 'PI: K_p=' + Kp_pi.toFixed(2) + ', K_i=' + Ki_pi.toFixed(2) + ' | P-Only: K_p=' + Kp_p.toFixed(2) + ' (T_i=' + Ti_pid.toFixed(2) + 's, T_d=' + Td_pid.toFixed(3) + 's @ K_u=' + K_u + ')';
  }

  kuEl.addEventListener('input', update);
  tuEl.addEventListener('input', update);
  update();
})();