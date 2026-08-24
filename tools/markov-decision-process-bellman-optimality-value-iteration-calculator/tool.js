(() => {
  'use strict';
  const rEl = document.getElementById('rl-r'), gEl = document.getElementById('rl-gamma'), vnEl = document.getElementById('rl-vnext');
  const qvResEl = document.getElementById('rl-res-qval'), dcResEl = document.getElementById('rl-res-disc');

  function update() {
    const R = parseFloat(rEl.value), gamma = parseFloat(gEl.value), V_next = parseFloat(vnEl.value);
    if (isNaN(R) || isNaN(gamma) || isNaN(V_next) || gamma < 0 || gamma >= 1) return;

    // Bellman equation: Q*(s, a) = R + gamma * V_next
    const discounted_future = gamma * V_next;
    const Q_val = R + discounted_future;

    // Geometric series sum if constant reward R: R / (1 - gamma)
    const infinite_horizon = R / (1.0 - gamma);

    qvResEl.textContent = 'Action Value Q*(s, a) = ' + Q_val.toFixed(2);
    dcResEl.textContent = 'Discounted Future = ' + discounted_future.toFixed(2) + ' (0.90 × ' + V_next + ') | Infinite Horizon = ' + infinite_horizon.toFixed(1) + ' (R / (1-γ))';
  }

  [rEl, gEl, vnEl].forEach(el => el.addEventListener('input', update));
  update();
})();