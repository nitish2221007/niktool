(() => {
  'use strict';
  const kEl = document.getElementById('dc-k'), aEl = document.getElementById('dc-a');
  const dhEl = document.getElementById('dc-dh'), lEl = document.getElementById('dc-l'), nEl = document.getElementById('dc-n');
  const qResEl = document.getElementById('dc-res-q'), vlResEl = document.getElementById('dc-res-vel');

  function update() {
    const K = parseFloat(kEl.value), A = parseFloat(aEl.value);
    const dh = parseFloat(dhEl.value), L = parseFloat(lEl.value), n = parseFloat(nEl.value);

    if (isNaN(K) || isNaN(A) || isNaN(dh) || isNaN(L) || isNaN(n) || K <= 0 || A <= 0 || dh <= 0 || L <= 0 || n <= 0 || n >= 1) return;

    // Hydraulic gradient: i = dh / L
    const i = dh / L;

    // Darcy discharge: Q = K * A * i  [m^3 / s]
    const Q_m3_s = K * A * i;
    const Q_m3_day = Q_m3_s * 86400.0;
    const Q_L_s = Q_m3_s * 1000.0;

    // Darcy specific discharge velocity: v = K * i  [m / s]
    const v_m_s = K * i;

    // Actual pore seepage velocity: v_s = v / n  [m / s -> m / day]
    const v_s_m_s = v_m_s / n;
    const v_s_m_day = v_s_m_s * 86400.0;

    qResEl.textContent = 'Flow Q = ' + Q_m3_day.toFixed(1) + ' m³/day (' + Q_L_s.toFixed(2) + ' L/s)';
    vlResEl.textContent = 'Gradient i = ' + i.toFixed(4) + ' (' + (i * 100).toFixed(2) + '%) | Seepage v_s = ' + v_s_m_day.toFixed(2) + ' m/day (v_Darcy = ' + (v_m_s * 86400).toFixed(2) + ' m/day)';
  }

  [kEl, aEl, dhEl, lEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();