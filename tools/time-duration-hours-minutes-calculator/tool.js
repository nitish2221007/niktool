(() => {
  'use strict';
  const h1El = document.getElementById('td1-h'), m1El = document.getElementById('td1-m');
  const h2El = document.getElementById('td2-h'), m2El = document.getElementById('td2-m');
  const sumEl = document.getElementById('td-dur-sum'), decEl = document.getElementById('td-dur-dec'), diffEl = document.getElementById('td-dur-diff');

  function update() {
    const h1 = parseInt(h1El.value, 10) || 0, m1 = parseInt(m1El.value, 10) || 0;
    const h2 = parseInt(h2El.value, 10) || 0, m2 = parseInt(m2El.value, 10) || 0;

    const totalMins1 = h1 * 60 + m1;
    const totalMins2 = h2 * 60 + m2;

    const sumMins = totalMins1 + totalMins2;
    const diffMins = Math.abs(totalMins1 - totalMins2);

    const sumH = Math.floor(sumMins / 60);
    const sumM = sumMins % 60;
    const decHours = sumMins / 60;

    const diffH = Math.floor(diffMins / 60);
    const diffM = diffMins % 60;

    sumEl.textContent = sumH + ' hrs ' + sumM + ' mins';
    decEl.textContent = decHours.toFixed(2) + ' Decimal Hours';
    diffEl.textContent = diffH + ' hrs ' + diffM + ' mins';
  }

  [h1El, m1El, h2El, m2El].forEach(el => el.addEventListener('input', update));
  update();
})();