(() => {
  'use strict';
  const cntEl = document.getElementById('cfu-cnt'), volEl = document.getElementById('cfu-vol'), dilEl = document.getElementById('cfu-dil');
  const ttResEl = document.getElementById('cfu-res-titer'), stResEl = document.getElementById('cfu-res-stat');

  function update() {
    const colonies = parseFloat(cntEl.value), vol_mL = parseFloat(volEl.value), DF = parseFloat(dilEl.value);
    if (isNaN(colonies) || isNaN(vol_mL) || isNaN(DF) || colonies <= 0 || vol_mL <= 0 || DF <= 0) return;

    // CFU / mL = ( colonies * DF ) / vol_mL
    const cfu_mL = (colonies * DF) / vol_mL;

    let validStatus = '', color = '#22543d';
    if (colonies >= 30 && colonies <= 300) {
      validStatus = 'STATISTICALLY VALID (30 - 300 Colonies: Optimal accuracy)';
      color = '#22543d';
    } else if (colonies < 30) {
      validStatus = 'TOO FEW TO COUNT (TFTC: < 30 Colonies - High Poisson statistical variance)';
      color = '#ea580c';
    } else {
      validStatus = 'TOO NUMEROUS TO COUNT (TNTC: > 300 Colonies - Colony crowding / overlap error)';
      color = '#c53030';
    }

    ttResEl.textContent = 'Titer = ' + cfu_mL.toExponential(2) + ' CFU / mL';
    stResEl.textContent = validStatus + ' [' + colonies + ' colonies in ' + vol_mL + ' mL @ 10^' + Math.round(Math.log10(DF)) + ' dilution]';
    stResEl.style.color = color;
  }

  [cntEl, volEl, dilEl].forEach(el => el.addEventListener('input', update));
  update();
})();