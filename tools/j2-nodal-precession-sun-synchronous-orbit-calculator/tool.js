(() => {
  'use strict';
  const altEl = document.getElementById('j2-alt'), incEl = document.getElementById('j2-inc');
  const raanResEl = document.getElementById('j2-res-raan'), ssoResEl = document.getElementById('j2-res-sso');

  const mu_earth = 398600.4418; // km^3 / s^2
  const R_E = 6378.137;         // Earth equatorial radius in km
  const J2 = 1.08263e-3;        // Earth second zonal harmonic

  function update() {
    const hKm = parseFloat(altEl.value), incDeg = parseFloat(incEl.value);
    if (isNaN(hKm) || isNaN(incDeg) || hKm <= 100 || incDeg < 0 || incDeg > 180) return;

    // Semi-major axis a = R_E + h  [km]
    const a = R_E + hKm;
    // Mean motion n = sqrt( mu / a^3 )  [rad / s]
    const n = Math.sqrt(mu_earth / Math.pow(a, 3));

    const incRad = (incDeg * Math.PI) / 180;

    // Nodal precession rate dOmega/dt = -1.5 * J2 * (R_E / a)^2 * n * cos(i)  [rad / s]
    const dOmega_rad_s = -1.5 * J2 * Math.pow(R_E / a, 2) * n * Math.cos(incRad);
    // Convert to degrees per day: dOmega_rad_s * (180/pi) * 86400
    const dOmega_deg_day = dOmega_rad_s * (180.0 / Math.PI) * 86400.0;

    // Target SSO precession rate = 360° / 365.2422 days = +0.985647 °/day
    const sso_rate_target_rad_s = (2.0 * Math.PI) / (365.2422 * 86400.0);
    // Required SSO cos(i) = - sso_rate_target / ( 1.5 * J2 * (R_E/a)^2 * n )
    const cos_i_sso = -sso_rate_target_rad_s / (1.5 * J2 * Math.pow(R_E / a, 2) * n);
    let sso_inc_deg = 0;
    if (Math.abs(cos_i_sso) <= 1.0) {
      sso_inc_deg = (Math.acos(cos_i_sso) * 180.0) / Math.PI;
    }

    const isSSO = Math.abs(dOmega_deg_day - 0.9856) <= 0.02;

    raanResEl.textContent = 'Ω̇ = ' + (dOmega_deg_day >= 0 ? '+' : '') + dOmega_deg_day.toFixed(4) + ' ° / day';
    ssoResEl.textContent = (isSSO ? 'PERFECT SUN-SYNCHRONOUS ORBIT' : 'Non-SSO Orbit (Target SSO i = ' + sso_inc_deg.toFixed(2) + '° @ ' + hKm + ' km)') + ' | Orbital Period: ' + ( (2*Math.PI/n)/60 ).toFixed(1) + ' min';
    raanResEl.style.color = isSSO ? '#22543d' : '#2563eb';
  }

  altEl.addEventListener('input', update);
  incEl.addEventListener('input', update);
  update();
})();