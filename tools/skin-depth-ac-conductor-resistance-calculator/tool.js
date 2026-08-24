(() => {
  'use strict';
  const fEl = document.getElementById('skn-freq'), dEl = document.getElementById('skn-dia'), matEl = document.getElementById('skn-mat');
  const dlResEl = document.getElementById('skn-res-delta'), racResEl = document.getElementById('skn-res-rac');

  const mu0 = 4.0 * Math.PI * 1e-7; // H / m (vacuum permeability)

  const METALS = {
    'copper':   { rho: 1.68e-8, name: 'Copper' },
    'aluminum': { rho: 2.65e-8, name: 'Aluminum' },
    'gold':     { rho: 2.44e-8, name: 'Gold' },
    'silver':   { rho: 1.59e-8, name: 'Silver' }
  };

  function update() {
    const fKhz = parseFloat(fEl.value), diaMm = parseFloat(dEl.value);
    const m = METALS[matEl.value];

    if (isNaN(fKhz) || isNaN(diaMm) || fKhz <= 0 || diaMm <= 0) return;

    const fHz = fKhz * 1000;
    const rM = (diaMm / 2) * 1e-3;

    // Skin depth delta = sqrt( rho / (pi * f * mu0) )  [meters]
    const deltaM = Math.sqrt(m.rho / (Math.PI * fHz * mu0));
    const deltaUm = deltaM * 1e6;
    const deltaMm = deltaM * 1000;

    // AC to DC resistance ratio for cylindrical wire:
    // When r >> delta: R_AC / R_DC approx = r / (2 * delta) + 0.25
    let racRatio = 1.0;
    const x = rM / deltaM;
    if (x <= 1.0) {
      racRatio = 1.0 + (Math.pow(x, 4) / 48); // low-frequency expansion
    } else {
      racRatio = (x / 2) + 0.26;
    }

    let deltaStr = '';
    if (deltaUm < 1000) deltaStr = deltaUm.toFixed(1) + ' μm (' + deltaMm.toFixed(4) + ' mm)';
    else deltaStr = deltaMm.toFixed(3) + ' mm (' + Math.round(deltaUm) + ' μm)';

    dlResEl.textContent = 'δ = ' + deltaStr;
    racResEl.textContent = 'R_AC / R_DC = ' + racRatio.toFixed(2) + '× (' + m.name + ' Wire D = ' + diaMm + ' mm @ ' + fKhz + ' kHz, +' + ((racRatio-1)*100).toFixed(1) + '% High-Freq Loss)';
  }

  [fEl, dEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();