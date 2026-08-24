const { createTool } = require('./generate-curated-tools.cjs');

// Suite R: 7 Tools to cross 400+ tools in Fluid Mechanics, Materials & Solid Elasticity
const toolsSuiteR = [
  // 1. Hagen-Poiseuille Laminar Viscous Flow Calculator
  {
    slug: 'poiseuille-laminar-pipe-flow-calculator',
    name: 'Hagen-Poiseuille Viscous Pipe Flow Calculator',
    description: 'Calculate laminar volumetric flow rate (Q = (π · ΔP · r⁴) / (8 · η · L)) and pressure drop for viscous fluid and blood flow in cylindrical pipes and vessels.',
    category: 'Science',
    icon: 'text',
    keywords: ['poiseuille law calculator', 'viscous laminar pipe flow formula', 'blood flow vessel radius poiseuille', 'pressure drop laminar pipe calculator', 'fluid dynamics poiseuille online'],
    order: 269,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pressure Drop (ΔP), Pipe Radius (r), Length & Viscosity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="poi-dp">Pressure Drop ΔP (kPa)</label>
          <input class="tool-textarea" id="poi-dp" type="number" step="any" value="5.0" placeholder="5.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poi-radius">Pipe Radius r (mm)</label>
          <input class="tool-textarea" id="poi-radius" type="number" step="any" value="10" placeholder="10 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poi-length">Pipe Length L (meters)</label>
          <input class="tool-textarea" id="poi-length" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poi-visc">Viscosity η (mPa·s / cP)</label>
          <input class="tool-textarea" id="poi-visc" type="number" step="any" value="1.0" placeholder="1.0 (Water)" />
        </div>
      </div>
      <div id="poi-flow-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="poi-flow-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">589.05 L/min</span>
            <span class="stat-label">Volumetric Flow Rate (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="poi-flow-res-lps" style="font-weight:700;">9.82 L/s</span>
            <span class="stat-label">Discharge Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('poi-dp'), rEl = document.getElementById('poi-radius');
  const lEl = document.getElementById('poi-length'), vEl = document.getElementById('poi-visc');
  const qEl = document.getElementById('poi-flow-res-q'), lpsEl = document.getElementById('poi-flow-res-lps');

  function update() {
    const dpKpa = parseFloat(dpEl.value), rMm = parseFloat(rEl.value);
    const lM = parseFloat(lEl.value), etaMpa = parseFloat(vEl.value);

    if (isNaN(dpKpa) || isNaN(rMm) || isNaN(lM) || isNaN(etaMpa) || dpKpa <= 0 || rMm <= 0 || lM <= 0 || etaMpa <= 0) return;

    const dpPa = dpKpa * 1000;
    const rM = rMm / 1000;
    const etaPaS = etaMpa * 1e-3;

    // Q = (pi * dp * r^4) / (8 * eta * L)  [m^3 / s]
    const qM3s = (Math.PI * dpPa * Math.pow(rM, 4)) / (8 * etaPaS * lM);
    const qLps = qM3s * 1000;
    const qLpm = qLps * 60;

    qEl.textContent = qLpm >= 1000 ? (qLpm / 1000).toFixed(2) + ' m³/min' : qLpm.toFixed(2) + ' L/min';
    lpsEl.textContent = qLps.toFixed(2) + ' L/s';
  }

  [dpEl, rEl, lEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter driving pressure drop ΔP in kPa across the pipe segment.',
      'Enter pipe internal radius in millimeters (mm).',
      'Enter pipe length in meters and dynamic viscosity in mPa·s (Water = 1.0, Blood = ~3.5).',
      'Inspect laminar discharge flow rate.'
    ],
    benefitTitle: 'The Crucial Fourth-Power Radius Law (r⁴)',
    benefitContent: 'Flow rate scales with the fourth power of radius (Q ∝ r⁴): widening a pipe or blood vessel by just 20% increases volumetric flow rate by more than double (1.2⁴ ≈ 2.07x).',
    faqs: [{ q: 'Why is Poiseuille\'s law important in cardiovascular medicine?', a: 'Mild arterial plaque narrowing causes massive increases in vascular resistance, forcing the heart to generate dangerously high blood pressure.' }]
  },

  // 2. Young's Modulus Tensile Stress & Strain Calculator
  {
    slug: 'youngs-modulus-tensile-strain-calculator',
    name: 'Young\'s Modulus & Tensile Stress-Strain Calculator',
    description: 'Calculate Young\'s Modulus of Elasticity (E = σ / ε), tensile stress (σ = F/A), elongation strain (ε = ΔL/L₀), and tensile stiffness for engineering materials.',
    category: 'Science',
    icon: 'text',
    keywords: ['youngs modulus calculator', 'tensile stress strain calculator', 'modulus of elasticity formula', 'hookes law tensile elongation online', 'engineering stress strain gpa calculator'],
    order: 270,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tensile Force (F), Cross-Section Area (A) & Elongation',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ym-force">Tensile Force F (kN)</label>
          <input class="tool-textarea" id="ym-force" type="number" step="any" value="50" placeholder="50 kN" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ym-area">Cross-Section Area A (mm²)</label>
          <input class="tool-textarea" id="ym-area" type="number" step="any" value="250" placeholder="250 mm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ym-l0">Original Length L₀ (meters)</label>
          <input class="tool-textarea" id="ym-l0" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ym-dl">Elongation ΔL (mm)</label>
          <input class="tool-textarea" id="ym-dl" type="number" step="any" value="2.0" placeholder="2.0 mm" />
        </div>
      </div>
      <div id="ym-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ym-res-e" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">200.0 GPa</span>
            <span class="stat-label">Young\'s Modulus (E = σ / ε)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ym-res-stress" style="font-weight:700;">200.0 MPa</span>
            <span class="stat-label">Tensile Stress (σ = F/A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ym-res-strain">0.100% (0.0010)</span>
            <span class="stat-label">Elastic Strain (ε)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ym-force'), aEl = document.getElementById('ym-area');
  const l0El = document.getElementById('ym-l0'), dlEl = document.getElementById('ym-dl');
  const eEl = document.getElementById('ym-res-e'), sEl = document.getElementById('ym-res-stress'), stEl = document.getElementById('ym-res-strain');

  function update() {
    const fKn = parseFloat(fEl.value), aMm2 = parseFloat(aEl.value);
    const l0M = parseFloat(l0El.value), dlMm = parseFloat(dlEl.value);

    if (isNaN(fKn) || isNaN(aMm2) || isNaN(l0M) || isNaN(dlMm) || fKn <= 0 || aMm2 <= 0 || l0M <= 0 || dlMm <= 0) return;

    const fN = fKn * 1000;
    const aM2 = aMm2 * 1e-6;
    const dlM = dlMm * 1e-3;

    // Stress sigma = F / A (Pa)
    const stressPa = fN / aM2;
    const stressMpa = stressPa / 1e6;

    // Strain epsilon = dL / L0
    const strain = dlM / l0M;

    // Young's modulus E = sigma / epsilon
    const ePa = stressPa / strain;
    const eGpa = ePa / 1e9;

    eEl.textContent = eGpa.toFixed(1) + ' GPa';
    sEl.textContent = stressMpa.toFixed(1) + ' MPa';
    stEl.textContent = (strain * 100).toFixed(3) + '% (' + strain.toFixed(4) + ')';
  }

  [fEl, aEl, l0El, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied tensile tensile pulling load in kilonewtons (kN).',
      'Enter test specimen cross-sectional area in square millimeters (mm²).',
      'Enter original gauge length (meters) and measured elastic stretch (mm).',
      'Inspect tensile stress (MPa), strain (%), and Young\'s Elastic Modulus (GPa).'
    ],
    benefitTitle: 'Hooke\'s Law Linear Elastic Regime',
    benefitContent: 'Named after Thomas Young (1807), Young\'s modulus measures a material\'s intrinsic resistance to elastic deformation under uniaxial tension (Structural Steel ≈ 200 GPa, Titanium ≈ 116 GPa, Aluminum ≈ 69 GPa).',
    faqs: [{ q: 'What is 1 GPa in Pascals?', a: '1 GigaPascal (GPa) = 1,000 MegaPascals (MPa) = 10⁹ N/m².' }]
  },

  // 3. Thermal Stress in Restrained Beams Calculator
  {
    slug: 'thermal-stress-expansion-restraint-calculator',
    name: 'Thermal Stress in Restrained Beams Calculator',
    description: 'Calculate internal thermal compressive/tensile stress (σ = E · α · ΔT) and induced axial force developed in rigidly constrained structural beams during temperature swings.',
    category: 'Science',
    icon: 'text',
    keywords: ['thermal stress calculator', 'restrained beam thermal stress formula', 'sigma e alpha delta t calculator', 'bridge structural thermal stress online', 'axial thermal expansion force'],
    order: 271,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Young\'s Modulus (E), Thermal Expansion (α) & ΔT',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ts-e">Elastic Modulus E (GPa)</label>
          <input class="tool-textarea" id="ts-e" type="number" step="any" value="200" placeholder="200 GPa (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-alpha">Thermal Coeff α (10⁻⁶ / °C)</label>
          <input class="tool-textarea" id="ts-alpha" type="number" step="any" value="12" placeholder="12 (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-dt">Temp Change ΔT (°C)</label>
          <input class="tool-textarea" id="ts-dt" type="number" step="any" value="35" placeholder="35 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-area">Beam Area A (cm²)</label>
          <input class="tool-textarea" id="ts-area" type="number" step="any" value="100" placeholder="100 cm²" />
        </div>
      </div>
      <div id="ts-str-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ts-str-res-stress" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">84.0 MPa</span>
            <span class="stat-label">Induced Thermal Stress (σ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ts-str-res-force" style="color:#c53030; font-weight:700;">840.0 kN (85.6 Tons)</span>
            <span class="stat-label">Axial Restraint Force (F = σ·A)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('ts-e'), aEl = document.getElementById('ts-alpha');
  const dtEl = document.getElementById('ts-dt'), arEl = document.getElementById('ts-area');
  const sResEl = document.getElementById('ts-str-res-stress'), fResEl = document.getElementById('ts-str-res-force');

  function update() {
    const eGpa = parseFloat(eEl.value), alphaU = parseFloat(aEl.value);
    const dtC = parseFloat(dtEl.value), aCm2 = parseFloat(arEl.value);

    if (isNaN(eGpa) || isNaN(alphaU) || isNaN(dtC) || isNaN(aCm2) || eGpa <= 0 || alphaU <= 0 || dtC === 0 || aCm2 <= 0) return;

    const ePa = eGpa * 1e9;
    const alpha = alphaU * 1e-6;
    const aM2 = aCm2 * 1e-4;

    // sigma = E * alpha * DeltaT (Pa)
    const stressPa = ePa * alpha * Math.abs(dtC);
    const stressMpa = stressPa / 1e6;

    // F = sigma * A (N)
    const forceN = stressPa * aM2;
    const forceKn = forceN / 1000;
    const forceTons = forceKn / 9.80665;

    sResEl.textContent = stressMpa.toFixed(1) + ' MPa (' + (dtC > 0 ? 'Compressive' : 'Tensile') + ')';
    fResEl.textContent = forceKn.toFixed(1) + ' kN (' + forceTons.toFixed(1) + ' metric tons)';
  }

  [eEl, aEl, dtEl, arEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter material elastic modulus (GPa) and coefficient of thermal expansion (α).',
      'Enter seasonal temperature difference ΔT in Celsius.',
      'Enter beam cross-sectional area in cm².',
      'Inspect internal thermal stress (MPa) and resulting reaction force on structural abutments.'
    ],
    benefitTitle: 'Preventing Structural Railway Buckling',
    benefitContent: 'Continuously welded rail (CWR) tracks are constrained against linear expansion. In extreme summer heat, internal thermal compressive stresses can reach over 100 MPa, triggering catastrophic track buckling if not pre-stressed.',
    faqs: [{ q: 'Does thermal stress depend on beam length?', a: 'No, thermal stress in rigidly restrained beams is independent of length because both thermal expansion ΔL and elastic strain compliance scale linearly with length.' }]
  },

  // 4. Jurin's Law Capillary Tube Liquid Rise Calculator
  {
    slug: 'surface-tension-capillary-rise-calculator',
    name: 'Capillary Action & Surface Tension Rise Calculator',
    description: 'Calculate capillary liquid rise height (h = (2 · γ · cos θ) / (ρ · g · r)) in narrow glass tubes and plant xylem vessels using Jurin\'s law.',
    category: 'Science',
    icon: 'text',
    keywords: ['capillary rise calculator', 'jurins law surface tension calculator', 'capillary action height formula', 'surface tension contact angle calculator', 'capillary tube radius water rise'],
    order: 272,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Tension (γ), Tube Radius & Contact Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cap-gamma">Surface Tension γ (N/m)</label>
          <input class="tool-textarea" id="cap-gamma" type="number" step="any" value="0.0728" placeholder="0.0728 N/m (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-theta">Contact Angle θ (Degrees)</label>
          <input class="tool-textarea" id="cap-theta" type="number" min="0" max="89" value="0" placeholder="0° (Clean Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-radius">Tube Radius r (mm)</label>
          <input class="tool-textarea" id="cap-radius" type="number" step="any" value="0.5" placeholder="0.5 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-rho">Fluid Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="cap-rho" type="number" step="any" value="1000" placeholder="1000 (Water)" />
        </div>
      </div>
      <div id="cap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cap-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">29.69 mm (2.97 cm)</span>
            <span class="stat-label">Capillary Equilibrium Height (h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-laplace" style="font-weight:700;">291.2 Pa</span>
            <span class="stat-label">Laplace Meniscus Pressure (2γ/r)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('cap-gamma'), thEl = document.getElementById('cap-theta');
  const rEl = document.getElementById('cap-radius'), rhoEl = document.getElementById('cap-rho');
  const hResEl = document.getElementById('cap-res-h'), lpResEl = document.getElementById('cap-res-laplace');

  const g = 9.80665;

  function update() {
    const gamma = parseFloat(gEl.value), deg = parseFloat(thEl.value);
    const rMm = parseFloat(rEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(gamma) || isNaN(deg) || isNaN(rMm) || isNaN(rho) || gamma <= 0 || deg < 0 || deg >= 90 || rMm <= 0 || rho <= 0) return;

    const rM = rMm / 1000;
    const rad = (deg * Math.PI) / 180;

    // Jurin's Law: h = (2 * gamma * cos(theta)) / (rho * g * r)
    const hM = (2 * gamma * Math.cos(rad)) / (rho * g * rM);
    const hMm = hM * 1000;
    const hCm = hM * 100;
    const laplacePa = (2 * gamma * Math.cos(rad)) / rM;

    hResEl.textContent = hMm.toFixed(2) + ' mm (' + hCm.toFixed(2) + ' cm)';
    lpResEl.textContent = laplacePa.toFixed(1) + ' Pa';
  }

  [gEl, thEl, rEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fluid surface tension γ in N/m (Water = 0.0728 N/m at 20°C).',
      'Enter wetting contact angle θ in degrees (0° for pure water on glass).',
      'Enter glass capillary inner tube radius in mm.',
      'Inspect capillary liquid rise height and Laplace meniscus pressure.'
    ],
    benefitTitle: 'James Jurin\'s 1718 Capillarity Discovery',
    benefitContent: 'Capillary rise occurs when adhesive forces between liquid molecules and the tube wall exceed cohesive fluid forces, pulling the liquid column upward against gravity until hydrostatic pressure balances surface tension.',
    faqs: [{ q: 'How does capillary action assist tree hydration?', a: 'Narrow micro-vessels (xylem) in plant trunks utilize capillary action and transpiration cohesion tension to draw water hundreds of feet upward to high leaves.' }]
  },

  // 5. Hydrostatic Force on Submerged Vertical Rectangular Gate Calculator
  {
    slug: 'hydrostatic-force-submerged-gate-calculator',
    name: 'Hydrostatic Force on Submerged Gate Calculator',
    description: 'Calculate total hydrostatic water force (F = ρ · g · h_c · A) and Center of Pressure (y_cp) on submerged dam gates and flood barriers.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydrostatic force calculator', 'submerged gate force calculator', 'center of pressure hydrostatic formula', 'dam gate water pressure online', 'fluid statics centroid gate force'],
    order: 273,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gate Width, Height & Water Depth to Top',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hf-width">Gate Width w (meters)</label>
          <input class="tool-textarea" id="hf-width" type="number" step="any" value="3.0" placeholder="3.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hf-height">Gate Height h (meters)</label>
          <input class="tool-textarea" id="hf-height" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hf-depth">Depth to Top of Gate (meters)</label>
          <input class="tool-textarea" id="hf-depth" type="number" step="any" value="4.0" placeholder="4.0 m" />
        </div>
      </div>
      <div id="hf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hf-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">294.20 kN</span>
            <span class="stat-label">Resultant Hydrostatic Force (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hf-res-cp" style="font-weight:700;">5.07 meters</span>
            <span class="stat-label">Center of Pressure Depth (y_cp)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hf-res-tons">29.99 Metric Tons</span>
            <span class="stat-label">Total Water Load</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('hf-width'), hEl = document.getElementById('hf-height'), dEl = document.getElementById('hf-depth');
  const fResEl = document.getElementById('hf-res-force'), cpResEl = document.getElementById('hf-res-cp'), tResEl = document.getElementById('hf-res-tons');

  const rho = 1000; // Water density kg/m^3
  const g = 9.80665;

  function update() {
    const w = parseFloat(wEl.value), h = parseFloat(hEl.value), dTop = parseFloat(dEl.value);
    if (isNaN(w) || isNaN(h) || isNaN(dTop) || w <= 0 || h <= 0 || dTop < 0) return;

    const area = w * h;
    // Depth to centroid hc = dTop + h/2
    const hc = dTop + (h / 2);
    // Resultant force F = rho * g * hc * A
    const forceN = rho * g * hc * area;
    const forceKn = forceN / 1000;
    const forceTons = forceKn / 9.80665;

    // Second moment of area Ixc = (w * h^3) / 12
    const Ixc = (w * Math.pow(h, 3)) / 12;
    // Center of pressure y_cp = hc + (Ixc / (hc * A))
    const yCp = hc + (Ixc / (hc * area));

    fResEl.textContent = forceKn.toFixed(2) + ' kN';
    cpResEl.textContent = yCp.toFixed(2) + ' meters deep';
    tResEl.textContent = forceTons.toFixed(2) + ' Metric Tons';
  }

  [wEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vertical rectangular gate width and height in meters.',
      'Enter water depth from surface down to top edge of gate.',
      'Inspect total hydrostatic thrust force (kN and metric tons) and the location of the center of pressure line of action.'
    ],
    benefitTitle: 'Why the Center of Pressure Lies Below Centroid',
    benefitContent: 'Because hydrostatic water pressure increases linearly with depth (P = ρ·g·h), the lower portion of a gate experiences higher pressure than the top, shifting the resultant force point (Center of Pressure) strictly below the geometric centroid.',
    faqs: [{ q: 'Where should hinge supports be placed on dam floodgates?', a: 'Hinges and structural reinforcement ribs are positioned at or near the Center of Pressure to prevent rotational tipping moment instability.' }]
  }
];

toolsSuiteR.forEach(createTool);
console.log('Suite R complete: 5 tools created.');
