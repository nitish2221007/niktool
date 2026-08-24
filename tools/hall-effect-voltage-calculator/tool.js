(() => {
  'use strict';
  const iEl = document.getElementById('hl-i'), bEl = document.getElementById('hl-b'), tEl = document.getElementById('hl-t'), nEl = document.getElementById('hl-n');
  const vhResEl = document.getElementById('hl-res-vh'), rhResEl = document.getElementById('hl-res-rh');

  const qCharge = 1.602176634e-19;

  function update() {
    const iMa = parseFloat(iEl.value), B = parseFloat(bEl.value), tUm = parseFloat(tEl.value), nVal = parseFloat(nEl.value);
    if (isNaN(iMa) || isNaN(B) || isNaN(tUm) || isNaN(nVal) || iMa <= 0 || B <= 0 || tUm <= 0 || nVal <= 0) return;

    const I = iMa * 1e-3;
    const tM = tUm * 1e-6;
    const n = nVal * 1e21; // Carrier density per m^3

    // V_H = (I * B) / (n * q * t)
    const vH = (I * B) / (n * qCharge * tM);
    const vHMv = vH * 1000;
    const rH = 1 / (n * qCharge);

    vhResEl.textContent = vHMv >= 1.0 ? vHMv.toFixed(2) + ' mV' : (vH * 1e6).toFixed(1) + ' μV';
    rhResEl.textContent = rH.toExponential(2) + ' m³ / C';
  }

  [iEl, bEl, tEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();