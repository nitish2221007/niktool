(() => {
  'use strict';
  const endEl = document.getElementById('bk-end'), lEl = document.getElementById('bk-l');
  const eEl = document.getElementById('bk-e'), iEl = document.getElementById('bk-i');
  const pcrResEl = document.getElementById('bk-res-pcr'), effResEl = document.getElementById('bk-res-eff');

  function update() {
    const K = parseFloat(endEl.value);
    const L = parseFloat(lEl.value), E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);

    if (isNaN(K) || isNaN(L) || isNaN(E_GPa) || isNaN(I_cm4) || L <= 0 || E_GPa <= 0 || I_cm4 <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4
    const L_eff = K * L;

    // Euler buckling critical load: P_cr = ( pi^2 * E * I ) / ( L_eff^2 )  [Newtons]
    const P_cr_N = (Math.pow(Math.PI, 2) * E_Pa * I_m4) / Math.pow(L_eff, 2);
    const P_cr_kN = P_cr_N / 1000.0;

    pcrResEl.textContent = 'P_cr = ' + P_cr_kN.toFixed(2) + ' kN Critical Load';
    effResEl.textContent = 'Effective Length K·L = ' + L_eff.toFixed(2) + ' m (K = ' + K + ' @ L = ' + L + ' m, E = ' + E_GPa + ' GPa, I = ' + I_cm4 + ' cm⁴)';
  }

  [endEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  endEl.addEventListener('change', update);
  update();
})();