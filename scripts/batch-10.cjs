const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch10 = [
  // 1. Readability Score Calculator
  {
    slug: 'readability-score-calculator',
    name: 'Readability Score Calculator',
    description: 'Calculate Flesch Reading Ease score, Flesch-Kincaid Grade Level, reading time, and syllable statistics for articles and essays.',
    category: 'Text',
    icon: 'text',
    keywords: ['readability score calculator', 'flesch reading ease calculator', 'flesch kincaid grade level', 'text readability tester', 'essay reading grade level'],
    order: 99,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Text Readability Analyzer',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="read-text-input">Paste Text / Essay / Article</label>
        <textarea class="tool-textarea" id="read-text-input" rows="6" placeholder="Paste your draft text here to evaluate readability and grade-level comprehension..."></textarea>
      </div>
      <div id="read-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="read-res-ease" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Flesch Reading Ease (0-100)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="read-res-grade" style="font-weight:700;">-</span>
            <span class="stat-label">Flesch-Kincaid Grade Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="read-res-reading-time">-</span>
            <span class="stat-label">Est. Reading Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="read-res-words">-</span>
            <span class="stat-label">Total Word Count</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('read-text-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('read-res-card');
  const resEase = document.getElementById('read-res-ease'), resGrade = document.getElementById('read-res-grade');
  const resTime = document.getElementById('read-res-reading-time'), resWords = document.getElementById('read-res-words');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function countSyllables(word) {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  function analyze() {
    const text = inEl.value.trim();
    if (!text) { setMsg('Please paste text to analyze.', true); resCard.style.display = 'none'; return; }

    const words = text.match(/\\b[a-zA-Z0-9'-]+\\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (words.length < 5 || sentences.length === 0) {
      setMsg('Please provide at least one complete sentence with 5+ words.', true);
      resCard.style.display = 'none'; return;
    }

    const totalWords = words.length;
    const totalSentences = Math.max(1, sentences.length);
    let totalSyllables = 0;
    for (const w of words) totalSyllables += countSyllables(w);

    // Flesch Reading Ease = 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
    const ease = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
    // Flesch-Kincaid Grade Level = 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    const grade = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;

    const clampedEase = Math.max(0, Math.min(100, ease));
    const clampedGrade = Math.max(1, Math.round(grade));
    const readMin = Math.ceil(totalWords / 200);

    let easeDesc = 'Standard';
    if (clampedEase >= 80) easeDesc = 'Easy (6th Grade)';
    else if (clampedEase >= 60) easeDesc = 'Standard (8th-9th Grade)';
    else if (clampedEase >= 50) easeDesc = 'Fairly Difficult (High School)';
    else if (clampedEase >= 30) easeDesc = 'Difficult (College)';
    else easeDesc = 'Very Confusing (Graduate Level)';

    resEase.textContent = clampedEase.toFixed(1) + ' (' + easeDesc + ')';
    resGrade.textContent = 'Grade ' + clampedGrade + (clampedGrade > 12 ? ' (College+)' : '');
    resTime.textContent = readMin + ' min read';
    resWords.textContent = totalWords.toLocaleString() + ' words';

    resCard.style.display = 'block';
    setMsg('Readability score computed.');
  }

  btn.addEventListener('click', analyze);
  inEl.addEventListener('input', analyze);

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your draft article, blog post, or school paper.',
      'Click <strong>Calculate</strong> to inspect the Flesch Reading Ease score and grade level.',
      'Aim for a score between 60 and 70 (8th–9th grade level) for public web content.'
    ],
    benefitTitle: 'Why Readability Matters for SEO',
    benefitContent: 'Search engines and users prefer content that is easy to scan and digest. Scoring between 60 and 80 on Flesch Reading Ease reduces bounce rate and improves user engagement metrics.',
    faqs: [
      { q: 'What is a good Flesch Reading Ease score for web blogs?', a: 'Scores between 60.0 and 70.0 are considered easily understood by 13- to 15-year-old students, making it ideal for general web audiences.' }
    ]
  },

  // 2. Physics Torque & Rotational Power Calculator
  {
    slug: 'torque-calculator',
    name: 'Physics Torque & Rotational Power Calculator',
    description: 'Calculate mechanical torque (τ = F · r · sin θ), lever arm moment, rotational power (Watts / Horsepower), and RPM torque conversion.',
    category: 'Science',
    icon: 'text',
    keywords: ['torque calculator', 'rotational torque formula', 'torque to horsepower calculator', 'lever arm torque calculator', 'physics moment of force'],
    order: 100,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Force, Lever Arm & RPM',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tq-force">Applied Force (Newtons N)</label>
          <input class="tool-textarea" id="tq-force" type="number" step="any" value="50" placeholder="e.g. 50 N" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tq-radius">Lever Arm Distance r (meters)</label>
          <input class="tool-textarea" id="tq-radius" type="number" step="any" value="0.3" placeholder="e.g. 0.3 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tq-angle">Force Angle θ (Degrees)</label>
          <input class="tool-textarea" id="tq-angle" type="number" min="0" max="180" step="any" value="90" placeholder="90°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tq-rpm">Rotational Speed (RPM) [Optional]</label>
          <input class="tool-textarea" id="tq-rpm" type="number" step="any" value="1500" placeholder="1500 RPM" />
        </div>
      </div>
      <div id="tq-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tq-res-torque" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Torque (τ = F·r·sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tq-res-hp" style="font-weight:700;">-</span>
            <span class="stat-label">Rotational Power (Horsepower HP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tq-res-watts">-</span>
            <span class="stat-label">Power (Watts / kW)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('tq-force'), rEl = document.getElementById('tq-radius');
  const aEl = document.getElementById('tq-angle'), rpmEl = document.getElementById('tq-rpm');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('tq-res-card');
  const resTq = document.getElementById('tq-res-torque'), resHp = document.getElementById('tq-res-hp'), resW = document.getElementById('tq-res-watts');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const F = parseFloat(fEl.value);
    const r = parseFloat(rEl.value);
    const angleDeg = parseFloat(aEl.value) || 90;
    const rpm = parseFloat(rpmEl.value) || 0;

    if (isNaN(F) || isNaN(r) || F <= 0 || r <= 0) {
      setMsg('Please enter positive values for force and lever arm distance.', true);
      resCard.style.display = 'none'; return;
    }

    const rad = (angleDeg * Math.PI) / 180;
    const torque = F * r * Math.sin(rad);

    // Power = Torque (N·m) * Angular velocity (rad/s) = Torque * (2 * pi * RPM / 60)
    const omega = (2 * Math.PI * rpm) / 60;
    const powerWatts = torque * omega;
    const hp = powerWatts / 745.7;

    resTq.textContent = torque.toFixed(2) + ' N·m (' + (torque * 0.737562).toFixed(2) + ' lb·ft)';
    resW.textContent = powerWatts >= 1000 ? (powerWatts / 1000).toFixed(2) + ' kW' : Math.round(powerWatts) + ' Watts';
    resHp.textContent = hp >= 0.01 ? hp.toFixed(2) + ' HP' : '0 HP (Static)';

    resCard.style.display = 'block';
    setMsg('Torque and rotational power calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '50'; rEl.value = '0.3'; aEl.value = '90'; rpmEl.value = '1500'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter applied force in Newtons (N) and perpendicular lever radius in meters (m).',
      'Optionally specify angle θ (90° gives maximum rotational leverage).',
      'Enter motor RPM to calculate dynamic shaft horsepower and kilowatts.'
    ],
    benefitTitle: 'Torque vs Horsepower',
    benefitContent: 'Torque represents rotational twisting effort, while Horsepower is the rate at which torque performs mechanical work over time (HP = Torque in lb-ft × RPM / 5252).',
    faqs: [
      { q: 'Why is torque maximized at 90 degrees?', a: 'Because sin(90°) = 1.0, directing the entirety of applied force perpendicular to the pivot axis.' }
    ]
  },

  // 3. Body Fat Percentage Calculator (U.S. Navy Method)
  {
    slug: 'body-fat-percentage-calculator',
    name: 'U.S. Navy Body Fat Calculator',
    description: 'Estimate body fat percentage, fat mass, and lean body mass using the scientifically validated U.S. Navy circumference tape method.',
    category: 'Health',
    icon: 'text',
    keywords: ['body fat percentage calculator', 'navy body fat calculator', 'body fat tape measure calculator', 'calculate body fat online', 'lean body mass calculator'],
    order: 101,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Body Circumference Measurements (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bf-gender">Gender</label>
          <select class="tool-textarea" id="bf-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-weight">Weight (kg)</label>
          <input class="tool-textarea" id="bf-weight" type="number" step="any" value="75" placeholder="75 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-height">Height (cm)</label>
          <input class="tool-textarea" id="bf-height" type="number" step="any" value="178" placeholder="178 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-waist">Waist at Navel (cm)</label>
          <input class="tool-textarea" id="bf-waist" type="number" step="any" value="82" placeholder="82 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-neck">Neck Circumference (cm)</label>
          <input class="tool-textarea" id="bf-neck" type="number" step="any" value="38" placeholder="38 cm" />
        </div>
        <div class="control-group" id="grp-bf-hip" style="display:none;">
          <label class="control-label" for="bf-hip">Hips at Widest Point (cm)</label>
          <input class="tool-textarea" id="bf-hip" type="number" step="any" value="95" placeholder="95 cm" />
        </div>
      </div>
      <div id="bf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bf-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Body Fat Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-fat-mass" style="font-weight:700;">-</span>
            <span class="stat-label">Fat Mass (kg)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-lean-mass">-</span>
            <span class="stat-label">Lean Body Mass (kg)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const genEl = document.getElementById('bf-gender'), wtEl = document.getElementById('bf-weight');
  const htEl = document.getElementById('bf-height'), waistEl = document.getElementById('bf-waist');
  const neckEl = document.getElementById('bf-neck'), hipEl = document.getElementById('bf-hip'), grpHip = document.getElementById('grp-bf-hip');

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bf-res-card');
  const resPct = document.getElementById('bf-res-pct'), resFat = document.getElementById('bf-res-fat-mass'), resLean = document.getElementById('bf-res-lean-mass');

  genEl.addEventListener('change', () => {
    grpHip.style.display = genEl.value === 'female' ? 'block' : 'none';
  });

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const isFemale = genEl.value === 'female';
    const wt = parseFloat(wtEl.value);
    const ht = parseFloat(htEl.value);
    const waist = parseFloat(waistEl.value);
    const neck = parseFloat(neckEl.value);
    const hip = parseFloat(hipEl.value);

    if (isNaN(wt) || isNaN(ht) || isNaN(waist) || isNaN(neck) || wt <= 0 || ht <= 0 || waist <= 0 || neck <= 0) {
      setMsg('Please enter valid measurements for all fields.', true);
      resCard.style.display = 'none'; return;
    }

    let bfPct = 0;
    if (!isFemale) {
      if (waist <= neck) { setMsg('Waist measurement must exceed neck circumference.', true); return; }
      bfPct = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(ht)) - 450;
    } else {
      if (isNaN(hip) || hip <= 0 || (waist + hip) <= neck) {
        setMsg('Please enter a valid hip circumference for female body fat calculation.', true); return;
      }
      bfPct = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(ht)) - 450;
    }

    bfPct = Math.max(3, Math.min(65, bfPct));
    const fatMass = wt * (bfPct / 100);
    const leanMass = wt - fatMass;

    resPct.textContent = bfPct.toFixed(1) + '%';
    resFat.textContent = fatMass.toFixed(1) + ' kg';
    resLean.textContent = leanMass.toFixed(1) + ' kg';

    resCard.style.display = 'block';
    setMsg('Body composition calculated.');
  });

  clearBtn.addEventListener('click', () => {
    wtEl.value = '75'; htEl.value = '178'; waistEl.value = '82'; neckEl.value = '38'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Select gender (female calculations include hip circumference).',
      'Measure waist at narrowest point / navel level and neck just below the larynx.',
      'Click <strong>Calculate</strong> to inspect body fat percentage and lean muscle mass.'
    ],
    benefitTitle: 'Accuracy of the U.S. Navy Method',
    benefitContent: 'Developed by Hodgdon and Beckett at the Naval Health Research Center, this circumference equation correlates within 3-4% of dual-energy X-ray absorptiometry (DEXA) scans without needing expensive medical equipment.',
    faqs: [
      { q: 'What is healthy body fat for men vs women?', a: 'Essential fat is 2-5% for men and 10-13% for women. An athletic/fitness range is 6-17% for men and 14-24% for women.' }
    ]
  },

  // 4. JSON Minifier & String Escaper
  {
    slug: 'json-minifier-one-liner',
    name: 'JSON Minifier & One-Liner Escaper',
    description: 'Compress, minify, and strip whitespace from JSON payloads, or escape JSON into single-line strings for environment variables and CLI parameters.',
    category: 'Developer',
    icon: 'code',
    keywords: ['json minifier online', 'minify json', 'json one liner converter', 'escape json string', 'compress json payload'],
    order: 102,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'JSON Compression & Escaper',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="json-min-input">Paste Formatted JSON</label>
        <textarea class="tool-textarea" id="json-min-input" rows="6" placeholder="{&#10;  &quot;name&quot;: &quot;NikTool&quot;,&#10;  &quot;fast&quot;: true&#10;}"></textarea>
      </div>
      <div class="toolbar">
        <button class="button" id="btn-minify-json" type="button">Minify JSON</button>
        <button class="button secondary" id="btn-escape-json" type="button">Escape for String / .env</button>
        <button class="button secondary" id="copy-min-json-btn" type="button">Copy Result</button>
      </div>
      <div id="json-min-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Minified Output</label>
        <textarea class="tool-textarea" id="json-min-output" rows="6" readonly style="font-family:monospace; font-size:0.92rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('json-min-input'), outEl = document.getElementById('json-min-output');
  const minBtn = document.getElementById('btn-minify-json'), escBtn = document.getElementById('btn-escape-json');
  const copyBtn = document.getElementById('copy-min-json-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  minBtn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please paste JSON data.', true); return; }
    try {
      const obj = JSON.parse(raw);
      const min = JSON.stringify(obj);
      outEl.value = min;
      const saved = ((raw.length - min.length) / raw.length) * 100;
      setMsg('JSON minified successfully (Size reduced by ' + saved.toFixed(1) + '%).');
    } catch (e) {
      setMsg('Invalid JSON syntax: ' + e.message, true);
    }
  });

  escBtn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) return;
    try {
      const obj = JSON.parse(raw);
      const min = JSON.stringify(obj);
      outEl.value = JSON.stringify(min);
      setMsg('JSON stringified & escaped for env variables.');
    } catch (e) {
      setMsg('Invalid JSON syntax.', true);
    }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Minified JSON copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your multiline formatted JSON string into the input field.',
      'Click <strong>Minify JSON</strong> to strip extraneous whitespace and newlines.',
      'Or click <strong>Escape for String / .env</strong> to embed JSON safely into environment config files.'
    ],
    benefitTitle: 'Payload Optimization in APIs',
    benefitContent: 'Minifying JSON reduces payload bandwidth overhead by 15-30% over network REST requests and prevents parsing breakages when storing JSON objects in single-line configuration keys.',
    faqs: [
      { q: 'Does minifying alter JSON key-value semantics?', a: 'No, minifying only eliminates non-semantic formatting whitespace.' }
    ]
  },

  // 5. JavaScript Keycode & Keyboard Event Inspector
  {
    slug: 'javascript-keycode-inspector',
    name: 'JavaScript Keycode & Event Inspector',
    description: 'Press any keyboard key to instantly inspect its modern event.key, event.code, keyCode, location, and modifier states in real time.',
    category: 'Developer',
    icon: 'code',
    keywords: ['javascript keycode inspector', 'js keycode tool', 'event key code lookup', 'keyboard event inspector', 'javascript keycode table online'],
    order: 103,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Interactive Keyboard Event Listener',
    controlsHtml: `      <div id="key-press-box" tabindex="0" style="padding:2.5rem 1rem; border:2px dashed var(--green); border-radius:14px; text-align:center; background:rgba(23, 107, 77, 0.04); cursor:pointer; outline:none;">
        <h3 id="key-big-display" style="font-size:2.5rem; margin:0; font-family:monospace; color:var(--green-dark);">Press Any Key Here</h3>
        <p style="margin:0.5rem 0 0; color:var(--muted); font-size:0.9rem;">Click inside this box and press any key on your keyboard</p>
      </div>
      <div id="key-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="k-res-key" style="font-family:monospace; font-weight:800; font-size:1.4rem;">-</span>
            <span class="stat-label">event.key</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="k-res-code" style="font-family:monospace; font-weight:700;">-</span>
            <span class="stat-label">event.code</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="k-res-which" style="font-family:monospace;">-</span>
            <span class="stat-label">event.keyCode (Legacy)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="k-res-location">-</span>
            <span class="stat-label">event.location</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const box = document.getElementById('key-press-box');
  const bigDisp = document.getElementById('key-big-display');
  const kKey = document.getElementById('k-res-key'), kCode = document.getElementById('k-res-code');
  const kWhich = document.getElementById('k-res-which'), kLoc = document.getElementById('k-res-location');

  function handleKey(e) {
    e.preventDefault();
    const key = e.key === ' ' ? 'Space' : e.key;
    bigDisp.textContent = key;

    kKey.textContent = JSON.stringify(e.key);
    kCode.textContent = e.code;
    kWhich.textContent = e.keyCode || e.which;

    let locStr = 'Standard (0)';
    if (e.location === 1) locStr = 'Left (1)';
    else if (e.location === 2) locStr = 'Right (2)';
    else if (e.location === 3) locStr = 'Numpad (3)';

    kLoc.textContent = locStr;
  }

  box.addEventListener('keydown', handleKey);
  window.addEventListener('keydown', (e) => {
    if (document.activeElement === box) return;
    handleKey(e);
  });
})();`,
    howToSteps: [
      'Click on the listening card or press any key on your keyboard.',
      'Inspect modern W3C standard properties: <code>event.key</code> and <code>event.code</code>.',
      'Check physical key code, modifiers, and keyboard quadrant location.'
    ],
    benefitTitle: 'Modern W3C Keyboard Event Standards',
    benefitContent: 'W3C deprecated legacy numeric keyCodes (e.g. e.keyCode === 13) in favor of string-based event.key ("Enter") and physical hardware position event.code ("KeyA" / "Digit1") for international keyboard layout compatibility.',
    faqs: [
      { q: 'Why is event.code better than event.key for gaming controls?', a: 'event.code reflects physical key position regardless of whether the user has a QWERTY, AZERTY, or Dvorak layout.' }
    ]
  }
];

toolsBatch10.forEach(createTool);
console.log('Batch 10 complete.');
