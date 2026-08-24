(() => {
  'use strict';
  const mEl = document.getElementById('emc-mass'), uEl = document.getElementById('emc-unit');
  const jEl = document.getElementById('emc-res-joules'), kwhEl = document.getElementById('emc-res-kwh'), tntEl = document.getElementById('emc-res-tnt');

  const c = 299792458; // m/s

  function update() {
    const rawM = parseFloat(mEl.value), unit = uEl.value;
    if (isNaN(rawM) || rawM <= 0) return;

    let kg = rawM;
    if (unit === 'g') kg = rawM / 1000;
    else if (unit === 'mg') kg = rawM / 1e6;

    // E = m * c^2
    const joules = kg * Math.pow(c, 2);
    const kwh = joules / 3600000;
    const megatonsTnt = joules / 4.184e15; // 1 Megaton TNT = 4.184 x 10^15 J

    jEl.textContent = joules.toExponential(2) + ' J';
    kwhEl.textContent = (kwh / 1e6).toFixed(2) + ' Million kWh';
    tntEl.textContent = megatonsTnt >= 1 ? megatonsTnt.toFixed(2) + ' Megatons TNT' : (megatonsTnt * 1000).toFixed(2) + ' Kilotons TNT';
  }

  mEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();