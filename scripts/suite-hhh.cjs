const { createTool } = require('./generate-curated-tools.cjs');

// Suite HHH: 5 Tools in Portfolio Performance, Sharpe/Sortino/Treynor Ratios & Black-Scholes to reach 610 tools
const toolsSuiteHHH = [
  // 1. Sharpe Ratio Portfolio Risk-Adjusted Return Calculator
  {
    slug: 'sharpe-ratio-portfolio-risk-calculator',
    name: 'Sharpe Ratio (Risk-Adjusted Portfolio Return) Calculator',
    description: 'Calculate the Sharpe Ratio (S = (R_p - R_f) / σ_p) to evaluate investment portfolio excess return generated per unit of total volatility risk.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['sharpe ratio calculator', 'risk adjusted return formula', 'portfolio volatility sharpe ratio online', 'excess return risk free rate calculator', 'william sharpe portfolio performance online'],
    order: 483,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Portfolio Return R_p (%), Risk-Free Rate R_f (%) & Volatility σ (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="shp-rp">Portfolio Return R_p (%)</label>
          <input class="tool-textarea" id="shp-rp" type="number" step="any" value="14.5" placeholder="14.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="shp-rf">Risk-Free Rate R_f (%)</label>
          <input class="tool-textarea" id="shp-rf" type="number" step="any" value="4.5" placeholder="4.5% (US 10-Yr Treasury)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="shp-vol">Annual Volatility σ (%)</label>
          <input class="tool-textarea" id="shp-vol" type="number" step="any" value="12.0" placeholder="12.0% Std Dev" />
        </div>
      </div>
      <div id="shp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="shp-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.833</span>
            <span class="stat-label">Sharpe Ratio ((R_p - R_f) / σ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="shp-res-eval" style="color:var(--green-dark); font-weight:700;">Good Risk-Adjusted Performance</span>
            <span class="stat-label">Performance Grade</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('shp-rp'), rfEl = document.getElementById('shp-rf'), vEl = document.getElementById('shp-vol');
  const rResEl = document.getElementById('shp-res-ratio'), eResEl = document.getElementById('shp-res-eval');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), vol = parseFloat(vEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(vol) || vol <= 0) return;

    // Sharpe Ratio = (Rp - Rf) / vol
    const excess = Rp - Rf;
    const sharpe = excess / vol;

    rResEl.textContent = sharpe.toFixed(3) + ' (Excess: +' + excess.toFixed(1) + '%)';

    if (sharpe >= 2.0) {
      eResEl.textContent = 'Exceptional (> 2.0: Top-Tier Hedge Fund Alpha)';
      eResEl.style.color = '#22543d';
    } else if (sharpe >= 1.0) {
      eResEl.textContent = 'Very Good (1.0 to 2.0: Strong Outperformance)';
      eResEl.style.color = '#22543d';
    } else if (sharpe >= 0.5) {
      eResEl.textContent = 'Good (0.5 to 1.0: Acceptable Market Benchmark)';
      eResEl.style.color = '#2563eb';
    } else if (sharpe > 0) {
      eResEl.textContent = 'Sub-Optimal (< 0.5: Insufficient Return for Risk Taken)';
      eResEl.style.color = '#d97706';
    } else {
      eResEl.textContent = 'Negative Return (Underperformed Risk-Free Cash)';
      eResEl.style.color = '#c53030';
    }
  }

  [rpEl, rfEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter expected or annualized portfolio return percentage ($R_p$).',
      'Enter benchmark risk-free Treasury yield rate ($R_f$).',
      'Enter annualized portfolio standard deviation volatility ($\sigma_p$).',
      'Inspect Sharpe Ratio and fund risk-adjusted performance grading.'
    ],
    benefitTitle: 'William F. Sharpe\'s 1966 Nobel Memorial Metric',
    benefitContent: 'The Sharpe ratio measures how much additional return an investor receives for enduring volatility; a higher ratio indicates greater returns achieved with tighter risk control.',
    faqs: [{ q: 'What is considered a good Sharpe ratio?', a: 'A Sharpe ratio above 1.0 is considered good, above 2.0 is very good, and above 3.0 is considered excellent.' }]
  },

  // 2. Sortino Ratio Downside Risk Calculator
  {
    slug: 'sortino-ratio-downside-risk-calculator',
    name: 'Sortino Ratio (Downside Risk & Semi-Deviation) Calculator',
    description: 'Calculate the Sortino Ratio (S = (R_p - R_f) / σ_downside) which penalizes only harmful downside volatility while ignoring upside gains.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['sortino ratio calculator', 'sortino vs sharpe ratio formula', 'downside deviation sortino calculator', 'target downside risk calculator online', 'asymmetric volatility sortino ratio'],
    order: 484,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Portfolio Return R_p (%), Risk-Free Rate R_f (%) & Downside Deviation σ_d (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sor-rp">Portfolio Return R_p (%)</label>
          <input class="tool-textarea" id="sor-rp" type="number" step="any" value="16.0" placeholder="16.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sor-rf">Target Return R_f (%)</label>
          <input class="tool-textarea" id="sor-rf" type="number" step="any" value="4.5" placeholder="4.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sor-dd">Downside Deviation σ_d (%)</label>
          <input class="tool-textarea" id="sor-dd" type="number" step="any" value="7.5" placeholder="7.5% Semi-Deviation" />
        </div>
      </div>
      <div id="sor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sor-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.533</span>
            <span class="stat-label">Sortino Ratio ((R_p - R_f) / σ_d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sor-res-eval" style="color:var(--green-dark); font-weight:700;">High Downside Protection Efficiency</span>
            <span class="stat-label">Downside Risk Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('sor-rp'), rfEl = document.getElementById('sor-rf'), ddEl = document.getElementById('sor-dd');
  const rResEl = document.getElementById('sor-res-ratio'), eResEl = document.getElementById('sor-res-eval');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), dd = parseFloat(ddEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(dd) || dd <= 0) return;

    // Sortino Ratio = (Rp - Rf) / sigma_downside
    const excess = Rp - Rf;
    const sortino = excess / dd;

    rResEl.textContent = sortino.toFixed(3);

    if (sortino >= 2.0) {
      eResEl.textContent = 'Excellent (> 2.0: Minimal Drawdown with High Alpha)';
      eResEl.style.color = '#22543d';
    } else if (sortino >= 1.2) {
      eResEl.textContent = 'Strong Performance (1.2 to 2.0: High Downside Protection)';
      eResEl.style.color = '#22543d';
    } else if (sortino >= 0.7) {
      eResEl.textContent = 'Moderate Performance (0.7 to 1.2)';
      eResEl.style.color = '#2563eb';
    } else {
      eResEl.textContent = 'High Downside Tail Risk Exposure';
      eResEl.style.color = '#c53030';
    }
  }

  [rpEl, rfEl, ddEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter portfolio annualized return percentage ($R_p$).',
      'Enter target minimum acceptable return or risk-free rate ($R_f$).',
      'Enter downside semi-deviation ($\sigma_d$) calculated exclusively from negative return periods.',
      'Inspect Sortino Ratio performance.'
    ],
    benefitTitle: 'Frank Sortino\'s Downside Asymmetry Focus',
    benefitContent: 'While Sharpe ratio penalizes large upward spikes as "volatility", the Sortino ratio isolates only negative downside drawdowns, providing a much more accurate evaluation for growth strategies with positive skew.',
    faqs: [{ q: 'Why is Sortino preferred over Sharpe for growth stocks and crypto?', a: 'Because large upward jumps are beneficial to investors, the Sortino ratio does not penalize positive upside volatility.' }]
  },

  // 3. Treynor Ratio Systematic Market Beta Risk Calculator
  {
    slug: 'treynor-ratio-systematic-risk-calculator',
    name: 'Treynor Ratio (Systematic Market Beta Risk) Calculator',
    description: 'Calculate the Treynor Ratio (T = (R_p - R_f) / β_p) to measure excess portfolio return earned per unit of non-diversifiable systematic market risk (Beta).',
    category: 'Finance',
    icon: 'chart',
    keywords: ['treynor ratio calculator', 'systematic risk treynor formula', 'treynor ratio beta excess return online', 'jack treynor portfolio performance calculator', 'capm treynor measure online'],
    order: 485,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Portfolio Return R_p (%), Risk-Free Rate R_f (%) & Market Beta (β)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="trn-rp">Portfolio Return R_p (%)</label>
          <input class="tool-textarea" id="trn-rp" type="number" step="any" value="15.0" placeholder="15.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trn-rf">Risk-Free Rate R_f (%)</label>
          <input class="tool-textarea" id="trn-rf" type="number" step="any" value="4.5" placeholder="4.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trn-beta">Portfolio Beta (β)</label>
          <input class="tool-textarea" id="trn-beta" type="number" step="0.05" value="1.15" placeholder="1.15 (vs S&P 500)" />
        </div>
      </div>
      <div id="trn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="trn-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9.13%</span>
            <span class="stat-label">Treynor Ratio ((R_p - R_f) / β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="trn-res-excess" style="font-weight:700;">+10.50% Excess Return</span>
            <span class="stat-label">Excess Return over Risk-Free Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('trn-rp'), rfEl = document.getElementById('trn-rf'), bEl = document.getElementById('trn-beta');
  const rResEl = document.getElementById('trn-res-ratio'), exResEl = document.getElementById('trn-res-excess');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), beta = parseFloat(bEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(beta) || beta === 0) return;

    // Treynor Ratio = (Rp - Rf) / beta
    const excess = Rp - Rf;
    const treynor = excess / beta;

    rResEl.textContent = treynor.toFixed(2) + '% per Unit of Beta';
    exResEl.textContent = '+' + excess.toFixed(2) + '% Excess Return (β = ' + beta.toFixed(2) + ')';
  }

  [rpEl, rfEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter portfolio annualized return percentage ($R_p$).',
      'Enter benchmark risk-free Treasury rate ($R_f$).',
      'Enter portfolio systematic market sensitivity Beta ($\beta$).',
      'Inspect Treynor Ratio excess return per unit of non-diversifiable market risk.'
    ],
    benefitTitle: 'Jack Treynor\'s 1965 Systematic Risk Metric',
    benefitContent: 'For well-diversified portfolios where unsystematic company-specific risk has been eliminated, the Treynor ratio evaluates how efficiently the fund converts market beta exposure into excess alpha.',
    faqs: [{ q: 'When is Treynor ratio better than Sharpe ratio?', a: 'Treynor is preferred when evaluating a sub-portfolio that is part of a broader well-diversified total fund.' }]
  },

  // 4. Capital Asset Pricing Model (CAPM) Expected Return Calculator
  {
    slug: 'capm-expected-return-beta-calculator',
    name: 'Capital Asset Pricing Model (CAPM) Expected Return Calculator',
    description: 'Calculate expected equity asset return (E[R_i] = R_f + β_i · (E[R_m] - R_f)) and Market Risk Premium (MRP) using the Capital Asset Pricing Model (CAPM).',
    category: 'Finance',
    icon: 'chart',
    keywords: ['capm calculator', 'capital asset pricing model formula', 'expected return beta formula online', 'cost of equity capm calculator', 'market risk premium calculator online'],
    order: 486,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Risk-Free Rate R_f (%), Asset Beta (β) & Expected Market Return E[R_m] (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cpm-rf">Risk-Free Rate R_f (%)</label>
          <input class="tool-textarea" id="cpm-rf" type="number" step="any" value="4.25" placeholder="4.25% (10-Yr US Treasury)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpm-beta">Asset Beta (β)</label>
          <input class="tool-textarea" id="cpm-beta" type="number" step="0.05" value="1.20" placeholder="1.20 (e.g. Apple / Tech)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpm-rm">Market Return E[R_m] (%)</label>
          <input class="tool-textarea" id="cpm-rm" type="number" step="any" value="10.0" placeholder="10.0% (S&P 500 Historical)" />
        </div>
      </div>
      <div id="cpm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cpm-res-er" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.15%</span>
            <span class="stat-label">Expected Asset Return E[R_i] / Cost of Equity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpm-res-mrp" style="font-weight:700;">5.75% Market Risk Premium</span>
            <span class="stat-label">Equity Risk Premium (E[R_m] - R_f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rfEl = document.getElementById('cpm-rf'), bEl = document.getElementById('cpm-beta'), rmEl = document.getElementById('cpm-rm');
  const erResEl = document.getElementById('cpm-res-er'), mrpResEl = document.getElementById('cpm-res-mrp');

  function update() {
    const Rf = parseFloat(rfEl.value), beta = parseFloat(bEl.value), Rm = parseFloat(rmEl.value);
    if (isNaN(Rf) || isNaN(beta) || isNaN(Rm)) return;

    // Market Risk Premium MRP = Rm - Rf
    const mrp = Rm - Rf;
    // CAPM: E[R] = Rf + beta * (Rm - Rf)
    const expectedReturn = Rf + (beta * mrp);

    erResEl.textContent = expectedReturn.toFixed(2) + '% Expected Return';
    mrpResEl.textContent = mrp.toFixed(2) + '% Market Risk Premium (Equity Risk: ' + (beta * mrp).toFixed(2) + '%)';
  }

  [rfEl, bEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter risk-free rate $R_f$ (e.g. 10-year government bond yield).',
      'Enter company/stock Beta coefficient $\beta$ (measure of volatility relative to the broad market).',
      'Enter expected long-term broad stock market return $E[R_m]$ (typically 9-10% for S&P 500).',
      'Inspect expected asset return (Cost of Equity in corporate WACC calculations).'
    ],
    benefitTitle: 'Treynor, Sharpe, Lintner & Mossin\'s 1964 CAPM',
    benefitContent: 'CAPM establishes the fundamental financial pricing rule: the expected return of an asset equals the risk-free rate plus a risk premium proportional to its systematic market beta covariance ($\beta = \text{Cov}(R_i, R_m)/\text{Var}(R_m)$).',
    faqs: [{ q: 'What is the expected return for a stock with Beta = 1.5, Rf = 4%, and Market Return = 10%?', a: 'E[R] = 4% + 1.5 × (10% - 4%) = 4% + 9% = 13.0%.' }]
  },

  // 5. Black-Scholes European Call Option Pricing Calculator
  {
    slug: 'black-scholes-european-call-option-calculator',
    name: 'Black-Scholes European Call & Put Option Pricing Calculator',
    description: 'Calculate theoretical fair market price of European call options (C = S₀ · N(d₁) - K · e^(-rT) · N(d₂)) and put options from stock price, strike price, volatility, and expiration time.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['black scholes option calculator', 'black scholes call put formula online', 'option pricing model calculator', 'implied volatility black scholes online', 'd1 d2 black scholes formula calculator'],
    order: 487,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Stock Price S₀ ($), Strike Price K ($), Time T (Years), Volatility σ & Rate r',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bs-s">Stock Price S₀ ($)</label>
          <input class="tool-textarea" id="bs-s" type="number" step="any" value="100.0" placeholder="$100.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-k">Strike Price K ($)</label>
          <input class="tool-textarea" id="bs-k" type="number" step="any" value="100.0" placeholder="$100.00 (ATM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-t">Time T (Years)</label>
          <input class="tool-textarea" id="bs-t" type="number" step="0.01" value="0.25" placeholder="0.25 Yrs (3 Months)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-vol">Volatility σ (%)</label>
          <input class="tool-textarea" id="bs-vol" type="number" step="any" value="25.0" placeholder="25.0% Volatility" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-r">Risk-Free Rate r (%)</label>
          <input class="tool-textarea" id="bs-r" type="number" step="any" value="5.0" placeholder="5.0%" />
        </div>
      </div>
      <div id="bs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bs-res-call" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$5.60 Call Price</span>
            <span class="stat-label">Theoretical Call Value (C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bs-res-put" style="color:#2563eb; font-weight:800; font-size:1.6rem;">$4.36 Put Price</span>
            <span class="stat-label">Theoretical Put Value (P)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('bs-s'), kEl = document.getElementById('bs-k');
  const tEl = document.getElementById('bs-t'), volEl = document.getElementById('bs-vol'), rEl = document.getElementById('bs-r');
  const cResEl = document.getElementById('bs-res-call'), pResEl = document.getElementById('bs-res-put');

  // Standard Normal Cumulative Distribution Function N(x) approximation
  function stdNormCdf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x) / Math.SQRT2;
    const t = 1.0 / (1.0 + p * absX);
    const erf = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return 0.5 * (1.0 + sign * erf);
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const T = parseFloat(tEl.value), volPct = parseFloat(volEl.value), rPct = parseFloat(rEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(T) || isNaN(volPct) || isNaN(rPct) || S <= 0 || K <= 0 || T <= 0 || volPct <= 0) return;

    const sigma = volPct / 100;
    const r = rPct / 100;

    // d1 = ( ln(S/K) + (r + sigma^2 / 2) * T ) / ( sigma * sqrt(T) )
    const d1 = (Math.log(S / K) + (r + (Math.pow(sigma, 2) / 2)) * T) / (sigma * Math.sqrt(T));
    // d2 = d1 - sigma * sqrt(T)
    const d2 = d1 - (sigma * Math.sqrt(T));

    const Nd1 = stdNormCdf(d1);
    const Nd2 = stdNormCdf(d2);
    const N_minus_d1 = stdNormCdf(-d1);
    const N_minus_d2 = stdNormCdf(-d2);

    // Call = S * Nd1 - K * exp(-r*T) * Nd2
    const callPrice = (S * Nd1) - (K * Math.exp(-r * T) * Nd2);
    // Put = K * exp(-r*T) * N(-d2) - S * N(-d1)
    const putPrice = (K * Math.exp(-r * T) * N_minus_d2) - (S * N_minus_d1);

    cResEl.textContent = '$' + callPrice.toFixed(2) + ' Call (Delta = ' + Nd1.toFixed(3) + ')';
    pResEl.textContent = '$' + putPrice.toFixed(2) + ' Put (Delta = ' + (Nd1 - 1).toFixed(3) + ')';
  }

  [sEl, kEl, tEl, volEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter underlying stock spot price S₀ ($).',
      'Enter option contract strike strike price K ($).',
      'Enter expiration time duration T in years (e.g. 0.25 for 3 months).',
      'Enter annualized volatility percentage σ (%) and risk-free interest rate r (%).',
      'Inspect theoretical Black-Scholes call/put fair values and option Delta hedging sensitivities.'
    ],
    benefitTitle: 'Fischer Black, Myron Scholes & Robert Merton (1997 Nobel)',
    benefitContent: 'The Black-Scholes-Merton differential equation revolutionized modern financial derivatives by constructing a riskless dynamically rebalanced delta hedge, pricing options without subjective directional market bias.',
    faqs: [{ q: 'What is Option Delta in Black-Scholes?', a: 'For a call option, Delta equals N(d₁), representing the rate of change of option price per $1 move in underlying stock price (also approximate probability of expiring in-the-money).' }]
  }
];

toolsSuiteHHH.forEach(createTool);
console.log('Suite HHH complete: 5 tools created.');
