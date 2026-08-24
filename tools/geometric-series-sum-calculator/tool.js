(() => {
  'use strict';
  const aEl = document.getElementById('gp-a'), rEl = document.getElementById('gp-r'), nEl = document.getElementById('gp-n');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gp-res-card');
  const resSum = document.getElementById('gp-res-sum'), resInf = document.getElementById('gp-res-inf'), resLast = document.getElementById('gp-res-last');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(aEl.value), r = parseFloat(rEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(r) || isNaN(n) || n < 1) {
      setMsg('Please enter valid numbers (n must be integer >= 1).', true);
      resCard.style.display = 'none'; return;
    }

    const an = a * Math.pow(r, n - 1);
    let sn = 0;
    if (r === 1) sn = a * n;
    else sn = a * (1 - Math.pow(r, n)) / (1 - r);

    let sinf = 'Divergent (|r| ≥ 1)';
    if (Math.abs(r) < 1) {
      sinf = (a / (1 - r)).toFixed(4);
    }

    resSum.textContent = sn.toFixed(4);
    resInf.textContent = sinf;
    resLast.textContent = an.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Geometric series computed.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = '1'; rEl.value = '0.5'; nEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();