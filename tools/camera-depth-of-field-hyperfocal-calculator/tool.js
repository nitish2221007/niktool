(() => {
  'use strict';
  const fEl = document.getElementById('dof-fstop'), flEl = document.getElementById('dof-fl'), dEl = document.getElementById('dof-dist');
  const totEl = document.getElementById('dof-res-tot'), nEl = document.getElementById('dof-res-near'), farEl = document.getElementById('dof-res-far');

  const coc = 0.030; // Circle of confusion for Full Frame 35mm in mm

  function update() {
    const N = parseFloat(fEl.value), flMm = parseFloat(flEl.value), distM = parseFloat(dEl.value);
    if (isNaN(N) || isNaN(flMm) || isNaN(distM) || flMm <= 0 || distM <= 0) return;

    const distMm = distM * 1000;
    // Hyperfocal distance H = (f^2 / (N * coc)) + f (in mm)
    const H = (Math.pow(flMm, 2) / (N * coc)) + flMm;

    // Near limit Dn = (H * distMm) / (H + (distMm - flMm))
    const dn = (H * distMm) / (H + (distMm - flMm));
    // Far limit Df = (H * distMm) / (H - (distMm - flMm))
    const df = (distMm >= (H + flMm)) ? Infinity : (H * distMm) / (H - (distMm - flMm));

    const dofMm = df === Infinity ? Infinity : df - dn;
    const dnM = dn / 1000;
    const dfM = df === Infinity ? 'Infinity' : (df / 1000).toFixed(2) + ' m';

    totEl.textContent = dofMm === Infinity ? 'Infinite' : (dofMm >= 1000 ? (dofMm / 1000).toFixed(2) + ' meters' : (dofMm / 10).toFixed(1) + ' cm');
    nEl.textContent = dnM.toFixed(2) + ' m';
    farEl.textContent = dfM;
  }

  [fEl, flEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();