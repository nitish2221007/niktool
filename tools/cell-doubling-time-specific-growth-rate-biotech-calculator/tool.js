(() => {
  'use strict';
  const n0El = document.getElementById('cd-n0'), ntEl = document.getElementById('cd-nt'), tEl = document.getElementById('cd-time');
  const tdResEl = document.getElementById('cd-res-td'), muResEl = document.getElementById('cd-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), Nt = parseFloat(ntEl.value), t_hours = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(Nt) || isNaN(t_hours) || N0 <= 0 || Nt <= N0 || t_hours <= 0) return;

    // Specific growth rate mu = ln( Nt / N0 ) / t  [h^-1]
    const mu = Math.log(Nt / N0) / t_hours;

    // Doubling time T_d = ln(2) / mu  [hours]
    const T_d = Math.LN2 / mu;

    // Number of population doublings n = ln(Nt/N0) / ln(2) = log2(Nt/N0)
    const doublings = Math.log2(Nt / N0);

    tdResEl.textContent = 'T_d = ' + T_d.toFixed(2) + ' Hours';
    muResEl.textContent = 'Growth Rate μ = ' + mu.toFixed(4) + ' h⁻¹ (' + doublings.toFixed(2) + ' Doublings | ' + (Nt/N0).toFixed(1) + '× Expansion over ' + t_hours + ' h)';
  }

  [n0El, ntEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();