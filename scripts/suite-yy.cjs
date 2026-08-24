const { createTool } = require('./generate-curated-tools.cjs');

// Suite YY: 5 Tools in Fluid Machinery, Pump Affinity Laws, Cavitation NPSH & Marine Propellers to reach 563 tools
const toolsSuiteYY = [
  // 1. Centrifugal Pump Affinity Laws (Speed & Impeller Scaling) Calculator
  {
    slug: 'pump-affinity-laws-speed-diameter-calculator',
    name: 'Centrifugal Pump Affinity Laws (Speed & Diameter) Calculator',
    description: 'Calculate changes in centrifugal pump discharge flow rate (Q₂ ∝ N), total head (H₂ ∝ N²), and brake horsepower power (P₂ ∝ N³) when changing pump RPM speed or impeller diameter.',
    category: 'Science',
    icon: 'text',
    keywords: ['pump affinity laws calculator', 'centrifugal pump speed scaling formula', 'vfd pump power savings calculator', 'affinity law flow head power online', 'pump impeller trim calculator'],
    order: 436,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Operating Point (Q₁, H₁, P₁ in HP/kW) & Speed Change (N₁ to N₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pal-n1">Original RPM (N₁)</label>
          <input class="tool-textarea" id="pal-n1" type="number" step="any" value="1800" placeholder="1800 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pal-n2">New Target RPM (N₂)</label>
          <input class="tool-textarea" id="pal-n2" type="number" step="any" value="1440" placeholder="1440 RPM (80% Speed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pal-q1">Initial Flow Q₁ (GPM)</label>
          <input class="tool-textarea" id="pal-q1" type="number" step="any" value="500" placeholder="500 GPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pal-h1">Initial Head H₁ (Feet)</label>
          <input class="tool-textarea" id="pal-h1" type="number" step="any" value="100" placeholder="100 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pal-p1">Initial Power P₁ (HP)</label>
          <input class="tool-textarea" id="pal-p1" type="number" step="any" value="20" placeholder="20 HP" />
        </div>
      </div>
      <div id="pal-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="pal-res-q2" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">400 GPM</span>
            <span class="stat-label">New Flow Q₂ (∝ N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pal-res-h2" style="font-weight:700;">64.0 ft</span>
            <span class="stat-label">New Head H₂ (∝ N²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pal-res-p2" style="color:#2563eb; font-weight:800; font-size:1.4rem;">10.24 HP</span>
            <span class="stat-label">New Power P₂ (48.8% Energy Saved)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('pal-n1'), n2El = document.getElementById('pal-n2');
  const q1El = document.getElementById('pal-q1'), h1El = document.getElementById('pal-h1'), p1El = document.getElementById('pal-p1');
  const q2ResEl = document.getElementById('pal-res-q2'), h2ResEl = document.getElementById('pal-res-h2'), p2ResEl = document.getElementById('pal-res-p2');

  function update() {
    const N1 = parseFloat(n1El.value), N2 = parseFloat(n2El.value);
    const Q1 = parseFloat(q1El.value), H1 = parseFloat(h1El.value), P1 = parseFloat(p1El.value);

    if (isNaN(N1) || isNaN(N2) || isNaN(Q1) || isNaN(H1) || isNaN(P1) || N1 <= 0 || N2 <= 0) return;

    const speedRatio = N2 / N1;

    // Q2 = Q1 * (N2 / N1)
    const Q2 = Q1 * speedRatio;
    // H2 = H1 * (N2 / N1)^2
    const H2 = H1 * Math.pow(speedRatio, 2);
    // P2 = P1 * (N2 / N1)^3
    const P2 = P1 * Math.pow(speedRatio, 3);
    const savingsPct = ((P1 - P2) / P1) * 100;

    q2ResEl.textContent = Math.round(Q2) + ' GPM';
    h2ResEl.textContent = H2.toFixed(1) + ' ft';
    p2ResEl.textContent = P2.toFixed(2) + ' HP (' + savingsPct.toFixed(1) + '% Energy Saved)';
  }

  [n1El, n2El, q1El, h1El, p1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter original pump motor RPM (N₁) and new VFD target speed (N₂).',
      'Enter baseline flow rate Q₁, total dynamic head H₁, and motor brake horsepower P₁.',
      'Inspect scaled flow rate, head pressure, and cubic energy power reduction.'
    ],
    benefitTitle: 'Cubic Power Law (P ∝ N³) of VFD Variable Speed Drives',
    benefitContent: 'Because pump power consumption scales with the cube of speed (P ∝ N³), reducing pump motor speed by just 20% slashes electrical power consumption by nearly 50% (0.80³ = 0.512), making VFDs a massive industrial energy efficiency upgrade.',
    faqs: [{ q: 'What are the three pump affinity laws?', a: '1) Flow varies linearly with speed (Q₂/Q₁ = N₂/N₁); 2) Head varies quadratically (H₂/H₁ = (N₂/N₁)²); 3) Power varies cubically (P₂/P₁ = (N₂/N₁)³).' }]
  },

  // 2. Net Positive Suction Head Available (NPSHA) Cavitation Calculator
  {
    slug: 'npsh-net-positive-suction-head-cavitation-calculator',
    name: 'Net Positive Suction Head Available (NPSHA) Cavitation Calculator',
    description: 'Calculate pump suction margin (NPSHA = H_atm + H_s - H_f - H_vp) in feet and meters to prevent destructive impeller cavitation pitting.',
    category: 'Science',
    icon: 'text',
    keywords: ['npsha calculator', 'net positive suction head formula', 'pump cavitation safety margin calculator', 'npsh available vs required online', 'suction pipe head loss cavitation calculator'],
    order: 437,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Atmospheric Pressure, Static Suction Head (H_s), Friction Loss & Vapor Pressure',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="npsh-hatm">Atmospheric Head (ft)</label>
          <input class="tool-textarea" id="npsh-hatm" type="number" step="any" value="33.9" placeholder="33.9 ft (14.7 psi Sea Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="npsh-hs">Static Suction H_s (ft)</label>
          <input class="tool-textarea" id="npsh-hs" type="number" step="any" value="5.0" placeholder="+5.0 ft Flooded (or -10 ft Lift)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="npsh-hf">Suction Pipe Loss H_f (ft)</label>
          <input class="tool-textarea" id="npsh-hf" type="number" step="any" value="2.5" placeholder="2.5 ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="npsh-hvp">Vapor Pressure H_vp (ft)</label>
          <input class="tool-textarea" id="npsh-hvp" type="number" step="any" value="1.0" placeholder="1.0 ft (20°C Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="npsh-npshr">Pump NPSHR (ft)</label>
          <input class="tool-textarea" id="npsh-npshr" type="number" step="any" value="12.0" placeholder="12.0 ft" />
        </div>
      </div>
      <div id="npsh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="npsh-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">35.4 ft (10.79 m)</span>
            <span class="stat-label">Net Positive Suction Head Available (NPSHA)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="npsh-res-margin" style="color:var(--green-dark); font-weight:700;">+23.4 ft Margin (SAFE)</span>
            <span class="stat-label">Cavitation Safety Margin (NPSHA - NPSHR)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const atmEl = document.getElementById('npsh-hatm'), hsEl = document.getElementById('npsh-hs');
  const hfEl = document.getElementById('npsh-hf'), hvpEl = document.getElementById('npsh-hvp'), rEl = document.getElementById('npsh-npshr');
  const nResEl = document.getElementById('npsh-res-val'), mResEl = document.getElementById('npsh-res-margin');

  function update() {
    const Hatm = parseFloat(atmEl.value), Hs = parseFloat(hsEl.value);
    const Hf = parseFloat(hfEl.value), Hvp = parseFloat(hvpEl.value), Npshr = parseFloat(rEl.value);

    if (isNaN(Hatm) || isNaN(Hs) || isNaN(Hf) || isNaN(Hvp) || isNaN(Npshr) || Hatm <= 0) return;

    // NPSHA = Hatm + Hs - Hf - Hvp (ft)
    const npsha = Hatm + Hs - Hf - Hvp;
    const npshaM = npsha * 0.3048;
    const margin = npsha - Npshr;

    nResEl.textContent = npsha.toFixed(1) + ' ft (' + npshaM.toFixed(2) + ' meters)';

    if (margin < 0) {
      mResEl.textContent = margin.toFixed(1) + ' ft DEFICIT (CAVITATION DESTROYING PUMP!)';
      mResEl.style.color = '#c53030';
    } else if (margin < 3.0) {
      mResEl.textContent = '+' + margin.toFixed(1) + ' ft Margin (MARGINAL: Min 3-5 ft Recommended)';
      mResEl.style.color = '#d97706';
    } else {
      mResEl.textContent = '+' + margin.toFixed(1) + ' ft Cavitation Margin (SAFE > NPSHR)';
      mResEl.style.color = '#22543d';
    }
  }

  [atmEl, hsEl, hfEl, hvpEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter absolute atmospheric pressure head in feet (33.9 ft at sea level).',
      'Enter static suction liquid level H_s (positive for flooded suction tanks, negative for suction lift below pump).',
      'Enter suction piping friction loss H_f and liquid vapor pressure head H_vp.',
      'Enter pump manufacturer required NPSHR and inspect cavitation safety margin.'
    ],
    benefitTitle: 'Hydraulic Institute NPSH Safety Standards',
    benefitContent: 'To prevent liquid boiling into vapor bubbles at the low-pressure impeller eye (cavitation), the available suction head must exceed manufacturer required head (NPSHA ≥ NPSHR + 3 to 5 feet safety margin).',
    faqs: [{ q: 'What causes pump cavitation?', a: 'When local fluid pressure drops below the liquid\'s vapor pressure (P < P_vapor), micro-bubbles form and violently implode against the impeller metal, eroding blades.' }]
  },

  // 3. Marine Boat Propeller Pitch, Slip & Theoretical Speed Calculator
  {
    slug: 'marine-propeller-pitch-slip-boat-speed-calculator',
    name: 'Marine Boat Propeller Pitch, Slip & Speed Calculator',
    description: 'Calculate actual boat speed (Knots = (Engine RPM / Gear Ratio · Pitch · (1 - Slip)) / 1215.2) and determine propeller slip percentage.',
    category: 'Daily',
    icon: 'text',
    keywords: ['boat propeller speed calculator', 'propeller slip calculator marine', 'boat mph knots propeller pitch formula', 'outboard gear ratio pitch speed calculator', 'marine propeller efficiency online'],
    order: 438,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Engine RPM, Gear Reduction Ratio, Propeller Pitch (in) & Slip (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="prp-rpm">Engine RPM</label>
          <input class="tool-textarea" id="prp-rpm" type="number" step="any" value="5500" placeholder="5500 RPM (WOT)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prp-gear">Gear Ratio</label>
          <input class="tool-textarea" id="prp-gear" type="number" step="0.01" value="1.85" placeholder="1.85:1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prp-pitch">Prop Pitch (Inches)</label>
          <input class="tool-textarea" id="prp-pitch" type="number" step="any" value="21.0" placeholder="21.0 in (Travel/Rev)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prp-slip">Propeller Slip (%)</label>
          <input class="tool-textarea" id="prp-slip" type="number" step="any" value="12" placeholder="12% (Normal Planing Hull)" />
        </div>
      </div>
      <div id="prp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="prp-res-knots" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">45.2 Knots (52.0 MPH)</span>
            <span class="stat-label">Calculated Real Boat Speed</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="prp-res-theo" style="font-weight:700;">59.1 MPH Theoretical Zero-Slip</span>
            <span class="stat-label">Theoretical Speed Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpmEl = document.getElementById('prp-rpm'), gearEl = document.getElementById('prp-gear');
  const pitchEl = document.getElementById('prp-pitch'), slipEl = document.getElementById('prp-slip');
  const knResEl = document.getElementById('prp-res-knots'), thResEl = document.getElementById('prp-res-theo');

  function update() {
    const rpm = parseFloat(rpmEl.value), gear = parseFloat(gearEl.value);
    const pitchIn = parseFloat(pitchEl.value), slipPct = parseFloat(slipEl.value);

    if (isNaN(rpm) || isNaN(gear) || isNaN(pitchIn) || isNaN(slipPct) || rpm <= 0 || gear <= 0 || pitchIn <= 0) return;

    const propRpm = rpm / gear;
    // Theoretical Speed (MPH) = (propRpm * pitchIn * 60) / (12 * 5280) = (propRpm * pitchIn) / 1056
    const theoMph = (propRpm * pitchIn) / 1056;
    const realMph = theoMph * (1 - (slipPct / 100));
    const realKnots = realMph / 1.15078;
    const realKmh = realMph * 1.60934;

    knResEl.textContent = realKnots.toFixed(1) + ' Knots (' + realMph.toFixed(1) + ' MPH / ' + realKmh.toFixed(1) + ' km/h)';
    thResEl.textContent = theoMph.toFixed(1) + ' MPH Zero-Slip Limit (Prop RPM = ' + Math.round(propRpm) + ')';
  }

  [rpmEl, gearEl, pitchEl, slipEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter outboard/sterndrive wide-open throttle (WOT) engine RPM.',
      'Enter lower unit gear reduction ratio (e.g. 1.85:1 or 2.00:1).',
      'Enter propeller pitch in inches (theoretical distance the prop moves forward in 1 rotation).',
      'Enter propeller slip percentage (10-15% typical for planing monohulls, 5-8% for high-performance bass boats).',
      'Inspect actual boat top speed in Knots and MPH.'
    ],
    benefitTitle: 'Propeller Pitch & Slip Mechanics',
    benefitContent: 'Propeller pitch measures the theoretical forward travel per revolution like a screw through solid wood; water slippage (typically 10-18%) represents the inevitable fluid loss required to generate hydrodynamic thrust.',
    faqs: [{ q: 'What does a 21-pitch propeller mean?', a: 'A 21-pitch propeller would advance forward exactly 21 inches through solid material with zero slip during one 360° revolution.' }]
  },

  // 4. Pitot Tube Bernoulli Airspeed & Fluid Velocity Calculator
  {
    slug: 'bernoulli-pitot-tube-fluid-velocity-calculator',
    name: 'Pitot-Static Tube Fluid Velocity & Airspeed Calculator',
    description: 'Calculate fluid flow speed and aircraft true airspeed (v = √(2 · (P_total - P_static) / ρ)) from stagnation impact pressure differential and fluid density.',
    category: 'Science',
    icon: 'text',
    keywords: ['pitot tube calculator', 'pitot static tube airspeed formula', 'dynamic pressure to velocity calculator', 'bernoulli pitot velocity formula online', 'differential pressure flow velocity online'],
    order: 439,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Differential Dynamic Pressure ΔP (Pascals) & Fluid Medium',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pt-dp">Dynamic Pressure ΔP (Pa)</label>
          <input class="tool-textarea" id="pt-dp" type="number" step="any" value="2500" placeholder="2500 Pa (0.36 psi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-fluid">Fluid Medium</label>
          <select class="tool-textarea" id="pt-fluid">
            <option value="1.225" selected>Air (ρ = 1.225 kg/m³ - Aircraft)</option>
            <option value="1000">Water (ρ = 1,000 kg/m³ - Water Pipe)</option>
            <option value="850">Oil (ρ = 850 kg/m³)</option>
          </select>
        </div>
      </div>
      <div id="pt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pt-res-vel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">63.89 m / s (124.2 Knots)</span>
            <span class="stat-label">Calculated Flow Velocity (v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-speed" style="font-weight:700;">230.0 km/h (142.9 MPH)</span>
            <span class="stat-label">Ground / Air Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('pt-dp'), fEl = document.getElementById('pt-fluid');
  const vResEl = document.getElementById('pt-res-vel'), sResEl = document.getElementById('pt-res-speed');

  function update() {
    const dp = parseFloat(dpEl.value), rho = parseFloat(fEl.value);
    if (isNaN(dp) || isNaN(rho) || dp <= 0 || rho <= 0) return;

    // Bernoulli: q = 0.5 * rho * v^2 => v = sqrt(2 * dp / rho) (m/s)
    const vMs = Math.sqrt((2 * dp) / rho);
    const vKmh = vMs * 3.6;
    const vMph = vMs * 2.23694;
    const vKnots = vMs * 1.94384;

    vResEl.textContent = vMs.toFixed(2) + ' m / s (' + vKnots.toFixed(1) + ' Knots)';
    sResEl.textContent = vKmh.toFixed(1) + ' km/h (' + vMph.toFixed(1) + ' MPH)';
  }

  dpEl.addEventListener('input', update);
  fEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter differential dynamic pressure (P_total - P_static) in Pascals (N/m²).',
      'Select fluid medium (Air or Water).',
      'Inspect calculated fluid velocity in m/s, Knots, and km/h.'
    ],
    benefitTitle: 'Henri Pitot\'s 1732 River Velocity Discovery',
    benefitContent: 'Pitot tubes measure the impact stagnation pressure of moving fluid brought to rest; by Bernoulli\'s equation, dynamic pressure (P_stag - P_stat = ½ρv²) provides direct airspeed readout on all commercial airliners.',
    faqs: [{ q: 'What is the velocity of air when dynamic pressure is 2,500 Pa?', a: 'v = √(2 × 2500 / 1.225) ≈ 63.89 m/s (230.0 km/h or 124.2 Knots).' }]
  },

  // 5. Open Channel V-Notch (Thomson) & Rectangular Weir Flow Calculator
  {
    slug: 'weir-flow-rate-v-notch-rectangular-calculator',
    name: 'Open Channel V-Notch & Rectangular Weir Flow Rate Calculator',
    description: 'Calculate open channel water discharge rate (Q = 8/15 · C_d · √(2g) · tan(θ/2) · H^(5/2)) for 90° V-notch (Thomson weir) and sharp-crested rectangular weirs.',
    category: 'Science',
    icon: 'text',
    keywords: ['v notch weir flow calculator', 'weir discharge formula calculator', 'thomson 90 degree weir calculator', 'open channel flow rate over weir', 'rectangular weir flow calculator online'],
    order: 440,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weir Type & Water Head Height H (Centimeters or Inches)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wr-type">Weir Geometry</label>
          <select class="tool-textarea" id="wr-type">
            <option value="90" selected>90° V-Notch (Thomson Weir - High Precision)</option>
            <option value="60">60° V-Notch (Low Flows)</option>
            <option value="rect">Suppressed Rectangular Weir (1.0m Width)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="wr-head">Head Over Crest H (cm)</label>
          <input class="tool-textarea" id="wr-head" type="number" step="any" value="20" placeholder="20 cm" />
        </div>
      </div>
      <div id="wr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wr-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.04 L / s</span>
            <span class="stat-label">Discharge Flow Rate (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wr-res-m3">90.15 m³ / hour (396.9 GPM)</span>
            <span class="stat-label">Volumetric Discharge</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('wr-type'), hEl = document.getElementById('wr-head');
  const qResEl = document.getElementById('wr-res-q'), m3ResEl = document.getElementById('wr-res-m3');

  const gGrav = 9.80665;

  function update() {
    const mode = tEl.value, hCm = parseFloat(hEl.value);
    if (isNaN(hCm) || hCm <= 0) return;

    const hM = hCm * 1e-2;
    let qM3s = 0;

    if (mode === '90') {
      // 90 deg V-Notch: Q ≈ 1.38 * H^(5/2)
      qM3s = 1.38 * Math.pow(hM, 2.5);
    } else if (mode === '60') {
      // 60 deg V-Notch: Q ≈ 0.79 * H^(5/2)
      qM3s = 0.79 * Math.pow(hM, 2.5);
    } else {
      // Rectangular 1.0m width: Francis formula Q = 1.84 * L * H^(3/2)
      qM3s = 1.84 * 1.0 * Math.pow(hM, 1.5);
    }

    const qLps = qM3s * 1000;
    const qM3hr = qM3s * 3600;
    const qGpm = qLps * 15.8503;

    qResEl.textContent = qLps.toFixed(2) + ' L / s';
    m3ResEl.textContent = qM3hr.toFixed(2) + ' m³ / hr (' + qGpm.toFixed(1) + ' GPM)';
  }

  tEl.addEventListener('change', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select weir notch geometry (90° V-Notch Thomson, 60° V-Notch, or 1.0m Rectangular weir).',
      'Enter measured water head height H above the notch vertex in centimeters.',
      'Inspect stream water discharge flow rate in Liters per second (L/s), m³/hour, and GPM.'
    ],
    benefitTitle: 'James Thomson\'s 1858 Triangular Weir Standard',
    benefitContent: 'V-notch weirs provide highly accurate open-channel flow measurements across wide dynamic ranges because the triangular geometry contracts naturally at low flows, preserving high measurement sensitivity.',
    faqs: [{ q: 'Why is V-notch discharge proportional to H^(5/2)?', a: 'Flow area scales with H² while velocity scales with √H (H^(1/2)); multiplying area by velocity yields Q ∝ H^(5/2).' }]
  }
];

toolsSuiteYY.forEach(createTool);
console.log('Suite YY complete: 5 tools created.');
