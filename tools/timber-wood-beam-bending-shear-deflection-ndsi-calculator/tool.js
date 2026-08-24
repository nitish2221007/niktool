(() => {
  'use strict';
  const bEl = document.getElementById('tm-b'), hEl = document.getElementById('tm-h');
  const lEl = document.getElementById('tm-l'), wEl = document.getElementById('tm-w');
  const fbResEl = document.getElementById('tm-res-fb'), shResEl = document.getElementById('tm-res-shear');

  const E_wood_GPa = 11.0; // Typical Douglas Fir / Pine Modulus of Elasticity

  function update() {
    const b_mm = parseFloat(bEl.value), h_mm = parseFloat(hEl.value);
    const L_m = parseFloat(lEl.value), w_kNm = parseFloat(wEl.value);

    if (isNaN(b_mm) || isNaN(h_mm) || isNaN(L_m) || isNaN(w_kNm) || b_mm <= 0 || h_mm <= 0 || L_m <= 0 || w_kNm <= 0) return;

    // Cross-sectional properties:
    // Area A = b * h  [mm^2]
    const A_mm2 = b_mm * h_mm;
    // Section Modulus S = ( b * h^2 ) / 6  [mm^3]
    const S_mm3 = (b_mm * Math.pow(h_mm, 2)) / 6.0;
    // Moment of Inertia I = ( b * h^3 ) / 12  [mm^4]
    const I_mm4 = (b_mm * Math.pow(h_mm, 3)) / 12.0;

    // Max bending moment: M = w * L^2 / 8  [kN * m -> N * mm]
    const M_kNm = (w_kNm * Math.pow(L_m, 2)) / 8.0;
    const M_Nmm = M_kNm * 1e6;

    // Bending stress f_b = M / S  [MPa]
    const f_b = M_Nmm / S_mm3;

    // Max shear force: V = w * L / 2  [kN -> N]
    const V_N = (w_kNm * L_m * 1000.0) / 2.0;
    // Horizontal shear stress for rectangular beam: f_v = 1.5 * V / A  [MPa]
    const f_v = (1.5 * V_N) / A_mm2;

    // Midspan deflection: delta = ( 5 * w * L^4 ) / ( 384 * E * I )  [mm]
    const w_N_mm = w_kNm; // 1 kN/m = 1 N/mm
    const L_mm = L_m * 1000.0;
    const E_MPa = E_wood_GPa * 1000.0;
    const delta_mm = (5.0 * w_N_mm * Math.pow(L_mm, 4)) / (384.0 * E_MPa * I_mm4);

    const spanRatio = Math.round(L_mm / delta_mm);

    fbResEl.textContent = 'Bending f_b = ' + f_b.toFixed(2) + ' MPa (M = ' + M_kNm.toFixed(2) + ' kN·m)';
    shResEl.textContent = 'Shear f_v = ' + f_v.toFixed(2) + ' MPa | Deflection δ = ' + delta_mm.toFixed(2) + ' mm (L / ' + spanRatio + ' @ ' + b_mm + '×' + h_mm + ' mm)';
  }

  [bEl, hEl, lEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();