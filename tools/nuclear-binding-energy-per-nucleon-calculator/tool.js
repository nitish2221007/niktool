(() => {
  'use strict';
  const zEl = document.getElementById('nbe-z'), nEl = document.getElementById('nbe-n'), mEl = document.getElementById('nbe-m');
  const beaResEl = document.getElementById('nbe-res-bea'), totResEl = document.getElementById('nbe-res-tot');

  const mp = 1.007276466879;
  const mn = 1.00866491588;
  const mevPerU = 931.4940954;

  function update() {
    const Z = parseInt(zEl.value, 10), N = parseInt(nEl.value, 10), M = parseFloat(mEl.value);
    if (isNaN(Z) || isNaN(N) || isNaN(M) || Z <= 0 || N < 0 || M <= 0) return;

    const A = Z + N;
    const dm = (Z * mp) + (N * mn) - M;
    const totalBeMev = dm * mevPerU;
    const bePerNucleon = totalBeMev / A;

    beaResEl.textContent = bePerNucleon.toFixed(3) + ' MeV / Nucleon';
    totResEl.textContent = totalBeMev.toFixed(2) + ' MeV Total (Mass Defect Δm = ' + dm.toFixed(4) + ' u, A = ' + A + ')';
  }

  [zEl, nEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();