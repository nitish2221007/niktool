(() => {
  'use strict';
  const nEl = document.getElementById('bet-n'), tEl = document.getElementById('bet-t'), bEl = document.getElementById('bet-b');
  const pctResEl = document.getElementById('bet-res-pct'), prsResEl = document.getElementById('bet-res-press');

  const mu0 = 4 * Math.PI * 1e-7;
  const q_e = 1.602176634e-19;

  function update() {
    const n = parseFloat(nEl.value), tKev = parseFloat(tEl.value), B = parseFloat(bEl.value);
    if (isNaN(n) || isNaN(tKev) || isNaN(B) || n <= 0 || tKev <= 0 || B <= 0) return;

    const pKineticPa = 2 * n * (tKev * 1000 * q_e);
    const pMagPa = Math.pow(B, 2) / (2 * mu0);
    const beta = pKineticPa / pMagPa;
    const betaPct = beta * 100;

    const pKineticBar = pKineticPa / 1e5;
    const pMagBar = pMagPa / 1e5;

    pctResEl.textContent = 'β = ' + betaPct.toFixed(2) + '% (Ratio P_kinetic / P_magnetic)';
    prsResEl.textContent = 'Kinetic: ' + pKineticBar.toFixed(2) + ' bar | Magnetic: ' + pMagBar.toFixed(1) + ' bar (' + (betaPct <= 5.0 ? 'Within Tokamak Troyon Limit' : 'High Beta') + ')';
  }

  [nEl, tEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();