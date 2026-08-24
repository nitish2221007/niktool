(() => {
  'use strict';
  const naEl = document.getElementById('pn-na'), ndEl = document.getElementById('pn-nd');
  const vrEl = document.getElementById('pn-vr'), tEl = document.getElementById('pn-t');
  const vbResEl = document.getElementById('pn-res-vbi'), wResEl = document.getElementById('pn-res-w');

  const q = 1.602176634e-19; // C
  const k_B = 1.380649e-23; // J/K
  const eps_0 = 8.854187817e-14; // F/cm
  const eps_si = 11.7 * eps_0; // Silicon permittivity in F/cm
  const ni_300 = 1.0e10; // cm^-3

  function update() {
    const N_A = parseFloat(naEl.value), N_D = parseFloat(ndEl.value);
    const V_R = parseFloat(vrEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(N_A) || isNaN(N_D) || isNaN(V_R) || isNaN(T_K) || N_A <= 0 || N_D <= 0 || T_K <= 0) return;

    // Thermal voltage: V_t = k_B * T / q
    const V_t = (k_B * T_K) / q;

    // Built-in potential: V_bi = V_t * ln( (N_A * N_D) / ni^2 )  [Volts]
    const V_bi = V_t * Math.log((N_A * N_D) / Math.pow(ni_300, 2));

    // Total junction voltage: V_j = V_bi + V_R
    const V_j = V_bi + V_R;

    // Depletion width: W = sqrt( (2 * eps_si / q) * (1/N_A + 1/N_D) * V_j )  [cm -> um]
    const W_cm = Math.sqrt(((2.0 * eps_si) / q) * ((1.0 / N_A) + (1.0 / N_D)) * V_j);
    const W_um = W_cm * 1e4;

    // Asymmetric depletion extension: x_p = W * (N_D / (N_A + N_D)), x_n = W * (N_A / (N_A + N_D))
    const xp_um = W_um * (N_D / (N_A + N_D));
    const xn_um = W_um * (N_A / (N_A + N_D));

    // Peak electric field: E_max = 2 * V_j / W  [V/cm -> kV/cm]
    const E_max_kV_cm = (2.0 * V_j / W_cm) / 1000.0;

    vbResEl.textContent = 'Built-In Potential V_bi = ' + V_bi.toFixed(3) + ' V';
    wResEl.textContent = 'Width W = ' + W_um.toFixed(3) + ' μm (x_p = ' + xp_um.toFixed(3) + ' μm, x_n = ' + xn_um.toFixed(3) + ' μm) | Peak E = ' + E_max_kV_cm.toFixed(1) + ' kV/cm (V_R=' + V_R + ' V)';
  }

  [naEl, ndEl, vrEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();