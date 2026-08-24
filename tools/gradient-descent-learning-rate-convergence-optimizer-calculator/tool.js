(() => {
  'use strict';
  const wEl = document.getElementById('gd-w'), grEl = document.getElementById('gd-grad');
  const etEl = document.getElementById('gd-eta'), gmEl = document.getElementById('gd-gamma');
  const sgResEl = document.getElementById('gd-res-sgd'), mmResEl = document.getElementById('gd-res-mom');

  function update() {
    const w = parseFloat(wEl.value), grad = parseFloat(grEl.value);
    const eta = parseFloat(etEl.value), gamma = parseFloat(gmEl.value);

    if (isNaN(w) || isNaN(grad) || isNaN(eta) || isNaN(gamma) || eta <= 0) return;

    // Standard vanilla SGD step: Delta_w = - eta * grad
    const delta_sgd = -eta * grad;
    const w_sgd = w + delta_sgd;

    // Momentum step with steady prior velocity: v_steady = (eta * grad) / (1 - gamma)
    const v_steady = (eta * grad) / (1.0 - Math.min(0.99, gamma));
    const w_mom = w - v_steady;

    sgResEl.textContent = 'Vanilla SGD: w_{t+1} = ' + w_sgd.toFixed(3) + ' (Δw = ' + (delta_sgd >= 0 ? '+' : '') + delta_sgd.toFixed(3) + ')';
    mmResEl.textContent = 'Momentum (γ=' + gamma + '): w_{t+1} = ' + w_mom.toFixed(3) + ' | Effective Step = ' + (1.0 / (1.0 - gamma)).toFixed(1) + '× Speedup';
  }

  [wEl, grEl, etEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();