const { createTool } = require('./generate-curated-tools.cjs');

const tools6 = [
  // 1. Multi-Unit Pressure Converter
  {
    slug: 'pressure-bar-psi-kpa-atm-converter',
    name: 'Pressure Unit Converter (Bar, PSI, kPa, atm)',
    description: 'Convert pressure measurements across Bar, PSI, Kilopascals (kPa), Standard Atmospheres (atm), and Torr / mmHg in real time.',
    category: 'Science',
    icon: 'text',
    keywords: ['pressure unit converter', 'psi to bar converter', 'kpa to psi converter', 'bar to atm converter', 'pressure conversion matrix online'],
    order: 129,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Pressure Converter',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pr-bar">Bar (bar)</label>
          <input class="tool-textarea" id="pr-bar" type="number" step="any" value="1.0" placeholder="Bar" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-psi">Pound / Sq Inch (PSI)</label>
          <input class="tool-textarea" id="pr-psi" type="number" step="any" placeholder="PSI" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-kpa">Kilopascals (kPa)</label>
          <input class="tool-textarea" id="pr-kpa" type="number" step="any" placeholder="kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-atm">Atmospheres (atm)</label>
          <input class="tool-textarea" id="pr-atm" type="number" step="any" placeholder="atm" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const barEl = document.getElementById('pr-bar'), psiEl = document.getElementById('pr-psi');
  const kpaEl = document.getElementById('pr-kpa'), atmEl = document.getElementById('pr-atm');

  function updateFromBar(bar) {
    psiEl.value = (bar * 14.50377).toFixed(3);
    kpaEl.value = (bar * 100).toFixed(2);
    atmEl.value = (bar * 0.986923).toFixed(4);
  }

  barEl.addEventListener('input', () => {
    const v = parseFloat(barEl.value);
    if (!isNaN(v)) updateFromBar(v);
  });

  psiEl.addEventListener('input', () => {
    const v = parseFloat(psiEl.value);
    if (!isNaN(v)) {
      const bar = v / 14.50377;
      barEl.value = bar.toFixed(4);
      kpaEl.value = (bar * 100).toFixed(2);
      atmEl.value = (bar * 0.986923).toFixed(4);
    }
  });

  kpaEl.addEventListener('input', () => {
    const v = parseFloat(kpaEl.value);
    if (!isNaN(v)) {
      const bar = v / 100;
      barEl.value = bar.toFixed(4);
      psiEl.value = (bar * 14.50377).toFixed(3);
      atmEl.value = (bar * 0.986923).toFixed(4);
    }
  });

  atmEl.addEventListener('input', () => {
    const v = parseFloat(atmEl.value);
    if (!isNaN(v)) {
      const bar = v / 0.986923;
      barEl.value = bar.toFixed(4);
      psiEl.value = (bar * 14.50377).toFixed(3);
      kpaEl.value = (bar * 100).toFixed(2);
    }
  });

  updateFromBar(1.0);
})();`,
    howToSteps: [
      'Type into any pressure field (Bar, PSI, kPa, or atm).',
      'All other fields automatically calculate and sync simultaneously.'
    ],
    benefitTitle: 'Standard Atmospheric Pressure References',
    benefitContent: '1 Standard Atmosphere (1 atm) = 1.01325 bar = 101.325 kPa = 14.696 PSI = 760 mmHg.',
    faqs: [{ q: 'What is 1 bar in PSI?', a: '1 bar equals approximately 14.504 PSI.' }]
  },

  // 2. Tri-Directional Temperature Converter
  {
    slug: 'temperature-kelvin-celsius-fahrenheit-converter',
    name: 'Temperature Converter (Celsius, Fahrenheit, Kelvin)',
    description: 'Convert temperatures simultaneously between Celsius (°C), Fahrenheit (°F), Kelvin (K), and Rankine (°R) in real time.',
    category: 'Science',
    icon: 'text',
    keywords: ['temperature converter', 'celsius to fahrenheit converter', 'fahrenheit to celsius calculator', 'kelvin to celsius converter', 'temperature conversion matrix'],
    order: 130,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Temperature Converter',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tp-c">Celsius (°C)</label>
          <input class="tool-textarea" id="tp-c" type="number" step="any" value="25" placeholder="°C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-f">Fahrenheit (°F)</label>
          <input class="tool-textarea" id="tp-f" type="number" step="any" placeholder="°F" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tp-k">Kelvin (K)</label>
          <input class="tool-textarea" id="tp-k" type="number" step="any" placeholder="K" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('tp-c'), fEl = document.getElementById('tp-f'), kEl = document.getElementById('tp-k');

  function updateFromC(c) {
    fEl.value = ((c * 9/5) + 32).toFixed(2);
    kEl.value = (c + 273.15).toFixed(2);
  }

  cEl.addEventListener('input', () => {
    const v = parseFloat(cEl.value);
    if (!isNaN(v)) updateFromC(v);
  });

  fEl.addEventListener('input', () => {
    const v = parseFloat(fEl.value);
    if (!isNaN(v)) {
      const c = (v - 32) * 5/9;
      cEl.value = c.toFixed(2);
      kEl.value = (c + 273.15).toFixed(2);
    }
  });

  kEl.addEventListener('input', () => {
    const v = parseFloat(kEl.value);
    if (!isNaN(v)) {
      const c = v - 273.15;
      cEl.value = c.toFixed(2);
      fEl.value = ((c * 9/5) + 32).toFixed(2);
    }
  });

  updateFromC(25);
})();`,
    howToSteps: [
      'Type into any temperature box (Celsius, Fahrenheit, or Kelvin).',
      'The remaining temperature scales update instantly.'
    ],
    benefitTitle: 'Temperature Conversion Formulas',
    benefitContent: '°F = (°C × 9/5) + 32, °C = (°F - 32) × 5/9, and K = °C + 273.15.',
    faqs: [{ q: 'At what temperature are Celsius and Fahrenheit equal?', a: '-40 °C is exactly equal to -40 °F.' }]
  },

  // 3. Energy Converter (Joules, Calories, kWh, BTU)
  {
    slug: 'energy-joules-calories-kwh-btu-converter',
    name: 'Energy Unit Converter (Joules, kWh, Calories, BTU)',
    description: 'Convert energy units between Joules (J), Kilowatt-Hours (kWh), Food Calories (kcal), British Thermal Units (BTU), and Electron-Volts (eV).',
    category: 'Science',
    icon: 'text',
    keywords: ['energy unit converter', 'joules to kwh converter', 'calories to joules calculator', 'btu to kwh converter', 'energy conversion table online'],
    order: 131,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Energy Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="en-j">Joules (J)</label>
          <input class="tool-textarea" id="en-j" type="number" step="any" value="3600000" placeholder="Joules" />
        </div>
        <div class="control-group">
          <label class="control-label" for="en-kwh">Kilowatt-Hours (kWh)</label>
          <input class="tool-textarea" id="en-kwh" type="number" step="any" placeholder="kWh" />
        </div>
        <div class="control-group">
          <label class="control-label" for="en-kcal">Food Calories (kcal)</label>
          <input class="tool-textarea" id="en-kcal" type="number" step="any" placeholder="kcal" />
        </div>
        <div class="control-group">
          <label class="control-label" for="en-btu">BTU (British Thermal Units)</label>
          <input class="tool-textarea" id="en-btu" type="number" step="any" placeholder="BTU" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const jEl = document.getElementById('en-j'), kwhEl = document.getElementById('en-kwh');
  const kcalEl = document.getElementById('en-kcal'), btuEl = document.getElementById('en-btu');

  function updateFromJ(j) {
    kwhEl.value = (j / 3600000).toFixed(4);
    kcalEl.value = (j / 4184).toFixed(2);
    btuEl.value = (j / 1055.06).toFixed(2);
  }

  jEl.addEventListener('input', () => {
    const v = parseFloat(jEl.value);
    if (!isNaN(v)) updateFromJ(v);
  });

  kwhEl.addEventListener('input', () => {
    const v = parseFloat(kwhEl.value);
    if (!isNaN(v)) {
      const j = v * 3600000;
      jEl.value = j.toFixed(0);
      kcalEl.value = (j / 4184).toFixed(2);
      btuEl.value = (j / 1055.06).toFixed(2);
    }
  });

  kcalEl.addEventListener('input', () => {
    const v = parseFloat(kcalEl.value);
    if (!isNaN(v)) {
      const j = v * 4184;
      jEl.value = j.toFixed(0);
      kwhEl.value = (j / 3600000).toFixed(4);
      btuEl.value = (j / 1055.06).toFixed(2);
    }
  });

  btuEl.addEventListener('input', () => {
    const v = parseFloat(btuEl.value);
    if (!isNaN(v)) {
      const j = v * 1055.06;
      jEl.value = j.toFixed(0);
      kwhEl.value = (j / 3600000).toFixed(4);
      kcalEl.value = (j / 4184).toFixed(2);
    }
  });

  updateFromJ(3600000);
})();`,
    howToSteps: [
      'Enter an energy value into Joules, kWh, Calories, or BTU.',
      'Inspect the instant cross-unit conversion.'
    ],
    benefitTitle: 'Energy Equivalence Standards',
    benefitContent: '1 kWh = exactly 3.6 Million Joules (3.6 MJ). 1 Food Calorie (kcal) = 4,184 Joules. 1 BTU = 1,055.06 Joules.',
    faqs: [{ q: 'How many calories in 1 kWh of electricity?', a: '1 kWh of electrical energy equals approximately 860.4 food Calories (kcal).' }]
  },

  // 4. Speed Converter (km/h, mph, m/s, knots)
  {
    slug: 'speed-kmh-mph-ms-knots-converter',
    name: 'Speed & Velocity Converter (km/h, mph, m/s, knots)',
    description: 'Convert speeds and velocities across kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), and nautical knots.',
    category: 'Science',
    icon: 'text',
    keywords: ['speed converter', 'kmh to mph converter', 'mph to kmh calculator', 'ms to kmh converter', 'knots to mph speed calculator'],
    order: 132,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Velocity Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-kmh">Kilometers / Hour (km/h)</label>
          <input class="tool-textarea" id="sp-kmh" type="number" step="any" value="100" placeholder="km/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-mph">Miles / Hour (mph)</label>
          <input class="tool-textarea" id="sp-mph" type="number" step="any" placeholder="mph" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-ms">Meters / Second (m/s)</label>
          <input class="tool-textarea" id="sp-ms" type="number" step="any" placeholder="m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-knots">Knots (nmi/h)</label>
          <input class="tool-textarea" id="sp-knots" type="number" step="any" placeholder="knots" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kmhEl = document.getElementById('sp-kmh'), mphEl = document.getElementById('sp-mph');
  const msEl = document.getElementById('sp-ms'), knotEl = document.getElementById('sp-knots');

  function updateFromKmh(kmh) {
    mphEl.value = (kmh * 0.621371).toFixed(2);
    msEl.value = (kmh / 3.6).toFixed(2);
    knotEl.value = (kmh * 0.539957).toFixed(2);
  }

  kmhEl.addEventListener('input', () => {
    const v = parseFloat(kmhEl.value);
    if (!isNaN(v)) updateFromKmh(v);
  });

  mphEl.addEventListener('input', () => {
    const v = parseFloat(mphEl.value);
    if (!isNaN(v)) {
      const kmh = v / 0.621371;
      kmhEl.value = kmh.toFixed(2);
      msEl.value = (kmh / 3.6).toFixed(2);
      knotEl.value = (kmh * 0.539957).toFixed(2);
    }
  });

  msEl.addEventListener('input', () => {
    const v = parseFloat(msEl.value);
    if (!isNaN(v)) {
      const kmh = v * 3.6;
      kmhEl.value = kmh.toFixed(2);
      mphEl.value = (kmh * 0.621371).toFixed(2);
      knotEl.value = (kmh * 0.539957).toFixed(2);
    }
  });

  knotEl.addEventListener('input', () => {
    const v = parseFloat(knotEl.value);
    if (!isNaN(v)) {
      const kmh = v / 0.539957;
      kmhEl.value = kmh.toFixed(2);
      mphEl.value = (kmh * 0.621371).toFixed(2);
      msEl.value = (kmh / 3.6).toFixed(2);
    }
  });

  updateFromKmh(100);
})();`,
    howToSteps: [
      'Enter any speed in km/h, mph, m/s, or nautical knots.',
      'View immediate conversions across all velocity systems.'
    ],
    benefitTitle: 'Aviation & Marine Knot Reference',
    benefitContent: '1 Knot equals 1 nautical mile per hour (exactly 1.852 km/h or 1.151 mph).',
    faqs: [{ q: 'What is 100 km/h in mph?', a: '100 km/h equals 62.14 mph.' }]
  },

  // 5. Data Storage Decimal vs Binary Units Converter
  {
    slug: 'data-storage-bytes-kb-mb-gb-tb-converter',
    name: 'Data Storage Unit Converter (KB, MB, GB, TB, GiB)',
    description: 'Convert file sizes between decimal storage units (KB, MB, GB, TB) and binary memory units (KiB, MiB, GiB, TiB) with exact byte counts.',
    category: 'Developer',
    icon: 'code',
    keywords: ['data storage converter', 'gb to mb converter', 'gib to gb calculator', 'bytes to gb calculator', 'binary decimal storage converter'],
    order: 133,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Data Capacity Size Converter',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:2fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ds-val">Size Value</label>
          <input class="tool-textarea" id="ds-val" type="number" step="any" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-unit">Source Unit</label>
          <select class="tool-textarea" id="ds-unit">
            <option value="B">Bytes (B)</option>
            <option value="KB">Kilobytes (KB - 1000 B)</option>
            <option value="MB">Megabytes (MB - 1000 KB)</option>
            <option value="GB" selected>Gigabytes (GB - 1000 MB)</option>
            <option value="TB">Terabytes (TB - 1000 GB)</option>
            <option value="GiB">Gibibytes (GiB - 1024 MiB)</option>
            <option value="TiB">Tebibytes (TiB - 1024 GiB)</option>
          </select>
        </div>
      </div>
      <div id="ds-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="ds-res-bytes" style="font-family:monospace; font-size:1.1rem; color:var(--green-dark);">1,000,000,000</span>
            <span class="stat-label">Total Bytes</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ds-res-mb">1,000 MB</span>
            <span class="stat-label">Decimal Megabytes (MB)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ds-res-gib">0.931 GiB</span>
            <span class="stat-label">Binary Memory (GiB)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const valEl = document.getElementById('ds-val'), unitEl = document.getElementById('ds-unit');
  const bEl = document.getElementById('ds-res-bytes'), mbEl = document.getElementById('ds-res-mb'), gibEl = document.getElementById('ds-res-gib');

  const FACTORS = {
    'B': 1,
    'KB': 1e3, 'MB': 1e6, 'GB': 1e9, 'TB': 1e12,
    'KiB': 1024, 'MiB': 1048576, 'GiB': 1073741824, 'TiB': 1099511627776
  };

  function update() {
    const v = parseFloat(valEl.value);
    const unit = unitEl.value;
    if (isNaN(v) || v < 0) return;

    const totalBytes = v * (FACTORS[unit] || 1);
    const mb = totalBytes / 1e6;
    const gib = totalBytes / 1073741824;

    bEl.textContent = Math.round(totalBytes).toLocaleString() + ' Bytes';
    mbEl.textContent = mb.toFixed(2) + ' MB';
    gibEl.textContent = gib.toFixed(3) + ' GiB';
  }

  valEl.addEventListener('input', update);
  unitEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter the storage capacity number.',
      'Select source decimal (GB, TB) or binary (GiB, TiB) unit.',
      'Inspect the exact byte translation.'
    ],
    benefitTitle: 'Why 1 TB Hard Drives Show as 931 GB in Windows',
    benefitContent: 'Hard drive manufacturers sell storage in decimal SI units (1 TB = 10¹² Bytes), but Windows displays storage in binary gibibytes (1 GiB = 2³⁰ Bytes), causing 1,000,000,000,000 Bytes / 1,073,741,824 = 931.32 GiB.',
    faqs: [{ q: 'What is 1 Gigabyte vs 1 Gibibyte?', a: '1 GB is 1,000,000,000 Bytes (10⁹), whereas 1 GiB is 1,073,741,824 Bytes (2³⁰).' }]
  }
];

tools6.forEach(createTool);
console.log('Mega pack 6 complete.');
