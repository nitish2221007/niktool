const { createTool } = require('./generate-curated-tools.cjs');

// Suite GG: 5 Tools in Aviation, Marine Navigation, True Airspeed & Runway Components to reach 473 tools
const toolsSuiteGG = [
  // 1. Nautical Miles, Knots & Speed Units Converter
  {
    slug: 'nautical-miles-knots-statute-converter',
    name: 'Nautical Miles, Knots & Statute Speed Converter',
    description: 'Convert distance and navigational speed across Nautical Miles (NM), Knots (kts = NM/hr), Statute Miles (mph), Kilometers (km), and km/h in real time.',
    category: 'Daily',
    icon: 'text',
    keywords: ['nautical miles to knots converter', 'knots to mph calculator', 'statute miles to nautical miles online', 'aviation knot converter', 'marine knots to kmh formula'],
    order: 344,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Velocity Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nav-knots">Knots (kts = NM/hr)</label>
          <input class="tool-textarea" id="nav-knots" type="number" step="any" value="100" placeholder="100 kts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nav-mph">Statute (mph)</label>
          <input class="tool-textarea" id="nav-mph" type="number" step="any" placeholder="mph" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nav-kmh">Metric (km/h)</label>
          <input class="tool-textarea" id="nav-kmh" type="number" step="any" placeholder="km/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nav-mps">Meters/sec (m/s)</label>
          <input class="tool-textarea" id="nav-mps" type="number" step="any" placeholder="m/s" />
        </div>
      </div>
      <div id="nav-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nav-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1 NM = 1,852 meters</span>
            <span class="stat-label">Geodetic Definition (1 minute of arc)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ktEl = document.getElementById('nav-knots'), mphEl = document.getElementById('nav-mph');
  const kmhEl = document.getElementById('nav-kmh'), mpsEl = document.getElementById('nav-mps');

  function updateFromKnots(kt) {
    if (isNaN(kt)) return;
    // 1 knot = 1.15078 mph = 1.852 km/h = 0.514444 m/s
    mphEl.value = (kt * 1.15078).toFixed(2);
    kmhEl.value = (kt * 1.852).toFixed(2);
    mpsEl.value = (kt * 0.514444).toFixed(2);
  }

  ktEl.addEventListener('input', () => {
    const v = parseFloat(ktEl.value);
    if (!isNaN(v)) updateFromKnots(v);
  });

  mphEl.addEventListener('input', () => {
    const v = parseFloat(mphEl.value);
    if (!isNaN(v)) {
      const kt = v / 1.15078;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  kmhEl.addEventListener('input', () => {
    const v = parseFloat(kmhEl.value);
    if (!isNaN(v)) {
      const kt = v / 1.852;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  mpsEl.addEventListener('input', () => {
    const v = parseFloat(mpsEl.value);
    if (!isNaN(v)) {
      const kt = v / 0.514444;
      ktEl.value = kt.toFixed(2);
      updateFromKnots(kt);
    }
  });

  updateFromKnots(100);
})();`,
    howToSteps: [
      'Enter speed in Knots, Miles per Hour (mph), Kilometers per Hour (km/h), or Meters per Second (m/s).',
      'Inspect simultaneous conversions across all global nautical and aviation standards.'
    ],
    benefitTitle: 'Geodetic Definition of the International Nautical Mile',
    benefitContent: 'Defined in 1929 by the First International Extraordinary Hydrographic Conference, 1 Nautical Mile equals exactly 1,852 meters, corresponding to 1 minute of latitude along any Earth meridian.',
    faqs: [{ q: 'How fast is 1 knot in mph and km/h?', a: '1 knot equals exactly 1.852 km/h (~1.151 mph).' }]
  },

  // 2. True Airspeed (TAS) from Calibrated Airspeed & Altitude Calculator
  {
    slug: 'true-airspeed-tas-indicated-cas-calculator',
    name: 'True Airspeed (TAS) & Density Altitude Calculator',
    description: 'Calculate aircraft True Airspeed (TAS = CAS · √(ρ₀ / ρ)) in knots from Calibrated Airspeed (CAS), Pressure Altitude (feet), and Outside Air Temperature (°C).',
    category: 'Daily',
    icon: 'text',
    keywords: ['true airspeed calculator', 'tas from cas calculator', 'aviation density altitude tas formula', 'indicated airspeed to true airspeed online', 'aircraft tas knots calculation'],
    order: 345,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Calibrated Airspeed (CAS), Pressure Altitude & OAT',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tas-cas">Calibrated Airspeed CAS (kts)</label>
          <input class="tool-textarea" id="tas-cas" type="number" step="any" value="120" placeholder="120 kts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tas-alt">Pressure Altitude (Feet)</label>
          <input class="tool-textarea" id="tas-alt" type="number" step="any" value="8500" placeholder="8,500 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tas-oat">Outside Temp OAT (°C)</label>
          <input class="tool-textarea" id="tas-oat" type="number" step="any" value="5" placeholder="5 °C" />
        </div>
      </div>
      <div id="tas-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tas-res-tas" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">138.2 Knots TAS</span>
            <span class="stat-label">True Airspeed (TAS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tas-res-da" style="font-weight:700;">9,340 Feet</span>
            <span class="stat-label">Density Altitude</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tas-res-diff">+15.2% Gain</span>
            <span class="stat-label">Speed Gain Over Indicated</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const casEl = document.getElementById('tas-cas'), altEl = document.getElementById('tas-alt'), oatEl = document.getElementById('tas-oat');
  const tasResEl = document.getElementById('tas-res-tas'), daResEl = document.getElementById('tas-res-da'), diffResEl = document.getElementById('tas-res-diff');

  function update() {
    const cas = parseFloat(casEl.value), altFt = parseFloat(altEl.value), oatC = parseFloat(oatEl.value);
    if (isNaN(cas) || isNaN(altFt) || isNaN(oatC) || cas <= 0) return;

    // Standard temperature at altitude T_isa = 15 - 0.0019812 * altFt
    const tIsa = 15 - (0.0019812 * altFt);
    // Density Altitude DA = Pressure Alt + 118.8 * (OAT - T_isa)
    const da = altFt + 118.8 * (oatC - tIsa);

    // Rule of thumb for TAS: ~2% increase in CAS per 1,000 feet density altitude
    // Precise density ratio:
    const tKelvin = oatC + 273.15;
    const pAltRatio = Math.pow(1 - (0.0000068756 * altFt), 5.2559);
    const rhoRatio = pAltRatio * (288.15 / tKelvin);
    const tas = cas / Math.sqrt(Math.max(0.1, rhoRatio));

    const gainPct = ((tas - cas) / cas) * 100;

    tasResEl.textContent = tas.toFixed(1) + ' Knots TAS';
    daResEl.textContent = Math.round(da).toLocaleString() + ' Feet';
    diffResEl.textContent = '+' + gainPct.toFixed(1) + '% Gain Over CAS';
  }

  [casEl, altEl, oatEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Calibrated Airspeed (CAS) in knots from the airspeed indicator.',
      'Enter aircraft Pressure Altitude in feet (altimeter set to 29.92 inHg).',
      'Enter Outside Air Temperature (OAT) in Celsius.',
      'Inspect True Airspeed (TAS) and Density Altitude.'
    ],
    benefitTitle: 'Air Density Thinning at High Flight Altitudes',
    benefitContent: 'As altitude increases, thinner air generates less dynamic pressure on the pitot tube (indicating lower CAS), while the aircraft actually flies ~2% faster through the air for every 1,000 feet of altitude.',
    faqs: [{ q: 'What is the rule of thumb for True Airspeed?', a: 'Add approximately 2% to your Indicated/Calibrated Airspeed for every 1,000 feet of altitude above sea level.' }]
  },

  // 3. Aircraft Climb Gradient & Rate of Climb (ROC) Calculator
  {
    slug: 'aircraft-climb-gradient-rate-of-climb-calculator',
    name: 'Aircraft Climb Gradient & Rate of Climb (ROC) Calculator',
    description: 'Convert aircraft climb gradient (ft/NM and %) to required Rate of Climb (ROC in ft/min = Groundspeed · Gradient / 60) for obstacle clearance departure procedures (ODP).',
    category: 'Daily',
    icon: 'text',
    keywords: ['aircraft climb gradient calculator', 'rate of climb ft min calculator', 'climb gradient feet per nautical mile', 'aviation odp climb requirement online', 'groundspeed climb rate formula'],
    order: 346,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Required Gradient (ft/NM or %) & Groundspeed (kts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="clm-grad">Required Climb Gradient (ft / NM)</label>
          <input class="tool-textarea" id="clm-grad" type="number" step="any" value="300" placeholder="300 ft/NM (Standard IFR = 200)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clm-gs">Climb Groundspeed (Knots)</label>
          <input class="tool-textarea" id="clm-gs" type="number" step="any" value="120" placeholder="120 kts" />
        </div>
      </div>
      <div id="clm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="clm-res-roc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">600 ft / min</span>
            <span class="stat-label">Required Vertical Speed (ROC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="clm-res-pct" style="font-weight:700;">4.93% Climb Gradient</span>
            <span class="stat-label">Gradient Percentage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const grEl = document.getElementById('clm-grad'), gsEl = document.getElementById('clm-gs');
  const rocResEl = document.getElementById('clm-res-roc'), pctResEl = document.getElementById('clm-res-pct');

  function update() {
    const ftPerNm = parseFloat(grEl.value), gsKts = parseFloat(gsEl.value);
    if (isNaN(ftPerNm) || isNaN(gsKts) || ftPerNm <= 0 || gsKts <= 0) return;

    // ROC (ft / min) = (ft / NM) * (Groundspeed kts / 60)
    const roc = ftPerNm * (gsKts / 60);
    // Gradient % = (ft / 6076.12 ft) * 100
    const gradPct = (ftPerNm / 6076.12) * 100;

    rocResEl.textContent = Math.round(roc).toLocaleString() + ' ft / min';
    pctResEl.textContent = gradPct.toFixed(2) + '% Climb Gradient';
  }

  grEl.addEventListener('input', update);
  gsEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter published Instrument Departure Procedure (DP/SID) climb gradient in feet per nautical mile (ft/NM).',
      'Enter actual groundspeed in knots during initial climb.',
      'Inspect required vertical speed indicator (VSI) rate in feet per minute (ft/min).'
    ],
    benefitTitle: 'FAA Standard IFR Climb Gradient (200 ft/NM)',
    benefitContent: 'FAA instrument procedures establish a baseline standard climb requirement of 200 feet per NM (3.3% gradient), beginning 35 feet above departure runway end, to guarantee terrain obstacle clearance.',
    faqs: [{ q: 'What is the required climb rate for 300 ft/NM at 120 knots groundspeed?', a: 'ROC = 300 ft/NM × (120 / 60) = exactly 600 ft/min vertical speed.' }]
  },

  // 4. Marine Displacement Hull Speed Calculator
  {
    slug: 'displacement-hull-speed-marine-calculator',
    name: 'Displacement Boat Hull Speed & Froude Number Calculator',
    description: 'Calculate maximum theoretical displacement hull speed (v_hull = 1.34 · √(LWL in feet)) in knots from boat waterline length (LWL) and Froude number.',
    category: 'Daily',
    icon: 'text',
    keywords: ['displacement hull speed calculator', 'boat hull speed knots formula', 'lwl waterline length hull speed', 'froude number boat speed calculator', 'sailboat maximum speed online'],
    order: 347,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Boat Waterline Length (LWL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hl-lwl-ft">Waterline Length LWL (Feet)</label>
          <input class="tool-textarea" id="hl-lwl-ft" type="number" step="any" value="36" placeholder="36 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-lwl-m">Waterline Length LWL (Meters)</label>
          <input class="tool-textarea" id="hl-lwl-m" type="number" step="any" placeholder="m" />
        </div>
      </div>
      <div id="hl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hl-res-knots" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.04 Knots</span>
            <span class="stat-label">Maximum Hull Speed (v_hull)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hl-res-kmh" style="font-weight:700;">14.89 km/h (9.25 mph)</span>
            <span class="stat-label">Metric Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ftEl = document.getElementById('hl-lwl-ft'), mEl = document.getElementById('hl-lwl-m');
  const kResEl = document.getElementById('hl-res-knots'), kmhResEl = document.getElementById('hl-res-kmh');

  function updateFromFeet(lwlFt) {
    if (isNaN(lwlFt) || lwlFt <= 0) return;

    mEl.value = (lwlFt * 0.3048).toFixed(2);

    // v_hull = 1.34 * sqrt(LWL_ft) in knots
    const knots = 1.34 * Math.sqrt(lwlFt);
    const kmh = knots * 1.852;
    const mph = knots * 1.15078;

    kResEl.textContent = knots.toFixed(2) + ' Knots';
    kmhResEl.textContent = kmh.toFixed(2) + ' km/h (' + mph.toFixed(2) + ' mph)';
  }

  ftEl.addEventListener('input', () => {
    const v = parseFloat(ftEl.value);
    if (!isNaN(v)) updateFromFeet(v);
  });

  mEl.addEventListener('input', () => {
    const v = parseFloat(mEl.value);
    if (!isNaN(v)) {
      const ft = v / 0.3048;
      ftEl.value = ft.toFixed(1);
      updateFromFeet(ft);
    }
  });

  updateFromFeet(36);
})();`,
    howToSteps: [
      'Enter sailboat or motorboat Load Waterline Length (LWL) in feet or meters.',
      'Inspect the physical displacement wave-barrier maximum hull speed in Knots, km/h, and mph.'
    ],
    benefitTitle: 'Bow Wave Length Trapping Barrier',
    benefitContent: 'As a displacement vessel accelerates, it generates a bow wave and stern wave; at hull speed, the wavelength of the bow wave equals the boat waterline length (Fn ≈ 0.40), trapping the boat in its own wave trough unless it possesses sufficient power to plane.',
    faqs: [{ q: 'What is the hull speed of a 36-foot waterline yacht?', a: 'v_hull = 1.34 × √36 = 1.34 × 6 = 8.04 Knots (~14.9 km/h).' }]
  },

  // 5. Runway Crosswind & Headwind Component Calculator
  {
    slug: 'crosswind-headwind-runway-component-calculator',
    name: 'Runway Crosswind & Headwind Component Calculator',
    description: 'Calculate orthogonal Crosswind (Wind Speed · sin(θ)) and Headwind/Tailwind (Wind Speed · cos(θ)) components for airport runways from wind velocity and magnetic heading.',
    category: 'Daily',
    icon: 'text',
    keywords: ['crosswind component calculator', 'runway wind calculator aviation', 'headwind crosswind formula', 'runway crosswind limit calculator', 'aviation landing wind components online'],
    order: 348,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Runway Heading, Wind Direction & Wind Speed',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wnd-rwy">Runway Heading (e.g. 27 = 270°)</label>
          <input class="tool-textarea" id="wnd-rwy" type="number" min="1" max="36" value="27" placeholder="27 (270°)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wnd-dir">Wind Direction (° Mag)</label>
          <input class="tool-textarea" id="wnd-dir" type="number" min="1" max="360" value="310" placeholder="310°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wnd-spd">Wind Speed (Knots)</label>
          <input class="tool-textarea" id="wnd-spd" type="number" step="any" value="20" placeholder="20 kts" />
        </div>
      </div>
      <div id="wnd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wnd-res-xwind" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.9 Knots (Right)</span>
            <span class="stat-label">Crosswind Component</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wnd-res-hwind" style="font-weight:700;">15.3 Knots (Headwind)</span>
            <span class="stat-label">Headwind Component</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rwyEl = document.getElementById('wnd-rwy'), dirEl = document.getElementById('wnd-dir'), spdEl = document.getElementById('wnd-spd');
  const xResEl = document.getElementById('wnd-res-xwind'), hResEl = document.getElementById('wnd-res-hwind');

  function update() {
    const rwyNum = parseFloat(rwyEl.value);
    const windDir = parseFloat(dirEl.value);
    const windSpd = parseFloat(spdEl.value);

    if (isNaN(rwyNum) || isNaN(windDir) || isNaN(windSpd) || windSpd < 0) return;

    const rwyDeg = rwyNum * 10;
    // Angle between wind and runway
    let angleDiff = windDir - rwyDeg;
    while (angleDiff > 180) angleDiff -= 360;
    while (angleDiff < -180) angleDiff += 360;

    const rad = (angleDiff * Math.PI) / 180;
    // Crosswind = Wind * sin(angle)
    const crosswind = windSpd * Math.sin(rad);
    // Headwind = Wind * cos(angle)
    const headwind = windSpd * Math.cos(rad);

    const absCross = Math.abs(crosswind);
    const crossSide = crosswind > 0 ? 'Right' : 'Left';

    xResEl.textContent = absCross.toFixed(1) + ' Knots (' + (absCross > 0 ? crossSide : 'Direct') + ')';
    if (headwind >= 0) {
      hResEl.textContent = headwind.toFixed(1) + ' Knots (Headwind)';
      hResEl.style.color = '#22543d';
    } else {
      hResEl.textContent = Math.abs(headwind).toFixed(1) + ' Knots (TAILWIND WARNING)';
      hResEl.style.color = '#c53030';
    }
  }

  [rwyEl, dirEl, spdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter two-digit runway identifier (e.g. 27 for runway heading 270°).',
      'Enter reported METAR / ATIS wind direction (degrees magnetic) and wind speed in knots.',
      'Inspect exact crosswind component and headwind / tailwind vector.'
    ],
    benefitTitle: 'Pilot Crosswind Landing Safety Limits',
    benefitContent: 'Every aircraft type specifies a Maximum Demonstrated Crosswind Component (e.g. 15 knots for a Cessna 172, 38 knots for a Boeing 737) to prevent runway veer-off excursions during landing rollouts.',
    faqs: [{ q: 'What is the crosswind for wind 300° at 20 knots on Runway 27?', a: 'Angle diff is 30°; Crosswind = 20 × sin(30°) = 10.0 knots from the right; Headwind = 20 × cos(30°) = 17.3 knots.' }]
  }
];

toolsSuiteGG.forEach(createTool);
console.log('Suite GG complete: 5 tools created.');
