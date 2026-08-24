(() => {
  'use strict';
  const dEl = document.getElementById('tor-d'), fEl = document.getElementById('tor-f'), kEl = document.getElementById('tor-k');
  const tResEl = document.getElementById('tor-res-t'), knResEl = document.getElementById('tor-res-kn');

  function update() {
    const dIn = parseFloat(dEl.value), fKips = parseFloat(fEl.value), K = parseFloat(kEl.value);
    if (isNaN(dIn) || isNaN(fKips) || isNaN(K) || dIn <= 0 || fKips <= 0 || K <= 0) return;

    // Force in lbs = fKips * 1000
    const fLbs = fKips * 1000;
    // Torque T (ft-lbs) = (K * F * d) / 12
    const torqueFtLbs = (K * fLbs * dIn) / 12;
    const torqueNm = torqueFtLbs * 1.35582;
    const fKn = fKips * 4.44822;

    tResEl.textContent = torqueFtLbs.toFixed(1) + ' ft·lbs (' + Math.round(torqueNm) + ' N·m)';
    knResEl.textContent = fKn.toFixed(1) + ' kN Tensile Preload (' + Math.round(fLbs).toLocaleString() + ' lbs Clamping Force)';
  }

  [dEl, fEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();