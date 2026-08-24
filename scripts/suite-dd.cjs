const { createTool } = require('./generate-curated-tools.cjs');

// Suite DD: 5 Tools in Civil Construction, Thermal R-Values, Concrete Slabs & Roofing to reach 458 tools
const toolsSuiteDD = [
  // 1. Concrete Slab Volume & Premix Bags Calculator
  {
    slug: 'concrete-slab-volume-bags-calculator',
    name: 'Concrete Slab Volume & Bags (60lb / 80lb) Calculator',
    description: 'Calculate concrete volume in Cubic Yards and Cubic Meters, and determine exact counts of 60 lb and 80 lb premix bags required for driveways, patios, and footings.',
    category: 'Daily',
    icon: 'text',
    keywords: ['concrete slab calculator', 'concrete volume cubic yards calculator', 'how many bags of concrete do i need', '80 lb bags concrete calculator', 'patio slab concrete yards formula'],
    order: 329,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Slab Length, Width & Slab Thickness',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="con-len">Length (Feet)</label>
          <input class="tool-textarea" id="con-len" type="number" step="any" value="20" placeholder="20 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="con-wid">Width (Feet)</label>
          <input class="tool-textarea" id="con-wid" type="number" step="any" value="10" placeholder="10 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="con-thick">Thickness (Inches)</label>
          <input class="tool-textarea" id="con-thick" type="number" step="any" value="4" placeholder="4 in (Standard Patio)" />
        </div>
      </div>
      <div id="con-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="con-res-yards" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.47 Cu. Yds</span>
            <span class="stat-label">Total Volume (with 10% waste buffer)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="con-res-b80" style="font-weight:700;">112 Bags (80 lb)</span>
            <span class="stat-label">80 lb Premix Bags</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="con-res-b60">149 Bags (60 lb)</span>
            <span class="stat-label">60 lb Premix Bags</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('con-len'), wEl = document.getElementById('con-wid'), tEl = document.getElementById('con-thick');
  const yResEl = document.getElementById('con-res-yards'), b80ResEl = document.getElementById('con-res-b80'), b60ResEl = document.getElementById('con-res-b60');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), thickIn = parseFloat(tEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(thickIn) || L <= 0 || W <= 0 || thickIn <= 0) return;

    // Volume in cubic feet = L * W * (thick / 12)
    const cuFt = L * W * (thickIn / 12);
    // Add 10% safety buffer for uneven ground / spillage
    const cuFtWithWaste = cuFt * 1.10;

    // 1 Cubic Yard = 27 Cubic Feet
    const cuYards = cuFtWithWaste / 27;
    const cuMeters = cuYards * 0.764555;

    // 1 bag 80 lb yields approx 0.60 cu ft
    const bags80 = Math.ceil(cuFtWithWaste / 0.60);
    // 1 bag 60 lb yields approx 0.45 cu ft
    const bags60 = Math.ceil(cuFtWithWaste / 0.45);

    yResEl.textContent = cuYards.toFixed(2) + ' Cu. Yds (' + cuMeters.toFixed(2) + ' m³)';
    b80ResEl.textContent = bags80 + ' Bags (80 lb)';
    b60ResEl.textContent = bags60 + ' Bags (60 lb)';
  }

  [lEl, wEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter slab length and width in feet.',
      'Enter slab thickness in inches (4 inches standard for walkways/patios, 6 inches for heavy vehicle driveways).',
      'Inspect total volume in cubic yards (including 10% contingency buffer) and premix bag counts.'
    ],
    benefitTitle: 'Premix vs Ready-Mix Concrete Truck Ordering',
    benefitContent: 'For jobs over 1.5 to 2.0 cubic yards, ordering a ready-mix concrete delivery truck is significantly more cost-effective and structurally uniform than hand-mixing dozens of individual 80lb bags.',
    faqs: [{ q: 'How many 80 lb bags are in 1 cubic yard of concrete?', a: 'One cubic yard of concrete (27 cu ft) requires approximately 45 bags of 80 lb premix concrete (0.60 cu ft per bag).' }]
  },

  // 2. Thermal Insulation R-Value to U-Factor Converter
  {
    slug: 'r-value-u-factor-thermal-insulation-converter',
    name: 'Thermal Insulation R-Value to U-Factor Converter',
    description: 'Convert building thermal insulation values across Imperial R-Value (h·ft²·°F/BTU), Metric RSI (m²·K/W), and Overall Heat Transfer U-Factor (U = 1/R).',
    category: 'Daily',
    icon: 'text',
    keywords: ['r value to u factor converter', 'u value to r value calculator', 'thermal resistance rsi calculator', 'building insulation heat loss formula', 'r value imperial to metric rsi online'],
    order: 330,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Imperial R-Value, Metric RSI & U-Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ti-r">Imperial R-Value</label>
          <input class="tool-textarea" id="ti-r" type="number" step="any" value="13" placeholder="R-13 (Standard 2x4 Wall)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ti-rsi">Metric RSI (m²·K/W)</label>
          <input class="tool-textarea" id="ti-rsi" type="number" step="any" placeholder="RSI" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ti-u">U-Factor (BTU/(h·ft²·°F))</label>
          <input class="tool-textarea" id="ti-u" type="number" step="any" placeholder="U-Factor" />
        </div>
      </div>
      <div id="ti-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ti-res-desc" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">2x4 Exterior Wall Cavity (R-13)</span>
            <span class="stat-label">Architectural Building Standard</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('ti-r'), rsiEl = document.getElementById('ti-rsi'), uEl = document.getElementById('ti-u');
  const dResEl = document.getElementById('ti-res-desc');

  function updateFromR(R) {
    if (R <= 0) return;
    // Metric RSI = R / 5.678263
    const rsi = R / 5.678263;
    // U = 1 / R
    const u = 1 / R;

    rsiEl.value = rsi.toFixed(2);
    uEl.value = u.toFixed(3);

    if (R < 10) dResEl.textContent = 'Single/Double Pane Window (R-1 to R-5)';
    else if (R < 16) dResEl.textContent = '2x4 Exterior Wall Cavity (R-13 to R-15)';
    else if (R < 25) dResEl.textContent = '2x6 Exterior Wall / Crawlspace (R-19 to R-21)';
    else if (R < 40) dResEl.textContent = 'Attic Ceiling Insulation (R-30 to R-38)';
    else dResEl.textContent = 'Cold Climate Super-Insulated Attic (R-49 to R-60)';
  }

  rEl.addEventListener('input', () => {
    const v = parseFloat(rEl.value);
    if (!isNaN(v) && v > 0) updateFromR(v);
  });

  rsiEl.addEventListener('input', () => {
    const v = parseFloat(rsiEl.value);
    if (!isNaN(v) && v > 0) {
      const R = v * 5.678263;
      rEl.value = R.toFixed(1);
      updateFromR(R);
    }
  });

  uEl.addEventListener('input', () => {
    const v = parseFloat(uEl.value);
    if (!isNaN(v) && v > 0) {
      const R = 1 / v;
      rEl.value = R.toFixed(1);
      updateFromR(R);
    }
  });

  updateFromR(13);
})();`,
    howToSteps: [
      'Enter imperial R-Value, metric RSI, or thermal transmittance U-Factor.',
      'Inspect reciprocal heat conductivity rates and residential building code envelope standards (walls, ceilings, attics).'
    ],
    benefitTitle: 'The Reciprocal Relationship (U = 1 / R)',
    benefitContent: 'R-value measures thermal resistance (insulating ability), whereas U-factor measures thermal transmittance (rate of heat loss). Higher R-values and lower U-factors mean superior thermal efficiency.',
    faqs: [{ q: 'What is R-value for an R-30 attic in metric RSI?', a: 'R-30 equals approximately RSI 5.28 m²·K/W (U-Factor = 0.033 BTU/(h·ft²·°F)).' }]
  },

  // 3. Reinforcement Steel Rebar Weight Calculator
  {
    slug: 'rebar-weight-reinforcement-steel-calculator',
    name: 'Reinforcing Steel Rebar Weight & Sizing Calculator',
    description: 'Calculate total linear weight (lbs and kg) for standard ASTM reinforcing steel rebar sizes (#3 to #10) across total rod lengths.',
    category: 'Daily',
    icon: 'text',
    keywords: ['rebar weight calculator', 'rebar weight per foot chart', 'astm rebar size weight calculator', 'reinforcement steel weight formula', 'metric rebar weight kg per meter'],
    order: 331,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Rebar Size (# Number) & Total Running Length',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="reb-size">ASTM Rebar Size</label>
          <select class="tool-textarea" id="reb-size">
            <option value="0.376,0.560">#3 Rebar (3/8" / 9.5 mm - 0.376 lb/ft)</option>
            <option value="0.668,0.994" selected>#4 Rebar (1/2" / 12.7 mm - 0.668 lb/ft)</option>
            <option value="1.043,1.552">#5 Rebar (5/8" / 15.9 mm - 1.043 lb/ft)</option>
            <option value="1.502,2.235">#6 Rebar (3/4" / 19.1 mm - 1.502 lb/ft)</option>
            <option value="2.044,3.042">#7 Rebar (7/8" / 22.2 mm - 2.044 lb/ft)</option>
            <option value="2.670,3.973">#8 Rebar (1" / 25.4 mm - 2.670 lb/ft)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="reb-len">Total Length (Feet)</label>
          <input class="tool-textarea" id="reb-len" type="number" step="any" value="500" placeholder="500 ft" />
        </div>
      </div>
      <div id="reb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="reb-res-lbs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">334.0 lbs</span>
            <span class="stat-label">Total Weight in Pounds</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="reb-res-kg" style="font-weight:700;">151.5 kg (0.151 Tons)</span>
            <span class="stat-label">Total Weight in Kilograms</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const szEl = document.getElementById('reb-size'), lEl = document.getElementById('reb-len');
  const lbsResEl = document.getElementById('reb-res-lbs'), kgResEl = document.getElementById('reb-res-kg');

  function update() {
    const [lbPerFt, kgPerM] = szEl.value.split(',').map(Number);
    const lenFt = parseFloat(lEl.value);
    if (isNaN(lenFt) || lenFt <= 0 || !lbPerFt) return;

    const totalLbs = lenFt * lbPerFt;
    const totalKg = totalLbs * 0.453592;
    const totalTons = totalKg / 1000;

    lbsResEl.textContent = totalLbs.toFixed(1) + ' lbs';
    kgResEl.textContent = totalKg.toFixed(1) + ' kg (' + totalTons.toFixed(3) + ' metric tons)';
  }

  szEl.addEventListener('change', update);
  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select standard ASTM rebar size (#3 to #8).',
      'Enter total continuous running length in feet.',
      'Inspect total steel weight in pounds (lbs), kilograms (kg), and metric tons.'
    ],
    benefitTitle: 'ASTM Rebar Standard Sizing System',
    benefitContent: 'In the US customary system, rebar size numbers represent bar diameter in eighths of an inch (e.g. #4 rebar is 4/8" = 0.5 inches diameter = 12.7 mm).',
    faqs: [{ q: 'What is the weight per foot of #4 rebar?', a: 'Standard #4 steel rebar weighs exactly 0.668 lbs per linear foot (0.994 kg/m).' }]
  },

  // 4. Roof Pitch, Slope Angle & Rafter Length Multiplier Calculator
  {
    slug: 'roof-pitch-slope-angle-multiplier-calculator',
    name: 'Roof Pitch, Slope Angle & Rafter Multiplier Calculator',
    description: 'Convert roof pitch (Rise/12, e.g. 6/12 pitch) into slope angle (degrees), grade percentage (%), and rafter length expansion multiplier.',
    category: 'Daily',
    icon: 'text',
    keywords: ['roof pitch calculator', 'roof slope angle calculator', 'rafter length multiplier formula', 'pitch to degrees converter roof', '6 12 roof pitch angle online'],
    order: 332,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Roof Pitch (Inches of Rise per 12 Inches Run)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="rp-rise">Roof Rise (Inches per 12" Run)</label>
        <input class="tool-textarea" id="rp-rise" type="number" min="1" max="24" step="0.5" value="6" placeholder="6 (for 6/12 pitch)" />
      </div>
      <div id="rp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rp-res-angle" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">26.57°</span>
            <span class="stat-label">Roof Slope Angle</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rp-res-mult" style="font-weight:700;">1.1180</span>
            <span class="stat-label">Rafter Length Multiplier</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rp-res-grade">50.0% Grade</span>
            <span class="stat-label">Slope Percentage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rp-rise');
  const aResEl = document.getElementById('rp-res-angle'), mResEl = document.getElementById('rp-res-mult'), gResEl = document.getElementById('rp-res-grade');

  function update() {
    const rise = parseFloat(rEl.value);
    if (isNaN(rise) || rise <= 0) return;

    // Angle = atan(rise / 12) in degrees
    const rad = Math.atan(rise / 12);
    const deg = (rad * 180) / Math.PI;

    // Rafter multiplier = sqrt(12^2 + rise^2) / 12
    const rafterMult = Math.sqrt(144 + Math.pow(rise, 2)) / 12;
    const gradePct = (rise / 12) * 100;

    aResEl.textContent = deg.toFixed(2) + '°';
    mResEl.textContent = rafterMult.toFixed(4);
    gResEl.textContent = gradePct.toFixed(1) + '% Grade';
  }

  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter roof vertical rise in inches per 12 inches of horizontal run (e.g. 4, 6, 8, 12).',
      'Inspect roof slope angle in degrees, slope grade percentage, and rafter multiplication factor.'
    ],
    benefitTitle: 'Calculating True Rafter Length',
    benefitContent: 'Multiply building half-span by the rafter multiplier to calculate the exact hypotenuse length of common roof rafters without measuring on high ladders.',
    faqs: [{ q: 'What angle is a standard 6/12 roof pitch?', a: 'A 6/12 pitch has an angle of arctan(6/12) ≈ 26.57° and a rafter multiplier of 1.1180.' }]
  },

  // 5. Gravel, Sand & Aggregate Tonnage Calculator
  {
    slug: 'gravel-sand-aggregate-tonnage-calculator',
    name: 'Gravel, Sand & Aggregate Tonnage Calculator',
    description: 'Calculate volume (Cubic Yards / m³) and estimated weight (US Tons and Metric Tonnes) for gravel, crushed stone, sand, and landscape mulch.',
    category: 'Daily',
    icon: 'text',
    keywords: ['gravel tonnage calculator', 'crushed stone tons calculator', 'sand gravel cubic yards to tons', 'landscape aggregate calculator online', 'cubic yards of gravel to tons formula'],
    order: 333,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Coverage Dimensions & Material Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="grv-mat">Material Type</label>
          <select class="tool-textarea" id="grv-mat">
            <option value="1.4" selected>Crushed Stone / Gravel (1.4 tons / cu yd)</option>
            <option value="1.3">Dry River Sand (1.3 tons / cu yd)</option>
            <option value="1.1">Topsoil (1.1 tons / cu yd)</option>
            <option value="0.4">Wood Mulch / Bark (0.4 tons / cu yd)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="grv-len">Length (Feet)</label>
          <input class="tool-textarea" id="grv-len" type="number" step="any" value="30" placeholder="30 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grv-wid">Width (Feet)</label>
          <input class="tool-textarea" id="grv-wid" type="number" step="any" value="10" placeholder="10 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grv-depth">Depth (Inches)</label>
          <input class="tool-textarea" id="grv-depth" type="number" step="any" value="3" placeholder="3 in" />
        </div>
      </div>
      <div id="grv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="grv-res-tons" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.89 US Tons</span>
            <span class="stat-label">Total Material Weight</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="grv-res-yds" style="font-weight:700;">2.78 Cu. Yds</span>
            <span class="stat-label">Total Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('grv-mat'), lEl = document.getElementById('grv-len'), wEl = document.getElementById('grv-wid'), dEl = document.getElementById('grv-depth');
  const tResEl = document.getElementById('grv-res-tons'), yResEl = document.getElementById('grv-res-yds');

  function update() {
    const density = parseFloat(mEl.value);
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), depthIn = parseFloat(dEl.value);
    if (isNaN(density) || isNaN(L) || isNaN(W) || isNaN(depthIn) || L <= 0 || W <= 0 || depthIn <= 0) return;

    // Cubic feet = L * W * (depth / 12)
    const cuFt = L * W * (depthIn / 12);
    const cuYds = cuFt / 27;
    const cuMeters = cuYds * 0.764555;

    // Total US tons = cuYds * density
    const usTons = cuYds * density;
    const metricTonnes = usTons * 0.907185;

    tResEl.textContent = usTons.toFixed(2) + ' US Tons (' + metricTonnes.toFixed(2) + ' Metric Tonnes)';
    yResEl.textContent = cuYds.toFixed(2) + ' Cu. Yds (' + cuMeters.toFixed(2) + ' m³)';
  }

  [mEl, lEl, wEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select landscape aggregate material (Gravel, Crushed Stone, Sand, Topsoil, or Mulch).',
      'Enter driveway or garden bed length and width in feet, and aggregate depth in inches.',
      'Inspect required material volume in cubic yards and delivery order weight in US tons and metric tonnes.'
    ],
    benefitTitle: 'Material Density Ordering Accuracy',
    benefitContent: 'Landscape suppliers sell bulk material by the ton or cubic yard; crushed gravel typically weighs ~2,800 lbs per cubic yard (~1.4 US tons/cu yd).',
    faqs: [{ q: 'How many tons of gravel are needed for a 30 ft × 10 ft driveway with 3" depth?', a: 'Volume is ~2.78 cubic yards; at 1.4 tons/cu yd, you will need approximately 3.89 US Tons of crushed gravel.' }]
  }
];

toolsSuiteDD.forEach(createTool);
console.log('Suite DD complete: 5 tools created.');
