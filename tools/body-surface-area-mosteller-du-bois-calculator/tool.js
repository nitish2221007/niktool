(() => {
  'use strict';
  const htEl = document.getElementById('bsa-ht'), wtEl = document.getElementById('bsa-wt');
  const mResEl = document.getElementById('bsa-res-most'), dResEl = document.getElementById('bsa-res-dubois');

  function update() {
    const H = parseFloat(htEl.value), W = parseFloat(wtEl.value);
    if (isNaN(H) || isNaN(W) || H <= 0 || W <= 0) return;

    // Mosteller formula: BSA = sqrt( (H * W) / 3600 )  [m^2]
    const bsaMosteller = Math.sqrt((H * W) / 3600);
    // Du Bois formula: BSA = 0.007184 * (H^0.725) * (W^0.425)  [m^2]
    const bsaDuBois = 0.007184 * Math.pow(H, 0.725) * Math.pow(W, 0.425);
    // Haycock formula: BSA = 0.024265 * (H^0.3964) * (W^0.5378)  [m^2]
    const bsaHaycock = 0.024265 * Math.pow(H, 0.3964) * Math.pow(W, 0.5378);

    mResEl.textContent = bsaMosteller.toFixed(2) + ' m² (Mosteller BSA)';
    dResEl.textContent = bsaDuBois.toFixed(2) + ' m² (Du Bois) | ' + bsaHaycock.toFixed(2) + ' m² (Haycock)';
  }

  htEl.addEventListener('input', update);
  wtEl.addEventListener('input', update);
  update();
})();