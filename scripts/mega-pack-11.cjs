const { createTool } = require('./generate-curated-tools.cjs');

const tools11 = [
  // 1. Least Common Multiple (LCM) & Greatest Common Divisor (GCD) Calculator
  {
    slug: 'least-common-multiple-lcm-calculator',
    name: 'LCM & GCD Multi-Number Calculator',
    description: 'Calculate the Least Common Multiple (LCM) and Greatest Common Divisor (GCD / HCF) of two or more numbers with step-by-step prime factorization.',
    category: 'Math',
    icon: 'text',
    keywords: ['lcm calculator', 'gcd calculator', 'hcf calculator online', 'least common multiple of 3 numbers', 'greatest common divisor steps'],
    order: 154,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integer Numbers List',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="lcm-input">Enter Integers (separated by commas or spaces)</label>
        <input class="tool-textarea" id="lcm-input" type="text" value="12, 18, 24" placeholder="e.g. 12, 18, 24" />
      </div>
      <div id="lcm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lcm-res-lcm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">72</span>
            <span class="stat-label">Least Common Multiple (LCM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lcm-res-gcd" style="font-weight:700;">6</span>
            <span class="stat-label">Greatest Common Divisor (GCD / HCF)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('lcm-input');
  const lcmEl = document.getElementById('lcm-res-lcm'), gcdEl = document.getElementById('lcm-res-gcd');

  function gcd2(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  function lcm2(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd2(a, b);
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\\s\\n]+/).map(Number).filter(n => Number.isInteger(n) && n > 0);
    if (nums.length < 2) return;

    const finalGcd = nums.reduce((a, b) => gcd2(a, b));
    const finalLcm = nums.reduce((a, b) => lcm2(a, b));

    lcmEl.textContent = finalLcm.toLocaleString();
    gcdEl.textContent = finalGcd.toLocaleString();
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter two or more positive integers separated by commas.',
      'Inspect the Least Common Multiple (LCM) and Greatest Common Divisor (GCD/HCF).'
    ],
    benefitTitle: 'LCM and GCD Mathematical Relationship',
    benefitContent: 'For any two positive integers a and b: LCM(a, b) × GCD(a, b) = a × b.',
    faqs: [{ q: 'What is the LCM of 12, 18, and 24?', a: 'The LCM is 72, and the GCD is 6.' }]
  },

  // 2. Fraction Simplifier & Reducer Calculator
  {
    slug: 'fraction-simplifier-reducer-calculator',
    name: 'Fraction Simplifier & Reducer Calculator',
    description: 'Simplify proper and improper fractions to their lowest irreducible terms, convert to mixed numbers, and calculate exact decimal equivalents.',
    category: 'Math',
    icon: 'text',
    keywords: ['fraction simplifier', 'simplify fractions calculator', 'reduce fractions to lowest terms', 'improper fraction to mixed number', 'fraction to decimal converter'],
    order: 155,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Numerator & Denominator',
    controlsHtml: `      <div style="display:flex; justify-content:center; align-items:center; gap:0.5rem; font-size:1.5rem; margin:1rem 0;">
        <div style="display:inline-flex; flex-direction:column; width:120px;">
          <input class="tool-textarea" id="fr-num" type="number" step="1" value="28" placeholder="Numerator" style="text-align:center;" />
          <hr style="border:none; border-top:2px solid var(--ink); margin:4px 0;" />
          <input class="tool-textarea" id="fr-den" type="number" step="1" value="42" placeholder="Denominator" style="text-align:center;" />
        </div>
      </div>
      <div id="fr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fr-res-simp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2 / 3</span>
            <span class="stat-label">Simplified Fraction</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fr-res-mixed" style="font-weight:700;">Proper Fraction</span>
            <span class="stat-label">Mixed Number Form</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fr-res-dec">0.6667</span>
            <span class="stat-label">Decimal Form</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const numEl = document.getElementById('fr-num'), denEl = document.getElementById('fr-den');
  const simpEl = document.getElementById('fr-res-simp'), mixEl = document.getElementById('fr-res-mixed'), decEl = document.getElementById('fr-res-dec');

  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { const t = b; b = a % b; a = t; }
    return a;
  }

  function update() {
    const num = parseInt(numEl.value, 10);
    const den = parseInt(denEl.value, 10);

    if (isNaN(num) || isNaN(den) || den === 0) return;

    const common = gcd(num, den);
    const sNum = num / common;
    const sDen = den / common;
    const dec = num / den;

    simpEl.textContent = sNum + ' / ' + sDen;
    decEl.textContent = dec.toFixed(4);

    if (Math.abs(num) >= Math.abs(den)) {
      const whole = Math.floor(Math.abs(num) / Math.abs(den));
      const rem = Math.abs(num) % Math.abs(den);
      const remSimp = rem / common;
      mixEl.textContent = (num < 0 ? '-' : '') + whole + (rem !== 0 ? ' ' + remSimp + '/' + sDen : '');
    } else {
      mixEl.textContent = 'Proper Fraction (No whole integer)';
    }
  }

  numEl.addEventListener('input', update);
  denEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the numerator and denominator integers.',
      'Inspect the simplified irreducible fraction, mixed number representation, and decimal expansion.'
    ],
    benefitTitle: 'Greatest Common Divisor Reduction',
    benefitContent: 'Dividing both numerator and denominator by their GCD (Greatest Common Divisor) reduces any fraction to its unique lowest mathematical terms.',
    faqs: [{ q: 'What is 28/42 simplified?', a: 'GCD(28, 42) = 14, yielding the reduced fraction 2/3.' }]
  },

  // 3. Torus Volume & Surface Area Calculator
  {
    slug: 'torus-volume-surface-area-calculator',
    name: 'Torus (Donut) Volume & Surface Area Calculator',
    description: 'Calculate the volume (V = 2π²·R·r²) and total surface area (A = 4π²·R·r) of a 3D geometric torus (donut ring) from major and minor radii.',
    category: 'Math',
    icon: 'text',
    keywords: ['torus volume calculator', 'surface area of torus', 'donut shape volume formula', 'geometry 3d torus calculator', 'pappus centroid theorem torus'],
    order: 156,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Major Radius (R) & Tube Radius (r)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tor-r-maj">Major Radius R (Center to tube center)</label>
          <input class="tool-textarea" id="tor-r-maj" type="number" step="any" value="8" placeholder="Major R" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tor-r-min">Minor Radius r (Tube thickness radius)</label>
          <input class="tool-textarea" id="tor-r-min" type="number" step="any" value="3" placeholder="Minor r" />
        </div>
      </div>
      <div id="tor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tor-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,421.22 cu units</span>
            <span class="stat-label">Torus Volume (2π²·R·r²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tor-res-area" style="font-weight:700;">947.48 sq units</span>
            <span class="stat-label">Surface Area (4π²·R·r)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const majEl = document.getElementById('tor-r-maj'), minEl = document.getElementById('tor-r-min');
  const volEl = document.getElementById('tor-res-vol'), areaEl = document.getElementById('tor-res-area');

  function update() {
    const R = parseFloat(majEl.value), r = parseFloat(minEl.value);
    if (isNaN(R) || isNaN(r) || R <= 0 || r <= 0 || R <= r) {
      volEl.textContent = '-'; areaEl.textContent = 'Major R must exceed Minor r'; return;
    }

    // V = 2 * pi^2 * R * r^2
    const vol = 2 * Math.pow(Math.PI, 2) * R * Math.pow(r, 2);
    // A = 4 * pi^2 * R * r
    const area = 4 * Math.pow(Math.PI, 2) * R * r;

    volEl.textContent = vol.toFixed(2) + ' cu units';
    areaEl.textContent = area.toFixed(2) + ' sq units';
  }

  majEl.addEventListener('input', update);
  minEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter major radius (R) from torus center to tube axis.',
      'Enter minor radius (r) of the circular tube cross-section.',
      'Inspect 3D volume and outer surface area.'
    ],
    benefitTitle: 'Pappus\'s Centroid Theorem for a Torus',
    benefitContent: 'Pappus\'s Theorem states that revolving a circle of area (π·r²) around an axis distance R sweeps a volume equal to: Area × Distance traveled by centroid = (π·r²) × (2π·R) = 2π²·R·r².',
    faqs: [{ q: 'What happens if r equals R in a torus?', a: 'When r = R, the central hole closes, forming a horn torus.' }]
  },

  // 4. Cone vs Cylinder Volume & Surface Comparison
  {
    slug: 'cone-cylinder-volume-surface-calculator',
    name: 'Cone & Cylinder Volume Comparison Calculator',
    description: 'Compare 3D volume and surface area between a cone (V = ⅓·π·r²·h) and cylinder (V = π·r²·h) with identical base radius and height.',
    category: 'Math',
    icon: 'text',
    keywords: ['cone volume calculator', 'cylinder volume calculator', 'cone vs cylinder volume ratio', 'cone surface area calculator', 'geometry cone cylinder formula'],
    order: 157,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Base Radius & Height',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cc-r">Base Radius (r)</label>
          <input class="tool-textarea" id="cc-r" type="number" step="any" value="5" placeholder="Radius r" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-h">Height (h)</label>
          <input class="tool-textarea" id="cc-h" type="number" step="any" value="12" placeholder="Height h" />
        </div>
      </div>
      <div id="cc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="cc-res-cone-vol" style="color:var(--green-dark); font-weight:800;">314.16 cu units</span>
            <span class="stat-label">Cone Volume (⅓·π·r²·h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cc-res-cyl-vol" style="font-weight:700;">942.48 cu units</span>
            <span class="stat-label">Cylinder Volume (π·r²·h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cc-res-slant">13.00 units</span>
            <span class="stat-label">Cone Slant Height (√(r²+h²))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('cc-r'), hEl = document.getElementById('cc-h');
  const cVolEl = document.getElementById('cc-res-cone-vol'), cyVolEl = document.getElementById('cc-res-cyl-vol'), slEl = document.getElementById('cc-res-slant');

  function update() {
    const r = parseFloat(rEl.value), h = parseFloat(hEl.value);
    if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) return;

    const cylVol = Math.PI * Math.pow(r, 2) * h;
    const coneVol = cylVol / 3;
    const slant = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));

    cVolEl.textContent = coneVol.toFixed(2) + ' cu units';
    cyVolEl.textContent = cylVol.toFixed(2) + ' cu units';
    slEl.textContent = slant.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter shared circular base radius (r).',
      'Enter perpendicular height (h).',
      'Inspect volume comparison (a cone holds exactly ⅓ the volume of a cylinder with the same dimensions).'
    ],
    benefitTitle: 'Archimedes 1:3 Volume Ratio',
    benefitContent: 'Discovered by Archimedes in antiquity, the volume of any cone is always exactly one-third (⅓) the volume of a circumscribed cylinder sharing the same base and height.',
    faqs: [{ q: 'What is the slant height of a cone with r=5 and h=12?', a: 'By the Pythagorean theorem: Slant Height = √(5² + 12²) = √(25 + 144) = √169 = 13.0 units.' }]
  },

  // 5. Prime Factorization Tree Calculator
  {
    slug: 'prime-factor-tree-calculator',
    name: 'Prime Factorization & Factor Tree Calculator',
    description: 'Decompose any integer into its unique prime factors with exponential notation (e.g. 360 = 2³ × 3² × 5) and total divisor count.',
    category: 'Math',
    icon: 'text',
    keywords: ['prime factorization calculator', 'prime factor tree online', 'factors of a number calculator', 'prime decomposition calculator', 'how to find prime factors'],
    order: 158,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Integer for Factorization',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="pf-num">Enter Integer (up to 1,000,000)</label>
        <input class="tool-textarea" id="pf-num" type="number" min="2" max="1000000" step="1" value="360" placeholder="e.g. 360" />
      </div>
      <div id="pf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pf-res-exp" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">2³ × 3² × 5¹</span>
            <span class="stat-label">Prime Factorization</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pf-res-list" style="font-family:monospace; font-weight:700;">2, 2, 2, 3, 3, 5</span>
            <span class="stat-label">Prime Factors List</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pf-res-divs">24 Divisors</span>
            <span class="stat-label">Total Divisor Count</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const numEl = document.getElementById('pf-num');
  const expEl = document.getElementById('pf-res-exp'), listEl = document.getElementById('pf-res-list'), divEl = document.getElementById('pf-res-divs');

  const SUPERS = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
  function toSuper(n) {
    return n.toString().split('').map(d => SUPERS[d] || d).join('');
  }

  function update() {
    let n = parseInt(numEl.value, 10);
    if (isNaN(n) || n < 2) return;

    const factors = [];
    const counts = {};

    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        counts[d] = (counts[d] || 0) + 1;
        n /= d;
      }
      d++;
    }
    if (n > 1) {
      factors.push(n);
      counts[n] = (counts[n] || 0) + 1;
    }

    const expStr = Object.entries(counts).map(([p, c]) => p + toSuper(c)).join(' × ');
    let totalDivisors = 1;
    Object.values(counts).forEach(c => totalDivisors *= (c + 1));

    expEl.textContent = expStr;
    listEl.textContent = factors.join(', ');
    divEl.textContent = totalDivisors + ' Divisors';
  }

  numEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any integer greater than 1.',
      'Inspect the prime factor decomposition in compact exponential canonical form.'
    ],
    benefitTitle: 'Fundamental Theorem of Arithmetic',
    benefitContent: 'Every integer greater than 1 has a unique prime factorization (up to the order of factors), forming the structural foundation of modern cryptography and number theory.',
    faqs: [{ q: 'What is the prime factorization of 360?', a: '360 = 2³ × 3² × 5¹ (2 × 2 × 2 × 3 × 3 × 5).' }]
  }
];

tools11.forEach(createTool);
console.log('Mega pack 11 complete.');
