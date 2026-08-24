(() => {
  'use strict';
  const bEl = document.getElementById('cyc-b'), eEl = document.getElementById('cyc-e'), pEl = document.getElementById('cyc-part');
  const rlResEl = document.getElementById('cyc-res-rl'), fcResEl = document.getElementById('cyc-res-fc');

  const e_charge = 1.602176634e-19; // C
  const m_u = 1.66053906660e-27;    // kg (1 amu)
  const m_e_kg = 9.1093837e-31;

  const SPECIES = {
    'deuteron': { mass: 2.014 * m_u, q: 1 * e_charge, name: 'Deuteron D⁺' },
    'electron': { mass: m_e_kg,       q: 1 * e_charge, name: 'Electron e⁻' },
    'alpha':    { mass: 4.002 * m_u, q: 2 * e_charge, name: 'Alpha He²⁺' },
    'proton':   { mass: 1.007 * m_u, q: 1 * e_charge, name: 'Proton p⁺' }
  };

  function update() {
    const B = parseFloat(bEl.value), E_kev = parseFloat(eEl.value);
    const sp = SPECIES[pEl.value];

    if (isNaN(B) || isNaN(E_kev) || B <= 0 || E_kev <= 0) return;

    const E_joules = E_kev * 1000.0 * e_charge;

    // Perpendicular velocity v_perp = sqrt( 2 * E / m )  [m / s]
    const v_perp = Math.sqrt((2.0 * E_joules) / sp.mass);

    // Cyclotron angular frequency omega_c = q * B / m  [rad / s]
    const omega_c = (sp.q * B) / sp.mass;
    const f_c_hz = omega_c / (2.0 * Math.PI);

    // Larmor gyroradius r_L = v_perp / omega_c = (m * v_perp) / (q * B)  [meters]
    const r_L_m = v_perp / omega_c;
    const r_L_mm = r_L_m * 1000.0;
    const r_L_um = r_L_m * 1e6;

    let fStr = '';
    if (f_c_hz >= 1e9) fStr = (f_c_hz / 1e9).toFixed(2) + ' GHz (ECRH Resonance)';
    else fStr = (f_c_hz / 1e6).toFixed(1) + ' MHz (ICRH Resonance)';

    rlResEl.textContent = 'r_L = ' + (r_L_mm < 1.0 ? r_L_um.toFixed(1) + ' μm' : r_L_mm.toFixed(2) + ' mm Gyroradius');
    fcResEl.textContent = 'f_c = ' + fStr + ' | v_⊥ = ' + Math.round(v_perp / 1000).toLocaleString() + ' km/s (' + sp.name + ' @ B = ' + B + ' T)';
  }

  [bEl, eEl].forEach(el => el.addEventListener('input', update));
  pEl.addEventListener('change', update);
  update();
})();