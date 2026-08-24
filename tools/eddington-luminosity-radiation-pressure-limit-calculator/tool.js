(() => {
  'use strict';
  const mEl = document.getElementById('edd-mass'), eEl = document.getElementById('edd-eta');
  const lResEl = document.getElementById('edd-res-ledd'), mdResEl = document.getElementById('edd-res-mdot');

  const L_sun_watts = 3.828e26;
  const M_sun_kg = 1.98847e30;
  const c = 299792458;
  const sec_per_year = 3.15576e7;

  function update() {
    const M_solar = parseFloat(mEl.value), eta = parseFloat(eEl.value);
    if (isNaN(M_solar) || isNaN(eta) || M_solar <= 0 || eta <= 0 || eta >= 1.0) return;

    // L_Edd = 1.26e31 * M_solar  [Watts]
    const L_Edd_W = 1.26e31 * M_solar;
    const L_Edd_solar = L_Edd_W / L_sun_watts;

    // Critical accretion rate M_dot = L_Edd / ( eta * c^2 )  [kg / s -> M_sun / year]
    const M_dot_kg_s = L_Edd_W / (eta * Math.pow(c, 2));
    const M_dot_solar_yr = (M_dot_kg_s * sec_per_year) / M_sun_kg;

    // Salpeter e-folding time: t_Salpeter = ( eta * sigma_T * c ) / ( 4 * pi * G * m_p ) approx 45 Million years @ eta=0.1
    const t_Salpeter_Myr = (eta / 0.10) * 45.0;

    lResEl.textContent = 'L_Edd = ' + L_Edd_solar.toExponential(2) + ' L_☉ (' + L_Edd_W.toExponential(2) + ' W)';
    mdResEl.textContent = 'Ṁ_Edd = ' + M_dot_solar_yr.toFixed(2) + ' M_☉/yr | Salpeter e-Folding Time: ' + t_Salpeter_Myr.toFixed(1) + ' Myr (Accretion Efficiency η = ' + (eta*100).toFixed(0) + '%)';
  }

  mEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();