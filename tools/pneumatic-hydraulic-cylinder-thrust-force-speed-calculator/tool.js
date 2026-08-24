(() => {
  'use strict';
  const pEl = document.getElementById('cy-p'), dEl = document.getElementById('cy-d');
  const rodEl = document.getElementById('cy-rod'), qEl = document.getElementById('cy-q');
  const psResEl = document.getElementById('cy-res-push'), plResEl = document.getElementById('cy-res-pull');

  function update() {
    const P_bar = parseFloat(pEl.value), D_mm = parseFloat(dEl.value);
    const d_mm = parseFloat(rodEl.value), Q_L_min = parseFloat(qEl.value);

    if (isNaN(P_bar) || isNaN(D_mm) || isNaN(d_mm) || isNaN(Q_L_min) || P_bar <= 0 || D_mm <= 0 || d_mm < 0 || d_mm >= D_mm || Q_L_min <= 0) return;

    // Convert bar to N/mm^2 (MPa): 1 bar = 0.1 N/mm^2
    const P_MPa = P_bar * 0.1;

    // Full bore piston area: A_push = pi * D^2 / 4  [mm^2]
    const A_push_mm2 = (Math.PI * Math.pow(D_mm, 2)) / 4.0;
    const A_push_m2 = A_push_mm2 * 1e-6;

    // Annular pull area: A_pull = pi * (D^2 - d^2) / 4  [mm^2]
    const A_pull_mm2 = (Math.PI * (Math.pow(D_mm, 2) - Math.pow(d_mm, 2))) / 4.0;

    // Forces: F = P * A  [Newtons -> kN]
    const F_push_N = P_MPa * A_push_mm2;
    const F_push_kN = F_push_N / 1000.0;
    const F_push_tons = F_push_kN / 9.80665;

    const F_pull_N = P_MPa * A_pull_mm2;
    const F_pull_kN = F_pull_N / 1000.0;
    const F_pull_tons = F_pull_kN / 9.80665;

    // Extension velocity: v = Q / A  [m/s -> cm/s]
    const Q_m3_s = (Q_L_min * 1e-3) / 60.0;
    const v_push_m_s = Q_m3_s / A_push_m2;
    const v_push_cm_s = v_push_m_s * 100.0;

    psResEl.textContent = 'Push Force = ' + F_push_kN.toFixed(2) + ' kN (' + F_push_tons.toFixed(2) + ' Tons)';
    plResEl.textContent = 'Pull Force = ' + F_pull_kN.toFixed(2) + ' kN (' + F_pull_tons.toFixed(2) + ' Tons) | Extension Speed v = ' + v_push_cm_s.toFixed(2) + ' cm/s (Q=' + Q_L_min + ' L/min)';
  }

  [pEl, dEl, rodEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();