(() => {
  'use strict';
  const curEl = document.getElementById('inf-current'), rateEl = document.getElementById('inf-rate'), yrEl = document.getElementById('inf-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('inf-res-card');
  const resPower = document.getElementById('inf-res-future-power'), resNeed = document.getElementById('inf-res-needed'), resLoss = document.getElementById('inf-res-loss');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cur = parseFloat(curEl.value);
    const r = parseFloat(rateEl.value) / 100;
    const t = parseFloat(yrEl.value);

    if (isNaN(cur) || isNaN(r) || isNaN(t) || cur <= 0 || r <= 0 || t <= 0) {
      setMsg('Please enter valid positive numbers for money, inflation rate, and years.', true);
      resCard.style.display = 'none'; return;
    }

    // Future purchasing power of current cash: C / (1 + r)^t
    const futurePower = cur / Math.pow(1 + r, t);
    // Amount needed in future to match current basket of goods: C * (1 + r)^t
    const futureNeeded = cur * Math.pow(1 + r, t);
    const lossPct = ((cur - futurePower) / cur) * 100;

    resPower.textContent = '$' + Math.round(futurePower).toLocaleString();
    resNeed.textContent = '$' + Math.round(futureNeeded).toLocaleString();
    resLoss.textContent = '-' + lossPct.toFixed(1) + '%';

    resCard.style.display = 'block';
    setMsg('Inflation impact calculated.');
  });

  clearBtn.addEventListener('click', () => {
    curEl.value = ''; rateEl.value = '6.0'; yrEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();