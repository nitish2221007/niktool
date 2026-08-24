const { createTool } = require('./generate-curated-tools.cjs');

// Suite H: 5 Tools in Geometry Angles, Force, Power, Volume & Land Area Conversions
const toolsSuiteH = [
  // 1. Angle Degrees, Radians & Gradians Converter
  {
    slug: 'angle-degrees-radians-gradians-converter',
    name: 'Angle Unit Converter (Degrees, Radians, Gradians)',
    description: 'Convert angles across Decimal Degrees, Radians (rad, π), Gradians (gon), Arcminutes (MOA), and Arcseconds in real time.',
    category: 'Math',
    icon: 'text',
    keywords: ['angle unit converter', 'degrees to radians converter', 'radians to degrees online', 'gradians to degrees calculator', 'arcminutes moa converter'],
    order: 219,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Angle Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ang-deg">Degrees (°)</label>
          <input class="tool-textarea" id="ang-deg" type="number" step="any" value="180" placeholder="180°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ang-rad">Radians (rad)</label>
          <input class="tool-textarea" id="ang-rad" type="number" step="any" placeholder="3.1416 rad" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ang-grad">Gradians (gon / grad)</label>
          <input class="tool-textarea" id="ang-grad" type="number" step="any" placeholder="200 grad" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ang-moa">Arcminutes (MOA / \')</label>
          <input class="tool-textarea" id="ang-moa" type="number" step="any" placeholder="10,800 MOA" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const degEl = document.getElementById('ang-deg'), radEl = document.getElementById('ang-rad');
  const gradEl = document.getElementById('ang-grad'), moaEl = document.getElementById('ang-moa');

  function updateFromDeg(deg) {
    const rad = (deg * Math.PI) / 180;
    const grad = (deg * 400) / 360;
    const moa = deg * 60;

    radEl.value = rad.toFixed(5);
    gradEl.value = grad.toFixed(2);
    moaEl.value = moa.toFixed(1);
  }

  degEl.addEventListener('input', () => {
    const v = parseFloat(degEl.value);
    if (!isNaN(v)) updateFromDeg(v);
  });

  radEl.addEventListener('input', () => {
    const v = parseFloat(radEl.value);
    if (!isNaN(v)) {
      const deg = (v * 180) / Math.PI;
      degEl.value = deg.toFixed(4);
      gradEl.value = ((deg * 400) / 360).toFixed(2);
      moaEl.value = (deg * 60).toFixed(1);
    }
  });

  gradEl.addEventListener('input', () => {
    const v = parseFloat(gradEl.value);
    if (!isNaN(v)) {
      const deg = (v * 360) / 400;
      degEl.value = deg.toFixed(4);
      radEl.value = ((deg * Math.PI) / 180).toFixed(5);
      moaEl.value = (deg * 60).toFixed(1);
    }
  });

  updateFromDeg(180);
})();`,
    howToSteps: [
      'Type into any angle field (Degrees, Radians, Gradians, or MOA).',
      'Inspect instant conversions across all mathematical angle systems.'
    ],
    benefitTitle: 'Angle Units in Trigonometry and Ballistics',
    benefitContent: '180 Degrees = π Radians (3.14159 rad) = 200 Gradians = 10,800 Minutes of Angle (MOA).',
    faqs: [{ q: 'What is 1 Radian in degrees?', a: '1 Radian = 180 / π ≈ 57.2958 degrees.' }]
  },

  // 2. Force Unit Converter (Newtons, Dynes, lbf, kgf)
  {
    slug: 'force-newtons-dynes-lbf-kgf-converter',
    name: 'Force Unit Converter (Newtons, lbf, kgf, Dynes)',
    description: 'Convert mechanical force units across Newtons (N), Pound-Force (lbf), Kilogram-Force (kgf / kp), Dynes (dyn), and Kilonewtons (kN).',
    category: 'Science',
    icon: 'text',
    keywords: ['force unit converter', 'newtons to pound force lbf', 'kgf to newtons converter', 'dynes to newtons calculator', 'force conversion matrix online'],
    order: 220,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Force Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fc-n">Newtons (N)</label>
          <input class="tool-textarea" id="fc-n" type="number" step="any" value="100" placeholder="Newtons" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-lbf">Pound-Force (lbf)</label>
          <input class="tool-textarea" id="fc-lbf" type="number" step="any" placeholder="lbf" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-kgf">Kilogram-Force (kgf)</label>
          <input class="tool-textarea" id="fc-kgf" type="number" step="any" placeholder="kgf" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-dyn">Dynes (dyn)</label>
          <input class="tool-textarea" id="fc-dyn" type="text" placeholder="Dynes" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('fc-n'), lbfEl = document.getElementById('fc-lbf');
  const kgfEl = document.getElementById('fc-kgf'), dynEl = document.getElementById('fc-dyn');

  function updateFromN(n) {
    lbfEl.value = (n * 0.224809).toFixed(3);
    kgfEl.value = (n / 9.80665).toFixed(3);
    dynEl.value = (n * 1e5).toExponential(2);
  }

  nEl.addEventListener('input', () => {
    const v = parseFloat(nEl.value);
    if (!isNaN(v)) updateFromN(v);
  });

  lbfEl.addEventListener('input', () => {
    const v = parseFloat(lbfEl.value);
    if (!isNaN(v)) {
      const n = v / 0.224809;
      nEl.value = n.toFixed(2);
      kgfEl.value = (n / 9.80665).toFixed(3);
      dynEl.value = (n * 1e5).toExponential(2);
    }
  });

  kgfEl.addEventListener('input', () => {
    const v = parseFloat(kgfEl.value);
    if (!isNaN(v)) {
      const n = v * 9.80665;
      nEl.value = n.toFixed(2);
      lbfEl.value = (n * 0.224809).toFixed(3);
      dynEl.value = (n * 1e5).toExponential(2);
    }
  });

  updateFromN(100);
})();`,
    howToSteps: [
      'Enter force in Newtons, Pound-Force (lbf), or Kilogram-Force (kgf).',
      'Inspect conversions across SI, Imperial, and CGS units.'
    ],
    benefitTitle: 'Force Standards in Engineering',
    benefitContent: '1 Newton = 1 kg·m/s² ≈ 0.2248 lbf ≈ 100,000 Dynes.',
    faqs: [{ q: 'What is 1 kgf in Newtons?', a: '1 kgf (the force exerted by 1 kg mass under standard Earth gravity) equals exactly 9.80665 Newtons.' }]
  },

  // 3. Power Unit Converter (Watts, HP, kW, BTU/hr)
  {
    slug: 'power-watts-horsepower-kw-converter',
    name: 'Power Unit Converter (Watts, Horsepower, kW, BTU/hr)',
    description: 'Convert mechanical, electrical, and thermal power across Watts (W), Kilowatts (kW), Mechanical Horsepower (HP), and BTU per hour (BTU/hr).',
    category: 'Science',
    icon: 'text',
    keywords: ['power unit converter', 'watts to horsepower calculator', 'kw to hp converter', 'btu per hour to kw converter', 'mechanical horsepower converter online'],
    order: 221,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Simultaneous Power Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pw-kw">Kilowatts (kW)</label>
          <input class="tool-textarea" id="pw-kw" type="number" step="any" value="100" placeholder="kW" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-hp">Mechanical Horsepower (HP)</label>
          <input class="tool-textarea" id="pw-hp" type="number" step="any" placeholder="HP" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-w">Watts (W)</label>
          <input class="tool-textarea" id="pw-w" type="number" step="any" placeholder="Watts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-btu">BTU / Hour (BTU/hr)</label>
          <input class="tool-textarea" id="pw-btu" type="number" step="any" placeholder="BTU/hr" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kwEl = document.getElementById('pw-kw'), hpEl = document.getElementById('pw-hp');
  const wEl = document.getElementById('pw-w'), btuEl = document.getElementById('pw-btu');

  function updateFromKw(kw) {
    hpEl.value = (kw * 1.34102).toFixed(2);
    wEl.value = (kw * 1000).toFixed(0);
    btuEl.value = (kw * 3412.142).toFixed(0);
  }

  kwEl.addEventListener('input', () => {
    const v = parseFloat(kwEl.value);
    if (!isNaN(v)) updateFromKw(v);
  });

  hpEl.addEventListener('input', () => {
    const v = parseFloat(hpEl.value);
    if (!isNaN(v)) {
      const kw = v / 1.34102;
      kwEl.value = kw.toFixed(2);
      wEl.value = (kw * 1000).toFixed(0);
      btuEl.value = (kw * 3412.142).toFixed(0);
    }
  });

  updateFromKw(100);
})();`,
    howToSteps: [
      'Enter power in Kilowatts, Horsepower, or Watts.',
      'Inspect conversions across mechanical motor and thermal cooling units.'
    ],
    benefitTitle: 'Horsepower Origin by James Watt',
    benefitContent: 'James Watt defined 1 mechanical Horsepower as 33,000 foot-pounds of work per minute = 745.7 Watts to market steam engines against draft horses.',
    faqs: [{ q: 'What is 100 kW in horsepower?', a: '100 kW = approximately 134.1 Mechanical Horsepower (HP).' }]
  },

  // 4. Liquid Volume Converter (Liters, Gallons, Cups, Fl Oz, mL)
  {
    slug: 'volume-liters-gallons-cups-fluid-ounces-converter',
    name: 'Liquid Volume Unit Converter (Liters, Gallons, Cups, fl oz)',
    description: 'Convert liquid volumes across Liters (L), US Gallons (gal), Milliliters (mL), Fluid Ounces (fl oz), Cups, Quarts, and Pints.',
    category: 'Daily',
    icon: 'text',
    keywords: ['liquid volume converter', 'liters to gallons converter', 'gallons to liters calculator', 'fluid ounces to ml converter', 'cups to ml volume converter online'],
    order: 222,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Liquid Volume Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vol-l">Liters (L)</label>
          <input class="tool-textarea" id="vol-l" type="number" step="any" value="3.785" placeholder="Liters" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vol-gal">US Gallons (gal)</label>
          <input class="tool-textarea" id="vol-gal" type="number" step="any" placeholder="Gallons" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vol-floz">Fluid Ounces (fl oz)</label>
          <input class="tool-textarea" id="vol-floz" type="number" step="any" placeholder="fl oz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vol-cups">US Cups</label>
          <input class="tool-textarea" id="vol-cups" type="number" step="any" placeholder="Cups" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('vol-l'), galEl = document.getElementById('vol-gal');
  const flozEl = document.getElementById('vol-floz'), cupEl = document.getElementById('vol-cups');

  function updateFromL(l) {
    galEl.value = (l / 3.78541).toFixed(3);
    flozEl.value = (l * 33.814).toFixed(2);
    cupEl.value = (l * 4.22675).toFixed(2);
  }

  lEl.addEventListener('input', () => {
    const v = parseFloat(lEl.value);
    if (!isNaN(v)) updateFromL(v);
  });

  galEl.addEventListener('input', () => {
    const v = parseFloat(galEl.value);
    if (!isNaN(v)) {
      const l = v * 3.78541;
      lEl.value = l.toFixed(3);
      flozEl.value = (l * 33.814).toFixed(2);
      cupEl.value = (l * 4.22675).toFixed(2);
    }
  });

  updateFromL(3.785);
})();`,
    howToSteps: [
      'Enter liquid volume in Liters or US Gallons.',
      'Inspect exact metric and Imperial volume equivalents.'
    ],
    benefitTitle: 'US Liquid Gallon vs Imperial Gallon',
    benefitContent: '1 US Liquid Gallon = 3.78541 Liters (128 US fl oz), whereas 1 UK Imperial Gallon = 4.54609 Liters (160 Imperial fl oz).',
    faqs: [{ q: 'How many cups in 1 US Gallon?', a: '1 US Gallon contains exactly 16 standard US measuring cups.' }]
  },

  // 5. Land Area Converter (Sq Ft, Sq Meters, Acres, Hectares)
  {
    slug: 'area-sqft-sqm-acres-hectares-converter',
    name: 'Land Area Converter (Sq Ft, Sq Meters, Acres, Hectares)',
    description: 'Convert real estate land areas across Square Feet (sq ft), Square Meters (m²), Acres, Hectares (ha), and Square Yards in real time.',
    category: 'Daily',
    icon: 'text',
    keywords: ['land area converter', 'square feet to square meters converter', 'acres to hectares calculator', 'sq ft to acres converter', 'real estate area converter online'],
    order: 223,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Land Area Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ar-acres">Acres</label>
          <input class="tool-textarea" id="ar-acres" type="number" step="any" value="1.0" placeholder="Acres" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-sqft">Square Feet (sq ft)</label>
          <input class="tool-textarea" id="ar-sqft" type="number" step="any" placeholder="sq ft" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-sqm">Square Meters (m²)</label>
          <input class="tool-textarea" id="ar-sqm" type="number" step="any" placeholder="m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-ha">Hectares (ha)</label>
          <input class="tool-textarea" id="ar-ha" type="number" step="any" placeholder="ha" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const acEl = document.getElementById('ar-acres'), sqftEl = document.getElementById('ar-sqft');
  const sqmEl = document.getElementById('ar-sqm'), haEl = document.getElementById('ar-ha');

  function updateFromAcres(ac) {
    sqftEl.value = (ac * 43560).toFixed(0);
    sqmEl.value = (ac * 4046.856).toFixed(1);
    haEl.value = (ac * 0.404686).toFixed(4);
  }

  acEl.addEventListener('input', () => {
    const v = parseFloat(acEl.value);
    if (!isNaN(v)) updateFromAcres(v);
  });

  sqftEl.addEventListener('input', () => {
    const v = parseFloat(sqftEl.value);
    if (!isNaN(v)) {
      const ac = v / 43560;
      acEl.value = ac.toFixed(4);
      sqmEl.value = (ac * 4046.856).toFixed(1);
      haEl.value = (ac * 0.404686).toFixed(4);
    }
  });

  updateFromAcres(1.0);
})();`,
    howToSteps: [
      'Enter land plot size in Acres, Square Feet, or Square Meters.',
      'Inspect conversions across international agricultural and residential surveying units.'
    ],
    benefitTitle: 'Land Measurement Standards',
    benefitContent: '1 Acre = exactly 43,560 square feet = 4,046.86 m². 1 Hectare = 10,000 m² ≈ 2.471 Acres.',
    faqs: [{ q: 'How many square feet in 1 Acre of land?', a: '1 Acre contains exactly 43,560 square feet.' }]
  }
];

toolsSuiteH.forEach(createTool);
console.log('Suite H complete: 5 tools created.');
