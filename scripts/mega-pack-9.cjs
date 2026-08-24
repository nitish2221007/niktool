const { createTool } = require('./generate-curated-tools.cjs');

const tools9 = [
  // 1. Salary Take-Home Pay & Net Salary Calculator
  {
    slug: 'salary-take-home-pay-calculator',
    name: 'Salary Take-Home Pay & Net Salary Calculator',
    description: 'Calculate monthly and annual net take-home salary after estimated income taxes, social security, retirement contributions, and insurance deductions.',
    category: 'Finance',
    icon: 'text',
    keywords: ['salary take home calculator', 'net pay calculator', 'gross to net salary calculator', 'paycheck calculator after taxes', 'monthly take home salary online'],
    order: 144,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Gross Salary & Deductions',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sal-gross">Annual Gross Salary ($ / ₹)</label>
          <input class="tool-textarea" id="sal-gross" type="number" step="any" value="60000" placeholder="e.g. 60,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sal-tax-pct">Effective Income Tax Rate (%)</label>
          <input class="tool-textarea" id="sal-tax-pct" type="number" step="any" value="18" placeholder="e.g. 18%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sal-deduct">Monthly Retirement/Insurance Deductions ($ / ₹)</label>
          <input class="tool-textarea" id="sal-deduct" type="number" step="any" value="250" placeholder="e.g. 250" />
        </div>
      </div>
      <div id="sal-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sal-res-month-net" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$3,850 / mo</span>
            <span class="stat-label">Monthly Net Take-Home Pay</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sal-res-annual-net" style="font-weight:700;">$46,200 / yr</span>
            <span class="stat-label">Annual Net Salary</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sal-res-tax-paid" style="color:#c53030;">$10,800 / yr</span>
            <span class="stat-label">Total Annual Taxes</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('sal-gross'), tEl = document.getElementById('sal-tax-pct'), dEl = document.getElementById('sal-deduct');
  const mNet = document.getElementById('sal-res-month-net'), aNet = document.getElementById('sal-res-annual-net'), aTax = document.getElementById('sal-res-tax-paid');

  function update() {
    const gross = parseFloat(gEl.value);
    const taxPct = parseFloat(tEl.value) / 100;
    const moDeduct = parseFloat(dEl.value) || 0;

    if (isNaN(gross) || isNaN(taxPct) || gross <= 0 || taxPct < 0) return;

    const annualTax = gross * taxPct;
    const annualDeduct = moDeduct * 12;
    const annualNet = Math.max(0, gross - annualTax - annualDeduct);
    const monthlyNet = annualNet / 12;

    mNet.textContent = '$' + Math.round(monthlyNet).toLocaleString() + ' / mo';
    aNet.textContent = '$' + Math.round(annualNet).toLocaleString() + ' / yr';
    aTax.textContent = '$' + Math.round(annualTax).toLocaleString() + ' / yr';
  }

  [gEl, tEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter your annual base gross salary.',
      'Enter your estimated effective tax rate percentage.',
      'Enter monthly pre-tax/post-tax retirement, 401k/EPF, and healthcare deductions.',
      'Inspect your exact monthly net take-home cash deposit.'
    ],
    benefitTitle: 'Gross vs Net Salary Understanding',
    benefitContent: 'Gross salary is total stated compensation before mandatory withholding, whereas Net Pay represents actual disposable income deposited into your bank account.',
    faqs: [{ q: 'What is effective tax rate vs marginal tax rate?', a: 'Effective tax rate is the total percentage of overall income paid in tax, while marginal tax rate applies only to your highest tax bracket.' }]
  },

  // 2. Salary Increment Percentage & Hike Calculator
  {
    slug: 'salary-increment-percentage-calculator',
    name: 'Salary Increment & Hike Calculator',
    description: 'Calculate salary appraisal hike percentage, absolute increment raise amount, and new monthly/annual compensation.',
    category: 'Finance',
    icon: 'text',
    keywords: ['salary increment calculator', 'salary hike percentage calculator', 'appraisal hike calculator', 'pay raise percentage calculator', 'calculate salary increase online'],
    order: 145,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Current Salary & Increment Percentage',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hike-current">Current Annual Salary ($ / ₹)</label>
          <input class="tool-textarea" id="hike-current" type="number" step="any" value="50000" placeholder="e.g. 50,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hike-pct">Increment Hike Rate (%)</label>
          <input class="tool-textarea" id="hike-pct" type="number" step="any" value="15" placeholder="e.g. 15%" />
        </div>
      </div>
      <div id="hike-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hike-res-new-sal" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$57,500 / yr</span>
            <span class="stat-label">New Annual Salary</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hike-res-raise" style="color:#2563eb; font-weight:700;">+$7,500 / yr</span>
            <span class="stat-label">Annual Salary Increase</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hike-res-new-month">+$625 / mo</span>
            <span class="stat-label">Monthly Gross Increase</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const curEl = document.getElementById('hike-current'), pctEl = document.getElementById('hike-pct');
  const newSalEl = document.getElementById('hike-res-new-sal'), raiseEl = document.getElementById('hike-res-raise'), moEl = document.getElementById('hike-res-new-month');

  function update() {
    const cur = parseFloat(curEl.value);
    const pct = parseFloat(pctEl.value);
    if (isNaN(cur) || isNaN(pct) || cur <= 0) return;

    const raise = cur * (pct / 100);
    const newSal = cur + raise;
    const moRaise = raise / 12;

    newSalEl.textContent = '$' + Math.round(newSal).toLocaleString() + ' / yr';
    raiseEl.textContent = '+$' + Math.round(raise).toLocaleString() + ' / yr';
    moEl.textContent = '+$' + Math.round(moRaise).toLocaleString() + ' / mo';
  }

  curEl.addEventListener('input', update);
  pctEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter current salary amount.',
      'Enter appraisal increment percentage (e.g. 15%).',
      'Inspect new annual salary and monthly gross increase.'
    ],
    benefitTitle: 'Salary Hike Evaluation',
    benefitContent: 'Calculating salary raise breakdown across annual, monthly, and per-paycheck metrics helps you budget for savings, taxes, and inflation.',
    faqs: [{ q: 'How to calculate hike percentage from old and new salary?', a: 'Hike % = ((New Salary - Old Salary) / Old Salary) × 100.' }]
  },

  // 3. Emergency Fund Savings Goal Calculator
  {
    slug: 'emergency-fund-calculator',
    name: 'Emergency Fund Savings Goal Calculator',
    description: 'Calculate your target 3-to-6 month emergency cash reserve based on fixed monthly living expenses, debt obligations, and dependents.',
    category: 'Finance',
    icon: 'text',
    keywords: ['emergency fund calculator', 'savings emergency fund target', '3 to 6 months expenses calculator', 'emergency savings buffer calculator', 'financial safety net planner'],
    order: 146,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Essential Monthly Living Expenses',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ef-rent">Rent / Mortgage ($ / ₹)</label>
          <input class="tool-textarea" id="ef-rent" type="number" step="any" value="1200" placeholder="1200" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ef-food">Groceries &amp; Utilities ($ / ₹)</label>
          <input class="tool-textarea" id="ef-food" type="number" step="any" value="600" placeholder="600" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ef-debts">Loans &amp; Insurance ($ / ₹)</label>
          <input class="tool-textarea" id="ef-debts" type="number" step="any" value="400" placeholder="400" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ef-months">Coverage Target</label>
          <select class="tool-textarea" id="ef-months">
            <option value="3">3 Months (Dual-income / stable job)</option>
            <option value="6" selected>6 Months (Recommended baseline)</option>
            <option value="9">9 Months (Single earner / family)</option>
            <option value="12">12 Months (Freelancers / business owners)</option>
          </select>
        </div>
      </div>
      <div id="ef-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ef-res-target" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$13,200</span>
            <span class="stat-label">Emergency Fund Target</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ef-res-monthly" style="font-weight:700;">$2,200 / mo</span>
            <span class="stat-label">Total Monthly Baseline Expenses</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rentEl = document.getElementById('ef-rent'), foodEl = document.getElementById('ef-food');
  const debtEl = document.getElementById('ef-debts'), moEl = document.getElementById('ef-months');
  const tgtEl = document.getElementById('ef-res-target'), baseEl = document.getElementById('ef-res-monthly');

  function update() {
    const rent = parseFloat(rentEl.value) || 0;
    const food = parseFloat(foodEl.value) || 0;
    const debt = parseFloat(debtEl.value) || 0;
    const months = parseInt(moEl.value, 10) || 6;

    const monthlyTotal = rent + food + debt;
    const targetFund = monthlyTotal * months;

    tgtEl.textContent = '$' + Math.round(targetFund).toLocaleString();
    baseEl.textContent = '$' + Math.round(monthlyTotal).toLocaleString() + ' / mo';
  }

  [rentEl, foodEl, debtEl].forEach(el => el.addEventListener('input', update));
  moEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter essential monthly housing, food, and debt expenses.',
      'Select your desired emergency fund duration (3, 6, 9, or 12 months).',
      'Inspect your recommended liquid cash safety net reserve.'
    ],
    benefitTitle: 'Why Emergency Funds Are Liquid',
    benefitContent: 'Emergency funds should be held in high-yield savings accounts or liquid money market funds to guarantee immediate accessibility without market volatility risk during job loss or medical crises.',
    faqs: [{ q: 'How many months of expenses should an emergency fund cover?', a: 'Financial planners recommend 3 to 6 months of essential living expenses for salaried employees, and 9 to 12 months for freelancers or volatile commissions.' }]
  },

  // 4. FIRE (Financial Independence Retire Early) Calculator
  {
    slug: 'fire-financial-independence-retire-early-calculator',
    name: 'FIRE (Financial Independence, Retire Early) Calculator',
    description: 'Calculate your target FIRE retirement number (25x annual expenses), Safe Withdrawal Rate (4% rule), and years to achieve financial freedom.',
    category: 'Finance',
    icon: 'text',
    keywords: ['fire calculator', 'financial independence retire early calculator', '4 percent rule calculator', 'fire number calculator', 'early retirement corpus calculator'],
    order: 147,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Annual Spending & Current Savings',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fire-expenses">Annual Living Expenses ($ / ₹)</label>
          <input class="tool-textarea" id="fire-expenses" type="number" step="any" value="40000" placeholder="e.g. 40,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fire-swr">Safe Withdrawal Rate (%)</label>
          <input class="tool-textarea" id="fire-swr" type="number" step="any" value="4.0" placeholder="4.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fire-networth">Current Invested Net Worth ($ / ₹)</label>
          <input class="tool-textarea" id="fire-networth" type="number" step="any" value="150000" placeholder="150,000" />
        </div>
      </div>
      <div id="fire-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fire-res-target" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$1,000,000</span>
            <span class="stat-label">Target FIRE Corpus (25x)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fire-res-progress" style="font-weight:700;">15.0% Complete</span>
            <span class="stat-label">Progress Towards Freedom</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fire-res-rem">$850,000</span>
            <span class="stat-label">Remaining Gap to Accumulate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const expEl = document.getElementById('fire-expenses'), swrEl = document.getElementById('fire-swr'), nwEl = document.getElementById('fire-networth');
  const tgtEl = document.getElementById('fire-res-target'), progEl = document.getElementById('fire-res-progress'), remEl = document.getElementById('fire-res-rem');

  function update() {
    const exp = parseFloat(expEl.value);
    const swr = parseFloat(swrEl.value) / 100;
    const nw = parseFloat(nwEl.value) || 0;

    if (isNaN(exp) || isNaN(swr) || exp <= 0 || swr <= 0) return;

    // FIRE Number = Annual Expenses / SWR
    const fireTarget = exp / swr;
    const gap = Math.max(0, fireTarget - nw);
    const progressPct = Math.min(100, (nw / fireTarget) * 100);

    tgtEl.textContent = '$' + Math.round(fireTarget).toLocaleString();
    progEl.textContent = progressPct.toFixed(1) + '% Complete';
    remEl.textContent = '$' + Math.round(gap).toLocaleString();
  }

  [expEl, swrEl, nwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter expected annual living expenses in retirement.',
      'Enter safe withdrawal rate (Standard Trinity Study rule is 4.0%).',
      'Enter current invested portfolio value.',
      'Inspect your target FIRE number and progress percentage.'
    ],
    benefitTitle: 'The 4% Safe Withdrawal Rule (Trinity Study)',
    benefitContent: 'The Trinity Study demonstrated that a balanced 75/25 stock-to-bond portfolio sustained a 4% annual withdrawal rate (adjusted for inflation) for over 30 years without capital depletion in 95% of historical market simulations.',
    faqs: [{ q: 'What is Lean FIRE vs Fat FIRE?', a: 'Lean FIRE covers frugal bare-bones expenses (<$40k/yr), while Fat FIRE provides an abundant lifestyle (>$100k/yr).' }]
  },

  // 5. Net Worth Balance Sheet Calculator
  {
    slug: 'net-worth-tracker-calculator',
    name: 'Personal Net Worth Calculator',
    description: 'Calculate total financial net worth by aggregating assets (cash, investments, real estate, vehicles) minus liabilities (mortgage, student loans, credit cards).',
    category: 'Finance',
    icon: 'text',
    keywords: ['net worth calculator', 'personal balance sheet calculator', 'total assets minus liabilities', 'track net worth online', 'calculate financial net worth'],
    order: 148,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Assets & Liabilities Balance Sheet',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <h3 style="margin-top:0; color:var(--green-dark);">Total Assets (+)</h3>
          <div class="control-group" style="margin-bottom:0.6rem;">
            <label class="control-label">Cash &amp; Bank Accounts ($ / ₹)</label>
            <input class="tool-textarea nw-asset" type="number" step="any" value="25000" placeholder="0" />
          </div>
          <div class="control-group" style="margin-bottom:0.6rem;">
            <label class="control-label">Investments &amp; Stocks ($ / ₹)</label>
            <input class="tool-textarea nw-asset" type="number" step="any" value="85000" placeholder="0" />
          </div>
          <div class="control-group">
            <label class="control-label">Real Estate &amp; Vehicle Value ($ / ₹)</label>
            <input class="tool-textarea nw-asset" type="number" step="any" value="250000" placeholder="0" />
          </div>
        </div>
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <h3 style="margin-top:0; color:#c53030;">Total Liabilities (-)</h3>
          <div class="control-group" style="margin-bottom:0.6rem;">
            <label class="control-label">Mortgage Balance ($ / ₹)</label>
            <input class="tool-textarea nw-liab" type="number" step="any" value="180000" placeholder="0" />
          </div>
          <div class="control-group" style="margin-bottom:0.6rem;">
            <label class="control-label">Student &amp; Auto Loans ($ / ₹)</label>
            <input class="tool-textarea nw-liab" type="number" step="any" value="15000" placeholder="0" />
          </div>
          <div class="control-group">
            <label class="control-label">Credit Cards &amp; Personal Debts ($ / ₹)</label>
            <input class="tool-textarea nw-liab" type="number" step="any" value="3000" placeholder="0" />
          </div>
        </div>
      </div>
      <div id="nw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nw-res-net" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$162,000</span>
            <span class="stat-label">Total Net Worth (Assets - Liabilities)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nw-res-tot-assets" style="font-weight:700;">$360,000</span>
            <span class="stat-label">Gross Assets</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nw-res-tot-liab" style="color:#c53030;">$198,000</span>
            <span class="stat-label">Total Debts</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const assetEls = document.querySelectorAll('.nw-asset');
  const liabEls = document.querySelectorAll('.nw-liab');
  const netEl = document.getElementById('nw-res-net'), aEl = document.getElementById('nw-res-tot-assets'), lEl = document.getElementById('nw-res-tot-liab');

  function update() {
    let totAssets = 0, totLiab = 0;
    assetEls.forEach(el => totAssets += (parseFloat(el.value) || 0));
    liabEls.forEach(el => totLiab += (parseFloat(el.value) || 0));

    const netWorth = totAssets - totLiab;

    netEl.textContent = (netWorth >= 0 ? '$' : '-$') + Math.abs(netWorth).toLocaleString();
    netEl.style.color = netWorth >= 0 ? '#22543d' : '#c53030';
    aEl.textContent = '$' + Math.round(totAssets).toLocaleString();
    lEl.textContent = '$' + Math.round(totLiab).toLocaleString();
  }

  [...assetEls, ...liabEls].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter all asset values (cash, equities, properties).',
      'Enter all debt liabilities (mortgages, loans, cards).',
      'Inspect your true net worth balance sheet.'
    ],
    benefitTitle: 'The True Financial Health Metric',
    benefitContent: 'Net worth represents your bottom-line financial standing: Net Worth = Total Assets - Total Liabilities. Tracking net worth over time is the ultimate measure of long-term wealth creation.',
    faqs: [{ q: 'Can net worth be negative?', a: 'Yes, if debt liabilities exceed accumulated assets (common among recent college graduates with student loans), net worth is negative.' }]
  }
];

tools9.forEach(createTool);
console.log('Mega pack 9 complete.');
