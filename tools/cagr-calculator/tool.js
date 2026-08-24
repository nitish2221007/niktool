(() => {
  'use strict';
  const initEl = document.getElementById('cagr-initial');
  const finalEl = document.getElementById('cagr-final');
  const yearsEl = document.getElementById('cagr-years');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('cagr-result-card');
  const resRate = document.getElementById('cagr-res-rate');
  const resTotal = document.getElementById('cagr-res-total');
  const resGain = document.getElementById('cagr-res-gain');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v0 = parseFloat(initEl.value);
    const vn = parseFloat(finalEl.value);
    const t = parseFloat(yearsEl.value);

    if (isNaN(v0) || isNaN(vn) || isNaN(t) || v0 <= 0 || vn <= 0 || t <= 0) {
      setMsg('Please enter valid positive numbers for all fields.', true);
      resCard.style.display = 'none';
      return;
    }

    const cagr = (Math.pow(vn / v0, 1 / t) - 1) * 100;
    const absGain = vn - v0;
    const absPercent = ((vn - v0) / v0) * 100;

    resRate.textContent = cagr.toFixed(2) + '%';
    resTotal.textContent = (absPercent >= 0 ? '+' : '') + absPercent.toFixed(2) + '%';
    resGain.textContent = (absGain >= 0 ? '+' : '') + absGain.toLocaleString('en-US', { maximumFractionDigits: 2 });

    resCard.style.display = 'block';
    setMsg('CAGR calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    initEl.value = ''; finalEl.value = ''; yearsEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();