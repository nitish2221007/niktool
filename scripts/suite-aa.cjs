const { createTool } = require('./generate-curated-tools.cjs');

// Suite AA: 7 Tools in Statistics, Hypothesis Testing, Machine Learning & Error Metrics
const toolsSuiteAA = [
  // 1. Standard Error of the Mean (SEM) Calculator
  {
    slug: 'standard-error-of-the-mean-sem-calculator',
    name: 'Standard Error of the Mean (SEM) Calculator',
    description: 'Calculate Standard Error of the Mean (SEM = s / √n) and precision margin from sample standard deviation and sample size.',
    category: 'Math',
    icon: 'text',
    keywords: ['standard error of the mean calculator', 'sem calculator statistics', 'standard error formula online', 'sample mean precision calculator', 'sem vs standard deviation calculator'],
    order: 314,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sample Standard Deviation (s) & Sample Size (n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sem-s">Sample Standard Deviation (s)</label>
          <input class="tool-textarea" id="sem-s" type="number" step="any" value="12.5" placeholder="12.5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sem-n">Sample Size (n)</label>
          <input class="tool-textarea" id="sem-n" type="number" min="2" step="1" value="100" placeholder="100" />
        </div>
      </div>
      <div id="sem-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sem-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.250</span>
            <span class="stat-label">Standard Error of the Mean (SEM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sem-res-ci95">± 2.450 (95% CI Margin)</span>
            <span class="stat-label">95% Confidence Margin (1.96 · SEM)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sem-s'), nEl = document.getElementById('sem-n');
  const semResEl = document.getElementById('sem-res-val'), ciEl = document.getElementById('sem-res-ci95');

  function update() {
    const s = parseFloat(sEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(s) || isNaN(n) || s <= 0 || n < 2) return;

    // SEM = s / sqrt(n)
    const sem = s / Math.sqrt(n);
    const ci95 = 1.96 * sem;

    semResEl.textContent = sem.toFixed(3);
    ciEl.textContent = '± ' + ci95.toFixed(3) + ' (95% CI Margin)';
  }

  sEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter sample standard deviation s.',
      'Enter total sample count n.',
      'Inspect the Standard Error of the Mean (SEM).'
    ],
    benefitTitle: 'SEM vs Standard Deviation (SD)',
    benefitContent: 'Standard Deviation (SD) measures individual data dispersion around the sample mean, whereas Standard Error of the Mean (SEM) measures how accurately the sample mean estimates the true population mean.',
    faqs: [{ q: 'What happens to SEM when sample size quadruples?', a: 'Because SEM ∝ 1/√n, quadrupling sample size (n × 4) cuts the standard error in half (1/√4 = 0.5).' }]
  },

  // 2. Confidence Interval for the Population Mean Calculator
  {
    slug: 'confidence-interval-for-the-mean-calculator',
    name: 'Confidence Interval for the Mean (95% & 99%) Calculator',
    description: 'Calculate statistical Confidence Intervals (CI = x̄ ± Z · (s / √n)) for population means across 90%, 95%, and 99% confidence levels.',
    category: 'Math',
    icon: 'text',
    keywords: ['confidence interval calculator', 'confidence interval for the mean online', '95 confidence interval formula', 'margin of error confidence interval', 'population mean confidence bounds'],
    order: 315,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sample Mean (x̄), Std Dev (s) & Sample Size (n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ci-mean">Sample Mean (x̄)</label>
          <input class="tool-textarea" id="ci-mean" type="number" step="any" value="50.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-sd">Std Dev (s)</label>
          <input class="tool-textarea" id="ci-sd" type="number" step="any" value="8.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-n">Sample Size (n)</label>
          <input class="tool-textarea" id="ci-n" type="number" min="2" value="64" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-conf">Confidence Level</label>
          <select class="tool-textarea" id="ci-conf">
            <option value="1.645">90% (Z = 1.645)</option>
            <option value="1.960" selected>95% (Z = 1.960)</option>
            <option value="2.576">99% (Z = 2.576)</option>
          </select>
        </div>
      </div>
      <div id="ci-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ci-res-bounds" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">[48.04, 51.96]</span>
            <span class="stat-label">Confidence Interval Range</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ci-res-moe" style="font-weight:700;">± 1.960</span>
            <span class="stat-label">Margin of Error (ME)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('ci-mean'), sEl = document.getElementById('ci-sd');
  const nEl = document.getElementById('ci-n'), cEl = document.getElementById('ci-conf');
  const bEl = document.getElementById('ci-res-bounds'), moeEl = document.getElementById('ci-res-moe');

  function update() {
    const mean = parseFloat(mEl.value), s = parseFloat(sEl.value), n = parseInt(nEl.value, 10), z = parseFloat(cEl.value);
    if (isNaN(mean) || isNaN(s) || isNaN(n) || isNaN(z) || s <= 0 || n < 2) return;

    // ME = Z * (s / sqrt(n))
    const sem = s / Math.sqrt(n);
    const moe = z * sem;
    const lower = mean - moe;
    const upper = mean + moe;

    bEl.textContent = '[' + lower.toFixed(2) + ', ' + upper.toFixed(2) + ']';
    moeEl.textContent = '± ' + moe.toFixed(3);
  }

  [mEl, sEl, nEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter sample mean, sample standard deviation, and sample size n.',
      'Select confidence level (95% standard).',
      'Inspect lower and upper population parameter boundaries.'
    ],
    benefitTitle: 'Jerzy Neyman\'s Confidence Bounds',
    benefitContent: 'A 95% confidence interval means that if we repeated sampling indefinitely, 95% of the calculated intervals would contain the true underlying population mean.',
    faqs: [{ q: 'What is the standard Z value for 95% confidence?', a: 'Z = 1.960 (for a two-tailed standard normal distribution).' }]
  },

  // 3. Mean Absolute Deviation (MAD) Calculator
  {
    slug: 'mean-absolute-deviation-mad-calculator',
    name: 'Mean Absolute Deviation (MAD) Calculator',
    description: 'Calculate Mean Absolute Deviation (MAD = (1/n) · Σ|xᵢ - x̄|) and statistical dispersion for datasets with outliers.',
    category: 'Math',
    icon: 'text',
    keywords: ['mean absolute deviation calculator', 'mad statistics calculator online', 'mad dispersion metric calculator', 'average deviation from mean formula', 'mad vs standard deviation online'],
    order: 316,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dataset Values',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mad-input">Enter Numbers (Comma or space separated)</label>
        <textarea class="tool-textarea" id="mad-input" rows="3" placeholder="10, 15, 12, 18, 14, 25, 16"></textarea>
      </div>
      <div id="mad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mad-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.43</span>
            <span class="stat-label">Mean Absolute Deviation (MAD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mad-res-mean" style="font-weight:700;">x̄ = 15.71</span>
            <span class="stat-label">Sample Mean</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('mad-input');
  const madEl = document.getElementById('mad-res-val'), meanEl = document.getElementById('mad-res-mean');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\\s\\t\\n]+/).map(Number).filter(v => !isNaN(v));
    if (nums.length < 2) return;

    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;

    let sumAbsDiff = 0;
    for (let i = 0; i < n; i++) {
      sumAbsDiff += Math.abs(nums[i] - mean);
    }

    const mad = sumAbsDiff / n;

    madEl.textContent = mad.toFixed(2);
    meanEl.textContent = 'x̄ = ' + mean.toFixed(2) + ' (n = ' + n + ')';
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste comma-separated or space-separated numbers.',
      'Inspect the Mean Absolute Deviation (MAD) and arithmetic mean.'
    ],
    benefitTitle: 'Robustness Against Outliers',
    benefitContent: 'Because MAD does not square deviations (unlike variance and standard deviation), it provides a more robust and intuitive measure of average scatter that is less sensitive to extreme statistical outliers.',
    faqs: [{ q: 'What does MAD = 0 mean?', a: 'MAD = 0 indicates that all data points in the sample are identical with zero variability.' }]
  },

  // 4. Root Mean Square Error (RMSE) Machine Learning Loss Calculator
  {
    slug: 'root-mean-square-error-rmse-calculator',
    name: 'Root Mean Square Error (RMSE) & MAE Calculator',
    description: 'Calculate Root Mean Square Error (RMSE = √(Σ(y_pred - y_act)² / n)) and Mean Absolute Error (MAE) for regression machine learning model evaluation.',
    category: 'Developer',
    icon: 'code',
    keywords: ['rmse calculator', 'root mean square error online', 'mae vs rmse calculator', 'machine learning regression loss calculator', 'actual vs predicted error metric'],
    order: 317,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Actual vs Predicted Value Pairs (Actual, Predicted)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="rmse-input">Enter (Actual, Predicted) Pairs (One pair per line)</label>
        <textarea class="tool-textarea" id="rmse-input" rows="5" placeholder="10.5, 10.2&#10;14.0, 14.8&#10;18.2, 17.9&#10;22.0, 23.1&#10;30.0, 29.2"></textarea>
      </div>
      <div id="rmse-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rmse-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.787</span>
            <span class="stat-label">Root Mean Square Error (RMSE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rmse-res-mae" style="font-weight:700;">0.740</span>
            <span class="stat-label">Mean Absolute Error (MAE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rmse-res-mse">0.620</span>
            <span class="stat-label">Mean Squared Error (MSE)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('rmse-input');
  const rmseEl = document.getElementById('rmse-res-val'), maeEl = document.getElementById('rmse-res-mae'), mseEl = document.getElementById('rmse-res-mse');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
    const pairs = [];
    for (const l of lines) {
      const parts = l.split(/[,\\s\\t]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        pairs.push({ actual: parts[0], pred: parts[1] });
      }
    }

    if (pairs.length < 1) return;

    const n = pairs.length;
    let sumSqErr = 0;
    let sumAbsErr = 0;

    for (const p of pairs) {
      const err = p.pred - p.actual;
      sumSqErr += Math.pow(err, 2);
      sumAbsErr += Math.abs(err);
    }

    const mse = sumSqErr / n;
    const rmse = Math.sqrt(mse);
    const mae = sumAbsErr / n;

    rmseEl.textContent = rmse.toFixed(3);
    maeEl.textContent = mae.toFixed(3);
    mseEl.textContent = mse.toFixed(3);
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter (Actual, Predicted) value pairs (one per line).',
      'Inspect standard AI/ML regression performance metrics: RMSE, MAE, and MSE.'
    ],
    benefitTitle: 'Penalizing Large Model Prediction Errors',
    benefitContent: 'Because RMSE squares errors before taking the root, it heavily penalizes large outlier errors, making it the premier metric for financial forecasting and precision regression.',
    faqs: [{ q: 'Why is RMSE always greater than or equal to MAE?', a: 'By mathematical inequality, squaring errors gives higher weight to larger deviations, ensuring RMSE ≥ MAE (they are equal only when all errors have identical absolute magnitude).' }]
  },

  // 5. Fisher F-Statistic Variance Ratio ANOVA Test Calculator
  {
    slug: 'f-statistic-anova-variance-ratio-calculator',
    name: 'F-Statistic & Variance Ratio Test Calculator',
    description: 'Calculate Fisher-Snedecor F-statistic (F = s₁² / s₂²) and degrees of freedom to compare variance equality across two independent populations for ANOVA.',
    category: 'Math',
    icon: 'text',
    keywords: ['f statistic calculator', 'f test variance ratio calculator', 'anova f value calculator online', 'fisher snedecor f distribution', 'variance ratio hypothesis test'],
    order: 318,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sample Variances (s₁², s₂²) & Sample Sizes (n₁, n₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="f-s1">Larger Variance s₁²</label>
          <input class="tool-textarea" id="f-s1" type="number" step="any" value="25.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="f-n1">Sample Size n₁</label>
          <input class="tool-textarea" id="f-n1" type="number" min="2" value="21" />
        </div>
        <div class="control-group">
          <label class="control-label" for="f-s2">Smaller Variance s₂²</label>
          <input class="tool-textarea" id="f-s2" type="number" step="any" value="10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="f-n2">Sample Size n₂</label>
          <input class="tool-textarea" id="f-n2" type="number" min="2" value="16" />
        </div>
      </div>
      <div id="f-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="f-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F = 2.500</span>
            <span class="stat-label">Calculated F-Statistic</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="f-res-df" style="font-weight:700;">df₁ = 20, df₂ = 15</span>
            <span class="stat-label">Degrees of Freedom</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s1El = document.getElementById('f-s1'), n1El = document.getElementById('f-n1');
  const s2El = document.getElementById('f-s2'), n2El = document.getElementById('f-n2');
  const fResEl = document.getElementById('f-res-f'), dfResEl = document.getElementById('f-res-df');

  function update() {
    const s1 = parseFloat(s1El.value), n1 = parseInt(n1El.value, 10);
    const s2 = parseFloat(s2El.value), n2 = parseInt(n2El.value, 10);

    if (isNaN(s1) || isNaN(n1) || isNaN(s2) || isNaN(n2) || s1 <= 0 || s2 <= 0 || n1 < 2 || n2 < 2) return;

    // F = s1^2 / s2^2 (or s1 / s2 if inputs are already variances)
    const F = s1 / s2;
    const df1 = n1 - 1;
    const df2 = n2 - 1;

    fResEl.textContent = 'F = ' + F.toFixed(3);
    dfResEl.textContent = 'df₁ = ' + df1 + ', df₂ = ' + df2;
  }

  [s1El, n1El, s2El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter larger sample variance s₁² and sample size n₁.',
      'Enter smaller sample variance s₂² and sample size n₂.',
      'Inspect the computed Fisher F-statistic and numerator/denominator degrees of freedom (df₁, df₂).'
    ],
    benefitTitle: 'Sir Ronald Fisher\'s ANOVA Foundation',
    benefitContent: 'The F-test evaluates whether two population variances are equal (H₀: σ₁² = σ₂²), providing the statistical engine for Analysis of Variance (ANOVA) multi-group significance testing.',
    faqs: [{ q: 'Why is the larger variance placed in the numerator?', a: 'Placing the larger variance in the numerator guarantees F ≥ 1.0, enabling standardized one-tailed F-distribution table lookup.' }]
  }
];

toolsSuiteAA.forEach(createTool);
console.log('Suite AA complete: 5 tools created.');
