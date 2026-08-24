(() => {
  'use strict';
  const wEl = document.getElementById('ppi-w'), hEl = document.getElementById('ppi-h'), dEl = document.getElementById('ppi-diag');
  const ppiResEl = document.getElementById('ppi-res-val'), pitchEl = document.getElementById('ppi-res-pitch'), mpEl = document.getElementById('ppi-res-mp');

  function update() {
    const w = parseFloat(wEl.value), h = parseFloat(hEl.value), diag = parseFloat(dEl.value);
    if (isNaN(w) || isNaN(h) || isNaN(diag) || w <= 0 || h <= 0 || diag <= 0) return;

    // PPI = sqrt(w^2 + h^2) / diag
    const diagPixels = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
    const ppi = diagPixels / diag;
    const dotPitchMm = (25.4 / ppi); // 1 inch = 25.4 mm
    const totalMp = (w * h) / 1e6;

    ppiResEl.textContent = ppi.toFixed(2) + ' PPI';
    pitchEl.textContent = dotPitchMm.toFixed(4) + ' mm';
    mpEl.textContent = totalMp.toFixed(2) + ' Megapixels';
  }

  [wEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();