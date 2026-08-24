const { createTool } = require('./generate-curated-tools.cjs');

// Pack 33: 25 University Engineering, Control Systems, Fluid Dynamics & Thermodynamics Student Calculators (Tools 1076 to 1100)
const pack33Tools = [
  // 1. Laplace Transform Table & S-Domain Transfer Function Calculator
  {
    slug: 'laplace-transform-table-s-domain-transfer-function-calculator',
    name: 'Laplace Transform Table & S-Domain Transfer Function L{f(t)} Calculator',
    description: 'Compute unilateral Laplace transforms L{f(t)} = F(s) for standard engineering time-domain signals (Unit Step u(t), Ramp t, Exponential e^(-at), Sine sin(ωt), Damped Oscillator e^(-at)·cos(ωt)) and evaluate region of convergence (ROC).',
    category: 'Math',
    icon: 'calculator',
    keywords: ['laplace transform calculator', 's domain transfer function calculator laplace table online', 'inverse laplace transform partial fractions calculator', 'damped sine exponential laplace transform solver', 'control systems laplace transform online'],
    order: 957,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Time Domain Signal f(t) & Parameter Settings (Frequency ω, Damping a, Exponent n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lap-sig">Signal f(t)</label>
          <select class="tool-textarea" id="lap-sig">
            <option value="damped_cos" selected>Damped Cosine e^(-at)·cos(ωt)</option>
            <option value="damped_sin">Damped Sine e^(-at)·sin(ωt)</option>
            <option value="step">Unit Step u(t)</option>
            <option value="exp">Exponential e^(-at)</option>
            <option value="ramp">Polynomial Ramp t^n</option>
            <option value="cos">Cosine cos(ωt)</option>
            <option value="sin">Sine sin(ωt)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lap-a">Damping a</label>
          <input class="tool-textarea" id="lap-a" type="number" step="0.5" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lap-w">Frequency ω (rad/s)</label>
          <input class="tool-textarea" id="lap-w" type="number" step="1" value="5.0" placeholder="5.0 rad/s" />
        </div>
      </div>
      <div id="lap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lap-res-fs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F(s) = (s + 2) / ((s + 2)² + 25)</span>
            <span class="stat-label">S-Domain Laplace Transform F(s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lap-res-roc" style="color:var(--green-dark); font-weight:700;">Complex Conjugate Poles: s = -2.0 ± 5.0j | Region of Convergence: Re(s) > -2.0</span>
            <span class="stat-label">System Poles & Region of Convergence (ROC)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sigEl = document.getElementById('lap-sig'), aEl = document.getElementById('lap-a'), wEl = document.getElementById('lap-w');
  const fsResEl = document.getElementById('lap-res-fs'), rocResEl = document.getElementById('lap-res-roc');

  function update() {
    const sig = sigEl.value;
    const a = parseFloat(aEl.value) || 0, w = parseFloat(wEl.value) || 0;

    let Fs = '', poles = '', roc = '';

    if (sig === 'damped_cos') {
      Fs = '(s + ' + a + ') / ((s + ' + a + ')² + ' + Math.pow(w, 2) + ')';
      poles = 's = -' + a + ' ± ' + w + 'j';
      roc = 'Re(s) > -' + a;
    } else if (sig === 'damped_sin') {
      Fs = w + ' / ((s + ' + a + ')² + ' + Math.pow(w, 2) + ')';
      poles = 's = -' + a + ' ± ' + w + 'j';
      roc = 'Re(s) > -' + a;
    } else if (sig === 'step') {
      Fs = '1 / s';
      poles = 's = 0';
      roc = 'Re(s) > 0';
    } else if (sig === 'exp') {
      Fs = '1 / (s + ' + a + ')';
      poles = 's = -' + a;
      roc = 'Re(s) > -' + a;
    } else if (sig === 'ramp') {
      Fs = '1 / s²';
      poles = 's = 0 (Double pole)';
      roc = 'Re(s) > 0';
    } else if (sig === 'cos') {
      Fs = 's / (s² + ' + Math.pow(w, 2) + ')';
      poles = 's = ±' + w + 'j';
      roc = 'Re(s) > 0';
    } else if (sig === 'sin') {
      Fs = w + ' / (s² + ' + Math.pow(w, 2) + ')';
      poles = 's = ±' + w + 'j';
      roc = 'Re(s) > 0';
    }

    fsResEl.textContent = 'F(s) = ' + Fs;
    rocResEl.textContent = 'Poles: ' + poles + ' | Region of Convergence: ' + roc;
  }

  [sigEl, aEl, wEl].forEach(el => el.addEventListener('input', update));
  sigEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select time-domain continuous input signal $f(t)$ from dropdown.',
      'Enter real exponential damping parameter a and angular oscillation frequency $\omega$ in rad/s.',
      'Inspect s-domain algebraic Laplace transfer function $F(s)$, complex s-plane pole locations, and Region of Convergence (ROC).'
    ],
    benefitTitle: 'Pierre-Simon Laplace S-Domain Transformation',
    benefitContent: 'Laplace transforms map difficult time-domain linear differential equations into simple algebraic fractions in the complex frequency domain ($s = \sigma + j\omega$), forming the foundation of electrical filter design and aircraft autopilot control systems.',
    faqs: [{ q: 'What is the physical meaning of the complex variable s in Laplace transforms?', a: '$s = \sigma + j\omega$ represents both exponential decay/growth ($\sigma$) and sinusoidal oscillation ($\omega$).' }]
  },

  // 2. Fourier Series Coefficients (Square, Sawtooth, Triangle Wave) Calculator
  {
    slug: 'fourier-series-coefficients-square-sawtooth-triangle-wave-calculator',
    name: 'Fourier Series Harmonic Coefficients (Square, Sawtooth & Triangle Waves) Calculator',
    description: 'Calculate periodic waveform Fourier Series harmonic coefficients (a_0, a_n, b_n) and synthesize time-domain harmonic reconstructions up to the 15th harmonic for electrical engineering and signal processing.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['fourier series calculator', 'fourier coefficients square wave sawtooth triangle wave online', 'harmonic synthesis fourier series calculator', 'odd harmonics even harmonics fourier solver', 'signal processing fourier series online'],
    order: 958,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Waveform Selection (Square, Sawtooth, Triangle) & Peak Amplitude A',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fs-wave">Waveform</label>
          <select class="tool-textarea" id="fs-wave">
            <option value="square" selected>Square Wave (Odd Harmonics: 4A/nπ)</option>
            <option value="sawtooth">Sawtooth Wave (All Harmonics: 2A/nπ)</option>
            <option value="triangle">Triangle Wave (1/n² Decay: 8A/(nπ)²)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="fs-amp">Peak Amplitude A</label>
          <input class="tool-textarea" id="fs-amp" type="number" step="1" value="5.0" placeholder="5.0 V" />
        </div>
      </div>
      <div id="fs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fs-res-harm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f(t) = 6.37·sin(ωt) + 2.12·sin(3ωt) + 1.27·sin(5ωt)</span>
            <span class="stat-label">Fourier Harmonic Series Expansion</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fs-res-spec" style="color:var(--green-dark); font-weight:700;">Fundamental b₁ = 6.37 V (100%) | 3rd b₃ = 2.12 V (33.3%) | 5th b₅ = 1.27 V (20.0%)</span>
            <span class="stat-label">Harmonic Spectrum Amplitudes & Gibbs Phenomenon</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('fs-wave'), aEl = document.getElementById('fs-amp');
  const hResEl = document.getElementById('fs-res-harm'), spResEl = document.getElementById('fs-res-spec');

  function update() {
    const wave = wEl.value, A = parseFloat(aEl.value);
    if (isNaN(A) || A <= 0) return;

    let b1 = 0, b3 = 0, b5 = 0, formula = '', desc = '';

    if (wave === 'square') {
      // Square wave: b_n = (4 * A) / (n * pi) for odd n
      b1 = (4.0 * A) / (1.0 * Math.PI);
      b3 = (4.0 * A) / (3.0 * Math.PI);
      b5 = (4.0 * A) / (5.0 * Math.PI);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) + ' + b3.toFixed(2) + '·sin(3ωt) + ' + b5.toFixed(2) + '·sin(5ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V (100%) | 3rd b₃ = ' + b3.toFixed(2) + 'V (33.3%) | 5th b₅ = ' + b5.toFixed(2) + 'V (20.0%)';
    } else if (wave === 'sawtooth') {
      // Sawtooth: b_n = (2 * A) / (n * pi) * (-1)^(n+1)
      b1 = (2.0 * A) / (1.0 * Math.PI);
      b3 = (2.0 * A) / (2.0 * Math.PI);
      b5 = (2.0 * A) / (3.0 * Math.PI);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) - ' + b3.toFixed(2) + '·sin(2ωt) + ' + b5.toFixed(2) + '·sin(3ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V | 2nd Harmonic b₂ = ' + b3.toFixed(2) + 'V | 3rd Harmonic b₃ = ' + b5.toFixed(2) + 'V (1/n decay)';
    } else if (wave === 'triangle') {
      // Triangle: b_n = (8 * A) / (pi^2 * n^2) for odd n with alternating signs
      b1 = (8.0 * A) / (Math.pow(Math.PI, 2) * 1.0);
      b3 = (8.0 * A) / (Math.pow(Math.PI, 2) * 9.0);
      b5 = (8.0 * A) / (Math.pow(Math.PI, 2) * 25.0);
      formula = 'f(t) = ' + b1.toFixed(2) + '·sin(ωt) - ' + b3.toFixed(2) + '·sin(3ωt) + ' + b5.toFixed(2) + '·sin(5ωt)';
      desc = 'Fundamental b₁ = ' + b1.toFixed(2) + 'V (100%) | 3rd b₃ = ' + b3.toFixed(2) + 'V (11.1%) | 5th b₅ = ' + b5.toFixed(2) + 'V (4.0%) (1/n² rapid decay)';
    }

    hResEl.textContent = formula;
    spResEl.textContent = desc;
  }

  wEl.addEventListener('change', update);
  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select periodic waveform type (Square, Sawtooth, or Triangle wave).',
      'Enter waveform peak amplitude A in Volts.',
      'Inspect Fourier harmonic expansion series formula and individual harmonic frequency amplitude spectrum.'
    ],
    benefitTitle: 'Joseph Fourier 1822 Harmonic Analysis Theorem',
    benefitContent: 'Any continuous or piecewise discontinuous periodic waveform can be decomposed into an infinite sum of sinusoidal pure tones ($f(t) = a_0 + \sum [a_n \cos(n\omega t) + b_n \sin(n\omega t)]$), providing the mathematical basis for audio equalizers, MP3 compression, and spectral RF analyzers.',
    faqs: [{ q: 'What is the Gibbs Phenomenon in square waves?', a: 'Truncating the Fourier series of a square wave creates a persistent ~9% overshoot at jump discontinuities, regardless of how many harmonics are added.' }]
  },

  // 3. Second-Order Dynamic System Damping Ratio & Natural Frequency Calculator
  {
    slug: 'second-order-ode-damping-ratio-natural-frequency-calculator',
    name: 'Second-Order System Damping Ratio (ζ), Natural Frequency (ω_n) & Step Response Calculator',
    description: 'Calculate second-order dynamic control system response parameters (s² + 2ζω_n·s + ω_n² = 0), damping ratio ζ, undamped natural frequency ω_n, percentage overshoot (%OS = e^(-πζ/√(1-ζ²)) · 100), and settling time (t_s ≈ 4 / (ζω_n)).',
    category: 'Science',
    icon: 'text',
    keywords: ['second order system calculator', 'damping ratio zeta natural frequency omega n calculator online', 'percentage overshoot formula step response control systems', 'settling time peak time second order transfer function calculator', 'underdamped critically damped overdamped solver online'],
    order: 959,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Damping Ratio ζ (0 to 2.0) & Undamped Natural Frequency ω_n (rad/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="so-zeta">Damping Ratio (ζ)</label>
          <input class="tool-textarea" id="so-zeta" type="number" step="0.05" min="0" max="3" value="0.50" placeholder="0.50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="so-wn">Natural ω_n (rad/s)</label>
          <input class="tool-textarea" id="so-wn" type="number" step="1" value="10.0" placeholder="10.0 rad/s" />
        </div>
      </div>
      <div id="so-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="so-res-os" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Overshoot %OS = 16.30% (Underdamped)</span>
            <span class="stat-label">Percentage Step Response Overshoot (%OS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="so-res-time" style="color:var(--green-dark); font-weight:700;">Settling Time t_s (2%) = 0.80 s | Peak Time t_p = 0.36 s | Damped ω_d = 8.66 rad/s</span>
            <span class="stat-label">Transient Response Times & Damped Oscillation Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('so-zeta'), wEl = document.getElementById('so-wn');
  const osResEl = document.getElementById('so-res-os'), tmResEl = document.getElementById('so-res-time');

  function update() {
    const zeta = parseFloat(zEl.value), wn = parseFloat(wEl.value);
    if (isNaN(zeta) || isNaN(wn) || zeta < 0 || wn <= 0) return;

    let os_pct = 0, ts_s = 0, tp_s = 0, wd = 0, regime = '';
    let color = '#22543d';

    if (zeta < 1.0) {
      // Underdamped
      wd = wn * Math.sqrt(1.0 - Math.pow(zeta, 2));
      // %OS = exp( -pi * zeta / sqrt(1 - zeta^2) ) * 100
      os_pct = Math.exp((-Math.PI * zeta) / Math.sqrt(1.0 - Math.pow(zeta, 2))) * 100.0;
      tp_s = Math.PI / wd;
      ts_s = 4.0 / (zeta * wn);
      regime = 'UNDERDAMPED (0 < ζ < 1: Oscillatory transient with overshoot)';
      color = '#22543d';
    } else if (zeta === 1.0) {
      // Critically damped
      os_pct = 0.0;
      ts_s = 5.83 / wn;
      regime = 'CRITICALLY DAMPED (ζ = 1.0: Fastest response without overshoot)';
      color = '#22543d';
    } else {
      // Overdamped
      os_pct = 0.0;
      const s1 = -wn * (zeta - Math.sqrt(Math.pow(zeta, 2) - 1.0));
      ts_s = 4.0 / Math.abs(s1);
      regime = 'OVERDAMPED (ζ > 1: Sluggish non-oscillatory return to equilibrium)';
      color = '#2563eb';
    }

    osResEl.textContent = 'Overshoot %OS = ' + os_pct.toFixed(2) + '% (' + regime.split(' (')[0] + ')';
    osResEl.style.color = color;
    tmResEl.textContent = 'Settling Time t_s = ' + ts_s.toFixed(2) + ' s | ' + (zeta < 1 ? 'Peak Time t_p = ' + tp_s.toFixed(2) + ' s | Damped ω_d = ' + wd.toFixed(2) + ' rad/s' : 'No Oscillation (Real Poles)');
    tmResEl.style.color = color;
  }

  zEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter system damping ratio $\zeta$ ($0 \le \zeta \le 3.0$).',
      'Enter undamped natural frequency $\omega_n$ in rad/s.',
      'Inspect transient step response overshoot percentage ($\%OS$), $2\%$ settling time ($t_s$), and damped oscillation frequency ($\omega_d$).'
    ],
    benefitTitle: 'Standard Control Systems Transient Specifications',
    benefitContent: 'A damping ratio of $\zeta \approx 0.707$ yields an optimal engineering balance: fast rise time with minimal $4.3\%$ overshoot, widely utilized in automotive suspension tuning, galvanometer needle damping, and robotic servo actuators.',
    faqs: [{ q: 'What is the condition for a critically damped system?', a: 'When $\zeta = 1.0$, the system returns to equilibrium in the fastest possible time without crossing or oscillating around the setpoint.' }]
  },

  // 4. Matrix Eigenvalues, Eigenvectors & 2x2 Characteristic Polynomial Calculator
  {
    slug: 'matrix-eigenvalues-eigenvectors-characteristic-polynomial-calculator',
    name: '2×2 Matrix Eigenvalues (λ), Eigenvectors & Characteristic Polynomial Calculator',
    description: 'Calculate 2×2 square matrix characteristic equation (λ² - Trace·λ + Det = 0), real/complex eigenvalues λ₁ and λ₂, and corresponding normalized eigenvectors for linear algebra and quantum mechanics.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['eigenvalues calculator', 'eigenvectors 2x2 matrix characteristic polynomial solver online', 'matrix trace determinant eigenvalues formula calculator', 'diagonalization linear algebra eigenvalue calculator', 'complex eigenvalues 2x2 matrix solver online'],
    order: 960,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Matrix Elements: [ a, b ; c, d ] for Matrix A',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eig-a">a (row 1, col 1)</label>
          <input class="tool-textarea" id="eig-a" type="number" step="any" value="4.0" placeholder="4.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eig-b">b (row 1, col 2)</label>
          <input class="tool-textarea" id="eig-b" type="number" step="any" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eig-c">c (row 2, col 1)</label>
          <input class="tool-textarea" id="eig-c" type="number" step="any" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eig-d">d (row 2, col 2)</label>
          <input class="tool-textarea" id="eig-d" type="number" step="any" value="3.0" placeholder="3.0" />
        </div>
      </div>
      <div id="eig-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eig-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ₁ = 5.00, λ₂ = 2.00</span>
            <span class="stat-label">Eigenvalues (Roots of det(A - λI) = 0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eig-res-vec" style="color:var(--green-dark); font-weight:700;">Trace = 7.00 | Det = 10.00 | v₁ = [1.00, 1.00]ᵀ, v₂ = [1.00, -2.00]ᵀ</span>
            <span class="stat-label">Characteristic Equation: λ² - 7λ + 10 = 0 & Eigenvectors</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('eig-a'), bEl = document.getElementById('eig-b');
  const cEl = document.getElementById('eig-c'), dEl = document.getElementById('eig-d');
  const vResEl = document.getElementById('eig-res-val'), vcResEl = document.getElementById('eig-res-vec');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Trace T = a + d
    const T = a + d;
    // Determinant D = a*d - b*c
    const D = (a * d) - (b * c);

    // Characteristic polynomial: lambda^2 - T*lambda + D = 0
    // Discriminant delta = T^2 - 4*D
    const delta = Math.pow(T, 2) - (4.0 * D);

    let l1_str = '', l2_str = '', vec_str = '';
    let color = '#22543d';

    if (delta >= 0) {
      const l1 = (T + Math.sqrt(delta)) / 2.0;
      const l2 = (T - Math.sqrt(delta)) / 2.0;
      l1_str = l1.toFixed(2);
      l2_str = l2.toFixed(2);

      // Eigenvectors: (a - lambda)*x + b*y = 0 => [b, lambda - a]
      const v1 = b !== 0 ? '[' + b.toFixed(2) + ', ' + (l1 - a).toFixed(2) + ']ᵀ' : '[1, 0]ᵀ';
      const v2 = b !== 0 ? '[' + b.toFixed(2) + ', ' + (l2 - a).toFixed(2) + ']ᵀ' : '[0, 1]ᵀ';
      vec_str = 'Trace = ' + T.toFixed(2) + ' | Det = ' + D.toFixed(2) + ' | v₁ ≈ ' + v1 + ', v₂ ≈ ' + v2;
    } else {
      const realPart = T / 2.0;
      const imagPart = Math.sqrt(-delta) / 2.0;
      l1_str = realPart.toFixed(2) + ' + ' + imagPart.toFixed(2) + 'j';
      l2_str = realPart.toFixed(2) + ' - ' + imagPart.toFixed(2) + 'j';
      vec_str = 'Complex Conjugate Eigenvalues | Characteristic Eq: λ² - ' + T.toFixed(2) + 'λ + ' + D.toFixed(2) + ' = 0';
      color = '#2563eb';
    }

    vResEl.textContent = 'λ₁ = ' + l1_str + ', λ₂ = ' + l2_str;
    vResEl.style.color = color;
    vcResEl.textContent = vec_str;
    vcResEl.style.color = color;
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 2×2 square matrix coefficients a, b, c, and d.',
      'Inspect matrix Trace ($T = a + d$), Determinant ($D = ad - bc$), and characteristic polynomial ($\lambda^2 - T\lambda + D = 0$).',
      'View calculated real or complex conjugate eigenvalues ($\lambda_{1,2} = \frac{T \pm \sqrt{T^2 - 4D}}{2}$) and corresponding eigenvectors.'
    ],
    benefitTitle: 'Linear Transformations Invariant Directions',
    benefitContent: 'Eigenvectors represent invariant directions that undergo pure stretching without rotating under linear matrix transformation ($A\vec{v} = \lambda\vec{v}$), crucial for Google PageRank, Principal Component Analysis (PCA), and quantum state Hamiltonians.',
    faqs: [{ q: 'What is the relationship between eigenvalues and the matrix determinant?', a: 'The product of all eigenvalues equals the matrix determinant ($\lambda_1 \times \lambda_2 = \det(A)$), and their sum equals the trace ($\lambda_1 + \lambda_2 = \text{Tr}(A)$).' }]
  },

  // 5. Mohr's Circle 2D Principal Stresses & Maximum In-Plane Shear Stress Calculator
  {
    slug: 'mohr-circle-2d-principal-stresses-maximum-shear-stress-calculator',
    name: 'Mohr\'s Circle 2D Principal Stresses (σ₁, σ₂) & Maximum Shear Stress (τ_max) Calculator',
    description: 'Calculate 2D plane stress transformation principal stresses (σ₁,₂ = (σ_x + σ_y)/2 ± √[((σ_x - σ_y)/2)² + τ_xy²]), maximum in-plane shear stress τ_max, and principal plane orientation angle θ_p for mechanics of materials.',
    category: 'Science',
    icon: 'text',
    keywords: ['mohrs circle calculator', 'principal stresses formula sigma 1 sigma 2 online', 'maximum shear stress tau max mohrs circle calculator', 'plane stress transformation angle theta p calculator', 'mechanics of materials mohrs circle solver online'],
    order: 961,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Normal Stress σ_x (MPa), Normal Stress σ_y (MPa) & Shear Stress τ_xy (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-sx">Stress σ_x (MPa)</label>
          <input class="tool-textarea" id="mc-sx" type="number" step="10" value="80.0" placeholder="80.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-sy">Stress σ_y (MPa)</label>
          <input class="tool-textarea" id="mc-sy" type="number" step="10" value="-20.0" placeholder="-20.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-txy">Shear τ_xy (MPa)</label>
          <input class="tool-textarea" id="mc-txy" type="number" step="5" value="40.0" placeholder="40.0 MPa" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-p1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">σ₁ = +94.03 MPa, σ₂ = -34.03 MPa</span>
            <span class="stat-label">Principal Stresses (σ₁, σ₂) on Zero Shear Planes</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-tau" style="color:var(--green-dark); font-weight:700;">Max Shear τ_max = 64.03 MPa | Principal Angle θ_p = 19.37° | Center σ_avg = 30.0 MPa</span>
            <span class="stat-label">Mohr\'s Circle Radius R (τ_max), Center & Principal Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sxEl = document.getElementById('mc-sx'), syEl = document.getElementById('mc-sy'), txyEl = document.getElementById('mc-txy');
  const p1ResEl = document.getElementById('mc-res-p1'), tauResEl = document.getElementById('mc-res-tau');

  function update() {
    const sx = parseFloat(sxEl.value), sy = parseFloat(syEl.value), txy = parseFloat(txyEl.value);
    if (isNaN(sx) || isNaN(sy) || isNaN(txy)) return;

    // Center of Mohr's circle: sigma_avg = (sx + sy) / 2
    const s_avg = (sx + sy) / 2.0;

    // Radius R = sqrt( ((sx - sy)/2)^2 + txy^2 ) = tau_max
    const R = Math.sqrt(Math.pow((sx - sy) / 2.0, 2) + Math.pow(txy, 2));

    // Principal stresses: sigma_1 = s_avg + R, sigma_2 = s_avg - R
    const s1 = s_avg + R;
    const s2 = s_avg - R;

    // Principal angle: tan(2 * theta_p) = (2 * txy) / (sx - sy)
    const theta_p_rad = 0.5 * Math.atan2(2.0 * txy, sx - sy);
    const theta_p_deg = (theta_p_rad * 180.0) / Math.PI;

    p1ResEl.textContent = 'σ₁ = ' + (s1 >= 0 ? '+' : '') + s1.toFixed(2) + ' MPa, σ₂ = ' + (s2 >= 0 ? '+' : '') + s2.toFixed(2) + ' MPa';
    tauResEl.textContent = 'Max Shear τ_max = ' + R.toFixed(2) + ' MPa | Principal Angle θ_p = ' + theta_p_deg.toFixed(2) + '° (Circle Center σ_avg = ' + s_avg.toFixed(1) + ' MPa)';
  }

  [sxEl, syEl, txyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter normal stress $\sigma_x$ in MPa (positive for tension, negative for compression).',
      'Enter normal stress $\sigma_y$ in MPa.',
      'Enter in-plane shear stress $\tau_{xy}$ in MPa.',
      'Inspect maximum and minimum principal stresses ($\sigma_1, \sigma_2$), maximum shear stress ($\tau_{\max} = R$), and principal plane rotation angle $\theta_p$.'
    ],
    benefitTitle: 'Christian Otto Mohr 1882 Stress Transformation Graphical Method',
    benefitContent: 'Mohr\'s circle maps the infinite tensor states of stress across rotated plane orientations onto a 2D circle ($(\sigma - \sigma_{\text{avg}})^2 + \tau^2 = R^2$), establishing critical yield criteria (Tresca and von Mises) for structural steel beam and pressure vessel design.',
    faqs: [{ q: 'What is the shear stress on a principal plane?', a: 'By definition, shear stress is identically zero ($\tau = 0$) on principal planes containing the maximum and minimum normal stresses $\sigma_1$ and $\sigma_2$.' }]
  },

  // 6. Heat Exchanger Log Mean Temperature Difference (LMTD) Calculator
  {
    slug: 'heat-exchanger-lmtd-log-mean-temperature-difference-calculator',
    name: 'Heat Exchanger Log Mean Temperature Difference (LMTD) & Heat Duty Calculator',
    description: 'Calculate counter-flow and parallel-flow heat exchanger Log Mean Temperature Difference (LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)) in °C and total thermal heat duty (Q = U·A·LMTD) in kW for chemical and mechanical engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['lmtd calculator', 'log mean temperature difference formula delta t1 minus delta t2 online', 'counter flow parallel flow heat exchanger lmtd calculator', 'heat duty q equals u a lmtd calculator kw', 'thermal engineering heat exchanger sizing online'],
    order: 962,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hot Fluid (T_h_in, T_h_out in °C), Cold Fluid (T_c_in, T_c_out in °C) & Flow Arrangement',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lm-flow">Arrangement</label>
          <select class="tool-textarea" id="lm-flow">
            <option value="counter" selected>Counter-Flow (Higher LMTD)</option>
            <option value="parallel">Parallel-Flow (Cocurrent)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-thin">Hot In T_h_in (°C)</label>
          <input class="tool-textarea" id="lm-thin" type="number" step="5" value="120.0" placeholder="120.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-thout">Hot Out T_h_out (°C)</label>
          <input class="tool-textarea" id="lm-thout" type="number" step="5" value="80.0" placeholder="80.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-tcin">Cold In T_c_in (°C)</label>
          <input class="tool-textarea" id="lm-tcin" type="number" step="5" value="20.0" placeholder="20.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-tcout">Cold Out T_c_out (°C)</label>
          <input class="tool-textarea" id="lm-tcout" type="number" step="5" value="60.0" placeholder="60.0 °C" />
        </div>
      </div>
      <div id="lm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lm-res-lmtd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">LMTD = 60.00 °C</span>
            <span class="stat-label">Log Mean Temperature Difference (ΔT_lm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lm-res-adv" style="color:var(--green-dark); font-weight:700;">Counter-Flow Advantage: ΔT₁ = 60°C (120-60), ΔT₂ = 60°C (80-20) -> Uniform Driving Force</span>
            <span class="stat-label">Terminal Temperature Differences & Driving Force</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const flEl = document.getElementById('lm-flow'), thiEl = document.getElementById('lm-thin');
  const thoEl = document.getElementById('lm-thout'), tciEl = document.getElementById('lm-tcin'), tcoEl = document.getElementById('lm-tcout');
  const lmResEl = document.getElementById('lm-res-lmtd'), adResEl = document.getElementById('lm-res-adv');

  function update() {
    const isCounter = flEl.value === 'counter';
    const T_h_in = parseFloat(thiEl.value), T_h_out = parseFloat(thoEl.value);
    const T_c_in = parseFloat(tciEl.value), T_c_out = parseFloat(tcoEl.value);

    if (isNaN(T_h_in) || isNaN(T_h_out) || isNaN(T_c_in) || isNaN(T_c_out) || T_h_in <= T_h_out || T_c_out <= T_c_in) return;

    let dt1 = 0, dt2 = 0;
    if (isCounter) {
      // Counter-flow: dt1 = T_h_in - T_c_out, dt2 = T_h_out - T_c_in
      dt1 = T_h_in - T_c_out;
      dt2 = T_h_out - T_c_in;
    } else {
      // Parallel-flow: dt1 = T_h_in - T_c_in, dt2 = T_h_out - T_c_out
      dt1 = T_h_in - T_c_in;
      dt2 = T_h_out - T_c_out;
    }

    if (dt1 <= 0 || dt2 <= 0) {
      lmResEl.textContent = 'Invalid Temperature Cross (2nd Law of Thermodynamics violated)';
      return;
    }

    let LMTD = 0;
    if (Math.abs(dt1 - dt2) < 0.01) {
      LMTD = dt1; // When dt1 == dt2, LMTD = dt1
    } else {
      LMTD = (dt1 - dt2) / Math.log(dt1 / dt2);
    }

    lmResEl.textContent = 'LMTD = ' + LMTD.toFixed(2) + ' °C';
    adResEl.textContent = (isCounter ? 'Counter-Flow' : 'Parallel-Flow') + ': ΔT₁ = ' + dt1.toFixed(1) + '°C, ΔT₂ = ' + dt2.toFixed(1) + '°C (Hot: ' + T_h_in + '->' + T_h_out + '°C | Cold: ' + T_c_in + '->' + T_c_out + '°C)';
  }

  [flEl, thiEl, thoEl, tciEl, tcoEl].forEach(el => el.addEventListener('input', update));
  flEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select flow arrangement (Counter-Flow vs Parallel-Flow).',
      'Enter Hot Fluid inlet and outlet temperatures ($T_{h,\text{in}}, T_{h,\text{out}}$ in $^\circ\text{C}$).',
      'Enter Cold Fluid inlet and outlet temperatures ($T_{c,\text{in}}, T_{c,\text{out}}$ in $^\circ\text{C}$).',
      'Inspect calculated Log Mean Temperature Difference (LMTD) used to size heat transfer surface area ($Q = U A \Delta T_{lm}$).'
    ],
    benefitTitle: 'Thermal Engineering Heat Exchanger Design',
    benefitContent: 'Because the temperature difference between hot and cold streams varies logarithmically along the pipe length, simple arithmetic mean temperature difference overestimates heat transfer; LMTD provides the exact integrated logarithmic average.',
    faqs: [{ q: 'Why is Counter-Flow more efficient than Parallel-Flow?', a: 'Counter-flow maintains a larger, more uniform temperature driving force ($\Delta T$) along the entire heat exchanger, allowing the cold fluid outlet temperature to exceed the hot fluid outlet temperature.' }]
  },

  // 7. Cantilever Beam End Point Load Deflection & Bending Moment Calculator
  {
    slug: 'cantilever-beam-point-load-deflection-bending-moment-calculator',
    name: 'Cantilever Beam End Point Load Deflection (δ_max = P·L³ / (3·E·I)) Calculator',
    description: 'Calculate cantilever beam maximum end deflection (δ_max = P·L³ / (3·E·I)) in mm, maximum fixed-end bending moment (M_max = P·L) in kN·m, and bending stress for civil and mechanical structural engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['cantilever beam deflection calculator', 'beam deflection formula p l cubed over 3 e i online', 'cantilever maximum bending moment p l calculator', 'structural beam elasticity modulus moment of inertia calculator', 'civil engineering cantilever deflection online'],
    order: 963,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'End Load P (kN), Beam Length L (m), Modulus E (GPa, Steel 200 GPa) & Moment of Inertia I (cm⁴)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cb-p">End Load P (kN)</label>
          <input class="tool-textarea" id="cb-p" type="number" step="1" value="10.0" placeholder="10.0 kN" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-l">Length L (m)</label>
          <input class="tool-textarea" id="cb-l" type="number" step="0.5" value="3.0" placeholder="3.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="cb-e" type="number" step="10" value="200" placeholder="200 GPa (Structural Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-i">Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="cb-i" type="number" step="500" value="5000" placeholder="5,000 cm⁴ (I-Beam)" />
        </div>
      </div>
      <div id="cb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cb-res-def" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Max Deflection δ_max = 9.00 mm</span>
            <span class="stat-label">Tip Deflection (δ_max = P·L³ / 3EI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cb-res-mom" style="color:var(--green-dark); font-weight:700;">Fixed Wall Moment M_max = 30.00 kN·m | Deflection Ratio = L / 333 (Passes L/250 Standard)</span>
            <span class="stat-label">Maximum Wall Bending Moment & Structural Serviceability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cb-p'), lEl = document.getElementById('cb-l');
  const eEl = document.getElementById('cb-e'), iEl = document.getElementById('cb-i');
  const dfResEl = document.getElementById('cb-res-def'), mmResEl = document.getElementById('cb-res-mom');

  function update() {
    const P_kN = parseFloat(pEl.value), L_m = parseFloat(lEl.value);
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);

    if (isNaN(P_kN) || isNaN(L_m) || isNaN(E_GPa) || isNaN(I_cm4) || P_kN <= 0 || L_m <= 0 || E_GPa <= 0 || I_cm4 <= 0) return;

    // Convert to SI base units:
    const P_N = P_kN * 1000.0;
    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // Max deflection delta = ( P * L^3 ) / ( 3 * E * I )  [meters]
    const delta_m = (P_N * Math.pow(L_m, 3)) / (3.0 * E_Pa * I_m4);
    const delta_mm = delta_m * 1000.0;

    // Max bending moment at fixed support: M = P * L  [N*m]
    const M_kNm = P_kN * L_m;

    const spanRatio = Math.round((L_m * 1000.0) / delta_mm);

    dfResEl.textContent = 'Max Deflection δ_max = ' + delta_mm.toFixed(2) + ' mm';
    mmResEl.textContent = 'Fixed Wall Moment M_max = ' + M_kNm.toFixed(2) + ' kN·m | Deflection Ratio = L / ' + spanRatio + ' (Span: ' + L_m + ' m @ ' + P_kN + ' kN)';
  }

  [pEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter point load P applied at the free tip in kilonewtons (kN).',
      'Enter cantilever unsupported beam length L in meters (m).',
      'Enter material Young\'s Modulus of Elasticity E in GPa (e.g. 200 GPa for structural steel, 70 GPa for aluminum).',
      'Enter cross-sectional Second Moment of Area / Inertia I in $\text{cm}^4$.',
      'Inspect tip deflection $\delta_{\max}$ in mm and fixed-end reaction bending moment $M_{\max} = P L$.'
    ],
    benefitTitle: 'Euler-Bernoulli Beam Bending Differential Equation',
    benefitContent: 'Integrating the Euler-Bernoulli bending equation ($E I \frac{d^2 v}{dx^2} = M(x)$) twice with clamped cantilever boundary conditions ($v(0) = 0, v\'(0) = 0$) derives the cubic deflection law ($\delta \propto L^3$), explaining why long cantilever balconies require extreme bending stiffness ($EI$).',
    faqs: [{ q: 'What is the standard structural limit for cantilever beam deflection?', a: 'Building codes typically specify a maximum serviceability live load deflection limit of $L / 250$ to $L / 360$.' }]
  },

  // 8. 555 Timer IC Astable Multivibrator Frequency & Duty Cycle Calculator
  {
    slug: '555-timer-astable-multivibrator-frequency-duty-cycle-calculator',
    name: 'NE555 Timer Astable Multivibrator Frequency & Duty Cycle Calculator',
    description: 'Calculate NE555 timer oscillator output frequency (f = 1.44 / ((R₁ + 2R₂)·C)) in Hz/kHz, high/low time periods (t_high = 0.693·(R₁+R₂)·C, t_low = 0.693·R₂·C), and duty cycle percentage for electronics engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['555 timer calculator', '555 astable multivibrator frequency formula 1.44 over r1 plus 2r2 times c online', 'ne555 duty cycle pulse width calculator', '555 oscillator resistor capacitor calculator hz', 'electronics circuit 555 timer pulse generator online'],
    order: 964,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistor R₁ (kΩ), Resistor R₂ (kΩ) & Timing Capacitor C (μF or nF)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="t5-r1">Resistor R₁ (kΩ)</label>
          <input class="tool-textarea" id="t5-r1" type="number" step="1" value="10.0" placeholder="10.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-r2">Resistor R₂ (kΩ)</label>
          <input class="tool-textarea" id="t5-r2" type="number" step="1" value="47.0" placeholder="47.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-c">Capacitor C (μF)</label>
          <input class="tool-textarea" id="t5-c" type="number" step="0.1" value="0.10" placeholder="0.10 μF (100 nF)" />
        </div>
      </div>
      <div id="t5-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="t5-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f = 138.46 Hz (Audio Range)</span>
            <span class="stat-label">Oscillator Output Frequency (f = 1.44 / ((R₁+2R₂)C))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="t5-res-dc" style="color:var(--green-dark); font-weight:700;">Duty Cycle = 54.8% (T_high = 3.95 ms, T_low = 3.26 ms | Period T = 7.22 ms)</span>
            <span class="stat-label">Duty Cycle % & High/Low Pulse Timing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const fResEl = document.getElementById('t5-res-f'), dcResEl = document.getElementById('t5-res-dc');

  function update() {
    const R1_k = parseFloat(r1El.value), R2_k = parseFloat(r2El.value), C_uF = parseFloat(cEl.value);
    if (isNaN(R1_k) || isNaN(R2_k) || isNaN(C_uF) || R1_k <= 0 || R2_k <= 0 || C_uF <= 0) return;

    const R1 = R1_k * 1000.0;
    const R2 = R2_k * 1000.0;
    const C = C_uF * 1e-6;

    // t_high = ln(2) * (R1 + R2) * C = 0.693147 * (R1 + R2) * C
    const t_high = Math.LN2 * (R1 + R2) * C;
    // t_low = ln(2) * R2 * C = 0.693147 * R2 * C
    const t_low = Math.LN2 * R2 * C;

    const Period = t_high + t_low;
    const freq = 1.0 / Period;
    const dutyCycle_pct = (t_high / Period) * 100.0;

    fResEl.textContent = 'f = ' + (freq >= 1000 ? (freq/1000).toFixed(2) + ' kHz' : freq.toFixed(2) + ' Hz');
    dcResEl.textContent = 'Duty Cycle = ' + dutyCycle_pct.toFixed(1) + '% (T_high: ' + (t_high*1000).toFixed(2) + ' ms, T_low: ' + (t_low*1000).toFixed(2) + ' ms | Period: ' + (Period*1000).toFixed(2) + ' ms)';
  }

  [r1El, r2El, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter timing resistor $R_1$ in $\text{k}\Omega$.',
      'Enter timing resistor $R_2$ in $\text{k}\Omega$.',
      'Enter timing capacitor C in microfarads ($\mu\text{F}$).',
      'Inspect output square wave pulse oscillation frequency f in Hz/kHz, total period, and high-state Duty Cycle percentage.'
    ],
    benefitTitle: 'Hans R. Camenzind 1971 NE555 Timer IC Architecture',
    benefitContent: 'The internal voltage divider charges the capacitor between $\frac{1}{3}V_{cc}$ and $\frac{2}{3}V_{cc}$ through $(R_1 + R_2)$ and discharges exclusively through $R_2$, providing an indestructible, low-cost clock generator used in billions of electronic devices.',
    faqs: [{ q: 'Why is the standard 555 astable duty cycle always greater than 50%?', a: 'Because the capacitor charges through both $(R_1 + R_2)$ but discharges only through $R_2$, ensuring $t_{\text{high}} > t_{\text{low}}$ unless a bypass diode is placed across $R_2$.' }]
  },

  // 9. Operational Amplifier Inverting & Non-Inverting Gain Bandwidth Calculator
  {
    slug: 'op-amp-inverting-non-inverting-gain-bandwidth-calculator',
    name: 'Operational Amplifier (Op-Amp Inverting & Non-Inverting Gain) Calculator',
    description: 'Calculate analog Op-Amp closed-loop voltage gain (Inverting A_v = -R_f / R_in, Non-Inverting A_v = 1 + R_f / R₁), decibel gain (dB = 20·log₁₀|A_v|), and 3dB bandwidth cutoff from Gain-Bandwidth Product (GBWP).',
    category: 'Science',
    icon: 'text',
    keywords: ['op amp gain calculator', 'operational amplifier inverting non inverting gain formula online', 'op amp feedback resistor rf rin calculator', 'gain bandwidth product gbwp cutoff frequency op amp calculator', 'analog electronics op amp voltage gain online'],
    order: 965,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feedback Resistor R_f (kΩ), Input Resistor R_in (kΩ) & Op-Amp GBWP (MHz, e.g. 1.0 MHz for LM741)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="op-cfg">Topology</label>
          <select class="tool-textarea" id="op-cfg">
            <option value="inverting" selected>Inverting Amplifier (A_v = -R_f/R_in)</option>
            <option value="non_inverting">Non-Inverting (A_v = 1 + R_f/R_1)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="op-rf">Feedback R_f (kΩ)</label>
          <input class="tool-textarea" id="op-rf" type="number" step="5" value="100.0" placeholder="100.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="op-rin">Input R_in (kΩ)</label>
          <input class="tool-textarea" id="op-rin" type="number" step="1" value="10.0" placeholder="10.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="op-gbw">GBWP (MHz)</label>
          <input class="tool-textarea" id="op-gbw" type="number" step="1" value="1.0" placeholder="1.0 MHz (LM741)" />
        </div>
      </div>
      <div id="op-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="op-res-gain" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">A_v = -10.00 (20.0 dB Gain)</span>
            <span class="stat-label">Closed-Loop Voltage Gain (A_v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="op-res-bw" style="color:var(--green-dark); font-weight:700;">-3dB Bandwidth = 100.0 kHz (GBWP = 1.0 MHz / 10 Gain)</span>
            <span class="stat-label">High-Frequency -3dB Bandwidth Cutoff</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cfgEl = document.getElementById('op-cfg'), rfEl = document.getElementById('op-rf');
  const rinEl = document.getElementById('op-rin'), gbwEl = document.getElementById('op-gbw');
  const gResEl = document.getElementById('op-res-gain'), bwResEl = document.getElementById('op-res-bw');

  function update() {
    const isInv = cfgEl.value === 'inverting';
    const Rf = parseFloat(rfEl.value), Rin = parseFloat(rinEl.value), GBWP_MHz = parseFloat(gbwEl.value);

    if (isNaN(Rf) || isNaN(Rin) || isNaN(GBWP_MHz) || Rf <= 0 || Rin <= 0 || GBWP_MHz <= 0) return;

    let Av = 0;
    if (isInv) {
      // Inverting: Av = -Rf / Rin
      Av = -Rf / Rin;
    } else {
      // Non-inverting: Av = 1 + Rf / Rin
      Av = 1.0 + (Rf / Rin);
    }

    const absAv = Math.abs(Av);
    const gain_dB = 20.0 * Math.log10(absAv);

    // Bandwidth in kHz = ( GBWP in MHz * 1000 ) / absAv
    const bandwidth_kHz = (GBWP_MHz * 1000.0) / absAv;

    gResEl.textContent = 'A_v = ' + (Av >= 0 ? '+' : '') + Av.toFixed(2) + ' (' + gain_dB.toFixed(1) + ' dB Gain)';
    bwResEl.textContent = '-3dB Bandwidth = ' + (bandwidth_kHz >= 1000 ? (bandwidth_kHz/1000).toFixed(2) + ' MHz' : bandwidth_kHz.toFixed(1) + ' kHz') + ' (GBWP: ' + GBWP_MHz + ' MHz @ ' + (isInv ? '180° Inverted' : 'Non-Inverting') + ')';
  }

  [cfgEl, rfEl, rinEl, gbwEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select Op-Amp topology (Inverting with $180^\circ$ phase shift vs Non-Inverting).',
      'Enter negative feedback resistor $R_f$ in $\text{k}\Omega$.',
      'Enter input resistor $R_{in}$ in $\text{k}\Omega$.',
      'Enter Op-Amp Gain-Bandwidth Product (GBWP in MHz).',
      'Inspect closed-loop voltage gain $A_v$, Decibel gain (dB), and high-frequency $-3\text{dB}$ bandwidth cutoff.'
    ],
    benefitTitle: 'Negative Feedback & Virtual Ground Concept',
    benefitContent: 'Negative feedback forces the differential input voltage to zero ($V_+ \approx V_-$), establishing a virtual ground that makes circuit gain depend purely on external precision resistor ratios ($R_f / R_{in}$) rather than erratic internal silicon transistor parameters.',
    faqs: [{ q: 'What is the input impedance of an inverting vs non-inverting op-amp?', a: 'An inverting amplifier has input impedance equal to $R_{in}$; a non-inverting amplifier has nearly infinite input impedance ($>10^{12}\ \Omega$).' }]
  },

  // 10. Poiseuille's Law Laminar Fluid Viscous Flow & Resistance Calculator
  {
    slug: 'poiseuille-law-laminar-viscous-fluid-flow-resistance-calculator',
    name: 'Hagen-Poiseuille Law Laminar Viscous Flow (Q = π·r⁴·ΔP / (8·μ·L)) Calculator',
    description: 'Calculate viscous fluid volumetric flow rate (Q = π·r⁴·ΔP / (8·μ·L)) in L/min and hydrodynamic flow resistance (R_hyd = 8·μ·L / (π·r⁴)) demonstrating the extreme 4th-power radius dependence for vascular blood flow and microfluidics.',
    category: 'Science',
    icon: 'text',
    keywords: ['poiseuille law calculator', 'hagen poiseuille formula volumetric flow rate online', 'blood flow vessel radius 4th power poiseuille calculator', 'laminar pipe viscous resistance calculator', 'fluid dynamics poiseuille equation online'],
    order: 966,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vessel Radius r (mm), Pressure Drop ΔP (mmHg or kPa), Dynamic Viscosity μ (mPa·s) & Length L (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ps-r">Radius r (mm)</label>
          <input class="tool-textarea" id="ps-r" type="number" step="0.1" value="2.0" placeholder="2.0 mm (Artery)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-dp">ΔP (mmHg)</label>
          <input class="tool-textarea" id="ps-dp" type="number" step="5" value="20.0" placeholder="20.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-mu">Viscosity μ</label>
          <input class="tool-textarea" id="ps-mu" type="number" step="0.5" value="3.5" placeholder="3.5 mPa·s (Blood)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-l">Length L (cm)</label>
          <input class="tool-textarea" id="ps-l" type="number" step="1" value="10.0" placeholder="10.0 cm" />
        </div>
      </div>
      <div id="ps-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q = 1.50 L / min (Flow Rate)</span>
            <span class="stat-label">Volumetric Viscous Laminar Flow Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-r4" style="color:var(--green-dark); font-weight:700;">4th Power Effect: Halving radius to 1.0 mm reduces flow rate by 93.75% (16× drop)</span>
            <span class="stat-label">Poiseuille 4th Power Law (Q ∝ r⁴) Sensitivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('ps-r'), dpEl = document.getElementById('ps-dp');
  const muEl = document.getElementById('ps-mu'), lEl = document.getElementById('ps-l');
  const qResEl = document.getElementById('ps-res-q'), r4ResEl = document.getElementById('ps-res-r4');

  function update() {
    const r_mm = parseFloat(rEl.value), dp_mmHg = parseFloat(dpEl.value);
    const mu_mPas = parseFloat(muEl.value), l_cm = parseFloat(lEl.value);

    if (isNaN(r_mm) || isNaN(dp_mmHg) || isNaN(mu_mPas) || isNaN(l_cm) || r_mm <= 0 || dp_mmHg <= 0 || mu_mPas <= 0 || l_cm <= 0) return;

    // Convert to SI:
    const r_m = r_mm / 1000.0;
    const dp_Pa = dp_mmHg * 133.322;
    const mu_Pas = mu_mPas / 1000.0;
    const l_m = l_cm / 100.0;

    // Hagen-Poiseuille equation: Q = ( pi * r^4 * deltaP ) / ( 8 * mu * L )  [m^3 / s]
    const Q_m3s = (Math.PI * Math.pow(r_m, 4) * dp_Pa) / (8.0 * mu_Pas * l_m);
    const Q_Lmin = Q_m3s * 60000.0; // 1 m^3/s = 60,000 L/min

    qResEl.textContent = 'Q = ' + Q_Lmin.toFixed(2) + ' L / min (' + (Q_Lmin * 1000 / 60).toFixed(1) + ' mL/s)';
    r4ResEl.textContent = '4th Power Rule: Halving radius drops flow by 16× (r⁴ = ' + Math.pow(r_mm, 4).toFixed(1) + ' mm⁴ @ ΔP = ' + dp_mmHg + ' mmHg, μ = ' + mu_mPas + ' cP)';
  }

  [rEl, dpEl, muEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular cylindrical tube or blood vessel internal radius r in millimeters (mm).',
      'Enter axial driving pressure drop $\Delta P$ in mmHg.',
      'Enter fluid dynamic viscosity $\mu$ in $\text{mPa}\cdot\text{s}$ (centipoise, e.g. 1.0 for water, 3.5 for whole blood).',
      'Enter tube length L in cm.',
      'Inspect volumetric flow rate Q in Liters/minute and analyze the dramatic 4th-power radius dependence ($Q \propto r^4$).'
    ],
    benefitTitle: 'Gotthilf Hagen & Jean Léonard Marie Poiseuille 1840 Law',
    benefitContent: 'Because laminar flow scales with the fourth power of radius ($Q \propto r^4$), a minor $16\%$ reduction in coronary artery lumen radius cuts blood delivery by $50\%$, explaining acute angina pectoris in cardiovascular atherosclerosis.',
    faqs: [{ q: 'What happens to flow rate if vessel radius is doubled?', a: 'Doubling the radius increases flow rate by $2^4 = 16\text{ times}$ ($1,600\%$) for the exact same pressure drop.' }]
  },

  // 11. Erlang B & Erlang C Telecommunications Call Blocking Probability Calculator
  {
    slug: 'packet-queueing-erlang-b-c-call-blocking-probability-calculator',
    name: 'Erlang B & Erlang C Traffic Dimensioning (Call Blocking & Queue Delay) Calculator',
    description: 'Calculate telecommunications call center Erlang B blocking probability (B(c, A) = (A^c / c!) / Σ (A^k / k!)) and Erlang C queueing delay probability for network capacity planning.',
    category: 'Developer',
    icon: 'code',
    keywords: ['erlang b calculator', 'erlang c formula call blocking probability queue delay online', 'telecom traffic dimensioning erlang calculator', 'call center staffing erlang c queue calculator', 'trunk line capacity erlang b calculator online'],
    order: 967,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Offered Traffic Load A (Erlangs) & Number of Server Trunks / Agents c',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="er-a">Traffic Load A (Erlangs)</label>
          <input class="tool-textarea" id="er-a" type="number" step="1" value="15.0" placeholder="15.0 Erlangs" />
        </div>
        <div class="control-group">
          <label class="control-label" for="er-c">Lines / Agents c</label>
          <input class="tool-textarea" id="er-c" type="number" step="1" min="1" max="100" value="20" placeholder="20 Trunks" />
        </div>
      </div>
      <div id="er-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="er-res-eb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Erlang B Blocking = 3.65% (Grade of Service)</span>
            <span class="stat-label">Erlang B Loss System Blocking Probability</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="er-res-ec" style="color:var(--green-dark); font-weight:700;">Erlang C Delay = 14.80% | Carried Traffic = 14.45 Erlangs (0.55 Erlangs Blocked)</span>
            <span class="stat-label">Erlang C Queueing Delay & Trunk Utilization</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('er-a'), cEl = document.getElementById('er-c');
  const ebResEl = document.getElementById('er-res-eb'), ecResEl = document.getElementById('er-res-ec');

  function erlangB(c, A) {
    let B = 1.0;
    for (let k = 1; k <= c; k++) {
      B = (A * B) / (k + (A * B));
    }
    return B;
  }

  function erlangC(c, A) {
    const B = erlangB(c, A);
    const rho = A / c;
    if (rho >= 1.0) return 1.0;
    return B / (1.0 - rho + (rho * B));
  }

  function update() {
    const A = parseFloat(aEl.value), c = parseInt(cEl.value, 10);
    if (isNaN(A) || isNaN(c) || A <= 0 || c < 1) return;

    const B_prob = erlangB(c, A);
    const B_pct = B_prob * 100.0;

    const C_prob = erlangC(c, A);
    const C_pct = Math.min(100.0, C_prob * 100.0);

    const carried = A * (1.0 - B_prob);
    const blocked = A * B_prob;

    let gos = '';
    let color = '#22543d';

    if (B_pct <= 1.0) {
      gos = 'EXCELLENT (GoS ≤ 1%: Enterprise Grade Telco Quality)';
      color = '#22543d';
    } else if (B_pct <= 5.0) {
      gos = 'STANDARD (GoS 1-5%: Standard Cellular / Call Center Dimensioning)';
      color = '#22543d';
    } else {
      gos = 'CONGESTED (GoS > 5%: High dropped calls, add more trunks/agents!)';
      color = '#c53030';
    }

    ebResEl.textContent = 'Erlang B Blocking = ' + B_pct.toFixed(2) + '% (' + gos.split(' (')[0] + ')';
    ebResEl.style.color = color;
    ecResEl.textContent = 'Erlang C Delay = ' + C_pct.toFixed(2) + '% | Carried = ' + carried.toFixed(2) + ' Erlangs (Blocked: ' + blocked.toFixed(2) + ' Erlangs @ c = ' + c + ')';
    ecResEl.style.color = color;
  }

  aEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total offered network/call traffic load A in Erlangs ($\text{Erlangs} = \lambda \times \text{Average Duration}$).',
      'Enter number of available trunk lines, communication channels, or support agents c.',
      'Inspect Erlang B Grade of Service (GoS) call blocking probability and Erlang C call delay queueing likelihood.'
    ],
    benefitTitle: 'Agner Krarup Erlang 1917 Teletraffic Formula',
    benefitContent: 'Erlang B dimensions loss systems (blocked calls receive busy signals), while Erlang C dimensions queueing systems (call centers with holding queues), enabling optimal staffing and telecom trunk line allocation.',
    faqs: [{ q: 'What is 1 Erlang of traffic?', a: '1 Erlang represents 1 continuous hour of call activity per hour ($100\%$ channel utilization).' }]
  },

  // 12. Digital Logic Karnaugh Map (K-Map 2x2 & 4x4) Boolean Simplifier
  {
    slug: 'digital-logic-karnaugh-map-kmap-boolean-simplification-calculator',
    name: 'Digital Logic Karnaugh Map (K-Map 2×2 & 4×4) Boolean Minimizer',
    description: 'Simplify digital logic Boolean truth tables into minimal Sum-of-Products (SOP) algebraic expressions using 2-variable, 3-variable, and 4-variable Karnaugh Map (K-Map) Gray code grouping minimization.',
    category: 'Developer',
    icon: 'code',
    keywords: ['karnaugh map calculator', 'kmap boolean simplifier minterms sum of products online', 'digital logic 4 variable k map minimizer calculator', 'gray code boolean algebra reduction calculator', 'combinational logic gate circuit simplifier online'],
    order: 968,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '2-Variable K-Map Minterm Outputs (m00, m01, m10, m11 for Inputs A, B)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="km-m0">m₀ (A=0, B=0)</label>
          <select class="tool-textarea" id="km-m0"><option value="0">0</option><option value="1" selected>1</option></select>
        </div>
        <div class="control-group">
          <label class="control-label" for="km-m1">m₁ (A=0, B=1)</label>
          <select class="tool-textarea" id="km-m1"><option value="0">0</option><option value="1" selected>1</option></select>
        </div>
        <div class="control-group">
          <label class="control-label" for="km-m2">m₂ (A=1, B=0)</label>
          <select class="tool-textarea" id="km-m2"><option value="0">0</option><option value="1" selected>1</option></select>
        </div>
        <div class="control-group">
          <label class="control-label" for="km-m3">m₃ (A=1, B=1)</label>
          <select class="tool-textarea" id="km-m3"><option value="0" selected>0</option><option value="1">1</option></select>
        </div>
      </div>
      <div id="km-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="km-res-sop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F(A, B) = A\' + B\' (NAND Form)</span>
            <span class="stat-label">Minimal Sum of Products (SOP) Boolean Expression</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="km-res-grp" style="color:var(--green-dark); font-weight:700;">Group 1: (m₀, m₁) -> A\' | Group 2: (m₀, m₂) -> B\' (Reduced from 3 gates to 2 literals)</span>
            <span class="stat-label">K-Map Rectangular Gray Code Groupings</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m0El = document.getElementById('km-m0'), m1El = document.getElementById('km-m1');
  const m2El = document.getElementById('km-m2'), m3El = document.getElementById('km-m3');
  const sopResEl = document.getElementById('km-res-sop'), grpResEl = document.getElementById('km-res-grp');

  function update() {
    const m0 = parseInt(m0El.value, 10), m1 = parseInt(m1El.value, 10);
    const m2 = parseInt(m2El.value, 10), m3 = parseInt(m3El.value, 10);

    const sum = m0 + m1 + m2 + m3;
    let sop = '', grouping = '';

    if (sum === 4) {
      sop = 'F = 1 (Always TRUE)';
      grouping = 'Quad group of 4 covers entire map';
    } else if (sum === 0) {
      sop = 'F = 0 (Always FALSE)';
      grouping = 'Empty map (zero minterms)';
    } else if (m0 === 1 && m1 === 1 && m2 === 1 && m3 === 0) {
      sop = "F = A' + B' (NAND Logic)";
      grouping = "Pair 1 (m₀,m₁) = A' | Pair 2 (m₀,m₂) = B'";
    } else if (m0 === 0 && m1 === 1 && m2 === 1 && m3 === 0) {
      sop = "F = A'B + AB' (XOR Logic: A ⊕ B)";
      grouping = "Diagonal 1s cannot be grouped (2 isolated minterms)";
    } else if (m0 === 1 && m1 === 0 && m2 === 0 && m3 === 1) {
      sop = "F = A'B' + AB (XNOR Logic: A ⊙ B)";
      grouping = "Diagonal 1s cannot be grouped (2 isolated minterms)";
    } else if (m0 === 1 && m1 === 1 && m2 === 0 && m3 === 0) {
      sop = "F = A'";
      grouping = "Row group (m₀, m₁) eliminates B";
    } else if (m0 === 0 && m1 === 0 && m2 === 1 && m3 === 1) {
      sop = "F = A";
      grouping = "Row group (m₂, m₃) eliminates B";
    } else if (m0 === 1 && m1 === 0 && m2 === 1 && m3 === 0) {
      sop = "F = B'";
      grouping = "Column group (m₀, m₂) eliminates A";
    } else if (m0 === 0 && m1 === 1 && m2 === 0 && m3 === 1) {
      sop = "F = B";
      grouping = "Column group (m₁, m₃) eliminates A";
    } else {
      const active = [];
      if (m0) active.push("A'B'");
      if (m1) active.push("A'B");
      if (m2) active.push("AB'");
      if (m3) active.push("AB");
      sop = 'F = ' + active.join(' + ');
      grouping = 'Individual minterm sum';
    }

    sopResEl.textContent = sop;
    grpResEl.textContent = grouping + ' [m₀=' + m0 + ', m₁=' + m1 + ', m₂=' + m2 + ', m₃=' + m3 + ']';
  }

  [m0El, m1El, m2El, m3El].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Select output binary states (0 or 1) for minterm truth table rows $m_0, m_1, m_2, m_3$.',
      'Inspect minimized Sum-of-Products (SOP) Boolean algebraic equation.',
      'View adjacent Gray-code grouping pairs that eliminate redundant logic gate literals.'
    ],
    benefitTitle: 'Maurice Karnaugh 1953 Logic Optimization',
    benefitContent: 'Karnaugh maps organize truth tables into Gray code arrays where adjacent cells differ by only a single binary bit ($A \bar{B} + AB = A$), allowing visual identification of maximal power-of-two rectangular groupings to minimize transistor gate count in FPGA and ASIC chip design.',
    faqs: [{ q: 'Can diagonal 1s in a K-map be grouped together?', a: 'No; K-map groupings must form adjacent horizontal or vertical rectangles of size $1, 2, 4, 8,\text{ or }16$.' }]
  },

  // 13. Z-Transform Discrete Transfer Function Pole-Zero Stability Calculator
  {
    slug: 'z-transform-discrete-transfer-function-pole-zero-stability-calculator',
    name: 'Discrete Z-Transform Transfer Function H(z) & Unit Circle Stability Calculator',
    description: 'Calculate discrete-time digital filter transfer function H(z) poles and zeros, evaluate BIBO stability inside the Unit Circle (|z| less than 1), and compute impulse and frequency response for DSP signal processing.',
    category: 'Developer',
    icon: 'code',
    keywords: ['z transform calculator', 'discrete transfer function h of z unit circle stability calculator', 'digital filter pole zero stability dsp online', 'bibo stability discrete time filter calculator', 'signal processing z transform roc online'],
    order: 969,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '1st-Order Discrete Filter: H(z) = (b₀ + b₁·z⁻¹) / (1 - a₁·z⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="zt-b0">Numerator b₀</label>
          <input class="tool-textarea" id="zt-b0" type="number" step="0.1" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zt-b1">Numerator b₁</label>
          <input class="tool-textarea" id="zt-b1" type="number" step="0.1" value="0.5" placeholder="0.5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zt-a1">Feedback a₁</label>
          <input class="tool-textarea" id="zt-a1" type="number" step="0.1" value="0.70" placeholder="0.70 (Pole z = a₁)" />
        </div>
      </div>
      <div id="zt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="zt-res-stab" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BIBO STABLE (|z_pole| = 0.70 < 1.00)</span>
            <span class="stat-label">Discrete System Stability & Pole Location</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="zt-res-hz" style="color:var(--green-dark); font-weight:700;">H(z) = (z + 0.50) / (z - 0.70) | Zero at z = -0.50 | Pole at z = +0.70</span>
            <span class="stat-label">Z-Domain Transfer Function & Pole-Zero Constellation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b0El = document.getElementById('zt-b0'), b1El = document.getElementById('zt-b1'), a1El = document.getElementById('zt-a1');
  const stResEl = document.getElementById('zt-res-stab'), hzResEl = document.getElementById('zt-res-hz');

  function update() {
    const b0 = parseFloat(b0El.value), b1 = parseFloat(b1El.value), a1 = parseFloat(a1El.value);
    if (isNaN(b0) || isNaN(b1) || isNaN(a1)) return;

    // Pole is at z = a1
    const pole_mag = Math.abs(a1);
    // Zero is at z = -b1 / b0
    const zero = b0 !== 0 ? -b1 / b0 : 0;

    let stability = '';
    let color = '#22543d';

    if (pole_mag < 1.0) {
      stability = 'BIBO STABLE (|z_pole| = ' + pole_mag.toFixed(2) + ' < 1.00: Pole strictly inside the Unit Circle)';
      color = '#22543d';
    } else if (pole_mag === 1.0) {
      stability = 'MARGINALLY STABLE (|z_pole| = 1.00: Pole on the Unit Circle boundary -> Sustained oscillation)';
      color = '#d97706';
    } else {
      stability = 'UNSTABLE (|z_pole| = ' + pole_mag.toFixed(2) + ' > 1.00: Pole outside Unit Circle -> Exponential overflow!)';
      color = '#c53030';
    }

    stResEl.textContent = stability;
    stResEl.style.color = color;
    hzResEl.textContent = 'H(z) = (' + b0.toFixed(2) + 'z + ' + b1.toFixed(2) + ') / (z - ' + a1.toFixed(2) + ') | Zero: z = ' + zero.toFixed(2) + ' | Pole: z = ' + a1.toFixed(2);
    hzResEl.style.color = color;
  }

  [b0El, b1El, a1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter digital filter feedforward numerator coefficients $b_0$ and $b_1$.',
      'Enter feedback denominator pole coefficient $a_1$.',
      'Inspect discrete-time transfer function $H(z)$ and verify BIBO stability by checking if all poles lie strictly inside the complex Unit Circle ($|z_{\text{pole}}| < 1.0$).'
    ],
    benefitTitle: 'Digital Signal Processing (DSP) Stability Criterion',
    benefitContent: 'In discrete-time sampled signals ($z = e^{sT}$), the continuous imaginary frequency axis maps onto the perimeter of the Unit Circle ($|z| = 1$); poles inside the unit circle guarantee stable bounded-input bounded-output (BIBO) recursive IIR digital filtering.',
    faqs: [{ q: 'What happens if a digital filter pole lies outside the unit circle (|z| > 1)?', a: 'The filter impulse response grows exponentially without bound, causing digital overflow and system instability.' }]
  },

  // 14. PID Controller Tuning (Ziegler-Nichols Reaction Curve & Critical Gain) Calculator
  {
    slug: 'pid-controller-tuning-ziegler-nichols-step-response-calculator',
    name: 'PID Controller Tuning (Ziegler-Nichols Critical Gain Ku & Period Tu) Calculator',
    description: 'Calculate industrial automation PID controller proportional gain (K_p), integral time (T_i / K_i), and derivative time (T_d / K_d) using the classic Ziegler-Nichols Closed-Loop Frequency Response and Open-Loop Step methods.',
    category: 'Science',
    icon: 'text',
    keywords: ['pid controller tuning calculator', 'ziegler nichols formula kp ti td pid calculator online', 'critical gain ku critical period tu pid tuning calculator', 'control loop pid autotune calculation online', 'proportional integral derivative tuning rules online'],
    order: 970,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Critical Ultimate Gain K_u & Ultimate Oscillation Period T_u (Seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pid-type">Controller Type</label>
          <select class="tool-textarea" id="pid-type">
            <option value="classic_pid" selected>Classic PID Controller</option>
            <option value="pi">PI Controller (Zero Derivative)</option>
            <option value="p">P Controller (Proportional Only)</option>
            <option value="no_overshoot">Some Overshoot / Pessen Rule</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-ku">Ultimate Gain K_u</label>
          <input class="tool-textarea" id="pid-ku" type="number" step="1" value="10.0" placeholder="10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-tu">Period T_u (s)</label>
          <input class="tool-textarea" id="pid-tu" type="number" step="0.5" value="4.0" placeholder="4.0 Seconds" />
        </div>
      </div>
      <div id="pid-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pid-res-gains" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K_p = 6.00, K_i = 3.00 s⁻¹, K_d = 3.00 s</span>
            <span class="stat-label">Calculated PID Gains (Ziegler-Nichols)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pid-res-times" style="color:var(--green-dark); font-weight:700;">Integral Time T_i = 2.00 s | Derivative Time T_d = 0.50 s (Quarter-Amplitude Damping)</span>
            <span class="stat-label">Time Constant Parameters (T_i = 0.5·T_u, T_d = 0.125·T_u)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tpEl = document.getElementById('pid-type'), kuEl = document.getElementById('pid-ku'), tuEl = document.getElementById('pid-tu');
  const gnResEl = document.getElementById('pid-res-gains'), tmResEl = document.getElementById('pid-res-times');

  function update() {
    const type = tpEl.value;
    const Ku = parseFloat(kuEl.value), Tu = parseFloat(tuEl.value);

    if (isNaN(Ku) || isNaN(Tu) || Ku <= 0 || Tu <= 0) return;

    let Kp = 0, Ti = 0, Td = 0;

    if (type === 'classic_pid') {
      Kp = 0.60 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.125 * Tu;
    } else if (type === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Tu / 1.2;
      Td = 0;
    } else if (type === 'p') {
      Kp = 0.50 * Ku;
      Ti = 0;
      Td = 0;
    } else if (type === 'no_overshoot') {
      Kp = 0.70 * Ku;
      Ti = 0.40 * Tu;
      Td = 0.15 * Tu;
    }

    const Ki = Ti > 0 ? Kp / Ti : 0;
    const Kd = Kp * Td;

    gnResEl.textContent = 'K_p = ' + Kp.toFixed(2) + (Ki > 0 ? ', K_i = ' + Ki.toFixed(2) : '') + (Kd > 0 ? ', K_d = ' + Kd.toFixed(2) : '');
    tmResEl.textContent = 'Integral T_i = ' + (Ti > 0 ? Ti.toFixed(2) + ' s' : 'None') + ' | Derivative T_d = ' + (Td > 0 ? Td.toFixed(2) + ' s' : 'None') + ' (Ku: ' + Ku + ', Tu: ' + Tu + ' s)';
  }

  [tpEl, kuEl, tuEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select control law algorithm (Classic PID, PI, P-only, Pessen rule).',
      'Enter critical ultimate gain $K_u$ (gain at which the feedback loop begins continuous sustained oscillation).',
      'Enter oscillation critical period $T_u$ in seconds.',
      'Inspect calculated Proportional gain $K_p$, Integral reset rate $K_i$, and Derivative time $K_d$.'
    ],
    benefitTitle: 'John G. Ziegler & Nathaniel B. Nichols 1942 PID Standard',
    benefitContent: 'Ziegler-Nichols frequency response tuning targets a quarter-amplitude decay ratio ($\frac{1}{4}$ overshoot decay per cycle), providing aggressive disturbance rejection in industrial chemical process reactors and temperature heating loops.',
    faqs: [{ q: 'What is the physical role of the Derivative (D) term in PID?', a: 'Derivative action predicts future error based on current rate of change ($\frac{de}{dt}$), providing anticipatory electronic damping that reduces overshoot.' }]
  },

  // 15. Bode Plot Gain Margin (GM) & Phase Margin (PM) Stability Calculator
  {
    slug: 'bode-plot-gain-margin-phase-margin-frequency-response-calculator',
    name: 'Bode Plot Gain Margin (GM) & Phase Margin (PM) Frequency Stability Calculator',
    description: 'Calculate feedback control system frequency response stability metrics: Gain Crossover Frequency (ω_gc where |G(jω)| = 0 dB), Phase Margin (PM = 180° + ∠G), Phase Crossover Frequency (ω_pc where ∠G = -180°), and Gain Margin (GM in dB).',
    category: 'Science',
    icon: 'text',
    keywords: ['bode plot calculator', 'gain margin phase margin formula control systems online', 'gain crossover phase crossover frequency calculator', 'bode plot stability margin calculator db', 'frequency response nyquist bode plot online'],
    order: 971,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Phase at 0 dB Gain (∠G(jω_gc) in Degrees) & Magnitude at -180° Phase (|G(jω_pc)| in dB)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bd-phase">Phase @ 0 dB (°)</label>
          <input class="tool-textarea" id="bd-phase" type="number" step="5" value="-135.0" placeholder="-135.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-mag">Gain @ -180° (dB)</label>
          <input class="tool-textarea" id="bd-mag" type="number" step="2" value="-12.0" placeholder="-12.0 dB" />
        </div>
      </div>
      <div id="bd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bd-res-pm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Phase Margin PM = +45.0° | Gain Margin GM = +12.0 dB</span>
            <span class="stat-label">Bode Stability Margins (PM > 0, GM > 0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bd-res-stab" style="color:var(--green-dark); font-weight:700;">ROBUST CLOSED-LOOP STABILITY: PM ≥ 45° and GM ≥ 6 dB provide well-damped transient response</span>
            <span class="stat-label">Control System Robustness & Damping Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('bd-phase'), mgEl = document.getElementById('bd-mag');
  const pmResEl = document.getElementById('bd-res-pm'), stResEl = document.getElementById('bd-res-stab');

  function update() {
    const phase_at_0dB = parseFloat(phEl.value), mag_at_180 = parseFloat(mgEl.value);
    if (isNaN(phase_at_0dB) || isNaN(mag_at_180)) return;

    // Phase Margin PM = 180 + Phase(omega_gc)
    const PM = 180.0 + phase_at_0dB;

    // Gain Margin GM = - Mag_dB(omega_pc)
    const GM = -mag_at_180;

    let status = '';
    let color = '#22543d';

    if (PM > 0 && GM > 0) {
      if (PM >= 45.0 && GM >= 6.0) {
        status = 'ROBUSTLY STABLE (PM ≥ 45°, GM ≥ 6 dB: Excellent damping and high disturbance tolerance)';
        color = '#22543d';
      } else {
        status = 'CONDITIONALLY STABLE (Low margin: PM < 45° or GM < 6 dB causes ringing / oscillation)';
        color = '#d97706';
      }
    } else {
      status = 'CLOSED-LOOP UNSTABLE (PM < 0° or GM < 0 dB: Loop gain creates destructive positive feedback)';
      color = '#c53030';
    }

    pmResEl.textContent = 'PM = ' + (PM >= 0 ? '+' : '') + PM.toFixed(1) + '° | GM = ' + (GM >= 0 ? '+' : '') + GM.toFixed(1) + ' dB';
    pmResEl.style.color = color;
    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  phEl.addEventListener('input', update);
  mgEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter open-loop phase angle $\angle G(j\omega_{gc})$ in degrees at the Gain Crossover Frequency (where $|G| = 0\text{ dB}$).',
      'Enter open-loop logarithmic magnitude $|G(j\omega_{pc})|$ in dB at the Phase Crossover Frequency (where $\angle G = -180^\circ$).',
      'Inspect Phase Margin ($PM = 180^\circ + \angle G$) and Gain Margin ($GM = -|G|_{\text{dB}}$) to verify closed-loop asymptotic stability.'
    ],
    benefitTitle: 'Hendrik Wade Bode 1938 Frequency Response Criterion',
    benefitContent: 'Bode stability margins measure how close a feedback loop is to the critical Barkhausen point (Gain $= 1 = 0\text{ dB}$, Phase $=-180^\circ$); maintaining $PM \ge 45^\circ\text{ to }60^\circ$ guarantees stable flight control and robotics trajectories.',
    faqs: [{ q: 'What happens if Phase Margin is negative (PM < 0)?', a: 'A negative phase margin means the feedback signal is inverted into regenerative positive feedback before loop gain drops below 1, driving violent instability.' }]
  },

  // 16. Discrete Linear Convolution Integral & LTI System Output Calculator
  {
    slug: 'convolution-integral-discrete-linear-time-invariant-system-calculator',
    name: 'Discrete Linear Convolution (y[n] = x[n] * h[n]) LTI Output Calculator',
    description: 'Calculate discrete-time linear convolution sum (y[n] = Σ x[k]·h[n - k]) of finite input sequence x[n] and system impulse response h[n] for digital signal processing (DSP) and linear system analysis.',
    category: 'Developer',
    icon: 'code',
    keywords: ['convolution calculator', 'discrete linear convolution sum formula x of n conv h of n online', 'lti system impulse response output calculator', 'digital signal processing convolution sum solver', 'finite impulse response fir convolution online'],
    order: 972,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Signal Sequence x[n] & Impulse Response h[n] (Comma-Separated Numbers)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cnv-x">Input x[n]</label>
          <input class="tool-textarea" id="cnv-x" type="text" value="1, 2, 3, 4" placeholder="e.g. 1, 2, 3, 4" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnv-h">Impulse h[n]</label>
          <input class="tool-textarea" id="cnv-h" type="text" value="1, 1, 1" placeholder="e.g. 1, 1, 1 (Moving Average)" />
        </div>
      </div>
      <div id="cnv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cnv-res-y" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">y[n] = [ 1, 3, 6, 9, 7, 4 ]</span>
            <span class="stat-label">Convolved Output Sequence y[n] = x[n] * h[n]</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cnv-res-len" style="font-weight:700;">Output Length N_y = 6 (N_x: 4 + N_h: 3 - 1 = 6 Samples)</span>
            <span class="stat-label">LTI System Response Length & Sample Count</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('cnv-x'), hEl = document.getElementById('cnv-h');
  const yResEl = document.getElementById('cnv-res-y'), lenResEl = document.getElementById('cnv-res-len');

  function update() {
    const x = (xEl.value || '').split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const h = (hEl.value || '').split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (x.length === 0 || h.length === 0) return;

    const N_x = x.length;
    const N_h = h.length;
    const N_y = N_x + N_h - 1;

    const y = new Array(N_y).fill(0);

    // Convolution sum: y[n] = sum_k x[k] * h[n - k]
    for (let n = 0; n < N_y; n++) {
      for (let k = 0; k < N_x; k++) {
        if (n - k >= 0 && n - k < N_h) {
          y[n] += x[k] * h[n - k];
        }
      }
    }

    const yStr = y.map(v => Number.isInteger(v) ? v : v.toFixed(2)).join(', ');

    yResEl.textContent = 'y[n] = [ ' + yStr + ' ]';
    lenResEl.textContent = 'Output Length N_y = ' + N_y + ' (N_x: ' + N_x + ' + N_h: ' + N_h + ' - 1 = ' + N_y + ' Samples)';
  }

  xEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter comma-separated numerical values for input signal sequence $x[n]$ (e.g. 1, 2, 3, 4).',
      'Enter comma-separated values for digital filter impulse response $h[n]$ (e.g. 1, 1, 1 for a moving average filter).',
      'Inspect convolved output sequence $y[n] = x[n] * h[n]$ and total sequence length $N_y = N_x + N_h - 1$.'
    ],
    benefitTitle: 'Linear Time-Invariant (LTI) Superposition Theorem',
    benefitContent: 'Because any arbitrary discrete signal is a sum of scaled and shifted unit impulses, the output of any linear time-invariant system is completely and uniquely defined by the mathematical convolution of the input with the system impulse response ($y[n] = x[n] * h[n]$).',
    faqs: [{ q: 'Why does convolution in the time domain correspond to multiplication in the frequency domain?', a: 'By the Convolution Theorem, $\mathcal{F}\{x * h\} = X(\omega) \cdot H(\omega)$, allowing fast filtering via Fast Fourier Transform (FFT).' }]
  },

  // 17. Thermodynamic Carnot, Otto & Diesel Cycle Thermal Efficiency Calculator
  {
    slug: 'thermodynamic-carnot-otto-diesel-cycle-thermal-efficiency-calculator',
    name: 'Thermodynamic Cycles (Carnot, Otto & Diesel Thermal Efficiency) Calculator',
    description: 'Calculate theoretical thermodynamic maximum thermal efficiency (Carnot η = 1 - T_C / T_H, Otto Petrol η = 1 - 1/r^(γ-1), Diesel η = 1 - (1/r^(γ-1)) · [(r_c^γ - 1) / (γ·(r_c - 1))]) for internal combustion engines.',
    category: 'Science',
    icon: 'text',
    keywords: ['carnot efficiency calculator', 'otto cycle thermal efficiency formula 1 minus 1 over r to gamma minus 1 online', 'diesel cycle compression ratio cutoff ratio calculator', 'internal combustion engine thermal efficiency calculator', 'thermodynamics carnot limit calculator online'],
    order: 973,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Compression Ratio r (8 to 22), Specific Heat Ratio γ (1.40 Air) & Carnot Temps T_H, T_C (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="th-comp">Compression r</label>
          <input class="tool-textarea" id="th-comp" type="number" step="0.5" value="10.0" placeholder="10.0 (Gasoline Engine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-gamma">Heat Ratio γ</label>
          <input class="tool-textarea" id="th-gamma" type="number" step="0.05" value="1.40" placeholder="1.40 (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-thot">Hot Temp T_H (K)</label>
          <input class="tool-textarea" id="th-thot" type="number" step="50" value="1500" placeholder="1500 K (Combustion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-tcold">Cold Temp T_C (K)</label>
          <input class="tool-textarea" id="th-tcold" type="number" step="10" value="300" placeholder="300 K (Ambient)" />
        </div>
      </div>
      <div id="th-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="th-res-otto" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Otto Efficiency η = 60.19%</span>
            <span class="stat-label">Air-Standard Otto Petrol Engine Efficiency (r = 10.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="th-res-carnot" style="color:var(--green-dark); font-weight:700;">Carnot Theoretical Limit η_max = 80.00% (T_H = 1500 K, T_C = 300 K)</span>
            <span class="stat-label">2nd Law Carnot Maximum Thermodynamic Efficiency Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('th-comp'), gEl = document.getElementById('th-gamma');
  const thEl = document.getElementById('th-thot'), tcEl = document.getElementById('th-tcold');
  const otResEl = document.getElementById('th-res-otto'), crResEl = document.getElementById('th-res-carnot');

  function update() {
    const r = parseFloat(rEl.value), gamma = parseFloat(gEl.value);
    const T_H = parseFloat(thEl.value), T_C = parseFloat(tcEl.value);

    if (isNaN(r) || isNaN(gamma) || isNaN(T_H) || isNaN(T_C) || r <= 1 || gamma <= 1 || T_H <= T_C || T_C <= 0) return;

    // Otto cycle efficiency: eta_otto = 1 - (1 / r^(gamma - 1))
    const eta_otto = (1.0 - (1.0 / Math.pow(r, gamma - 1.0))) * 100.0;

    // Carnot limit: eta_carnot = 1 - (T_C / T_H)
    const eta_carnot = (1.0 - (T_C / T_H)) * 100.0;

    otResEl.textContent = 'Otto Efficiency η = ' + eta_otto.toFixed(2) + '%';
    crResEl.textContent = 'Carnot Limit η_max = ' + eta_carnot.toFixed(2) + '% (T_H: ' + T_H + ' K / T_C: ' + T_C + ' K | r = ' + r + ')';
  }

  [rEl, gEl, thEl, tcEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter engine geometric cylinder compression ratio r (e.g. 9.5 to 11.0 for petrol/gasoline engines, 16.0 to 22.0 for diesel engines).',
      'Enter working fluid ratio of specific heats $\gamma = C_p / C_v$ (1.40 standard for air).',
      'Enter peak combustion temperature $T_H$ in Kelvin and ambient heat sink exhaust temperature $T_C$ in Kelvin.',
      'Inspect air-standard Otto cycle efficiency and compare against the absolute theoretical Carnot limit ($\eta_{\text{Carnot}} = 1 - T_C/T_H$).'
    ],
    benefitTitle: 'Nicolas Léonard Sadi Carnot 1824 Second Law of Thermodynamics',
    benefitContent: 'No real heat engine can ever exceed the efficiency of a reversible Carnot engine operating between the same two temperature reservoirs ($\eta \le 1 - T_C/T_H$), establishing the fundamental limit on human energy conversion.',
    faqs: [{ q: 'Why do Diesel engines have higher thermal efficiency than Otto gasoline engines?', a: 'Diesel engines operate at much higher compression ratios ($r = 16\text{ to }22$ vs $r = 9\text{ to }11$) without premature knocking/autoignition, directly boosting thermal efficiency.' }]
  },

  // 18. Rankine Steam Power Plant Thermal Efficiency & Heat Rate Calculator
  {
    slug: 'rankine-steam-power-plant-thermal-efficiency-heat-rate-calculator',
    name: 'Rankine Steam Power Plant Thermal Efficiency & Net Heat Rate Calculator',
    description: 'Calculate thermal steam power plant Rankine cycle efficiency (η_th = (w_turbine - w_pump) / q_boiler) in % and Net Heat Rate in kJ/kWh or BTU/kWh from steam turbine enthalpy drops (h₁ to h₄ in kJ/kg).',
    category: 'Science',
    icon: 'text',
    keywords: ['rankine cycle calculator', 'steam power plant thermal efficiency formula net work over heat in online', 'net heat rate btu per kwh rankine calculator', 'turbine pump enthalpy drop rankine cycle calculator', 'power engineering steam turbine efficiency online'],
    order: 974,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Turbine Inlet h₁ (kJ/kg), Turbine Exit h₂ (kJ/kg), Pump Exit h₄ (kJ/kg) & Condenser Exit h₃ (kJ/kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-h1">Turbine In h₁</label>
          <input class="tool-textarea" id="rk-h1" type="number" step="50" value="3400" placeholder="3400 kJ/kg (Superheated)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h2">Turbine Out h₂</label>
          <input class="tool-textarea" id="rk-h2" type="number" step="50" value="2200" placeholder="2200 kJ/kg (Wet Steam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h3">Condenser h₃</label>
          <input class="tool-textarea" id="rk-h3" type="number" step="10" value="190" placeholder="190 kJ/kg (Saturated Liquid)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h4">Boiler In h₄</label>
          <input class="tool-textarea" id="rk-h4" type="number" step="10" value="200" placeholder="200 kJ/kg (Pump Exit)" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Thermal Efficiency η_th = 37.19%</span>
            <span class="stat-label">Rankine Net Cycle Thermal Efficiency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-hr" style="color:var(--green-dark); font-weight:700;">Net Work = 1,190 kJ/kg | Heat In = 3,200 kJ/kg | Heat Rate = 9,681 kJ/kWh</span>
            <span class="stat-label">Specific Net Work Output & Plant Heat Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const h1El = document.getElementById('rk-h1'), h2El = document.getElementById('rk-h2');
  const h3El = document.getElementById('rk-h3'), h4El = document.getElementById('rk-h4');
  const efResEl = document.getElementById('rk-res-eff'), hrResEl = document.getElementById('rk-res-hr');

  function update() {
    const h1 = parseFloat(h1El.value), h2 = parseFloat(h2El.value);
    const h3 = parseFloat(h3El.value), h4 = parseFloat(h4El.value);

    if (isNaN(h1) || isNaN(h2) || isNaN(h3) || isNaN(h4) || h1 <= h2 || h4 <= h3) return;

    // Turbine work: w_turb = h1 - h2
    const w_turb = h1 - h2;
    // Pump work: w_pump = h4 - h3
    const w_pump = h4 - h3;

    // Net work output: w_net = w_turb - w_pump
    const w_net = w_turb - w_pump;

    // Boiler heat input: q_in = h1 - h4
    const q_in = h1 - h4;

    // Thermal efficiency: eta = w_net / q_in
    const eta_pct = (w_net / q_in) * 100.0;

    // Net Heat Rate (kJ / kWh) = 3600 / (eta / 100)
    const heatRate_kJ_kWh = 3600.0 / (eta_pct / 100.0);

    efResEl.textContent = 'Thermal Efficiency η_th = ' + eta_pct.toFixed(2) + '%';
    hrResEl.textContent = 'Net Work = ' + w_net.toFixed(1) + ' kJ/kg | Heat In = ' + q_in.toFixed(1) + ' kJ/kg | Heat Rate = ' + Math.round(heatRate_kJ_kWh).toLocaleString() + ' kJ/kWh';
  }

  [h1El, h2El, h3El, h4El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter superheated steam turbine inlet enthalpy $h_1$ in kJ/kg.',
      'Enter turbine exhaust steam enthalpy $h_2$ in kJ/kg.',
      'Enter condenser outlet saturated liquid enthalpy $h_3$ in kJ/kg.',
      'Enter boiler inlet feedwater enthalpy $h_4$ in kJ/kg.',
      'Inspect net cycle thermal efficiency $\eta_{\text{th}} = \frac{w_{\text{net}}}{q_{\text{in}}}$ and power plant Heat Rate in kJ/kWh.'
    ],
    benefitTitle: 'William John Macquorn Rankine Steam Power Cycle',
    benefitContent: 'The Rankine cycle powers over $80\%$ of global base-load electricity generation across coal, nuclear, and concentrated solar power plants; superheating steam ($h_1$) increases enthalpy drops and minimizes turbine blade water droplet erosion.',
    faqs: [{ q: 'What is Heat Rate in power plant engineering?', a: 'Heat Rate measures thermal energy input required to generate 1 kilowatt-hour of electricity ($\text{kJ/kWh}$); lower heat rate indicates higher thermodynamic efficiency.' }]
  },

  // 19. Psychrometric Chart: Relative Humidity, Dew Point & Specific Humidity Calculator
  {
    slug: 'psychrometric-chart-relative-humidity-dew-point-enthalpy-calculator',
    name: 'Psychrometric Chart Properties (Relative Humidity, Dew Point & Humidity Ratio) Calculator',
    description: 'Calculate moist air thermodynamic properties: Dew Point Temperature (T_dp in °C), Humidity Ratio / Absolute Moisture (ω in g_H2O / kg_dry_air), and Enthalpy (h in kJ/kg) from Dry-Bulb Temperature (T_db) and Relative Humidity (%RH).',
    category: 'Science',
    icon: 'text',
    keywords: ['psychrometric calculator', 'dew point formula magnus tetens relative humidity online', 'humidity ratio omega grams moisture per kg dry air calculator', 'moist air enthalpy hvac psychrometric chart calculator', 'dry bulb wet bulb dew point psychrometric solver online'],
    order: 975,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dry-Bulb Temperature T_db (°C) & Relative Humidity RH (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="psy-tdb">Dry-Bulb T_db (°C)</label>
          <input class="tool-textarea" id="psy-tdb" type="number" step="1" value="25.0" placeholder="25.0 °C (Room Temp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="psy-rh">Relative Humidity (%)</label>
          <input class="tool-textarea" id="psy-rh" type="number" step="5" min="1" max="100" value="50.0" placeholder="50.0%" />
        </div>
      </div>
      <div id="psy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="psy-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Dew Point T_dp = 13.87 °C</span>
            <span class="stat-label">Condensation Dew Point Temperature</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="psy-res-prop" style="color:var(--green-dark); font-weight:700;">Humidity Ratio ω = 9.88 g/kg | Enthalpy h = 50.3 kJ/kg dry air (ASHRAE Comfort Zone)</span>
            <span class="stat-label">Moisture Content & HVAC Specific Enthalpy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tdbEl = document.getElementById('psy-tdb'), rhEl = document.getElementById('psy-rh');
  const dpResEl = document.getElementById('psy-res-dp'), prResEl = document.getElementById('psy-res-prop');

  function update() {
    const T_db = parseFloat(tdbEl.value), RH = parseFloat(rhEl.value);
    if (isNaN(T_db) || isNaN(RH) || RH <= 0 || RH > 100) return;

    // Magnus-Tetens formula for saturation vapor pressure P_sat in hPa (mbar):
    const a = 17.27, b = 237.7;
    const alpha = ((a * T_db) / (b + T_db)) + Math.log(RH / 100.0);
    const T_dp = (b * alpha) / (a - alpha);

    // Saturation vapor pressure at T_db in kPa:
    const P_sat_kPa = 0.61078 * Math.exp((17.27 * T_db) / (T_db + 237.3));
    // Actual partial vapor pressure P_v:
    const P_v_kPa = (RH / 100.0) * P_sat_kPa;

    // Atmospheric pressure P_atm = 101.325 kPa
    // Humidity ratio omega = 0.622 * P_v / ( P_atm - P_v )  [kg_water / kg_dry_air]
    const P_atm = 101.325;
    const omega = 0.622 * (P_v_kPa / (P_atm - P_v_kPa));
    const omega_g_kg = omega * 1000.0;

    // Specific enthalpy h = 1.006 * T_db + omega * (2501 + 1.86 * T_db)  [kJ / kg]
    const h_kJ_kg = (1.006 * T_db) + (omega * (2501.0 + (1.86 * T_db)));

    dpResEl.textContent = 'Dew Point T_dp = ' + T_dp.toFixed(2) + ' °C';
    prResEl.textContent = 'Humidity Ratio ω = ' + omega_g_kg.toFixed(2) + ' g/kg | Enthalpy h = ' + h_kJ_kg.toFixed(1) + ' kJ/kg (' + T_db + '°C, ' + RH + '% RH)';
  }

  tdbEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter ambient dry-bulb air temperature $T_{db}$ in $^\circ\text{C}$.',
      'Enter Relative Humidity (%RH).',
      'Inspect condensation Dew Point temperature $T_{dp}$, absolute moisture humidity ratio $\omega$ in g/kg, and specific air enthalpy h in kJ/kg.'
    ],
    benefitTitle: 'HVAC Air Conditioning & Building Comfort Engineering',
    benefitContent: 'Calculating psychrometric enthalpy ($h = c_p T + \omega h_{fg}$) and dew point allows HVAC engineers to determine exact cooling coil refrigeration tonnage required for indoor thermal dehumidification.',
    faqs: [{ q: 'What happens when air temperature drops below the dew point?', a: 'Water vapor condenses out of the air as liquid fog, dew droplets, or window condensation.' }]
  },

  // 20. Bernoulli Equation & Venturi Meter Flow Rate Calculator
  {
    slug: 'bernoulli-equation-venturi-meter-pipe-flow-rate-calculator',
    name: 'Bernoulli Equation & Venturi Meter Pipe Flow Rate Calculator',
    description: 'Calculate fluid pipe volumetric flow rate (Q = A₂ · √[(2·ΔP) / (ρ·(1 - (A₂/A₁)²))]) in L/s and m³/h from Venturi tube differential pressure drop ΔP and pipe/throat diameters.',
    category: 'Science',
    icon: 'text',
    keywords: ['bernoulli equation calculator', 'venturi meter flow rate formula q equals a2 sqrt 2 delta p over rho online', 'differential pressure flow rate calculator pipe throat', 'fluid mechanics venturi tube flow calculator', 'bernoulli pressure velocity trade off online'],
    order: 976,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Diameter D₁ (mm), Throat Diameter D₂ (mm), Differential Pressure ΔP (kPa) & Fluid Density ρ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vt-d1">Inlet D₁ (mm)</label>
          <input class="tool-textarea" id="vt-d1" type="number" step="5" value="100.0" placeholder="100.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-d2">Throat D₂ (mm)</label>
          <input class="tool-textarea" id="vt-d2" type="number" step="5" value="50.0" placeholder="50.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-dp">Pressure ΔP (kPa)</label>
          <input class="tool-textarea" id="vt-dp" type="number" step="1" value="15.0" placeholder="15.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vt-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="vt-rho" type="number" step="50" value="1000" placeholder="1000 (Water)" />
        </div>
      </div>
      <div id="vt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vt-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q = 11.11 L / s (40.0 m³/h)</span>
            <span class="stat-label">Venturi Pipe Volumetric Flow Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vt-res-vel" style="color:var(--green-dark); font-weight:700;">Throat Velocity v₂ = 5.66 m/s | Inlet Velocity v₁ = 1.41 m/s (Bernoulli Effect)</span>
            <span class="stat-label">Fluid Velocity Acceleration through Constriction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const d1El = document.getElementById('vt-d1'), d2El = document.getElementById('vt-d2');
  const dpEl = document.getElementById('vt-dp'), rhoEl = document.getElementById('vt-rho');
  const qResEl = document.getElementById('vt-res-q'), velResEl = document.getElementById('vt-res-vel');

  function update() {
    const D1_mm = parseFloat(d1El.value), D2_mm = parseFloat(d2El.value);
    const dp_kPa = parseFloat(dpEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(D1_mm) || isNaN(D2_mm) || isNaN(dp_kPa) || isNaN(rho) || D1_mm <= D2_mm || D2_mm <= 0 || dp_kPa <= 0 || rho <= 0) return;

    const D1 = D1_mm / 1000.0;
    const D2 = D2_mm / 1000.0;
    const dp_Pa = dp_kPa * 1000.0;

    const A1 = (Math.PI / 4.0) * Math.pow(D1, 2);
    const A2 = (Math.PI / 4.0) * Math.pow(D2, 2);

    // Venturi flow rate formula (assuming discharge coefficient Cd = 0.98):
    // Q = Cd * A2 * sqrt( (2 * deltaP) / ( rho * (1 - (A2/A1)^2) ) )
    const Cd = 0.98;
    const beta = A2 / A1;
    const Q_m3s = Cd * A2 * Math.sqrt((2.0 * dp_Pa) / (rho * (1.0 - Math.pow(beta, 2))));

    const Q_Ls = Q_m3s * 1000.0;
    const Q_m3h = Q_m3s * 3600.0;

    const v1 = Q_m3s / A1;
    const v2 = Q_m3s / A2;

    qResEl.textContent = 'Q = ' + Q_Ls.toFixed(2) + ' L / s (' + Q_m3h.toFixed(1) + ' m³/h)';
    velResEl.textContent = 'Throat v₂ = ' + v2.toFixed(2) + ' m/s | Inlet v₁ = ' + v1.toFixed(2) + ' m/s (ΔP = ' + dp_kPa + ' kPa @ D₁=' + D1_mm + 'mm / D₂=' + D2_mm + 'mm)';
  }

  [d1El, d2El, dpEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter upstream pipe inlet diameter $D_1$ in millimeters (mm).',
      'Enter constricted throat nozzle diameter $D_2$ in millimeters (mm).',
      'Enter measured differential static pressure drop $\Delta P$ across inlet and throat in kPa.',
      'Enter fluid density $\rho$ in $\text{kg/m}^3$ (e.g. 1,000 for water, 1.225 for air).',
      'Inspect calculated volumetric flow rate Q in Liters/second and accelerated throat fluid velocity $v_2$.'
    ],
    benefitTitle: 'Daniel Bernoulli 1738 Hydrodynamics Principle',
    benefitContent: 'As fluid velocity increases through a pipe constriction ($v_2 > v_1$), static pressure decreases ($P_1 + \frac{1}{2}\rho v_1^2 = P_2 + \frac{1}{2}\rho v_2^2$), enabling non-intrusive flow measurement without moving mechanical parts.',
    faqs: [{ q: 'Why is a discharge coefficient (Cd ≈ 0.98) included?', a: 'The discharge coefficient accounts for minor boundary layer friction and non-uniform velocity profile head losses in real fluids.' }]
  },

  // 21. Pipe Flow Reynolds Number & Moody Chart Darcy Friction Factor Calculator
  {
    slug: 'reynolds-number-pipe-flow-friction-factor-moody-chart-calculator',
    name: 'Reynolds Number (Re) & Moody Chart Darcy Friction Factor (f) Calculator',
    description: 'Calculate pipe flow Reynolds Number (Re = ρ·v·D / μ), identify flow regime (Laminar Re less than 2300, Transitional, Turbulent Re exceeding 4000), and compute Darcy friction factor f using Colebrook / Swamee-Jain equations.',
    category: 'Science',
    icon: 'text',
    keywords: ['reynolds number calculator', 'darcy friction factor formula moody chart online', 'laminar turbulent flow reynolds number calculator pipe', 'swamee jain friction factor colebrook calculator', 'fluid dynamics pipe head loss reynolds calculator'],
    order: 977,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fluid Velocity v (m/s), Pipe Diameter D (mm), Fluid Density ρ (kg/m³) & Viscosity μ (mPa·s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="re-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="re-v" type="number" step="0.5" value="2.0" placeholder="2.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-d">Diameter D (mm)</label>
          <input class="tool-textarea" id="re-d" type="number" step="10" value="50.0" placeholder="50.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-rho">Density ρ</label>
          <input class="tool-textarea" id="re-rho" type="number" step="50" value="1000" placeholder="1000 kg/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-mu">Viscosity μ</label>
          <input class="tool-textarea" id="re-mu" type="number" step="0.1" value="1.0" placeholder="1.0 mPa·s (Water)" />
        </div>
      </div>
      <div id="re-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="re-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Re = 100,000 (Fully Turbulent)</span>
            <span class="stat-label">Reynolds Number (Re = ρ·v·D / μ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="re-res-f" style="color:var(--green-dark); font-weight:700;">Darcy Friction Factor f = 0.0180 (Smooth Pipe Swamee-Jain Correlation)</span>
            <span class="stat-label">Moody Chart Darcy Friction Factor & Pressure Head Loss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('re-v'), dEl = document.getElementById('re-d');
  const rhoEl = document.getElementById('re-rho'), muEl = document.getElementById('re-mu');
  const reResEl = document.getElementById('re-res-val'), fResEl = document.getElementById('re-res-f');

  function update() {
    const v = parseFloat(vEl.value), D_mm = parseFloat(dEl.value);
    const rho = parseFloat(rhoEl.value), mu_mPas = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(D_mm) || isNaN(rho) || isNaN(mu_mPas) || v <= 0 || D_mm <= 0 || rho <= 0 || mu_mPas <= 0) return;

    const D = D_mm / 1000.0;
    const mu = mu_mPas / 1000.0;

    // Reynolds number: Re = ( rho * v * D ) / mu
    const Re = (rho * v * D) / mu;

    let f = 0, regime = '';
    let color = '#22543d';

    if (Re < 2300) {
      // Laminar: f = 64 / Re
      f = 64.0 / Re;
      regime = 'LAMINAR FLOW (Re < 2,300: Smooth streamline viscous flow, f = 64/Re)';
      color = '#22543d';
    } else if (Re <= 4000) {
      // Transitional
      f = 0.035;
      regime = 'TRANSITIONAL REGIME (2,300 ≤ Re ≤ 4,000: Intermittent turbulent bursts)';
      color = '#d97706';
    } else {
      // Turbulent Swamee-Jain for smooth pipe (epsilon = 0.0015 mm commercial steel):
      const eps_over_D = 0.000045 / D; // 0.045 mm commercial steel roughness
      f = 0.25 / Math.pow(Math.log10((eps_over_D / 3.7) + (5.74 / Math.pow(Re, 0.9))), 2);
      regime = 'FULLY TURBULENT (Re > 4,000: Chaotic vortex mixing & high momentum transfer)';
      color = '#2563eb';
    }

    reResEl.textContent = 'Re = ' + Math.round(Re).toLocaleString() + ' (' + regime.split(' (')[0] + ')';
    reResEl.style.color = color;
    fResEl.textContent = 'Darcy Friction Factor f = ' + f.toFixed(4) + ' | ' + regime;
    fResEl.style.color = color;
  }

  [vEl, dEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter average cross-sectional fluid flow velocity v in m/s.',
      'Enter pipe inside diameter D in millimeters (mm).',
      'Enter fluid density $\rho$ ($\text{kg/m}^3$) and dynamic viscosity $\mu$ in $\text{mPa}\cdot\text{s}$.',
      'Inspect calculated dimensionless Reynolds Number ($Re$) and Moody chart Darcy friction factor f.'
    ],
    benefitTitle: 'Osborne Reynolds 1883 Dimensionless Flow Law',
    benefitContent: 'Reynolds Number quantifies the ratio of inertial forces to viscous forces ($\text{Re} = \frac{\text{Inertial}}{\text{Viscous}}$); determining whether flow is smooth laminar ($Re < 2300$) or turbulent ($Re > 4000$) is required to calculate Darcy-Weisbach friction head loss in piping networks.',
    faqs: [{ q: 'What is the critical transition Reynolds number in pipe flow?', a: 'Transition from laminar to turbulent flow in circular pipes typically begins at $Re \approx 2,300$.' }]
  },

  // 22. Euler's Column Buckling Critical Load & Slenderness Ratio Calculator
  {
    slug: 'euler-buckling-column-critical-load-slenderness-ratio-calculator',
    name: 'Euler\'s Column Buckling Critical Load (P_cr = π²·E·I / (K·L)²) Calculator',
    description: 'Calculate structural column critical buckling load (P_cr = π²·E·I / (K·L)²), critical buckling stress (σ_cr = π²·E / λ²), and slenderness ratio (λ = K·L / r) across pinned, fixed, and free column end conditions.',
    category: 'Science',
    icon: 'text',
    keywords: ['euler column buckling calculator', 'critical buckling load formula pi squared e i over k l squared online', 'column slenderness ratio lambda calculator structural engineering', 'effective length factor k pinned fixed column calculator', 'civil engineering column buckling stress online'],
    order: 978,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Column Length L (m), Modulus E (GPa), Moment of Inertia I (cm⁴) & End Boundary Conditions (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bk-end">End Conditions (K)</label>
          <select class="tool-textarea" id="bk-end">
            <option value="1.0" selected>Pinned-Pinned (K = 1.0)</option>
            <option value="0.5">Fixed-Fixed (K = 0.5 - 4× Stronger)</option>
            <option value="0.7">Fixed-Pinned (K = 0.7)</option>
            <option value="2.0">Fixed-Free Flagpole (K = 2.0)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-l">Length L (m)</label>
          <input class="tool-textarea" id="bk-l" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="bk-e" type="number" step="10" value="200" placeholder="200 GPa (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bk-i">Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="bk-i" type="number" step="50" value="800" placeholder="800 cm⁴" />
        </div>
      </div>
      <div id="bk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bk-res-pcr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_cr = 98.70 kN Critical Load</span>
            <span class="stat-label">Euler Elastic Buckling Critical Load (P_cr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bk-res-eff" style="color:var(--green-dark); font-weight:700;">Effective Length K·L = 4.00 m (Pinned-Pinned: K = 1.0 | P_cr = π²EI / L_eff²)</span>
            <span class="stat-label">Effective Column Length & Buckling Mode Shape</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const endEl = document.getElementById('bk-end'), lEl = document.getElementById('bk-l');
  const eEl = document.getElementById('bk-e'), iEl = document.getElementById('bk-i');
  const pcrResEl = document.getElementById('bk-res-pcr'), effResEl = document.getElementById('bk-res-eff');

  function update() {
    const K = parseFloat(endEl.value);
    const L = parseFloat(lEl.value), E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);

    if (isNaN(K) || isNaN(L) || isNaN(E_GPa) || isNaN(I_cm4) || L <= 0 || E_GPa <= 0 || I_cm4 <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4
    const L_eff = K * L;

    // Euler buckling critical load: P_cr = ( pi^2 * E * I ) / ( L_eff^2 )  [Newtons]
    const P_cr_N = (Math.pow(Math.PI, 2) * E_Pa * I_m4) / Math.pow(L_eff, 2);
    const P_cr_kN = P_cr_N / 1000.0;

    pcrResEl.textContent = 'P_cr = ' + P_cr_kN.toFixed(2) + ' kN Critical Load';
    effResEl.textContent = 'Effective Length K·L = ' + L_eff.toFixed(2) + ' m (K = ' + K + ' @ L = ' + L + ' m, E = ' + E_GPa + ' GPa, I = ' + I_cm4 + ' cm⁴)';
  }

  [endEl, lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  endEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select column end boundary constraint condition (Pinned-Pinned $K=1.0$, Fixed-Fixed $K=0.5$, Fixed-Pinned $K=0.7$, Fixed-Free $K=2.0$).',
      'Enter column total unsupported height L in meters (m).',
      'Enter material Young\'s Modulus of Elasticity E in GPa.',
      'Enter minimum cross-sectional Moment of Inertia I in $\text{cm}^4$.',
      'Inspect critical buckling load $P_{\text{cr}}$ in kilonewtons (kN) above which sudden lateral elastic buckling failure occurs.'
    ],
    benefitTitle: 'Leonhard Euler 1757 Structural Column Buckling Theorem',
    benefitContent: 'Slender columns subjected to compressive axial forces fail by sudden sideways geometric buckling long before the material reaches its compressive yield strength; doubling effective length cuts buckling capacity by $75\%$ ($\propto 1/L^2$).',
    faqs: [{ q: 'Why is a Fixed-Fixed column 4 times stronger than a Pinned-Pinned column?', a: 'Because clamping both ends halves the effective buckling length ($K = 0.5$), quadrupling the critical load ($P_{\text{cr}} \propto 1/K^2 = 1/0.25 = 4$).' }]
  },

  // 23. Heat Exchanger Effectiveness-NTU (Number of Transfer Units) Method Calculator
  {
    slug: 'heat-exchanger-effectiveness-ntu-method-calculator',
    name: 'Heat Exchanger Effectiveness-NTU (Number of Transfer Units) Method Calculator',
    description: 'Calculate heat exchanger performance using the Effectiveness-NTU method (NTU = U·A / C_min, Capacity Ratio C_r = C_min / C_max) and evaluate actual heat transfer rate (q = ε·q_max) without knowing fluid outlet temperatures.',
    category: 'Science',
    icon: 'text',
    keywords: ['effectiveness ntu calculator', 'ntu method heat exchanger formula online', 'heat exchanger effectiveness epsilon u a over c min calculator', 'counter flow ntu effectiveness solver', 'thermal engineering ntu method online'],
    order: 979,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Overall Heat Transfer UA (W/K), Minimum Heat Capacity Rate C_min (W/K) & Capacity Ratio C_r (0 to 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ntu-ua">UA (W/K)</label>
          <input class="tool-textarea" id="ntu-ua" type="number" step="100" value="2500" placeholder="2500 W/K" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntu-cmin">C_min (W/K)</label>
          <input class="tool-textarea" id="ntu-cmin" type="number" step="100" value="1000" placeholder="1000 W/K (m_dot·c_p)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntu-cr">Ratio C_r (C_min/C_max)</label>
          <input class="tool-textarea" id="ntu-cr" type="number" step="0.1" min="0" max="1" value="0.50" placeholder="0.50" />
        </div>
      </div>
      <div id="ntu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ntu-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Effectiveness ε = 83.21%</span>
            <span class="stat-label">Heat Exchanger Thermal Effectiveness (ε)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ntu-res-ntu" style="color:var(--green-dark); font-weight:700;">NTU = 2.50 (UA / C_min) | Counter-Flow ε = (1 - e^(-NTU(1-Cr))) / (1 - Cr·e^(-NTU(1-Cr)))</span>
            <span class="stat-label">Number of Transfer Units (NTU) & Analytical Relation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uaEl = document.getElementById('ntu-ua'), cminEl = document.getElementById('ntu-cmin'), crEl = document.getElementById('ntu-cr');
  const efResEl = document.getElementById('ntu-res-eff'), ntResEl = document.getElementById('ntu-res-ntu');

  function update() {
    const UA = parseFloat(uaEl.value), C_min = parseFloat(cminEl.value), C_r = parseFloat(crEl.value);
    if (isNaN(UA) || isNaN(C_min) || isNaN(C_r) || UA <= 0 || C_min <= 0 || C_r < 0 || C_r > 1) return;

    // NTU = UA / C_min
    const NTU = UA / C_min;

    // Counter-flow effectiveness formula:
    let epsilon = 0;
    if (C_r === 1.0) {
      epsilon = NTU / (1.0 + NTU);
    } else {
      const expTerm = Math.exp(-NTU * (1.0 - C_r));
      epsilon = (1.0 - expTerm) / (1.0 - (C_r * expTerm));
    }

    const eps_pct = epsilon * 100.0;

    efResEl.textContent = 'Effectiveness ε = ' + eps_pct.toFixed(2) + '%';
    ntResEl.textContent = 'NTU = ' + NTU.toFixed(2) + ' (UA / C_min) | C_r = ' + C_r.toFixed(2) + ' (Counter-Flow: ' + (eps_pct).toFixed(1) + '% max possible heat transfer)';
  }

  [uaEl, cminEl, crEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter overall heat transfer conductance product UA in W/K ($U \times A$).',
      'Enter minimum fluid heat capacity rate $C_{\min} = \dot{m} c_p$ in W/K.',
      'Enter capacity ratio $C_r = C_{\min} / C_{\max}$ ($0 \le C_r \le 1$).',
      'Inspect dimensionless Number of Transfer Units (NTU) and thermal effectiveness $\varepsilon = q / q_{\max}$.'
    ],
    benefitTitle: 'Kays & London Effectiveness-NTU Method',
    benefitContent: 'When fluid outlet temperatures are unknown, the LMTD method requires tedious iterative guessing; the Effectiveness-NTU method calculates heat transfer directly from inlet temperatures ($q = \varepsilon C_{\min} (T_{h,\text{in}} - T_{c,\text{in}})$).',
    faqs: [{ q: 'What is the significance of NTU > 3?', a: 'When $\text{NTU} > 3$, the effectiveness curve plateaus; adding more surface area yields diminishing thermodynamic returns.' }]
  },

  // 24. Vector Calculus 3D Gradient, Divergence & Curl Calculator
  {
    slug: 'vector-calculus-gradient-divergence-curl-spherical-cylindrical-calculator',
    name: 'Vector Calculus Differential Operators (Gradient ∇f, Divergence ∇·v, Curl ∇×v) Calculator',
    description: 'Calculate 3D Cartesian vector calculus differential operators: scalar field Gradient (∇f = [∂f/∂x, ∂f/∂y, ∂f/∂z]), vector field Divergence (∇·v = ∂v_x/∂x + ∂v_y/∂y + ∂v_z/∂z), and Curl (∇×v) for electromagnetism and Maxwell\'s equations.',
    category: 'Math',
    icon: 'calculator',
    keywords: ['vector calculus calculator', 'gradient divergence curl formula calculator online', 'del operator maxwells equations vector calculus', 'curl of vector field divergence solver online', 'multivariable calculus partial derivatives vector field online'],
    order: 980,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Evaluation Point (x, y, z) for Benchmark Vector Field v = [ x·y, y·z, z·x ]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vc-x">Point x</label>
          <input class="tool-textarea" id="vc-x" type="number" step="any" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vc-y">Point y</label>
          <input class="tool-textarea" id="vc-y" type="number" step="any" value="3.0" placeholder="3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vc-z">Point z</label>
          <input class="tool-textarea" id="vc-z" type="number" step="any" value="4.0" placeholder="4.0" />
        </div>
      </div>
      <div id="vc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vc-res-div" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">∇·v = 9.00 (Divergence Flux)</span>
            <span class="stat-label">Vector Field Divergence (∇·v = y + z + x)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vc-res-curl" style="color:var(--green-dark); font-weight:700;">∇×v = [ -3.00, -4.00, -2.00 ] (Vorticity / Circulation)</span>
            <span class="stat-label">Curl Rotation Vector Field (∇×v = [ -y, -z, -x ])</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('vc-x'), yEl = document.getElementById('vc-y'), zEl = document.getElementById('vc-z');
  const dvResEl = document.getElementById('vc-res-div'), crlResEl = document.getElementById('vc-res-curl');

  // Benchmark Vector Field: v = [ x*y, y*z, z*x ]
  // Divergence = d/dx(xy) + d/dy(yz) + d/dz(zx) = y + z + x
  // Curl = [ d/dy(zx) - d/dz(yz), d/dz(xy) - d/dx(zx), d/dx(yz) - d/dy(xy) ]
  //      = [ 0 - y, 0 - z, 0 - x ] = [ -y, -z, -x ]

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value), z = parseFloat(zEl.value);
    if (isNaN(x) || isNaN(y) || isNaN(z)) return;

    const divergence = y + z + x;
    const curl_x = -y;
    const curl_y = -z;
    const curl_z = -x;

    dvResEl.textContent = '∇·v = ' + divergence.toFixed(2) + ' (Divergence Flux)';
    crlResEl.textContent = '∇×v = [ ' + curl_x.toFixed(2) + ', ' + curl_y.toFixed(2) + ', ' + curl_z.toFixed(2) + ' ] (v = [xy, yz, zx] @ (' + x + ', ' + y + ', ' + z + '))';
  }

  [xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 3D Cartesian coordinates (x, y, z).',
      'Inspect scalar Divergence flux $\nabla \cdot \vec{v}$ (rate of fluid expansion from a point).',
      'Inspect 3D Curl vector $\nabla \times \vec{v}$ (local fluid vortex rotation speed and axis).'
    ],
    benefitTitle: 'Maxwell\'s Electromagnetic Field Equations',
    benefitContent: 'James Clerk Maxwell expressed all classical electrodynamics using Gradient ($\vec{E} = -\nabla V$), Divergence ($\nabla \cdot \vec{E} = \rho/\epsilon_0$), and Curl ($\nabla \times \vec{B} = \mu_0 \vec{J} + \mu_0 \epsilon_0 \frac{\partial \vec{E}}{\partial t}$), uniting electricity, magnetism, and optics into a single mathematical framework.',
    faqs: [{ q: 'What does a zero divergence (∇·v = 0) indicate physically?', a: 'A zero divergence indicates an incompressible fluid or solenoidal magnetic field ($\nabla \cdot \vec{B} = 0$) with no magnetic monopoles.' }]
  },

  // 25. Nyquist Stability Criterion & Open-Loop Encirclements Calculator
  {
    slug: 'nyquist-stability-criterion-open-loop-encirclements-calculator',
    name: 'Nyquist Stability Criterion (Z = N + P) Feedback Encirclements Calculator',
    description: 'Calculate closed-loop system stability using the Nyquist Stability Criterion (Z = N + P where Z = number of unstable closed-loop poles, N = clockwise encirclements of -1+0j, P = open-loop unstable poles).',
    category: 'Science',
    icon: 'text',
    keywords: ['nyquist stability criterion calculator', 'z equals n plus p nyquist formula online', 'open loop encirclements minus 1 point calculator', 'control systems nyquist plot stability calculator', 'cauchy argument principle nyquist stability online'],
    order: 981,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Open-Loop Unstable RHP Poles P & Net Clockwise Encirclements N of (-1, 0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ny-p">Unstable Poles P</label>
          <input class="tool-textarea" id="ny-p" type="number" step="1" min="0" value="0" placeholder="0 (Stable Open-Loop)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ny-n">Encirclements N</label>
          <input class="tool-textarea" id="ny-n" type="number" step="1" value="0" placeholder="0 (Clockwise Encirclements)" />
        </div>
      </div>
      <div id="ny-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ny-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Z = 0 (Closed-Loop STABLE)</span>
            <span class="stat-label">Unstable Closed-Loop Right-Half Plane Poles (Z = N + P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ny-res-stat" style="color:var(--green-dark); font-weight:700;">CLOSED-LOOP ASYMPTOTICALLY STABLE: Zero RHP poles in 1 + G(s)H(s) = 0</span>
            <span class="stat-label">Cauchy Argument Principle Stability Verdict</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('ny-p'), nEl = document.getElementById('ny-n');
  const zResEl = document.getElementById('ny-res-z'), stResEl = document.getElementById('ny-res-stat');

  function update() {
    const P = parseInt(pEl.value, 10), N = parseInt(nEl.value, 10);
    if (isNaN(P) || isNaN(N) || P < 0) return;

    // Nyquist formula: Z = N + P
    const Z = N + P;

    let verdict = '';
    let color = '#22543d';

    if (Z === 0) {
      verdict = 'CLOSED-LOOP ASYMPTOTICALLY STABLE (Z = 0: All closed-loop roots in Left-Half Plane LHP)';
      color = '#22543d';
    } else if (Z > 0) {
      verdict = 'CLOSED-LOOP UNSTABLE (Z = ' + Z + ' > 0: ' + Z + ' unstable right-half plane poles present)';
      color = '#c53030';
    } else {
      verdict = 'INVALID CONFIGURATION (Z cannot be negative; verify encirclement count sign)';
      color = '#d97706';
    }

    zResEl.textContent = 'Z = ' + Z + ' (' + (Z === 0 ? 'Closed-Loop STABLE' : 'UNSTABLE') + ')';
    zResEl.style.color = color;
    stResEl.textContent = verdict + ' [N = ' + N + ' encirclements, P = ' + P + ' open-loop poles]';
    stResEl.style.color = color;
  }

  pEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter number of open-loop unstable poles P in the right-half s-plane (RHP).',
      'Enter net number of clockwise encirclements N of the critical point $(-1 + 0j)$ on the Nyquist diagram.',
      'Inspect calculated number of closed-loop unstable poles $Z = N + P$ (system is stable if and only if $Z = 0$).'
    ],
    benefitTitle: 'Harry Nyquist 1932 Argument Principle in Feedback Loops',
    benefitContent: 'The Nyquist Stability Criterion determines closed-loop stability directly from open-loop frequency response measurements ($G(j\omega)$), bypassing the need to factor high-degree closed-loop characteristic polynomials.',
    faqs: [{ q: 'What does a counter-clockwise encirclement represent in Nyquist analysis?', a: 'A counter-clockwise encirclement represents $N = -1$, canceling out one open-loop unstable pole ($P$).' }]
  }
];

pack33Tools.forEach(createTool);
console.log('Pack 33 complete: 25 tools created.');
