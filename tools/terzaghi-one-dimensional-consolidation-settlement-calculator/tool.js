(() => {
  'use strict';
  const hEl = document.getElementById('tc-h'), e0El = document.getElementById('tc-e0');
  const ccEl = document.getElementById('tc-cc'), s0El = document.getElementById('tc-s0'), dsEl = document.getElementById('tc-ds');
  const scResEl = document.getElementById('tc-res-sc'), lgResEl = document.getElementById('tc-res-log');

  function update() {
    const H_m = parseFloat(hEl.value), e0 = parseFloat(e0El.value);
    const C_c = parseFloat(ccEl.value), sigma_0 = parseFloat(s0El.value), delta_sigma = parseFloat(dsEl.value);

    if (isNaN(H_m) || isNaN(e0) || isNaN(C_c) || isNaN(sigma_0) || isNaN(delta_sigma) || H_m <= 0 || e0 <= 0 || C_c <= 0 || sigma_0 <= 0 || delta_sigma <= 0) return;

    const sigma_final = sigma_0 + delta_sigma;

    // Terzaghi 1D consolidation settlement: S_c = ( C_c * H ) / ( 1 + e0 ) * log10( (sigma_0 + delta_sigma) / sigma_0 )
    const S_c_m = ((C_c * H_m) / (1.0 + e0)) * Math.log10(sigma_final / sigma_0);
    const S_c_cm = S_c_m * 100.0;

    const delta_e = -C_c * Math.log10(sigma_final / sigma_0);

    scResEl.textContent = 'Settlement S_c = ' + S_c_cm.toFixed(1) + ' cm (' + S_c_m.toFixed(3) + ' m)';
    lgResEl.textContent = 'Final σ'_f = ' + sigma_final.toFixed(1) + ' kPa | Ratio = ' + (sigma_final / sigma_0).toFixed(2) + '× (Δe = ' + delta_e.toFixed(4) + ' @ H=' + H_m + ' m)';
  }

  [hEl, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();