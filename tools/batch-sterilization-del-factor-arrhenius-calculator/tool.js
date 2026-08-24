(() => {
  'use strict';
  const tEl = document.getElementById('ster-temp'), n0El = document.getElementById('ster-n0'), ntEl = document.getElementById('ster-nt');
  const dResEl = document.getElementById('ster-res-del'), tmResEl = document.getElementById('ster-res-time');

  // Standard Arrhenius parameters for resistant Geobacillus stearothermophilus spores:
  const Ea_J_mol = 283000.0; // 283 kJ / mol
  const A_prefactor = 5.7e36; // min^-1
  const R_gas = 8.314462;

  function update() {
    const TC = parseFloat(tEl.value), N0 = parseFloat(n0El.value), Nt = parseFloat(ntEl.value);
    if (isNaN(TC) || isNaN(N0) || isNaN(Nt) || N0 <= 0 || Nt <= 0 || N0 <= Nt) return;

    const TK = TC + 273.15;

    // Del factor nabla = ln( N0 / Nt )
    const nabla = Math.log(N0 / Nt);

    // Specific thermal death rate k = A * exp( -Ea / (R * T) )  [min^-1]
    const k_death_min = A_prefactor * Math.exp(-Ea_J_mol / (R_gas * TK));

    // Required holding time t_hold = nabla / k  [minutes]
    const t_hold_min = nabla / k_death_min;

    dResEl.textContent = '∇ = ' + nabla.toFixed(2) + ' Del Factor (' + Math.round(nabla / Math.log(10)) + ' Log Reductions)';
    tmResEl.textContent = 't_hold = ' + t_hold_min.toFixed(1) + ' min @ ' + TC + '°C (k = ' + k_death_min.toFixed(2) + ' min⁻¹ | N₀ = ' + N0.toExponential(1) + ' -> N_t = ' + Nt.toExponential(1) + ')';
  }

  [tEl, n0El, ntEl].forEach(el => el.addEventListener('input', update));
  update();
})();