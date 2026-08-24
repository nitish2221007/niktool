(() => {
  'use strict';
  const tEl = document.getElementById('clp-t'), dEl = document.getElementById('clp-d'), eEl = document.getElementById('clp-e');
  const pResEl = document.getElementById('clp-res-pcr'), dResEl = document.getElementById('clp-res-depth');

  const nu = 0.30; // Poisson ratio of steel

  function update() {
    const t = parseFloat(tEl.value), D = parseFloat(dEl.value), E = parseFloat(eEl.value);
    if (isNaN(t) || isNaN(D) || isNaN(E) || t <= 0 || D <= 0 || E <= 0 || t >= D) return;

    // Elastic collapse: P_cr = (2 * E / (1 - nu^2)) * (t / D)^3  [psi]
    const pcr = (2 * E / (1 - Math.pow(nu, 2))) * Math.pow(t / D, 3);
    const pcrBar = pcr * 0.0689476;
    // Seawater hydrostatic gradient ≈ 0.445 psi / ft
    const maxDepthFt = pcr / 0.4455;

    pResEl.textContent = Math.round(pcr).toLocaleString() + ' psi (' + pcrBar.toFixed(1) + ' bar)';
    dResEl.textContent = '~' + Math.round(maxDepthFt).toLocaleString() + ' ft (' + Math.round(maxDepthFt * 0.3048).toLocaleString() + ' m Seawater Depth)';
  }

  [tEl, dEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();