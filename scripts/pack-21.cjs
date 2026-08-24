const { createTool } = require('./generate-curated-tools.cjs');

// Pack 21: 26 Tools covering Mining Comminution, Petroleum Engineering, Lithography & Nanofab, Meteorology & Materials Crystallography (Tools 780 to 805)
const pack21Tools = [
  // --- Suite QQQQ: Mining, Mineral Processing & Comminution (780 - 784) ---
  // 1. Bond Work Index Ball Mill Grinding Power Calculator
  {
    slug: 'bond-work-index-ball-mill-grinding-power-calculator',
    name: 'Bond Work Index (W_i) Ball Mill Grinding Power & Energy Calculator',
    description: 'Calculate mineral ore grinding energy consumption (W = 10 · W_i · (1/√P₈₀ - 1/√F₈₀)) in kWh/tonne and ball mill electric drive motor power from Bond Work Index.',
    category: 'Science',
    icon: 'text',
    keywords: ['bond work index calculator', 'ball mill grinding energy formula w equals 10 wi', 'mineral processing grinding power calculator online', 'f80 p80 comminution energy calculator', 'mining ball mill motor power online'],
    order: 660,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bond Work Index W_i (kWh/tonne), Feed F₈₀ (μm), Product P₈₀ (μm) & Ore Feed Rate (TPH)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bnd-wi">Work Index W_i</label>
          <input class="tool-textarea" id="bnd-wi" type="number" step="any" value="14.5" placeholder="14.5 kWh/t (Copper Ore)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-f80">Feed F₈₀ (μm)</label>
          <input class="tool-textarea" id="bnd-f80" type="number" step="any" value="1500" placeholder="1500 μm (1.5 mm Feed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-p80">Product P₈₀ (μm)</label>
          <input class="tool-textarea" id="bnd-p80" type="number" step="any" value="105" placeholder="105 μm Target" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-tph">Ore Rate (TPH)</label>
          <input class="tool-textarea" id="bnd-tph" type="number" step="any" value="300" placeholder="300 TPH" />
        </div>
      </div>
      <div id="bnd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bnd-res-w" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10.41 kWh / tonne</span>
            <span class="stat-label">Specific Grinding Energy (W)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bnd-res-pwr" style="font-weight:700;">Mill Motor Power: 3,123 kW (4,188 HP) @ 300 TPH</span>
            <span class="stat-label">Total Continuous Ball Mill Motor Drive Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wiEl = document.getElementById('bnd-wi'), f80El = document.getElementById('bnd-f80');
  const p80El = document.getElementById('bnd-p80'), tphEl = document.getElementById('bnd-tph');
  const wResEl = document.getElementById('bnd-res-w'), pResEl = document.getElementById('bnd-res-pwr');

  function update() {
    const Wi = parseFloat(wiEl.value), F80 = parseFloat(f80El.value);
    const P80 = parseFloat(p80El.value), TPH = parseFloat(tphEl.value);

    if (isNaN(Wi) || isNaN(F80) || isNaN(P80) || isNaN(TPH) || Wi <= 0 || F80 <= P80 || P80 <= 0 || TPH <= 0) return;

    // Bond Third Theory of Comminution: W = 10 * Wi * ( 1/sqrt(P80) - 1/sqrt(F80) )  [kWh / metric tonne]
    const W = 10 * Wi * ((1 / Math.sqrt(P80)) - (1 / Math.sqrt(F80)));
    const powerKw = W * TPH;
    const powerHp = powerKw * 1.34102;

    wResEl.textContent = W.toFixed(2) + ' kWh / tonne (Specific Energy)';
    pResEl.textContent = 'Ball Mill Motor: ' + Math.round(powerKw).toLocaleString() + ' kW (' + Math.round(powerHp).toLocaleString() + ' HP @ ' + TPH + ' TPH Feed)';
  }

  [wiEl, f80El, p80El, tphEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laboratory Bond Ball Mill Work Index W_i in kWh/metric tonne (typically 10 to 18 kWh/t for copper/gold hard rocks).',
      'Enter 80% passing feed size F₈₀ in micrometers (μm).',
      'Enter 80% passing product discharge target size P₈₀ in micrometers (μm).',
      'Enter circuit throughput ore feed rate in metric tonnes per hour (TPH).',
      'Inspect specific electrical energy consumption in kWh/tonne and required total ball mill electric motor horsepower.'
    ],
    benefitTitle: 'Fred C. Bond 1952 Third Theory of Comminution',
    benefitContent: 'Bond established that comminution energy is proportional to the new crack length formed during breakage ($W \propto 1/\sqrt{P_{80}} - 1/\sqrt{F_{80}}$); this standard equation sizes virtually all commercial tumbling ball and SAG mills worldwide.',
    faqs: [{ q: 'Why is grinding the most expensive process in a mining plant?', a: 'Comminution accounts for over 50% of an entire mineral processing plant\'s electrical consumption and ~3% of global electricity use.' }]
  },

  // 2. Hydrocyclone Classification d50 Cut Size (Plitt Model) Calculator
  {
    slug: 'hydrocyclone-d50-cut-size-separation-calculator',
    name: 'Hydrocyclone Classification d₅₀ Cut Size (Plitt Model) Calculator',
    description: 'Calculate mineral slurry hydrocyclone particle separation cut size (d₅₀ in μm) from cyclone barrel diameter, vortex finder diameter, apex diameter, and feed pressure.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydrocyclone cut size calculator', 'plitt hydrocyclone d50 formula online', 'mineral classification hydrocyclone d50 calculator', 'vortex finder apex hydrocyclone sizing online', 'mining slurry cyclone separation calculator'],
    order: 661,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cyclone Diameter D_c (cm), Vortex Finder D_o (cm), Apex Spigot D_u (cm) & Pressure P (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cyc-dc">Diameter D_c (cm)</label>
          <input class="tool-textarea" id="cyc-dc" type="number" step="any" value="25.0" placeholder="25.0 cm (10 inch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-do">Vortex D_o (cm)</label>
          <input class="tool-textarea" id="cyc-do" type="number" step="any" value="8.0" placeholder="8.0 cm Overflow" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-du">Apex D_u (cm)</label>
          <input class="tool-textarea" id="cyc-du" type="number" step="any" value="4.5" placeholder="4.5 cm Underflow" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-p">Pressure P (kPa)</label>
          <input class="tool-textarea" id="cyc-p" type="number" step="any" value="100.0" placeholder="100.0 kPa (1 bar)" />
        </div>
      </div>
      <div id="cyc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cyc-res-d50" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d₅₀ = 74.2 μm</span>
            <span class="stat-label">Corrected Separation Cut Size (d₅₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cyc-res-split" style="font-weight:700;">Overflow: <74 μm Fine Slurry | Underflow: >74 μm Coarse Recirculation</span>
            <span class="stat-label">Hydrocyclone Centrifugal Classification Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dcEl = document.getElementById('cyc-dc'), doEl = document.getElementById('cyc-do');
  const duEl = document.getElementById('cyc-du'), pEl = document.getElementById('cyc-p');
  const d50ResEl = document.getElementById('cyc-res-d50'), spResEl = document.getElementById('cyc-res-split');

  function update() {
    const Dc = parseFloat(dcEl.value), Do = parseFloat(doEl.value);
    const Du = parseFloat(duEl.value), P_kpa = parseFloat(pEl.value);

    if (isNaN(Dc) || isNaN(Do) || isNaN(Du) || isNaN(P_kpa) || Dc <= 0 || Do <= 0 || Du <= 0 || P_kpa <= 0) return;

    // Simplified Plitt empirical correlation for d50 (microns):
    // d50_c approx = 50.5 * (Dc^0.46) * (Do^0.60) / ( (Du^0.20) * (P_kpa^0.25) )
    const num = 50.5 * Math.pow(Dc, 0.46) * Math.pow(Do, 0.60);
    const den = Math.pow(Du, 0.20) * Math.pow(P_kpa, 0.25);
    const d50 = num / den;

    d50ResEl.textContent = 'd₅₀ = ' + d50.toFixed(1) + ' μm (Cut Size)';
    spResEl.textContent = 'Overflow Fine Slurry: <' + d50.toFixed(0) + ' μm (Flotation Feed) | Underflow: >' + d50.toFixed(0) + ' μm (Ball Mill Recirculation)';
  }

  [dcEl, doEl, duEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hydrocyclone barrel body internal diameter D_c in centimeters.',
      'Enter vortex finder overflow pipe diameter D_o in centimeters.',
      'Enter apex spigot underflow nozzle diameter D_u in centimeters.',
      'Enter inlet slurry feed manifold pressure in kPa.',
      'Inspect particle separation cut size d₅₀ in micrometers (particles with 50% probability of reporting to overflow vs underflow).'
    ],
    benefitTitle: 'L.R. Plitt 1976 Hydrocyclone Modelling',
    benefitContent: 'Centrifugal vortex forces accelerate heavy, coarse particles outward to the conical wall to discharge through the apex spigot (underflow), while fine, liberated particles are carried upward in the central air core vortex to the overflow.',
    faqs: [{ q: 'How do you achieve a finer d50 cut size?', a: 'Using smaller diameter cyclones (e.g. 10cm vs 50cm) and higher inlet operating pressure creates higher G-forces, driving cut sizes down to 20-40 μm.' }]
  },

  // 3. Froth Flotation Recovery & Enrichment Ratio Calculator
  {
    slug: 'froth-flotation-recovery-enrichment-ratio-calculator',
    name: 'Froth Flotation Recovery & Enrichment Ratio Calculator',
    description: 'Calculate mineral froth flotation metallurgical recovery (R = (c · (f - t)) / (f · (c - t)) · 100%), enrichment ratio (c / f), and concentrate yield from assay grades.',
    category: 'Science',
    icon: 'text',
    keywords: ['froth flotation recovery calculator', 'mineral recovery formula c times f minus t online', 'flotation enrichment ratio calculator online', 'copper gold mineral processing recovery calculator', 'mining metallurgy mass balance online'],
    order: 662,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feed Grade f (%), Concentrate Grade c (%) & Tailings Grade t (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="flt-f">Feed Grade f (%)</label>
          <input class="tool-textarea" id="flt-f" type="number" step="any" value="0.75" placeholder="0.75 % Cu Feed" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-c">Conc Grade c (%)</label>
          <input class="tool-textarea" id="flt-c" type="number" step="any" value="28.0" placeholder="28.0 % Cu Concentrate" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-t">Tails Grade t (%)</label>
          <input class="tool-textarea" id="flt-t" type="number" step="any" value="0.08" placeholder="0.08 % Cu Tailings" />
        </div>
      </div>
      <div id="flt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="flt-res-rec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">89.6% Metallurgical Recovery</span>
            <span class="stat-label">Valuable Metal Recovery (R = c·(f-t) / f·(c-t))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="flt-res-enr" style="font-weight:700;">Enrichment: 37.33× Concentration | Mass Yield: 2.40%</span>
            <span class="stat-label">Grade Enrichment Ratio (c/f) & Concentrate Mass Pull</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('flt-f'), cEl = document.getElementById('flt-c'), tEl = document.getElementById('flt-t');
  const rResEl = document.getElementById('flt-res-rec'), eResEl = document.getElementById('flt-res-enr');

  function update() {
    const f = parseFloat(fEl.value), c = parseFloat(cEl.value), t = parseFloat(tEl.value);
    if (isNaN(f) || isNaN(c) || isNaN(t) || f <= 0 || c <= f || t >= f || t < 0) return;

    // Two-product flotation mass balance:
    // Concentrate mass fraction (Yield) Y = (f - t) / (c - t)
    const yieldFrac = (f - t) / (c - t);
    const yieldPct = yieldFrac * 100;

    // Recovery R = (c * (f - t)) / (f * (c - t)) * 100 = (c / f) * Y
    const recoveryPct = (c / f) * yieldPct;

    // Enrichment ratio = c / f
    const enrichment = c / f;

    rResEl.textContent = recoveryPct.toFixed(1) + '% Metallurgical Recovery';
    eResEl.textContent = 'Enrichment: ' + enrichment.toFixed(2) + '× (' + f + '% to ' + c + '%) | Mass Pull: ' + yieldPct.toFixed(2) + '% of Feed';
  }

  [fEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw mill feed assay metal grade percentage f (e.g. 0.75% Cu).',
      'Enter final froth flotation concentrate grade percentage c (e.g. 28.0% Cu).',
      'Enter discard tailings reject grade percentage t (e.g. 0.08% Cu).',
      'Inspect total metallurgical metal recovery percentage, enrichment concentration multiplier ($c/f$), and concentrate mass yield.'
    ],
    benefitTitle: 'Two-Product Metallurgical Mass Balance',
    benefitContent: 'Flotation operates on hydrophobic surface chemistry; calculating the two-product balance validates whether reagents (collectors, frothers) optimize the trade-off between maximizing grade vs maximizing valuable recovery.',
    faqs: [{ q: 'Why is 100% recovery impossible to achieve simultaneously with high grade?', a: 'As air bubble residence time increases to capture borderline locked middling particles, gangue rock is entrained, diluting the final concentrate grade.' }]
  },

  // 4. Jaw & Cone Crusher Reduction Ratio & Capacity Calculator
  {
    slug: 'jaw-crusher-reduction-ratio-throughput-calculator',
    name: 'Jaw & Cone Crusher Reduction Ratio & Throughput (TPH) Calculator',
    description: 'Calculate primary/secondary mining rock crusher reduction ratio (R_r = F₈₀ / P₈₀) and hourly tonnage capacity from Closed Side Setting (CSS) and gape dimensions.',
    category: 'Science',
    icon: 'text',
    keywords: ['jaw crusher reduction ratio calculator', 'crusher reduction ratio formula f80 over p80', 'cone crusher closed side setting css capacity calculator', 'mining rock crusher throughput tph online', 'quarry aggregate crusher sizing online'],
    order: 663,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Crusher Gape Width (mm), Closed Side Setting CSS (mm) & Feed Rock F₈₀ (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-gape">Gape Width (mm)</label>
          <input class="tool-textarea" id="cr-gape" type="number" step="any" value="900" placeholder="900 mm (Gape Opening)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-css">Closed Setting CSS (mm)</label>
          <input class="tool-textarea" id="cr-css" type="number" step="any" value="125" placeholder="125 mm CSS" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-f80">Feed F₈₀ (mm)</label>
          <input class="tool-textarea" id="cr-f80" type="number" step="any" value="650" placeholder="650 mm Feed Size" />
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.20 : 1 Reduction</span>
            <span class="stat-label">Comminution Reduction Ratio (R_r = F₈₀ / P₈₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-p80" style="font-weight:700;">Product P₈₀ ≈ 125 mm | Max Feed Allowed: 720 mm (80% Gape)</span>
            <span class="stat-label">Estimated Discharge Size & Feed Acceptance Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('cr-gape'), cEl = document.getElementById('cr-css'), fEl = document.getElementById('cr-f80');
  const rResEl = document.getElementById('cr-res-ratio'), pResEl = document.getElementById('cr-res-p80');

  function update() {
    const gapeMm = parseFloat(gEl.value), cssMm = parseFloat(cEl.value), f80Mm = parseFloat(fEl.value);
    if (isNaN(gapeMm) || isNaN(cssMm) || isNaN(f80Mm) || gapeMm <= 0 || cssMm <= 0 || f80Mm <= 0) return;

    // For standard jaw crusher, product P80 is approximately equal to Closed Side Setting (CSS)
    const p80Mm = cssMm;
    const reductionRatio = f80Mm / p80Mm;

    // Maximum safe feed size rule of thumb: 80% of gape
    const maxFeedSafe = gapeMm * 0.80;

    rResEl.textContent = reductionRatio.toFixed(2) + ' : 1 Reduction Ratio';

    let feedCheck = '';
    if (f80Mm <= maxFeedSafe) {
      feedCheck = 'SAFE: Feed size ' + f80Mm + ' mm is within 80% Gape limit (' + maxFeedSafe.toFixed(0) + ' mm)';
      pResEl.style.color = '#22543d';
    } else {
      feedCheck = 'OVERSIZE: Feed size ' + f80Mm + ' mm exceeds 80% Gape (' + maxFeedSafe.toFixed(0) + ' mm) - Risk of Bridging!';
      pResEl.style.color = '#c53030';
    }
    pResEl.textContent = 'P₈₀ ≈ ' + p80Mm + ' mm | ' + feedCheck;
  }

  [gEl, cEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter jaw crusher gape intake opening width in millimeters.',
      'Enter discharge Closed Side Setting (CSS) in millimeters.',
      'Enter 80% passing top size of ROM (Run-of-Mine) blasted rock feed in millimeters.',
      'Inspect volumetric reduction ratio $R_r = F_{80}/P_{80}$ and verify blasted rock does not exceed the safe 80% gape intake bridging threshold.'
    ],
    benefitTitle: 'Primary Crushing Stage Optimization',
    benefitContent: 'Standard jaw and gyratory crushers operate most reliably at reduction ratios between 4:1 and 6:1; exceeding 7:1 reduction causes excessive toggle plate stress, packing in the crushing chamber, and high manganese liner wear.',
    faqs: [{ q: 'What is Closed Side Setting (CSS)?', a: 'CSS is the minimum distance between the fixed and moving crusher jaws at the bottom discharge opening during the closing cycle stroke.' }]
  },

  // 5. Mineral Thickener Basin Settling Area (Talmage-Fitch Method) Calculator
  {
    slug: 'thickener-settling-area-talmage-fitch-calculator',
    name: 'Mineral Thickener Basin Area & Settling Flux (Talmage-Fitch) Calculator',
    description: 'Calculate industrial tailings/concentrate thickener basin surface area (A = Q · (C_i - C_u) / (v · C_u)) in m² and unit settling area flux (m²/TPD) from slurry settling rates.',
    category: 'Science',
    icon: 'text',
    keywords: ['thickener settling area calculator', 'talmage fitch thickener formula online', 'mineral thickener basin diameter calculator', 'tailings thickener unit area m2 per tpd calculator', 'slurry dewatering thickener sizing online'],
    order: 664,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dry Solids Feed (TPD), Feed Slurry Solids (wt %), Target Underflow (wt %) & Settling Rate (m/h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="thk-tpd">Feed Solids (TPD)</label>
          <input class="tool-textarea" id="thk-tpd" type="number" step="any" value="2400" placeholder="2400 TPD (100 TPH)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thk-cfeed">Feed Solids (wt %)</label>
          <input class="tool-textarea" id="thk-cfeed" type="number" step="any" value="20.0" placeholder="20.0 wt %" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thk-cund">Underflow (wt %)</label>
          <input class="tool-textarea" id="thk-cund" type="number" step="any" value="60.0" placeholder="60.0 wt % Target" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thk-v">Settling Rate (m/h)</label>
          <input class="tool-textarea" id="thk-v" type="number" step="any" value="1.50" placeholder="1.50 m/h (Flocculated)" />
        </div>
      </div>
      <div id="thk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="thk-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">222.2 m² Basin (16.8 m Dia)</span>
            <span class="stat-label">Required Thickener Surface Area & Diameter</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="thk-res-flux" style="font-weight:700;">Unit Area: 0.093 m² / (tonne/day) | Water Recovered: 8,000 m³/day</span>
            <span class="stat-label">Specific Unit Area Flux & Process Water Recovery</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tpdEl = document.getElementById('thk-tpd'), cfEl = document.getElementById('thk-cfeed');
  const cuEl = document.getElementById('thk-cund'), vEl = document.getElementById('thk-v');
  const aResEl = document.getElementById('thk-res-area'), fResEl = document.getElementById('thk-res-flux');

  function update() {
    const tpd = parseFloat(tpdEl.value), CfeedPct = parseFloat(cfEl.value);
    const CundPct = parseFloat(cuEl.value), vMh = parseFloat(vEl.value);

    if (isNaN(tpd) || isNaN(CfeedPct) || isNaN(CundPct) || isNaN(vMh) || tpd <= 0 || CfeedPct <= 0 || CundPct <= CfeedPct || vMh <= 0) return;

    // Convert TPD dry solids to tonnes/hour
    const tphSolids = tpd / 24;

    // Dilution in feed and underflow: D = (1 - C) / C  [tonnes water / tonne solids]
    const D_feed = (100 - CfeedPct) / CfeedPct;
    const D_und = (100 - CundPct) / CundPct;

    // Water to overflow per hour = tphSolids * (D_feed - D_und)  [m^3 / h]
    const waterOverflowM3h = tphSolids * (D_feed - D_und);
    const waterRecoveredM3Day = waterOverflowM3h * 24;

    // Thickener Area A = waterOverflowM3h / vMh  [m^2]
    const Area = waterOverflowM3h / vMh;
    // Diameter D = sqrt( 4 * Area / pi )
    const Dia = Math.sqrt((4 * Area) / Math.PI);

    // Unit area = Area / TPD  [m^2 / TPD]
    const unitArea = Area / tpd;

    aResEl.textContent = Area.toFixed(1) + ' m² Area (' + Dia.toFixed(1) + ' m Diameter Tank)';
    fResEl.textContent = 'Unit Area: ' + unitArea.toFixed(3) + ' m²/(t/d) | Water Recovered: ' + Math.round(waterRecoveredM3Day).toLocaleString() + ' m³/day (Overflow)';
  }

  [tpdEl, cfEl, cuEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter daily dry solids throughput in Tonnes per Day (TPD).',
      'Enter incoming feed slurry solids percentage by weight (wt %).',
      'Enter target thickened underflow sludge solids percentage (wt %).',
      'Enter hindered sedimentation settling velocity in m/hour measured from laboratory cylinder test.',
      'Inspect required thickener basin surface area in $m^2$, circular tank diameter in meters, and recycled water recovery rate in $m^3/\text{day}$.'
    ],
    benefitTitle: 'W.P. Talmage & E.B. Fitch 1955 Sedimentation Flux Theory',
    benefitContent: 'Thickeners dewater mineral tailings to recycle critical process water back to the grinding circuit; calculating unit settling area ensures thickener rake torque and residence time produce dense paste underflow without solids overflowing the clarify launder.',
    faqs: [{ q: 'What role do polymeric flocculants play in thickener sizing?', a: 'High-molecular-weight anionic polyacrylamide flocculants agglomerate fine clay and slime particles into large flocs, increasing settling velocity by 10× to 50× and dramatically shrinking required tank size.' }]
  },

  // --- Suite RRRR: Petroleum Engineering & Reservoir Mechanics (785 - 789) ---
  // 6. Darcy Radial Flow Oil Well Production Rate Calculator
  {
    slug: 'darcy-radial-flow-oil-well-production-calculator',
    name: 'Darcy Steady-State Radial Flow Oil Well Inflow (IPR) Calculator',
    description: 'Calculate petroleum reservoir oil well production flow rate (q = 2π·k·h·(P_e - P_w) / (μ·B_o·ln(r_e / r_w))) in STB/day and Productivity Index (PI).',
    category: 'Science',
    icon: 'text',
    keywords: ['darcy radial flow calculator', 'oil well production rate formula q equals 2 pi k h delta p', 'inflow performance relationship ipr calculator online', 'petroleum reservoir productivity index pi calculator', 'reservoir permeability flow rate online'],
    order: 665,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Permeability k (mD), Net Pay Thickness h (ft), Reservoir ΔP (psi) & Oil Viscosity μ (cP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="drc-k">Permeability k (mD)</label>
          <input class="tool-textarea" id="drc-k" type="number" step="any" value="50.0" placeholder="50.0 mD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drc-h">Pay Thickness h (ft)</label>
          <input class="tool-textarea" id="drc-h" type="number" step="any" value="40.0" placeholder="40.0 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drc-dp">Drawdown ΔP (psi)</label>
          <input class="tool-textarea" id="drc-dp" type="number" step="any" value="800.0" placeholder="800.0 psi (P_res - P_wf)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drc-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="drc-mu" type="number" step="any" value="1.5" placeholder="1.5 cP" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drc-bo">Formation Vol Bo</label>
          <input class="tool-textarea" id="drc-bo" type="number" step="0.05" value="1.20" placeholder="1.20 RB/STB" />
        </div>
      </div>
      <div id="drc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="drc-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,080 STB / Day</span>
            <span class="stat-label">Daily Oil Production Inflow Rate (q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="drc-res-pi" style="font-weight:700;">Productivity Index PI = 1.35 STB/day/psi (ln(r_e/r_w) = 7.6)</span>
            <span class="stat-label">Well Productivity Index (PI = q / ΔP)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('drc-k'), hEl = document.getElementById('drc-h');
  const dpEl = document.getElementById('drc-dp'), muEl = document.getElementById('drc-mu'), boEl = document.getElementById('drc-bo');
  const qResEl = document.getElementById('drc-res-q'), piResEl = document.getElementById('drc-res-pi');

  function update() {
    const k = parseFloat(kEl.value), h = parseFloat(hEl.value);
    const dP = parseFloat(dpEl.value), mu = parseFloat(muEl.value), Bo = parseFloat(boEl.value);

    if (isNaN(k) || isNaN(h) || isNaN(dP) || isNaN(mu) || isNaN(Bo) || k <= 0 || h <= 0 || dP <= 0 || mu <= 0 || Bo <= 0) return;

    // Assume standard 40-acre drainage re=660ft, rw=0.33ft (4-inch radius) => ln(re/rw) approx 7.60
    const ln_re_rw = 7.60;

    // Oilfield units Darcy equation: q = (0.00708 * k * h * dP) / (mu * Bo * ln(re/rw))  [STB / day]
    const q_stb_day = (0.00708 * k * h * dP) / (mu * Bo * ln_re_rw);
    const pi = q_stb_day / dP;

    qResEl.textContent = Math.round(q_stb_day).toLocaleString() + ' STB / Day (' + (q_stb_day * 0.158987).toFixed(1) + ' m³/day)';
    piResEl.textContent = 'Productivity Index PI = ' + pi.toFixed(2) + ' STB/day/psi (k·h = ' + Math.round(k*h).toLocaleString() + ' mD-ft capacity)';
  }

  [kEl, hEl, dpEl, muEl, boEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reservoir rock permeability k in millidarcies (mD).',
      'Enter productive formation net pay thickness h in feet.',
      'Enter drawdown pressure differential $\Delta P = P_{\text{reservoir}} - P_{\text{wf}}$ in psi.',
      'Enter live crude oil in-situ viscosity $\mu$ in centipoise (cP).',
      'Enter oil formation volume factor $B_o$ in reservoir barrels per stock-tank barrel (RB/STB).',
      'Inspect daily oil production rate in Stock Tank Barrels per Day (STB/D) and well Productivity Index.'
    ],
    benefitTitle: 'Henry Darcy 1856 Radial Inflow Performance',
    benefitContent: 'Steady-state radial Darcy flow establishes the fundamental Inflow Performance Relationship (IPR) for vertical oil wells, quantifying how reservoir pressure drawdown drives hydrocarbon fluids into the wellbore perforations.',
    faqs: [{ q: 'What is the Formation Volume Factor (Bo)?', a: '$B_o$ represents the volume in reservoir barrels that one stock-tank barrel of oil occupies at subsurface temperature and pressure with dissolved gas in solution (typically 1.1 to 1.5).' }]
  },

  // 7. Standing Correlation Bubble Point Pressure & Solution GOR Calculator
  {
    slug: 'oil-gas-ratio-gor-bubble-point-pressure-calculator',
    name: 'Standing Correlation Bubble Point Pressure (P_b) & Solution GOR Calculator',
    description: 'Calculate petroleum reservoir crude oil bubble point pressure P_b (Standing 1947 correlation: P_b = 18.2 · [(R_sb / γ_g)^0.83 · 10^(0.00091·T - 0.0125·API) - 1.4]) in psi.',
    category: 'Science',
    icon: 'text',
    keywords: ['bubble point pressure calculator', 'standing correlation pb formula online', 'solution gas oil ratio gor bubble point calculator', 'reservoir pvt analysis bubble point online', 'petroleum crude oil standing pvt calculator'],
    order: 666,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solution GOR R_sb (scf/STB), Gas Specific Gravity γ_g, Oil Gravity (°API) & Temp T (°F)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pb-rs">GOR R_sb (scf/STB)</label>
          <input class="tool-textarea" id="pb-rs" type="number" step="any" value="500.0" placeholder="500.0 scf/STB" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-gg">Gas Gravity γ_g</label>
          <input class="tool-textarea" id="pb-gg" type="number" step="0.01" value="0.75" placeholder="0.75 (Air=1.0)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-api">Oil Gravity (°API)</label>
          <input class="tool-textarea" id="pb-api" type="number" step="any" value="35.0" placeholder="35.0 °API (Light Sweet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-temp">Reservoir Temp (°F)</label>
          <input class="tool-textarea" id="pb-temp" type="number" step="any" value="180.0" placeholder="180.0 °F" />
        </div>
      </div>
      <div id="pb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pb-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_b = 2,425 psi</span>
            <span class="stat-label">Calculated Bubble Point Pressure (P_b)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pb-res-state" style="font-weight:700;">Undersaturated State (P_res > P_b: Single-Phase Liquid Flow)</span>
            <span class="stat-label">Thermodynamic Reservoir Fluid Phase State</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rsEl = document.getElementById('pb-rs'), ggEl = document.getElementById('pb-gg');
  const apiEl = document.getElementById('pb-api'), tEl = document.getElementById('pb-temp');
  const pResEl = document.getElementById('pb-res-val'), sResEl = document.getElementById('pb-res-state');

  function update() {
    const Rs = parseFloat(rsEl.value), gamma_g = parseFloat(ggEl.value);
    const api = parseFloat(apiEl.value), Tf = parseFloat(tEl.value);

    if (isNaN(Rs) || isNaN(gamma_g) || isNaN(api) || isNaN(Tf) || Rs <= 0 || gamma_g <= 0 || api <= 0 || Tf <= 0) return;

    // Standing 1947 Bubble Point Equation:
    // a = 0.00091 * T_f - 0.0125 * API
    // P_b = 18.2 * [ (Rs / gamma_g)^0.83 * 10^a - 1.4 ]
    const a = (0.00091 * Tf) - (0.0125 * api);
    const term = Math.pow(Rs / gamma_g, 0.83) * Math.pow(10, a);
    const Pb = 18.2 * (term - 1.4);

    pResEl.textContent = 'P_b = ' + Math.round(Pb).toLocaleString() + ' psi (' + (Pb * 0.0689476).toFixed(1) + ' bar)';
    sResEl.textContent = 'Standing PVT Correlation | If P_reservoir > ' + Math.round(Pb) + ' psi: Undersaturated Oil (No Free Gas Cap)';
  }

  [rsEl, ggEl, apiEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solution gas-oil ratio $R_{sb}$ in standard cubic feet per stock tank barrel (scf/STB).',
      'Enter dissolved gas specific gravity $\gamma_g$ (relative to air = 1.0).',
      'Enter stock-tank crude oil API gravity in °API.',
      'Enter bottom-hole reservoir temperature in °F.',
      'Inspect estimated bubble point saturation pressure $P_b$ in psi and bar.'
    ],
    benefitTitle: 'M.B. Standing 1947 California PVT Correlation',
    benefitContent: 'The bubble point pressure ($P_b$) is the thermodynamic threshold where the first bubble of dissolved gas nucleates out of liquid crude oil; producing below $P_b$ releases free gas in the reservoir pore space, reducing oil relative permeability.',
    faqs: [{ q: 'Why is producing above bubble point pressure preferred?', a: 'Above $P_b$, single-phase oil flows with minimum capillary resistance and maximum relative permeability.' }]
  },

  // 8. Real Gas Compressibility Z-Factor (Hall-Yarborough Correlation) Calculator
  {
    slug: 'gas-compressibility-z-factor-hall-yarborough-calculator',
    name: 'Natural Gas Compressibility Z-Factor (Hall-Yarborough) Calculator',
    description: 'Calculate real natural gas supercompressibility Z-factor (P·V = Z·n·R·T) from pseudo-reduced pressure P_pr and pseudo-reduced temperature T_pr.',
    category: 'Science',
    icon: 'text',
    keywords: ['gas compressibility z factor calculator', 'hall yarborough z factor formula online', 'natural gas supercompressibility calculator', 'pseudo reduced pressure temperature z factor online', 'petroleum natural gas pvt z factor calculator'],
    order: 667,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pseudo-Reduced Pressure P_pr (0.2 to 15.0) & Pseudo-Reduced Temp T_pr (1.05 to 3.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="z-ppr">Pressure P_pr</label>
          <input class="tool-textarea" id="z-ppr" type="number" step="0.1" value="2.50" placeholder="2.50 (P / P_crit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="z-tpr">Temp T_pr</label>
          <input class="tool-textarea" id="z-tpr" type="number" step="0.05" value="1.45" placeholder="1.45 (T / T_crit)" />
        </div>
      </div>
      <div id="z-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="z-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Z = 0.772 (Supercompressible)</span>
            <span class="stat-label">Real Gas Deviation Z-Factor (P·V = Z·n·R·T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="z-res-dens" style="font-weight:700;">Real Gas Occupies 77.2% of Ideal Gas Volume (+29.5% Gas Storage Capacity)</span>
            <span class="stat-label">Real Gas Density Multiplier vs Ideal Gas Law</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('z-ppr'), tEl = document.getElementById('z-tpr');
  const zResEl = document.getElementById('z-res-val'), dResEl = document.getElementById('z-res-dens');

  function update() {
    const Ppr = parseFloat(pEl.value), Tpr = parseFloat(tEl.value);
    if (isNaN(Ppr) || isNaN(Tpr) || Ppr <= 0 || Tpr <= 1.0) return;

    // Hall-Yarborough / Beggs-Brill analytical fit for Z-factor:
    // A = 1.39 * (Tpr - 0.92)^0.5 - 0.36 * Tpr - 0.10
    // B = (0.62 - 0.23*Tpr)*Ppr + ( (0.066 / (Tpr - 0.86)) - 0.037 ) * Ppr^2 + 0.32 * Ppr^6 / 10^(9*(Tpr-1))
    // C = 0.132 - 0.32*log10(Tpr)
    // D = 10^(0.3106 - 0.49*Tpr + 0.1824*Tpr^2)
    // Z = A + (1 - A) / exp(B) + C * Ppr^D
    const A = (1.39 * Math.pow(Math.max(0.01, Tpr - 0.92), 0.5)) - (0.36 * Tpr) - 0.10;
    const termB1 = (0.62 - (0.23 * Tpr)) * Ppr;
    const termB2 = ((0.066 / Math.max(0.01, Tpr - 0.86)) - 0.037) * Math.pow(Ppr, 2);
    const termB3 = (0.32 * Math.pow(Ppr, 6)) / Math.pow(10, 9 * (Tpr - 1));
    const B = termB1 + termB2 + termB3;
    const C = 0.132 - (0.32 * Math.log10(Tpr));
    const D = Math.pow(10, 0.3106 - (0.49 * Tpr) + (0.1824 * Math.pow(Tpr, 2)));

    const Z = A + ((1 - A) / Math.exp(Math.max(-50, Math.min(50, B)))) + (C * Math.pow(Ppr, D));

    zResEl.textContent = 'Z = ' + Z.toFixed(3) + ' (Real Gas Z-Factor)';
    dResEl.textContent = 'Compressibility: ' + (Z * 100).toFixed(1) + '% of Ideal Volume (Gas Expansion Factor B_g ∝ Z·T/P)';
  }

  pEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter pseudo-reduced pressure $P_{pr} = P / P_{\text{critical}}$ (dimensionless).',
      'Enter pseudo-reduced temperature $T_{pr} = T / T_{\text{critical}}$ (dimensionless, $T_{pr} > 1.0$).',
      'Inspect real gas deviation factor Z and reservoir gas expansion factor $B_g$.'
    ],
    benefitTitle: 'Standing-Katz 1942 Chart & Real Gas Law',
    benefitContent: 'At typical high reservoir pressures (2,000 to 5,000 psi), intermolecular van der Waals attractive forces pull methane molecules closer together than predicted by the ideal gas law ($Z < 1.0$), allowing natural gas reservoirs to store up to 30% more gas.',
    faqs: [{ q: 'What happens to Z at extreme pressures (P_pr > 8)?', a: 'At extreme pressures, repulsive molecular core volume dominates, causing Z to rise above 1.0 ($Z > 1.0$).' }]
  },

  // 9. Wellbore Hydrostatic Mud Weight & Kill Pressure Calculator
  {
    slug: 'wellbore-hydrostatic-mud-weight-kill-pressure-calculator',
    name: 'Wellbore Hydrostatic Pressure & Kill Mud Weight (PPG) Calculator',
    description: 'Calculate drilling wellbore hydrostatic bottomhole pressure (P_hyd = 0.052 · MW · TVD) in psi and kill mud weight required to control gas kicks.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydrostatic pressure drilling calculator', 'mud weight ppg to psi formula 0.052 mw tvd', 'kill mud weight calculator online', 'oil drilling well control kick pressure calculator', 'petroleum drilling engineering hydrostatic pressure online'],
    order: 668,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mud Weight MW (PPG), True Vertical Depth TVD (ft) & Shut-In Drill Pipe Pressure (psi)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mud-mw">Mud Weight (PPG)</label>
          <input class="tool-textarea" id="mud-mw" type="number" step="any" value="10.5" placeholder="10.5 PPG" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mud-tvd">Depth TVD (ft)</label>
          <input class="tool-textarea" id="mud-tvd" type="number" step="any" value="10000" placeholder="10000 ft TVD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mud-sidpp">SIDPP Kick (psi)</label>
          <input class="tool-textarea" id="mud-sidpp" type="number" step="any" value="350" placeholder="350 psi (Shut-In Kick)" />
        </div>
      </div>
      <div id="mud-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mud-res-hyd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5,460 psi Hydrostatic</span>
            <span class="stat-label">Bottomhole Hydrostatic Pressure (P_hyd = 0.052·MW·TVD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mud-res-kill" style="color:var(--green-dark); font-weight:700;">Kill Mud Weight: 11.17 PPG (+0.67 PPG Barite Weight-Up Required)</span>
            <span class="stat-label">Kill Mud Weight (KMW = MW + SIDPP / (0.052·TVD))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mwEl = document.getElementById('mud-mw'), tvdEl = document.getElementById('mud-tvd'), siEl = document.getElementById('mud-sidpp');
  const hResEl = document.getElementById('mud-res-hyd'), kResEl = document.getElementById('mud-res-kill');

  function update() {
    const MW = parseFloat(mwEl.value), TVD = parseFloat(tvdEl.value), SIDPP = parseFloat(siEl.value);
    if (isNaN(MW) || isNaN(TVD) || isNaN(SIDPP) || MW <= 0 || TVD <= 0 || SIDPP < 0) return;

    // Hydrostatic pressure P_hyd = 0.052 * MW * TVD  [psi]
    const Phyd = 0.052 * MW * TVD;
    const gradPsiFt = 0.052 * MW;

    // Kill Mud Weight KMW = MW + SIDPP / (0.052 * TVD)  [PPG]
    const KMW = MW + (SIDPP / (0.052 * TVD));
    const deltaMW = KMW - MW;

    hResEl.textContent = Math.round(Phyd).toLocaleString() + ' psi Hydrostatic (' + (Phyd * 0.0689476).toFixed(1) + ' bar | ' + gradPsiFt.toFixed(3) + ' psi/ft)';
    kResEl.textContent = 'Kill Mud: ' + KMW.toFixed(2) + ' PPG (Formation Pressure: ' + Math.round(Phyd + SIDPP).toLocaleString() + ' psi, ΔMW = +' + deltaMW.toFixed(2) + ' PPG)';
  }

  [mwEl, tvdEl, siEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter active drilling mud density weight in Pounds per Gallon (PPG).',
      'Enter wellbore True Vertical Depth (TVD) in feet.',
      'Enter Shut-In Drill Pipe Pressure (SIDPP) recorded following an influx kick in psi.',
      'Inspect bottomhole hydrostatic column pressure and calculated Kill Mud Weight (KMW) required for the Wait-and-Weight well control circulation procedure.'
    ],
    benefitTitle: 'IADC Well Control & Blowout Prevention Standards',
    benefitContent: 'The constant 0.052 converts density in lb/gal ($PPG$) and depth in feet directly into pressure in $psi$; calculating accurate kill mud density balances reservoir pore pressure to safely circulate kicks out of the hole without fracturing the formation.',
    faqs: [{ q: 'Where does the 0.052 constant come from?', a: '$1\text{ gallon} = 231\text{ in}^3$; dividing 12 inches by 231 yields exactly $0.051948 \approx 0.052\text{ psi}/(\text{PPG}\cdot\text{ft})$.' }]
  },

  // 10. Petroleum Reservoir Drive Mechanism Recovery Factor Calculator
  {
    slug: 'reservoir-drive-mechanism-recovery-factor-calculator',
    name: 'Petroleum Reservoir Drive Mechanism & Recovery Factor (RF) Calculator',
    description: 'Calculate primary hydrocarbon recovery factor (RF %) and Original Oil in Place (OOIP) recoverable reserves across Dissolved Gas Drive, Gas Cap Expansion, and Water Drive.',
    category: 'Science',
    icon: 'text',
    keywords: ['reservoir recovery factor calculator', 'drive mechanism recovery factor oil gas online', 'ooip recoverable reserves calculator', 'water drive vs solution gas recovery factor online', 'petroleum reservoir engineering recovery online'],
    order: 669,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Original Oil in Place (MMSTB) & Dominant Natural Drive Mechanism',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rf-ooip">OOIP (Million STB)</label>
          <input class="tool-textarea" id="rf-ooip" type="number" step="any" value="100.0" placeholder="100.0 MMSTB" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-drive">Drive Mechanism</label>
          <select class="tool-textarea" id="rf-drive">
            <option value="water_strong" selected>Strong Bottom Water Drive (35 - 60% RF)</option>
            <option value="gas_cap">Expanding Gas Cap Drive (20 - 40% RF)</option>
            <option value="solution_gas">Solution / Dissolved Gas Drive (10 - 25% RF)</option>
            <option value="gravity">Gravity Drainage (40 - 75% High Dip RF)</option>
          </select>
        </div>
      </div>
      <div id="rf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rf-res-rec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">45.0% Primary Recovery</span>
            <span class="stat-label">Expected Ultimate Recovery Factor (RF)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rf-res-vol" style="font-weight:700;">Recoverable Reserves: 45.0 Million STB (Remaining Unrecovered: 55.0 MMSTB)</span>
            <span class="stat-label">Estimated Ultimate Recoverable Oil Reserves (EUR)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ooipEl = document.getElementById('rf-ooip'), drvEl = document.getElementById('rf-drive');
  const rResEl = document.getElementById('rf-res-rec'), vResEl = document.getElementById('rf-res-vol');

  const DRIVES = {
    'water_strong': { avgRF: 0.45, range: '35 - 60%', name: 'Strong Edge/Bottom Water Drive' },
    'gas_cap':      { avgRF: 0.30, range: '20 - 40%', name: 'Expanding Gas Cap Drive' },
    'solution_gas': { avgRF: 0.18, range: '10 - 25%', name: 'Solution Gas Depletion Drive' },
    'gravity':      { avgRF: 0.55, range: '40 - 75%', name: 'Steep Dip Gravity Drainage' }
  };

  function update() {
    const ooip = parseFloat(ooipEl.value);
    const d = DRIVES[drvEl.value];

    if (isNaN(ooip) || ooip <= 0) return;

    const recoverableMm = ooip * d.avgRF;
    const remainingMm = ooip - recoverableMm;

    rResEl.textContent = (d.avgRF * 100).toFixed(1) + '% Primary RF (Typical: ' + d.range + ')';
    vResEl.textContent = 'Recoverable EUR: ' + recoverableMm.toFixed(1) + ' MMSTB (' + d.name + ' | Residual: ' + remainingMm.toFixed(1) + ' MMSTB)';
  }

  ooipEl.addEventListener('input', update);
  drvEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter volumetric Original Oil in Place (OOIP) in Million Stock-Tank Barrels (MMSTB).',
      'Select natural reservoir primary energy drive mechanism (Water Drive, Gas Cap, Solution Gas, or Gravity Drainage).',
      'Inspect Estimated Ultimate Recovery (EUR) reserves and residual oil remaining for Secondary/Tertiary Waterflooding / EOR.'
    ],
    benefitTitle: 'Reservoir Depletion Energy Thermodynamics',
    benefitContent: 'Solution gas drive reservoirs lose reservoir pressure rapidly as gas bubbles evolve and escape ($RF \sim 15\text{-}20\%$), whereas active regional water aquifers sustain reservoir pressure to achieve up to 50%+ primary recovery.',
    faqs: [{ q: 'Why is gravity drainage the most efficient natural drive mechanism?', a: 'In steeply dipping, high-permeability reservoirs with low oil viscosity, gravity segregation allows gas to rise to the crest and oil to drain cleanly into downdip production wells.' }]
  },

  // --- Suite SSSS: Advanced Semiconductor Lithography & Nano-Fabrication (790 - 794) ---
  // 11. Rayleigh Optical Lithography Resolution & Depth of Focus Calculator
  {
    slug: 'rayleigh-optical-lithography-resolution-calculator',
    name: 'Rayleigh Optical Lithography Resolution (CD = k₁·λ / NA) & Depth of Focus Calculator',
    description: 'Calculate semiconductor photolithography Critical Dimension resolution (CD = k₁ · λ / NA) in nanometers and Depth of Focus (DOF = k₂ · λ / NA²) for DUV (193nm) and EUV (13.5nm) scanners.',
    category: 'Science',
    icon: 'text',
    keywords: ['rayleigh lithography resolution calculator', 'critical dimension cd formula k1 lambda over na', 'depth of focus dof lithography calculator online', 'asml euv vs duv resolution calculator', 'semiconductor photolithography rayleigh criterion online'],
    order: 670,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Exposure Wavelength λ (nm), Numerical Aperture NA & Process Factor k₁',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lit-lambda">Wavelength λ (nm)</label>
          <select class="tool-textarea" id="lit-lambda">
            <option value="13.5" selected>EUV (13.5 nm - High-NA ASML Scanner)</option>
            <option value="193.0">ArF Immersion DUV (193.0 nm, Water NA=1.35)</option>
            <option value="248.0">KrF DUV (248.0 nm)</option>
            <option value="365.0">i-Line (365.0 nm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lit-na">Numerical Aperture NA</label>
          <input class="tool-textarea" id="lit-na" type="number" step="0.05" value="0.55" placeholder="0.55 (High-NA EUV)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lit-k1">Process Factor k₁</label>
          <input class="tool-textarea" id="lit-k1" type="number" step="0.01" value="0.33" placeholder="0.33 (Optical Proximity OPC)" />
        </div>
      </div>
      <div id="lit-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lit-res-cd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CD = 8.10 nm Pitch</span>
            <span class="stat-label">Critical Dimension Resolution (CD = k₁·λ / NA)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lit-res-dof" style="font-weight:700;">Depth of Focus (DOF): 22.3 nm (k₂ = 0.50)</span>
            <span class="stat-label">Rayleigh Depth of Focus (DOF = k₂·λ / NA²)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('lit-lambda'), naEl = document.getElementById('lit-na'), k1El = document.getElementById('lit-k1');
  const cdResEl = document.getElementById('lit-res-cd'), dofResEl = document.getElementById('lit-res-dof');

  function update() {
    const lambda = parseFloat(lamEl.value), NA = parseFloat(naEl.value), k1 = parseFloat(k1El.value);
    if (isNaN(lambda) || isNaN(NA) || isNaN(k1) || lambda <= 0 || NA <= 0 || k1 <= 0) return;

    // CD = k1 * lambda / NA  [nm]
    const CD = (k1 * lambda) / NA;

    // DOF = k2 * lambda / NA^2 where assume k2 = 0.50
    const k2 = 0.50;
    const DOF = (k2 * lambda) / Math.pow(NA, 2);

    cdResEl.textContent = 'CD = ' + CD.toFixed(2) + ' nm Minimum Feature';
    dofResEl.textContent = 'Depth of Focus DOF = ' + DOF.toFixed(1) + ' nm (k₁ = ' + k1.toFixed(2) + ', NA = ' + NA.toFixed(2) + ')';
  }

  lamEl.addEventListener('change', () => {
    if (lamEl.value === '13.5') naEl.value = '0.55';
    else if (lamEl.value === '193.0') naEl.value = '1.35';
    else naEl.value = '0.85';
    update();
  });
  naEl.addEventListener('input', update);
  k1El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select exposure light source wavelength (13.5 nm EUV, 193 nm DUV Immersion, 248 nm KrF).',
      'Enter projection lens system Numerical Aperture NA (e.g. 0.33 for standard EUV, 0.55 for High-NA EUV, 1.35 for ArFi immersion).',
      'Enter process factor k₁ (theoretical physical limit is $k_1 = 0.25$).',
      'Inspect printed wafer Critical Dimension (CD) resolution in nanometers and Depth of Focus process window (DOF).'
    ],
    benefitTitle: 'Lord Rayleigh 1879 Diffraction Limit in Microelectronics',
    benefitContent: 'Transitioning from 193 nm deep-UV laser light to 13.5 nm extreme ultraviolet (EUV) light reduced wavelength by over 14×, enabling the semiconductor industry to print sub-10 nm transistor gate features required for 3nm and 2nm node chips.',
    faqs: [{ q: 'Why does increasing NA reduce Depth of Focus (DOF)?', a: 'Because DOF scales inversely with $NA^2$ ($DOF \propto 1/NA^2$), higher NA lenses require atomic-level wafer flatness to prevent defocusing.' }]
  },

  // 12. Reactive Ion Etching (RIE) Selectivity & Anisotropy Calculator
  {
    slug: 'reactive-ion-etching-rie-aspect-ratio-selectivity-calculator',
    name: 'Reactive Ion Etching (RIE) Selectivity & Anisotropy Calculator',
    description: 'Calculate plasma Reactive Ion Etching (RIE) etch rate selectivity (S = ER_target / ER_mask) and directional anisotropy (A = 1 - R_L / R_V) for semiconductor nanostructures.',
    category: 'Science',
    icon: 'text',
    keywords: ['reactive ion etching calculator', 'rie etch selectivity formula er target over er mask', 'plasma etch anisotropy a equals 1 minus rl over rv calculator', 'semiconductor dry etch rate calculator online', 'silicon wafer plasma etching online'],
    order: 671,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vertical Etch Rate R_V (nm/min), Lateral Undercut R_L (nm/min) & Mask Etch Rate R_mask (nm/min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rie-rv">Vertical R_V (nm/min)</label>
          <input class="tool-textarea" id="rie-rv" type="number" step="any" value="350.0" placeholder="350.0 nm/min (Silicon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rie-rl">Lateral R_L (nm/min)</label>
          <input class="tool-textarea" id="rie-rl" type="number" step="any" value="15.0" placeholder="15.0 nm/min (Undercut)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rie-rmask">Mask R_mask (nm/min)</label>
          <input class="tool-textarea" id="rie-rmask" type="number" step="any" value="10.0" placeholder="10.0 nm/min (Photoresist)" />
        </div>
      </div>
      <div id="rie-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rie-res-aniso" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Anisotropy A = 0.957 (95.7%)</span>
            <span class="stat-label">Directional Anisotropy (A = 1 - R_L / R_V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rie-res-sel" style="font-weight:700;">Selectivity S = 35.0 : 1 (Target Si vs Photoresist Mask)</span>
            <span class="stat-label">Etch Selectivity Ratio (S = R_V / R_mask)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rvEl = document.getElementById('rie-rv'), rlEl = document.getElementById('rie-rl'), rmEl = document.getElementById('rie-rmask');
  const aResEl = document.getElementById('rie-res-aniso'), sResEl = document.getElementById('rie-res-sel');

  function update() {
    const Rv = parseFloat(rvEl.value), Rl = parseFloat(rlEl.value), Rmask = parseFloat(rmEl.value);
    if (isNaN(Rv) || isNaN(Rl) || isNaN(Rmask) || Rv <= 0 || Rl < 0 || Rmask <= 0) return;

    // Anisotropy A = 1 - (Rl / Rv)
    const A = Math.max(0, 1 - (Rl / Rv));
    const APct = A * 100;

    // Selectivity S = Rv / Rmask
    const S = Rv / Rmask;

    aResEl.textContent = 'Anisotropy A = ' + A.toFixed(3) + ' (' + APct.toFixed(1) + '% Vertical Directionality)';
    sResEl.textContent = 'Selectivity S = ' + S.toFixed(1) + ' : 1 (Etches ' + S.toFixed(1) + '× Faster than Mask)';
  }

  [rvEl, rlEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vertical downward plasma etch rate R_V in nm/min.',
      'Enter horizontal lateral undercut rate R_L in nm/min ($R_L = 0$ for perfectly vertical trenches).',
      'Enter photoresist or hardmask etching erosion rate R_mask in nm/min.',
      'Inspect directional Anisotropy factor A ($A=1.0$ is pure anisotropic vertical etching) and Target-to-Mask selectivity ratio S.'
    ],
    benefitTitle: 'Dry Plasma Etching vs Wet Isotropic Chemistry',
    benefitContent: 'Wet chemical etching attacks material equally in all directions (isotropic $A=0$), washing away sub-micron lines; Reactive Ion Etching uses energetic ion bombardment ($SF_6, CF_4, Cl_2$) to achieve near-vertical sidewalls ($A > 0.95$).',
    faqs: [{ q: 'What is the Bosch deep silicon etching process?', a: 'The Bosch process alternates rapidly between $SF_6$ plasma etching and $C_4F_8$ polymer sidewall passivation to achieve high aspect ratio (>50:1) MEMS vertical silicon trenches.' }]
  },

  // 13. Chemical Vapor Deposition (CVD) Thin-Film Growth Rate Calculator
  {
    slug: 'chemical-vapor-deposition-cvd-thin-film-growth-rate-calculator',
    name: 'Chemical Vapor Deposition (CVD) Thin Film Growth Rate Calculator',
    description: 'Calculate semiconductor CVD thin film deposition growth rate in nm/min across Mass-Transfer Limited (high temp) and Surface-Reaction Limited (low temp Arrhenius) regimes.',
    category: 'Science',
    icon: 'text',
    keywords: ['cvd growth rate calculator', 'chemical vapor deposition thin film formula online', 'deal grove cvd mass transfer surface reaction calculator', 'semiconductor thin film deposition rate calculator', 'cvd reactor temperature growth rate online'],
    order: 672,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Substrate Temperature T (°C), Precursor Gas Concentration C_g (mol/m³) & Mass Transfer h_g (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cvd-temp">Wafer Temp (°C)</label>
          <input class="tool-textarea" id="cvd-temp" type="number" step="any" value="650" placeholder="650 °C (LPCVD Polysilicon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cvd-cg">Precursor C_g (mol/m³)</label>
          <input class="tool-textarea" id="cvd-cg" type="number" step="any" value="0.05" placeholder="0.05 mol/m³ (SiH₄ Silane)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cvd-hg">Transfer h_g (m/s)</label>
          <input class="tool-textarea" id="cvd-hg" type="number" step="any" value="0.08" placeholder="0.08 m/s (Gas Boundary)" />
        </div>
      </div>
      <div id="cvd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cvd-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">18.4 nm / min Growth</span>
            <span class="stat-label">Steady-State Film Deposition Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cvd-res-reg" style="color:var(--green-dark); font-weight:700;">Surface-Reaction Limited Regime (Temp Sensitive, Highly Conformal Step Coverage)</span>
            <span class="stat-label">CVD Thermodynamic Growth Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('cvd-temp'), cEl = document.getElementById('cvd-cg'), hEl = document.getElementById('cvd-hg');
  const rResEl = document.getElementById('cvd-res-rate'), rgResEl = document.getElementById('cvd-res-reg');

  const R = 8.314;
  const Ea_j = 150000; // 150 kJ/mol activation energy for SiH4 decomposition
  const k0 = 1.2e6; // pre-exponential reaction constant

  function update() {
    const Tc = parseFloat(tEl.value), Cg = parseFloat(cEl.value), hg = parseFloat(hEl.value);
    if (isNaN(Tc) || isNaN(Cg) || isNaN(hg) || Tc < 200 || Cg <= 0 || hg <= 0) return;

    const Tk = Tc + 273.15;
    // Surface reaction rate coefficient ks = k0 * exp(-Ea / RT)  [m / s]
    const ks = k0 * Math.exp(-Ea_j / (R * Tk));

    // Combined flux J = (hg * ks / (hg + ks)) * Cg  [mol / m^2 * s]
    const J = ((hg * ks) / (hg + ks)) * Cg;

    // Growth rate in nm/min: growth = (J * M_si / rho_si) * 1e9 * 60
    // M_si = 0.028085 kg/mol, rho_si = 2330 kg/m^3 => M/rho = 1.205e-5 m^3/mol
    const growthNmMin = J * 1.205e-5 * 1e9 * 60;

    rResEl.textContent = growthNmMin.toFixed(1) + ' nm / min Growth Rate';

    if (ks < hg * 0.5) {
      rgResEl.textContent = 'SURFACE-REACTION CONTROL (ks << hg): Excellent Conformal Step Coverage across Trenches';
      rgResEl.style.color = '#22543d';
    } else if (ks > hg * 2.0) {
      rgResEl.textContent = 'MASS-TRANSFER CONTROL (ks >> hg): Gas Flow Limited - Risk of Non-Uniform Overhangs';
      rgResEl.style.color = '#d97706';
    } else {
      rgResEl.textContent = 'TRANSITIONAL REGIME (Mixed Surface & Gas Boundary Layer Resistance)';
      rgResEl.style.color = '#2563eb';
    }
  }

  [tEl, cEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter semiconductor wafer susceptor temperature in Celsius (e.g. 600°C - 750°C for LPCVD polysilicon/silicon nitride).',
      'Enter precursor reactant gas concentration $C_g$ in $\text{mol}/m^3$.',
      'Enter gas boundary layer mass transfer coefficient $h_g$ in m/s.',
      'Inspect steady-state thin-film deposition rate in nm/min and identify the active rate-limiting kinetic regime.'
    ],
    benefitTitle: 'Grove & Deal Two-Step Heterogeneous CVD Kinetics',
    benefitContent: 'Operating CVD reactors in the surface-reaction limited regime ($k_s \ll h_g$) ensures precursor gas molecules diffuse deep into narrow 3D transistor FinFET trenches before reacting, delivering 100% conformal step coverage.',
    faqs: [{ q: 'Why is mass-transfer limited CVD avoided for complex 3D topology?', a: 'Under mass-transfer control, precursors react immediately upon striking the top surface, creating thick crowns on corners while leaving bottom corners starved.' }]
  },

  // 14. Ion Implantation Projected Range & Straggle (LSS Theory) Calculator
  {
    slug: 'ion-implantation-projected-range-straggle-calculator',
    name: 'Ion Implantation Projected Range & Straggle (LSS Theory) Calculator',
    description: 'Calculate semiconductor dopant ion implantation depth profile (Projected Range R_p and Straggle ΔR_p) and peak Gaussian dopant concentration (N_peak = Dose / (√(2π)·ΔR_p)).',
    category: 'Science',
    icon: 'text',
    keywords: ['ion implantation calculator', 'projected range rp straggle delta rp lss theory formula', 'peak dopant concentration gaussian profile calculator', 'boron phosphorus arsenic ion implantation silicon online', 'semiconductor dopant profile calculator'],
    order: 673,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dopant Species (Boron, Phosphorus, Arsenic), Energy E (keV) & Ion Dose (ions/cm²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ion-spec">Dopant Ion</label>
          <select class="tool-textarea" id="ion-spec">
            <option value="boron" selected>Boron (B+ Light, Deep Range)</option>
            <option value="phosphorus">Phosphorus (P+ Medium)</option>
            <option value="arsenic">Arsenic (As+ Heavy, Shallow Junction)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ion-energy">Energy E (keV)</label>
          <input class="tool-textarea" id="ion-energy" type="number" step="any" value="50.0" placeholder="50.0 keV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ion-dose">Dose (ions/cm²)</label>
          <input class="tool-textarea" id="ion-dose" type="number" step="any" value="1.0e15" placeholder="1.0e15 ions/cm² (Source/Drain)" />
        </div>
      </div>
      <div id="ion-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ion-res-rp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R_p = 175.0 nm (ΔR_p = 54.0 nm)</span>
            <span class="stat-label">Projected Range Depth (R_p) & Longitudinal Straggle (ΔR_p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ion-res-peak" style="font-weight:700;">Peak Concentration: 7.39 × 10¹⁹ atoms/cm³ @ 175 nm</span>
            <span class="stat-label">Peak Gaussian Doping Density (N_peak = Φ / (√(2π)·ΔR_p))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spEl = document.getElementById('ion-spec'), eEl = document.getElementById('ion-energy'), dEl = document.getElementById('ion-dose');
  const rpResEl = document.getElementById('ion-res-rp'), pkResEl = document.getElementById('ion-res-peak');

  const DOPANTS = {
    'boron':      { factorRp: 3.50, factorD始めて: 1.08, name: 'Boron' },
    'phosphorus': { factorRp: 1.25, factorD始めて: 0.48, name: 'Phosphorus' },
    'arsenic':    { factorRp: 0.65, factorD始めて: 0.24, name: 'Arsenic' }
  };

  function update() {
    const dop = DOPANTS[spEl.value];
    const E_kev = parseFloat(eEl.value), Dose = parseFloat(dEl.value);

    if (isNaN(E_kev) || isNaN(Dose) || E_kev <= 0 || Dose <= 0) return;

    // LSS theory projected range approximations in silicon:
    const Rp_nm = dop.factorRp * E_kev;
    const deltaRp_nm = dop.factorD始めて * E_kev * 0.85;

    // Peak concentration N_peak = Dose / ( sqrt(2*pi) * deltaRp_cm )
    const deltaRp_cm = deltaRp_nm * 1e-7;
    const N_peak = Dose / (Math.sqrt(2 * Math.PI) * deltaRp_cm);

    rpResEl.textContent = 'R_p = ' + Rp_nm.toFixed(1) + ' nm (Straggle ΔR_p = ' + deltaRp_nm.toFixed(1) + ' nm)';
    pkResEl.textContent = 'Peak: ' + N_peak.toExponential(2) + ' atoms/cm³ @ ' + Rp_nm.toFixed(0) + ' nm Depth (Dose: ' + Dose.toExponential(1) + ' ions/cm²)';
  }

  spEl.addEventListener('change', update);
  [eEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select dopant ion species (Boron for P-type, Phosphorus/Arsenic for N-type).',
      'Enter ion accelerator kinetic energy in keV (typically 10 to 150 keV).',
      'Enter total implanted dose in ions/cm² (typically $10^{12}$ for threshold adjust to $10^{15}\text{ ions/cm}^2$ for source/drain contact junctions).',
      'Inspect average projected depth range $R_p$, longitudinal straggle Gaussian spread $\Delta R_p$, and peak subsurface doping concentration.'
    ],
    benefitTitle: 'Lindhard, Scharff & Schiøtt (LSS) 1963 Stopping Theory',
    benefitContent: 'Implanted ions lose kinetic energy via electronic drag and nuclear elastic collisions with silicon atoms; heavy arsenic ions stop rapidly within a few dozen nanometers, making them ideal for ultra-shallow source/drain junctions.',
    faqs: [{ q: 'Why is high-temperature rapid thermal annealing (RTA) required after ion implantation?', a: 'Bombarding ions destroy the silicon crystalline lattice into an amorphous state; thermal annealing recrystallizes the lattice and electrically activates the dopants into substitutional lattice sites.' }]
  },

  // 15. Atomic Layer Deposition (ALD) Growth Per Cycle (GPC) Calculator
  {
    slug: 'atomic-layer-deposition-ald-growth-per-cycle-calculator',
    name: 'Atomic Layer Deposition (ALD) Growth Per Cycle (GPC) & Film Thickness Calculator',
    description: 'Calculate self-limiting Atomic Layer Deposition (ALD) ultra-thin dielectric oxide film thickness (t = N_cycles · GPC) in Angstroms/nanometers for high-k gate oxides (HfO₂, Al₂O₃, TiO₂).',
    category: 'Science',
    icon: 'text',
    keywords: ['atomic layer deposition calculator', 'ald growth per cycle gpc formula online', 'high k dielectric thickness hfo2 al2o3 ald calculator', 'self limiting monolayer ald calculator online', 'semiconductor gate dielectric thickness online'],
    order: 674,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Precursor Chemistry (Al₂O₃, HfO₂, TiO₂), Cycle Count N & Deposition Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ald-mat">Film Material</label>
          <select class="tool-textarea" id="ald-mat">
            <option value="al2o3" selected>Al₂O₃ (TMA + H₂O: GPC = 1.10 Å / cycle)</option>
            <option value="hfo2">HfO₂ (TEMAH + H₂O: GPC = 0.95 Å / cycle - High-k Gate)</option>
            <option value="tio2">TiO₂ (TTIP + H₂O: GPC = 0.50 Å / cycle)</option>
            <option value="zno">ZnO (DEZ + H₂O: GPC = 1.80 Å / cycle)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ald-cycles">ALD Cycles (N)</label>
          <input class="tool-textarea" id="ald-cycles" type="number" step="10" value="150" placeholder="150 Cycles" />
        </div>
      </div>
      <div id="ald-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ald-res-thk" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16.50 nm (165.0 Å)</span>
            <span class="stat-label">Total Deposited Film Thickness (t = N · GPC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ald-res-mono" style="font-weight:700;">~55 Atomic Monolayers (100% Digital Atomic Step Precision)</span>
            <span class="stat-label">Atomic Layer Coverage & Conformality</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('ald-mat'), cycEl = document.getElementById('ald-cycles');
  const thResEl = document.getElementById('ald-res-thk'), moResEl = document.getElementById('ald-res-mono');

  const ALD_DATA = {
    'al2o3': { gpc_A: 1.10, mono_A: 3.0, name: 'Aluminium Oxide (Al₂O₃)' },
    'hfo2':  { gpc_A: 0.95, mono_A: 2.8, name: 'Hafnium Oxide (HfO₂ High-k)' },
    'tio2':  { gpc_A: 0.50, mono_A: 2.5, name: 'Titanium Dioxide (TiO₂)' },
    'zno':   { gpc_A: 1.80, mono_A: 2.6, name: 'Zinc Oxide (ZnO)' }
  };

  function update() {
    const d = ALD_DATA[matEl.value];
    const N = parseInt(cycEl.value, 10);
    if (isNaN(N) || N <= 0) return;

    // Total thickness in Angstroms = N * GPC
    const totalA = N * d.gpc_A;
    const totalNm = totalA / 10;
    const monolayers = totalA / d.mono_A;

    thResEl.textContent = totalNm.toFixed(2) + ' nm (' + totalA.toFixed(1) + ' Å Film Thickness)';
    moResEl.textContent = '~' + monolayers.toFixed(1) + ' Atomic Monolayers (GPC: ' + d.gpc_A.toFixed(2) + ' Å/cycle, 100% Self-Limiting Conformality)';
  }

  matEl.addEventListener('change', update);
  cycEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select atomic layer precursor chemistry (Al₂O₃ TMA, HfO₂ TEMAH, TiO₂ TTIP).',
      'Enter total sequential ALD pulse-purge cycle execution count N.',
      'Inspect total deposited film thickness in nanometers and Angstroms ($\text{Å}$) and equivalent atomic monolayers.'
    ],
    benefitTitle: 'Self-Limiting Surface Reaction Saturation',
    benefitContent: 'ALD pulses sequential precursor vapors separated by inert nitrogen flushes; precursor molecules saturate surface chemisorption sites and then stop completely, providing digital Angstrom-level thickness control and perfect 100% step coverage inside 3D NAND holes with 100:1 aspect ratios.',
    faqs: [{ q: 'Why is GPC less than a full atomic monolayer (~3 Å) per cycle?', a: 'Steric hindrance of bulky precursor ligands (such as methyl groups on TMA) prevents 100% dense surface packing during each exposure cycle.' }]
  },

  // --- Suite TTTT: Atmospheric Thermodynamics, Meteorology & Cloud Physics (795 - 799) ---
  // 16. Convective Available Potential Energy (CAPE) & Updraft Velocity Calculator
  {
    slug: 'cape-convective-available-potential-energy-calculator',
    name: 'CAPE (Convective Available Potential Energy) & Severe Storm Updraft Calculator',
    description: 'Calculate severe thunderstorm Convective Available Potential Energy (CAPE = ∫ g·(T_v,parcel - T_v,env)/T_v,env dz) in J/kg and theoretical maximum updraft velocity (W_max = √(2·CAPE)).',
    category: 'Science',
    icon: 'text',
    keywords: ['cape thunderstorm calculator', 'convective available potential energy formula j per kg', 'maximum updraft velocity w max sqrt 2 cape calculator', 'severe weather supercell cape online', 'meteorology soundings cape calculator'],
    order: 675,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'CAPE Value (J/kg) or Average Buoyancy Temperature Excess ΔT (°C) & Cloud Depth (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cape-val">CAPE (J/kg)</label>
          <input class="tool-textarea" id="cape-val" type="number" step="100" value="2500" placeholder="2500 J/kg (Very Unstable)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cape-cin">Convective Inhibit CIN (J/kg)</label>
          <input class="tool-textarea" id="cape-cin" type="number" step="10" value="40" placeholder="40 J/kg (Moderate Cap)" />
        </div>
      </div>
      <div id="cape-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cape-res-wmax" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">W_max = 70.7 m/s (254 km/h)</span>
            <span class="stat-label">Maximum Theoretical Updraft Velocity (W_max = √(2·CAPE))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cape-res-sev" style="color:var(--green-dark); font-weight:700;">EXTREME INSTABILITY: High Risk of Severe Hail & Tornadic Supercells</span>
            <span class="stat-label">Severe Convective Weather Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const capeEl = document.getElementById('cape-val'), cinEl = document.getElementById('cape-cin');
  const wResEl = document.getElementById('cape-res-wmax'), sResEl = document.getElementById('cape-res-sev');

  function update() {
    const cape = parseFloat(capeEl.value), cin = parseFloat(cinEl.value);
    if (isNaN(cape) || isNaN(cin) || cape < 0 || cin < 0) return;

    // W_max = sqrt( 2 * CAPE )  [m / s]
    const wmax_ms = Math.sqrt(2 * cape);
    const wmax_kmh = wmax_ms * 3.6;
    const wmax_mph = wmax_ms * 2.23694;

    let stormSeverity = '';
    let color = '#22543d';

    if (cape < 1000) {
      stormSeverity = 'MARGINAL INSTABILITY (Weak Ordinary Showers / Garden Thunderstorms)';
      color = '#2563eb';
    } else if (cape < 2500) {
      stormSeverity = 'MODERATE INSTABILITY (Strong Multicell Storms, Small Hail Risk)';
      color = '#d97706';
    } else if (cape < 3500) {
      stormSeverity = 'VERY HIGH INSTABILITY (Severe Supercells, Large Damaging Hail >2 inches)';
      color = '#c53030';
    } else {
      stormSeverity = 'EXTREME EXPLOSIVE INSTABILITY (Violent Tornadoes & Giant Hailstones)';
      color = '#c53030';
    }

    wResEl.textContent = 'W_max = ' + wmax_ms.toFixed(1) + ' m/s (' + wmax_kmh.toFixed(0) + ' km/h / ' + wmax_mph.toFixed(0) + ' mph)';
    sResEl.textContent = stormSeverity + ' | CIN Cap: ' + cin + ' J/kg';
    sResEl.style.color = color;
  }

  capeEl.addEventListener('input', update);
  cinEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Convective Available Potential Energy (CAPE) in Joules per kilogram (J/kg) from meteorological radiosonde sounding data.',
      'Enter Convective Inhibition (CIN) capping inversion strength in J/kg.',
      'Inspect theoretical maximum convective storm updraft velocity $W_{\max} = \sqrt{2\cdot\text{CAPE}}$ in m/s, km/h, and mph, and evaluate severe weather supercell risk.'
    ],
    benefitTitle: 'Thermodynamic Atmospheric Instability & Hail Suspension',
    benefitContent: 'CAPE represents the positive buoyant kinetic energy integrated between the Level of Free Convection (LFC) and the Equilibrium Level (EL); updrafts exceeding 50 m/s (180 km/h) suspend giant hailstones within supercell mesocyclones.',
    faqs: [{ q: 'Why is real-world updraft speed typically half of W_max?', a: 'Water droplet mass loading, entrainment of dry environmental air, and non-hydrostatic vertical pressure gradients reduce actual updraft velocities to approximately $0.5 \times W_{\max}$.' }]
  },

  // 17. Lifted Condensation Level (LCL) Cloud Base Height Calculator
  {
    slug: 'lifted-condensation-level-lcl-height-calculator',
    name: 'Lifted Condensation Level (LCL - Espy Formula) Cloud Base Calculator',
    description: 'Calculate cumulus cloud base altitude (z_LCL ≈ 125 · (T - T_d) meters or 220 · (T - T_d) feet) from surface dry-bulb air temperature and dew point.',
    category: 'Science',
    icon: 'text',
    keywords: ['lifted condensation level calculator', 'lcl cloud base height formula 125 t minus td', 'espy equation cumulus cloud base altitude online', 'dew point spread cloud base calculator', 'aviation ceiling lifted condensation level online'],
    order: 676,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Temperature T (°C) & Surface Dew Point T_d (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lcl-t">Air Temp T (°C)</label>
          <input class="tool-textarea" id="lcl-t" type="number" step="any" value="28.0" placeholder="28.0 °C (Summer Afternoon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lcl-td">Dew Point T_d (°C)</label>
          <input class="tool-textarea" id="lcl-td" type="number" step="any" value="16.0" placeholder="16.0 °C Dew Point" />
        </div>
      </div>
      <div id="lcl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lcl-res-ht" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,500 m (4,921 ft AGL)</span>
            <span class="stat-label">Cumulus Cloud Base Ceiling Altitude (z_LCL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lcl-res-spread" style="font-weight:700;">Dew Point Depression: 12.0°C | Cloud Base Temp: 13.3°C</span>
            <span class="stat-label">Surface T - T_d Spread & Condensation Temperature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('lcl-t'), tdEl = document.getElementById('lcl-td');
  const hResEl = document.getElementById('lcl-res-ht'), sResEl = document.getElementById('lcl-res-spread');

  function update() {
    const T = parseFloat(tEl.value), Td = parseFloat(tdEl.value);
    if (isNaN(T) || isNaN(Td) || T < Td) return;

    // Dew point depression
    const spread = T - Td;

    // Espy formula: z_LCL (meters) approx = 125 * (T - Td)
    const zMeters = 125 * spread;
    const zFeet = zMeters * 3.28084;

    // Dry adiabatic lapse rate = 9.8 °C / km
    // Cloud base temperature T_lcl = T - (9.8 * zMeters / 1000)
    const T_lcl = T - (9.8 * (zMeters / 1000));

    hResEl.textContent = Math.round(zMeters).toLocaleString() + ' m (' + Math.round(zFeet).toLocaleString() + ' ft AGL)';
    sResEl.textContent = 'Dew Point Spread: ' + spread.toFixed(1) + '°C | Condensation Temp at Cloud Base: ' + T_lcl.toFixed(1) + '°C';
  }

  tEl.addEventListener('input', update);
  tdEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter surface ambient dry-bulb air temperature T in Celsius.',
      'Enter surface dew point temperature $T_d$ in Celsius ($T_d \le T$).',
      'Inspect estimated fair-weather cumulus cloud base ceiling altitude in meters and feet above ground level (AGL).'
    ],
    benefitTitle: 'James Pollard Espy 1841 Thermal Convection Law',
    benefitContent: 'As warm surface air parcels rise, they cool at the Dry Adiabatic Lapse Rate ($\Gamma_d \approx 9.8^\circ\text{C/km}$) while the dew point falls much slower ($1.8^\circ\text{C/km}$); the LCL is the exact height where parcel temperature meets the dew point and relative humidity reaches 100%.',
    faqs: [{ q: 'What is the pilot aviation rule of thumb for cloud base in feet?', a: 'Pilots use $\text{Cloud Base (ft)} = \frac{T(^\circ\text{F}) - T_d(^\circ\text{F})}{4.4} \times 1000$ (equivalent to $222\text{ ft per }^\circ\text{C}$).' }]
  },

  // 18. Potential Temperature & Poisson Isentropic Relation Calculator
  {
    slug: 'potential-temperature-poisson-isentropic-calculator',
    name: 'Potential Temperature (θ = T·(P₀/P)^(R/c_p)) & Isentropic Calculator',
    description: 'Calculate atmospheric potential temperature θ (Poisson equation: θ = T · (1000 / P)^0.286) in Kelvin and Celsius to assess dry static stability and thermal inversions.',
    category: 'Science',
    icon: 'text',
    keywords: ['potential temperature calculator', 'poisson isentropic relation theta formula meteorology', 'atmospheric static stability potential temperature online', 'dry adiabatic potential temperature theta calculator', 'meteorology sounding theta online'],
    order: 677,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Air Temperature T (°C), Pressure Level P (hPa / mbar) & Reference P₀ (1000 hPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pot-t">Ambient Temp T (°C)</label>
          <input class="tool-textarea" id="pot-t" type="number" step="any" value="-15.0" placeholder="-15.0 °C (500 hPa Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pot-p">Pressure P (hPa)</label>
          <input class="tool-textarea" id="pot-p" type="number" step="any" value="500.0" placeholder="500.0 hPa (~5.5 km)" />
        </div>
      </div>
      <div id="pot-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pot-res-th" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">θ = 314.5 K (41.4 °C)</span>
            <span class="stat-label">Potential Temperature (θ = T·(1000/P)^0.286)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pot-res-stab" style="font-weight:700;">Thermally Stable Layer (Compressed Adiabatically to Sea Level)</span>
            <span class="stat-label">Isentropic Conservation Property</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('pot-t'), pEl = document.getElementById('pot-p');
  const thResEl = document.getElementById('pot-res-th'), stResEl = document.getElementById('pot-res-stab');

  const kappa = 0.2857; // R_d / c_p = 287.05 / 1005 for dry air

  function update() {
    const Tc = parseFloat(tEl.value), P = parseFloat(pEl.value);
    if (isNaN(Tc) || isNaN(P) || P <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    // Potential temperature theta = T * (1000 / P)^kappa  [Kelvin]
    const thetaK = Tk * Math.pow(1000.0 / P, kappa);
    const thetaC = thetaK - 273.15;

    thResEl.textContent = 'θ = ' + thetaK.toFixed(1) + ' K (' + thetaC.toFixed(1) + ' °C)';
    stResEl.textContent = 'Adiabatic Compression: Air parcel at ' + P + ' hPa warms from ' + Tc + '°C to ' + thetaC.toFixed(1) + '°C if brought to 1000 hPa surface';
  }

  tEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter measured upper-air ambient dry-bulb temperature T in Celsius.',
      'Enter atmospheric isobaric pressure level P in hPa / mbar (e.g. 500 hPa for mid-troposphere, 850 hPa for boundary layer).',
      'Inspect conserved isentropic Potential Temperature $\theta$ in Kelvin and Celsius.'
    ],
    benefitTitle: 'Siméon Denis Poisson 1823 Isentropic Gas Expansion',
    benefitContent: 'Potential temperature ($\theta$) is conserved during all dry adiabatic vertical motions; comparing $\partial\theta/\partial z$ allows meteorologists to identify stable layers ($\partial\theta/\partial z > 0$), neutrally mixed boundary layers ($\partial\theta/\partial z = 0$), and unstable overturning layers.',
    faqs: [{ q: 'Why is potential temperature higher than ambient temperature in the upper troposphere?', a: 'Because bringing high-altitude low-pressure air down to 1000 hPa compresses and heats the parcel via adiabatic compression.' }]
  },

  // 19. Geostrophic Wind Speed (Coriolis & Pressure Gradient) Calculator
  {
    slug: 'coriolis-geostrophic-wind-velocity-calculator',
    name: 'Geostrophic Wind Speed (v_g = (1 / ρ·f) · (ΔP / Δn)) Calculator',
    description: 'Calculate upper-level synoptic geostrophic wind speed in m/s, km/h, and knots from isobaric pressure gradient (ΔP / Δn), latitude, and air density.',
    category: 'Science',
    icon: 'text',
    keywords: ['geostrophic wind calculator', 'coriolis force pressure gradient geostrophic speed formula', 'synoptic weather map isobar wind speed calculator', 'geostrophic balance meteorology online', 'upper level jet stream wind calculator'],
    order: 678,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Isobar Pressure Drop ΔP (hPa), Isobar Distance Δn (km) & Latitude (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="geo-dp">Pressure Drop ΔP (hPa)</label>
          <input class="tool-textarea" id="geo-dp" type="number" step="any" value="4.0" placeholder="4.0 hPa (Isobar Interval)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="geo-dn">Distance Δn (km)</label>
          <input class="tool-textarea" id="geo-dn" type="number" step="any" value="200.0" placeholder="200.0 km" />
        </div>
        <div class="control-group">
          <label class="control-label" for="geo-lat">Latitude (°)</label>
          <input class="tool-textarea" id="geo-lat" type="number" step="any" value="45.0" placeholder="45.0° (Mid-Latitudes)" />
        </div>
      </div>
      <div id="geo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="geo-res-spd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">19.4 m / s (37.7 Knots)</span>
            <span class="stat-label">Geostrophic Wind Speed (v_g = (1/ρf)·(ΔP/Δn))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="geo-res-dir" style="font-weight:700;">Flows Parallel to Isobars (Low Pressure on Left in Northern Hemisphere)</span>
            <span class="stat-label">Geostrophic Balance Direction (Buys Ballot Law)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('geo-dp'), dnEl = document.getElementById('geo-dn'), latEl = document.getElementById('geo-lat');
  const sResEl = document.getElementById('geo-res-spd'), dResEl = document.getElementById('geo-res-dir');

  const omega = 7.2921159e-5; // rad / s Earth rotation
  const rho_air = 1.00; // kg / m^3 @ 850 hPa level

  function update() {
    const dP_hpa = parseFloat(dpEl.value), dnKm = parseFloat(dnEl.value), lat = parseFloat(latEl.value);
    if (isNaN(dP_hpa) || isNaN(dnKm) || isNaN(lat) || dP_hpa <= 0 || dnKm <= 0 || Math.abs(lat) === 0 || Math.abs(lat) > 90) return;

    const latRad = (lat * Math.PI) / 180;
    const f_coriolis = 2 * omega * Math.sin(latRad);
    const absF = Math.abs(f_coriolis);

    // Pressure gradient in Pa / m: (dP_hpa * 100) / (dnKm * 1000) = dP_hpa / (10 * dnKm)
    const gradP_Pa_m = (dP_hpa * 100) / (dnKm * 1000);

    // Geostrophic speed v_g = (1 / (rho * f)) * gradP  [m / s]
    const vgMs = gradP_Pa_m / (rho_air * absF);
    const vgKmh = vgMs * 3.6;
    const vgKts = vgMs * 1.94384;

    const hemisphere = lat > 0 ? 'Northern' : 'Southern';
    const lowSide = lat > 0 ? 'Left' : 'Right';

    sResEl.textContent = vgMs.toFixed(1) + ' m / s (' + vgKmh.toFixed(1) + ' km/h / ' + vgKts.toFixed(1) + ' Knots)';
    dResEl.textContent = 'Flows parallel to isobars (' + hemisphere + ' Hemisphere: Low pressure to the ' + lowSide + ', Coriolis f = ' + absF.toExponential(2) + ' s⁻¹)';
  }

  [dpEl, dnEl, latEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter isobar pressure difference $\Delta P$ in hPa between adjacent contour lines on a weather chart.',
      'Enter perpendicular distance $\Delta n$ between isobars in kilometers.',
      'Enter geographic latitude in degrees.',
      'Inspect theoretical geostrophic wind speed in m/s, km/h, and Knots, and check Buys Ballot\'s directional law.'
    ],
    benefitTitle: 'Geostrophic Equilibrium Balance',
    benefitContent: 'Above the planetary friction boundary layer (>1 km altitude), horizontal pressure gradient forces pushing toward low pressure are perfectly balanced by perpendicular Coriolis forces, causing winds to blow parallel to isobar contour lines.',
    faqs: [{ q: 'Why is the geostrophic wind zero at the Equator?', a: 'Because Coriolis force vanishes at the Equator ($\sin 0^\circ = 0$), geostrophic balance cannot exist in the tropics.' }]
  },

  // 20. Rossby Planetary Wave Phase Speed Calculator
  {
    slug: 'relative-vorticity-rossby-wave-speed-calculator',
    name: 'Rossby Planetary Wave Phase Speed (c = u - β / k²) Calculator',
    description: 'Calculate large-scale atmospheric Rossby wave propagation phase speed (c = u - β / K²) in m/s and km/h and determine stationary blocking ridge wavelengths.',
    category: 'Science',
    icon: 'text',
    keywords: ['rossby wave speed calculator', 'planetary wave phase velocity formula c equals u minus beta over k squared', 'meteorology rossby wave wavelength calculator', 'atmospheric jet stream rossby waves online', 'stationary weather blocking ridge calculator'],
    order: 679,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Zonal Jet Stream Speed u (m/s), Wavelength L (km) & Latitude (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ros-u">Zonal Wind u (m/s)</label>
          <input class="tool-textarea" id="ros-u" type="number" step="any" value="30.0" placeholder="30.0 m/s (Jet Stream)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ros-wlen">Wavelength L (km)</label>
          <input class="tool-textarea" id="ros-wlen" type="number" step="any" value="6000" placeholder="6000 km (Synoptic Wave)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ros-lat">Latitude (°)</label>
          <input class="tool-textarea" id="ros-lat" type="number" step="any" value="45.0" placeholder="45.0°" />
        </div>
      </div>
      <div id="ros-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ros-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">c = +15.1 m / s (Eastward)</span>
            <span class="stat-label">Rossby Wave Phase Propagation Speed (c = u - β/k²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ros-res-stat" style="font-weight:700;">Stationary Wavelength L_s = 8,506 km (Blocking Pattern Threshold)</span>
            <span class="stat-label">Stationary Wavelength (c = 0) & Weather Movement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('ros-u'), wEl = document.getElementById('ros-wlen'), latEl = document.getElementById('ros-lat');
  const cResEl = document.getElementById('ros-res-c'), stResEl = document.getElementById('ros-res-stat');

  const omega = 7.2921159e-5;
  const R_earth = 6.371e6; // meters

  function update() {
    const u = parseFloat(uEl.value), L_km = parseFloat(wEl.value), lat = parseFloat(latEl.value);
    if (isNaN(u) || isNaN(L_km) || isNaN(lat) || L_km <= 0 || Math.abs(lat) > 90) return;

    const latRad = (lat * Math.PI) / 180;
    // Beta = 2 * omega * cos(lat) / R_earth  [m^-1 s^-1]
    const beta = (2 * omega * Math.cos(latRad)) / R_earth;

    const L_m = L_km * 1000;
    // Wavenumber k = 2 * pi / L
    const k = (2 * Math.PI) / L_m;

    // Phase speed c = u - (beta / k^2)  [m / s]
    const c = u - (beta / Math.pow(k, 2));
    const cKmh = c * 3.6;

    // Stationary wavelength L_s where c = 0 => k_s^2 = beta / u => L_s = 2*pi*sqrt(u / beta)
    const Ls_m = 2 * Math.PI * Math.sqrt(u / beta);
    const Ls_km = Ls_m / 1000;

    let dir = c >= 0 ? 'Eastward Progressive' : 'Westward Retrograde';
    cResEl.textContent = 'c = ' + (c >= 0 ? '+' : '') + c.toFixed(1) + ' m / s (' + cKmh.toFixed(1) + ' km/h ' + dir + ')';
    stResEl.textContent = 'Stationary Wavelength L_s = ' + Math.round(Ls_km).toLocaleString() + ' km (Waves longer than L_s retrogress westward)';
  }

  [uEl, wEl, latEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mean zonal eastward jet stream velocity u in m/s.',
      'Enter synoptic planetary Rossby wave wavelength in kilometers.',
      'Enter geographic latitude in degrees.',
      'Inspect wave phase speed c in m/s and km/h and determine the critical stationary wavelength $L_s = 2\pi\sqrt{u/\beta}$ that causes persistent weather blocking patterns.'
    ],
    benefitTitle: 'Carl-Gustaf Rossby 1939 Potential Vorticity Waves',
    benefitContent: 'Conservation of absolute vorticity ($\eta = \zeta + f$) on a rotating sphere generates restoring planetary waves; short synoptic waves move eastward with the background wind, while ultra-long planetary waves retrogress westward relative to the flow.',
    faqs: [{ q: 'What happens when Rossby wavelength equals L_s?', a: 'When $L = L_s$, the wave phase speed becomes zero ($c = 0$), freezing high-pressure ridges in place to cause prolonged heatwaves or persistent flooding.' }]
  },

  // --- Suite UUUU: Materials Science, Crystallography & Metallurgy (800 - 805) ---
  // 21. Bragg's Law X-Ray Diffraction (XRD) Interplanar Spacing Calculator
  {
    slug: 'bragg-law-xray-diffraction-interplanar-spacing-calculator',
    name: 'Bragg\'s Law X-Ray Diffraction (n·λ = 2·d·sin θ) Calculator',
    description: 'Calculate crystal lattice interplanar spacing (d = n·λ / (2·sin θ)) in Angstroms (Å) and cubic unit cell lattice parameter a from XRD Bragg peak angles.',
    category: 'Science',
    icon: 'text',
    keywords: ['braggs law calculator', 'xray diffraction interplanar spacing formula n lambda 2 d sin theta', 'xrd lattice constant a calculator online', 'cubic crystal plane miller indices hkl calculator', 'materials science crystallography braggs law online'],
    order: 680,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'X-Ray Wavelength λ (Å), Diffraction Angle 2θ (°) & Miller Indices (h, k, l)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="brg-lam">X-Ray Wavelength λ (Å)</label>
          <input class="tool-textarea" id="brg-lam" type="number" step="any" value="1.5406" placeholder="1.5406 Å (Cu K-α)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-2th">Peak Angle 2θ (°)</label>
          <input class="tool-textarea" id="brg-2th" type="number" step="any" value="43.30" placeholder="43.30° (2-Theta)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-h">Miller (h)</label>
          <input class="tool-textarea" id="brg-h" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-k">Miller (k)</label>
          <input class="tool-textarea" id="brg-k" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-l">Miller (l)</label>
          <input class="tool-textarea" id="brg-l" type="number" step="1" value="1" placeholder="1" />
        </div>
      </div>
      <div id="brg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="brg-res-d" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d₁₁₁ = 2.088 Å (0.2088 nm)</span>
            <span class="stat-label">Lattice Interplanar Spacing (d_hkl = λ / 2·sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="brg-res-a" style="font-weight:700;">Cubic Lattice Parameter a = 3.616 Å (Copper FCC Crystal)</span>
            <span class="stat-label">Cubic Unit Cell Parameter (a = d · √(h² + k² + l²))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('brg-lam'), th2El = document.getElementById('brg-2th');
  const hEl = document.getElementById('brg-h'), kEl = document.getElementById('brg-k'), lEl = document.getElementById('brg-l');
  const dResEl = document.getElementById('brg-res-d'), aResEl = document.getElementById('brg-res-a');

  function update() {
    const lambdaA = parseFloat(lamEl.value), twoThetaDeg = parseFloat(th2El.value);
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);

    if (isNaN(lambdaA) || isNaN(twoThetaDeg) || isNaN(h) || isNaN(k) || isNaN(l) || lambdaA <= 0 || twoThetaDeg <= 0 || twoThetaDeg >= 180) return;

    const thetaDeg = twoThetaDeg / 2;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Bragg's Law for first order (n=1): d = lambda / (2 * sin(theta))
    const dSpacingA = lambdaA / (2 * Math.sin(thetaRad));
    const dSpacingNm = dSpacingA / 10;

    // For cubic crystal: a = d * sqrt(h^2 + k^2 + l^2)
    const hklSumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const aLatticeA = dSpacingA * Math.sqrt(hklSumSq);

    dResEl.textContent = 'd_' + h + k + l + ' = ' + dSpacingA.toFixed(4) + ' Å (' + dSpacingNm.toFixed(4) + ' nm)';
    aResEl.textContent = 'Cubic Lattice a = ' + aLatticeA.toFixed(4) + ' Å (Peak θ = ' + thetaDeg.toFixed(2) + '° | Planes (' + h + ',' + k + ',' + l + '))';
  }

  [lamEl, th2El, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laboratory X-ray source wavelength $\lambda$ in Angstroms ($\text{Å}$) (e.g. $1.5406\text{ \AA}$ for standard Copper $K_\alpha$ radiation).',
      'Enter measured diffractometer detector peak angle $2\theta$ in degrees.',
      'Enter crystal plane Miller indices $(h, k, l)$ (e.g. (1,1,1) or (2,0,0)).',
      'Inspect crystal interplanar spacing $d_{hkl}$ in $\text{Å}$ and calculate the unit cell cubic lattice parameter a.'
    ],
    benefitTitle: 'William Henry & William Lawrence Bragg 1913 Physics',
    benefitContent: 'Constructive wave interference occurs when the extra path length traveled by X-rays reflecting from adjacent atomic planes equals an integer number of wavelengths ($2d\sin\theta = n\lambda$), enabling atomic structure determination of metals, semiconductors, and proteins.',
    faqs: [{ q: 'Why is 2θ reported on XRD graphs rather than θ?', a: 'Diffractometer instruments measure the angular deflection between the incident X-ray beam and the detector, which is geometrically equal to $2\theta$.' }]
  },

  // 22. Hall-Petch Grain Boundary Strengthening Yield Strength Calculator
  {
    slug: 'hall-petch-grain-size-yield-strength-calculator',
    name: 'Hall-Petch Grain Boundary Strengthening Yield Strength Calculator',
    description: 'Calculate polycrystalline metal yield strength (σ_y = σ₀ + k_y · d^(-1/2)) in MPa from friction stress σ₀, Hall-Petch strengthening coefficient k_y, and average grain size d.',
    category: 'Science',
    icon: 'text',
    keywords: ['hall petch calculator', 'grain size yield strength formula sigma y equals sigma 0 plus k y d minus half', 'hall petch strengthening equation metallurgy online', 'grain boundary strengthening calculator online', 'metal yield strength grain size calculator'],
    order: 681,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Friction Stress σ₀ (MPa), Hall-Petch Slope k_y (MPa·μm^0.5) & Grain Size d (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-s0">Friction σ₀ (MPa)</label>
          <input class="tool-textarea" id="hp-s0" type="number" step="any" value="70.0" placeholder="70.0 MPa (Pure Iron)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-ky">Slope k_y</label>
          <input class="tool-textarea" id="hp-ky" type="number" step="any" value="600.0" placeholder="600.0 MPa·μm^0.5 (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-d">Grain Size d (μm)</label>
          <input class="tool-textarea" id="hp-d" type="number" step="any" value="16.0" placeholder="16.0 μm (Fine Grain)" />
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-sy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">σ_y = 220.0 MPa Yield</span>
            <span class="stat-label">Polycrystalline Yield Strength (σ_y = σ₀ + k_y·d^(-1/2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-boost" style="font-weight:700;">+150.0 MPa Grain Boundary Hardening (+214.3% Strength Increase)</span>
            <span class="stat-label">Grain Refinement Strengthening Contribution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s0El = document.getElementById('hp-s0'), kyEl = document.getElementById('hp-ky'), dEl = document.getElementById('hp-d');
  const syResEl = document.getElementById('hp-res-sy'), bResEl = document.getElementById('hp-res-boost');

  function update() {
    const s0 = parseFloat(s0El.value), ky = parseFloat(kyEl.value), d_um = parseFloat(dEl.value);
    if (isNaN(s0) || isNaN(ky) || isNaN(d_um) || s0 < 0 || ky <= 0 || d_um <= 0) return;

    // Hall-Petch: sigma_y = sigma_0 + ky * (d_um)^(-0.5)
    const grainStrengthening = ky * (1 / Math.sqrt(d_um));
    const sigma_y = s0 + grainStrengthening;
    const boostPct = (grainStrengthening / s0) * 100;

    syResEl.textContent = 'σ_y = ' + sigma_y.toFixed(1) + ' MPa (' + (sigma_y * 0.145038).toFixed(1) + ' ksi)';
    bResEl.textContent = '+' + grainStrengthening.toFixed(1) + ' MPa Grain Hardening (d = ' + d_um + ' μm, +' + boostPct.toFixed(1) + '% above Base σ₀ = ' + s0 + ' MPa)';
  }

  [s0El, kyEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter single-crystal lattice friction resistance stress $\sigma_0$ in MPa.',
      'Enter material-specific Hall-Petch strengthening slope coefficient $k_y$ in $\text{MPa}\cdot\mu\text{m}^{0.5}$.',
      'Enter average metallurgical grain diameter d in micrometers ($\mu\text{m}$).',
      'Inspect polycrystalline yield strength $\sigma_y$ and grain boundary dislocation pile-up strengthening contribution.'
    ],
    benefitTitle: 'E.O. Hall 1951 & N.J. Petch 1953 Dislocation Pile-Up Theory',
    benefitContent: 'Grain boundaries act as physical barriers that block dislocation slip motion; smaller grains reduce the number of dislocations in a slip pile-up ($n \propto d$), requiring higher applied stress to nucleate yielding in adjacent grains without sacrificing fracture toughness.',
    faqs: [{ q: 'What is the Inverse Hall-Petch effect?', a: 'Below ~10 nanometers grain size, grain boundary sliding takes over from dislocation slip, causing material strength to soften rather than harden.' }]
  },

  // 23. Fick's Second Law Case Hardening & Carburization Depth Calculator
  {
    slug: 'fick-second-law-case-hardening-diffusion-depth-calculator',
    name: 'Fick\'s Second Law Case Hardening & Diffusion Depth Calculator',
    description: 'Calculate steel surface carburization and solid-state diffusion profiles (C(x,t) = C_s - (C_s - C_0) · erf(x / 2√(D·t))) in mm and penetration time in hours.',
    category: 'Science',
    icon: 'text',
    keywords: ['fick second law calculator', 'carburization case depth formula erf error function', 'solid state diffusion depth calculator online', 'steel case hardening heat treatment calculator', 'diffusion coefficient time depth calculator'],
    order: 682,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Carbon C_s (wt %), Core Carbon C_0 (wt %), Target Depth x (mm) & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fck-cs">Surface C_s (wt %)</label>
          <input class="tool-textarea" id="fck-cs" type="number" step="0.05" value="1.00" placeholder="1.00 wt % (Gas Atmosphere)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fck-c0">Core C_0 (wt %)</label>
          <input class="tool-textarea" id="fck-c0" type="number" step="0.05" value="0.20" placeholder="0.20 wt % (AISI 1020 Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fck-depth">Target Depth x (mm)</label>
          <input class="tool-textarea" id="fck-depth" type="number" step="0.1" value="1.0" placeholder="1.0 mm Case Depth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fck-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="fck-temp" type="number" step="any" value="950" placeholder="950 °C (Austenite Phase)" />
        </div>
      </div>
      <div id="fck-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fck-res-time" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.86 Hours Furnace Time</span>
            <span class="stat-label">Required Carburization Furnace Soaking Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fck-res-d" style="font-weight:700;">Diffusivity D = 2.05 × 10⁻¹¹ m²/s (Carbon at 1.0 mm Reaches 0.50 wt %)</span>
            <span class="stat-label">Carbon in FCC γ-Iron Diffusion Coefficient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const csEl = document.getElementById('fck-cs'), c0El = document.getElementById('fck-c0');
  const xEl = document.getElementById('fck-depth'), tEl = document.getElementById('fck-temp');
  const tmResEl = document.getElementById('fck-res-time'), dResEl = document.getElementById('fck-res-d');

  const R = 8.314;
  const D0 = 2.3e-5; // m^2 / s for carbon in FCC austenite iron
  const Qd_j = 148000; // 148 kJ/mol activation energy

  function update() {
    const Cs = parseFloat(csEl.value), C0 = parseFloat(c0El.value);
    const xMm = parseFloat(xEl.value), Tc = parseFloat(tEl.value);

    if (isNaN(Cs) || isNaN(C0) || isNaN(xMm) || isNaN(Tc) || Cs <= C0 || xMm <= 0 || Tc < 700) return;

    const Tk = Tc + 273.15;
    // Arrhenius diffusion coefficient D = D0 * exp(-Qd / RT)  [m^2 / s]
    const D = D0 * Math.exp(-Qd_j / (R * Tk));

    // Target case hardness carbon level C_x = (Cs + C0) / 2 = mid-level carbon concentration
    // (C_x - C_0) / (C_s - C_0) = 0.5 = 1 - erf(z)  => erf(z) = 0.5 => z approx = 0.4769
    const z = 0.476936;
    // z = x / (2 * sqrt(D * t))  =>  t = (x / (2 * z))^2 / D  [seconds]
    const xMeters = xMm / 1000;
    const tSeconds = Math.pow(xMeters / (2 * z), 2) / D;
    const tHours = tSeconds / 3600;

    tmResEl.textContent = tHours.toFixed(2) + ' Hours Furnace Time (' + Math.round(tSeconds/60) + ' Minutes)';
    dResEl.textContent = 'Diffusivity D = ' + D.toExponential(2) + ' m²/s @ ' + Tc + '°C (50% Carbon Case Depth = ' + xMm + ' mm)';
  }

  [csEl, c0El, xEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter furnace carbon potential surface saturation concentration $C_s$ in wt %.',
      'Enter initial steel core base carbon concentration $C_0$ in wt % (e.g. 0.20 wt % for low-carbon gear steels).',
      'Enter target effective case hardening depth x in millimeters.',
      'Enter carburizing austenitization furnace temperature in Celsius (typically 900°C to 980°C).',
      'Inspect required furnace soaking time in hours to achieve specified case hardening depth.'
    ],
    benefitTitle: 'Adolf Fick 1855 Non-Steady-State Diffusion',
    benefitContent: 'Carburization diffuses carbon atoms into the interstitial octahedral sites of FCC austenite steel; quenching then transforms the hard carbon-rich surface layer into wear-resistant martensite while maintaining a tough, ductile low-carbon shock-absorbing core.',
    faqs: [{ q: 'Why is carburizing done in the austenite phase (>912°C)?', a: 'FCC gamma-iron (austenite) has a much higher carbon solubility (up to 2.14 wt %) and interstitial diffusion rate than BCC alpha-iron (ferrite).' }]
  },

  // 24. Lever Rule Binary Phase Diagram Phase Fraction Calculator
  {
    slug: 'lever-rule-binary-phase-diagram-fraction-calculator',
    name: 'Lever Rule Binary Alloy Phase Diagram Mass Fraction Calculator',
    description: 'Calculate binary alloy phase diagram tie-line mass fractions (w_α = (C_β - C₀) / (C_β - C_α) · 100%) and microconstituent phase percentages.',
    category: 'Science',
    icon: 'text',
    keywords: ['lever rule calculator', 'binary phase diagram tie line formula online', 'phase mass fraction alpha beta lever rule calculator', 'metallurgy phase diagram tie line calculator', 'materials science lever rule online'],
    order: 683,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Overall Alloy Composition C₀ (wt % B), Alpha Boundary C_α (wt % B) & Beta Boundary C_β (wt % B)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lev-c0">Alloy C₀ (wt %)</label>
          <input class="tool-textarea" id="lev-c0" type="number" step="any" value="40.0" placeholder="40.0 wt % (Overall Alloy)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lev-ca">Phase α C_α (wt %)</label>
          <input class="tool-textarea" id="lev-ca" type="number" step="any" value="15.0" placeholder="15.0 wt % (Left Tie-Line)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lev-cb">Phase β C_β (wt %)</label>
          <input class="tool-textarea" id="lev-cb" type="number" step="any" value="75.0" placeholder="75.0 wt % (Right Tie-Line)" />
        </div>
      </div>
      <div id="lev-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lev-res-frac" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">α: 58.3% | β: 41.7%</span>
            <span class="stat-label">Equilibrium Phase Mass Fractions (w_α and w_β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lev-res-tie" style="font-weight:700;">Tie-Line Length: 60.0 wt % | Opposite Arm Ratio: 35.0 / 60.0</span>
            <span class="stat-label">Tie-Line Invariant Lever Arm Balance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const c0El = document.getElementById('lev-c0'), caEl = document.getElementById('lev-ca'), cbEl = document.getElementById('lev-cb');
  const frResEl = document.getElementById('lev-res-frac'), tiResEl = document.getElementById('lev-res-tie');

  function update() {
    const C0 = parseFloat(c0El.value), Ca = parseFloat(caEl.value), Cb = parseFloat(cbEl.value);
    if (isNaN(C0) || isNaN(Ca) || isNaN(Cb) || Ca >= Cb || C0 < Ca || C0 > Cb) return;

    // Total tie-line length = C_beta - C_alpha
    const totalTie = Cb - Ca;

    // Lever Rule (Opposite arm length over total tie-line length):
    // w_alpha = (C_beta - C0) / (C_beta - C_alpha)
    // w_beta  = (C0 - C_alpha) / (C_beta - C_alpha)
    const w_alpha = (Cb - C0) / totalTie;
    const w_beta = (C0 - Ca) / totalTie;

    const w_alpha_pct = w_alpha * 100;
    const w_beta_pct = w_beta * 100;

    frResEl.textContent = 'Phase α: ' + w_alpha_pct.toFixed(1) + '% | Phase β: ' + w_beta_pct.toFixed(1) + '%';
    tiResEl.textContent = 'Tie-Line: ' + totalTie.toFixed(1) + ' wt % (α arm: ' + (Cb - C0).toFixed(1) + ' wt %, β arm: ' + (C0 - Ca).toFixed(1) + ' wt %)';
  }

  [c0El, caEl, cbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter overall nominal alloy bulk composition $C_0$ in weight percentage (wt %).',
      'Enter composition of solid phase $\alpha$ at the left tie-line boundary $C_\alpha$ in wt %.',
      'Enter composition of liquid/solid phase $\beta$ at the right tie-line boundary $C_\beta$ in wt %.',
      'Inspect equilibrium mass fractions of phase $\alpha$ ($w_\alpha$) and phase $\beta$ ($w_\beta$) computed via the inverse lever arm ratio.'
    ],
    benefitTitle: 'The Inverse Lever Arm Conservation Rule',
    benefitContent: 'By conservation of mass along an isothermal tie-line, the fraction of each phase is proportional to the length of the opposite lever arm divided by the total tie-line length ($w_\alpha = (C_\beta - C_0) / (C_\beta - C_\alpha)$).',
    faqs: [{ q: 'Why is it called the inverse lever rule?', a: 'Because the fraction of the left phase ($\alpha$) is calculated using the length of the right-hand tie-line segment ($C_\beta - C_0$).' }]
  },

  // 25. Schmid's Law Critical Resolved Shear Stress (CRSS) Calculator
  {
    slug: 'schmid-law-critical-resolved-shear-stress-calculator',
    name: 'Schmid\'s Law Critical Resolved Shear Stress (CRSS) Calculator',
    description: 'Calculate single-crystal plastic slip yield stress (τ_crss = σ · cos φ · cos λ) from tensile stress σ, slip plane normal angle φ, and slip direction angle λ (Schmid Factor m = cos φ · cos λ).',
    category: 'Science',
    icon: 'text',
    keywords: ['schmids law calculator', 'critical resolved shear stress crss formula tau equals sigma cos phi cos lambda', 'schmid factor m calculator online', 'single crystal slip yielding calculator', 'materials crystallography dislocation slip online'],
    order: 684,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Tensile Stress σ (MPa), Plane Normal Angle φ (°) & Slip Direction Angle λ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sch-sigma">Tensile Stress σ (MPa)</label>
          <input class="tool-textarea" id="sch-sigma" type="number" step="any" value="100.0" placeholder="100.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sch-phi">Normal Angle φ (°)</label>
          <input class="tool-textarea" id="sch-phi" type="number" step="1" value="45.0" placeholder="45.0° (to Slip Plane Normal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sch-lam">Slip Angle λ (°)</label>
          <input class="tool-textarea" id="sch-lam" type="number" step="1" value="45.0" placeholder="45.0° (to Slip Direction)" />
        </div>
      </div>
      <div id="sch-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sch-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">τ = 50.00 MPa Shear</span>
            <span class="stat-label">Resolved Shear Stress (τ = σ · m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sch-res-m" style="font-weight:700;">Schmid Factor m = 0.500 (Maximum Theoretical Shear Orientation)</span>
            <span class="stat-label">Schmid Orientation Factor (m = cos φ · cos λ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sch-sigma'), pEl = document.getElementById('sch-phi'), lEl = document.getElementById('sch-lam');
  const tResEl = document.getElementById('sch-res-tau'), mResEl = document.getElementById('sch-res-m');

  function update() {
    const sigma = parseFloat(sEl.value), phiDeg = parseFloat(pEl.value), lamDeg = parseFloat(lEl.value);
    if (isNaN(sigma) || isNaN(phiDeg) || isNaN(lamDeg) || sigma <= 0 || phiDeg < 0 || phiDeg > 90 || lamDeg < 0 || lamDeg > 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const lamRad = (lamDeg * Math.PI) / 180;

    // Schmid factor m = cos(phi) * cos(lambda)
    const m = Math.cos(phiRad) * Math.cos(lamRad);

    // Resolved shear stress tau = sigma * m
    const tau = sigma * m;

    tResEl.textContent = 'τ = ' + tau.toFixed(2) + ' MPa Resolved Shear';
    mResEl.textContent = 'Schmid Factor m = ' + m.toFixed(3) + ' (cos ' + phiDeg + '° · cos ' + lamDeg + '°' + (m >= 0.499 ? ' - Maximum Easy Slip Orientation' : '') + ')';
  }

  [sEl, pEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied uniaxial tensile stress $\sigma$ in MPa.',
      'Enter angle $\phi$ between tensile loading axis and the slip plane normal vector in degrees.',
      'Enter angle $\lambda$ between tensile loading axis and the slip direction vector in degrees.',
      'Inspect the Schmid orientation factor $m = \cos\phi \cdot \cos\lambda$ and resolved shear stress $\tau$ driving dislocation movement.'
    ],
    benefitTitle: 'Erich Schmid 1924 Single Crystal Plasticity Law',
    benefitContent: 'Plastic deformation in single crystals occurs when resolved shear stress along the most favorable slip system exceeds the Critical Resolved Shear Stress ($\tau_{\text{crss}}$); maximum shear occurs when $\phi = \lambda = 45^\circ$, yielding a maximum Schmid factor of $m = 0.50$.',
    faqs: [{ q: 'What happens if tensile load is perpendicular to the slip plane (φ = 0, λ = 90)?', a: 'The Schmid factor is zero ($m=0$), meaning no shear stress is resolved along the slip direction and brittle cleavage fracture occurs instead.' }]
  },

  // 26. Grain Growth Kinetics & Annealing Time Calculator
  {
    slug: 'grain-growth-kinetics-annealing-calculator',
    name: 'Grain Growth Kinetics & Annealing Grain Size (dⁿ - d₀ⁿ = K·t) Calculator',
    description: 'Calculate metal annealing grain growth kinetics (d = (d₀ⁿ + K·t)^(1/n)) in micrometers from initial grain size d₀, annealing temperature, and furnace soak duration.',
    category: 'Science',
    icon: 'text',
    keywords: ['grain growth kinetics calculator', 'annealing grain size formula d to power n minus d0 to power n', 'metal annealing grain growth rate calculator online', 'isothermal grain growth kinetics metallurgy online', 'grain boundary curvature grain growth calculator'],
    order: 685,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Grain Size d₀ (μm), Annealing Time t (minutes), Growth Exponent n (2.0) & Rate K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gg-d0">Initial d₀ (μm)</label>
          <input class="tool-textarea" id="gg-d0" type="number" step="any" value="10.0" placeholder="10.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gg-time">Soak Time (min)</label>
          <input class="tool-textarea" id="gg-time" type="number" step="any" value="60.0" placeholder="60.0 min (1 Hour)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gg-k">Rate Constant K</label>
          <input class="tool-textarea" id="gg-k" type="number" step="any" value="15.0" placeholder="15.0 μm²/min (High Temp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gg-n">Exponent n</label>
          <input class="tool-textarea" id="gg-n" type="number" step="0.1" value="2.0" placeholder="2.0 (Parabolic)" />
        </div>
      </div>
      <div id="gg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gg-res-df" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d = 31.6 μm Final</span>
            <span class="stat-label">Final Annealed Grain Size (d = (d₀ⁿ + K·t)^(1/n))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gg-res-astm" style="font-weight:700;">ASTM Grain Size No. G = 7.0 (3.16× Diameter Expansion)</span>
            <span class="stat-label">ASTM E112 Standard Microstructural Grain Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const d0El = document.getElementById('gg-d0'), tmEl = document.getElementById('gg-time');
  const kEl = document.getElementById('gg-k'), nEl = document.getElementById('gg-n');
  const dfResEl = document.getElementById('gg-res-df'), asResEl = document.getElementById('gg-res-astm');

  function update() {
    const d0 = parseFloat(d0El.value), tMin = parseFloat(tmEl.value);
    const K = parseFloat(kEl.value), n = parseFloat(nEl.value);

    if (isNaN(d0) || isNaN(tMin) || isNaN(K) || isNaN(n) || d0 <= 0 || tMin < 0 || K <= 0 || n <= 0) return;

    // Isothermal grain growth equation: d^n - d0^n = K * t  =>  d = ( d0^n + K * t )^(1/n)
    const d_final = Math.pow(Math.pow(d0, n) + (K * tMin), 1 / n);

    // ASTM E112 Grain Size Number G approx: G = -6.643856 * log10(d_final_mm) - 3.288
    const d_mm = d_final / 1000;
    const astmG = (-6.643856 * Math.log10(d_mm)) - 3.288;

    dfResEl.textContent = 'd = ' + d_final.toFixed(1) + ' μm (' + (d_final / d0).toFixed(2) + '× Growth)';
    asResEl.textContent = 'ASTM Grain No. G = ' + astmG.toFixed(1) + ' (d₀ = ' + d0 + ' μm -> d = ' + d_final.toFixed(1) + ' μm after ' + tMin + ' min)';
  }

  [d0El, tmEl, kEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial starting recrystallized grain size $d_0$ in micrometers ($\mu\text{m}$).',
      'Enter isothermal furnace annealing soak time in minutes.',
      'Enter thermally activated grain growth rate constant K in $\mu\text{m}^n/\text{min}$.',
      'Enter grain growth kinetic exponent n (typically $n=2.0$ for ideal parabolic boundary curvature-driven growth).',
      'Inspect final coarsened grain diameter and corresponding ASTM E112 grain size number G.'
    ],
    benefitTitle: 'Curvature-Driven Grain Boundary Area Reduction',
    benefitContent: 'Grain growth is driven by the thermodynamic reduction in grain boundary surface free energy ($\Delta G = \gamma_{\text{gb}} \cdot \Delta A$); atoms jump across curved boundaries toward their centers of curvature, causing large grains to consume smaller grains.',
    faqs: [{ q: 'How does ASTM Grain Size Number G relate to grain diameter?', a: 'Higher ASTM numbers indicate finer grains ($G=8$ is fine ~22 μm, while $G=1$ is coarse ~250 μm); each unit increase in G halves the average grain cross-sectional area.' }]
  }
];

pack21Tools.forEach(createTool);
console.log('Pack 21 complete: 26 tools created.');
