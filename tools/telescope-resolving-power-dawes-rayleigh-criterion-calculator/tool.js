(() => {
  'use strict';
  const apEl = document.getElementById('tl-ap'), wvEl = document.getElementById('tl-wav');
  const dwResEl = document.getElementById('tl-res-dawes'), ryResEl = document.getElementById('tl-res-ray');

  function update() {
    const D_mm = parseFloat(apEl.value), lambda_nm = parseFloat(wvEl.value);
    if (isNaN(D_mm) || isNaN(lambda_nm) || D_mm <= 0 || lambda_nm <= 0) return;

    // Dawes Limit: R_arcsec = 116 / D_mm
    const R_dawes = 116.0 / D_mm;

    // Rayleigh Criterion: theta_rad = 1.22 * lambda / D
    const D_m = D_mm / 1000.0;
    const lambda_m = lambda_nm * 1e-9;
    const theta_rad = 1.22 * (lambda_m / D_m);
    const theta_arcsec = theta_rad * (180.0 / Math.PI) * 3600.0;

    // Lunar resolution at 384,400 km:
    const lunar_res_km = (theta_rad * 384400.0);

    dwResEl.textContent = 'Dawes Limit R = ' + R_dawes.toFixed(2) + ' Arcseconds';
    ryResEl.textContent = 'Rayleigh θ = ' + theta_arcsec.toFixed(2) + ' Arcsec | Lunar Feature Resolution ≈ ' + lunar_res_km.toFixed(1) + ' km (D = ' + D_mm + ' mm)';
  }

  apEl.addEventListener('input', update);
  wvEl.addEventListener('input', update);
  update();
})();