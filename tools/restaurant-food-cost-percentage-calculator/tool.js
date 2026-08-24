(() => {
  'use strict';
  const cogsEl = document.getElementById('fc-cogs'), priceEl = document.getElementById('fc-price');
  const pctEl = document.getElementById('fc-res-pct'), profEl = document.getElementById('fc-res-profit');

  function update() {
    const cogs = parseFloat(cogsEl.value), price = parseFloat(priceEl.value);
    if (isNaN(cogs) || isNaN(price) || cogs < 0 || price <= 0 || cogs > price) return;

    const foodCostPct = (cogs / price) * 100;
    const grossMargin = price - cogs;
    const marginPct = (grossMargin / price) * 100;

    pctEl.textContent = foodCostPct.toFixed(2) + '%';
    pctEl.style.color = foodCostPct <= 32 ? '#22543d' : '#c53030';
    profEl.textContent = '$' + grossMargin.toFixed(2) + ' (' + marginPct.toFixed(1) + '%)';
  }

  cogsEl.addEventListener('input', update);
  priceEl.addEventListener('input', update);
  update();
})();