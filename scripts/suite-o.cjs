const { createTool } = require('./generate-curated-tools.cjs');

// Suite O: 5 Tools in 3D Solid Geometry & Mensuration
const toolsSuiteO = [
  // 1. Triangular Prism Volume & Surface Area Calculator
  {
    slug: 'triangular-prism-volume-surface-area-calculator',
    name: 'Triangular Prism Volume & Surface Area Calculator',
    description: 'Calculate 3D volume (V = ½ · b · h · L), base area, lateral area, and total surface area for right triangular prisms.',
    category: 'Math',
    icon: 'text',
    keywords: ['triangular prism calculator', 'volume of triangular prism formula', 'surface area triangular prism online', 'right triangular prism geometry', 'prism volume calculator'],
    order: 254,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Base Triangle (b, h) & Prism Length (L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tp-b">Base Width b (units)</label>
          <input class="tool-textarea" id="tp-b" type="number" step="any" value="6" placeholder="Base b" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-h">Triangle Height h (units)</label>
          <input class="tool-textarea" id="tp-h" type="number" step="any" value="4" placeholder="Height h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-l">Prism Length L (units)</label>
          <input class="tool-textarea" id="tp-l" type="number" step="any" value="10" placeholder="Length L" />
        </div>
      </div>
      <div id="tp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tp-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">120.00 cu units</span>
            <span class="stat-label">Prism Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tp-res-base" style="font-weight:700;">12.00 sq units</span>
            <span class="stat-label">End Face Area (½·b·h)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('tp-b'), hEl = document.getElementById('tp-h'), lEl = document.getElementById('tp-l');
  const vEl = document.getElementById('tp-res-vol'), baseEl = document.getElementById('tp-res-base');

  function update() {
    const b = parseFloat(bEl.value), h = parseFloat(hEl.value), L = parseFloat(lEl.value);
    if (isNaN(b) || isNaN(h) || isNaN(L) || b <= 0 || h <= 0 || L <= 0) return;

    // Base area = 0.5 * b * h
    const baseArea = 0.5 * b * h;
    // Volume = baseArea * L
    const vol = baseArea * L;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    baseEl.textContent = baseArea.toFixed(2) + ' sq units';
  }

  [bEl, hEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter base triangle width b and altitude height h.',
      'Enter total longitudinal prism length L.',
      'Inspect 3D volume and end triangle cross-sectional area.'
    ],
    benefitTitle: 'Uniform Cross-Section Geometry',
    benefitContent: 'Like all right prisms, the 3D volume is strictly the product of the 2D cross-sectional base area and length: V = A_base · L.',
    faqs: [{ q: 'What is a right triangular prism?', a: 'A 3D polyhedron bounded by two congruent triangular end faces and three rectangular lateral sides joined at 90° angles.' }]
  },

  // 2. Regular Hexagonal Prism Calculator
  {
    slug: 'hexagonal-prism-calculator',
    name: 'Regular Hexagonal Prism Volume & Area Calculator',
    description: 'Calculate 3D volume (V = (3√3 / 2) · a² · h), regular hexagon base area, and total surface area for hexagonal prisms and hex nuts.',
    category: 'Math',
    icon: 'text',
    keywords: ['hexagonal prism calculator', 'volume of hexagonal prism formula', 'hexagonal prism surface area online', 'hexagon base prism geometry', 'honeycomb cell volume calculator'],
    order: 255,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hexagon Side (a) & Prism Height (h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-a">Hexagon Side Length a (units)</label>
          <input class="tool-textarea" id="hp-a" type="number" step="any" value="5" placeholder="Side a" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-h">Prism Height / Depth h (units)</label>
          <input class="tool-textarea" id="hp-h" type="number" step="any" value="12" placeholder="Height h" />
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">779.42 cu units</span>
            <span class="stat-label">Prism Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-base" style="font-weight:700;">64.95 sq units</span>
            <span class="stat-label">Hexagon Base Area</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-tot-area">489.90 sq units</span>
            <span class="stat-label">Total Surface Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('hp-a'), hEl = document.getElementById('hp-h');
  const vEl = document.getElementById('hp-res-vol'), bEl = document.getElementById('hp-res-base'), aTotEl = document.getElementById('hp-res-tot-area');

  function update() {
    const a = parseFloat(aEl.value), h = parseFloat(hEl.value);
    if (isNaN(a) || isNaN(h) || a <= 0 || h <= 0) return;

    // Base area = (3 * sqrt(3) / 2) * a^2
    const baseArea = (1.5 * Math.sqrt(3)) * Math.pow(a, 2);
    const vol = baseArea * h;
    const lateralArea = 6 * a * h;
    const totalArea = 2 * baseArea + lateralArea;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    bEl.textContent = baseArea.toFixed(2) + ' sq units';
    aTotEl.textContent = totalArea.toFixed(2) + ' sq units';
  }

  aEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the regular hexagon side edge length a.',
      'Enter prism height/extrusion depth h.',
      'Inspect 3D volume, hexagon base face area, and total surface area.'
    ],
    benefitTitle: 'Honeycomb Efficiency in Nature and Aerospace',
    benefitContent: 'Hexagonal prisms tile space with minimal perimeter wall mass, maximizing storage volume with minimal material weight — the structural basis of beehive honeycombs and carbon-fiber aerospace panels.',
    faqs: [{ q: 'How many faces and vertices in a hexagonal prism?', a: '8 faces (2 hexagonal bases + 6 rectangular sides), 12 vertices, and 18 edges.' }]
  },

  // 3. Truncated Cone Frustum Volume & Slant Height Calculator
  {
    slug: 'truncated-cone-frustum-calculator',
    name: 'Truncated Cone (Frustum) Volume & Area Calculator',
    description: 'Calculate 3D volume (V = ⅓ · π · h · (R² + r² + R·r)), slant height, and lateral surface area for truncated cones, buckets, and lampshades.',
    category: 'Math',
    icon: 'text',
    keywords: ['truncated cone calculator', 'conical frustum volume calculator', 'frustum of a cone formula', 'bucket volume calculator online', 'cone frustum surface area calculator'],
    order: 256,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Top Radius (r), Bottom Radius (R) & Height (h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="frust-r">Top Radius r (units)</label>
          <input class="tool-textarea" id="frust-r" type="number" step="any" value="3" placeholder="Top r" />
        </div>
        <div class="control-group">
          <label class="control-label" for="frust-cap-r">Bottom Radius R (units)</label>
          <input class="tool-textarea" id="frust-cap-r" type="number" step="any" value="6" placeholder="Bottom R" />
        </div>
        <div class="control-group">
          <label class="control-label" for="frust-h">Vertical Height h (units)</label>
          <input class="tool-textarea" id="frust-h" type="number" step="any" value="8" placeholder="Height h" />
        </div>
      </div>
      <div id="frust-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="frust-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">527.79 cu units</span>
            <span class="stat-label">Frustum Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="frust-res-slant" style="font-weight:700;">8.54 units</span>
            <span class="stat-label">Slant Height (s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="frust-res-lat">241.59 sq units</span>
            <span class="stat-label">Lateral Curved Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('frust-r'), capREl = document.getElementById('frust-cap-r'), hEl = document.getElementById('frust-h');
  const vEl = document.getElementById('frust-res-vol'), sEl = document.getElementById('frust-res-slant'), latEl = document.getElementById('frust-res-lat');

  function update() {
    const r = parseFloat(rEl.value), R = parseFloat(capREl.value), h = parseFloat(hEl.value);
    if (isNaN(r) || isNaN(R) || isNaN(h) || r <= 0 || R <= 0 || h <= 0) return;

    // V = (1/3) * pi * h * (R^2 + r^2 + R*r)
    const vol = (1/3) * Math.PI * h * (Math.pow(R, 2) + Math.pow(r, 2) + (R * r));
    // Slant height s = sqrt((R - r)^2 + h^2)
    const slant = Math.sqrt(Math.pow(R - r, 2) + Math.pow(h, 2));
    // Lateral area = pi * (R + r) * s
    const lateralArea = Math.PI * (R + r) * slant;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    sEl.textContent = slant.toFixed(2) + ' units';
    latEl.textContent = lateralArea.toFixed(2) + ' sq units';
  }

  [rEl, capREl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter top circular radius r and bottom base radius R.',
      'Enter vertical height h.',
      'Inspect 3D internal capacity volume, diagonal slant height, and lateral curved sheet metal area.'
    ],
    benefitTitle: 'Everyday Conical Frustums',
    benefitContent: 'A conical frustum is formed by slicing a cone with a plane parallel to its base, matching the geometry of drinking tumblers, buckets, flower pots, and volcano calderas.',
    faqs: [{ q: 'What happens when top radius r = 0?', a: 'The frustum becomes a standard full cone with volume V = ⅓·π·R²·h.' }]
  },

  // 4. Spherical Cap & Dome Volume Calculator
  {
    slug: 'spherical-cap-volume-surface-area-calculator',
    name: 'Spherical Cap & Dome Volume Calculator',
    description: 'Calculate 3D volume (V = ⅓ · π · h² · (3R - h)), curved dome surface area (A = 2πRh), and base circle radius for architectural domes and tank dished ends.',
    category: 'Math',
    icon: 'text',
    keywords: ['spherical cap calculator', 'dome volume calculator online', 'spherical dome surface area formula', 'dished head volume calculator', 'spherical segment geometry'],
    order: 257,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sphere Radius (R) & Cap Height (h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sc-r">Sphere Radius R (units)</label>
          <input class="tool-textarea" id="sc-r" type="number" step="any" value="10" placeholder="Sphere Radius R" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-h">Cap / Dome Height h (units)</label>
          <input class="tool-textarea" id="sc-h" type="number" step="any" value="4" placeholder="Height h (≤ 2R)" />
        </div>
      </div>
      <div id="sc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sc-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">435.63 cu units</span>
            <span class="stat-label">Cap Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-area" style="font-weight:700;">251.33 sq units</span>
            <span class="stat-label">Curved Dome Area (2πRh)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-base-r">8.00 units</span>
            <span class="stat-label">Base Circle Radius (a)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('sc-r'), hEl = document.getElementById('sc-h');
  const vEl = document.getElementById('sc-res-vol'), arEl = document.getElementById('sc-res-area'), brEl = document.getElementById('sc-res-base-r');

  function update() {
    const R = parseFloat(rEl.value), h = parseFloat(hEl.value);
    if (isNaN(R) || isNaN(h) || R <= 0 || h <= 0 || h > 2 * R) return;

    // V = (1/3) * pi * h^2 * (3*R - h)
    const vol = (1/3) * Math.PI * Math.pow(h, 2) * (3 * R - h);
    // A_curved = 2 * pi * R * h
    const curvedArea = 2 * Math.PI * R * h;
    // Base radius a = sqrt(h * (2R - h))
    const baseR = Math.sqrt(h * (2 * R - h));

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = curvedArea.toFixed(2) + ' sq units';
    brEl.textContent = baseR.toFixed(2) + ' units';
  }

  rEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter parent sphere radius R.',
      'Enter cap/dome height h (must be ≤ 2R).',
      'Inspect dome volume, curved roof surface area, and floor base circle radius.'
    ],
    benefitTitle: 'Architectural Domes and Pressure Vessel Tank Heads',
    benefitContent: 'Spherical caps form the roofs of classical basilicas and the curved end-caps (dished heads) of high-pressure boiler vessels to distribute internal stress uniformly.',
    faqs: [{ q: 'What happens when cap height h = R?', a: 'The spherical cap becomes a perfect hemisphere with volume V = ⅔·π·R³.' }]
  },

  // 5. Regular Tetrahedron Geometry Calculator
  {
    slug: 'regular-tetrahedron-calculator',
    name: 'Regular Tetrahedron Volume & Surface Area Calculator',
    description: 'Calculate 3D volume (V = a³ / (6√2)), total surface area (A = √3 · a²), and vertical height for a regular 4-faced equilateral triangular tetrahedron.',
    category: 'Math',
    icon: 'text',
    keywords: ['regular tetrahedron calculator', 'tetrahedron volume formula', 'platonic solid tetrahedron surface area', '4 sided triangular pyramid geometry', 'tetrahedron edge length calculator'],
    order: 258,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tetrahedron Edge Length (a)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="tet-a">Edge Length a (units)</label>
        <input class="tool-textarea" id="tet-a" type="number" step="any" value="6" placeholder="Edge a" />
      </div>
      <div id="tet-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tet-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.46 cu units</span>
            <span class="stat-label">Tetrahedron Volume (a³ / 6√2)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tet-res-area" style="font-weight:700;">62.35 sq units</span>
            <span class="stat-label">Surface Area (√3·a²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tet-res-h">4.90 units</span>
            <span class="stat-label">Apex Height (√(⅔)·a)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('tet-a');
  const vEl = document.getElementById('tet-res-vol'), arEl = document.getElementById('tet-res-area'), hEl = document.getElementById('tet-res-h');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = a^3 / (6 * sqrt(2))
    const vol = Math.pow(a, 3) / (6 * Math.sqrt(2));
    // A = sqrt(3) * a^2
    const area = Math.sqrt(3) * Math.pow(a, 2);
    // Height H = sqrt(2/3) * a
    const height = Math.sqrt(2/3) * a;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
    hEl.textContent = height.toFixed(2) + ' units';
  }

  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the edge length (a) of the regular tetrahedron.',
      'Inspect 3D volume, total surface area of all 4 equilateral triangular faces, and apex vertical height.'
    ],
    benefitTitle: 'The Simplest 3D Platonic Solid',
    benefitContent: 'A regular tetrahedron is the simplest of all ordinary convex polyhedra and the only one with 4 faces, 4 vertices, and 6 edges. In molecular chemistry, carbon sp³ hybridization forms a tetrahedral geometry (109.5° bond angle).',
    faqs: [{ q: 'Is a regular tetrahedron self-dual?', a: 'Yes, connecting the centers of the 4 faces of a regular tetrahedron creates another inverted regular tetrahedron.' }]
  }
];

toolsSuiteO.forEach(createTool);
console.log('Suite O complete: 5 tools created.');
