(() => {
  'use strict';
  const teEl = document.getElementById('sp-te'), neEl = document.getElementById('sp-ne'), zfEl = document.getElementById('sp-zeff');
  const etResEl = document.getElementById('sp-res-eta'), clResEl = document.getElementById('sp-res-coul');

  function update() {
    const T_e_eV = parseFloat(teEl.value), ne_scaled = parseFloat(neEl.value), Z_eff = parseFloat(zfEl.value);
    if (isNaN(T_e_eV) || isNaN(ne_scaled) || isNaN(Z_eff) || T_e_eV <= 0 || ne_scaled <= 0 || Z_eff <= 0) return;

    const n_e_m3 = ne_scaled * 1e20;
    const n_e_cm3 = n_e_m3 * 1e-6;

    // Coulomb logarithm for fusion plasma: ln_Lambda approx 24 - ln( sqrt(n_e_cm3) / T_e_eV )
    const ln_Lambda = 24.0 - Math.log(Math.sqrt(n_e_cm3) / T_e_eV);

    // Spitzer resistivity: eta = 5.2e-5 * Z_eff * ln_Lambda / ( T_e_eV^1.5 )  [Ohm * m]
    const eta_Ohm_m = (5.2e-5 * Z_eff * ln_Lambda) / Math.pow(T_e_eV, 1.5);
    const sigma = 1.0 / eta_Ohm_m;

    etResEl.textContent = 'Resistivity η = ' + eta_Ohm_m.toExponential(2) + ' Ω · m';
    clResEl.textContent = 'Coulomb ln Λ = ' + ln_Lambda.toFixed(1) + ' | Conductivity σ = ' + sigma.toExponential(2) + ' (Ω·m)⁻¹ (T_e=' + T_e_eV + ' eV, Z_eff=' + Z_eff + ')';
  }

  [teEl, neEl, zfEl].forEach(el => el.addEventListener('input', update));
  update();
})();