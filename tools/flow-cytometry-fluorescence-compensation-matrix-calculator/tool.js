(() => {
  'use strict';
  const fitcEl = document.getElementById('fc-fitc'), peEl = document.getElementById('fc-pe'), spEl = document.getElementById('fc-spill');
  const cpResEl = document.getElementById('fc-res-comp'), sbResEl = document.getElementById('fc-res-sub');

  function update() {
    const FITC = parseFloat(fitcEl.value), raw_PE = parseFloat(peEl.value), spill_pct = parseFloat(spEl.value);
    if (isNaN(FITC) || isNaN(raw_PE) || isNaN(spill_pct) || FITC < 0 || raw_PE < 0 || spill_pct < 0) return;

    // Spillover MFI = ( spill_pct / 100 ) * FITC
    const spill_MFI = (spill_pct / 100.0) * FITC;

    // Compensated PE = raw_PE - spill_MFI
    const comp_PE = raw_PE - spill_MFI;
    const artifact_pct = raw_PE > 0 ? (spill_MFI / raw_PE) * 100.0 : 0;

    cpResEl.textContent = 'Compensated PE = ' + Math.round(comp_PE).toLocaleString() + ' MFI';
    sbResEl.textContent = 'Subtracted FITC Bleedthrough = ' + Math.round(spill_MFI).toLocaleString() + ' MFI (' + artifact_pct.toFixed(1) + '% of raw PE was spillover @ ' + spill_pct + '% overlap)';
  }

  [fitcEl, peEl, spEl].forEach(el => el.addEventListener('input', update));
  update();
})();