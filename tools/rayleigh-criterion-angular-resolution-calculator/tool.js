(() => {
  'use strict';
  const lEl = document.getElementById('ray-lam'), dEl = document.getElementById('ray-d');
  const aResEl = document.getElementById('ray-res-arcsec'), rResEl = document.getElementById('ray-res-rad');

  function update() {
    const lamNm = parseFloat(lEl.value), dMm = parseFloat(dEl.value);
    if (isNaN(lamNm) || isNaN(dMm) || lamNm <= 0 || dMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const dM = dMm * 1e-3;

    // Rayleigh formula: theta (radians) = 1.22 * lambda / D
    const thetaRad = 1.22 * (lamM / dM);
    const thetaArcsec = thetaRad * (180 / Math.PI) * 3600;
    const thetaUrad = thetaRad * 1e6;

    aResEl.textContent = thetaArcsec.toFixed(3) + ' Arcseconds (' + (dMm / 25.4).toFixed(1) + '" Aperture)';
    rResEl.textContent = thetaUrad.toFixed(2) + ' μrad (Resolves ' + (thetaUrad * 384400 / 1000).toFixed(2) + ' km on the Moon)';
  }

  lEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();