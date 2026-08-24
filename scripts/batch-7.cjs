const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch7 = [
  // 1. Sound Decibel Distance Calculator
  {
    slug: 'sound-decibel-distance-calculator',
    name: 'Sound Decibel Distance Calculator',
    description: 'Calculate sound pressure level (dB) reduction over distance using the inverse square law for indoor and outdoor acoustics.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound decibel distance calculator', 'inverse square law sound', 'spl drop over distance', 'sound level at distance calculator', 'acoustic distance decibel'],
    order: 84,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acoustic Sound Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="snd-db1">Initial Sound Level (dB) at d₁</label>
          <input class="tool-textarea" id="snd-db1" type="number" step="any" value="90" placeholder="e.g. 90 dB" />
        </div>
        <div class="control-group">
          <label class="control-label" for="snd-d1">Initial Distance d₁ (meters)</label>
          <input class="tool-textarea" id="snd-d1" type="number" step="any" value="1" placeholder="e.g. 1 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="snd-d2">Target Distance d₂ (meters)</label>
          <input class="tool-textarea" id="snd-d2" type="number" step="any" value="10" placeholder="e.g. 10 m" />
        </div>
      </div>
      <div id="snd-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="snd-res-db2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Sound Level at Target Distance (d₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="snd-res-attenuation" style="color:#c53030; font-weight:700;">-</span>
            <span class="stat-label">Total Sound Level Drop (ΔdB)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const db1El = document.getElementById('snd-db1'), d1El = document.getElementById('snd-d1'), d2El = document.getElementById('snd-d2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('snd-res-card');
  const resDb2 = document.getElementById('snd-res-db2'), resAtt = document.getElementById('snd-res-attenuation');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const db1 = parseFloat(db1El.value);
    const d1 = parseFloat(d1El.value);
    const d2 = parseFloat(d2El.value);

    if (isNaN(db1) || isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) {
      setMsg('Please enter positive values for both distances.', true);
      resCard.style.display = 'none'; return;
    }

    // Inverse Square Law: L2 = L1 - 20 * log10(d2 / d1)
    const drop = 20 * Math.log10(d2 / d1);
    const db2 = db1 - drop;

    resDb2.textContent = db2.toFixed(1) + ' dB';
    resAtt.textContent = (drop >= 0 ? '-' : '+') + Math.abs(drop).toFixed(1) + ' dB';

    resCard.style.display = 'block';
    setMsg('Acoustic decibel propagation calculated.');
  });

  clearBtn.addEventListener('click', () => {
    db1El.value = '90'; d1El.value = '1'; d2El.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the known sound pressure level (dB) and the reference measurement distance (d₁).',
      'Enter the target listener distance (d₂).',
      'Click <strong>Calculate</strong> to inspect the expected decibels based on the inverse square law.'
    ],
    benefitTitle: 'The 6 dB Drop Rule of Thumb',
    benefitContent: 'In an open free acoustic field, sound pressure level drops by exactly 6 dB every time the distance from a point source is doubled (L₂ = L₁ - 20 log₁₀(d₂/d₁)).',
    faqs: [
      { q: 'What sound level is considered harmful to human hearing?', a: 'Sustained exposure to sound levels above 85 dB can cause permanent noise-induced hearing loss.' }
    ]
  },

  // 2. RC Time Constant & Cutoff Frequency Calculator
  {
    slug: 'capacitance-rc-time-constant-calculator',
    name: 'RC Time Constant & Low-Pass Filter Calculator',
    description: 'Calculate RC circuit time constant (τ = R·C), 3dB cutoff frequency (fc), and capacitor charge/discharge times.',
    category: 'Science',
    icon: 'text',
    keywords: ['rc time constant calculator', 'cutoff frequency calculator', 'rc low pass filter calculator', 'capacitor charge time calculator', 'rc circuit tau calculator'],
    order: 85,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistor & Capacitor Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-r">Resistance (R) [Ohms / kΩ / MΩ]</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="rc-r" type="number" step="any" value="10" placeholder="10" style="flex:2;" />
            <select class="tool-textarea" id="rc-r-unit" style="flex:1;">
              <option value="1">Ω</option>
              <option value="1000" selected>kΩ</option>
              <option value="1000000">MΩ</option>
            </select>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-c">Capacitance (C) [μF / nF / pF]</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="rc-c" type="number" step="any" value="100" placeholder="100" style="flex:2;" />
            <select class="tool-textarea" id="rc-c-unit" style="flex:1;">
              <option value="0.000001" selected>μF</option>
              <option value="0.000000001">nF</option>
              <option value="0.000000000001">pF</option>
            </select>
          </div>
        </div>
      </div>
      <div id="rc-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">-</span>
            <span class="stat-label">Time Constant (τ = RC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-fc" style="font-weight:700;">-</span>
            <span class="stat-label">3dB Cutoff Frequency (fc)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-charge">-</span>
            <span class="stat-label">99.3% Full Charge (5τ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), rUnit = document.getElementById('rc-r-unit');
  const cEl = document.getElementById('rc-c'), cUnit = document.getElementById('rc-c-unit');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rc-res-card');
  const resTau = document.getElementById('rc-res-tau'), resFc = document.getElementById('rc-res-fc'), resCh = document.getElementById('rc-res-charge');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const r = parseFloat(rEl.value) * parseFloat(rUnit.value);
    const c = parseFloat(cEl.value) * parseFloat(cUnit.value);

    if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) {
      setMsg('Please enter positive values for resistance and capacitance.', true);
      resCard.style.display = 'none'; return;
    }

    const tau = r * c; // in seconds
    const fc = 1 / (2 * Math.PI * r * c); // in Hz
    const fullCharge = 5 * tau;

    resTau.textContent = tau >= 1 ? tau.toFixed(3) + ' s' : (tau * 1000).toFixed(3) + ' ms';
    resFc.textContent = fc >= 1000 ? (fc / 1000).toFixed(2) + ' kHz' : fc.toFixed(2) + ' Hz';
    resCh.textContent = fullCharge >= 1 ? fullCharge.toFixed(3) + ' s' : (fullCharge * 1000).toFixed(3) + ' ms';

    resCard.style.display = 'block';
    setMsg('RC circuit parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    rEl.value = '10'; cEl.value = '100'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the resistance value and unit (Ohms, kΩ, or MΩ).',
      'Enter the capacitance value and unit (μF, nF, or pF).',
      'Click <strong>Calculate</strong> to inspect the time constant (τ) and low-pass filter cutoff frequency.'
    ],
    benefitTitle: 'RC Circuit Behavior',
    benefitContent: 'In one time constant (1τ = R·C), a capacitor charges to approximately 63.2% of its maximum voltage. After 5 time constants (5τ), the capacitor is practically fully charged (99.3%).',
    faqs: [
      { q: 'What is the cutoff frequency formula for an RC filter?', a: 'fc = 1 / (2 × π × R × C)' }
    ]
  },

  // 3. Dew Point & Relative Humidity Calculator
  {
    slug: 'dew-point-calculator',
    name: 'Dew Point Calculator',
    description: 'Calculate ambient dew point temperature, comfort level, and moisture condensation threshold from air temperature and relative humidity.',
    category: 'Science',
    icon: 'text',
    keywords: ['dew point calculator', 'calculate dew point from humidity', 'relative humidity to dew point', 'magnus formula dew point', 'weather moisture calculator'],
    order: 86,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Atmospheric Temperature & Humidity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dew-temp">Air Temperature (°C)</label>
          <input class="tool-textarea" id="dew-temp" type="number" step="any" value="28" placeholder="e.g. 28 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dew-rh">Relative Humidity (RH %)</label>
          <input class="tool-textarea" id="dew-rh" type="number" min="1" max="100" step="any" value="65" placeholder="e.g. 65 %" />
        </div>
      </div>
      <div id="dew-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dew-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Dew Point Temperature</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dew-res-comfort" style="font-weight:700;">-</span>
            <span class="stat-label">Human Comfort Perception</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('dew-temp'), rhEl = document.getElementById('dew-rh');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('dew-res-card');
  const resDp = document.getElementById('dew-res-dp'), resCom = document.getElementById('dew-res-comfort');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const T = parseFloat(tEl.value);
    const RH = parseFloat(rhEl.value);

    if (isNaN(T) || isNaN(RH) || RH < 1 || RH > 100) {
      setMsg('Please enter a valid temperature and relative humidity between 1% and 100%.', true);
      resCard.style.display = 'none'; return;
    }

    // Magnus-Tetens formula: Ts = (b * alpha) / (a - alpha)
    // where alpha = (a * T) / (b + T) + ln(RH / 100)
    // Constants: a = 17.27, b = 237.7 °C
    const a = 17.27, b = 237.7;
    const alpha = (a * T) / (b + T) + Math.log(RH / 100);
    const dp = (b * alpha) / (a - alpha);
    const dpF = (dp * 9/5) + 32;

    let comfort = 'Comfortable';
    if (dp < 10) comfort = 'Dry / Crisp';
    else if (dp <= 15) comfort = 'Pleasantly Comfortable';
    else if (dp <= 20) comfort = 'Humid / Sticky';
    else if (dp <= 24) comfort = 'Very Muggy & Oppressive';
    else comfort = 'Extremely Miserable & Dangerous';

    resDp.textContent = dp.toFixed(1) + ' °C (' + dpF.toFixed(1) + ' °F)';
    resCom.textContent = comfort;

    resCard.style.display = 'block';
    setMsg('Dew point calculated.');
  });

  clearBtn.addEventListener('click', () => {
    tEl.value = '28'; rhEl.value = '65'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter current ambient air temperature in Celsius (°C).',
      'Enter the relative humidity percentage (RH %).',
      'Click <strong>Calculate</strong> to inspect the dew point condensation temperature and mugginess rating.'
    ],
    benefitTitle: 'Dew Point vs Relative Humidity',
    benefitContent: 'Dew point is the absolute temperature to which air must be cooled to become 100% saturated with water vapor. Unlike relative humidity (which changes with air temperature), dew point gives a true measure of atmospheric moisture.',
    faqs: [
      { q: 'At what dew point does air feel muggy?', a: 'Dew points above 18 °C (65 °F) feel noticeably sticky and humid to humans.' }
    ]
  },

  // 4. Solar Panel Daily Output Calculator
  {
    slug: 'solar-panel-output-calculator',
    name: 'Solar Panel Output & kWh Calculator',
    description: 'Calculate expected daily and monthly solar electricity production (kWh) from system wattage, peak sun hours, and derate efficiency.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar panel output calculator', 'solar kwh calculator', 'solar daily energy production', 'solar wattage to kwh calculator', 'photovoltaic generation calculator'],
    order: 87,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solar Array Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-watts">Total Solar Array Power (Watts)</label>
          <input class="tool-textarea" id="sol-watts" type="number" step="any" value="3000" placeholder="e.g. 3000 W (3 kW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-hours">Peak Sun Hours / Day</label>
          <input class="tool-textarea" id="sol-hours" type="number" step="any" value="4.5" placeholder="e.g. 4.5 hrs" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-loss">System Derate Efficiency (%)</label>
          <input class="tool-textarea" id="sol-loss" type="number" step="any" value="80" placeholder="80%" />
        </div>
      </div>
      <div id="sol-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-daily" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Daily Generation (kWh)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-monthly" style="font-weight:700;">-</span>
            <span class="stat-label">Monthly Generation (kWh)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-annual">-</span>
            <span class="stat-label">Annual Output (kWh)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('sol-watts'), hEl = document.getElementById('sol-hours'), lEl = document.getElementById('sol-loss');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sol-res-card');
  const resD = document.getElementById('sol-res-daily'), resM = document.getElementById('sol-res-monthly'), resA = document.getElementById('sol-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const watts = parseFloat(wEl.value);
    const hours = parseFloat(hEl.value);
    const eff = (parseFloat(lEl.value) || 80) / 100;

    if (isNaN(watts) || isNaN(hours) || watts <= 0 || hours <= 0) {
      setMsg('Please enter positive values for array wattage and sun hours.', true);
      resCard.style.display = 'none'; return;
    }

    const dailyKwh = (watts * hours * eff) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const annualKwh = dailyKwh * 365;

    resD.textContent = dailyKwh.toFixed(2) + ' kWh / day';
    resM.textContent = Math.round(monthlyKwh).toLocaleString() + ' kWh / mo';
    resA.textContent = Math.round(annualKwh).toLocaleString() + ' kWh / yr';

    resCard.style.display = 'block';
    setMsg('Solar generation estimated.');
  });

  clearBtn.addEventListener('click', () => {
    wEl.value = '3000'; hEl.value = '4.5'; lEl.value = '80'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the rated capacity of your solar panel array in Watts (e.g. 10 panels of 400W = 4,000 Watts).',
      'Enter your region\'s average daily Peak Sun Hours (typically 4.0 - 5.5 hours).',
      'Click <strong>Calculate</strong> to inspect estimated daily, monthly, and annual clean kWh electricity output.'
    ],
    benefitTitle: 'Solar Derate Factor Considerations',
    benefitContent: 'Real-world solar systems experience ~20% energy loss due to inverter conversion losses, DC-AC wiring resistance, temperature coefficients, and atmospheric dust accumulation.',
    faqs: [
      { q: 'What is 1 Peak Sun Hour?', a: 'One peak sun hour equals 1,000 Watts per square meter of solar irradiance for 1 hour.' }
    ]
  },

  // 5. Battery Life & Runtime Hours Calculator
  {
    slug: 'battery-life-runtime-calculator',
    name: 'Battery Life & Runtime Calculator',
    description: 'Calculate battery operating runtime hours and discharge duration from battery capacity (mAh / Ah) and device power load current.',
    category: 'Science',
    icon: 'text',
    keywords: ['battery life calculator', 'battery runtime calculator', 'mah to hours calculator', 'battery discharge time', 'iot battery life estimation'],
    order: 88,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Battery Capacity & Load Current',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bat-cap">Battery Capacity</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="bat-cap" type="number" step="any" value="2500" placeholder="2500" style="flex:2;" />
            <select class="tool-textarea" id="bat-cap-unit" style="flex:1;">
              <option value="1" selected>mAh</option>
              <option value="1000">Ah</option>
            </select>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-load">Device Load Current</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="bat-load" type="number" step="any" value="150" placeholder="150" style="flex:2;" />
            <select class="tool-textarea" id="bat-load-unit" style="flex:1;">
              <option value="1" selected>mA</option>
              <option value="1000">Amperes (A)</option>
            </select>
          </div>
        </div>
      </div>
      <div id="bat-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bat-res-hours" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Estimated Operating Runtime</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bat-res-days" style="font-weight:700;">-</span>
            <span class="stat-label">Runtime in Days</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const capEl = document.getElementById('bat-cap'), capUnit = document.getElementById('bat-cap-unit');
  const loadEl = document.getElementById('bat-load'), loadUnit = document.getElementById('bat-load-unit');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bat-res-card');
  const resH = document.getElementById('bat-res-hours'), resD = document.getElementById('bat-res-days');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const capMah = parseFloat(capEl.value) * parseFloat(capUnit.value);
    const loadMa = parseFloat(loadEl.value) * parseFloat(loadUnit.value);

    if (isNaN(capMah) || isNaN(loadMa) || capMah <= 0 || loadMa <= 0) {
      setMsg('Please enter valid positive numbers for battery capacity and load current.', true);
      resCard.style.display = 'none'; return;
    }

    // Standard Peukert battery efficiency derate ~0.85
    const totalHours = (capMah / loadMa) * 0.85;
    const totalDays = totalHours / 24;

    resH.textContent = totalHours >= 1 ? totalHours.toFixed(1) + ' Hours' : (totalHours * 60).toFixed(0) + ' Minutes';
    resD.textContent = totalDays.toFixed(2) + ' Days';

    resCard.style.display = 'block';
    setMsg('Battery runtime calculated.');
  });

  clearBtn.addEventListener('click', () => {
    capEl.value = '2500'; loadEl.value = '150'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the battery capacity rating (e.g. 2500 mAh 18650 Li-ion cell or 5000 mAh phone battery).',
      'Enter the continuous or average device power consumption load current (in mA or Amps).',
      'Click <strong>Calculate</strong> to inspect battery life duration with realistic discharge efficiency.'
    ],
    benefitTitle: 'Peukert Effect and Real-World Derating',
    benefitContent: 'Batteries rarely deliver 100% of nominal capacity due to chemical internal resistance and voltage sag under high discharge rates. Applying an 85% safety factor provides a dependable real-world runtime estimate.',
    faqs: [
      { q: 'How long will a 2000 mAh battery run a 100 mA circuit?', a: '(2000 mAh / 100 mA) × 0.85 = ~17 Hours of continuous operation.' }
    ]
  }
];

toolsBatch7.forEach(createTool);
console.log('Batch 7 complete.');
