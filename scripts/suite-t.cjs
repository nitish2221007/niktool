const { createTool } = require('./generate-curated-tools.cjs');

// Suite T: 5 Tools in 3D Coordinate Geometry, Polar Transformations & Vector Mechanics
const toolsSuiteT = [
  // 1. Spherical to Cartesian 3D Coordinates Converter
  {
    slug: 'spherical-to-cartesian-3d-coordinates-converter',
    name: 'Spherical to Cartesian 3D Coordinates Converter',
    description: 'Convert 3D coordinate points between Spherical coordinates (r, θ inclination, φ azimuth) and Cartesian rectangular coordinates (x, y, z).',
    category: 'Math',
    icon: 'text',
    keywords: ['spherical to cartesian converter 3d', 'spherical polar coordinates calculator', 'radius theta phi to xyz online', '3d coordinate transformation calculator', 'spherical coordinates physics math'],
    order: 279,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spherical Radius (r), Polar Inclination (θ) & Azimuth (φ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sph-r">Radial Distance r</label>
          <input class="tool-textarea" id="sph-r" type="number" step="any" value="10" placeholder="r" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sph-theta">Polar Angle θ (Deg from +Z)</label>
          <input class="tool-textarea" id="sph-theta" type="number" step="any" value="45" placeholder="θ (0° to 180°)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sph-phi">Azimuth Angle φ (Deg in XY)</label>
          <input class="tool-textarea" id="sph-phi" type="number" step="any" value="30" placeholder="φ (0° to 360°)" />
        </div>
      </div>
      <div id="sph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sph-res-xyz" style="color:var(--green-dark); font-weight:800; font-size:1.5rem; font-family:monospace;">(6.124, 3.536, 7.071)</span>
            <span class="stat-label">Cartesian Coordinates (x, y, z)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sph-res-rxy">r_xy = 7.071</span>
            <span class="stat-label">Projection on XY Plane</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('sph-r'), thEl = document.getElementById('sph-theta'), phEl = document.getElementById('sph-phi');
  const xyzEl = document.getElementById('sph-res-xyz'), rxyEl = document.getElementById('sph-res-rxy');

  function update() {
    const r = parseFloat(rEl.value), thDeg = parseFloat(thEl.value), phDeg = parseFloat(phEl.value);
    if (isNaN(r) || isNaN(thDeg) || isNaN(phDeg) || r < 0) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phRad = (phDeg * Math.PI) / 180;

    // x = r * sin(theta) * cos(phi)
    // y = r * sin(theta) * sin(phi)
    // z = r * cos(theta)
    const x = r * Math.sin(thRad) * Math.cos(phRad);
    const y = r * Math.sin(thRad) * Math.sin(phRad);
    const z = r * Math.cos(thRad);
    const rXy = r * Math.sin(thRad);

    xyzEl.textContent = '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + ')';
    rxyEl.textContent = 'r_xy = ' + rXy.toFixed(3);
  }

  [rEl, thEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter radial distance r, polar zenith inclination angle θ in degrees (0° to 180°), and azimuthal angle φ in degrees (0° to 360°).',
      'Inspect rectangular Cartesian coordinates (x, y, z).'
    ],
    benefitTitle: 'Astrophysical and Quantum Orbital Physics',
    benefitContent: 'Spherical coordinates naturally describe planetary orbits, celestial navigation (right ascension & declination), and quantum hydrogen atomic electron orbitals (ψ(r, θ, φ)).',
    faqs: [{ q: 'What is the Cartesian z coordinate in spherical systems?', a: 'z = r · cos(θ).' }]
  },

  // 2. Cylindrical to Cartesian 3D Coordinates Converter
  {
    slug: 'cylindrical-to-cartesian-3d-coordinates-converter',
    name: 'Cylindrical to Cartesian 3D Coordinates Converter',
    description: 'Convert 3D coordinates between Cylindrical systems (ρ radius, φ azimuth, z height) and Cartesian rectangular systems (x, y, z).',
    category: 'Math',
    icon: 'text',
    keywords: ['cylindrical to cartesian converter', 'cylindrical coordinates 3d calculator', 'rho phi z to xyz online', 'polar 3d coordinate transformation', 'cylindrical coordinate geometry'],
    order: 280,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cylindrical Radius (ρ), Angle (φ) & Height (z)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cyl-rho">Radial Distance ρ</label>
          <input class="tool-textarea" id="cyl-rho" type="number" step="any" value="5" placeholder="ρ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyl-phi">Azimuth Angle φ (Degrees)</label>
          <input class="tool-textarea" id="cyl-phi" type="number" step="any" value="60" placeholder="φ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyl-z">Height z</label>
          <input class="tool-textarea" id="cyl-z" type="number" step="any" value="8" placeholder="z" />
        </div>
      </div>
      <div id="cyl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cyl-res-xyz" style="color:var(--green-dark); font-weight:800; font-size:1.5rem; font-family:monospace;">(2.500, 4.330, 8.000)</span>
            <span class="stat-label">Cartesian Coordinates (x, y, z)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rhoEl = document.getElementById('cyl-rho'), phiEl = document.getElementById('cyl-phi'), zEl = document.getElementById('cyl-z');
  const xyzEl = document.getElementById('cyl-res-xyz');

  function update() {
    const rho = parseFloat(rhoEl.value), phiDeg = parseFloat(phiEl.value), z = parseFloat(zEl.value);
    if (isNaN(rho) || isNaN(phiDeg) || isNaN(z) || rho < 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    // x = rho * cos(phi)
    // y = rho * sin(phi)
    // z = z
    const x = rho * Math.cos(phiRad);
    const y = rho * Math.sin(phiRad);

    xyzEl.textContent = '(' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + ')';
  }

  [rhoEl, phiEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter radial distance ρ in the XY plane, azimuth angle φ in degrees, and vertical elevation height z.',
      'Inspect rectangular coordinates (x, y, z).'
    ],
    benefitTitle: 'Axial Symmetry in Engineering',
    benefitContent: 'Cylindrical coordinates simplify calculations for motor rotors, piping fluid dynamics, coaxial cables, and solenoids with rotational symmetry around the z-axis.',
    faqs: [{ q: 'How does cylindrical coordinate transformation work?', a: 'x = ρ · cos(φ), y = ρ · sin(φ), and z remains identical.' }]
  },

  // 3. 3D Distance & Midpoint Formula Calculator
  {
    slug: 'distance-midpoint-3d-calculator',
    name: '3D Euclidean Distance & Midpoint Calculator',
    description: 'Calculate straight-line 3D Euclidean distance (d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)) and midpoint coordinates between two 3D spatial points.',
    category: 'Math',
    icon: 'text',
    keywords: ['3d distance calculator', 'distance between two points 3d', '3d midpoint calculator online', 'euclidean distance 3d coordinates', 'spatial distance xyz formula'],
    order: 281,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Point P₁ (x₁, y₁, z₁) & Point P₂ (x₂, y₂, z₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div>
          <label class="control-label">Point 1 (x₁, y₁, z₁)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="d3-x1" type="number" step="any" value="2" placeholder="x₁" />
            <input class="tool-textarea" id="d3-y1" type="number" step="any" value="3" placeholder="y₁" />
            <input class="tool-textarea" id="d3-z1" type="number" step="any" value="5" placeholder="z₁" />
          </div>
        </div>
        <div>
          <label class="control-label">Point 2 (x₂, y₂, z₂)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="d3-x2" type="number" step="any" value="6" placeholder="x₂" />
            <input class="tool-textarea" id="d3-y2" type="number" step="any" value="7" placeholder="y₂" />
            <input class="tool-textarea" id="d3-z2" type="number" step="any" value="9" placeholder="z₂" />
          </div>
        </div>
      </div>
      <div id="d3-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="d3-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.928 units</span>
            <span class="stat-label">3D Euclidean Distance (d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="d3-res-mid" style="font-weight:700;">(4.00, 5.00, 7.00)</span>
            <span class="stat-label">Midpoint Coordinates</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('d3-x1'), y1El = document.getElementById('d3-y1'), z1El = document.getElementById('d3-z1');
  const x2El = document.getElementById('d3-x2'), y2El = document.getElementById('d3-y2'), z2El = document.getElementById('d3-z2');
  const distEl = document.getElementById('d3-res-dist'), midEl = document.getElementById('d3-res-mid');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value), z1 = parseFloat(z1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value), z2 = parseFloat(z2El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(z1) || isNaN(x2) || isNaN(y2) || isNaN(z2)) return;

    // d = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)
    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    // Midpoint = ((x1+x2)/2, (y1+y2)/2, (z1+z2)/2)
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;

    distEl.textContent = dist.toFixed(3) + ' units';
    midEl.textContent = '(' + midX.toFixed(2) + ', ' + midY.toFixed(2) + ', ' + midZ.toFixed(2) + ')';
  }

  [x1El, y1El, z1El, x2El, y2El, z2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 3D Cartesian coordinates for Point 1 and Point 2.',
      'Inspect true straight-line Euclidean 3D spatial distance and center midpoint.'
    ],
    benefitTitle: '3D Pythagorean Spatial Metric',
    benefitContent: 'The 3D distance formula extends the 2D Pythagorean theorem into three orthogonal dimensions: d² = Δx² + Δy² + Δz².',
    faqs: [{ q: 'What is the distance between (0,0,0) and (1,2,2)?', a: 'd = √(1² + 2² + 2²) = √(1 + 4 + 4) = √9 = 3.0 units.' }]
  },

  // 4. Triangle 2D/3D Centroid Geometric Center Calculator
  {
    slug: 'triangle-centroid-geometric-center-calculator',
    name: 'Triangle Centroid (Geometric Center) Calculator',
    description: 'Calculate the geometric centroid center of mass coordinates (C = ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)) for 2D and 3D triangles.',
    category: 'Math',
    icon: 'text',
    keywords: ['triangle centroid calculator', 'center of gravity triangle calculator', 'centroid coordinates formula online', 'geometric center of triangle', 'triangle vertex centroid calculator'],
    order: 282,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Triangle Vertices A, B, and C (x, y)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div>
          <label class="control-label">Vertex A (x₁, y₁)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="tc-x1" type="number" step="any" value="0" placeholder="x₁" />
            <input class="tool-textarea" id="tc-y1" type="number" step="any" value="0" placeholder="y₁" />
          </div>
        </div>
        <div>
          <label class="control-label">Vertex B (x₂, y₂)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="tc-x2" type="number" step="any" value="6" placeholder="x₂" />
            <input class="tool-textarea" id="tc-y2" type="number" step="any" value="0" placeholder="y₂" />
          </div>
        </div>
        <div>
          <label class="control-label">Vertex C (x₃, y₃)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="tc-x3" type="number" step="any" value="3" placeholder="x₃" />
            <input class="tool-textarea" id="tc-y3" type="number" step="any" value="6" placeholder="y₃" />
          </div>
        </div>
      </div>
      <div id="tc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tc-res-cent" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">(3.00, 2.00)</span>
            <span class="stat-label">Centroid Coordinates (Center of Gravity)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tc-res-area" style="font-weight:700;">18.00 sq units</span>
            <span class="stat-label">Triangle Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('tc-x1'), y1El = document.getElementById('tc-y1');
  const x2El = document.getElementById('tc-x2'), y2El = document.getElementById('tc-y2');
  const x3El = document.getElementById('tc-x3'), y3El = document.getElementById('tc-y3');
  const centEl = document.getElementById('tc-res-cent'), areaEl = document.getElementById('tc-res-area');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);
    const x3 = parseFloat(x3El.value), y3 = parseFloat(y3El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) return;

    // Centroid = ((x1+x2+x3)/3, (y1+y2+y3)/3)
    const cx = (x1 + x2 + x3) / 3;
    const cy = (y1 + y2 + y3) / 3;

    // Area = 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

    centEl.textContent = '(' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ')';
    areaEl.textContent = area.toFixed(2) + ' sq units';
  }

  [x1El, y1El, x2El, y2El, x3El, y3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter coordinates for the three vertices of the triangle.',
      'Inspect the centroid coordinates (the intersection of the three triangle medians).'
    ],
    benefitTitle: 'Physical Center of Gravity',
    benefitContent: 'If a triangle is cut out of uniform density sheet metal, it will balance perfectly on the tip of a pin placed at its centroid.',
    faqs: [{ q: 'What is the 2:1 median division property of a centroid?', a: 'The centroid divides each triangle median line segment in a 2:1 ratio from vertex to midpoint of opposite side.' }]
  },

  // 5. Line Slope, Angle of Inclination & Perpendicular Slope Calculator
  {
    slug: 'line-slope-angle-of-inclination-calculator',
    name: 'Line Slope, Angle of Inclination & Intercept Calculator',
    description: 'Calculate line slope (m = Δy / Δx), angle of inclination (θ = arctan(m)), perpendicular slope (-1/m), and standard linear equation from two points.',
    category: 'Math',
    icon: 'text',
    keywords: ['line slope calculator', 'angle of inclination calculator', 'perpendicular slope calculator online', 'delta y over delta x slope formula', 'slope intercept equation from two points'],
    order: 283,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Point P₁ (x₁, y₁) and Point P₂ (x₂, y₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div>
          <label class="control-label">Point 1 (x₁, y₁)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="ls-x1" type="number" step="any" value="1" placeholder="x₁" />
            <input class="tool-textarea" id="ls-y1" type="number" step="any" value="2" placeholder="y₁" />
          </div>
        </div>
        <div>
          <label class="control-label">Point 2 (x₂, y₂)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="ls-x2" type="number" step="any" value="4" placeholder="x₂" />
            <input class="tool-textarea" id="ls-y2" type="number" step="any" value="8" placeholder="y₂" />
          </div>
        </div>
      </div>
      <div id="ls-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ls-res-slope" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">m = 2.000</span>
            <span class="stat-label">Slope Gradient (Δy / Δx)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ls-res-angle" style="font-weight:700;">63.43°</span>
            <span class="stat-label">Angle of Inclination (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ls-res-perp">m_perp = -0.500</span>
            <span class="stat-label">Perpendicular Slope</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('ls-x1'), y1El = document.getElementById('ls-y1');
  const x2El = document.getElementById('ls-x2'), y2El = document.getElementById('ls-y2');
  const sEl = document.getElementById('ls-res-slope'), aEl = document.getElementById('ls-res-angle'), pEl = document.getElementById('ls-res-perp');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return;

    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0) {
      sEl.textContent = 'm = Undefined (Vertical)';
      aEl.textContent = '90.00°';
      pEl.textContent = 'm_perp = 0.000 (Horizontal)';
      return;
    }

    const m = dy / dx;
    const rad = Math.atan(m);
    const deg = (rad * 180) / Math.PI;
    const angleDeg = deg >= 0 ? deg : deg + 180;

    const perp = m !== 0 ? -1 / m : 'Undefined (Vertical)';

    sEl.textContent = 'm = ' + m.toFixed(3);
    aEl.textContent = angleDeg.toFixed(2) + '°';
    pEl.textContent = typeof perp === 'number' ? 'm_perp = ' + perp.toFixed(3) : perp;
  }

  [x1El, y1El, x2El, y2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter coordinates for two distinct points along the line.',
      'Inspect line slope gradient (m), inclination angle θ (0° to 180°), and negative reciprocal perpendicular slope.'
    ],
    benefitTitle: 'Negative Reciprocal Perpendicular Lines',
    benefitContent: 'Two non-vertical lines are perpendicular in Euclidean geometry if and only if their slopes satisfy m₁ · m₂ = -1 (m₂ = -1/m₁).',
    faqs: [{ q: 'What is the angle of a line with slope m = 1?', a: 'arctan(1) = 45 degrees.' }]
  }
];

toolsSuiteT.forEach(createTool);
console.log('Suite T complete: 5 tools created.');
