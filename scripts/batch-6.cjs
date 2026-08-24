const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch6 = [
  // 1. Break-Even Point Calculator
  {
    slug: 'break-even-point-calculator',
    name: 'Break-Even Point Calculator',
    description: 'Calculate the exact unit sales and revenue required to reach the break-even point from fixed costs, unit price, and variable costs.',
    category: 'Finance',
    icon: 'text',
    keywords: ['break even point calculator', 'bep calculator', 'break even revenue calculator', 'contribution margin calculator', 'business break even analysis'],
    order: 79,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Break-Even Cost Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bep-fixed">Total Fixed Costs ($ / ₹)</label>
          <input class="tool-textarea" id="bep-fixed" type="number" step="any" placeholder="e.g. 5000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bep-price">Selling Price Per Unit (SP)</label>
          <input class="tool-textarea" id="bep-price" type="number" step="any" placeholder="e.g. 50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bep-var">Variable Cost Per Unit (VC)</label>
          <input class="tool-textarea" id="bep-var" type="number" step="any" placeholder="e.g. 20" />
        </div>
      </div>
      <div id="bep-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bep-res-units" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Break-Even Units to Sell</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bep-res-rev" style="font-weight:700;">-</span>
            <span class="stat-label">Break-Even Sales Revenue</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bep-res-margin">-</span>
            <span class="stat-label">Unit Contribution Margin</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fcEl = document.getElementById('bep-fixed'), spEl = document.getElementById('bep-price'), vcEl = document.getElementById('bep-var');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bep-res-card');
  const resUnits = document.getElementById('bep-res-units'), resRev = document.getElementById('bep-res-rev'), resMargin = document.getElementById('bep-res-margin');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const fc = parseFloat(fcEl.value);
    const sp = parseFloat(spEl.value);
    const vc = parseFloat(vcEl.value);

    if (isNaN(fc) || isNaN(sp) || isNaN(vc) || fc < 0 || sp <= 0 || vc < 0 || sp <= vc) {
      setMsg('Please enter valid numbers where Selling Price exceeds Variable Cost.', true);
      resCard.style.display = 'none'; return;
    }

    const margin = sp - vc;
    const units = Math.ceil(fc / margin);
    const revenue = units * sp;

    resUnits.textContent = units.toLocaleString() + ' Units';
    resRev.textContent = '$' + Math.round(revenue).toLocaleString();
    resMargin.textContent = '$' + margin.toFixed(2) + ' / unit (' + ((margin / sp) * 100).toFixed(1) + '%)';

    resCard.style.display = 'block';
    setMsg('Break-even analysis calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fcEl.value = ''; spEl.value = ''; vcEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter total monthly or annual fixed overhead costs (rent, salaries, software subscriptions).',
      'Enter unit selling price and direct unit variable manufacturing/service cost.',
      'Click <strong>Calculate</strong> to inspect the exact number of sales needed to achieve zero profit/loss.'
    ],
    benefitTitle: 'Why Break-Even Analysis is Critical',
    benefitContent: 'Break-even point analysis establishes the baseline safety margin for pricing strategy, sales quotas, and expansion investments by determining when a business stops losing money and starts generating profit.',
    faqs: [
      { q: 'What is the formula for Break-Even Quantity?', a: 'BEP (Units) = Total Fixed Costs / (Selling Price Per Unit - Variable Cost Per Unit).' }
    ]
  },

  // 2. Return on Investment (ROI) Calculator
  {
    slug: 'return-on-investment-roi-calculator',
    name: 'ROI (Return on Investment) Calculator',
    description: 'Calculate total ROI percentage, annualized ROI, net profit gain, and benefit-to-cost ratio for business marketing and capital investments.',
    category: 'Finance',
    icon: 'text',
    keywords: ['roi calculator', 'return on investment calculator', 'calculate roi online', 'marketing roi calculator', 'annualized roi formula'],
    order: 80,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Investment Gain & Cost Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="roi-invested">Total Cost / Amount Invested ($ / ₹)</label>
          <input class="tool-textarea" id="roi-invested" type="number" step="any" placeholder="e.g. 5000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="roi-returned">Total Return / Revenue Generated ($ / ₹)</label>
          <input class="tool-textarea" id="roi-returned" type="number" step="any" placeholder="e.g. 12500" />
        </div>
        <div class="control-group">
          <label class="control-label" for="roi-years">Holding Period (Years) [Optional]</label>
          <input class="tool-textarea" id="roi-years" type="number" step="any" value="1" placeholder="1" />
        </div>
      </div>
      <div id="roi-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="roi-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Total ROI Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="roi-res-profit" style="font-weight:700;">-</span>
            <span class="stat-label">Net Profit / Gain</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="roi-res-annual">-</span>
            <span class="stat-label">Annualized ROI</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const invEl = document.getElementById('roi-invested'), retEl = document.getElementById('roi-returned'), yrEl = document.getElementById('roi-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('roi-res-card');
  const resPct = document.getElementById('roi-res-pct'), resProfit = document.getElementById('roi-res-profit'), resAnn = document.getElementById('roi-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cost = parseFloat(invEl.value);
    const revenue = parseFloat(retEl.value);
    const years = parseFloat(yrEl.value) || 1;

    if (isNaN(cost) || isNaN(revenue) || cost <= 0) {
      setMsg('Please enter a valid positive invested amount.', true);
      resCard.style.display = 'none'; return;
    }

    const netProfit = revenue - cost;
    const roi = (netProfit / cost) * 100;
    const annualizedRoi = (Math.pow(revenue / cost, 1 / Math.max(0.01, years)) - 1) * 100;

    resPct.textContent = (roi >= 0 ? '+' : '') + roi.toFixed(2) + '%';
    resPct.style.color = roi >= 0 ? '#22543d' : '#c53030';
    resProfit.textContent = (netProfit >= 0 ? '+$' : '-$') + Math.abs(netProfit).toLocaleString('en-US', { maximumFractionDigits: 2 });
    resAnn.textContent = (annualizedRoi >= 0 ? '+' : '') + annualizedRoi.toFixed(2) + '% / yr';

    resCard.style.display = 'block';
    setMsg('ROI calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    invEl.value = ''; retEl.value = ''; yrEl.value = '1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the initial investment or campaign spend amount.',
      'Enter the total revenue generated or ending asset value.',
      'Optionally specify the investment period in years.',
      'Click <strong>Calculate</strong> to inspect your net return and annualized efficiency.'
    ],
    benefitTitle: 'How to Interpret ROI',
    benefitContent: 'Return on Investment (ROI) evaluates the efficiency of an investment: ROI (%) = ((Net Profit) / (Cost of Investment)) × 100. An ROI greater than 0% means the investment was profitable.',
    faqs: [
      { q: 'What is a good ROI for online marketing?', a: 'A 5:1 ratio (500% ROI or $5 revenue for every $1 spent) is generally considered strong for digital ad campaigns.' }
    ]
  },

  // 3. GST Reverse Calculator
  {
    slug: 'gst-reverse-calculator',
    name: 'Reverse GST Calculator',
    description: 'Calculate and extract the original net base price and exact GST tax amount from any gross MRP inclusive price.',
    category: 'Finance',
    icon: 'text',
    keywords: ['reverse gst calculator', 'gst remove calculator', 'extract gst from gross price', 'gst backwards calculator', 'inclusive gst to base price'],
    order: 81,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Gross Price & GST Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rgst-gross">Gross Total Price (Inclusive of GST)</label>
          <input class="tool-textarea" id="rgst-gross" type="number" step="any" placeholder="e.g. 1180" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rgst-rate">GST Tax Slab Rate (%)</label>
          <select class="tool-textarea" id="rgst-rate">
            <option value="5">5% (Essential Goods)</option>
            <option value="12">12% (Standard Slab 1)</option>
            <option value="18" selected>18% (Standard Services & Electronics)</option>
            <option value="28">28% (Luxury & Demerit Goods)</option>
          </select>
        </div>
      </div>
      <div id="rgst-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rgst-res-net" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Original Net Base Price</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rgst-res-tax" style="color:#c53030; font-weight:700;">-</span>
            <span class="stat-label">Total GST Tax Amount</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rgst-res-half">-</span>
            <span class="stat-label">CGST + SGST Split (Each)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const grossEl = document.getElementById('rgst-gross'), rateEl = document.getElementById('rgst-rate');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rgst-res-card');
  const resNet = document.getElementById('rgst-res-net'), resTax = document.getElementById('rgst-res-tax'), resHalf = document.getElementById('rgst-res-half');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const gross = parseFloat(grossEl.value);
    const rate = parseFloat(rateEl.value);

    if (isNaN(gross) || gross <= 0 || isNaN(rate) || rate <= 0) {
      setMsg('Please enter a valid positive gross amount.', true);
      resCard.style.display = 'none'; return;
    }

    // Base Price = Gross / (1 + Rate/100)
    const net = gross / (1 + (rate / 100));
    const tax = gross - net;
    const halfTax = tax / 2;

    resNet.textContent = '₹ ' + net.toFixed(2);
    resTax.textContent = '₹ ' + tax.toFixed(2);
    resHalf.textContent = '₹ ' + halfTax.toFixed(2) + ' (' + (rate / 2) + '%)';

    resCard.style.display = 'block';
    setMsg('Reverse GST calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    grossEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the final gross billing amount that already includes GST.',
      'Select your applicable GST slab (5%, 12%, 18%, or 28%).',
      'Click <strong>Calculate</strong> to separate the pre-tax base price from the CGST/SGST taxes.'
    ],
    benefitTitle: 'Reverse GST Formula',
    benefitContent: 'Extracting GST from an inclusive price uses the formula: Net Base Price = Gross Price / (1 + GST Rate / 100), and GST Tax = Gross Price - Net Base Price.',
    faqs: [
      { q: 'How to calculate 18% reverse GST on ₹1,180?', a: '₹1,180 / 1.18 = ₹1,000 Net Base Price and ₹180 GST (₹90 CGST + ₹90 SGST).' }
    ]
  },

  // 4. Inflation & Purchasing Power Depreciation Calculator
  {
    slug: 'inflation-purchasing-power-calculator',
    name: 'Inflation Purchasing Power Calculator',
    description: 'Calculate how annual inflation erodes your money\'s future purchasing power and determine the future value required to match today\'s wealth.',
    category: 'Finance',
    icon: 'text',
    keywords: ['inflation purchasing power calculator', 'future value of money inflation', 'cost of living inflation calculator', 'money depreciation calculator', 'inflation impact on savings'],
    order: 82,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Inflation Projection Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="inf-current">Current Money Amount ($ / ₹)</label>
          <input class="tool-textarea" id="inf-current" type="number" step="any" placeholder="e.g. 100000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inf-rate">Annual Inflation Rate (%)</label>
          <input class="tool-textarea" id="inf-rate" type="number" step="any" value="6.0" placeholder="6.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inf-years">Years in Future</label>
          <input class="tool-textarea" id="inf-years" type="number" step="any" value="10" placeholder="10" />
        </div>
      </div>
      <div id="inf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="inf-res-future-power" style="color:#c53030; font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Future Purchasing Value of This Money</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="inf-res-needed" style="font-weight:700;">-</span>
            <span class="stat-label">Amount Needed in Future to Match Today</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="inf-res-loss">-</span>
            <span class="stat-label">Purchasing Power Loss %</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const curEl = document.getElementById('inf-current'), rateEl = document.getElementById('inf-rate'), yrEl = document.getElementById('inf-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('inf-res-card');
  const resPower = document.getElementById('inf-res-future-power'), resNeed = document.getElementById('inf-res-needed'), resLoss = document.getElementById('inf-res-loss');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cur = parseFloat(curEl.value);
    const r = parseFloat(rateEl.value) / 100;
    const t = parseFloat(yrEl.value);

    if (isNaN(cur) || isNaN(r) || isNaN(t) || cur <= 0 || r <= 0 || t <= 0) {
      setMsg('Please enter valid positive numbers for money, inflation rate, and years.', true);
      resCard.style.display = 'none'; return;
    }

    // Future purchasing power of current cash: C / (1 + r)^t
    const futurePower = cur / Math.pow(1 + r, t);
    // Amount needed in future to match current basket of goods: C * (1 + r)^t
    const futureNeeded = cur * Math.pow(1 + r, t);
    const lossPct = ((cur - futurePower) / cur) * 100;

    resPower.textContent = '$' + Math.round(futurePower).toLocaleString();
    resNeed.textContent = '$' + Math.round(futureNeeded).toLocaleString();
    resLoss.textContent = '-' + lossPct.toFixed(1) + '%';

    resCard.style.display = 'block';
    setMsg('Inflation impact calculated.');
  });

  clearBtn.addEventListener('click', () => {
    curEl.value = ''; rateEl.value = '6.0'; yrEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your current savings or capital balance.',
      'Enter the estimated average annual inflation rate (e.g. 6%).',
      'Enter the forecast horizon in years.',
      'Click <strong>Calculate</strong> to inspect the eroded real value and the target future capital needed.'
    ],
    benefitTitle: 'Silent Wealth Erosion by Inflation',
    benefitContent: 'Inflation continuously reduces the quantity of goods and services a fixed sum of cash can buy. A 6% annual inflation rate cuts real purchasing power in half in approximately 12 years.',
    faqs: [
      { q: 'What is the Rule of 72 for inflation?', a: 'Dividing 72 by the annual inflation rate gives the approximate number of years it takes for your money\'s purchasing power to be halved (72 / 6% = 12 years).' }
    ]
  },

  // 5. LED Series Resistor Calculator (Ohm's Law)
  {
    slug: 'led-resistor-calculator',
    name: 'LED Series Resistor Calculator',
    description: 'Calculate the required current-limiting series resistor value (Ohms) and minimum power rating (Watts) for single and series LEDs.',
    category: 'Science',
    icon: 'text',
    keywords: ['led resistor calculator', 'current limiting resistor', 'led series resistor calculator', 'led ohm law calculator', 'led resistor wattage'],
    order: 83,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Circuit Voltage & LED Specs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="led-vs">Power Supply Voltage (Vs) [Volts]</label>
          <input class="tool-textarea" id="led-vs" type="number" step="any" value="5.0" placeholder="e.g. 5.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="led-vf">LED Forward Voltage (Vf) [Volts]</label>
          <input class="tool-textarea" id="led-vf" type="number" step="any" value="2.0" placeholder="e.g. 2.0 (Red) or 3.2 (Blue/White)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="led-if">Forward Current (If) [mA]</label>
          <input class="tool-textarea" id="led-if" type="number" step="any" value="20" placeholder="e.g. 20 mA" />
        </div>
      </div>
      <div id="led-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="led-res-ohms" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Minimum Resistor Value (R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="led-res-power" style="font-weight:700;">-</span>
            <span class="stat-label">Resistor Power Dissipation (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="led-res-std">-</span>
            <span class="stat-label">Nearest Standard E24 Resistor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vsEl = document.getElementById('led-vs'), vfEl = document.getElementById('led-vf'), ifEl = document.getElementById('led-if');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('led-res-card');
  const resOhms = document.getElementById('led-res-ohms'), resPower = document.getElementById('led-res-power'), resStd = document.getElementById('led-res-std');

  const E24 = [100, 110, 120, 130, 150, 160, 180, 200, 220, 240, 270, 300, 330, 360, 390, 430, 470, 510, 560, 620, 680, 750, 820, 910, 1000];

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const vs = parseFloat(vsEl.value);
    const vf = parseFloat(vfEl.value);
    const ifMa = parseFloat(ifEl.value);

    if (isNaN(vs) || isNaN(vf) || isNaN(ifMa) || vs <= vf || ifMa <= 0) {
      setMsg('Supply voltage (Vs) must be greater than LED forward voltage (Vf).', true);
      resCard.style.display = 'none'; return;
    }

    const ifAmps = ifMa / 1000;
    const rOhms = (vs - vf) / ifAmps;
    const powerWatts = (vs - vf) * ifAmps;

    // Find nearest higher standard E24 resistor
    let nearestE24 = rOhms;
    for (const val of E24) {
      if (val >= rOhms) { nearestE24 = val; break; }
    }

    resOhms.textContent = rOhms.toFixed(1) + ' Ω (Ohms)';
    resPower.textContent = (powerWatts * 1000).toFixed(1) + ' mW (Use 1/4W resistor)';
    resStd.textContent = nearestE24 + ' Ω';

    resCard.style.display = 'block';
    setMsg('Resistor requirements calculated.');
  });

  clearBtn.addEventListener('click', () => {
    vsEl.value = '5.0'; vfEl.value = '2.0'; ifEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your power supply voltage (e.g. 5V USB or 9V battery or 12V supply).',
      'Enter the LED forward voltage (typically ~2.0V for Red/Yellow and ~3.2V for Blue/White/Green).',
      'Enter desired forward current in mA (standard 5mm LEDs use 15-20 mA).',
      'Click <strong>Calculate</strong> to inspect the exact Ohm resistance and wattage rating.'
    ],
    benefitTitle: 'Why LEDs Require Series Resistors',
    benefitContent: 'LEDs are non-linear diodes that exhibit negative differential resistance at high currents. Without a current-limiting series resistor, exponential thermal runaway immediately burns out the semiconductor junction.',
    faqs: [
      { q: 'What is the standard formula for LED series resistance?', a: 'R = (Source Voltage - Forward Voltage) / Forward Current in Amperes.' }
    ]
  }
];

toolsBatch6.forEach(createTool);
console.log('Batch 6 complete.');
