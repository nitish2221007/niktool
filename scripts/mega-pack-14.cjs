const { createTool } = require('./generate-curated-tools.cjs');

const tools14 = [
  // 1. Gay-Lussac's Pressure-Temperature Gas Law Calculator
  {
    slug: 'gay-lussac-law-gas-calculator',
    name: 'Gay-Lussac\'s Gas Law Calculator',
    description: 'Calculate pressure or absolute temperature changes in isochoric rigid gas containers using Gay-Lussac\'s Law P₁ / T₁ = P₂ / T₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['gay lussacs law calculator', 'p1 t1 p2 t2 calculator', 'gas pressure temperature relationship', 'isochoric gas calculator', 'gay lussac formula online'],
    order: 169,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pressure & Temperature States',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gl-p1">Initial Pressure P₁ (atm / bar)</label>
          <input class="tool-textarea" id="gl-p1" type="number" step="any" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gl-t1">Initial Temperature T₁ (Kelvin K)</label>
          <input class="tool-textarea" id="gl-t1" type="number" step="any" value="293.15" placeholder="293.15 K (20°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gl-t2">Final Temperature T₂ (Kelvin K)</label>
          <input class="tool-textarea" id="gl-t2" type="number" step="any" value="373.15" placeholder="373.15 K (100°C)" />
        </div>
      </div>
      <div id="gl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gl-res-p2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.55 pressure units</span>
            <span class="stat-label">Final Pressure (P₂ = P₁ · T₂ / T₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('gl-p1'), t1El = document.getElementById('gl-t1'), t2El = document.getElementById('gl-t2');
  const p2El = document.getElementById('gl-res-p2');

  function update() {
    const p1 = parseFloat(p1El.value), t1 = parseFloat(t1El.value), t2 = parseFloat(t2El.value);
    if (isNaN(p1) || isNaN(t1) || isNaN(t2) || p1 <= 0 || t1 <= 0 || t2 <= 0) return;

    // P2 = P1 * (T2 / T1)
    const p2 = p1 * (t2 / t1);
    p2El.textContent = p2.toFixed(3) + ' pressure units';
  }

  [p1El, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial pressure P₁ and temperature in Kelvin.',
      'Enter new target temperature T₂ in Kelvin.',
      'Inspect the resulting rigid-container pressure.'
    ],
    benefitTitle: 'Gay-Lussac\'s Pressure-Temperature Law',
    benefitContent: 'In a fixed rigid volume (V = constant), the pressure of a given mass of gas is directly proportional to its absolute Kelvin temperature: P/T = k.',
    faqs: [{ q: 'Why do car tires show higher pressure in hot summers?', a: 'As ambient temperature heats the air inside the sealed tire volume, kinetic molecular collisions increase, raising gauge pressure.' }]
  },

  // 2. Avogadro's Volume-Moles Gas Law Calculator
  {
    slug: 'avogadro-law-gas-calculator',
    name: 'Avogadro\'s Gas Law Calculator',
    description: 'Calculate gas volume or molar quantity changes at constant temperature and pressure using Avogadro\'s Law V₁ / n₁ = V₂ / n₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['avogadros law calculator', 'v1 n1 v2 n2 calculator', 'gas volume moles relationship', 'avogadro molar volume calculator', 'chemistry avogadro law online'],
    order: 170,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Volume & Moles Proportions',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="av-v1">Initial Volume V₁ (Liters)</label>
          <input class="tool-textarea" id="av-v1" type="number" step="any" value="22.4" placeholder="22.4 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="av-n1">Initial Moles n₁</label>
          <input class="tool-textarea" id="av-n1" type="number" step="any" value="1.0" placeholder="1.0 mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="av-n2">Final Moles n₂</label>
          <input class="tool-textarea" id="av-n2" type="number" step="any" value="2.5" placeholder="2.5 mol" />
        </div>
      </div>
      <div id="av-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="av-res-v2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">56.00 Liters</span>
            <span class="stat-label">Final Volume (V₂ = V₁ · n₂ / n₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v1El = document.getElementById('av-v1'), n1El = document.getElementById('av-n1'), n2El = document.getElementById('av-n2');
  const v2El = document.getElementById('av-res-v2');

  function update() {
    const v1 = parseFloat(v1El.value), n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(v1) || isNaN(n1) || isNaN(n2) || v1 <= 0 || n1 <= 0 || n2 <= 0) return;

    // V2 = V1 * (n2 / n1)
    const v2 = v1 * (n2 / n1);
    v2El.textContent = v2.toFixed(2) + ' Liters';
  }

  [v1El, n1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial gas volume V₁ and mole count n₁.',
      'Enter final mole count n₂.',
      'Inspect the proportional gas volume.'
    ],
    benefitTitle: 'Molar Volume at Standard Conditions (STP)',
    benefitContent: 'At Standard Temperature and Pressure (0 °C and 1 atm), exactly 1 mole of any ideal gas occupies 22.414 Liters.',
    faqs: [{ q: 'Who formulated Avogadro\'s Hypothesis?', a: 'Amedeo Avogadro in 1811 proposed that equal volumes of all gases at the same temperature and pressure contain the same number of molecules.' }]
  },

  // 3. Combined Gas Law Calculator
  {
    slug: 'combined-gas-law-calculator',
    name: 'Combined Gas Law Calculator',
    description: 'Solve for pressure, volume, or temperature across changing gas states using the Combined Gas Law (P₁·V₁)/T₁ = (P₂·V₂)/T₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['combined gas law calculator', 'p1v1 t1 p2v2 t2 calculator', 'gas state transition calculator', 'chemistry combined gas formula', 'ideal gas state changer online'],
    order: 171,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial & Final Gas State Variables',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;">
        <div class="control-group">
          <label class="control-label" for="cg-p1">P₁ (Initial Pressure)</label>
          <input class="tool-textarea" id="cg-p1" type="number" step="any" value="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-v1">V₁ (Initial Volume)</label>
          <input class="tool-textarea" id="cg-v1" type="number" step="any" value="10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-t1">T₁ (Initial Temp K)</label>
          <input class="tool-textarea" id="cg-t1" type="number" step="any" value="300" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-p2">P₂ (Final Pressure)</label>
          <input class="tool-textarea" id="cg-p2" type="number" step="any" value="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-t2">T₂ (Final Temp K)</label>
          <input class="tool-textarea" id="cg-t2" type="number" step="any" value="400" />
        </div>
      </div>
      <div id="cg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cg-res-v2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.67 volume units</span>
            <span class="stat-label">Final Volume (V₂ = (P₁·V₁·T₂) / (T₁·P₂))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('cg-p1'), v1El = document.getElementById('cg-v1'), t1El = document.getElementById('cg-t1');
  const p2El = document.getElementById('cg-p2'), t2El = document.getElementById('cg-t2');
  const resEl = document.getElementById('cg-res-v2');

  function update() {
    const p1 = parseFloat(p1El.value), v1 = parseFloat(v1El.value), t1 = parseFloat(t1El.value);
    const p2 = parseFloat(p2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(p1) || isNaN(v1) || isNaN(t1) || isNaN(p2) || isNaN(t2) || p1 <= 0 || v1 <= 0 || t1 <= 0 || p2 <= 0 || t2 <= 0) return;

    // V2 = (P1 * V1 * T2) / (T1 * P2)
    const v2 = (p1 * v1 * t2) / (t1 * p2);
    resEl.textContent = v2.toFixed(2) + ' volume units';
  }

  [p1El, v1El, t1El, p2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial state: P₁, V₁, and T₁ (in Kelvin).',
      'Enter new final state pressure P₂ and temperature T₂.',
      'Inspect the resulting equilibrium volume V₂.'
    ],
    benefitTitle: 'Combined Gas Law Synthesis',
    benefitContent: 'Combines Boyle\'s, Charles\'s, and Gay-Lussac\'s laws into a unified equation: (P₁·V₁)/T₁ = (P₂·V₂)/T₂ for closed gaseous systems.',
    faqs: [{ q: 'Can units of pressure and volume be arbitrary?', a: 'Yes, as long as matching units are used on both sides; however, temperature must always be in absolute Kelvin.' }]
  },

  // 4. Graham's Law of Effusion Calculator
  {
    slug: 'graham-law-effusion-calculator',
    name: 'Graham\'s Law of Effusion Calculator',
    description: 'Calculate relative effusion and diffusion rates of two gases (Rate₁ / Rate₂ = √(M₂ / M₁)) from their molar masses.',
    category: 'Science',
    icon: 'text',
    keywords: ['grahams law calculator', 'gas effusion rate calculator', 'diffusion of gases calculator', 'molar mass effusion ratio', 'chemistry grahams law online'],
    order: 172,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Molar Masses (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gr-m1">Gas 1 Molar Mass (M₁) [e.g. Helium = 4.00]</label>
          <input class="tool-textarea" id="gr-m1" type="number" step="any" value="4.00" placeholder="4.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gr-m2">Gas 2 Molar Mass (M₂) [e.g. Oxygen O₂ = 32.00]</label>
          <input class="tool-textarea" id="gr-m2" type="number" step="any" value="32.00" placeholder="32.00" />
        </div>
      </div>
      <div id="gr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gr-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.83x Faster</span>
            <span class="stat-label">Effusion Rate Ratio (Rate₁ / Rate₂)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gr-m1'), m2El = document.getElementById('gr-m2');
  const resEl = document.getElementById('gr-res-ratio');

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value);
    if (isNaN(m1) || isNaN(m2) || m1 <= 0 || m2 <= 0) return;

    // Rate1 / Rate2 = sqrt(M2 / M1)
    const ratio = Math.sqrt(m2 / m1);
    resEl.textContent = ratio.toFixed(2) + 'x Faster';
  }

  m1El.addEventListener('input', update);
  m2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the molar mass of Gas 1 (g/mol).',
      'Enter the molar mass of Gas 2 (g/mol).',
      'Inspect how many times faster the lighter gas escapes through pinhole apertures.'
    ],
    benefitTitle: 'Molecular Mass and Kinetic Velocity',
    benefitContent: 'Because lighter molecules travel with higher root-mean-square kinetic velocity at the same thermal temperature (v_rms = √(3RT/M)), they effuse through porous barriers significantly faster.',
    faqs: [{ q: 'How much faster does Helium effuse compared to Oxygen?', a: 'Helium (4 g/mol) effuses √(32/4) = √8 ≈ 2.83 times faster than Oxygen (32 g/mol).' }]
  },

  // 5. Cosmological Doppler Redshift Calculator
  {
    slug: 'doppler-redshift-calculator',
    name: 'Cosmological Doppler Redshift Calculator',
    description: 'Calculate astronomical redshift (z = Δλ / λ₀), relativistic recession velocity, and cosmological distance for receding stars and galaxies.',
    category: 'Science',
    icon: 'text',
    keywords: ['redshift calculator', 'doppler redshift velocity calculator', 'astronomy redshift z calculator', 'relativistic doppler effect online', 'hubble expansion redshift calculator'],
    order: 173,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rest & Observed Wavelengths',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rs-emit">Rest Emitter Wavelength λ₀ (nm)</label>
          <input class="tool-textarea" id="rs-emit" type="number" step="any" value="656.3" placeholder="656.3 nm (H-alpha)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rs-obs">Observed Wavelength λ_obs (nm)</label>
          <input class="tool-textarea" id="rs-obs" type="number" step="any" value="689.1" placeholder="689.1 nm" />
        </div>
      </div>
      <div id="rs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rs-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">z = 0.0500</span>
            <span class="stat-label">Redshift Parameter (z = Δλ/λ₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rs-res-vel" style="font-weight:700;">14,990 km/s</span>
            <span class="stat-label">Recession Velocity (v ≈ z·c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rs-res-c-pct">5.00% of c</span>
            <span class="stat-label">Fraction of Light Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const emitEl = document.getElementById('rs-emit'), obsEl = document.getElementById('rs-obs');
  const zEl = document.getElementById('rs-res-z'), velEl = document.getElementById('rs-res-vel'), cPctEl = document.getElementById('rs-res-c-pct');

  const c = 299792.458; // km/s

  function update() {
    const lambda0 = parseFloat(emitEl.value);
    const lambdaObs = parseFloat(obsEl.value);
    if (isNaN(lambda0) || isNaN(lambdaObs) || lambda0 <= 0 || lambdaObs <= 0) return;

    // z = (lambdaObs - lambda0) / lambda0
    const z = (lambdaObs - lambda0) / lambda0;
    // Relativistic velocity: v/c = ((z+1)^2 - 1) / ((z+1)^2 + 1)
    const zPlus1Sq = Math.pow(z + 1, 2);
    const beta = (zPlus1Sq - 1) / (zPlus1Sq + 1);
    const vKms = beta * c;

    zEl.textContent = 'z = ' + z.toFixed(4);
    velEl.textContent = Math.round(vKms).toLocaleString() + ' km/s';
    cPctEl.textContent = (beta * 100).toFixed(2) + '% of c';
  }

  emitEl.addEventListener('input', update);
  obsEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter spectral rest laboratory wavelength λ₀ (e.g. 656.3 nm for Hydrogen-Alpha line).',
      'Enter the telescope observed redshifted wavelength λ_obs.',
      'Inspect redshift z, relativistic velocity, and recession speed.'
    ],
    benefitTitle: 'Hubble\'s Law and Cosmic Expansion',
    benefitContent: 'Edwin Hubble discovered that distant galaxies exhibit spectral redshift proportional to distance (v = H₀ · d), proving the universe is expanding uniformly in all directions.',
    faqs: [{ q: 'What is blue-shift?', a: 'When celestial objects move toward Earth, wavelengths compress to shorter blue frequencies (negative z value).' }]
  }
];

tools14.forEach(createTool);
console.log('Mega pack 14 complete.');
