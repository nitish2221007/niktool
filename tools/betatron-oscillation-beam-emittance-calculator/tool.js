(() => {
  'use strict';
  const eEl = document.getElementById('bet-eps'), bEl = document.getElementById('bet-bx'), egEl = document.getElementById('bet-eg');
  const sResEl = document.getElementById('bet-res-sig'), nResEl = document.getElementById('bet-res-norm');

  function update() {
    const epsNm = parseFloat(eEl.value), bxM = parseFloat(bEl.value), egGev = parseFloat(egEl.value);
    if (isNaN(epsNm) || isNaN(bxM) || isNaN(egGev) || epsNm <= 0 || bxM <= 0 || egGev <= 0) return;

    const epsM = epsNm * 1e-9;
    const sigmaM = Math.sqrt(epsM * bxM);
    const sigmaUm = sigmaM * 1e6;
    const gamma = (egGev * 1e9) / 511000;
    const epsNormMm = (gamma * epsM) * 1e6;
    const lamBetaM = 2 * Math.PI * bxM;

    sResEl.textContent = sigmaUm.toFixed(1) + ' μm (RMS Beam Spot Radius)';
    nResEl.textContent = 'ε_n = ' + epsNormMm.toFixed(2) + ' mm·mrad (Betatron λ_β = ' + Math.round(lamBetaM) + ' m)';
  }

  [eEl, bEl, egEl].forEach(el => el.addEventListener('input', update));
  update();
})();