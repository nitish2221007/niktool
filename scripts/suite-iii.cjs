const { createTool } = require('./generate-curated-tools.cjs');

// Suite III: 5 Tools in Microeconomics, Elasticity of Demand, HHI & Deadweight Loss to reach 615 tools
const toolsSuiteIII = [
  // 1. Price Elasticity of Demand (PED Midpoint Arc) Calculator
  {
    slug: 'price-elasticity-of-demand-ped-calculator',
    name: 'Price Elasticity of Demand (PED Midpoint Arc) Calculator',
    description: 'Calculate Price Elasticity of Demand (PED = ((Q₂ - Q₁) / ((Q₁+Q₂)/2)) / ((P₂ - P₁) / ((P₁+P₂)/2))) using the standard symmetric midpoint method and total revenue impact.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['price elasticity of demand calculator', 'ped midpoint formula online', 'arc elasticity of demand calculator', 'elastic inelastic demand revenue test', 'microeconomics elasticity calculator online'],
    order: 488,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Initial Price P₁ ($), Initial Quantity Q₁, New Price P₂ ($) & New Quantity Q₂',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ped-p1">Initial Price P₁ ($)</label>
          <input class="tool-textarea" id="ped-p1" type="number" step="any" value="20.0" placeholder="$20.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-q1">Initial Quantity Q₁</label>
          <input class="tool-textarea" id="ped-q1" type="number" step="any" value="1000" placeholder="1000 units" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-p2">New Price P₂ ($)</label>
          <input class="tool-textarea" id="ped-p2" type="number" step="any" value="24.0" placeholder="$24.00 (+20%)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-q2">New Quantity Q₂</label>
          <input class="tool-textarea" id="ped-q2" type="number" step="any" value="750" placeholder="750 units (-25%)" />
        </div>
      </div>
      <div id="ped-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ped-res-ped" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">|PED| = 1.57 (Elastic)</span>
            <span class="stat-label">Price Elasticity of Demand</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ped-res-rev" style="color:#c53030; font-weight:700;">Revenue Drops -$2,000 (-10.0%)</span>
            <span class="stat-label">Total Revenue Effect ($20k → $18k)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('ped-p1'), q1El = document.getElementById('ped-q1');
  const p2El = document.getElementById('ped-p2'), q2El = document.getElementById('ped-q2');
  const pedResEl = document.getElementById('ped-res-ped'), revResEl = document.getElementById('ped-res-rev');

  function update() {
    const P1 = parseFloat(p1El.value), Q1 = parseFloat(q1El.value);
    const P2 = parseFloat(p2El.value), Q2 = parseFloat(q2El.value);

    if (isNaN(P1) || isNaN(Q1) || isNaN(P2) || isNaN(Q2) || P1 <= 0 || Q1 <= 0 || P2 <= 0 || Q2 <= 0 || P1 === P2) return;

    // Midpoint Arc formula:
    // %dQ = (Q2 - Q1) / ((Q1 + Q2) / 2)
    // %dP = (P2 - P1) / ((P1 + P2) / 2)
    const pctDQ = (Q2 - Q1) / ((Q1 + Q2) / 2);
    const pctDP = (P2 - P1) / ((P1 + P2) / 2);
    const pedRaw = pctDQ / pctDP;
    const absPed = Math.abs(pedRaw);

    const rev1 = P1 * Q1;
    const rev2 = P2 * Q2;
    const revDiff = rev2 - rev1;
    const revPct = (revDiff / rev1) * 100;

    let elasticDesc = '';
    if (absPed > 1.05) elasticDesc = ' (Elastic Demand: |PED| > 1)';
    else if (absPed < 0.95) elasticDesc = ' (Inelastic Demand: |PED| < 1)';
    else elasticDesc = ' (Unitary Elastic: |PED| ≈ 1)';

    pedResEl.textContent = '|PED| = ' + absPed.toFixed(2) + elasticDesc;

    if (revDiff > 0) {
      revResEl.textContent = 'Revenue Rises +$' + Math.round(revDiff).toLocaleString() + ' (+' + revPct.toFixed(1) + '%)';
      revResEl.style.color = '#22543d';
    } else if (revDiff < 0) {
      revResEl.textContent = 'Revenue Drops -$' + Math.round(Math.abs(revDiff)).toLocaleString() + ' (' + revPct.toFixed(1) + '%)';
      revResEl.style.color = '#c53030';
    } else {
      revResEl.textContent = 'Revenue Unchanged (Total Revenue Maximized)';
      revResEl.style.color = '#2563eb';
    }
  }

  [p1El, q1El, p2El, q2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial price P₁ and baseline quantity demanded Q₁.',
      'Enter new price P₂ and resulting quantity demanded Q₂.',
      'Inspect midpoint arc price elasticity |PED| and Total Revenue test effect.'
    ],
    benefitTitle: 'Total Revenue Rule of Elasticity',
    benefitContent: 'For elastic goods (|PED| > 1), raising prices decreases total business revenue because unit volume drops by a greater percentage than the price increase; for inelastic goods (|PED| < 1), raising prices increases total revenue.',
    faqs: [{ q: 'Why use the midpoint method instead of simple percentage changes?', a: 'The midpoint formula gives the exact same elasticity value whether prices are rising from P₁ to P₂ or falling from P₂ back to P₁.' }]
  },

  // 2. Cross-Price Elasticity of Demand (XED - Substitutes vs Complements) Calculator
  {
    slug: 'cross-price-elasticity-of-demand-xed-calculator',
    name: 'Cross-Price Elasticity of Demand (XED) Calculator',
    description: 'Calculate Cross-Price Elasticity of Demand (XED = (% ΔQ_A) / (% ΔP_B)) to determine whether two economic products are substitute goods (positive XED), complement goods (negative XED), or independent (XED near zero).',
    category: 'Finance',
    icon: 'chart',
    keywords: ['cross price elasticity calculator', 'xed formula substitutes complements', 'cross price elasticity of demand online', 'substitute goods xed calculator', 'complementary goods cross elasticity online'],
    order: 489,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Price Change of Product B & Demand Response of Product A',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="xed-dp">Price Change of Good B (%)</label>
          <input class="tool-textarea" id="xed-dp" type="number" step="any" value="15.0" placeholder="+15.0% (e.g. Coffee Price Rises)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="xed-dq">Demand Change of Good A (%)</label>
          <input class="tool-textarea" id="xed-dq" type="number" step="any" value="12.0" placeholder="+12.0% (e.g. Tea Demand Rises)" />
        </div>
      </div>
      <div id="xed-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="xed-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">XED = +0.80</span>
            <span class="stat-label">Cross-Price Elasticity (XED)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="xed-res-rel" style="color:var(--green-dark); font-weight:700;">Substitute Goods (Tea & Coffee)</span>
            <span class="stat-label">Economic Relationship</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('xed-dp'), dqEl = document.getElementById('xed-dq');
  const xResEl = document.getElementById('xed-res-val'), rResEl = document.getElementById('xed-res-rel');

  function update() {
    const pctDP = parseFloat(dpEl.value), pctDQ = parseFloat(dqEl.value);
    if (isNaN(pctDP) || isNaN(pctDQ) || pctDP === 0) return;

    // XED = %dQ_A / %dP_B
    const xed = pctDQ / pctDP;

    xResEl.textContent = 'XED = ' + (xed >= 0 ? '+' : '') + xed.toFixed(2);

    if (xed > 0.1) {
      rResEl.textContent = 'Substitute Goods (XED > 0: Higher Price of B shifts buyers to A)';
      rResEl.style.color = '#22543d';
    } else if (xed < -0.1) {
      rResEl.textContent = 'Complement Goods (XED < 0: Higher Price of B reduces demand for A)';
      rResEl.style.color = '#2563eb';
    } else {
      rResEl.textContent = 'Independent Unrelated Goods (XED ≈ 0)';
      rResEl.style.color = '#64748b';
    }
  }

  dpEl.addEventListener('input', update);
  dqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter percentage price increase or decrease for Product B (%ΔP_B).',
      'Enter resulting percentage change in quantity demanded for Product A (%ΔQ_A).',
      'Inspect Cross-Price Elasticity coefficient (XED) and identify economic product substitution relationship.'
    ],
    benefitTitle: 'Cross-Price Sign Interpretation',
    benefitContent: 'Positive XED indicates Substitute goods (e.g., Butter and Margarine); Negative XED indicates Complementary goods used together (e.g., Hamburgers and Buns).',
    faqs: [{ q: 'What does an XED of +1.5 mean?', a: 'A 10% price increase in Product B causes a 15% surge in quantity demanded for Product A, indicating strong consumer substitution.' }]
  },

  // 3. Income Elasticity of Demand (YED - Normal, Luxury, Inferior) Calculator
  {
    slug: 'income-elasticity-of-demand-yed-calculator',
    name: 'Income Elasticity of Demand (YED) Calculator',
    description: 'Calculate Income Elasticity of Demand (YED = (% ΔQuantity) / (% ΔIncome)) to classify consumer goods as Normal Necessities (YED between 0 and 1), Luxuries (YED above 1), or Inferior goods (negative YED).',
    category: 'Finance',
    icon: 'chart',
    keywords: ['income elasticity of demand calculator', 'yed formula normal luxury inferior', 'income elasticity calculator online', 'engel curve income elasticity', 'economic good classification yed online'],
    order: 490,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Percentage Income Change (% ΔY) & Demand Response (% ΔQ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="yed-dy">Consumer Income Change (%)</label>
          <input class="tool-textarea" id="yed-dy" type="number" step="any" value="10.0" placeholder="+10.0% Income Growth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yed-dq">Quantity Demanded Change (%)</label>
          <input class="tool-textarea" id="yed-dq" type="number" step="any" value="18.0" placeholder="+18.0%" />
        </div>
      </div>
      <div id="yed-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="yed-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">YED = +1.80</span>
            <span class="stat-label">Income Elasticity (YED)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="yed-res-type" style="color:var(--green-dark); font-weight:700;">Luxury / Superior Good (YED > 1)</span>
            <span class="stat-label">Good Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dyEl = document.getElementById('yed-dy'), dqEl = document.getElementById('yed-dq');
  const yResEl = document.getElementById('yed-res-val'), tResEl = document.getElementById('yed-res-type');

  function update() {
    const dY = parseFloat(dyEl.value), dQ = parseFloat(dqEl.value);
    if (isNaN(dY) || isNaN(dQ) || dY === 0) return;

    // YED = %dQ / %dY
    const yed = dQ / dY;

    yResEl.textContent = 'YED = ' + (yed >= 0 ? '+' : '') + yed.toFixed(2);

    if (yed > 1.0) {
      tResEl.textContent = 'Luxury / Superior Good (YED > 1: Demand grows faster than income)';
      tResEl.style.color = '#22543d';
    } else if (yed > 0 && yed <= 1.0) {
      tResEl.textContent = 'Normal Necessity Good (0 < YED ≤ 1: Stable staples e.g. groceries)';
      tResEl.style.color = '#2563eb';
    } else if (yed < 0) {
      tResEl.textContent = 'Inferior Good (YED < 0: Demand drops as income rises e.g. instant noodles)';
      tResEl.style.color = '#d97706';
    } else {
      tResEl.textContent = 'Zero Income Elasticity (YED = 0)';
      tResEl.style.color = '#64748b';
    }
  }

  dyEl.addEventListener('input', update);
  dqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter percentage change in consumer real income (%ΔY).',
      'Enter resulting percentage change in quantity demanded (%ΔQ).',
      'Inspect Income Elasticity of Demand (YED) and product classification on the Engel curve.'
    ],
    benefitTitle: 'Ernst Engel\'s Law of Household Spending',
    benefitContent: 'As household incomes expand, the percentage spent on basic necessities drops (0 < YED < 1), while spending on luxury services, dining out, and travel surges (YED > 1).',
    faqs: [{ q: 'What is an example of an inferior good (YED < 0)?', a: 'Generic unbranded canned foods, instant ramen noodles, and intercity bus transit, which consumers replace with premium alternatives as their income rises.' }]
  },

  // 4. Herfindahl-Hirschman Index (HHI) Market Concentration Calculator
  {
    slug: 'herfindahl-hirschman-index-hhi-calculator',
    name: 'Herfindahl-Hirschman Index (HHI) Market Concentration Calculator',
    description: 'Calculate DOJ/FTC antitrust market concentration index (HHI = Σ s_i²) and assess post-merger antitrust regulatory scrutiny thresholds.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['hhi calculator', 'herfindahl hirschman index formula', 'market concentration hhi calculator online', 'doj ftc antitrust merger hhi calculator', 'market share sum of squares online'],
    order: 491,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Competitor Market Share Percentages (%)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hhi-in">Enter Firm Market Shares in % (Comma or space separated)</label>
        <input class="tool-textarea" id="hhi-in" type="text" value="35, 30, 20, 10, 5" placeholder="35, 30, 20, 10, 5" />
      </div>
      <div id="hhi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hhi-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2,650 HHI</span>
            <span class="stat-label">Herfindahl-Hirschman Index (HHI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hhi-res-eval" style="color:#c53030; font-weight:700;">Highly Concentrated Market (HHI > 1,800)</span>
            <span class="stat-label">DOJ / FTC Antitrust Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('hhi-in');
  const hResEl = document.getElementById('hhi-res-val'), eResEl = document.getElementById('hhi-res-eval');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const shares = raw.split(/[,\\s\\t]+/).map(Number).filter(v => !isNaN(v) && v > 0);
    if (shares.length === 0) return;

    // HHI = sum( s_i^2 ) where s_i are in whole percentages (e.g. 35 -> 35^2 = 1225)
    let hhi = 0;
    let totalShare = 0;
    for (const s of shares) {
      hhi += Math.pow(s, 2);
      totalShare += s;
    }

    hResEl.textContent = Math.round(hhi).toLocaleString() + ' HHI (Total ' + Math.round(totalShare) + '% Market)';

    if (hhi < 1500) {
      eResEl.textContent = 'Unconcentrated Competitive Market (HHI < 1,500)';
      eResEl.style.color = '#22543d';
    } else if (hhi >= 1500 && hhi <= 1800) {
      eResEl.textContent = 'Moderately Concentrated Market (1,500 ≤ HHI ≤ 1,800)';
      eResEl.style.color = '#d97706';
    } else {
      eResEl.textContent = 'Highly Concentrated Oligopoly (HHI > 1,800: Strict DOJ/FTC Review)';
      eResEl.style.color = '#c53030';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter market share percentage integers for all competing firms in the industry (e.g. 35, 30, 20, 10, 5).',
      'Inspect calculated Herfindahl-Hirschman Index (HHI out of 10,000 maximum for pure monopoly) and DOJ/FTC horizontal merger review classification.'
    ],
    benefitTitle: 'US Department of Justice & FTC Merger Guidelines',
    benefitContent: 'Squaring market share percentages places greater mathematical weight on dominant large firms; mergers that increase HHI by more than 100-200 points in highly concentrated markets trigger antitrust regulatory challenges.',
    faqs: [{ q: 'What is the maximum possible HHI score?', a: 'A pure 100% monopoly market has an HHI of 100² = 10,000.' }]
  },

  // 5. Deadweight Loss of Taxation (Harberger Triangle) Calculator
  {
    slug: 'deadweight-loss-taxation-triangle-calculator',
    name: 'Deadweight Loss of Taxation (Harberger Triangle) Calculator',
    description: 'Calculate economic deadweight loss (DWL = ½ · Tax · ΔQ) and total tax revenue generated from excise tax per unit, supply/demand elasticity, and quantity reduction.',
    category: 'Finance',
    icon: 'chart',
    keywords: ['deadweight loss calculator', 'harberger triangle tax deadweight loss formula', 'half tax delta q calculator', 'tax revenue vs deadweight loss online', 'welfare economics excess burden calculator'],
    order: 492,
    schemaCategory: 'FinancialProduct',
    workspaceHeading: 'Excise Tax per Unit ($) & Market Quantity Drop (ΔQ in units)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dwl-tax">Tax Per Unit T ($)</label>
          <input class="tool-textarea" id="dwl-tax" type="number" step="any" value="5.0" placeholder="$5.00 Tax" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dwl-qpost">Post-Tax Quantity Q_tax</label>
          <input class="tool-textarea" id="dwl-qpost" type="number" step="any" value="8000" placeholder="8,000 units" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dwl-dq">Quantity Drop ΔQ</label>
          <input class="tool-textarea" id="dwl-dq" type="number" step="any" value="2000" placeholder="2,000 units (10k → 8k)" />
        </div>
      </div>
      <div id="dwl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dwl-res-dwl" style="color:#c53030; font-weight:800; font-size:1.6rem;">$5,000 Deadweight Loss</span>
            <span class="stat-label">Lost Economic Welfare (½ · T · ΔQ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dwl-res-rev" style="color:var(--green-dark); font-weight:700;">$40,000 Tax Revenue</span>
            <span class="stat-label">Government Tax Revenue Collected (T · Q_tax)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const taxEl = document.getElementById('dwl-tax'), qPostEl = document.getElementById('dwl-qpost'), dqEl = document.getElementById('dwl-dq');
  const dwResEl = document.getElementById('dwl-res-dwl'), revResEl = document.getElementById('dwl-res-rev');

  function update() {
    const T = parseFloat(taxEl.value), Qtax = parseFloat(qPostEl.value), dQ = parseFloat(dqEl.value);
    if (isNaN(T) || isNaN(Qtax) || isNaN(dQ) || T <= 0 || Qtax <= 0 || dQ <= 0) return;

    // Harberger Triangle Deadweight Loss = 0.5 * T * dQ
    const dwl = 0.5 * T * dQ;
    // Government Tax Revenue = T * Qtax
    const revenue = T * Qtax;
    const lossRatio = (dwl / revenue) * 100;

    dwResEl.textContent = '$' + Math.round(dwl).toLocaleString() + ' Economic Loss (' + lossRatio.toFixed(1) + '% of Revenue)';
    revResEl.textContent = '$' + Math.round(revenue).toLocaleString() + ' Collected (Total Excess Burden: $' + Math.round(dwl).toLocaleString() + ')';
  }

  [taxEl, qPostEl, dqEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter excise sales tax levy per unit T in dollars ($).',
      'Enter final post-tax market transaction quantity ($Q_{\\text{tax}}$).',
      'Enter market transaction contraction drop ($\\Delta Q = Q_{\\text{pre}} - Q_{\\text{tax}}$).',
      'Inspect Harberger triangle deadweight loss and collected government tax revenue.'
    ],
    benefitTitle: 'Arnold Harberger\'s 1964 Welfare Triangle',
    benefitContent: 'Deadweight loss represents mutual gains from trade completely destroyed because the tax drives a wedge between buyer willingness-to-pay and seller cost, shrinking total societal economic surplus.',
    faqs: [{ q: 'Why does deadweight loss increase quadratically with tax rate?', a: 'Because both the tax wedge T and the quantity drop ΔQ increase linearly with the tax rate, their product (DWL = ½·T·ΔQ) scales with the square of the tax rate ($T^2$).' }]
  }
];

toolsSuiteIII.forEach(createTool);
console.log('Suite III complete: 5 tools created.');
