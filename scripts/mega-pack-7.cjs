const { createTool } = require('./generate-curated-tools.cjs');

const tools7 = [
  // 1. GPA (Grade Point Average) 4.0 Scale Calculator
  {
    slug: 'grade-point-average-gpa-scale-calculator',
    name: 'College GPA 4.0 Scale Calculator',
    description: 'Calculate semester and cumulative Grade Point Average (GPA) on a 4.0 scale with credit hour weightings and letter grade conversions.',
    category: 'Math',
    icon: 'text',
    keywords: ['gpa calculator', 'college gpa calculator 4.0 scale', 'weighted gpa calculator', 'calculate semester gpa', 'letter grade to gpa converter'],
    order: 134,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Course Grades & Credit Hours',
    controlsHtml: `      <div id="gpa-rows-container">
        <div class="gpa-row" style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea" type="text" placeholder="Course Name" value="Course 1" />
          <input class="tool-textarea gpa-credits" type="number" min="1" max="10" value="3" placeholder="Credits" />
          <select class="tool-textarea gpa-grade">
            <option value="4.0" selected>A (4.0)</option>
            <option value="3.7">A- (3.7)</option>
            <option value="3.3">B+ (3.3)</option>
            <option value="3.0">B (3.0)</option>
            <option value="2.7">B- (2.7)</option>
            <option value="2.0">C (2.0)</option>
            <option value="1.0">D (1.0)</option>
            <option value="0.0">F (0.0)</option>
          </select>
        </div>
        <div class="gpa-row" style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea" type="text" placeholder="Course Name" value="Course 2" />
          <input class="tool-textarea gpa-credits" type="number" min="1" max="10" value="4" placeholder="Credits" />
          <select class="tool-textarea gpa-grade">
            <option value="4.0">A (4.0)</option>
            <option value="3.7" selected>A- (3.7)</option>
            <option value="3.3">B+ (3.3)</option>
            <option value="3.0">B (3.0)</option>
            <option value="2.7">B- (2.7)</option>
            <option value="2.0">C (2.0)</option>
            <option value="1.0">D (1.0)</option>
            <option value="0.0">F (0.0)</option>
          </select>
        </div>
        <div class="gpa-row" style="display:grid; grid-template-columns:2fr 1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
          <input class="tool-textarea" type="text" placeholder="Course Name" value="Course 3" />
          <input class="tool-textarea gpa-credits" type="number" min="1" max="10" value="3" placeholder="Credits" />
          <select class="tool-textarea gpa-grade">
            <option value="4.0">A (4.0)</option>
            <option value="3.7">A- (3.7)</option>
            <option value="3.3" selected>B+ (3.3)</option>
            <option value="3.0">B (3.0)</option>
            <option value="2.7">B- (2.7)</option>
            <option value="2.0">C (2.0)</option>
            <option value="1.0">D (1.0)</option>
            <option value="0.0">F (0.0)</option>
          </select>
        </div>
      </div>
      <div id="gpa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gpa-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.67</span>
            <span class="stat-label">Weighted Semester GPA (4.0 Max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gpa-res-credits">10 Credits</span>
            <span class="stat-label">Total Credit Hours</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const container = document.getElementById('gpa-rows-container');
  const gpaEl = document.getElementById('gpa-res-val'), crEl = document.getElementById('gpa-res-credits');

  function update() {
    const credEls = container.querySelectorAll('.gpa-credits');
    const gradeEls = container.querySelectorAll('.gpa-grade');

    let totalPoints = 0, totalCredits = 0;
    for (let i = 0; i < credEls.length; i++) {
      const cr = parseFloat(credEls[i].value) || 0;
      const gr = parseFloat(gradeEls[i].value) || 0;
      totalPoints += cr * gr;
      totalCredits += cr;
    }

    if (totalCredits <= 0) {
      gpaEl.textContent = '0.00'; crEl.textContent = '0 Credits'; return;
    }

    const gpa = totalPoints / totalCredits;
    gpaEl.textContent = gpa.toFixed(2);
    crEl.textContent = totalCredits + ' Credits';
  }

  container.addEventListener('input', update);
  container.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter course credit hours and select received letter grades.',
      'Inspect weighted GPA on the standard 4.0 collegiate scale.'
    ],
    benefitTitle: 'Standard 4.0 GPA Calculation',
    benefitContent: 'GPA = (Σ (Credit Hours × Grade Points)) / Total Credit Hours.',
    faqs: [{ q: 'What is a 3.7 GPA in letter grades?', a: 'A 3.7 GPA corresponds to an A- average across coursework.' }]
  },

  // 2. Days Countdown & Date Duration Calculator
  {
    slug: 'days-until-date-countdown-calculator',
    name: 'Days Until Date & Countdown Calculator',
    description: 'Calculate total days, weeks, weekends, and remaining hours between today and any future target event date or holiday.',
    category: 'Daily',
    icon: 'text',
    keywords: ['days until date calculator', 'countdown to date online', 'how many days until date', 'event countdown calculator', 'days between dates calculator'],
    order: 135,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Target Event Date',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cnt-target">Select Target Date</label>
        <input class="tool-textarea" id="cnt-target" type="date" />
      </div>
      <div id="cnt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="cnt-res-days" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Total Days Remaining</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cnt-res-weeks">-</span>
            <span class="stat-label">Weeks &amp; Days</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cnt-res-hours">-</span>
            <span class="stat-label">Total Hours</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('cnt-target');
  const dEl = document.getElementById('cnt-res-days'), wEl = document.getElementById('cnt-res-weeks'), hEl = document.getElementById('cnt-res-hours');

  // Set default to New Year
  const nextYear = new Date().getFullYear() + 1;
  tEl.value = nextYear + '-01-01';

  function update() {
    const targetVal = tEl.value;
    if (!targetVal) return;

    const target = new Date(targetVal + 'T00:00:00');
    const now = new Date();
    const diffMs = target - now;

    if (diffMs < 0) {
      const pastDays = Math.abs(Math.floor(diffMs / (1000 * 60 * 60 * 24)));
      dEl.textContent = pastDays + ' Days Ago';
      wEl.textContent = 'Date has passed';
      hEl.textContent = '-';
      return;
    }

    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    dEl.textContent = totalDays.toLocaleString() + ' Days';
    wEl.textContent = weeks + ' Weeks, ' + remDays + ' Days';
    hEl.textContent = totalHours.toLocaleString() + ' Hours';
  }

  tEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Pick a future target date using the calendar selector.',
      'Inspect remaining days, weeks, and hours countdown.'
    ],
    benefitTitle: 'Event Planning Time Management',
    benefitContent: 'Visualizing exact remaining days and workweeks keeps milestone schedules, wedding deadlines, and exam preparations on track.',
    faqs: [{ q: 'Does this calculate leap years automatically?', a: 'Yes, full leap-year date mathematics is handled accurately.' }]
  },

  // 3. Electricity Appliance Power Cost Calculator
  {
    slug: 'electricity-appliance-power-cost-calculator',
    name: 'Appliance Electricity Cost & Bill Calculator',
    description: 'Calculate daily, monthly, and annual electricity costs for home appliances (AC, heater, PC, fridge) from wattage and local kWh utility tariffs.',
    category: 'Daily',
    icon: 'text',
    keywords: ['electricity cost calculator', 'appliance power consumption calculator', 'kwh cost calculator', 'calculate electric bill from wattage', 'energy running cost calculator'],
    order: 136,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Appliance Wattage & Usage Hours',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="elc-watts">Appliance Power (Watts)</label>
          <input class="tool-textarea" id="elc-watts" type="number" step="any" value="1500" placeholder="e.g. 1500 W (Space Heater / AC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="elc-hours">Hours Used Per Day</label>
          <input class="tool-textarea" id="elc-hours" type="number" step="any" value="8" placeholder="e.g. 8 Hours" />
        </div>
        <div class="control-group">
          <label class="control-label" for="elc-rate">Electricity Rate ($ or ₹ / kWh)</label>
          <input class="tool-textarea" id="elc-rate" type="number" step="any" value="0.15" placeholder="e.g. 0.15 per kWh" />
        </div>
      </div>
      <div id="elc-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="elc-res-monthly" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Monthly Electricity Cost</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="elc-res-daily" style="font-weight:700;">-</span>
            <span class="stat-label">Daily Cost</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="elc-res-annual">-</span>
            <span class="stat-label">Annual Running Cost</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('elc-watts'), hEl = document.getElementById('elc-hours'), rEl = document.getElementById('elc-rate');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('elc-res-card');
  const resM = document.getElementById('elc-res-monthly'), resD = document.getElementById('elc-res-daily'), resA = document.getElementById('elc-res-annual');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const watts = parseFloat(wEl.value);
    const hours = parseFloat(hEl.value);
    const rate = parseFloat(rEl.value);

    if (isNaN(watts) || isNaN(hours) || isNaN(rate) || watts <= 0 || hours <= 0 || rate <= 0) {
      setMsg('Please enter positive values for wattage, daily hours, and electricity tariff rate.', true);
      resCard.style.display = 'none'; return;
    }

    const dailyKwh = (watts * hours) / 1000;
    const dailyCost = dailyKwh * rate;
    const monthlyCost = dailyCost * 30;
    const annualCost = dailyCost * 365;

    resM.textContent = '$' + monthlyCost.toFixed(2) + ' / month';
    resD.textContent = '$' + dailyCost.toFixed(2) + ' (' + dailyKwh.toFixed(1) + ' kWh/day)';
    resA.textContent = '$' + Math.round(annualCost).toLocaleString() + ' / year';

    resCard.style.display = 'block';
    setMsg('Appliance electricity cost computed.');
  });

  clearBtn.addEventListener('click', () => {
    wEl.value = '1500'; hEl.value = '8'; rEl.value = '0.15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the appliance wattage (listed on the device label).',
      'Enter daily operating hours.',
      'Enter your local utility cost per kilowatt-hour ($/kWh).',
      'Click <strong>Calculate</strong> to inspect daily, monthly, and annual utility bills.'
    ],
    benefitTitle: 'How to Reduce Household Energy Consumption',
    benefitContent: 'Energy Consumption (kWh) = (Watts × Hours) / 1000. Heating and cooling appliances (AC, space heaters, water heaters) consume the majority of residential power.',
    faqs: [{ q: 'How much does a 1500W space heater cost to run for 8 hours at $0.15/kWh?', a: '(1.5 kW × 8 hrs) × $0.15 = $1.80 per day (~$54 per month).' }]
  },

  // 4. Sleep Cycle Bedtime & Wake-Up Calculator
  {
    slug: 'sleep-cycle-calculator',
    name: 'Sleep Cycle & Wake-Up Time Calculator',
    description: 'Calculate optimal wake-up times and bedtimes based on 90-minute natural REM sleep cycles to wake up feeling refreshed and energized.',
    category: 'Health',
    icon: 'text',
    keywords: ['sleep cycle calculator', 'optimal bedtime calculator', '90 minute sleep cycle calculator', 'when should i wake up calculator', 'rem sleep cycle planner'],
    order: 137,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Bedtime or Wake-Up Planner',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="slp-wake-time">I Want to Wake Up At:</label>
        <input class="tool-textarea" id="slp-wake-time" type="time" value="07:00" />
      </div>
      <div id="slp-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Suggested Bedtimes (Accounting for 15 min to fall asleep):</label>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;">
          <div class="stat"><span class="stat-value" id="slp-t6" style="color:var(--green-dark); font-weight:800;">21:45</span><span class="stat-label">6 Cycles (9.0 hrs)</span></div>
          <div class="stat"><span class="stat-value" id="slp-t5" style="font-weight:700;">23:15</span><span class="stat-label">5 Cycles (7.5 hrs)</span></div>
          <div class="stat"><span class="stat-value" id="slp-t4">00:45</span><span class="stat-label">4 Cycles (6.0 hrs)</span></div>
          <div class="stat"><span class="stat-value" id="slp-t3">02:15</span><span class="stat-label">3 Cycles (4.5 hrs)</span></div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('slp-wake-time');
  const t6 = document.getElementById('slp-t6'), t5 = document.getElementById('slp-t5');
  const t4 = document.getElementById('slp-t4'), t3 = document.getElementById('slp-t3');

  function pad(n) { return n < 10 ? '0' + n : n; }

  function formatTime(mins) {
    mins = ((mins % 1440) + 1440) % 1440;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return pad(h) + ':' + pad(m);
  }

  function update() {
    const val = wEl.value;
    if (!val) return;

    const parts = val.split(':');
    const wakeMins = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    const fallAsleep = 15; // 15 mins to fall asleep

    t6.textContent = formatTime(wakeMins - (6 * 90 + fallAsleep));
    t5.textContent = formatTime(wakeMins - (5 * 90 + fallAsleep));
    t4.textContent = formatTime(wakeMins - (4 * 90 + fallAsleep));
    t3.textContent = formatTime(wakeMins - (3 * 90 + fallAsleep));
  }

  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select your required morning wake-up time.',
      'Inspect optimal bedtime targets structured in clean 90-minute REM cycles.'
    ],
    benefitTitle: 'Why 90-Minute Sleep Cycles Matter',
    benefitContent: 'Human sleep progresses through light, deep, and REM sleep in ~90-minute cycles. Waking up at the completion of a cycle prevents sleep inertia grogginess.',
    faqs: [{ q: 'How many sleep cycles does an adult need per night?', a: 'Most healthy adults require 5 complete cycles (7.5 hours of sleep) per night.' }]
  },

  // 5. Typography Pixels to REM & EM Converter
  {
    slug: 'typography-px-to-rem-em-pt-converter',
    name: 'Typography Units Converter (PX, REM, EM, PT)',
    description: 'Convert CSS font sizes and spacing between Pixels (px), REM, EM, Points (pt), and Percentage (%) based on customizable root base font size.',
    category: 'Developer',
    icon: 'code',
    keywords: ['px to rem converter', 'rem to px calculator', 'px to em typography converter', 'css font size converter', 'px to pt converter online'],
    order: 138,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Base Font Size & Typography Values',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ty-base">Root Base Font Size (px)</label>
          <input class="tool-textarea" id="ty-base" type="number" step="any" value="16" placeholder="16 px (Browser Default)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ty-px">Target Pixels (px)</label>
          <input class="tool-textarea" id="ty-px" type="number" step="any" value="24" placeholder="24 px" />
        </div>
      </div>
      <div id="ty-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="ty-res-rem" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.500 rem</span>
            <span class="stat-label">CSS rem</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ty-res-em" style="font-weight:700;">1.500 em</span>
            <span class="stat-label">CSS em</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ty-res-pt">18.0 pt</span>
            <span class="stat-label">Print Points (pt)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ty-res-pct">150%</span>
            <span class="stat-label">Percentage (%)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const baseEl = document.getElementById('ty-base'), pxEl = document.getElementById('ty-px');
  const remEl = document.getElementById('ty-res-rem'), emEl = document.getElementById('ty-res-em');
  const ptEl = document.getElementById('ty-res-pt'), pctEl = document.getElementById('ty-res-pct');

  function update() {
    const base = parseFloat(baseEl.value);
    const px = parseFloat(pxEl.value);
    if (isNaN(base) || isNaN(px) || base <= 0 || px < 0) return;

    const rem = px / base;
    const pt = px * 0.75;
    const pct = (px / base) * 100;

    remEl.textContent = rem.toFixed(3) + ' rem';
    emEl.textContent = rem.toFixed(3) + ' em';
    ptEl.textContent = pt.toFixed(1) + ' pt';
    pctEl.textContent = Math.round(pct) + '%';
  }

  baseEl.addEventListener('input', update);
  pxEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter root browser base font size (default is 16px).',
      'Enter target pixel size.',
      'Inspect CSS rem, em, pt, and percentage values.'
    ],
    benefitTitle: 'Why Modern Web Design Prefers REM over Pixels',
    benefitContent: 'REM (Root EM) scales proportionally with user browser accessibility zoom settings, whereas hardcoded pixels ignore user readability preferences.',
    faqs: [{ q: 'What is 16px in rem?', a: 'With a 16px root font size, 16px = 1.0 rem.' }]
  }
];

tools7.forEach(createTool);
console.log('Mega pack 7 complete.');
