(() => {
  'use strict';
  const lamEl = document.getElementById('ly-lam'), z0El = document.getElementById('ly-z0'), epsEl = document.getElementById('ly-eps');
  const hResEl = document.getElementById('ly-res-horiz'), efResEl = document.getElementById('ly-res-e-fold');

  function update() {
    const lambda = parseFloat(lamEl.value), deltaZ0 = parseFloat(z0El.value), epsilon = parseFloat(epsEl.value);
    if (isNaN(lambda) || isNaN(deltaZ0) || isNaN(epsilon) || deltaZ0 <= 0 || epsilon <= deltaZ0) return;

    // Characteristic e-folding time tau = 1 / lambda
    const tau_efold = lambda > 0 ? 1.0 / lambda : 0;

    // Lyapunov prediction horizon time: t_horizon = (1 / lambda) * ln( epsilon / deltaZ0 )
    let t_horizon = 0;
    let status = '';
    let color = '#22543d';

    if (lambda > 0) {
      t_horizon = (1.0 / lambda) * Math.log(epsilon / deltaZ0);
      status = 'DETERMINISTIC CHAOS (λ = +' + lambda.toFixed(3) + ' > 0: Exponential trajectory divergence | e-folding τ = ' + tau_efold.toFixed(2) + ' time units)';
      color = '#22543d';
    } else if (Math.abs(lambda) < 1e-4) {
      status = 'MARGINAL / CONSERVATIVE (λ = 0: Trajectories separate linearly, non-chaotic limit cycle)';
      color = '#2563eb';
    } else {
      status = 'STABLE ATTRACTOR (λ < 0: Perturbations contract exponentially to a point fixed attractor)';
      color = '#4b5563';
    }

    hResEl.textContent = lambda > 0 ? 't_horizon = ' + t_horizon.toFixed(2) + ' Time Units' : 'Infinite Horizon (Non-Chaotic)';
    hResEl.style.color = color;
    efResEl.textContent = status + ' | Amplification: ' + (epsilon / deltaZ0).toExponential(1) + '× growth from δZ₀ = ' + deltaZ0.toExponential(1);
    efResEl.style.color = color;
  }

  [lamEl, z0El, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();