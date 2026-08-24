(() => {
  'use strict';
  const wEl = document.getElementById('spv-watts'), sEl = document.getElementById('spv-sun'), dEl = document.getElementById('spv-derate');
  const dResEl = document.getElementById('spv-res-daily'), mResEl = document.getElementById('spv-res-month');

  function update() {
    const watts = parseFloat(wEl.value), psh = parseFloat(sEl.value), derate = parseFloat(dEl.value);
    if (isNaN(watts) || isNaN(psh) || isNaN(derate) || watts <= 0 || psh <= 0 || derate <= 0) return;

    // Daily kWh = (Watts / 1000) * PSH * derate
    const kwArray = watts / 1000;
    const dailyKwh = kwArray * psh * derate;
    const monthlyKwh = dailyKwh * 30;

    dResEl.textContent = dailyKwh.toFixed(2) + ' kWh / day';
    mResEl.textContent = monthlyKwh.toFixed(1) + ' kWh / month';
  }

  [wEl, sEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();