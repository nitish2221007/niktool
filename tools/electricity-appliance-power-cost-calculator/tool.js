(() => {
  'use strict';
  const wEl = document.getElementById('elc-watts'), hEl = document.getElementById('elc-hours'), rEl = document.getElementById('elc-rate');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('elc-res-card');
  const resM = document.getElementById('elc-res-monthly'), resD = document.getElementById('elc-res-daily'), resA = document.getElementById('elc-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const watts = parseFloat(wEl.value);
    const hours = parseFloat(hEl.value);
    const rate = parseFloat(rEl.value);

    if (isNaN(watts) || isNaN(hours) || isNaN(rate) || watts <= 0 || hours <= 0 || rate <= 0) {
      setMsg('Please enter positive values for wattage, daily hours, and electricity tariff rate.', true);
      resCard.style.display = 'none'; return;
    }

    const dailyKwh = (watts * hours) / 1000;
    const dailyCost = dailyKwh * rate;
    const monthlyCost = dailyCost * 30;
    const annualCost = dailyCost * 365;

    resM.textContent = '$' + monthlyCost.toFixed(2) + ' / month';
    resD.textContent = '$' + dailyCost.toFixed(2) + ' (' + dailyKwh.toFixed(1) + ' kWh/day)';
    resA.textContent = '$' + Math.round(annualCost).toLocaleString() + ' / year';

    resCard.style.display = 'block';
    setMsg('Appliance electricity cost computed.');
  });

  clearBtn.addEventListener('click', () => {
    wEl.value = '1500'; hEl.value = '8'; rEl.value = '0.15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();