const { createTool } = require('./generate-curated-tools.cjs');

// Suite N: 5 Tools in Probability Distributions, Statistics & Sample Sizing
const toolsSuiteN = [
  // 1. Poisson Distribution Probability Calculator
  {
    slug: 'poisson-distribution-probability-calculator',
    name: 'Poisson Distribution Probability Calculator',
    description: 'Calculate exact probability P(X = k), cumulative P(X ≤ k), and P(X ≥ k) for event arrival rates using the Poisson distribution formula.',
    category: 'Math',
    icon: 'text',
    keywords: ['poisson distribution calculator', 'poisson probability formula', 'event arrival rate calculator', 'cumulative poisson probability online', 'lambda poisson distribution calculator'],
    order: 249,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Average Rate (λ) & Observed Occurrences (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="poi-lambda">Average Rate λ (Events / Period)</label>
          <input class="tool-textarea" id="poi-lambda" type="number" step="any" value="4.0" placeholder="e.g. 4.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poi-k">Observed Events (k)</label>
          <input class="tool-textarea" id="poi-k" type="number" min="0" step="1" value="3" placeholder="e.g. 3" />
        </div>
      </div>
      <div id="poi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="poi-res-exact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">19.54%</span>
            <span class="stat-label">Exact Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="poi-res-cumul" style="font-weight:700;">43.35%</span>
            <span class="stat-label">Cumulative P(X ≤ k)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('poi-lambda'), kEl = document.getElementById('poi-k');
  const exEl = document.getElementById('poi-res-exact'), cumEl = document.getElementById('poi-res-cumul');

  function factorial(n) {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function update() {
    const lambda = parseFloat(lamEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(lambda) || isNaN(k) || lambda <= 0 || k < 0 || k > 100) return;

    // P(X = k) = (lambda^k * e^-lambda) / k!
    const pExact = (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);

    let pCumul = 0;
    for (let i = 0; i <= k; i++) {
      pCumul += (Math.pow(lambda, i) * Math.exp(-lambda)) / factorial(i);
    }

    exEl.textContent = (pExact * 100).toFixed(2) + '%';
    cumEl.textContent = (pCumul * 100).toFixed(2) + '%';
  }

  lamEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter mean event arrival rate λ per time unit (e.g. 4.0 calls per hour).',
      'Enter target observed event count k.',
      'Inspect exact probability P(X = k) and cumulative probability P(X ≤ k).'
    ],
    benefitTitle: 'Modeling Random Independent Events',
    benefitContent: 'Siméon Denis Poisson formulated this distribution in 1837 to model rare occurrences (server requests, incoming customer calls, traffic accidents, radioactive decay counts) in fixed time windows.',
    faqs: [{ q: 'When is Poisson distribution used instead of Binomial?', a: 'Poisson is used when the number of potential trials is very large and the probability of individual occurrence is small.' }]
  },

  // 2. Binomial Distribution Probability Calculator
  {
    slug: 'binomial-distribution-probability-calculator',
    name: 'Binomial Distribution Probability Calculator',
    description: 'Calculate Bernoulli trial probabilities (P(X = k) = nCk · p^k · (1-p)^(n-k)), mean (μ = n·p), and variance for independent success trials.',
    category: 'Math',
    icon: 'text',
    keywords: ['binomial distribution calculator', 'bernoulli trials probability calculator', 'nck probability formula', 'cumulative binomial distribution online', 'binomial mean variance calculator'],
    order: 250,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Trials (n), Success Probability (p) & Successes (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bin-n">Number of Trials (n)</label>
          <input class="tool-textarea" id="bin-n" type="number" min="1" max="100" value="10" placeholder="10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bin-p">Success Probability p (0 to 1)</label>
          <input class="tool-textarea" id="bin-p" type="number" min="0" max="1" step="0.05" value="0.5" placeholder="0.5 (Coin Flip)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bin-k">Exact Successes (k)</label>
          <input class="tool-textarea" id="bin-k" type="number" min="0" max="100" value="5" placeholder="5" />
        </div>
      </div>
      <div id="bin-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bin-res-exact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">24.61%</span>
            <span class="stat-label">Exact Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bin-res-cumul" style="font-weight:700;">62.30%</span>
            <span class="stat-label">Cumulative P(X ≤ k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bin-res-mean">μ = 5.0 (σ² = 2.5)</span>
            <span class="stat-label">Mean &amp; Variance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('bin-n'), pEl = document.getElementById('bin-p'), kEl = document.getElementById('bin-k');
  const exEl = document.getElementById('bin-res-exact'), cumEl = document.getElementById('bin-res-cumul'), meanEl = document.getElementById('bin-res-mean');

  function nCr(n, r) {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return res;
  }

  function update() {
    const n = parseInt(nEl.value, 10), p = parseFloat(pEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(n) || isNaN(p) || isNaN(k) || n < 1 || p < 0 || p > 1 || k < 0 || k > n) return;

    // P(X = k) = nCk * p^k * (1-p)^(n-k)
    const pExact = nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);

    let pCumul = 0;
    for (let i = 0; i <= k; i++) {
      pCumul += nCr(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
    }

    const mean = n * p;
    const variance = n * p * (1 - p);

    exEl.textContent = (pExact * 100).toFixed(2) + '%';
    cumEl.textContent = (pCumul * 100).toFixed(2) + '%';
    meanEl.textContent = 'μ = ' + mean.toFixed(1) + ' (σ² = ' + variance.toFixed(2) + ')';
  }

  [nEl, pEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total trials n (e.g. 10 coin tosses, 20 factory item inspections).',
      'Enter probability of success on a single trial p (e.g. 0.5 for fair coin, 0.05 for defect rate).',
      'Enter exact target successes k.',
      'Inspect exact probability P(X = k) and cumulative probability P(X ≤ k).'
    ],
    benefitTitle: 'Jacob Bernoulli\'s Foundational Probability Law',
    benefitContent: 'The binomial distribution models processes with binary outcomes (Success/Failure, Pass/Fail, Yes/No) across n independent trials.',
    faqs: [{ q: 'What is the probability of getting exactly 5 heads in 10 flips of a fair coin?', a: 'P(X = 5) = 10C5 × (0.5)¹⁰ = 252 / 1024 ≈ 24.61%.' }]
  },

  // 3. Exponential Distribution & Reliability MTTF Calculator
  {
    slug: 'exponential-distribution-calculator',
    name: 'Exponential Distribution & Reliability Calculator',
    description: 'Calculate survival probability, cumulative failure P(X ≤ x) = 1 - e^(-λx), and Mean Time To Failure (MTTF = 1/λ) for hardware reliability engineering.',
    category: 'Math',
    icon: 'text',
    keywords: ['exponential distribution calculator', 'mttf reliability calculator', 'failure rate lambda calculator', 'exponential survival probability online', 'memoryless distribution calculator'],
    order: 251,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Failure Rate (λ) & Time Interval (t)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="exp-mttf">Mean Time to Failure MTTF (Hours / Years)</label>
          <input class="tool-textarea" id="exp-mttf" type="number" step="any" value="50000" placeholder="50,000 Hours" />
        </div>
        <div class="control-group">
          <label class="control-label" for="exp-t">Operating Time (t)</label>
          <input class="tool-textarea" id="exp-t" type="number" step="any" value="10000" placeholder="10,000 Hours" />
        </div>
      </div>
      <div id="exp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="exp-res-surv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">81.87%</span>
            <span class="stat-label">Reliability / Survival Probability R(t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="exp-res-fail" style="color:#c53030; font-weight:700;">18.13%</span>
            <span class="stat-label">Failure Probability F(t)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mttfEl = document.getElementById('exp-mttf'), tEl = document.getElementById('exp-t');
  const survEl = document.getElementById('exp-res-surv'), failEl = document.getElementById('exp-res-fail');

  function update() {
    const mttf = parseFloat(mttfEl.value), t = parseFloat(tEl.value);
    if (isNaN(mttf) || isNaN(t) || mttf <= 0 || t < 0) return;

    // lambda = 1 / MTTF
    const lambda = 1 / mttf;
    // R(t) = e^(-lambda * t)
    const rT = Math.exp(-lambda * t);
    const fT = 1 - rT;

    survEl.textContent = (rT * 100).toFixed(2) + '% Survival';
    failEl.textContent = (fT * 100).toFixed(2) + '% Failed';
  }

  mttfEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter device Mean Time to Failure (MTTF) (e.g. 50,000 hours for a hard drive or server fan).',
      'Enter mission operating time t.',
      'Inspect the probability that the component survives without failure.'
    ],
    benefitTitle: 'The Memoryless Property of Exponential Decay',
    benefitContent: 'The exponential distribution is the only continuous distribution with the "memoryless" property: a component that has survived to time t is as good as new regarding its future remaining lifespan.',
    faqs: [{ q: 'What is the probability of failure at t = MTTF?', a: 'At t = MTTF, survival probability is e⁻¹ ≈ 36.79%, meaning 63.21% of components will have failed.' }]
  },

  // 4. Statistical Sample Size Determination Calculator (Cochran's Formula)
  {
    slug: 'sample-size-confidence-interval-calculator',
    name: 'Sample Size & Margin of Error Survey Calculator',
    description: 'Calculate statistically representative sample size (n = (Z² · p · (1-p)) / E²) based on Confidence Level (90%, 95%, 99%) and Margin of Error for polling and scientific research.',
    category: 'Math',
    icon: 'text',
    keywords: ['sample size calculator', 'survey sample size formula', 'margin of error sample size', 'cochran sample size formula online', 'confidence level 95 sample size'],
    order: 252,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Confidence Level & Desired Margin of Error',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ss-conf">Confidence Level</label>
          <select class="tool-textarea" id="ss-conf">
            <option value="1.645">90% (Z = 1.645)</option>
            <option value="1.960" selected>95% (Z = 1.960 Standard)</option>
            <option value="2.576">99% (Z = 2.576)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-moe">Margin of Error E (%)</label>
          <input class="tool-textarea" id="ss-moe" type="number" min="0.1" max="20" step="0.5" value="5.0" placeholder="5.0%" />
        </div>
      </div>
      <div id="ss-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ss-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">385 Respondents</span>
            <span class="stat-label">Required Sample Size (n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ss-res-p">p = 50% (Conservative)</span>
            <span class="stat-label">Assumed Population Proportion</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const confEl = document.getElementById('ss-conf'), moeEl = document.getElementById('ss-moe');
  const nResEl = document.getElementById('ss-res-n');

  function update() {
    const z = parseFloat(confEl.value);
    const moePct = parseFloat(moeEl.value);
    if (isNaN(z) || isNaN(moePct) || moePct <= 0 || moePct > 50) return;

    const E = moePct / 100;
    const p = 0.5; // Maximum variability assumption

    // n = (Z^2 * p * (1 - p)) / E^2
    const n = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(E, 2);
    const nFinal = Math.ceil(n);

    nResEl.textContent = nFinal.toLocaleString() + ' Respondents';
  }

  confEl.addEventListener('change', update);
  moeEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select desired confidence level (95% is the scientific research standard).',
      'Enter acceptable margin of error percentage (e.g. ±3% or ±5%).',
      'Inspect the required number of completed surveys needed to represent a large population.'
    ],
    benefitTitle: 'Cochran\'s Law of Representative Sampling',
    benefitContent: 'William G. Cochran proved that for large populations, a random sample of only ~385 respondents achieves a ±5% margin of error at 95% confidence regardless of whether the population is 100,000 or 1 billion people.',
    faqs: [{ q: 'How many respondents are needed for a ±3% margin of error at 95% confidence?', a: 'Approximately 1,068 completed survey responses.' }]
  },

  // 5. Chebyshev's Inequality Probability Bounds Calculator
  {
    slug: 'chebyshev-inequality-probability-calculator',
    name: 'Chebyshev\'s Inequality Probability Bounds Calculator',
    description: 'Calculate minimum guaranteed probability bounds (P(|X - μ| within k·σ) ≥ 1 - 1/k²) for arbitrary non-normal datasets using Chebyshev\'s theorem.',
    category: 'Math',
    icon: 'text',
    keywords: ['chebyshev inequality calculator', 'chebyshevs theorem probability bounds', 'non normal distribution bounds calculator', 'standard deviations within mean chebyshev', 'chebyshev formula online'],
    order: 253,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Deviations from Mean (k)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cheb-k">Standard Deviations (k > 1)</label>
        <input class="tool-textarea" id="cheb-k" type="number" min="1.01" step="0.1" value="2.0" placeholder="e.g. 2.0 (μ ± 2σ)" />
      </div>
      <div id="cheb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cheb-res-within" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">≥ 75.00%</span>
            <span class="stat-label">Minimum Fraction Within μ ± k·σ</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cheb-res-outside" style="color:#c53030; font-weight:700;">≤ 25.00%</span>
            <span class="stat-label">Maximum Fraction Outside Bounds (1/k²)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('cheb-k');
  const wEl = document.getElementById('cheb-res-within'), oEl = document.getElementById('cheb-res-outside');

  function update() {
    const k = parseFloat(kEl.value);
    if (isNaN(k) || k <= 1) {
      wEl.textContent = 'k must be > 1'; oEl.textContent = '-'; return;
    }

    // P(|X - mu| < k*sigma) >= 1 - (1 / k^2)
    const maxOut = (1 / Math.pow(k, 2));
    const minIn = 1 - maxOut;

    wEl.textContent = '≥ ' + (minIn * 100).toFixed(2) + '%';
    oEl.textContent = '≤ ' + (maxOut * 100).toFixed(2) + '%';
  }

  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter standard deviations distance factor k (must be greater than 1).',
      'Inspect the mathematical minimum guaranteed percentage of data falling within k standard deviations of the mean for any probability distribution.'
    ],
    benefitTitle: 'Distribution-Free Statistical Guarantee',
    benefitContent: 'Unlike the Empirical 68-95-99.7 rule which requires a bell-curve Normal distribution, Pafnuty Chebyshev\'s theorem holds strictly true for any dataset regardless of skewness, asymmetry, or bimodal shapes.',
    faqs: [{ q: 'What percentage of data must lie within 3 standard deviations under Chebyshev?', a: 'At least 1 - 1/3² = 1 - 1/9 = 88.89% of all data points must lie within μ ± 3σ.' }]
  }
];

toolsSuiteN.forEach(createTool);
console.log('Suite N complete: 5 tools created.');
