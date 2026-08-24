(() => {
  'use strict';
  const cogsEl = document.getElementById('it-cogs'), invEl = document.getElementById('it-inv');
  const turnEl = document.getElementById('it-res-turn'), dsiEl = document.getElementById('it-res-dsi');

  function update() {
    const cogs = parseFloat(cogsEl.value), inv = parseFloat(invEl.value);
    if (isNaN(cogs) || isNaN(inv) || cogs <= 0 || inv <= 0) return;

    // Turnover = COGS / Avg Inventory
    const turnover = cogs / inv;
    // DSI = 365 / Turnover
    const dsi = 365 / turnover;

    turnEl.textContent = turnover.toFixed(2) + ' Times / Year';
    dsiEl.textContent = dsi.toFixed(1) + ' Days to Sell';
  }

  cogsEl.addEventListener('input', update);
  invEl.addEventListener('input', update);
  update();
})();