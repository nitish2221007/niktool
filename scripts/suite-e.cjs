const { createTool } = require('./generate-curated-tools.cjs');

// Suite E: 10 Tools in Advanced Statistics, 3D Polyhedra & Financial Business Metrics
const toolsSuiteE = [
  // 1. Linear Regression Slope & Intercept Calculator
  {
    slug: 'linear-regression-slope-intercept-calculator',
    name: 'Linear Regression & Line of Best Fit Calculator',
    description: 'Calculate linear regression slope (m), y-intercept (c), Pearson correlation coefficient (r), and coefficient of determination (R²) for (X, Y) datasets.',
    category: 'Math',
    icon: 'text',
    keywords: ['linear regression calculator', 'line of best fit calculator', 'pearson correlation coefficient calculator', 'least squares regression line', 'slope y intercept calculator online'],
    order: 204,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Data Pairs (X, Y)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="lr-input">Enter (X, Y) Coordinates (One pair per line)</label>
        <textarea class="tool-textarea" id="lr-input" rows="5" placeholder="1, 2&#10;2, 3.8&#10;3, 6.2&#10;4, 8.1&#10;5, 9.9"></textarea>
      </div>
      <div id="lr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="lr-res-eq" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">y = 2.00x + 0.00</span>
            <span class="stat-label">Best Fit Equation (y = mx + c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lr-res-r" style="font-weight:700;">r = 0.999</span>
            <span class="stat-label">Pearson Correlation (r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lr-res-r2">R² = 0.998</span>
            <span class="stat-label">Coefficient of Determination</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('lr-input');
  const eqEl = document.getElementById('lr-res-eq'), rEl = document.getElementById('lr-res-r'), r2El = document.getElementById('lr-res-r2');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
    const pts = [];
    for (const l of lines) {
      const parts = l.split(/[,\\s\\t]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        pts.push({ x: parts[0], y: parts[1] });
      }
    }

    if (pts.length < 2) return;

    const n = pts.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (const p of pts) {
      sumX += p.x; sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
      sumY2 += p.y * p.y;
    }

    const denom = (n * sumX2 - sumX * sumX);
    if (denom === 0) return;

    const m = (n * sumXY - sumX * sumY) / denom;
    const c = (sumY - m * sumX) / n;

    const numR = (n * sumXY - sumX * sumY);
    const denomR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r = denomR !== 0 ? numR / denomR : 1.0;
    const r2 = r * r;

    eqEl.textContent = 'y = ' + m.toFixed(2) + 'x ' + (c >= 0 ? '+ ' : '- ') + Math.abs(c).toFixed(2);
    rEl.textContent = 'r = ' + r.toFixed(3);
    r2El.textContent = 'R² = ' + r2.toFixed(3);
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste (X, Y) coordinate points (one pair per line).',
      'Inspect the least-squares line of best fit equation y = mx + c.',
      'Check Pearson correlation r and model variance goodness-of-fit (R²).'
    ],
    benefitTitle: 'Ordinary Least Squares (OLS) Linear Regression',
    benefitContent: 'OLS minimizes the sum of squared vertical residuals (distances between observed data points and the regression line) to create the optimal linear predictor.',
    faqs: [{ q: 'What does R² = 0.95 mean?', a: 'It indicates that 95% of the variance in the dependent variable Y is explained by the independent variable X.' }]
  },

  // 2. Regular Octahedron Geometry Calculator
  {
    slug: 'octahedron-calculator',
    name: 'Regular Octahedron Volume & Surface Area Calculator',
    description: 'Calculate 3D volume (V = ⅓·√2·a³), total surface area (A = 2·√3·a²), and circumradius for a regular 8-faced platonic octahedron.',
    category: 'Math',
    icon: 'text',
    keywords: ['octahedron calculator', 'volume of octahedron formula', 'platonic solid octahedron surface area', '8 sided regular polyhedron', 'octahedron edge length geometry'],
    order: 205,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Octahedron Edge Length (a)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="oct-a">Edge Length a (units)</label>
        <input class="tool-textarea" id="oct-a" type="number" step="any" value="6" placeholder="Edge a" />
      </div>
      <div id="oct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="oct-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">101.82 cu units</span>
            <span class="stat-label">Octahedron Volume (⅓·√2·a³)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="oct-res-area" style="font-weight:700;">124.71 sq units</span>
            <span class="stat-label">Surface Area (2·√3·a²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="oct-res-circ">4.24 units</span>
            <span class="stat-label">Circumradius (a / √2)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('oct-a');
  const vEl = document.getElementById('oct-res-vol'), arEl = document.getElementById('oct-res-area'), cEl = document.getElementById('oct-res-circ');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = (1/3) * sqrt(2) * a^3
    const vol = (Math.sqrt(2) / 3) * Math.pow(a, 3);
    // A = 2 * sqrt(3) * a^2
    const area = 2 * Math.sqrt(3) * Math.pow(a, 2);
    // R = a / sqrt(2)
    const circum = a / Math.sqrt(2);

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
    cEl.textContent = circum.toFixed(2) + ' units';
  }

  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the edge length (a) of the regular octahedron.',
      'Inspect the 3D volume, 8 equilateral triangular faces surface area, and circumscribing sphere radius.'
    ],
    benefitTitle: 'The Dual of the Cube',
    benefitContent: 'A regular octahedron is one of the five classical Platonic solids and is the geometric dual of the cube: connecting the center points of the six faces of a cube creates an octahedron.',
    faqs: [{ q: 'How many faces, vertices, and edges does an octahedron have?', a: 'An octahedron has 8 equilateral triangular faces, 6 vertices, and 12 edges (V - E + F = 6 - 12 + 8 = 2).' }]
  },

  // 3. Regular Dodecahedron Geometry Calculator
  {
    slug: 'dodecahedron-calculator',
    name: 'Regular Dodecahedron Volume & Surface Area Calculator',
    description: 'Calculate 3D volume (V = ¼·(15 + 7√5)·a³) and total surface area (A = 3·√(25 + 10√5)·a²) for a regular 12-sided pentagonal dodecahedron.',
    category: 'Math',
    icon: 'text',
    keywords: ['dodecahedron calculator', 'volume of dodecahedron formula', '12 sided platonic solid calculator', 'regular pentagonal dodecahedron surface area', 'dodecahedron geometry online'],
    order: 206,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dodecahedron Edge Length (a)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="dod-a">Edge Length a (units)</label>
        <input class="tool-textarea" id="dod-a" type="number" step="any" value="4" placeholder="Edge a" />
      </div>
      <div id="dod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dod-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">490.44 cu units</span>
            <span class="stat-label">Dodecahedron Volume</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dod-res-area" style="font-weight:700;">330.34 sq units</span>
            <span class="stat-label">Surface Area (12 Pentagons)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('dod-a');
  const vEl = document.getElementById('dod-res-vol'), arEl = document.getElementById('dod-res-area');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = (1/4) * (15 + 7 * sqrt(5)) * a^3
    const vol = 0.25 * (15 + 7 * Math.sqrt(5)) * Math.pow(a, 3);
    // A = 3 * sqrt(25 + 10 * sqrt(5)) * a^2
    const area = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(a, 2);

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
  }

  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the edge length (a) of the regular dodecahedron.',
      'Inspect total 3D volume and the combined surface area of its 12 regular pentagon faces.'
    ],
    benefitTitle: 'Plato\'s Quintessence Solid',
    benefitContent: 'Plato associated the regular dodecahedron with the cosmos and celestial ether. It features 12 faces, 20 vertices, and 30 edges, exhibiting golden ratio (φ) symmetries.',
    faqs: [{ q: 'What is the dual of a regular dodecahedron?', a: 'The regular icosahedron (20 triangular faces) is the geometric dual of the dodecahedron.' }]
  },

  // 4. Collatz Conjecture (3n + 1) Trajectory Visualizer
  {
    slug: 'collatz-conjecture-visualizer',
    name: 'Collatz Conjecture (3n + 1) Sequence Calculator',
    description: 'Calculate stopping time, hailstone trajectory sequence, and peak maximum number for any positive integer in the Collatz Conjecture (3n + 1).',
    category: 'Math',
    icon: 'text',
    keywords: ['collatz conjecture calculator', '3n plus 1 calculator online', 'hailstone sequence generator', 'collatz stopping time calculator', 'number theory collatz path'],
    order: 207,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Starting Seed Integer (n)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="col-n">Enter Starting Integer n (≥ 1)</label>
        <input class="tool-textarea" id="col-n" type="number" min="1" step="1" value="27" placeholder="e.g. 27" />
      </div>
      <div id="col-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="col-res-steps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">111 Steps</span>
            <span class="stat-label">Total Stopping Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="col-res-peak" style="color:#c53030; font-weight:700;">9,232</span>
            <span class="stat-label">Peak Maximum Number Reached</span>
          </div>
        </div>
        <div style="margin-top:1rem;">
          <label class="control-label">Hailstone Trajectory Sequence:</label>
          <textarea class="tool-textarea" id="col-res-seq" rows="4" readonly style="font-family:monospace; font-size:0.85rem;"></textarea>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('col-n');
  const stEl = document.getElementById('col-res-steps'), pkEl = document.getElementById('col-res-peak'), seqEl = document.getElementById('col-res-seq');

  function update() {
    let n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 1) return;

    const seq = [n];
    let peak = n;

    while (n !== 1 && seq.length < 1000) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      seq.push(n);
      if (n > peak) peak = n;
    }

    stEl.textContent = (seq.length - 1) + ' Steps';
    pkEl.textContent = peak.toLocaleString();
    seqEl.value = seq.join(' → ');
  }

  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any positive integer seed (e.g. 27 produces an interesting 111-step journey reaching 9,232).',
      'Inspect total stopping steps, peak maximum value, and complete trajectory chain to 1.'
    ],
    benefitTitle: 'The Famous Unsolved Problem in Mathematics',
    benefitContent: 'Proposed by Lothar Collatz in 1937: if n is even, divide by 2; if n is odd, multiply by 3 and add 1. It is conjectured that every positive integer eventually falls into the 4 → 2 → 1 loop.',
    faqs: [{ q: 'Has any number been found that does not reach 1?', a: 'No, mathematicians have verified the conjecture for all starting integers up to 2⁶⁸ (~2.95 × 10²⁰) with zero counterexamples.' }]
  },

  // 5. Modular Multiplicative Inverse Calculator
  {
    slug: 'modulo-inverse-calculator',
    name: 'Modular Multiplicative Inverse Calculator',
    description: 'Calculate the modular multiplicative inverse (a⁻¹ mod m) such that (a · x) ≡ 1 (mod m) using the Extended Euclidean Algorithm for RSA cryptography.',
    category: 'Math',
    icon: 'text',
    keywords: ['modulo inverse calculator', 'modular multiplicative inverse online', 'extended euclidean algorithm calculator', 'rsa crypto modular inverse', 'a mod m inverse solver'],
    order: 208,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Equation: (a · x) ≡ 1 (mod m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mod-a">Integer a</label>
          <input class="tool-textarea" id="mod-a" type="number" step="1" value="3" placeholder="a" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mod-m">Modulus m</label>
          <input class="tool-textarea" id="mod-m" type="number" step="1" value="11" placeholder="m" />
        </div>
      </div>
      <div id="mod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mod-res-x" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">x = 4</span>
            <span class="stat-label">Modular Inverse (a⁻¹ mod m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mod-res-check">(3 × 4) mod 11 = 1</span>
            <span class="stat-label">Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('mod-a'), mEl = document.getElementById('mod-m');
  const xEl = document.getElementById('mod-res-x'), chkEl = document.getElementById('mod-res-check');

  function extGCD(a, b) {
    if (b === 0) return { gcd: a, x: 1, y: 0 };
    const { gcd, x: x1, y: y1 } = extGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return { gcd, x, y };
  }

  function update() {
    const a = parseInt(aEl.value, 10);
    const m = parseInt(mEl.value, 10);
    if (isNaN(a) || isNaN(m) || m <= 1) return;

    const { gcd, x } = extGCD(a, m);
    if (gcd !== 1) {
      xEl.textContent = 'No Inverse Exists';
      xEl.style.color = '#c53030';
      chkEl.textContent = 'GCD(' + a + ', ' + m + ') = ' + gcd + ' ≠ 1 (Not Coprime)';
      return;
    }

    const inv = ((x % m) + m) % m;
    xEl.textContent = 'x = ' + inv;
    xEl.style.color = '#22543d';
    chkEl.textContent = '(' + a + ' × ' + inv + ') mod ' + m + ' = ' + ((a * inv) % m);
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter integer a and modulus m.',
      'The tool computes the modular multiplicative inverse x such that (a · x) mod m = 1.',
      'If a and m are not coprime (GCD ≠ 1), the tool flags that no inverse exists.'
    ],
    benefitTitle: 'Role in RSA Public-Key Cryptography',
    benefitContent: 'In RSA encryption, the private decryption key d is generated as the modular multiplicative inverse of the public exponent e modulo Euler\'s totient: d ≡ e⁻¹ (mod φ(N)).',
    faqs: [{ q: 'When does a modular inverse exist?', a: 'A modular inverse a⁻¹ mod m exists if and only if a and m are coprime (GCD(a, m) = 1).' }]
  }
];

toolsSuiteE.forEach(createTool);
console.log('Suite E complete: 5 tools created.');
