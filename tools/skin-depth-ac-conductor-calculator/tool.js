(() => {
  'use strict';
  const fEl = document.getElementById('sd-freq'), uEl = document.getElementById('sd-unit');
  const dEl = document.getElementById('sd-res-delta'), mEl = document.getElementById('sd-res-mil');

  const rhoCopper = 1.68e-8; // Copper resistivity (Ohm*m)
  const mu0 = 4 * Math.PI * 1e-7; // Vacuum permeability

  function update() {
    const rawF = parseFloat(fEl.value), mult = parseFloat(uEl.value);
    if (isNaN(rawF) || rawF <= 0) return;

    const fHz = rawF * mult;
    // delta = sqrt(rho / (pi * f * mu))
    const deltaM = Math.sqrt(rhoCopper / (Math.PI * fHz * mu0));
    const deltaUm = deltaM * 1e6;
    const deltaMils = deltaM * 39370.1;

    dEl.textContent = deltaUm >= 1000 ? (deltaUm / 1000).toFixed(2) + ' mm' : deltaUm.toFixed(2) + ' μm';
    mEl.textContent = deltaMils.toFixed(2) + ' mils';
  }

  fEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();