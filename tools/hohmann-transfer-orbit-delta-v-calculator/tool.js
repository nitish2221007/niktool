(() => {
  'use strict';
  const r1El = document.getElementById('hoh-r1'), r2El = document.getElementById('hoh-r2');
  const totResEl = document.getElementById('hoh-res-tot'), timResEl = document.getElementById('hoh-res-time');

  const mu_earth = 398600.4418;

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0 || r1 === r2) return;

    const aTx = (r1 + r2) / 2;
    const v1 = Math.sqrt(mu_earth / r1);
    const v2 = Math.sqrt(mu_earth / r2);

    const vTx1 = Math.sqrt(mu_earth * ((2 / r1) - (1 / aTx)));
    const dv1 = Math.abs(vTx1 - v1);

    const vTx2 = Math.sqrt(mu_earth * ((2 / r2) - (1 / aTx)));
    const dv2 = Math.abs(v2 - vTx2);
    const totalDv = dv1 + dv2;

    const tSec = Math.PI * Math.sqrt(Math.pow(aTx, 3) / mu_earth);
    const tHours = tSec / 3600;
    const tDays = tHours / 24;

    totResEl.textContent = totalDv.toFixed(2) + ' km / s Total Δv';

    let timeStr = '';
    if (tDays >= 1.0) timeStr = tDays.toFixed(2) + ' Days (' + tHours.toFixed(1) + ' hrs)';
    else timeStr = tHours.toFixed(2) + ' Hours';

    timResEl.textContent = 'Flight Time: ' + timeStr + ' (Burn 1: ' + dv1.toFixed(2) + ' km/s, Burn 2: ' + dv2.toFixed(2) + ' km/s)';
  }

  r1El.addEventListener('input', update);
  r2El.addEventListener('input', update);
  update();
})();