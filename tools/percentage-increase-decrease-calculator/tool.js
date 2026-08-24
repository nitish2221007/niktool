(() => {
  'use strict';
  const initEl = document.getElementById('pct-initial');
  const finEl = document.getElementById('pct-final');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('pct-res-card');
  const resChange = document.getElementById('pct-res-change');
  const resDiff = document.getElementById('pct-res-diff');
  const resMult = document.getElementById('pct-res-mult');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v1 = parseFloat(initEl.value);
    const v2 = parseFloat(finEl.value);

    if (isNaN(v1) || isNaN(v2)) {
      setMsg('Please enter valid numeric values for both fields.', true);
      resCard.style.display = 'none';
      return;
    }
    if (v1 === 0) {
      setMsg('Initial value cannot be zero when computing percentage change.', true);
      resCard.style.display = 'none';
      return;
    }

    const diff = v2 - v1;
    const change = (diff / Math.abs(v1)) * 100;
    const mult = v2 / v1;

    resDiff.textContent = (diff >= 0 ? '+' : '') + diff.toLocaleString();
    resChange.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    resChange.style.color = change >= 0 ? '#22543d' : '#c53030';
    resMult.textContent = mult.toFixed(4) + 'x';

    resCard.style.display = 'block';
    setMsg(change >= 0 ? 'Percentage increase of ' + change.toFixed(2) + '%' : 'Percentage decrease of ' + Math.abs(change).toFixed(2) + '%');
  });

  clearBtn.addEventListener('click', () => {
    initEl.value = ''; finEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();