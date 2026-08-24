const { createTool } = require('./generate-curated-tools.cjs');

// Suite M: 5 Tools in RC Filters, RLC Resonators, Electrostatics & Transformers
const toolsSuiteM = [
  // 1. RC Low-Pass Filter Cutoff Frequency Calculator
  {
    slug: 'rc-low-pass-filter-cutoff-calculator',
    name: 'RC Low-Pass Filter Cutoff Frequency Calculator',
    description: 'Calculate -3dB cutoff frequency (f_c = 1 / (2π·R·C)), attenuation, and phase lag for passive analog RC low-pass filters.',
    category: 'Science',
    icon: 'text',
    keywords: ['rc low pass filter calculator', 'cutoff frequency calculator rc', 'passive filter 3db frequency', 'low pass filter r c values', 'rc filter attenuation phase shift'],
    order: 244,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Filter Resistor (R) & Capacitor (C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lpf-r">Resistor R (Ohms Ω)</label>
          <input class="tool-textarea" id="lpf-r" type="number" step="any" value="10000" placeholder="10,000 Ω (10 kΩ)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lpf-c">Capacitor C (microfarads μF)</label>
          <input class="tool-textarea" id="lpf-c" type="number" step="any" value="0.1" placeholder="0.1 μF (100 nF)" />
        </div>
      </div>
      <div id="lpf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lpf-res-fc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">159.15 Hz</span>
            <span class="stat-label">Cutoff Frequency (-3dB Corner)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lpf-res-tau" style="font-weight:700;">1.00 ms</span>
            <span class="stat-label">Time Constant (τ = R·C)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('lpf-r'), cEl = document.getElementById('lpf-c');
  const fcEl = document.getElementById('lpf-res-fc'), tauEl = document.getElementById('lpf-res-tau');

  function update() {
    const R = parseFloat(rEl.value), cUf = parseFloat(cEl.value);
    if (isNaN(R) || isNaN(cUf) || R <= 0 || cUf <= 0) return;

    const C = cUf * 1e-6;
    // fc = 1 / (2 * pi * R * C)
    const fc = 1 / (2 * Math.PI * R * C);
    const tauSec = R * C;
    const tauMs = tauSec * 1000;

    fcEl.textContent = fc >= 1e6 ? (fc / 1e6).toFixed(2) + ' MHz' : (fc >= 1e3 ? (fc / 1e3).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz');
    tauEl.textContent = tauMs >= 1000 ? (tauMs / 1000).toFixed(2) + ' s' : (tauMs < 1 ? (tauMs * 1000).toFixed(1) + ' μs' : tauMs.toFixed(2) + ' ms');
  }

  rEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter filter resistance in Ohms (Ω).',
      'Enter capacitance in microfarads (μF).',
      'Inspect the -3dB corner frequency where signal power drops by 50%.'
    ],
    benefitTitle: 'Noise Suppression in Audio and ADC Lines',
    benefitContent: 'RC low-pass filters allow low-frequency signals to pass unhindered while rolling off high-frequency electromagnetic interference (EMI) and anti-aliasing noise at 20 dB/decade.',
    faqs: [{ q: 'What is the signal attenuation at the cutoff frequency?', a: 'At f_c, output voltage drops to 70.7% of input voltage (1/√2), representing exactly -3.01 dB power attenuation and a 45° phase lag.' }]
  },

  // 2. RC High-Pass Filter Cutoff Frequency Calculator
  {
    slug: 'rc-high-pass-filter-cutoff-calculator',
    name: 'RC High-Pass Filter Cutoff Frequency Calculator',
    description: 'Calculate cutoff frequency (f_c = 1 / (2π·R·C)) and DC blocking behavior for passive RC high-pass filters in audio AC coupling stages.',
    category: 'Science',
    icon: 'text',
    keywords: ['rc high pass filter calculator', 'ac coupling capacitor calculator', 'high pass filter cutoff formula', 'dc blocking filter frequency online', 'passive high pass rc circuit'],
    order: 245,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Filter Capacitor (C) & Resistor (R)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hpf-c">Capacitor C (microfarads μF)</label>
          <input class="tool-textarea" id="hpf-c" type="number" step="any" value="4.7" placeholder="4.7 μF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hpf-r">Resistor R (Ohms Ω)</label>
          <input class="tool-textarea" id="hpf-r" type="number" step="any" value="47000" placeholder="47,000 Ω (47 kΩ)" />
        </div>
      </div>
      <div id="hpf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hpf-res-fc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.72 Hz</span>
            <span class="stat-label">High-Pass Cutoff Frequency (-3dB)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hpf-res-tau" style="font-weight:700;">220.9 ms</span>
            <span class="stat-label">Time Constant (τ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('hpf-c'), rEl = document.getElementById('hpf-r');
  const fcEl = document.getElementById('hpf-res-fc'), tauEl = document.getElementById('hpf-res-tau');

  function update() {
    const cUf = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(cUf) || isNaN(R) || cUf <= 0 || R <= 0) return;

    const C = cUf * 1e-6;
    // fc = 1 / (2 * pi * R * C)
    const fc = 1 / (2 * Math.PI * R * C);
    const tauSec = R * C;

    fcEl.textContent = fc >= 1e3 ? (fc / 1e3).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz';
    tauEl.textContent = (tauSec * 1000).toFixed(1) + ' ms';
  }

  cEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter coupling capacitance in microfarads (μF).',
      'Enter load termination resistance in Ohms (Ω).',
      'Inspect the sub-audible DC blocking cutoff frequency.'
    ],
    benefitTitle: 'AC Coupling in Audio Electronics',
    benefitContent: 'RC high-pass filters block direct current (0 Hz DC offset) while allowing alternating audio and RF signals above f_c to pass without clipping amplifier inputs.',
    faqs: [{ q: 'Why is f_c designed below 20 Hz in audio amplifiers?', a: 'Human hearing spans 20 Hz to 20,000 Hz; setting f_c < 10 Hz ensures flat bass frequency response with zero sub-bass phase distortion.' }]
  },

  // 3. RLC Resonant Frequency & Q-Factor Calculator
  {
    slug: 'rlc-resonant-frequency-q-factor-calculator',
    name: 'RLC Resonant Frequency & Q-Factor Calculator',
    description: 'Calculate natural resonant frequency (f₀ = 1 / (2π·√(L·C))), Quality Factor (Q), and -3dB bandwidth (BW) for series and parallel RLC tuned circuits.',
    category: 'Science',
    icon: 'text',
    keywords: ['rlc resonant frequency calculator', 'q factor calculator rlc', 'lc resonance tank circuit calculator', 'series parallel rlc bandwidth formula', 'radio tuner lc calculator online'],
    order: 246,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inductance (L), Capacitance (C) & Resistance (R)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rlc-l">Inductance L (millihenries mH)</label>
          <input class="tool-textarea" id="rlc-l" type="number" step="any" value="10" placeholder="10 mH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rlc-c">Capacitance C (nanofarads nF)</label>
          <input class="tool-textarea" id="rlc-c" type="number" step="any" value="100" placeholder="100 nF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rlc-r">Series Resistance R (Ω)</label>
          <input class="tool-textarea" id="rlc-r" type="number" step="any" value="10" placeholder="10 Ω" />
        </div>
      </div>
      <div id="rlc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rlc-res-f0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.03 kHz</span>
            <span class="stat-label">Resonant Frequency (f₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rlc-res-q" style="font-weight:700;">Q = 31.62</span>
            <span class="stat-label">Quality Factor (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rlc-res-bw">159.15 Hz</span>
            <span class="stat-label">Tuned Bandwidth (BW = f₀ / Q)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('rlc-l'), cEl = document.getElementById('rlc-c'), rEl = document.getElementById('rlc-r');
  const f0El = document.getElementById('rlc-res-f0'), qEl = document.getElementById('rlc-res-q'), bwEl = document.getElementById('rlc-res-bw');

  function update() {
    const lMh = parseFloat(lEl.value), cNf = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(lMh) || isNaN(cNf) || isNaN(R) || lMh <= 0 || cNf <= 0 || R <= 0) return;

    const L = lMh * 1e-3;
    const C = cNf * 1e-9;

    // f0 = 1 / (2 * pi * sqrt(L * C))
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));
    // Q (series) = (1 / R) * sqrt(L / C)
    const Q = (1 / R) * Math.sqrt(L / C);
    // Bandwidth BW = f0 / Q
    const bw = f0 / Q;

    f0El.textContent = f0 >= 1e6 ? (f0 / 1e6).toFixed(3) + ' MHz' : (f0 >= 1e3 ? (f0 / 1e3).toFixed(2) + ' kHz' : f0.toFixed(1) + ' Hz');
    qEl.textContent = 'Q = ' + Q.toFixed(2);
    bwEl.textContent = bw >= 1e3 ? (bw / 1e3).toFixed(2) + ' kHz' : bw.toFixed(1) + ' Hz';
  }

  [lEl, cEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inductance in millihenries (mH).',
      'Enter capacitance in nanofarads (nF).',
      'Enter series resistance in Ohms (Ω).',
      'Inspect resonant center frequency (f₀), circuit selectivity (Q), and -3dB passband bandwidth.'
    ],
    benefitTitle: 'Radio Station Selection via LC Tanks',
    benefitContent: 'At resonance, inductive reactance cancels capacitive reactance (X_L = X_C), causing series circuit impedance to collapse to pure resistance R and creating a sharp bandpass window for radio receiver tuning.',
    faqs: [{ q: 'What does a high Q factor indicate?', a: 'A high Q factor (>50) indicates low resistive energy losses and a very sharp, highly selective frequency passband.' }]
  },

  // 4. Coulomb's Law Electrostatic Force Calculator
  {
    slug: 'coulomb-electrostatic-force-calculator',
    name: 'Coulomb\'s Law Electrostatic Force Calculator',
    description: 'Calculate electrostatic attraction and repulsion forces (F = k_e · |q₁·q₂| / r²) between point charges in microcoulombs (μC) and separation distance.',
    category: 'Science',
    icon: 'text',
    keywords: ['coulombs law calculator', 'electrostatic force calculator', 'coulomb constant ke formula', 'point charges electric force online', 'attraction repulsion electric charges'],
    order: 247,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Point Charges (μC) & Separation Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cou-q1">Charge q₁ (microcoulombs μC)</label>
          <input class="tool-textarea" id="cou-q1" type="number" step="any" value="5.0" placeholder="+5.0 μC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cou-q2">Charge q₂ (microcoulombs μC)</label>
          <input class="tool-textarea" id="cou-q2" type="number" step="any" value="-10.0" placeholder="-10.0 μC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cou-r">Separation Distance r (meters)</label>
          <input class="tool-textarea" id="cou-r" type="number" step="any" value="0.5" placeholder="0.5 m" />
        </div>
      </div>
      <div id="cou-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cou-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.80 N</span>
            <span class="stat-label">Electrostatic Force Magnitude (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cou-res-type" style="color:#2563eb; font-weight:700;">Attractive (Opposite Charges)</span>
            <span class="stat-label">Interaction Behavior</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q1El = document.getElementById('cou-q1'), q2El = document.getElementById('cou-q2'), rEl = document.getElementById('cou-r');
  const fEl = document.getElementById('cou-res-force'), tEl = document.getElementById('cou-res-type');

  const ke = 8.9875517923e9; // Coulomb's constant N·m²/C²

  function update() {
    const q1Uc = parseFloat(q1El.value), q2Uc = parseFloat(q2El.value), r = parseFloat(rEl.value);
    if (isNaN(q1Uc) || isNaN(q2Uc) || isNaN(r) || r <= 0) return;

    const q1 = q1Uc * 1e-6;
    const q2 = q2Uc * 1e-6;

    // F = ke * |q1 * q2| / r^2
    const force = ke * (Math.abs(q1 * q2) / Math.pow(r, 2));

    fEl.textContent = force >= 1000 ? force.toExponential(3) + ' N' : force.toFixed(2) + ' N (Newtons)';

    if ((q1 * q2) < 0) {
      tEl.textContent = 'Attractive (Opposite Signs: + and -)';
      tEl.style.color = '#2563eb';
    } else {
      tEl.textContent = 'Repulsive (Like Signs: repel)';
      tEl.style.color = '#c53030';
    }
  }

  [q1El, q2El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter charge q₁ and charge q₂ in microcoulombs (μC) (use negative numbers for negative charges).',
      'Enter distance separation r in meters.',
      'Inspect electrostatic force in Newtons and determine attraction vs repulsion.'
    ],
    benefitTitle: 'Inverse-Square Electrostatic Field Law',
    benefitContent: 'Charles-Augustin de Coulomb proved in 1785 that electrostatic force scales with the product of charges and decreases with the inverse square of separation distance (F ∝ 1/r²).',
    faqs: [{ q: 'What is Coulomb\'s constant ke?', a: 'ke = 1 / (4πε₀) ≈ 8.988 × 10⁹ N·m²/C².' }]
  },

  // 5. Transformer Turns Ratio, Voltage & Current Calculator
  {
    slug: 'transformer-turns-ratio-voltage-current-calculator',
    name: 'Transformer Turns Ratio & Voltage Calculator',
    description: 'Calculate primary/secondary winding voltage, current, and turns ratio (V_p / V_s = N_p / N_s = I_s / I_p) for step-up and step-down AC transformers.',
    category: 'Science',
    icon: 'text',
    keywords: ['transformer turns ratio calculator', 'step down transformer voltage calculator', 'step up transformer current calculator', 'transformer np ns vp vs formula', 'ac transformer power online'],
    order: 248,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Winding & Secondary Turns',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-vp">Primary Voltage V_p (Volts)</label>
          <input class="tool-textarea" id="tr-vp" type="number" step="any" value="230" placeholder="230 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-np">Primary Turns (N_p)</label>
          <input class="tool-textarea" id="tr-np" type="number" step="1" value="1000" placeholder="1000 turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-ns">Secondary Turns (N_s)</label>
          <input class="tool-textarea" id="tr-ns" type="number" step="1" value="50" placeholder="50 turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-is">Secondary Load Current (Amps)</label>
          <input class="tool-textarea" id="tr-is" type="number" step="any" value="5.0" placeholder="5.0 A" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-vs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.50 Volts AC</span>
            <span class="stat-label">Secondary Voltage (V_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-type" style="color:#2563eb; font-weight:700;">Step-Down (20.0 : 1)</span>
            <span class="stat-label">Transformer Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-ip">0.25 A (57.5 VA)</span>
            <span class="stat-label">Primary Current (I_p)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vpEl = document.getElementById('tr-vp'), npEl = document.getElementById('tr-np'), nsEl = document.getElementById('tr-ns'), isEl = document.getElementById('tr-is');
  const vsEl = document.getElementById('tr-res-vs'), tEl = document.getElementById('tr-res-type'), ipEl = document.getElementById('tr-res-ip');

  function update() {
    const Vp = parseFloat(vpEl.value), Np = parseFloat(npEl.value), Ns = parseFloat(nsEl.value), Is = parseFloat(isEl.value);
    if (isNaN(Vp) || isNaN(Np) || isNaN(Ns) || isNaN(Is) || Vp <= 0 || Np <= 0 || Ns <= 0 || Is < 0) return;

    // Ratio a = Np / Ns
    const a = Np / Ns;
    // Vs = Vp / a = Vp * (Ns / Np)
    const Vs = Vp * (Ns / Np);
    // Ip = Is / a = Is * (Ns / Np)
    const Ip = Is * (Ns / Np);
    const powerVa = Vs * Is;

    vsEl.textContent = Vs.toFixed(2) + ' Volts AC';
    ipEl.textContent = Ip.toFixed(3) + ' A (' + powerVa.toFixed(1) + ' VA)';

    if (a > 1) {
      tEl.textContent = 'Step-Down (' + a.toFixed(1) + ' : 1)';
      tEl.style.color = '#2563eb';
    } else if (a < 1) {
      tEl.textContent = 'Step-Up (1 : ' + (1 / a).toFixed(1) + ')';
      tEl.style.color = '#c53030';
    } else {
      tEl.textContent = '1:1 Isolation Transformer';
      tEl.style.color = '#22543d';
    }
  }

  [vpEl, npEl, nsEl, isEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary AC mains voltage (V_p) (e.g. 120V or 230V).',
      'Enter primary coil winding turns (N_p) and secondary winding turns (N_s).',
      'Enter expected secondary load current in Amperes.',
      'Inspect output stepped voltage, turns ratio, and reflected primary current.'
    ],
    benefitTitle: 'Faraday\'s Law of Mutual Induction',
    benefitContent: 'Transformers transfer electrical power between circuits through electromagnetic flux linkage (P_in = P_out in ideal transformers), stepping voltage up or down with inverse current scaling.',
    faqs: [{ q: 'Can transformers operate on direct current (DC)?', a: 'No, transformers require changing magnetic flux (dΦ/dt) generated by alternating current (AC).' }]
  }
];

toolsSuiteM.forEach(createTool);
console.log('Suite M complete: 5 tools created.');
