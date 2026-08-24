(() => {
  'use strict';
  const eEl = document.getElementById('syn-e'), rEl = document.getElementById('syn-r'), cEl = document.getElementById('syn-curr');
  const deResEl = document.getElementById('syn-res-de'), pwrResEl = document.getElementById('syn-res-pwr');

  function update() {
    const eGev = parseFloat(eEl.value), rM = parseFloat(rEl.value), currMa = parseFloat(cEl.value);
    if (isNaN(eGev) || isNaN(rM) || isNaN(currMa) || eGev <= 0 || rM <= 0 || currMa <= 0) return;

    const deltaE_keV = (88.5 * Math.pow(eGev, 4)) / rM;
    const deltaE_MeV = deltaE_keV / 1000;
    const totalPwrKw = (deltaE_keV * currMa) / 1000;
    const gamma = (eGev * 1e9) / 511000;

    deResEl.textContent = (deltaE_keV >= 1000 ? (deltaE_MeV).toFixed(2) + ' MeV' : deltaE_keV.toFixed(1) + ' keV') + ' / turn (γ = ' + Math.round(gamma).toLocaleString() + ')';
    pwrResEl.textContent = totalPwrKw.toFixed(1) + ' kW Synchrotron Light (E⁴ Scaling: ' + (Math.pow(eGev, 4)).toFixed(0) + ')';
  }

  [eEl, rEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();