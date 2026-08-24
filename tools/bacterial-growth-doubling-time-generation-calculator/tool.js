(() => {
  'use strict';
  const n0El = document.getElementById('bg-n0'), nEl = document.getElementById('bg-n'), tEl = document.getElementById('bg-time');
  const tdResEl = document.getElementById('bg-res-td'), muResEl = document.getElementById('bg-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), N = parseFloat(nEl.value), t_hr = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(N) || isNaN(t_hr) || N0 <= 0 || N <= N0 || t_hr <= 0) return;

    // Specific growth rate mu: N = N0 * exp(mu * t) => mu = ln(N / N0) / t  [hr^-1]
    const mu = Math.log(N / N0) / t_hr;

    // Doubling time: t_d = ln(2) / mu  [hours -> minutes]
    const td_hr = Math.log(2.0) / mu;
    const td_min = td_hr * 60.0;

    // Number of generations n = log2(N / N0) = ln(N / N0) / ln(2)
    const n_gen = Math.log(N / N0) / Math.log(2.0);

    tdResEl.textContent = 'Doubling Time t_d = ' + td_min.toFixed(1) + ' Minutes (' + td_hr.toFixed(2) + ' hr)';
    muResEl.textContent = 'Growth Rate μ = ' + mu.toFixed(3) + ' hr⁻¹ | Generations n = ' + n_gen.toFixed(2) + ' (E. coli standard ~20-30 min in LB broth)';
  }

  [n0El, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();