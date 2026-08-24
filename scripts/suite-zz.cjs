const { createTool } = require('./generate-curated-tools.cjs');

// Suite ZZ: 5 Tools in Earthmoving, Mining Productivity, Earth Pressures & Soil Swell to reach 568 tools
const toolsSuiteZZ = [
  // 1. Excavator Hourly Earthmoving Productivity Calculator
  {
    slug: 'excavator-cycle-time-productivity-calculator',
    name: 'Hydraulic Excavator Hourly Earthmoving Productivity Calculator',
    description: 'Calculate hourly excavation production rate (Q = (q · k_f · 3600 · E) / (t_c · S_w)) in Bank Cubic Meters (BCM/hr) and Cubic Yards per hour from bucket size and cycle time.',
    category: 'Science',
    icon: 'text',
    keywords: ['excavator productivity calculator', 'excavator cycle time production formula', 'hourly earthmoving volume calculator online', 'excavator bucket fill factor swell', 'earthwork excavation rate per hour online'],
    order: 441,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bucket Size (m³), Cycle Time (sec), Fill Factor & Job Efficiency',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ex-cap">Bucket Size (m³)</label>
          <input class="tool-textarea" id="ex-cap" type="number" step="any" value="1.8" placeholder="1.8 m³ (20-ton Excavator)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ex-time">Cycle Time (sec)</label>
          <input class="tool-textarea" id="ex-time" type="number" step="any" value="22" placeholder="22 sec (Dig + Swing + Dump)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ex-fill">Fill Factor (%)</label>
          <input class="tool-textarea" id="ex-fill" type="number" min="50" max="120" value="95" placeholder="95%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ex-eff">Job Efficiency (%)</label>
          <input class="tool-textarea" id="ex-eff" type="number" min="40" max="100" value="83" placeholder="83% (50-min hour)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ex-swell">Soil Swell (%)</label>
          <input class="tool-textarea" id="ex-swell" type="number" min="0" max="50" value="20" placeholder="20% (Sand/Clay)" />
        </div>
      </div>
      <div id="ex-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ex-res-bcm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">193.3 BCM / hr</span>
            <span class="stat-label">In-Situ Bank Production (BCM/hr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ex-res-lcy" style="font-weight:700;">303.4 LCY / hr</span>
            <span class="stat-label">Loose Truck Loading Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const capEl = document.getElementById('ex-cap'), tEl = document.getElementById('ex-time');
  const fEl = document.getElementById('ex-fill'), effEl = document.getElementById('ex-eff'), swEl = document.getElementById('ex-swell');
  const bcmResEl = document.getElementById('ex-res-bcm'), lcyResEl = document.getElementById('ex-res-lcy');

  function update() {
    const capM3 = parseFloat(capEl.value), tcSec = parseFloat(tEl.value);
    const fillPct = parseFloat(fEl.value), effPct = parseFloat(effEl.value), swPct = parseFloat(swEl.value);

    if (isNaN(capM3) || isNaN(tcSec) || isNaN(fillPct) || isNaN(effPct) || isNaN(swPct) || capM3 <= 0 || tcSec <= 0) return;

    // Cycles per hour = 3600 / tcSec
    const cyclesHour = 3600 / tcSec;
    // Loose volume per cycle = capM3 * (fillPct / 100)
    const loosePerCycle = capM3 * (fillPct / 100);
    // Loose production per hour = loosePerCycle * cyclesHour * (effPct / 100) (LCM/hr)
    const lcmHr = loosePerCycle * cyclesHour * (effPct / 100);
    // Bank Cubic Meters (BCM) = LCM / (1 + swPct/100)
    const bcmHr = lcmHr / (1 + (swPct / 100));
    // Loose Cubic Yards (LCY) = LCM * 1.30795
    const lcyHr = lcmHr * 1.30795;

    bcmResEl.textContent = bcmHr.toFixed(1) + ' BCM / hr (In-Situ)';
    lcyResEl.textContent = lcyHr.toFixed(1) + ' LCY / hr (' + lcmHr.toFixed(1) + ' Loose m³/hr)';
  }

  [capEl, tEl, fEl, effEl, swEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter excavator bucket capacity in cubic meters (m³).',
      'Enter complete digging, swinging, dumping, and return cycle time in seconds.',
      'Enter bucket fill factor, operator job efficiency (83% = 50 min operating per hour), and soil swell percentage.',
      'Inspect hourly bank in-situ excavation rate (BCM/hr) and loose truck volume (LCY/hr).'
    ],
    benefitTitle: 'Caterpillar Earthmoving Production Principles',
    benefitContent: 'Heavy civil contractor estimating relies on cycle time decomposition (Load, Swing, Dump, Return) and soil bulking factors to accurately size equipment fleets for multimillion-dollar highway cuts.',
    faqs: [{ q: 'What is the difference between BCM and LCM?', a: 'Bank Cubic Meters (BCM) measures compacted earth in the ground before digging; Loose Cubic Meters (LCM) measures expanded uncompacted soil in a haul truck bed.' }]
  },

  // 2. Dump Truck Fleet Sizing & Match Factor Calculator
  {
    slug: 'dump-truck-haul-cycle-fleet-sizing-calculator',
    name: 'Dump Truck Fleet Sizing & Match Factor Calculator',
    description: 'Calculate optimal haul truck fleet count (N_trucks = Total Cycle Time / Loading Time) and Caterpillar Match Factor (MF) to eliminate excavator idle waiting time.',
    category: 'Science',
    icon: 'text',
    keywords: ['dump truck fleet sizing calculator', 'match factor earthmoving calculator', 'haul truck fleet calculation online', 'excavator truck matching formula', 'earthmoving haul cycle fleet calculator'],
    order: 442,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Loader Fill Time (min), Haul Travel (min) & Dump/Return (min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dt-load">Truck Load Time (min)</label>
          <input class="tool-textarea" id="dt-load" type="number" step="any" value="2.5" placeholder="2.5 min (4-5 bucket passes)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dt-haul">Haul Loaded Time (min)</label>
          <input class="tool-textarea" id="dt-haul" type="number" step="any" value="6.0" placeholder="6.0 min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dt-dump">Dump & Spot Time (min)</label>
          <input class="tool-textarea" id="dt-dump" type="number" step="any" value="1.5" placeholder="1.5 min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dt-ret">Return Empty Time (min)</label>
          <input class="tool-textarea" id="dt-ret" type="number" step="any" value="4.5" placeholder="4.5 min" />
        </div>
      </div>
      <div id="dt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dt-res-trucks" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6 Trucks Required</span>
            <span class="stat-label">Optimal Haul Fleet Size</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dt-res-mf" style="color:#2563eb; font-weight:700;">Match Factor = 1.03 (Perfect Balance)</span>
            <span class="stat-label">Fleet Match Factor (MF = N · t_load / t_cycle)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('dt-load'), hEl = document.getElementById('dt-haul');
  const dEl = document.getElementById('dt-dump'), rEl = document.getElementById('dt-ret');
  const tResEl = document.getElementById('dt-res-trucks'), mfResEl = document.getElementById('dt-res-mf');

  function update() {
    const tLoad = parseFloat(lEl.value), tHaul = parseFloat(hEl.value);
    const tDump = parseFloat(dEl.value), tRet = parseFloat(rEl.value);

    if (isNaN(tLoad) || isNaN(tHaul) || isNaN(tDump) || isNaN(tRet) || tLoad <= 0) return;

    // Total truck cycle time t_cycle = tLoad + tHaul + tDump + tRet
    const tCycle = tLoad + tHaul + tDump + tRet;
    // Theoretical exact trucks N = tCycle / tLoad
    const exactN = tCycle / tLoad;
    const roundedN = Math.round(exactN);

    // Match factor MF = (N_trucks * t_load) / (N_loaders * t_cycle)
    const matchFactor = (roundedN * tLoad) / tCycle;

    tResEl.textContent = roundedN + ' Trucks (' + exactN.toFixed(2) + ' Exact)';

    if (matchFactor >= 0.95 && matchFactor <= 1.05) {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Perfect Equilibrium Balance)';
      mfResEl.style.color = '#22543d';
    } else if (matchFactor > 1.05) {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Trucks Wait in Queue for Loader)';
      mfResEl.style.color = '#d97706';
    } else {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Excavator Sits Idle Waiting for Trucks)';
      mfResEl.style.color = '#c53030';
    }
  }

  [lEl, hEl, dEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter excavator truck loading time in minutes.',
      'Enter loaded haul transit travel time in minutes.',
      'Enter dumping/spotting delay time and empty truck return travel time in minutes.',
      'Inspect optimal haul fleet truck count and Match Factor equilibrium.'
    ],
    benefitTitle: 'Fleet Match Factor (MF = 1.0) Optimization',
    benefitContent: 'A Match Factor of exactly 1.0 means the next empty haul truck arrives at the dig face the exact moment the excavator finishes loading the previous truck, achieving 100% equipment utilization.',
    faqs: [{ q: 'What happens when Match Factor is less than 1.0?', a: 'When MF < 1.0, there are too few trucks in the fleet, forcing expensive excavators to sit idle waiting for trucks to return.' }]
  },

  // 3. Soil Swell, Bulking & Shrinkage Factor Calculator
  {
    slug: 'soil-swell-shrinkage-factor-calculator',
    name: 'Soil Swell, Bulking & Shrinkage Factor Calculator',
    description: 'Convert soil volumes between Bank Cubic Yards (BCY), Loose Cubic Yards (LCY), and Compacted Cubic Yards (CCY) from soil material swell and shrinkage percentages.',
    category: 'Science',
    icon: 'text',
    keywords: ['soil swell calculator', 'soil shrinkage factor calculator', 'bcy to lcy to ccy converter', 'earthwork bulking factor online', 'cut and fill soil compaction volume calculator'],
    order: 443,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Material Type & Bank Volume (BCY or BCM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sw-soil">Soil Material Preset</label>
          <select class="tool-textarea" id="sw-soil">
            <option value="12,12" selected>Common Earth / Loam (12% Swell, 12% Shrink)</option>
            <option value="25,20">Heavy Clay (25% Swell, 20% Shrink)</option>
            <option value="15,10">Sand & Gravel (15% Swell, 10% Shrink)</option>
            <option value="60,-30">Blasted Solid Rock (60% Swell, -30% Swell Compaction)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-bcy">In-Situ Bank Volume (BCY)</label>
          <input class="tool-textarea" id="sw-bcy" type="number" step="any" value="1000" placeholder="1000 BCY" />
        </div>
      </div>
      <div id="sw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sw-res-lcy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,120 LCY</span>
            <span class="stat-label">Excavated Loose Volume (LCY for Hauling)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sw-res-ccy" style="font-weight:700;">880 CCY</span>
            <span class="stat-label">Final Compacted Fill Volume (CCY)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sw-soil'), bEl = document.getElementById('sw-bcy');
  const lResEl = document.getElementById('sw-res-lcy'), cResEl = document.getElementById('sw-res-ccy');

  function update() {
    const [swStr, shStr] = sEl.value.split(',');
    const swellPct = parseFloat(swStr), shrinkPct = parseFloat(shStr);
    const bcy = parseFloat(bEl.value);

    if (isNaN(bcy) || bcy <= 0) return;

    // LCY = BCY * (1 + swell / 100)
    const lcy = bcy * (1 + (swellPct / 100));
    // CCY = BCY * (1 - shrink / 100)
    const ccy = bcy * (1 - (shrinkPct / 100));

    lResEl.textContent = Math.round(lcy).toLocaleString() + ' LCY (Loose Haul)';
    cResEl.textContent = Math.round(ccy).toLocaleString() + ' CCY (Finished Embankment Fill)';
  }

  sEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select soil material type (Common Earth, Heavy Clay, Sand/Gravel, Blasted Rock).',
      'Enter in-situ virgin bank excavation cut volume (BCY or BCM).',
      'Inspect loose truck haul volume (LCY) and compacted embankment fill volume (CCY).'
    ],
    benefitTitle: 'Earthwork Cut-to-Fill Mass Balancing',
    benefitContent: 'Virgin soil expands when dug out because air voids are introduced (Swell/Bulking), and shrinks below original bank volume when rolled and compacted with heavy vibratory compactors on an embankment.',
    faqs: [{ q: 'What is 1,000 BCY of heavy clay in loose haul volume?', a: 'With 25% swell: LCY = 1,000 × 1.25 = 1,250 Loose Cubic Yards.' }]
  },

  // 4. Mobile Crane Lift Capacity & Operating Radius Calculator
  {
    slug: 'crane-boom-lift-capacity-radius-calculator',
    name: 'Mobile Crane Load Radius & Lift Capacity Safety Calculator',
    description: 'Calculate mobile crane tipping moment (M_tip = Load · Radius), boom angle (θ = arccos(Radius / Boom Length)), and verify 75% OSHA tipping stability margin.',
    category: 'Science',
    icon: 'text',
    keywords: ['crane load radius calculator', 'crane lift capacity chart calculator', 'mobile crane tipping load formula', 'crane boom angle to radius calculator', 'osha 75 percent crane stability online'],
    order: 444,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Boom Length (m), Working Radius (m) & Lift Load (Metric Tons)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-boom">Boom Length (m)</label>
          <input class="tool-textarea" id="cr-boom" type="number" step="any" value="30" placeholder="30 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-rad">Working Radius (m)</label>
          <input class="tool-textarea" id="cr-rad" type="number" step="any" value="12" placeholder="12 m (Center of rotation to hook)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-load">Total Load (Tons)</label>
          <input class="tool-textarea" id="cr-load" type="number" step="any" value="8.5" placeholder="8.5 Tons (Load + Rigging)" />
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-angle" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">66.4° Boom Angle</span>
            <span class="stat-label">Calculated Boom Angle (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-height" style="font-weight:700;">27.5 m (90.2 ft)</span>
            <span class="stat-label">Boom Tip Sheave Height</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-moment">102.0 Ton·m</span>
            <span class="stat-label">Overturning Load Moment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('cr-boom'), rEl = document.getElementById('cr-rad'), lEl = document.getElementById('cr-load');
  const aResEl = document.getElementById('cr-res-angle'), hResEl = document.getElementById('cr-res-height'), mResEl = document.getElementById('cr-res-moment');

  function update() {
    const boomM = parseFloat(bEl.value), radM = parseFloat(rEl.value), loadTons = parseFloat(lEl.value);
    if (isNaN(boomM) || isNaN(radM) || isNaN(loadTons) || boomM <= 0 || radM <= 0 || loadTons <= 0 || radM > boomM) {
      aResEl.textContent = 'Radius exceeds boom length!';
      return;
    }

    // cos(theta) = rad / boom
    const radAng = Math.acos(radM / boomM);
    const degAng = (radAng * 180) / Math.PI;

    // Tip height = boom * sin(theta)
    const tipHeightM = boomM * Math.sin(radAng);
    const tipHeightFt = tipHeightM * 3.28084;

    // Overturning moment = load * radius
    const moment = loadTons * radM;

    aResEl.textContent = degAng.toFixed(1) + '° Boom Angle';
    hResEl.textContent = tipHeightM.toFixed(1) + ' m (' + tipHeightFt.toFixed(1) + ' ft Tip Height)';
    mResEl.textContent = moment.toFixed(1) + ' Ton·meters Load Moment';
  }

  [bEl, rEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total crane telescopic boom length in meters.',
      'Enter horizontal operating radius from crane center of rotation pin to suspended hook block in meters.',
      'Enter total gross load weight in metric tons (including rigging slings, spreader bar, and hook block weight).',
      'Inspect boom operating angle θ, hook tip sheave elevation height, and overturning moment.'
    ],
    benefitTitle: 'OSHA 1926.1400 75% Stability Limit Rule',
    benefitContent: 'Crane capacity charts are derated to no more than 75% (or 85% for outrigger cranes) of the actual tipping load to ensure a safe stability margin against wind gusts and dynamic load swinging.',
    faqs: [{ q: 'What defines crane working radius?', a: 'The horizontal distance measured from the centerline of the crane\'s rotation turntable to the vertical centerline of the hoist hook.' }]
  },

  // 5. Rankine Active Earth Pressure on Retaining Walls Calculator
  {
    slug: 'retaining-wall-active-earth-pressure-rankine-calculator',
    name: 'Rankine Retaining Wall Active Earth Pressure Calculator',
    description: 'Calculate lateral active earth pressure coefficient (K_a = (1 - sin φ) / (1 + sin φ)) and total resultant lateral thrust force (P_a = ½ · K_a · γ · H²) acting on cantilever retaining walls.',
    category: 'Science',
    icon: 'text',
    keywords: ['retaining wall earth pressure calculator', 'rankine active earth pressure formula', 'ka 1 minus sin phi over 1 plus sin phi', 'lateral earth pressure thrust calculator', 'geotechnical retaining wall force online'],
    order: 445,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Friction Angle (φ in °), Unit Weight (γ in kN/m³) & Wall Height (H)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rw-phi">Friction Angle φ (°)</label>
          <input class="tool-textarea" id="rw-phi" type="number" min="15" max="45" value="30" placeholder="30° (Medium Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-gamma">Unit Weight γ (kN/m³)</label>
          <input class="tool-textarea" id="rw-gamma" type="number" step="any" value="18.0" placeholder="18.0 kN/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-h">Wall Height H (m)</label>
          <input class="tool-textarea" id="rw-h" type="number" step="any" value="4.0" placeholder="4.0 m" />
        </div>
      </div>
      <div id="rw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rw-res-pa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">48.00 kN / m</span>
            <span class="stat-label">Total Lateral Active Thrust Force (P_a)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rw-res-ka" style="font-weight:700;">K_a = 0.333</span>
            <span class="stat-label">Active Pressure Coeff (1-sin φ)/(1+sin φ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rw-res-arm">1.33 m (H / 3)</span>
            <span class="stat-label">Thrust Line of Action (from Base)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('rw-phi'), gEl = document.getElementById('rw-gamma'), hEl = document.getElementById('rw-h');
  const paResEl = document.getElementById('rw-res-pa'), kaResEl = document.getElementById('rw-res-ka'), aResEl = document.getElementById('rw-res-arm');

  function update() {
    const phiDeg = parseFloat(pEl.value), gamma = parseFloat(gEl.value), H = parseFloat(hEl.value);
    if (isNaN(phiDeg) || isNaN(gamma) || isNaN(H) || phiDeg <= 0 || phiDeg >= 90 || gamma <= 0 || H <= 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const sinPhi = Math.sin(phiRad);

    // K_a = (1 - sin(phi)) / (1 + sin(phi))
    const Ka = (1 - sinPhi) / (1 + sinPhi);

    // Total resultant active thrust P_a = 0.5 * Ka * gamma * H^2 (kN per meter of wall length)
    const Pa = 0.5 * Ka * gamma * Math.pow(H, 2);
    // Line of action is at H / 3 from base
    const arm = H / 3;

    paResEl.textContent = Pa.toFixed(2) + ' kN / m of wall';
    kaResEl.textContent = 'K_a = ' + Ka.toFixed(3);
    aResEl.textContent = arm.toFixed(2) + ' m above base (H / 3)';
  }

  [pEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil internal friction angle φ in degrees (typically 28° to 34° for sands and granular backfill).',
      'Enter soil moist bulk unit weight γ in kN/m³ (typically 18 to 20 kN/m³).',
      'Enter vertical retaining wall height H in meters.',
      'Inspect Rankine active earth pressure coefficient K_a, total lateral sliding thrust force P_a (kN/m), and point of action height.'
    ],
    benefitTitle: 'William John Macquorn Rankine\'s 1857 Earth Pressure Theory',
    benefitContent: 'As a retaining wall deflects slightly outward away from the backfill, soil shear strength develops along failure planes, dropping lateral earth pressure to its minimum Active state (K_a = (1 - sin φ) / (1 + sin φ)).',
    faqs: [{ q: 'What is K_a for typical sand with friction angle φ = 30°?', a: 'K_a = (1 - sin 30°) / (1 + sin 30°) = (1 - 0.5) / (1 + 0.5) = 0.5 / 1.5 = exactly ⅓ (0.333).' }]
  }
];

toolsSuiteZZ.forEach(createTool);
console.log('Suite ZZ complete: 5 tools created.');
