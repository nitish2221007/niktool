(() => {
  'use strict';
  const inEl = document.getElementById('gm-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gm-res-card');
  const resG = document.getElementById('gm-res-val'), resP = document.getElementById('gm-res-prod');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter numbers.', true); resCard.style.display = 'none'; return; }

    const nums = raw.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2 || nums.some(n => n <= 0)) {
      setMsg('Please enter at least 2 strictly positive numbers.', true);
      resCard.style.display = 'none'; return;
    }

    const n = nums.length;
    // Use sum of logs to prevent numerical floating point overflow
    const sumLogs = nums.reduce((acc, val) => acc + Math.log(val), 0);
    const gm = Math.exp(sumLogs / n);
    const prod = nums.reduce((a, b) => a * b, 1);

    resG.textContent = gm.toFixed(4);
    resP.textContent = prod.toLocaleString('en-US', { maximumFractionDigits: 4 });

    resCard.style.display = 'block';
    setMsg('Geometric mean computed.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();