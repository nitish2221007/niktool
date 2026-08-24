(() => {
  'use strict';
  const gmEl = document.getElementById('ps-gamma'), acEl = document.getElementById('ps-act'), dsEl = document.getElementById('ps-dist');
  const rtResEl = document.getElementById('ps-res-rate'), dsResEl = document.getElementById('ps-res-dose');

  function update() {
    const Gamma_const = parseFloat(gmEl.value), A_Ci = parseFloat(acEl.value), d_m = parseFloat(dsEl.value);
    if (isNaN(Gamma_const) || isNaN(A_Ci) || isNaN(d_m) || Gamma_const <= 0 || A_Ci <= 0 || d_m <= 0) return;

    // Exposure rate: X_dot = Gamma * A / d^2  [R / hr]
    const X_dot_R_hr = (Gamma_const * A_Ci) / Math.pow(d_m, 2);
    const X_dot_mR_hr = X_dot_R_hr * 1000.0;

    // Dose rate in air: 1 R approx 0.0097 Gy = 9.7 mGy
    const dose_rate_mGy_hr = X_dot_R_hr * 9.7;

    // Barricade boundary distance for public 2 mR/hr limit:
    // d_safe = sqrt( (Gamma * A) / 0.002 )
    const d_safe_m = Math.sqrt((Gamma_const * A_Ci) / 0.002);

    rtResEl.textContent = 'Exposure Rate Ẋ = ' + X_dot_R_hr.toFixed(2) + ' R / hr (' + Math.round(X_dot_mR_hr).toLocaleString() + ' mR/hr)';
    dsResEl.textContent = 'Air Dose Rate = ' + dose_rate_mGy_hr.toFixed(1) + ' mGy/hr | 2 mR/hr Barricade Boundary = ' + d_safe_m.toFixed(1) + ' m (A=' + A_Ci + ' Ci @ d=' + d_m + ' m)';
  }

  [gmEl, acEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();