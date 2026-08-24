const { createTool } = require('./generate-curated-tools.cjs');

// Suite QQ: 5 Tools in Transistors, 555 Timers, LM317 & Zener Regulators to reach 525 tools
const toolsSuiteQQ = [
  // 1. BJT Transistor Base Resistor Saturation Switch Calculator
  {
    slug: 'bjt-transistor-base-resistor-saturation-calculator',
    name: 'BJT Transistor Base Resistor Saturation Calculator',
    description: 'Calculate base current (I_B) and base driving resistor (R_B = (V_in - V_BE) / I_B) to force NPN/PNP bipolar junction transistors into deep saturation switching mode.',
    category: 'Developer',
    icon: 'code',
    keywords: ['bjt base resistor calculator', 'transistor switch base resistor formula', 'npn saturation base current calculator', 'transistor beta forced saturation online', 'relay driver bjt resistor online'],
    order: 396,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Logic Input (V_in), Collector Load Current (I_C) & Forced Beta',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bjt-vin">Logic Voltage V_in (V)</label>
          <input class="tool-textarea" id="bjt-vin" type="number" step="0.1" value="5.0" placeholder="5.0 V (or 3.3V)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bjt-ic">Collector Load I_C (mA)</label>
          <input class="tool-textarea" id="bjt-ic" type="number" step="any" value="100" placeholder="100 mA (e.g. Relay / LED)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bjt-beta">Forced Beta (β_sat)</label>
          <select class="tool-textarea" id="bjt-beta">
            <option value="10" selected>10 (Deep Saturation - Recommended)</option>
            <option value="20">20 (Moderate Saturation)</option>
            <option value="50">50 (Light Saturation)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bjt-vbe">V_BE Drop (V)</label>
          <input class="tool-textarea" id="bjt-vbe" type="number" step="0.05" value="0.7" placeholder="0.7 V (Silicon)" />
        </div>
      </div>
      <div id="bjt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bjt-res-rb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">430 Ω (E24 Standard)</span>
            <span class="stat-label">Recommended Base Resistor (R_B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bjt-res-ib" style="font-weight:700;">10.0 mA</span>
            <span class="stat-label">Base Overdrive Current (I_B)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('bjt-vin'), icEl = document.getElementById('bjt-ic');
  const bEl = document.getElementById('bjt-beta'), vbeEl = document.getElementById('bjt-vbe');
  const rbResEl = document.getElementById('bjt-res-rb'), ibResEl = document.getElementById('bjt-res-ib');

  function update() {
    const vin = parseFloat(vinEl.value), icMa = parseFloat(icEl.value);
    const beta = parseFloat(bEl.value), vbe = parseFloat(vbeEl.value);

    if (isNaN(vin) || isNaN(icMa) || isNaN(beta) || isNaN(vbe) || vin <= vbe || icMa <= 0 || beta <= 0) return;

    // Required base current I_B = I_C / beta_sat (mA)
    const ibMa = icMa / beta;
    const ibA = ibMa * 1e-3;

    // R_B = (V_in - V_BE) / I_B (Ohms)
    const rbOhms = (vin - vbe) / ibA;

    // Pick closest standard E24 resistor
    const standardE24 = [100, 120, 150, 180, 220, 270, 330, 390, 430, 470, 510, 560, 680, 750, 820, 1000, 1200, 1500, 1800, 2200, 2700, 3300, 4700, 10000];
    let bestE24 = standardE24[0];
    let minDiff = Infinity;
    for (const val of standardE24) {
      if (val <= rbOhms) { // Choose smaller or equal resistor to guarantee full saturation
        const diff = rbOhms - val;
        if (diff < minDiff) { minDiff = diff; bestE24 = val; }
      }
    }

    rbResEl.textContent = bestE24 + ' Ω (Calculated ' + Math.round(rbOhms) + ' Ω)';
    ibResEl.textContent = ibMa.toFixed(1) + ' mA (' + (vin - vbe).toFixed(2) + 'V across R_B)';
  }

  [vinEl, icEl, bEl, vbeEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter microcontroller logic drive voltage V_in (e.g. 3.3V or 5.0V).',
      'Enter collector load current I_C in milliamps (mA).',
      'Select forced saturation beta (β_sat = 10 standard rule of thumb).',
      'Inspect recommended E24 base resistor value and required logic pin drive current.'
    ],
    benefitTitle: 'Forced Beta (β = 10) for Minimal V_CE(sat)',
    benefitContent: 'While active transistor hFE gain may exceed 100-300, driving a transistor into deep hard saturation switch state requires an overdrive base current of I_B = I_C / 10 to drop V_CE down to 0.1-0.2V and minimize transistor thermal heat dissipation.',
    faqs: [{ q: 'Why not use the transistor\'s datasheet hFE value for switching?', a: 'Datasheet hFE is measured in the linear active region (V_CE = 5V); using full hFE for a switch leaves the transistor partially ON in linear mode, causing excessive overheating.' }]
  },

  // 2. NE555 Timer Astable Multivibrator Frequency & Duty Cycle Calculator
  {
    slug: 'ne555-timer-astable-oscillator-calculator',
    name: 'NE555 Timer Astable Oscillator & PWM Calculator',
    description: 'Calculate oscillation frequency (f = 1.44 / ((R₁ + 2·R₂) · C)), high/low pulse times (t_high, t_low), and duty cycle percentage for 555 timer astable square-wave circuits.',
    category: 'Developer',
    icon: 'code',
    keywords: ['555 timer astable calculator', 'ne555 frequency duty cycle calculator', '555 timer pulse generator online', '555 oscillator resistor capacitor calculator', 'ne555 square wave formula'],
    order: 397,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Resistors R₁, R₂ (kΩ) & Timing Capacitor C (μF)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="t5-r1">Resistor R₁ (kΩ)</label>
          <input class="tool-textarea" id="t5-r1" type="number" step="any" value="1.0" placeholder="1.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-r2">Resistor R₂ (kΩ)</label>
          <input class="tool-textarea" id="t5-r2" type="number" step="any" value="10.0" placeholder="10.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-c">Capacitor C (μF)</label>
          <input class="tool-textarea" id="t5-c" type="number" step="any" value="0.1" placeholder="0.1 μF (100 nF)" />
        </div>
      </div>
      <div id="t5-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="t5-res-freq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">685.7 Hz</span>
            <span class="stat-label">Output Frequency (f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="t5-res-duty" style="font-weight:700;">52.4% High</span>
            <span class="stat-label">Duty Cycle ((R₁+R₂)/(R₁+2R₂))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="t5-res-times">t_high = 0.76 ms, t_low = 0.69 ms</span>
            <span class="stat-label">Pulse Durations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const fResEl = document.getElementById('t5-res-freq'), dResEl = document.getElementById('t5-res-duty'), tmResEl = document.getElementById('t5-res-times');

  function update() {
    const r1K = parseFloat(r1El.value), r2K = parseFloat(r2El.value), cUf = parseFloat(cEl.value);
    if (isNaN(r1K) || isNaN(r2K) || isNaN(cUf) || r1K <= 0 || r2K <= 0 || cUf <= 0) return;

    const r1 = r1K * 1000;
    const r2 = r2K * 1000;
    const C = cUf * 1e-6;

    // t_high = 0.693 * (R1 + R2) * C
    const tHigh = 0.693 * (r1 + r2) * C;
    // t_low = 0.693 * R2 * C
    const tLow = 0.693 * r2 * C;
    const period = tHigh + tLow;

    // Frequency = 1.44 / ((R1 + 2*R2) * C)
    const freqHz = 1 / period;
    const dutyPct = (tHigh / period) * 100;

    const thMs = tHigh * 1000;
    const tlMs = tLow * 1000;

    fResEl.textContent = freqHz >= 1000 ? (freqHz / 1000).toFixed(2) + ' kHz' : freqHz.toFixed(1) + ' Hz';
    dResEl.textContent = dutyPct.toFixed(1) + '% High';
    tmResEl.textContent = 't_high = ' + thMs.toFixed(2) + ' ms, t_low = ' + tlMs.toFixed(2) + ' ms';
  }

  [r1El, r2El, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter timing resistor values R₁ and R₂ in kilo-Ohms (kΩ).',
      'Enter timing capacitor C in microFarads (μF).',
      'Inspect output square wave frequency (Hz / kHz), duty cycle (%), and exact high/low pulse millisecond durations.'
    ],
    benefitTitle: 'Signetics NE555 Timer Operation',
    benefitContent: 'In astable mode, capacitor C charges through (R₁ + R₂) to ⅔ Vcc and discharges through R₂ into the Pin 7 discharge transistor down to ⅓ Vcc, producing continuous clock pulses with zero external trigger.',
    faqs: [{ q: 'Why is standard 555 duty cycle always greater than 50%?', a: 'Because capacitor charging path includes both R₁ + R₂, while discharge path only includes R₂; adding a bypass diode across R₂ allows duty cycles below 50%.' }]
  },

  // 3. LM317 Adjustable Linear Voltage Regulator Resistor Calculator
  {
    slug: 'lm317-adjustable-voltage-regulator-calculator',
    name: 'LM317 Adjustable Voltage Regulator Resistor Calculator',
    description: 'Calculate output DC voltage (V_out = 1.25V · (1 + R₂ / R₁)) and feedback potentiometer resistor values for LM317, LM350, and LM338 adjustable linear regulators.',
    category: 'Developer',
    icon: 'code',
    keywords: ['lm317 voltage calculator', 'lm317 resistor calculator online', 'adjustable voltage regulator formula', 'lm317 output voltage r1 r2 calculator', 'lm317 potentiometer calculator'],
    order: 398,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Desired Output Voltage (V) or Feedback Resistors',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lm-r1">Upper Resistor R₁ (Ω)</label>
          <input class="tool-textarea" id="lm-r1" type="number" step="any" value="240" placeholder="240 Ω (Standard)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-r2">Lower Resistor R₂ (Ω)</label>
          <input class="tool-textarea" id="lm-r2" type="number" step="any" value="720" placeholder="720 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-vin">Input Voltage V_in (V)</label>
          <input class="tool-textarea" id="lm-vin" type="number" step="any" value="12.0" placeholder="12.0 V" />
        </div>
      </div>
      <div id="lm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lm-res-vout" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.00 Volts DC</span>
            <span class="stat-label">Regulated Output (V_out)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lm-res-drop" style="font-weight:700;">7.00 V Dropout</span>
            <span class="stat-label">Linear Voltage Drop (V_in - V_out)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('lm-r1'), r2El = document.getElementById('lm-r2'), vinEl = document.getElementById('lm-vin');
  const voutResEl = document.getElementById('lm-res-vout'), dropResEl = document.getElementById('lm-res-drop');

  const Vref = 1.25; // Internal reference voltage 1.25V

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), vin = parseFloat(vinEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(vin) || r1 <= 0 || r2 < 0 || vin <= 0) return;

    // V_out = 1.25 * (1 + R2 / R1)
    const vout = Vref * (1 + (r2 / r1));
    const drop = vin - vout;

    voutResEl.textContent = vout.toFixed(2) + ' Volts DC';

    if (drop < 2.0) {
      dropResEl.textContent = drop.toFixed(2) + ' V (DROPOUT WARNING: Need V_in ≥ V_out + 2V)';
      dropResEl.style.color = '#c53030';
    } else {
      dropResEl.textContent = drop.toFixed(2) + ' V Dropout Headroom';
      dropResEl.style.color = '#22543d';
    }
  }

  [r1El, r2El, vinEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter R₁ resistor in Ohms (standard manufacturer recommended value is 240 Ω for 120V/240V versions).',
      'Enter R₂ resistor or trim potentiometer setting in Ohms.',
      'Enter DC supply input voltage V_in.',
      'Inspect regulated output DC voltage and verify at least 2.0V minimum regulator dropout headroom.'
    ],
    benefitTitle: '1.25V Internal Bandgap Reference',
    benefitContent: 'The LM317 maintains a precision 1.25V reference between its OUT and ADJ pins, establishing a constant 5.2 mA programming current across R₁ that flows through R₂ to set the stable output voltage.',
    faqs: [{ q: 'How do you configure an LM317 for 5.0V output with R₁ = 240Ω?', a: 'R₂ = R₁ · (V_out / 1.25 - 1) = 240 × (5.0 / 1.25 - 1) = 240 × 3 = 720 Ω.' }]
  },

  // 4. Zener Diode Shunt Voltage Regulator Sizing Calculator
  {
    slug: 'zener-diode-voltage-regulator-calculator',
    name: 'Zener Diode Shunt Voltage Regulator Calculator',
    description: 'Calculate series ballast resistor (R_s = (V_in(min) - V_z) / (I_L(max) + I_z(min))) and maximum Zener diode power dissipation (P_z = V_z · I_z) for shunt voltage regulation.',
    category: 'Developer',
    icon: 'code',
    keywords: ['zener diode calculator', 'zener voltage regulator series resistor', 'zener diode power dissipation formula', 'shunt voltage regulator calculator online', 'zener resistor sizing online'],
    order: 399,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'DC Input Range, Zener Voltage (V_z) & Load Current (I_L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="zn-vin">Min Input V_in(min) (V)</label>
          <input class="tool-textarea" id="zn-vin" type="number" step="any" value="12" placeholder="12 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zn-vz">Zener Voltage V_z (V)</label>
          <input class="tool-textarea" id="zn-vz" type="number" step="any" value="5.1" placeholder="5.1 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zn-il">Max Load Current I_L (mA)</label>
          <input class="tool-textarea" id="zn-il" type="number" step="any" value="20" placeholder="20 mA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zn-iz">Min Zener Knee I_z (mA)</label>
          <input class="tool-textarea" id="zn-iz" type="number" step="any" value="5" placeholder="5 mA" />
        </div>
      </div>
      <div id="zn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="zn-res-rs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">270 Ω (E24 Standard)</span>
            <span class="stat-label">Series Ballast Resistor (R_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="zn-res-pz" style="font-weight:700;">130.4 mW</span>
            <span class="stat-label">Max Zener Power Dissipation (P_z)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('zn-vin'), vzEl = document.getElementById('zn-vz');
  const ilEl = document.getElementById('zn-il'), izEl = document.getElementById('zn-iz');
  const rsResEl = document.getElementById('zn-res-rs'), pzResEl = document.getElementById('zn-res-pz');

  function update() {
    const vinMin = parseFloat(vinEl.value), vz = parseFloat(vzEl.value);
    const ilMa = parseFloat(ilEl.value), izMa = parseFloat(izEl.value);

    if (isNaN(vinMin) || isNaN(vz) || isNaN(ilMa) || isNaN(izMa) || vinMin <= vz || vz <= 0 || ilMa < 0 || izMa <= 0) return;

    // Total current through Rs = I_L(max) + I_z(min)
    const iTotA = (ilMa + izMa) * 1e-3;
    // R_s = (V_in(min) - V_z) / I_total (Ohms)
    const rsOhms = (vinMin - vz) / iTotA;

    // Max Zener power occurs at no-load (I_L = 0), so all current flows through Zener:
    // P_z(max) = V_z * ((V_in(min) - V_z) / R_s)
    const pzWatts = vz * ((vinMin - vz) / rsOhms);
    const pzMw = pzWatts * 1000;

    rsResEl.textContent = Math.round(rsOhms) + ' Ω';
    pzResEl.textContent = pzMw >= 1000 ? pzWatts.toFixed(2) + ' Watts' : pzMw.toFixed(1) + ' mW (' + (pzMw > 500 ? 'Use 1W Zener' : 'Use 0.5W Zener') + ')';
  }

  [vinEl, vzEl, ilEl, izEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter minimum expected DC input rail voltage.',
      'Enter Zener breakdown voltage rating V_z (e.g. 3.3V, 5.1V, 9.1V).',
      'Enter maximum circuit load current I_L in milliamps and minimum knee bias current I_z.',
      'Inspect series ballast resistor value and maximum Zener diode thermal power rating.'
    ],
    benefitTitle: 'Reverse Breakdown Shunt Clamping',
    benefitContent: 'When reverse-biased past its breakdown threshold, a Zener diode maintains a nearly constant voltage drop V_z across varying currents, shunting excess current safely through the series ballast resistor.',
    faqs: [{ q: 'What Zener power rating is safe for 130 mW dissipation?', a: 'A standard 500 mW (0.5 Watt) Zener diode provides ample thermal headroom.' }]
  },

  // 5. MOSFET Drain Current & Saturation Region Calculator
  {
    slug: 'mosfet-drain-current-saturation-calculator',
    name: 'MOSFET Drain Current & Saturation Region Calculator',
    description: 'Calculate MOSFET drain current (I_D = ½ · k_n · (V_GS - V_th)²) in saturation mode, overdrive voltage (V_ov = V_GS - V_th), and determine Triode vs Saturation boundary.',
    category: 'Developer',
    icon: 'code',
    keywords: ['mosfet drain current calculator', 'mosfet saturation formula calculator', 'half kn vgs vth squared online', 'overdrive voltage mosfet calculator', 'triode vs saturation region mosfet online'],
    order: 400,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Gate-Source (V_GS), Threshold (V_th) & Transconductance Parameter (k_n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mos-vgs">Gate-Source V_GS (V)</label>
          <input class="tool-textarea" id="mos-vgs" type="number" step="0.1" value="4.0" placeholder="4.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mos-vth">Threshold V_th (V)</label>
          <input class="tool-textarea" id="mos-vth" type="number" step="0.1" value="1.5" placeholder="1.5 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mos-vds">Drain-Source V_DS (V)</label>
          <input class="tool-textarea" id="mos-vds" type="number" step="0.1" value="5.0" placeholder="5.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mos-kn">Parameter k_n (mA / V²)</label>
          <input class="tool-textarea" id="mos-kn" type="number" step="any" value="2.0" placeholder="2.0 mA/V²" />
        </div>
      </div>
      <div id="mos-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mos-res-id" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.25 mA</span>
            <span class="stat-label">Drain Current (I_D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mos-res-mode" style="color:var(--green-dark); font-weight:700;">Saturation Region (V_DS ≥ V_GS - V_th)</span>
            <span class="stat-label">Operating Mode</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mos-res-vov">V_ov = 2.50 V</span>
            <span class="stat-label">Overdrive Voltage (V_GS - V_th)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vgsEl = document.getElementById('mos-vgs'), vthEl = document.getElementById('mos-vth');
  const vdsEl = document.getElementById('mos-vds'), knEl = document.getElementById('mos-kn');
  const idResEl = document.getElementById('mos-res-id'), mdResEl = document.getElementById('mos-res-mode'), vovResEl = document.getElementById('mos-res-vov');

  function update() {
    const vgs = parseFloat(vgsEl.value), vth = parseFloat(vthEl.value);
    const vds = parseFloat(vdsEl.value), knMa = parseFloat(knEl.value);

    if (isNaN(vgs) || isNaN(vth) || isNaN(vds) || isNaN(knMa) || knMa <= 0) return;

    const vov = vgs - vth;
    vovResEl.textContent = 'V_ov = ' + vov.toFixed(2) + ' V';

    if (vov <= 0) {
      idResEl.textContent = '0.00 mA (Cutoff)';
      idResEl.style.color = '#c53030';
      mdResEl.textContent = 'Cutoff Region (V_GS < V_th: Channel Off)';
      mdResEl.style.color = '#c53030';
      return;
    }

    if (vds >= vov) {
      // Saturation: I_D = 0.5 * k_n * V_ov^2 (mA)
      const id = 0.5 * knMa * Math.pow(vov, 2);
      idResEl.textContent = id.toFixed(2) + ' mA';
      idResEl.style.color = '#22543d';
      mdResEl.textContent = 'Saturation Active Region (Pinch-off: V_DS ≥ V_ov)';
      mdResEl.style.color = '#22543d';
    } else {
      // Triode / Linear: I_D = k_n * (V_ov * V_DS - 0.5 * V_DS^2)
      const id = knMa * (vov * vds - 0.5 * Math.pow(vds, 2));
      idResEl.textContent = id.toFixed(2) + ' mA';
      idResEl.style.color = '#2563eb';
      mdResEl.textContent = 'Triode / Linear Region (V_DS < V_ov)';
      mdResEl.style.color = '#2563eb';
    }
  }

  [vgsEl, vthEl, vdsEl, knEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Gate-Source voltage (V_GS), Threshold voltage (V_th), and Drain-Source voltage (V_DS).',
      'Enter transconductance conduction parameter k_n in mA/V².',
      'Inspect drain current I_D and verify operating region (Cutoff, Triode, or Saturation).'
    ],
    benefitTitle: 'Square-Law MOSFET Current Model',
    benefitContent: 'In saturation, the conductive inversion channel pinches off at the drain end, making drain current I_D independent of V_DS and controlled exclusively by the square of the gate overdrive voltage (I_D ∝ (V_GS - V_th)²).',
    faqs: [{ q: 'What is the condition for MOSFET saturation?', a: 'V_GS ≥ V_th (channel turned on) and V_DS ≥ V_GS - V_th (drain pinch-off).' }]
  }
];

toolsSuiteQQ.forEach(createTool);
console.log('Suite QQ complete: 5 tools created.');
