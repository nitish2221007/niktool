const { createTool } = require('./generate-curated-tools.cjs');

// Suite I: 5 Tools in Length, Weight, Number Radixes & Text Numerals
const toolsSuiteI = [
  // 1. Length & Distance Multi-Unit Converter
  {
    slug: 'length-inches-cm-feet-meters-yards-converter',
    name: 'Length & Distance Unit Converter (Inches, cm, Feet, Meters)',
    description: 'Convert lengths and distances across Centimeters (cm), Inches (in), Feet (ft), Meters (m), Yards (yd), Kilometers (km), and Miles.',
    category: 'Daily',
    icon: 'text',
    keywords: ['length unit converter', 'inches to cm converter', 'feet to meters calculator', 'cm to inches converter online', 'yards to meters distance converter'],
    order: 224,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Length Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="len-m">Meters (m)</label>
          <input class="tool-textarea" id="len-m" type="number" step="any" value="1.0" placeholder="Meters" />
        </div>
        <div class="control-group">
          <label class="control-label" for="len-cm">Centimeters (cm)</label>
          <input class="tool-textarea" id="len-cm" type="number" step="any" placeholder="cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="len-in">Inches (in)</label>
          <input class="tool-textarea" id="len-in" type="number" step="any" placeholder="Inches" />
        </div>
        <div class="control-group">
          <label class="control-label" for="len-ft">Feet (ft)</label>
          <input class="tool-textarea" id="len-ft" type="number" step="any" placeholder="Feet" />
        </div>
        <div class="control-group">
          <label class="control-label" for="len-yd">Yards (yd)</label>
          <input class="tool-textarea" id="len-yd" type="number" step="any" placeholder="Yards" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('len-m'), cmEl = document.getElementById('len-cm');
  const inEl = document.getElementById('len-in'), ftEl = document.getElementById('len-ft'), ydEl = document.getElementById('len-yd');

  function updateFromM(m) {
    cmEl.value = (m * 100).toFixed(2);
    inEl.value = (m * 39.3701).toFixed(2);
    ftEl.value = (m * 3.28084).toFixed(3);
    ydEl.value = (m * 1.09361).toFixed(3);
  }

  mEl.addEventListener('input', () => {
    const v = parseFloat(mEl.value);
    if (!isNaN(v)) updateFromM(v);
  });

  cmEl.addEventListener('input', () => {
    const v = parseFloat(cmEl.value);
    if (!isNaN(v)) {
      const m = v / 100;
      mEl.value = m.toFixed(4);
      inEl.value = (m * 39.3701).toFixed(2);
      ftEl.value = (m * 3.28084).toFixed(3);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  inEl.addEventListener('input', () => {
    const v = parseFloat(inEl.value);
    if (!isNaN(v)) {
      const m = v * 0.0254;
      mEl.value = m.toFixed(4);
      cmEl.value = (m * 100).toFixed(2);
      ftEl.value = (m * 3.28084).toFixed(3);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  ftEl.addEventListener('input', () => {
    const v = parseFloat(ftEl.value);
    if (!isNaN(v)) {
      const m = v * 0.3048;
      mEl.value = m.toFixed(4);
      cmEl.value = (m * 100).toFixed(2);
      inEl.value = (m * 39.3701).toFixed(2);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  updateFromM(1.0);
})();`,
    howToSteps: [
      'Enter distance in any field (Meters, Centimeters, Inches, Feet, or Yards).',
      'Inspect instant conversions across Imperial and metric dimensions.'
    ],
    benefitTitle: 'International Yard and Pound Agreement (1959)',
    benefitContent: '1 International Inch is defined as exactly 25.4 millimeters (2.54 cm). 1 Foot = 12 Inches = 0.3048 meters.',
    faqs: [{ q: 'How many feet in 1 meter?', a: '1 meter equals approximately 3.28084 feet (3 feet 3.37 inches).' }]
  },

  // 2. Weight & Mass Unit Converter (kg, lbs, grams, ounces, stones)
  {
    slug: 'weight-kg-lbs-grams-ounces-stones-converter',
    name: 'Weight & Mass Unit Converter (kg, lbs, grams, oz, stones)',
    description: 'Convert weights and masses across Kilograms (kg), Pounds (lbs), Grams (g), Ounces (oz), and British Stones (st).',
    category: 'Daily',
    icon: 'text',
    keywords: ['weight unit converter', 'kg to lbs converter', 'lbs to kg calculator', 'grams to ounces converter', 'stones to kg weight calculator'],
    order: 225,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Mass Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wt-kg">Kilograms (kg)</label>
          <input class="tool-textarea" id="wt-kg" type="number" step="any" value="70" placeholder="kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-lbs">Pounds (lbs)</label>
          <input class="tool-textarea" id="wt-lbs" type="number" step="any" placeholder="lbs" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-g">Grams (g)</label>
          <input class="tool-textarea" id="wt-g" type="number" step="any" placeholder="Grams" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-oz">Ounces (oz)</label>
          <input class="tool-textarea" id="wt-oz" type="number" step="any" placeholder="Ounces" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-st">Stones (st)</label>
          <input class="tool-textarea" id="wt-st" type="number" step="any" placeholder="Stones" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kgEl = document.getElementById('wt-kg'), lbsEl = document.getElementById('wt-lbs');
  const gEl = document.getElementById('wt-g'), ozEl = document.getElementById('wt-oz'), stEl = document.getElementById('wt-st');

  function updateFromKg(kg) {
    lbsEl.value = (kg * 2.20462).toFixed(2);
    gEl.value = (kg * 1000).toFixed(0);
    ozEl.value = (kg * 35.274).toFixed(2);
    stEl.value = (kg * 0.157473).toFixed(2);
  }

  kgEl.addEventListener('input', () => {
    const v = parseFloat(kgEl.value);
    if (!isNaN(v)) updateFromKg(v);
  });

  lbsEl.addEventListener('input', () => {
    const v = parseFloat(lbsEl.value);
    if (!isNaN(v)) {
      const kg = v / 2.20462;
      kgEl.value = kg.toFixed(2);
      gEl.value = (kg * 1000).toFixed(0);
      ozEl.value = (kg * 35.274).toFixed(2);
      stEl.value = (kg * 0.157473).toFixed(2);
    }
  });

  updateFromKg(70);
})();`,
    howToSteps: [
      'Enter body or object weight in Kilograms or Pounds.',
      'Inspect conversions across Grams, Ounces, and UK Stones.'
    ],
    benefitTitle: 'Avoirdupois Mass Standards',
    benefitContent: '1 International Pound (lb) = exactly 0.45359237 Kilograms (16 Avoirdupois Ounces). 1 UK Stone = exactly 14 Pounds (~6.35 kg).',
    faqs: [{ q: 'What is 70 kg in pounds?', a: '70 kg = approximately 154.32 lbs (11 stones 0.3 lbs).' }]
  },

  // 3. 4-Way Simultaneous Number Base Matrix Converter
  {
    slug: 'binary-hex-octal-decimal-matrix-converter',
    name: 'Binary, Hex, Decimal & Octal Base Matrix Converter',
    description: 'Convert numbers simultaneously across Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16), and Octal (Base 8) in real time.',
    category: 'Developer',
    icon: 'code',
    keywords: ['binary hex decimal converter', 'hex to decimal converter online', 'binary to hex converter', 'octal to binary converter', 'number base matrix converter'],
    order: 226,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Simultaneous Positional Radix Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="base-dec">Decimal (Base 10)</label>
          <input class="tool-textarea" id="base-dec" type="text" value="255" placeholder="e.g. 255" />
        </div>
        <div class="control-group">
          <label class="control-label" for="base-bin">Binary (Base 2)</label>
          <input class="tool-textarea" id="base-bin" type="text" placeholder="e.g. 11111111" />
        </div>
        <div class="control-group">
          <label class="control-label" for="base-hex">Hexadecimal (Base 16)</label>
          <input class="tool-textarea" id="base-hex" type="text" placeholder="e.g. FF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="base-oct">Octal (Base 8)</label>
          <input class="tool-textarea" id="base-oct" type="text" placeholder="e.g. 377" />
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const decEl = document.getElementById('base-dec'), binEl = document.getElementById('base-bin');
  const hexEl = document.getElementById('base-hex'), octEl = document.getElementById('base-oct');

  function updateFromDec(num) {
    binEl.value = num.toString(2);
    hexEl.value = num.toString(16).toUpperCase();
    octEl.value = num.toString(8);
  }

  decEl.addEventListener('input', () => {
    const num = parseInt(decEl.value, 10);
    if (!isNaN(num)) updateFromDec(num);
  });

  binEl.addEventListener('input', () => {
    const num = parseInt(binEl.value, 2);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      hexEl.value = num.toString(16).toUpperCase();
      octEl.value = num.toString(8);
    }
  });

  hexEl.addEventListener('input', () => {
    const num = parseInt(hexEl.value, 16);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      binEl.value = num.toString(2);
      octEl.value = num.toString(8);
    }
  });

  octEl.addEventListener('input', () => {
    const num = parseInt(octEl.value, 8);
    if (!isNaN(num)) {
      decEl.value = num.toString(10);
      binEl.value = num.toString(2);
      hexEl.value = num.toString(16).toUpperCase();
    }
  });

  updateFromDec(255);
})();`,
    howToSteps: [
      'Type into Decimal, Binary, Hex, or Octal input fields.',
      'All 4 number bases synchronize simultaneously in real time.'
    ],
    benefitTitle: 'Positional Radix Numeral Systems',
    benefitContent: 'Computer architecture relies on binary (base 2), while humans use decimal (base 10). Hexadecimal (base 16) compactly groups 4 binary bits into a single character (nibble), and Octal groups 3 bits.',
    faqs: [{ q: 'What is 255 in binary and hexadecimal?', a: '255 Decimal = 11111111 Binary = 0xFF Hexadecimal = 377 Octal.' }]
  },

  // 4. Custom Any-to-Any Radix Numeral Converter
  {
    slug: 'number-base-any-to-any-radix-converter',
    name: 'Any-to-Any Radix (Base 2 to 36) Converter',
    description: 'Convert numbers between any custom positional base system from Base 2 (Binary) to Base 36 with full alphanumeric character support.',
    category: 'Developer',
    icon: 'code',
    keywords: ['radix converter', 'base 2 to base 36 converter', 'arbitrary base converter online', 'custom number base calculator', 'alphanumeric radix converter'],
    order: 227,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Source & Target Positional Radix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rad-val">Input Number</label>
          <input class="tool-textarea" id="rad-val" type="text" value="Z9" placeholder="Z9" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-from">From Base (2 - 36)</label>
          <input class="tool-textarea" id="rad-from" type="number" min="2" max="36" value="36" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-to">To Base (2 - 36)</label>
          <input class="tool-textarea" id="rad-to" type="number" min="2" max="36" value="10" />
        </div>
      </div>
      <div id="rad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rad-res-out" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">1269</span>
            <span class="stat-label">Converted Result</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const valEl = document.getElementById('rad-val'), fromEl = document.getElementById('rad-from'), toEl = document.getElementById('rad-to');
  const outEl = document.getElementById('rad-res-out');

  function update() {
    const val = valEl.value.trim();
    const fromBase = parseInt(fromEl.value, 10);
    const toBase = parseInt(toEl.value, 10);

    if (!val || isNaN(fromBase) || isNaN(toBase) || fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) return;

    try {
      const dec = parseInt(val, fromBase);
      if (isNaN(dec)) { outEl.textContent = 'Invalid characters for Base ' + fromBase; return; }
      outEl.textContent = dec.toString(toBase).toUpperCase();
    } catch (e) {
      outEl.textContent = 'Conversion Error';
    }
  }

  [valEl, fromEl, toEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter alphanumeric input digits (0-9 and A-Z).',
      'Select source base (2 to 36) and target base (2 to 36).',
      'Inspect the converted numeral string.'
    ],
    benefitTitle: 'Alphanumeric Base-36 Encoding',
    benefitContent: 'Base-36 utilizes all 10 Arabic digits (0-9) and 26 Latin letters (A-Z), offering extremely compact URL slugs and human-readable alphanumeric identifier serials.',
    faqs: [{ q: 'What is Z9 in Base 36 converted to Decimal Base 10?', a: 'Z9 (Base 36) = (35 × 36¹) + (9 × 36⁰) = 1,260 + 9 = 1,269 Decimal.' }]
  },

  // 5. Numbers to English Words Converter
  {
    slug: 'number-to-words-converter',
    name: 'Numbers to English Words & Check Amount Converter',
    description: 'Convert numeric digits into formal written English words for bank checks, invoices, legal contracts, and financial receipts.',
    category: 'Daily',
    icon: 'text',
    keywords: ['number to words converter', 'check amount in words calculator', 'convert digits to english words', 'spelled out numbers converter', 'invoice number words generator'],
    order: 228,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Numeric Amount Input',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="n2w-input">Enter Number (e.g. 1452500.50)</label>
        <input class="tool-textarea" id="n2w-input" type="text" value="125450.75" placeholder="125450.75" />
      </div>
      <div id="n2w-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Formal English Words:</label>
        <textarea class="tool-textarea" id="n2w-output" rows="3" readonly style="font-weight:700; font-size:1.05rem; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('n2w-input'), outEl = document.getElementById('n2w-output');

  const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const SCALES = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  function convertGroup(n) {
    let str = '';
    if (n >= 100) {
      str += ONES[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += TENS[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + ONES[n % 10] : '') + ' ';
    } else if (n > 0) {
      str += ONES[n] + ' ';
    }
    return str.trim();
  }

  function numToWords(num) {
    if (num === 0) return 'Zero';
    let str = '';
    let scaleIdx = 0;
    while (num > 0 && scaleIdx < SCALES.length) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkStr = convertGroup(chunk);
        str = chunkStr + (SCALES[scaleIdx] ? ' ' + SCALES[scaleIdx] + ' ' : ' ') + str;
      }
      num = Math.floor(num / 1000);
      scaleIdx++;
    }
    return str.trim();
  }

  function update() {
    const raw = inEl.value.trim().replace(/,/g, '');
    if (!raw || isNaN(parseFloat(raw))) { outEl.value = ''; return; }

    const parts = raw.split('.');
    const intVal = parseInt(parts[0], 10);
    if (isNaN(intVal)) return;

    let res = numToWords(Math.abs(intVal));
    if (intVal < 0) res = 'Negative ' + res;

    if (parts.length > 1 && parts[1]) {
      const cents = parseInt(parts[1].slice(0, 2), 10);
      res += ' and ' + (isNaN(cents) ? 0 : cents) + '/100';
    }

    outEl.value = res;
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any integer or decimal currency amount (e.g. 125,450.75).',
      'Inspect the spelled-out English text for bank checks, legal documents, and official receipts.'
    ],
    benefitTitle: 'Check Writing and Legal Clarity',
    benefitContent: 'Writing financial totals in long-form text prevents check tampering, invoice fraud, and typographical misunderstanding in legal contracts.',
    faqs: [{ q: 'How does it format decimal cents?', a: 'Decimals are formatted in standard banking notation (e.g. "and 75/100").' }]
  }
];

toolsSuiteI.forEach(createTool);
console.log('Suite I complete: 5 tools created.');
