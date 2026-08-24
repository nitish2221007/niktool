(() => {
  'use strict';
  const lEl = document.getElementById('spf-lam'), dbEl = document.getElementById('spf-db'), fEl = document.getElementById('spf-f');
  const pResEl = document.getElementById('spf-res-pinh'), aResEl = document.getElementById('spf-res-airy');

  function update() {
    const lamNm = parseFloat(lEl.value), dbMm = parseFloat(dbEl.value), fMm = parseFloat(fEl.value);
    if (isNaN(lamNm) || isNaN(dbMm) || isNaN(fMm) || lamNm <= 0 || dbMm <= 0 || fMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const dbM = dbMm * 1e-3;
    const fM = fMm * 1e-3;

    // Airy disk focal diameter d_airy = (1.22 * lambda * f) / (db / 2) = 2.44 * lambda * f / db  [meters]
    const dAiryM = (2.44 * lamM * fM) / dbM;
    const dAiryUm = dAiryM * 1e6;

    // Standard practical pinhole is chosen at ~1.5x Airy disk diameter to pass ~99% TEM00 power while blocking noise
    const dPinholeUm = dAiryUm * 1.5;

    // Available commercial pinhole standard sizes: 5, 10, 15, 25, 50 um
    let commPinhole = '';
    if (dPinholeUm <= 7.5) commPinhole = '5 μm Standard Pinhole';
    else if (dPinholeUm <= 12.5) commPinhole = '10 μm Standard Pinhole';
    else if (dPinholeUm <= 18) commPinhole = '15 μm Standard Pinhole';
    else if (dPinholeUm <= 35) commPinhole = '25 μm Standard Pinhole';
    else commPinhole = '50 μm Standard Pinhole';

    pResEl.textContent = dPinholeUm.toFixed(1) + ' μm (' + commPinhole + ')';
    aResEl.textContent = dAiryUm.toFixed(2) + ' μm Central Airy Spot (Passes > 99% TEM₀₀ Energy)';
  }

  [lEl, dbEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();