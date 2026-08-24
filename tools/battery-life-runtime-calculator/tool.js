(() => {
  'use strict';
  const capEl = document.getElementById('bat-cap'), capUnit = document.getElementById('bat-cap-unit');
  const loadEl = document.getElementById('bat-load'), loadUnit = document.getElementById('bat-load-unit');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bat-res-card');
  const resH = document.getElementById('bat-res-hours'), resD = document.getElementById('bat-res-days');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const capMah = parseFloat(capEl.value) * parseFloat(capUnit.value);
    const loadMa = parseFloat(loadEl.value) * parseFloat(loadUnit.value);

    if (isNaN(capMah) || isNaN(loadMa) || capMah <= 0 || loadMa <= 0) {
      setMsg('Please enter valid positive numbers for battery capacity and load current.', true);
      resCard.style.display = 'none'; return;
    }

    // Standard Peukert battery efficiency derate ~0.85
    const totalHours = (capMah / loadMa) * 0.85;
    const totalDays = totalHours / 24;

    resH.textContent = totalHours >= 1 ? totalHours.toFixed(1) + ' Hours' : (totalHours * 60).toFixed(0) + ' Minutes';
    resD.textContent = totalDays.toFixed(2) + ' Days';

    resCard.style.display = 'block';
    setMsg('Battery runtime calculated.');
  });

  clearBtn.addEventListener('click', () => {
    capEl.value = '2500'; loadEl.value = '150'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();