(() => {
  'use strict';
  const fEl = document.getElementById('bm-f'), lEl = document.getElementById('bm-l');
  const eEl = document.getElementById('bm-e'), iEl = document.getElementById('bm-i'), cEl = document.getElementById('bm-c');
  const dfResEl = document.getElementById('bm-res-def'), stResEl = document.getElementById('bm-res-stress');

  function update() {
    const F_kN = parseFloat(fEl.value), L_m = parseFloat(lEl.value);
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value), c_mm = parseFloat(cEl.value);

    if (isNaN(F_kN) || isNaN(L_m) || isNaN(E_GPa) || isNaN(I_cm4) || isNaN(c_mm) || F_kN <= 0 || L_m <= 0 || E_GPa <= 0 || I_cm4 <= 0 || c_mm <= 0) return;

    const F_N = F_kN * 1000.0;
    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8;
    const c_m = c_mm * 1e-3;

    // Midspan deflection: delta = F * L^3 / ( 48 * E * I )  [m -> mm]
    const delta_m = (F_N * Math.pow(L_m, 3)) / (48.0 * E_Pa * I_m4);
    const delta_mm = delta_m * 1000.0;
    const span_ratio = Math.round(L_m / delta_m);

    // Max bending moment: M = F * L / 4  [N*m -> kN*m]
    const M_Nm = (F_N * L_m) / 4.0;
    const M_kNm = M_Nm / 1000.0;

    // Max bending stress: sigma = M * c / I  [Pa -> MPa]
    const sigma_Pa = (M_Nm * c_m) / I_m4;
    const sigma_MPa = sigma_Pa / 1e6;

    dfResEl.textContent = 'Center Deflection δ = ' + delta_mm.toFixed(2) + ' mm (L / ' + span_ratio + ')';
    stResEl.textContent = 'Max Moment M = ' + M_kNm.toFixed(2) + ' kN·m | Max Stress σ = ' + sigma_MPa.toFixed(1) + ' MPa (I=' + I_cm4 + ' cm⁴)';
  }

  [fEl, lEl, eEl, iEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();