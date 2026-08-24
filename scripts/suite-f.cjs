const { createTool } = require('./generate-curated-tools.cjs');

// Suite F: 5 Tools in Business, Inventory & Financial Equity Valuation
const toolsSuiteF = [
  // 1. Restaurant Food Cost Percentage Calculator
  {
    slug: 'restaurant-food-cost-percentage-calculator',
    name: 'Restaurant Food Cost Percentage Calculator',
    description: 'Calculate menu item food cost percentage ((Ingredient Portion Cost / Menu Price) · 100) and gross profit margin for restaurant profitability.',
    category: 'Finance',
    icon: 'text',
    keywords: ['food cost percentage calculator', 'restaurant menu pricing calculator', 'ideal food cost formula', 'cogs food cost percentage online', 'restaurant gross margin calculator'],
    order: 209,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Ingredient Cost & Menu Selling Price',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fc-cogs">Portion Ingredient Cost ($ / ₹)</label>
          <input class="tool-textarea" id="fc-cogs" type="number" step="any" value="4.50" placeholder="e.g. 4.50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-price">Menu Selling Price ($ / ₹)</label>
          <input class="tool-textarea" id="fc-price" type="number" step="any" value="16.00" placeholder="e.g. 16.00" />
        </div>
      </div>
      <div id="fc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fc-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">28.13%</span>
            <span class="stat-label">Food Cost Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fc-res-profit" style="font-weight:700;">$11.50 (71.88%)</span>
            <span class="stat-label">Gross Margin per Dish</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
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
})();`,
    howToSteps: [
      'Enter total ingredient plate cost per portion.',
      'Enter customer menu selling price.',
      'Inspect food cost percentage (industry benchmark is 28% to 32%).'
    ],
    benefitTitle: 'The 28-32% Food Cost Benchmark',
    benefitContent: 'Successful restaurant operations target food costs between 28% and 35% of menu price to leave sufficient gross margin for labor overhead (~30%), rent (~10%), and net profit.',
    faqs: [{ q: 'How to calculate target menu price from a 30% target food cost?', a: 'Menu Price = Portion Cost / 0.30 (e.g. $4.50 / 0.30 = $15.00).' }]
  },

  // 2. Inventory Turnover Ratio & Days Sales of Inventory (DSI)
  {
    slug: 'inventory-turnover-ratio-calculator',
    name: 'Inventory Turnover & DSI Calculator',
    description: 'Calculate inventory turnover ratio (COGS / Average Inventory) and Days Sales of Inventory (DSI = 365 / Turnover) for retail and supply chain analytics.',
    category: 'Finance',
    icon: 'text',
    keywords: ['inventory turnover ratio calculator', 'days sales of inventory dsi calculator', 'inventory velocity calculator', 'cogs to average inventory formula', 'stock turnover calculator online'],
    order: 210,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Annual COGS & Average Inventory',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="it-cogs">Annual Cost of Goods Sold COGS ($ / ₹)</label>
          <input class="tool-textarea" id="it-cogs" type="number" step="any" value="500000" placeholder="e.g. 500,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="it-inv">Average Inventory Value ($ / ₹)</label>
          <input class="tool-textarea" id="it-inv" type="number" step="any" value="62500" placeholder="e.g. 62,500" />
        </div>
      </div>
      <div id="it-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="it-res-turn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.00 Times / Year</span>
            <span class="stat-label">Inventory Turnover Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="it-res-dsi" style="font-weight:700;">45.6 Days</span>
            <span class="stat-label">Days Sales of Inventory (DSI)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
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
})();`,
    howToSteps: [
      'Enter annual Cost of Goods Sold (COGS) from your income statement.',
      'Enter average inventory balance ((Beginning Inventory + Ending Inventory) / 2).',
      'Inspect how many times inventory turns over annually and the average days required to sell through warehouse stock.'
    ],
    benefitTitle: 'High vs Low Inventory Turnover',
    benefitContent: 'A higher turnover ratio indicates strong sales velocity and minimal dead capital locked up in storage, whereas low turnover points to overstocking and potential product obsolescence.',
    faqs: [{ q: 'What is a healthy inventory turnover ratio for retail?', a: 'Grocery and apparel retailers typically average between 6 and 12 turns per year (30 to 60 days DSI).' }]
  },

  // 3. Stock Dividend Yield & Annual Income Calculator
  {
    slug: 'stock-dividend-yield-calculator',
    name: 'Stock Dividend Yield & Passive Income Calculator',
    description: 'Calculate annual stock dividend yield percentage ((Annual Dividend / Share Price) · 100), quarterly payout schedule, and total passive income.',
    category: 'Finance',
    icon: 'text',
    keywords: ['stock dividend yield calculator', 'dividend income calculator', 'calculate dividend payout quarterly', 'dividend yield formula online', 'passive dividend cash flow calculator'],
    order: 211,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Share Price, Dividend & Quantity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="div-price">Stock Share Price ($ / ₹)</label>
          <input class="tool-textarea" id="div-price" type="number" step="any" value="50.00" placeholder="50.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="div-dps">Annual Dividend Per Share ($ / ₹)</label>
          <input class="tool-textarea" id="div-dps" type="number" step="any" value="2.00" placeholder="2.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="div-shares">Shares Owned</label>
          <input class="tool-textarea" id="div-shares" type="number" step="any" value="500" placeholder="500" />
        </div>
      </div>
      <div id="div-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="div-res-yield" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.00%</span>
            <span class="stat-label">Dividend Yield Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="div-res-annual-inc" style="font-weight:700;">$1,000 / yr</span>
            <span class="stat-label">Total Annual Passive Income</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="div-res-quarterly">$250 / quarter</span>
            <span class="stat-label">Quarterly Dividend Payout</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('div-price'), dpsEl = document.getElementById('div-dps'), sEl = document.getElementById('div-shares');
  const yEl = document.getElementById('div-res-yield'), aEl = document.getElementById('div-res-annual-inc'), qEl = document.getElementById('div-res-quarterly');

  function update() {
    const price = parseFloat(pEl.value), dps = parseFloat(dpsEl.value), shares = parseFloat(sEl.value);
    if (isNaN(price) || isNaN(dps) || isNaN(shares) || price <= 0 || dps < 0 || shares <= 0) return;

    const yieldPct = (dps / price) * 100;
    const annualIncome = dps * shares;
    const quarterly = annualIncome / 4;

    yEl.textContent = yieldPct.toFixed(2) + '%';
    aEl.textContent = '$' + Math.round(annualIncome).toLocaleString() + ' / yr';
    qEl.textContent = '$' + Math.round(quarterly).toLocaleString() + ' / quarter';
  }

  pEl.addEventListener('input', update);
  dpsEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter current stock share price.',
      'Enter annual dividend per share (DPS).',
      'Enter number of shares held in your investment portfolio.',
      'Inspect dividend yield percentage and projected annual cash flow.'
    ],
    benefitTitle: 'Dividends as Compounding Cash Flow',
    benefitContent: 'Reinvesting dividends (DRIP) compounds investment returns exponentially over decades by purchasing additional dividend-producing shares automatically.',
    faqs: [{ q: 'What is a Dividend Aristocrat?', a: 'An S&P 500 company that has increased its base dividend payout every consecutive year for 25+ years.' }]
  },

  // 4. Price to Earnings (P/E) Valuation & PEG Ratio Calculator
  {
    slug: 'pe-ratio-valuation-calculator',
    name: 'P/E Ratio & PEG Stock Valuation Calculator',
    description: 'Calculate Price-to-Earnings (P/E = Share Price / EPS), PEG growth ratio, and earnings yield for equity fundamental analysis.',
    category: 'Finance',
    icon: 'text',
    keywords: ['pe ratio calculator', 'price to earnings valuation calculator', 'peg ratio calculator online', 'earnings per share pe multiple', 'stock fundamental valuation formula'],
    order: 212,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Stock Price, EPS & Earnings Growth',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pe-price">Stock Price ($ / ₹)</label>
          <input class="tool-textarea" id="pe-price" type="number" step="any" value="150.00" placeholder="150.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-eps">Earnings Per Share (EPS)</label>
          <input class="tool-textarea" id="pe-eps" type="number" step="any" value="6.00" placeholder="6.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-growth">Expected Annual Growth (%)</label>
          <input class="tool-textarea" id="pe-growth" type="number" step="any" value="20.0" placeholder="20.0%" />
        </div>
      </div>
      <div id="pe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pe-res-pe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.0x</span>
            <span class="stat-label">Price-to-Earnings (P/E Ratio)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pe-res-peg" style="font-weight:700;">1.25</span>
            <span class="stat-label">PEG Ratio (P/E / Growth)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pe-res-ey">4.00%</span>
            <span class="stat-label">Earnings Yield (EPS / Price)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('pe-price'), epsEl = document.getElementById('pe-eps'), gEl = document.getElementById('pe-growth');
  const peEl = document.getElementById('pe-res-pe'), pegEl = document.getElementById('pe-res-peg'), eyEl = document.getElementById('pe-res-ey');

  function update() {
    const price = parseFloat(pEl.value), eps = parseFloat(epsEl.value), growth = parseFloat(gEl.value);
    if (isNaN(price) || isNaN(eps) || isNaN(growth) || price <= 0 || eps <= 0 || growth <= 0) return;

    const pe = price / eps;
    const peg = pe / growth;
    const ey = (eps / price) * 100;

    peEl.textContent = pe.toFixed(1) + 'x';
    pegEl.textContent = peg.toFixed(2);
    eyEl.textContent = ey.toFixed(2) + '%';
  }

  pEl.addEventListener('input', update);
  epsEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter current stock trading price.',
      'Enter trailing or forward Earnings Per Share (EPS).',
      'Enter expected annual earnings growth percentage.',
      'Inspect P/E multiple, PEG growth valuation ratio, and inverted earnings yield.'
    ],
    benefitTitle: 'Peter Lynch\'s PEG Ratio Valuation',
    benefitContent: 'Famed Magellan fund manager Peter Lynch popularized the PEG ratio (P/E / Annual Growth Rate): a PEG of 1.0 represents fair value, while PEG < 1.0 suggests an undervalued growth stock.',
    faqs: [{ q: 'What is Earnings Yield?', a: 'Earnings yield is the inverse of the P/E ratio (E/P = EPS / Price), allowing direct comparison of stock returns against Treasury bond yields.' }]
  },

  // 5. Dollar Cost Averaging (DCA) Multi-Buy Average Cost Calculator
  {
    slug: 'dca-dollar-cost-averaging-calculator',
    name: 'Dollar Cost Averaging (DCA) Average Price Calculator',
    description: 'Calculate the true weighted average cost per share across multiple stock or crypto purchases at varying prices.',
    category: 'Finance',
    icon: 'text',
    keywords: ['dollar cost averaging calculator', 'dca average price calculator', 'stock average cost calculator', 'crypto dca calculator online', 'weighted average share price'],
    order: 213,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Purchase History (Shares & Buy Prices)',
    controlsHtml: `      <div id="dca-rows-container">
        <div class="dca-row" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea dca-shares" type="number" step="any" value="10" placeholder="Shares Count" />
          <input class="tool-textarea dca-price" type="number" step="any" value="100" placeholder="Buy Price ($)" />
        </div>
        <div class="dca-row" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea dca-shares" type="number" step="any" value="15" placeholder="Shares Count" />
          <input class="tool-textarea dca-price" type="number" step="any" value="80" placeholder="Buy Price ($)" />
        </div>
        <div class="dca-row" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea dca-shares" type="number" step="any" value="20" placeholder="Shares Count" />
          <input class="tool-textarea dca-price" type="number" step="any" value="70" placeholder="Buy Price ($)" />
        </div>
      </div>
      <div id="dca-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dca-res-avg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$80.00 / share</span>
            <span class="stat-label">Weighted Average Cost Basis</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dca-res-tot-invest" style="font-weight:700;">$3,600</span>
            <span class="stat-label">Total Capital Invested</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dca-res-tot-shares">45 Shares</span>
            <span class="stat-label">Total Shares Accumulated</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const container = document.getElementById('dca-rows-container');
  const avgEl = document.getElementById('dca-res-avg'), invEl = document.getElementById('dca-res-tot-invest'), shEl = document.getElementById('dca-res-tot-shares');

  function update() {
    const sEls = container.querySelectorAll('.dca-shares');
    const pEls = container.querySelectorAll('.dca-price');

    let totalShares = 0, totalInvested = 0;
    for (let i = 0; i < sEls.length; i++) {
      const s = parseFloat(sEls[i].value) || 0;
      const p = parseFloat(pEls[i].value) || 0;
      totalShares += s;
      totalInvested += (s * p);
    }

    if (totalShares <= 0) return;

    const avgPrice = totalInvested / totalShares;
    avgEl.textContent = '$' + avgPrice.toFixed(2) + ' / share';
    invEl.textContent = '$' + Math.round(totalInvested).toLocaleString();
    shEl.textContent = totalShares.toLocaleString() + ' Shares';
  }

  container.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the quantity of shares purchased and price paid for each trade tranche.',
      'Inspect your true dollar-cost average cost basis per share and total invested capital.'
    ],
    benefitTitle: 'Lowering Cost Basis in Market Dips',
    benefitContent: 'DCA eliminates market-timing emotional anxiety: purchasing fixed dollar amounts at regular intervals acquires more shares when prices are low and fewer when prices are high.',
    faqs: [{ q: 'What is the formula for average share price?', a: 'Average Cost Basis = Total Dollar Investment / Total Shares Accumulated.' }]
  }
];

toolsSuiteF.forEach(createTool);
console.log('Suite F complete: 5 tools created.');
