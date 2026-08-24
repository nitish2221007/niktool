(() => {
  'use strict';
  const naEl = document.getElementById('vt-na'), toxEl = document.getElementById('vt-tox');
  const vfbEl = document.getElementById('vt-vfb'), vsbEl = document.getElementById('vt-vsb');
  const vtResEl = document.getElementById('vt-res-vth'), cxResEl = document.getElementById('vt-res-cox');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K
  const T = 300.0; // K
  const V_t = (k_B * T) / q; // 0.02585 V
  const eps_0 = 8.854187817e-14; // F/cm
  const eps_si = 11.7 * eps_0; // F/cm
  const eps_ox = 3.9 * eps_0; // SiO2 permittivity in F/cm
  const ni = 1.0e10; // cm^-3

  function update() {
    const N_A = parseFloat(naEl.value), tox_nm = parseFloat(toxEl.value);
    const V_FB = parseFloat(vfbEl.value), V_SB = parseFloat(vsbEl.value);

    if (isNaN(N_A) || isNaN(tox_nm) || isNaN(V_FB) || isNaN(V_SB) || N_A <= 0 || tox_nm <= 0 || V_SB < 0) return;

    const tox_cm = tox_nm * 1e-7;

    // Gate oxide capacitance: C_ox = eps_ox / tox_cm  [F / cm^2 -> uF / cm^2]
    const C_ox_F_cm2 = eps_ox / tox_cm;
    const C_ox_uF_cm2 = C_ox_F_cm2 * 1e6;

    // Substrate Fermi potential: phi_F = V_t * ln( N_A / ni )
    const phi_F = V_t * Math.log(N_A / ni);
    const two_phi_F = 2.0 * phi_F;

    // Body effect coefficient: gamma = sqrt( 2 * q * eps_si * N_A ) / C_ox
    const gamma = Math.sqrt(2.0 * q * eps_si * N_A) / C_ox_F_cm2;

    // Threshold voltage: V_th = V_FB + 2*phi_F + gamma * sqrt( 2*phi_F + V_SB )
    const V_th = V_FB + two_phi_F + (gamma * Math.sqrt(two_phi_F + V_SB));

    vtResEl.textContent = 'Threshold V_th = ' + V_th.toFixed(3) + ' V';
    cxResEl.textContent = 'C_ox = ' + C_ox_uF_cm2.toFixed(2) + ' μF/cm² | Body γ = ' + gamma.toFixed(3) + ' V^½ | 2φ_F = ' + two_phi_F.toFixed(3) + ' V (V_SB=' + V_SB + ' V)';
  }

  [naEl, toxEl, vfbEl, vsbEl].forEach(el => el.addEventListener('input', update));
  update();
})();