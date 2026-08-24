(() => {
  'use strict';
  const loadEl = document.getElementById('sb-load'), autEl = document.getElementById('sb-auton');
  const voltEl = document.getElementById('sb-volt'), dodEl = document.getElementById('sb-dod');
  const ahResEl = document.getElementById('sb-res-ah'), kwhResEl = document.getElementById('sb-res-kwh');

  function update() {
    const dailyWh = parseFloat(loadEl.value), daysAuton = parseFloat(autEl.value);
    const sysVolt = parseFloat(voltEl.value), dod = parseFloat(dodEl.value);
    if (isNaN(dailyWh) || isNaN(daysAuton) || isNaN(sysVolt) || isNaN(dod) || dailyWh <= 0 || daysAuton < 1 || sysVolt <= 0 || dod <= 0) return;

    // Total Wh needed = (Daily Wh * Autonomy Days) / (DoD * 0.90 Inverter Efficiency)
    const totalWhNeeded = (dailyWh * daysAuton) / (dod * 0.90);
    const totalAhNeeded = totalWhNeeded / sysVolt;
    const totalKwh = totalWhNeeded / 1000;

    ahResEl.textContent = totalAhNeeded.toFixed(1) + ' Ah @ ' + sysVolt + 'V';
    kwhResEl.textContent = totalKwh.toFixed(2) + ' kWh';
  }

  [loadEl, autEl, voltEl, dodEl].forEach(el => el.addEventListener('input', update));
  update();
})();