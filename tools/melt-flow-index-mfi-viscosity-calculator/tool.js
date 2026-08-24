(() => {
  'use strict';
  const mEl = document.getElementById('mfi-mass'), sEl = document.getElementById('mfi-sec');
  const mfrResEl = document.getElementById('mfi-res-mfr'), prcResEl = document.getElementById('mfi-res-proc');

  function update() {
    const massG = parseFloat(mEl.value), sec = parseFloat(sEl.value);
    if (isNaN(massG) || isNaN(sec) || massG <= 0 || sec <= 0) return;

    // MFR = (mass * 600) / sec  [g / 10 min]
    const mfr = (massG * 600) / sec;

    mfrResEl.textContent = mfr.toFixed(2) + ' g / 10 min (MFR)';

    if (mfr < 1.0) {
      prcResEl.textContent = 'Pipe Extrusion / Heavy Blow Molding (Fractional Melt < 1: Very High Molecular Weight)';
      prcResEl.style.color = '#22543d';
    } else if (mfr >= 1.0 && mfr <= 10.0) {
      prcResEl.textContent = 'Blown Film / General Sheet Extrusion / Blow Molding (MFR 1 to 10)';
      prcResEl.style.color = '#22543d';
    } else if (mfr > 10.0 && mfr <= 40.0) {
      prcResEl.textContent = 'Injection Molding (MFR 10 to 40: High Flow Ease)';
      prcResEl.style.color = '#2563eb';
    } else {
      prcResEl.textContent = 'High-Speed Thin-Wall Injection Molding / Meltblown Nonwovens (MFR > 40)';
      prcResEl.style.color = '#d97706';
    }
  }

  mEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();