(() => {
  'use strict';
  const lmEl = document.getElementById('pd-lambda'), etEl = document.getElementById('pd-eta'), poEl = document.getElementById('pd-popt');
  const rsResEl = document.getElementById('pd-res-resp'), ipResEl = document.getElementById('pd-res-iph');

  const q = 1.602176634e-19; // C
  const h = 6.62607015e-34; // J*s
  const c = 2.99792458e8; // m/s

  function update() {
    const lambda_nm = parseFloat(lmEl.value), eta_pct = parseFloat(etEl.value), P_opt_mW = parseFloat(poEl.value);
    if (isNaN(lambda_nm) || isNaN(eta_pct) || isNaN(P_opt_mW) || lambda_nm <= 0 || eta_pct <= 0 || P_opt_mW < 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const eta = eta_pct / 100.0;

    // Photon energy in eV: E_ph = h * c / lambda
    const E_ph_eV = 1239.84193 / lambda_nm;

    // Responsivity: R = ( eta * q * lambda ) / ( h * c )  [A / W]
    const R = (eta * q * lambda_m) / (h * c);

    // Photocurrent: I_ph = R * P_opt  [mA]
    const I_ph_mA = R * P_opt_mW;
    const I_ph_uA = I_ph_mA * 1000.0;

    rsResEl.textContent = 'Responsivity R = ' + R.toFixed(3) + ' A / W';
    ipResEl.textContent = 'Photocurrent I_ph = ' + I_ph_mA.toFixed(3) + ' mA (' + Math.round(I_ph_uA) + ' μA) | E_photon = ' + E_ph_eV.toFixed(3) + ' eV (λ=' + lambda_nm + ' nm @ η=' + eta_pct + '%)';
  }

  [lmEl, etEl, poEl].forEach(el => el.addEventListener('input', update));
  update();
})();