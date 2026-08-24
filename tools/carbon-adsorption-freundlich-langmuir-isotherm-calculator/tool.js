(() => {
  'use strict';
  const ceEl = document.getElementById('ad-ce'), kfEl = document.getElementById('ad-kf'), nEl = document.getElementById('ad-n');
  const qeResEl = document.getElementById('ad-res-qe'), curResEl = document.getElementById('ad-res-cur');

  function update() {
    const C_e = parseFloat(ceEl.value), K_F = parseFloat(kfEl.value), one_over_n = parseFloat(nEl.value);
    if (isNaN(C_e) || isNaN(K_F) || isNaN(one_over_n) || C_e <= 0 || K_F <= 0 || one_over_n <= 0) return;

    // Freundlich adsorption capacity: q_e = K_F * (C_e)^(1/n)  [mg contaminant / g carbon]
    const q_e = K_F * Math.pow(C_e, one_over_n);

    // Carbon usage rate: CUR = C_e / q_e * 1000  [g carbon / m^3 water]
    const CUR_g_m3 = (C_e / q_e) * 1000.0;

    let fav = '';
    if (one_over_n < 0.1) fav = 'IRREVERSIBLE ADSORPTION (1/n < 0.1)';
    else if (one_over_n <= 0.5) fav = 'HIGHLY FAVORABLE ADSORPTION (1/n = 0.1 - 0.5 ✓)';
    else if (one_over_n <= 1.0) fav = 'MODERATELY FAVORABLE ADSORPTION (1/n = 0.5 - 1.0)';
    else fav = 'UNFAVORABLE ADSORPTION (1/n > 1.0)';

    qeResEl.textContent = 'Capacity q_e = ' + q_e.toFixed(2) + ' mg / g Carbon';
    curResEl.textContent = fav + ' | Usage Rate CUR = ' + CUR_g_m3.toFixed(1) + ' g GAC / m³ (1 kg treats ' + (1000 / CUR_g_m3).toFixed(1) + ' m³)';
  }

  [ceEl, kfEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();