(() => {
  'use strict';
  const pEl = document.getElementById('cb-p'), lEl = document.getElementById('cb-l');
  const eEl = document.getElementById('cb-e'), iEl = document.getElementById('cb-i');
  const dResEl = document.getElementById('cb-res-def'), mResEl = document.getElementById('cb-res-m');

  function update() {
    const pKn = parseFloat(pEl.value), lM = parseFloat(lEl.value);
    const eGpa = parseFloat(eEl.value), iCm4 = parseFloat(iEl.value);

    if (isNaN(pKn) || isNaN(lM) || isNaN(eGpa) || isNaN(iCm4) || pKn <= 0 || lM <= 0 || eGpa <= 0 || iCm4 <= 0) return;

    const pN = pKn * 1000;
    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // delta_max = (P * L^3) / (3 * E * I)  [meters]
    const defM = (pN * Math.pow(lM, 3)) / (3 * ePa * iM4);
    const defMm = defM * 1000;

    // M_max = P * L (kN*m)
    const mMax = pKn * lM;

    dResEl.textContent = defMm >= 1000 ? defM.toFixed(2) + ' meters' : defMm.toFixed(2) + ' mm';
    mResEl.textContent = mMax.toFixed(2) + ' kN·m at Fixed Wall';
  }

  [pEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();