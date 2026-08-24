(() => {
  'use strict';
  const mtotEl = document.getElementById('sm-mtot'), mdryEl = document.getElementById('sm-mdry');
  const eEl = document.getElementById('sm-e'), gsEl = document.getElementById('sm-gs');
  const srResEl = document.getElementById('sm-res-sr'), wResEl = document.getElementById('sm-res-w');

  function update() {
    const M_tot = parseFloat(mtotEl.value), M_dry = parseFloat(mdryEl.value);
    const e = parseFloat(eEl.value), G_s = parseFloat(gsEl.value);

    if (isNaN(M_tot) || isNaN(M_dry) || isNaN(e) || isNaN(G_s) || M_tot < M_dry || M_dry <= 0 || e <= 0 || G_s <= 0) return;

    // Water mass Mw = M_tot - M_dry
    const M_w = M_tot - M_dry;

    // Gravimetric water content: w = (M_w / M_dry) * 100%
    const w = M_w / M_dry;
    const w_pct = w * 100.0;

    // Degree of saturation: S_r = ( w * G_s ) / e
    const S_r = (w * G_s) / e;
    const S_r_pct = Math.min(100.0, S_r * 100.0);

    // Volumetric water content: theta = S_r * n = S_r * (e / (1+e))
    const n = e / (1.0 + e);
    const theta_pct = (S_r * n) * 100.0;

    let state = '';
    if (S_r_pct >= 99.0) state = 'FULLY SATURATED (S_r = 100%: All void space filled with water)';
    else if (S_r_pct >= 80.0) state = 'VERY MOIST (80% - 99%)';
    else if (S_r_pct >= 50.0) state = 'PARTIALLY SATURATED (50% - 79%)';
    else state = 'RELATIVELY DRY (S_r < 50%)';

    srResEl.textContent = 'Saturation S_r = ' + S_r_pct.toFixed(1) + '%';
    wResEl.textContent = 'Water Content w = ' + w_pct.toFixed(1) + '% | Volumetric θ = ' + theta_pct.toFixed(2) + '% (' + state + ')';
  }

  [mtotEl, mdryEl, eEl, gsEl].forEach(el => el.addEventListener('input', update));
  update();
})();