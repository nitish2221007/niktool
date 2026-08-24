(() => {
  'use strict';
  const dcEl = document.getElementById('hc-dc'), dpEl = document.getElementById('hc-dp'), cvEl = document.getElementById('hc-cv');
  const d50ResEl = document.getElementById('hc-res-d50'), mshResEl = document.getElementById('hc-res-mesh');

  function update() {
    const Dc = parseFloat(dcEl.value), dP = parseFloat(dpEl.value), Cv = parseFloat(cvEl.value);
    if (isNaN(Dc) || isNaN(dP) || isNaN(Cv) || Dc <= 0 || dP <= 0 || Cv <= 0) return;

    // Empirical Lynch-Rao hydrocyclone base d50 model:
    // d50 (microns) ≈ 2.8 * (Dc^0.65) * exp(0.063 * Cv) / (dP^0.28)
    const d50 = (2.8 * Math.pow(Dc, 0.65) * Math.exp(0.063 * Cv)) / Math.pow(dP, 0.28);

    let meshName = '';
    if (d50 > 150) meshName = '~100 Mesh (Coarse)';
    else if (d50 > 105) meshName = '~140 Mesh';
    else if (d50 > 74) meshName = '~200 Mesh Standard Flotation';
    else if (d50 > 53) meshName = '~270 Mesh Fine';
    else if (d50 > 44) meshName = '~325 Mesh Very Fine';
    else meshName = '~400+ Mesh Ultrafine';

    d50ResEl.textContent = d50.toFixed(1) + ' μm';
    mshResEl.textContent = meshName;
  }

  [dcEl, dpEl, cvEl].forEach(el => el.addEventListener('input', update));
  update();
})();