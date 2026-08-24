(() => {
  'use strict';
  const costEl = document.getElementById('mm-cost');
  const revEl = document.getElementById('mm-revenue');
  const margInputEl = document.getElementById('mm-margin-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('mm-result-card');
  const resMargin = document.getElementById('mm-res-margin');
  const resMarkup = document.getElementById('mm-res-markup');
  const resProfit = document.getElementById('mm-res-profit');
  const resSp = document.getElementById('mm-res-sp');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cp = parseFloat(costEl.value);
    let sp = parseFloat(revEl.value);
    const targetMargin = parseFloat(margInputEl.value);

    if (isNaN(cp) || cp <= 0) {
      setMsg('Please enter a valid positive Cost Price.', true);
      resCard.style.display = 'none';
      return;
    }

    if (isNaN(sp) && !isNaN(targetMargin)) {
      if (targetMargin >= 100) {
        setMsg('Margin must be strictly less than 100%.', true);
        return;
      }
      sp = cp / (1 - (targetMargin / 100));
    }

    if (isNaN(sp) || sp <= 0) {
      setMsg('Please enter either Selling Price or Desired Margin %.', true);
      resCard.style.display = 'none';
      return;
    }

    const profit = sp - cp;
    const margin = (profit / sp) * 100;
    const markup = (profit / cp) * 100;

    resMargin.textContent = margin.toFixed(2) + '%';
    resMarkup.textContent = markup.toFixed(2) + '%';
    resProfit.textContent = profit.toFixed(2);
    resSp.textContent = sp.toFixed(2);

    resCard.style.display = 'block';
    setMsg('Calculated pricing metrics successfully.');
  });

  clearBtn.addEventListener('click', () => {
    costEl.value = ''; revEl.value = ''; margInputEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();