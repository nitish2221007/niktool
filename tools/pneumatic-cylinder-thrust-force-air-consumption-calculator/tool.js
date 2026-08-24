(() => {
  'use strict';
  const bEl = document.getElementById('pnu-bore'), rEl = document.getElementById('pnu-rod');
  const pEl = document.getElementById('pnu-p'), sEl = document.getElementById('pnu-strk'), cEl = document.getElementById('pnu-cpm');
  const fResEl = document.getElementById('pnu-res-force'), aResEl = document.getElementById('pnu-res-air');

  function update() {
    const boreMm = parseFloat(bEl.value), rodMm = parseFloat(rEl.value);
    const pBar = parseFloat(pEl.value), strokeMm = parseFloat(sEl.value), cpm = parseFloat(cEl.value);

    if (isNaN(boreMm) || isNaN(rodMm) || isNaN(pBar) || isNaN(strokeMm) || isNaN(cpm) || boreMm <= 0 || pBar <= 0 || strokeMm <= 0 || cpm <= 0) return;

    const pPa = pBar * 1e5; // bar to Pa (N/m^2)
    const boreM = boreMm / 1000;
    const rodM = rodMm / 1000;

    // Full piston area (extension): A_ext = pi * (D/2)^2
    const A_ext = Math.PI * Math.pow(boreM / 2, 2);
    // Annular piston area (retraction): A_ret = pi/4 * (D^2 - d^2)
    const A_ret = (Math.PI / 4) * (Math.pow(boreM, 2) - Math.pow(rodM, 2));

    // Force = P * A
    const F_ext_N = pPa * A_ext;
    const F_ret_N = pPa * A_ret;

    const F_ext_lbf = F_ext_N * 0.224809;
    const F_ret_lbf = F_ret_N * 0.224809;

    // Compressed air volume per double stroke (ext + ret) at atmospheric pressure
    // Compression ratio CR = (pBar + 1.013) / 1.013
    const CR = (pBar + 1.013) / 1.013;
    const strokeM = strokeMm / 1000;
    const dispM3 = (A_ext + A_ret) * strokeM;
    const freeAirLitersPerCycle = dispM3 * 1000 * CR;
    const freeAirLpm = freeAirLitersPerCycle * cpm;
    const scfm = freeAirLpm / 28.3168;

    fResEl.textContent = Math.round(F_ext_N).toLocaleString() + ' N Extension (' + Math.round(F_ext_lbf) + ' lbf Push)';
    aResEl.textContent = 'Retract: ' + Math.round(F_ret_N).toLocaleString() + ' N (' + Math.round(F_ret_lbf) + ' lbf) | Air: ' + scfm.toFixed(2) + ' SCFM (' + Math.round(freeAirLpm) + ' L/min Free Air)';
  }

  [bEl, rEl, pEl, sEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();