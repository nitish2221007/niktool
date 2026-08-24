const { createTool } = require('./generate-curated-tools.cjs');

// Suite K: 5 Tools in Electronics, RF, Antennas & Op-Amp Circuits
const toolsSuiteK = [
  // 1. Wheatstone Bridge Resistance Calculator
  {
    slug: 'wheatstone-bridge-resistor-calculator',
    name: 'Wheatstone Bridge Unknown Resistor Calculator',
    description: 'Calculate unknown resistance (R_x = R₂ · R₃ / R₁) in balanced Wheatstone bridge circuits for strain gauges, thermistors, and precision sensors.',
    category: 'Science',
    icon: 'text',
    keywords: ['wheatstone bridge calculator', 'balanced bridge resistance formula', 'strain gauge bridge calculator', 'bridge circuit unknown resistor', 'precision resistance measurement online'],
    order: 234,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bridge Resistor Values (Ohms Ω)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wb-r1">Resistor R₁ (Ω)</label>
          <input class="tool-textarea" id="wb-r1" type="number" step="any" value="100" placeholder="100 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-r2">Resistor R₂ (Ω)</label>
          <input class="tool-textarea" id="wb-r2" type="number" step="any" value="100" placeholder="100 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-r3">Resistor R₃ (Ω)</label>
          <input class="tool-textarea" id="wb-r3" type="number" step="any" value="250" placeholder="250 Ω" />
        </div>
      </div>
      <div id="wb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wb-res-rx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">250.00 Ω</span>
            <span class="stat-label">Unknown Resistance (R_x)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wb-res-ratio">1.000</span>
            <span class="stat-label">Bridge Ratio (R₂ / R₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('wb-r1'), r2El = document.getElementById('wb-r2'), r3El = document.getElementById('wb-r3');
  const rxEl = document.getElementById('wb-res-rx'), ratEl = document.getElementById('wb-res-ratio');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), r3 = parseFloat(r3El.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(r3) || r1 <= 0 || r2 <= 0 || r3 <= 0) return;

    // Rx = (R2 * R3) / R1
    const rx = (r2 * r3) / r1;
    const ratio = r2 / r1;

    rxEl.textContent = rx >= 1000 ? (rx / 1000).toFixed(2) + ' kΩ' : rx.toFixed(2) + ' Ω';
    ratEl.textContent = ratio.toFixed(3);
  }

  [r1El, r2El, r3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ratio arm resistors R₁ and R₂ in Ohms.',
      'Enter standard adjustable resistor R₃ in Ohms.',
      'Inspect the computed unknown resistance R_x when the galvanometer detects zero voltage (balanced null state).'
    ],
    benefitTitle: 'High Precision Null-Balance Measurements',
    benefitContent: 'Invented by Samuel Hunter Christie and popularized by Sir Charles Wheatstone in 1843, bridge circuits eliminate lead resistance errors by measuring when differential bridge voltage drops to zero.',
    faqs: [{ q: 'Where are Wheatstone bridges used today?', a: 'They are widely used in strain gauges, load cells, RTD temperature sensors, and pressure transducers.' }]
  },

  // 2. Operational Amplifier Inverting & Non-Inverting Gain Calculator
  {
    slug: 'op-amp-inverting-noninverting-gain-calculator',
    name: 'Operational Amplifier (Op-Amp) Voltage Gain Calculator',
    description: 'Calculate closed-loop voltage gain (Av), output voltage (V_out), and phase inversion for Inverting (Av = -Rf / Rin) and Non-Inverting (Av = 1 + Rf / Rin) op-amp circuits.',
    category: 'Science',
    icon: 'text',
    keywords: ['op amp gain calculator', 'inverting op amp calculator', 'non inverting op amp formula', 'operational amplifier voltage gain', 'op amp rf rin calculator online'],
    order: 235,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistors & Input Signal Voltage',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="oa-rin">Input Resistor R_in (kΩ)</label>
          <input class="tool-textarea" id="oa-rin" type="number" step="any" value="10" placeholder="10 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="oa-rf">Feedback Resistor R_f (kΩ)</label>
          <input class="tool-textarea" id="oa-rf" type="number" step="any" value="100" placeholder="100 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="oa-vin">Input Voltage V_in (Volts)</label>
          <input class="tool-textarea" id="oa-vin" type="number" step="any" value="0.5" placeholder="0.5 V" />
        </div>
      </div>
      <div id="oa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="oa-res-inv" style="color:#c53030; font-weight:800; font-size:1.5rem;">-10.0x (-5.0V)</span>
            <span class="stat-label">Inverting Configuration (180° Inverted)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="oa-res-noninv" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">+11.0x (+5.5V)</span>
            <span class="stat-label">Non-Inverting Configuration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rinEl = document.getElementById('oa-rin'), rfEl = document.getElementById('oa-rf'), vinEl = document.getElementById('oa-vin');
  const invEl = document.getElementById('oa-res-inv'), nonEl = document.getElementById('oa-res-noninv');

  function update() {
    const rin = parseFloat(rinEl.value), rf = parseFloat(rfEl.value), vin = parseFloat(vinEl.value);
    if (isNaN(rin) || isNaN(rf) || isNaN(vin) || rin <= 0 || rf < 0) return;

    // Inverting: Av = -Rf / Rin, Vout = Av * Vin
    const avInv = -rf / rin;
    const voutInv = avInv * vin;

    // Non-Inverting: Av = 1 + (Rf / Rin), Vout = Av * Vin
    const avNon = 1 + (rf / rin);
    const voutNon = avNon * vin;

    invEl.textContent = avInv.toFixed(1) + 'x (' + (voutInv >= 0 ? '+' : '') + voutInv.toFixed(2) + 'V)';
    nonEl.textContent = '+' + avNon.toFixed(1) + 'x (' + (voutNon >= 0 ? '+' : '') + voutNon.toFixed(2) + 'V)';
  }

  [rinEl, rfEl, vinEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter input resistor R_in and feedback resistor R_f in kilo-Ohms (kΩ).',
      'Enter input voltage signal V_in in Volts.',
      'Inspect voltage gain multiplier and output voltage for both Inverting and Non-Inverting op-amp topologies.'
    ],
    benefitTitle: 'Negative Feedback Stability',
    benefitContent: 'Operational amplifiers have immense open-loop gain (>100,000x). Applying negative feedback through R_f provides predictable, linear, and temperature-stable closed-loop gain.',
    faqs: [{ q: 'What is a Voltage Follower (Buffer)?', a: 'Setting Rf = 0 Ω in a non-inverting op-amp yields a gain of exactly Av = +1.0x with near-infinite input impedance and zero output impedance.' }]
  },

  // 3. Quarter-Wave (λ/4) Whip Antenna Length Calculator
  {
    slug: 'quarter-wave-antenna-length-calculator',
    name: 'Quarter-Wave (λ/4) Whip Antenna Length Calculator',
    description: 'Calculate resonant quarter-wave (λ/4) antenna element physical length in centimeters and inches for Wi-Fi, Ham Radio, FM, and LoRa frequencies.',
    category: 'Science',
    icon: 'text',
    keywords: ['quarter wave antenna calculator', 'whip antenna length calculator', 'lambda 4 antenna formula', 'ham radio antenna length online', 'dipole antenna length mhz calculator'],
    order: 236,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Radio Frequency (MHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ant-freq">Carrier Frequency (MHz)</label>
          <input class="tool-textarea" id="ant-freq" type="number" step="any" value="433.92" placeholder="433.92 MHz (LoRa / ISM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ant-vf">Velocity Factor (VF) [0.95 for bare wire]</label>
          <input class="tool-textarea" id="ant-vf" type="number" min="0.5" max="1.0" step="0.01" value="0.95" placeholder="0.95" />
        </div>
      </div>
      <div id="ant-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ant-res-cm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16.41 cm</span>
            <span class="stat-label">Resonant λ/4 Element Length (cm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ant-res-in" style="font-weight:700;">6.46 Inches</span>
            <span class="stat-label">Length in Inches</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ant-res-lambda">65.65 cm</span>
            <span class="stat-label">Full Wavelength (λ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ant-freq'), vfEl = document.getElementById('ant-vf');
  const cmEl = document.getElementById('ant-res-cm'), inEl = document.getElementById('ant-res-in'), lamEl = document.getElementById('ant-res-lambda');

  const c = 299.792458; // speed of light in mm*MHz (or million m/s / MHz => meters * MHz)

  function update() {
    const fMhz = parseFloat(fEl.value), vf = parseFloat(vfEl.value);
    if (isNaN(fMhz) || isNaN(vf) || fMhz <= 0 || vf <= 0 || vf > 1.0) return;

    // Full wavelength lambda (meters) = (c / f)
    const lambdaM = c / fMhz;
    const lambdaCm = lambdaM * 100;
    // Quarter wave length = (lambda / 4) * VF
    const qWaveM = (lambdaM / 4) * vf;
    const qWaveCm = qWaveM * 100;
    const qWaveInches = qWaveM * 39.3701;

    cmEl.textContent = qWaveCm.toFixed(2) + ' cm';
    inEl.textContent = qWaveInches.toFixed(2) + ' Inches';
    lamEl.textContent = lambdaCm >= 100 ? (lambdaCm / 100).toFixed(2) + ' meters' : lambdaCm.toFixed(1) + ' cm';
  }

  fEl.addEventListener('input', update);
  vfEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter radio transmission frequency in Megahertz (MHz) (e.g. 144 MHz 2m Ham, 433 MHz LoRa, 868/915 MHz, 2400 MHz Wi-Fi).',
      'Enter conductor velocity factor (0.95 is standard for copper whip wire).',
      'Inspect physical antenna cut length.'
    ],
    benefitTitle: 'Resonant Quarter-Wave Monopoles',
    benefitContent: 'A quarter-wavelength wire mounted over a ground plane achieves natural electrical resonance at its design frequency, delivering ~36.5 Ω feedpoint impedance with minimal standing wave reflections (low SWR).',
    faqs: [{ q: 'What is the length of a 2.4 GHz Wi-Fi quarter-wave antenna?', a: 'At 2,400 MHz, a quarter-wave antenna element is approximately 2.97 cm (1.17 inches) long.' }]
  },

  // 4. dBm to Milliwatts & Watts Power Converter
  {
    slug: 'dbm-to-milliwatts-watts-converter',
    name: 'dBm to Milliwatts & Watts RF Power Converter',
    description: 'Convert logarithmic RF signal power (dBm) to linear power in Milliwatts (mW), Watts (W), and dBW in real time.',
    category: 'Science',
    icon: 'text',
    keywords: ['dbm to watts converter', 'dbm to milliwatts calculator', 'rf power dbm converter', 'dbw to dbm calculator online', 'signal strength dbm to mw formula'],
    order: 237,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'RF Power Values (dBm, mW, Watts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rf-dbm">Power in dBm (dBm)</label>
          <input class="tool-textarea" id="rf-dbm" type="number" step="any" value="20" placeholder="20 dBm (Wi-Fi Max)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-mw">Milliwatts (mW)</label>
          <input class="tool-textarea" id="rf-mw" type="number" step="any" placeholder="100 mW" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-w">Watts (W)</label>
          <input class="tool-textarea" id="rf-w" type="number" step="any" placeholder="0.10 W" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dbmEl = document.getElementById('rf-dbm'), mwEl = document.getElementById('rf-mw'), wEl = document.getElementById('rf-w');

  function updateFromDbm(dbm) {
    // P_mW = 10^(dBm / 10)
    const mw = Math.pow(10, dbm / 10);
    const w = mw / 1000;

    mwEl.value = mw >= 1000 ? (mw).toFixed(1) : mw.toFixed(3);
    wEl.value = w.toFixed(5);
  }

  dbmEl.addEventListener('input', () => {
    const v = parseFloat(dbmEl.value);
    if (!isNaN(v)) updateFromDbm(v);
  });

  mwEl.addEventListener('input', () => {
    const v = parseFloat(mwEl.value);
    if (!isNaN(v) && v > 0) {
      const dbm = 10 * Math.log10(v);
      dbmEl.value = dbm.toFixed(2);
      wEl.value = (v / 1000).toFixed(5);
    }
  });

  wEl.addEventListener('input', () => {
    const v = parseFloat(wEl.value);
    if (!isNaN(v) && v > 0) {
      const mw = v * 1000;
      const dbm = 10 * Math.log10(mw);
      dbmEl.value = dbm.toFixed(2);
      mwEl.value = mw.toFixed(3);
    }
  });

  updateFromDbm(20);
})();`,
    howToSteps: [
      'Enter power in dBm, Milliwatts, or Watts.',
      'Inspect conversions across linear and logarithmic radio frequency power standards.'
    ],
    benefitTitle: 'Why RF Engineers Prefer dBm',
    benefitContent: 'dBm expresses power referenced to 1 milliwatt (0 dBm = 1 mW). A 3 dB increase doubles power (23 dBm = 200 mW), while a 10 dB increase represents a 10x power jump (30 dBm = 1 Watt).',
    faqs: [{ q: 'What is 0 dBm in Watts?', a: '0 dBm = exactly 1.0 Milliwatt (0.001 Watts).' }]
  },

  // 5. AC Conductor Skin Depth Calculator
  {
    slug: 'skin-depth-ac-conductor-calculator',
    name: 'AC Conductor Skin Depth (Skin Effect) Calculator',
    description: 'Calculate high-frequency electromagnetic skin depth (δ = √(ρ / (π · f · μ))) in copper, aluminum, and gold conductors for RF inductors and PCB traces.',
    category: 'Science',
    icon: 'text',
    keywords: ['skin depth calculator', 'skin effect calculator copper', 'ac conductor resistance frequency', 'rf skin depth formula online', 'high frequency eddy currents skin depth'],
    order: 238,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Frequency & Conductor Material',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sd-freq">Frequency (kHz / MHz)</label>
          <input class="tool-textarea" id="sd-freq" type="number" step="any" value="10" placeholder="10 MHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sd-unit">Frequency Unit</label>
          <select class="tool-textarea" id="sd-unit">
            <option value="1e3">Kilohertz (kHz)</option>
            <option value="1e6" selected>Megahertz (MHz)</option>
            <option value="1e9">Gigahertz (GHz)</option>
            <option value="1">Hertz (Hz)</option>
          </select>
        </div>
      </div>
      <div id="sd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sd-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">20.87 μm</span>
            <span class="stat-label">Copper Skin Depth (δ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-mil">0.82 mils</span>
            <span class="stat-label">Imperial Mils</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('sd-freq'), uEl = document.getElementById('sd-unit');
  const dEl = document.getElementById('sd-res-delta'), mEl = document.getElementById('sd-res-mil');

  const rhoCopper = 1.68e-8; // Copper resistivity (Ohm*m)
  const mu0 = 4 * Math.PI * 1e-7; // Vacuum permeability

  function update() {
    const rawF = parseFloat(fEl.value), mult = parseFloat(uEl.value);
    if (isNaN(rawF) || rawF <= 0) return;

    const fHz = rawF * mult;
    // delta = sqrt(rho / (pi * f * mu))
    const deltaM = Math.sqrt(rhoCopper / (Math.PI * fHz * mu0));
    const deltaUm = deltaM * 1e6;
    const deltaMils = deltaM * 39370.1;

    dEl.textContent = deltaUm >= 1000 ? (deltaUm / 1000).toFixed(2) + ' mm' : deltaUm.toFixed(2) + ' μm';
    mEl.textContent = deltaMils.toFixed(2) + ' mils';
  }

  fEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter alternating current frequency and select unit (Hz, kHz, MHz, GHz).',
      'Inspect the calculated copper skin depth penetration (δ).'
    ],
    benefitTitle: 'Why High-Frequency AC Flows Only on Conductor Surfaces',
    benefitContent: 'At high frequencies, eddy currents oppose internal current flow, confining 63% of the current to a thin outer surface layer of depth δ. Litz wire and hollow tubing are used to maximize surface area and minimize AC resistance.',
    faqs: [{ q: 'What is copper skin depth at 50/60 Hz power mains?', a: 'At 60 Hz, copper skin depth is approximately 8.5 mm (0.33 inches), meaning thick cables waste copper without hollow core design.' }]
  }
];

toolsSuiteK.forEach(createTool);
console.log('Suite K complete: 5 tools created.');
