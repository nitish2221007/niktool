(() => {
  'use strict';
  const mEl = document.getElementById('sr-m'), nrEl = document.getElementById('sr-nr');
  const iEl = document.getElementById('sr-i'), dlEl = document.getElementById('sr-dldth');
  const tqResEl = document.getElementById('sr-res-torque'), stResEl = document.getElementById('sr-res-step');

  function update() {
    const m = parseInt(mEl.value, 10), N_r = parseInt(nrEl.value, 10);
    const i = parseFloat(iEl.value), dL_dth = parseFloat(dlEl.value);

    if (isNaN(m) || isNaN(N_r) || isNaN(i) || isNaN(dL_dth) || m <= 0 || N_r <= 0 || i < 0 || dL_dth < 0) return;

    // Reluctance torque: T = 0.5 * i^2 * (dL / dtheta)  [N*m]
    const torque = 0.5 * Math.pow(i, 2) * dL_dth;

    // Stroke step angle: theta_s = 360 / ( m * N_r )  [deg]
    const theta_s = 360.0 / (m * N_r);
    const strokes_per_rev = m * N_r;

    tqResEl.textContent = 'Reluctance Torque T = ' + torque.toFixed(2) + ' N·m';
    stResEl.textContent = 'Step Angle θ_s = ' + theta_s.toFixed(1) + '° (' + strokes_per_rev + ' Commutations/Rev | m=' + m + ' phases, N_r=' + N_r + ' poles)';
  }

  [mEl, nrEl, iEl, dlEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();