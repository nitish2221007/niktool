(() => {
  'use strict';
  const vEl = document.getElementById('deb-vacc'), pEl = document.getElementById('deb-part');
  const lResEl = document.getElementById('deb-res-lam'), rResEl = document.getElementById('deb-res-rel');

  const h = 6.62607015e-34; // J * s
  const c_light = 299792458; // m / s
  const m_e_kg = 9.1093837e-31;
  const e_charge = 1.602176634e-19;

  function update() {
    const Vacc_kv = parseFloat(vEl.value);
    if (isNaN(Vacc_kv) || Vacc_kv <= 0) return;

    // Kinetic energy in Joules: Ek = q * V
    const Ek_joules = Vacc_kv * 1000.0 * e_charge;
    const E0_joules = m_e_kg * Math.pow(c_light, 2); // 511 keV

    // Lorentz factor gamma = 1 + Ek / E0
    const gamma = 1.0 + (Ek_joules / E0_joules);
    // Velocity v = c * sqrt( 1 - 1/gamma^2 )
    const v_ratio = Math.sqrt(1.0 - (1.0 / Math.pow(gamma, 2)));

    // Relativistic momentum p = gamma * m_0 * v = (1/c) * sqrt( Ek^2 + 2*Ek*E0 )
    const p_momentum = (1.0 / c_light) * Math.sqrt(Math.pow(Ek_joules, 2) + (2.0 * Ek_joules * E0_joules));

    // de Broglie wavelength lambda = h / p  [meters]
    const lambda_m = h / p_momentum;
    const lambda_pm = lambda_m * 1e12;
    const lambda_angstrom = lambda_m * 1e10;

    lResEl.textContent = 'λ = ' + lambda_pm.toFixed(3) + ' pm (' + lambda_angstrom.toFixed(4) + ' Ångströms)';
    rResEl.textContent = 'Velocity v = ' + v_ratio.toFixed(3) + ' c (' + Math.round(v_ratio * 300000).toLocaleString() + ' km/s | Lorentz γ = ' + gamma.toFixed(3) + ' @ ' + Vacc_kv + ' kV)';
  }

  vEl.addEventListener('input', update);
  pEl.addEventListener('change', update);
  update();
})();