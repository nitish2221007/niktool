(() => {
  'use strict';
  const muEl = document.getElementById('mdp-mu'), bEl = document.getElementById('mdp-b'), thEl = document.getElementById('mdp-theta');
  const tResEl = document.getElementById('mdp-res-torque'), uResEl = document.getElementById('mdp-res-u');

  function update() {
    const mu = parseFloat(muEl.value), B = parseFloat(bEl.value), deg = parseFloat(thEl.value);
    if (isNaN(mu) || isNaN(B) || isNaN(deg) || mu <= 0 || B <= 0) return;

    const rad = (deg * Math.PI) / 180;
    // tau = mu * B * sin(theta)
    const tau = mu * B * Math.sin(rad);
    // U = -mu * B * cos(theta)
    const U = -mu * B * Math.cos(rad);

    tResEl.textContent = tau.toFixed(3) + ' N·m';
    uResEl.textContent = U.toFixed(3) + ' Joules';
  }

  [muEl, bEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();