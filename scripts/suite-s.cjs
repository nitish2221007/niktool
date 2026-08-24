const { createTool } = require('./generate-curated-tools.cjs');

// Suite S: 7 Tools in Linear Algebra, Complex Numbers & Vector Spaces to cross 405 tools
const toolsSuiteS = [
  // 1. Complex Numbers Polar (Euler) to Cartesian Converter
  {
    slug: 'complex-number-polar-cartesian-converter',
    name: 'Complex Number Polar & Cartesian Form Converter',
    description: 'Convert complex numbers between Rectangular Cartesian form (a + bi) and Exponential Polar form (r · e^(iθ) / r ∠ θ) in real time.',
    category: 'Math',
    icon: 'text',
    keywords: ['complex number polar form converter', 'cartesian to polar complex calculator', 'euler form complex number calculator', 'magnitude phase angle radians degrees', 'complex number phasor calculator online'],
    order: 274,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rectangular & Polar Coordinates',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cx-real">Real Part (a)</label>
          <input class="tool-textarea" id="cx-real" type="number" step="any" value="3.0" placeholder="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cx-imag">Imaginary Part (b)</label>
          <input class="tool-textarea" id="cx-imag" type="number" step="any" value="4.0" placeholder="4.0" />
        </div>
      </div>
      <div id="cx-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cx-res-mag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.000</span>
            <span class="stat-label">Magnitude / Modulus |z| (r = √(a²+b²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cx-res-deg" style="font-weight:700;">53.13° (0.927 rad)</span>
            <span class="stat-label">Phase Angle / Argument (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cx-res-euler">5.000 · e^(i · 0.927)</span>
            <span class="stat-label">Euler Exponential Form</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('cx-real'), iEl = document.getElementById('cx-imag');
  const magEl = document.getElementById('cx-res-mag'), degEl = document.getElementById('cx-res-deg'), eulEl = document.getElementById('cx-res-euler');

  function update() {
    const a = parseFloat(rEl.value), b = parseFloat(iEl.value);
    if (isNaN(a) || isNaN(b)) return;

    // r = sqrt(a^2 + b^2)
    const r = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    // theta = atan2(b, a)
    const thetaRad = Math.atan2(b, a);
    const thetaDeg = (thetaRad * 180) / Math.PI;

    magEl.textContent = r.toFixed(3);
    degEl.textContent = thetaDeg.toFixed(2) + '° (' + thetaRad.toFixed(3) + ' rad)';
    eulEl.textContent = r.toFixed(3) + ' · e^(i · ' + thetaRad.toFixed(3) + ')';
  }

  rEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter real component a and imaginary component b (for a + bi).',
      'Inspect modulus radius r, phase angle in degrees/radians, and Euler form notation.'
    ],
    benefitTitle: 'Leonhard Euler\'s Complex Exponential Formula',
    benefitContent: 'Euler\'s identity e^(iθ) = cos(θ) + i·sin(θ) connects trigonometric sinusoidal rotations with exponential functions, creating the mathematical foundation of AC phasor analysis, Fourier transforms, and quantum mechanics.',
    faqs: [{ q: 'What is 3 + 4i in polar form?', a: 'Modulus r = √(3² + 4²) = 5, phase θ = arctan(4/3) ≈ 53.13°.' }]
  },

  // 2. 2x2 Matrix Eigenvalues & Trace-Determinant Calculator
  {
    slug: 'matrix-eigenvalue-2x2-calculator',
    name: '2x2 Matrix Eigenvalues & Eigenvectors Calculator',
    description: 'Calculate real or complex eigenvalues (λ₁, λ₂), matrix trace, and determinant for 2×2 square transformation matrices.',
    category: 'Math',
    icon: 'text',
    keywords: ['eigenvalue calculator 2x2', 'matrix trace determinant eigenvalues', 'characteristic equation 2x2 matrix', 'linear algebra eigenvalue solver', 'eigenvalues online calculator'],
    order: 275,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '2×2 Square Matrix Elements [a, b; c, d]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; max-width:320px;">
        <input class="tool-textarea" id="eig-a" type="number" step="any" value="4" placeholder="a (1,1)" />
        <input class="tool-textarea" id="eig-b" type="number" step="any" value="1" placeholder="b (1,2)" />
        <input class="tool-textarea" id="eig-c" type="number" step="any" value="2" placeholder="c (2,1)" />
        <input class="tool-textarea" id="eig-d" type="number" step="any" value="3" placeholder="d (2,2)" />
      </div>
      <div id="eig-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eig-res-l1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ₁ = 5.00</span>
            <span class="stat-label">Principal Eigenvalue (λ₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eig-res-l2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ₂ = 2.00</span>
            <span class="stat-label">Secondary Eigenvalue (λ₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eig-res-trace">Tr(A) = 7.00, Det(A) = 10.00</span>
            <span class="stat-label">Matrix Invariants</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('eig-a'), bEl = document.getElementById('eig-b');
  const cEl = document.getElementById('eig-c'), dEl = document.getElementById('eig-d');
  const l1El = document.getElementById('eig-res-l1'), l2El = document.getElementById('eig-res-l2'), trEl = document.getElementById('eig-res-trace');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Trace T = a + d
    const T = a + d;
    // Determinant D = ad - bc
    const D = (a * d) - (b * c);
    // Discriminant Delta = T^2 - 4D
    const delta = Math.pow(T, 2) - (4 * D);

    trEl.textContent = 'Tr(A) = ' + T.toFixed(2) + ', Det(A) = ' + D.toFixed(2);

    if (delta >= 0) {
      const l1 = (T + Math.sqrt(delta)) / 2;
      const l2 = (T - Math.sqrt(delta)) / 2;
      l1El.textContent = 'λ₁ = ' + l1.toFixed(2);
      l2El.textContent = 'λ₂ = ' + l2.toFixed(2);
    } else {
      const real = (T / 2).toFixed(2);
      const imag = (Math.sqrt(-delta) / 2).toFixed(2);
      l1El.textContent = 'λ₁ = ' + real + ' + ' + imag + 'i';
      l2El.textContent = 'λ₂ = ' + real + ' - ' + imag + 'i';
    }
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the 4 matrix elements for [[a, b], [c, d]].',
      'Inspect the characteristic equation roots: eigenvalues λ₁ and λ₂, matrix trace (Tr), and determinant (Det).'
    ],
    benefitTitle: 'Principal Axes of Linear Transformations',
    benefitContent: 'Eigenvectors represent invariant spatial directions that only scale (by factor λ) without rotating under matrix transformation, forming the basis for Principal Component Analysis (PCA) and quantum state observables.',
    faqs: [{ q: 'What is the sum and product of eigenvalues?', a: 'λ₁ + λ₂ = Trace(A) = a + d, and λ₁ · λ₂ = Determinant(A) = ad - bc.' }]
  },

  // 3. 3D Vector Angle & Orthogonality Calculator
  {
    slug: 'vector-angle-3d-space-calculator',
    name: '3D Vector Angle & Orthogonality Calculator',
    description: 'Calculate the geometric angle in degrees and radians (cos θ = (u · v) / (|u| · |v|)) between two 3D vectors in Euclidean space.',
    category: 'Math',
    icon: 'text',
    keywords: ['angle between vectors 3d calculator', 'vector dot product angle calculator', 'orthogonality 3d vector calculator', 'cos theta vector angle online', '3d vector geometry calculator'],
    order: 276,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vector u [x, y, z] and Vector v [x, y, z]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div>
          <label class="control-label">Vector u (x, y, z)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="v-u1" type="number" step="any" value="1" placeholder="x" />
            <input class="tool-textarea" id="v-u2" type="number" step="any" value="2" placeholder="y" />
            <input class="tool-textarea" id="v-u3" type="number" step="any" value="3" placeholder="z" />
          </div>
        </div>
        <div>
          <label class="control-label">Vector v (x, y, z)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="v-v1" type="number" step="any" value="4" placeholder="x" />
            <input class="tool-textarea" id="v-v2" type="number" step="any" value="5" placeholder="y" />
            <input class="tool-textarea" id="v-v3" type="number" step="any" value="6" placeholder="z" />
          </div>
        </div>
      </div>
      <div id="vang-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vang-res-deg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.94°</span>
            <span class="stat-label">Angle Between Vectors (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vang-res-rad" style="font-weight:700;">0.226 Radians</span>
            <span class="stat-label">Angle in Radians</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vang-res-dot">u · v = 32.00</span>
            <span class="stat-label">Dot Product</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const u1El = document.getElementById('v-u1'), u2El = document.getElementById('v-u2'), u3El = document.getElementById('v-u3');
  const v1El = document.getElementById('v-v1'), v2El = document.getElementById('v-v2'), v3El = document.getElementById('v-v3');
  const degEl = document.getElementById('vang-res-deg'), radEl = document.getElementById('vang-res-rad'), dotEl = document.getElementById('vang-res-dot');

  function update() {
    const u1 = parseFloat(u1El.value), u2 = parseFloat(u2El.value), u3 = parseFloat(u3El.value);
    const v1 = parseFloat(v1El.value), v2 = parseFloat(v2El.value), v3 = parseFloat(v3El.value);

    if (isNaN(u1) || isNaN(u2) || isNaN(u3) || isNaN(v1) || isNaN(v2) || isNaN(v3)) return;

    const dot = (u1 * v1) + (u2 * v2) + (u3 * v3);
    const magU = Math.sqrt(u1*u1 + u2*u2 + u3*u3);
    const magV = Math.sqrt(v1*v1 + v2*v2 + v3*v3);

    if (magU === 0 || magV === 0) return;

    let cosTheta = dot / (magU * magV);
    if (cosTheta > 1) cosTheta = 1;
    if (cosTheta < -1) cosTheta = -1;

    const rad = Math.acos(cosTheta);
    const deg = (rad * 180) / Math.PI;

    degEl.textContent = deg.toFixed(2) + '°';
    radEl.textContent = rad.toFixed(3) + ' Radians';
    dotEl.textContent = 'u · v = ' + dot.toFixed(2);
  }

  [u1El, u2El, u3El, v1El, v2El, v3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 3D Cartesian coordinates for Vector u and Vector v.',
      'Inspect the inner dot product (u · v) and enclosed angle θ in degrees and radians.'
    ],
    benefitTitle: 'Orthogonality in Computer Graphics and Game Physics',
    benefitContent: 'Two vectors are perpendicular (orthogonal, 90°) if and only if their dot product equals exactly zero (u · v = 0), a property used constantly in 3D surface normal lighting calculations.',
    faqs: [{ q: 'What does a dot product of zero signify?', a: 'It means the two vectors are strictly perpendicular (orthogonal) at a 90° angle.' }]
  },

  // 4. Matrix Transpose Calculator (2x2 to 3x3)
  {
    slug: 'matrix-transpose-calculator',
    name: 'Matrix Transpose (Aᵀ) Operations Calculator',
    description: 'Calculate the mathematical transpose (Aᵀ) of 2×2, 3×3, and rectangular matrices by flipping rows into columns.',
    category: 'Math',
    icon: 'text',
    keywords: ['matrix transpose calculator', 'transpose of a matrix online', 'matrix transpose a t solver', 'swap rows and columns matrix', 'linear algebra matrix transpose'],
    order: 277,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Matrix A (3×3 or 2×2)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mt-input">Enter Matrix Rows (Comma or Space separated)</label>
        <textarea class="tool-textarea" id="mt-input" rows="3" placeholder="1, 2, 3&#10;4, 5, 6&#10;7, 8, 9"></textarea>
      </div>
      <div id="mt-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Transposed Matrix (Aᵀ):</label>
        <textarea class="tool-textarea" id="mt-output" rows="3" readonly style="font-family:monospace; font-weight:700; font-size:1.05rem; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('mt-input'), outEl = document.getElementById('mt-output');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
    const matrix = lines.map(l => l.split(/[,\\s\\t]+/).map(Number).filter(v => !isNaN(v)));

    if (matrix.length === 0 || matrix[0].length === 0) return;

    const rows = matrix.length;
    const cols = matrix[0].length;

    const trans = [];
    for (let c = 0; c < cols; c++) {
      const row = [];
      for (let r = 0; r < rows; r++) {
        row.push(matrix[r][c]);
      }
      trans.push(row.join('\\t '));
    }

    outEl.value = trans.join('\\n');
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste matrix rows (one line per row with numbers separated by commas or spaces).',
      'Inspect the transposed matrix where element (i, j) becomes element (j, i).'
    ],
    benefitTitle: 'Symmetric Matrices and Orthogonality',
    benefitContent: 'A square matrix is symmetric if A = Aᵀ, and orthogonal if A · Aᵀ = I (Identity Matrix), holding key significance in covariance matrices and multivariate data science.',
    faqs: [{ q: 'What is the transpose of a 2x3 matrix?', a: 'A 2×3 matrix transposes into a 3×2 matrix.' }]
  },

  // 5. Complex Number Arithmetic Operations Calculator
  {
    slug: 'complex-number-arithmetic-calculator',
    name: 'Complex Number Arithmetic (Add, Sub, Mult, Div) Calculator',
    description: 'Perform addition, subtraction, multiplication, and division on complex numbers (z₁ and z₂) with step-by-step rectangular and polar results.',
    category: 'Math',
    icon: 'text',
    keywords: ['complex number arithmetic calculator', 'multiply complex numbers online', 'divide complex numbers calculator', 'complex conjugate arithmetic', 'imaginary numbers calculator online'],
    order: 278,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Complex Numbers: z₁ = a + bi and z₂ = c + di',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div>
          <label class="control-label">z₁ (Real a, Imag b)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="ca-a" type="number" step="any" value="3" placeholder="a" />
            <input class="tool-textarea" id="ca-b" type="number" step="any" value="2" placeholder="b" />
          </div>
        </div>
        <div>
          <label class="control-label">z₂ (Real c, Imag d)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="ca-c" type="number" step="any" value="1" placeholder="c" />
            <input class="tool-textarea" id="ca-d" type="number" step="any" value="-4" placeholder="d" />
          </div>
        </div>
      </div>
      <div id="ca-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="ca-res-mult" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">11 - 10i</span>
            <span class="stat-label">Multiplication (z₁ · z₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ca-res-div" style="color:#2563eb; font-weight:800; font-size:1.4rem;">-0.29 + 0.82i</span>
            <span class="stat-label">Division (z₁ / z₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ca-res-add">4 - 2i</span>
            <span class="stat-label">Addition (z₁ + z₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ca-res-sub">2 + 6i</span>
            <span class="stat-label">Subtraction (z₁ - z₂)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ca-a'), bEl = document.getElementById('ca-b');
  const cEl = document.getElementById('ca-c'), dEl = document.getElementById('ca-d');
  const mulEl = document.getElementById('ca-res-mult'), divEl = document.getElementById('ca-res-div');
  const addEl = document.getElementById('ca-res-add'), subEl = document.getElementById('ca-res-sub');

  function fmt(r, i) {
    return r.toFixed(2) + (i >= 0 ? ' + ' : ' - ') + Math.abs(i).toFixed(2) + 'i';
  }

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Add: (a+c) + (b+d)i
    addEl.textContent = fmt(a + c, b + d);
    // Sub: (a-c) + (b-d)i
    subEl.textContent = fmt(a - c, b - d);

    // Mult: (a*c - b*d) + (a*d + b*c)i
    const mulR = (a * c) - (b * d);
    const mulI = (a * d) + (b * c);
    mulEl.textContent = fmt(mulR, mulI);

    // Div: (ac + bd)/(c^2 + d^2) + (bc - ad)/(c^2 + d^2)i
    const denom = Math.pow(c, 2) + Math.pow(d, 2);
    if (denom !== 0) {
      const divR = ((a * c) + (b * d)) / denom;
      const divI = ((b * c) - (a * d)) / denom;
      divEl.textContent = fmt(divR, divI);
    } else {
      divEl.textContent = 'Divide by 0';
    }
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter real and imaginary coefficients for z₁ = a + bi and z₂ = c + di.',
      'Inspect addition, subtraction, multiplication, and division results.'
    ],
    benefitTitle: 'Complex Number Division by Complex Conjugate',
    benefitContent: 'Dividing complex numbers involves multiplying numerator and denominator by the complex conjugate (c - di), converting the denominator into a purely real number (c² + d²).',
    faqs: [{ q: 'What is (3 + 2i) multiplied by (1 - 4i)?', a: '(3×1 - 2×(-4)) + (3×(-4) + 2×1)i = (3 + 8) + (-12 + 2)i = 11 - 10i.' }]
  }
];

toolsSuiteS.forEach(createTool);
console.log('Suite S complete: 5 tools created.');
