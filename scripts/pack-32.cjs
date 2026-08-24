const { createTool } = require('./generate-curated-tools.cjs');

// Pack 32: 25 Core Grade School & Secondary STEM Curriculum Calculators (Tools 1051 to 1075)
const pack32Tools = [
  // 1. GCSE Physics Electrical Power (P = IV = I²R = V²/R) Calculator
  {
    slug: 'gcse-physics-electrical-power-p-equals-iv-i-squared-r-calculator',
    name: 'GCSE Physics Electrical Power (P = IV = I²R = V²/R) Calculator',
    description: 'Calculate electrical circuit power dissipation (P = I·V = I²·R = V²/R) in watts (W), current in amperes (A), voltage in volts (V), and resistance in ohms (Ω) for UK GCSE, AQA, Edexcel, and middle school science.',
    category: 'Science',
    icon: 'text',
    keywords: ['electrical power calculator', 'p equals iv formula p equals i squared r online', 'gcse physics electrical power equations calculator', 'voltage current resistance power ohms law calculator', 'joule heating power loss watts calculator online'],
    order: 932,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Voltage V (Volts), Current I (Amperes) & Resistance R (Ohms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pwr-v">Voltage V (V)</label>
          <input class="tool-textarea" id="pwr-v" type="number" step="any" value="230.0" placeholder="230 V (Mains)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-i">Current I (A)</label>
          <input class="tool-textarea" id="pwr-i" type="number" step="any" value="5.0" placeholder="5.0 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-r">Resistance R (Ω)</label>
          <input class="tool-textarea" id="pwr-r" type="number" step="any" value="46.0" placeholder="46.0 Ω" />
        </div>
      </div>
      <div id="pwr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pwr-res-w" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P = 1,150 Watts (1.15 kW)</span>
            <span class="stat-label">Electrical Power Dissipation (P = I · V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pwr-res-heat" style="font-weight:700;">Joule Heating: I²R = 1,150 W | Energy per Hour = 1.15 kWh (4.14 MJ)</span>
            <span class="stat-label">Thermal Energy Consumption & Electricity Units</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('pwr-v'), iEl = document.getElementById('pwr-i'), rEl = document.getElementById('pwr-r');
  const wResEl = document.getElementById('pwr-res-w'), htResEl = document.getElementById('pwr-res-heat');

  function update() {
    let V = parseFloat(vEl.value), I = parseFloat(iEl.value), R = parseFloat(rEl.value);
    if (isNaN(V) && isNaN(I) && isNaN(R)) return;

    let P = 0;
    if (!isNaN(V) && !isNaN(I) && V > 0 && I > 0) {
      P = V * I;
      R = V / I;
      rEl.value = R.toFixed(2);
    } else if (!isNaN(I) && !isNaN(R) && I > 0 && R > 0) {
      P = Math.pow(I, 2) * R;
      V = I * R;
      vEl.value = V.toFixed(2);
    } else if (!isNaN(V) && !isNaN(R) && V > 0 && R > 0) {
      P = Math.pow(V, 2) / R;
      I = V / R;
      iEl.value = I.toFixed(2);
    }

    const kW = P / 1000.0;
    const kWh_hr = kW;
    const MJ = (P * 3600) / 1e6;

    wResEl.textContent = 'P = ' + (P >= 1000 ? Math.round(P).toLocaleString() : P.toFixed(1)) + ' Watts (' + kW.toFixed(2) + ' kW)';
    htResEl.textContent = 'Joule Heating I²R = ' + (P >= 1000 ? Math.round(P).toLocaleString() : P.toFixed(1)) + ' W | 1 Hour Energy = ' + kWh_hr.toFixed(2) + ' kWh (' + MJ.toFixed(2) + ' MJ @ ' + V.toFixed(1) + ' V, ' + I.toFixed(2) + ' A)';
  }

  [vEl, iEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter any two known electrical circuit quantities (Voltage V, Current I, or Resistance R).',
      'Inspect calculated Electrical Power P in Watts (W) and Kilowatts (kW).',
      'View equivalent energy consumption per hour in kilowatt-hours (kWh) and Joules (J).'
    ],
    benefitTitle: 'James Prescott Joule Electrical Heating Law',
    benefitContent: 'Electrical power transforms electrical potential energy into heat, light, or mechanical kinetic work; high-voltage transmission lines step up voltage to minimize current ($I$), reducing $I^2R$ power loss during grid distribution.',
    faqs: [{ q: 'Why is P = I²R used to calculate transmission line losses?', a: 'Because power lost as resistive heat in wires depends on the square of current; halving the current reduces resistive line heat losses by 75%.' }]
  },

  // 2. Specific Heat Capacity Thermal Energy (Q = mcΔT) Calculator
  {
    slug: 'specific-heat-capacity-thermal-energy-q-equals-mc-delta-t-calculator',
    name: 'Specific Heat Capacity & Thermal Energy (Q = m·c·ΔT) Calculator',
    description: 'Calculate thermal heat energy transfer (Q = m·c·ΔT) in Joules and calories, substance temperature change (ΔT), and final equilibrium temperature using specific heat capacities (Water c = 4,184 J/(kg·°C), Iron c = 450 J/(kg·°C)).',
    category: 'Science',
    icon: 'text',
    keywords: ['specific heat capacity calculator', 'q equals mc delta t formula thermal energy online', 'heat transfer joules calories calculator mc delta t', 'water specific heat capacity 4184 calculator', 'physics thermal equilibrium temperature calculator online'],
    order: 933,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass m (kg), Specific Heat Capacity c (J/(kg·°C)) & Temperature Change ΔT (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-m">Mass m (kg)</label>
          <input class="tool-textarea" id="sh-m" type="number" step="0.5" value="2.0" placeholder="2.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-mat">Material</label>
          <select class="tool-textarea" id="sh-mat">
            <option value="4184" selected>Liquid Water (4,184 J/kg·°C)</option>
            <option value="900">Aluminum (900 J/kg·°C)</option>
            <option value="450">Iron / Steel (450 J/kg·°C)</option>
            <option value="385">Copper (385 J/kg·°C)</option>
            <option value="2090">Ice (2,090 J/kg·°C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-dt">Temp Change ΔT (°C)</label>
          <input class="tool-textarea" id="sh-dt" type="number" step="5" value="50.0" placeholder="50.0 °C (20°C -> 70°C)" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q = 418.4 kJ (100.0 kcal)</span>
            <span class="stat-label">Thermal Heat Energy Required (Q = m · c · ΔT)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-kwh" style="font-weight:700;">Electrical Equivalent: 0.116 kWh (Heater Time @ 2 kW = 3.5 minutes)</span>
            <span class="stat-label">Electric Kettle Energy & Boiling Duration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sh-m'), matEl = document.getElementById('sh-mat'), dtEl = document.getElementById('sh-dt');
  const qResEl = document.getElementById('sh-res-q'), kwhResEl = document.getElementById('sh-res-kwh');

  function update() {
    const mass = parseFloat(mEl.value), c = parseFloat(matEl.value), dt = parseFloat(dtEl.value);
    if (isNaN(mass) || isNaN(c) || isNaN(dt) || mass <= 0 || c <= 0) return;

    // Q = m * c * deltaT  [Joules]
    const Q_joules = mass * c * dt;
    const Q_kJ = Q_joules / 1000.0;
    const Q_kcal = Q_joules / 4184.0;
    const Q_kWh = Q_joules / 3.6e6;

    // Time on a 2000W electric kettle in minutes = (Q_joules / 2000) / 60
    const time_mins = (Q_joules / 2000.0) / 60.0;

    qResEl.textContent = 'Q = ' + (Math.abs(Q_kJ) >= 1000 ? (Q_kJ/1000).toFixed(2) + ' MJ' : Q_kJ.toFixed(1) + ' kJ') + ' (' + Q_kcal.toFixed(1) + ' kcal)';
    kwhResEl.textContent = 'Electrical Equivalent: ' + Q_kWh.toFixed(3) + ' kWh (Heating Time @ 2 kW element = ' + time_mins.toFixed(1) + ' min @ c = ' + c + ' J/kg·°C)';
  }

  [mEl, matEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter substance mass m in kilograms (kg).',
      'Select material from the dropdown (e.g. Water, Aluminum, Iron, Copper, Ice).',
      'Enter temperature change $\Delta T$ in degrees Celsius ($^\circ\text{C}$).',
      'Inspect calculated heat energy Q in Kilojoules (kJ), Calories (kcal), and kilowatt-hours (kWh).'
    ],
    benefitTitle: 'Thermodynamics Specific Heat Capacity Physics',
    benefitContent: 'Water has an extraordinarily high specific heat capacity ($c = 4,184\text{ J}/(\text{kg}\cdot^\circ\text{C})$), enabling oceans to regulate global Earth climates and making water the ideal industrial coolant.',
    faqs: [{ q: 'What is the definition of Specific Heat Capacity?', a: 'Specific heat capacity is the amount of heat energy in Joules required to raise the temperature of 1 kilogram of a substance by 1 degree Celsius.' }]
  },

  // 3. Latent Heat of Fusion & Vaporization (Q = mL) Calculator
  {
    slug: 'latent-heat-fusion-vaporization-q-equals-ml-calculator',
    name: 'Specific Latent Heat of Fusion & Vaporization (Q = m·L) Phase Change Calculator',
    description: 'Calculate phase change enthalpy heat energy (Q = m·L) for melting/freezing (Water L_f = 334 kJ/kg) and boiling/condensing (Water L_v = 2,260 kJ/kg) at constant temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['latent heat calculator', 'q equals ml formula phase change heat online', 'latent heat of fusion vaporization water calculator', 'melting ice boiling water energy calculator joules', 'thermal physics latent heat phase change online'],
    order: 934,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Substance Mass m (kg) & Phase Change Transition Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lh-m">Mass m (kg)</label>
          <input class="tool-textarea" id="lh-m" type="number" step="0.5" value="1.5" placeholder="1.5 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lh-type">Phase Transition</label>
          <select class="tool-textarea" id="lh-type">
            <option value="2260000" selected>Water Vaporization / Steam (2,260 kJ/kg)</option>
            <option value="334000">Water Fusion / Ice Melting (334 kJ/kg)</option>
            <option value="846000">Ethanol Vaporization (846 kJ/kg)</option>
            <option value="108000">Ethanol Fusion (108 kJ/kg)</option>
          </select>
        </div>
      </div>
      <div id="lh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lh-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q = 3.39 MJ (3,390 kJ)</span>
            <span class="stat-label">Phase Change Heat Energy (Q = m · L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lh-res-info" style="color:var(--green-dark); font-weight:700;">Constant Temperature Transition: Temperature remains exactly at 100.0 °C during boiling</span>
            <span class="stat-label">Isothermal Latent Heat Enthalpy Characteristic</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('lh-m'), tEl = document.getElementById('lh-type');
  const qResEl = document.getElementById('lh-res-q'), infResEl = document.getElementById('lh-res-info');

  function update() {
    const mass = parseFloat(mEl.value), L = parseFloat(tEl.value);
    if (isNaN(mass) || isNaN(L) || mass <= 0 || L <= 0) return;

    // Q = m * L  [Joules]
    const Q_joules = mass * L;
    const Q_kJ = Q_joules / 1000.0;
    const Q_MJ = Q_joules / 1e6;

    qResEl.textContent = 'Q = ' + Q_MJ.toFixed(2) + ' MJ (' + Math.round(Q_kJ).toLocaleString() + ' kJ)';
    infResEl.textContent = 'Constant Temperature Transition: Complete phase change requires ' + Q_MJ.toFixed(2) + ' MJ with zero temperature rise (L = ' + (L/1000) + ' kJ/kg @ ' + mass + ' kg)';
  }

  mEl.addEventListener('input', update);
  tEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter mass of substance undergoing phase change in kilograms (kg).',
      'Select phase transition (Water Vaporization, Ice Melting, Ethanol Vaporization/Melting).',
      'Inspect total latent heat energy required in Megajoules (MJ) and Kilojoules (kJ).'
    ],
    benefitTitle: 'Isothermal Phase Change Physics',
    benefitContent: 'During phase transitions, heat energy breaks intermolecular hydrogen bonds rather than increasing kinetic molecular vibration, keeping the substance at a constant temperature ($0^\circ\text{C}$ for melting ice, $100^\circ\text{C}$ for boiling steam).',
    faqs: [{ q: 'Why is the latent heat of vaporization of water so much larger than fusion?', a: 'Vaporization ($2,260\text{ kJ/kg}$) completely breaks all intermolecular hydrogen bonds, while melting ($334\text{ kJ/kg}$) only disrupts crystal lattice order.' }]
  },

  // 4. Hooke's Law Spring Force & Elastic Potential Energy Calculator
  {
    slug: 'hookes-law-spring-force-elastic-potential-energy-calculator',
    name: 'Hooke\'s Law Spring Force (F = k·x) & Elastic Potential Energy (E_p = ½·k·x²) Calculator',
    description: 'Calculate linear elastic spring restoring force (F = k·x) in Newtons and stored elastic strain potential energy (E_p = ½·k·x²) in Joules from spring constant k (N/m) and extension x (m).',
    category: 'Science',
    icon: 'text',
    keywords: ['hookes law calculator', 'spring force formula f equals k x online', 'elastic potential energy calculator half k x squared', 'spring constant k extension calculator newtons', 'simple harmonic motion spring energy calculator online'],
    order: 935,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spring Constant k (N/m) & Spring Extension / Compression x (m or cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hk-k">Spring Constant k (N/m)</label>
          <input class="tool-textarea" id="hk-k" type="number" step="25" value="250" placeholder="250 N/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hk-x">Extension x (cm)</label>
          <input class="tool-textarea" id="hk-x" type="number" step="1" value="15.0" placeholder="15.0 cm (0.15 m)" />
        </div>
      </div>
      <div id="hk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hk-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F = 37.50 N (Restoring Force)</span>
            <span class="stat-label">Hooke\'s Law Elastic Restoring Force (F = k · x)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hk-res-ep" style="font-weight:700;">Stored Potential Energy E_p = 2.81 Joules (E_p = ½·k·x²)</span>
            <span class="stat-label">Elastic Strain Energy Stored in Spring</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('hk-k'), xEl = document.getElementById('hk-x');
  const fResEl = document.getElementById('hk-res-f'), epResEl = document.getElementById('hk-res-ep');

  function update() {
    const k = parseFloat(kEl.value), x_cm = parseFloat(xEl.value);
    if (isNaN(k) || isNaN(x_cm) || k <= 0 || x_cm < 0) return;

    const x_m = x_cm / 100.0;

    // F = k * x  [Newtons]
    const F = k * x_m;

    // E_p = 0.5 * k * x^2  [Joules]
    const E_p = 0.5 * k * Math.pow(x_m, 2);

    fResEl.textContent = 'F = ' + F.toFixed(2) + ' N (Restoring Force)';
    epResEl.textContent = 'Stored Energy E_p = ' + E_p.toFixed(3) + ' Joules (k = ' + k + ' N/m @ x = ' + x_m.toFixed(3) + ' m / ' + x_cm + ' cm)';
  }

  kEl.addEventListener('input', update);
  xEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter spring stiffness constant k in Newtons per meter (N/m).',
      'Enter spring extension or compression distance x in centimeters (cm).',
      'Inspect restoring elastic force F in Newtons (N) and stored elastic potential energy in Joules (J).'
    ],
    benefitTitle: 'Robert Hooke 1678 Elasticity Law',
    benefitContent: 'Within the elastic limit, strain is directly proportional to stress ($F = kx$); the area under the force-extension graph equals stored elastic strain energy ($E_p = \frac{1}{2}kx^2$), essential for vehicle suspension springs, trampolines, and archery bows.',
    faqs: [{ q: 'What happens beyond the elastic limit of a spring?', a: 'The spring suffers plastic deformation, permanently altering its structure so Hooke\'s law no longer applies.' }]
  },

  // 5. Optical Lens Power & Focal Length Diopters (P = 1/f) Calculator
  {
    slug: 'lens-maker-focal-length-power-diopters-p-equals-1-over-f-calculator',
    name: 'Optometry & Physics Lens Power (P = 1/f in Diopters) & Focal Length Calculator',
    description: 'Calculate optical lens refractive power (P = 1 / f) in Diopters (D), focal length f in meters and centimeters, and combined thin lens system power (P_total = P₁ + P₂) for optometry glasses prescriptions.',
    category: 'Science',
    icon: 'text',
    keywords: ['lens power calculator', 'diopters formula p equals 1 over f online', 'focal length to diopters converter optometry calculator', 'eyeglasses prescription diopters lens power calculator', 'converging diverging lens focal length calculator online'],
    order: 936,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Focal Length f (cm or m) or Lens Power P (Diopters D)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ln-f">Focal Length f (cm)</label>
          <input class="tool-textarea" id="ln-f" type="number" step="5" value="50.0" placeholder="+50.0 cm (Convex)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ln-type">Lens Type</label>
          <select class="tool-textarea" id="ln-type">
            <option value="1" selected>Converging / Convex (+) Hyperopia/Reading</option>
            <option value="-1">Diverging / Concave (-) Myopia/Nearsighted</option>
          </select>
        </div>
      </div>
      <div id="ln-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ln-res-d" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P = +2.00 Diopters (D)</span>
            <span class="stat-label">Optical Refractive Lens Power (P = 1 / f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ln-res-use" style="color:var(--green-dark); font-weight:700;">CONVEX READING GLASSES: Corrects Hyperopia (Farsightedness) @ f = +0.50 m</span>
            <span class="stat-label">Clinical Optometry Eye Prescription Application</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ln-f'), tEl = document.getElementById('ln-type');
  const dResEl = document.getElementById('ln-res-d'), uResEl = document.getElementById('ln-res-use');

  function update() {
    const f_cm = parseFloat(fEl.value), sign = parseFloat(tEl.value);
    if (isNaN(f_cm) || f_cm <= 0) return;

    const f_m = (f_cm / 100.0) * sign;

    // Power in Diopters P = 1 / f_m
    const P = 1.0 / f_m;

    let use = '';
    let color = '#22543d';

    if (sign > 0) {
      use = 'CONVEX / CONVERGING LENS: Corrects Farsightedness (Hyperopia) & Presbyopia reading glasses';
      color = '#22543d';
    } else {
      use = 'CONCAVE / DIVERGING LENS: Corrects Nearsightedness (Myopia distance glasses prescription)';
      color = '#2563eb';
    }

    dResEl.textContent = 'P = ' + (P >= 0 ? '+' : '') + P.toFixed(2) + ' Diopters (D)';
    dResEl.style.color = color;
    uResEl.textContent = use + ' (f = ' + (f_m >= 0 ? '+' : '') + f_m.toFixed(2) + ' m / ' + (f_cm * sign) + ' cm)';
    uResEl.style.color = color;
  }

  fEl.addEventListener('input', update);
  tEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter lens focal length in centimeters (cm).',
      'Select lens geometry (Convex Converging vs Concave Diverging).',
      'Inspect lens power in Diopters (D) used in eyeglasses prescriptions.'
    ],
    benefitTitle: 'Optometric Diopter Refractive Unit',
    benefitContent: 'A Diopter ($D = \text{m}^{-1}$) measures reciprocal focal length ($P = 1/f$); when multiple thin lenses are placed together, their total combined power adds linearly ($P_{\text{total}} = P_1 + P_2$).',
    faqs: [{ q: 'What does a -2.50 D prescription mean?', a: 'It indicates a diverging concave lens with a focal length of $-40\text{ cm}$ used to correct nearsightedness (myopia).' }]
  },

  // 6. Wave Speed, Frequency & Wavelength (v = f·λ) Calculator
  {
    slug: 'wave-speed-frequency-wavelength-v-equals-f-lambda-calculator',
    name: 'Wave Speed, Frequency & Wavelength (v = f·λ) Physics Calculator',
    description: 'Calculate wave velocity (v = f·λ) in m/s, frequency f in Hertz (Hz), and wavelength λ in meters, nanometers, and angstroms across sound waves, radio waves, and the electromagnetic light spectrum.',
    category: 'Science',
    icon: 'text',
    keywords: ['wave speed calculator', 'v equals f lambda wave formula calculator online', 'frequency to wavelength converter physics', 'sound wave light wave speed calculator', 'electromagnetic spectrum wavelength to frequency online'],
    order: 937,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Frequency f (Hz or kHz/MHz/GHz) & Wavelength λ (m or nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wv-f">Frequency f (Hz)</label>
          <input class="tool-textarea" id="wv-f" type="number" step="any" value="440.0" placeholder="440.0 Hz (Concert A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wv-l">Wavelength λ (m)</label>
          <input class="tool-textarea" id="wv-l" type="number" step="any" value="0.78" placeholder="0.78 m" />
        </div>
      </div>
      <div id="wv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wv-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">v = 343.2 m/s (Sound in Air)</span>
            <span class="stat-label">Wave Propagation Speed (v = f · λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wv-res-t" style="font-weight:700;">Wave Period T = 2.27 ms (T = 1 / f) | Mach 1.00 Acoustic Speed</span>
            <span class="stat-label">Wave Period T & Acoustic / EM Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('wv-f'), lEl = document.getElementById('wv-l');
  const vResEl = document.getElementById('wv-res-v'), tResEl = document.getElementById('wv-res-t');

  function update() {
    const f = parseFloat(fEl.value), lambda = parseFloat(lEl.value);
    if (isNaN(f) || isNaN(lambda) || f <= 0 || lambda <= 0) return;

    // Wave speed v = f * lambda  [m/s]
    const v = f * lambda;
    const period_s = 1.0 / f;
    const period_ms = period_s * 1000.0;

    let type = '';
    if (Math.abs(v - 3e8) / 3e8 < 0.1) type = 'Electromagnetic Light / Radio Wave (c ≈ 3.00 × 10⁸ m/s)';
    else if (v >= 300 && v <= 400) type = 'Acoustic Sound Wave in Air (~343 m/s @ 20°C)';
    else if (v >= 1400 && v <= 1600) type = 'Acoustic Sound Wave in Water (~1500 m/s)';
    else type = 'General Wave Propagation';

    vResEl.textContent = 'v = ' + (v >= 1e6 ? v.toExponential(2) : v.toFixed(1)) + ' m/s';
    tResEl.textContent = 'Wave Period T = ' + (period_ms < 1 ? (period_s * 1e6).toFixed(1) + ' μs' : period_ms.toFixed(2) + ' ms') + ' | ' + type;
  }

  fEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter wave oscillation frequency f in Hertz (Hz).',
      'Enter spatial wavelength $\lambda$ in meters (m).',
      'Inspect wave propagation speed $v = f\lambda$ and oscillation period $T = 1/f$.'
    ],
    benefitTitle: 'Fundamental Wave Equation in Physics',
    benefitContent: 'All mechanical, acoustic, and electromagnetic transverse and longitudinal waves satisfy the universal wave velocity relation ($v = f\lambda$), linking spatial repetition (wavelength) with temporal repetition (frequency).',
    faqs: [{ q: 'Does wave speed change when a wave enters a new medium?', a: 'Yes; wave speed and wavelength change upon entering a new medium, but frequency remains constant.' }]
  },

  // 7. Refractive Index, Critical Angle & Total Internal Reflection (TIR) Calculator
  {
    slug: 'refractive-index-critical-angle-total-internal-reflection-calculator',
    name: 'Refractive Index, Critical Angle & Total Internal Reflection (TIR) Calculator',
    description: 'Calculate optical critical angle (sin θ_c = n₂ / n₁) in degrees, refractive index n, and light speed in medium (v = c / n) for fiber optic waveguides, diamond brilliance, and Snell\'s law refraction.',
    category: 'Science',
    icon: 'text',
    keywords: ['critical angle calculator', 'total internal reflection formula sin theta c equals n2 over n1 online', 'refractive index fiber optic critical angle calculator', 'snells law total internal reflection calculator', 'diamond critical angle brilliance calculator online'],
    order: 938,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Medium 1 Dense Index n₁ (e.g. Glass 1.50, Diamond 2.42) & Medium 2 Rarer Index n₂ (Air 1.00)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tir-n1">Dense Core n₁</label>
          <input class="tool-textarea" id="tir-n1" type="number" step="0.05" value="1.50" placeholder="1.50 (Crown Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tir-n2">Rarer Cladding n₂</label>
          <input class="tool-textarea" id="tir-n2" type="number" step="0.05" value="1.00" placeholder="1.00 (Air)" />
        </div>
      </div>
      <div id="tir-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tir-res-crit" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">θ_c = 41.81° (Critical Angle)</span>
            <span class="stat-label">Critical Angle for Total Internal Reflection (TIR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tir-res-spd" style="color:var(--green-dark); font-weight:700;">Light Speed in Medium 1 = 2.00 × 10⁸ m/s (TIR occurs when θ_i > 41.81°)</span>
            <span class="stat-label">Light Velocity in Dense Medium & Optical Waveguide Condition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('tir-n1'), n2El = document.getElementById('tir-n2');
  const crResEl = document.getElementById('tir-res-crit'), spResEl = document.getElementById('tir-res-spd');

  const c_light = 2.99792e8; // m/s

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || n1 <= n2) {
      crResEl.textContent = 'No Total Internal Reflection (n₁ must be > n₂)';
      crResEl.style.color = '#c53030';
      spResEl.textContent = 'TIR only occurs when light travels from a denser to rarer medium.';
      return;
    }

    // Critical angle sin(theta_c) = n2 / n1
    const sin_theta = n2 / n1;
    const theta_c_rad = Math.asin(sin_theta);
    const theta_c_deg = (theta_c_rad * 180.0) / Math.PI;

    // Speed in medium 1: v = c / n1
    const v_med = c_light / n1;

    crResEl.textContent = 'θ_c = ' + theta_c_deg.toFixed(2) + '° (Critical Angle)';
    crResEl.style.color = '#22543d';
    spResEl.textContent = 'Speed in Core = ' + (v_med / 1e8).toFixed(2) + ' × 10⁸ m/s | 100% Light Trapped for θ_inc > ' + theta_c_deg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter refractive index of dense core medium $n_1$ (e.g. 1.50 for glass, 2.42 for diamond, 1.48 for fiber core).',
      'Enter refractive index of rarer cladding/outer medium $n_2$ (e.g. 1.00 for air, 1.33 for water, 1.46 for fiber cladding).',
      'Inspect critical angle $\theta_c = \arcsin(n_2 / n_1)$ and light propagation speed in the medium.'
    ],
    benefitTitle: 'Fiber Optic Communications & Diamond Optics',
    benefitContent: 'When light strikes a boundary from a denser medium at an incidence angle greater than the critical angle ($\theta_i > \theta_c$), zero refraction occurs and 100% of light undergoes lossless Total Internal Reflection (TIR), enabling high-speed transoceanic internet optical fiber cables.',
    faqs: [{ q: 'Why do diamonds sparkle with intense brilliance?', a: 'Diamond has an extremely high refractive index ($n = 2.42$), resulting in a tiny critical angle ($\theta_c = 24.4^\circ$) that traps and reflects light repeatedly before exiting the top facets.' }]
  },

  // 8. Density, Mass & Volume (ρ = m/V) Calculator
  {
    slug: 'density-mass-volume-rho-equals-m-over-v-calculator',
    name: 'Density, Mass & Volume (ρ = m / V) Secondary Science Calculator',
    description: 'Calculate substance density (ρ = m / V) in g/cm³ and kg/m³, mass m, and volume V across liquids, solids, and gases with material buoyancy floating/sinking classification in water.',
    category: 'Science',
    icon: 'text',
    keywords: ['density calculator', 'density formula rho equals mass over volume online', 'mass volume density triangle calculator g per cm3', 'buoyancy float or sink density calculator', 'middle school science density calculator online'],
    order: 939,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass m (g or kg) & Volume V (cm³ or mL or L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dn-m">Mass m (g)</label>
          <input class="tool-textarea" id="dn-m" type="number" step="10" value="193.0" placeholder="193.0 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dn-v">Volume V (cm³)</label>
          <input class="tool-textarea" id="dn-v" type="number" step="1" value="10.0" placeholder="10.0 cm³ (mL)" />
        </div>
      </div>
      <div id="dn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dn-res-rho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ρ = 19.30 g/cm³ (19,300 kg/m³)</span>
            <span class="stat-label">Substance Density (ρ = m / V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dn-res-sink" style="color:var(--green-dark); font-weight:700;">PURE GOLD IDENTIFIED: Sinks rapidly in water (ρ > 1.00 g/cm³: Specific Gravity SG = 19.30)</span>
            <span class="stat-label">Material Identification & Archimedes Buoyancy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('dn-m'), vEl = document.getElementById('dn-v');
  const rResEl = document.getElementById('dn-res-rho'), sResEl = document.getElementById('dn-res-sink');

  function update() {
    const m_g = parseFloat(mEl.value), v_cm3 = parseFloat(vEl.value);
    if (isNaN(m_g) || isNaN(v_cm3) || m_g <= 0 || v_cm3 <= 0) return;

    // Density rho = m / V  [g / cm^3]
    const rho_g_cm3 = m_g / v_cm3;
    const rho_kg_m3 = rho_g_cm3 * 1000.0;

    let mat = '';
    let color = '#22543d';

    if (Math.abs(rho_g_cm3 - 19.3) < 0.5) mat = 'PURE GOLD (19.3 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 11.3) < 0.5) mat = 'LEAD (11.3 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 8.9) < 0.5) mat = 'COPPER (8.9 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 7.8) < 0.5) mat = 'IRON / STEEL (7.8 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 2.7) < 0.3) mat = 'ALUMINUM (2.7 g/cm³)';
    else if (Math.abs(rho_g_cm3 - 1.0) < 0.05) mat = 'LIQUID WATER (1.00 g/cm³)';
    else if (rho_g_cm3 < 1.0) mat = 'FLOATS IN WATER (ρ < 1.00 g/cm³ - e.g. Wood / Oil / Ice)';
    else mat = 'SINKS IN WATER (ρ > 1.00 g/cm³)';

    rResEl.textContent = 'ρ = ' + rho_g_cm3.toFixed(2) + ' g/cm³ (' + Math.round(rho_kg_m3).toLocaleString() + ' kg/m³)';
    sResEl.textContent = mat + ' | Specific Gravity SG = ' + rho_g_cm3.toFixed(2);
    sResEl.style.color = color;
  }

  mEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter object mass in grams (g).',
      'Enter volume in cubic centimeters ($\text{cm}^3$) or milliliters (mL).',
      'Inspect density $\rho = m/V$ and evaluate Archimedes buoyancy floating/sinking behavior.'
    ],
    benefitTitle: 'Archimedes Principle & Material Density',
    benefitContent: 'Density is an intensive physical property independent of sample size; measuring density via water displacement ($\Delta V$) allowed Archimedes to detect impure silver alloys in the King\'s golden crown.',
    faqs: [{ q: 'Why does ice float on liquid water?', a: 'Liquid water reaches maximum density at $4^\circ\text{C}$; freezing creates an open hexagonal crystal lattice that expands, lowering ice density to $0.92\text{ g/cm}^3$.' }]
  },

  // 9. Solution Molarity Concentration (c = n/V) Chemistry Calculator
  {
    slug: 'solution-molarity-concentration-c-equals-n-over-v-calculator',
    name: 'Solution Molarity Concentration (c = n / V = m / (M·V)) Calculator',
    description: 'Calculate chemical solution molarity concentration (c = n / V = mass / (Molar Mass · Volume in Liters)) in mol/L (M) and determine exact solute mass required for laboratory reagent preparation.',
    category: 'Science',
    icon: 'text',
    keywords: ['molarity calculator', 'molarity formula c equals n over v online', 'solution concentration calculator moles per liter', 'chemistry lab reagent prep mass calculator molarity', 'solute mass molar mass volume calculator online'],
    order: 940,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solute Mass m (g), Molar Mass M_r (g/mol) & Solution Volume V (mL or L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mol-m">Solute Mass (g)</label>
          <input class="tool-textarea" id="mol-m" type="number" step="any" value="5.844" placeholder="5.844 g (NaCl)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mol-mr">Molar Mass (g/mol)</label>
          <input class="tool-textarea" id="mol-mr" type="number" step="any" value="58.44" placeholder="58.44 g/mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mol-v">Volume (mL)</label>
          <input class="tool-textarea" id="mol-v" type="number" step="50" value="500" placeholder="500 mL (0.50 L)" />
        </div>
      </div>
      <div id="mol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mol-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">c = 0.200 M (mol/L)</span>
            <span class="stat-label">Solution Molarity Concentration (c = n / V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mol-res-n" style="font-weight:700;">Solute Moles n = 0.100 mol (5.844 g / 58.44 g/mol in 0.500 Liters)</span>
            <span class="stat-label">Stoichiometric Chemical Moles & Reagent Protocol</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mol-m'), mrEl = document.getElementById('mol-mr'), vEl = document.getElementById('mol-v');
  const cResEl = document.getElementById('mol-res-c'), nResEl = document.getElementById('mol-res-n');

  function update() {
    const mass_g = parseFloat(mEl.value), M_r = parseFloat(mrEl.value), vol_mL = parseFloat(vEl.value);
    if (isNaN(mass_g) || isNaN(M_r) || isNaN(vol_mL) || mass_g <= 0 || M_r <= 0 || vol_mL <= 0) return;

    // n = mass / M_r  [moles]
    const n_moles = mass_g / M_r;

    // Volume in Liters
    const vol_L = vol_mL / 1000.0;

    // Concentration c = n / V  [mol / L]
    const c_M = n_moles / vol_L;
    const c_mM = c_M * 1000.0;

    cResEl.textContent = 'c = ' + (c_M < 0.01 ? c_mM.toFixed(2) + ' mM' : c_M.toFixed(3) + ' M (mol/L)');
    nResEl.textContent = 'Solute Moles n = ' + n_moles.toFixed(3) + ' mol (' + mass_g + ' g / ' + M_r + ' g/mol in ' + vol_L.toFixed(3) + ' L)';
  }

  [mEl, mrEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solute mass weighed on lab analytical balance in grams (g).',
      'Enter chemical compound formula molar mass in g/mol (e.g. 58.44 for NaCl, 40.00 for NaOH).',
      'Enter final volumetric flask solution volume in milliliters (mL).',
      'Inspect calculated molarity concentration in moles/Liter (M).'
    ],
    benefitTitle: 'Amedeo Avogadro Molar Solution Chemistry',
    benefitContent: 'Molarity ($M = \text{mol/L}$) allows chemists to relate liquid reagent volumes directly to stoichiometry numbers of interacting molecules ($N = n \times 6.022 \times 10^{23}$).',
    faqs: [{ q: 'What is the difference between Molarity (M) and Molality (m)?', a: 'Molarity is moles of solute per liter of total solution ($\text{mol/L}$); Molality is moles of solute per kilogram of pure solvent ($\text{mol/kg}$).' }]
  },

  // 10. Acid-Base Titration Neutralization (C₁V₁/n₁ = C₂V₂/n₂) Calculator
  {
    slug: 'titration-neutralization-c1v1-equals-c2v2-calculator',
    name: 'Acid-Base Titration Neutralization (C₁·V₁ / n₁ = C₂·V₂ / n₂) Equivalence Calculator',
    description: 'Calculate unknown acid/base concentration or equivalence endpoint volume (C_acid · V_acid / n_acid = C_base · V_base / n_base) for monoprotic, diprotic (H₂SO₄), and triprotic (H₃PO₄) neutralizations.',
    category: 'Science',
    icon: 'text',
    keywords: ['titration calculator', 'neutralization formula c1 v1 over n1 equals c2 v2 over n2 online', 'acid base titration equivalence point calculator', 'unknown acid concentration buret volume calculator', 'hcl naoh titration stoichiometry online'],
    order: 941,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acid Concentration C₁ (M), Acid Volume V₁ (mL), Base Buret Volume V₂ (mL) & Stoichiometry (n₁, n₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tit-ca">Acid C₁ (M)</label>
          <input class="tool-textarea" id="tit-ca" type="number" step="0.05" value="0.100" placeholder="0.100 M (HCl)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tit-va">Acid V₁ (mL)</label>
          <input class="tool-textarea" id="tit-va" type="number" step="5" value="25.0" placeholder="25.0 mL (Pipette)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tit-vb">Base V₂ (mL)</label>
          <input class="tool-textarea" id="tit-vb" type="number" step="1" value="20.0" placeholder="20.0 mL (Buret Endpoint)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tit-rxn">Stoichiometry</label>
          <select class="tool-textarea" id="tit-rxn">
            <option value="1_1" selected>1 : 1 (HCl + NaOH)</option>
            <option value="1_2">1 : 2 (H₂SO₄ + 2 NaOH)</option>
            <option value="2_1">2 : 1 (2 HCl + Ca(OH)₂)</option>
          </select>
        </div>
      </div>
      <div id="tit-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tit-res-cb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Base C₂ = 0.125 M (mol/L)</span>
            <span class="stat-label">Calculated Base Concentration at Equivalence</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tit-res-mols" style="font-weight:700;">Neutralized Moles: 2.50 × 10⁻³ mol H⁺ reacting with 2.50 × 10⁻³ mol OH⁻</span>
            <span class="stat-label">Stoichiometric Equivalence Point Neutralization</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const caEl = document.getElementById('tit-ca'), vaEl = document.getElementById('tit-va');
  const vbEl = document.getElementById('tit-vb'), rxEl = document.getElementById('tit-rxn');
  const cbResEl = document.getElementById('tit-res-cb'), mlResEl = document.getElementById('tit-res-mols');

  function update() {
    const Ca = parseFloat(caEl.value), Va = parseFloat(vaEl.value), Vb = parseFloat(vbEl.value);
    const parts = rxEl.value.split('_');
    const na = parseFloat(parts[0]), nb = parseFloat(parts[1]);

    if (isNaN(Ca) || isNaN(Va) || isNaN(Vb) || Ca <= 0 || Va <= 0 || Vb <= 0) return;

    // Stoichiometric relation: ( Ca * Va ) / na = ( Cb * Vb ) / nb
    // Cb = ( Ca * Va * nb ) / ( Vb * na )
    const Cb = (Ca * Va * nb) / (Vb * na);

    const moles_acid = (Ca * Va) / 1000.0;
    const moles_base = (Cb * Vb) / 1000.0;

    cbResEl.textContent = 'Base C₂ = ' + Cb.toFixed(3) + ' M (mol/L)';
    mlResEl.textContent = 'Neutralized Moles = ' + moles_acid.toExponential(2) + ' mol Acid titrated by ' + moles_base.toExponential(2) + ' mol Base (Endpoint: ' + Vb + ' mL)';
  }

  [caEl, vaEl, vbEl].forEach(el => el.addEventListener('input', update));
  rxEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter known acid analyte/titrant concentration $C_1$ in M.',
      'Enter acid volume $V_1$ pipetted into the conical titration flask in mL.',
      'Enter volume of base $V_2$ delivered from the buret at indicator color change endpoint.',
      'Select stoichiometric reaction ratio (1:1 monoprotic, 1:2 diprotic sulfuric acid).',
      'Inspect unknown base concentration $C_2$ at stoichiometric equivalence.'
    ],
    benefitTitle: 'Quantitative Volumetric Chemical Analysis',
    benefitContent: 'At the stoichiometric equivalence point, moles of hydronium ions exactly equal moles of hydroxide ions ($\frac{C_A V_A}{n_A} = \frac{C_B V_B}{n_B}$), providing high-precision quantitative analysis of acid concentrations in food, pharmaceuticals, and environmental water samples.',
    faqs: [{ q: 'What is the difference between the Equivalence Point and Endpoint?', a: 'The Equivalence Point is the theoretical stoichiometric exact mole match; the Endpoint is the physical observable visual indicator color change.' }]
  },

  // 11. pH, pOH & Hydrogen Ion Concentration [H⁺] Converter
  {
    slug: 'ph-poh-hydrogen-ion-concentration-converter',
    name: 'pH, pOH, [H⁺] & [OH⁻] Ion Concentration Chemistry Converter',
    description: 'Convert between pH, pOH, hydronium ion concentration [H⁺] = 10^(-pH), and hydroxide concentration [OH⁻] = 10^(-pOH) using water autoionization equilibrium (pH + pOH = 14.00 @ 25°C).',
    category: 'Science',
    icon: 'text',
    keywords: ['ph calculator', 'poh to ph converter formula ph plus poh equals 14 online', 'hydrogen ion concentration from ph calculator 10 to minus ph', 'acidic basic neutral ph scale converter', 'chemistry autoionization of water kw calculator online'],
    order: 942,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solution pH (0 to 14) or Hydronium Concentration [H⁺] (M)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ph-in">Solution pH (0-14)</label>
          <input class="tool-textarea" id="ph-in" type="number" step="0.1" min="0" max="14" value="3.20" placeholder="3.20" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ph-hplus">[H⁺] (mol/L)</label>
          <input class="tool-textarea" id="ph-hplus" type="number" step="any" value="6.31e-4" placeholder="6.31 × 10⁻⁴ M" />
        </div>
      </div>
      <div id="ph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ph-res-poh" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">pOH = 10.80 | [OH⁻] = 1.58 × 10⁻¹¹ M</span>
            <span class="stat-label">Hydroxide Balance (pOH = 14.00 - pH)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-scale" style="color:var(--green-dark); font-weight:700;">STRONGLY ACIDIC (pH 3.20: Orange Juice / Grapefruit Acidity Range)</span>
            <span class="stat-label">Acidic vs Neutral vs Alkaline Scale Placement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('ph-in'), hEl = document.getElementById('ph-hplus');
  const pohResEl = document.getElementById('ph-res-poh'), scResEl = document.getElementById('ph-res-scale');

  function fromPh() {
    const pH = parseFloat(phEl.value);
    if (isNaN(pH) || pH < 0 || pH > 14) return;

    // [H+] = 10^(-pH)
    const H_conc = Math.pow(10, -pH);
    hEl.value = H_conc.toExponential(2);

    // pOH = 14 - pH
    const pOH = 14.0 - pH;
    const OH_conc = Math.pow(10, -pOH);

    let nature = '';
    let color = '#22543d';

    if (pH < 3.0) { nature = 'STRONGLY ACIDIC (pH < 3.0: Stomach Acid / Lemon Juice)'; color = '#c53030'; }
    else if (pH < 6.5) { nature = 'WEAKLY ACIDIC (pH 3.0 - 6.5: Coffee / Rainwater / Milk)'; color = '#ea580c'; }
    else if (pH <= 7.5) { nature = 'NEUTRAL REGIME (pH 6.5 - 7.5: Pure Water / Human Blood pH 7.40)'; color = '#22543d'; }
    else if (pH <= 11.0) { nature = 'WEAKLY BASIC (pH 7.5 - 11.0: Baking Soda / Soap)'; color = '#2563eb'; }
    else { nature = 'STRONGLY BASIC (pH > 11.0: Bleach / Lye / Drain Cleaner)'; color = '#2563eb'; }

    pohResEl.textContent = 'pOH = ' + pOH.toFixed(2) + ' | [OH⁻] = ' + OH_conc.toExponential(2) + ' M';
    scResEl.textContent = nature;
    scResEl.style.color = color;
  }

  phEl.addEventListener('input', fromPh);
  fromPh();
})();`,
    howToSteps: [
      'Enter solution pH on the logarithmic 0 to 14 scale.',
      'Inspect automatically converted hydrogen/hydronium ion concentration $[H^+] = 10^{-pH}\text{ M}$.',
      'View corresponding $pOH$, $[OH^-]$ concentration, and acidic/neutral/basic classification.'
    ],
    benefitTitle: 'Søren Peder Lauritz Sørensen 1909 pH Scale',
    benefitContent: 'The pH scale condenses 14 orders of magnitude of hydrogen ion concentrations into a simple $0\text{ to }14$ range; each whole pH step represents a tenfold ($10\times$) change in acidity.',
    faqs: [{ q: 'Why does pH + pOH = 14 at 25°C?', a: 'Because the water self-ionization constant is $K_w = [H^+][OH^-] = 1.0 \times 10^{-14}$; taking negative logarithms yields $-\log[H^+] - \log[OH^-] = 14$.' }]
  },

  // 12. Pythagorean Theorem Right Triangle Hypotenuse & Leg Calculator
  {
    slug: 'pythagorean-theorem-hypotenuse-leg-triangle-calculator',
    name: 'Pythagorean Theorem Hypotenuse (c = √(a² + b²)) & Right Triangle Calculator',
    description: 'Calculate right triangle hypotenuse (c = √(a² + b²)) or leg lengths (a = √(c² - b²)), perimeter, area (A = ½·a·b), and interior angles for middle school and high school geometry.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['pythagorean theorem calculator', 'a squared plus b squared equals c squared formula online', 'hypotenuse calculator right triangle', 'find missing side right triangle pythagoras calculator', 'geometry pythagorean triples 3 4 5 calculator'],
    order: 943,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Side a (Leg), Side b (Leg) & Target Hypotenuse c',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="py-a">Side a (Leg)</label>
          <input class="tool-textarea" id="py-a" type="number" step="any" value="3.0" placeholder="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="py-b">Side b (Leg)</label>
          <input class="tool-textarea" id="py-b" type="number" step="any" value="4.0" placeholder="4.0" />
        </div>
      </div>
      <div id="py-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="py-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hypotenuse c = 5.00</span>
            <span class="stat-label">Hypotenuse Length (c = √(a² + b²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="py-res-prop" style="font-weight:700;">Area = 6.00 | Perimeter = 12.00 | Angles: 36.87°, 53.13°, 90.00° (3:4:5 Triple)</span>
            <span class="stat-label">Triangle Area, Perimeter & Interior Angles</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('py-a'), bEl = document.getElementById('py-b');
  const cResEl = document.getElementById('py-res-c'), prResEl = document.getElementById('py-res-prop');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    // c = sqrt( a^2 + b^2 )
    const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

    // Area = 0.5 * a * b
    const area = 0.5 * a * b;
    // Perimeter = a + b + c
    const perimeter = a + b + c;

    // Angles
    const angleA_deg = (Math.asin(a / c) * 180.0) / Math.PI;
    const angleB_deg = 90.0 - angleA_deg;

    let triple = '';
    if (Math.round(c) === c && Math.round(a) === a && Math.round(b) === b) {
      triple = ' (Integer Pythagorean Triple)';
    }

    cResEl.textContent = 'Hypotenuse c = ' + c.toFixed(2) + triple;
    prResEl.textContent = 'Area = ' + area.toFixed(2) + ' | Perimeter = ' + perimeter.toFixed(2) + ' | Angles: ' + angleA_deg.toFixed(1) + '°, ' + angleB_deg.toFixed(1) + '°, 90°';
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter length of right triangle leg a.',
      'Enter length of right triangle leg b.',
      'Inspect calculated hypotenuse $c = \sqrt{a^2 + b^2}$, total perimeter, triangle area, and acute interior angles.'
    ],
    benefitTitle: 'Fundamental Euclidean Geometry Theorem',
    benefitContent: 'In any right-angled Euclidean triangle, the square of the hypotenuse equals the sum of squares of the other two sides ($a^2 + b^2 = c^2$), forming the foundation of 2D/3D coordinate distance formulas, trigonometry, and computer graphics vector math.',
    faqs: [{ q: 'What are common integer Pythagorean triples?', a: 'Common triples include $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, and $(7, 24, 25)$.' }]
  },

  // 13. SOH-CAH-TOA Right Triangle Trigonometry Solver
  {
    slug: 'trigonometry-soh-cah-toa-right-triangle-solver',
    name: 'Right Triangle Trigonometry (SOH-CAH-TOA: sin, cos, tan) Solver',
    description: 'Solve right triangle sides and angles using SOH-CAH-TOA ratios (sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj) and inverse trig functions (arcsin, arccos, arctan) for high school math.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['soh cah toa calculator', 'right triangle trigonometry solver sine cosine tangent online', 'opposite adjacent hypotenuse trig ratio calculator', 'sin cos tan formula triangle solver', 'high school geometry trigonometry calculator online'],
    order: 944,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Angle θ (Degrees) & Known Side (Opposite, Adjacent, or Hypotenuse)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-th">Angle θ (°)</label>
          <input class="tool-textarea" id="tr-th" type="number" step="1" min="1" max="89" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-hyp">Hypotenuse</label>
          <input class="tool-textarea" id="tr-hyp" type="number" step="any" value="10.0" placeholder="10.0 (Hypotenuse)" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-opp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Opposite = 5.00 | Adjacent = 8.66</span>
            <span class="stat-label">Opposite (Hyp · sin θ) & Adjacent (Hyp · cos θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-ratios" style="font-weight:700;">sin(30°) = 0.500 | cos(30°) = 0.866 | tan(30°) = 0.577</span>
            <span class="stat-label">SOH-CAH-TOA Exact Trigonometric Ratios</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('tr-th'), hypEl = document.getElementById('tr-hyp');
  const oppResEl = document.getElementById('tr-res-opp'), ratResEl = document.getElementById('tr-res-ratios');

  function update() {
    const thetaDeg = parseFloat(thEl.value), hyp = parseFloat(hypEl.value);
    if (isNaN(thetaDeg) || isNaN(hyp) || thetaDeg <= 0 || thetaDeg >= 90 || hyp <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180.0;

    // SOH: sin(theta) = Opp / Hyp => Opp = Hyp * sin(theta)
    const opp = hyp * Math.sin(thetaRad);

    // CAH: cos(theta) = Adj / Hyp => Adj = Hyp * cos(theta)
    const adj = hyp * Math.cos(thetaRad);

    // TOA: tan(theta) = Opp / Adj
    const sinVal = Math.sin(thetaRad);
    const cosVal = Math.cos(thetaRad);
    const tanVal = Math.tan(thetaRad);

    oppResEl.textContent = 'Opposite = ' + opp.toFixed(2) + ' | Adjacent = ' + adj.toFixed(2);
    ratResEl.textContent = 'sin(' + thetaDeg + '°) = ' + sinVal.toFixed(3) + ' | cos(' + thetaDeg + '°) = ' + cosVal.toFixed(3) + ' | tan(' + thetaDeg + '°) = ' + tanVal.toFixed(3) + ' (Hyp: ' + hyp + ')';
  }

  thEl.addEventListener('input', update);
  hypEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter acute angle $\theta$ in degrees ($0^\circ < \theta < 90^\circ$).',
      'Enter known Hypotenuse length.',
      'Inspect calculated Opposite leg ($Opp = Hyp \cdot \sin\theta$) and Adjacent leg ($Adj = Hyp \cdot \cos\theta$) lengths and exact SOH-CAH-TOA trig ratios.'
    ],
    benefitTitle: 'SOH-CAH-TOA High School Trigonometry Mnemonic',
    benefitContent: 'SOH ($\sin\theta = \frac{O}{H}$), CAH ($\cos\theta = \frac{A}{H}$), and TOA ($\tan\theta = \frac{O}{A}$) allow students to resolve any right triangle or 2D physics vector into perpendicular x- and y-components.',
    faqs: [{ q: 'What are the exact trigonometric values for a 30-60-90 triangle?', a: 'For $30^\circ$: $\sin 30^\circ = 1/2 = 0.5$, $\cos 30^\circ = \sqrt{3}/2 \approx 0.866$, and $\tan 30^\circ = 1/\sqrt{3} \approx 0.577$.' }]
  },

  // 14. Circle Geometry: Area, Circumference, Arc Length & Sector Area Calculator
  {
    slug: 'circle-area-circumference-arc-length-sector-area-calculator',
    name: 'Circle Geometry (Area A = π·r², Circumference C = 2·π·r, Arc Length & Sector Area) Calculator',
    description: 'Calculate circle area (A = π·r²), perimeter circumference (C = 2·π·r), circular arc length (s = r·θ), and pie sector area (A_sector = ½·r²·θ) from radius r and central angle θ in degrees.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['circle area calculator', 'circle circumference formula c equals 2 pi r online', 'arc length sector area calculator radius central angle', 'area of a circle pi r squared calculator', 'circle geometry formulas solver online'],
    order: 945,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Circle Radius r (cm/m) & Central Sector Angle θ (Degrees)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="circ-r">Radius r</label>
          <input class="tool-textarea" id="circ-r" type="number" step="any" value="7.0" placeholder="7.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="circ-th">Sector Angle θ (°)</label>
          <input class="tool-textarea" id="circ-th" type="number" step="5" min="1" max="360" value="60.0" placeholder="60.0°" />
        </div>
      </div>
      <div id="circ-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="circ-res-main" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Area = 153.94 | Circ = 43.98</span>
            <span class="stat-label">Full Circle Total Area (π·r²) & Circumference (2·π·r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="circ-res-sec" style="font-weight:700;">Sector Area = 25.66 | Arc Length s = 7.33 (60° Fraction = 1/6 of circle)</span>
            <span class="stat-label">Circular Arc Length & Subtended Sector Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('circ-r'), thEl = document.getElementById('circ-th');
  const mnResEl = document.getElementById('circ-res-main'), scResEl = document.getElementById('circ-res-sec');

  function update() {
    const r = parseFloat(rEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(r) || isNaN(thetaDeg) || r <= 0 || thetaDeg <= 0 || thetaDeg > 360) return;

    const thetaRad = (thetaDeg * Math.PI) / 180.0;

    // Full circle:
    const Area_total = Math.PI * Math.pow(r, 2);
    const Circ = 2.0 * Math.PI * r;

    // Arc length s = r * theta (in radians) = (thetaDeg / 360) * Circ
    const arcLength = (thetaDeg / 360.0) * Circ;

    // Sector Area = (thetaDeg / 360) * Area_total
    const sectorArea = (thetaDeg / 360.0) * Area_total;

    mnResEl.textContent = 'Area = ' + Area_total.toFixed(2) + ' | Circ = ' + Circ.toFixed(2);
    scResEl.textContent = 'Sector Area = ' + sectorArea.toFixed(2) + ' | Arc Length s = ' + arcLength.toFixed(2) + ' (' + thetaDeg + '° = ' + (thetaDeg/360).toFixed(3) + ' fraction @ r = ' + r + ')';
  }

  rEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter circle radius r.',
      'Enter subtended sector central angle $\theta$ in degrees ($0^\circ < \theta \le 360^\circ$).',
      'Inspect total circle Area ($\pi r^2$), Circumference ($2\pi r$), partial circular Arc Length, and Sector Area.'
    ],
    benefitTitle: 'Classical Circular Geometry Metric',
    benefitContent: 'Connecting radius to circumference and area via the mathematical constant $\pi \approx 3.14159$ enables rapid calculation of pizza slice surface areas, wheel rotations per mile, and astronomical planetary orbit perimeters.',
    faqs: [{ q: 'What is the formula for Arc Length in radians?', a: 'When the central angle $\theta$ is in radians, the arc length is simply $s = r\theta$.' }]
  },

  // 15. Solid 3D Geometry: Cylinder, Cone & Sphere Volume and Surface Area Calculator
  {
    slug: 'cylinder-cone-sphere-volume-surface-area-geometry-calculator',
    name: '3D Solid Geometry (Cylinder, Cone & Sphere Volume and Surface Area) Calculator',
    description: 'Calculate 3D solid geometry volume (Cylinder V = π·r²·h, Cone V = ⅓·π·r²·h, Sphere V = ⁴/₃·π·r³) and total surface area for secondary school math and geometry courses.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['cylinder volume calculator', 'cone sphere cylinder volume surface area calculator online', 'volume of sphere four thirds pi r cubed calculator', 'cone volume one third pi r squared h calculator', '3d geometry surface area calculator online'],
    order: 946,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '3D Shape Selection, Radius r & Height h',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-shape">3D Shape</label>
          <select class="tool-textarea" id="sol-shape">
            <option value="cylinder" selected>Cylinder (V = π·r²·h)</option>
            <option value="cone">Cone (V = ⅓·π·r²·h)</option>
            <option value="sphere">Sphere (V = ⁴/₃·π·r³)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-r">Radius r</label>
          <input class="tool-textarea" id="sol-r" type="number" step="any" value="5.0" placeholder="5.0" />
        </div>
        <div class="control-group" id="sol-grp-h">
          <label class="control-label" for="sol-h">Height h</label>
          <input class="tool-textarea" id="sol-h" type="number" step="any" value="12.0" placeholder="12.0" />
        </div>
      </div>
      <div id="sol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Volume V = 942.48</span>
            <span class="stat-label">3D Solid Enclosed Volume</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-sa" style="color:var(--green-dark); font-weight:700;">Total Surface Area = 534.07 (Top/Base: 157.08 + Curved Lateral: 376.99)</span>
            <span class="stat-label">Total Exterior Surface Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const shEl = document.getElementById('sol-shape'), rEl = document.getElementById('sol-r'), hEl = document.getElementById('sol-h');
  const grpH = document.getElementById('sol-grp-h');
  const vResEl = document.getElementById('sol-res-vol'), saResEl = document.getElementById('sol-res-sa');

  function update() {
    const shape = shEl.value;
    const r = parseFloat(rEl.value), h = parseFloat(hEl.value);

    if (isNaN(r) || r <= 0) return;

    let Vol = 0, SA = 0, detail = '';

    if (shape === 'cylinder') {
      if (isNaN(h) || h <= 0) return;
      Vol = Math.PI * Math.pow(r, 2) * h;
      const baseArea = 2.0 * Math.PI * Math.pow(r, 2);
      const lateralArea = 2.0 * Math.PI * r * h;
      SA = baseArea + lateralArea;
      detail = 'Top/Base: ' + baseArea.toFixed(2) + ' + Curved Lateral: ' + lateralArea.toFixed(2);
    } else if (shape === 'cone') {
      if (isNaN(h) || h <= 0) return;
      Vol = (1.0 / 3.0) * Math.PI * Math.pow(r, 2) * h;
      const slant_l = Math.sqrt(Math.pow(r, 2) + Math.pow(h, 2));
      const baseArea = Math.PI * Math.pow(r, 2);
      const lateralArea = Math.PI * r * slant_l;
      SA = baseArea + lateralArea;
      detail = 'Base: ' + baseArea.toFixed(2) + ' + Slant Lateral: ' + lateralArea.toFixed(2) + ' (Slant Height l = ' + slant_l.toFixed(2) + ')';
    } else if (shape === 'sphere') {
      Vol = (4.0 / 3.0) * Math.PI * Math.pow(r, 3);
      SA = 4.0 * Math.PI * Math.pow(r, 2);
      detail = 'Surface Area: 4·π·r² = ' + SA.toFixed(2);
    }

    vResEl.textContent = 'Volume V = ' + Vol.toFixed(2);
    saResEl.textContent = 'Total Surface Area = ' + SA.toFixed(2) + ' (' + detail + ')';
  }

  [shEl, rEl, hEl].forEach(el => el.addEventListener('input', update));
  shEl.addEventListener('change', () => {
    grpH.style.display = shEl.value === 'sphere' ? 'none' : 'block';
    update();
  });
  update();
})();`,
    howToSteps: [
      'Select 3D shape (Cylinder, Cone, or Sphere).',
      'Enter base radius r and height h.',
      'Inspect total 3D enclosed Volume and total exterior Surface Area.'
    ],
    benefitTitle: 'Archimedes Sphere and Cylinder Volume Ratio',
    benefitContent: 'Archimedes considered his greatest mathematical discovery to be the proof that a sphere has exactly two-thirds the volume and surface area of its circumscribing cylinder ($V_{\text{sphere}} = \frac{2}{3} V_{\text{cylinder}}$).',
    faqs: [{ q: 'How is the slant height of a cone calculated?', a: 'Using the Pythagorean theorem: Slant Height $l = \sqrt{r^2 + h^2}$.' }]
  },

  // 16. Gas Molar Volume & Avogadro's Law at STP and RTP Calculator
  {
    slug: 'gas-molar-volume-avogadro-law-stp-rtp-calculator',
    name: 'Gas Molar Volume & Avogadro\'s Law (STP 22.4 L & RTP 24.0 L) Calculator',
    description: 'Calculate ideal gas volume (V = n · V_m) at Standard Temperature and Pressure (STP 0°C, 1 atm: V_m = 22.4 L/mol) and Room Temperature and Pressure (RTP 20°C/25°C, 1 atm: V_m = 24.0 L/mol) for chemistry exams.',
    category: 'Science',
    icon: 'text',
    keywords: ['gas molar volume calculator', 'avogadro law stp 22.4 liters rtp 24 liters calculator', 'moles of gas to volume in liters calculator stp', 'ideal gas molar volume room temperature calculator', 'chemistry stoichiometry gas volume calculator online'],
    order: 947,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Moles of Gas n (mol) & Temperature / Pressure Condition (STP vs RTP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gm-n">Gas Moles n (mol)</label>
          <input class="tool-textarea" id="gm-n" type="number" step="0.5" value="2.50" placeholder="2.50 mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-cond">Conditions</label>
          <select class="tool-textarea" id="gm-cond">
            <option value="22.4" selected>STP (0°C, 1 atm - 22.4 L/mol)</option>
            <option value="24.0">RTP (20°C/25°C, 1 atm - 24.0 L/mol)</option>
            <option value="22.7">IUPAC Standard (0°C, 1 bar - 22.7 L/mol)</option>
          </select>
        </div>
      </div>
      <div id="gm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gas Volume V = 56.0 Liters</span>
            <span class="stat-label">Total Gas Volume (V = n · V_m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-molc" style="color:var(--green-dark); font-weight:700;">1.51 × 10²⁴ Molecules (Avogadro Constant: 6.022 × 10²³ molecules/mol)</span>
            <span class="stat-label">Total Molecular Particle Count</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('gm-n'), cEl = document.getElementById('gm-cond');
  const vResEl = document.getElementById('gm-res-vol'), mResEl = document.getElementById('gm-res-molc');

  const N_A = 6.02214e23;

  function update() {
    const n_moles = parseFloat(nEl.value), V_m = parseFloat(cEl.value);
    if (isNaN(n_moles) || isNaN(V_m) || n_moles <= 0 || V_m <= 0) return;

    // V = n * V_m  [Liters]
    const volume_L = n_moles * V_m;
    const volume_dm3 = volume_L; // 1 L = 1 dm^3

    // Number of molecules = n * N_A
    const molecules = n_moles * N_A;

    vResEl.textContent = 'Gas Volume V = ' + volume_L.toFixed(1) + ' Liters (' + volume_dm3.toFixed(1) + ' dm³)';
    mResEl.textContent = molecules.toExponential(2) + ' Molecules (' + n_moles + ' mol @ V_m = ' + V_m + ' L/mol)';
  }

  nEl.addEventListener('input', update);
  cEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter amount of gas in moles n.',
      'Select environmental thermodynamic condition (STP $22.4\text{ L/mol}$ or RTP $24.0\text{ L/mol}$).',
      'Inspect total gas volume in Liters ($dm^3$) and total Avogadro molecular count.'
    ],
    benefitTitle: 'Avogadro\'s Hypothesis (Equal Volumes Contain Equal Molecules)',
    benefitContent: 'Under identical temperature and pressure conditions, equal volumes of all ideal gases contain exactly the same number of molecules ($V \propto n$), eliminating the need to weigh elusive gas masses during chemical stoichiometry reactions.',
    faqs: [{ q: 'Why is molar volume at RTP (24.0 L) larger than at STP (22.4 L)?', a: 'Because higher room temperature ($20^\circ\text{C} / 293\text{ K}$) increases kinetic gas pressure, causing the gas to thermally expand by Charles\'s Law.' }]
  },

  // 17. Scientific Notation & Standard Form Converter
  {
    slug: 'scientific-notation-standard-form-engineering-exponent-converter',
    name: 'Scientific Notation, Standard Form & Engineering Exponent Converter',
    description: 'Convert standard decimal numbers into Scientific Notation (a · 10^b where 1 ≤ |a| and |a| is less than 10) and Engineering Notation (powers of 10 in multiples of 3: kilo, mega, micro, nano) with significant figure tracking.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['scientific notation converter', 'standard form converter a times 10 to the b online', 'engineering notation calculator multiples of 3', 'significant figures scientific notation converter', 'decimal to scientific notation calculator online'],
    order: 948,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Decimal or Exponential Number Input (e.g. 0.000456 or 6400000)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sn-in">Raw Number</label>
        <input class="tool-textarea" id="sn-in" type="text" value="0.000456" placeholder="e.g. 0.000456 or 150000000" />
      </div>
      <div id="sn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sn-res-sci" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.56 × 10⁻⁴ (Scientific)</span>
            <span class="stat-label">Standard Form Scientific Notation (1 ≤ a < 10)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sn-res-eng" style="color:var(--green-dark); font-weight:700;">Engineering: 456.0 × 10⁻⁶ (456 μ | Micro Metric Prefix)</span>
            <span class="stat-label">Engineering Notation (Multiple of 10³ Exponents)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('sn-in');
  const sciResEl = document.getElementById('sn-res-sci'), engResEl = document.getElementById('sn-res-eng');

  function update() {
    const raw = (inEl.value || '').trim();
    const val = parseFloat(raw);
    if (isNaN(val) || val === 0) return;

    // Scientific notation: a * 10^b
    const exp = Math.floor(Math.log10(Math.abs(val)));
    const a = val / Math.pow(10, exp);

    // Engineering notation (exponent multiple of 3):
    const engExp = Math.floor(exp / 3.0) * 3;
    const engA = val / Math.pow(10, engExp);

    let prefix = '';
    if (engExp === 12) prefix = 'Tera (T)';
    else if (engExp === 9) prefix = 'Giga (G)';
    else if (engExp === 6) prefix = 'Mega (M)';
    else if (engExp === 3) prefix = 'kilo (k)';
    else if (engExp === 0) prefix = 'Unit (10⁰)';
    else if (engExp === -3) prefix = 'milli (m)';
    else if (engExp === -6) prefix = 'micro (μ)';
    else if (engExp === -9) prefix = 'nano (n)';
    else if (engExp === -12) prefix = 'pico (p)';

    sciResEl.textContent = a.toFixed(3) + ' × 10^(' + exp + ')';
    engResEl.textContent = 'Engineering: ' + engA.toFixed(2) + ' × 10^(' + engExp + ')' + (prefix ? ' (' + prefix + ')' : '');
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any positive or negative decimal number.',
      'Inspect normalized scientific notation ($a \times 10^b$ where $1 \le |a| < 10$).',
      'View engineering notation format (powers of 10 constrained to multiples of 3 for SI unit prefixes).'
    ],
    benefitTitle: 'Handling Astronomical and Subatomic Scales',
    benefitContent: 'Scientific notation prevents counting errors when working with vast numbers like the speed of light ($3.0 \times 10^8\text{ m/s}$) or minuscule constants like the elementary electron charge ($1.602 \times 10^{-19}\text{ C}$).',
    faqs: [{ q: 'How does Engineering Notation differ from Scientific Notation?', a: 'In Engineering Notation, the exponent must always be a multiple of 3 ($10^3, 10^6, 10^{-3}, 10^{-6}$), directly matching metric prefixes like kilo, mega, milli, and micro.' }]
  },

  // 18. Percentage Composition by Mass of Chemical Formula Calculator
  {
    slug: 'percentage-composition-by-mass-chemical-formula-calculator',
    name: 'Percentage Composition by Mass of Chemical Formula Calculator',
    description: 'Calculate individual elemental percentage mass fractions (% = (n · M_element / M_total) · 100) from molecular formulas (e.g. Glucose C₆H₁₂O₆, Water H₂O, Calcium Carbonate CaCO₃) for high school chemistry.',
    category: 'Science',
    icon: 'text',
    keywords: ['percentage composition calculator', 'percent composition by mass formula chemistry online', 'molar mass percentage composition calculator', 'glucose percent carbon hydrogen oxygen calculator', 'stoichiometry mass percent chemical formula online'],
    order: 949,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Compound Formula or Total Molecular Mass (g/mol) & Target Element Mass (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pc-comp">Compound</label>
          <select class="tool-textarea" id="pc-comp">
            <option value="180.16_72.06" selected>Glucose C₆H₁₂O₆ (Carbon %)</option>
            <option value="18.015_15.999">Water H₂O (Oxygen %)</option>
            <option value="100.09_40.08">Calcium Carbonate CaCO₃ (Calcium %)</option>
            <option value="58.44_22.99">Sodium Chloride NaCl (Sodium %)</option>
            <option value="98.08_32.06">Sulfuric Acid H₂SO₄ (Sulfur %)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-tot">Total Molar Mass</label>
          <input class="tool-textarea" id="pc-tot" type="number" step="any" value="180.16" placeholder="180.16 g/mol" />
        </div>
      </div>
      <div id="pc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pc-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">40.00% by Mass</span>
            <span class="stat-label">Target Element Mass Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pc-res-el" style="color:var(--green-dark); font-weight:700;">Element Mass: 72.06 g/mol out of 180.16 g/mol Total Molecular Mass</span>
            <span class="stat-label">Stoichiometric Mass Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('pc-comp'), tEl = document.getElementById('pc-tot');
  const pResEl = document.getElementById('pc-res-pct'), eResEl = document.getElementById('pc-res-el');

  function update() {
    const parts = cEl.value.split('_');
    const totalMolar = parseFloat(parts[0]);
    const elemMass = parseFloat(parts[1]);

    const pct = (elemMass / totalMolar) * 100.0;

    pResEl.textContent = pct.toFixed(2) + '% by Mass';
    eResEl.textContent = 'Element Mass: ' + elemMass.toFixed(2) + ' g/mol out of ' + totalMolar.toFixed(2) + ' g/mol (' + cEl.options[cEl.selectedIndex].text + ')';
  }

  cEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select common chemical compound from dropdown or inspect element molar mass.',
      'Inspect calculated elemental mass percentage $\% = \frac{n \times M_{\text{element}}}{M_{\text{compound}}} \times 100$.'
    ],
    benefitTitle: 'Joseph Proust Law of Definite Proportions',
    benefitContent: 'A chemical compound always contains exactly the same proportion of elements by mass regardless of its natural or synthetic source, allowing elemental purity verification.',
    faqs: [{ q: 'What is the mass percentage of oxygen in pure water (H₂O)?', a: 'Water consists of $88.81\%$ Oxygen and $11.19\%$ Hydrogen by mass ($15.999 / 18.015 \times 100$).' }]
  },

  // 19. Richter Magnitude & Seismic Earthquake Energy Release Calculator
  {
    slug: 'richter-magnitude-earthquake-seismic-energy-release-calculator',
    name: 'Richter Magnitude & Seismic Earthquake Energy Release (E = 10^(4.8 + 1.5·M)) Calculator',
    description: 'Calculate earthquake seismic radiative energy release in Joules and TNT equivalent (log₁₀ E = 4.8 + 1.5·M) and compute energy amplification ratios (each +1.0 magnitude step increases energy by 31.62×).',
    category: 'Science',
    icon: 'text',
    keywords: ['richter scale calculator', 'earthquake energy formula 10 to the 4.8 plus 1.5 m online', 'earthquake magnitude energy multiplier calculator 32x', 'tnt equivalent earthquake energy calculator', 'seismology richter magnitude energy release online'],
    order: 950,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Earthquake Richter Moment Magnitude M (1.0 to 9.5)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="eq-m">Earthquake Magnitude M</label>
        <input class="tool-textarea" id="eq-m" type="number" step="0.1" min="1.0" max="9.5" value="7.0" placeholder="7.0 (Major Earthquake)" />
      </div>
      <div id="eq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eq-res-e" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Energy E = 1.99 × 10¹⁵ Joules</span>
            <span class="stat-label">Radiated Seismic Energy (E = 10^(4.8 + 1.5·M))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eq-res-tnt" style="color:var(--green-dark); font-weight:700;">TNT Equivalent = 476 Kilotons TNT (31.62× Energy per +1.0 Magnitude Step)</span>
            <span class="stat-label">TNT Explosive Equivalent & Richter Logarithmic Scaling</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('eq-m');
  const eResEl = document.getElementById('eq-res-e'), tntResEl = document.getElementById('eq-res-tnt');

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M < 1.0 || M > 10.0) return;

    // Gutenberg-Richter energy formula: log10(E) = 4.8 + 1.5 * M  [Joules]
    const logE = 4.8 + (1.5 * M);
    const E_joules = Math.pow(10, logE);

    // 1 ton of TNT = 4.184 x 10^9 Joules
    const tons_tnt = E_joules / 4.184e9;

    let tntStr = '';
    if (tons_tnt >= 1e6) tntStr = (tons_tnt / 1e6).toFixed(2) + ' Megatons TNT';
    else if (tons_tnt >= 1000) tntStr = Math.round(tons_tnt / 1000) + ' Kilotons TNT';
    else tntStr = Math.round(tons_tnt) + ' Tons TNT';

    eResEl.textContent = 'E = ' + E_joules.toExponential(2) + ' Joules';
    tntResEl.textContent = 'TNT Equivalent = ' + tntStr + ' (Magnitude ' + M.toFixed(1) + ' | 31.62× energy per +1.0 step)';
  }

  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter earthquake Richter / Moment Magnitude M (e.g. 5.0 moderate, 7.0 major, 9.0 catastrophic).',
      'Inspect total radiated seismic energy in Joules and equivalent explosive yield in Megatons/Kilotons of TNT.'
    ],
    benefitTitle: 'Charles Richter & Beno Gutenberg 1935 Energy Scale',
    benefitContent: 'Because the Richter magnitude is semi-logarithmic with a $1.5$ exponent factor, an increase of $+1.0$ on the magnitude scale corresponds to $10^{1.5} \approx 31.62$ times more energy, and a $+2.0$ increase releases exactly $1,000\times$ more energy.',
    faqs: [{ q: 'How much more energy is released in a magnitude 8.0 vs 6.0 earthquake?', a: 'A magnitude 8.0 earthquake releases exactly $10^{1.5 \times 2} = 10^3 = 1,000\text{ times}$ more destructive energy than a magnitude 6.0.' }]
  },

  // 20. Compound Interest Future Value Savings (A = P·(1 + r/n)^(nt)) Calculator
  {
    slug: 'compound-interest-future-value-savings-a-equals-p-1-plus-r-over-n-nt-calculator',
    name: 'Compound Interest & Future Value (A = P·(1 + r/n)^(n·t)) Savings Calculator',
    description: 'Calculate compound interest accumulated balance (A = P·(1 + r/n)^(n·t)) and total interest earned with monthly, quarterly, or annual compounding frequencies for financial literacy education.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['compound interest calculator', 'compound interest formula a equals p 1 plus r over n to the nt online', 'future value savings investment calculator', 'monthly compounding interest calculator online', 'financial literacy compound growth calculator'],
    order: 951,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Principal P ($), Annual Interest Rate r (%), Time t (Years) & Compounding Frequency n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ci-p">Principal P ($)</label>
          <input class="tool-textarea" id="ci-p" type="number" step="500" value="5000" placeholder="$5,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-r">Rate r (%)</label>
          <input class="tool-textarea" id="ci-r" type="number" step="0.5" value="7.0" placeholder="7.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-t">Time t (Years)</label>
          <input class="tool-textarea" id="ci-t" type="number" step="1" value="10" placeholder="10 Years" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ci-n">Frequency n</label>
          <select class="tool-textarea" id="ci-n">
            <option value="12" selected>Monthly (n = 12)</option>
            <option value="1">Annually (n = 1)</option>
            <option value="4">Quarterly (n = 4)</option>
            <option value="365">Daily (n = 365)</option>
          </select>
        </div>
      </div>
      <div id="ci-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ci-res-a" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Future Balance A = $10,048</span>
            <span class="stat-label">Total Accumulated Future Value</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ci-res-int" style="color:var(--green-dark); font-weight:700;">Total Interest Earned = $5,048 (+100.9% Gain on $5,000 Principal)</span>
            <span class="stat-label">Compound Interest Growth Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('ci-p'), rEl = document.getElementById('ci-r');
  const tEl = document.getElementById('ci-t'), nEl = document.getElementById('ci-n');
  const aResEl = document.getElementById('ci-res-a'), intResEl = document.getElementById('ci-res-int');

  function update() {
    const P = parseFloat(pEl.value), r_pct = parseFloat(rEl.value);
    const t = parseFloat(tEl.value), n = parseFloat(nEl.value);

    if (isNaN(P) || isNaN(r_pct) || isNaN(t) || isNaN(n) || P <= 0 || r_pct <= 0 || t <= 0) return;

    const r = r_pct / 100.0;

    // Formula: A = P * ( 1 + r/n )^(n * t)
    const A = P * Math.pow(1.0 + (r / n), n * t);
    const totalInterest = A - P;
    const gainPct = (totalInterest / P) * 100.0;

    aResEl.textContent = 'Future Balance A = $' + Math.round(A).toLocaleString();
    intResEl.textContent = 'Interest Earned = $' + Math.round(totalInterest).toLocaleString() + ' (+' + gainPct.toFixed(1) + '% Return @ ' + r_pct + '% for ' + t + ' yrs)';
  }

  [pEl, rEl, tEl, nEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter starting initial principal investment P ($).',
      'Enter annual interest rate r (%).',
      'Enter duration time t in years.',
      'Select compounding frequency (Monthly, Annually, Quarterly, Daily).',
      'Inspect total accumulated future balance A and compound interest growth.'
    ],
    benefitTitle: 'Albert Einstein Eighth Wonder of the World',
    benefitContent: 'Compound interest earns interest on prior interest ($A = P(1+r/n)^{nt}$), generating exponential wealth growth that doubles capital rapidly according to the Rule of 72 ($T_{\text{double}} \approx 72 / r$).',
    faqs: [{ q: 'What is the Rule of 72?', a: 'Dividing 72 by the annual interest rate ($72 / r$) estimates the number of years required for an investment to double.' }]
  },

  // 21. Ohms Law Resistors in Series and Parallel Calculator
  {
    slug: 'ohms-law-resistors-in-series-and-parallel-calculator',
    name: 'Equivalent Resistance in Series & Parallel (R_eq = R₁ + R₂ vs 1/R_eq = 1/R₁ + 1/R₂) Calculator',
    description: 'Calculate equivalent circuit resistance for series circuits (R_series = R₁ + R₂ + R₃) and parallel circuits (1/R_parallel = 1/R₁ + 1/R₂ + 1/R₃) with total circuit current and branch current division for middle school and GCSE physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['resistors in series and parallel calculator', 'equivalent resistance formula r1 plus r2 online', 'parallel resistors calculator 1 over r1 plus 1 over r2', 'current divider circuit resistance calculator', 'gcse physics electric circuits resistance solver online'],
    order: 952,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistor R₁ (Ω), Resistor R₂ (Ω), Resistor R₃ (Ω) & Supply Voltage V (Volts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="res-r1">Resistor R₁ (Ω)</label>
          <input class="tool-textarea" id="res-r1" type="number" step="1" value="10.0" placeholder="10.0 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="res-r2">Resistor R₂ (Ω)</label>
          <input class="tool-textarea" id="res-r2" type="number" step="1" value="20.0" placeholder="20.0 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="res-r3">Resistor R₃ (Ω)</label>
          <input class="tool-textarea" id="res-r3" type="number" step="1" value="30.0" placeholder="30.0 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="res-v">Supply V (Volts)</label>
          <input class="tool-textarea" id="res-v" type="number" step="1" value="12.0" placeholder="12.0 V" />
        </div>
      </div>
      <div id="res-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="res-res-par" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Parallel R_eq = 5.45 Ω (I = 2.20 A)</span>
            <span class="stat-label">Parallel Equivalent Resistance (1/R_eq = Σ 1/R_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="res-res-ser" style="font-weight:700;">Series R_eq = 60.0 Ω (I = 0.20 A | Voltage Drops: 2V, 4V, 6V)</span>
            <span class="stat-label">Series Equivalent Resistance (R_eq = Σ R_i)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('res-r1'), r2El = document.getElementById('res-r2');
  const r3El = document.getElementById('res-r3'), vEl = document.getElementById('res-v');
  const parResEl = document.getElementById('res-res-par'), serResEl = document.getElementById('res-res-ser');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    const r3 = parseFloat(r3El.value), V = parseFloat(vEl.value);

    if (isNaN(r1) || isNaN(r2) || isNaN(r3) || isNaN(V) || r1 <= 0 || r2 <= 0 || r3 <= 0 || V <= 0) return;

    // Series: R_ser = r1 + r2 + r3
    const R_ser = r1 + r2 + r3;
    const I_ser = V / R_ser;

    // Parallel: 1/R_par = 1/r1 + 1/r2 + 1/r3
    const inv_par = (1.0 / r1) + (1.0 / r2) + (1.0 / r3);
    const R_par = 1.0 / inv_par;
    const I_par = V / R_par;

    parResEl.textContent = 'Parallel R_eq = ' + R_par.toFixed(2) + ' Ω (Total I = ' + I_par.toFixed(2) + ' A)';
    serResEl.textContent = 'Series R_eq = ' + R_ser.toFixed(1) + ' Ω (I = ' + I_ser.toFixed(2) + ' A | V_drops: ' + (I_ser*r1).toFixed(1) + 'V, ' + (I_ser*r2).toFixed(1) + 'V, ' + (I_ser*r3).toFixed(1) + 'V)';
  }

  [r1El, r2El, r3El, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter resistance values for Resistors $R_1, R_2$, and $R_3$ in Ohms ($\Omega$).',
      'Enter circuit DC supply voltage in Volts (V).',
      'Inspect equivalent resistance and total current drawn under Parallel ($1/R_{\text{eq}} = \sum 1/R$) and Series ($R_{\text{eq}} = \sum R$) configurations.'
    ],
    benefitTitle: 'Kirchhoff Circuit Rules and Resistance Laws',
    benefitContent: 'Connecting resistors in parallel reduces overall circuit resistance below the value of the smallest individual resistor ($R_{\text{eq}} < R_{\text{min}}$), providing multiple parallel current conduits.',
    faqs: [{ q: 'Why are household appliances wired in parallel rather than series?', a: 'Parallel wiring ensures every appliance receives the full mains voltage ($230\text{V} / 120\text{V}$) and operates independently if one device is switched off.' }]
  },

  // 22. Electrical Transformer Step-Up & Step-Down Turns Ratio Calculator
  {
    slug: 'transformer-step-up-step-down-efficiency-calculator',
    name: 'Electrical Transformer Step-Up & Step-Down Turns Ratio (V_p/V_s = N_p/N_s = I_s/I_p) Calculator',
    description: 'Calculate AC voltage transformation (V_p / V_s = N_p / N_s = I_s / I_p), coil turns ratio, primary/secondary current, and efficiency percentage (η = P_out / P_in · 100) for GCSE and high school physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['transformer calculator', 'transformer turns ratio formula vp over vs equals np over ns online', 'step up step down transformer voltage current calculator', 'primary secondary coil turns calculator physics', 'transformer efficiency electrical power online'],
    order: 953,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Voltage V_p (V), Primary Turns N_p, Secondary Turns N_s & Primary Current I_p (A)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="trf-vp">Primary V_p (V)</label>
          <input class="tool-textarea" id="trf-vp" type="number" step="10" value="230.0" placeholder="230 V (Mains)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trf-np">Primary Turns N_p</label>
          <input class="tool-textarea" id="trf-np" type="number" step="50" value="1000" placeholder="1000 Turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trf-ns">Secondary Turns N_s</label>
          <input class="tool-textarea" id="trf-ns" type="number" step="10" value="50" placeholder="50 Turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trf-ip">Primary I_p (A)</label>
          <input class="tool-textarea" id="trf-ip" type="number" step="0.1" value="0.50" placeholder="0.50 A" />
        </div>
      </div>
      <div id="trf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="trf-res-vs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_s = 11.50 Volts (Step-Down)</span>
            <span class="stat-label">Secondary Output Voltage (V_s = V_p · N_s / N_p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="trf-res-is" style="color:var(--green-dark); font-weight:700;">Secondary Current I_s = 10.00 A | Turns Ratio: 20 : 1 | Power = 115 W (Ideal)</span>
            <span class="stat-label">Secondary Current Output & Conservation of Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vpEl = document.getElementById('trf-vp'), npEl = document.getElementById('trf-np');
  const nsEl = document.getElementById('trf-ns'), ipEl = document.getElementById('trf-ip');
  const vsResEl = document.getElementById('trf-res-vs'), isResEl = document.getElementById('trf-res-is');

  function update() {
    const V_p = parseFloat(vpEl.value), N_p = parseFloat(npEl.value);
    const N_s = parseFloat(nsEl.value), I_p = parseFloat(ipEl.value);

    if (isNaN(V_p) || isNaN(N_p) || isNaN(N_s) || isNaN(I_p) || V_p <= 0 || N_p <= 0 || N_s <= 0 || I_p <= 0) return;

    // V_s = V_p * ( N_s / N_p )
    const V_s = V_p * (N_s / N_p);

    // In an ideal transformer: P_in = P_out => V_p * I_p = V_s * I_s
    // I_s = I_p * ( N_p / N_s )
    const I_s = I_p * (N_p / N_s);

    const P_in = V_p * I_p;
    const isStepUp = N_s > N_p;

    vsResEl.textContent = 'V_s = ' + V_s.toFixed(2) + ' Volts (' + (isStepUp ? 'Step-Up' : 'Step-Down') + ')';
    isResEl.textContent = 'Secondary Current I_s = ' + I_s.toFixed(2) + ' A | Turns Ratio ' + (N_p/N_s).toFixed(1) + ':1 | Power = ' + P_in.toFixed(1) + ' W';
  }

  [vpEl, npEl, nsEl, ipEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary coil input AC voltage $V_p$ (V).',
      'Enter primary coil number of wire turns $N_p$.',
      'Enter secondary coil number of wire turns $N_s$.',
      'Enter primary input current $I_p$ (A).',
      'Inspect stepped-up/stepped-down secondary output voltage $V_s$ and output current $I_s$.'
    ],
    benefitTitle: 'Michael Faraday Electromagnetic Mutual Induction',
    benefitContent: 'Alternating magnetic flux in an iron core links primary and secondary coils ($\frac{V_p}{V_s} = \frac{N_p}{N_s}$); by conservation of energy ($P = IV$), stepping voltage down increases secondary current proportionally.',
    faqs: [{ q: 'Why do transformers only work with AC and not DC?', a: 'Faraday induction requires a continuously changing magnetic flux ($d\Phi/dt$); steady DC current creates a constant magnetic field with zero induced secondary EMF.' }]
  },

  // 23. Radioactive Activity, Becquerel & Half-Life Decay Calculator
  {
    slug: 'radioactive-decay-activity-becquerel-half-life-calculator',
    name: 'Radioactive Decay Activity (A = A₀·(½)^(t/t_½)) & Becquerel Decay Calculator',
    description: 'Calculate radioisotope activity decay (A = A₀ · (½)^(t / t_½)) in Becquerels (Bq) and Curies (Ci), decay constant λ = ln 2 / t_½, and remaining radionuclide fraction for nuclear physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['radioactive activity calculator', 'becquerel decay formula a equals a0 half to the t over t half online', 'decay constant lambda ln 2 over half life calculator', 'nuclear radiation activity bq curies calculator', 'radioisotope half life decay solver online'],
    order: 954,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Activity A₀ (Bq or MBq), Half-Life t_½ & Elapsed Decay Time t',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rd-a0">Initial A₀ (MBq)</label>
          <input class="tool-textarea" id="rd-a0" type="number" step="10" value="100.0" placeholder="100.0 MBq" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-thalf">Half-Life (Days)</label>
          <input class="tool-textarea" id="rd-thalf" type="number" step="1" value="8.02" placeholder="8.02 Days (Iodine-131)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-t">Elapsed Time (Days)</label>
          <input class="tool-textarea" id="rd-t" type="number" step="1" value="24.06" placeholder="24.06 Days (3 Half-Lives)" />
        </div>
      </div>
      <div id="rd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rd-res-a" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Activity A = 12.50 MBq (12.5% Left)</span>
            <span class="stat-label">Remaining Radioactive Activity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rd-res-info" style="font-weight:700;">Decay Constant λ = 0.0864 day⁻¹ | Exactly 3.00 Half-Lives Elapsed</span>
            <span class="stat-label">Decay Rate Constant (λ = ln 2 / t_½) & Half-Life Cycles</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a0El = document.getElementById('rd-a0'), thEl = document.getElementById('rd-thalf'), tEl = document.getElementById('rd-t');
  const aResEl = document.getElementById('rd-res-a'), infResEl = document.getElementById('rd-res-info');

  function update() {
    const A0 = parseFloat(a0El.value), t_half = parseFloat(thEl.value), t = parseFloat(tEl.value);
    if (isNaN(A0) || isNaN(t_half) || isNaN(t) || A0 <= 0 || t_half <= 0 || t < 0) return;

    // Decay constant lambda = ln(2) / t_half
    const lambda = Math.LN2 / t_half;

    // A(t) = A0 * exp( -lambda * t ) = A0 * (0.5)^(t / t_half)
    const A_t = A0 * Math.pow(0.5, t / t_half);
    const pct_remain = (A_t / A0) * 100.0;
    const halfLivesElapsed = t / t_half;

    aResEl.textContent = 'Activity A = ' + A_t.toFixed(2) + ' MBq (' + pct_remain.toFixed(1) + '% Left)';
    infResEl.textContent = 'Decay Constant λ = ' + lambda.toFixed(4) + ' day⁻¹ | ' + halfLivesElapsed.toFixed(2) + ' Half-Lives Elapsed (t_½ = ' + t_half + ' d)';
  }

  [a0El, thEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial radioactive source activity $A_0$ in Megabecquerels (MBq).',
      'Enter radioisotope half-life $t_{1/2}$ (e.g. 8.02 days for Iodine-131, 6.0 hours for Technetium-99m).',
      'Enter elapsed decay time t.',
      'Inspect remaining nuclear activity in MBq and decay constant $\lambda = \frac{\ln 2}{t_{1/2}}$.'
    ],
    benefitTitle: 'Henri Becquerel & Marie Curie Radioactive Kinetics',
    benefitContent: 'Radioactive decay follows first-order exponential kinetics ($A = A_0 e^{-\lambda t}$); calculating residual isotope activity guarantees precise dosage delivery in nuclear medicine radiation therapy (e.g. Iodine-131 thyroid ablation).',
    faqs: [{ q: 'What is 1 Becquerel (Bq)?', a: '1 Becquerel equals exactly 1 nuclear radioactive disintegration per second ($1\text{ decay/s}$).' }]
  },

  // 24. Gravitational Potential Energy & Kinetic Energy Conservation Calculator
  {
    slug: 'gravitational-potential-energy-kinetic-energy-conservation-calculator',
    name: 'Conservation of Mechanical Energy (E_p = m·g·h ↔ E_k = ½·m·v²) Rollercoaster Calculator',
    description: 'Calculate gravitational potential energy (E_p = m·g·h), kinetic energy (E_k = ½·m·v²), and frictionless free-fall velocity (v = √(2·g·h)) under conservation of mechanical energy for physics students.',
    category: 'Science',
    icon: 'text',
    keywords: ['conservation of energy calculator', 'gravitational potential energy formula mgh online', 'kinetic energy formula half m v squared calculator', 'free fall velocity v equals sqrt 2gh calculator', 'rollercoaster conservation of energy physics online'],
    order: 955,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Object Mass m (kg) & Drop Height h (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="me-m">Mass m (kg)</label>
          <input class="tool-textarea" id="me-m" type="number" step="5" value="500" placeholder="500 kg (Rollercoaster)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="me-h">Height Drop h (m)</label>
          <input class="tool-textarea" id="me-h" type="number" step="5" value="45.0" placeholder="45.0 m Drop" />
        </div>
      </div>
      <div id="me-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="me-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bottom Speed v = 29.71 m/s (107.0 km/h)</span>
            <span class="stat-label">Maximum Speed at Bottom (v = √(2·g·h))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="me-res-e" style="font-weight:700;">Total Mechanical Energy E = 220.7 kJ (E_p = mgh at top = E_k = ½mv² at bottom)</span>
            <span class="stat-label">Conservation of Mechanical Energy Invariant</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('me-m'), hEl = document.getElementById('me-h');
  const vResEl = document.getElementById('me-res-v'), eResEl = document.getElementById('me-res-e');

  const g = 9.80665;

  function update() {
    const mass = parseFloat(mEl.value), h = parseFloat(hEl.value);
    if (isNaN(mass) || isNaN(h) || mass <= 0 || h < 0) return;

    // E_p = m * g * h  [Joules]
    const E_p = mass * g * h;
    const E_kJ = E_p / 1000.0;

    // By conservation of energy: E_p = E_k = 0.5 * m * v^2 => v = sqrt( 2 * g * h )
    const v = Math.sqrt(2.0 * g * h);
    const v_kmh = v * 3.6;

    vResEl.textContent = 'Bottom Speed v = ' + v.toFixed(2) + ' m/s (' + v_kmh.toFixed(1) + ' km/h)';
    eResEl.textContent = 'Total Mechanical Energy E = ' + E_kJ.toFixed(1) + ' kJ (m = ' + mass + ' kg @ h = ' + h + ' m, g = 9.81 m/s²)';
  }

  mEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter object/vehicle mass m in kilograms (kg).',
      'Enter vertical drop height h in meters (m).',
      'Inspect maximum bottom velocity $v = \sqrt{2gh}$ and total mechanical energy conserved in Kilojoules (kJ).'
    ],
    benefitTitle: 'Law of Conservation of Mechanical Energy',
    benefitContent: 'In a closed conservative system with negligible air resistance, potential energy converts completely into kinetic energy ($mgh = \frac{1}{2}mv^2$); terminal speed depends strictly on drop height and is completely independent of object mass.',
    faqs: [{ q: 'Why is final free-fall speed independent of mass?', a: 'Because mass appears linearly on both sides of the energy conservation equation ($mgh = \frac{1}{2}mv^2$), canceling out to yield $v = \sqrt{2gh}$.' }]
  },

  // 25. Chemical Moles, Mass & Molar Mass (n = m/M) Formula Calculator
  {
    slug: 'moles-mass-molar-mass-n-equals-m-over-mr-calculator',
    name: 'Chemical Moles, Mass & Molar Mass (n = m / M_r) Stoichiometry Triangle Calculator',
    description: 'Calculate chemical moles (n = m / M_r), mass in grams (m = n · M_r), and molar mass (M_r = m / n) using the fundamental chemistry mole triangle for GCSE and introductory high school science.',
    category: 'Science',
    icon: 'text',
    keywords: ['moles calculator', 'moles formula n equals m over mr online', 'chemistry mole triangle calculator grams to moles', 'molar mass mass moles calculator', 'stoichiometry mole calculation online'],
    order: 956,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass m (grams) & Substance Molar Mass M_r (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mt-m">Mass m (g)</label>
          <input class="tool-textarea" id="mt-m" type="number" step="any" value="44.0" placeholder="44.0 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-mr">Molar Mass M_r</label>
          <input class="tool-textarea" id="mt-mr" type="number" step="any" value="44.01" placeholder="44.01 g/mol (CO₂)" />
        </div>
      </div>
      <div id="mt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mt-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">n = 1.000 Mole (mol)</span>
            <span class="stat-label">Chemical Substance Amount (n = m / M_r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mt-res-molc" style="color:var(--green-dark); font-weight:700;">6.022 × 10²³ Molecules (1 Avogadro Constant unit)</span>
            <span class="stat-label">Exact Particle Count N = n · N_A</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mt-m'), mrEl = document.getElementById('mt-mr');
  const nResEl = document.getElementById('mt-res-n'), molcResEl = document.getElementById('mt-res-molc');

  const N_A = 6.02214e23;

  function update() {
    const mass = parseFloat(mEl.value), M_r = parseFloat(mrEl.value);
    if (isNaN(mass) || isNaN(M_r) || mass < 0 || M_r <= 0) return;

    // n = mass / M_r
    const n = mass / M_r;
    const molecules = n * N_A;

    nResEl.textContent = 'n = ' + n.toFixed(3) + ' Moles (mol)';
    molcResEl.textContent = molecules.toExponential(2) + ' Molecules / Formula Units (Mass: ' + mass + ' g / ' + M_r + ' g/mol)';
  }

  mEl.addEventListener('input', update);
  mrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter sample mass in grams (g).',
      'Enter substance molecular/atomic molar mass in g/mol from the periodic table.',
      'Inspect calculated number of moles $n = m / M_r$ and total particle count ($N = n \times 6.022 \times 10^{23}$).'
    ],
    benefitTitle: 'The Central Mole Concept in Chemistry',
    benefitContent: 'The mole is the SI base unit connecting macroscopic measurable lab masses in grams with submicroscopic atom counts ($1\text{ mole} = 6.022 \times 10^{23}\text{ particles}$), forming the essential bridge for all chemical reactions.',
    faqs: [{ q: 'What is the molar mass of Carbon-12?', a: 'By definition, 1 mole of Carbon-12 has a molar mass of exactly $12.000\text{ g/mol}$.' }]
  }
];

pack32Tools.forEach(createTool);
console.log('Pack 32 complete: 25 tools created.');
