(() => {
  'use strict';
  const rlEl = document.getElementById('sm-rl'), xlEl = document.getElementById('sm-xl'), z0El = document.getElementById('sm-z0');
  const vsResEl = document.getElementById('sm-res-vswr'), gmResEl = document.getElementById('sm-res-gamma');

  function update() {
    const RL = parseFloat(rlEl.value), XL = parseFloat(xlEl.value), Z0 = parseFloat(z0El.value);
    if (isNaN(RL) || isNaN(XL) || isNaN(Z0) || RL < 0 || Z0 <= 0) return;

    // Complex load ZL = RL + j*XL
    // Reflection coefficient Gamma = (ZL - Z0) / (ZL + Z0)
    // Numerator = (RL - Z0) + j*XL
    // Denominator = (RL + Z0) + j*XL
    const numReal = RL - Z0;
    const numImag = XL;
    const denReal = RL + Z0;
    const denImag = XL;

    const denMagSq = Math.pow(denReal, 2) + Math.pow(denImag, 2);
    const gammaReal = ((numReal * denReal) + (numImag * denImag)) / denMagSq;
    const gammaImag = ((numImag * denReal) - (numReal * denImag)) / denMagSq;

    const gammaMag = Math.sqrt(Math.pow(gammaReal, 2) + Math.pow(gammaImag, 2));
    const gammaPhaseRad = Math.atan2(gammaImag, gammaReal);
    const gammaPhaseDeg = (gammaPhaseRad * 180) / Math.PI;

    // Return Loss RL in dB = -20 * log10(|Gamma|)
    const returnLossDb = gammaMag > 0 ? -20 * Math.log10(gammaMag) : 99.9;

    // VSWR = (1 + |Gamma|) / (1 - |Gamma|)
    const vswr = gammaMag < 1.0 ? (1.0 + gammaMag) / (1.0 - gammaMag) : 99.9;

    // Power reflected fraction = |Gamma|^2
    const pReflPct = Math.pow(gammaMag, 2) * 100;
    const pTransPct = 100 - pReflPct;

    vsResEl.textContent = 'VSWR = ' + (vswr > 50 ? '∞' : vswr.toFixed(2)) + ' : 1 (Return Loss: ' + returnLossDb.toFixed(1) + ' dB)';
    gmResEl.textContent = '|Γ| = ' + gammaMag.toFixed(3) + ' ∠ ' + gammaPhaseDeg.toFixed(1) + '° (' + pTransPct.toFixed(1) + '% Power Delivered | ' + pReflPct.toFixed(1) + '% Reflected)';
  }

  [rlEl, xlEl, z0El].forEach(el => el.addEventListener('input', update));
  update();
})();