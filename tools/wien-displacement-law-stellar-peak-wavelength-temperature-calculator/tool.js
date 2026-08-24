(() => {
  'use strict';
  const tEl = document.getElementById('wn-temp');
  const lResEl = document.getElementById('wn-res-lambda'), clResEl = document.getElementById('wn-res-class');

  const b_wien = 2.897771955e-3; // m * K
  const h_c_eV_nm = 1239.84193; // hc in eV * nm

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // Wien's Law: lambda_max = b / T  [meters -> nanometers]
    const lambda_m = b_wien / T;
    const lambda_nm = lambda_m * 1e9;
    const lambda_ang = lambda_nm * 10.0;

    // Peak photon energy: E = hc / lambda  [eV]
    const E_eV = h_c_eV_nm / lambda_nm;

    let band = '', color = '#22543d';
    if (lambda_nm < 10) { band = 'X-Ray / Gamma Ray Spectrum (Extreme accretion disk)'; color = '#2563eb'; }
    else if (lambda_nm < 380) { band = 'Ultraviolet (O / B Type Hot Blue Stars)'; color = '#2563eb'; }
    else if (lambda_nm <= 750) { band = 'Visible Light Spectrum (A, F, G, K Main Sequence Stars)'; color = '#22543d'; }
    else if (lambda_nm < 1e6) { band = 'Infrared (M-Dwarfs, Protostars & Brown Dwarfs)'; color = '#c53030'; }
    else { band = 'Microwave / Radio (Cosmic Microwave Background 2.73 K)'; color = '#ea580c'; }

    lResEl.textContent = 'Peak λ_max = ' + (lambda_nm >= 1000 ? (lambda_nm/1000).toFixed(2) + ' μm' : lambda_nm.toFixed(1) + ' nm') + ' (' + Math.round(lambda_ang).toLocaleString() + ' Å)';
    lResEl.style.color = color;
    clResEl.textContent = 'Photon Energy = ' + E_eV.toFixed(2) + ' eV | ' + band + ' (@ T = ' + T + ' K)';
    clResEl.style.color = color;
  }

  tEl.addEventListener('input', update);
  update();
})();