const { createTool } = require('./generate-curated-tools.cjs');

// Suite W: 5 Tools in Real Estate Investment, Mortgages & Property Tax
const toolsSuiteW = [
  // 1. Rental Property Capitalization Rate (Cap Rate) Calculator
  {
    slug: 'rental-property-cap-rate-calculator',
    name: 'Rental Property Capitalization Rate (Cap Rate) Calculator',
    description: 'Calculate real estate Capitalization Rate (Cap Rate = (Net Operating Income NOI / Property Value) · 100) and gross yield for commercial and residential investment properties.',
    category: 'Finance',
    icon: 'text',
    keywords: ['cap rate calculator real estate', 'capitalization rate formula', 'net operating income noi calculator', 'rental property return calculator', 'commercial real estate cap rate online'],
    order: 294,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Purchase Price, Gross Rent & Operating Expenses',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cap-price">Property Purchase Price ($ / ₹)</label>
          <input class="tool-textarea" id="cap-price" type="number" step="any" value="350000" placeholder="350,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-rent">Monthly Gross Rent ($ / ₹)</label>
          <input class="tool-textarea" id="cap-rent" type="number" step="any" value="2800" placeholder="2,800" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-exp">Annual Operating Expenses ($ / ₹)</label>
          <input class="tool-textarea" id="cap-exp" type="number" step="any" value="8400" placeholder="8,400 (Taxes, Ins, Maint)" />
        </div>
      </div>
      <div id="cap-rate-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cap-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.20%</span>
            <span class="stat-label">Capitalization Rate (Cap Rate)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-noi" style="font-weight:700;">$25,200 / yr</span>
            <span class="stat-label">Net Operating Income (NOI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-gross">9.60%</span>
            <span class="stat-label">Gross Rental Yield</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cap-price'), rEl = document.getElementById('cap-rent'), eEl = document.getElementById('cap-exp');
  const rateEl = document.getElementById('cap-res-rate'), noiEl = document.getElementById('cap-res-noi'), grossEl = document.getElementById('cap-res-gross');

  function update() {
    const price = parseFloat(pEl.value), mRent = parseFloat(rEl.value), annualExp = parseFloat(eEl.value);
    if (isNaN(price) || isNaN(mRent) || isNaN(annualExp) || price <= 0 || mRent <= 0 || annualExp < 0) return;

    const annualGross = mRent * 12;
    // NOI = Annual Gross Rent - Annual Operating Expenses
    const noi = annualGross - annualExp;
    // Cap Rate = (NOI / Price) * 100
    const capRate = (noi / price) * 100;
    const grossYield = (annualGross / price) * 100;

    rateEl.textContent = capRate.toFixed(2) + '%';
    rateEl.style.color = capRate >= 6 ? '#22543d' : (capRate >= 4 ? '#2563eb' : '#d97706');
    noiEl.textContent = '$' + Math.round(noi).toLocaleString() + ' / yr';
    grossEl.textContent = grossYield.toFixed(2) + '%';
  }

  [pEl, rEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total acquisition purchase price.',
      'Enter monthly collected rent and estimated annual operating expenses (property taxes, insurance, repairs, vacancy buffer).',
      'Inspect annual Net Operating Income (NOI), Cap Rate return, and gross yield.'
    ],
    benefitTitle: 'Unleveraged Real Estate Comparison Metric',
    benefitContent: 'Cap rate evaluates property profitability independent of financing (cash vs mortgage), allowing direct comparison across different neighborhoods and asset classes.',
    faqs: [{ q: 'What is considered a good Cap Rate?', a: 'Typically 5% to 8% in stable metropolitan residential markets, and 7% to 10%+ in commercial or higher-yield secondary markets.' }]
  },

  // 2. Gross Rent Multiplier (GRM) Property Valuation Calculator
  {
    slug: 'gross-rent-multiplier-grm-calculator',
    name: 'Gross Rent Multiplier (GRM) Real Estate Calculator',
    description: 'Calculate Gross Rent Multiplier (GRM = Property Price / Annual Gross Rent) and estimate property fair market value from rental income.',
    category: 'Finance',
    icon: 'text',
    keywords: ['gross rent multiplier calculator', 'grm calculator real estate', 'property valuation grm formula', 'annual gross rent multiplier online', 'rental property grm comparison'],
    order: 295,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Property Price & Annual Rental Income',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="grm-price">Property Price ($ / ₹)</label>
          <input class="tool-textarea" id="grm-price" type="number" step="any" value="300000" placeholder="300,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grm-annual-rent">Annual Gross Rent ($ / ₹)</label>
          <input class="tool-textarea" id="grm-annual-rent" type="number" step="any" value="36000" placeholder="36,000 ($3,000/mo)" />
        </div>
      </div>
      <div id="grm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="grm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.33</span>
            <span class="stat-label">Gross Rent Multiplier (GRM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="grm-res-years" style="font-weight:700;">8.3 Years</span>
            <span class="stat-label">Gross Rent Payback Horizon</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('grm-price'), rEl = document.getElementById('grm-annual-rent');
  const grmEl = document.getElementById('grm-res-val'), yEl = document.getElementById('grm-res-years');

  function update() {
    const price = parseFloat(pEl.value), rent = parseFloat(rEl.value);
    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) return;

    // GRM = Price / Annual Gross Rent
    const grm = price / rent;

    grmEl.textContent = grm.toFixed(2);
    yEl.textContent = grm.toFixed(1) + ' Years of Gross Rent';
  }

  pEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter property purchase price.',
      'Enter annual gross scheduled rental income.',
      'Inspect Gross Rent Multiplier.'
    ],
    benefitTitle: 'Quick Screening Tool for Multi-Family Real Estate',
    benefitContent: 'GRM provides a rapid initial screening heuristic to identify potentially undervalued apartment buildings and duplexes before conducting deep financial due diligence.',
    faqs: [{ q: 'What is a favorable GRM ratio?', a: 'A lower GRM (e.g. 6 to 8) generally indicates better cash flow relative to purchase price than a high GRM (>12).' }]
  },

  // 3. Bi-Weekly Mortgage Payment Accelerator & Interest Savings Calculator
  {
    slug: 'mortgage-biweekly-payoff-calculator',
    name: 'Bi-Weekly Mortgage Accelerator & Interest Savings Calculator',
    description: 'Calculate interest savings and years shaved off your home loan by switching from standard monthly payments to accelerated bi-weekly payments (26 half-payments per year).',
    category: 'Finance',
    icon: 'text',
    keywords: ['biweekly mortgage calculator', 'accelerated biweekly payoff calculator', 'mortgage interest savings biweekly', 'pay off 30 year mortgage faster', 'biweekly loan amortization online'],
    order: 296,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Loan Balance, Interest Rate & Term',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bw-bal">Mortgage Balance ($ / ₹)</label>
          <input class="tool-textarea" id="bw-bal" type="number" step="any" value="300000" placeholder="300,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bw-rate">Interest Rate (% APR)</label>
          <input class="tool-textarea" id="bw-rate" type="number" step="any" value="6.5" placeholder="6.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bw-years">Original Term (Years)</label>
          <input class="tool-textarea" id="bw-years" type="number" value="30" />
        </div>
      </div>
      <div id="bw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bw-res-sav" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$68,450</span>
            <span class="stat-label">Total Interest Saved</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bw-res-shaved" style="color:#2563eb; font-weight:700;">5.4 Years Shaved Off</span>
            <span class="stat-label">Mortgage Freedom Accelerated</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bw-res-payment">$948 / 2-weeks</span>
            <span class="stat-label">Bi-Weekly Payment (Half of Monthly)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('bw-bal'), rEl = document.getElementById('bw-rate'), yEl = document.getElementById('bw-years');
  const savEl = document.getElementById('bw-res-sav'), shvEl = document.getElementById('bw-res-shaved'), pmtEl = document.getElementById('bw-res-payment');

  function update() {
    const P = parseFloat(bEl.value), annualRate = parseFloat(rEl.value), years = parseFloat(yEl.value);
    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) return;

    const rMonthly = (annualRate / 100) / 12;
    const nMonthly = years * 12;

    // Monthly payment M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = (P * (rMonthly * Math.pow(1 + rMonthly, nMonthly))) / (Math.pow(1 + rMonthly, nMonthly) - 1);
    const totalInterestMonthly = (monthlyPayment * nMonthly) - P;

    const biweeklyPayment = monthlyPayment / 2;
    const rBiweekly = (annualRate / 100) / 26;

    // Simulate accelerated biweekly amortization (26 payments/yr = 13 monthly payments/yr)
    let balance = P;
    let biweeklyPeriods = 0;
    let totalInterestBiweekly = 0;

    while (balance > 0 && biweeklyPeriods < 3000) {
      const interest = balance * rBiweekly;
      totalInterestBiweekly += interest;
      const principal = biweeklyPayment - interest;
      balance -= principal;
      biweeklyPeriods++;
    }

    const biweeklyYears = biweeklyPeriods / 26;
    const yearsShaved = Math.max(0, years - biweeklyYears);
    const interestSaved = Math.max(0, totalInterestMonthly - totalInterestBiweekly);

    savEl.textContent = '$' + Math.round(interestSaved).toLocaleString();
    shvEl.textContent = yearsShaved.toFixed(1) + ' Years Shaved Off';
    pmtEl.textContent = '$' + Math.round(biweeklyPayment).toLocaleString() + ' / 2-weeks';
  }

  [bEl, rEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mortgage loan balance, interest rate (% APR), and loan term in years.',
      'Inspect total compound interest saved and how many years earlier your mortgage is paid off.'
    ],
    benefitTitle: 'The Magic of 13 Monthly Payments a Year',
    benefitContent: 'Because there are 52 weeks in a year, making a half-payment every two weeks results in 26 half-payments — exactly equivalent to making 13 full monthly payments every year directly reducing principal.',
    faqs: [{ q: 'Does biweekly payment require bank permission?', a: 'Many banks offer automated accelerated bi-weekly programs, or you can simply add 1/12th extra principal to each regular monthly payment.' }]
  },

  // 4. Inflation-Adjusted Future Value & Purchasing Power Calculator
  {
    slug: 'inflation-adjusted-future-value-calculator',
    name: 'Inflation-Adjusted Purchasing Power & Real Value Calculator',
    description: 'Calculate the real purchasing power of future cash and retirement savings after factoring in annual inflation rate compounding.',
    category: 'Finance',
    icon: 'text',
    keywords: ['inflation adjusted future value calculator', 'purchasing power inflation calculator', 'real value of money calculator online', 'inflation depreciation formula', 'future purchasing power calculator'],
    order: 297,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Nominal Amount, Inflation Rate & Years',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="inf-amount">Nominal Cash Amount ($ / ₹)</label>
          <input class="tool-textarea" id="inf-amount" type="number" step="any" value="100000" placeholder="100,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inf-rate">Annual Inflation Rate (%)</label>
          <input class="tool-textarea" id="inf-rate" type="number" step="any" value="3.5" placeholder="3.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inf-years">Time Horizon (Years)</label>
          <input class="tool-textarea" id="inf-years" type="number" value="20" />
        </div>
      </div>
      <div id="inf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="inf-res-real" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$50,257</span>
            <span class="stat-label">Real Purchasing Power in Today\'s Money</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="inf-res-loss" style="color:#c53030; font-weight:700;">-49.74% Lost</span>
            <span class="stat-label">Loss of Purchasing Value</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('inf-amount'), rEl = document.getElementById('inf-rate'), yEl = document.getElementById('inf-years');
  const realEl = document.getElementById('inf-res-real'), lossEl = document.getElementById('inf-res-loss');

  function update() {
    const amount = parseFloat(aEl.value), ratePct = parseFloat(rEl.value), years = parseFloat(yEl.value);
    if (isNaN(amount) || isNaN(ratePct) || isNaN(years) || amount <= 0 || ratePct < 0 || years <= 0) return;

    // Real Value = Nominal / (1 + r)^n
    const r = ratePct / 100;
    const realValue = amount / Math.pow(1 + r, years);
    const lossPct = ((amount - realValue) / amount) * 100;

    realEl.textContent = '$' + Math.round(realValue).toLocaleString();
    lossEl.textContent = '-' + lossPct.toFixed(2) + '% Lost to Inflation';
  }

  [aEl, rEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter future nominal cash amount.',
      'Enter projected annual inflation rate (e.g. historical 3.0% to 3.5%).',
      'Enter time horizon in years.',
      'Inspect equivalent real purchasing power.'
    ],
    benefitTitle: 'The Silent Erosion of Uninvested Cash',
    benefitContent: 'At a modest 3.5% annual inflation rate, the purchasing power of cash in a zero-interest checking account is cut in half every 20 years.',
    faqs: [{ q: 'What inflation hedge protects long-term purchasing power?', a: 'Diversified equity index funds (S&P 500), real estate, and inflation-protected treasury bonds (TIPS).' }]
  },

  // 5. Property Tax & Millage Rate Estimator
  {
    slug: 'property-tax-millage-rate-calculator',
    name: 'Property Tax & Millage Rate Calculator',
    description: 'Calculate annual real estate property tax (Property Tax = Assessed Value × (Millage Rate / 1000)), monthly tax escrow, and effective tax rate.',
    category: 'Finance',
    icon: 'text',
    keywords: ['property tax calculator', 'millage rate property tax calculator', 'monthly property tax escrow calculator', 'assessed value property tax formula', 'real estate tax mill rate online'],
    order: 298,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Assessed Property Value & Millage Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pt-val">Assessed Property Value ($ / ₹)</label>
          <input class="tool-textarea" id="pt-val" type="number" step="any" value="280000" placeholder="280,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-mill">Total Millage Rate (Mills)</label>
          <input class="tool-textarea" id="pt-mill" type="number" step="any" value="18.5" placeholder="18.5 Mills (1.85%)" />
        </div>
      </div>
      <div id="pt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pt-res-annual" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$5,180 / yr</span>
            <span class="stat-label">Annual Property Tax</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-month" style="font-weight:700;">$431.67 / mo</span>
            <span class="stat-label">Monthly Mortgage Escrow</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-eff">1.85%</span>
            <span class="stat-label">Effective Tax Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const valEl = document.getElementById('pt-val'), millEl = document.getElementById('pt-mill');
  const aResEl = document.getElementById('pt-res-annual'), mResEl = document.getElementById('pt-res-month'), effEl = document.getElementById('pt-res-eff');

  function update() {
    const val = parseFloat(valEl.value), mills = parseFloat(millEl.value);
    if (isNaN(val) || isNaN(mills) || val <= 0 || mills <= 0) return;

    // 1 mill = $1 per $1,000 of assessed value = 0.001
    const annualTax = val * (mills / 1000);
    const monthlyEscrow = annualTax / 12;
    const effectivePct = (annualTax / val) * 100;

    aResEl.textContent = '$' + Math.round(annualTax).toLocaleString() + ' / yr';
    mResEl.textContent = '$' + monthlyEscrow.toFixed(2) + ' / mo';
    effEl.textContent = effectivePct.toFixed(2) + '%';
  }

  valEl.addEventListener('input', update);
  millEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter county/municipal assessed taxable property value.',
      'Enter total millage rate (mills) (e.g. 18.5 mills = $18.50 per $1,000 value).',
      'Inspect annual property tax bill and monthly mortgage escrow payment.'
    ],
    benefitTitle: 'Understanding Millage Rates in Municipal Taxation',
    benefitContent: 'One mill represents one-tenth of one cent ($0.001). Local governments sum county, school district, and municipal emergency services millages to fund public infrastructure.',
    faqs: [{ q: 'What is 20 mills on a $300,000 assessed home?', a: '$300,000 × (20 / 1000) = $6,000 annual property tax.' }]
  }
];

toolsSuiteW.forEach(createTool);
console.log('Suite W complete: 5 tools created.');
