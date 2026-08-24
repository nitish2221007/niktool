(() => {
  'use strict';
  const wEl = document.getElementById('sol-watts'), hEl = document.getElementById('sol-hours'), lEl = document.getElementById('sol-loss');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sol-res-card');
  const resD = document.getElementById('sol-res-daily'), resM = document.getElementById('sol-res-monthly'), resA = document.getElementById('sol-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const watts = parseFloat(wEl.value);
    const hours = parseFloat(hEl.value);
    const eff = (parseFloat(lEl.value) || 80) / 100;

    if (isNaN(watts) || isNaN(hours) || watts <= 0 || hours <= 0) {
      setMsg('Please enter positive values for array wattage and sun hours.', true);
      resCard.style.display = 'none'; return;
    }

    const dailyKwh = (watts * hours * eff) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const annualKwh = dailyKwh * 365;

    resD.textContent = dailyKwh.toFixed(2) + ' kWh / day';
    resM.textContent = Math.round(monthlyKwh).toLocaleString() + ' kWh / mo';
    resA.textContent = Math.round(annualKwh).toLocaleString() + ' kWh / yr';

    resCard.style.display = 'block';
    setMsg('Solar generation estimated.');
  });

  clearBtn.addEventListener('click', () => {
    wEl.value = '3000'; hEl.value = '4.5'; lEl.value = '80'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();