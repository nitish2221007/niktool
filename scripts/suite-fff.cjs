const { createTool } = require('./generate-curated-tools.cjs');

// Suite FFF: 7 Tools in Drilling Hydraulics, Pipe Mechanics & Pressure Vessels to reach 600 tools
const toolsSuiteFFF = [
  // 1. Drill String Buoyancy Factor & Hook Load Calculator
  {
    slug: 'drill-pipe-buoyancy-factor-calculator',
    name: 'Drill String Buoyancy Factor & Hook Load Calculator',
    description: 'Calculate drilling fluid buoyancy factor (BF = 1 - (MW / 65.5) = (65.5 - MW) / 65.5) and submerged buoyed drill string hook load in petroleum drilling.',
    category: 'Science',
    icon: 'text',
    keywords: ['drill pipe buoyancy factor calculator', 'buoyancy factor 65.5 formula', 'buoyed hook load drilling calculator', 'mud weight drill string weight reduction', 'oil rig hook load buoyancy online'],
    order: 471,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Drilling Mud Weight (ppg) & Total String Air Weight (lbs / tons)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bf-mw">Mud Weight (ppg)</label>
          <input class="tool-textarea" id="bf-mw" type="number" step="0.1" value="12.5" placeholder="12.5 ppg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-air">Air Weight (k-lbs / 1000 lbs)</label>
          <input class="tool-textarea" id="bf-air" type="number" step="any" value="250" placeholder="250 klbs (250,000 lbs)" />
        </div>
      </div>
      <div id="bf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bf-res-bf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BF = 0.8092</span>
            <span class="stat-label">Buoyancy Factor (1 - MW/65.5)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-hook" style="font-weight:700;">202.3 klbs (91.8 Metric Tons)</span>
            <span class="stat-label">Buoyed Hook Load (Air Weight · BF)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mwEl = document.getElementById('bf-mw'), airEl = document.getElementById('bf-air');
  const bfResEl = document.getElementById('bf-res-bf'), hkResEl = document.getElementById('bf-res-hook');

  function update() {
    const mw = parseFloat(mwEl.value), airKlbs = parseFloat(airEl.value);
    if (isNaN(mw) || isNaN(airKlbs) || mw <= 0 || airKlbs <= 0) return;

    // Density of steel = 490 lbs/cu ft = 65.5 ppg
    // Buoyancy Factor BF = 1 - (MW / 65.5)
    const BF = 1 - (mw / 65.5);
    const buoyedKlbs = airKlbs * BF;
    const buoyedMetricTons = buoyedKlbs * 0.453592;
    const reducedPct = (1 - BF) * 100;

    bfResEl.textContent = 'BF = ' + BF.toFixed(4) + ' (' + reducedPct.toFixed(1) + '% Weight Relief)';
    hkResEl.textContent = buoyedKlbs.toFixed(1) + ' klbs (' + buoyedMetricTons.toFixed(1) + ' Metric Tons)';
  }

  mwEl.addEventListener('input', update);
  airEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter drilling mud density in pounds per gallon (ppg).',
      'Enter total drill string weight in air in thousand-pounds (klbs).',
      'Inspect Archimedean buoyancy factor (BF) and true submerged hook load tension.'
    ],
    benefitTitle: 'Steel Density in Petroleum Units (65.5 ppg)',
    benefitContent: 'Because structural drill pipe steel weighs 490 lbs/cu ft (65.5 ppg), drilling mud floats and supports a significant fraction of heavy drill strings, reducing derrick mast loads and rig tension.',
    faqs: [{ q: 'What is the buoyed weight of a 300,000 lb drill string in 13.1 ppg mud?', a: 'BF = 1 - (13.1 / 65.5) = 0.80; Buoyed hook load = 300,000 × 0.80 = 240,000 lbs (60,000 lbs buoyed reduction).' }]
  },

  // 2. Wellbore Annular Velocity & Cuttings Transport Calculator
  {
    slug: 'wellbore-annular-velocity-cuttings-transport-calculator',
    name: 'Wellbore Annular Velocity & Cuttings Transport Calculator',
    description: 'Calculate drilling fluid annular flow speed (AV = (24.5 · Q) / (D_hole² - D_pipe²)) in ft/min and meters/min to ensure efficient drill cuttings hole cleaning.',
    category: 'Science',
    icon: 'text',
    keywords: ['annular velocity calculator drilling', 'cuttings transport velocity formula', '24.5 q over dh2 minus dp2 online', 'drilling mud annular velocity ft min calculator', 'hole cleaning annular velocity online'],
    order: 472,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pump Flow Rate Q (GPM), Hole Diameter D_h (in) & Pipe Outer Diameter D_p (in)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="av-q">Mud Flow Q (GPM)</label>
          <input class="tool-textarea" id="av-q" type="number" step="any" value="550" placeholder="550 GPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="av-dh">Hole Diameter D_h (in)</label>
          <input class="tool-textarea" id="av-dh" type="number" step="any" value="8.50" placeholder="8.50 in (Bit Size)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="av-dp">Pipe OD D_p (in)</label>
          <input class="tool-textarea" id="av-dp" type="number" step="any" value="5.00" placeholder="5.00 in (Drill Pipe)" />
        </div>
      </div>
      <div id="av-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="av-res-av" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">285.2 ft / min</span>
            <span class="stat-label">Annular Velocity (AV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="av-res-clean" style="color:var(--green-dark); font-weight:700;">EXCELLENT Hole Cleaning (> 150 ft/min)</span>
            <span class="stat-label">Cuttings Transport Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('av-q'), dhEl = document.getElementById('av-dh'), dpEl = document.getElementById('av-dp');
  const avResEl = document.getElementById('av-res-av'), clResEl = document.getElementById('av-res-clean');

  function update() {
    const Q = parseFloat(qEl.value), Dh = parseFloat(dhEl.value), Dp = parseFloat(dpEl.value);
    if (isNaN(Q) || isNaN(Dh) || isNaN(Dp) || Q <= 0 || Dh <= Dp || Dp <= 0) return;

    // AV (ft / min) = (24.5 * Q) / (Dh^2 - Dp^2)
    const areaDiff = Math.pow(Dh, 2) - Math.pow(Dp, 2);
    const AV_ft_min = (24.5 * Q) / areaDiff;
    const AV_m_min = AV_ft_min * 0.3048;

    avResEl.textContent = AV_ft_min.toFixed(1) + ' ft / min (' + AV_m_min.toFixed(1) + ' m/min)';

    if (AV_ft_min >= 150) {
      clResEl.textContent = 'EXCELLENT Hole Cleaning (AV ≥ 150 ft/min: Cuttings Cleared)';
      clResEl.style.color = '#22543d';
    } else if (AV_ft_min >= 100) {
      clResEl.textContent = 'ACCEPTABLE for Vertical Holes (AV 100 - 150 ft/min)';
      clResEl.style.color = '#2563eb';
    } else {
      clResEl.textContent = 'WARNING: Low Annular Velocity (AV < 100 ft/min: Risk of Stuck Pipe)';
      clResEl.style.color = '#c53030';
    }
  }

  [qEl, dhEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mud pump circulation discharge flow rate Q in GPM.',
      'Enter open hole or casing internal diameter D_h in inches.',
      'Enter drill pipe or drill collar outside diameter D_p in inches.',
      'Inspect upward annular mud speed in ft/min and hole cleaning safety status.'
    ],
    benefitTitle: 'Preventing Stuck Drill Strings & Pack-Offs',
    benefitContent: 'Maintaining an annular mud velocity of at least 120-180 ft/min ensures drill cuttings are carried upward faster than their gravitational slip velocity, preventing cuttings bed accumulation in deviated shale wells.',
    faqs: [{ q: 'What is the annular velocity for 500 GPM in an 8.5" hole with 5" pipe?', a: 'AV = (24.5 × 500) / (8.5² - 5.0²) = 12,250 / (72.25 - 25) = 12,250 / 47.25 ≈ 259.3 ft/min.' }]
  },

  // 3. Pipe Internal Burst Pressure (Barlow's Formula) Calculator
  {
    slug: 'pipe-burst-pressure-barlow-formula-calculator',
    name: 'Pipe Internal Burst Pressure (Barlow\'s Formula) Calculator',
    description: 'Calculate pipe internal burst yield pressure (P = (2 · S · t) / D) and maximum allowable operating pressure (MAOP) per ASME B31.3 and B31.8 pipeline standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['barlow formula pipe calculator', 'internal burst pressure pipe formula', 'pipe wall thickness burst pressure calculator', 'maop asme b31 pipeline burst calculator', 'pipe hoop stress yield pressure online'],
    order: 473,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Material Yield S (psi / MPa), Wall Thickness t (in) & Outer Diameter D (in)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bp-s">Yield Strength S (psi)</label>
          <input class="tool-textarea" id="bp-s" type="number" step="any" value="52000" placeholder="52,000 psi (API 5L X52)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-t">Wall Thickness t (in)</label>
          <input class="tool-textarea" id="bp-t" type="number" step="any" value="0.375" placeholder="0.375 in (3/8 in)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-d">Outer Diameter D (in)</label>
          <input class="tool-textarea" id="bp-d" type="number" step="any" value="12.75" placeholder="12.75 in (12-inch Pipe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-df">Design Factor (F)</label>
          <select class="tool-textarea" id="bp-df">
            <option value="0.72" selected>0.72 (ASME B31.8 Class 1 Rural Pipeline)</option>
            <option value="0.60">0.60 (Class 2 Commercial)</option>
            <option value="0.50">0.50 (Class 3 Residential Area)</option>
          </select>
        </div>
      </div>
      <div id="bp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bp-res-burst" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3,059 psi (210.9 bar)</span>
            <span class="stat-label">Theoretical Burst Pressure (100% SMYS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bp-res-maop" style="font-weight:700;">2,202 psi MAOP</span>
            <span class="stat-label">Max Operating Pressure (F · P_burst)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('bp-s'), tEl = document.getElementById('bp-t');
  const dEl = document.getElementById('bp-d'), dfEl = document.getElementById('bp-df');
  const bResEl = document.getElementById('bp-res-burst'), mResEl = document.getElementById('bp-res-maop');

  function update() {
    const S = parseFloat(sEl.value), t = parseFloat(tEl.value);
    const D = parseFloat(dEl.value), F = parseFloat(dfEl.value);

    if (isNaN(S) || isNaN(t) || isNaN(D) || isNaN(F) || S <= 0 || t <= 0 || D <= 0 || t >= D) return;

    // Barlow's Formula: P = (2 * S * t) / D  [psi]
    const pBurst = (2 * S * t) / D;
    const pMaop = pBurst * F;
    const pBurstBar = pBurst * 0.0689476;
    const pMaopBar = pMaop * 0.0689476;

    bResEl.textContent = Math.round(pBurst).toLocaleString() + ' psi (' + pBurstBar.toFixed(1) + ' bar)';
    mResEl.textContent = Math.round(pMaop).toLocaleString() + ' psi MAOP (' + pMaopBar.toFixed(1) + ' bar, F = ' + F + ')';
  }

  [sEl, tEl, dEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pipe Specified Minimum Yield Strength (SMYS) in psi (e.g. 35,000 for A53 Gr B, 52,000 for X52, 70,000 for X70).',
      'Enter nominal pipe wall thickness t and outer diameter D in inches.',
      'Select ASME B31 design safety factor F (0.72 rural, 0.50 urban).',
      'Inspect theoretical hoop stress yield burst pressure and Maximum Allowable Operating Pressure (MAOP).'
    ],
    benefitTitle: 'Peter Barlow\'s 1836 Thin-Walled Cylinder Law',
    benefitContent: 'Barlow\'s formula relates internal hydrostatic pressure to circumferential hoop stress (P = 2·S·t/D), establishing the worldwide code standard for pressurized oil, gas, and steam piping design.',
    faqs: [{ q: 'What is Barlow\'s formula for pipe burst pressure?', a: 'P = (2 · S · t) / D, where S is yield strength, t is wall thickness, and D is outside diameter.' }]
  },

  // 4. Pipe External Hydrostatic Collapse Pressure Calculator
  {
    slug: 'pipe-collapse-pressure-external-load-calculator',
    name: 'Pipe External Hydrostatic Collapse Pressure Calculator',
    description: 'Calculate critical external elastic collapse buckling pressure (P_cr = (2 · E / (1 - ν²)) · (t / D)³) for deep sea subsea pipelines and deep well casing strings.',
    category: 'Science',
    icon: 'text',
    keywords: ['pipe collapse pressure calculator', 'external collapse pressure pipe formula', 'subsea pipeline collapse calculator', 'api 5c3 casing collapse formula', 'deepwater pipe external pressure online'],
    order: 474,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Modulus E (psi / GPa), Wall Thickness t (in) & Outer Diameter D (in)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="clp-t">Wall Thickness t (in)</label>
          <input class="tool-textarea" id="clp-t" type="number" step="any" value="0.500" placeholder="0.500 in" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clp-d">Outer Diameter D (in)</label>
          <input class="tool-textarea" id="clp-d" type="number" step="any" value="9.625" placeholder="9.625 in (9-5/8 Casing)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clp-e">Steel Modulus E (psi)</label>
          <input class="tool-textarea" id="clp-e" type="number" step="any" value="30000000" placeholder="30,000,000 psi" />
        </div>
      </div>
      <div id="clp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="clp-res-pcr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4,625 psi (318.9 bar)</span>
            <span class="stat-label">Elastic Collapse Resistance (P_cr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="clp-res-depth" style="font-weight:700;">10,380 ft Water Depth</span>
            <span class="stat-label">Equivalent Deep Sea Hydrostatic Depth</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('clp-t'), dEl = document.getElementById('clp-d'), eEl = document.getElementById('clp-e');
  const pResEl = document.getElementById('clp-res-pcr'), dResEl = document.getElementById('clp-res-depth');

  const nu = 0.30; // Poisson ratio of steel

  function update() {
    const t = parseFloat(tEl.value), D = parseFloat(dEl.value), E = parseFloat(eEl.value);
    if (isNaN(t) || isNaN(D) || isNaN(E) || t <= 0 || D <= 0 || E <= 0 || t >= D) return;

    // Elastic collapse: P_cr = (2 * E / (1 - nu^2)) * (t / D)^3  [psi]
    const pcr = (2 * E / (1 - Math.pow(nu, 2))) * Math.pow(t / D, 3);
    const pcrBar = pcr * 0.0689476;
    // Seawater hydrostatic gradient ≈ 0.445 psi / ft
    const maxDepthFt = pcr / 0.4455;

    pResEl.textContent = Math.round(pcr).toLocaleString() + ' psi (' + pcrBar.toFixed(1) + ' bar)';
    dResEl.textContent = '~' + Math.round(maxDepthFt).toLocaleString() + ' ft (' + Math.round(maxDepthFt * 0.3048).toLocaleString() + ' m Seawater Depth)';
  }

  [tEl, dEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pipe wall thickness t and outer diameter D in inches.',
      'Enter steel Young\'s Modulus E (30,000,000 psi standard).',
      'Inspect critical external collapse buckling resistance in psi and equivalent ocean water depth.'
    ],
    benefitTitle: 'Cubic D/t Ratio Collapse Sensitivity',
    benefitContent: 'Unlike internal burst pressure which scales linearly with (t/D), external collapse resistance scales with the cube of wall thickness ratio ($(t/D)^3$), making thick-walled pipe mandatory for deepwater ocean installations.',
    faqs: [{ q: 'Why does a slight ovality drastically reduce collapse strength?', a: 'Even a 1% out-of-roundness imperfection creates asymmetric bending moments that trigger premature plastic collapse at less than half theoretical yield.' }]
  },

  // 5. Flange Bolt Preload Torque (T = K · F · d) Calculator
  {
    slug: 'flange-bolt-torque-preload-calculator',
    name: 'Flange Bolt Preload Torque (T = K · F · d) Calculator',
    description: 'Calculate required bolt tightening torque (T = K · F_preload · d) in ft-lbs and N·m to achieve target gasket clamping preload force without exceeding bolt proof load.',
    category: 'Science',
    icon: 'text',
    keywords: ['flange bolt torque calculator', 'bolt preload torque formula t k f d', 'nut factor k torque calculator', 'asme flange bolt tightening torque online', 'bolt proof load preload calculator'],
    order: 475,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bolt Diameter d (in), Target Preload F (kips) & Nut Factor K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tor-d">Bolt Diameter d (in)</label>
          <select class="tool-textarea" id="tor-d">
            <option value="0.75" selected>3/4" (0.75 in)</option>
            <option value="0.875">7/8" (0.875 in)</option>
            <option value="1.0">1" (1.00 in)</option>
            <option value="1.125">1-1/8" (1.125 in)</option>
            <option value="1.25">1-1/4" (1.25 in)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tor-f">Target Preload (kips)</label>
          <input class="tool-textarea" id="tor-f" type="number" step="any" value="28" placeholder="28 kips (70% Proof Load)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tor-k">Nut Friction Factor (K)</label>
          <select class="tool-textarea" id="tor-k">
            <option value="0.15" selected>0.15 (Lubricated with Anti-Seize Paste - Standard)</option>
            <option value="0.20">0.20 (As-Received Dry Steel)</option>
            <option value="0.12">0.12 (PTFE / Moly Coated)</option>
          </select>
        </div>
      </div>
      <div id="tor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tor-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">262.5 ft·lbs (355.9 N·m)</span>
            <span class="stat-label">Required Tightening Torque (T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tor-res-kn">124.5 kN Clamping Force</span>
            <span class="stat-label">Tensile Bolt Preload</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('tor-d'), fEl = document.getElementById('tor-f'), kEl = document.getElementById('tor-k');
  const tResEl = document.getElementById('tor-res-t'), knResEl = document.getElementById('tor-res-kn');

  function update() {
    const dIn = parseFloat(dEl.value), fKips = parseFloat(fEl.value), K = parseFloat(kEl.value);
    if (isNaN(dIn) || isNaN(fKips) || isNaN(K) || dIn <= 0 || fKips <= 0 || K <= 0) return;

    // Force in lbs = fKips * 1000
    const fLbs = fKips * 1000;
    // Torque T (ft-lbs) = (K * F * d) / 12
    const torqueFtLbs = (K * fLbs * dIn) / 12;
    const torqueNm = torqueFtLbs * 1.35582;
    const fKn = fKips * 4.44822;

    tResEl.textContent = torqueFtLbs.toFixed(1) + ' ft·lbs (' + Math.round(torqueNm) + ' N·m)';
    knResEl.textContent = fKn.toFixed(1) + ' kN Tensile Preload (' + Math.round(fLbs).toLocaleString() + ' lbs Clamping Force)';
  }

  [dEl, fEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select bolt nominal thread diameter in inches (3/4" to 1-1/4").',
      'Enter target gasket sealing preload force in thousands of pounds (kips) (typically 50% to 70% of bolt yield strength).',
      'Select thread friction nut factor K (0.15 with anti-seize lubricant, 0.20 dry).',
      'Inspect required calibrated torque wrench setting in ft-lbs and Newton-meters (N·m).'
    ],
    benefitTitle: 'The "Short Formula" T = K·F·d Torque Relation',
    benefitContent: 'Approximately 90% of applied bolt torque is consumed overcoming thread and under-head friction; using proper anti-seize lubricant (K = 0.15) ensures consistent, leak-free gasket compression.',
    faqs: [{ q: 'What is the torque for a 3/4" bolt with 28,000 lbs preload and K = 0.15?', a: 'T = (0.15 × 28,000 lbs × 0.75 in) / 12 = 3,150 / 12 = exactly 262.5 ft-lbs (355.9 N·m).' }]
  },

  // 6. O-Ring Groove Squeeze & Gland Compression Calculator
  {
    slug: 'o-ring-groove-squeeze-compression-calculator',
    name: 'O-Ring Groove Squeeze & Gland Compression Calculator',
    description: 'Calculate static and dynamic O-ring squeeze percentage (Squeeze % = (W - Depth) / W · 100) and groove volume fill percentage per Parker O-Ring Handbook standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['o ring squeeze calculator', 'o ring gland design calculator', 'parker o ring compression formula', 'o ring groove depth squeeze percentage online', 'static dynamic o ring seal calculator'],
    order: 476,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'O-Ring Cross Section W (in / mm) & Gland Depth (in / mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="or-w">O-Ring Cross Section W (in)</label>
          <select class="tool-textarea" id="or-w">
            <option value="0.070">AS568-0XX (0.070 in / 1.78 mm)</option>
            <option value="0.103">AS568-1XX (0.103 in / 2.62 mm)</option>
            <option value="0.139" selected>AS568-2XX (0.139 in / 3.53 mm)</option>
            <option value="0.210">AS568-3XX (0.210 in / 5.33 mm)</option>
            <option value="0.275">AS568-4XX (0.275 in / 6.99 mm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="or-depth">Gland Depth (in)</label>
          <input class="tool-textarea" id="or-depth" type="number" step="0.001" value="0.110" placeholder="0.110 in" />
        </div>
      </div>
      <div id="or-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="or-res-sq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">20.86% Squeeze</span>
            <span class="stat-label">Radial Squeeze Compression</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="or-res-status" style="color:var(--green-dark); font-weight:700;">OPTIMAL for Static Industrial Seals (15% - 30%)</span>
            <span class="stat-label">Parker Seal Standard</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('or-w'), dEl = document.getElementById('or-depth');
  const sqResEl = document.getElementById('or-res-sq'), stResEl = document.getElementById('or-res-status');

  function update() {
    const W = parseFloat(wEl.value), depth = parseFloat(dEl.value);
    if (isNaN(W) || isNaN(depth) || W <= 0 || depth <= 0 || depth >= W) {
      sqResEl.textContent = 'Depth must be less than O-Ring W';
      return;
    }

    // Squeeze % = ( (W - depth) / W ) * 100
    const squeezeInches = W - depth;
    const squeezePct = (squeezeInches / W) * 100;

    sqResEl.textContent = squeezePct.toFixed(2) + '% (' + (squeezeInches * 1000).toFixed(1) + ' mils / ' + (squeezeInches * 25.4).toFixed(2) + ' mm)';

    if (squeezePct >= 15 && squeezePct <= 30) {
      stResEl.textContent = 'OPTIMAL for Static Industrial Seals (15% to 30% Squeeze)';
      stResEl.style.color = '#22543d';
    } else if (squeezePct >= 8 && squeezePct < 15) {
      stResEl.textContent = 'OPTIMAL for Dynamic Reciprocating Piston/Rod Seals (10% to 15%)';
      stResEl.style.color = '#2563eb';
    } else if (squeezePct > 30) {
      stResEl.textContent = 'EXCESS SQUEEZE (> 30%: Risk of Elastomer Extrusion & Pinching)';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'INSUFFICIENT SQUEEZE (< 8%: Risk of Leakage)';
      stResEl.style.color = '#c53030';
    }
  }

  wEl.addEventListener('change', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select standard AS568 O-ring cord cross section W (e.g. 0.139" standard).',
      'Enter machined gland groove radial depth in inches.',
      'Inspect radial squeeze compression percentage and verify compliance with Parker sealing design standards.'
    ],
    benefitTitle: 'Parker O-Ring Handbook Design Guidelines',
    benefitContent: 'Proper elastomeric squeeze establishes the initial zero-pressure contact seal without over-compressing the rubber (15-25% for static face/radial seals; 10-15% for dynamic moving pistons to reduce friction and wear).',
    faqs: [{ q: 'What is the recommended squeeze for static O-ring seals?', a: 'Standard recommended static squeeze is 15% to 30% (ideally ~20-22%).' }]
  },

  // 7. ASME Boiler & Pressure Vessel Gasket Seating Stress Calculator
  {
    slug: 'gasket-seating-stress-asme-code-calculator',
    name: 'ASME Boiler & Pressure Vessel Gasket Seating Stress Calculator',
    description: 'Calculate minimum required bolt operating load (W_m1 = 0.785 · G² · P + 2 · b · π · G · m · P) and gasket seating load (W_m2 = π · b · G · y) per ASME Section VIII Division 1 Appendix 2.',
    category: 'Science',
    icon: 'text',
    keywords: ['asme gasket seating calculator', 'wm1 wm2 bolt load formula asme section viii', 'gasket m and y factor calculator', 'pressure vessel flange bolt load online', 'flange gasket operating load calculator'],
    order: 477,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Design Pressure P (psi), Mean Diameter G (in), Width N (in) & Gasket Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gsk-p">Design Pressure P (psi)</label>
          <input class="tool-textarea" id="gsk-p" type="number" step="any" value="300" placeholder="300 psi" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gsk-g">Mean Gasket Diam G (in)</label>
          <input class="tool-textarea" id="gsk-g" type="number" step="any" value="15.0" placeholder="15.0 in" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gsk-type">Gasket Material (m, y)</label>
          <select class="tool-textarea" id="gsk-type">
            <option value="3.00,10000" selected>Spiral Wound Metal with PTFE (m = 3.0, y = 10,000 psi)</option>
            <option value="2.00,1600">Compressed Non-Asbestos Sheet (m = 2.0, y = 1,600 psi)</option>
            <option value="3.75,9000">Corrugated Metal (m = 3.75, y = 9,000 psi)</option>
          </select>
        </div>
      </div>
      <div id="gsk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gsk-res-wm1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">66.4 kips (295.5 kN)</span>
            <span class="stat-label">Operating Bolt Load (W_m1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gsk-res-wm2" style="font-weight:700;">58.9 kips</span>
            <span class="stat-label">Initial Seating Bolt Load (W_m2)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('gsk-p'), gEl = document.getElementById('gsk-g'), tEl = document.getElementById('gsk-type');
  const wm1ResEl = document.getElementById('gsk-res-wm1'), wm2ResEl = document.getElementById('gsk-res-wm2');

  function update() {
    const P = parseFloat(pEl.value), G = parseFloat(gEl.value);
    const [mStr, yStr] = tEl.value.split(',');
    const m = parseFloat(mStr), y = parseFloat(yStr);

    if (isNaN(P) || isNaN(G) || P <= 0 || G <= 0) return;

    // Standard effective gasket seating width b ≈ 0.125 inches (1/8")
    const b = 0.125;

    // Hydrostatic end force H = 0.785 * G^2 * P (lbs)
    const H = 0.7854 * Math.pow(G, 2) * P;
    // Gasket joint contact load H_p = 2 * b * pi * G * m * P (lbs)
    const Hp = 2 * b * Math.PI * G * m * P;
    // W_m1 = H + Hp (Operating load in lbs)
    const Wm1 = H + Hp;
    const Wm1_kips = Wm1 / 1000;

    // Initial seating load W_m2 = pi * b * G * y (lbs)
    const Wm2 = Math.PI * b * G * y;
    const Wm2_kips = Wm2 / 1000;

    wm1ResEl.textContent = Wm1_kips.toFixed(1) + ' kips (' + (Wm1_kips * 4.44822).toFixed(1) + ' kN Total Load)';
    wm2ResEl.textContent = Wm2_kips.toFixed(1) + ' kips (Initial Tightening Seating Load)';
  }

  [pEl, gEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter internal design pressure P in psi.',
      'Enter mean gasket contact diameter G in inches.',
      'Select ASME gasket material factor preset (Spiral wound, Compressed sheet, Corrugated metal).',
      'Inspect ASME Section VIII operating load W_m1 and initial seating load W_m2 to size total flange bolt area.'
    ],
    benefitTitle: 'ASME Section VIII Div 1 Appendix 2 Rules',
    benefitContent: 'Flange bolt cross-sectional area must satisfy the greater of the operating load $W_{m1}$ (internal hydrostatic push plus gasket pressure retention) or initial atmospheric gasket seating yield load $W_{m2}$.',
    faqs: [{ q: 'What is the gasket factor m?', a: 'Factor m defines the ratio of residual gasket contact stress over internal fluid pressure required to maintain a leak-tight seal during operation.' }]
  }
];

toolsSuiteFFF.forEach(createTool);
console.log('Suite FFF complete: 7 tools created.');
