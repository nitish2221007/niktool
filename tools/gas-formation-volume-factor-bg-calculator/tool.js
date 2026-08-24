(() => {
  'use strict';
  const pEl = document.getElementById('bg-p'), tEl = document.getElementById('bg-t'), zEl = document.getElementById('bg-z');
  const bgResEl = document.getElementById('bg-res-bg'), egResEl = document.getElementById('bg-res-eg');

  function update() {
    const P_psia = parseFloat(pEl.value), T_F = parseFloat(tEl.value), Z = parseFloat(zEl.value);
    if (isNaN(P_psia) || isNaN(T_F) || isNaN(Z) || P_psia <= 0 || Z <= 0) return;

    const T_R = T_F + 459.67; // Rankine absolute temp

    // B_g = 0.02827 * (Z * T_R) / P_psia  [reservoir cu ft / standard cu ft]
    const Bg = 0.02827 * (Z * T_R) / P_psia;
    const Eg = 1 / Bg; // Expansion factor

    bgResEl.textContent = Bg.toFixed(5) + ' res cu ft / scf (' + (Bg * 0.1781).toFixed(5) + ' res bbl/scf)';
    egResEl.textContent = Eg.toFixed(1) + ' scf / res cu ft (' + (Eg * 5.615).toFixed(0) + ' scf / res bbl)';
  }

  [pEl, tEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();