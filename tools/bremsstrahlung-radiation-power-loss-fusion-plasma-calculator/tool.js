(() => {
  'use strict';
  const neEl = document.getElementById('br-ne'), teEl = document.getElementById('br-te');
  const zfEl = document.getElementById('br-zeff'), vlEl = document.getElementById('br-vol');
  const pbResEl = document.getElementById('br-res-pbr'), ttResEl = document.getElementById('br-res-total');

  function update() {
    const ne_scaled = parseFloat(neEl.value), T_e_keV = parseFloat(teEl.value);
    const Z_eff = parseFloat(zfEl.value), V_m3 = parseFloat(vlEl.value);

    if (isNaN(ne_scaled) || isNaN(T_e_keV) || isNaN(Z_eff) || isNaN(V_m3) || ne_scaled <= 0 || T_e_keV <= 0 || Z_eff <= 0 || V_m3 <= 0) return;

    const n_e = ne_scaled * 1e20; // m^-3

    // Bremsstrahlung power formula:
    // P_Br = 5.35e-37 * Z_eff * n_e^2 * sqrt( T_e_keV )  [W / m^3]
    const P_Br_W_m3 = 5.35e-37 * Z_eff * Math.pow(n_e, 2) * Math.sqrt(T_e_keV);
    const P_Br_kW_m3 = P_Br_W_m3 / 1000.0;

    // Total radiated power across reactor:
    const P_tot_MW = (P_Br_W_m3 * V_m3) / 1e6;

    pbResEl.textContent = 'Bremsstrahlung Loss P_Br = ' + P_Br_kW_m3.toFixed(1) + ' kW / m³';
    ttResEl.textContent = 'Total Radiated Power = ' + P_tot_MW.toFixed(1) + ' MW (Core V = ' + V_m3 + ' m³ @ Z_eff = ' + Z_eff + ', T_e = ' + T_e_keV + ' keV)';
  }

  [neEl, teEl, zfEl, vlEl].forEach(el => el.addEventListener('input', update));
  update();
})();