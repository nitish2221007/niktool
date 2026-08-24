(() => {
  'use strict';
  const pEl = document.getElementById('fg-p'), zEl = document.getElementById('fg-z'), tEl = document.getElementById('fg-temp');
  const fResEl = document.getElementById('fg-res-f'), grResEl = document.getElementById('fg-res-gr');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const P_bar = parseFloat(pEl.value), Z = parseFloat(zEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(P_bar) || isNaN(Z) || isNaN(T_C) || P_bar <= 0 || Z <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // First-order virial approximation: ln(phi) approx Z - 1 - ln(Z)
    const ln_phi = (Z - 1.0) - Math.log(Z);
    const phi = Math.exp(ln_phi);

    // Fugacity f = phi * P
    const f_bar = phi * P_bar;

    // Residual Gibbs free energy G^R = R * T * ln(phi)  [J / mol]
    const G_R = R * T_K * ln_phi;

    fResEl.textContent = 'Fugacity f = ' + f_bar.toFixed(1) + ' bar (φ = ' + phi.toFixed(3) + ')';
    grResEl.textContent = 'Residual Gibbs G^R = ' + G_R.toFixed(1) + ' J/mol (' + (Z < 1 ? 'Attractive forces dominate' : 'Repulsive hard-core forces dominate') + ' @ ' + P_bar + ' bar, ' + T_C + '°C)';
  }

  [pEl, zEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();