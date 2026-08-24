(() => {
  'use strict';
  const sEl = document.getElementById('mc-sig'), cEl = document.getElementById('mc-c'), pEl = document.getElementById('mc-phi');
  const tResEl = document.getElementById('mc-res-tau'), fResEl = document.getElementById('mc-res-fail');

  function update() {
    const sigma = parseFloat(sEl.value), c = parseFloat(cEl.value), phiDeg = parseFloat(pEl.value);
    if (isNaN(sigma) || isNaN(c) || isNaN(phiDeg) || sigma < 0 || c < 0 || phiDeg < 0 || phiDeg > 45) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const tau = c + (sigma * Math.tan(phiRad));
    const thetaF = 45 + (phiDeg / 2);
    const tauFric = sigma * Math.tan(phiRad);

    tResEl.textContent = tau.toFixed(1) + ' kPa (Shear Strength τ_f)';
    fResEl.textContent = 'Rupture Plane θ_f = ' + thetaF.toFixed(1) + '° (Cohesive: ' + c.toFixed(1) + ' kPa, Frictional: ' + tauFric.toFixed(1) + ' kPa)';
  }

  [sEl, cEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();