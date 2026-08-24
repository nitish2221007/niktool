(() => {
  'use strict';
  const lamEl = document.getElementById('q-lam'), muEl = document.getElementById('q-mu');
  const rResEl = document.getElementById('q-res-rho'), wqResEl = document.getElementById('q-res-wq');

  function update() {
    const lambda = parseFloat(lamEl.value), mu = parseFloat(muEl.value);
    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) return;

    // Traffic intensity utilization rho = lambda / mu
    const rho = lambda / mu;

    if (rho >= 1.0) {
      rResEl.textContent = 'UNSTABLE QUEUE (ρ = ' + (rho * 100).toFixed(1) + '% ≥ 100%)';
      rResEl.style.color = '#c53030';
      wqResEl.textContent = 'Arrival rate exceeds service capacity (λ ≥ μ): Queue grows infinitely without bound!';
      wqResEl.style.color = '#c53030';
      return;
    }

    // Average number in system L = rho / (1 - rho)
    const L = rho / (1.0 - rho);
    // Average number in queue L_q = rho^2 / (1 - rho) = L - rho
    const L_q = Math.pow(rho, 2) / (1.0 - rho);

    // Average time in system W = 1 / (mu - lambda)  [hours -> minutes]
    const W_hours = 1.0 / (mu - lambda);
    const W_min = W_hours * 60.0;

    // Average time in queue W_q = rho / (mu - lambda)  [hours -> minutes]
    const W_q_hours = rho / (mu - lambda);
    const W_q_min = W_q_hours * 60.0;

    let color = rho > 0.85 ? '#d97706' : '#22543d';

    rResEl.textContent = 'Utilization ρ = ' + (rho * 100).toFixed(1) + '%';
    rResEl.style.color = color;
    wqResEl.textContent = 'Average Wait in Line W_q = ' + W_q_min.toFixed(1) + ' min (Line Length L_q = ' + L_q.toFixed(2) + ' | Total System Time W = ' + W_min.toFixed(1) + ' min)';
    wqResEl.style.color = color;
  }

  lamEl.addEventListener('input', update);
  muEl.addEventListener('input', update);
  update();
})();