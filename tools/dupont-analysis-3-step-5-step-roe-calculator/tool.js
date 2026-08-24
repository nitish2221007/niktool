(() => {
  'use strict';
  const nEl = document.getElementById('dp-net'), rEl = document.getElementById('dp-rev');
  const aEl = document.getElementById('dp-ast'), eEl = document.getElementById('dp-eq');
  const roeResEl = document.getElementById('dp-res-roe'), brkResEl = document.getElementById('dp-res-break');

  function update() {
    const net = parseFloat(nEl.value), rev = parseFloat(rEl.value);
    const ast = parseFloat(aEl.value), eq = parseFloat(eEl.value);

    if (isNaN(net) || isNaN(rev) || isNaN(ast) || isNaN(eq) || rev <= 0 || ast <= 0 || eq <= 0) return;

    // DuPont 3-Step components:
    // 1. Net Profit Margin = Net Income / Revenue
    const margin = net / rev;
    const margin_pct = margin * 100.0;

    // 2. Asset Turnover = Revenue / Total Assets
    const turnover = rev / ast;

    // 3. Equity Multiplier (Financial Leverage) = Total Assets / Shareholders' Equity
    const leverage = ast / eq;

    // Return on Equity = Margin * Turnover * Leverage
    const ROE = margin * turnover * leverage;
    const ROE_pct = ROE * 100.0;

    roeResEl.textContent = 'ROE = ' + ROE_pct.toFixed(2) + '%';
    brkResEl.textContent = 'Margin: ' + margin_pct.toFixed(1) + '% · Turnover: ' + turnover.toFixed(2) + '× · Leverage: ' + leverage.toFixed(2) + '× (Net: $' + net + 'M, Equity: $' + eq + 'M)';
  }

  [nEl, rEl, aEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();