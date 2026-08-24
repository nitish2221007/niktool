(() => {
  'use strict';
  const mEl = document.getElementById('pe-metal'), lEl = document.getElementById('pe-lambda');
  const kResEl = document.getElementById('pe-res-kmax'), vsResEl = document.getElementById('pe-res-vs'), cResEl = document.getElementById('pe-res-cutoff');

  const hc_eV_nm = 1239.841984; // h*c in eV * nm

  function update() {
    const phi = parseFloat(mEl.value), lambdaNm = parseFloat(lEl.value);
    if (isNaN(phi) || isNaN(lambdaNm) || phi <= 0 || lambdaNm <= 0) return;

    // Photon energy E = hc / lambda (in eV)
    const ePhoton = hc_eV_nm / lambdaNm;
    const kMax = ePhoton - phi;
    const cutoffNm = hc_eV_nm / phi;

    if (kMax > 0) {
      kResEl.textContent = kMax.toFixed(3) + ' eV';
      kResEl.style.color = '#22543d';
      vsResEl.textContent = kMax.toFixed(3) + ' Volts (V_stop)';
    } else {
      kResEl.textContent = '0.000 eV (No Emission)';
      kResEl.style.color = '#c53030';
      vsResEl.textContent = 'Below Threshold (E_photon < Φ)';
    }

    cResEl.textContent = cutoffNm.toFixed(1) + ' nm (f₀ = ' + (3e17 / cutoffNm / 1e12).toFixed(1) + ' THz)';
  }

  mEl.addEventListener('change', update);
  lEl.addEventListener('input', update);
  update();
})();