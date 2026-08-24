(() => {
  'use strict';
  const neEl = document.getElementById('deb-ne'), teEl = document.getElementById('deb-te');
  const lamResEl = document.getElementById('deb-res-lam'), ndResEl = document.getElementById('deb-res-nd');

  function update() {
    const ne = parseFloat(neEl.value), teEv = parseFloat(teEl.value);
    if (isNaN(ne) || isNaN(teEv) || ne <= 0 || teEv <= 0) return;

    const lamDM = 7434.3 * Math.sqrt(teEv / ne);
    const lamDUm = lamDM * 1e6;
    const ND = (4 / 3) * Math.PI * ne * Math.pow(lamDM, 3);

    if (lamDUm >= 1000) {
      lamResEl.textContent = (lamDUm / 1000).toFixed(2) + ' mm (Debye Length)';
    } else {
      lamResEl.textContent = lamDUm.toFixed(1) + ' μm (Debye Length)';
    }

    ndResEl.textContent = 'N_D = ' + ND.toExponential(2) + ' particles (Quasineutral Plasma Criterion Met: N_D >> 1)';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();