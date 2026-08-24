(() => {
  'use strict';
  const nhEl = document.getElementById('db-nh'), nlEl = document.getElementById('db-nl');
  const npEl = document.getElementById('db-npairs'), lmEl = document.getElementById('db-lambda0');
  const rfResEl = document.getElementById('db-res-ref'), bdResEl = document.getElementById('db-res-band');

  function update() {
    const n_H = parseFloat(nhEl.value), n_L = parseFloat(nlEl.value);
    const N = parseInt(npEl.value, 10), lambda0_nm = parseFloat(lmEl.value);

    if (isNaN(n_H) || isNaN(n_L) || isNaN(N) || isNaN(lambda0_nm) || n_H <= n_L || n_L <= 0 || N <= 0 || lambda0_nm <= 0) return;

    // DBR peak reflectivity formula (air incident, matched substrate):
    // Ratio term: (n_L / n_H)^(2N)
    const ratio_term = Math.pow(n_L / n_H, 2.0 * N);
    const R = Math.pow((1.0 - ratio_term) / (1.0 + ratio_term), 2);
    const R_pct = R * 100.0;

    // Photonic stopband bandwidth: Delta_lambda = (4 * lambda0 / pi) * ( (n_H - n_L) / (n_H + n_L) )  [nm]
    const delta_lambda_nm = (4.0 * lambda0_nm / Math.PI) * ((n_H - n_L) / (n_H + n_L));

    // Quarter-wave layer thicknesses: d = lambda0 / (4 * n)
    const d_H_nm = lambda0_nm / (4.0 * n_H);
    const d_L_nm = lambda0_nm / (4.0 * n_L);

    rfResEl.textContent = 'Peak Reflectivity R = ' + R_pct.toFixed(3) + ' %';
    bdResEl.textContent = 'Stopband Δλ = ' + delta_lambda_nm.toFixed(1) + ' nm | Layers: d_H=' + d_H_nm.toFixed(1) + ' nm, d_L=' + d_L_nm.toFixed(1) + ' nm (N=' + N + ' pairs @ ' + lambda0_nm + ' nm)';
  }

  [nhEl, nlEl, npEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();