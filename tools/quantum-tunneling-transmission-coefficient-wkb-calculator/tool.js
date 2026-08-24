(() => {
  'use strict';
  const v0El = document.getElementById('tun-v0'), eEl = document.getElementById('tun-e'), aEl = document.getElementById('tun-a');
  const pResEl = document.getElementById('tun-res-prob'), dResEl = document.getElementById('tun-res-decay');

  const hbar = 1.054571817e-34; // J * s
  const m_e = 9.1093837e-31;     // kg
  const e_charge = 1.602176634e-19; // J / eV

  function update() {
    const V0 = parseFloat(v0El.value), E = parseFloat(eEl.value), aNm = parseFloat(aEl.value);
    if (isNaN(V0) || isNaN(E) || isNaN(aNm) || V0 <= E || E <= 0 || aNm <= 0) return;

    const deltaE_ev = V0 - E;
    const deltaE_joules = deltaE_ev * e_charge;
    const a_m = aNm * 1e-9;

    // Evanescent wavevector kappa = sqrt( 2 * m * (V0 - E) ) / hbar  [m^-1]
    const kappa_m = Math.sqrt(2.0 * m_e * deltaE_joules) / hbar;
    const kappa_nm = kappa_m * 1e-9;

    // Transmission probability WKB approx: T = 16 * (E/V0) * (1 - E/V0) * exp( -2 * kappa * a )
    const prefactor = 16.0 * (E / V0) * (1.0 - (E / V0));
    const exponent = 2.0 * kappa_m * a_m;
    const T = prefactor * Math.exp(-exponent);

    // Distance to drop by factor of 10: Delta_a = ln(10) / (2 * kappa)
    const decay10_nm = Math.log(10) / (2.0 * kappa_nm);

    pResEl.textContent = 'T = ' + T.toExponential(3) + ' (' + (T * 100).toPrecision(3) + '% Tunneling)';
    dResEl.textContent = 'Decay κ = ' + kappa_nm.toFixed(2) + ' nm⁻¹ (10× Current Drop per +' + decay10_nm.toFixed(2) + ' nm barrier width @ ΔV = ' + deltaE_ev.toFixed(1) + ' eV)';
  }

  [v0El, eEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();