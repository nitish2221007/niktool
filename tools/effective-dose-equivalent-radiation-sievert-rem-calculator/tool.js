(() => {
  'use strict';
  const dEl = document.getElementById('rd-d'), wrEl = document.getElementById('rd-wr'), wtEl = document.getElementById('rd-wt');
  const eResEl = document.getElementById('rd-res-e'), htResEl = document.getElementById('rd-res-ht');

  function update() {
    const D_mGy = parseFloat(dEl.value), w_R = parseFloat(wrEl.value), w_T = parseFloat(wtEl.value);
    if (isNaN(D_mGy) || isNaN(w_R) || isNaN(w_T) || D_mGy < 0 || w_R <= 0 || w_T <= 0 || w_T > 1) return;

    // Equivalent dose: H_T = w_R * D  [mSv]
    const H_T_mSv = w_R * D_mGy;

    // Effective dose: E = w_T * H_T  [mSv]
    const E_mSv = w_T * H_T_mSv;
    const E_mrem = E_mSv * 100.0; // 1 mSv = 100 mrem

    const occupational_limit_mSv = 20.0; // ICRP annual occupational limit
    const pct_limit = (E_mSv / occupational_limit_mSv) * 100.0;

    eResEl.textContent = 'Effective Dose E = ' + E_mSv.toFixed(3) + ' mSv (' + E_mrem.toFixed(1) + ' mrem)';
    htResEl.textContent = 'Organ H_T = ' + H_T_mSv.toFixed(2) + ' mSv | Annual Limit = 20 mSv/yr (' + pct_limit.toFixed(1) + '% of limit @ w_R=' + w_R + ', w_T=' + w_T + ')';
  }

  [dEl, wrEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();