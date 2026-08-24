(() => {
  'use strict';
  const iEl = document.getElementById('he-i'), bEl = document.getElementById('he-b');
  const tEl = document.getElementById('he-t'), vhEl = document.getElementById('he-vh');
  const nResEl = document.getElementById('he-res-n'), rhResEl = document.getElementById('he-res-rh');

  const q = 1.602176634e-19; // C

  function update() {
    const I_mA = parseFloat(iEl.value), B_T = parseFloat(bEl.value);
    const t_um = parseFloat(tEl.value), V_H_mV = parseFloat(vhEl.value);

    if (isNaN(I_mA) || isNaN(B_T) || isNaN(t_um) || isNaN(V_H_mV) || I_mA === 0 || B_T === 0 || t_um <= 0 || V_H_mV === 0) return;

    const I_A = I_mA * 1e-3;
    const t_cm = t_um * 1e-4;
    const V_H_V = V_H_mV * 1e-3;

    // Hall coefficient: R_H = ( V_H * t ) / ( I * B )  [m^3 / C -> cm^3 / C]
    // V_H in V, t in cm, I in A, B in T (= V*s/m^2):
    // R_H (cm^3 / C) = ( V_H * t_cm ) / ( I_A * B_T ) * 1e-4 * 1e6 = (V_H * t_cm) / (I_A * B_T)
    const R_H_cm3_C = (V_H_V * t_cm) / (I_A * B_T) * 1e8 * 1e-4; // standard unit scaling

    // Carrier concentration: n or p = 1 / ( q * |R_H| )  [cm^-3]
    const carrier_density = 1.0 / (q * Math.abs(R_H_cm3_C));

    const is_n_type = V_H_mV < 0;

    nResEl.textContent = (is_n_type ? 'n-Type Electrons: n = ' : 'p-Type Holes: p = ') + carrier_density.toExponential(2) + ' cm⁻³';
    nResEl.style.color = '#22543d';
    rhResEl.textContent = 'Hall Coefficient R_H = ' + R_H_cm3_C.toFixed(1) + ' cm³/C (' + (is_n_type ? 'Electrons (V_H < 0)' : 'Holes (V_H > 0)') + ' @ B=' + B_T + ' T)';
  }

  [iEl, bEl, tEl, vhEl].forEach(el => el.addEventListener('input', update));
  update();
})();