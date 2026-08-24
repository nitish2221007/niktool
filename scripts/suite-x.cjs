const { createTool } = require('./generate-curated-tools.cjs');

// Suite X: 5 Tools in Sports Science, Powerlifting & Athletic Hydration
const toolsSuiteX = [
  // 1. Running Pace to Speed (km/h & mph) Converter
  {
    slug: 'running-pace-to-speed-mph-kmh-converter',
    name: 'Running Pace to Speed (km/h & mph) Converter',
    description: 'Convert running pace (minutes and seconds per km or mile) into speed in Kilometers per Hour (km/h), Miles per Hour (mph), and treadmill settings in real time.',
    category: 'Health',
    icon: 'text',
    keywords: ['running pace to speed converter', 'pace to kmh converter', 'min per mile to mph calculator', 'treadmill speed pace chart online', 'running pace speed matrix calculator'],
    order: 299,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Running Pace (Minutes & Seconds per km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label">Pace (min:sec / km)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="ps-min" type="number" min="2" max="20" value="5" placeholder="Mins" />
            <input class="tool-textarea" id="ps-sec" type="number" min="0" max="59" value="00" placeholder="Secs" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-kmh">Speed in km/h</label>
          <input class="tool-textarea" id="ps-kmh" type="number" step="any" placeholder="km/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-mph">Speed in mph</label>
          <input class="tool-textarea" id="ps-mph" type="number" step="any" placeholder="mph" />
        </div>
      </div>
      <div id="ps-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-mile" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8:03 min/mi</span>
            <span class="stat-label">Pace per Mile</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-5k" style="font-weight:700;">25:00</span>
            <span class="stat-label">5K Finish Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-10k">50:00</span>
            <span class="stat-label">10K Finish Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('ps-min'), sEl = document.getElementById('ps-sec');
  const kmhEl = document.getElementById('ps-kmh'), mphEl = document.getElementById('ps-mph');
  const miEl = document.getElementById('ps-res-mile'), k5El = document.getElementById('ps-res-5k'), k10El = document.getElementById('ps-res-10k');

  function fmtTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = Math.round(totalSec % 60);
    return m + ':' + s.toString().padStart(2, '0');
  }

  function updateFromKmPace(totalSecPerKm) {
    if (totalSecPerKm <= 0) return;

    // Speed km/h = 3600 / sec_per_km
    const kmh = 3600 / totalSecPerKm;
    const mph = kmh * 0.621371;
    const secPerMile = totalSecPerKm * 1.60934;

    kmhEl.value = kmh.toFixed(2);
    mphEl.value = mph.toFixed(2);

    miEl.textContent = fmtTime(secPerMile) + ' min/mi';
    k5El.textContent = fmtTime(totalSecPerKm * 5);
    k10El.textContent = fmtTime(totalSecPerKm * 10);
  }

  function onPaceInput() {
    const m = parseInt(mEl.value, 10) || 0;
    const s = parseInt(sEl.value, 10) || 0;
    const tot = m * 60 + s;
    updateFromKmPace(tot);
  }

  mEl.addEventListener('input', onPaceInput);
  sEl.addEventListener('input', onPaceInput);

  kmhEl.addEventListener('input', () => {
    const kmh = parseFloat(kmhEl.value);
    if (!isNaN(kmh) && kmh > 0) {
      const secPerKm = 3600 / kmh;
      mEl.value = Math.floor(secPerKm / 60);
      sEl.value = Math.round(secPerKm % 60).toString().padStart(2, '0');
      updateFromKmPace(secPerKm);
    }
  });

  mphEl.addEventListener('input', () => {
    const mph = parseFloat(mphEl.value);
    if (!isNaN(mph) && mph > 0) {
      const kmh = mph / 0.621371;
      const secPerKm = 3600 / kmh;
      mEl.value = Math.floor(secPerKm / 60);
      sEl.value = Math.round(secPerKm % 60).toString().padStart(2, '0');
      updateFromKmPace(secPerKm);
    }
  });

  onPaceInput();
})();`,
    howToSteps: [
      'Enter running pace in minutes and seconds per kilometer or mile.',
      'Inspect equivalent speed in km/h and mph for treadmill calibration, alongside projected 5K and 10K race split times.'
    ],
    benefitTitle: 'Treadmill Speed Matching',
    benefitContent: 'Treadmills operate in linear speed (km/h or mph) while outdoor GPS running watches track pace (min/km). Converting instantly ensures accurate indoor workout pacing.',
    faqs: [{ q: 'What is a 5:00 min/km pace in km/h?', a: '5:00 min/km equals exactly 12.00 km/h (7.46 mph).' }]
  },

  // 2. Wilks Powerlifting Coefficient & Relative Strength Calculator
  {
    slug: 'wilks-score-powerlifting-calculator',
    name: 'Wilks Coefficient Powerlifting Score Calculator',
    description: 'Calculate official Wilks powerlifting score from total weight lifted (Squat + Bench + Deadlift) and bodyweight to determine pound-for-pound relative strength.',
    category: 'Health',
    icon: 'text',
    keywords: ['wilks score calculator', 'powerlifting wilks calculator online', 'relative strength powerlifting formula', 'squat bench deadlift wilks points', 'ipf powerlifting score calculator'],
    order: 300,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Sex, Bodyweight & Total Lifted Weight (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wlk-gender">Sex</label>
          <select class="tool-textarea" id="wlk-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="wlk-bw">Bodyweight (kg)</label>
          <input class="tool-textarea" id="wlk-bw" type="number" step="any" value="83" placeholder="83 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wlk-total">Total Lifted (kg) [Squat+Bench+Dead]</label>
          <input class="tool-textarea" id="wlk-total" type="number" step="any" value="550" placeholder="550 kg" />
        </div>
      </div>
      <div id="wlk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wlk-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">368.5 Wilks</span>
            <span class="stat-label">Wilks Strength Score</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wlk-res-class" style="color:#2563eb; font-weight:700;">Advanced Competitive Lifter</span>
            <span class="stat-label">Strength Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('wlk-gender'), bwEl = document.getElementById('wlk-bw'), totEl = document.getElementById('wlk-total');
  const scEl = document.getElementById('wlk-res-score'), clEl = document.getElementById('wlk-res-class');

  // Wilks polynomial coefficients
  const M_COEFFS = [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-6, -1.291e-8];
  const F_COEFFS = [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-5, -9.054e-8];

  function update() {
    const isMale = gEl.value === 'male';
    const bw = parseFloat(bwEl.value), total = parseFloat(totEl.value);
    if (isNaN(bw) || isNaN(total) || bw <= 30 || total <= 0) return;

    const c = isMale ? M_COEFFS : F_COEFFS;
    const denom = c[0] + (c[1] * bw) + (c[2] * Math.pow(bw, 2)) + (c[3] * Math.pow(bw, 3)) + (c[4] * Math.pow(bw, 4)) + (c[5] * Math.pow(bw, 5));
    const coeff = 500 / denom;
    const wilks = total * coeff;

    scEl.textContent = wilks.toFixed(1) + ' Wilks Points';

    if (wilks >= 450) {
      clEl.textContent = 'Elite National / International Competitor (450+)';
      clEl.style.color = '#22543d';
    } else if (wilks >= 380) {
      clEl.textContent = 'Advanced Competitive Lifter (380-450)';
      clEl.style.color = '#2563eb';
    } else if (wilks >= 300) {
      clEl.textContent = 'Intermediate Lifter (300-380)';
      clEl.style.color = '#d97706';
    } else {
      clEl.textContent = 'Novice / Developing Lifter (<300)';
      clEl.style.color = '#7c3aed';
    }
  }

  [gEl, bwEl, totEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select sex, enter bodyweight in kilograms, and sum your 1-Rep Max Squat, Bench Press, and Deadlift total.',
      'Inspect your Wilks score to compare pound-for-pound strength against lifters of all bodyweight weight classes.'
    ],
    benefitTitle: 'Robert Wilks\' Normalizing Polynomial',
    benefitContent: 'Heavier lifters naturally lift more absolute weight due to leverage, but lighter lifters possess higher strength-to-weight ratios. The 5th-order Wilks polynomial standardizes scores across all bodyweight categories.',
    faqs: [{ q: 'What is a good Wilks score in powerlifting?', a: '300+ is solid intermediate, 400+ is advanced competitive, and 500+ is elite world-class.' }]
  },

  // 3. Cooper 12-Minute Aerobic Run Test VO2 Max Calculator
  {
    slug: 'cooper-12-minute-run-test-calculator',
    name: 'Cooper 12-Minute Run Test VO2 Max Calculator',
    description: 'Calculate cardiovascular aerobic VO2 Max (VO2 = (Distance_meters - 504.9) / 44.73) from Kenneth Cooper\'s 12-minute maximal running test.',
    category: 'Health',
    icon: 'text',
    keywords: ['cooper run test calculator', 'cooper 12 minute run vo2 max', '12 minute run test fitness rating', 'military cooper test calculator online', 'aerobic capacity cooper test formula'],
    order: 301,
    schemaCategory: 'HealthApplication',
    workspaceHeading: '12-Minute Maximal Run Distance (meters)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="coop-dist">Distance Covered in 12 Minutes (Meters)</label>
        <input class="tool-textarea" id="coop-dist" type="number" min="500" max="5000" step="50" value="2600" placeholder="2600 meters (6.5 laps)" />
      </div>
      <div id="coop-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="coop-res-vo2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">46.8 mL/kg/min</span>
            <span class="stat-label">Calculated Aerobic VO2 Max</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="coop-res-rating" style="color:var(--green-dark); font-weight:700;">Excellent Aerobic Conditioning</span>
            <span class="stat-label">Cardiovascular Fitness Rating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('coop-dist');
  const vEl = document.getElementById('coop-res-vo2'), rEl = document.getElementById('coop-res-rating');

  function update() {
    const distM = parseFloat(dEl.value);
    if (isNaN(distM) || distM < 505) return;

    // Cooper Formula: VO2_max = (Distance_m - 504.9) / 44.73
    const vo2 = (distM - 504.9) / 44.73;

    vEl.textContent = vo2.toFixed(1) + ' mL/kg/min';

    if (distM >= 2800) {
      rEl.textContent = 'Superior / Elite (2,800m+)';
      rEl.style.color = '#22543d';
    } else if (distM >= 2400) {
      rEl.textContent = 'Excellent Aerobic Conditioning (2,400m - 2,799m)';
      rEl.style.color = '#22543d';
    } else if (distM >= 2000) {
      rEl.textContent = 'Average / Good Fitness (2,000m - 2,399m)';
      rEl.style.color = '#2563eb';
    } else {
      rEl.textContent = 'Below Average (< 2,000m)';
      rEl.style.color = '#c53030';
    }
  }

  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Run or jog as far as possible in exactly 12 minutes on a standard 400m track.',
      'Enter total distance covered in meters.',
      'Inspect calculated VO2 Max and military aerobic fitness tier.'
    ],
    benefitTitle: 'Dr. Kenneth Cooper\'s US Air Force Protocol',
    benefitContent: 'Designed by Dr. Kenneth Cooper in 1968 for the US military, the 12-minute run test correlates at r = 0.90 with laboratory treadmill gas-exchange VO2 max testing.',
    faqs: [{ q: 'What is considered a good Cooper test score?', a: 'Running 2,400 to 2,800 meters (6 to 7 laps) in 12 minutes indicates excellent aerobic endurance.' }]
  },

  // 4. Workout Sweat Rate & Hydration Loss Calculator
  {
    slug: 'sweat-rate-hydration-loss-calculator',
    name: 'Workout Sweat Rate & Athletic Hydration Calculator',
    description: 'Calculate hourly sweat rate (Liters / hour = (Pre Weight - Post Weight + Fluid Drank) / Hours) and dehydration percentage for endurance training.',
    category: 'Health',
    icon: 'text',
    keywords: ['sweat rate calculator', 'hydration loss calculator endurance', 'hourly sweat rate formula', 'athlete dehydration percentage calculator', 'marathon hydration sweat loss online'],
    order: 302,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Pre/Post Weight, Fluids & Workout Duration',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sw-pre">Pre-Workout Weight (kg)</label>
          <input class="tool-textarea" id="sw-pre" type="number" step="any" value="75.0" placeholder="75.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-post">Post-Workout Weight (kg)</label>
          <input class="tool-textarea" id="sw-post" type="number" step="any" value="73.8" placeholder="73.8 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-fluid">Fluid Consumed (Liters / kg)</label>
          <input class="tool-textarea" id="sw-fluid" type="number" step="any" value="0.5" placeholder="0.5 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-time">Exercise Duration (Hours)</label>
          <input class="tool-textarea" id="sw-time" type="number" step="any" value="1.5" placeholder="1.5 Hours" />
        </div>
      </div>
      <div id="sw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sw-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.13 L / hour</span>
            <span class="stat-label">Hourly Sweat Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sw-res-pct" style="color:#d97706; font-weight:700;">1.60% Dehydrated</span>
            <span class="stat-label">Bodyweight Fluid Loss</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sw-res-tot">1.70 Liters</span>
            <span class="stat-label">Total Fluid Deficit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const preEl = document.getElementById('sw-pre'), postEl = document.getElementById('sw-post');
  const flEl = document.getElementById('sw-fluid'), tEl = document.getElementById('sw-time');
  const rateEl = document.getElementById('sw-res-rate'), pctEl = document.getElementById('sw-res-pct'), totEl = document.getElementById('sw-res-tot');

  function update() {
    const pre = parseFloat(preEl.value), post = parseFloat(postEl.value);
    const fluid = parseFloat(flEl.value) || 0, timeH = parseFloat(tEl.value);

    if (isNaN(pre) || isNaN(post) || isNaN(timeH) || pre <= 0 || post <= 0 || timeH <= 0) return;

    // Total fluid lost (kg or Liters) = (Pre - Post) + Fluid
    const totalLostL = (pre - post) + fluid;
    const ratePerHour = totalLostL / timeH;
    const dehydPct = ((pre - post) / pre) * 100;

    rateEl.textContent = ratePerHour.toFixed(2) + ' L / hour';
    pctEl.textContent = dehydPct.toFixed(2) + '% Bodyweight Loss';
    totEl.textContent = totalLostL.toFixed(2) + ' Liters';

    if (dehydPct >= 2.0) {
      pctEl.textContent += ' (Aerobic Performance Decline Risk)';
      pctEl.style.color = '#c53030';
    } else {
      pctEl.style.color = '#22543d';
    }
  }

  [preEl, postEl, flEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Weigh yourself before exercise in minimal clothing (Pre-Workout Weight).',
      'Weigh yourself after exercise and record fluid consumed during the session.',
      'Inspect your exact hourly sweat rate and fluid deficit to customize athletic race hydration.'
    ],
    benefitTitle: 'The 2% Dehydration Performance Threshold',
    benefitContent: 'Losing greater than 2% of body mass through sweat impairs cardiovascular output, reduces muscular endurance, and elevates core body temperature.',
    faqs: [{ q: 'What is typical sweat rate in hot conditions?', a: 'Athletes typically sweat between 0.8 and 2.0+ Liters per hour in hot or humid environments.' }]
  },

  // 5. Creatine Monohydrate Dosage & Saturation Calculator
  {
    slug: 'creatine-loading-maintenance-dosage-calculator',
    name: 'Creatine Monohydrate Dosage & Loading Calculator',
    description: 'Calculate daily creatine monohydrate loading phase (0.3g/kg for 5-7 days) and maintenance dosage (0.03g to 0.05g/kg or 3-5g/day) based on body mass.',
    category: 'Health',
    icon: 'text',
    keywords: ['creatine dosage calculator', 'creatine loading phase calculator', 'how much creatine to take daily', 'creatine monohydrate grams per kg', 'creatine maintenance dose calculator'],
    order: 303,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Bodyweight & Loading Strategy',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-wt">Bodyweight (kg)</label>
          <input class="tool-textarea" id="cr-wt" type="number" step="any" value="80" placeholder="80 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-strat">Protocol Strategy</label>
          <select class="tool-textarea" id="cr-strat">
            <option value="fast" selected>Fast Saturation (5-7 Day Loading Phase)</option>
            <option value="steady">Steady Saturation (No Loading, 3-4 Weeks)</option>
          </select>
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-load" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">24.0 g / day</span>
            <span class="stat-label">Loading Phase (4x 6.0g doses/day)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-maint" style="font-weight:700;">4.0 to 5.0 g / day</span>
            <span class="stat-label">Daily Maintenance Dose</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wtEl = document.getElementById('cr-wt'), stEl = document.getElementById('cr-strat');
  const loadEl = document.getElementById('cr-res-load'), maintEl = document.getElementById('cr-res-maint');

  function update() {
    const wt = parseFloat(wtEl.value), strat = stEl.value;
    if (isNaN(wt) || wt <= 0) return;

    if (strat === 'fast') {
      // 0.3g / kg / day split into 4 doses
      const totalLoadG = Math.round(wt * 0.3);
      const splitDose = (totalLoadG / 4).toFixed(1);
      loadEl.textContent = totalLoadG + ' g / day (4x ' + splitDose + 'g doses for 5-7 days)';
      maintEl.textContent = Math.max(3, Math.round(wt * 0.04)) + ' to 5.0 g / day';
    } else {
      loadEl.textContent = 'No Loading Required (Steady Saturation in ~28 days)';
      maintEl.textContent = '5.0 g / day (Single daily dose)';
    }
  }

  wtEl.addEventListener('input', update);
  stEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter body mass in kilograms and select fast loading vs steady protocol.',
      'Inspect daily gram dosage and split portioning.'
    ],
    benefitTitle: 'Intramuscular Phosphocreatine Saturation',
    benefitContent: 'Creatine monohydrate increases intramuscular phosphocreatine reserves by 20-40%, boosting cellular ATP regeneration for high-intensity power and sprinting.',
    faqs: [{ q: 'Is a loading phase mandatory?', a: 'No, taking 3-5 grams daily without loading achieves full muscle saturation in approximately 3 to 4 weeks.' }]
  }
];

toolsSuiteX.forEach(createTool);
console.log('Suite X complete: 5 tools created.');
