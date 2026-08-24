(() => {
  'use strict';
  const uEl = document.getElementById('dct-u'), vEl = document.getElementById('dct-v'), pixEl = document.getElementById('dct-pix');
  const cfResEl = document.getElementById('dct-res-coeff'), tyResEl = document.getElementById('dct-res-type');

  function update() {
    const u = parseInt(uEl.value, 10), v = parseInt(vEl.value, 10), meanPix = parseFloat(pixEl.value);
    if (isNaN(u) || isNaN(v) || isNaN(meanPix) || u < 0 || u > 7 || v < 0 || v > 7) return;

    const alphaU = u === 0 ? (1 / Math.SQRT2) : 1.0;
    const alphaV = v === 0 ? (1 / Math.SQRT2) : 1.0;

    let Fuv = 0;
    if (u === 0 && v === 0) {
      Fuv = 0.25 * alphaU * alphaV * 64 * meanPix;
    } else {
      Fuv = 0.0;
    }

    if (u === 0 && v === 0) {
      cfResEl.textContent = 'DC Coeff F(0,0) = ' + Fuv.toFixed(1);
      tyResEl.textContent = 'DC Baseline Illuminance (Carries > 90% of Total 8×8 Block Energy)';
    } else {
      cfResEl.textContent = 'AC Coeff F(' + u + ',' + v + ') = ' + Fuv.toFixed(1);
      tyResEl.textContent = 'AC Spatial Harmonic (Diagonal Frequency F_' + u + ',' + v + ' Quantized in JPEG)';
    }
  }

  [uEl, vEl, pixEl].forEach(el => el.addEventListener('input', update));
  update();
})();