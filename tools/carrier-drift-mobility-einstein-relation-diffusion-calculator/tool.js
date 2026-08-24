(() => {
  'use strict';
  const munEl = document.getElementById('cd-mun'), mupEl = document.getElementById('cd-mup');
  const nEl = document.getElementById('cd-n'), tEl = document.getElementById('cd-t');
  const dfResEl = document.getElementById('cd-res-diff'), cdResEl = document.getElementById('cd-res-cond');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K

  function update() {
    const mu_n = parseFloat(munEl.value), mu_p = parseFloat(mupEl.value);
    const n = parseFloat(nEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(mu_n) || isNaN(mu_p) || isNaN(n) || isNaN(T_K) || mu_n <= 0 || mu_p <= 0 || n <= 0 || T_K <= 0) return;

    // Thermal voltage: V_t = k_B * T / q
    const V_t = (k_B * T_K) / q;

    // Einstein relation: D = mu * V_t  [cm^2 / s]
    const D_n = mu_n * V_t;
    const D_p = mu_p * V_t;

    // Electrical conductivity for n-type (n >> p): sigma = q * n * mu_n  [1 / (ohm * cm)]
    const sigma = q * n * mu_n;
    const rho = 1.0 / sigma; // ohm * cm

    dfResEl.textContent = 'Diffusivity: D_n = ' + D_n.toFixed(2) + ' cm²/s | D_p = ' + D_p.toFixed(2) + ' cm²/s';
    cdResEl.textContent = 'Conductivity σ = ' + sigma.toFixed(3) + ' (Ω·cm)⁻¹ | Resistivity ρ = ' + rho.toFixed(3) + ' Ω·cm (V_t = ' + (V_t*1000).toFixed(2) + ' mV @ ' + T_K + ' K)';
  }

  [munEl, mupEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();