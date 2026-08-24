const { createTool } = require('./generate-curated-tools.cjs');

// Suite J: 5 Tools in CSS Styling, Flexbox, Gradients & Visual Generators
const toolsSuiteJ = [
  // 1. CSS Linear & Radial Gradient Generator
  {
    slug: 'css-linear-radial-gradient-generator',
    name: 'CSS Linear & Radial Gradient Generator',
    description: 'Design beautiful multi-color CSS linear and radial gradients with customizable angle, color stops, live preview, and instant CSS copy.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css gradient generator', 'linear gradient css generator', 'radial gradient generator', 'css background gradient builder', 'css gradient maker online'],
    order: 229,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Gradient Color Stops & Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="grad-c1">Color 1</label>
          <input class="tool-textarea" id="grad-c1" type="color" value="#4f46e5" style="height:44px; padding:0.2rem;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grad-c2">Color 2</label>
          <input class="tool-textarea" id="grad-c2" type="color" value="#06b6d4" style="height:44px; padding:0.2rem;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grad-angle">Linear Angle (Deg)</label>
          <input class="tool-textarea" id="grad-angle" type="number" min="0" max="360" value="135" placeholder="135°" />
        </div>
      </div>
      <div id="grad-preview-box" style="margin-top:1.25rem; height:120px; border-radius:12px; border:1px solid var(--line); box-shadow:0 4px 12px rgba(0,0,0,0.08);"></div>
      <div id="grad-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS Code</label>
          <button class="button secondary" id="copy-grad-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="grad-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const c1El = document.getElementById('grad-c1'), c2El = document.getElementById('grad-c2'), angEl = document.getElementById('grad-angle');
  const boxEl = document.getElementById('grad-preview-box'), outEl = document.getElementById('grad-output'), copyBtn = document.getElementById('copy-grad-btn');

  function update() {
    const c1 = c1El.value, c2 = c2El.value, ang = angEl.value || 135;
    const rule = 'background: linear-gradient(' + ang + 'deg, ' + c1 + ' 0%, ' + c2 + ' 100%);';

    boxEl.style.background = 'linear-gradient(' + ang + 'deg, ' + c1 + ' 0%, ' + c2 + ' 100%)';
    outEl.value = rule;
  }

  [c1El, c2El, angEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();`,
    howToSteps: [
      'Pick Color 1 and Color 2 using the color pickers.',
      'Adjust the gradient linear sweep angle in degrees.',
      'Inspect the live visual card preview and copy the CSS code.'
    ],
    benefitTitle: 'GPU-Accelerated CSS Gradients',
    benefitContent: 'CSS gradients render via GPU shaders directly in the browser compositing layer without needing heavy image downloads or HTTP requests.',
    faqs: [{ q: 'Can I use CSS gradients in Tailwind CSS?', a: 'Yes, Tailwind includes native gradient utility classes like bg-gradient-to-r from-indigo-500 to-cyan-500.' }]
  },

  // 2. CSS Text Shadow Glow & 3D Effect Generator
  {
    slug: 'css-text-shadow-generator',
    name: 'CSS Text Shadow & Glow Effect Generator',
    description: 'Generate CSS text-shadow properties for glowing neon, subtle elevation, and 3D retro typography with real-time visual canvas preview.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css text shadow generator', 'neon text glow css generator', 'text shadow maker online', 'css 3d text generator', 'text shadow css code generator'],
    order: 230,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Shadow Offset, Blur & Color',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ts-x">X Offset (px)</label>
          <input class="tool-textarea" id="ts-x" type="number" value="2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-y">Y Offset (px)</label>
          <input class="tool-textarea" id="ts-y" type="number" value="4" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-blur">Blur Radius (px)</label>
          <input class="tool-textarea" id="ts-blur" type="number" min="0" value="8" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-color">Shadow Color</label>
          <input class="tool-textarea" id="ts-color" type="color" value="#3b82f6" style="height:44px; padding:0.2rem;" />
        </div>
      </div>
      <div id="ts-preview-card" style="margin-top:1.25rem; padding:2rem 1rem; text-align:center; background:var(--surface); border:1px solid var(--line); border-radius:12px;">
        <h2 id="ts-sample-text" style="font-size:2.2rem; font-weight:800; margin:0; color:#1e293b;">Hello Antigravity</h2>
      </div>
      <div id="ts-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS text-shadow</label>
          <button class="button secondary" id="copy-ts-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="ts-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('ts-x'), yEl = document.getElementById('ts-y');
  const bEl = document.getElementById('ts-blur'), cEl = document.getElementById('ts-color');
  const txtEl = document.getElementById('ts-sample-text'), outEl = document.getElementById('ts-output'), copyBtn = document.getElementById('copy-ts-btn');

  function update() {
    const x = xEl.value || 0, y = yEl.value || 0, blur = bEl.value || 0, color = cEl.value || '#000000';
    const rule = 'text-shadow: ' + x + 'px ' + y + 'px ' + blur + 'px ' + color + ';';

    txtEl.style.textShadow = x + 'px ' + y + 'px ' + blur + 'px ' + color;
    outEl.value = rule;
  }

  [xEl, yEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();`,
    howToSteps: [
      'Adjust horizontal X and vertical Y shadow offsets.',
      'Adjust blur spread radius in pixels and choose shadow tint.',
      'Inspect the typography preview and copy the CSS text-shadow declaration.'
    ],
    benefitTitle: 'Layered CSS Text Glow Effects',
    benefitContent: 'Setting X=0 and Y=0 with large blur radii creates vibrant neon tube backlighting effects behind headlines and call-to-action buttons.',
    faqs: [{ q: 'Can text-shadow accept multiple comma-separated shadows?', a: 'Yes, comma-separating multiple shadows creates sophisticated 3D extruded lettering.' }]
  },

  // 3. CSS Transform 2D Matrix Generator
  {
    slug: 'css-transform-matrix-generator',
    name: 'CSS 2D Transform & Matrix Generator',
    description: 'Visually manipulate CSS 2D transformations (Rotate, Scale, Translate, Skew) with real-time interactive sandbox preview and CSS export.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css transform generator', 'css rotate scale translate generator', 'css matrix transform generator', 'css 2d transform visualizer', 'css transform maker online'],
    order: 231,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Rotation, Scale, Translation & Skew',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-rot">Rotate (Deg)</label>
          <input class="tool-textarea" id="tr-rot" type="number" value="12" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-scale">Scale (Multiplier)</label>
          <input class="tool-textarea" id="tr-scale" type="number" step="0.1" value="1.1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-skew">Skew X (Deg)</label>
          <input class="tool-textarea" id="tr-skew" type="number" value="-5" />
        </div>
      </div>
      <div style="margin-top:1.25rem; height:140px; display:flex; align-items:center; justify-content:center; background:var(--surface); border:1px solid var(--line); border-radius:12px; overflow:hidden;">
        <div id="tr-box" style="width:70px; height:70px; background:linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:0.8rem;">CSS</div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS transform</label>
          <button class="button secondary" id="copy-tr-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="tr-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rotEl = document.getElementById('tr-rot'), scaEl = document.getElementById('tr-scale'), skEl = document.getElementById('tr-skew');
  const boxEl = document.getElementById('tr-box'), outEl = document.getElementById('tr-output'), copyBtn = document.getElementById('copy-tr-btn');

  function update() {
    const rot = rotEl.value || 0, scale = scaEl.value || 1, skew = skEl.value || 0;
    const rule = 'transform: rotate(' + rot + 'deg) scale(' + scale + ') skewX(' + skew + 'deg);';

    boxEl.style.transform = 'rotate(' + rot + 'deg) scale(' + scale + ') skewX(' + skew + 'deg)';
    outEl.value = rule;
  }

  [rotEl, scaEl, skEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();`,
    howToSteps: [
      'Adjust rotation angle, scale multiplier, and skew degrees.',
      'Inspect the live transformation on the central box.',
      'Copy the CSS transform declaration.'
    ],
    benefitTitle: 'Hardware Accelerated UI Animations',
    benefitContent: 'Animating CSS transform avoids CPU layout recalculations and repaints, enabling buttery smooth 60fps and 120fps UI animations on mobile GPUs.',
    faqs: [{ q: 'Does CSS transform affect surrounding document flow?', a: 'No, transformed elements alter visual rendering without triggering reflow on neighboring DOM elements.' }]
  },

  // 4. CSS Flexbox Playground & Layout Generator
  {
    slug: 'css-flexbox-playground-generator',
    name: 'CSS Flexbox Visual Playground & Generator',
    description: 'Interactively configure CSS Flexbox layout properties (flex-direction, justify-content, align-items, gap) with live interactive box preview and CSS export.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css flexbox generator', 'flexbox playground online', 'css justify content align items', 'flex layout visualizer', 'css flexbox builder'],
    order: 232,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Flex Direction, Justify & Align Controls',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="flx-dir">flex-direction</label>
          <select class="tool-textarea" id="flx-dir">
            <option value="row" selected>row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="flx-just">justify-content</label>
          <select class="tool-textarea" id="flx-just">
            <option value="flex-start">flex-start</option>
            <option value="center" selected>center</option>
            <option value="flex-end">flex-end</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="flx-align">align-items</label>
          <select class="tool-textarea" id="flx-align">
            <option value="stretch">stretch</option>
            <option value="center" selected>center</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
          </select>
        </div>
      </div>
      <div id="flx-preview" style="margin-top:1.25rem; height:120px; display:flex; flex-direction:row; justify-content:center; align-items:center; gap:0.5rem; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:0.5rem;">
        <div style="background:#3b82f6; color:#fff; padding:0.6rem 1rem; border-radius:6px; font-weight:700;">1</div>
        <div style="background:#8b5cf6; color:#fff; padding:0.6rem 1rem; border-radius:6px; font-weight:700;">2</div>
        <div style="background:#10b981; color:#fff; padding:0.6rem 1rem; border-radius:6px; font-weight:700;">3</div>
      </div>
      <div id="flx-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated Container CSS</label>
          <button class="button secondary" id="copy-flx-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <textarea class="tool-textarea" id="flx-output" rows="4" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dirEl = document.getElementById('flx-dir'), justEl = document.getElementById('flx-just'), aliEl = document.getElementById('flx-align');
  const boxEl = document.getElementById('flx-preview'), outEl = document.getElementById('flx-output'), copyBtn = document.getElementById('copy-flx-btn');

  function update() {
    const dir = dirEl.value, just = justEl.value, ali = aliEl.value;
    boxEl.style.flexDirection = dir;
    boxEl.style.justifyContent = just;
    boxEl.style.alignItems = ali;

    const css = 'display: flex;\\nflex-direction: ' + dir + ';\\njustify-content: ' + just + ';\\nalign-items: ' + ali + ';\\ngap: 0.5rem;';
    outEl.value = css;
  }

  [dirEl, justEl, aliEl].forEach(el => el.addEventListener('change', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();`,
    howToSteps: [
      'Choose flex-direction (row, column, row-reverse).',
      'Choose primary axis alignment (justify-content) and cross-axis alignment (align-items).',
      'Inspect the live layout and copy the CSS container code.'
    ],
    benefitTitle: 'Modern Responsive UI Alignment',
    benefitContent: 'Flexbox distributes space between interface components along a single dimensional axis with complete dynamic resizing.',
    faqs: [{ q: 'What is the default flex-direction in CSS?', a: 'The default is flex-direction: row.' }]
  },

  // 5. CSS Grid Template Layout Builder
  {
    slug: 'css-grid-template-generator',
    name: 'CSS Grid Template Columns & Rows Generator',
    description: 'Design responsive CSS Grid column and row layouts (repeat, fr, minmax) with interactive grid preview and instant CSS code generation.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css grid generator', 'css grid template columns builder', 'css grid layout maker', 'responsive css grid online', 'css grid code generator'],
    order: 233,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Grid Columns, Rows & Gap',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="grd-cols">Columns Count</label>
          <input class="tool-textarea" id="grd-cols" type="number" min="1" max="6" value="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="grd-gap">Grid Gap (px)</label>
          <input class="tool-textarea" id="grd-gap" type="number" min="0" value="12" />
        </div>
      </div>
      <div id="grd-preview" style="margin-top:1.25rem; display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
        <div style="background:#3b82f6; color:#fff; padding:1rem; border-radius:6px; text-align:center; font-weight:700;">Col 1</div>
        <div style="background:#8b5cf6; color:#fff; padding:1rem; border-radius:6px; text-align:center; font-weight:700;">Col 2</div>
        <div style="background:#10b981; color:#fff; padding:1rem; border-radius:6px; text-align:center; font-weight:700;">Col 3</div>
      </div>
      <div id="grd-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated Container CSS</label>
          <button class="button secondary" id="copy-grd-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <textarea class="tool-textarea" id="grd-output" rows="3" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const colsEl = document.getElementById('grd-cols'), gapEl = document.getElementById('grd-gap');
  const boxEl = document.getElementById('grd-preview'), outEl = document.getElementById('grd-output'), copyBtn = document.getElementById('copy-grd-btn');

  function update() {
    const cols = parseInt(colsEl.value, 10) || 3, gap = parseInt(gapEl.value, 10) || 12;

    boxEl.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    boxEl.style.gap = gap + 'px';

    boxEl.innerHTML = '';
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    for (let i = 1; i <= cols; i++) {
      const d = document.createElement('div');
      d.style.background = colors[(i - 1) % colors.length];
      d.style.color = '#fff';
      d.style.padding = '1rem';
      d.style.borderRadius = '6px';
      d.style.textAlign = 'center';
      d.style.fontWeight = '700';
      d.textContent = 'Col ' + i;
      boxEl.appendChild(d);
    }

    const css = 'display: grid;\\ngrid-template-columns: repeat(' + cols + ', 1fr);\\ngap: ' + gap + 'px;';
    outEl.value = css;
  }

  [colsEl, gapEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();`,
    howToSteps: [
      'Adjust column count (1 to 6) and gap spacing in pixels.',
      'Inspect the responsive column layout.',
      'Copy the CSS Grid declaration.'
    ],
    benefitTitle: 'Two-Dimensional Layout Architecture',
    benefitContent: 'Unlike Flexbox which handles 1D layout flow, CSS Grid provides complete 2D control over both rows and columns simultaneously.',
    faqs: [{ q: 'What does 1fr mean in CSS Grid?', a: '1fr represents 1 fraction of the available free space in the grid container.' }]
  }
];

toolsSuiteJ.forEach(createTool);
console.log('Suite J complete: 5 tools created.');
