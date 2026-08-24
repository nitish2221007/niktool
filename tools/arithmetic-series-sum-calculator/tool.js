(() => {
  'use strict';
  const aEl = document.getElementById('ap-a'), dEl = document.getElementById('ap-d'), nEl = document.getElementById('ap-n');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ap-res-card');
  const resSum = document.getElementById('ap-res-sum'), resLast = document.getElementById('ap-res-last');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(aEl.value), d = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(d) || isNaN(n) || n < 1) {
      setMsg('Please enter valid numbers (n must be integer >= 1).', true);
      resCard.style.display = 'none'; return;
    }

    const an = a + (n - 1) * d;
    const sn = (n / 2) * (2 * a + (n - 1) * d);

    resSum.textContent = sn.toLocaleString();
    resLast.textContent = an.toLocaleString();

    resCard.style.display = 'block';
    setMsg('Arithmetic series computed.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = '3'; dEl.value = '5'; nEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();