(() => {
  'use strict';
  const gEl = document.getElementById('cap-gamma'), thEl = document.getElementById('cap-theta');
  const rEl = document.getElementById('cap-radius'), rhoEl = document.getElementById('cap-rho');
  const hResEl = document.getElementById('cap-res-h'), lpResEl = document.getElementById('cap-res-laplace');

  const g = 9.80665;

  function update() {
    const gamma = parseFloat(gEl.value), deg = parseFloat(thEl.value);
    const rMm = parseFloat(rEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(gamma) || isNaN(deg) || isNaN(rMm) || isNaN(rho) || gamma <= 0 || deg < 0 || deg >= 90 || rMm <= 0 || rho <= 0) return;

    const rM = rMm / 1000;
    const rad = (deg * Math.PI) / 180;

    // Jurin's Law: h = (2 * gamma * cos(theta)) / (rho * g * r)
    const hM = (2 * gamma * Math.cos(rad)) / (rho * g * rM);
    const hMm = hM * 1000;
    const hCm = hM * 100;
    const laplacePa = (2 * gamma * Math.cos(rad)) / rM;

    hResEl.textContent = hMm.toFixed(2) + ' mm (' + hCm.toFixed(2) + ' cm)';
    lpResEl.textContent = laplacePa.toFixed(1) + ' Pa';
  }

  [gEl, thEl, rEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();