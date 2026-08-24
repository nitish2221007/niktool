(() => {
  'use strict';
  const lEl = document.getElementById('aom-lam'), fEl = document.getElementById('aom-f'), vEl = document.getElementById('aom-v');
  const thResEl = document.getElementById('aom-res-thb'), spResEl = document.getElementById('aom-res-sep');

  function update() {
    const lamNm = parseFloat(lEl.value), fMhz = parseFloat(fEl.value), vMs = parseFloat(vEl.value);
    if (isNaN(lamNm) || isNaN(fMhz) || isNaN(vMs) || lamNm <= 0 || fMhz <= 0 || vMs <= 0) return;

    const lamM = lamNm * 1e-9;
    const fHz = fMhz * 1e6;

    // Acoustic wavelength Lambda = v / f (microns)
    const bigLamM = vMs / fHz;
    const bigLamUm = bigLamM * 1e6;

    // Bragg angle theta_B = (lambda * f) / (2 * v)  [radians]
    const thetaBRad = (lamM * fHz) / (2 * vMs);
    const thetaBMrad = thetaBRad * 1000;
    const thetaBDeg = (thetaBRad * 180) / Math.PI;
    const totalDeflectMrad = thetaBMrad * 2;

    thResEl.textContent = thetaBMrad.toFixed(2) + ' mrad (' + thetaBDeg.toFixed(3) + '°)';
    spResEl.textContent = '2θ_B = ' + totalDeflectMrad.toFixed(2) + ' mrad Deflection (Acoustic Pitch Λ = ' + bigLamUm.toFixed(1) + ' μm)';
  }

  [lEl, fEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();