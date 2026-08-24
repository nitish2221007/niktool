const { createTool } = require('./generate-curated-tools.cjs');

// Suite BBB: 5 Tools in Structural Steel Design, Bolted Joints, Welds & Column Buckling to reach 578 tools
const toolsSuiteBBB = [
  // 1. AISC High-Strength Structural Bolt Shear & Bearing Capacity Calculator
  {
    slug: 'bolt-shear-bearing-capacity-aisc-calculator',
    name: 'AISC High-Strength Bolt Shear & Bearing Strength Calculator',
    description: 'Calculate nominal bolt shear capacity (R_nv = F_nv · A_b) and hole bearing capacity (R_nb = 2.4 · d · t · F_u) for ASTM A325 and A490 structural steel bolts (AISC 360-16).',
    category: 'Science',
    icon: 'text',
    keywords: ['bolt shear capacity calculator', 'aisc bolt shear bearing calculator', 'astm a325 a490 bolt strength', 'structural bolt double shear formula', 'bolt bearing strength 2.4 d t fu online'],
    order: 451,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bolt Grade, Diameter (d in inches), Connected Plate Thickness (t in) & Shear Planes',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="blt-grade">Bolt Grade (AISC)</label>
          <select class="tool-textarea" id="blt-grade">
            <option value="54" selected>ASTM A325-N (F_nv = 54 ksi, Threads Included)</option>
            <option value="68">ASTM A325-X (F_nv = 68 ksi, Threads Excluded)</option>
            <option value="68.1">ASTM A490-N (F_nv = 68 ksi)</option>
            <option value="84">ASTM A490-X (F_nv = 84 ksi)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="blt-diam">Diameter d (Inches)</label>
          <select class="tool-textarea" id="blt-diam">
            <option value="0.75" selected>3/4" (0.75 in)</option>
            <option value="0.875">7/8" (0.875 in)</option>
            <option value="1.0">1" (1.00 in)</option>
            <option value="1.125">1-1/8" (1.125 in)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="blt-t">Plate Thickness t (in)</label>
          <input class="tool-textarea" id="blt-t" type="number" step="0.0625" value="0.50" placeholder="0.50 in (1/2 Plate)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="blt-planes">Shear Planes</label>
          <select class="tool-textarea" id="blt-planes">
            <option value="1" selected>Single Shear (1 Plane)</option>
            <option value="2">Double Shear (2 Planes)</option>
          </select>
        </div>
      </div>
      <div id="blt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="blt-res-cap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">17.89 kips (79.6 kN)</span>
            <span class="stat-label">Design Shear Strength (ϕR_n, ϕ = 0.75)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="blt-res-bear" style="font-weight:700;">49.50 kips</span>
            <span class="stat-label">Design Bearing Strength (A36 Steel F_u = 58 ksi)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('blt-grade'), dEl = document.getElementById('blt-diam');
  const tEl = document.getElementById('blt-t'), pEl = document.getElementById('blt-planes');
  const capResEl = document.getElementById('blt-res-cap'), brResEl = document.getElementById('blt-res-bear');

  const phi = 0.75; // AISC LRFD resistance factor

  function update() {
    const fnvKsi = parseFloat(gEl.value), dIn = parseFloat(dEl.value);
    const tIn = parseFloat(tEl.value), planes = parseInt(pEl.value, 10);

    if (isNaN(fnvKsi) || isNaN(dIn) || isNaN(tIn) || tIn <= 0) return;

    // Nominal cross section area A_b = pi * (d^2) / 4 (sq in)
    const Ab = (Math.PI * Math.pow(dIn, 2)) / 4;
    // Nominal shear Rn_shear = Fnv * Ab * planes
    const Rn_shear = fnvKsi * Ab * planes;
    const phiRn_shear = phi * Rn_shear;

    // Nominal bearing strength Rn_bearing = 2.4 * d * t * Fu (Assuming Fu = 58 ksi for A36/A992)
    const Fu = 58.0; // ksi
    const Rn_bearing = 2.4 * dIn * tIn * Fu;
    const phiRn_bearing = phi * Rn_bearing;

    const knShear = phiRn_shear * 4.44822;

    capResEl.textContent = phiRn_shear.toFixed(2) + ' kips (' + knShear.toFixed(1) + ' kN)';
    brResEl.textContent = phiRn_bearing.toFixed(2) + ' kips (Plate Tearout Limit)';
  }

  [gEl, dEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select high-strength bolt specification (ASTM A325 or A490 with threads included or excluded).',
      'Select nominal bolt shank diameter d (3/4", 7/8", 1").',
      'Enter connected steel plate thickness t in inches and shear plane condition (Single or Double shear).',
      'Inspect LRFD design bolt shear capacity (ϕR_n in kips / kN) and hole bearing tearout capacity.'
    ],
    benefitTitle: 'AISC 360-16 Specification Table J3.2',
    benefitContent: 'AISC structural steel specifications define nominal shear stresses for high-strength bolts (F_nv = 54 ksi for A325-N, 68 ksi for A325-X); double shear connections double the shear load capacity per fastener.',
    faqs: [{ q: 'What is the LRFD design shear capacity of a 3/4" A325-N bolt in single shear?', a: 'ϕR_nv = 0.75 × 54 ksi × (π/4 × 0.75²) = 0.75 × 54 × 0.4418 ≈ 17.89 kips (79.6 kN).' }]
  },

  // 2. Structural Fillet Weld Throat Size & Strength Calculator
  {
    slug: 'fillet-weld-throat-strength-calculator',
    name: 'Structural Fillet Weld Throat Size & LRFD Strength Calculator',
    description: 'Calculate effective throat dimension (t_e = 0.707 · w) and design shear strength (ϕR_n = 0.75 · 0.60 · F_EXX · t_e · L) for E70XX and E80XX fillet welds.',
    category: 'Science',
    icon: 'text',
    keywords: ['fillet weld strength calculator', 'weld throat size formula', 'e70xx fillet weld capacity kips per inch', 'aisc fillet weld shear strength calculator', '0.707 weld leg size calculator online'],
    order: 452,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weld Leg Size w (Inches), Length (Inches) & Electrode (E70 / E80)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wld-leg">Weld Leg Size w (in)</label>
          <select class="tool-textarea" id="wld-leg">
            <option value="0.1875">3/16" (0.1875 in)</option>
            <option value="0.25" selected>1/4" (0.250 in)</option>
            <option value="0.3125">5/16" (0.3125 in)</option>
            <option value="0.375">3/8" (0.375 in)</option>
            <option value="0.50">1/2" (0.500 in)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="wld-len">Weld Length L (in)</label>
          <input class="tool-textarea" id="wld-len" type="number" step="any" value="6.0" placeholder="6.0 in" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wld-elec">Electrode Rating</label>
          <select class="tool-textarea" id="wld-elec">
            <option value="70" selected>E70XX (F_EXX = 70 ksi - Standard)</option>
            <option value="80">E80XX (F_EXX = 80 ksi)</option>
          </select>
        </div>
      </div>
      <div id="wld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wld-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">33.40 kips (148.6 kN)</span>
            <span class="stat-label">Total Design Weld Strength (ϕR_n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wld-res-unit" style="font-weight:700;">5.57 kips / linear inch</span>
            <span class="stat-label">Capacity per Linear Inch (0.75 · 0.6 · F_EXX · 0.707w)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const legEl = document.getElementById('wld-leg'), lenEl = document.getElementById('wld-len'), elEl = document.getElementById('wld-elec');
  const totResEl = document.getElementById('wld-res-tot'), unResEl = document.getElementById('wld-res-unit');

  const phi = 0.75;

  function update() {
    const w = parseFloat(legEl.value), L = parseFloat(lenEl.value), Fexx = parseFloat(elEl.value);
    if (isNaN(w) || isNaN(L) || isNaN(Fexx) || w <= 0 || L <= 0) return;

    // Effective throat te = 0.707 * w
    const te = 0.70710678 * w;
    // Nominal weld shear strength per inch = 0.60 * Fexx * te (kips/in)
    const Rn_per_in = 0.60 * Fexx * te;
    const phiRn_per_in = phi * Rn_per_in;
    const totalPhiRn = phiRn_per_in * L;
    const totalKn = totalPhiRn * 4.44822;

    totResEl.textContent = totalPhiRn.toFixed(2) + ' kips (' + totalKn.toFixed(1) + ' kN)';
    unResEl.textContent = phiRn_per_in.toFixed(2) + ' kips / inch (Effective Throat ' + te.toFixed(3) + ' in)';
  }

  [legEl, lenEl, elEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select fillet weld leg size w in inches (e.g. 1/4", 5/16", 3/8").',
      'Enter total continuous weld length L in inches.',
      'Select welding electrode classification (E70XX 70 ksi standard).',
      'Inspect total AISC LRFD design shear capacity in kips / kN and unit strength per linear inch.'
    ],
    benefitTitle: '0.707 Throat Dimension Geometry',
    benefitContent: 'For a standard 45° equal-leg fillet weld, failure occurs along the minimum root-to-face throat dimension (t_e = w · cos(45°) = 0.707 · w); E70XX weld metal delivers 1.392 kips/inch for every 1/16th inch of leg size.',
    faqs: [{ q: 'What is the strength of a 1/4" (4/16") E70XX fillet weld per inch?', a: 'ϕR_n = 4 sixteenths × 1.392 kips/in = exactly 5.568 kips per linear inch.' }]
  },

  // 3. Euler Critical Column Elastic Buckling Load Calculator
  {
    slug: 'euler-critical-buckling-load-column-calculator',
    name: 'Euler Critical Column Buckling Load (P_cr) Calculator',
    description: 'Calculate theoretical Euler elastic buckling compressive load (P_cr = (π² · E · I) / (K · L)²) and critical buckling stress (σ_cr = π² · E / (KL/r)²) for structural columns.',
    category: 'Science',
    icon: 'text',
    keywords: ['euler buckling calculator', 'critical buckling load formula online', 'column buckling pi squared e i over kl squared', 'euler column critical stress calculator', 'structural steel column buckling online'],
    order: 453,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Modulus E (GPa), Moment of Inertia I (cm⁴), Length L (m) & End Fixity (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eul-k">End Restraint (K)</label>
          <select class="tool-textarea" id="eul-k">
            <option value="1.0" selected>Pinned - Pinned (K = 1.0)</option>
            <option value="0.7">Fixed - Pinned (K = 0.7)</option>
            <option value="0.5">Fixed - Fixed (K = 0.5 - Maximum Rigidity)</option>
            <option value="2.0">Fixed - Free Flagpole (K = 2.0 - Cantilever)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="eul-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="eul-e" type="number" step="any" value="200" placeholder="200 GPa (Structural Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eul-i">Inertia I_min (cm⁴)</label>
          <input class="tool-textarea" id="eul-i" type="number" step="any" value="1200" placeholder="1200 cm⁴ (Weak Axis)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eul-l">Unbraced Length L (m)</label>
          <input class="tool-textarea" id="eul-l" type="number" step="any" value="4.0" placeholder="4.0 m" />
        </div>
      </div>
      <div id="eul-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eul-res-pcr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,480 kN (332.8 kips)</span>
            <span class="stat-label">Euler Critical Buckling Load (P_cr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eul-res-eff">KL = 4.00 meters</span>
            <span class="stat-label">Effective Buckling Length (K · L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('eul-k'), eEl = document.getElementById('eul-e');
  const iEl = document.getElementById('eul-i'), lEl = document.getElementById('eul-l');
  const pResEl = document.getElementById('eul-res-pcr'), efResEl = document.getElementById('eul-res-eff');

  function update() {
    const K = parseFloat(kEl.value), eGpa = parseFloat(eEl.value);
    const iCm4 = parseFloat(iEl.value), lM = parseFloat(lEl.value);

    if (isNaN(K) || isNaN(eGpa) || isNaN(iCm4) || isNaN(lM) || eGpa <= 0 || iCm4 <= 0 || lM <= 0) return;

    const ePa = eGpa * 1e9;
    const iM4 = iCm4 * 1e-8; // 1 cm^4 = 10^-8 m^4
    const effLen = K * lM;

    // Euler formula: P_cr = (pi^2 * E * I) / (K * L)^2  [Newtons]
    const Pcr_N = (Math.pow(Math.PI, 2) * ePa * iM4) / Math.pow(effLen, 2);
    const Pcr_kN = Pcr_N / 1000;
    const Pcr_kips = Pcr_kN * 0.224809;

    pResEl.textContent = Math.round(Pcr_kN).toLocaleString() + ' kN (' + Pcr_kips.toFixed(1) + ' kips)';
    efResEl.textContent = 'KL = ' + effLen.toFixed(2) + ' meters (K = ' + K + ')';
  }

  [kEl, eEl, iEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select column end boundary conditions (Pinned-Pinned K=1.0, Fixed-Pinned K=0.7, Fixed-Fixed K=0.5, Flagpole K=2.0).',
      'Enter Young\'s Modulus of Elasticity in GPa (Steel = 200 GPa, Aluminum = 69 GPa).',
      'Enter minimum cross-section moment of inertia I_min in cm⁴.',
      'Enter unbraced column height L in meters.',
      'Inspect elastic critical buckling load threshold P_cr.'
    ],
    benefitTitle: 'Leonhard Euler\'s 1757 Elastic Instability Theorem',
    benefitContent: 'Euler proved that slender compressive members fail through sudden lateral elastic buckling instability rather than material crushing yield strength, inversely proportional to the square of the effective length (P_cr ∝ 1/(KL)²).',
    faqs: [{ q: 'Why is minimum axis of inertia I_min used for column buckling?', a: 'Because a column will always buckle around its weakest geometric axis (lowest moment of inertia I_y) unless laterally braced.' }]
  },

  // 4. AISC Column Slenderness Ratio (KL/r) Calculator
  {
    slug: 'aisc-column-slenderness-ratio-calculator',
    name: 'AISC Column Slenderness Ratio (KL/r) Calculator',
    description: 'Calculate effective column slenderness ratio (λ = (K · L) / r) and radius of gyration (r = √(I / A)) to classify short vs long columns per AISC 360-16.',
    category: 'Science',
    icon: 'text',
    keywords: ['column slenderness ratio calculator', 'kl over r calculator aisc', 'radius of gyration r sqrt i over a', 'column slenderness limit 200 aisc', 'structural steel column slenderness online'],
    order: 454,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Unbraced Length L (m), Radius of Gyration r (cm) & Effective Factor K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sr-k">K-Factor</label>
          <input class="tool-textarea" id="sr-k" type="number" step="0.05" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-l">Length L (m)</label>
          <input class="tool-textarea" id="sr-l" type="number" step="any" value="3.5" placeholder="3.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-r">Radius of Gyration r (cm)</label>
          <input class="tool-textarea" id="sr-r" type="number" step="any" value="5.2" placeholder="5.2 cm (r_y for W8x31)" />
        </div>
      </div>
      <div id="sr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sr-res-klr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">KL / r = 67.3</span>
            <span class="stat-label">Slenderness Ratio (KL / r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sr-res-check" style="color:var(--green-dark); font-weight:700;">PASSES (KL/r ≤ 200 Limit)</span>
            <span class="stat-label">AISC Code Compliance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('sr-k'), lEl = document.getElementById('sr-l'), rEl = document.getElementById('sr-r');
  const klrResEl = document.getElementById('sr-res-klr'), chResEl = document.getElementById('sr-res-check');

  function update() {
    const K = parseFloat(kEl.value), lM = parseFloat(lEl.value), rCm = parseFloat(rEl.value);
    if (isNaN(K) || isNaN(lM) || isNaN(rCm) || K <= 0 || lM <= 0 || rCm <= 0) return;

    const lMm = lM * 1000;
    const rMm = rCm * 10;

    // Slenderness ratio = (K * L) / r
    const klr = (K * lMm) / rMm;

    klrResEl.textContent = 'KL / r = ' + klr.toFixed(1);

    if (klr > 200) {
      chResEl.textContent = 'EXCEEDS AISC Limit! (KL/r > 200: Add intermediate lateral bracing)';
      chResEl.style.color = '#c53030';
    } else if (klr < 4.71 * Math.sqrt(200000 / 345)) { // ~113 for Gr 50 steel
      chResEl.textContent = 'Inelastic Buckling Regime (KL/r ≤ 113 for 50 ksi steel)';
      chResEl.style.color = '#22543d';
    } else {
      chResEl.textContent = 'Elastic Buckling Regime (113 < KL/r ≤ 200)';
      chResEl.style.color = '#2563eb';
    }
  }

  [kEl, lEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter effective length factor K.',
      'Enter unbraced column span length L in meters.',
      'Enter cross-section radius of gyration r in centimeters (r = √(I/A)).',
      'Inspect slenderness ratio (KL/r) and verify compliance with the AISC maximum limit of 200.'
    ],
    benefitTitle: 'AISC 360-16 Slenderness Limitation',
    benefitContent: 'AISC structural steel building codes recommend that compressive columns not exceed a maximum slenderness ratio of KL/r = 200 to avoid excessive flexibility and installation damage.',
    faqs: [{ q: 'What is radius of gyration (r)?', a: 'Radius of gyration r = √(I/A), representing the radial distance from the centroid where the entire cross-sectional area could be concentrated without altering its moment of inertia.' }]
  },

  // 5. Steel Wide-Flange (W-Beam) Plastic Moment Capacity Calculator
  {
    slug: 'steel-wide-flange-beam-bending-plastic-moment-calculator',
    name: 'Steel Wide-Flange Beam Plastic Bending Moment (M_p) Calculator',
    description: 'Calculate nominal plastic bending moment capacity (M_p = F_y · Z_x) and LRFD design flexural strength (ϕM_p = 0.90 · F_y · Z_x) for I-beams and W-sections.',
    category: 'Science',
    icon: 'text',
    keywords: ['plastic moment calculator', 'mp fy zx formula', 'wide flange beam flexural capacity calculator', 'steel beam plastic section modulus calculator', 'aisc lrfd beam bending capacity online'],
    order: 455,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Steel Yield Strength F_y (ksi / MPa) & Plastic Modulus Z_x (in³ / cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pm-fy">Steel Grade (F_y)</label>
          <select class="tool-textarea" id="pm-fy">
            <option value="50" selected>ASTM A992 / A572 Gr 50 (F_y = 50 ksi / 345 MPa)</option>
            <option value="36">ASTM A36 (F_y = 36 ksi / 250 MPa)</option>
            <option value="65">ASTM A572 Gr 65 (F_y = 65 ksi / 450 MPa)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pm-zx">Plastic Modulus Z_x (in³)</label>
          <input class="tool-textarea" id="pm-zx" type="number" step="any" value="54.6" placeholder="54.6 in³ (W16x31 Beam)" />
        </div>
      </div>
      <div id="pm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pm-res-phimp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">204.8 kip·ft (277.6 kN·m)</span>
            <span class="stat-label">Design Flexural Strength (ϕM_p, ϕ = 0.90)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pm-res-nom" style="font-weight:700;">227.5 kip·ft Nominal</span>
            <span class="stat-label">Nominal Plastic Moment (M_p = F_y · Z_x)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fyEl = document.getElementById('pm-fy'), zxEl = document.getElementById('pm-zx');
  const phiResEl = document.getElementById('pm-res-phimp'), nomResEl = document.getElementById('pm-res-nom');

  const phiB = 0.90; // AISC flexure resistance factor

  function update() {
    const fyKsi = parseFloat(fyEl.value), zxIn3 = parseFloat(zxEl.value);
    if (isNaN(fyKsi) || isNaN(zxIn3) || fyKsi <= 0 || zxIn3 <= 0) return;

    // Nominal plastic moment M_p = F_y * Z_x (kip*in)
    const Mp_kip_in = fyKsi * zxIn3;
    const Mp_kip_ft = Mp_kip_in / 12;
    const phiMp_kip_ft = phiB * Mp_kip_ft;
    const phiMp_kn_m = phiMp_kip_ft * 1.35582;

    phiResEl.textContent = phiMp_kip_ft.toFixed(1) + ' kip·ft (' + phiMp_kn_m.toFixed(1) + ' kN·m)';
    nomResEl.textContent = Mp_kip_ft.toFixed(1) + ' kip·ft Nominal (M_p = ' + Math.round(Mp_kip_in) + ' kip·in)';
  }

  fyEl.addEventListener('change', update);
  zxEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select structural steel specification grade (ASTM A992 50 ksi standard for wide-flange beams).',
      'Enter major-axis plastic section modulus Z_x in cubic inches (in³).',
      'Inspect nominal plastic moment capacity M_p and LRFD design flexural strength (ϕM_p in kip·ft and kN·m).'
    ],
    benefitTitle: 'Elastic Section Modulus (S) vs Plastic Modulus (Z)',
    benefitContent: 'When an I-beam reaches full cross-section yield (plastic hinge formation), its plastic section modulus Z is approximately 10% to 15% greater than its elastic section modulus S (Shape Factor = Z/S ≈ 1.12), providing extra structural reserve capacity.',
    faqs: [{ q: 'What is the design flexural strength of a W16x31 beam (Z_x = 54.6 in³) in 50 ksi steel?', a: 'ϕM_p = 0.90 × (50 ksi × 54.6 in³ / 12) = 0.90 × 227.5 kip·ft = 204.75 kip·ft (277.6 kN·m).' }]
  }
];

toolsSuiteBBB.forEach(createTool);
console.log('Suite BBB complete: 5 tools created.');
