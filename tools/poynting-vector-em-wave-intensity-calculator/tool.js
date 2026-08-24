(() => {
  'use strict';
  const eEl = document.getElementById('pv-e');
  const sResEl = document.getElementById('pv-res-s'), bResEl = document.getElementById('pv-res-b');

  const cSpeed = 299792458; // m / s
  const mu0 = 4 * Math.PI * 1e-7;

  function update() {
    const E0 = parseFloat(eEl.value);
    if (isNaN(E0) || E0 <= 0) return;

    // Time-average Poynting flux <S> = (E0^2) / (2 * mu0 * c)
    const S = (Math.pow(E0, 2)) / (2 * mu0 * cSpeed);
    // B0 = E0 / c
    const B0 = E0 / cSpeed;
    const bMicroT = B0 * 1e6;

    sResEl.textContent = S >= 1000 ? (S / 1000).toFixed(2) + ' kW / m²' : S.toFixed(1) + ' W / m²';
    bResEl.textContent = bMicroT.toFixed(2) + ' μT (' + B0.toExponential(2) + ' Tesla)';
  }

  eEl.addEventListener('input', update);
  update();
})();