(() => {
  'use strict';
  const altEl = document.getElementById('sso-alt'), incEl = document.getElementById('sso-inc');
  const prResEl = document.getElementById('sso-res-precess'), rqResEl = document.getElementById('sso-res-req');

  const mu_E = 398600.4418; // km^3 / s^2
  const R_E = 6378.137; // km
  const J2 = 1.08263e-3; // Earth J2 harmonic

  function update() {
    const h_km = parseFloat(altEl.value), inc_deg = parseFloat(incEl.value);
    if (isNaN(h_km) || isNaN(inc_deg) || h_km < 0) return;

    const r_km = R_E + h_km;
    const inc_rad = (inc_deg * Math.PI) / 180.0;

    // Mean motion n: n = sqrt( mu / r^3 )  [rad / s]
    const n = Math.sqrt(mu_E / Math.pow(r_km, 3));
    const Period_min = (2.0 * Math.PI / n) / 60.0;

    // Nodal precession rate dOmega/dt in rad/s:
    // dOmega/dt = - (3/2) * J2 * (R_E / r)^2 * n * cos(i)
    const dOmega_rad_s = - 1.5 * J2 * Math.pow(R_E / r_km, 2) * n * Math.cos(inc_rad);
    const dOmega_deg_day = dOmega_rad_s * (180.0 / Math.PI) * 86400.0;

    // Required SSO inclination for dOmega/dt = +0.9856 deg/day (= 2*pi / 365.242 days / 86400 s):
    const omega_sun_rad_s = (2.0 * Math.PI) / (365.2422 * 86400.0);
    const cos_i_sso = - omega_sun_rad_s / ( 1.5 * J2 * Math.pow(R_E / r_km, 2) * n );

    let i_sso_deg = 0;
    if (Math.abs(cos_i_sso) <= 1.0) {
      i_sso_deg = Math.acos(cos_i_sso) * (180.0 / Math.PI);
    }

    prResEl.textContent = 'Precession dΩ/dt = ' + (dOmega_deg_day >= 0 ? '+' : '') + dOmega_deg_day.toFixed(3) + ' ° / day';
    rqResEl.textContent = 'Exact SSO Inclination i_SSO = ' + i_sso_deg.toFixed(2) + '° (Period = ' + Period_min.toFixed(2) + ' min @ h=' + h_km + ' km)';
  }

  altEl.addEventListener('input', update);
  incEl.addEventListener('input', update);
  update();
})();