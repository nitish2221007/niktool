const { createTool } = require('./generate-curated-tools.cjs');

// Suite G: 10 Tools in Health, Pets, Display Ergonomics & Everyday Calculations
const toolsSuiteG = [
  // 1. Epigenetic Dog Age to Human Years Calculator
  {
    slug: 'dog-age-to-human-years-calculator',
    name: 'Scientific Dog Age to Human Years Calculator',
    description: 'Calculate your dog\'s true biological age in human years using the UCSD epigenetic DNA methylation logarithmic formula (Human Age = 16 · ln(Dog Age) + 31).',
    category: 'Daily',
    icon: 'text',
    keywords: ['dog age calculator', 'dog years to human years', 'scientific dog age formula', 'epigenetic dog age calculator', 'ucsd dog dna methylation calculator'],
    order: 214,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Dog\'s Chronological Age (Years)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="dog-age">Dog\'s Age (Years / Months)</label>
        <input class="tool-textarea" id="dog-age" type="number" min="0.1" max="25" step="0.1" value="3.0" placeholder="e.g. 3.0" />
      </div>
      <div id="dog-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dog-res-human" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">48.6 Years Old</span>
            <span class="stat-label">Scientific Human Equivalent Age (UCSD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dog-res-legacy" style="font-weight:700;">21 Years (Legacy 7x Rule)</span>
            <span class="stat-label">Old Rule Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('dog-age');
  const hEl = document.getElementById('dog-res-human'), lEl = document.getElementById('dog-res-legacy');

  function update() {
    const dogYears = parseFloat(aEl.value);
    if (isNaN(dogYears) || dogYears <= 0) return;

    // UCSD Epigenetic clock formula: Human_Age = 16 * ln(Dog_Age) + 31
    const humanAge = 16 * Math.log(dogYears) + 31;
    const legacyAge = dogYears * 7;

    hEl.textContent = (humanAge < 1 ? 1 : humanAge.toFixed(1)) + ' Years Old in Human Life';
    lEl.textContent = Math.round(legacyAge) + ' Years (Old 7x Rule)';
  }

  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter your dog\'s age in years (e.g. 1.0, 2.5, 7.0).',
      'Inspect your dog\'s exact developmental and biological human age based on DNA methylation sequencing.'
    ],
    benefitTitle: 'Why the Old "Multiply by 7" Rule is Wrong',
    benefitContent: 'University of California San Diego (UCSD) genomic researchers discovered that dogs mature extremely rapidly in their first two years (a 1-year-old dog has the molecular DNA age of a 31-year-old human), but cellular aging slows down significantly in later years.',
    faqs: [{ q: 'How old is a 4-year-old dog in human years?', a: 'Human Age = 16 × ln(4) + 31 = 16 × 1.386 + 31 ≈ 53.2 years old.' }]
  },

  // 2. Screen DPI & PPI Density Calculator
  {
    slug: 'screen-dpi-ppi-calculator',
    name: 'Screen DPI / PPI Pixel Density Calculator',
    description: 'Calculate display pixel density (PPI / DPI = √(w² + h²) / diagonal), dot pitch, and total megapixels for monitors, laptops, and smartphones.',
    category: 'Developer',
    icon: 'code',
    keywords: ['screen dpi calculator', 'ppi calculator display density', 'pixels per inch calculator', 'monitor dot pitch calculator', 'screen resolution ppi online'],
    order: 215,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Resolution & Diagonal Screen Size',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ppi-w">Horizontal Pixels (Width)</label>
          <input class="tool-textarea" id="ppi-w" type="number" value="2560" placeholder="2560" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ppi-h">Vertical Pixels (Height)</label>
          <input class="tool-textarea" id="ppi-h" type="number" value="1440" placeholder="1440" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ppi-diag">Diagonal Screen Size (Inches)</label>
          <input class="tool-textarea" id="ppi-diag" type="number" step="any" value="27" placeholder="27 inches" />
        </div>
      </div>
      <div id="ppi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ppi-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">108.79 PPI</span>
            <span class="stat-label">Pixel Density (PPI / DPI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ppi-res-pitch" style="font-weight:700;">0.2335 mm</span>
            <span class="stat-label">Dot Pitch</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ppi-res-mp">3.69 Megapixels</span>
            <span class="stat-label">Total Resolution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('ppi-w'), hEl = document.getElementById('ppi-h'), dEl = document.getElementById('ppi-diag');
  const ppiResEl = document.getElementById('ppi-res-val'), pitchEl = document.getElementById('ppi-res-pitch'), mpEl = document.getElementById('ppi-res-mp');

  function update() {
    const w = parseFloat(wEl.value), h = parseFloat(hEl.value), diag = parseFloat(dEl.value);
    if (isNaN(w) || isNaN(h) || isNaN(diag) || w <= 0 || h <= 0 || diag <= 0) return;

    // PPI = sqrt(w^2 + h^2) / diag
    const diagPixels = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
    const ppi = diagPixels / diag;
    const dotPitchMm = (25.4 / ppi); // 1 inch = 25.4 mm
    const totalMp = (w * h) / 1e6;

    ppiResEl.textContent = ppi.toFixed(2) + ' PPI';
    pitchEl.textContent = dotPitchMm.toFixed(4) + ' mm';
    mpEl.textContent = totalMp.toFixed(2) + ' Megapixels';
  }

  [wEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter native horizontal and vertical pixel resolution (e.g. 1920×1080, 2560×1440, 3840×2160).',
      'Enter diagonal screen measurement in inches.',
      'Inspect display sharpness density (PPI) and individual subpixel dot pitch.'
    ],
    benefitTitle: 'Apple Retina and Visual Acuity Limits',
    benefitContent: 'A display achieves "Retina" resolution when the human eye (with 20/20 vision) cannot distinguish individual pixels at typical viewing distances (e.g. >300 PPI for phones held at 12 inches, >220 PPI for laptops at 20 inches).',
    faqs: [{ q: 'What is a 27-inch 4K monitor\'s PPI?', a: 'A 27" 3840×2160 display has an ultra-sharp pixel density of ~163.18 PPI.' }]
  },

  // 3. TV Viewing Distance Ergonomics Calculator (THX / SMPTE)
  {
    slug: 'tv-viewing-distance-calculator',
    name: 'TV Viewing Distance & Screen Size Calculator',
    description: 'Calculate optimal TV viewing distance for 4K and 8K home theaters based on THX (40° field of view) and SMPTE (30° cinema standard) guidelines.',
    category: 'Daily',
    icon: 'text',
    keywords: ['tv viewing distance calculator', 'optimal tv distance 4k', 'thx home theater distance calculator', 'tv screen size distance formula', 'how far to sit from 65 inch tv'],
    order: 216,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'TV Screen Diagonal Size',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="tv-size">TV Diagonal Size (Inches)</label>
        <input class="tool-textarea" id="tv-size" type="number" step="any" value="65" placeholder="65 inches" />
      </div>
      <div id="tv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tv-res-thx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.0 meters (6.5 ft)</span>
            <span class="stat-label">THX Cinematic Immersion (40° FOV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tv-res-smpte" style="font-weight:700;">2.7 meters (8.9 ft)</span>
            <span class="stat-label">SMPTE Mixed-Use Standard (30° FOV)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('tv-size');
  const thxEl = document.getElementById('tv-res-thx'), smpEl = document.getElementById('tv-res-smpte');

  function update() {
    const diagInches = parseFloat(sEl.value);
    if (isNaN(diagInches) || diagInches <= 0) return;

    // THX 40-degree field of view formula: Distance = Screen Size / 0.835 (inches)
    const distThxInches = diagInches / 0.835;
    const distThxM = distThxInches * 0.0254;
    const distThxFt = distThxInches / 12;

    // SMPTE 30-degree standard: Distance = Screen Size / 0.625 (inches)
    const distSmpteInches = diagInches / 0.625;
    const distSmpteM = distSmpteInches * 0.0254;
    const distSmpteFt = distSmpteInches / 12;

    thxEl.textContent = distThxM.toFixed(1) + ' m (' + distThxFt.toFixed(1) + ' ft)';
    smpEl.textContent = distSmpteM.toFixed(1) + ' m (' + distSmpteFt.toFixed(1) + ' ft)';
  }

  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter television screen diagonal size in inches (e.g. 55", 65", 75", 85").',
      'Inspect the ideal sitting distance for immersive movies (THX standard) and everyday broadcast viewing (SMPTE standard).'
    ],
    benefitTitle: 'Why 4K Allows Closer Seating',
    benefitContent: 'Because 4K screens pack 4x the pixel density of 1080p, you can sit much closer without seeing pixel grid lines, filling 40 degrees of your visual field for an authentic IMAX-like cinematic experience.',
    faqs: [{ q: 'What is the recommended distance for a 65-inch 4K TV?', a: 'For maximum cinematic immersion (THX), sit approximately 2.0 meters (6.5 feet) away; for casual everyday viewing, 2.7 meters (8.9 feet).' }]
  },

  // 4. Fuel Gas Travel Road Trip Cost Calculator
  {
    slug: 'fuel-gas-trip-cost-calculator',
    name: 'Road Trip Fuel Cost & Gas Mileage Calculator',
    description: 'Calculate total gasoline fuel costs, required fuel liters/gallons, and per-passenger travel costs from trip distance and vehicle fuel economy.',
    category: 'Daily',
    icon: 'text',
    keywords: ['fuel trip cost calculator', 'gas mileage trip cost calculator', 'road trip gas cost calculator', 'car fuel consumption calculator', 'calculate petrol cost for trip'],
    order: 217,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Trip Distance, Mileage & Gas Price',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gas-dist">One-Way / Total Distance (km)</label>
          <input class="tool-textarea" id="gas-dist" type="number" step="any" value="450" placeholder="450 km" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gas-mileage">Fuel Economy (L / 100km)</label>
          <input class="tool-textarea" id="gas-mileage" type="number" step="any" value="7.5" placeholder="7.5 L/100km" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gas-price">Fuel Price ($ or ₹ / Liter)</label>
          <input class="tool-textarea" id="gas-price" type="number" step="any" value="1.50" placeholder="1.50 per Liter" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gas-pass">Passengers</label>
          <input class="tool-textarea" id="gas-pass" type="number" min="1" step="1" value="3" placeholder="3" />
        </div>
      </div>
      <div id="gas-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gas-res-total" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$50.63</span>
            <span class="stat-label">Total Fuel Trip Cost</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gas-res-liters" style="font-weight:700;">33.75 Liters</span>
            <span class="stat-label">Total Fuel Required</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gas-res-split">$16.88 / person</span>
            <span class="stat-label">Cost per Passenger</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('gas-dist'), mEl = document.getElementById('gas-mileage');
  const pEl = document.getElementById('gas-price'), passEl = document.getElementById('gas-pass');
  const tEl = document.getElementById('gas-res-total'), lEl = document.getElementById('gas-res-liters'), sEl = document.getElementById('gas-res-split');

  function update() {
    const dist = parseFloat(dEl.value), mileage = parseFloat(mEl.value);
    const price = parseFloat(pEl.value), pass = parseInt(passEl.value, 10) || 1;

    if (isNaN(dist) || isNaN(mileage) || isNaN(price) || dist <= 0 || mileage <= 0 || price <= 0 || pass < 1) return;

    const totalLiters = (dist * mileage) / 100;
    const totalCost = totalLiters * price;
    const splitCost = totalCost / pass;

    tEl.textContent = '$' + totalCost.toFixed(2);
    lEl.textContent = totalLiters.toFixed(2) + ' Liters';
    sEl.textContent = '$' + splitCost.toFixed(2) + ' / person';
  }

  [dEl, mEl, pEl, passEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total trip road driving distance in kilometers.',
      'Enter vehicle fuel consumption (L/100km or convert from MPG).',
      'Enter local fuel gas price per Liter.',
      'Inspect total trip fuel expenditure and carpool split per passenger.'
    ],
    benefitTitle: 'Accurate Carpool Road Trip Budgeting',
    benefitContent: 'Calculating fuel expenses before embarking on road trips allows fair expense splitting between passengers while projecting refueling stops.',
    faqs: [{ q: 'How to convert MPG (US) to L/100km?', a: 'L/100km = 235.215 / MPG (e.g. 30 MPG = ~7.84 L/100km).' }]
  },

  // 5. Time Duration Add & Subtract Calculator
  {
    slug: 'time-duration-hours-minutes-calculator',
    name: 'Time Duration & Hours Calculator',
    description: 'Add, subtract, and sum multiple time intervals (e.g. 4h 35m + 2h 50m - 1h 15m) into total decimal hours, minutes, and seconds.',
    category: 'Daily',
    icon: 'text',
    keywords: ['time duration calculator', 'add hours and minutes calculator', 'time addition subtraction online', 'time card hours calculator', 'sum time intervals calculator'],
    order: 218,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Time Intervals Addition & Subtraction',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label">Time Interval 1</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="td1-h" type="number" min="0" value="4" placeholder="Hours" />
            <input class="tool-textarea" id="td1-m" type="number" min="0" max="59" value="45" placeholder="Mins" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Time Interval 2</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="td2-h" type="number" min="0" value="3" placeholder="Hours" />
            <input class="tool-textarea" id="td2-m" type="number" min="0" max="59" value="30" placeholder="Mins" />
          </div>
        </div>
      </div>
      <div id="td-dur-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="td-dur-sum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8 hrs 15 mins</span>
            <span class="stat-label">Sum Total (T₁ + T₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="td-dur-dec" style="font-weight:700;">8.25 Decimal Hours</span>
            <span class="stat-label">Payroll Decimal Hours</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="td-dur-diff">1 hr 15 mins</span>
            <span class="stat-label">Difference (|T₁ - T₂|)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const h1El = document.getElementById('td1-h'), m1El = document.getElementById('td1-m');
  const h2El = document.getElementById('td2-h'), m2El = document.getElementById('td2-m');
  const sumEl = document.getElementById('td-dur-sum'), decEl = document.getElementById('td-dur-dec'), diffEl = document.getElementById('td-dur-diff');

  function update() {
    const h1 = parseInt(h1El.value, 10) || 0, m1 = parseInt(m1El.value, 10) || 0;
    const h2 = parseInt(h2El.value, 10) || 0, m2 = parseInt(m2El.value, 10) || 0;

    const totalMins1 = h1 * 60 + m1;
    const totalMins2 = h2 * 60 + m2;

    const sumMins = totalMins1 + totalMins2;
    const diffMins = Math.abs(totalMins1 - totalMins2);

    const sumH = Math.floor(sumMins / 60);
    const sumM = sumMins % 60;
    const decHours = sumMins / 60;

    const diffH = Math.floor(diffMins / 60);
    const diffM = diffMins % 60;

    sumEl.textContent = sumH + ' hrs ' + sumM + ' mins';
    decEl.textContent = decHours.toFixed(2) + ' Decimal Hours';
    diffEl.textContent = diffH + ' hrs ' + diffM + ' mins';
  }

  [h1El, m1El, h2El, m2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hours and minutes for two time intervals.',
      'Inspect combined total sum, payroll decimal hours, and difference.'
    ],
    benefitTitle: 'Time Card Payroll Processing',
    benefitContent: 'Converting minutes to decimal hours (e.g. 45 minutes = 0.75 hours) is essential for accurate hourly wage payroll calculations.',
    faqs: [{ q: 'What is 8 hours and 15 minutes in decimal hours?', a: '8 + (15/60) = 8.25 decimal hours.' }]
  }
];

toolsSuiteG.forEach(createTool);
console.log('Suite G complete: 5 tools created.');
