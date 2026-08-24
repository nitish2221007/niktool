(() => {
  'use strict';
  const kEl = document.getElementById('cc-k'), tauEl = document.getElementById('cc-tau'), thEl = document.getElementById('cc-theta');
  const pidResEl = document.getElementById('cc-res-pid'), rtResEl = document.getElementById('cc-res-ratio');

  function update() {
    const K = parseFloat(kEl.value), tau = parseFloat(tauEl.value), theta = parseFloat(thEl.value);
    if (isNaN(K) || isNaN(tau) || isNaN(theta) || K <= 0 || tau <= 0 || theta <= 0) return;

    const R = theta / tau; // Dead time to time constant ratio

    // Cohen-Coon PID tuning formulas:
    // K_p = (1 / (K * R)) * ( 4/3 + R/4 )
    const Kp_pid = (1.0 / (K * R)) * ((4.0 / 3.0) + (R / 4.0));
    // T_i = theta * ( (32 + 6*R) / (13 + 8*R) )  [seconds]
    const Ti_pid = theta * ((32.0 + (6.0 * R)) / (13.0 + (8.0 * R)));
    // T_d = theta * ( 4 / (11 + 2*R) )  [seconds]
    const Td_pid = theta * (4.0 / (11.0 + (2.0 * R)));

    // PI Controller comparison:
    const Kp_pi = (1.0 / (K * R)) * (0.90 + (R / 12.0));
    const Ti_pi = theta * ((30.0 + (3.0 * R)) / (9.0 + (20.0 * R)));

    pidResEl.textContent = 'K_p = ' + Kp_pid.toFixed(2) + ' | T_i = ' + Ti_pid.toFixed(1) + ' s | T_d = ' + Td_pid.toFixed(2) + ' s';
    rtResEl.textContent = 'Lag Ratio θ/τ = ' + R.toFixed(3) + ' (PI Alternative: K_p = ' + Kp_pi.toFixed(2) + ', T_i = ' + Ti_pi.toFixed(1) + ' s)';
  }

  [kEl, tauEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();