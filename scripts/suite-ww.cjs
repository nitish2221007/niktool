const { createTool } = require('./generate-curated-tools.cjs');

// Suite WW: 5 Tools in Probability Distributions, Poisson, Binomial & Reliability to reach 555 tools
const toolsSuiteWW = [
  // 1. Binomial Distribution Probability & Cumulative CDF Calculator
  {
    slug: 'binomial-distribution-probability-calculator',
    name: 'Binomial Distribution Probability & CDF Calculator',
    description: 'Calculate exact binomial probability (P(X = k) = C(n, k) · p^k · (1-p)^(n-k)), cumulative probability P(X ≤ k), expected value (E[X] = n·p), and variance.',
    category: 'Math',
    icon: 'text',
    keywords: ['binomial distribution calculator', 'binomial probability formula online', 'p x equals k binomial calculator', 'cumulative binomial cdf calculator online', 'bernoulli trials probability calculator'],
    order: 426,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Trials (n), Success Probability (p) & Successes (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bn-n">Trials (n)</label>
          <input class="tool-textarea" id="bn-n" type="number" min="1" max="500" value="10" placeholder="10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-p">Success Prob p (0 - 1)</label>
          <input class="tool-textarea" id="bn-p" type="number" step="0.01" min="0" max="1" value="0.5" placeholder="0.5 (Fair Coin)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-k">Successes (k)</label>
          <input class="tool-textarea" id="bn-k" type="number" min="0" value="5" placeholder="5" />
        </div>
      </div>
      <div id="bn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bn-res-exact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.2461 (24.6%)</span>
            <span class="stat-label">Exact Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bn-res-cumul" style="font-weight:700;">P(X ≤ k) = 62.3%</span>
            <span class="stat-label">Cumulative Probability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('bn-n'), pEl = document.getElementById('bn-p'), kEl = document.getElementById('bn-k');
  const exResEl = document.getElementById('bn-res-exact'), cmResEl = document.getElementById('bn-res-cumul');

  function logFact(n) {
    let ans = 0;
    for (let i = 2; i <= n; i++) ans += Math.log(i);
    return ans;
  }

  function nCr(n, r) {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    return Math.round(Math.exp(logFact(n) - logFact(r) - logFact(n - r)));
  }

  function binomP(n, k, p) {
    if (k < 0 || k > n) return 0;
    const coeff = nCr(n, k);
    return coeff * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  function update() {
    const n = parseInt(nEl.value, 10), p = parseFloat(pEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(n) || isNaN(p) || isNaN(k) || n < 1 || p < 0 || p > 1 || k < 0 || k > n) return;

    const pExact = binomP(n, k, p);
    let pCumul = 0;
    for (let i = 0; i <= k; i++) pCumul += binomP(n, i, p);

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = 'P(X ≤ ' + k + ') = ' + (pCumul * 100).toFixed(2) + '% (E[X] = ' + (n * p).toFixed(1) + ')';
  }

  [nEl, pEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of independent trials (n).',
      'Enter probability of success on a single trial (p between 0.0 and 1.0).',
      'Enter target number of successes (k).',
      'Inspect exact PMF probability P(X = k) and cumulative CDF probability P(X ≤ k).'
    ],
    benefitTitle: 'Bernoulli Repeated Trial Statistics',
    benefitContent: 'The binomial distribution models discrete processes where each trial has exactly two outcomes (success/failure) with constant probability p, foundational for A/B testing and quality control sampling.',
    faqs: [{ q: 'What is the probability of getting exactly 5 heads in 10 fair coin flips?', a: 'P(X = 5) = C(10, 5) · (0.5)⁵ · (0.5)⁵ = 252 / 1024 ≈ 24.61%.' }]
  },

  // 2. Poisson Distribution Probability & Arrival Rate Calculator
  {
    slug: 'poisson-distribution-probability-calculator',
    name: 'Poisson Distribution Probability & Rate Calculator',
    description: 'Calculate Poisson probability (P(X = k) = (λ^k · e^(-λ)) / k!) and cumulative event arrival counts from average event rate (λ).',
    category: 'Math',
    icon: 'text',
    keywords: ['poisson distribution calculator', 'poisson probability formula online', 'lambda k poisson calculator', 'call center arrival rate poisson online', 'poisson cumulative probability calculator'],
    order: 427,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Average Rate λ (Mean Occurrences) & Target Occurrences (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ps-lam">Mean Rate λ (Events / Interval)</label>
          <input class="tool-textarea" id="ps-lam" type="number" step="any" value="4.0" placeholder="4.0 (e.g. 4 emails/hr)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-k">Target Occurrences k</label>
          <input class="tool-textarea" id="ps-k" type="number" min="0" value="4" placeholder="4" />
        </div>
      </div>
      <div id="ps-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-exact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.1954 (19.5%)</span>
            <span class="stat-label">Exact Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-cumul" style="font-weight:700;">P(X ≤ k) = 62.9%</span>
            <span class="stat-label">Cumulative Probability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('ps-lam'), kEl = document.getElementById('ps-k');
  const exResEl = document.getElementById('ps-res-exact'), cmResEl = document.getElementById('ps-res-cumul');

  function fact(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  function poissonP(lambda, k) {
    if (k < 0) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / fact(k);
  }

  function update() {
    const lam = parseFloat(lamEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(lam) || isNaN(k) || lam <= 0 || k < 0 || k > 100) return;

    const pExact = poissonP(lam, k);
    let pCumul = 0;
    for (let i = 0; i <= k; i++) pCumul += poissonP(lam, i);

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = 'P(X ≤ ' + k + ') = ' + (pCumul * 100).toFixed(2) + '% (Variance σ² = ' + lam.toFixed(1) + ')';
  }

  lamEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter average expected event arrival rate λ per given time or space interval.',
      'Enter target number of event occurrences k.',
      'Inspect exact and cumulative Poisson occurrence probabilities.'
    ],
    benefitTitle: 'Siméon Denis Poisson\'s Rare Event Law',
    benefitContent: 'The Poisson distribution models independent events occurring at a known constant average rate (e.g. website server requests per second, customer traffic arrivals, radioactive decay counts).',
    faqs: [{ q: 'What is unique about Poisson mean and variance?', a: 'For any Poisson distribution, the expected mean and the variance are mathematically identical: E[X] = Var(X) = λ.' }]
  },

  // 3. Geometric Distribution Trials Until First Success Calculator
  {
    slug: 'geometric-distribution-probability-calculator',
    name: 'Geometric Distribution (Trials to First Success) Calculator',
    description: 'Calculate geometric probability (P(X = k) = (1 - p)^(k - 1) · p), cumulative probability P(X ≤ k), and expected number of trials until the first success (E[X] = 1 / p).',
    category: 'Math',
    icon: 'text',
    keywords: ['geometric distribution calculator', 'trials until first success formula', 'geometric probability calculator online', '1 minus p to the k minus 1 p online', 'memoryless distribution calculator'],
    order: 428,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Success Probability (p) & Trial Number (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gm-p">Success Prob p (0 - 1)</label>
          <input class="tool-textarea" id="gm-p" type="number" step="0.01" min="0.01" max="1" value="0.20" placeholder="0.20 (1 in 5 chance)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-k">Trial Number k (First Success)</label>
          <input class="tool-textarea" id="gm-k" type="number" min="1" value="3" placeholder="3" />
        </div>
      </div>
      <div id="gm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-exact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.1280 (12.8%)</span>
            <span class="stat-label">Exact Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-cumul" style="font-weight:700;">48.8% Success by Trial #3</span>
            <span class="stat-label">Cumulative P(X ≤ k) = 1 - (1-p)^k</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-mean">E[X] = 5.0 Trials</span>
            <span class="stat-label">Expected Trials (1 / p)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('gm-p'), kEl = document.getElementById('gm-k');
  const exResEl = document.getElementById('gm-res-exact'), cmResEl = document.getElementById('gm-res-cumul'), mResEl = document.getElementById('gm-res-mean');

  function update() {
    const p = parseFloat(pEl.value), k = parseInt(kEl.value, 10);
    if (isNaN(p) || isNaN(k) || p <= 0 || p > 1 || k < 1) return;

    // P(X = k) = (1 - p)^(k - 1) * p
    const pExact = Math.pow(1 - p, k - 1) * p;
    // P(X <= k) = 1 - (1 - p)^k
    const pCumul = 1 - Math.pow(1 - p, k);
    const expected = 1 / p;

    exResEl.textContent = pExact.toFixed(4) + ' (' + (pExact * 100).toFixed(2) + '%)';
    cmResEl.textContent = (pCumul * 100).toFixed(1) + '% Cumulative P(X ≤ ' + k + ')';
    mResEl.textContent = 'E[X] = ' + expected.toFixed(1) + ' Trials Average';
  }

  pEl.addEventListener('input', update);
  kEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter single-trial success probability p.',
      'Enter trial number k when the first success occurs.',
      'Inspect exact probability P(X = k), cumulative probability P(X ≤ k), and expected average trials until success.'
    ],
    benefitTitle: 'Memoryless Property of Geometric Distribution',
    benefitContent: 'The geometric distribution is the only discrete memoryless distribution: past failed attempts do not alter the probability of success on future trials (the gambler\'s fallacy).',
    faqs: [{ q: 'How many dice rolls on average to roll a six (p = 1/6)?', a: 'Expected trials E[X] = 1 / (1/6) = exactly 6.0 rolls.' }]
  },

  // 4. Hypergeometric Distribution Sampling Without Replacement Calculator
  {
    slug: 'hypergeometric-distribution-probability-calculator',
    name: 'Hypergeometric Distribution (Sampling Without Replacement) Calculator',
    description: 'Calculate hypergeometric probability (P(X = k) = C(K, k) · C(N - K, n - k) / C(N, n)) for lottery draws and card games sampled without replacement.',
    category: 'Math',
    icon: 'text',
    keywords: ['hypergeometric distribution calculator', 'sampling without replacement probability', 'card deck hypergeometric calculator', 'lottery probability formula online', 'finite population sampling calculator'],
    order: 429,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Population (N), Successes in Population (K), Sample (n) & Sample Successes (k)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hg-N">Population Size (N)</label>
          <input class="tool-textarea" id="hg-N" type="number" min="2" value="52" placeholder="52 (Card Deck)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hg-K">Successes in Pop (K)</label>
          <input class="tool-textarea" id="hg-K" type="number" min="1" value="4" placeholder="4 (Aces in Deck)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hg-n">Sample Drawn (n)</label>
          <input class="tool-textarea" id="hg-n" type="number" min="1" value="5" placeholder="5 (Poker Hand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hg-k">Drawn Successes (k)</label>
          <input class="tool-textarea" id="hg-k" type="number" min="0" value="1" placeholder="1 (Ace drawn)" />
        </div>
      </div>
      <div id="hg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hg-res-prob" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.2995 (29.9%)</span>
            <span class="stat-label">Probability P(X = k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hg-res-mean" style="font-weight:700;">E[X] = 0.38</span>
            <span class="stat-label">Expected Sample Successes (n · K / N)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const NEl = document.getElementById('hg-N'), KEl = document.getElementById('hg-K');
  const nEl = document.getElementById('hg-n'), kEl = document.getElementById('hg-k');
  const pResEl = document.getElementById('hg-res-prob'), mResEl = document.getElementById('hg-res-mean');

  function logFact(n) {
    let ans = 0;
    for (let i = 2; i <= n; i++) ans += Math.log(i);
    return ans;
  }

  function logCombin(n, r) {
    if (r < 0 || r > n) return -Infinity;
    return logFact(n) - logFact(r) - logFact(n - r);
  }

  function update() {
    const N = parseInt(NEl.value, 10), K = parseInt(KEl.value, 10);
    const n = parseInt(nEl.value, 10), k = parseInt(kEl.value, 10);

    if (isNaN(N) || isNaN(K) || isNaN(n) || isNaN(k) || N < 1 || K > N || n > N || k > K || k > n) {
      pResEl.textContent = 'Invalid parameters';
      return;
    }

    // P(X = k) = C(K, k) * C(N - K, n - k) / C(N, n)
    const logP = logCombin(K, k) + logCombin(N - K, n - k) - logCombin(N, n);
    const prob = Math.exp(logP);
    const expected = (n * K) / N;

    pResEl.textContent = prob.toFixed(4) + ' (' + (prob * 100).toFixed(2) + '%)';
    mResEl.textContent = 'E[X] = ' + expected.toFixed(2) + ' expected successes';
  }

  [NEl, KEl, nEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total population size N (e.g. 52 cards in a deck).',
      'Enter number of success states in population K (e.g. 4 Aces).',
      'Enter sample size drawn without replacement n (e.g. 5 card hand).',
      'Enter desired number of observed successes in sample k (e.g. 1 Ace).',
      'Inspect exact hypergeometric combinatorial probability.'
    ],
    benefitTitle: 'Sampling Without Replacement Precision',
    benefitContent: 'Unlike the binomial distribution which assumes replacement and independent trials, the hypergeometric distribution accounts for changing probabilities as items are removed from a finite population.',
    faqs: [{ q: 'What is the probability of getting exactly 1 Ace in a 5-card poker hand?', a: 'P(X = 1) = C(4, 1) · C(48, 4) / C(52, 5) = (4 × 194,580) / 2,598,960 ≈ 29.95%.' }]
  },

  // 5. Exponential Distribution Reliability & MTBF Failure Rate Calculator
  {
    slug: 'exponential-distribution-reliability-calculator',
    name: 'Exponential Distribution Reliability & MTBF Calculator',
    description: 'Calculate component survival reliability (R(t) = e^(-λ · t) = e^(-t / MTBF)), cumulative failure probability (F(t) = 1 - e^(-λt)), and failure rate (λ).',
    category: 'Math',
    icon: 'text',
    keywords: ['exponential distribution calculator', 'reliability function r t formula', 'mtbf failure rate calculator online', 'mean time between failures exponential', 'component survival probability calculator'],
    order: 430,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mean Time Between Failures (MTBF in Hours) & Operating Time (t)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="exp-mtbf">MTBF (Hours)</label>
          <input class="tool-textarea" id="exp-mtbf" type="number" step="any" value="50000" placeholder="50,000 Hours (Server SSD)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="exp-t">Mission Time t (Hours)</label>
          <input class="tool-textarea" id="exp-t" type="number" step="any" value="8760" placeholder="8,760 Hours (1 Year 24/7)" />
        </div>
      </div>
      <div id="exp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="exp-res-rel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">83.93% Survival</span>
            <span class="stat-label">Reliability R(t) = e^(-t/MTBF)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="exp-res-fail" style="color:#c53030; font-weight:700;">16.07% Failure Prob</span>
            <span class="stat-label">Unreliability F(t) = 1 - R(t)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('exp-mtbf'), tEl = document.getElementById('exp-t');
  const rResEl = document.getElementById('exp-res-rel'), fResEl = document.getElementById('exp-res-fail');

  function update() {
    const mtbf = parseFloat(mEl.value), t = parseFloat(tEl.value);
    if (isNaN(mtbf) || isNaN(t) || mtbf <= 0 || t < 0) return;

    // Failure rate lambda = 1 / MTBF
    const lambda = 1 / mtbf;
    // R(t) = exp(-lambda * t) = exp(-t / mtbf)
    const R = Math.exp(-t / mtbf);
    const F = 1 - R;

    rResEl.textContent = (R * 100).toFixed(2) + '% Survival Probability';
    fResEl.textContent = (F * 100).toFixed(2) + '% Failure Risk (λ = ' + (lambda * 1e6).toFixed(2) + ' FIT)';
  }

  mEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Mean Time Between Failures (MTBF) rating in hours.',
      'Enter target operating mission duration t in hours (8,760 hours = 1 continuous year).',
      'Inspect survival reliability R(t) percentage and cumulative failure risk.'
    ],
    benefitTitle: 'Constant Failure Rate ("Bathtub Curve" Useful Life)',
    benefitContent: 'During the useful life of electronic components, failures occur purely randomly at a constant failure rate λ = 1/MTBF, following an exponential reliability decay curve.',
    faqs: [{ q: 'If MTBF is 50,000 hours, what is the survival rate after 50,000 hours?', a: 'R(MTBF) = e^(-1) ≈ 36.79% (approximately 63.2% of components will have failed by the time they reach their rated MTBF).' }]
  }
];

toolsSuiteWW.forEach(createTool);
console.log('Suite WW complete: 5 tools created.');
