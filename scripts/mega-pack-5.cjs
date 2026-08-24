const { createTool } = require('./generate-curated-tools.cjs');

const tools5 = [
  // 1. Loan Amortization Schedule & EMI Calculator
  {
    slug: 'loan-amortization-schedule-calculator',
    name: 'Loan Amortization & EMI Calculator',
    description: 'Calculate monthly loan EMI payments, total interest payable, loan payoff date, and principal-to-interest amortization breakdown.',
    category: 'Finance',
    icon: 'text',
    keywords: ['loan amortization calculator', 'emi calculator online', 'loan repayment schedule', 'monthly emi calculation formula', 'total loan interest calculator'],
    order: 124,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Loan Amount, Rate & Tenure',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="emi-principal">Loan Amount ($ / ₹)</label>
          <input class="tool-textarea" id="emi-principal" type="number" step="any" value="100000" placeholder="e.g. 100,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="emi-rate">Annual Interest Rate (%)</label>
          <input class="tool-textarea" id="emi-rate" type="number" step="any" value="8.5" placeholder="e.g. 8.5%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="emi-years">Loan Tenure (Years)</label>
          <input class="tool-textarea" id="emi-years" type="number" step="any" value="5" placeholder="e.g. 5 Years" />
        </div>
      </div>
      <div id="emi-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="emi-res-monthly" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Monthly EMI Payment</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="emi-res-interest" style="color:#c53030; font-weight:700;">-</span>
            <span class="stat-label">Total Interest Payable</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="emi-res-total">-</span>
            <span class="stat-label">Total Payment (P + I)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('emi-principal'), rEl = document.getElementById('emi-rate'), yEl = document.getElementById('emi-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('emi-res-card');
  const resEmi = document.getElementById('emi-res-monthly'), resInt = document.getElementById('emi-res-interest'), resTot = document.getElementById('emi-res-total');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const P = parseFloat(pEl.value);
    const annualRate = parseFloat(rEl.value);
    const years = parseFloat(yEl.value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setMsg('Please enter valid positive numbers for loan parameters.', true);
      resCard.style.display = 'none'; return;
    }

    const n = years * 12;
    const r = (annualRate / 12) / 100;

    // EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    const totalInt = totalPay - P;

    resEmi.textContent = '$' + Math.round(emi).toLocaleString() + ' / month';
    resInt.textContent = '$' + Math.round(totalInt).toLocaleString();
    resTot.textContent = '$' + Math.round(totalPay).toLocaleString();

    resCard.style.display = 'block';
    setMsg('Loan amortization calculated.');
  });

  clearBtn.addEventListener('click', () => {
    pEl.value = '100000'; rEl.value = '8.5'; yEl.value = '5'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the total principal borrowed amount.',
      'Enter the annual interest rate percentage.',
      'Enter the loan tenure in years.',
      'Click <strong>Calculate</strong> to inspect your fixed monthly EMI and total interest cost.'
    ],
    benefitTitle: 'Standard Equated Monthly Installment (EMI)',
    benefitContent: 'In an amortized loan, early payments primarily cover interest charges, while later installments accelerate principal reduction.',
    faqs: [{ q: 'How does prepaying loan principal save money?', a: 'Prepaying principal reduces the outstanding balance upon which daily compound interest is accrued, drastically shortening total loan tenure.' }]
  },

  // 2. SIP (Systematic Investment Plan) Wealth Calculator
  {
    slug: 'sip-mutual-fund-calculator',
    name: 'SIP Mutual Fund Wealth Calculator',
    description: 'Calculate future wealth corpus and compound interest returns from monthly Systematic Investment Plans (SIP) in mutual funds and index ETFs.',
    category: 'Finance',
    icon: 'text',
    keywords: ['sip calculator', 'mutual fund sip calculator', 'monthly sip wealth calculator', 'sip return calculator online', 'systematic investment plan compounding'],
    order: 125,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Monthly SIP Investment Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sip-monthly">Monthly Investment ($ / ₹)</label>
          <input class="tool-textarea" id="sip-monthly" type="number" step="any" value="5000" placeholder="e.g. 5,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sip-rate">Expected Annual Return (%)</label>
          <input class="tool-textarea" id="sip-rate" type="number" step="any" value="12.0" placeholder="e.g. 12%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sip-years">Investment Duration (Years)</label>
          <input class="tool-textarea" id="sip-years" type="number" step="any" value="15" placeholder="e.g. 15 Years" />
        </div>
      </div>
      <div id="sip-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sip-res-total" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Expected Maturity Corpus</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sip-res-invested" style="font-weight:700;">-</span>
            <span class="stat-label">Total Amount Invested</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sip-res-gain" style="color:#2563eb;">-</span>
            <span class="stat-label">Estimated Wealth Gain</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sip-monthly'), rEl = document.getElementById('sip-rate'), yEl = document.getElementById('sip-years');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sip-res-card');
  const resTot = document.getElementById('sip-res-total'), resInv = document.getElementById('sip-res-invested'), resGain = document.getElementById('sip-res-gain');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const P = parseFloat(mEl.value);
    const annualRate = parseFloat(rEl.value);
    const years = parseFloat(yEl.value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
      setMsg('Please enter positive values for monthly investment, return rate, and years.', true);
      resCard.style.display = 'none'; return;
    }

    const n = years * 12;
    const i = (annualRate / 12) / 100;

    // SIP Formula: M = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
    const maturity = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = P * n;
    const gain = maturity - invested;

    resTot.textContent = '$' + Math.round(maturity).toLocaleString();
    resInv.textContent = '$' + Math.round(invested).toLocaleString();
    resGain.textContent = '+$' + Math.round(gain).toLocaleString();

    resCard.style.display = 'block';
    setMsg('SIP wealth growth calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '5000'; rEl.value = '12.0'; yEl.value = '15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your recurring monthly investment amount.',
      'Enter your expected long-term annualized rate of return (e.g. 12% for equity mutual funds).',
      'Enter total investment horizon in years.',
      'Click <strong>Calculate</strong> to inspect the compounded maturity wealth.'
    ],
    benefitTitle: 'Power of Compounding in SIP',
    benefitContent: 'A Systematic Investment Plan averages out market volatility through dollar-cost averaging while compounding exponential gains over time.',
    faqs: [{ q: 'What does a $5,000/mo SIP at 12% generate in 15 years?', a: 'An invested capital of $900,000 grows into an estimated corpus of ~$2.52 Million.' }]
  },

  // 3. Rule of 72 Money Doubling Calculator
  {
    slug: 'rule-of-72-doubling-calculator',
    name: 'Rule of 72 Money Doubling Calculator',
    description: 'Calculate the approximate number of years required to double your invested money at any annual compound interest rate.',
    category: 'Finance',
    icon: 'text',
    keywords: ['rule of 72 calculator', 'money doubling calculator', 'years to double investment calculator', 'rule of 72 formula online', 'compound interest doubling time'],
    order: 126,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Annual Compound Interest Rate',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="r72-rate">Annual Interest / Growth Rate (%)</label>
        <input class="tool-textarea" id="r72-rate" type="number" step="any" value="8.0" placeholder="e.g. 8.0%" />
      </div>
      <div id="r72-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="r72-res-years" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9.00 Years</span>
            <span class="stat-label">Years to Double (Rule of 72)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="r72-res-exact">9.01 Years</span>
            <span class="stat-label">Exact Logarithmic Doubling Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('r72-rate');
  const yEl = document.getElementById('r72-res-years'), exEl = document.getElementById('r72-res-exact');

  function update() {
    const r = parseFloat(rEl.value);
    if (isNaN(r) || r <= 0) return;

    const r72Years = 72 / r;
    // Exact: ln(2) / ln(1 + r/100)
    const exactYears = Math.log(2) / Math.log(1 + (r / 100));

    yEl.textContent = r72Years.toFixed(2) + ' Years';
    exEl.textContent = exactYears.toFixed(2) + ' Years';
  }

  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the annual compound growth rate percentage (e.g. 8%).',
      'Inspect the estimated doubling period (72 / rate) alongside the mathematically exact logarithmic doubling time.'
    ],
    benefitTitle: 'Origin of Rule of 72',
    benefitContent: 'The Rule of 72 provides a quick mental estimation derived from natural logarithms: ln(2) ≈ 0.693. Because 72 has many convenient divisors (2, 3, 4, 6, 8, 9, 12), it offers an exceptionally accurate approximation for rates between 4% and 15%.',
    faqs: [{ q: 'How long does it take to double at 12% interest?', a: '72 / 12 = exactly 6.0 Years.' }]
  },

  // 4. Running Pace & Race Time Calculator
  {
    slug: 'running-pace-split-calculator',
    name: 'Running Pace & Race Finish Time Calculator',
    description: 'Calculate running pace (min/km and min/mile), splits, and projected finish times for 5K, 10K, Half Marathon, and Marathon.',
    category: 'Health',
    icon: 'text',
    keywords: ['running pace calculator', 'marathon pace calculator', '5k finish time calculator', 'running splits calculator', 'min per km to min per mile pace'],
    order: 127,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Race Distance & Target Time',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pace-dist">Race Distance</label>
          <select class="tool-textarea" id="pace-dist">
            <option value="5">5K (5.0 km)</option>
            <option value="10">10K (10.0 km)</option>
            <option value="21.0975" selected>Half Marathon (21.1 km)</option>
            <option value="42.195">Full Marathon (42.2 km)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label">Finish Time (Hours : Mins : Secs)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="pace-h" type="number" min="0" value="1" placeholder="Hr" />
            <input class="tool-textarea" id="pace-m" type="number" min="0" max="59" value="45" placeholder="Min" />
            <input class="tool-textarea" id="pace-s" type="number" min="0" max="59" value="0" placeholder="Sec" />
          </div>
        </div>
      </div>
      <div id="pace-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pace-res-km" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4:59 / km</span>
            <span class="stat-label">Pace per Kilometer</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pace-res-mi" style="font-weight:700;">8:01 / mile</span>
            <span class="stat-label">Pace per Mile</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pace-res-speed">12.06 km/h</span>
            <span class="stat-label">Average Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('pace-dist');
  const hEl = document.getElementById('pace-h'), mEl = document.getElementById('pace-m'), sEl = document.getElementById('pace-s');
  const kmEl = document.getElementById('pace-res-km'), miEl = document.getElementById('pace-res-mi'), spdEl = document.getElementById('pace-res-speed');

  function pad(n) { return n < 10 ? '0' + n : n; }

  function update() {
    const distKm = parseFloat(dEl.value);
    const h = parseInt(hEl.value, 10) || 0;
    const m = parseInt(mEl.value, 10) || 0;
    const s = parseInt(sEl.value, 10) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0 || isNaN(distKm) || distKm <= 0) return;

    const secPerKm = totalSeconds / distKm;
    const distMiles = distKm * 0.621371;
    const secPerMile = totalSeconds / distMiles;
    const speedKmh = distKm / (totalSeconds / 3600);

    const kmMin = Math.floor(secPerKm / 60);
    const kmSec = Math.round(secPerKm % 60);

    const miMin = Math.floor(secPerMile / 60);
    const miSec = Math.round(secPerMile % 60);

    kmEl.textContent = kmMin + ':' + pad(kmSec) + ' / km';
    miEl.textContent = miMin + ':' + pad(miSec) + ' / mile';
    spdEl.textContent = speedKmh.toFixed(2) + ' km/h (' + (speedKmh * 0.621371).toFixed(2) + ' mph)';
  }

  [dEl, hEl, mEl, sEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select your race distance (5K, 10K, Half, or Marathon).',
      'Enter target goal finish time in hours, minutes, and seconds.',
      'Inspect required pace splits per kilometer and per mile.'
    ],
    benefitTitle: 'Pacing Strategy in Endurance Running',
    benefitContent: 'Even pacing prevents premature glycogen depletion and lactic acid accumulation, allowing runners to achieve personal records without hitting the wall.',
    faqs: [{ q: 'What pace is required for a sub-2 hour Half Marathon?', a: 'A pace of 5:41 per kilometer (9:09 per mile) produces a finish time of 1 hour 59 minutes 59 seconds.' }]
  },

  // 5. One Rep Max (1RM) Strength Calculator
  {
    slug: 'one-rep-max-1rm-calculator',
    name: 'One Rep Max (1RM) Strength Calculator',
    description: 'Calculate your 1-rep maximum lift (1RM) and percentage training loads (90%, 80%, 70%) using the clinical Epley and Brzycki strength equations.',
    category: 'Health',
    icon: 'text',
    keywords: ['one rep max calculator', '1rm calculator', 'bench press 1rm calculator', 'squat 1rm calculator', 'epley formula 1rm online'],
    order: 128,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Weight Lifted & Repetitions',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="orm-weight">Weight Lifted (kg or lbs)</label>
          <input class="tool-textarea" id="orm-weight" type="number" step="any" value="80" placeholder="e.g. 80 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="orm-reps">Repetitions Completed (1 - 15)</label>
          <input class="tool-textarea" id="orm-reps" type="number" min="1" max="15" value="6" placeholder="e.g. 6" />
        </div>
      </div>
      <div id="orm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="orm-res-1rm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">96 kg</span>
            <span class="stat-label">Estimated 1 Rep Max (Epley)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="orm-res-brzycki" style="font-weight:700;">94 kg</span>
            <span class="stat-label">Brzycki Formula 1RM</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wtEl = document.getElementById('orm-weight'), repEl = document.getElementById('orm-reps');
  const epleyEl = document.getElementById('orm-res-1rm'), brzEl = document.getElementById('orm-res-brzycki');

  function update() {
    const w = parseFloat(wtEl.value);
    const r = parseInt(repEl.value, 10);
    if (isNaN(w) || isNaN(r) || w <= 0 || r < 1 || r > 15) return;

    if (r === 1) {
      epleyEl.textContent = w + ' kg';
      brzEl.textContent = w + ' kg';
      return;
    }

    // Epley: 1RM = w * (1 + r / 30)
    const epley = w * (1 + r / 30);
    // Brzycki: 1RM = w * (36 / (37 - r))
    const brzycki = w * (36 / (37 - r));

    epleyEl.textContent = Math.round(epley) + ' units';
    brzEl.textContent = Math.round(brzycki) + ' units';
  }

  wtEl.addEventListener('input', update);
  repEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the weight lifted in any unit (kg or lbs).',
      'Enter the number of repetitions completed with good form (1 to 15 reps).',
      'Inspect your estimated 1-rep maximum without risking injury with max singles.'
    ],
    benefitTitle: 'Epley vs Brzycki 1RM Estimation',
    benefitContent: 'Testing an actual 1-rep maximum carries significant injury risk. Mathematical sub-maximal rep equations (like Epley 1RM = W · (1 + r/30)) accurately estimate maximal strength within 2-3%.',
    faqs: [{ q: 'Why is 1RM estimation limited to 15 reps?', a: 'Sets beyond 12-15 reps measure muscular endurance rather than neuromuscular maximal strength.' }]
  }
];

tools5.forEach(createTool);
console.log('Mega pack 5 complete.');
