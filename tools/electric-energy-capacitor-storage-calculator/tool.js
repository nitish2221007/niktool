(() => {
  'use strict';
  const cEl = document.getElementById('eec-c'), vEl = document.getElementById('eec-v');
  const eResEl = document.getElementById('eec-res-energy'), qResEl = document.getElementById('eec-res-charge');

  function update() {
    const cUf = parseFloat(cEl.value), V = parseFloat(vEl.value);
    if (isNaN(cUf) || isNaN(V) || cUf <= 0 || V <= 0) return;

    const C = cUf * 1e-6;
    // Energy E = 0.5 * C * V^2 (Joules)
    const energy = 0.5 * C * Math.pow(V, 2);
    // Charge Q = C * V (Coulombs)
    const Q = C * V;
    const qMc = Q * 1000;

    eResEl.textContent = energy >= 0.01 ? energy.toFixed(2) + ' Joules' : (energy * 1e6).toFixed(1) + ' μJ';
    qResEl.textContent = qMc >= 1.0 ? qMc.toFixed(1) + ' mC (' + Q.toFixed(3) + ' C)' : (Q * 1e6).toFixed(1) + ' μC';
  }

  cEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();