(() => {
  'use strict';
  const pEl = document.getElementById('cb-p'), lEl = document.getElementById('cb-l');
  const eEl = document.getElementById('cb-e'), iEl = document.getElementById('cb-i');
  const dfResEl = document.getElementById('cb-res-def'), mmResEl = document.getElementById('cb-res-mom');

  function update() {
    const P_kN = parseFloat(pEl.value), L_m = parseFloat(lEl.value);
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);

    if (isNaN(P_kN) || isNaN(L_m) || isNaN(E_GPa) || isNaN(I_cm4) || P_kN <= 0 || L_m <= 0 || E_GPa <= 0 || I_cm4 <= 0) return;

    // Convert to SI base units:
    const P_N = P_kN * 1000.0;
    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // Max deflection delta = ( P * L^3 ) / ( 3 * E * I )  [meters]
    const delta_m = (P_N * Math.pow(L_m, 3)) / (3.0 * E_Pa * I_m4);
    const delta_mm = delta_m * 1000.0;

    // Max bending moment at fixed support: M = P * L  [N*m]
    const M_kNm = P_kN * L_m;

    const spanRatio = Math.round((L_m * 1000.0) / delta_mm);

    dfResEl.textContent = 'Max Deflection δ_max = ' + delta_mm.toFixed(2) + ' mm';
    mmResEl.textContent = 'Fixed Wall Moment M_max = ' + M_kNm.toFixed(2) + ' kN·m | Deflection Ratio = L / ' + spanRatio + ' (Span: ' + L_m + ' m @ ' + P_kN + ' kN)';
  }

  [pEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();