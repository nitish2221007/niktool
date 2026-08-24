(() => {
  'use strict';
  const mEl = document.getElementById('mt-m'), mrEl = document.getElementById('mt-mr');
  const nResEl = document.getElementById('mt-res-n'), molcResEl = document.getElementById('mt-res-molc');

  const N_A = 6.02214e23;

  function update() {
    const mass = parseFloat(mEl.value), M_r = parseFloat(mrEl.value);
    if (isNaN(mass) || isNaN(M_r) || mass < 0 || M_r <= 0) return;

    // n = mass / M_r
    const n = mass / M_r;
    const molecules = n * N_A;

    nResEl.textContent = 'n = ' + n.toFixed(3) + ' Moles (mol)';
    molcResEl.textContent = molecules.toExponential(2) + ' Molecules / Formula Units (Mass: ' + mass + ' g / ' + M_r + ' g/mol)';
  }

  mEl.addEventListener('input', update);
  mrEl.addEventListener('input', update);
  update();
})();