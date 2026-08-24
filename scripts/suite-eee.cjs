const { createTool } = require('./generate-curated-tools.cjs');

// Suite EEE: 5 Tools in Petroleum Engineering, Drilling Fluids, Reservoir Volumetrics & Radial Flow to reach 593 tools
const toolsSuiteEEE = [
  // 1. API Gravity to Specific Gravity & Crude Oil Density Converter
  {
    slug: 'api-gravity-crude-oil-density-converter',
    name: 'API Gravity to Specific Gravity & Crude Oil Density Converter',
    description: 'Convert crude oil density between American Petroleum Institute gravity (°API = (141.5 / SG) - 131.5), Specific Gravity (SG at 60°F), and density (kg/m³, lb/gal).',
    category: 'Science',
    icon: 'text',
    keywords: ['api gravity calculator', 'api to specific gravity formula', 'crude oil density converter online', 'brent wti api gravity calculator', 'heavy crude light sweet api calculator'],
    order: 466,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'API Gravity (°API) or Specific Gravity (SG @ 60°F)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="api-val">API Gravity (°API)</label>
          <input class="tool-textarea" id="api-val" type="number" step="0.1" value="39.6" placeholder="39.6 °API (WTI Crude)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="api-sg">Specific Gravity (SG @ 60°F)</label>
          <input class="tool-textarea" id="api-sg" type="number" step="0.001" placeholder="SG" />
        </div>
      </div>
      <div id="api-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="api-res-class" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">Light Sweet Crude Oil (> 31.1 °API)</span>
            <span class="stat-label">Crude Oil Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="api-res-dens">827.0 kg / m³ (6.90 lb/gal)</span>
            <span class="stat-label">Mass Density @ 15.6°C (60°F)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const apiEl = document.getElementById('api-val'), sgEl = document.getElementById('api-sg');
  const clsResEl = document.getElementById('api-res-class'), dnsResEl = document.getElementById('api-res-dens');

  function updateFromApi(api) {
    if (isNaN(api) || api < -10 || api > 100) return;

    // SG = 141.5 / (API + 131.5)
    const sg = 141.5 / (api + 131.5);
    sgEl.value = sg.toFixed(4);

    const kgM3 = sg * 999.016; // Density of water at 60°F
    const lbGal = sg * 8.337;

    dnsResEl.textContent = kgM3.toFixed(1) + ' kg / m³ (' + lbGal.toFixed(2) + ' lb/gal)';

    if (api > 31.1) {
      clsResEl.textContent = 'Light Crude Oil (> 31.1 °API: WTI / Brent Standard)';
      clsResEl.style.color = '#22543d';
    } else if (api >= 22.3 && api <= 31.1) {
      clsResEl.textContent = 'Medium Crude Oil (22.3 to 31.1 °API)';
      clsResEl.style.color = '#2563eb';
    } else if (api >= 10.0 && api < 22.3) {
      clsResEl.textContent = 'Heavy Crude Oil (10.0 to 22.3 °API: Sinks in Water if < 10)';
      clsResEl.style.color = '#d97706';
    } else {
      clsResEl.textContent = 'Extra Heavy Bitumen / Oil Sands (< 10.0 °API)';
      clsResEl.style.color = '#c53030';
    }
  }

  apiEl.addEventListener('input', () => {
    const api = parseFloat(apiEl.value);
    if (!isNaN(api)) updateFromApi(api);
  });

  sgEl.addEventListener('input', () => {
    const sg = parseFloat(sgEl.value);
    if (!isNaN(sg) && sg > 0) {
      const api = (141.5 / sg) - 131.5;
      apiEl.value = api.toFixed(1);
      updateFromApi(api);
    }
  });

  updateFromApi(39.6);
})();`,
    howToSteps: [
      'Enter American Petroleum Institute gravity in °API or Specific Gravity at 60°F.',
      'Inspect crude oil market grade classification (Light, Medium, Heavy, Extra-Heavy Bitumen) and density in kg/m³ and lb/gal.'
    ],
    benefitTitle: 'Inverted Hydrometer API Scale',
    benefitContent: 'API gravity is inversely related to density: lighter crude oils with high gasoline/diesel fractions have higher API gravity numbers (> 31.1 °API) and float readily on water.',
    faqs: [{ q: 'What is the API gravity of water?', a: 'Pure water has a specific gravity of 1.000, which equals exactly 10.0 °API.' }]
  },

  // 2. Hydrostatic Mud Weight Pressure & Gradient Calculator
  {
    slug: 'hydrostatic-mud-weight-pressure-gradient-calculator',
    name: 'Drilling Mud Hydrostatic Pressure & Pressure Gradient Calculator',
    description: 'Calculate bottom-hole hydrostatic drilling mud pressure (P = 0.052 · MW · TVD) in psi and pressure gradient (psi/ft) from Mud Weight (ppg) and True Vertical Depth (TVD).',
    category: 'Science',
    icon: 'text',
    keywords: ['mud weight hydrostatic pressure calculator', 'hydrostatic pressure 0.052 mw tvd formula', 'drilling mud pressure gradient calculator', 'bottom hole pressure ppg to psi online', 'well control hydrostatic pressure calculator'],
    order: 467,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mud Weight (ppg), True Vertical Depth TVD (Feet) & Formation Pressure',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hyd-mw">Mud Weight (ppg)</label>
          <input class="tool-textarea" id="hyd-mw" type="number" step="0.1" value="12.0" placeholder="12.0 ppg (Weighted Mud)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hyd-tvd">True Vertical Depth TVD (ft)</label>
          <input class="tool-textarea" id="hyd-tvd" type="number" step="any" value="10000" placeholder="10,000 ft" />
        </div>
      </div>
      <div id="hyd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hyd-res-psi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6,240 psi</span>
            <span class="stat-label">Bottom-Hole Hydrostatic Pressure (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hyd-res-grad" style="font-weight:700;">0.624 psi / ft (430.2 bar)</span>
            <span class="stat-label">Mud Pressure Gradient (0.052 · MW)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mwEl = document.getElementById('hyd-mw'), tvdEl = document.getElementById('hyd-tvd');
  const pResEl = document.getElementById('hyd-res-psi'), gResEl = document.getElementById('hyd-res-grad');

  function update() {
    const mwPpg = parseFloat(mwEl.value), tvdFt = parseFloat(tvdEl.value);
    if (isNaN(mwPpg) || isNaN(tvdFt) || mwPpg <= 0 || tvdFt <= 0) return;

    // Gradient = 0.052 * MW (psi / ft)
    const gradient = 0.052 * mwPpg;
    // Hydrostatic Pressure P = 0.052 * MW * TVD (psi)
    const pressurePsi = gradient * tvdFt;
    const pressureBar = pressurePsi * 0.0689476;

    pResEl.textContent = Math.round(pressurePsi).toLocaleString() + ' psi (' + pressureBar.toFixed(1) + ' bar)';
    gResEl.textContent = gradient.toFixed(3) + ' psi / ft (' + (gradient * 22.62).toFixed(2) + ' kPa/m)';
  }

  mwEl.addEventListener('input', update);
  tvdEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter drilling mud density in pounds per gallon (ppg) (water = 8.33 ppg, weighted barite mud = 10 to 18 ppg).',
      'Enter True Vertical Depth (TVD) of the oil/gas well in feet.',
      'Inspect bottom-hole hydrostatic overbalance pressure in psi and pressure gradient in psi/ft.'
    ],
    benefitTitle: '0.052 Petroleum Conversion Constant Derivation',
    benefitContent: 'The 0.052 constant converts density in pounds per gallon (ppg) and depth in feet directly into pressure in psi ($144\text{ sq in / } (8.33\text{ lb/gal }\times 12\text{ in/ft }\times 27.71) = 0.052$).',
    faqs: [{ q: 'What is the hydrostatic pressure of 10 ppg mud at 10,000 ft TVD?', a: 'P = 0.052 × 10 ppg × 10,000 ft = exactly 5,200 psi.' }]
  },

  // 3. Darcy's Law Radial Flow in Oil Reservoirs (Dupuit Equation) Calculator
  {
    slug: 'darcy-radial-flow-oil-reservoir-calculator',
    name: 'Darcy Radial Flow Oil Reservoir (Dupuit Equation) Calculator',
    description: 'Calculate steady-state oil production rate (q = (7.08 · 10⁻³ · k · h · (P_e - P_wf)) / (μ · B_o · ln(r_e / r_w))) in Stock Tank Barrels per Day (STB/day).',
    category: 'Science',
    icon: 'text',
    keywords: ['darcy radial flow calculator', 'oil well dupuit equation calculator', 'oil reservoir flow rate formula online', 'permeability drawdown oil well calculator', 'petroleum reservoir radial inflow calculator'],
    order: 468,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Permeability k (mD), Pay Zone Thickness h (ft), Drawdown ΔP & Drainage',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rad-k">Permeability k (mD)</label>
          <input class="tool-textarea" id="rad-k" type="number" step="any" value="50" placeholder="50 mD (Sandstone)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-h">Net Pay Thickness h (ft)</label>
          <input class="tool-textarea" id="rad-h" type="number" step="any" value="30" placeholder="30 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-dp">Drawdown ΔP (psi)</label>
          <input class="tool-textarea" id="rad-dp" type="number" step="any" value="500" placeholder="500 psi (P_e - P_wf)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-mu">Oil Viscosity μ (cP)</label>
          <input class="tool-textarea" id="rad-mu" type="number" step="any" value="1.5" placeholder="1.5 cP" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-bo">Volume Factor B_o</label>
          <input class="tool-textarea" id="rad-bo" type="number" step="0.05" value="1.20" placeholder="1.20 RB/STB" />
        </div>
      </div>
      <div id="rad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rad-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">435.5 STB / day</span>
            <span class="stat-label">Oil Flow Rate (q_oil)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rad-res-pi" style="font-weight:700;">0.871 STB/d/psi</span>
            <span class="stat-label">Productivity Index (PI = q / ΔP)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('rad-k'), hEl = document.getElementById('rad-h');
  const dpEl = document.getElementById('rad-dp'), muEl = document.getElementById('rad-mu'), boEl = document.getElementById('rad-bo');
  const qResEl = document.getElementById('rad-res-q'), piResEl = document.getElementById('rad-res-pi');

  // Assume standard drainage radius re = 660 ft (40-acre spacing), wellbore rw = 0.328 ft (7-7/8" hole)
  const ln_re_rw = Math.log(660 / 0.328); // ~7.607

  function update() {
    const k = parseFloat(kEl.value), h = parseFloat(hEl.value);
    const dP = parseFloat(dpEl.value), mu = parseFloat(muEl.value), Bo = parseFloat(boEl.value);

    if (isNaN(k) || isNaN(h) || isNaN(dP) || isNaN(mu) || isNaN(Bo) || k <= 0 || h <= 0 || dP <= 0 || mu <= 0 || Bo <= 0) return;

    // Darcy field units: q = (7.08e-3 * k * h * dP) / (mu * Bo * ln(re / rw))  [STB / day]
    const qStbDay = (7.08e-3 * k * h * dP) / (mu * Bo * ln_re_rw);
    const pi = qStbDay / dP;
    const m3Day = qStbDay * 0.158987;

    qResEl.textContent = qStbDay.toFixed(1) + ' STB / day (' + m3Day.toFixed(1) + ' m³/d)';
    piResEl.textContent = 'PI = ' + pi.toFixed(3) + ' STB/day/psi (Drainage re = 660 ft)';
  }

  [kEl, hEl, dpEl, muEl, boEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reservoir formation permeability k in milliDarcies (mD).',
      'Enter productive reservoir net pay thickness h in feet.',
      'Enter pressure drawdown ΔP (Reservoir Pressure P_e minus Flowing Bottom-Hole Pressure P_wf) in psi.',
      'Enter live oil viscosity in centipoise (cP) and Oil Formation Volume Factor B_o.',
      'Inspect daily oil production rate in Stock Tank Barrels per Day (STB/d) and Productivity Index (PI).'
    ],
    benefitTitle: 'Jules Dupuit\'s 1863 Radial Reservoir Inflow Solution',
    benefitContent: 'Radial inflow geometry concentrates pressure drop right next to the wellbore wall; permeability and drawdown directly govern the inflow performance relationship (IPR) of producing oil wells.',
    faqs: [{ q: 'What is Oil Formation Volume Factor (B_o)?', a: 'B_o measures reservoir barrels of oil with dissolved solution gas required to produce exactly one standard Stock Tank Barrel of stabilized oil at surface (typically 1.1 to 1.5 RB/STB).' }]
  },

  // 4. Stock Tank Oil Initially In Place (STOIIP) Volumetric Calculator
  {
    slug: 'stock-tank-oil-initially-in-place-stoiip-calculator',
    name: 'Stock Tank Oil Initially In Place (STOIIP) Volumetric Calculator',
    description: 'Calculate total in-situ hydrocarbon reservoir oil reserves (STOIIP = (7758 · A · h · φ · (1 - S_w)) / B_oi) in Stock Tank Barrels (MMSTB) from geological reservoir properties.',
    category: 'Science',
    icon: 'text',
    keywords: ['stoiip calculator', 'stock tank oil initially in place formula', 'oil reservoir volumetric reserves calculator', '7758 a h phi 1 minus sw over boi', 'petroleum reserves volumetric estimation online'],
    order: 469,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Area A (Acres), Pay Thickness h (ft), Porosity φ (%), Water Saturation S_w (%) & B_oi',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="st-area">Reservoir Area A (Acres)</label>
          <input class="tool-textarea" id="st-area" type="number" step="any" value="640" placeholder="640 Acres (1 sq mile)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-h">Net Pay h (ft)</label>
          <input class="tool-textarea" id="st-h" type="number" step="any" value="45" placeholder="45 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-phi">Porosity φ (%)</label>
          <input class="tool-textarea" id="st-phi" type="number" min="1" max="45" value="22" placeholder="22%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-sw">Water Saturation S_w (%)</label>
          <input class="tool-textarea" id="st-sw" type="number" min="5" max="80" value="25" placeholder="25% Connate Water" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-boi">Initial B_oi (RB/STB)</label>
          <input class="tool-textarea" id="st-boi" type="number" step="0.05" value="1.25" placeholder="1.25 RB/STB" />
        </div>
      </div>
      <div id="st-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="st-res-stoiip" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">29.23 MMSTB</span>
            <span class="stat-label">Original Oil In Place (STOIIP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="st-res-recov" style="font-weight:700;">10.23 MMSTB Recoverable</span>
            <span class="stat-label">Estimated Primary + Secondary Recovery (35% Recovery Factor)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('st-area'), hEl = document.getElementById('st-h');
  const pEl = document.getElementById('st-phi'), swEl = document.getElementById('st-sw'), bEl = document.getElementById('st-boi');
  const sResEl = document.getElementById('st-res-stoiip'), rResEl = document.getElementById('st-res-recov');

  function update() {
    const A = parseFloat(aEl.value), h = parseFloat(hEl.value);
    const phiPct = parseFloat(pEl.value), swPct = parseFloat(swEl.value), Boi = parseFloat(bEl.value);

    if (isNaN(A) || isNaN(h) || isNaN(phiPct) || isNaN(swPct) || isNaN(Boi) || A <= 0 || h <= 0 || phiPct <= 0 || Boi <= 0) return;

    const phi = phiPct / 100;
    const Sw = swPct / 100;

    // STOIIP = (7758 * A * h * phi * (1 - Sw)) / Boi  [Stock Tank Barrels]
    const stoiipBarrels = (7758 * A * h * phi * (1 - Sw)) / Boi;
    const stoiipMmstb = stoiipBarrels / 1e6;
    const recoverableMmstb = stoiipMmstb * 0.35; // Standard 35% recovery factor

    sResEl.textContent = stoiipMmstb.toFixed(2) + ' MMSTB (Million Barrels)';
    rResEl.textContent = recoverableMmstb.toFixed(2) + ' MMSTB Recoverable (~35% Recovery Factor)';
  }

  [aEl, hEl, pEl, swEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter geological reservoir acreage area A in acres.',
      'Enter net pay sandstone/carbonate reservoir thickness h in feet.',
      'Enter average core/log porosity percentage (φ%) and irreducible connate water saturation (S_w%).',
      'Enter initial formation volume factor B_oi.',
      'Inspect total in-situ hydrocarbon volume (STOIIP) in million stock tank barrels (MMSTB).'
    ],
    benefitTitle: 'The 7758 Acre-Foot Volumetric Constant',
    benefitContent: 'One acre-foot of reservoir rock equals 43,560 cubic feet, which equals exactly 7,758.36 standard oil barrels (42 US gallons per barrel); multiplying by net rock volume and hydrocarbon pore fraction determines total in-situ oil.',
    faqs: [{ q: 'What percentage of STOIIP is typically produced?', a: 'Primary depletion typically recovers 10-25% of STOIIP; secondary waterflooding boosts recovery to 30-45%, and tertiary EOR can recover up to 55-65%.' }]
  },

  // 5. Natural Gas Formation Volume Factor (B_g) & Z-Factor Expansion Calculator
  {
    slug: 'gas-formation-volume-factor-bg-calculator',
    name: 'Natural Gas Formation Volume Factor (B_g) & Z-Factor Calculator',
    description: 'Calculate natural gas formation volume factor (B_g = 0.02827 · (Z · T) / P) in reservoir ft³ per standard ft³ (scf) and expansion factor (E_g = 1 / B_g).',
    category: 'Science',
    icon: 'text',
    keywords: ['gas formation volume factor calculator', 'bg gas expansion factor formula', '0.02827 z t over p calculator', 'natural gas reservoir volume factor online', 'gas compressibility z factor bg calculator'],
    order: 470,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reservoir Pressure P (psia), Reservoir Temp T (°F) & Gas Z-Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-p">Pressure P (psia)</label>
          <input class="tool-textarea" id="bg-p" type="number" step="any" value="3000" placeholder="3000 psia" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-t">Temp T (°F)</label>
          <input class="tool-textarea" id="bg-t" type="number" step="any" value="180" placeholder="180 °F (Reservoir)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-z">Gas Deviation (Z)</label>
          <input class="tool-textarea" id="bg-z" type="number" step="0.01" value="0.86" placeholder="0.86 (Supercompressible)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-bg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.00518 res cu ft / scf</span>
            <span class="stat-label">Gas Volume Factor (B_g)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-eg" style="font-weight:700;">193.1 scf / res cu ft</span>
            <span class="stat-label">Gas Expansion Factor (E_g = 1 / B_g)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('bg-p'), tEl = document.getElementById('bg-t'), zEl = document.getElementById('bg-z');
  const bgResEl = document.getElementById('bg-res-bg'), egResEl = document.getElementById('bg-res-eg');

  function update() {
    const P_psia = parseFloat(pEl.value), T_F = parseFloat(tEl.value), Z = parseFloat(zEl.value);
    if (isNaN(P_psia) || isNaN(T_F) || isNaN(Z) || P_psia <= 0 || Z <= 0) return;

    const T_R = T_F + 459.67; // Rankine absolute temp

    // B_g = 0.02827 * (Z * T_R) / P_psia  [reservoir cu ft / standard cu ft]
    const Bg = 0.02827 * (Z * T_R) / P_psia;
    const Eg = 1 / Bg; // Expansion factor

    bgResEl.textContent = Bg.toFixed(5) + ' res cu ft / scf (' + (Bg * 0.1781).toFixed(5) + ' res bbl/scf)';
    egResEl.textContent = Eg.toFixed(1) + ' scf / res cu ft (' + (Eg * 5.615).toFixed(0) + ' scf / res bbl)';
  }

  [pEl, tEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reservoir pressure in psia (e.g. 3,000 psia).',
      'Enter reservoir temperature in °F (e.g. 180°F).',
      'Enter natural gas compressibility deviation factor Z (typically 0.80 to 0.95 at high pressure).',
      'Inspect natural gas formation volume factor B_g and expansion ratio E_g.'
    ],
    benefitTitle: 'High-Pressure Gas Reservoir Supercompressibility',
    benefitContent: 'Under thousands of pounds of subsurface reservoir pressure, 1 cubic foot of reservoir pore space can compress and hold nearly 200 standard cubic feet (scf) of natural gas at surface temperature and atmospheric pressure.',
    faqs: [{ q: 'Why is Z less than 1.0 at moderate high pressures?', a: 'Attractive intermolecular Van der Waals forces cause real hydrocarbon gas molecules to compress more tightly than an ideal gas (Z < 1.0).' }]
  }
];

toolsSuiteEEE.forEach(createTool);
console.log('Suite EEE complete: 5 tools created.');
