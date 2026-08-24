const { createTool } = require('./generate-curated-tools.cjs');

// Pack 34: 25 Economics, Geotechnical, Environmental & Energy Systems Student Calculators (Tools 1101 to 1125)
const pack34Tools = [
  // 1. Cobb-Douglas Production Function & Marginal Product of Capital/Labor Calculator
  {
    slug: 'cobb-douglas-production-function-marginal-product-calculator',
    name: 'Cobb-Douglas Production Function (Y = A·K^α·L^β) & Marginal Product Calculator',
    description: 'Calculate macroeconomic economic output (Y = A · K^α · L^β), Marginal Product of Capital (MPK = α·Y/K), Marginal Product of Labor (MPL = β·Y/L), and Returns to Scale (α + β) for microeconomics and macroeconomics courses.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['cobb douglas calculator', 'production function formula y equals a k to alpha l to beta online', 'marginal product of capital labor calculator mpk mpl', 'returns to scale constant increasing decreasing cobb douglas calculator', 'economics cobb douglas production model online'],
    order: 982,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Factor Productivity A, Capital Stock K, Labor L & Output Elasticities (α, β)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cd-a">Productivity A</label>
          <input class="tool-textarea" id="cd-a" type="number" step="0.5" value="2.0" placeholder="2.0 (TFP)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-k">Capital K</label>
          <input class="tool-textarea" id="cd-k" type="number" step="50" value="100" placeholder="100 Units" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-l">Labor L</label>
          <input class="tool-textarea" id="cd-l" type="number" step="50" value="400" placeholder="400 Workers" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-alpha">Alpha (α)</label>
          <input class="tool-textarea" id="cd-alpha" type="number" step="0.05" value="0.30" placeholder="0.30 (Capital Share)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-beta">Beta (β)</label>
          <input class="tool-textarea" id="cd-beta" type="number" step="0.05" value="0.70" placeholder="0.70 (Labor Share)" />
        </div>
      </div>
      <div id="cd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cd-res-y" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Output Y = 527.80 Units</span>
            <span class="stat-label">Total Economic Output (Y = A · K^α · L^β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cd-res-mp" style="color:var(--green-dark); font-weight:700;">MPK = 1.58 (Capital Yield) | MPL = 0.92 (Labor Wage) | Constant Returns to Scale (α+β = 1.00)</span>
            <span class="stat-label">Marginal Productivity of Factor Inputs</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('cd-a'), kEl = document.getElementById('cd-k'), lEl = document.getElementById('cd-l');
  const alEl = document.getElementById('cd-alpha'), btEl = document.getElementById('cd-beta');
  const yResEl = document.getElementById('cd-res-y'), mpResEl = document.getElementById('cd-res-mp');

  function update() {
    const A = parseFloat(aEl.value), K = parseFloat(kEl.value), L = parseFloat(lEl.value);
    const alpha = parseFloat(alEl.value), beta = parseFloat(btEl.value);

    if (isNaN(A) || isNaN(K) || isNaN(L) || isNaN(alpha) || isNaN(beta) || A <= 0 || K <= 0 || L <= 0 || alpha <= 0 || beta <= 0) return;

    // Y = A * K^alpha * L^beta
    const Y = A * Math.pow(K, alpha) * Math.pow(L, beta);

    // Marginal Product of Capital: MPK = alpha * Y / K
    const MPK = (alpha * Y) / K;
    // Marginal Product of Labor: MPL = beta * Y / L
    const MPL = (beta * Y) / L;

    const rts = alpha + beta;
    let rtsStr = '';
    if (Math.abs(rts - 1.0) < 0.01) rtsStr = 'Constant Returns to Scale (CRS: α + β = 1.00)';
    else if (rts > 1.0) rtsStr = 'Increasing Returns to Scale (IRS: α + β = ' + rts.toFixed(2) + ' > 1.0)';
    else rtsStr = 'Decreasing Returns to Scale (DRS: α + β = ' + rts.toFixed(2) + ' < 1.0)';

    yResEl.textContent = 'Output Y = ' + Y.toFixed(2) + ' Units';
    mpResEl.textContent = 'MPK = ' + MPK.toFixed(2) + ' | MPL = ' + MPL.toFixed(2) + ' | ' + rtsStr;
  }

  [aEl, kEl, lEl, alEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Total Factor Productivity (TFP) parameter A.',
      'Enter physical Capital investment stock K and Labor workforce hours L.',
      'Enter capital output elasticity $\alpha$ and labor output elasticity $\beta$.',
      'Inspect total economic output Y, factor marginal products ($MPK, MPL$), and Returns to Scale ($\alpha + \beta$).'
    ],
    benefitTitle: 'Paul Douglas & Charles Cobb 1928 Macroeconomic Production Function',
    benefitContent: 'The Cobb-Douglas production function models how capital and labor inputs combine under diminishing marginal returns; when $\alpha + \beta = 1$, doubling all inputs exactly doubles output, establishing the benchmark constant returns to scale neoclassical growth model.',
    faqs: [{ q: 'What happens if alpha + beta is greater than 1?', a: 'The firm enjoys economies of scale (Increasing Returns to Scale), meaning output grows faster than proportional input growth.' }]
  },

  // 2. Lorenz Curve & Gini Coefficient Income Inequality Calculator
  {
    slug: 'lorenz-curve-gini-coefficient-income-inequality-calculator',
    name: 'Lorenz Curve & Gini Coefficient (G = A / (A + B)) Income Inequality Calculator',
    description: 'Calculate income inequality Gini Coefficient (G = 0.0 perfect equality to 1.0 perfect inequality) from quintile income distribution shares using Lorenz Curve trapezoidal integration for economics and sociology.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['gini coefficient calculator', 'lorenz curve formula income inequality calculator online', 'income quintiles gini index calculator economics', 'wealth distribution gini coefficient solver', 'world bank gini index inequality calculator online'],
    order: 983,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'National Income Quintile Shares (% of Total Income for Bottom 20% to Top 20%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gn-q1">Q1 (Lowest 20%)</label>
          <input class="tool-textarea" id="gn-q1" type="number" step="0.5" value="4.0" placeholder="4.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gn-q2">Q2 (Second 20%)</label>
          <input class="tool-textarea" id="gn-q2" type="number" step="0.5" value="9.0" placeholder="9.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gn-q3">Q3 (Third 20%)</label>
          <input class="tool-textarea" id="gn-q3" type="number" step="0.5" value="15.0" placeholder="15.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gn-q4">Q4 (Fourth 20%)</label>
          <input class="tool-textarea" id="gn-q4" type="number" step="0.5" value="23.0" placeholder="23.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gn-q5">Q5 (Top 20%)</label>
          <input class="tool-textarea" id="gn-q5" type="number" step="0.5" value="49.0" placeholder="49.0%" />
        </div>
      </div>
      <div id="gn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gn-res-gini" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gini Index = 0.432 (High Inequality)</span>
            <span class="stat-label">Gini Coefficient (0.00 = Equal, 1.00 = Max Inequality)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gn-res-desc" style="color:var(--green-dark); font-weight:700;">Palma Ratio = 3.77 (Top 10% vs Bottom 40%) | Area under Lorenz Curve B = 0.284</span>
            <span class="stat-label">Lorenz Curve Integration & Palma Ratio Inequality Measure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q1El = document.getElementById('gn-q1'), q2El = document.getElementById('gn-q2');
  const q3El = document.getElementById('gn-q3'), q4El = document.getElementById('gn-q4'), q5El = document.getElementById('gn-q5');
  const gnResEl = document.getElementById('gn-res-gini'), dsResEl = document.getElementById('gn-res-desc');

  function update() {
    const q1 = parseFloat(q1El.value) || 0, q2 = parseFloat(q2El.value) || 0;
    const q3 = parseFloat(q3El.value) || 0, q4 = parseFloat(q4El.value) || 0, q5 = parseFloat(q5El.value) || 0;

    const total = q1 + q2 + q3 + q4 + q5;
    if (total <= 0) return;

    // Cumulative income shares (Lorenz points L0, L1, L2, L3, L4, L5):
    const L0 = 0.0;
    const L1 = q1 / total;
    const L2 = (q1 + q2) / total;
    const L3 = (q1 + q2 + q3) / total;
    const L4 = (q1 + q2 + q3 + q4) / total;
    const L5 = 1.0;

    // Area B under Lorenz curve via trapezoidal rule (dx = 0.20):
    const B = 0.20 * (0.5 * L0 + L1 + L2 + L3 + L4 + 0.5 * L5);

    // Gini G = 1 - 2 * B
    const Gini = Math.max(0, Math.min(1.0, 1.0 - (2.0 * B)));

    // Palma ratio = Top 10% (approx q5) / Bottom 40% (q1 + q2)
    const palma = (q1 + q2) > 0 ? (q5 / (q1 + q2)) : 0;

    let tier = '';
    let color = '#22543d';

    if (Gini < 0.30) {
      tier = 'LOW INEQUALITY (Gini < 0.30: Nordic Model - Sweden, Denmark, Norway)';
      color = '#22543d';
    } else if (Gini <= 0.40) {
      tier = 'MODERATE INEQUALITY (Gini 0.30 - 0.40: Western Europe, Canada, Australia)';
      color = '#2563eb';
    } else if (Gini <= 0.50) {
      tier = 'HIGH INEQUALITY (Gini 0.40 - 0.50: United States, India, Mexico)';
      color = '#ea580c';
    } else {
      tier = 'EXTREME INEQUALITY (Gini > 0.50: South Africa, Brazil)';
      color = '#c53030';
    }

    gnResEl.textContent = 'Gini Index = ' + Gini.toFixed(3) + ' (' + tier.split(' (')[0] + ')';
    gnResEl.style.color = color;
    dsResEl.textContent = 'Palma Ratio = ' + palma.toFixed(2) + ' | Lorenz Area B = ' + B.toFixed(3) + ' | ' + tier;
    dsResEl.style.color = color;
  }

  [q1El, q2El, q3El, q4El, q5El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter income shares (% of total national GDP) for each population quintile from bottom 20% (Q1) to top 20% (Q5).',
      'Inspect calculated Gini Coefficient ($G = 1 - 2B$) and international inequality classification.'
    ],
    benefitTitle: 'Corrado Gini 1912 Statistical Dispersion Metric',
    benefitContent: 'The Gini coefficient measures the gap between the actual Lorenz curve and the theoretical 45-degree line of perfect equality; it is the definitive global benchmark published by the World Bank and UN to track economic wealth distribution.',
    faqs: [{ q: 'What does a Gini coefficient of 0.0 vs 1.0 mean?', a: 'A Gini of 0.0 represents absolute equality (everyone earns identical income); 1.0 represents absolute inequality (one single person earns all income).' }]
  },

  // 3. Price Elasticity of Demand (PED Midpoint Arc Elasticity) Calculator
  {
    slug: 'price-elasticity-of-demand-ped-midpoint-formula-calculator',
    name: 'Price Elasticity of Demand (PED Midpoint Arc Formula) & Total Revenue Calculator',
    description: 'Calculate Price Elasticity of Demand (PED = [(Q₂ - Q₁) / ((Q₁+Q₂)/2)] / [(P₂ - P₁) / ((P₁+P₂)/2)]) using the midpoint method and evaluate Total Revenue test pricing strategies (Elastic |PED| exceeding 1.0 vs Inelastic |PED| less than 1.0).',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['price elasticity of demand calculator', 'ped midpoint formula arc elasticity calculator online', 'total revenue test elasticity price increase calculator', 'elastic inelastic unit elastic demand calculator', 'microeconomics price elasticity calculator online'],
    order: 984,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Price P₁ ($), Initial Quantity Q₁, New Price P₂ ($) & New Quantity Q₂',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ped-p1">Initial Price P₁</label>
          <input class="tool-textarea" id="ped-p1" type="number" step="1" value="20.0" placeholder="$20.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-q1">Initial Qty Q₁</label>
          <input class="tool-textarea" id="ped-q1" type="number" step="10" value="100" placeholder="100 Units" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-p2">New Price P₂</label>
          <input class="tool-textarea" id="ped-p2" type="number" step="1" value="25.0" placeholder="$25.00 (+25%)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-q2">New Qty Q₂</label>
          <input class="tool-textarea" id="ped-q2" type="number" step="10" value="70" placeholder="70 Units (-30%)" />
        </div>
      </div>
      <div id="ped-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ped-res-ped" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PED = -1.57 (ELASTIC DEMAND)</span>
            <span class="stat-label">Midpoint Arc Price Elasticity of Demand (|PED| > 1.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ped-res-tr" style="color:var(--green-dark); font-weight:700;">TOTAL REVENUE FALLS: $2,000 -> $1,750 (-$250 Loss: Raising price on elastic goods hurts revenue!)</span>
            <span class="stat-label">Total Revenue Test & Optimal Pricing Strategy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('ped-p1'), q1El = document.getElementById('ped-q1');
  const p2El = document.getElementById('ped-p2'), q2El = document.getElementById('ped-q2');
  const pedResEl = document.getElementById('ped-res-ped'), trResEl = document.getElementById('ped-res-tr');

  function update() {
    const P1 = parseFloat(p1El.value), Q1 = parseFloat(q1El.value);
    const P2 = parseFloat(p2El.value), Q2 = parseFloat(q2El.value);

    if (isNaN(P1) || isNaN(Q1) || isNaN(P2) || isNaN(Q2) || P1 <= 0 || Q1 <= 0 || P2 <= 0 || Q2 <= 0 || P1 === P2) return;

    // Midpoint formula:
    const deltaQ_pct = (Q2 - Q1) / ((Q1 + Q2) / 2.0);
    const deltaP_pct = (P2 - P1) / ((P1 + P2) / 2.0);

    const PED = deltaQ_pct / deltaP_pct;
    const absPED = Math.abs(PED);

    // Total Revenue: TR1 = P1 * Q1, TR2 = P2 * Q2
    const TR1 = P1 * Q1;
    const TR2 = P2 * Q2;
    const diffTR = TR2 - TR1;

    let classification = '', color = '#22543d';

    if (absPED > 1.05) {
      classification = 'ELASTIC (|PED| > 1.0: Quantity demanded is highly sensitive to price changes)';
      color = '#22543d';
    } else if (absPED < 0.95) {
      classification = 'INELASTIC (|PED| < 1.0: Essential good; raising price increases revenue)';
      color = '#2563eb';
    } else {
      classification = 'UNIT ELASTIC (|PED| ≈ 1.0: Revenue maximized at this price level)';
      color = '#d97706';
    }

    pedResEl.textContent = 'PED = ' + PED.toFixed(2) + ' (' + classification.split(' (')[0] + ')';
    pedResEl.style.color = color;
    trResEl.textContent = 'Total Revenue: $' + Math.round(TR1) + ' -> $' + Math.round(TR2) + ' (' + (diffTR >= 0 ? '+$' : '-$') + Math.abs(Math.round(diffTR)) + ' | ' + (diffTR >= 0 ? 'Revenue Increased' : 'Revenue Decreased') + ')';
    trResEl.style.color = color;
  }

  [p1El, q1El, p2El, q2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial price $P_1$ and initial quantity demanded $Q_1$.',
      'Enter new price $P_2$ and resulting quantity demanded $Q_2$.',
      'Inspect Midpoint Price Elasticity of Demand (PED) and evaluate the Total Revenue test.'
    ],
    benefitTitle: 'Alfred Marshall Midpoint Elasticity Formula',
    benefitContent: 'The midpoint formula ($\frac{\Delta Q / Q_{\text{avg}}}{\Delta P / P_{\text{avg}}}$) guarantees that elasticity is identical whether price increases or decreases, avoiding base-dependent percentage calculation distortions.',
    faqs: [{ q: 'Why is PED usually a negative number?', a: 'By the Law of Demand, price and quantity demanded move in opposite directions; economists frequently quote the absolute magnitude $|PED|$.' }]
  },

  // 4. Monetary Policy Taylor Rule Federal Funds Rate Calculator
  {
    slug: 'monetary-policy-taylor-rule-federal-funds-rate-calculator',
    name: 'Central Bank Monetary Policy (Taylor Rule Target Interest Rate) Calculator',
    description: 'Calculate Central Bank target policy interest rate (i = r* + π + 0.5·(π - π*) + 0.5·(y - y*)) in % using John Taylor\'s 1993 benchmark monetary policy rule from inflation and GDP output gap for economics students.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['taylor rule calculator', 'central bank target interest rate formula taylor rule online', 'federal funds rate taylor rule calculator', 'inflation gap gdp output gap monetary policy calculator', 'macroeconomics interest rate taylor rule online'],
    order: 985,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current Inflation π (%), Target Inflation π* (2.0%), Real Equilibrium Rate r* (2.0%) & GDP Output Gap (y - y*) (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-inf">Inflation π (%)</label>
          <input class="tool-textarea" id="tr-inf" type="number" step="0.25" value="4.00" placeholder="4.00%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-inftgt">Target π* (%)</label>
          <input class="tool-textarea" id="tr-inftgt" type="number" step="0.25" value="2.00" placeholder="2.00% (Fed Target)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-rstar">Equilibrium r* (%)</label>
          <input class="tool-textarea" id="tr-rstar" type="number" step="0.25" value="2.00" placeholder="2.00% (Neutral Rate)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-gap">Output Gap (%)</label>
          <input class="tool-textarea" id="tr-gap" type="number" step="0.5" value="1.00" placeholder="+1.00% (y - y*)" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Target Rate i = 7.50%</span>
            <span class="stat-label">Prescribed Central Bank Policy Rate (Taylor Rule)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-stance" style="color:var(--green-dark); font-weight:700;">RESTRICTIVE MONETARY POLICY: Inflation Gap = +2.0% | Output Gap = +1.0% (Rate hike required to cool economy)</span>
            <span class="stat-label">Central Bank Policy Stance & Taylor Principle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const infEl = document.getElementById('tr-inf'), itgtEl = document.getElementById('tr-inftgt');
  const rEl = document.getElementById('tr-rstar'), gapEl = document.getElementById('tr-gap');
  const rtResEl = document.getElementById('tr-res-rate'), stResEl = document.getElementById('tr-res-stance');

  function update() {
    const pi = parseFloat(infEl.value), pi_tgt = parseFloat(itgtEl.value);
    const r_star = parseFloat(rEl.value), gap = parseFloat(gapEl.value);

    if (isNaN(pi) || isNaN(pi_tgt) || isNaN(r_star) || isNaN(gap)) return;

    // Classic Taylor Rule formula (1993):
    // i = r* + pi + 0.5 * ( pi - pi* ) + 0.5 * gap
    const inflationGap = pi - pi_tgt;
    const targetRate = r_star + pi + (0.5 * inflationGap) + (0.5 * gap);

    let stance = '';
    let color = '#22543d';

    if (targetRate > (r_star + pi)) {
      stance = 'RESTRICTIVE POLICY HAWKISH (Rate above neutral: cools inflation gap of +' + inflationGap.toFixed(1) + '%)';
      color = '#22543d';
    } else if (targetRate < (r_star + pi)) {
      stance = 'ACCOMMODATIVE POLICY DOVISH (Rate below neutral: stimulates economic growth)';
      color = '#2563eb';
    } else {
      stance = 'NEUTRAL MONETARY STANCE (Economy in balance at target)';
      color = '#22543d';
    }

    rtResEl.textContent = 'Target Rate i = ' + targetRate.toFixed(2) + '%';
    stResEl.textContent = stance + ' | Inflation Gap: ' + (inflationGap >= 0 ? '+' : '') + inflationGap.toFixed(2) + '% | Output Gap: ' + (gap >= 0 ? '+' : '') + gap.toFixed(2) + '%';
    stResEl.style.color = color;
  }

  [infEl, itgtEl, rEl, gapEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current national inflation rate $\pi$ in %.',
      'Enter Central Bank long-term inflation target $\pi^*$ (typically $2.0\%$).',
      'Enter real neutral equilibrium interest rate $r^*$ (typically $2.0\%$).',
      'Enter GDP output gap percentage $(y - y^*)$.',
      'Inspect prescribed Federal Funds interest rate target $i$.'
    ],
    benefitTitle: 'John B. Taylor 1993 Systematic Monetary Rule',
    benefitContent: 'The Taylor Principle states that when inflation rises by $1\%$, the central bank must raise nominal interest rates by more than $1\%$ (coefficient $1.5$) to ensure real interest rates rise and dampen macroeconomic demand.',
    faqs: [{ q: 'What is the GDP output gap?', a: 'The percentage difference between actual real GDP and potential full-employment GDP ($y - y^*$).' }]
  },

  // 5. Hydroelectric Dam Power Generation & Hydraulic Head Calculator
  {
    slug: 'hydroelectric-dam-power-generation-head-flow-rate-calculator',
    name: 'Hydroelectric Dam Power Generation (P = η·ρ·g·Q·H) & Energy Calculator',
    description: 'Calculate hydroelectric turbine power generation (P = η · ρ · g · Q · H) in Megawatts (MW), annual electricity generation in GWh/year, and water volume requirements from hydraulic head H and flow rate Q.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydroelectric power calculator', 'hydro power formula p equals eta rho g q h online', 'hydraulic head flow rate water turbine power calculator', 'hydro dam annual energy gwh calculator', 'renewable energy hydroelectric power output online'],
    order: 986,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hydraulic Net Head H (m), Water Flow Rate Q (m³/s) & Turbine-Generator Efficiency η (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hy-head">Head H (m)</label>
          <input class="tool-textarea" id="hy-head" type="number" step="10" value="80.0" placeholder="80.0 m (Dam Height)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hy-q">Flow Q (m³/s)</label>
          <input class="tool-textarea" id="hy-q" type="number" step="50" value="250.0" placeholder="250.0 m³/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hy-eff">Efficiency η (%)</label>
          <input class="tool-textarea" id="hy-eff" type="number" step="1" value="90.0" placeholder="90.0% (Francis Turbine)" />
        </div>
      </div>
      <div id="hy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hy-res-mw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Power P = 176.52 MW</span>
            <span class="stat-label">Continuous Hydroelectric Electric Power Output</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hy-res-gwh" style="color:var(--green-dark); font-weight:700;">Annual Energy = 1,546 GWh / year (Powers ~140,000 Homes @ 90% Capacity Factor)</span>
            <span class="stat-label">Annual Clean Renewable Energy Generation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('hy-head'), qEl = document.getElementById('hy-q'), efEl = document.getElementById('hy-eff');
  const mwResEl = document.getElementById('hy-res-mw'), gwResEl = document.getElementById('hy-res-gwh');

  const rho = 1000.0; // kg/m^3
  const g = 9.80665; // m/s^2

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), eta_pct = parseFloat(efEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(eta_pct) || H <= 0 || Q <= 0 || eta_pct <= 0 || eta_pct > 100) return;

    const eta = eta_pct / 100.0;

    // Power P = eta * rho * g * Q * H  [Watts]
    const P_watts = eta * rho * g * Q * H;
    const P_MW = P_watts / 1e6;

    // Annual energy GWh/yr = P_MW * 8760 hours / 1000
    const annual_GWh = (P_MW * 8760.0) / 1000.0;
    const homes = Math.round((annual_GWh * 1e6) / 10500); // 10,500 kWh/yr per home

    mwResEl.textContent = 'Power P = ' + P_MW.toFixed(2) + ' MW (' + Math.round(P_MW * 1000).toLocaleString() + ' kW)';
    gwResEl.textContent = 'Annual Generation = ' + Math.round(annual_GWh).toLocaleString() + ' GWh/year (Powers ~' + homes.toLocaleString() + ' Homes @ ' + eta_pct + '% Eff)';
  }

  [hEl, qEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter effective net hydraulic fall head H in meters (m).',
      'Enter penstock water volume flow rate Q in cubic meters per second ($\text{m}^3/\text{s}$).',
      'Enter combined turbine and electrical generator efficiency $\eta$.',
      'Inspect continuous power output in Megawatts (MW) and annual electricity generation in GWh.'
    ],
    benefitTitle: 'Gravitational Water Power Physics',
    benefitContent: 'Hydroelectric power directly converts potential gravitational energy into mechanical shaft torque ($P = \eta \rho g Q H$), providing zero-carbon dispatchable grid balancing energy with rapid startup capability.',
    faqs: [{ q: 'What is the difference between Francis, Pelton, and Kaplan turbines?', a: 'Pelton wheels are used for high head ($>300\text{ m}$) low flow; Francis turbines for medium head ($50\text{–}300\text{ m}$); Kaplan propellers for low head ($<50\text{ m}$) high flow rivers.' }]
  },

  // 6. Kepler's Third Law Planetary Orbital Period & Semi-Major Axis Calculator
  {
    slug: 'kepler-third-law-orbital-period-semi-major-axis-calculator',
    name: 'Kepler\'s Third Law Planetary Orbital Period (T² = a³) & Orbit Size Calculator',
    description: 'Calculate planetary and satellite orbital periods (T² = (4π² / G(M+m)) · a³) in Earth years and days from semi-major axis distance a in Astronomical Units (AU) and central stellar mass for astronomy courses.',
    category: 'Science',
    icon: 'text',
    keywords: ['keplers third law calculator', 'orbital period semi major axis formula t squared equals a cubed online', 'astronomy planetary orbit period au years calculator', 'exoplanet orbital distance keplers law calculator', 'satellite orbital mechanics kepler online'],
    order: 987,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Semi-Major Axis Distance a (AU or km) & Central Star Mass M (Solar Masses M_☉)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kp-a">Semi-Major Axis a (AU)</label>
          <input class="tool-textarea" id="kp-a" type="number" step="0.1" value="1.524" placeholder="1.524 AU (Mars Orbit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kp-m">Star Mass (M_☉)</label>
          <input class="tool-textarea" id="kp-m" type="number" step="0.1" value="1.00" placeholder="1.00 M_☉ (Our Sun)" />
        </div>
      </div>
      <div id="kp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kp-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Period T = 1.88 Earth Years (687.0 Days)</span>
            <span class="stat-label">Planetary Orbital Revolution Period (T = √(a³ / M))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kp-res-vel" style="color:var(--green-dark); font-weight:700;">Mean Orbital Speed v_orb = 24.13 km/s (Distance: 228.0 Million km @ 1.524 AU)</span>
            <span class="stat-label">Mean Orbital Velocity & Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('kp-a'), mEl = document.getElementById('kp-m');
  const tResEl = document.getElementById('kp-res-t'), vResEl = document.getElementById('kp-res-vel');

  function update() {
    const a_AU = parseFloat(aEl.value), M_star = parseFloat(mEl.value);
    if (isNaN(a_AU) || isNaN(M_star) || a_AU <= 0 || M_star <= 0) return;

    // Kepler's Third Law in Solar System units: T (years) = sqrt( a^3 / M_star )
    const T_years = Math.sqrt(Math.pow(a_AU, 3) / M_star);
    const T_days = T_years * 365.256;

    // Orbital speed in km/s: v approx = 29.78 / sqrt(a_AU) * sqrt(M_star)
    const v_kms = (29.78 / Math.sqrt(a_AU)) * Math.sqrt(M_star);
    const dist_million_km = a_AU * 149.59787;

    tResEl.textContent = 'Period T = ' + T_years.toFixed(2) + ' Years (' + T_days.toFixed(1) + ' Days)';
    vResEl.textContent = 'Mean Speed = ' + v_kms.toFixed(2) + ' km/s (Orbit Radius: ' + dist_million_km.toFixed(1) + 'M km @ a = ' + a_AU + ' AU)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter orbital semi-major axis distance a in Astronomical Units (AU).',
      'Enter parent host star mass in Solar Masses ($M_\odot$).',
      'Inspect planetary orbital revolution period T in Earth years and days and orbital velocity in km/s.'
    ],
    benefitTitle: 'Johannes Kepler 1619 Third Harmonic Law of Planetary Motion',
    benefitContent: 'Kepler discovered that the square of orbital period is proportional to the cube of semi-major axis ($T^2 \propto a^3$), which Isaac Newton later proved was a direct consequence of the universal inverse-square law of gravitation.',
    faqs: [{ q: 'What is 1 Astronomical Unit (AU)?', a: '1 AU is the average distance from the Earth to the Sun ($\approx 149,597,870\text{ km}$).' }]
  },

  // 7. Atmospheric Scale Height & Exponential Barometric Pressure Calculator
  {
    slug: 'atmospheric-scale-height-barometric-exponential-pressure-calculator',
    name: 'Atmospheric Scale Height (H = k·T / (m·g)) & Barometric Pressure Calculator',
    description: 'Calculate planetary atmospheric scale height (H = k_B·T / (m·g)) in km and barometric altitude pressure drop (P(z) = P₀ · e^(-z / H)) in kPa for Earth, Mars, Titan, and exoplanet atmospheric physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['atmospheric scale height calculator', 'barometric formula exponential pressure altitude calculator online', 'planetary atmosphere scale height mars earth titan calculator', 'altitude pressure density temperature calculator', 'space science planetary atmospheric physics online'],
    order: 988,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Altitude z (km), Temperature T (K), Surface Gravity g (m/s²) & Mean Molecular Mass (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="at-z">Altitude z (km)</label>
          <input class="tool-textarea" id="at-z" type="number" step="1" value="8.848" placeholder="8.848 km (Mt Everest)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="at-planet">Planet</label>
          <select class="tool-textarea" id="at-planet">
            <option value="8.5_101.3" selected>Earth (H ≈ 8.5 km, P₀ = 101.3 kPa)</option>
            <option value="11.1_0.61">Mars (H ≈ 11.1 km, P₀ = 0.61 kPa)</option>
            <option value="21.0_146.7">Titan (H ≈ 21.0 km, P₀ = 146.7 kPa)</option>
            <option value="15.9_9200.0">Venus (H ≈ 15.9 km, P₀ = 9,200 kPa)</option>
          </select>
        </div>
      </div>
      <div id="at-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="at-res-p" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P = 35.80 kPa (0.353 atm)</span>
            <span class="stat-label">Barometric Pressure at Altitude (P = P₀ · e^(-z/H))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="at-res-desc" style="color:var(--green-dark); font-weight:700;">DEATH ZONE ALTITUDE: Pressure is only 35.3% of sea level (Oxygen partial pressure drops to 7.5 kPa)</span>
            <span class="stat-label">Physiological Hypoxia & Planetary Atmosphere Profile</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('at-z'), plEl = document.getElementById('at-planet');
  const pResEl = document.getElementById('at-res-p'), dsResEl = document.getElementById('at-res-desc');

  function update() {
    const z_km = parseFloat(zEl.value);
    const parts = plEl.value.split('_');
    const H_km = parseFloat(parts[0]);
    const P0_kPa = parseFloat(parts[1]);

    if (isNaN(z_km) || isNaN(H_km) || isNaN(P0_kPa) || z_km < 0) return;

    // Barometric formula: P(z) = P0 * exp( -z / H )
    const P_z = P0_kPa * Math.exp(-z_km / H_km);
    const frac = (P_z / P0_kPa) * 100.0;

    let note = '';
    let color = '#22543d';

    if (frac < 40.0) {
      note = 'EXTREME HYPOXIA / DEATH ZONE: Supplementary oxygen mandatory for humans';
      color = '#c53030';
    } else if (frac < 75.0) {
      note = 'HIGH ALTITUDE (Reduced air density: Aircraft cruising altitude regime)';
      color = '#ea580c';
    } else {
      note = 'HABITABLE SURFACE REGIME';
      color = '#22543d';
    }

    pResEl.textContent = 'P = ' + (P_z >= 100 ? P_z.toFixed(1) : P_z.toFixed(2)) + ' kPa (' + (P_z / 101.325).toFixed(3) + ' atm)';
    pResEl.style.color = color;
    dsResEl.textContent = note + ' (Scale Height H = ' + H_km + ' km | Pressure = ' + frac.toFixed(1) + '% of surface @ z = ' + z_km + ' km)';
    dsResEl.style.color = color;
  }

  zEl.addEventListener('input', update);
  plEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter altitude z above planetary surface in kilometers (km).',
      'Select celestial planet/moon (Earth, Mars, Titan, Venus).',
      'Inspect exponential atmospheric barometric pressure drop $P(z) = P_0 e^{-z/H}$ and physiological oxygen availability.'
    ],
    benefitTitle: 'Planetary Atmospheric Hydrostatic Equilibrium',
    benefitContent: 'Balancing upward pressure gradient forces against downward gravity yields the exponential barometric law; the scale height $H = \frac{k_B T}{mg}$ represents the vertical distance over which atmospheric density and pressure drop by a factor of $e \approx 2.718$ ($63.2\%$).',
    faqs: [{ q: 'Why is Titan\'s scale height (21 km) so much larger than Earth\'s (8.5 km)?', a: 'Titan has lower surface gravity ($g = 1.35\text{ m/s}^2$) than Earth, allowing its cold nitrogen atmosphere to puff out much further into space.' }]
  },

  // 8. Ground Water Darcy Flux & Hydraulic Conductivity Piezometer Calculator
  {
    slug: 'groundwater-darcy-flux-hydraulic-conductivity-piezometer-calculator',
    name: 'Groundwater Darcy Flux (q = -K·(dh/dl)) & Seepage Velocity Calculator',
    description: 'Calculate hydrogeological aquifer groundwater flow Darcy flux (q = -K · (dh / dl)) in m/day, linear seepage pore velocity (v_s = q / n_e), and hydraulic gradient for environmental soil contamination transport.',
    category: 'Science',
    icon: 'text',
    keywords: ['darcy flux calculator', 'groundwater flow formula q equals k dh over dl online', 'hydraulic conductivity aquifer seepage velocity calculator', 'effective porosity linear groundwater velocity calculator', 'hydrogeology contaminant transport darcy law online'],
    order: 989,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hydraulic Conductivity K (m/day), Head Drop Δh (m), Distance L (m) & Effective Porosity n_e',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gw-k">Conductivity K</label>
          <input class="tool-textarea" id="gw-k" type="number" step="5" value="25.0" placeholder="25.0 m/day (Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-dh">Head Drop Δh (m)</label>
          <input class="tool-textarea" id="gw-dh" type="number" step="0.5" value="2.5" placeholder="2.5 m (Piezometers)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-l">Distance L (m)</label>
          <input class="tool-textarea" id="gw-l" type="number" step="50" value="500" placeholder="500 m Well Spacing" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-ne">Porosity n_e</label>
          <input class="tool-textarea" id="gw-ne" type="number" step="0.05" min="0.01" max="0.6" value="0.25" placeholder="0.25 (25% Void)" />
        </div>
      </div>
      <div id="gw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gw-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Darcy Flux q = 0.125 m / day</span>
            <span class="stat-label">Apparent Darcy Specific Discharge Velocity (q = K · i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gw-res-vs" style="color:var(--green-dark); font-weight:700;">Seepage Velocity v_s = 0.500 m/day (182.6 m/year: Actual Contaminant Migration Speed)</span>
            <span class="stat-label">Actual Groundwater Pore Seepage Velocity (v_s = q / n_e)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('gw-k'), dhEl = document.getElementById('gw-dh');
  const lEl = document.getElementById('gw-l'), neEl = document.getElementById('gw-ne');
  const qResEl = document.getElementById('gw-res-q'), vsResEl = document.getElementById('gw-res-vs');

  function update() {
    const K = parseFloat(kEl.value), dh = parseFloat(dhEl.value);
    const L = parseFloat(lEl.value), ne = parseFloat(neEl.value);

    if (isNaN(K) || isNaN(dh) || isNaN(L) || isNaN(ne) || K <= 0 || dh <= 0 || L <= 0 || ne <= 0 || ne > 1.0) return;

    // Hydraulic gradient i = dh / L
    const i = dh / L;

    // Darcy flux q = K * i  [m / day]
    const q = K * i;

    // Actual linear seepage velocity v_s = q / n_e  [m / day]
    const v_s = q / ne;
    const v_s_yr = v_s * 365.25;

    qResEl.textContent = 'Darcy Flux q = ' + q.toFixed(3) + ' m / day';
    vsResEl.textContent = 'Seepage Velocity v_s = ' + v_s.toFixed(3) + ' m/day (' + v_s_yr.toFixed(1) + ' m/yr | Gradient i = ' + i.toFixed(4) + ' @ n_e = ' + ne + ')';
  }

  [kEl, dhEl, lEl, neEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aquifer saturated hydraulic conductivity K in meters/day.',
      'Enter hydraulic head difference $\Delta h$ between two monitoring wells in meters.',
      'Enter distance L between wells in meters.',
      'Enter soil effective porosity $n_e$.',
      'Inspect apparent Darcy flux q and actual linear interstitial pore seepage velocity $v_s = q / n_e$.'
    ],
    benefitTitle: 'Henry Darcy 1856 Aquifer Seepage Law',
    benefitContent: 'Because water can only travel through open interconnecting pore voids, the actual chemical pollutant travel speed ($v_s$) is $3\times$ to $5\times$ faster than the apparent bulk Darcy discharge ($q$), critical for environmental plume remediation.',
    faqs: [{ q: 'Why is seepage velocity (v_s) always larger than Darcy flux (q)?', a: 'Darcy flux assumes flow through the entire cross-section, while seepage velocity accounts for the fact that flow occurs only through effective void pores ($v_s = q / n_e$).' }]
  },

  // 9. Open Channel Manning Equation Stream Discharge & Velocity Calculator
  {
    slug: 'stream-discharge-manning-open-channel-flow-velocity-calculator',
    name: 'Manning Equation Open Channel Flow & Stream Discharge (Q = (1/n)·A·R^(2/3)·S^(1/2)) Calculator',
    description: 'Calculate open channel river and storm drainage discharge (Q = (1/n) · A · R_h^(2/3) · S^(1/2)) in m³/s and flow velocity v in m/s from channel width, water depth, Manning roughness n, and bed slope S.',
    category: 'Science',
    icon: 'text',
    keywords: ['manning equation calculator', 'open channel flow formula q equals 1 over n a r to two thirds s to half online', 'hydraulic radius manning roughness stream discharge calculator', 'stormwater culvert channel velocity calculator', 'civil environmental river flow rate online'],
    order: 990,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rectangular Channel Width b (m), Water Depth y (m), Bed Slope S (m/m) & Manning Roughness n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mn-b">Width b (m)</label>
          <input class="tool-textarea" id="mn-b" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-y">Depth y (m)</label>
          <input class="tool-textarea" id="mn-y" type="number" step="0.2" value="1.5" placeholder="1.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-s">Slope S (m/m)</label>
          <input class="tool-textarea" id="mn-s" type="number" step="0.001" value="0.005" placeholder="0.005 (0.5% Slope)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-n">Manning n</label>
          <input class="tool-textarea" id="mn-n" type="number" step="0.005" value="0.030" placeholder="0.030 (Natural River)" />
        </div>
      </div>
      <div id="mn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mn-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Discharge Q = 12.75 m³ / s</span>
            <span class="stat-label">Volumetric River Stream Discharge Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mn-res-v" style="color:var(--green-dark); font-weight:700;">Velocity v = 2.12 m/s | Hydraulic Radius R_h = 0.857 m (Area = 6.00 m², Wetted P = 7.00 m)</span>
            <span class="stat-label">Flow Velocity & Wetted Perimeter Hydraulic Geometry</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('mn-b'), yEl = document.getElementById('mn-y');
  const sEl = document.getElementById('mn-s'), nEl = document.getElementById('mn-n');
  const qResEl = document.getElementById('mn-res-q'), vResEl = document.getElementById('mn-res-v');

  function update() {
    const b = parseFloat(bEl.value), y = parseFloat(yEl.value);
    const S = parseFloat(sEl.value), n = parseFloat(nEl.value);

    if (isNaN(b) || isNaN(y) || isNaN(S) || isNaN(n) || b <= 0 || y <= 0 || S <= 0 || n <= 0) return;

    // Cross-sectional Area A = b * y
    const Area = b * y;
    // Wetted perimeter P_wet = b + 2*y
    const P_wet = b + (2.0 * y);
    // Hydraulic radius R_h = A / P_wet
    const R_h = Area / P_wet;

    // Manning's equation for velocity: v = (1 / n) * R_h^(2/3) * S^(1/2)  [m/s]
    const v = (1.0 / n) * Math.pow(R_h, 2.0 / 3.0) * Math.sqrt(S);
    // Discharge Q = A * v  [m^3 / s]
    const Q = Area * v;

    qResEl.textContent = 'Discharge Q = ' + Q.toFixed(2) + ' m³ / s';
    vResEl.textContent = 'Velocity v = ' + v.toFixed(2) + ' m/s | R_h = ' + R_h.toFixed(3) + ' m (A = ' + Area.toFixed(2) + ' m², P_wet = ' + P_wet.toFixed(2) + ' m @ n = ' + n + ')';
  }

  [bEl, yEl, sEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rectangular open channel bottom width b in meters (m).',
      'Enter water flow depth y in meters (m).',
      'Enter longitudinal channel bed slope S in m/m.',
      'Enter Manning roughness coefficient n.',
      'Inspect total river stream discharge Q in $\text{m}^3/\text{s}$ and mean flow velocity v.'
    ],
    benefitTitle: 'Robert Manning 1889 Open Channel Flow Formula',
    benefitContent: 'Manning\'s formula is the universal global standard for sizing municipal stormwater sewer culverts, agricultural irrigation canals, and flood risk watershed river channels.',
    faqs: [{ q: 'What is Hydraulic Radius (Rh)?', a: 'Hydraulic radius is the ratio of water cross-sectional flow area to the wetted contact perimeter ($R_h = A / P_{\text{wet}}$), measuring channel flow efficiency.' }]
  },

  // 10. Water Treatment Chlorine Disinfection Contact Time (CT Value) Calculator
  {
    slug: 'water-treatment-chlorine-contact-time-ct-disinfection-calculator',
    name: 'Water Treatment Chlorine Disinfection Contact Time (CT Value) Calculator',
    description: 'Calculate municipal drinking water disinfection CT Value (CT = Free Chlorine Residual C in mg/L · Contact Time T in minutes) and evaluate Giardia lamblia and virus log-inactivation compliance under EPA Safe Drinking Water rules.',
    category: 'Science',
    icon: 'text',
    keywords: ['chlorine ct calculator', 'water disinfection contact time formula ct equals c times t online', 'giardia virus log inactivation ct calculator epa', 'free chlorine residual drinking water treatment calculator', 'environmental engineering water chlorination online'],
    order: 991,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free Chlorine Residual C (mg/L), Effective Contact Time T (minutes) & Water Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-c">Chlorine C (mg/L)</label>
          <input class="tool-textarea" id="ct-c" type="number" step="0.1" value="1.5" placeholder="1.5 mg/L (ppm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-t">Contact Time T (min)</label>
          <input class="tool-textarea" id="ct-t" type="number" step="5" value="45.0" placeholder="45.0 Minutes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="ct-temp" type="number" step="1" value="10.0" placeholder="10.0 °C" />
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Achieved CT = 67.5 mg·min/L</span>
            <span class="stat-label">Disinfection Concentration-Time Product (CT)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-epa" style="color:var(--green-dark); font-weight:700;">EPA COMPLIANT: Exceeds 3-Log (99.9%) Giardia Inactivation (Required CT = 59 mg·min/L @ 10°C, pH 7.5)</span>
            <span class="stat-label">US EPA Safe Drinking Water Surface Water Treatment Rule</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t'), tmpEl = document.getElementById('ct-temp');
  const ctResEl = document.getElementById('ct-res-val'), epaResEl = document.getElementById('ct-res-epa');

  function update() {
    const C = parseFloat(cEl.value), T = parseFloat(tEl.value), temp = parseFloat(tmpEl.value);
    if (isNaN(C) || isNaN(T) || isNaN(temp) || C <= 0 || T <= 0) return;

    // CT = C * T  [mg * min / L]
    const CT_achieved = C * T;

    let reqCT = 59.0;
    if (temp <= 5.0) reqCT = 122.0;
    else if (temp <= 10.0) reqCT = 59.0;
    else if (temp <= 15.0) reqCT = 40.0;
    else reqCT = 25.0;

    let status = '';
    let color = '#22543d';

    if (CT_achieved >= reqCT) {
      status = 'EPA 3-LOG COMPLIANT (Achieved ' + CT_achieved.toFixed(1) + ' ≥ Required ' + reqCT + ' mg·min/L): Complete 99.9% pathogen disinfection';
      color = '#22543d';
    } else {
      status = 'NON-COMPLIANT (Achieved ' + CT_achieved.toFixed(1) + ' < Required ' + reqCT + ' mg·min/L): Increase chlorine dose or baffle tank retention time!';
      color = '#c53030';
    }

    ctResEl.textContent = 'Achieved CT = ' + CT_achieved.toFixed(1) + ' mg·min/L';
    ctResEl.style.color = color;
    epaResEl.textContent = status + ' @ ' + temp + '°C water temperature';
    epaResEl.style.color = color;
  }

  [cEl, tEl, tmpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter free available chlorine disinfectant residual C in mg/L (ppm).',
      'Enter effective hydraulic baffling contact detention time T in minutes.',
      'Enter treated water temperature in $^\circ\text{C}$.',
      'Inspect achieved CT value ($C \times T$) and verify regulatory EPA 3-log (99.9%) Giardia lamblia pathogen inactivation compliance.'
    ],
    benefitTitle: 'Harriet Chick & Herbert E. Watson 1908 Disinfection Law',
    benefitContent: 'Chick-Watson law ($N_t / N_0 = e^{-k C^n T}$) proves that pathogen kill rate depends directly on the mathematical product of chemical concentration and contact time ($CT$), ensuring municipal drinking water safety against waterborne pathogens.',
    faqs: [{ q: 'Why is higher CT required in cold water (0.5°C vs 20°C)?', a: 'Cold water slows down chemical oxidation reaction rates of chlorine with microbial cell membranes, requiring longer contact time.' }]
  },

  // 11. Nuclear Reactor Four-Factor Formula Infinite Multiplication Factor Calculator
  {
    slug: 'nuclear-reactor-four-factor-formula-neutron-multiplication-calculator',
    name: 'Nuclear Reactor Four-Factor Formula (k_∞ = ε·p·η·f) Criticality Calculator',
    description: 'Calculate thermal nuclear reactor infinite neutron multiplication factor (k_∞ = ε · p · η · f) from Fast Fission Factor ε, Resonance Escape Probability p, Reproduction Factor η, and Thermal Utilization Factor f.',
    category: 'Science',
    icon: 'text',
    keywords: ['four factor formula calculator', 'nuclear reactor criticality k infinity formula online', 'thermal utilization resonance escape fast fission calculator', 'neutron multiplication factor k equals 1 critical calculator', 'nuclear engineering reactor physics online'],
    order: 992,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fast Fission ε (1.02 to 1.08), Resonance Escape p (0.75 to 0.90), Thermal η (1.90 to 2.15) & Utilization f (0.70 to 0.90)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nr-eps">Fast Fission (ε)</label>
          <input class="tool-textarea" id="nr-eps" type="number" step="0.01" value="1.03" placeholder="1.03" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nr-p">Resonance p</label>
          <input class="tool-textarea" id="nr-p" type="number" step="0.01" value="0.88" placeholder="0.88" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nr-eta">Reproduction (η)</label>
          <input class="tool-textarea" id="nr-eta" type="number" step="0.05" value="2.08" placeholder="2.08 (U-235)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nr-f">Utilization (f)</label>
          <input class="tool-textarea" id="nr-f" type="number" step="0.01" value="0.72" placeholder="0.72" />
        </div>
      </div>
      <div id="nr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nr-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k_∞ = 1.357 (Supercritical Infinite Medium)</span>
            <span class="stat-label">Infinite Multiplication Factor (k_∞ = ε · p · η · f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nr-res-crit" style="color:var(--green-dark); font-weight:700;">REACTOR CAN SUSTAIN CHAIN REACTION: k_∞ > 1.0 allows finite geometric neutron leakage</span>
            <span class="stat-label">Reactor Core Criticality State Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('nr-eps'), pEl = document.getElementById('nr-p');
  const etaEl = document.getElementById('nr-eta'), fEl = document.getElementById('nr-f');
  const kResEl = document.getElementById('nr-res-k'), crResEl = document.getElementById('nr-res-crit');

  function update() {
    const eps = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value);

    if (isNaN(eps) || isNaN(p) || isNaN(eta) || isNaN(f) || eps <= 0 || p <= 0 || eta <= 0 || f <= 0) return;

    // Four factor formula: k_inf = eps * p * eta * f
    const k_inf = eps * p * eta * f;

    let crit = '';
    let color = '#22543d';

    if (k_inf > 1.0) {
      crit = 'CRITICALITY POSSIBLE (k_∞ = ' + k_inf.toFixed(3) + ' > 1.0: Ample excess reactivity to balance geometric boundary leakage)';
      color = '#22543d';
    } else if (k_inf === 1.0) {
      crit = 'EXACTLY CRITICAL (k_∞ = 1.0: Self-sustaining steady power in infinite medium)';
      color = '#22543d';
    } else {
      crit = 'SUBCRITICAL (k_∞ = ' + k_inf.toFixed(3) + ' < 1.0: Cannot sustain chain reaction; enrich fuel or improve moderation)';
      color = '#c53030';
    }

    kResEl.textContent = 'k_∞ = ' + k_inf.toFixed(3);
    kResEl.style.color = color;
    crResEl.textContent = crit;
    crResEl.style.color = color;
  }

  [epsEl, pEl, etaEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Fast Fission Factor $\epsilon$.',
      'Enter Resonance Escape Probability p.',
      'Enter Thermal Reproduction Factor $\eta$.',
      'Enter Thermal Utilization Factor f.',
      'Inspect infinite neutron multiplication factor $k_\infty = \epsilon p \eta f$.'
    ],
    benefitTitle: 'Enrico Fermi 1942 Chicago Pile-1 Nuclear Physics Formula',
    benefitContent: 'The Four-Factor Formula balances fuel enrichment, neutron moderation geometry, and structural absorption; maintaining $k_{\text{eff}} = 1.000$ guarantees stable nuclear power plant electricity generation without exponential runaway or power collapse.',
    faqs: [{ q: 'What is the Six-Factor Formula?', a: 'The Six-Factor formula multiplies $k_\infty$ by Fast Non-Leakage ($P_{\text{FNL}}$) and Thermal Non-Leakage ($P_{\text{TNL}}$) to calculate the effective multiplication factor in finite reactor cores.' }]
  },

  // 12. Carbon Footprint Scope 1, 2, 3 Greenhouse Gas Emissions Calculator
  {
    slug: 'carbon-footprint-scope-1-2-3-greenhouse-gas-emissions-calculator',
    name: 'Corporate & Institutional Carbon Footprint (GHG Protocol Scope 1, 2 & 3) Calculator',
    description: 'Calculate organizational greenhouse gas carbon footprint emissions in metric tonnes CO₂ equivalent (tCO₂e) across Scope 1 direct combustion, Scope 2 electricity grid consumption, and Scope 3 supply chain travel under the GHG Protocol.',
    category: 'Science',
    icon: 'text',
    keywords: ['carbon footprint calculator', 'ghg protocol scope 1 2 3 emissions calculator online', 'co2 equivalent emissions metric tonnes calculator', 'corporate carbon footprint esg reporting calculator', 'electricity natural gas travel carbon emissions online'],
    order: 993,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Scope 1 Gas Combustion (m³), Scope 2 Electricity (kWh) & Scope 3 Business Travel Flight (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ghg-gas">Natural Gas (m³)</label>
          <input class="tool-textarea" id="ghg-gas" type="number" step="500" value="5000" placeholder="5,000 m³ (Scope 1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghg-kwh">Electricity (kWh)</label>
          <input class="tool-textarea" id="ghg-kwh" type="number" step="5000" value="50000" placeholder="50,000 kWh (Scope 2)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghg-fly">Air Travel (km)</label>
          <input class="tool-textarea" id="ghg-fly" type="number" step="2000" value="20000" placeholder="20,000 km (Scope 3)" />
        </div>
      </div>
      <div id="ghg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ghg-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total: 33.95 tCO₂e</span>
            <span class="stat-label">Total Annual Greenhouse Gas Carbon Footprint</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ghg-res-break" style="color:var(--green-dark); font-weight:700;">Scope 1: 10.15 tCO₂e | Scope 2: 20.70 tCO₂e | Scope 3: 3.10 tCO₂e (Offset: ~1,540 Trees Needed)</span>
            <span class="stat-label">GHG Protocol Scope 1, 2 & 3 Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('ghg-gas'), eEl = document.getElementById('ghg-kwh'), fEl = document.getElementById('ghg-fly');
  const totResEl = document.getElementById('ghg-res-tot'), brkResEl = document.getElementById('ghg-res-break');

  function update() {
    const gas_m3 = parseFloat(gEl.value) || 0;
    const elec_kwh = parseFloat(eEl.value) || 0;
    const fly_km = parseFloat(fEl.value) || 0;

    // Natural gas: ~2.03 kg CO2e / m^3
    const s1_tco2e = (gas_m3 * 2.03) / 1000.0;
    // Grid electricity: ~0.414 kg CO2e / kWh
    const s2_tco2e = (elec_kwh * 0.414) / 1000.0;
    // Commercial flight: ~0.155 kg CO2e / passenger-km
    const s3_tco2e = (fly_km * 0.155) / 1000.0;

    const total_tco2e = s1_tco2e + s2_tco2e + s3_tco2e;
    const trees = Math.round(total_tco2e * 45.4);

    totResEl.textContent = 'Total: ' + total_tco2e.toFixed(2) + ' tCO₂e';
    brkResEl.textContent = 'Scope 1: ' + s1_tco2e.toFixed(2) + ' t | Scope 2: ' + s2_tco2e.toFixed(2) + ' t | Scope 3: ' + s3_tco2e.toFixed(2) + ' t (~' + trees.toLocaleString() + ' Trees needed to offset)';
  }

  [gEl, eEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter annual natural gas heating consumption in cubic meters ($\text{m}^3$) for Scope 1.',
      'Enter purchased grid electricity consumption in kilowatt-hours (kWh) for Scope 2.',
      'Enter business travel flight distance in passenger-kilometers for Scope 3.',
      'Inspect total carbon footprint in metric tonnes of $CO_2$ equivalent ($\text{tCO}_2\text{e}$).'
    ],
    benefitTitle: 'WRI & WBCSD Greenhouse Gas (GHG) Protocol',
    benefitContent: 'Classifying emissions into Scope 1 (direct onsite fuels), Scope 2 (purchased electricity), and Scope 3 (upstream/downstream value chain) fulfills mandatory corporate ESG sustainability reporting and Science-Based Targets (SBTi) net-zero standards.',
    faqs: [{ q: 'What is a metric tonne of CO2 equivalent (tCO2e)?', a: '$\text{tCO}_2\text{e}$ standardizes different greenhouse gases into equivalent global warming potential relative to 1 metric ton ($1,000\text{ kg}$) of Carbon Dioxide.' }]
  },

  // 13. Academic Research h-Index & i10-Index Citation Impact Calculator
  {
    slug: 'h-index-i10-index-academic-research-citation-impact-calculator',
    name: 'Academic Research Citation Impact (h-Index & i10-Index) Calculator',
    description: 'Calculate scholarly research publication impact metrics: Hirsch index (h-index = h papers with at least h citations each), i10-index (papers with at least 10 citations), total citation sum, and average citations per paper for academic tenure portfolios.',
    category: 'Education',
    icon: 'calculator',
    keywords: ['h index calculator', 'hirsch index citation impact formula online', 'i10 index google scholar calculator', 'academic researcher citation metrics calculator', 'scientific author h index ranking online'],
    order: 994,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Paper Citation Counts (Comma-Separated Numbers, e.g. 85, 42, 28, 14, 9, 3, 1)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hi-cites">Paper Citations List</label>
        <input class="tool-textarea" id="hi-cites" type="text" value="85, 42, 28, 14, 11, 7, 3, 1" placeholder="e.g. 55, 34, 18, 12, 10, 6, 2" />
      </div>
      <div id="hi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hi-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">h-index = 5 | i10-index = 5</span>
            <span class="stat-label">Jorge E. Hirsch h-Index & Google Scholar i10-Index</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hi-res-sum" style="color:var(--green-dark); font-weight:700;">Total Citations = 191 | Average = 23.88 Citations/Paper (Across 8 Publications)</span>
            <span class="stat-label">Scholarly Output Summary & Citation Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('hi-cites');
  const hResEl = document.getElementById('hi-res-h'), smResEl = document.getElementById('hi-res-sum');

  function update() {
    const raw = (cEl.value || '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 0);
    if (raw.length === 0) return;

    raw.sort((a, b) => b - a);

    let h = 0;
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] >= i + 1) h = i + 1;
      else break;
    }

    const i10 = raw.filter(c => c >= 10).length;
    const totalCites = raw.reduce((a, b) => a + b, 0);
    const avgCites = totalCites / raw.length;

    hResEl.textContent = 'h-index = ' + h + ' | i10-index = ' + i10;
    smResEl.textContent = 'Total Citations = ' + totalCites.toLocaleString() + ' | Average = ' + avgCites.toFixed(2) + ' Citations/Paper (Total: ' + raw.length + ' Papers)';
  }

  cEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter citation counts for all published papers as comma-separated numbers.',
      'Inspect Hirsch $h$-index, Google Scholar $i10$-index, total citations, and average citation count.'
    ],
    benefitTitle: 'Jorge E. Hirsch 2005 Scientometric Metric',
    benefitContent: 'The h-index balances scientific productivity (number of papers) with academic influence (citations per paper); an $h$-index of 20 means a scholar has published 20 papers that have each been cited at least 20 times.',
    faqs: [{ q: 'What is considered a strong h-index in academia?', a: 'In STEM fields, an h-index of 20 is typical for tenure-track associate professors, 40 for full professors, and 60+ for National Academy members.' }]
  },

  // 14. Solar Irradiance GHI, DNI, DHI & Photovoltaic Tilt Angle Calculator
  {
    slug: 'solar-irradiance-dni-dhi-ghi-photovoltaic-tilt-calculator',
    name: 'Solar Irradiance (GHI = DHI + DNI·cos θ_z) & PV Array Tilt Angle Calculator',
    description: 'Calculate solar resource Global Horizontal Irradiance (GHI = DHI + DNI · cos θ_z) in W/m², plane of array irradiance (POA), and optimal solar panel winter/summer tilt angles for renewable energy engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar irradiance calculator', 'ghi dni dhi formula solar radiation online', 'plane of array poa irradiance pv tilt calculator', 'solar zenith angle global horizontal irradiance calculator', 'photovoltaic solar power design online'],
    order: 995,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Direct Normal Irradiance DNI (W/m²), Diffuse Horizontal DHI (W/m²) & Solar Zenith Angle θ_z (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-dni">DNI (W/m²)</label>
          <input class="tool-textarea" id="sol-dni" type="number" step="50" value="850" placeholder="850 W/m² (Direct Beam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-dhi">DHI (W/m²)</label>
          <input class="tool-textarea" id="sol-dhi" type="number" step="20" value="120" placeholder="120 W/m² (Diffuse Sky)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-zen">Zenith Angle θ_z</label>
          <input class="tool-textarea" id="sol-zen" type="number" step="5" min="0" max="90" value="35.0" placeholder="35.0° (Sun Elevation 55°)" />
        </div>
      </div>
      <div id="sol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-ghi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">GHI = 816.3 W / m²</span>
            <span class="stat-label">Global Horizontal Solar Irradiance (GHI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-tilt" style="color:var(--green-dark); font-weight:700;">Optimal Year-Round PV Panel Tilt: ~35° facing Equator | Sun Elevation = 55.0°</span>
            <span class="stat-label">Optimal Solar Array Installation Tilt Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dniEl = document.getElementById('sol-dni'), dhiEl = document.getElementById('sol-dhi'), zenEl = document.getElementById('sol-zen');
  const ghiResEl = document.getElementById('sol-res-ghi'), tltResEl = document.getElementById('sol-res-tilt');

  function update() {
    const DNI = parseFloat(dniEl.value), DHI = parseFloat(dhiEl.value), theta_z_deg = parseFloat(zenEl.value);
    if (isNaN(DNI) || isNaN(DHI) || isNaN(theta_z_deg) || DNI < 0 || DHI < 0 || theta_z_deg < 0 || theta_z_deg > 90) return;

    const theta_z_rad = (theta_z_deg * Math.PI) / 180.0;

    // GHI = DHI + DNI * cos(theta_z)
    const GHI = DHI + (DNI * Math.cos(theta_z_rad));
    const sunElevation = 90.0 - theta_z_deg;

    ghiResEl.textContent = 'GHI = ' + GHI.toFixed(1) + ' W / m²';
    tltResEl.textContent = 'Optimal Fixed Tilt ≈ ' + theta_z_deg.toFixed(0) + '° | Sun Elevation = ' + sunElevation.toFixed(1) + '° (Direct Beam: ' + (DNI * Math.cos(theta_z_rad)).toFixed(1) + ' W/m² + Diffuse: ' + DHI + ' W/m²)';
  }

  [dniEl, dhiEl, zenEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Direct Normal Irradiance (DNI) in $\text{W/m}^2$ measured perpendicular to the sun.',
      'Enter Diffuse Horizontal Irradiance (DHI) in $\text{W/m}^2$ from atmospheric sky scattering.',
      'Enter solar zenith angle $\theta_z$ in degrees ($90^\circ - \text{Elevation}$).',
      'Inspect Global Horizontal Irradiance ($GHI = DHI + DNI \cos\theta_z$) in $\text{W/m}^2$.'
    ],
    benefitTitle: 'Solar Resource Characterization Standard',
    benefitContent: 'GHI represents total solar radiation received on a horizontal surface; tracking DNI and DHI components allows solar engineers to model Plane-of-Array (POA) irradiance on fixed-tilt and single-axis tracking photovoltaic farms.',
    faqs: [{ q: 'What is peak sun hour (1,000 W/m²)?', a: 'Standard Test Condition (STC) defines 1 peak sun hour as $1,000\text{ W/m}^2$ irradiance at $25^\circ\text{C}$ cell temperature.' }]
  },

  // 15. Wind Power Density & Weibull Distribution Wind Energy Calculator
  {
    slug: 'wind-power-density-weibull-distribution-wind-energy-calculator',
    name: 'Wind Power Density (WPD = ½·ρ·v³) & Wind Turbine Energy Calculator',
    description: 'Calculate atmospheric wind power density (WPD = ½ · ρ · v³) in W/m², Betz limit harvestable aerodynamic power in kW, and classify NREL Wind Power Classes (Class 1 to Class 7) for wind energy feasibility.',
    category: 'Science',
    icon: 'text',
    keywords: ['wind power density calculator', 'wpd formula half rho v cubed online', 'wind turbine power class 1 to 7 nrel calculator', 'betz limit wind energy density calculator w per m2', 'wind resource assessment power density online'],
    order: 996,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hub Height Wind Speed v (m/s), Air Density ρ (kg/m³, 1.225 at sea level) & Rotor Diameter (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wp-v">Wind Speed v (m/s)</label>
          <input class="tool-textarea" id="wp-v" type="number" step="0.5" value="8.5" placeholder="8.5 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wp-rho">Air Density ρ</label>
          <input class="tool-textarea" id="wp-rho" type="number" step="0.01" value="1.225" placeholder="1.225 kg/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wp-dia">Rotor Diameter (m)</label>
          <input class="tool-textarea" id="wp-dia" type="number" step="5" value="100.0" placeholder="100.0 m (3 MW Turbine)" />
        </div>
      </div>
      <div id="wp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wp-res-wpd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">WPD = 376.1 W / m² (Class 4 Good)</span>
            <span class="stat-label">Wind Power Density at Hub Height</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wp-res-pwr" style="color:var(--green-dark); font-weight:700;">Turbine Electric Output = 1,180 kW (1.18 MW @ 40% Capacity Factor across 7,854 m² Swept Area)</span>
            <span class="stat-label">Commercial Wind Turbine Electrical Power Output</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('wp-v'), rhoEl = document.getElementById('wp-rho'), dEl = document.getElementById('wp-dia');
  const wpdResEl = document.getElementById('wp-res-wpd'), pwrResEl = document.getElementById('wp-res-pwr');

  function update() {
    const v = parseFloat(vEl.value), rho = parseFloat(rhoEl.value), dia = parseFloat(dEl.value);
    if (isNaN(v) || isNaN(rho) || isNaN(dia) || v <= 0 || rho <= 0 || dia <= 0) return;

    // Wind Power Density: WPD = 0.5 * rho * v^3  [W / m^2]
    const WPD = 0.5 * rho * Math.pow(v, 3);

    // Swept area A = pi * (dia / 2)^2
    const Area = Math.PI * Math.pow(dia / 2.0, 2);

    // Total kinetic power in wind stream P_total = WPD * Area  [Watts]
    const P_wind_kW = (WPD * Area) / 1000.0;

    // Practical turbine output with Betz limit (59.3%) and generator losses (~40% net efficiency):
    const P_elec_kW = P_wind_kW * 0.40;

    let nrelClass = '';
    let color = '#22543d';

    if (WPD >= 600) { nrelClass = 'CLASS 6/7 SUPERB (WPD ≥ 600 W/m²: Elite Offshore / Ridge Site)'; color = '#22543d'; }
    else if (WPD >= 400) { nrelClass = 'CLASS 4/5 EXCELLENT (WPD 400-600 W/m²: Highly Commercial)'; color = '#22543d'; }
    else if (WPD >= 300) { nrelClass = 'CLASS 3 FAIR (WPD 300-400 W/m²: Economic with Tall Hubs)'; color = '#2563eb'; }
    else if (WPD >= 200) { nrelClass = 'CLASS 2 MARGINAL (WPD 200-300 W/m²)'; color = '#d97706'; }
    else { nrelClass = 'CLASS 1 POOR (WPD < 200 W/m²: Non-viable for utility-scale)'; color = '#c53030'; }

    wpdResEl.textContent = 'WPD = ' + WPD.toFixed(1) + ' W / m² (' + nrelClass.split(' (')[0] + ')';
    wpdResEl.style.color = color;
    pwrResEl.textContent = 'Turbine Output = ' + Math.round(P_elec_kW).toLocaleString() + ' kW (' + (P_elec_kW/1000).toFixed(2) + ' MW @ Swept Area ' + Math.round(Area).toLocaleString() + ' m²)';
  }

  [vEl, rhoEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter average annual wind speed v at turbine hub height in m/s.',
      'Enter air density $\rho$ in $\text{kg/m}^3$ ($1.225$ standard).',
      'Enter turbine blade rotor diameter in meters.',
      'Inspect Wind Power Density (WPD in $\text{W/m}^2$) and predicted commercial turbine electrical Megawatt power output.'
    ],
    benefitTitle: 'Cubic Wind Velocity Energy Law',
    benefitContent: 'Because wind kinetic power scales with the cube of velocity ($P \propto v^3$), a small $20\%$ boost in wind speed increases harvestable energy by $72.8\%$ ($1.2^3 = 1.728$), making hub height wind resource assessment critical.',
    faqs: [{ q: 'What is the theoretical maximum limit for wind turbine energy capture?', a: 'Albert Betz proved in 1919 that no wind turbine can capture more than $16/27 \approx 59.26\%$ of the kinetic energy in wind (the Betz limit).' }]
  },

  // 16. Geotechnical Unified Soil Classification System (USCS) Plasticity Index Calculator
  {
    slug: 'soil-uscs-soil-classification-liquid-plastic-limit-calculator',
    name: 'USCS Soil Classification & Plasticity Index (PI = LL - PL) Casagrande Chart Calculator',
    description: 'Calculate soil Plasticity Index (PI = LL - PL), determine A-Line boundary equation (PI = 0.73·(LL - 20)), and classify fine-grained cohesive soils (CL, CH, ML, MH) on the Casagrande plasticity chart under ASTM D2487.',
    category: 'Science',
    icon: 'text',
    keywords: ['uscs soil classification calculator', 'plasticity index formula pi equals ll minus pl online', 'casagrande plasticity chart a line calculator', 'liquid limit plastic limit soil classification astm d2487', 'geotechnical engineering soil mechanics calculator online'],
    order: 997,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Liquid Limit LL (%) & Plastic Limit PL (%) from Atterberg Lab Tests',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sc-ll">Liquid Limit LL (%)</label>
          <input class="tool-textarea" id="sc-ll" type="number" step="1" value="42.0" placeholder="42.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-pl">Plastic Limit PL (%)</label>
          <input class="tool-textarea" id="sc-pl" type="number" step="1" value="18.0" placeholder="18.0%" />
        </div>
      </div>
      <div id="sc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sc-res-uscs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CL - LEAN CLAY (Low Plasticity)</span>
            <span class="stat-label">ASTM USCS Group Symbol & Soil Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-pi" style="color:var(--green-dark); font-weight:700;">Plasticity Index PI = 24.0% | A-Line Cutoff = 16.06% (Point lies above A-Line: Clayey)</span>
            <span class="stat-label">Plasticity Index (PI = LL - PL) & Casagrande A-Line Position</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const llEl = document.getElementById('sc-ll'), plEl = document.getElementById('sc-pl');
  const uscsResEl = document.getElementById('sc-res-uscs'), piResEl = document.getElementById('sc-res-pi');

  function update() {
    const LL = parseFloat(llEl.value), PL = parseFloat(plEl.value);
    if (isNaN(LL) || isNaN(PL) || LL <= 0 || PL < 0 || LL <= PL) return;

    // Plasticity Index: PI = LL - PL
    const PI = LL - PL;

    // Casagrande A-Line equation: PI_A = 0.73 * (LL - 20)
    const PI_A_line = 0.73 * (LL - 20.0);

    let symbol = '', name = '', color = '#22543d';

    if (LL < 50.0) {
      // Low Plasticity (L)
      if (PI > PI_A_line && PI > 7.0) {
        symbol = 'CL';
        name = 'LEAN CLAY (Low to medium plasticity, above A-line)';
        color = '#22543d';
      } else if (PI < PI_A_line || PI < 4.0) {
        symbol = 'ML';
        name = 'SILT (Low plasticity inorganic silt, below A-line)';
        color = '#2563eb';
      } else {
        symbol = 'CL-ML';
        name = 'SILTY CLAY (Dual classification: 4 ≤ PI ≤ 7)';
        color = '#d97706';
      }
    } else {
      // High Plasticity (H)
      if (PI > PI_A_line) {
        symbol = 'CH';
        name = 'FAT CLAY (High plasticity expansive clay, above A-line)';
        color = '#c53030';
      } else {
        symbol = 'MH';
        name = 'ELASTIC SILT (High plasticity inorganic silt, below A-line)';
        color = '#ea580c';
      }
    }

    uscsResEl.textContent = symbol + ' - ' + name.split(' (')[0];
    uscsResEl.style.color = color;
    piResEl.textContent = 'Plasticity Index PI = ' + PI.toFixed(1) + '% | A-Line = ' + PI_A_line.toFixed(2) + '% (' + (PI > PI_A_line ? 'Above A-Line' : 'Below A-Line') + ' @ LL = ' + LL + '%)';
  }

  llEl.addEventListener('input', update);
  plEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter soil Liquid Limit (LL %) determined via Casagrande cup or fall cone test.',
      'Enter soil Plastic Limit (PL %) determined by rolling 3.2 mm soil threads.',
      'Inspect Plasticity Index ($PI = LL - PL$), Casagrande A-Line cutoff, and official ASTM USCS soil group code (CL, CH, ML, MH).'
    ],
    benefitTitle: 'Arthur Casagrande 1948 Geotechnical Classification',
    benefitContent: 'Atterberg consistency limits distinguish cohesive clays from non-plastic silts; identifying highly expansive "Fat Clays" (CH with $LL > 50$) prevents catastrophic foundation shifting and slope landslides.',
    faqs: [{ q: 'What is the Casagrande A-Line?', a: 'The A-line ($PI = 0.73(LL - 20)$) empirically separates inorganic clays (above the line) from silts and organic soils (below the line).' }]
  },

  // 17. Standard Penetration Test (SPT N60 Field Correction) Geotechnical Calculator
  {
    slug: 'geotechnical-standard-penetration-test-spt-n-value-correction-calculator',
    name: 'Standard Penetration Test (SPT N₆₀ Energy & Overburden Correction) Calculator',
    description: 'Calculate geotechnical Standard Penetration Test corrected blow count (N₆₀ = N_field · (ER/60) · C_B · C_S · C_R) and overburden normalized count ((N₁)₆₀ = N₆₀ · C_N) for soil bearing capacity and liquefaction analysis.',
    category: 'Science',
    icon: 'text',
    keywords: ['spt n60 calculator', 'standard penetration test n value correction formula online', 'overburden correction factor cn spt calculator', 'hammer energy ratio er 60 spt n value calculator', 'geotechnical foundation bearing capacity spt online'],
    order: 998,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Field Blow Count N_field, Hammer Energy Ratio ER (%), Overburden Stress σ\'_v (kPa) & Rod Length (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spt-n">Field N Blows</label>
          <input class="tool-textarea" id="spt-n" type="number" step="1" value="18" placeholder="18 Blows/ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spt-er">Hammer ER (%)</label>
          <input class="tool-textarea" id="spt-er" type="number" step="5" value="75.0" placeholder="75.0% (Auto Trip)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spt-sig">Stress σ\'_v (kPa)</label>
          <input class="tool-textarea" id="spt-sig" type="number" step="10" value="100.0" placeholder="100.0 kPa (1 atm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spt-rod">Rod Length (m)</label>
          <input class="tool-textarea" id="spt-rod" type="number" step="1" value="8.0" placeholder="8.0 m" />
        </div>
      </div>
      <div id="spt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spt-res-n60" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N₆₀ = 21 | (N₁)₆₀ = 21 (Medium Dense Sand)</span>
            <span class="stat-label">Corrected 60% Energy & Overburden Normalized Blow Count</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spt-res-phi" style="color:var(--green-dark); font-weight:700;">Estimated Friction Angle φ\' ≈ 33.5° | Relative Density D_r ≈ 55% | Low Liquefaction Risk</span>
            <span class="stat-label">Soil Internal Friction Angle & Relative Density</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('spt-n'), erEl = document.getElementById('spt-er');
  const sigEl = document.getElementById('spt-sig'), rodEl = document.getElementById('spt-rod');
  const n60ResEl = document.getElementById('spt-res-n60'), phiResEl = document.getElementById('spt-res-phi');

  function update() {
    const N_field = parseFloat(nEl.value), ER = parseFloat(erEl.value);
    const sigma_v = parseFloat(sigEl.value), rodLen = parseFloat(rodEl.value);

    if (isNaN(N_field) || isNaN(ER) || isNaN(sigma_v) || isNaN(rodLen) || N_field <= 0 || ER <= 0 || sigma_v <= 0) return;

    // Energy correction: C_E = ER / 60
    const C_E = ER / 60.0;

    // Rod length correction C_R:
    let C_R = 1.0;
    if (rodLen < 4.0) C_R = 0.75;
    else if (rodLen < 6.0) C_R = 0.85;
    else if (rodLen < 10.0) C_R = 0.95;
    else C_R = 1.00;

    // N60 = N_field * C_E * C_R (assuming standard borehole CB=1.0, liner CS=1.0)
    const N60 = N_field * C_E * C_R;

    // Overburden correction factor C_N = sqrt( 100 / sigma_v ) [Liao & Whitman 1986] capped at 2.0
    const C_N = Math.min(2.0, Math.sqrt(100.0 / sigma_v));
    const N1_60 = N60 * C_N;

    const roundN60 = Math.round(N60);
    const roundN160 = Math.round(N1_60);

    // Empirical Peck-Hanson friction angle: phi approx = 27.1 + 0.3 * N1_60 - 0.00054 * N1_60^2
    const phi = Math.min(45.0, 27.1 + (0.3 * N1_60) - (0.00054 * Math.pow(N1_60, 2)));

    let density = '';
    if (roundN160 < 4) density = 'Very Loose Sand (High Liquefaction Risk)';
    else if (roundN160 < 10) density = 'Loose Sand';
    else if (roundN160 < 30) density = 'Medium Dense Sand';
    else if (roundN160 < 50) density = 'Dense Sand';
    else density = 'Very Dense Sand / Hard Clay';

    n60ResEl.textContent = 'N₆₀ = ' + roundN60 + ' | (N₁)₆₀ = ' + roundN160 + ' (' + density + ')';
    phiResEl.textContent = 'Estimated Friction Angle φ\' ≈ ' + phi.toFixed(1) + '° | Overburden C_N = ' + C_N.toFixed(2) + ' (C_E = ' + C_E.toFixed(2) + ', C_R = ' + C_R + ')';
  }

  [nEl, erEl, sigEl, rodEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw field Standard Penetration Test blow count $N_{\text{field}}$ (blows per 300 mm penetration).',
      'Enter drill rig hammer energy ratio ER % (typically 60% for safety hammer, 75-80% for automatic trip hammer).',
      'Enter effective vertical overburden stress $\sigma\'_v$ in kPa.',
      'Enter drill rod length in meters.',
      'Inspect standardized $N_{60}$, overburden-normalized $(N_1)_{60}$, and estimated soil internal friction angle $\phi\'$.'
    ],
    benefitTitle: 'ASTM D1586 Geotechnical Standard Penetration Correction',
    benefitContent: 'Raw blow counts vary widely depending on drill rig hammer efficiency and test depth; standardizing to $(N_1)_{60}$ ensures consistent foundation bearing capacity design and seismic soil liquefaction triggering evaluations.',
    faqs: [{ q: 'Why is N60 normalized to 60% hammer energy?', a: 'Historical geotechnical design charts were calibrated against standard safety hammers delivering approximately 60% of theoretical potential energy ($475\text{ J}$).' }]
  },

  // 18. Black-Scholes Option Greeks (Delta, Gamma, Theta, Vega) Calculator
  {
    slug: 'black-scholes-merton-call-put-option-greeks-delta-gamma-calculator',
    name: 'Black-Scholes Option Greeks (Delta, Gamma, Theta, Vega, Rho) Calculator',
    description: 'Calculate European financial options sensitivity Greeks: Delta (Δ = ∂V/∂S), Gamma (Γ = ∂²V/∂S²), Theta (Θ = ∂V/∂t time decay), and Vega (ν = ∂V/∂σ volatility exposure) for derivative risk management.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['option greeks calculator', 'black scholes delta gamma theta vega calculator online', 'call put option greeks calculator quantitative finance', 'time decay theta option pricing greeks calculator', 'implied volatility vega delta hedging online'],
    order: 999,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stock Price S ($), Strike K ($), Volatility σ (%), Time T (Days) & Risk-Free Rate r (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gk-s">Stock S ($)</label>
          <input class="tool-textarea" id="gk-s" type="number" step="1" value="100.0" placeholder="100.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gk-k">Strike K ($)</label>
          <input class="tool-textarea" id="gk-k" type="number" step="1" value="100.0" placeholder="100.0 (ATM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gk-vol">Vol σ (%)</label>
          <input class="tool-textarea" id="gk-vol" type="number" step="1" value="25.0" placeholder="25.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gk-days">Time T (Days)</label>
          <input class="tool-textarea" id="gk-days" type="number" step="5" value="30.0" placeholder="30 Days" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gk-r">Rate r (%)</label>
          <input class="tool-textarea" id="gk-r" type="number" step="0.5" value="5.0" placeholder="5.0%" />
        </div>
      </div>
      <div id="gk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gk-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Call Delta Δ = +0.53 | Put Delta Δ = -0.47</span>
            <span class="stat-label">Hedge Ratio Delta (∂V / ∂S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gk-res-other" style="color:var(--green-dark); font-weight:700;">Gamma Γ = 0.055 | Theta Θ = -$0.057/day | Vega ν = $0.114/% vol</span>
            <span class="stat-label">Gamma (Curvature), Theta (Time Decay) & Vega (Volatility Exposure)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('gk-s'), kEl = document.getElementById('gk-k');
  const volEl = document.getElementById('gk-vol'), dEl = document.getElementById('gk-days'), rEl = document.getElementById('gk-r');
  const dlResEl = document.getElementById('gk-res-delta'), otResEl = document.getElementById('gk-res-other');

  function stdNormCdf(x) {
    return 0.5 * (1.0 + Math.sign(x) * Math.sqrt(1.0 - Math.exp(-2.0 * Math.pow(x, 2) / Math.PI)));
  }

  function stdNormPdf(x) {
    return (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * Math.pow(x, 2));
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const sigma = parseFloat(volEl.value) / 100.0;
    const T = parseFloat(dEl.value) / 365.25;
    const r = parseFloat(rEl.value) / 100.0;

    if (isNaN(S) || isNaN(K) || isNaN(sigma) || isNaN(T) || isNaN(r) || S <= 0 || K <= 0 || sigma <= 0 || T <= 0) return;

    const d1 = (Math.log(S / K) + (r + 0.5 * Math.pow(sigma, 2)) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - (sigma * Math.sqrt(T));

    const N_d1 = stdNormCdf(d1);
    const N_prime_d1 = stdNormPdf(d1);

    // Call Delta = N(d1), Put Delta = N(d1) - 1
    const call_delta = N_d1;
    const put_delta = N_d1 - 1.0;

    // Gamma = N'(d1) / (S * sigma * sqrt(T))
    const gamma = N_prime_d1 / (S * sigma * Math.sqrt(T));

    // Vega = S * N'(d1) * sqrt(T) / 100  [per 1% vol change]
    const vega_1pct = (S * N_prime_d1 * Math.sqrt(T)) / 100.0;

    // Theta (Call) per calendar day:
    const theta_call_annual = -( (S * N_prime_d1 * sigma) / (2.0 * Math.sqrt(T)) ) - ( r * K * Math.exp(-r * T) * stdNormCdf(d2) );
    const theta_call_day = theta_call_annual / 365.25;

    dlResEl.textContent = 'Call Delta Δ = +' + call_delta.toFixed(2) + ' | Put Delta Δ = ' + put_delta.toFixed(2);
    otResEl.textContent = 'Gamma Γ = ' + gamma.toFixed(3) + ' | Theta Θ = $' + theta_call_day.toFixed(3) + '/day | Vega ν = $' + vega_1pct.toFixed(3) + '/% vol';
  }

  [sEl, kEl, volEl, dEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spot underlying stock price S ($).',
      'Enter options strike price K ($).',
      'Enter implied volatility $\sigma$ in %.',
      'Enter days to expiration T and annual risk-free interest rate r (%).',
      'Inspect Delta ($\Delta$), Gamma ($\Gamma$), daily Theta decay ($\Theta$), and Vega ($\nu$) sensitivity.'
    ],
    benefitTitle: 'Fischer Black, Myron Scholes & Robert Merton 1973 Option Greeks',
    benefitContent: 'Option Greeks quantify dynamic portfolio risk exposures: Delta ($\Delta$) indicates directional exposure and hedging ratio, Gamma ($\Gamma$) measures Delta curvature risk, and Theta ($\Theta$) measures unavoidable time decay.',
    faqs: [{ q: 'What does a Delta of 0.50 indicate?', a: 'A Delta of 0.50 means the option price increases by $0.50 for every $1.00 increase in the underlying stock price.' }]
  },

  // 19. Macaulay Duration & Modified Duration Bond Price Sensitivity Calculator
  {
    slug: 'macaulay-duration-modified-duration-bond-convexity-calculator',
    name: 'Macaulay Duration & Modified Duration (Bond Price Sensitivity ΔP/P ≈ -D_mod·Δy) Calculator',
    description: 'Calculate fixed income bond Macaulay Duration in years, Modified Duration (D_mod = D_mac / (1 + y)), and approximate percentage bond price changes (ΔP / P ≈ -D_mod · Δy) resulting from interest rate shifts.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['macaulay duration calculator', 'modified duration formula bond price sensitivity online', 'bond interest rate risk duration calculator', 'bond convexity price change duration calculator', 'fixed income portfolio duration online'],
    order: 1000,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bond Coupon Rate (%), Yield to Maturity YTM (%), Maturity (Years) & Interest Rate Shift Δy (bps)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dur-cpn">Coupon (%)</label>
          <input class="tool-textarea" id="dur-cpn" type="number" step="0.5" value="5.0" placeholder="5.0% Annual" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dur-ytm">YTM (%)</label>
          <input class="tool-textarea" id="dur-ytm" type="number" step="0.25" value="5.0" placeholder="5.0% YTM (Par)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dur-mat">Maturity (Years)</label>
          <input class="tool-textarea" id="dur-mat" type="number" step="1" value="10" placeholder="10 Years" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dur-dy">Rate Shift (bps)</label>
          <input class="tool-textarea" id="dur-dy" type="number" step="25" value="100" placeholder="+100 bps (+1.0%)" />
        </div>
      </div>
      <div id="dur-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dur-res-mac" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Macaulay Duration = 8.11 Years</span>
            <span class="stat-label">Weighted Average Cash Flow Maturity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dur-res-mod" style="color:var(--green-dark); font-weight:700;">Modified Duration = 7.72 | Price Impact: -7.72% for a +100 bps rate hike</span>
            <span class="stat-label">Modified Duration (D_mod) & Interest Rate Sensitivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cpnEl = document.getElementById('dur-cpn'), ytmEl = document.getElementById('dur-ytm');
  const matEl = document.getElementById('dur-mat'), dyEl = document.getElementById('dur-dy');
  const macResEl = document.getElementById('dur-res-mac'), modResEl = document.getElementById('dur-res-mod');

  function update() {
    const cpn_pct = parseFloat(cpnEl.value), ytm_pct = parseFloat(ytmEl.value);
    const N = parseInt(matEl.value, 10), dy_bps = parseFloat(dyEl.value);

    if (isNaN(cpn_pct) || isNaN(ytm_pct) || isNaN(N) || isNaN(dy_bps) || N <= 0 || ytm_pct <= 0) return;

    const y = ytm_pct / 100.0;
    const c = cpn_pct / 100.0;
    const M = 1000.0; // Par value
    const coupon = c * M;

    // Calculate bond price P and weighted time sum:
    let P = 0, weightedTimeSum = 0;
    for (let t = 1; t <= N; t++) {
      const cf = (t === N) ? (coupon + M) : coupon;
      const pv = cf / Math.pow(1.0 + y, t);
      P += pv;
      weightedTimeSum += t * pv;
    }

    // Macaulay Duration D_mac = sum( t * PV_t ) / P
    const D_mac = weightedTimeSum / P;

    // Modified Duration D_mod = D_mac / (1 + y)
    const D_mod = D_mac / (1.0 + y);

    // Price change: %DeltaP approx = -D_mod * Delta_y
    const dy = (dy_bps / 10000.0); // 1 bps = 0.0001
    const pctPriceChange = -D_mod * dy * 100.0;

    macResEl.textContent = 'Macaulay Duration = ' + D_mac.toFixed(2) + ' Years';
    modResEl.textContent = 'Modified Duration = ' + D_mod.toFixed(2) + ' | Price Change: ' + (pctPriceChange >= 0 ? '+' : '') + pctPriceChange.toFixed(2) + '% for a ' + (dy_bps >= 0 ? '+' : '') + dy_bps + ' bps rate shift';
  }

  [cpnEl, ytmEl, matEl, dyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter bond annual coupon interest rate (%).',
      'Enter current market Yield to Maturity (YTM %).',
      'Enter bond maturity term in years.',
      'Enter projected central bank interest rate shift in basis points (bps, where 100 bps = 1.0%).',
      'Inspect Macaulay duration, Modified duration, and predicted bond portfolio price change.'
    ],
    benefitTitle: 'Frederick Macaulay 1938 Interest Rate Risk Metric',
    benefitContent: 'Duration measures the effective price sensitivity of a bond to interest rate fluctuations ($\frac{\Delta P}{P} \approx -D_{\text{mod}} \Delta y$); matching asset and liability durations is the cornerstone of pension fund immunization.',
    faqs: [{ q: 'Why is Macaulay duration shorter than the maturity for coupon bonds?', a: 'Because intermediate coupon cash flows returned before maturity shorten the weighted average time until investment capital is recovered.' }]
  },

  // 20. Bond Yield to Maturity (YTM) & Pricing Calculator
  {
    slug: 'yield-to-maturity-ytm-zero-coupon-bond-pricing-calculator',
    name: 'Bond Pricing & Yield to Maturity (YTM = [(C + (M-P)/n) / ((M+P)/2)]) Calculator',
    description: 'Calculate fixed coupon bond present value price (P = Σ C/(1+y)^t + M/(1+y)^n) and approximate Yield to Maturity (YTM) for finance students and bond traders.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['yield to maturity calculator', 'ytm bond formula coupon price par value online', 'bond pricing present value cash flows calculator', 'zero coupon bond ytm calculator', 'fixed income investment bond yield calculator online'],
    order: 1001,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Annual Coupon Rate (%), Par Value M ($), Market Price P ($) & Years to Maturity n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ytm-cpn">Coupon (%)</label>
          <input class="tool-textarea" id="ytm-cpn" type="number" step="0.5" value="6.0" placeholder="6.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ytm-price">Price P ($)</label>
          <input class="tool-textarea" id="ytm-price" type="number" step="10" value="950.0" placeholder="$950.00 (Discount)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ytm-par">Par M ($)</label>
          <input class="tool-textarea" id="ytm-par" type="number" step="100" value="1000.0" placeholder="$1,000 Par" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ytm-n">Maturity (Years)</label>
          <input class="tool-textarea" id="ytm-n" type="number" step="1" value="5" placeholder="5 Years" />
        </div>
      </div>
      <div id="ytm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ytm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">YTM ≈ 7.18% (Discount Bond)</span>
            <span class="stat-label">Yield to Maturity (Internal Rate of Return)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ytm-res-status" style="color:var(--green-dark); font-weight:700;">Current Yield = 6.32% | Trading at a $50.00 Discount below Par ($1,000)</span>
            <span class="stat-label">Current Yield & Capital Gain Yield</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cpnEl = document.getElementById('ytm-cpn'), pEl = document.getElementById('ytm-price');
  const mEl = document.getElementById('ytm-par'), nEl = document.getElementById('ytm-n');
  const ytmResEl = document.getElementById('ytm-res-val'), stResEl = document.getElementById('ytm-res-status');

  function update() {
    const cpn_pct = parseFloat(cpnEl.value), P = parseFloat(pEl.value);
    const M = parseFloat(mEl.value), n = parseFloat(nEl.value);

    if (isNaN(cpn_pct) || isNaN(P) || isNaN(M) || isNaN(n) || P <= 0 || M <= 0 || n <= 0) return;

    const C = (cpn_pct / 100.0) * M;

    // Approximate YTM formula: YTM = [ C + (M - P)/n ] / [ (M + P) / 2 ]
    const num = C + ((M - P) / n);
    const den = (M + P) / 2.0;
    const approxYTM = (num / den) * 100.0;

    const currentYield = (C / P) * 100.0;
    const diff = P - M;

    let trade = '';
    let color = '#22543d';

    if (diff < -1) { trade = 'DISCOUNT BOND (Price < Par -> YTM > Coupon Rate)'; color = '#22543d'; }
    else if (diff > 1) { trade = 'PREMIUM BOND (Price > Par -> YTM < Coupon Rate)'; color = '#2563eb'; }
    else { trade = 'PAR BOND (Price = Par -> YTM = Coupon Rate)'; color = '#22543d'; }

    ytmResEl.textContent = 'YTM ≈ ' + approxYTM.toFixed(2) + '%';
    ytmResEl.style.color = color;
    stResEl.textContent = 'Current Yield = ' + currentYield.toFixed(2) + '% | ' + trade;
    stResEl.style.color = color;
  }

  [cpnEl, pEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter annual coupon interest rate (%).',
      'Enter bond current market trading purchase price P ($).',
      'Enter maturity face par value M ($1,000 standard).',
      'Enter remaining years to maturity n.',
      'Inspect total Yield to Maturity (YTM) annualized internal rate of return.'
    ],
    benefitTitle: 'Fixed Income Internal Rate of Return',
    benefitContent: 'Yield to Maturity (YTM) represents the total expected annualized return if the bond is held until maturity and all coupon payments are reinvested at the same rate, enabling direct comparisons between discount and premium bonds.',
    faqs: [{ q: 'What is the difference between Current Yield and YTM?', a: 'Current Yield ($\text{Coupon} / \text{Price}$) only measures immediate annual interest income; YTM includes both coupon income and capital gains/losses at maturity.' }]
  },

  // 21. Capital Asset Pricing Model (Sharpe, Treynor & Jensen's Alpha) Portfolio Metrics
  {
    slug: 'capital-asset-pricing-model-sharpe-treynor-jensen-alpha-calculator',
    name: 'Portfolio Performance Risk Metrics (Sharpe, Treynor & Jensen\'s Alpha) Calculator',
    description: 'Calculate investment portfolio risk-adjusted performance metrics: Sharpe Ratio ((R_p - R_f) / σ_p), Treynor Ratio ((R_p - R_f) / β_p), and Jensen\'s Alpha (α = R_p - [R_f + β_p·(R_m - R_f)]) for finance courses.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['sharpe ratio calculator', 'treynor ratio jensens alpha formula finance online', 'portfolio risk adjusted return calculator', 'capm expected return benchmark alpha calculator', 'investment fund performance metrics online'],
    order: 1002,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Portfolio Return R_p (%), Risk-Free Rate R_f (%), Market Return R_m (%), Beta β & Std Dev σ (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cap-rp">Portfolio R_p (%)</label>
          <input class="tool-textarea" id="cap-rp" type="number" step="0.5" value="14.0" placeholder="14.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-rf">Risk-Free R_f (%)</label>
          <input class="tool-textarea" id="cap-rf" type="number" step="0.25" value="4.0" placeholder="4.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-rm">Market R_m (%)</label>
          <input class="tool-textarea" id="cap-rm" type="number" step="0.5" value="10.0" placeholder="10.0% (S&P 500)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-beta">Beta (β)</label>
          <input class="tool-textarea" id="cap-beta" type="number" step="0.1" value="1.20" placeholder="1.20" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-sd">Volatility σ (%)</label>
          <input class="tool-textarea" id="cap-sd" type="number" step="1" value="16.0" placeholder="16.0%" />
        </div>
      </div>
      <div id="cap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cap-res-alpha" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Jensen\'s Alpha α = +2.80% (Outperformance)</span>
            <span class="stat-label">Excess Risk-Adjusted Abnormal Alpha Return</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-ratios" style="color:var(--green-dark); font-weight:700;">Sharpe Ratio = 0.625 | Treynor Ratio = 8.33% | CAPM Expected Return = 11.20%</span>
            <span class="stat-label">Sharpe (Total Risk) & Treynor (Systematic Risk) Ratios</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('cap-rp'), rfEl = document.getElementById('cap-rf');
  const rmEl = document.getElementById('cap-rm'), bEl = document.getElementById('cap-beta'), sdEl = document.getElementById('cap-sd');
  const alResEl = document.getElementById('cap-res-alpha'), rtResEl = document.getElementById('cap-res-ratios');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value);
    const Rm = parseFloat(rmEl.value), beta = parseFloat(bEl.value), sigma = parseFloat(sdEl.value);

    if (isNaN(Rp) || isNaN(Rf) || isNaN(Rm) || isNaN(beta) || isNaN(sigma) || sigma <= 0 || beta <= 0) return;

    // CAPM expected return: E(R) = Rf + beta * (Rm - Rf)
    const capm_expected = Rf + (beta * (Rm - Rf));

    // Jensen's Alpha: alpha = Rp - E(R)
    const alpha = Rp - capm_expected;

    // Sharpe Ratio = (Rp - Rf) / sigma
    const sharpe = (Rp - Rf) / sigma;

    // Treynor Ratio = (Rp - Rf) / beta
    const treynor = (Rp - Rf) / beta;

    alResEl.textContent = "Jensen's Alpha α = " + (alpha >= 0 ? '+' : '') + alpha.toFixed(2) + '%';
    alResEl.style.color = alpha >= 0 ? '#22543d' : '#c53030';
    rtResEl.textContent = 'Sharpe = ' + sharpe.toFixed(3) + ' | Treynor = ' + treynor.toFixed(2) + '% | CAPM Required Return = ' + capm_expected.toFixed(2) + '%';
  }

  [rpEl, rfEl, rmEl, bEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter realized portfolio return $R_p$ (%).',
      'Enter risk-free benchmark rate $R_f$ (%) and market index return $R_m$ (%).',
      'Enter portfolio systematic risk Beta ($\beta$) and total standard deviation volatility ($\sigma$ %).',
      'Inspect Jensen\'s Alpha ($\alpha$), Sharpe Ratio, and Treynor Ratio.'
    ],
    benefitTitle: 'Modern Portfolio Theory Performance Metrics',
    benefitContent: 'A positive Jensen\'s Alpha ($\alpha > 0$) demonstrates that a fund manager generated true abnormal excess returns beyond what is explained by market risk exposures ($\beta$).',
    faqs: [{ q: 'What is the difference between Sharpe Ratio and Treynor Ratio?', a: 'Sharpe ratio divides excess return by total volatility ($\sigma$), while Treynor ratio divides by systematic market risk ($\beta$).' }]
  },

  // 22. Welfare Economics Consumer Surplus, Producer Surplus & Deadweight Loss Calculator
  {
    slug: 'consumer-surplus-producer-surplus-deadweight-loss-calculator',
    name: 'Microeconomics Welfare Surplus (Consumer Surplus, Producer Surplus & DWL) Calculator',
    description: 'Calculate market equilibrium Consumer Surplus (CS = ½·(P_max - P*)·Q*), Producer Surplus (PS = ½·(P* - P_min)·Q*), and Deadweight Loss (DWL) from price ceilings, price floors, or taxation in microeconomics.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['consumer surplus calculator', 'producer surplus deadweight loss dwl formula online', 'economic welfare total surplus market equilibrium calculator', 'price ceiling tax deadweight loss calculator', 'microeconomics supply demand surplus online'],
    order: 1003,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Demand Choke Price P_max ($), Supply Intercept P_min ($), Equilibrium Price P* ($) & Quantity Q*',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cs-pmax">Demand P_max</label>
          <input class="tool-textarea" id="cs-pmax" type="number" step="5" value="100.0" placeholder="$100.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-pmin">Supply P_min</label>
          <input class="tool-textarea" id="cs-pmin" type="number" step="5" value="20.0" placeholder="$20.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-peq">Equilibrium P*</label>
          <input class="tool-textarea" id="cs-peq" type="number" step="5" value="60.0" placeholder="$60.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-qeq">Equilibrium Q*</label>
          <input class="tool-textarea" id="cs-qeq" type="number" step="50" value="500" placeholder="500 Units" />
        </div>
      </div>
      <div id="cs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cs-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Social Welfare = $20,000</span>
            <span class="stat-label">Total Social Economic Surplus (CS + PS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cs-res-break" style="color:var(--green-dark); font-weight:700;">Consumer Surplus CS = $10,000 (50%) | Producer Surplus PS = $10,000 (50%)</span>
            <span class="stat-label">Surplus Distribution Between Buyers and Sellers</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pmaxEl = document.getElementById('cs-pmax'), pminEl = document.getElementById('cs-pmin');
  const peqEl = document.getElementById('cs-peq'), qeqEl = document.getElementById('cs-qeq');
  const totResEl = document.getElementById('cs-res-tot'), brkResEl = document.getElementById('cs-res-break');

  function update() {
    const P_max = parseFloat(pmaxEl.value), P_min = parseFloat(pminEl.value);
    const P_eq = parseFloat(peqEl.value), Q_eq = parseFloat(qeqEl.value);

    if (isNaN(P_max) || isNaN(P_min) || isNaN(P_eq) || isNaN(Q_eq) || P_max <= P_eq || P_eq <= P_min || Q_eq <= 0) return;

    // Consumer surplus CS = 0.5 * ( P_max - P_eq ) * Q_eq
    const CS = 0.5 * (P_max - P_eq) * Q_eq;

    // Producer surplus PS = 0.5 * ( P_eq - P_min ) * Q_eq
    const PS = 0.5 * (P_eq - P_min) * Q_eq;

    const totalSurplus = CS + PS;

    totResEl.textContent = 'Total Welfare = $' + Math.round(totalSurplus).toLocaleString();
    brkResEl.textContent = 'Consumer CS = $' + Math.round(CS).toLocaleString() + ' (' + (CS/totalSurplus*100).toFixed(1) + '%) | Producer PS = $' + Math.round(PS).toLocaleString() + ' (' + (PS/totalSurplus*100).toFixed(1) + '%)';
  }

  [pmaxEl, pminEl, peqEl, qeqEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum demand choke price $P_{\max}$ (price where quantity demanded drops to 0).',
      'Enter minimum supply intercept price $P_{\min}$.',
      'Enter market equilibrium clearing price $P^*$ and quantity $Q^*$.',
      'Inspect Consumer Surplus, Producer Surplus, and Total Economic Welfare.'
    ],
    benefitTitle: 'First Fundamental Theorem of Welfare Economics',
    benefitContent: 'Competitive market equilibrium maximizes total social surplus ($CS + PS$); government taxes or price caps create Deadweight Loss (DWL) by preventing mutually beneficial voluntary transactions.',
    faqs: [{ q: 'What is Consumer Surplus?', a: 'Consumer surplus is the monetary difference between the maximum price buyers are willing to pay and the actual lower price they pay.' }]
  },

  // 23. IS-LM Macroeconomic Equilibrium Interest Rate & National Income Calculator
  {
    slug: 'is-lm-model-equilibrium-interest-rate-national-income-calculator',
    name: 'IS-LM Model Equilibrium Interest Rate (r*) & National Income (Y*) Calculator',
    description: 'Calculate macroeconomic simultaneous goods market (IS curve: Y = C + I + G) and money market (LM curve: M/P = L(Y, r)) equilibrium national income Y* and interest rate r* under the Hicks-Hansen Keynesian model.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['is lm model calculator', 'goods market money market equilibrium is lm formula online', 'hicks hansen is lm national income interest rate calculator', 'fiscal policy monetary policy is lm shift calculator', 'macroeconomics is lm equilibrium online'],
    order: 1004,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Government Spending G ($B), Autonomous Investment I₀ ($B), Real Money Supply M/P ($B) & MPC',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="is-g">Govt Spending G</label>
          <input class="tool-textarea" id="is-g" type="number" step="50" value="400" placeholder="400 ($B)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-i0">Investment I₀</label>
          <input class="tool-textarea" id="is-i0" type="number" step="50" value="300" placeholder="300 ($B)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-mp">Money M/P</label>
          <input class="tool-textarea" id="is-mp" type="number" step="50" value="500" placeholder="500 ($B Real Money)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-mpc">MPC (c)</label>
          <input class="tool-textarea" id="is-mpc" type="number" step="0.05" value="0.80" placeholder="0.80" />
        </div>
      </div>
      <div id="is-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="is-res-eq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Income Y* = $2,500 B | Rate r* = 5.00%</span>
            <span class="stat-label">Simultaneous IS-LM Macroeconomic Equilibrium</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="is-res-mult" style="color:var(--green-dark); font-weight:700;">Keynesian Multiplier k = 5.00 (1 / (1 - MPC)) | Full Goods & Money Equilibrium</span>
            <span class="stat-label">Fiscal Multiplier & Policy Transmission</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('is-g'), i0El = document.getElementById('is-i0');
  const mpEl = document.getElementById('is-mp'), mpcEl = document.getElementById('is-mpc');
  const eqResEl = document.getElementById('is-res-eq'), mlResEl = document.getElementById('is-res-mult');

  function update() {
    const G = parseFloat(gEl.value), I0 = parseFloat(i0El.value);
    const MP = parseFloat(mpEl.value), mpc = parseFloat(mpcEl.value);

    if (isNaN(G) || isNaN(I0) || isNaN(MP) || isNaN(mpc) || mpc <= 0 || mpc >= 1.0) return;

    // Keynesian multiplier k = 1 / (1 - mpc)
    const k = 1.0 / (1.0 - mpc);

    // Simplified IS curve: Y = k * ( I0 + G - 20 * r )
    // Simplified LM curve: r = 0.01 * Y - (MP / 100)
    // Solving simultaneous linear system:
    // Y = k*(I0 + G) - 20*k*(0.01*Y - MP/100)
    // Y * (1 + 0.2*k) = k*(I0 + G) + 0.2*k*MP
    const Y_star = (k * (I0 + G) + (0.2 * k * MP)) / (1.0 + (0.2 * k));
    const r_star = Math.max(0, (0.01 * Y_star) - (MP / 100.0));

    eqResEl.textContent = 'Income Y* = $' + Math.round(Y_star).toLocaleString() + ' B | Rate r* = ' + r_star.toFixed(2) + '%';
    mlResEl.textContent = 'Keynesian Multiplier k = ' + k.toFixed(2) + ' (1 / (1 - ' + mpc + ')) | IS-LM Equilibrium';
  }

  [gEl, i0El, mpEl, mpcEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter government spending G in $ Billions.',
      'Enter autonomous private investment $I_0$ in $ Billions.',
      'Enter real money supply $M/P$ in $ Billions.',
      'Enter Marginal Propensity to Consume (MPC).',
      'Inspect simultaneous goods and money market macroeconomic equilibrium national income $Y^*$ and interest rate $r^*$.'
    ],
    benefitTitle: 'John Hicks 1937 & Alvin Hansen IS-LM Framework',
    benefitContent: 'The IS-LM model synthesizes classical monetary theory with Keynesian aggregate demand, explaining how fiscal expansion (G) raises income but crowds out investment via higher interest rates.',
    faqs: [{ q: 'What shifts the IS curve vs LM curve?', a: 'Fiscal policy (taxes, government spending) shifts the IS curve; monetary policy (central bank money supply) shifts the LM curve.' }]
  },

  // 24. Solow-Swan Neoclassical Growth Model Steady-State Capital Calculator
  {
    slug: 'solow-swan-growth-model-steady-state-capital-labor-calculator',
    name: 'Solow-Swan Neoclassical Economic Growth Steady-State (k*) Calculator',
    description: 'Calculate macroeconomic Solow-Swan steady-state capital per worker (k* = [s·A / (n + g + δ)]^(1/(1-α))), steady-state output per worker (y* = A·k*^α), and Golden Rule consumption level.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['solow swan growth calculator', 'steady state capital per worker formula solow model online', 'golden rule capital stock calculator economics', 'savings rate depreciation population growth solow calculator', 'macroeconomics neoclassical growth model online'],
    order: 1005,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Savings Rate s (%), Population Growth n (%), Depreciation δ (%), Tech Growth g (%) & Capital Share α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-s">Savings Rate s</label>
          <input class="tool-textarea" id="sol-s" type="number" step="2" value="20.0" placeholder="20.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-n">Pop Growth n</label>
          <input class="tool-textarea" id="sol-n" type="number" step="0.5" value="1.5" placeholder="1.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-del">Depreciation δ</label>
          <input class="tool-textarea" id="sol-del" type="number" step="0.5" value="5.0" placeholder="5.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-al">Capital Share α</label>
          <input class="tool-textarea" id="sol-al" type="number" step="0.05" value="0.33" placeholder="0.33" />
        </div>
      </div>
      <div id="sol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-kstar" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Steady-State k* = 4.41 | Output y* = 1.63</span>
            <span class="stat-label">Long-Run Steady-State Capital & Output per Worker</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-cstar" style="color:var(--green-dark); font-weight:700;">Consumption c* = 1.30 per worker | Golden Rule Savings s_gold = 33.0% (s < s_gold: Below Golden Rule)</span>
            <span class="stat-label">Steady-State Consumption & Golden Rule Capital Level</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sol-s'), nEl = document.getElementById('sol-n');
  const dEl = document.getElementById('sol-del'), alEl = document.getElementById('sol-al');
  const kResEl = document.getElementById('sol-res-kstar'), cResEl = document.getElementById('sol-res-cstar');

  function update() {
    const s_pct = parseFloat(sEl.value), n_pct = parseFloat(nEl.value);
    const del_pct = parseFloat(dEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(s_pct) || isNaN(n_pct) || isNaN(del_pct) || isNaN(alpha) || s_pct <= 0 || del_pct <= 0 || alpha <= 0 || alpha >= 1) return;

    const s = s_pct / 100.0;
    const n = n_pct / 100.0;
    const delta = del_pct / 100.0;
    const breakeven = n + delta; // Effective depreciation rate

    // Steady-state capital per worker: s * k^alpha = breakeven * k => k^(1-alpha) = s / breakeven
    // k* = ( s / breakeven )^( 1 / (1 - alpha) )
    const k_star = Math.pow(s / breakeven, 1.0 / (1.0 - alpha));
    const y_star = Math.pow(k_star, alpha);
    const c_star = (1.0 - s) * y_star;

    // Golden Rule savings rate equals capital share alpha (s_gold = alpha)
    const s_gold_pct = alpha * 100.0;

    kResEl.textContent = 'Steady-State k* = ' + k_star.toFixed(2) + ' | Output y* = ' + y_star.toFixed(2);
    cResEl.textContent = 'Consumption c* = ' + c_star.toFixed(2) + ' | Golden Rule Savings s_gold = ' + s_gold_pct.toFixed(1) + '% (' + (s_pct < s_gold_pct ? 'Below Golden Rule' : 'Above Golden Rule') + ')';
  }

  [sEl, nEl, dEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter national investment savings rate s (%).',
      'Enter population workforce growth rate n (%).',
      'Enter physical capital depreciation rate $\delta$ (%).',
      'Enter capital output elasticity $\alpha$ (typically $0.33$).',
      'Inspect long-run steady-state capital stock per worker ($k^*$), output per worker ($y^*$), and Golden Rule consumption level.'
    ],
    benefitTitle: 'Robert Solow 1987 Nobel Prize Growth Theory',
    benefitContent: 'Capital accumulation alone cannot sustain long-run per capita economic growth due to diminishing marginal returns; long-run economic growth is driven exclusively by technological progress (Total Factor Productivity).',
    faqs: [{ q: 'What is the Golden Rule level of capital?', a: 'The Golden Rule capital stock maximizes steady-state consumption per worker ($c^*$), achieved when the savings rate equals capital share of income ($s = \alpha$).' }]
  },

  // 25. Slutsky Equation Income & Substitution Effect Decomposition Calculator
  {
    slug: 'giffen-good-income-and-substitution-effects-slutsky-calculator',
    name: 'Slutsky Equation Income & Substitution Effects (Δx = Δx^s + Δx^m) Calculator',
    description: 'Decompose total consumer demand response to price changes into the pure Substitution Effect (Δx^s negative) and Income Effect (Δx^m) using the Slutsky Equation to identify Normal, Inferior, and Giffen goods.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['slutsky equation calculator', 'income and substitution effect decomposition formula online', 'giffen good inferior good normal good calculator', 'hicksian vs slutsky demand substitution effect calculator', 'microeconomics consumer choice theory online'],
    order: 1006,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Price Change Δp ($), Substitution Effect Δx^s (Units) & Income Effect Δx^m (Units)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sl-dp">Price Change Δp</label>
          <input class="tool-textarea" id="sl-dp" type="number" step="1" value="5.0" placeholder="+$5.00 (Price Hike)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sl-sub">Substitution Δx^s</label>
          <input class="tool-textarea" id="sl-sub" type="number" step="1" value="-8.0" placeholder="-8.0 Units" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sl-inc">Income Effect Δx^m</label>
          <input class="tool-textarea" id="sl-inc" type="number" step="1" value="-4.0" placeholder="-4.0 Units" />
        </div>
      </div>
      <div id="sl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sl-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Demand Change Δx = -12.0 Units</span>
            <span class="stat-label">Total Consumer Demand Change (Δx = Δx^s + Δx^m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sl-res-type" style="color:var(--green-dark); font-weight:700;">NORMAL GOOD: Substitution (-8) and Income (-4) effects work in the same direction</span>
            <span class="stat-label">Economic Good Classification (Normal vs Inferior vs Giffen)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('sl-dp'), sEl = document.getElementById('sl-sub'), mEl = document.getElementById('sl-inc');
  const totResEl = document.getElementById('sl-res-tot'), tpResEl = document.getElementById('sl-res-type');

  function update() {
    const dp = parseFloat(dpEl.value), dx_s = parseFloat(sEl.value), dx_m = parseFloat(mEl.value);
    if (isNaN(dp) || isNaN(dx_s) || isNaN(dx_m)) return;

    // Slutsky identity: Total effect dx = dx_s + dx_m
    const total_dx = dx_s + dx_m;

    let classification = '';
    let color = '#22543d';

    if (dx_m <= 0) {
      classification = 'NORMAL GOOD (Substitution Δx^s = ' + dx_s + ' and Income Δx^m = ' + dx_m + ' both reduce consumption)';
      color = '#22543d';
    } else {
      if (Math.abs(dx_m) > Math.abs(dx_s)) {
        classification = 'GIFFEN GOOD (Income effect Δx^m = +' + dx_m + ' overpowers substitution Δx^s = ' + dx_s + ' -> Price hike increases demand!)';
        color = '#c53030';
      } else {
        classification = 'INFERIOR GOOD (Income effect is positive +' + dx_m + ' but outweighed by negative substitution effect)';
        color = '#2563eb';
      }
    }

    totResEl.textContent = 'Total Demand Change Δx = ' + (total_dx >= 0 ? '+' : '') + total_dx.toFixed(1) + ' Units';
    tpResEl.textContent = classification;
    tpResEl.style.color = color;
  }

  [dpEl, sEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter price change $\Delta p$ ($).',
      'Enter pure substitution effect $\Delta x^s$ along the compensated budget line (always negative for price increase).',
      'Enter purchasing power income effect $\Delta x^m$.',
      'Inspect total demand response and identify whether the commodity behaves as a Normal good, Inferior good, or rare Giffen good.'
    ],
    benefitTitle: 'Eugen Slutsky 1915 Consumer Choice Theorem',
    benefitContent: 'The Slutsky decomposition separates price changes into a relative price substitution effect and a real purchasing power income effect, proving that a Giffen good violating the Law of Demand requires extreme inferiority.',
    faqs: [{ q: 'What is a Giffen Good?', a: 'A Giffen good is an inferior good whose positive income effect is so strong that it overpowers the negative substitution effect, causing quantity demanded to increase when price rises.' }]
  }
];

pack34Tools.forEach(createTool);
console.log('Pack 34 complete: 25 tools created.');
