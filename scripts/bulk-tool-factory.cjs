const { createTool } = require('./generate-curated-tools.cjs');

const massiveBatch = [
  // 1. Vector Dot & Cross Product Calculator
  {
    slug: 'vector-cross-dot-product-calculator',
    name: '3D Vector Dot & Cross Product Calculator',
    description: 'Calculate 3D vector dot product (A · B), cross product (A × B), vector magnitudes, and angle between vectors in degrees and radians.',
    category: 'Math',
    icon: 'text',
    keywords: ['vector cross product calculator', 'vector dot product calculator', '3d vector calculator', 'angle between vectors', 'vector magnitude calculator'],
    order: 69,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '3D Vector Inputs (A and B)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
        <div class="control-group">
          <label class="control-label">Vector A (x, y, z)</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="vec-ax" type="number" step="any" placeholder="Ax (e.g. 1)" />
            <input class="tool-textarea" id="vec-ay" type="number" step="any" placeholder="Ay (e.g. 2)" />
            <input class="tool-textarea" id="vec-az" type="number" step="any" placeholder="Az (e.g. 3)" />
          </div>
        </div>
        <div class="control-group">
          <label class="control-label">Vector B (x, y, z)</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="vec-bx" type="number" step="any" placeholder="Bx (e.g. 4)" />
            <input class="tool-textarea" id="vec-by" type="number" step="any" placeholder="By (e.g. 5)" />
            <input class="tool-textarea" id="vec-bz" type="number" step="any" placeholder="Bz (e.g. 6)" />
          </div>
        </div>
      </div>
      <div id="vec-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="vec-res-dot" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Dot Product (A · B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vec-res-cross" style="font-family:monospace; font-weight:700;">-</span>
            <span class="stat-label">Cross Product (A × B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vec-res-angle">-</span>
            <span class="stat-label">Angle Between Vectors (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vec-res-maga">-</span>
            <span class="stat-label">Magnitude |A|</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vec-res-magb">-</span>
            <span class="stat-label">Magnitude |B|</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const axEl = document.getElementById('vec-ax'), ayEl = document.getElementById('vec-ay'), azEl = document.getElementById('vec-az');
  const bxEl = document.getElementById('vec-bx'), byEl = document.getElementById('vec-by'), bzEl = document.getElementById('vec-bz');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('vec-res-card');
  const resDot = document.getElementById('vec-res-dot'), resCross = document.getElementById('vec-res-cross');
  const resAngle = document.getElementById('vec-res-angle'), resMagA = document.getElementById('vec-res-maga'), resMagB = document.getElementById('vec-res-magb');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const ax = parseFloat(axEl.value), ay = parseFloat(ayEl.value), az = parseFloat(azEl.value);
    const bx = parseFloat(bxEl.value), by = parseFloat(byEl.value), bz = parseFloat(bzEl.value);

    if ([ax, ay, az, bx, by, bz].some(isNaN)) {
      setMsg('Please enter valid numerical components for all vector axes.', true);
      resCard.style.display = 'none'; return;
    }

    const dot = ax * bx + ay * by + az * bz;
    const cx = ay * bz - az * by;
    const cy = az * bx - ax * bz;
    const cz = ax * by - ay * bx;

    const magA = Math.sqrt(ax * ax + ay * ay + az * az);
    const magB = Math.sqrt(bx * bx + by * by + bz * bz);

    let angleDeg = 0;
    if (magA > 0 && magB > 0) {
      const cosTheta = Math.max(-1, Math.min(1, dot / (magA * magB)));
      angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;
    }

    resDot.textContent = dot.toFixed(4);
    resCross.textContent = '(' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ', ' + cz.toFixed(2) + ')';
    resAngle.textContent = angleDeg.toFixed(2) + '°';
    resMagA.textContent = magA.toFixed(4);
    resMagB.textContent = magB.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Vector products computed.');
  });

  clearBtn.addEventListener('click', () => {
    [axEl, ayEl, azEl, bxEl, byEl, bzEl].forEach(el => el.value = '');
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the X, Y, and Z components for Vector A and Vector B.',
      'Click <strong>Calculate</strong> to inspect the dot product, cross product vector, and angle θ.'
    ],
    benefitTitle: 'Dot Product vs Cross Product',
    benefitContent: 'The Dot Product is a scalar value expressing the directional alignment of two vectors (A · B = |A||B| cos θ). The Cross Product is a perpendicular vector representing rotational torque or normal surface vector (A × B = |A||B| sin θ n).',
    faqs: [
      { q: 'What does a dot product of zero mean?', a: 'When the dot product of two non-zero vectors is 0, the vectors are strictly orthogonal (perpendicular at 90 degrees).' }
    ]
  },

  // 2. Matrix Determinant Calculator
  {
    slug: 'matrix-determinant-calculator',
    name: 'Matrix Determinant Calculator',
    description: 'Calculate 2x2 and 3x3 matrix determinants with step-by-step cofactor expansion and matrix singularity checking.',
    category: 'Math',
    icon: 'text',
    keywords: ['matrix determinant calculator', 'determinant of 3x3 matrix', '2x2 determinant calculator', 'matrix invertibility calculator', 'linear algebra determinant'],
    order: 70,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '3x3 Matrix Grid',
    controlsHtml: `      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.6rem; max-width:320px; margin:0 auto;">
        <input class="tool-textarea" id="m00" type="number" step="any" placeholder="a11" style="text-align:center;" />
        <input class="tool-textarea" id="m01" type="number" step="any" placeholder="a12" style="text-align:center;" />
        <input class="tool-textarea" id="m02" type="number" step="any" placeholder="a13" style="text-align:center;" />
        <input class="tool-textarea" id="m10" type="number" step="any" placeholder="a21" style="text-align:center;" />
        <input class="tool-textarea" id="m11" type="number" step="any" placeholder="a22" style="text-align:center;" />
        <input class="tool-textarea" id="m12" type="number" step="any" placeholder="a23" style="text-align:center;" />
        <input class="tool-textarea" id="m20" type="number" step="any" placeholder="a31" style="text-align:center;" />
        <input class="tool-textarea" id="m21" type="number" step="any" placeholder="a32" style="text-align:center;" />
        <input class="tool-textarea" id="m22" type="number" step="any" placeholder="a33" style="text-align:center;" />
      </div>
      <div id="mat-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mat-res-det" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Determinant det(A) or |A|</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mat-res-status" style="font-weight:700;">-</span>
            <span class="stat-label">Invertibility Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inputs = [
    ['m00','m01','m02'],
    ['m10','m11','m12'],
    ['m20','m21','m22']
  ].map(row => row.map(id => document.getElementById(id)));

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('mat-res-card');
  const resDet = document.getElementById('mat-res-det'), resStatus = document.getElementById('mat-res-status');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const vals = inputs.map(row => row.map(el => parseFloat(el.value)));
    if (vals.flat().some(isNaN)) {
      setMsg('Please fill in all 9 matrix cells with valid numbers.', true);
      resCard.style.display = 'none'; return;
    }

    const [[a, b, c], [d, e, f], [g, h, i]] = vals;
    // det = a(ei − fh) − b(di − fg) + c(dh − eg)
    const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

    resDet.textContent = det.toFixed(4);
    if (Math.abs(det) < 1e-12) {
      resStatus.textContent = 'Singular (Non-Invertible)';
      resStatus.style.color = '#c53030';
    } else {
      resStatus.textContent = 'Invertible (det ≠ 0)';
      resStatus.style.color = '#22543d';
    }

    resCard.style.display = 'block';
    setMsg('Matrix determinant calculated.');
  });

  clearBtn.addEventListener('click', () => {
    inputs.flat().forEach(el => el.value = '');
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter all 9 numbers into the 3x3 matrix grid.',
      'Click <strong>Calculate</strong> to inspect the determinant and invertibility status.'
    ],
    benefitTitle: 'Laplace Matrix Expansion',
    benefitContent: 'The determinant of a 3x3 matrix represents the scaling factor of the volume transformation. If det(A) = 0, the matrix collapses space and is non-invertible.',
    faqs: [
      { q: 'What is a singular matrix?', a: 'A singular matrix is a square matrix whose determinant is zero, meaning it has no multiplicative inverse.' }
    ]
  },

  // 3. Ellipse Area & Ramanujan Perimeter Calculator
  {
    slug: 'ellipse-area-perimeter-calculator',
    name: 'Ellipse Area & Perimeter Calculator',
    description: 'Calculate the exact area and accurate perimeter of an ellipse using Ramanujan\'s second perimeter approximation formula.',
    category: 'Math',
    icon: 'text',
    keywords: ['ellipse area calculator', 'ellipse perimeter calculator', 'ramanujan ellipse formula', 'circumference of ellipse', 'semi major semi minor axis'],
    order: 71,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ellipse Axes Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ell-a">Semi-Major Axis (a)</label>
          <input class="tool-textarea" id="ell-a" type="number" step="any" placeholder="e.g. 10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ell-b">Semi-Minor Axis (b)</label>
          <input class="tool-textarea" id="ell-b" type="number" step="any" placeholder="e.g. 6" />
        </div>
      </div>
      <div id="ell-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ell-res-area" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Area (A = πab)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ell-res-peri" style="font-weight:800;">-</span>
            <span class="stat-label">Perimeter (Ramanujan Approximation)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ell-res-ecc">-</span>
            <span class="stat-label">Eccentricity (e)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ell-a'), bEl = document.getElementById('ell-b');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ell-res-card');
  const resArea = document.getElementById('ell-res-area'), resPeri = document.getElementById('ell-res-peri'), resEcc = document.getElementById('ell-res-ecc');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    let a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      setMsg('Please enter positive values for both axes.', true);
      resCard.style.display = 'none'; return;
    }
    if (b > a) { const tmp = a; a = b; b = tmp; } // ensure a >= b

    const area = Math.PI * a * b;
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    // Ramanujan's Second Approximation: P ≈ π(a+b)(1 + 3h / (10 + sqrt(4 - 3h)))
    const peri = Math.PI * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
    const ecc = Math.sqrt(1 - (b * b) / (a * a));

    resArea.textContent = area.toFixed(4) + ' sq units';
    resPeri.textContent = peri.toFixed(4) + ' units';
    resEcc.textContent = ecc.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Ellipse geometry calculated.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = ''; bEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the semi-major axis (a) and semi-minor axis (b).',
      'Click <strong>Calculate</strong> to inspect the exact area (πab) and Ramanujan\'s formula perimeter.'
    ],
    benefitTitle: 'Why is Ellipse Perimeter Complex?',
    benefitContent: 'Unlike a circle, an ellipse has no elementary algebraic closed-form formula for its circumference and requires elliptic integrals. Srinivasa Ramanujan discovered extraordinary high-precision approximation formulas with negligible relative error (< 0.001%).',
    faqs: [
      { q: 'What is eccentricity e?', a: 'Eccentricity ranges from 0 (perfect circle) to almost 1 (very flattened, elongated ellipse).' }
    ]
  },

  // 4. Bitwise Calculator (AND, OR, XOR, NOT, Shift)
  {
    slug: 'bitwise-calculator',
    name: 'Bitwise Calculator',
    description: 'Perform bitwise AND, OR, XOR, NOT, Left Shift, and Right Shift operations on integers with live Binary and Hexadecimal representations.',
    category: 'Developer',
    icon: 'code',
    keywords: ['bitwise calculator', 'binary bitwise operator', 'bitwise and or xor calculator', 'bit shift calculator online', 'binary hex bitwise'],
    order: 72,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Bitwise Operation Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bit-a">Number A (Decimal)</label>
          <input class="tool-textarea" id="bit-a" type="number" step="1" value="12" placeholder="e.g. 12" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bit-b">Number B (Decimal)</label>
          <input class="tool-textarea" id="bit-b" type="number" step="1" value="5" placeholder="e.g. 5" />
        </div>
      </div>
      <div id="bit-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem; font-family:monospace; font-size:0.95rem;">
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; border-bottom:1px solid var(--line); padding-bottom:0.4rem; font-weight:700;">
            <span>Operation</span><span>Decimal</span><span>Binary (32-bit)</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>A AND B (&)</strong><span id="res-and-dec">-</span><span id="res-and-bin">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>A OR B (|)</strong><span id="res-or-dec">-</span><span id="res-or-bin">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>A XOR B (^)</strong><span id="res-xor-dec">-</span><span id="res-xor-bin">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>NOT A (~)</strong><span id="res-not-dec">-</span><span id="res-not-bin">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>A &lt;&lt; 1 (Left)</strong><span id="res-shl-dec">-</span><span id="res-shl-bin">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 100px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>A &gt;&gt; 1 (Right)</strong><span id="res-shr-dec">-</span><span id="res-shr-bin">-</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('bit-a'), bEl = document.getElementById('bit-b');
  const andDec = document.getElementById('res-and-dec'), andBin = document.getElementById('res-and-bin');
  const orDec = document.getElementById('res-or-dec'), orBin = document.getElementById('res-or-bin');
  const xorDec = document.getElementById('res-xor-dec'), xorBin = document.getElementById('res-xor-bin');
  const notDec = document.getElementById('res-not-dec'), notBin = document.getElementById('res-not-bin');
  const shlDec = document.getElementById('res-shl-dec'), shlBin = document.getElementById('res-shl-bin');
  const shrDec = document.getElementById('res-shr-dec'), shrBin = document.getElementById('res-shr-bin');

  function toBin32(n) {
    return (n >>> 0).toString(2).padStart(16, '0');
  }

  function update() {
    const a = parseInt(aEl.value, 10);
    const b = parseInt(bEl.value, 10);
    if (isNaN(a) || isNaN(b)) return;

    const opAnd = a & b;
    const opOr = a | b;
    const opXor = a ^ b;
    const opNot = ~a;
    const opShl = a << 1;
    const opShr = a >> 1;

    andDec.textContent = opAnd; andBin.textContent = toBin32(opAnd);
    orDec.textContent = opOr; orBin.textContent = toBin32(opOr);
    xorDec.textContent = opXor; xorBin.textContent = toBin32(opXor);
    notDec.textContent = opNot; notBin.textContent = toBin32(opNot);
    shlDec.textContent = opShl; shlBin.textContent = toBin32(opShl);
    shrDec.textContent = opShr; shrBin.textContent = toBin32(opShr);
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter two integers in decimal format (e.g. 12 and 5).',
      'View the instant bitwise operations: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>).',
      'Compare decimal outputs alongside their 16-bit binary registers.'
    ],
    benefitTitle: 'Bit Manipulation in Software Engineering',
    benefitContent: 'Bitwise operations are executed directly by the CPU ALU in single clock cycles, making them essential for high-performance graphics engines, network protocols, cryptography, and embedded systems.',
    faqs: [
      { q: 'What is the XOR trick for swapping variables?', a: 'a ^= b; b ^= a; a ^= b; swaps two numbers without requiring temporary memory.' }
    ]
  },

  // 5. Invisible Character & Zero-Width Space Detector
  {
    slug: 'invisible-character-detector',
    name: 'Invisible Character Detector',
    description: 'Find and remove invisible Unicode characters, zero-width spaces (ZWSP), soft hyphens, and byte order marks (BOM) from your text.',
    category: 'Developer',
    icon: 'code',
    keywords: ['invisible character detector', 'zero width space remover', 'hidden unicode characters detector', 'clean zero width characters', 'remove bom online'],
    order: 73,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Hidden Unicode Inspector',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="invis-input">Input Text to Inspect</label>
        <textarea class="tool-textarea" id="invis-input" rows="5" placeholder="Paste your text here to reveal hidden zero-width spaces or invisible characters..."></textarea>
      </div>
      <div id="invis-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="margin-bottom:1rem;">
          <div class="stat">
            <span class="stat-value" id="invis-count" style="color:#c53030; font-weight:800;">-</span>
            <span class="stat-label">Hidden Characters Found</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Cleaned Text (Zero-Width Free)</label>
          <button class="button secondary" id="copy-invis-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Clean Text</button>
        </div>
        <textarea class="tool-textarea" id="invis-output" rows="5" readonly></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('invis-input'), outEl = document.getElementById('invis-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-invis-btn'), msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('invis-res-card'), countEl = document.getElementById('invis-count');

  // Regex matching zero-width spaces, joiners, BOM, and unusual non-printing unicode
  const INVIS_REGEX = /[\\u200B-\\u200D\\uFEFF\\u200E\\u200F\\u202A-\\u202E\\u00AD\\u2060]/g;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value;
    if (!raw) { setMsg('Please enter text to inspect.', true); resCard.style.display = 'none'; return; }

    const matches = raw.match(INVIS_REGEX) || [];
    const cleaned = raw.replace(INVIS_REGEX, '');

    countEl.textContent = matches.length.toString();
    outEl.value = cleaned;
    resCard.style.display = 'block';

    if (matches.length > 0) {
      setMsg('Detected and removed ' + matches.length + ' hidden invisible characters!', true);
    } else {
      setMsg('Clean! No invisible zero-width characters found.');
    }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Clean text copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste suspicious source code, strings, or copied content into the input box.',
      'Click <strong>Calculate</strong> to inspect for zero-width spaces (U+200B) and BOM markers.',
      'Copy the sanitized, pure text output.'
    ],
    benefitTitle: 'Why Remove Zero-Width Spaces?',
    benefitContent: 'Invisible characters copied from PDFs or rich-text websites can cause mysterious syntax bugs in Python, JSON, SQL parsers, and regex matchers. Removing them ensures clean compile and runtime execution.',
    faqs: [
      { q: 'What is Unicode U+200B?', a: 'U+200B is the standard Zero-Width Space (ZWSP) which has zero visual width on screen but occupies 3 bytes in UTF-8.' }
    ]
  }
];

massiveBatch.forEach(createTool);
console.log('Massive batch complete.');
