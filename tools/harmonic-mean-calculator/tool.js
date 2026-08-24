(() => {
  'use strict';
  const inEl = document.getElementById('hm-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hm-res-card');
  const resH = document.getElementById('hm-res-val'), resA = document.getElementById('hm-res-arithmetic');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter numbers.', true); resCard.style.display = 'none'; return; }

    const nums = raw.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2 || nums.some(n => n <= 0)) {
      setMsg('Please enter at least 2 strictly positive numbers (Harmonic mean is undefined for zero or negative values).', true);
      resCard.style.display = 'none'; return;
    }

    const n = nums.length;
    const sumReciprocals = nums.reduce((acc, val) => acc + (1 / val), 0);
    const hm = n / sumReciprocals;
    const am = nums.reduce((a, b) => a + b, 0) / n;

    resH.textContent = hm.toFixed(4);
    resA.textContent = am.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Harmonic mean computed.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();