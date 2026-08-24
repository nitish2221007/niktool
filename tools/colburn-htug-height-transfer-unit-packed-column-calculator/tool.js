(() => {
  'use strict';
  const htuEl = document.getElementById('ntu-htu'), yinEl = document.getElementById('ntu-yin');
  const youtEl = document.getElementById('ntu-yout'), aEl = document.getElementById('ntu-a');
  const zResEl = document.getElementById('ntu-res-z'), ntuResEl = document.getElementById('ntu-res-ntu');

  function update() {
    const HTU = parseFloat(htuEl.value), yin = parseFloat(yinEl.value);
    const yout = parseFloat(youtEl.value), A = parseFloat(aEl.value);

    if (isNaN(HTU) || isNaN(yin) || isNaN(yout) || isNaN(A) || HTU <= 0 || yin <= yout || yout <= 0 || A <= 0) return;

    // Colburn equation for NTU_OG with clean solvent (x_in = 0):
    // NTU_OG = ( A / (A - 1) ) * ln( (1 - 1/A)*(yin / yout) + 1/A )
    let NTU = 0;
    if (Math.abs(A - 1.0) < 0.01) {
      NTU = (yin - yout) / yout;
    } else {
      const term = ((1.0 - (1.0 / A)) * (yin / yout)) + (1.0 / A);
      if (term > 0) {
        NTU = (A / (A - 1.0)) * Math.log(term);
      } else {
        zResEl.textContent = 'Invalid Parameter (A < 1)';
        return;
      }
    }

    // Total bed height Z = HTU * NTU  [meters]
    const Z_m = HTU * NTU;
    const Z_ft = Z_m * 3.28084;

    zResEl.textContent = 'Z = ' + Z_m.toFixed(2) + ' m (' + Z_ft.toFixed(1) + ' ft Packed Height)';
    ntuResEl.textContent = 'NTU_OG = ' + NTU.toFixed(2) + ' Transfer Units (HTU = ' + HTU + ' m | ' + ((yin-yout)/yin*100).toFixed(1) + '% Scrubbed @ A = ' + A.toFixed(2) + ')';
  }

  [htuEl, yinEl, youtEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();