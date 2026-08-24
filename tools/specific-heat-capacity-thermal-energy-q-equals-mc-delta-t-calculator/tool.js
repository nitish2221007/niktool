(() => {
  'use strict';
  const mEl = document.getElementById('sh-m'), matEl = document.getElementById('sh-mat'), dtEl = document.getElementById('sh-dt');
  const qResEl = document.getElementById('sh-res-q'), kwhResEl = document.getElementById('sh-res-kwh');

  function update() {
    const mass = parseFloat(mEl.value), c = parseFloat(matEl.value), dt = parseFloat(dtEl.value);
    if (isNaN(mass) || isNaN(c) || isNaN(dt) || mass <= 0 || c <= 0) return;

    // Q = m * c * deltaT  [Joules]
    const Q_joules = mass * c * dt;
    const Q_kJ = Q_joules / 1000.0;
    const Q_kcal = Q_joules / 4184.0;
    const Q_kWh = Q_joules / 3.6e6;

    // Time on a 2000W electric kettle in minutes = (Q_joules / 2000) / 60
    const time_mins = (Q_joules / 2000.0) / 60.0;

    qResEl.textContent = 'Q = ' + (Math.abs(Q_kJ) >= 1000 ? (Q_kJ/1000).toFixed(2) + ' MJ' : Q_kJ.toFixed(1) + ' kJ') + ' (' + Q_kcal.toFixed(1) + ' kcal)';
    kwhResEl.textContent = 'Electrical Equivalent: ' + Q_kWh.toFixed(3) + ' kWh (Heating Time @ 2 kW element = ' + time_mins.toFixed(1) + ' min @ c = ' + c + ' J/kg·°C)';
  }

  [mEl, matEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();