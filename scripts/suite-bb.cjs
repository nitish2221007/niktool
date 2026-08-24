const { createTool } = require('./generate-curated-tools.cjs');

// Suite BB: 5 Tools in Photography Optics, Battery Sizing & Solar Systems to cross 448 tools
const toolsSuiteBB = [
  // 1. Z-Score to P-Value Normal Distribution CDF Calculator
  {
    slug: 'z-score-to-p-value-normal-cdf-calculator',
    name: 'Z-Score to P-Value & Normal CDF Calculator',
    description: 'Calculate two-tailed and one-tailed hypothesis testing P-values and cumulative probability Φ(Z) from standard normal Z-scores.',
    category: 'Math',
    icon: 'text',
    keywords: ['z score to p value calculator', 'normal cdf p value calculator', 'standard normal distribution table online', 'two tailed p value from z', 'z test significance calculator'],
    order: 319,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Normal Z-Score',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="zp-z">Enter Z-Score (e.g. 1.96 or -2.58)</label>
        <input class="tool-textarea" id="zp-z" type="number" step="0.01" value="1.96" placeholder="1.96" />
      </div>
      <div id="zp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="zp-res-two" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">p = 0.0500</span>
            <span class="stat-label">Two-Tailed P-Value (2 · (1 - Φ(|Z|)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="zp-res-one" style="font-weight:700;">p = 0.0250</span>
            <span class="stat-label">Right-Tailed P-Value (1 - Φ(Z))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="zp-res-cdf">Φ(Z) = 0.9750</span>
            <span class="stat-label">Cumulative Probability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('zp-z');
  const twoEl = document.getElementById('zp-res-two'), oneEl = document.getElementById('zp-res-one'), cdfEl = document.getElementById('zp-res-cdf');

  // Error function approximation
  function erf(x) {
    const a1 =  0.254829592, a2 = -0.284496736, a3 =  1.421413741;
    const a4 = -1.453152027, a5 =  1.061405429, p  =  0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  function normCDF(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
  }

  function update() {
    const z = parseFloat(zEl.value);
    if (isNaN(z)) return;

    const cdf = normCDF(z);
    const absZ = Math.abs(z);
    const twoTail = 2 * (1 - normCDF(absZ));
    const rightTail = 1 - cdf;

    twoEl.textContent = 'p = ' + twoTail.toFixed(4);
    oneEl.textContent = 'p = ' + rightTail.toFixed(4);
    cdfEl.textContent = 'Φ(Z) = ' + cdf.toFixed(4);
  }

  zEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter standard normal test statistic Z-score.',
      'Inspect exact two-tailed and one-tailed P-values for statistical significance hypothesis testing (p < 0.05).'
    ],
    benefitTitle: 'Statistical Significance Determination',
    benefitContent: 'A two-tailed P-value represents the probability of observing an effect at least as extreme as Z assuming the null hypothesis (H₀) is true.',
    faqs: [{ q: 'What is the P-value for Z = 1.96?', a: 'For Z = 1.96, the two-tailed P-value is exactly 0.0500 (5.00% significance threshold).' }]
  },

  // 2. Camera Field of View (FOV) & Focal Length Calculator
  {
    slug: 'focal-length-field-of-view-camera-calculator',
    name: 'Camera Lens Focal Length & Field of View (FOV) Calculator',
    description: 'Calculate horizontal, vertical, and diagonal Field of View angles (FOV = 2 · arctan(Sensor / 2f)) from lens focal length (mm) and camera sensor formats (Full Frame, APS-C, Micro 4/3).',
    category: 'Daily',
    icon: 'text',
    keywords: ['camera field of view calculator', 'lens fov calculator', 'focal length to fov degrees', 'full frame aps c fov chart', 'photography angle of view calculator'],
    order: 320,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Sensor Format & Lens Focal Length',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fov-sensor">Camera Sensor Format</label>
          <select class="tool-textarea" id="fov-sensor">
            <option value="36,24" selected>Full Frame 35mm (36 × 24 mm)</option>
            <option value="23.6,15.6">APS-C Sony/Nikon/Fuji (1.5x Crop)</option>
            <option value="22.3,14.9">APS-C Canon (1.6x Crop)</option>
            <option value="17.3,13">Micro Four Thirds (2.0x Crop)</option>
            <option value="6.17,4.55">Smartphone 1/2.3" Sensor</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="fov-fl">Lens Focal Length (mm)</label>
          <input class="tool-textarea" id="fov-fl" type="number" step="any" value="50" placeholder="50 mm" />
        </div>
      </div>
      <div id="fov-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fov-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">39.60°</span>
            <span class="stat-label">Horizontal Field of View (H-FOV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fov-res-v" style="font-weight:700;">26.99°</span>
            <span class="stat-label">Vertical Field of View (V-FOV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fov-res-d">46.79° (Standard)</span>
            <span class="stat-label">Diagonal Field of View</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const senEl = document.getElementById('fov-sensor'), flEl = document.getElementById('fov-fl');
  const hResEl = document.getElementById('fov-res-h'), vResEl = document.getElementById('fov-res-v'), dResEl = document.getElementById('fov-res-d');

  function update() {
    const [sw, sh] = senEl.value.split(',').map(Number);
    const fl = parseFloat(flEl.value);
    if (isNaN(fl) || fl <= 0 || !sw || !sh) return;

    // FOV = 2 * atan(dimension / (2 * f))
    const hFovRad = 2 * Math.atan(sw / (2 * fl));
    const vFovRad = 2 * Math.atan(sh / (2 * fl));
    const diag = Math.sqrt(Math.pow(sw, 2) + Math.pow(sh, 2));
    const dFovRad = 2 * Math.atan(diag / (2 * fl));

    const hDeg = (hFovRad * 180) / Math.PI;
    const vDeg = (vFovRad * 180) / Math.PI;
    const dDeg = (dFovRad * 180) / Math.PI;

    hResEl.textContent = hDeg.toFixed(2) + '°';
    vResEl.textContent = vDeg.toFixed(2) + '°';
    dResEl.textContent = dDeg.toFixed(2) + '°' + (fl < 35 ? ' (Wide Angle)' : (fl > 70 ? ' (Telephoto)' : ' (Standard)'));
  }

  senEl.addEventListener('change', update);
  flEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select camera sensor format (Full Frame, APS-C, MFT, Smartphone).',
      'Enter lens focal length in millimeters (mm).',
      'Inspect horizontal, vertical, and diagonal field of view cone angles in degrees.'
    ],
    benefitTitle: '50mm Human Visual Perspective',
    benefitContent: 'A 50mm lens on a 35mm full-frame camera produces a diagonal field of view of ~47°, matching the natural perspective magnification of human central vision.',
    faqs: [{ q: 'How does crop factor affect field of view?', a: 'An APS-C 1.5x crop sensor narrows the field of view: a 50mm lens behaves with the narrower perspective of a 75mm full-frame lens.' }]
  },

  // 3. Camera Depth of Field (DoF) & Hyperfocal Distance Calculator
  {
    slug: 'camera-depth-of-field-hyperfocal-calculator',
    name: 'Camera Depth of Field (DoF) & Hyperfocal Calculator',
    description: 'Calculate total in-focus Depth of Field (DoF), near/far focus limits, and hyperfocal distance (H = f² / (N·c)) for landscape and portrait photography.',
    category: 'Daily',
    icon: 'text',
    keywords: ['depth of field calculator', 'dof hyperfocal distance calculator', 'bokeh depth of field formula', 'camera near far focus limits', 'circle of confusion dof calculator online'],
    order: 321,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Aperture (f-stop), Focal Length & Subject Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dof-fstop">Aperture (f-number)</label>
          <select class="tool-textarea" id="dof-fstop">
            <option value="1.4">f / 1.4 (Ultra-shallow Bokeh)</option>
            <option value="2.8" selected>f / 2.8 (Portrait Standard)</option>
            <option value="5.6">f / 5.6 (Sharp Medium)</option>
            <option value="8.0">f / 8.0 (Landscape Sweet Spot)</option>
            <option value="16.0">f / 16.0 (Deep Field)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="dof-fl">Focal Length (mm)</label>
          <input class="tool-textarea" id="dof-fl" type="number" step="any" value="85" placeholder="85 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dof-dist">Subject Distance (meters)</label>
          <input class="tool-textarea" id="dof-dist" type="number" step="any" value="3.0" placeholder="3.0 m" />
        </div>
      </div>
      <div id="dof-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dof-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">18.5 cm</span>
            <span class="stat-label">Total Depth of Field (DoF)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dof-res-near">2.91 m</span>
            <span class="stat-label">Near Focus Limit</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dof-res-far">3.10 m</span>
            <span class="stat-label">Far Focus Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('dof-fstop'), flEl = document.getElementById('dof-fl'), dEl = document.getElementById('dof-dist');
  const totEl = document.getElementById('dof-res-tot'), nEl = document.getElementById('dof-res-near'), farEl = document.getElementById('dof-res-far');

  const coc = 0.030; // Circle of confusion for Full Frame 35mm in mm

  function update() {
    const N = parseFloat(fEl.value), flMm = parseFloat(flEl.value), distM = parseFloat(dEl.value);
    if (isNaN(N) || isNaN(flMm) || isNaN(distM) || flMm <= 0 || distM <= 0) return;

    const distMm = distM * 1000;
    // Hyperfocal distance H = (f^2 / (N * coc)) + f (in mm)
    const H = (Math.pow(flMm, 2) / (N * coc)) + flMm;

    // Near limit Dn = (H * distMm) / (H + (distMm - flMm))
    const dn = (H * distMm) / (H + (distMm - flMm));
    // Far limit Df = (H * distMm) / (H - (distMm - flMm))
    const df = (distMm >= (H + flMm)) ? Infinity : (H * distMm) / (H - (distMm - flMm));

    const dofMm = df === Infinity ? Infinity : df - dn;
    const dnM = dn / 1000;
    const dfM = df === Infinity ? 'Infinity' : (df / 1000).toFixed(2) + ' m';

    totEl.textContent = dofMm === Infinity ? 'Infinite' : (dofMm >= 1000 ? (dofMm / 1000).toFixed(2) + ' meters' : (dofMm / 10).toFixed(1) + ' cm');
    nEl.textContent = dnM.toFixed(2) + ' m';
    farEl.textContent = dfM;
  }

  [fEl, flEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select lens aperture f-stop (e.g. f/1.4 for creamy portrait bokeh, f/8 for landscape sharpness).',
      'Enter lens focal length in mm and subject shooting distance in meters.',
      'Inspect near focus boundary, far focus boundary, and total in-focus depth span.'
    ],
    benefitTitle: 'Landscape Hyperfocal Focusing Technique',
    benefitContent: 'Focusing your camera at the exact hyperfocal distance (H) renders everything acceptably sharp from half the hyperfocal distance (H/2) all the way to infinity.',
    faqs: [{ q: 'What is Circle of Confusion (CoC)?', a: 'CoC is the maximum diameter of an optical blur circle on the sensor that the human eye still perceives as a sharp point in the final print.' }]
  },

  // 4. Lithium/Lead-Acid Battery Charge Time & Efficiency Calculator
  {
    slug: 'battery-charge-time-efficiency-calculator',
    name: 'Battery Charge Time & Charger Current Calculator',
    description: 'Calculate battery charging time (Hours = (Capacity mAh / Charger mA) / Efficiency) for Li-ion, LiFePO4, NiMH, and Lead-Acid battery banks.',
    category: 'Daily',
    icon: 'text',
    keywords: ['battery charge time calculator', 'lipo charge duration calculator', 'mah to charging hours calculator', 'battery charger current formula', 'lifepo4 battery charging time online'],
    order: 322,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Battery Capacity (mAh) & Charger Current (Amps)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="chg-cap">Battery Capacity (mAh)</label>
          <input class="tool-textarea" id="chg-cap" type="number" step="any" value="5000" placeholder="5000 mAh" />
        </div>
        <div class="control-group">
          <label class="control-label" for="chg-current">Charger Output (Amps)</label>
          <input class="tool-textarea" id="chg-current" type="number" step="any" value="2.0" placeholder="2.0 A (2000 mA)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="chg-chem">Chemistry Efficiency</label>
          <select class="tool-textarea" id="chg-chem">
            <option value="0.90" selected>Li-ion / LiPo / LiFePO4 (90% Efficient)</option>
            <option value="0.75">Lead-Acid / AGM (75% Efficient)</option>
            <option value="0.65">NiMH / NiCad (65% Efficient)</option>
          </select>
        </div>
      </div>
      <div id="chg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="chg-res-time" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.78 Hours (2h 47m)</span>
            <span class="stat-label">Total Charge Duration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="chg-res-c">0.40 C (Gentle Charge)</span>
            <span class="stat-label">C-Rate Charge Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const capEl = document.getElementById('chg-cap'), curEl = document.getElementById('chg-current'), chemEl = document.getElementById('chg-chem');
  const tResEl = document.getElementById('chg-res-time'), cResEl = document.getElementById('chg-res-c');

  function update() {
    const capMah = parseFloat(capEl.value), curA = parseFloat(curEl.value), eff = parseFloat(chemEl.value);
    if (isNaN(capMah) || isNaN(curA) || isNaN(eff) || capMah <= 0 || curA <= 0 || eff <= 0) return;

    const curMa = curA * 1000;
    // Charge Time (Hours) = (Capacity / Current) / Efficiency
    const timeH = (capMah / curMa) / eff;
    const hours = Math.floor(timeH);
    const mins = Math.round((timeH - hours) * 60);

    // C-rate = Current (A) / Capacity (Ah)
    const capAh = capMah / 1000;
    const cRate = curA / capAh;

    tResEl.textContent = timeH.toFixed(2) + ' Hours (' + hours + 'h ' + mins + 'm)';
    cResEl.textContent = cRate.toFixed(2) + ' C (' + (cRate <= 0.5 ? 'Gentle Long-Life' : (cRate <= 1.0 ? 'Standard 1C' : 'Fast Fast-Charge')) + ')';
  }

  [capEl, curEl, chemEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter battery capacity in milliamp-hours (mAh).',
      'Enter charger supply rating in Amperes (e.g. 1.0A standard, 2.4A fast).',
      'Select battery chemistry (Lithium, Lead-Acid, NiMH).',
      'Inspect estimated recharge duration and C-rate charging speed.'
    ],
    benefitTitle: 'CC-CV Charge Curve Efficiency Losses',
    benefitContent: 'Lithium charging follows a Constant Current / Constant Voltage (CC-CV) profile; internal chemical resistance and thermal conversion losses consume ~10% of input energy.',
    faqs: [{ q: 'What is 1C charging rate?', a: '1C charge current equals the 1-hour numerical capacity of the battery (e.g. 5.0A for a 5,000 mAh pack).' }]
  },

  // 5. Off-Grid Solar Battery Bank Sizing Calculator
  {
    slug: 'solar-battery-bank-sizing-calculator',
    name: 'Off-Grid Solar Battery Bank Capacity Calculator',
    description: 'Calculate required off-grid solar battery bank capacity in Amp-Hours (Ah) and Kilowatt-Hours (kWh) based on daily Watt-hour loads, days of autonomy, and Depth of Discharge (DoD).',
    category: 'Daily',
    icon: 'text',
    keywords: ['solar battery bank calculator', 'off grid battery sizing calculator', 'solar battery ah capacity formula', 'days of autonomy solar battery', 'lifepo4 vs lead acid solar sizing'],
    order: 323,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Daily Energy Load (Wh), Autonomy & System Voltage',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sb-load">Daily Load (Watt-Hours Wh)</label>
          <input class="tool-textarea" id="sb-load" type="number" step="any" value="2500" placeholder="2500 Wh / day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-auton">Days of Autonomy (No Sun)</label>
          <input class="tool-textarea" id="sb-auton" type="number" min="1" max="7" value="2" placeholder="2 Days" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-volt">System Voltage (V)</label>
          <select class="tool-textarea" id="sb-volt">
            <option value="12">12 Volts DC (Small RV / Cabin)</option>
            <option value="24" selected>24 Volts DC (Mid-size Solar)</option>
            <option value="48">48 Volts DC (Full Residential)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-dod">Battery Chemistry (DoD)</label>
          <select class="tool-textarea" id="sb-dod">
            <option value="0.85" selected>LiFePO4 Lithium (85% Safe DoD)</option>
            <option value="0.50">Lead-Acid / AGM (50% Max DoD)</option>
          </select>
        </div>
      </div>
      <div id="sb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sb-res-ah" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">245.1 Ah</span>
            <span class="stat-label">Required Battery Bank Capacity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sb-res-kwh" style="font-weight:700;">5.88 kWh</span>
            <span class="stat-label">Total Stored Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const loadEl = document.getElementById('sb-load'), autEl = document.getElementById('sb-auton');
  const voltEl = document.getElementById('sb-volt'), dodEl = document.getElementById('sb-dod');
  const ahResEl = document.getElementById('sb-res-ah'), kwhResEl = document.getElementById('sb-res-kwh');

  function update() {
    const dailyWh = parseFloat(loadEl.value), daysAuton = parseFloat(autEl.value);
    const sysVolt = parseFloat(voltEl.value), dod = parseFloat(dodEl.value);
    if (isNaN(dailyWh) || isNaN(daysAuton) || isNaN(sysVolt) || isNaN(dod) || dailyWh <= 0 || daysAuton < 1 || sysVolt <= 0 || dod <= 0) return;

    // Total Wh needed = (Daily Wh * Autonomy Days) / (DoD * 0.90 Inverter Efficiency)
    const totalWhNeeded = (dailyWh * daysAuton) / (dod * 0.90);
    const totalAhNeeded = totalWhNeeded / sysVolt;
    const totalKwh = totalWhNeeded / 1000;

    ahResEl.textContent = totalAhNeeded.toFixed(1) + ' Ah @ ' + sysVolt + 'V';
    kwhResEl.textContent = totalKwh.toFixed(2) + ' kWh';
  }

  [loadEl, autEl, voltEl, dodEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total daily electrical consumption in Watt-Hours (Wh) (sum of all lights, fridge, laptop, appliances).',
      'Enter desired days of autonomy (backup cloudy days buffer).',
      'Select system DC voltage (12V, 24V, 48V) and battery chemistry DoD.',
      'Inspect required battery capacity in Amp-Hours (Ah) and storage in kWh.'
    ],
    benefitTitle: 'Why 48V Systems Reduce Cable Losses',
    benefitContent: 'At 48 Volts, current is 4x lower than a 12V system for the exact same power (P = V·I), dramatically reducing I²R cable heating losses and allowing much thinner copper wiring.',
    faqs: [{ q: 'Why is Depth of Discharge (DoD) critical?', a: 'Discharging Lead-Acid batteries past 50% severely shortens their lifespan; LiFePO4 lithium batteries safely deliver 80-90% usable depth of discharge without degrading cycle life.' }]
  }
];

toolsSuiteBB.forEach(createTool);
console.log('Suite BB complete: 5 tools created.');
