(() => {
  'use strict';
  const rateEl = document.getElementById('hr-rate'), hrsEl = document.getElementById('hr-hours'), wksEl = document.getElementById('hr-weeks');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hr-res-card');
  const resAnn = document.getElementById('hr-res-annual'), resMo = document.getElementById('hr-res-monthly'), resTot = document.getElementById('hr-res-total-hours');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const rate = parseFloat(rateEl.value);
    const hrs = parseFloat(hrsEl.value) || 30;
    const wks = parseFloat(wksEl.value) || 48;

    if (isNaN(rate) || rate <= 0 || hrs <= 0 || wks <= 0) {
      setMsg('Please enter valid positive numbers for rate and hours.', true);
      resCard.style.display = 'none'; return;
    }

    const totalHours = hrs * wks;
    const annual = rate * totalHours;
    const monthly = annual / 12;

    resAnn.textContent = '$' + Math.round(annual).toLocaleString();
    resMo.textContent = '$' + Math.round(monthly).toLocaleString() + ' / mo';
    resTot.textContent = totalHours.toLocaleString() + ' hrs';

    resCard.style.display = 'block';
    setMsg('Annual revenue equivalent calculated.');
  });

  clearBtn.addEventListener('click', () => {
    rateEl.value = ''; hrsEl.value = '30'; wksEl.value = '48'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();