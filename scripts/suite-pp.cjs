const { createTool } = require('./generate-curated-tools.cjs');

// Suite PP: 5 Tools in Geotechnical Engineering, Soil Mechanics, Beam Deflection & Paving to reach 520 tools
const toolsSuitePP = [
  // 1. Soil Void Ratio & Porosity Geotechnical Converter
  {
    slug: 'soil-void-ratio-porosity-calculator',
    name: 'Soil Void Ratio & Porosity Geotechnical Calculator',
    description: 'Convert between soil Void Ratio (e = V_v / V_s) and Total Porosity (n = V_v / V_total = e / (1 + e)) in geotechnical soil mechanics and groundwater hydrogeology.',
    category: 'Science',
    icon: 'text',
    keywords: ['soil void ratio calculator', 'soil porosity calculator', 'void ratio to porosity formula', 'geotechnical soil phase relationship calculator', 'void ratio e n calculator online'],
    order: 391,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Void Ratio (e) or Porosity (n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-e">Void Ratio e (V_v / V_s)</label>
          <input class="tool-textarea" id="sp-e" type="number" step="any" value="0.65" placeholder="0.65 (Medium Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-n">Porosity n (%)</label>
          <input class="tool-textarea" id="sp-n" type="number" step="any" placeholder="%" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-desc" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">Dense Sand / Gravelly Sand</span>
            <span class="stat-label">Typical Soil Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-vs">60.6% Solids</span>
            <span class="stat-label">Volumetric Solid Fraction (1 - n)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('sp-e'), nEl = document.getElementById('sp-n');
  const dResEl = document.getElementById('sp-res-desc'), vsResEl = document.getElementById('sp-res-vs');

  function updateFromE(e) {
    if (isNaN(e) || e <= 0) return;

    // n = e / (1 + e)
    const n = e / (1 + e);
    const nPct = n * 100;
    nEl.value = nPct.toFixed(1);

    vsResEl.textContent = ((1 - n) * 100).toFixed(1) + '% Solids Fraction';

    if (e < 0.4) dResEl.textContent = 'Dense Well-Graded Gravel / Till (e < 0.4)';
    else if (e < 0.7) dResEl.textContent = 'Medium Sand / Sandy Gravel (e = 0.4 - 0.7)';
    else if (e < 1.1) dResEl.textContent = 'Loose Sand / Silty Clay (e = 0.7 - 1.1)';
    else dResEl.textContent = 'Soft Organic Clay / Peat (e > 1.1: High Settlement)';
  }

  eEl.addEventListener('input', () => {
    const v = parseFloat(eEl.value);
    if (!isNaN(v) && v > 0) updateFromE(v);
  });

  nEl.addEventListener('input', () => {
    const nPct = parseFloat(nEl.value);
    if (!isNaN(nPct) && nPct > 0 && nPct < 100) {
      const n = nPct / 100;
      const e = n / (1 - n);
      eEl.value = e.toFixed(3);
      updateFromE(e);
    }
  });

  updateFromE(0.65);
})();`,
    howToSteps: [
      'Enter soil Void Ratio (e) or Porosity percentage (n%).',
      'Inspect geotechnical soil compaction status and solid vs void volume fractions.'
    ],
    benefitTitle: 'Void Ratio vs Porosity Distinction',
    benefitContent: 'Void Ratio (e) compares void space to solid mineral volume (can exceed 1.0 for soft clays), while Porosity (n) expresses voids as a fraction of total sample volume (always strictly less than 100%).',
    faqs: [{ q: 'What is the porosity of a soil with void ratio e = 0.65?', a: 'n = 0.65 / (1 + 0.65) = 0.65 / 1.65 ≈ 39.4% porosity.' }]
  },

  // 2. Darcy's Law Groundwater Hydraulic Discharge Calculator
  {
    slug: 'darcy-law-groundwater-hydraulic-gradient-calculator',
    name: 'Darcy\'s Law Groundwater Flow & Hydraulic Conductivity Calculator',
    description: 'Calculate aquifer seepage discharge rate (Q = -K · A · (dh / dl)) and Darcy flux velocity (q = K · i) in hydrogeology and geotechnical dam design.',
    category: 'Science',
    icon: 'text',
    keywords: ['darcys law calculator', 'groundwater flow calculator online', 'hydraulic conductivity darcy formula', 'hydraulic gradient dh dl calculator', 'aquifer seepage discharge rate online'],
    order: 392,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hydraulic Conductivity (K), Cross-Section Area (A) & Head Loss',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dar-k">Hydraulic Conductivity K (m/s)</label>
          <input class="tool-textarea" id="dar-k" type="text" value="1.0e-4" placeholder="1.0e-4 (Clean Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dar-area">Aquifer Area A (m²)</label>
          <input class="tool-textarea" id="dar-area" type="number" step="any" value="50" placeholder="50 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dar-dh">Head Loss Δh (m)</label>
          <input class="tool-textarea" id="dar-dh" type="number" step="any" value="2.5" placeholder="2.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dar-l">Flow Length L (m)</label>
          <input class="tool-textarea" id="dar-l" type="number" step="any" value="100" placeholder="100 m" />
        </div>
      </div>
      <div id="dar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dar-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10.80 L / hour</span>
            <span class="stat-label">Volumetric Discharge Rate (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dar-res-i" style="font-weight:700;">i = 0.0250 (2.5%)</span>
            <span class="stat-label">Hydraulic Gradient (Δh / L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('dar-k'), aEl = document.getElementById('dar-area');
  const dhEl = document.getElementById('dar-dh'), lEl = document.getElementById('dar-l');
  const qResEl = document.getElementById('dar-res-q'), iResEl = document.getElementById('dar-res-i');

  function update() {
    const K = parseFloat(kEl.value), A = parseFloat(aEl.value), dh = parseFloat(dhEl.value), L = parseFloat(lEl.value);
    if (isNaN(K) || isNaN(A) || isNaN(dh) || isNaN(L) || K <= 0 || A <= 0 || dh <= 0 || L <= 0) return;

    // Hydraulic gradient i = dh / L
    const i = dh / L;
    // Q = K * A * i (m^3 / s)
    const qM3s = K * A * i;
    const qLps = qM3s * 1000;
    const qLph = qLps * 3600;

    qResEl.textContent = qLph >= 1000 ? (qLph / 1000).toFixed(2) + ' m³/hr' : qLph.toFixed(2) + ' L / hour (' + (qLps).toFixed(3) + ' L/s)';
    iResEl.textContent = 'i = ' + i.toFixed(4) + ' (' + (i * 100).toFixed(2) + '% Gradient)';
  }

  [kEl, aEl, dhEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aquifer soil hydraulic conductivity K in m/s (e.g. 10⁻³ for gravel, 10⁻⁵ for sand, 10⁻⁸ for silt).',
      'Enter cross-sectional porous aquifer flow area A in square meters.',
      'Enter piezometric head loss Δh and flow seepage distance L in meters.',
      'Inspect total volumetric groundwater discharge rate Q and hydraulic gradient.'
    ],
    benefitTitle: 'Henry Darcy\'s 1856 Public Water Fountain Experiments',
    benefitContent: 'Darcy demonstrated that water filtration rate through sand beds is strictly proportional to the hydraulic head difference driving the flow and inversely proportional to the flow path length.',
    faqs: [{ q: 'What is a typical hydraulic conductivity for clean sand?', a: 'Clean sand typically has a hydraulic conductivity K between 10⁻⁴ and 10⁻² m/s.' }]
  },

  // 3. Cantilever Beam Maximum End-Load Deflection Calculator
  {
    slug: 'cantilever-beam-deflection-end-load-calculator',
    name: 'Cantilever Beam End-Point Load Deflection Calculator',
    description: 'Calculate maximum tip deflection (δ_max = (P · L³) / (3 · E · I)) and maximum bending moment (M_max = P · L) for cantilever beams with point loads.',
    category: 'Science',
    icon: 'text',
    keywords: ['cantilever beam deflection calculator', 'pl3 over 3ei deflection formula', 'end point load cantilever beam calculator', 'beam stiffness structural deflection online', 'moment of inertia cantilever deflection'],
    order: 393,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Load Force (P in kN), Length (L), Modulus (E) & Moment of Inertia (I)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cb-p">End Load P (kN)</label>
          <input class="tool-textarea" id="cb-p" type="number" step="any" value="5.0" placeholder="5.0 kN (5000 N)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-l">Beam Length L (m)</label>
          <input class="tool-textarea" id="cb-l" type="number" step="any" value="2.5" placeholder="2.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-e">Elastic Modulus E (GPa)</label>
          <input class="tool-textarea" id="cb-e" type="number" step="any" value="200" placeholder="200 GPa (Structural Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-i">Moment of Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="cb-i" type="number" step="any" value="800" placeholder="800 cm⁴" />
        </div>
      </div>
      <div id="cb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cb-res-def" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16.28 mm</span>
            <span class="stat-label">Maximum Tip Deflection (δ_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cb-res-m">12.50 kN·m</span>
            <span class="stat-label">Fixed Wall Moment (M_max = P·L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cb-p'), lEl = document.getElementById('cb-l');
  const eEl = document.getElementById('cb-e'), iEl = document.getElementById('cb-i');
  const dResEl = document.getElementById('cb-res-def'), mResEl = document.getElementById('cb-res-m');

  function update() {
    const pKn = parseFloat(pEl.value), lM = parseFloat(lEl.value);
    const eGpa = parseFloat(eEl.value), iCm4 = parseFloat(iEl.value);

    if (isNaN(pKn) || isNaN(lM) || isNaN(eGpa) || isNaN(iCm4) || pKn <= 0 || lM <= 0 || eGpa <= 0 || iCm4 <= 0) return;

    const pN = pKn * 1000;
    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // delta_max = (P * L^3) / (3 * E * I)  [meters]
    const defM = (pN * Math.pow(lM, 3)) / (3 * ePa * iM4);
    const defMm = defM * 1000;

    // M_max = P * L (kN*m)
    const mMax = pKn * lM;

    dResEl.textContent = defMm >= 1000 ? defM.toFixed(2) + ' meters' : defMm.toFixed(2) + ' mm';
    mResEl.textContent = mMax.toFixed(2) + ' kN·m at Fixed Wall';
  }

  [pEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter tip point load force P in kiloNewtons (kN).',
      'Enter cantilever span length L in meters.',
      'Enter Young\'s Modulus of Elasticity in GPa (Steel = 200 GPa, Aluminum = 69 GPa).',
      'Enter cross-section Second Moment of Inertia I in cm⁴.',
      'Inspect maximum cantilever tip downward sag deflection in millimeters and root bending moment.'
    ],
    benefitTitle: 'Cubic Length Sensitivity (L³)',
    benefitContent: 'Cantilever tip deflection increases with the cube of length (δ ∝ L³): doubling beam overhang length increases tip sag by a massive factor of eight (2³ = 8x).',
    faqs: [{ q: 'Where is maximum stress in a cantilever beam?', a: 'Maximum bending stress occurs at the extreme top/bottom fibers at the rigidly clamped root wall where bending moment is greatest (M = P·L).' }]
  },

  // 4. Simply Supported Beam Uniform Distributed Load Deflection Calculator
  {
    slug: 'simply-supported-beam-center-deflection-calculator',
    name: 'Simply Supported Beam Distributed Load Deflection Calculator',
    description: 'Calculate midspan maximum deflection (δ_max = (5 · w · L⁴) / (384 · E · I)) and maximum bending moment (M_max = w · L² / 8) for beams supporting uniform load w.',
    category: 'Science',
    icon: 'text',
    keywords: ['simply supported beam deflection calculator', '5 w l4 over 384 ei formula', 'uniform distributed load beam deflection online', 'beam midspan deflection calculator', 'structural beam load calculator online'],
    order: 394,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Distributed Load w (kN/m), Span (L), Modulus (E) & Inertia (I)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ssb-w">Uniform Load w (kN / m)</label>
          <input class="tool-textarea" id="ssb-w" type="number" step="any" value="10" placeholder="10 kN/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssb-l">Span Length L (m)</label>
          <input class="tool-textarea" id="ssb-l" type="number" step="any" value="6.0" placeholder="6.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssb-e">Elastic Modulus E (GPa)</label>
          <input class="tool-textarea" id="ssb-e" type="number" step="any" value="200" placeholder="200 GPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssb-i">Moment of Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="ssb-i" type="number" step="any" value="4500" placeholder="4,500 cm⁴ (I-Beam)" />
        </div>
      </div>
      <div id="ssb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ssb-res-def" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">18.75 mm</span>
            <span class="stat-label">Midspan Center Deflection (δ_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ssb-res-m">45.00 kN·m</span>
            <span class="stat-label">Center Bending Moment (M_max = wL²/8)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ssb-res-ratio">L / 320</span>
            <span class="stat-label">Building Deflection Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('ssb-w'), lEl = document.getElementById('ssb-l');
  const eEl = document.getElementById('ssb-e'), iEl = document.getElementById('ssb-i');
  const dResEl = document.getElementById('ssb-res-def'), mResEl = document.getElementById('ssb-res-m'), rResEl = document.getElementById('ssb-res-ratio');

  function update() {
    const wKnm = parseFloat(wEl.value), lM = parseFloat(lEl.value);
    const eGpa = parseFloat(eEl.value), iCm4 = parseFloat(iEl.value);

    if (isNaN(wKnm) || isNaN(lM) || isNaN(eGpa) || isNaN(iCm4) || wKnm <= 0 || lM <= 0 || eGpa <= 0 || iCm4 <= 0) return;

    const wNm = wKnm * 1000;
    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8;

    // delta_max = (5 * w * L^4) / (384 * E * I)  [meters]
    const defM = (5 * wNm * Math.pow(lM, 4)) / (384 * ePa * iM4);
    const defMm = defM * 1000;

    // M_max = (w * L^2) / 8
    const mMax = (wKnm * Math.pow(lM, 2)) / 8;
    const spanRatio = Math.round((lM * 1000) / defMm);

    dResEl.textContent = defMm.toFixed(2) + ' mm';
    mResEl.textContent = mMax.toFixed(2) + ' kN·m at Midspan';
    rResEl.textContent = 'L / ' + spanRatio + (spanRatio >= 360 ? ' (Passes L/360 Code)' : ' (Exceeds L/360 Standard)');
  }

  [wEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter uniformly distributed load w in kiloNewtons per meter (kN/m).',
      'Enter clear span length L in meters.',
      'Enter Young\'s Modulus E (GPa) and beam section moment of inertia I (cm⁴).',
      'Inspect midspan maximum sag deflection (mm) and structural building code serviceability limit ratio (L/360).'
    ],
    benefitTitle: 'Fourth-Power Span Sensitivity (L⁴)',
    benefitContent: 'Because uniform load deflection scales with span to the fourth power (δ ∝ L⁴), increasing floor beam span by just 25% more than doubles center deflection (1.25⁴ ≈ 2.44x).',
    faqs: [{ q: 'What is the standard residential floor deflection limit?', a: 'Building codes typically enforce a maximum live load deflection limit of L / 360 (e.g. max 16.7 mm for a 6-meter span).' }]
  },

  // 5. Asphalt Paving Tonnage & Area Coverage Calculator
  {
    slug: 'asphalt-paving-tonnage-calculator',
    name: 'Asphalt Paving Tonnage & Coverage Calculator',
    description: 'Calculate hot-mix asphalt tonnage required (US Tons = Length · Width · (Depth / 12) · 145 / 2000) for paving driveways, roads, and parking lots.',
    category: 'Daily',
    icon: 'text',
    keywords: ['asphalt tonnage calculator', 'asphalt paving tons formula', 'how much asphalt do i need driveway', 'hot mix asphalt coverage calculator online', 'asphalt tons cubic yards formula'],
    order: 395,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Paved Area Length, Width & Compacted Thickness',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ash-len">Length (Feet)</label>
          <input class="tool-textarea" id="ash-len" type="number" step="any" value="50" placeholder="50 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ash-wid">Width (Feet)</label>
          <input class="tool-textarea" id="ash-wid" type="number" step="any" value="12" placeholder="12 ft (Driveway)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ash-thick">Compacted Depth (Inches)</label>
          <input class="tool-textarea" id="ash-thick" type="number" step="any" value="2.5" placeholder="2.5 in" />
        </div>
      </div>
      <div id="ash-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ash-res-tons" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9.06 US Tons</span>
            <span class="stat-label">Total Asphalt Required (with 5% buffer)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ash-res-sqft" style="font-weight:700;">600 sq ft (4.63 cu yds)</span>
            <span class="stat-label">Total Paved Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ash-len'), wEl = document.getElementById('ash-wid'), tEl = document.getElementById('ash-thick');
  const tResEl = document.getElementById('ash-res-tons'), sResEl = document.getElementById('ash-res-sqft');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), thickIn = parseFloat(tEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(thickIn) || L <= 0 || W <= 0 || thickIn <= 0) return;

    const sqFt = L * W;
    const cuFt = sqFt * (thickIn / 12);
    const cuYds = cuFt / 27;

    // Standard compacted hot-mix asphalt density: 145 lbs / cu ft
    const totalLbs = cuFt * 145;
    // Add 5% contingency buffer
    const tonsWithBuffer = (totalLbs / 2000) * 1.05;
    const metricTonnes = tonsWithBuffer * 0.907185;

    tResEl.textContent = tonsWithBuffer.toFixed(2) + ' US Tons (' + metricTonnes.toFixed(2) + ' Metric Tonnes)';
    sResEl.textContent = Math.round(sqFt).toLocaleString() + ' sq ft (' + cuYds.toFixed(2) + ' cu yds)';
  }

  [lEl, wEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter driveway or parking lot paving length and width in feet.',
      'Enter finished compacted asphalt thickness in inches (2.0 to 3.0 inches standard for residential).',
      'Inspect asphalt order weight in US tons and metric tonnes (including 5% compaction spillage allowance).'
    ],
    benefitTitle: 'Compacted Asphalt Density (145 lb/cu ft)',
    benefitContent: 'Compacted Hot Mix Asphalt (HMA) weighs approximately 145 pounds per cubic foot (2.32 metric tons per cubic meter); asphalt batch plants dispatch delivery trucks measured strictly in US Tons.',
    faqs: [{ q: 'How many square feet does 1 ton of asphalt cover at 2 inches depth?', a: 'One US ton of asphalt covers approximately 80 square feet at a compacted thickness of 2.0 inches.' }]
  }
];

toolsSuitePP.forEach(createTool);
console.log('Suite PP complete: 5 tools created.');
