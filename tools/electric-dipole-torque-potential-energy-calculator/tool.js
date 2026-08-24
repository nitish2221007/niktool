(() => {
  'use strict';
  const pEl = document.getElementById('edp-p'), eEl = document.getElementById('edp-e'), thEl = document.getElementById('edp-theta');
  const tResEl = document.getElementById('edp-res-torque'), uResEl = document.getElementById('edp-res-u');

  const debyeToCm = 3.33564e-30; // C*m per Debye

  function update() {
    const pDeb = parseFloat(pEl.value), E = parseFloat(eEl.value), deg = parseFloat(thEl.value);
    if (isNaN(pDeb) || isNaN(E) || isNaN(deg) || pDeb <= 0 || E <= 0) return;

    const pCm = pDeb * debyeToCm;
    const rad = (deg * Math.PI) / 180;

    // tau = p * E * sin(theta)
    const tau = pCm * E * Math.sin(rad);
    // U = -p * E * cos(theta)
    const U = -pCm * E * Math.cos(rad);

    tResEl.textContent = tau.toExponential(2) + ' N·m';
    uResEl.textContent = U.toExponential(2) + ' Joules (' + (deg === 0 ? 'Stable Minimum' : (deg === 180 ? 'Unstable Max' : 'Intermediate')) + ')';
  }

  [pEl, eEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();