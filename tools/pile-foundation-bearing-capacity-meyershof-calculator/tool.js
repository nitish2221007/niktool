(() => {
  'use strict';
  const dEl = document.getElementById('pil-dia'), lEl = document.getElementById('pil-len');
  const sptEl = document.getElementById('pil-spt'), fsEl = document.getElementById('pil-fs');
  const qaResEl = document.getElementById('pil-res-qall'), spResEl = document.getElementById('pil-res-split');

  function update() {
    const D = parseFloat(dEl.value), L = parseFloat(lEl.value);
    const N_spt = parseFloat(sptEl.value), FS = parseFloat(fsEl.value);

    if (isNaN(D) || isNaN(L) || isNaN(N_spt) || isNaN(FS) || D <= 0 || L <= 0 || N_spt <= 0 || FS < 1.0) return;

    // Cross-sectional base area A_p = pi * D^2 / 4  [m^2]
    const A_p = (Math.PI * Math.pow(D, 2)) / 4.0;
    // Shaft surface perimeter area A_s = pi * D * L  [m^2]
    const A_s = Math.PI * D * L;

    // Meyerhof empirical SPT correlations for driven piles in sand:
    // Ultimate unit tip resistance q_p = 400 * N_spt * (L/D) <= 4000 * N_spt  [kPa]
    const q_p_kpa = Math.min(4000.0 * N_spt, 400.0 * N_spt * (L / D));
    const Q_b_kN = q_p_kpa * A_p;

    // Average unit skin friction f_s = 2 * N_spt  [kPa] (for driven displacement piles)
    const f_s_kpa = 2.0 * N_spt;
    const Q_s_kN = f_s_kpa * A_s;

    // Total ultimate capacity Q_u = Q_b + Q_s  [kN]
    const Q_u_kN = Q_b_kN + Q_s_kN;

    // Allowable load Q_all = Q_u / FS  [kN]
    const Q_all_kN = Q_u_kN / FS;
    const Q_all_tonnes = Q_all_kN / 9.80665;

    qaResEl.textContent = 'Q_all = ' + Math.round(Q_all_kN).toLocaleString() + ' kN (' + Q_all_tonnes.toFixed(1) + ' Tonnes Working Load)';
    spResEl.textContent = 'Ultimate Q_u = ' + Math.round(Q_u_kN).toLocaleString() + ' kN (Base Q_b: ' + Math.round(Q_b_kN) + ' kN [' + ((Q_b_kN/Q_u_kN)*100).toFixed(0) + '%], Shaft Q_s: ' + Math.round(Q_s_kN) + ' kN [' + ((Q_s_kN/Q_u_kN)*100).toFixed(0) + '%] @ FS = ' + FS + ')';
  }

  [dEl, lEl, sptEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();