(() => {
  'use strict';
  const mEl = document.getElementById('dl-m'), gmEl = document.getElementById('dl-gamma');
  const epResEl = document.getElementById('dl-res-eps'), prResEl = document.getElementById('dl-res-press');

  function update() {
    const M = parseFloat(mEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M) || isNaN(gamma) || M <= 0 || gamma <= 1) return;

    const bracket = (2.0 / (gamma + 1.0)) * (1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2)));
    const exponent = (gamma + 1.0) / (2.0 * (gamma - 1.0));
    const A_over_Astar = (1.0 / M) * Math.pow(bracket, exponent);
    const T_over_T0 = 1.0 / (1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2)));
    const p_over_p0 = Math.pow(T_over_T0, gamma / (gamma - 1.0));

    epResEl.textContent = 'Area Ratio ε = ' + A_over_Astar.toFixed(1) + ' : 1 (A_e / A_t)';
    prResEl.textContent = 'Pressure p_e / p₀ = ' + (p_over_p0 * 100).toFixed(3) + '% | Temperature T_e / T₀ = ' + T_over_T0.toFixed(3) + ' (Mach M = ' + M.toFixed(2) + ' @ γ=' + gamma + ')';
  }

  mEl.addEventListener('input', update);
  gmEl.addEventListener('input', update);
  update();
})();