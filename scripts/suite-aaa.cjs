const { createTool } = require('./generate-curated-tools.cjs');

// Suite AAA: 5 Tools in Mineral Processing, Ball Mill Grinding & Slurry Calculations to reach 573 tools
const toolsSuiteAAA = [
  // 1. Bond Work Index Grinding Specific Energy Calculator
  {
    slug: 'bond-work-index-grinding-energy-calculator',
    name: 'Bond Work Index (Grinding Energy) Calculator',
    description: 'Calculate specific electrical energy required (W = 10 · W_i · (1 / √P₈₀ - 1 / √F₈₀)) in kWh per metric ton for comminution ball mills and rod mills from Bond Work Index (W_i).',
    category: 'Science',
    icon: 'text',
    keywords: ['bond work index calculator', 'ball mill grinding energy formula', 'fred c bond comminution equation', 'specific energy kwh per ton grinding', 'mineral processing grinding calculator online'],
    order: 446,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bond Work Index W_i (kWh/t), Feed F₈₀ (μm) & Product P₈₀ (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bnd-wi">Work Index W_i (kWh/t)</label>
          <input class="tool-textarea" id="bnd-wi" type="number" step="any" value="14.5" placeholder="14.5 kWh/t (Copper Ore)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-f80">Feed Size F₈₀ (μm)</label>
          <input class="tool-textarea" id="bnd-f80" type="number" step="any" value="2500" placeholder="2500 μm (2.5 mm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-p80">Product Size P₈₀ (μm)</label>
          <input class="tool-textarea" id="bnd-p80" type="number" step="any" value="75" placeholder="75 μm (200 Mesh)" />
        </div>
      </div>
      <div id="bnd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bnd-res-w" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">13.84 kWh / t</span>
            <span class="stat-label">Specific Grinding Energy (W)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bnd-res-ratio" style="font-weight:700;">33.3x Reduction Ratio</span>
            <span class="stat-label">Size Reduction (F₈₀ / P₈₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wiEl = document.getElementById('bnd-wi'), f80El = document.getElementById('bnd-f80'), p80El = document.getElementById('bnd-p80');
  const wResEl = document.getElementById('bnd-res-w'), rResEl = document.getElementById('bnd-res-ratio');

  function update() {
    const Wi = parseFloat(wiEl.value), F80 = parseFloat(f80El.value), P80 = parseFloat(p80El.value);
    if (isNaN(Wi) || isNaN(F80) || isNaN(P80) || Wi <= 0 || F80 <= P80 || P80 <= 0) return;

    // Bond's Law: W = 10 * Wi * ( (1 / sqrt(P80)) - (1 / sqrt(F80)) )  [kWh / metric ton]
    const W = 10 * Wi * ((1 / Math.sqrt(P80)) - (1 / Math.sqrt(F80)));
    const reductionRatio = F80 / P80;

    wResEl.textContent = W.toFixed(2) + ' kWh / metric ton';
    rResEl.textContent = reductionRatio.toFixed(1) + 'x (F₈₀ ' + F80 + 'μm → P₈₀ ' + P80 + 'μm)';
  }

  [wiEl, f80El, p80El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ore hardness Bond Work Index W_i in kWh/metric ton (typically 10 to 18 kWh/t for hard rock ores).',
      'Enter 80% passing feed size F₈₀ in micrometers (μm).',
      'Enter target 80% passing product grind size P₈₀ in micrometers (e.g. 75 μm for mineral flotation liberation).',
      'Inspect required specific electrical grinding power in kWh/ton.'
    ],
    benefitTitle: 'Fred C. Bond\'s 1952 Third Theory of Comminution',
    benefitContent: 'Bond\'s grinding equation forms the universal engineering standard for sizing SAG mills and ball mills in large mining operations, showing that energy scales with the crack length formed during particle breakage (W ∝ 1/√P₈₀ - 1/√F₈₀).',
    faqs: [{ q: 'What is 80% passing size (P₈₀)?', a: 'P₈₀ is the particle diameter in micrometers through which exactly 80% of the cumulative ground product mass will pass in laboratory sieve sizing.' }]
  },

  // 2. Ball Mill Critical Speed (RPM) Calculator
  {
    slug: 'ball-mill-critical-speed-rpm-calculator',
    name: 'Ball Mill Critical Speed (RPM) & Operating Speed Calculator',
    description: 'Calculate theoretical ball mill critical speed (N_c = 42.29 / √D) in RPM and recommended operating tumbling speed (typically 70% to 75% of N_c).',
    category: 'Science',
    icon: 'text',
    keywords: ['ball mill critical speed calculator', 'ball mill rpm formula', 'nc 42.29 over sqrt d online', 'ball mill tumbling cataracting speed calculator', 'sag mill critical rotational speed online'],
    order: 447,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mill Internal Diameter D (Meters or Feet) & Operating Fraction (% N_c)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bm-diam">Inside Shell Diameter D (m)</label>
          <input class="tool-textarea" id="bm-diam" type="number" step="any" value="4.5" placeholder="4.5 m (15 ft Diameter)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-pct">Operating Speed (% of Critical)</label>
          <input class="tool-textarea" id="bm-pct" type="number" min="50" max="95" value="75" placeholder="75% (Optimum Cataracting)" />
        </div>
      </div>
      <div id="bm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bm-res-nop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">14.95 RPM</span>
            <span class="stat-label">Optimal Operating Speed (N_op)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bm-res-nc" style="font-weight:700;">19.93 RPM (Critical Speed N_c)</span>
            <span class="stat-label">Centrifuging Critical Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('bm-diam'), pEl = document.getElementById('bm-pct');
  const nopResEl = document.getElementById('bm-res-nop'), ncResEl = document.getElementById('bm-res-nc');

  function update() {
    const D = parseFloat(dEl.value), pct = parseFloat(pEl.value);
    if (isNaN(D) || isNaN(pct) || D <= 0 || pct <= 0) return;

    // Critical speed in metric units: N_c = 42.29 / sqrt(D)  [RPM]
    const Nc = 42.29 / Math.sqrt(D);
    // Operating speed N_op = Nc * (pct / 100)
    const Nop = Nc * (pct / 100);

    nopResEl.textContent = Nop.toFixed(2) + ' RPM (' + pct + '% of N_c)';
    ncResEl.textContent = Nc.toFixed(2) + ' RPM (100% Centrifuging Threshold)';
  }

  dEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter internal mill shell inside diameter inside liners in meters.',
      'Enter target operating percentage of critical speed (70% to 75% standard for optimum cataracting impact grinding).',
      'Inspect optimal operating rotational speed and critical centrifuging RPM.'
    ],
    benefitTitle: 'Cascading vs Cataracting Grinding Regimes',
    benefitContent: 'At 70-75% of critical speed, grinding steel balls are carried high up the mill shell before projecting downward in a parabolic free-fall trajectory (cataracting), delivering maximum impact energy to shatter hard ore chunks.',
    faqs: [{ q: 'What happens if a ball mill runs at 100% critical speed?', a: 'Centrifugal force equals gravity, causing all steel balls and ore to stick permanently against the rotating liner wall (centrifuging), completely halting grinding.' }]
  },

  // 3. Froth Flotation Mineral Recovery & Concentrate Grade Calculator
  {
    slug: 'froth-flotation-recovery-rate-calculator',
    name: 'Froth Flotation Recovery Rate & Concentration Ratio Calculator',
    description: 'Calculate metallurgical recovery percentage (R = 100 · c · (f - t) / (f · (c - t))) and ratio of concentration (K = (c - t) / (f - t)) from feed (f), concentrate (c), and tailings (t) assays.',
    category: 'Science',
    icon: 'text',
    keywords: ['flotation recovery calculator', 'mineral processing recovery formula', 'concentration ratio flotation online', 'metallurgical recovery percentage calculator', 'feed concentrate tailings assay formula'],
    order: 448,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feed Grade f (%), Concentrate Grade c (%) & Tailings Grade t (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="flt-f">Feed Grade f (%)</label>
          <input class="tool-textarea" id="flt-f" type="number" step="any" value="0.75" placeholder="0.75% Cu (Feed Ore)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-c">Concentrate c (%)</label>
          <input class="tool-textarea" id="flt-c" type="number" step="any" value="28.0" placeholder="28.0% Cu (Clean Con)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-t">Tailings Grade t (%)</label>
          <input class="tool-textarea" id="flt-t" type="number" step="any" value="0.08" placeholder="0.08% Cu (Waste Tailings)" />
        </div>
      </div>
      <div id="flt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="flt-res-rec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">89.79% Recovery</span>
            <span class="stat-label">Metallurgical Mineral Recovery (R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="flt-res-k" style="font-weight:700;">41.67 : 1 Ratio</span>
            <span class="stat-label">Ratio of Concentration (K = F / C)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('flt-f'), cEl = document.getElementById('flt-c'), tEl = document.getElementById('flt-t');
  const recResEl = document.getElementById('flt-res-rec'), kResEl = document.getElementById('flt-res-k');

  function update() {
    const f = parseFloat(fEl.value), c = parseFloat(cEl.value), t = parseFloat(tEl.value);
    if (isNaN(f) || isNaN(c) || isNaN(t) || f <= t || c <= f || t < 0) return;

    // Two-product metallurgical mass balance:
    // Recovery R = 100 * (c * (f - t)) / (f * (c - t))
    const recovery = 100 * ((c * (f - t)) / (f * (c - t)));
    // Ratio of Concentration K = (c - t) / (f - t)
    const K = (c - t) / (f - t);
    // Enrichment ratio = c / f
    const enrichment = c / f;

    recResEl.textContent = recovery.toFixed(2) + '% Recovery';
    kResEl.textContent = K.toFixed(2) + ' : 1 (Enrichment ' + enrichment.toFixed(1) + 'x)';
  }

  [fEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plant assay head grade in feed ore (f%).',
      'Enter final flotation concentrate grade (c%).',
      'Enter discharged plant tailings waste grade (t%).',
      'Inspect overall metallurgical recovery efficiency (R%) and ratio of concentration (K).'
    ],
    benefitTitle: 'Two-Product Metallurgical Mass Balance',
    benefitContent: 'Using conservation of metal mass and total pulp mass, the classic two-product formula calculates overall plant extraction efficiency directly from chemical assays without requiring physical weight scales.',
    faqs: [{ q: 'What does a Concentration Ratio of 40:1 mean?', a: 'It means 40 metric tons of raw mined feed ore must be processed through the flotation plant to produce 1 metric ton of high-grade copper concentrate.' }]
  },

  // 4. Slurry Specific Gravity & Percent Solids (w/w, v/v) Calculator
  {
    slug: 'slurry-specific-gravity-solids-calculator',
    name: 'Mineral Slurry Specific Gravity & Percent Solids Calculator',
    description: 'Calculate slurry pulp density (SG_slurry = 100 / (C_w / SG_solids + (100 - C_w) / 1.0)), volume percent solids (C_v), and dry solid tonnage in mineral pipelines.',
    category: 'Science',
    icon: 'text',
    keywords: ['slurry specific gravity calculator', 'pulp density percent solids formula', 'slurry weight solids to volume solids', 'marcy scale pulp density online', 'mineral processing slurry sg calculator'],
    order: 449,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solids True Density SG_s & Percent Solids by Weight (C_w in %)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sl-sgs">Solid True Density SG_s</label>
          <input class="tool-textarea" id="sl-sgs" type="number" step="any" value="2.70" placeholder="2.70 (Quartz / Granite Ore)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sl-cw">Percent Solids by Weight (%)</label>
          <input class="tool-textarea" id="sl-cw" type="number" min="1" max="85" value="50" placeholder="50% Solids" />
        </div>
      </div>
      <div id="sl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sl-res-sgm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.460 SG (1,460 g/L)</span>
            <span class="stat-label">Slurry Bulk Specific Gravity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sl-res-cv" style="font-weight:700;">27.0% by Volume</span>
            <span class="stat-label">Volume Percent Solids (C_v)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sgsEl = document.getElementById('sl-sgs'), cwEl = document.getElementById('sl-cw');
  const sgmResEl = document.getElementById('sl-res-sgm'), cvResEl = document.getElementById('sl-res-cv');

  function update() {
    const SG_s = parseFloat(sgsEl.value), Cw = parseFloat(cwEl.value);
    if (isNaN(SG_s) || isNaN(Cw) || SG_s <= 1.0 || Cw <= 0 || Cw >= 100) return;

    // SG_slurry = 100 / ( (Cw / SG_s) + ( (100 - Cw) / 1.0 ) )
    const SG_m = 100 / ((Cw / SG_s) + (100 - Cw));
    // Volume percent solids: Cv = (Cw * SG_m) / SG_s
    const Cv = (Cw * SG_m) / SG_s;
    const dryGramsPerLiter = SG_m * (Cw / 100) * 1000;

    sgmResEl.textContent = SG_m.toFixed(3) + ' SG (' + Math.round(SG_m * 1000) + ' kg/m³)';
    cvResEl.textContent = Cv.toFixed(1) + '% Solids (Dry ' + Math.round(dryGramsPerLiter) + ' g/L)';
  }

  sgsEl.addEventListener('input', update);
  cwEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter dry ore particle specific gravity SG_s (typically 2.65 to 3.20 for rock minerals).',
      'Enter percentage solids by weight in slurry C_w (typically 45% to 65% in hydrocyclone feed).',
      'Inspect bulk slurry pulp density in SG (g/cm³), volumetric percent solids (C_v%), and dry solid grams per liter.'
    ],
    benefitTitle: 'Direct Marcy Scale Slurry Calibration',
    benefitContent: 'In mineral processing plants, operators use Marcy density scales calibrated with these exact formulas to measure slurry weight percent solids in real time, preventing pipeline sanding and clogs.',
    faqs: [{ q: 'What is the specific gravity of a 50% solids slurry with ore SG = 2.70?', a: 'SG_slurry = 100 / ((50 / 2.70) + 50) = 100 / (18.52 + 50) = 100 / 68.52 ≈ 1.459 SG.' }]
  },

  // 5. Hydrocyclone Classification Cut Size (d₅₀) Estimation Calculator
  {
    slug: 'hydrocyclone-cut-size-d50-calculator',
    name: 'Hydrocyclone Classification Cut Size (d₅₀) Calculator',
    description: 'Estimate hydrocyclone separation cut size (d₅₀) in micrometers from cyclone body diameter (D_c in cm), operating pressure drop (P in kPa), and feed percent solids.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydrocyclone cut size calculator', 'd50 cyclone formula online', 'plitt hydrocyclone model calculator', 'cyclone classification separation size', 'mineral processing hydrocyclone sizing online'],
    order: 450,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cyclone Diameter D_c (cm), Pressure Drop ΔP (kPa) & Solids Vol %',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hc-dc">Cyclone Diameter D_c (cm)</label>
          <input class="tool-textarea" id="hc-dc" type="number" step="any" value="25" placeholder="25 cm (10-inch Cyclone)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-dp">Pressure Drop ΔP (kPa)</label>
          <input class="tool-textarea" id="hc-dp" type="number" step="any" value="100" placeholder="100 kPa (~14.5 psi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-cv">Feed Solids (Vol %)</label>
          <input class="tool-textarea" id="hc-cv" type="number" min="1" max="40" value="15" placeholder="15% Vol Solids" />
        </div>
      </div>
      <div id="hc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hc-res-d50" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">56.8 μm</span>
            <span class="stat-label">Estimated Cut Size (d₅₀c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hc-res-mesh" style="font-weight:700;">~270 Tyler Mesh</span>
            <span class="stat-label">Standard Sieve Equivalent</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dcEl = document.getElementById('hc-dc'), dpEl = document.getElementById('hc-dp'), cvEl = document.getElementById('hc-cv');
  const d50ResEl = document.getElementById('hc-res-d50'), mshResEl = document.getElementById('hc-res-mesh');

  function update() {
    const Dc = parseFloat(dcEl.value), dP = parseFloat(dpEl.value), Cv = parseFloat(cvEl.value);
    if (isNaN(Dc) || isNaN(dP) || isNaN(Cv) || Dc <= 0 || dP <= 0 || Cv <= 0) return;

    // Empirical Lynch-Rao hydrocyclone base d50 model:
    // d50 (microns) ≈ 2.8 * (Dc^0.65) * exp(0.063 * Cv) / (dP^0.28)
    const d50 = (2.8 * Math.pow(Dc, 0.65) * Math.exp(0.063 * Cv)) / Math.pow(dP, 0.28);

    let meshName = '';
    if (d50 > 150) meshName = '~100 Mesh (Coarse)';
    else if (d50 > 105) meshName = '~140 Mesh';
    else if (d50 > 74) meshName = '~200 Mesh Standard Flotation';
    else if (d50 > 53) meshName = '~270 Mesh Fine';
    else if (d50 > 44) meshName = '~325 Mesh Very Fine';
    else meshName = '~400+ Mesh Ultrafine';

    d50ResEl.textContent = d50.toFixed(1) + ' μm';
    mshResEl.textContent = meshName;
  }

  [dcEl, dpEl, cvEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hydrocyclone inside barrel diameter D_c in centimeters (e.g. 10 cm, 25 cm, 50 cm).',
      'Enter operating inlet feed pressure drop ΔP in kPa (typically 70 to 150 kPa).',
      'Enter feed volume percent solids (C_v%).',
      'Inspect estimated separation cut point d₅₀ in micrometers (particles with 50% probability of reporting to underflow vs overflow).'
    ],
    benefitTitle: 'Centrifugal Gravity Ore Classification',
    benefitContent: 'Hydrocyclones use tangential fluid swirl to generate centrifugal forces hundreds of times greater than gravity, splitting coarse heavy sand to the spigot underflow for regrinding while fine liberated minerals overflow to froth flotation.',
    faqs: [{ q: 'What is cut size d₅₀?', a: 'd₅₀ is the particle diameter that has an exact 50/50 equal chance of reporting to either the cyclone overflow or underflow streams.' }]
  }
];

toolsSuiteAAA.forEach(createTool);
console.log('Suite AAA complete: 5 tools created.');
