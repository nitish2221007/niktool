(() => {
  'use strict';
  const sEl = document.getElementById('ro-s'), s0El = document.getElementById('ro-s0');
  const eEl = document.getElementById('ro-e'), nEl = document.getElementById('ro-n');
  const epResEl = document.getElementById('ro-res-eps'), ptResEl = document.getElementById('ro-res-parts');

  function update() {
    const sigma = parseFloat(sEl.value), sigma_0 = parseFloat(s0El.value);
    const E_GPa = parseFloat(eEl.value), n = parseFloat(nEl.value);

    if (isNaN(sigma) || isNaN(sigma_0) || isNaN(E_GPa) || isNaN(n) || sigma < 0 || sigma_0 <= 0 || E_GPa <= 0 || n <= 0) return;

    const E_MPa = E_GPa * 1000.0;

    // Elastic strain: eps_e = sigma / E
    const eps_e = sigma / E_MPa;

    // Plastic strain: eps_p = 0.002 * ( sigma / sigma_0 )^n
    const eps_p = 0.002 * Math.pow(sigma / sigma_0, n);

    // Total strain: eps_total = eps_e + eps_p
    const eps_total = eps_e + eps_p;

    const eps_total_pct = eps_total * 100.0;
    const eps_micro = Math.round(eps_total * 1e6);

    epResEl.textContent = 'Total Strain ε = ' + eps_total_pct.toFixed(3) + '% (' + eps_micro.toLocaleString() + ' με)';
    ptResEl.textContent = 'Elastic = ' + (eps_e * 100).toFixed(3) + '% | Plastic = ' + (eps_p * 100).toFixed(3) + '% (' + (sigma >= sigma_0 ? 'In Plastic Regime' : 'Predominantly Elastic') + ' @ n=' + n + ')';
  }

  [sEl, s0El, eEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();