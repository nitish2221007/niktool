(() => {
  'use strict';
  const sEl = document.getElementById('sch-sigma'), pEl = document.getElementById('sch-phi'), lEl = document.getElementById('sch-lam');
  const tResEl = document.getElementById('sch-res-tau'), mResEl = document.getElementById('sch-res-m');

  function update() {
    const sigma = parseFloat(sEl.value), phiDeg = parseFloat(pEl.value), lamDeg = parseFloat(lEl.value);
    if (isNaN(sigma) || isNaN(phiDeg) || isNaN(lamDeg) || sigma <= 0 || phiDeg < 0 || phiDeg > 90 || lamDeg < 0 || lamDeg > 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const lamRad = (lamDeg * Math.PI) / 180;

    // Schmid factor m = cos(phi) * cos(lambda)
    const m = Math.cos(phiRad) * Math.cos(lamRad);

    // Resolved shear stress tau = sigma * m
    const tau = sigma * m;

    tResEl.textContent = 'τ = ' + tau.toFixed(2) + ' MPa Resolved Shear';
    mResEl.textContent = 'Schmid Factor m = ' + m.toFixed(3) + ' (cos ' + phiDeg + '° · cos ' + lamDeg + '°' + (m >= 0.499 ? ' - Maximum Easy Slip Orientation' : '') + ')';
  }

  [sEl, pEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();