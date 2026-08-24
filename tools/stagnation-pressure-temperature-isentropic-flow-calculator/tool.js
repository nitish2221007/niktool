(() => {
  'use strict';
  const mEl = document.getElementById('sf-m'), tEl = document.getElementById('sf-t'), pEl = document.getElementById('sf-p');
  const t0ResEl = document.getElementById('sf-res-t0'), p0ResEl = document.getElementById('sf-res-p0');

  const gamma = 1.40;

  function update() {
    const M = parseFloat(mEl.value), T_K = parseFloat(tEl.value), p_kPa = parseFloat(pEl.value);
    if (isNaN(M) || isNaN(T_K) || isNaN(p_kPa) || M < 0 || T_K <= 0 || p_kPa <= 0) return;

    const T0_over_T = 1.0 + (0.5 * (gamma - 1.0) * Math.pow(M, 2));
    const T0_K = T_K * T0_over_T;
    const T0_C = T0_K - 273.15;
    const p0_over_p = Math.pow(T0_over_T, gamma / (gamma - 1.0));
    const p0_kPa = p_kPa * p0_over_p;
    const q_kPa = 0.5 * gamma * p_kPa * Math.pow(M, 2);

    t0ResEl.textContent = 'Stagnation T₀ = ' + T0_K.toFixed(1) + ' K (' + (T0_C >= 0 ? '+' : '') + T0_C.toFixed(1) + ' °C)';
    p0ResEl.textContent = 'Stagnation p₀ = ' + p0_kPa.toFixed(1) + ' kPa (' + p0_over_p.toFixed(2) + '× Static) | Dynamic q = ' + q_kPa.toFixed(1) + ' kPa (M=' + M + ')';
  }

  [mEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();