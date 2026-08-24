(() => {
  'use strict';
  const bEl = document.getElementById('cy-b'), eEl = document.getElementById('cy-e');
  const fcResEl = document.getElementById('cy-res-fce'), hmResEl = document.getElementById('cy-res-harm');

  const e_charge = 1.602176634e-19; // C
  const m_e = 9.1093837e-31; // kg
  const c = 2.99792458e8; // m/s

  function update() {
    const B_T = parseFloat(bEl.value), E_keV = parseFloat(eEl.value);
    if (isNaN(B_T) || isNaN(E_keV) || B_T <= 0 || E_keV <= 0) return;

    // Non-relativistic fundamental cyclotron frequency: f_ce = e * B / (2 * pi * m_e)  [Hz -> GHz]
    const f_ce_GHz = (e_charge * B_T / (2.0 * Math.PI * m_e)) * 1e-9;

    // Relativistic gamma: gamma = 1 + E / (511 keV)
    const gamma = 1.0 + (E_keV / 511.0);
    const f_ce_rel_GHz = f_ce_GHz / gamma;

    // Perpendicular velocity: v_perp approx sqrt( 2 * E / m_e )
    const E_J = E_keV * 1000.0 * e_charge;
    const v_perp = Math.sqrt(2.0 * E_J / m_e);

    // Larmor gyroradius: r_L = m_e * v_perp / ( e * B )  [m -> mm]
    const r_L_mm = (m_e * v_perp / (e_charge * B_T)) * 1000.0;

    fcResEl.textContent = 'Cyclotron Frequency f_ce = ' + f_ce_rel_GHz.toFixed(1) + ' GHz';
    hmResEl.textContent = '2nd Harmonic = ' + (2.0 * f_ce_rel_GHz).toFixed(1) + ' GHz | Gyroradius r_L = ' + r_L_mm.toFixed(3) + ' mm (B=' + B_T + ' T, E=' + E_keV + ' keV, γ=' + gamma.toFixed(3) + ')';
  }

  bEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();