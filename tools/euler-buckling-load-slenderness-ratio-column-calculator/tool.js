(() => {
  'use strict';
  const eEl = document.getElementById('eb-e'), iEl = document.getElementById('eb-i');
  const lEl = document.getElementById('eb-l'), kEl = document.getElementById('eb-k');
  const pcrResEl = document.getElementById('eb-res-pcr'), efResEl = document.getElementById('eb-res-eff');

  function update() {
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);
    const L_m = parseFloat(lEl.value), K = parseFloat(kEl.value);

    if (isNaN(E_GPa) || isNaN(I_cm4) || isNaN(L_m) || isNaN(K) || E_GPa <= 0 || I_cm4 <= 0 || L_m <= 0 || K <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // Effective length: Le = K * L
    const Le = K * L_m;

    // Euler critical load: P_cr = pi^2 * E * I / (Le^2)  [N -> kN]
    const P_cr_N = (Math.pow(Math.PI, 2) * E_Pa * I_m4) / Math.pow(Le, 2);
    const P_cr_kN = P_cr_N / 1000.0;

    const EI_kNm2 = (E_Pa * I_m4) / 1000.0;

    pcrResEl.textContent = 'Buckling Load P_cr = ' + P_cr_kN.toFixed(1) + ' kN';
    efResEl.textContent = 'Effective L_e = ' + Le.toFixed(2) + ' m (K=' + K + ') | Flexural Rigidity EI = ' + EI_kNm2.toFixed(1) + ' kN·m²';
  }

  [eEl, iEl, lEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();