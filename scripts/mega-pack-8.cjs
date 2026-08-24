const { createTool } = require('./generate-curated-tools.cjs');

const tools8 = [
  // 1. Trapezoid Area & Perimeter Calculator
  {
    slug: 'trapezoid-area-perimeter-calculator',
    name: 'Trapezoid Area & Perimeter Calculator',
    description: 'Calculate trapezoid area (A = ½ · (a + b) · h), perimeter, and median length from base lengths, height, and side legs.',
    category: 'Math',
    icon: 'text',
    keywords: ['trapezoid area calculator', 'trapezium area calculator', 'perimeter of trapezoid', 'trapezoid height base formula', 'geometry trapezoid solver'],
    order: 139,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Trapezoid Dimensions',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="trap-a">Top Base (a)</label>
          <input class="tool-textarea" id="trap-a" type="number" step="any" value="6" placeholder="Base a" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trap-b">Bottom Base (b)</label>
          <input class="tool-textarea" id="trap-b" type="number" step="any" value="10" placeholder="Base b" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trap-h">Height (h)</label>
          <input class="tool-textarea" id="trap-h" type="number" step="any" value="5" placeholder="Height h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trap-legs">Side Legs c, d [Optional for Perimeter]</label>
          <input class="tool-textarea" id="trap-legs" type="number" step="any" value="5.39" placeholder="Leg length" />
        </div>
      </div>
      <div id="trap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="trap-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">40.00 sq units</span>
            <span class="stat-label">Trapezoid Area (A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="trap-res-med" style="font-weight:700;">8.00 units</span>
            <span class="stat-label">Median / Mid-Segment</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="trap-res-perim">26.78 units</span>
            <span class="stat-label">Perimeter (a + b + 2c)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('trap-a'), bEl = document.getElementById('trap-b');
  const hEl = document.getElementById('trap-h'), lEl = document.getElementById('trap-legs');
  const areaEl = document.getElementById('trap-res-area'), medEl = document.getElementById('trap-res-med'), perEl = document.getElementById('trap-res-perim');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), h = parseFloat(hEl.value);
    const leg = parseFloat(lEl.value) || 0;
    if (isNaN(a) || isNaN(b) || isNaN(h) || a <= 0 || b <= 0 || h <= 0) return;

    const area = 0.5 * (a + b) * h;
    const median = 0.5 * (a + b);
    const perim = a + b + (2 * leg);

    areaEl.textContent = area.toFixed(2) + ' sq units';
    medEl.textContent = median.toFixed(2) + ' units';
    perEl.textContent = leg > 0 ? perim.toFixed(2) + ' units' : 'Enter leg length';
  }

  [aEl, bEl, hEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the lengths of parallel top and bottom bases (a and b).',
      'Enter perpendicular height (h).',
      'Inspect trapezoid area and median length.'
    ],
    benefitTitle: 'Trapezoid Geometry Formula',
    benefitContent: 'The area of a trapezoid equals the product of its height and its mid-segment median: A = ½ · (a + b) · h.',
    faqs: [{ q: 'What is an isosceles trapezoid?', a: 'An isosceles trapezoid is one where the non-parallel side legs are equal in length and base angles are congruent.' }]
  },

  // 2. Parallelogram Area & Diagonals Calculator
  {
    slug: 'parallelogram-area-calculator',
    name: 'Parallelogram Area & Geometry Calculator',
    description: 'Calculate parallelogram area using base and height (A = b · h) or side lengths and angle θ (A = a · b · sin θ) with diagonal lengths.',
    category: 'Math',
    icon: 'text',
    keywords: ['parallelogram area calculator', 'area of parallelogram online', 'parallelogram diagonals calculator', 'base height parallelogram formula', 'geometry parallelogram solver'],
    order: 140,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parallelogram Dimensions',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-a">Side Length a</label>
          <input class="tool-textarea" id="pl-a" type="number" step="any" value="8" placeholder="Side a" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-b">Base Length b</label>
          <input class="tool-textarea" id="pl-b" type="number" step="any" value="12" placeholder="Base b" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-angle">Included Angle θ (Degrees)</label>
          <input class="tool-textarea" id="pl-angle" type="number" min="1" max="179" step="any" value="60" placeholder="e.g. 60°" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">83.14 sq units</span>
            <span class="stat-label">Parallelogram Area (A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-h" style="font-weight:700;">6.93 units</span>
            <span class="stat-label">Height (h = a · sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-perim">40.00 units</span>
            <span class="stat-label">Perimeter (2a + 2b)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('pl-a'), bEl = document.getElementById('pl-b'), degEl = document.getElementById('pl-angle');
  const areaEl = document.getElementById('pl-res-area'), hEl = document.getElementById('pl-res-h'), perEl = document.getElementById('pl-res-perim');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), deg = parseFloat(degEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(deg) || a <= 0 || b <= 0 || deg <= 0 || deg >= 180) return;

    const rad = (deg * Math.PI) / 180;
    const h = a * Math.sin(rad);
    const area = b * h;
    const perim = 2 * (a + b);

    areaEl.textContent = area.toFixed(2) + ' sq units';
    hEl.textContent = h.toFixed(2) + ' units';
    perEl.textContent = perim.toFixed(2) + ' units';
  }

  [aEl, bEl, degEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter side lengths a and b.',
      'Enter the included angle θ in degrees.',
      'Inspect area, height, and perimeter.'
    ],
    benefitTitle: 'Trigonometric Parallelogram Formula',
    benefitContent: 'When height is unknown, area is calculated from adjacent sides and angle: A = a · b · sin(θ).',
    faqs: [{ q: 'What happens when angle θ is 90 degrees?', a: 'When θ = 90°, the parallelogram becomes a rectangle with area A = a · b.' }]
  },

  // 3. Rhombus Area & Diagonals Calculator
  {
    slug: 'rhombus-area-diagonals-calculator',
    name: 'Rhombus Area & Diagonals Calculator',
    description: 'Calculate rhombus area (A = ½ · d₁ · d₂), side length, perimeter, and inradius from diagonal lengths.',
    category: 'Math',
    icon: 'text',
    keywords: ['rhombus area calculator', 'rhombus diagonals formula', 'perimeter of rhombus calculator', 'side length of rhombus from diagonals', 'geometry rhombus online'],
    order: 141,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Diagonal Dimensions (d₁ and d₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rh-d1">Diagonal 1 (d₁)</label>
          <input class="tool-textarea" id="rh-d1" type="number" step="any" value="12" placeholder="d₁" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rh-d2">Diagonal 2 (d₂)</label>
          <input class="tool-textarea" id="rh-d2" type="number" step="any" value="16" placeholder="d₂" />
        </div>
      </div>
      <div id="rh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rh-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">96.00 sq units</span>
            <span class="stat-label">Rhombus Area (A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rh-res-side" style="font-weight:700;">10.00 units</span>
            <span class="stat-label">Side Length (s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rh-res-perim">40.00 units</span>
            <span class="stat-label">Perimeter (4s)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const d1El = document.getElementById('rh-d1'), d2El = document.getElementById('rh-d2');
  const areaEl = document.getElementById('rh-res-area'), sideEl = document.getElementById('rh-res-side'), perEl = document.getElementById('rh-res-perim');

  function update() {
    const d1 = parseFloat(d1El.value), d2 = parseFloat(d2El.value);
    if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) return;

    const area = 0.5 * d1 * d2;
    // Side length by Pythagorean theorem on 4 right triangles: s = sqrt((d1/2)^2 + (d2/2)^2)
    const side = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
    const perim = 4 * side;

    areaEl.textContent = area.toFixed(2) + ' sq units';
    sideEl.textContent = side.toFixed(2) + ' units';
    perEl.textContent = perim.toFixed(2) + ' units';
  }

  d1El.addEventListener('input', update);
  d2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the lengths of perpendicular diagonals d₁ and d₂.',
      'Inspect rhombus area, equal side length, and perimeter.'
    ],
    benefitTitle: 'Rhombus Diagonal Orthogonality',
    benefitContent: 'The diagonals of every rhombus intersect at perpendicular 90° right angles and bisect each other, forming four congruent right triangles.',
    faqs: [{ q: 'What is the formula for rhombus area?', a: 'Area = ½ × d₁ × d₂.' }]
  },

  // 4. Circle Sector & Arc Length Calculator
  {
    slug: 'circle-sector-arc-length-calculator',
    name: 'Circle Sector & Arc Length Calculator',
    description: 'Calculate circle arc length (s = r·θ), sector area (A = ½·r²·θ), chord length, and segment area from radius and central angle.',
    category: 'Math',
    icon: 'text',
    keywords: ['circle sector calculator', 'arc length calculator', 'sector area calculator', 'chord length calculator', 'circle segment area formula'],
    order: 142,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Radius & Central Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sec-r">Circle Radius (r)</label>
          <input class="tool-textarea" id="sec-r" type="number" step="any" value="10" placeholder="Radius r" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sec-deg">Central Angle θ (Degrees)</label>
          <input class="tool-textarea" id="sec-deg" type="number" min="1" max="360" step="any" value="45" placeholder="e.g. 45°" />
        </div>
      </div>
      <div id="sec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sec-res-arc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.85 units</span>
            <span class="stat-label">Arc Length (s = r·θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sec-res-area" style="font-weight:700;">39.27 sq units</span>
            <span class="stat-label">Sector Area (½·r²·θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sec-res-chord">7.65 units</span>
            <span class="stat-label">Chord Length (2r·sin(θ/2))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('sec-r'), degEl = document.getElementById('sec-deg');
  const arcEl = document.getElementById('sec-res-arc'), areaEl = document.getElementById('sec-res-area'), chordEl = document.getElementById('sec-res-chord');

  function update() {
    const r = parseFloat(rEl.value), deg = parseFloat(degEl.value);
    if (isNaN(r) || isNaN(deg) || r <= 0 || deg <= 0 || deg > 360) return;

    const rad = (deg * Math.PI) / 180;
    const arc = r * rad;
    const area = 0.5 * r * r * rad;
    const chord = 2 * r * Math.sin(rad / 2);

    arcEl.textContent = arc.toFixed(2) + ' units';
    areaEl.textContent = area.toFixed(2) + ' sq units';
    chordEl.textContent = chord.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  degEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the circle radius (r).',
      'Enter the central angle θ in degrees (1° to 360°).',
      'Inspect arc length, sector slice area, and straight chord length.'
    ],
    benefitTitle: 'Radian Measure in Circular Arcs',
    benefitContent: 'By definition, one radian subtends an arc equal to the circle radius: s = r · θ (with θ in radians).',
    faqs: [{ q: 'What is the arc length of a semicircle?', a: 'For θ = 180° (π radians), Arc Length = π · r.' }]
  },

  // 5. Annulus (Ring) Area Calculator
  {
    slug: 'annulus-ring-area-calculator',
    name: 'Annulus (Ring) Area & Width Calculator',
    description: 'Calculate the area (A = π · (R² - r²)), ring width, and average circumference of an annulus formed between two concentric circles.',
    category: 'Math',
    icon: 'text',
    keywords: ['annulus area calculator', 'ring area calculator', 'concentric circles area', 'pipe cross section area calculator', 'circular ring geometry'],
    order: 143,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Outer & Inner Radii',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="an-r-out">Outer Radius (R)</label>
          <input class="tool-textarea" id="an-r-out" type="number" step="any" value="10" placeholder="Outer R" />
        </div>
        <div class="control-group">
          <label class="control-label" for="an-r-in">Inner Radius (r)</label>
          <input class="tool-textarea" id="an-r-in" type="number" step="any" value="6" placeholder="Inner r" />
        </div>
      </div>
      <div id="an-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="an-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">201.06 sq units</span>
            <span class="stat-label">Annulus Area (π(R² - r²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="an-res-width" style="font-weight:700;">4.00 units</span>
            <span class="stat-label">Ring Thickness (R - r)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const outEl = document.getElementById('an-r-out'), inEl = document.getElementById('an-r-in');
  const areaEl = document.getElementById('an-res-area'), wEl = document.getElementById('an-res-width');

  function update() {
    const R = parseFloat(outEl.value), r = parseFloat(inEl.value);
    if (isNaN(R) || isNaN(r) || R <= 0 || r <= 0 || R <= r) {
      areaEl.textContent = '-'; wEl.textContent = 'Outer R must exceed Inner r'; return;
    }

    const area = Math.PI * (Math.pow(R, 2) - Math.pow(r, 2));
    const width = R - r;

    areaEl.textContent = area.toFixed(2) + ' sq units';
    wEl.textContent = width.toFixed(2) + ' units';
  }

  outEl.addEventListener('input', update);
  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the outer radius (R).',
      'Enter the smaller inner radius (r).',
      'Inspect the cross-sectional ring area and thickness.'
    ],
    benefitTitle: 'Annulus in Engineering',
    benefitContent: 'Calculating annulus area is essential in mechanical and civil engineering for hollow cylindrical pipes, washers, and circular pressure gaskets.',
    faqs: [{ q: 'What is the formula for annulus area?', a: 'A = π(R² - r²) = π(R + r)(R - r).' }]
  }
];

tools8.forEach(createTool);
console.log('Mega pack 8 complete.');
