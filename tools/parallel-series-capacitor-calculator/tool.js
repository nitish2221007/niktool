(() => {
  'use strict';
  const inEl = document.getElementById('cap-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('cap-res-card');
  const resP = document.getElementById('cap-res-parallel'), resS = document.getElementById('cap-res-series');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter capacitor values.', true); resCard.style.display = 'none'; return; }

    const caps = raw.split(/[,\s\n]+/).map(Number).filter(n => !isNaN(n));
    if (caps.length < 2 || caps.some(c => c <= 0)) {
      setMsg('Please enter at least 2 positive capacitor values.', true);
      resCard.style.display = 'none'; return;
    }

    const cParallel = caps.reduce((a, b) => a + b, 0);
    const sumRecip = caps.reduce((acc, c) => acc + (1 / c), 0);
    const cSeries = 1 / sumRecip;

    resP.textContent = cParallel.toFixed(3) + ' units';
    resS.textContent = cSeries.toFixed(3) + ' units';

    resCard.style.display = 'block';
    setMsg('Equivalent capacitance calculated.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();