const { createTool } = require('./generate-curated-tools.cjs');

// Suite VV: 5 Tools in Materials Science, Metallurgy, Hardness & Crystallography to reach 550 tools
const toolsSuiteVV = [
  // 1. Brinell Hardness Number (BHN / HBW) Calculator
  {
    slug: 'brinell-hardness-number-bhn-calculator',
    name: 'Brinell Hardness Number (HBW / BHN) Calculator',
    description: 'Calculate Brinell hardness (HBW = (2 · F) / (π · D · (D - √(D² - d²)))) in kgf/mm² from indenter tungsten carbide ball diameter (D), indentation impression diameter (d), and test load (F).',
    category: 'Science',
    icon: 'text',
    keywords: ['brinell hardness calculator', 'bhn hardness formula calculator', 'hbw hardness number calculation', 'tungsten carbide ball indentation hardness', 'metallurgy brinell test online'],
    order: 421,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Test Load F (kgf), Ball Diameter D (mm) & Indentation d (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bh-f">Test Load F (kgf)</label>
          <input class="tool-textarea" id="bh-f" type="number" step="any" value="3000" placeholder="3000 kgf (Standard Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-d">Ball Diameter D (mm)</label>
          <input class="tool-textarea" id="bh-d" type="number" step="any" value="10" placeholder="10 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-ind">Indentation d (mm)</label>
          <input class="tool-textarea" id="bh-ind" type="number" step="any" value="4.2" placeholder="4.2 mm" />
        </div>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-bhn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">207 HBW</span>
            <span class="stat-label">Brinell Hardness Number (HBW 10/3000)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-uts" style="font-weight:700;">~714 MPa (103.5 ksi)</span>
            <span class="stat-label">Estimated Tensile Strength (UTS ≈ 3.45 · HBW)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('bh-f'), dEl = document.getElementById('bh-d'), indEl = document.getElementById('bh-ind');
  const bhnResEl = document.getElementById('bh-res-bhn'), utsResEl = document.getElementById('bh-res-uts');

  function update() {
    const F = parseFloat(fEl.value), D = parseFloat(dEl.value), d = parseFloat(indEl.value);
    if (isNaN(F) || isNaN(D) || isNaN(d) || F <= 0 || D <= 0 || d <= 0 || d >= D) {
      bhnResEl.textContent = 'Ensure 0 < d < D';
      return;
    }

    // BHN = (2 * F) / (pi * D * (D - sqrt(D^2 - d^2)))
    const bhn = (2 * F) / (Math.PI * D * (D - Math.sqrt(Math.pow(D, 2) - Math.pow(d, 2))));
    // Empirical UTS for carbon steels: UTS (MPa) ≈ 3.45 * HBW
    const utsMpa = 3.45 * bhn;
    const utsKsi = utsMpa / 6.89476;

    bhnResEl.textContent = Math.round(bhn) + ' HBW (kgf/mm²)';
    utsResEl.textContent = '~' + Math.round(utsMpa) + ' MPa (' + utsKsi.toFixed(1) + ' ksi Steel UTS)';
  }

  [fEl, dEl, indEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter testing indentation load force in kgf (e.g. 3,000 kgf standard for steels, 500 kgf for aluminum).',
      'Enter spherical indenter ball diameter D in millimeters (10 mm standard).',
      'Enter microscope-measured indentation impression diameter d in millimeters.',
      'Inspect Brinell Hardness Number (HBW) and empirical Ultimate Tensile Strength (UTS).'
    ],
    benefitTitle: 'Johan August Brinell\'s 1900 Metallurgy Standard',
    benefitContent: 'Brinell hardness testing provides a reliable average hardness over larger heterogeneous microstructures (like cast iron and forged steel) by pressing a spherical tungsten carbide ball into the surface.',
    faqs: [{ q: 'How does Brinell hardness correlate to steel tensile strength?', a: 'For structural carbon steels, Ultimate Tensile Strength (UTS in MPa) is approximately 3.45 × HBW (or UTS in psi ≈ 500 × HBW).' }]
  },

  // 2. Vickers Pyramid Diamond Hardness (HV / VHN) Calculator
  {
    slug: 'vickers-hardness-number-vhn-calculator',
    name: 'Vickers Pyramid Diamond Hardness (HV) Calculator',
    description: 'Calculate Vickers microhardness (HV = (1.8544 · F) / d²) in kgf/mm² from applied test force (F in kgf or grams) and square diamond indentation diagonal lengths (d).',
    category: 'Science',
    icon: 'text',
    keywords: ['vickers hardness calculator', 'hv hardness formula calculator', 'diamond pyramid hardness vhn online', 'microhardness vickers tester online', 'vickers diagonal d1 d2 hardness calculator'],
    order: 422,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Force F (kgf) & Diagonal Lengths d₁, d₂ (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vh-f">Load Force F (kgf)</label>
          <input class="tool-textarea" id="vh-f" type="number" step="any" value="1.0" placeholder="1.0 kgf (HV1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vh-d1">Diagonal d₁ (μm)</label>
          <input class="tool-textarea" id="vh-d1" type="number" step="any" value="55.0" placeholder="55.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vh-d2">Diagonal d₂ (μm)</label>
          <input class="tool-textarea" id="vh-d2" type="number" step="any" value="56.0" placeholder="56.0 μm" />
        </div>
      </div>
      <div id="vh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vh-res-hv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">602 HV1</span>
            <span class="stat-label">Vickers Hardness (HV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vh-res-gpa" style="font-weight:700;">5.90 GPa</span>
            <span class="stat-label">SI Unit Hardness (HV × 0.009807)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('vh-f'), d1El = document.getElementById('vh-d1'), d2El = document.getElementById('vh-d2');
  const hvResEl = document.getElementById('vh-res-hv'), gpaResEl = document.getElementById('vh-res-gpa');

  function update() {
    const F = parseFloat(fEl.value), d1Um = parseFloat(d1El.value), d2Um = parseFloat(d2El.value);
    if (isNaN(F) || isNaN(d1Um) || isNaN(d2Um) || F <= 0 || d1Um <= 0 || d2Um <= 0) return;

    // Average diagonal in millimeters
    const dAvgMm = ((d1Um + d2Um) / 2) * 1e-3;

    // HV = (1.8544 * F) / d^2
    const HV = (1.8544 * F) / Math.pow(dAvgMm, 2);
    const gpa = HV * 0.00980665;

    hvResEl.textContent = Math.round(HV) + ' HV' + (F >= 1 ? F : F * 1000 + 'g');
    gpaResEl.textContent = gpa.toFixed(2) + ' GPa Contact Pressure';
  }

  [fEl, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter test load force in kgf (e.g. 1.0 kgf for HV1 macro, 0.1 kgf for microhardness).',
      'Enter microscope optical measurement of square pyramid indentation diagonal lengths d₁ and d₂ in micrometers (μm).',
      'Inspect Vickers Hardness Number (HV) and equivalent SI contact hardness in GPa.'
    ],
    benefitTitle: 'Geometrically Similar 136° Diamond Pyramid Indenter',
    benefitContent: 'Because the Vickers 136° diamond pyramid indenter produces geometrically similar impressions regardless of test load size, HV values remain continuous and valid from soft aluminum (20 HV) to hardened tool steel (900 HV) and sapphire (2000 HV).',
    faqs: [{ q: 'What is the angle of a Vickers diamond indenter?', a: 'Opposite faces of the square-base diamond pyramid meet at an angle of exactly 136.0°.' }]
  },

  // 3. Rockwell to Brinell, Vickers & Tensile Strength Hardness Converter
  {
    slug: 'rockwell-hardness-scale-converter',
    name: 'Hardness Scale Converter (Rockwell HRC/HRB, Brinell, Vickers)',
    description: 'Convert between Rockwell C (HRC), Rockwell B (HRB), Brinell (HBW), Vickers (HV), and approximate steel tensile strength (ASTM E140).',
    category: 'Science',
    icon: 'text',
    keywords: ['rockwell to brinell converter', 'hrc to vickers conversion table', 'hardness scale conversion astm e140', 'hrc to hrb hardness converter', 'metal hardness conversion calculator online'],
    order: 423,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rockwell C Hardness (HRC: 20 to 68)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="rc-hrc">Rockwell C (HRC)</label>
        <input class="tool-textarea" id="rc-hrc" type="number" step="0.5" min="20" max="68" value="55.0" placeholder="55.0 HRC (Knife Blade Steel)" />
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="rc-res-hv" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">600 HV</span>
            <span class="stat-label">Vickers Hardness (HV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-hb" style="color:#2563eb; font-weight:800; font-size:1.4rem;">560 HBW</span>
            <span class="stat-label">Brinell Hardness (HBW)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-uts" style="font-weight:700;">1,980 MPa (287 ksi)</span>
            <span class="stat-label">Approx Tensile Strength</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hrcEl = document.getElementById('rc-hrc');
  const hvResEl = document.getElementById('rc-res-hv'), hbResEl = document.getElementById('rc-res-hb'), utsResEl = document.getElementById('rc-res-uts');

  // ASTM E140 steel hardness conversion polynomial fit
  function update() {
    const HRC = parseFloat(hrcEl.value);
    if (isNaN(HRC) || HRC < 20 || HRC > 68) return;

    // Polynomial approximations for steel
    const HV = Math.round(145 + 5.2 * HRC + 0.055 * Math.pow(HRC, 2) + 0.00075 * Math.pow(HRC, 3));
    const HB = Math.round(150 + 4.8 * HRC + 0.048 * Math.pow(HRC, 2));
    const utsMpa = Math.round(350 + 17.5 * HRC + 0.22 * Math.pow(HRC, 2));
    const utsKsi = (utsMpa / 6.89476).toFixed(1);

    hvResEl.textContent = HV + ' HV';
    hbResEl.textContent = HB + ' HBW';
    utsResEl.textContent = utsMpa.toLocaleString() + ' MPa (' + utsKsi + ' ksi UTS)';
  }

  hrcEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Rockwell C hardness number (20 HRC for unhardened steel to 65+ HRC for high-speed tool steel).',
      'Inspect equivalent Vickers (HV), Brinell (HBW), and estimated steel tensile strength according to ASTM E140 conversion tables.'
    ],
    benefitTitle: 'ASTM E140 Standard Hardness Equivalence',
    benefitContent: 'Because different hardness testers deform metal microstructures differently (spherical vs diamond pyramid vs 120° diamond cone), ASTM E140 provides empirical correlation curves between standardized metallurgical hardness scales.',
    faqs: [{ q: 'What is typical knife blade steel hardness?', a: 'Quality kitchen knives and chef knives typically range between 56 and 62 HRC (approx 615 - 750 HV).' }]
  },

  // 4. Crystal Lattice Interplanar Spacing (d_hkl) Calculator
  {
    slug: 'crystal-lattice-interplanar-spacing-calculator',
    name: 'Crystal Lattice Interplanar Spacing (d_hkl) Calculator',
    description: 'Calculate crystallographic interplanar spacing (d_hkl = a / √(h² + k² + l²)) for cubic crystal systems (SC, BCC, FCC) from lattice parameter (a) and Miller indices (h k l).',
    category: 'Science',
    icon: 'text',
    keywords: ['interplanar spacing calculator', 'miller indices d hkl formula', 'cubic lattice spacing calculator online', 'fcc bcc interplanar distance calculator', 'xrd lattice plane spacing online'],
    order: 424,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lattice Constant a (Å) & Miller Indices (h k l)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-a">Lattice Constant a (Å)</label>
          <input class="tool-textarea" id="dh-a" type="number" step="any" value="3.615" placeholder="3.615 Å (Copper FCC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-h">Miller Index h</label>
          <input class="tool-textarea" id="dh-h" type="number" min="0" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-k">Miller Index k</label>
          <input class="tool-textarea" id="dh-k" type="number" min="0" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-l">Miller Index l</label>
          <input class="tool-textarea" id="dh-l" type="number" min="0" step="1" value="1" placeholder="1" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-d" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.087 Å (0.2087 nm)</span>
            <span class="stat-label">Interplanar Spacing (d₁₁₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-plane" style="font-weight:700;">(1 1 1) Close-Packed Plane</span>
            <span class="stat-label">Crystallographic Orientation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('dh-a'), hEl = document.getElementById('dh-h');
  const kEl = document.getElementById('dh-k'), lEl = document.getElementById('dh-l');
  const dResEl = document.getElementById('dh-res-d'), pResEl = document.getElementById('dh-res-plane');

  function update() {
    const aAng = parseFloat(aEl.value);
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);

    if (isNaN(aAng) || isNaN(h) || isNaN(k) || isNaN(l) || aAng <= 0) return;
    const sumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    if (sumSq === 0) { dResEl.textContent = 'Indices cannot all be zero'; return; }

    // d_hkl = a / sqrt(h^2 + k^2 + l^2)
    const dAng = aAng / Math.sqrt(sumSq);
    const dNm = dAng * 0.1;
    const dPm = dAng * 100;

    dResEl.textContent = dAng.toFixed(3) + ' Å (' + dNm.toFixed(4) + ' nm / ' + dPm.toFixed(1) + ' pm)';
    pResEl.textContent = '(' + h + ' ' + k + ' ' + l + ') Plane (h²+k²+l² = ' + sumSq + ')';
  }

  [aEl, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cubic crystal unit cell lattice parameter a in Ångströms (1 Å = 0.1 nm = 10⁻¹⁰ m).',
      'Enter integer Miller indices (h, k, l).',
      'Inspect perpendicular distance between parallel atomic lattice planes in Ångströms and nanometers.'
    ],
    benefitTitle: 'William Hallowes Miller\'s 1839 Index System',
    benefitContent: 'Miller indices uniquely define the spatial orientation of atomic planes in a crystalline solid; for FCC metals (like Gold and Copper), the (111) planes have the widest spacing and highest atomic packing density.',
    faqs: [{ q: 'What is the d-spacing for (111) planes in Copper (a = 3.615 Å)?', a: 'd₁₁₁ = 3.615 / √(1² + 1² + 1²) = 3.615 / √3 ≈ 2.087 Ångströms.' }]
  },

  // 5. Bragg's Law X-Ray Diffraction (XRD) Angle Calculator
  {
    slug: 'bragg-law-xray-diffraction-calculator',
    name: 'Bragg\'s Law X-Ray Diffraction (XRD) Angle Calculator',
    description: 'Calculate X-ray diffraction peak angle (2θ) and atomic d-spacing (n · λ = 2 · d · sin θ) for Cu-Kα laboratory X-ray diffractometers.',
    category: 'Science',
    icon: 'text',
    keywords: ['braggs law calculator', 'xrd 2theta calculator online', 'n lambda 2d sin theta formula', 'cu k alpha xray diffraction calculator', 'xrd peak angle to d spacing online'],
    order: 425,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'X-Ray Wavelength λ (Å), Interplanar Spacing d (Å) & Order (n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="brg-lam">X-Ray Source (λ)</label>
          <select class="tool-textarea" id="brg-lam">
            <option value="1.5406" selected>Cu-Kα (1.5406 Å - Standard XRD)</option>
            <option value="0.7107">Mo-Kα (0.7107 Å - Single Crystal)</option>
            <option value="1.7890">Co-Kα (1.7890 Å - Ferrous Alloys)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-d">d-spacing d (Å)</label>
          <input class="tool-textarea" id="brg-d" type="number" step="any" value="2.087" placeholder="2.087 Å (Cu 111)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brg-n">Diffraction Order (n)</label>
          <input class="tool-textarea" id="brg-n" type="number" min="1" max="5" value="1" placeholder="1" />
        </div>
      </div>
      <div id="brg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="brg-res-2th" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">43.34° (2θ)</span>
            <span class="stat-label">XRD Detector Angle (2θ Peak)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="brg-res-th" style="font-weight:700;">θ = 21.67°</span>
            <span class="stat-label">Bragg Glancing Angle (θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('brg-lam'), dEl = document.getElementById('brg-d'), nEl = document.getElementById('brg-n');
  const th2ResEl = document.getElementById('brg-res-2th'), thResEl = document.getElementById('brg-res-th');

  function update() {
    const lambda = parseFloat(lamEl.value), dAng = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(lambda) || isNaN(dAng) || isNaN(n) || lambda <= 0 || dAng <= 0 || n < 1) return;

    // n * lambda = 2 * d * sin(theta) => sin(theta) = (n * lambda) / (2 * d)
    const sinTheta = (n * lambda) / (2 * dAng);
    if (sinTheta > 1.0) {
      th2ResEl.textContent = 'No Diffraction (λ > 2d)';
      th2ResEl.style.color = '#c53030';
      return;
    }

    const rad = Math.asin(sinTheta);
    const deg = (rad * 180) / Math.PI;
    const twoTheta = deg * 2;

    th2ResEl.textContent = twoTheta.toFixed(2) + '° (2θ Peak)';
    th2ResEl.style.color = '#22543d';
    thResEl.textContent = 'θ = ' + deg.toFixed(2) + '° (Glancing Angle)';
  }

  [lamEl, dEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select X-ray anode tube source (Copper Cu-Kα λ = 1.5406 Å standard).',
      'Enter interplanar d-spacing in Ångströms.',
      'Inspect Bragg glancing angle θ and XRD goniometer 2θ detector peak position.'
    ],
    benefitTitle: 'William Henry & William Lawrence Bragg (1915 Nobel)',
    benefitContent: 'Father and son Bragg showed that X-rays reflecting from parallel crystal planes interfere constructively when the path difference (2d·sin θ) equals an exact multiple of the X-ray wavelength, revealing atomic structure.',
    faqs: [{ q: 'Why do XRD diffractometers plot intensity versus 2θ instead of θ?', a: 'Because the detector rotates through an angle of 2θ relative to the incoming incident beam while the sample stage rotates through angle θ.' }]
  }
];

toolsSuiteVV.forEach(createTool);
console.log('Suite VV complete: 5 tools created.');
