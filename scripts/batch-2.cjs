const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch2 = [
  // 1. Color Contrast Checker (WCAG 2.1)
  {
    slug: 'color-contrast-checker',
    name: 'Color Contrast Checker',
    description: 'Calculate WCAG 2.1 color contrast ratios for foreground and background colors with pass/fail compliance ratings for AA and AAA levels.',
    category: 'Developer',
    icon: 'code',
    keywords: ['color contrast checker', 'wcag contrast checker', 'accessibility contrast ratio', 'accessible colors test', 'web accessibility contrast', 'wcag 2.1 checker'],
    order: 54,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Color Contrast Analyzer',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
        <div class="control-group">
          <label class="control-label" for="contrast-fg">Foreground (Text) Color</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="color" id="contrast-fg-picker" value="#18211d" style="width:48px; height:42px; border:none; border-radius:8px; cursor:pointer;" />
            <input class="tool-textarea" id="contrast-fg" type="text" value="#18211d" placeholder="#18211d" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="contrast-bg">Background Color</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="color" id="contrast-bg-picker" value="#ffffff" style="width:48px; height:42px; border:none; border-radius:8px; cursor:pointer;" />
            <input class="tool-textarea" id="contrast-bg" type="text" value="#ffffff" placeholder="#ffffff" />
          </div>
        </div>
      </div>
      <div id="contrast-preview-card" style="margin-top:1.5rem; padding:2rem; border-radius:14px; text-align:center; border:1px solid var(--line);">
        <h3 style="margin:0 0 0.5rem; font-size:1.4rem;">Sample Heading Preview</h3>
        <p style="margin:0; font-size:1rem;">This text demonstrates how your chosen color combination renders for standard readability and visual contrast.</p>
      </div>
      <div id="contrast-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="contrast-ratio-val" style="font-size:1.4rem; font-weight:800; color:var(--green-dark);">-</span>
            <span class="stat-label">Contrast Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="contrast-aa-normal" style="font-weight:700;">-</span>
            <span class="stat-label">WCAG AA Normal</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="contrast-aa-large" style="font-weight:700;">-</span>
            <span class="stat-label">WCAG AA Large</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="contrast-aaa-normal" style="font-weight:700;">-</span>
            <span class="stat-label">WCAG AAA Normal</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fgInput = document.getElementById('contrast-fg');
  const fgPicker = document.getElementById('contrast-fg-picker');
  const bgInput = document.getElementById('contrast-bg');
  const bgPicker = document.getElementById('contrast-bg-picker');
  const preview = document.getElementById('contrast-preview-card');
  const ratioVal = document.getElementById('contrast-ratio-val');
  const aaNormal = document.getElementById('contrast-aa-normal');
  const aaLarge = document.getElementById('contrast-aa-large');
  const aaaNormal = document.getElementById('contrast-aaa-normal');

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return isNaN(num) ? null : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function getLuminance(rgb) {
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function calculateContrast() {
    let fgHex = fgInput.value.trim();
    let bgHex = bgInput.value.trim();
    if (!fgHex.startsWith('#')) fgHex = '#' + fgHex;
    if (!bgHex.startsWith('#')) bgHex = '#' + bgHex;

    const rgbFg = hexToRgb(fgHex);
    const rgbBg = hexToRgb(bgHex);

    if (!rgbFg || !rgbBg) return;

    preview.style.color = fgHex;
    preview.style.backgroundColor = bgHex;

    const lum1 = getLuminance(rgbFg);
    const lum2 = getLuminance(rgbBg);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    const ratio = (brightest + 0.05) / (darkest + 0.05);

    ratioVal.textContent = ratio.toFixed(2) + ':1';

    function setBadge(el, pass) {
      el.textContent = pass ? 'PASS' : 'FAIL';
      el.style.color = pass ? '#22543d' : '#c53030';
    }

    setBadge(aaNormal, ratio >= 4.5);
    setBadge(aaLarge, ratio >= 3.0);
    setBadge(aaaNormal, ratio >= 7.0);
  }

  fgInput.addEventListener('input', () => { fgPicker.value = fgInput.value; calculateContrast(); });
  fgPicker.addEventListener('input', () => { fgInput.value = fgPicker.value; calculateContrast(); });
  bgInput.addEventListener('input', () => { bgPicker.value = bgInput.value; calculateContrast(); });
  bgPicker.addEventListener('input', () => { bgInput.value = bgPicker.value; calculateContrast(); });

  calculateContrast();
})();`,
    howToSteps: [
      'Enter or pick your Foreground (Text) and Background colors in HEX format.',
      'Check the live preview card.',
      'Evaluate your score against WCAG AA (4.5:1 for normal text) and AAA (7:1) guidelines.'
    ],
    benefitTitle: 'WCAG 2.1 Contrast Standards',
    benefitContent: 'Accessible color contrast ensures readability for users with visual impairments or color blindness. The Web Content Accessibility Guidelines (WCAG) Level AA requires a minimum ratio of 4.5:1 for standard text and 3:1 for large headings.',
    faqs: [
      { q: 'What is WCAG AA threshold?', a: 'Level AA requires a contrast ratio of at least 4.5:1 for regular text and 3:1 for large text (18pt+ or 14pt+ bold).' }
    ]
  },

  // 2. Cron Expression Explainer & Schedule Inspector
  {
    slug: 'cron-expression-descriptor',
    name: 'Cron Expression Explainer',
    description: 'Translate standard 5-part cron expressions into plain English explanations and preview calculated upcoming execution dates.',
    category: 'Developer',
    icon: 'code',
    keywords: ['cron expression explainer', 'cron descriptor', 'crontab generator', 'cron schedule parser', 'cron syntax explainer', 'cron to english'],
    order: 55,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Cron Expression Decoder',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cron-input">Cron Expression (Minute Hour Day-of-Month Month Day-of-Week)</label>
        <input class="tool-textarea" id="cron-input" type="text" value="*/15 * * * *" placeholder="e.g. 0 0 * * 1-5" style="font-family:monospace; font-size:1.1rem; font-weight:700;" />
      </div>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem;">
        <button class="button secondary" type="button" onclick="document.getElementById('cron-input').value='*/15 * * * *'; document.getElementById('cron-input').dispatchEvent(new Event('input'));" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Every 15 mins</button>
        <button class="button secondary" type="button" onclick="document.getElementById('cron-input').value='0 0 * * *'; document.getElementById('cron-input').dispatchEvent(new Event('input'));" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Every Midnight</button>
        <button class="button secondary" type="button" onclick="document.getElementById('cron-input').value='0 9 * * 1-5'; document.getElementById('cron-input').dispatchEvent(new Event('input'));" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Weekdays 9 AM</button>
        <button class="button secondary" type="button" onclick="document.getElementById('cron-input').value='0 0 1 * *'; document.getElementById('cron-input').dispatchEvent(new Event('input'));" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Monthly on 1st</button>
      </div>
      <div id="cron-res-card" style="margin-top:1.25rem;">
        <div style="background:rgba(23, 107, 77, 0.08); border:1px solid rgba(23, 107, 77, 0.2); border-radius:12px; padding:1.25rem;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--green-dark); text-transform:uppercase;">Human-Readable Meaning:</span>
          <div id="cron-human-text" style="font-size:1.3rem; font-weight:700; color:var(--ink); margin-top:0.3rem;">Every 15 minutes</div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cronInput = document.getElementById('cron-input');
  const humanText = document.getElementById('cron-human-text');
  const msgEl = document.getElementById('tool-message');

  function describeCron(cron) {
    const parts = cron.trim().split(/\\s+/);
    if (parts.length !== 5) return 'Invalid cron syntax: expected 5 fields (minute hour day month day-of-week).';
    const [min, hour, dom, mon, dow] = parts;

    let desc = '';
    if (min === '*' && hour === '*') desc = 'Every minute';
    else if (min.startsWith('*/') && hour === '*') desc = 'Every ' + min.slice(2) + ' minutes';
    else if (min === '0' && hour === '*') desc = 'Every hour on the hour';
    else if (min === '0' && hour === '0' && dom === '*' && mon === '*' && dow === '*') desc = 'At 00:00 (midnight) every day';
    else if (min === '0' && hour !== '*' && dom === '*' && mon === '*' && dow === '*') desc = 'At ' + hour + ':00 every day';
    else if (min === '0' && hour === '9' && dow === '1-5') desc = 'At 09:00 AM, Monday through Friday';
    else if (dom === '1' && min === '0' && hour === '0') desc = 'At midnight on the 1st of every month';
    else desc = 'Runs when minute is (' + min + '), hour is (' + hour + '), day is (' + dom + '), month is (' + mon + '), and day-of-week is (' + dow + ')';

    return desc;
  }

  function update() {
    const val = cronInput.value.trim();
    if (!val) { humanText.textContent = '-'; return; }
    humanText.textContent = describeCron(val);
  }

  cronInput.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any 5-field crontab schedule string (minute, hour, day, month, day-of-week).',
      'Or click one of the quick preset buttons.',
      'Instantly read the plain English schedule summary.'
    ],
    benefitTitle: 'Understanding Crontab Schedule Syntax',
    benefitContent: 'Cron is a time-based job scheduler in Unix-like systems. Standard crontabs use 5 position fields: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6 where 0 is Sunday).',
    faqs: [
      { q: 'What does */5 * * * * mean?', a: 'It means the task triggers every 5 minutes.' }
    ]
  },

  // 3. HEX to RGB & HSL Color Code Converter
  {
    slug: 'hex-to-rgb-hsl-converter',
    name: 'HEX to RGB HSL Converter',
    description: 'Convert color codes between HEX, RGB, RGBA, HSL, HSLA, and CSS color functions with real-time swatch preview and 1-click copy.',
    category: 'Developer',
    icon: 'code',
    keywords: ['hex to rgb converter', 'hex to hsl', 'rgb to hex', 'hsl to hex', 'color code converter', 'css color converter'],
    order: 56,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Color Code Conversion Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
        <div class="control-group">
          <label class="control-label" for="color-code-input">Enter Color (HEX, RGB, or HSL)</label>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <input type="color" id="color-code-picker" value="#176b4d" style="width:48px; height:42px; border:none; border-radius:8px; cursor:pointer;" />
            <input class="tool-textarea" id="color-code-input" type="text" value="#176b4d" placeholder="#176b4d" />
          </div>
        </div>
        <div style="display:flex; align-items:center; justify-content:center;">
          <div id="color-swatch-box" style="width:100%; height:75px; border-radius:12px; background:#176b4d; border:1px solid var(--line); display:grid; place-items:center; color:white; font-weight:700;">Sample Swatch</div>
        </div>
      </div>
      <div id="color-codes-grid" style="margin-top:1.5rem; display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:1rem;">
        <div class="stat" style="text-align:left;">
          <span class="stat-label">HEX Code</span>
          <span class="stat-value" id="res-hex" style="font-family:monospace; font-size:1.1rem;">#176B4D</span>
        </div>
        <div class="stat" style="text-align:left;">
          <span class="stat-label">RGB Format</span>
          <span class="stat-value" id="res-rgb" style="font-family:monospace; font-size:1.1rem;">rgb(23, 107, 77)</span>
        </div>
        <div class="stat" style="text-align:left;">
          <span class="stat-label">HSL Format</span>
          <span class="stat-value" id="res-hsl" style="font-family:monospace; font-size:1.1rem;">hsl(159, 65%, 25%)</span>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('color-code-input');
  const picker = document.getElementById('color-code-picker');
  const swatch = document.getElementById('color-swatch-box');
  const resHex = document.getElementById('res-hex');
  const resRgb = document.getElementById('res-rgb');
  const resHsl = document.getElementById('res-hsl');

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return isNaN(num) ? null : { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  function update() {
    let hex = inEl.value.trim();
    if (!hex.startsWith('#')) hex = '#' + hex;
    const rgb = hexToRgb(hex);
    if (!rgb) return;

    picker.value = hex;
    swatch.style.backgroundColor = hex;
    swatch.style.color = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) > 150 ? '#18211d' : '#ffffff';

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    resHex.textContent = hex.toUpperCase();
    resRgb.textContent = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
    resHsl.textContent = 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)';
  }

  inEl.addEventListener('input', update);
  picker.addEventListener('input', () => { inEl.value = picker.value; update(); });
  update();
})();`,
    howToSteps: [
      'Enter any 3-digit or 6-digit HEX color, or select a color using the color picker.',
      'Inspect converted values in HEX, RGB, and HSL notation.',
      'Copy the required CSS color string into your stylesheet.'
    ],
    benefitTitle: 'HEX vs RGB vs HSL in CSS',
    benefitContent: 'HEX is compact for web assets. RGB expresses red, green, and blue primary color channels (0-255). HSL (Hue, Saturation, Lightness) provides an intuitive human model for adjusting shades, tints, and gradients easily.',
    faqs: [
      { q: 'What is HSL Hue range?', a: 'Hue is measured in degrees on the color wheel from 0 to 360 (0° = Red, 120° = Green, 240° = Blue).' }
    ]
  },

  // 4. Percentage Increase and Decrease Calculator
  {
    slug: 'percentage-increase-decrease-calculator',
    name: 'Percentage Increase & Decrease Calculator',
    description: 'Calculate percentage increase, percentage decrease, percentage change, and absolute difference between two numbers.',
    category: 'Math',
    icon: 'text',
    keywords: ['percentage increase calculator', 'percentage decrease calculator', 'percent change calculator', 'percentage difference calculator', 'calculate percentage growth'],
    order: 57,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Percentage Change Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pct-initial">Initial Value (V1)</label>
          <input class="tool-textarea" id="pct-initial" type="number" step="any" placeholder="e.g. 50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pct-final">Final Value (V2)</label>
          <input class="tool-textarea" id="pct-final" type="number" step="any" placeholder="e.g. 75" />
        </div>
      </div>
      <div id="pct-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pct-res-change" style="font-weight:800;">-</span>
            <span class="stat-label">Percentage Change</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pct-res-diff">-</span>
            <span class="stat-label">Absolute Difference</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pct-res-mult">-</span>
            <span class="stat-label">Multiplier Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const initEl = document.getElementById('pct-initial');
  const finEl = document.getElementById('pct-final');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('pct-res-card');
  const resChange = document.getElementById('pct-res-change');
  const resDiff = document.getElementById('pct-res-diff');
  const resMult = document.getElementById('pct-res-mult');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v1 = parseFloat(initEl.value);
    const v2 = parseFloat(finEl.value);

    if (isNaN(v1) || isNaN(v2)) {
      setMsg('Please enter valid numeric values for both fields.', true);
      resCard.style.display = 'none';
      return;
    }
    if (v1 === 0) {
      setMsg('Initial value cannot be zero when computing percentage change.', true);
      resCard.style.display = 'none';
      return;
    }

    const diff = v2 - v1;
    const change = (diff / Math.abs(v1)) * 100;
    const mult = v2 / v1;

    resDiff.textContent = (diff >= 0 ? '+' : '') + diff.toLocaleString();
    resChange.textContent = (change >= 0 ? '+' : '') + change.toFixed(2) + '%';
    resChange.style.color = change >= 0 ? '#22543d' : '#c53030';
    resMult.textContent = mult.toFixed(4) + 'x';

    resCard.style.display = 'block';
    setMsg(change >= 0 ? 'Percentage increase of ' + change.toFixed(2) + '%' : 'Percentage decrease of ' + Math.abs(change).toFixed(2) + '%');
  });

  clearBtn.addEventListener('click', () => {
    initEl.value = ''; finEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the starting (original) value.',
      'Enter the new (final) value.',
      'Click <strong>Calculate</strong> to see the exact percentage change, absolute difference, and growth multiplier.'
    ],
    benefitTitle: 'Percentage Change Formula',
    benefitContent: 'Percentage change represents the relative difference between an original value and a new value: Change (%) = ((V2 - V1) / |V1|) × 100. If the result is positive, it is a percentage increase; if negative, a percentage decrease.',
    faqs: [
      { q: 'How to calculate 20% increase on 100?', a: '100 + (100 × 0.20) = 120.' }
    ]
  },

  // 5. Ideal Gas Law Calculator (PV = nRT)
  {
    slug: 'ideal-gas-law-calculator',
    name: 'Ideal Gas Law Calculator',
    description: 'Solve for pressure (P), volume (V), moles (n), or temperature (T) using the ideal gas equation PV = nRT in standard chemistry units.',
    category: 'Science',
    icon: 'text',
    keywords: ['ideal gas law calculator', 'pv nrt calculator', 'chemistry gas calculator', 'ideal gas equation solver', 'pressure volume temperature moles'],
    order: 58,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ideal Gas Law Equation (PV = nRT)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="gas-solve-for">Solve For Variable:</label>
        <select class="tool-textarea" id="gas-solve-for">
          <option value="P">Pressure (P) in atm</option>
          <option value="V">Volume (V) in Liters (L)</option>
          <option value="n">Amount of Substance (n) in Moles (mol)</option>
          <option value="T">Temperature (T) in Kelvin (K)</option>
        </select>
      </div>
      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-top:1rem;">
        <div class="control-group" id="group-P" style="display:none;">
          <label class="control-label" for="gas-p">Pressure P (atm)</label>
          <input class="tool-textarea" id="gas-p" type="number" step="any" placeholder="e.g. 1.0" />
        </div>
        <div class="control-group" id="group-V">
          <label class="control-label" for="gas-v">Volume V (Liters)</label>
          <input class="tool-textarea" id="gas-v" type="number" step="any" placeholder="e.g. 22.4" />
        </div>
        <div class="control-group" id="group-n">
          <label class="control-label" for="gas-n">Moles n (mol)</label>
          <input class="tool-textarea" id="gas-n" type="number" step="any" placeholder="e.g. 1.0" />
        </div>
        <div class="control-group" id="group-T">
          <label class="control-label" for="gas-t">Temperature T (Kelvin)</label>
          <input class="tool-textarea" id="gas-t" type="number" step="any" placeholder="e.g. 273.15" />
        </div>
      </div>
      <div id="gas-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gas-res-val" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Calculated Result</span>
          </div>
          <div class="stat">
            <span class="stat-value">0.0821 L·atm/(mol·K)</span>
            <span class="stat-label">Universal Gas Constant (R)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const solveSelect = document.getElementById('gas-solve-for');
  const pInput = document.getElementById('gas-p');
  const vInput = document.getElementById('gas-v');
  const nInput = document.getElementById('gas-n');
  const tInput = document.getElementById('gas-t');

  const grpP = document.getElementById('group-P');
  const grpV = document.getElementById('group-V');
  const grpN = document.getElementById('group-n');
  const grpT = document.getElementById('group-T');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('gas-res-card');
  const resVal = document.getElementById('gas-res-val');

  const R = 0.082057; // L atm / (mol K)

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function updateInputs() {
    const solve = solveSelect.value;
    grpP.style.display = solve === 'P' ? 'none' : 'block';
    grpV.style.display = solve === 'V' ? 'none' : 'block';
    grpN.style.display = solve === 'n' ? 'none' : 'block';
    grpT.style.display = solve === 'T' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveSelect.addEventListener('change', updateInputs);
  updateInputs();

  btn.addEventListener('click', () => {
    const solve = solveSelect.value;
    const P = parseFloat(pInput.value);
    const V = parseFloat(vInput.value);
    const n = parseFloat(nInput.value);
    const T = parseFloat(tInput.value);

    let result = 0;
    let unit = '';

    if (solve === 'P') {
      if (isNaN(V) || isNaN(n) || isNaN(T) || V <= 0 || n <= 0 || T <= 0) {
        setMsg('Please enter positive values for V, n, and T.', true); return;
      }
      result = (n * R * T) / V;
      unit = 'atm';
    } else if (solve === 'V') {
      if (isNaN(P) || isNaN(n) || isNaN(T) || P <= 0 || n <= 0 || T <= 0) {
        setMsg('Please enter positive values for P, n, and T.', true); return;
      }
      result = (n * R * T) / P;
      unit = 'Liters (L)';
    } else if (solve === 'n') {
      if (isNaN(P) || isNaN(V) || isNaN(T) || P <= 0 || V <= 0 || T <= 0) {
        setMsg('Please enter positive values for P, V, and T.', true); return;
      }
      result = (P * V) / (R * T);
      unit = 'moles (mol)';
    } else if (solve === 'T') {
      if (isNaN(P) || isNaN(V) || isNaN(n) || P <= 0 || V <= 0 || n <= 0) {
        setMsg('Please enter positive values for P, V, and n.', true); return;
      }
      result = (P * V) / (n * R);
      unit = 'Kelvin (K)';
    }

    resVal.textContent = result.toFixed(4) + ' ' + unit;
    resCard.style.display = 'block';
    setMsg('Ideal Gas Law computed successfully.');
  });

  clearBtn.addEventListener('click', () => {
    pInput.value = ''; vInput.value = ''; nInput.value = ''; tInput.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Choose which variable you want to solve for (P, V, n, or T).',
      'Enter the remaining 3 known parameters.',
      'Click <strong>Calculate</strong> to determine the missing state variable.'
    ],
    benefitTitle: 'Ideal Gas Equation Principles',
    benefitContent: 'The ideal gas law relates the state variables of a hypothetical ideal gas: Pressure (P in atm), Volume (V in Liters), Amount of substance (n in moles), and Absolute Temperature (T in Kelvin), using the ideal gas constant R = 0.082057 L·atm/(mol·K).',
    faqs: [
      { q: 'What is STP (Standard Temperature and Pressure)?', a: 'STP is defined as 0 °C (273.15 K) and 1 atm pressure, where 1 mole of an ideal gas occupies 22.414 Liters.' }
    ]
  }
];

toolsBatch2.forEach(createTool);
console.log('Batch 2 complete.');
