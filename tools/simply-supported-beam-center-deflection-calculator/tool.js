(() => {
  'use strict';
  const wEl = document.getElementById('ssb-w'), lEl = document.getElementById('ssb-l');
  const eEl = document.getElementById('ssb-e'), iEl = document.getElementById('ssb-i');
  const dResEl = document.getElementById('ssb-res-def'), mResEl = document.getElementById('ssb-res-m'), rResEl = document.getElementById('ssb-res-ratio');

  function update() {
    const wKnm = parseFloat(wEl.value), lM = parseFloat(lEl.value);
    const eGpa = parseFloat(eEl.value), iCm4 = parseFloat(iEl.value);

    if (isNaN(wKnm) || isNaN(lM) || isNaN(eGpa) || isNaN(iCm4) || wKnm <= 0 || lM <= 0 || eGpa <= 0 || iCm4 <= 0) return;

    const wNm = wKnm * 1000;
    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8;

    // delta_max = (5 * w * L^4) / (384 * E * I)  [meters]
    const defM = (5 * wNm * Math.pow(lM, 4)) / (384 * ePa * iM4);
    const defMm = defM * 1000;

    // M_max = (w * L^2) / 8
    const mMax = (wKnm * Math.pow(lM, 2)) / 8;
    const spanRatio = Math.round((lM * 1000) / defMm);

    dResEl.textContent = defMm.toFixed(2) + ' mm';
    mResEl.textContent = mMax.toFixed(2) + ' kN·m at Midspan';
    rResEl.textContent = 'L / ' + spanRatio + (spanRatio >= 360 ? ' (Passes L/360 Code)' : ' (Exceeds L/360 Standard)');
  }

  [wEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();