(() => {
  'use strict';
  const mmEl = document.getElementById('mon-mumax'), sEl = document.getElementById('mon-s');
  const ksEl = document.getElementById('mon-ks'), yEl = document.getElementById('mon-yield');
  const muResEl = document.getElementById('mon-res-mu'), chResEl = document.getElementById('mon-res-chem');

  function update() {
    const mu_max = parseFloat(mmEl.value), S = parseFloat(sEl.value);
    const K_s = parseFloat(ksEl.value), Y_xs = parseFloat(yEl.value);

    if (isNaN(mu_max) || isNaN(S) || isNaN(K_s) || isNaN(Y_xs) || mu_max <= 0 || S < 0 || K_s <= 0 || Y_xs <= 0) return;

    // Monod equation: mu = mu_max * S / ( K_s + S )  [h^-1]
    const mu = (mu_max * S) / (K_s + S);

    // Doubling generation time t_d = ln(2) / mu  [hours -> minutes]
    const t_d_hours = Math.log(2) / mu;
    const t_d_min = t_d_hours * 60.0;

    // Chemostat critical washout dilution rate D_crit = mu_max * S0 / (Ks + S0)
    const D_crit = mu;

    muResEl.textContent = 'μ = ' + mu.toFixed(3) + ' h⁻¹ (Doubling: ' + t_d_min.toFixed(1) + ' min)';
    chResEl.textContent = 'Steady Chemostat D = μ = ' + mu.toFixed(3) + ' h⁻¹ (Yield Y = ' + Y_xs + ' g/g | ' + (mu / mu_max * 100).toFixed(1) + '% of μ_max @ S = ' + S + ' g/L)';
  }

  [mmEl, sEl, ksEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();