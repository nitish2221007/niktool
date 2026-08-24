(() => {
  'use strict';
  const kEl = document.getElementById('lg-k'), pEl = document.getElementById('lg-p'), qmEl = document.getElementById('lg-qmax');
  const thResEl = document.getElementById('lg-res-theta'), qeResEl = document.getElementById('lg-res-qe');

  function update() {
    const K = parseFloat(kEl.value), P = parseFloat(pEl.value), q_max = parseFloat(qmEl.value);
    if (isNaN(K) || isNaN(P) || isNaN(q_max) || K <= 0 || P < 0 || q_max <= 0) return;

    // Langmuir isotherm: theta = ( K * P ) / ( 1 + K * P )
    const theta = (K * P) / (1.0 + (K * P));
    const theta_pct = theta * 100.0;

    // Adsorbed capacity q_e = theta * q_max
    const q_e = theta * q_max;

    thResEl.textContent = 'Coverage θ = ' + theta.toFixed(3) + ' (' + theta_pct.toFixed(1) + '% Monolayer)';
    qeResEl.textContent = 'Adsorbed q_e = ' + q_e.toFixed(2) + ' mg/g (' + (q_max - q_e).toFixed(2) + ' mg/g Free Sites remaining @ K = ' + K + ')';
  }

  [kEl, pEl, qmEl].forEach(el => el.addEventListener('input', update));
  update();
})();