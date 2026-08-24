(() => {
  'use strict';
  const w0El = document.getElementById('gb-w0'), lamEl = document.getElementById('gb-lam'), zEl = document.getElementById('gb-z');
  const wzResEl = document.getElementById('gb-res-wz'), divResEl = document.getElementById('gb-res-div');

  function update() {
    const w0_um = parseFloat(w0El.value), lam_nm = parseFloat(lamEl.value), z_m = parseFloat(zEl.value);
    if (isNaN(w0_um) || isNaN(lam_nm) || isNaN(z_m) || w0_um <= 0 || lam_nm <= 0 || z_m < 0) return;

    const w0_m = w0_um * 1e-6;
    const lam_m = lam_nm * 1e-9;

    // Rayleigh range z_R = ( pi * w0^2 ) / lambda  [meters]
    const z_R_m = (Math.PI * Math.pow(w0_m, 2)) / lam_m;
    const z_R_mm = z_R_m * 1000.0;

    // Far-field divergence half-angle theta = lambda / ( pi * w0 )  [radians -> mrad]
    const theta_rad = lam_m / (Math.PI * w0_m);
    const theta_mrad = theta_rad * 1000.0;
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Beam radius at distance z: w(z) = w0 * sqrt( 1 + (z / z_R)^2 )  [meters -> mm]
    const wz_m = w0_m * Math.sqrt(1.0 + Math.pow(z_m / z_R_m, 2));
    const wz_mm = wz_m * 1000.0;
    const wz_um = wz_m * 1e6;

    wzResEl.textContent = 'Spot w(' + z_m + 'm) = ' + (wz_mm < 1.0 ? wz_um.toFixed(1) + ' μm' : wz_mm.toFixed(2) + ' mm Radius');
    divResEl.textContent = 'Half-Angle θ = ' + theta_mrad.toFixed(2) + ' mrad (' + theta_deg.toFixed(3) + '°) | Rayleigh Range z_R = ' + z_R_mm.toFixed(2) + ' mm (DOF = ' + (z_R_mm*2).toFixed(1) + ' mm)';
  }

  [w0El, lamEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();