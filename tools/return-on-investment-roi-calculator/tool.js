(() => {
  'use strict';
  const invEl = document.getElementById('roi-invested'), retEl = document.getElementById('roi-returned'), yrEl = document.getElementById('roi-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('roi-res-card');
  const resPct = document.getElementById('roi-res-pct'), resProfit = document.getElementById('roi-res-profit'), resAnn = document.getElementById('roi-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cost = parseFloat(invEl.value);
    const revenue = parseFloat(retEl.value);
    const years = parseFloat(yrEl.value) || 1;

    if (isNaN(cost) || isNaN(revenue) || cost <= 0) {
      setMsg('Please enter a valid positive invested amount.', true);
      resCard.style.display = 'none'; return;
    }

    const netProfit = revenue - cost;
    const roi = (netProfit / cost) * 100;
    const annualizedRoi = (Math.pow(revenue / cost, 1 / Math.max(0.01, years)) - 1) * 100;

    resPct.textContent = (roi >= 0 ? '+' : '') + roi.toFixed(2) + '%';
    resPct.style.color = roi >= 0 ? '#22543d' : '#c53030';
    resProfit.textContent = (netProfit >= 0 ? '+$' : '-$') + Math.abs(netProfit).toLocaleString('en-US', { maximumFractionDigits: 2 });
    resAnn.textContent = (annualizedRoi >= 0 ? '+' : '') + annualizedRoi.toFixed(2) + '% / yr';

    resCard.style.display = 'block';
    setMsg('ROI calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    invEl.value = ''; retEl.value = ''; yrEl.value = '1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();