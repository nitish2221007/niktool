const { createTool } = require('./generate-curated-tools.cjs');

// Pack 19: 25 Tools covering DSP & Filters, Robotics & Mechatronics, HVAC & Refrigeration, Antenna & Wireless, Astrophysics (Tools 731 to 755)
const pack19Tools = [
  // --- Suite GGGG: Digital Signal Processing (DSP) & Filters (731 - 735) ---
  // 1. FIR Filter Window Sinc Cutoff Calculator
  {
    slug: 'fir-filter-window-sinc-cutoff-calculator',
    name: 'FIR Digital Filter Window Sinc Order & Cutoff Calculator',
    description: 'Calculate digital Finite Impulse Response (FIR) filter tap order (N ≈ c / Δf_norm) and window coefficients (Hamming, Hanning, Blackman) for audio and signal filtering.',
    category: 'Science',
    icon: 'text',
    keywords: ['fir filter calculator', 'window sinc fir filter order formula', 'hamming hanning blackman fir filter taps online', 'digital signal processing fir cutoff calculator', 'dsp fir lowpass filter design online'],
    order: 610,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sampling Rate F_s (Hz), Cutoff F_c (Hz), Transition Width Δf (Hz) & Window Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fir-fs">Sampling F_s (Hz)</label>
          <input class="tool-textarea" id="fir-fs" type="number" step="any" value="48000" placeholder="48000 Hz Audio" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fir-fc">Cutoff F_c (Hz)</label>
          <input class="tool-textarea" id="fir-fc" type="number" step="any" value="4000" placeholder="4000 Hz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fir-df">Transition Δf (Hz)</label>
          <input class="tool-textarea" id="fir-df" type="number" step="any" value="1000" placeholder="1000 Hz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fir-win">Window Method</label>
          <select class="tool-textarea" id="fir-win">
            <option value="hamming" selected>Hamming (-53 dB Stopband, c=3.3)</option>
            <option value="hann">Hanning (-44 dB Stopband, c=3.1)</option>
            <option value="blackman">Blackman (-74 dB Stopband, c=5.5)</option>
            <option value="rect">Rectangular (-21 dB Stopband, c=0.9)</option>
          </select>
        </div>
      </div>
      <div id="fir-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fir-res-taps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">159 Taps (N = 159)</span>
            <span class="stat-label">Required FIR Filter Filter Length / Tap Count</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fir-res-delay" style="font-weight:700;">Group Delay: 1.65 ms (79 Samples) | Stopband Atten: -53 dB</span>
            <span class="stat-label">Linear Phase Group Delay & Stopband Attenuation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fsEl = document.getElementById('fir-fs'), fcEl = document.getElementById('fir-fc');
  const dfEl = document.getElementById('fir-df'), winEl = document.getElementById('fir-win');
  const tResEl = document.getElementById('fir-res-taps'), dResEl = document.getElementById('fir-res-delay');

  const WINDOWS = {
    'hamming':  { c: 3.3, atten: '-53 dB' },
    'hann':     { c: 3.1, atten: '-44 dB' },
    'blackman': { c: 5.5, atten: '-74 dB' },
    'rect':     { c: 0.9, atten: '-21 dB' }
  };

  function update() {
    const Fs = parseFloat(fsEl.value), Fc = parseFloat(fcEl.value), df = parseFloat(dfEl.value);
    const win = WINDOWS[winEl.value];

    if (isNaN(Fs) || isNaN(Fc) || isNaN(df) || Fs <= 0 || Fc <= 0 || df <= 0 || Fc >= Fs / 2) return;

    const df_norm = df / Fs;
    let N = Math.ceil(win.c / df_norm);
    if (N % 2 === 0) N += 1;

    const delaySamples = (N - 1) / 2;
    const delayMs = (delaySamples / Fs) * 1000;

    tResEl.textContent = N + ' Taps (Order ' + (N - 1) + ' FIR Filter)';
    dResEl.textContent = 'Group Delay: ' + delayMs.toFixed(2) + ' ms (' + delaySamples + ' Samples) | Stopband: ' + win.atten;
  }

  [fsEl, fcEl, dfEl].forEach(el => el.addEventListener('input', update));
  winEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter digital sampling rate F_s in Hz (e.g. 44,100 Hz CD audio or 48,000 Hz studio audio).',
      'Enter desired low-pass filter cutoff frequency F_c in Hz (must be below Nyquist F_s / 2).',
      'Enter transition roll-off width Δf in Hz between passband and stopband.',
      'Select window function (Hamming, Hanning, Blackman) to balance main-lobe transition sharpness against side-lobe leakage.',
      'Inspect required filter order N (taps) and exact constant linear-phase group delay.'
    ],
    benefitTitle: 'Linear Phase FIR Stability',
    benefitContent: 'FIR filters have no feedback poles, making them unconditionally stable with strictly linear phase response, ensuring zero audio phase distortion across all passband frequencies.',
    faqs: [{ q: 'Why choose Blackman over Hamming window?', a: 'Blackman windows provide -74 dB stopband attenuation (eliminating audible high-frequency hiss), but require ~66% more taps than Hamming for the same transition steepness.' }]
  },

  // 2. IIR Butterworth Filter Order & Pole Location Calculator
  {
    slug: 'iir-butterworth-filter-order-calculator',
    name: 'IIR Butterworth Analog & Digital Filter Order Calculator',
    description: 'Calculate maximally flat IIR Butterworth filter minimum order (N = log₁₀((10^(0.1·As) - 1)/(10^(0.1·Ap) - 1)) / (2·log₁₀(Ωs / Ωp))) and 3dB corner roll-off.',
    category: 'Science',
    icon: 'text',
    keywords: ['butterworth filter calculator', 'iir butterworth order formula online', 'filter order passband stopband attenuation calculator', 'maximally flat butterworth filter dsp online', 'analog filter order calculator'],
    order: 611,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Passband F_p (Hz), Stopband F_s (Hz), Passband Ripple A_p (dB) & Stopband Atten A_s (dB)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="but-fp">Passband F_p (Hz)</label>
          <input class="tool-textarea" id="but-fp" type="number" step="any" value="1000" placeholder="1000 Hz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="but-fs">Stopband F_s (Hz)</label>
          <input class="tool-textarea" id="but-fs" type="number" step="any" value="2000" placeholder="2000 Hz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="but-ap">Passband Loss A_p (dB)</label>
          <input class="tool-textarea" id="but-ap" type="number" step="0.1" value="1.0" placeholder="1.0 dB" />
        </div>
        <div class="control-group">
          <label class="control-label" for="but-as">Stopband Atten A_s (dB)</label>
          <input class="tool-textarea" id="but-as" type="number" step="1" value="40" placeholder="40 dB" />
        </div>
      </div>
      <div id="but-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="but-res-ord" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N = 8th Order</span>
            <span class="stat-label">Minimum Required Butterworth Filter Order (N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="but-res-roll" style="font-weight:700;">Roll-Off: -48 dB / Octave (-160 dB / Decade)</span>
            <span class="stat-label">Asymptotic Stopband Attenuation Slope</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fpEl = document.getElementById('but-fp'), fsEl = document.getElementById('but-fs');
  const apEl = document.getElementById('but-ap'), asEl = document.getElementById('but-as');
  const oResEl = document.getElementById('but-res-ord'), rResEl = document.getElementById('but-res-roll');

  function update() {
    const Fp = parseFloat(fpEl.value), Fs = parseFloat(fsEl.value);
    const Ap = parseFloat(apEl.value), As = parseFloat(asEl.value);

    if (isNaN(Fp) || isNaN(Fs) || isNaN(Ap) || isNaN(As) || Fp <= 0 || Fs <= Fp || Ap <= 0 || As <= Ap) return;

    const num = Math.log10((Math.pow(10, 0.1 * As) - 1) / (Math.pow(10, 0.1 * Ap) - 1));
    const den = 2 * Math.log10(Fs / Fp);
    const N_calc = num / den;
    const N = Math.ceil(N_calc);

    const rollOffOctave = N * 6;
    const rollOffDecade = N * 20;

    oResEl.textContent = 'N = ' + N + 'th Order (Poles: ' + N + ', Exact: ' + N_calc.toFixed(2) + ')';
    rResEl.textContent = 'Roll-Off: -' + rollOffOctave + ' dB / Octave (-' + rollOffDecade + ' dB / Decade, Maximally Flat Passband)';
  }

  [fpEl, fsEl, apEl, asEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter passband edge frequency F_p in Hz.',
      'Enter stopband edge frequency F_s in Hz (F_s > F_p).',
      'Enter maximum allowed passband ripple attenuation A_p in dB (e.g. 1.0 dB or 3.0 dB).',
      'Enter minimum required stopband attenuation A_s in dB (e.g. 40 dB to 60 dB).',
      'Inspect minimum integer filter order N and asymptotic high-frequency roll-off slope in dB/octave.'
    ],
    benefitTitle: 'Stephen Butterworth 1930 Maximally Flat Design',
    benefitContent: 'Butterworth filters provide zero passband ripple, ensuring smooth, monotonic frequency attenuation without Chebyshev ripple resonances.',
    faqs: [{ q: 'How does an 8th-order IIR compare to an FIR filter in CPU cost?', a: 'An 8th-order IIR filter achieves the same sharp stopband cutoff as a 150+ tap FIR filter using a fraction of CPU multiplications, though with non-linear phase distortion.' }]
  },

  // 3. FFT Radix-2 Butterfly Operations & Speedup Calculator
  {
    slug: 'fft-radix-2-butterfly-operations-calculator',
    name: 'Cooley-Tukey FFT Radix-2 Butterfly Operations & Speedup Calculator',
    description: 'Calculate Fast Fourier Transform (FFT) computational complexity (O(N·log₂N) vs O(N²)), total butterfly stages, complex multiplications, and CPU speedup.',
    category: 'Science',
    icon: 'text',
    keywords: ['fft radix 2 calculator', 'cooley tukey fft butterfly operations formula', 'dft vs fft complexity speedup calculator', 'n log2 n fft multiplications online', 'fast fourier transform computation calculator'],
    order: 612,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'FFT Sample Size N (Power of 2: 64 to 1,048,576)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="fft-n">FFT Transform Size (N)</label>
        <select class="tool-textarea" id="fft-n">
          <option value="64">N = 64 Samples</option>
          <option value="256">N = 256 Samples</option>
          <option value="1024" selected>N = 1,024 Samples (1K Audio FFT)</option>
          <option value="4096">N = 4,096 Samples (4K FFT)</option>
          <option value="16384">N = 16,384 Samples</option>
          <option value="65536">N = 65,536 Samples (64K Spectrum)</option>
          <option value="1048576">N = 1,048,576 Samples (1M Points)</option>
        </select>
      </div>
      <div id="fft-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fft-res-spd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">204.8× Speedup</span>
            <span class="stat-label">FFT vs Direct DFT Speedup Factor (N / log₂N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fft-res-ops" style="font-weight:700;">5,120 Mults (FFT) vs 1,048,576 Mults (DFT) | 10 Stages</span>
            <span class="stat-label">Complex Multiplication Operations Count & Butterfly Stages</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('fft-n');
  const sResEl = document.getElementById('fft-res-spd'), oResEl = document.getElementById('fft-res-ops');

  function update() {
    const N = parseInt(nEl.value, 10);
    if (isNaN(N) || N <= 0) return;

    const stages = Math.round(Math.log2(N));
    const dftOps = Math.pow(N, 2);
    const fftMults = (N / 2) * stages;
    const fftAdds = N * stages;
    const speedup = dftOps / fftMults;

    sResEl.textContent = speedup.toFixed(1) + '× Speedup (FFT O(N log N))';
    oResEl.textContent = fftMults.toLocaleString() + ' FFT Mults vs ' + dftOps.toLocaleString() + ' DFT Mults (' + stages + ' Butterfly Stages, ' + fftAdds.toLocaleString() + ' Additions)';
  }

  nEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select power-of-two FFT frame size N (e.g. 1024 points for real-time audio analyzers, 65,536 for SDR radio).',
      'Inspect Cooley-Tukey Radix-2 butterfly stages count (log₂N), total complex multiplications, and computational speedup over direct N² Discrete Fourier Transform.'
    ],
    benefitTitle: 'James Cooley & John Tukey 1965 Algorithm Revolution',
    benefitContent: 'The FFT reduces time complexity from O(N²) to O(N log₂N) by recursively decomposing an N-point transform into interleaved even and odd sub-transforms; for a 1-million-point dataset, FFT delivers an astonishing 100,000× speedup.',
    faqs: [{ q: 'Why does Radix-2 FFT require N to be a power of 2?', a: 'Because Radix-2 recursively halves the sequence length at each stage (N -> N/2 -> N/4 ... -> 1); non-powers of two use Bluestein or mixed-radix algorithms.' }]
  },

  // 4. Nyquist-Shannon Sampling Rate & Aliasing Frequency Calculator
  {
    slug: 'nyquist-shannon-sampling-aliasing-frequency-calculator',
    name: 'Nyquist-Shannon Sampling Rate & Aliasing Frequency Calculator',
    description: 'Calculate digital signal sampling Nyquist rate (F_nyquist = 2 · F_max) and exact foldback aliasing frequencies (|f_sig - k·F_s|) from undersampled signals.',
    category: 'Science',
    icon: 'text',
    keywords: ['nyquist shannon sampling calculator', 'aliasing frequency formula foldback online', 'nyquist rate 2 fmax calculator', 'digital audio adc aliasing calculator', 'dsp sampling theorem online'],
    order: 613,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Analog Input Signal Frequency F_sig (Hz) & Sampling Frequency F_s (Hz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nyq-fsig">Signal Frequency F_sig (Hz)</label>
          <input class="tool-textarea" id="nyq-fsig" type="number" step="any" value="28000" placeholder="28000 Hz (28 kHz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nyq-fs">Sampling Rate F_s (Hz)</label>
          <input class="tool-textarea" id="nyq-fs" type="number" step="any" value="44100" placeholder="44100 Hz (CD Audio)" />
        </div>
      </div>
      <div id="nyq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nyq-res-alias" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16,100 Hz Apparent Alias</span>
            <span class="stat-label">Reconstructed / Folded Aliased Frequency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nyq-res-stat" style="color:var(--green-dark); font-weight:700;">SEVERE ALIASING DETECTED (Signal > Nyquist Limit 22,050 Hz)</span>
            <span class="stat-label">Nyquist-Shannon Sampling Criteria Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sigEl = document.getElementById('nyq-fsig'), fsEl = document.getElementById('nyq-fs');
  const alResEl = document.getElementById('nyq-res-alias'), stResEl = document.getElementById('nyq-res-stat');

  function update() {
    const Fsig = parseFloat(sigEl.value), Fs = parseFloat(fsEl.value);
    if (isNaN(Fsig) || isNaN(Fs) || Fsig <= 0 || Fs <= 0) return;

    const Fnyq = Fs / 2;
    const rem = Fsig % Fs;
    let fAlias = rem;
    if (rem > Fnyq) {
      fAlias = Fs - rem;
    }

    alResEl.textContent = fAlias.toFixed(1) + ' Hz (Apparent Digital Output)';

    if (Fsig <= Fnyq) {
      stResEl.textContent = 'NO ALIASING: Perfect Reconstruction (Signal ≤ ' + Fnyq.toFixed(1) + ' Hz Nyquist Boundary)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'SEVERE ALIASING: Signal Exceeds Nyquist ' + Fnyq.toFixed(1) + ' Hz (Foldback Distortion |' + Fsig + ' - ' + Fs + '| = ' + fAlias.toFixed(1) + ' Hz)';
      stResEl.style.color = '#c53030';
    }
  }

  sigEl.addEventListener('input', update);
  fsEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter raw analog input signal frequency F_sig in Hz.',
      'Enter ADC digital converter sampling frequency F_s in Hz.',
      'Inspect reconstructed apparent frequency and detect whether input frequencies above Nyquist limit (F_s/2) fold back into the audible baseband spectrum.'
    ],
    benefitTitle: 'Harry Nyquist 1928 & Claude Shannon 1949 Sampling Theorem',
    benefitContent: 'To faithfully reconstruct any continuous band-limited analog signal without distortion, the sampling rate must strictly exceed twice the highest frequency component (F_s > 2·F_max); otherwise, ultrasonic frequencies reflect back into the audible spectrum as false ghost tones.',
    faqs: [{ q: 'How do anti-aliasing filters prevent this issue in ADCs?', a: 'An analog low-pass anti-aliasing filter removes all input frequencies above F_s / 2 before digitization occurs.' }]
  },

  // 5. Discrete Cosine Transform (DCT-II) Image Matrix Calculator
  {
    slug: 'discrete-cosine-transform-dct2-matrix-calculator',
    name: 'Discrete Cosine Transform (DCT-II) 8x8 Block Matrix Calculator',
    description: 'Calculate 2D Discrete Cosine Transform (DCT-II) spatial frequency energy compaction coefficients used in JPEG image compression and MP3/AAC audio coding.',
    category: 'Science',
    icon: 'text',
    keywords: ['discrete cosine transform calculator', 'dct ii jpeg compression matrix formula', 'dct energy compaction 8x8 block calculator', 'image compression transform dct online', 'dsp orthogonal basis dct2 calculator'],
    order: 614,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spatial Frequency Indices (u, v: 0 to 7) & Average Block Brightness (0 to 255)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dct-u">Horizontal Freq (u)</label>
          <input class="tool-textarea" id="dct-u" type="number" step="1" min="0" max="7" value="0" placeholder="0 (DC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dct-v">Vertical Freq (v)</label>
          <input class="tool-textarea" id="dct-v" type="number" step="1" min="0" max="7" value="0" placeholder="0 (DC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dct-pix">Mean Pixel Value</label>
          <input class="tool-textarea" id="dct-pix" type="number" step="any" value="128.0" placeholder="128.0 (Mid Gray)" />
        </div>
      </div>
      <div id="dct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dct-res-coeff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">DC Coeff = 1,024.0</span>
            <span class="stat-label">Calculated DCT-II Coefficient F(u, v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dct-res-type" style="font-weight:700;">DC Base Illuminance Component (u=0, v=0 | 8×8 Pixel Energy Peak)</span>
            <span class="stat-label">Spatial Frequency Classification & Energy Compaction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('dct-u'), vEl = document.getElementById('dct-v'), pixEl = document.getElementById('dct-pix');
  const cfResEl = document.getElementById('dct-res-coeff'), tyResEl = document.getElementById('dct-res-type');

  function update() {
    const u = parseInt(uEl.value, 10), v = parseInt(vEl.value, 10), meanPix = parseFloat(pixEl.value);
    if (isNaN(u) || isNaN(v) || isNaN(meanPix) || u < 0 || u > 7 || v < 0 || v > 7) return;

    const alphaU = u === 0 ? (1 / Math.SQRT2) : 1.0;
    const alphaV = v === 0 ? (1 / Math.SQRT2) : 1.0;

    let Fuv = 0;
    if (u === 0 && v === 0) {
      Fuv = 0.25 * alphaU * alphaV * 64 * meanPix;
    } else {
      Fuv = 0.0;
    }

    if (u === 0 && v === 0) {
      cfResEl.textContent = 'DC Coeff F(0,0) = ' + Fuv.toFixed(1);
      tyResEl.textContent = 'DC Baseline Illuminance (Carries > 90% of Total 8×8 Block Energy)';
    } else {
      cfResEl.textContent = 'AC Coeff F(' + u + ',' + v + ') = ' + Fuv.toFixed(1);
      tyResEl.textContent = 'AC Spatial Harmonic (Diagonal Frequency F_' + u + ',' + v + ' Quantized in JPEG)';
    }
  }

  [uEl, vEl, pixEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter horizontal spatial frequency index u (0 to 7).',
      'Enter vertical spatial frequency index v (0 to 7).',
      'Enter 8x8 image block average luminance pixel brightness (0 to 255).',
      'Inspect DCT-II transformed frequency coefficient F(u,v) and energy compaction distribution.'
    ],
    benefitTitle: 'Nasir Ahmed 1974 DCT-II Energy Compaction',
    benefitContent: 'The Discrete Cosine Transform packs almost all visual image energy into the single top-left DC coefficient and low-frequency AC harmonics, allowing JPEG compression to discard high-frequency coefficients without noticeable visual degradation.',
    faqs: [{ q: 'Why is DCT preferred over DFT for image compression?', a: 'DCT uses only real-valued cosine basis functions and creates symmetric boundary extensions, avoiding boundary blocking edge artifacts.' }]
  },

  // --- Suite HHHH: Robotics, Kinematics & Mechatronics (736 - 740) ---
  // 6. Denavit-Hartenberg (DH) Transformation Matrix Calculator
  {
    slug: 'denavit-hartenberg-transformation-matrix-calculator',
    name: 'Denavit-Hartenberg (DH) 4x4 Robot Kinematics Transformation Calculator',
    description: 'Calculate standard Denavit-Hartenberg (DH) 4x4 homogenous transformation matrix (T = Rot_z(θ) · Trans_z(d) · Trans_x(a) · Rot_x(α)) for robot arm forward kinematics.',
    category: 'Science',
    icon: 'text',
    keywords: ['denavit hartenberg calculator', 'dh parameters 4x4 transformation matrix online', 'robot forward kinematics dh matrix calculator', 'theta d a alpha denavit hartenberg formula', 'robotics arm kinematics matrix online'],
    order: 615,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'DH Parameters: Joint Angle θ (°), Link Offset d (mm), Link Length a (mm) & Twist α (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-th">Joint Angle θ (°)</label>
          <input class="tool-textarea" id="dh-th" type="number" step="5" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-d">Link Offset d (mm)</label>
          <input class="tool-textarea" id="dh-d" type="number" step="any" value="100.0" placeholder="100.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-a">Link Length a (mm)</label>
          <input class="tool-textarea" id="dh-a" type="number" step="any" value="250.0" placeholder="250.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-alpha">Link Twist α (°)</label>
          <input class="tool-textarea" id="dh-alpha" type="number" step="5" value="90.0" placeholder="90.0°" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-pos" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P = (176.8, 176.8, 100.0) mm</span>
            <span class="stat-label">End-Effector Spatial Position Vector [X, Y, Z]</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-rot" style="font-weight:700;">Rot Z: 45° | Rot X: 90° (Standard DH Matrix)</span>
            <span class="stat-label">Joint Orientation Rotation Properties</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('dh-th'), dEl = document.getElementById('dh-d');
  const aEl = document.getElementById('dh-a'), alEl = document.getElementById('dh-alpha');
  const pResEl = document.getElementById('dh-res-pos'), rResEl = document.getElementById('dh-res-rot');

  function update() {
    const thDeg = parseFloat(thEl.value), d = parseFloat(dEl.value);
    const a = parseFloat(aEl.value), alDeg = parseFloat(alEl.value);

    if (isNaN(thDeg) || isNaN(d) || isNaN(a) || isNaN(alDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const alRad = (alDeg * Math.PI) / 180;

    const px = a * Math.cos(thRad);
    const py = a * Math.sin(thRad);
    const pz = d;

    pResEl.textContent = 'P = (' + px.toFixed(1) + ', ' + py.toFixed(1) + ', ' + pz.toFixed(1) + ') mm';
    rResEl.textContent = 'DH: θ=' + thDeg + '°, d=' + d + 'mm, a=' + a + 'mm, α=' + alDeg + '° (4×4 Homogeneous Transform)';
  }

  [thEl, dEl, aEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter joint angle theta (rotation about z-axis) in degrees.',
      'Enter link offset distance d (translation along z-axis) in mm.',
      'Enter link length a (translation along x-axis) in mm.',
      'Enter link twist angle alpha (rotation about x-axis) in degrees.',
      'Inspect the computed 4x4 homogeneous transformation position coordinates (X, Y, Z).'
    ],
    benefitTitle: 'Jacques Denavit & Richard Hartenberg 1955 Convention',
    benefitContent: 'DH parameters provide a minimal 4-parameter standard convention to represent spatial relationships between consecutive joint axes on serial robotic manipulators.',
    faqs: [{ q: 'What is the difference between standard and modified DH parameters?', a: 'Standard DH places the coordinate frame at the joint output axis, whereas modified (Craig) DH places the origin at the joint input axis.' }]
  },

  // 7. PID Controller Tuning (Ziegler-Nichols Method) Calculator
  {
    slug: 'pid-controller-ziegler-nichols-tuning-calculator',
    name: 'PID Controller Tuning (Ziegler-Nichols Frequency Response) Calculator',
    description: 'Calculate optimal Proportional, Integral, and Derivative control gains (K_p, T_i, T_d, K_i, K_d) from Ultimate Gain K_u and Ultimate Oscillation Period T_u.',
    category: 'Science',
    icon: 'text',
    keywords: ['pid controller calculator', 'ziegler nichols tuning formula kp ki kd', 'ultimate gain ku period tu pid calculator', 'closed loop pid tuning calculator online', 'industrial control loop pid tuning online'],
    order: 616,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ultimate Gain K_u & Ultimate Oscillation Period T_u (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pid-ku">Ultimate Gain K_u</label>
          <input class="tool-textarea" id="pid-ku" type="number" step="any" value="10.0" placeholder="10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-tu">Period T_u (s)</label>
          <input class="tool-textarea" id="pid-tu" type="number" step="any" value="2.5" placeholder="2.5 s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-type">Controller Type</label>
          <select class="tool-textarea" id="pid-type">
            <option value="pid" selected>Classic PID (Kp=0.6·Ku, Ti=0.5·Tu, Td=0.125·Tu)</option>
            <option value="p">P Only (Kp=0.5·Ku)</option>
            <option value="pi">PI Controller (Kp=0.45·Ku, Ti=0.83·Tu)</option>
            <option value="some_overshoot">PID - Some Overshoot (Kp=0.33·Ku)</option>
            <option value="no_overshoot">PID - No Overshoot (Kp=0.2·Ku)</option>
          </select>
        </div>
      </div>
      <div id="pid-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pid-res-gains" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K_p = 6.00 | K_i = 4.80 | K_d = 1.88</span>
            <span class="stat-label">Calculated PID Gains (K_p, K_i = K_p/T_i, K_d = K_p·T_d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pid-res-times" style="font-weight:700;">T_i = 1.25 s (Integral Time) | T_d = 0.313 s (Derivative Time)</span>
            <span class="stat-label">Integral Reset Time (T_i) & Derivative Rate Time (T_d)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kuEl = document.getElementById('pid-ku'), tuEl = document.getElementById('pid-tu'), tpEl = document.getElementById('pid-type');
  const gResEl = document.getElementById('pid-res-gains'), tResEl = document.getElementById('pid-res-times');

  function update() {
    const Ku = parseFloat(kuEl.value), Tu = parseFloat(tuEl.value);
    const mode = tpEl.value;

    if (isNaN(Ku) || isNaN(Tu) || Ku <= 0 || Tu <= 0) return;

    let Kp = 0, Ti = Infinity, Td = 0;

    if (mode === 'p') {
      Kp = 0.50 * Ku;
    } else if (mode === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Tu / 1.2;
    } else if (mode === 'pid') {
      Kp = 0.60 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.125 * Tu;
    } else if (mode === 'some_overshoot') {
      Kp = 0.33 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.33 * Tu;
    } else if (mode === 'no_overshoot') {
      Kp = 0.20 * Ku;
      Ti = 0.50 * Tu;
      Td = 0.33 * Tu;
    }

    const Ki = Ti !== Infinity ? (Kp / Ti) : 0;
    const Kd = Kp * Td;

    gResEl.textContent = 'K_p = ' + Kp.toFixed(2) + ' | K_i = ' + Ki.toFixed(2) + ' | K_d = ' + Kd.toFixed(2);
    tResEl.textContent = 'T_i = ' + (Ti !== Infinity ? Ti.toFixed(3) + ' s' : 'None') + ' | T_d = ' + (Td > 0 ? Td.toFixed(3) + ' s' : 'None') + ' (Tuned for ' + tpEl.options[tpEl.selectedIndex].text.split('(')[0].trim() + ')';
  }

  [kuEl, tuEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Increase proportional gain K_p on the physical plant with K_i=0, K_d=0 until sustained un-damped oscillation begins.',
      'Record the Ultimate Gain K_u and oscillation period T_u in seconds.',
      'Select controller configuration (Classic PID, PI, or No-Overshoot).',
      'Inspect calculated industrial PID controller gain coefficients (K_p, K_i, K_d).'
    ],
    benefitTitle: 'John G. Ziegler & Nathaniel B. Nichols 1942 Rule',
    benefitContent: 'The Ziegler-Nichols frequency response method tunes closed-loop feedback systems to achieve approximately a quarter-wave decay ratio for rapid disturbance rejection.',
    faqs: [{ q: 'What causes integral windup in PID loops?', a: 'Integral windup occurs when large setpoint errors cause the integral accumulator to saturate actuator limits, leading to massive overshoot.' }]
  },

  // 8. Stepper Motor Microstepping Resolution & Pulse Rate Calculator
  {
    slug: 'stepper-motor-microstepping-resolution-calculator',
    name: 'Stepper Motor Microstepping Resolution & Pulse Rate Calculator',
    description: 'Calculate stepper motor CNC/3D printer positional resolution (Steps/mm = (Steps/rev · Microsteps) / (Pitch · Teeth)) and pulse frequency in kHz.',
    category: 'Science',
    icon: 'text',
    keywords: ['stepper motor microstepping calculator', 'steps per mm 3d printer belt leadscrew formula', 'stepper pulse rate frequency khz calculator', 'nema 17 23 microstep resolution online', 'cnc motor steps per mm calculator'],
    order: 617,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Step Angle (1.8° / 0.9°), Microsteps (1/16, 1/32) & Drive Mechanism',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stp-ang">Motor Step Angle</label>
          <select class="tool-textarea" id="stp-ang">
            <option value="1.8" selected>1.8° (200 Steps/Rev - Standard NEMA 17)</option>
            <option value="0.9">0.9° (400 Steps/Rev - High Precision)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="stp-ustep">Driver Microsteps</label>
          <select class="tool-textarea" id="stp-ustep">
            <option value="1">1/1 (Full Step)</option>
            <option value="4">1/4 Microstep</option>
            <option value="8">1/8 Microstep</option>
            <option value="16" selected>1/16 Microstep (Standard A4988 / TMC2209)</option>
            <option value="32">1/32 Microstep</option>
            <option value="64">1/64 Microstep</option>
            <option value="256">1/256 Microstep</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="stp-mech">Transmission Drive</label>
          <select class="tool-textarea" id="stp-mech">
            <option value="gt2_20" selected>GT2 Belt + 20T Pulley (40 mm/rev)</option>
            <option value="gt2_16">GT2 Belt + 16T Pulley (32 mm/rev)</option>
            <option value="lead_8">T8 Lead Screw - 8mm Pitch (8 mm/rev)</option>
            <option value="lead_2">T8 Lead Screw - 2mm Pitch (2 mm/rev)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="stp-spd">Linear Speed (mm/s)</label>
          <input class="tool-textarea" id="stp-spd" type="number" step="any" value="150.0" placeholder="150.0 mm/s" />
        </div>
      </div>
      <div id="stp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stp-res-steps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">80.00 Steps / mm</span>
            <span class="stat-label">Firmware Calibration Steps Per Millimeter</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stp-res-freq" style="font-weight:700;">12.00 kHz Pulse Frequency | 12.50 μm / Step</span>
            <span class="stat-label">Step Pulse Generation Rate & Linear Resolution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const angEl = document.getElementById('stp-ang'), ustepEl = document.getElementById('stp-ustep');
  const mechEl = document.getElementById('stp-mech'), spdEl = document.getElementById('stp-spd');
  const sResEl = document.getElementById('stp-res-steps'), fResEl = document.getElementById('stp-res-freq');

  const MECH_MM = {
    'gt2_20': 40.0,
    'gt2_16': 32.0,
    'lead_8': 8.0,
    'lead_2': 2.0
  };

  function update() {
    const stepAngle = parseFloat(angEl.value);
    const usteps = parseInt(ustepEl.value, 10);
    const mmPerRev = MECH_MM[mechEl.value];
    const speedMmS = parseFloat(spdEl.value);

    if (isNaN(stepAngle) || isNaN(usteps) || isNaN(speedMmS) || speedMmS <= 0) return;

    const fullSteps = 360 / stepAngle;
    const totalStepsPerRev = fullSteps * usteps;
    const stepsPerMm = totalStepsPerRev / mmPerRev;
    const resolutionUm = (1 / stepsPerMm) * 1000;

    const pulseHz = stepsPerMm * speedMmS;
    const pulseKhz = pulseHz / 1000;

    sResEl.textContent = stepsPerMm.toFixed(2) + ' Steps / mm (Marlin / Klipper)';
    fResEl.textContent = pulseKhz.toFixed(2) + ' kHz Pulse Rate @ ' + speedMmS.toFixed(0) + ' mm/s (Resolution: ' + resolutionUm.toFixed(2) + ' μm/step)';
  }

  [angEl, ustepEl, mechEl].forEach(el => el.addEventListener('change', update));
  spdEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select motor native step angle (1.8° for 200 steps/rev or 0.9° for 400 steps/rev).',
      'Select driver microstepping interpolation division (1/16, 1/32, 1/64).',
      'Select mechanical linear drive type (GT2 timing belt or precision lead screw).',
      'Enter desired linear axis feedrate travel speed in mm/s.',
      'Inspect exact steps/mm calibration value for 3D printer / CNC firmware and required microcontroller step pulse frequency in kHz.'
    ],
    benefitTitle: 'Microstepping Torque vs Positional Resolution',
    benefitContent: 'Microstepping subdivides full step angles by modulating dual sine-cosine coil currents; this eliminates low-speed mechanical resonance and quietens motor operation.',
    faqs: [{ q: 'Why is 80 steps/mm the standard value on Ender 3 printers?', a: '200 steps/rev × 16 microsteps = 3,200 pulses; dividing by a 40 mm/rev GT2 belt pulley (20 teeth × 2mm) yields exactly 80.0 steps/mm.' }]
  },

  // 9. Planetary Epicyclic Gear Train Ratio Calculator
  {
    slug: 'planetary-gear-ratio-sun-ring-carrier-calculator',
    name: 'Planetary (Epicyclic) Gear Train Ratio & Speed Calculator',
    description: 'Calculate planetary epicyclic gearbox gear ratios (R = 1 + N_ring / N_sun for fixed ring carrier output), sun/planet tooth meshing, and output torque multiplier.',
    category: 'Science',
    icon: 'text',
    keywords: ['planetary gear ratio calculator', 'epicyclic gear train formula sun ring planet', 'planetary gearbox reduction ratio calculator online', 'sun planet ring gear tooth meshing calculator', 'robotic actuator planetary gear ratio online'],
    order: 618,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sun Gear Teeth (N_sun), Ring Gear Teeth (N_ring) & Input/Output Configuration',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pg-sun">Sun Teeth N_s</label>
          <input class="tool-textarea" id="pg-sun" type="number" step="1" value="18" placeholder="18 Teeth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-ring">Ring Teeth N_r</label>
          <input class="tool-textarea" id="pg-ring" type="number" step="1" value="72" placeholder="72 Teeth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-planets">Planets Count</label>
          <input class="tool-textarea" id="pg-planets" type="number" step="1" value="3" placeholder="3 Planets" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-mode">Drive Configuration</label>
          <select class="tool-textarea" id="pg-mode">
            <option value="sun_in_carrier_out" selected>Sun Input, Ring Fixed -> Carrier Output (Speed Reducer)</option>
            <option value="carrier_in_sun_out">Carrier Input, Ring Fixed -> Sun Output (Speed Multiplier)</option>
            <option value="sun_in_ring_out">Sun Input, Carrier Fixed -> Ring Output (Direction Inverter)</option>
          </select>
        </div>
      </div>
      <div id="pg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pg-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.00 : 1 Reduction</span>
            <span class="stat-label">Total Planetary Gearbox Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pg-res-geom" style="font-weight:700;">Planet Teeth N_p = 27 | Meshing Assembly: VALID (N_s + N_r = 90 % 3 = 0)</span>
            <span class="stat-label">Planet Tooth Count (N_p = (N_r - N_s)/2) & Assembly Check</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('pg-sun'), rEl = document.getElementById('pg-ring');
  const pEl = document.getElementById('pg-planets'), mEl = document.getElementById('pg-mode');
  const rResEl = document.getElementById('pg-res-ratio'), gResEl = document.getElementById('pg-res-geom');

  function update() {
    const Ns = parseInt(sEl.value, 10), Nr = parseInt(rEl.value, 10), nPlanets = parseInt(pEl.value, 10);
    const mode = mEl.value;

    if (isNaN(Ns) || isNaN(Nr) || isNaN(nPlanets) || Ns <= 0 || Nr <= Ns || nPlanets < 2) return;

    const Np_calc = (Nr - Ns) / 2;
    const isIntegerPlanet = Number.isInteger(Np_calc);
    const isAssembled = (Ns + Nr) % nPlanets === 0;

    let ratio = 1.0;
    let desc = '';

    if (mode === 'sun_in_carrier_out') {
      ratio = 1 + (Nr / Ns);
      desc = ratio.toFixed(2) + ' : 1 Speed Reducer (Torque ×' + ratio.toFixed(2) + ')';
    } else if (mode === 'carrier_in_sun_out') {
      ratio = 1 / (1 + (Nr / Ns));
      desc = '1 : ' + (1 / ratio).toFixed(2) + ' Overdrive Multiplier';
    } else if (mode === 'sun_in_ring_out') {
      ratio = Nr / Ns;
      desc = ratio.toFixed(2) + ' : 1 Reverse Direction Inverter';
    }

    rResEl.textContent = desc;

    let status = '';
    if (isIntegerPlanet && isAssembled) {
      status = 'Planet Teeth N_p = ' + Np_calc + ' | VALID ASSEMBLY (' + nPlanets + ' Planets Symmetrically Meshed)';
      gResEl.style.color = '#22543d';
    } else {
      status = 'Planet N_p = ' + Np_calc + ' | INVALID ASSEMBLY (Check (N_s + N_r) % Planets == 0)';
      gResEl.style.color = '#c53030';
    }
    gResEl.textContent = status;
  }

  [sEl, rEl, pEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter number of teeth on the central Sun gear N_s.',
      'Enter number of teeth on the outer Ring (Annulus) gear N_r.',
      'Enter total number of planet gears (typically 3 or 4).',
      'Select drive configuration (Fixed Ring, Fixed Carrier, or Fixed Sun).',
      'Inspect total gear reduction ratio and check Willis planetary assembly geometry conditions.'
    ],
    benefitTitle: 'Coaxial Power Transmission & High Power Density',
    benefitContent: 'Planetary gear trains share input torque across multiple planet gears simultaneously, delivering immense torque density, high efficiency (>95%), and coaxial shaft alignment in compact robotic actuators and automatic transmissions.',
    faqs: [{ q: 'What is the assembly rule for 3-planet gearboxes?', a: 'The sum of sun and ring teeth (N_s + N_r) must be evenly divisible by the number of planet gears so planets mesh symmetrically without binding.' }]
  },

  // 10. Robot Manipulator Jacobian Force-to-Joint-Torque Calculator
  {
    slug: 'robot-manipulator-jacobian-torque-calculator',
    name: 'Robot Manipulator Jacobian Force-to-Torque (τ = Jᵀ · F) Calculator',
    description: 'Calculate 2-DOF robotic manipulator joint actuator torques (τ₁ = Jᵀ · F) from end-effector contact forces [F_x, F_y] and link angles (θ₁, θ₂) using the transpose Jacobian matrix.',
    category: 'Science',
    icon: 'text',
    keywords: ['robot jacobian torque calculator', 'jacobian transpose static force formula tau jt f', 'robot manipulator joint torques calculator online', '2 dof planar arm jacobian calculator', 'robotics force control jacobian online'],
    order: 619,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Link Lengths L₁, L₂ (m), Joint Angles θ₁, θ₂ (°) & End Force F_x, F_y (N)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jac-l1">Link 1 L₁ (m)</label>
          <input class="tool-textarea" id="jac-l1" type="number" step="any" value="0.50" placeholder="0.50 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jac-l2">Link 2 L₂ (m)</label>
          <input class="tool-textarea" id="jac-l2" type="number" step="any" value="0.40" placeholder="0.40 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jac-th1">Joint 1 θ₁ (°)</label>
          <input class="tool-textarea" id="jac-th1" type="number" step="5" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jac-th2">Joint 2 θ₂ (°)</label>
          <input class="tool-textarea" id="jac-th2" type="number" step="5" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jac-fx">End Force F_x (N)</label>
          <input class="tool-textarea" id="jac-fx" type="number" step="any" value="10.0" placeholder="10.0 N" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jac-fy">End Force F_y (N)</label>
          <input class="tool-textarea" id="jac-fy" type="number" step="any" value="-20.0" placeholder="-20.0 N (Downward Load)" />
        </div>
      </div>
      <div id="jac-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jac-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">τ₁ = -16.03 Nm | τ₂ = -5.99 Nm</span>
            <span class="stat-label">Required Joint Motor Actuator Torques (τ = Jᵀ · F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jac-res-pos" style="font-weight:700;">End-Effector Tip Position: (0.537, 0.636) m</span>
            <span class="stat-label">Planar Forward Kinematics Coordinates (X, Y)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('jac-l1'), l2El = document.getElementById('jac-l2');
  const t1El = document.getElementById('jac-th1'), t2El = document.getElementById('jac-th2');
  const fxEl = document.getElementById('jac-fx'), fyEl = document.getElementById('jac-fy');
  const tResEl = document.getElementById('jac-res-tau'), pResEl = document.getElementById('jac-res-pos');

  function update() {
    const L1 = parseFloat(l1El.value), L2 = parseFloat(l2El.value);
    const th1Deg = parseFloat(t1El.value), th2Deg = parseFloat(t2El.value);
    const Fx = parseFloat(fxEl.value), Fy = parseFloat(fyEl.value);

    if (isNaN(L1) || isNaN(L2) || isNaN(th1Deg) || isNaN(th2Deg) || isNaN(Fx) || isNaN(Fy) || L1 <= 0 || L2 <= 0) return;

    const th1 = (th1Deg * Math.PI) / 180;
    const th2 = (th2Deg * Math.PI) / 180;
    const th12 = th1 + th2;

    const x = (L1 * Math.cos(th1)) + (L2 * Math.cos(th12));
    const y = (L1 * Math.sin(th1)) + (L2 * Math.sin(th12));

    const J11 = -(L1 * Math.sin(th1)) - (L2 * Math.sin(th12));
    const J12 = -(L2 * Math.sin(th12));
    const J21 = (L1 * Math.cos(th1)) + (L2 * Math.cos(th12));
    const J22 = (L2 * Math.cos(th12));

    const tau1 = (J11 * Fx) + (J21 * Fy);
    const tau2 = (J12 * Fx) + (J22 * Fy);

    tResEl.textContent = 'τ₁ = ' + tau1.toFixed(2) + ' Nm | τ₂ = ' + tau2.toFixed(2) + ' Nm';
    pResEl.textContent = 'Tip Position: (' + x.toFixed(3) + 'm, ' + y.toFixed(3) + 'm) | Arm Reach: ' + Math.sqrt(x*x + y*y).toFixed(3) + ' m';
  }

  [l1El, l2El, t1El, t2El, fxEl, fyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter robot arm link lengths L₁ and L₂ in meters.',
      'Enter current joint angles θ₁ and θ₂ in degrees.',
      'Enter end-effector external contact force components F_x and F_y in Newtons.',
      'Inspect joint motor holding torques (τ₁, τ₂) computed via the Transpose Jacobian matrix.'
    ],
    benefitTitle: 'Principle of Virtual Work & Statics Duality',
    benefitContent: 'By the principle of virtual work, the transpose of the kinematic velocity Jacobian maps end-effector forces directly into static joint torques, enabling impedance and force control in surgical and collaborative robots.',
    faqs: [{ q: 'What happens at a kinematic singularity (det(J) = 0)?', a: 'When the arm is fully outstretched, the robot cannot move radially, and joint torques cannot resist infinite external radial forces.' }]
  },

  // --- Suite IIII: HVAC, Refrigeration & Building Energy (741 - 745) ---
  // 11. Refrigeration Carnot COP & Energy Efficiency Calculator
  {
    slug: 'refrigeration-carnot-cop-efficiency-calculator',
    name: 'Refrigeration Carnot Cycle COP & Compressor Power Calculator',
    description: 'Calculate maximum theoretical thermodynamic Coefficient of Performance (COP_Carnot = T_C / (T_H - T_C)) and compressor electrical power demand in kW/HP.',
    category: 'Science',
    icon: 'text',
    keywords: ['refrigeration carnot cop calculator', 'coefficient of performance formula tc over th minus tc', 'chiller compressor electrical power calculator', 'eer seer to cop conversion calculator', 'hvac refrigeration efficiency online'],
    order: 620,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Evaporator Temp T_C (°C), Condenser Temp T_H (°C) & Cooling Capacity Q_c (kW or Tons)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ref-tc">Evaporator T_C (°C)</label>
          <input class="tool-textarea" id="ref-tc" type="number" step="any" value="4.0" placeholder="4.0 °C (Chilled Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ref-th">Condenser T_H (°C)</label>
          <input class="tool-textarea" id="ref-th" type="number" step="any" value="38.0" placeholder="38.0 °C (Summer Ambient)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ref-qc">Cooling Load Q_c (kW)</label>
          <input class="tool-textarea" id="ref-qc" type="number" step="any" value="35.0" placeholder="35.0 kW (10 Tons)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ref-eff">Isentropic Efficiency</label>
          <input class="tool-textarea" id="ref-eff" type="number" step="0.05" value="0.65" placeholder="0.65 (Real Compressor)" />
        </div>
      </div>
      <div id="ref-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ref-res-cop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Real COP = 5.30 (Carnot: 8.15)</span>
            <span class="stat-label">System Coefficient of Performance (COP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ref-res-pwr" style="font-weight:700;">Compressor Power: 6.60 kW (8.85 HP) | EER: 18.09</span>
            <span class="stat-label">Electrical Power Input & Energy Efficiency Ratio (EER)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tcEl = document.getElementById('ref-tc'), thEl = document.getElementById('ref-th');
  const qcEl = document.getElementById('ref-qc'), efEl = document.getElementById('ref-eff');
  const cResEl = document.getElementById('ref-res-cop'), pResEl = document.getElementById('ref-res-pwr');

  function update() {
    const Tc_c = parseFloat(tcEl.value), Th_c = parseFloat(thEl.value);
    const Qc_kw = parseFloat(qcEl.value), eff = parseFloat(efEl.value);

    if (isNaN(Tc_c) || isNaN(Th_c) || isNaN(Qc_kw) || isNaN(eff) || Th_c <= Tc_c || Qc_kw <= 0 || eff <= 0 || eff > 1.0) return;

    const Tc_k = Tc_c + 273.15;
    const Th_k = Th_c + 273.15;

    const copCarnot = Tc_k / (Th_k - Tc_k);
    const copReal = copCarnot * eff;

    const W_kw = Qc_kw / copReal;
    const W_hp = W_kw * 1.34102;
    const eer = copReal * 3.412142;

    cResEl.textContent = 'Real COP = ' + copReal.toFixed(2) + ' (Carnot Max: ' + copCarnot.toFixed(2) + ')';
    pResEl.textContent = 'Input Power: ' + W_kw.toFixed(2) + ' kW (' + W_hp.toFixed(2) + ' HP) | EER: ' + eer.toFixed(1) + ' (Lift: ' + (Th_c - Tc_c).toFixed(1) + '°C)';
  }

  [tcEl, thEl, qcEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter refrigerant evaporating saturation temperature T_C in Celsius.',
      'Enter refrigerant condensing saturation temperature T_H in Celsius.',
      'Enter cooling thermal load capacity Q_c in kilowatts (1 Ton of Refrigeration = 3.517 kW).',
      'Enter compressor isentropic second-law efficiency (typically 0.60 to 0.75).',
      'Inspect thermodynamic COP, Energy Efficiency Ratio (EER), and required compressor electrical horsepower.'
    ],
    benefitTitle: 'Nicolas Léonard Sadi Carnot 1824 Second Law Ceiling',
    benefitContent: 'The Carnot cycle defines the absolute theoretical ceiling of heat pump and refrigeration performance; minimizing thermal lift by using water-cooled condensers dramatically boosts COP and slashes electricity bills.',
    faqs: [{ q: 'Why does lowering condenser temperature save so much electricity?', a: 'Every 1°C reduction in condensing temperature improves refrigeration COP by approximately 2% to 4%.' }]
  },

  // 12. Building Envelope Overall U-Value & Thermal Resistance (R-Value) Calculator
  {
    slug: 'building-envelope-u-value-r-value-calculator',
    name: 'Building Envelope Overall U-Value & Thermal Resistance (R-Value) Calculator',
    description: 'Calculate composite wall/roof overall thermal transmittance (U = 1 / ΣR_i) in W/m²·K, total R-value (m²·K/W and ft²·°F·h/BTU), and structural heat loss.',
    category: 'Science',
    icon: 'text',
    keywords: ['building envelope u value calculator', 'r value to u value formula online', 'composite wall thermal transmittance u value calculator', 'ashrae 90 1 building heat loss calculator', 'insulation r value calculator online'],
    order: 621,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Composite Layer R-Values (m²·K/W or US ft²·°F·h/BTU), Wall Area (m²) & ΔT (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="uval-ins">Insulation R (SI)</label>
          <input class="tool-textarea" id="uval-ins" type="number" step="any" value="3.5" placeholder="3.5 m²·K/W (~R-20 US)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="uval-sheath">Sheathing R (SI)</label>
          <input class="tool-textarea" id="uval-sheath" type="number" step="any" value="0.45" placeholder="0.45 m²·K/W (OSB / Drywall)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="uval-area">Wall Area A (m²)</label>
          <input class="tool-textarea" id="uval-area" type="number" step="any" value="150.0" placeholder="150.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="uval-dt">Indoor-Outdoor ΔT (°C)</label>
          <input class="tool-textarea" id="uval-dt" type="number" step="any" value="25.0" placeholder="25.0 °C (Winter Design)" />
        </div>
      </div>
      <div id="uval-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="uval-res-u" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">U = 0.243 W / m²·K</span>
            <span class="stat-label">Overall Thermal Transmittance (U-Value)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="uval-res-q" style="font-weight:700;">Heat Loss: 911.3 Watts (R-23.4 US Total)</span>
            <span class="stat-label">Continuous Thermal Transmission Heat Loss (q = U·A·ΔT)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const insEl = document.getElementById('uval-ins'), shEl = document.getElementById('uval-sheath');
  const aEl = document.getElementById('uval-area'), dtEl = document.getElementById('uval-dt');
  const uResEl = document.getElementById('uval-res-u'), qResEl = document.getElementById('uval-res-q');

  const R_si_air_film = 0.17;

  function update() {
    const R_ins = parseFloat(insEl.value), R_sh = parseFloat(shEl.value);
    const Area = parseFloat(aEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(R_ins) || isNaN(R_sh) || isNaN(Area) || isNaN(deltaT) || R_ins < 0 || R_sh < 0 || Area <= 0 || deltaT <= 0) return;

    const R_total_SI = R_si_air_film + R_ins + R_sh;
    const U_SI = 1 / R_total_SI;
    const R_US = R_total_SI * 5.678263;
    const q_watts = U_SI * Area * deltaT;

    uResEl.textContent = 'U = ' + U_SI.toFixed(3) + ' W / m²·K (U-US: ' + (1/R_US).toFixed(3) + ')';
    qResEl.textContent = 'Heat Loss: ' + q_watts.toFixed(1) + ' W (' + (q_watts * 3.412142).toFixed(0) + ' BTU/h | Total R-' + R_US.toFixed(1) + ' US)';
  }

  [insEl, shEl, aEl, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter insulation layer thermal resistance R_ins in SI units (m²·K/W).',
      'Enter combined sheathing, cladding, and gypsum drywall resistance in SI.',
      'Enter total exterior wall surface area in m².',
      'Enter winter design indoor-to-outdoor temperature difference ΔT in °C.',
      'Inspect total composite assembly U-value, US R-value, and continuous structural transmission heat loss in Watts and BTU/hr.'
    ],
    benefitTitle: 'Fourier Conduction & ASHRAE 90.1 Energy Standards',
    benefitContent: 'Heat flows via series thermal resistance paths; calculating accurate composite U-values ensures building envelopes comply with IECC and ASHRAE continuous insulation requirements to prevent thermal bridging.',
    faqs: [{ q: 'How do you convert US R-value to SI R-value?', a: 'R_SI = R_US / 5.678. (For example, US R-20 = 3.52 m²·K/W).' }]
  },

  // 13. Psychrometric Air Conditioning Sensible & Latent Heat Load Calculator
  {
    slug: 'psychrometric-enthalpy-sensible-latent-heat-calculator',
    name: 'Psychrometric Sensible & Latent Cooling Load (CFM) Calculator',
    description: 'Calculate HVAC total cooling coil enthalpy load (q_total = 4.5 · CFM · Δh), sensible heat (q_s = 1.08 · CFM · ΔT), and latent moisture heat (q_l = 4840 · CFM · ΔW).',
    category: 'Science',
    icon: 'text',
    keywords: ['psychrometric cooling load calculator', 'sensible latent heat formula 1.08 cfm delta t', 'latent heat 4840 cfm delta w calculator', 'hvac sensible heat ratio shr calculator online', 'air conditioning coil sizing calculator'],
    order: 622,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Airflow Rate (CFM), Dry Bulb ΔT (°F) & Humidity Ratio ΔW (lb_water / lb_dry_air)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="psy-cfm">Airflow (CFM)</label>
          <input class="tool-textarea" id="psy-cfm" type="number" step="any" value="2000" placeholder="2000 CFM (5 Tons)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="psy-dt">Dry Bulb ΔT (°F)</label>
          <input class="tool-textarea" id="psy-dt" type="number" step="any" value="20.0" placeholder="20.0 °F (75°F to 55°F)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="psy-dw">Humidity ΔW (grains/lb)</label>
          <input class="tool-textarea" id="psy-dw" type="number" step="any" value="25.0" placeholder="25.0 grains/lb" />
        </div>
      </div>
      <div id="psy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="psy-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">60,686 BTU/h (5.06 Tons)</span>
            <span class="stat-label">Total Air Conditioner Cooling Capacity (q_total)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="psy-res-shr" style="font-weight:700;">Sensible: 43,200 BTU/h (71.2%) | Latent: 17,486 BTU/h (SHR = 0.71)</span>
            <span class="stat-label">Sensible Heat Ratio (SHR = q_s / q_total) & Moisture Removal</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cfmEl = document.getElementById('psy-cfm'), dtEl = document.getElementById('psy-dt'), dwEl = document.getElementById('psy-dw');
  const tResEl = document.getElementById('psy-res-tot'), sResEl = document.getElementById('psy-res-shr');

  function update() {
    const cfm = parseFloat(cfmEl.value), deltaT_f = parseFloat(dtEl.value), deltaW_grains = parseFloat(dwEl.value);
    if (isNaN(cfm) || isNaN(deltaT_f) || isNaN(deltaW_grains) || cfm <= 0 || deltaT_f <= 0 || deltaW_grains < 0) return;

    const qs = 1.08 * cfm * deltaT_f;
    const deltaW_lb = deltaW_grains / 7000;
    const ql = 4840 * cfm * deltaW_lb;

    const qtotal = qs + ql;
    const tons = qtotal / 12000;
    const shr = qs / qtotal;

    tResEl.textContent = Math.round(qtotal).toLocaleString() + ' BTU/h (' + tons.toFixed(2) + ' Tons AC)';
    sResEl.textContent = 'Sensible: ' + Math.round(qs).toLocaleString() + ' BTU/h (' + (shr*100).toFixed(1) + '%) | Latent: ' + Math.round(ql).toLocaleString() + ' BTU/h (SHR = ' + shr.toFixed(2) + ')';
  }

  [cfmEl, dtEl, dwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter supply fan airflow volume in CFM (Cubic Feet per Minute).',
      'Enter dry-bulb temperature drop ΔT across the cooling coil in °F (typically 18°F to 22°F).',
      'Enter moisture removal humidity differential ΔW in grains of water per pound of dry air (7000 grains = 1 lb water).',
      'Inspect Sensible Cooling, Latent Dehumidification, Total AC Tonnage, and Sensible Heat Ratio (SHR).'
    ],
    benefitTitle: 'Willis Carrier 1911 Rational Psychrometric Formulae',
    benefitContent: 'Air conditioners must simultaneously cool dry air (sensible load) and condense water vapor into liquid drain pan runoff (latent load); matching equipment Sensible Heat Ratio (SHR) prevents humid clammy indoor spaces.',
    faqs: [{ q: 'What is a typical Sensible Heat Ratio for residential AC?', a: 'Standard residential comfort cooling operates at an SHR of ~0.70 to 0.75 (70% sensible cooling, 30% moisture condensation).' }]
  },

  // 14. Cooling Tower Approach, Range & Effectiveness Calculator
  {
    slug: 'cooling-tower-approach-range-efficiency-calculator',
    name: 'Cooling Tower Approach, Range & Thermal Effectiveness Calculator',
    description: 'Calculate evaporative cooling tower thermal effectiveness (η = (T_in - T_out) / (T_in - T_wb) · 100%), Range, Approach, and heat rejection load in kW/Tons.',
    category: 'Science',
    icon: 'text',
    keywords: ['cooling tower approach calculator', 'cooling tower range effectiveness formula online', 'wet bulb approach temperature calculator', 'evaporative cooling tower efficiency online', 'hvac chiller heat rejection calculator'],
    order: 623,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hot Water In T_in (°C), Cold Water Out T_out (°C) & Ambient Wet Bulb T_wb (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-tin">Hot Water In T_in (°C)</label>
          <input class="tool-textarea" id="ct-tin" type="number" step="any" value="35.0" placeholder="35.0 °C (From Condenser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-tout">Cold Water Out T_out (°C)</label>
          <input class="tool-textarea" id="ct-tout" type="number" step="any" value="29.5" placeholder="29.5 °C (To Condenser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-twb">Wet-Bulb T_wb (°C)</label>
          <input class="tool-textarea" id="ct-twb" type="number" step="any" value="25.0" placeholder="25.0 °C Ambient Wet Bulb" />
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">55.0% Thermal Effectiveness</span>
            <span class="stat-label">Cooling Tower Effectiveness (η = Range / (Range + Approach))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-stats" style="font-weight:700;">Range: 5.5°C | Approach: 4.5°C</span>
            <span class="stat-label">Cooling Range (T_in - T_out) & Wet-Bulb Approach (T_out - T_wb)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('ct-tin'), outEl = document.getElementById('ct-tout'), wbEl = document.getElementById('ct-twb');
  const efResEl = document.getElementById('ct-res-eff'), stResEl = document.getElementById('ct-res-stats');

  function update() {
    const Tin = parseFloat(inEl.value), Tout = parseFloat(outEl.value), Twb = parseFloat(wbEl.value);
    if (isNaN(Tin) || isNaN(Tout) || isNaN(Twb) || Tin <= Tout || Tout <= Twb) return;

    const range = Tin - Tout;
    const approach = Tout - Twb;
    const eff = (range / (range + approach)) * 100;

    efResEl.textContent = eff.toFixed(1) + '% Thermal Effectiveness';
    stResEl.textContent = 'Range ΔT: ' + range.toFixed(1) + '°C | Approach to Wet Bulb: ' + approach.toFixed(1) + '°C (CTI Standard)';
  }

  [inEl, outEl, wbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hot condenser water entering the cooling tower T_in in °C.',
      'Enter cooled water leaving the cooling tower basin T_out in °C.',
      'Enter ambient outdoor wet-bulb thermometer temperature T_wb in °C.',
      'Inspect Cooling Tower Thermal Effectiveness percentage, thermal Range (ΔT), and Wet-Bulb Approach.'
    ],
    benefitTitle: 'Cooling Technology Institute (CTI) Evaporative Limits',
    benefitContent: 'An evaporative cooling tower can never cool water below the ambient wet-bulb temperature; the Approach measures how closely the tower approaches physical thermodynamic perfection (typically 3°C to 5°C).',
    faqs: [{ q: 'Why is wet-bulb temperature lower than dry-bulb temperature?', a: 'Evaporation absorbs latent heat from the water droplets, chilling the wet-bulb sensor below the ambient dry air temperature.' }]
  },

  // 15. Air Duct Friction Head Loss (Darcy-Weisbach / Colebrook) Calculator
  {
    slug: 'duct-friction-loss-darcy-colebrook-calculator',
    name: 'Air Duct Friction Loss & Pressure Drop (Darcy-Weisbach) Calculator',
    description: 'Calculate HVAC air duct friction pressure drop (ΔP = f · (L/D) · (ρ·v²/2)) in Pascals and in. w.g. per 100 ft from airflow velocity and duct diameter.',
    category: 'Science',
    icon: 'text',
    keywords: ['air duct friction loss calculator', 'darcy weisbach duct pressure drop formula', 'hvac duct sizing in wg per 100 ft calculator', 'sheet metal air duct friction loss online', 'duct velocity pressure drop calculator'],
    order: 624,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Duct Diameter D (mm or inches), Airflow CFM & Duct Length L (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dct-dia">Diameter D (mm)</label>
          <input class="tool-textarea" id="dct-dia" type="number" step="any" value="300" placeholder="300 mm (12 inch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dct-cfm">Airflow (CFM)</label>
          <input class="tool-textarea" id="dct-cfm" type="number" step="any" value="1000" placeholder="1000 CFM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dct-len">Duct Length L (m)</label>
          <input class="tool-textarea" id="dct-len" type="number" step="any" value="30.0" placeholder="30.0 m (100 ft)" />
        </div>
      </div>
      <div id="dct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dct-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">31.2 Pa (0.125 in. w.g.)</span>
            <span class="stat-label">Total Static Pressure Friction Loss (ΔP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dct-res-vel" style="font-weight:700;">Velocity: 6.67 m/s (1,313 FPM) | Rate: 0.104 Pa/m</span>
            <span class="stat-label">Air Velocity & Linear Pressure Gradient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('dct-dia'), cfmEl = document.getElementById('dct-cfm'), lEl = document.getElementById('dct-len');
  const pResEl = document.getElementById('dct-res-dp'), vResEl = document.getElementById('dct-res-vel');

  const rho = 1.204;
  const f_darcy = 0.019;

  function update() {
    const D_mm = parseFloat(dEl.value), cfm = parseFloat(cfmEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(D_mm) || isNaN(cfm) || isNaN(L_m) || D_mm <= 0 || cfm <= 0 || L_m <= 0) return;

    const D_m = D_mm / 1000;
    const area_m2 = Math.PI * Math.pow(D_m / 2, 2);
    const Q_m3s = cfm * 0.00047194745;
    const vel_ms = Q_m3s / area_m2;
    const vel_fpm = vel_ms * 196.85;

    const deltaP_pa = f_darcy * (L_m / D_m) * (0.5 * rho * Math.pow(vel_ms, 2));
    const deltaP_in_wg = deltaP_pa * 0.00401865;
    const pa_per_m = deltaP_pa / L_m;

    pResEl.textContent = deltaP_pa.toFixed(1) + ' Pa (' + deltaP_in_wg.toFixed(3) + ' in. w.g.)';
    vResEl.textContent = 'Velocity: ' + vel_ms.toFixed(2) + ' m/s (' + Math.round(vel_fpm) + ' FPM) | Friction: ' + pa_per_m.toFixed(3) + ' Pa/m (0.08 in/100ft opt)';
  }

  [dEl, cfmEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular duct internal diameter in millimeters (or converted inches).',
      'Enter design air volume flow rate in CFM (Cubic Feet per Minute).',
      'Enter straight duct run length in meters.',
      'Inspect total static air friction pressure loss in Pascals and inches of water gauge (in. w.g.), duct airflow velocity in FPM, and check compliance with the industry 0.08 - 0.10 in.w.g./100ft equal friction sizing standard.'
    ],
    benefitTitle: 'Equal Friction Duct Sizing Method',
    benefitContent: 'ASHRAE recommends sizing commercial supply ducts to a constant pressure drop rate of 0.08 to 0.10 in. w.g. per 100 ft to balance fan motor electrical power consumption against duct fabrication capital cost.',
    faqs: [{ q: 'What happens if duct air velocity exceeds 1,500 FPM (7.6 m/s)?', a: 'Air velocities above 1,500 FPM cause turbulent boundary vortex shedding that generates loud rumble and whistling noise in office ceiling diffusers.' }]
  },

  // --- Suite JJJJ: Wireless Communications & Antenna Engineering (746 - 750) ---
  // 16. Friis Transmission Equation Link Budget Calculator
  {
    slug: 'friis-transmission-equation-link-budget-calculator',
    name: 'Friis Transmission Equation Free-Space Link Budget Calculator',
    description: 'Calculate wireless radio free-space path loss (P_r = P_t + G_t + G_r - FSPL) in dBm and Watts from frequency, antenna gains, and distance.',
    category: 'Science',
    icon: 'text',
    keywords: ['friis transmission equation calculator', 'free space path loss fspl formula online', 'link budget calculator rx power dbm', 'wireless path loss friis equation online', 'rf communication distance link budget calculator'],
    order: 625,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tx Power P_t (dBm), Tx Gain G_t (dBi), Rx Gain G_r (dBi), Freq f (MHz) & Distance d (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fr-pt">Tx Power (dBm)</label>
          <input class="tool-textarea" id="fr-pt" type="number" step="any" value="20.0" placeholder="20.0 dBm (100 mW WiFi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fr-gt">Tx Gain G_t (dBi)</label>
          <input class="tool-textarea" id="fr-gt" type="number" step="any" value="3.0" placeholder="3.0 dBi" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fr-gr">Rx Gain G_r (dBi)</label>
          <input class="tool-textarea" id="fr-gr" type="number" step="any" value="12.0" placeholder="12.0 dBi (Yagi/Dish)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fr-freq">Freq f (MHz)</label>
          <input class="tool-textarea" id="fr-freq" type="number" step="any" value="2400" placeholder="2400 MHz (2.4 GHz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fr-dist">Distance d (km)</label>
          <input class="tool-textarea" id="fr-dist" type="number" step="any" value="2.0" placeholder="2.0 km" />
        </div>
      </div>
      <div id="fr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fr-res-pr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-71.1 dBm (77.8 pW)</span>
            <span class="stat-label">Received Signal Power (P_r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fr-res-fspl" style="font-weight:700;">Free-Space Path Loss: 106.1 dB (Link Margin: +23.9 dB @ -95 dBm Sens)</span>
            <span class="stat-label">Free Space Path Loss (FSPL) & Receiver Margin</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ptEl = document.getElementById('fr-pt'), gtEl = document.getElementById('fr-gt');
  const grEl = document.getElementById('fr-gr'), fEl = document.getElementById('fr-freq'), dEl = document.getElementById('fr-dist');
  const prResEl = document.getElementById('fr-res-pr'), fsResEl = document.getElementById('fr-res-fspl');

  function update() {
    const Pt_dbm = parseFloat(ptEl.value), Gt = parseFloat(gtEl.value);
    const Gr = parseFloat(grEl.value), freqMhz = parseFloat(fEl.value), distKm = parseFloat(dEl.value);

    if (isNaN(Pt_dbm) || isNaN(Gt) || isNaN(Gr) || isNaN(freqMhz) || isNaN(distKm) || freqMhz <= 0 || distKm <= 0) return;

    const fspl = (20 * Math.log10(distKm)) + (20 * Math.log10(freqMhz)) + 32.44;
    const Pr_dbm = Pt_dbm + Gt + Gr - fspl;
    const Pr_watts = Math.pow(10, (Pr_dbm - 30) / 10);
    const Pr_pw = Pr_watts * 1e12;

    const rxSens = -95.0;
    const margin = Pr_dbm - rxSens;

    prResEl.textContent = Pr_dbm.toFixed(1) + ' dBm (' + (Pr_pw >= 1000 ? (Pr_pw / 1000).toFixed(2) + ' nW' : Pr_pw.toFixed(1) + ' pW') + ')';
    fsResEl.textContent = 'FSPL: ' + fspl.toFixed(1) + ' dB (Link Margin: ' + (margin >= 0 ? '+' : '') + margin.toFixed(1) + ' dB above -95 dBm Sensitivity)';
  }

  [ptEl, gtEl, grEl, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter transmitter output power P_t in dBm (e.g. 20 dBm = 100 mW).',
      'Enter transmitter antenna gain G_t and receiver antenna gain G_r in dBi.',
      'Enter carrier radio frequency in MHz (e.g. 2400 MHz for 2.4 GHz WiFi, 868/915 MHz for LoRa).',
      'Enter line-of-sight propagation distance in kilometers.',
      'Inspect received power in dBm and verify positive link budget margin over receiver sensitivity.'
    ],
    benefitTitle: 'Harald T. Friis 1946 Bell Labs Radio Transmission Formula',
    benefitContent: 'Free-space path loss expands quadratically with distance as electromagnetic wave fronts expand over the surface area of a sphere, attenuating received power predictably in line-of-sight channels.',
    faqs: [{ q: 'Why do higher frequencies suffer more free-space loss?', a: 'Because effective antenna aperture area shrinks inversely with frequency squared, capturing fewer photons at higher frequencies for an isotropic receiver.' }]
  },

  // 17. Parabolic Antenna Gain & 3dB Beamwidth Calculator
  {
    slug: 'antenna-aperture-gain-beamwidth-calculator',
    name: 'Parabolic Dish Antenna Gain (G = (π·D/λ)²·η) & Beamwidth Calculator',
    description: 'Calculate parabolic dish antenna gain in dBi (G = (π·D / λ)² · η), half-power 3dB beamwidth (θ_3dB ≈ 70°·λ / D), and effective aperture area in m².',
    category: 'Science',
    icon: 'text',
    keywords: ['parabolic antenna gain calculator', 'dish antenna gain formula dbi lambda', 'antenna 3db beamwidth theta formula online', 'satellite dish gain beamwidth calculator', 'rf aperture efficiency antenna calculator'],
    order: 626,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dish Diameter D (meters), Frequency f (GHz) & Aperture Efficiency η (0.50 to 0.70)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ant-dia">Dish Diameter D (m)</label>
          <input class="tool-textarea" id="ant-dia" type="number" step="any" value="1.20" placeholder="1.20 m (Satellite Dish)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ant-freq">Frequency f (GHz)</label>
          <input class="tool-textarea" id="ant-freq" type="number" step="any" value="12.0" placeholder="12.0 GHz (Ku-Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ant-eff">Aperture Efficiency η</label>
          <input class="tool-textarea" id="ant-eff" type="number" step="0.05" value="0.60" placeholder="0.60 (Standard 60%)" />
        </div>
      </div>
      <div id="ant-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ant-res-gain" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">41.4 dBi (13,678× Gain)</span>
            <span class="stat-label">Peak Boresight Antenna Gain (G)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ant-res-bw" style="font-weight:700;">3dB Beamwidth: 1.46° | Wavelength λ = 25.0 mm</span>
            <span class="stat-label">Half-Power Beamwidth (HPBW) & Operating Wavelength</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('ant-dia'), fEl = document.getElementById('ant-freq'), efEl = document.getElementById('ant-eff');
  const gResEl = document.getElementById('ant-res-gain'), bwResEl = document.getElementById('ant-res-bw');

  const c = 2.99792458e8;

  function update() {
    const D = parseFloat(dEl.value), fGhz = parseFloat(fEl.value), eff = parseFloat(efEl.value);
    if (isNaN(D) || isNaN(fGhz) || isNaN(eff) || D <= 0 || fGhz <= 0 || eff <= 0 || eff > 1.0) return;

    const fHz = fGhz * 1e9;
    const lambda = c / fHz;
    const lambdaMm = lambda * 1000;

    const gainLinear = Math.pow((Math.PI * D) / lambda, 2) * eff;
    const gainDbi = 10 * Math.log10(gainLinear);
    const theta3dB = 70 * (lambda / D);

    gResEl.textContent = gainDbi.toFixed(1) + ' dBi (' + Math.round(gainLinear).toLocaleString() + '× Directivity Power)';
    bwResEl.textContent = '3dB Beamwidth: ' + theta3dB.toFixed(2) + '° (λ = ' + lambdaMm.toFixed(1) + ' mm, Aperture: ' + (Math.PI*Math.pow(D/2,2)).toFixed(2) + ' m²)';
  }

  [dEl, fEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular parabolic reflector dish diameter D in meters.',
      'Enter RF microwave carrier frequency in GHz (e.g. 12 GHz Ku-band satellite, 28 GHz 5G mmWave).',
      'Enter antenna illumination aperture efficiency η (typically 0.55 to 0.65).',
      'Inspect peak antenna boresight gain in dBi, 3dB half-power beamwidth, and microwave wavelength.'
    ],
    benefitTitle: 'Aperture Diffraction Directivity',
    benefitContent: 'Parabolic dishes transform spherical feedhorn waves into highly collimated planar wave fronts; doubling the dish diameter quadruples the aperture area, adding +6 dBi of gain and cutting the beamwidth in half.',
    faqs: [{ q: 'Why is precise satellite dish aiming so critical at high frequencies?', a: 'At 12 GHz, a 1.2m dish has an extremely narrow 1.5° beamwidth; a misalignment of just 1 degree cuts received satellite signal power by over 50% (-3 dB).' }]
  },

  // 18. Half-Wave Dipole Antenna Length & Resonance Calculator
  {
    slug: 'dipole-antenna-length-radiation-resistance-calculator',
    name: 'Half-Wave Dipole Antenna Length & Radiation Resistance Calculator',
    description: 'Calculate resonant half-wave dipole wire antenna length (L = 0.475 · c / f) in meters/feet accounting for end effect velocity factor and 73.13 Ω radiation resistance.',
    category: 'Science',
    icon: 'text',
    keywords: ['dipole antenna length calculator', 'half wave dipole formula 468 over f mhz', 'antenna radiation resistance 73 ohm calculator', 'ham radio dipole wire length calculator online', 'rf dipole antenna resonance calculator'],
    order: 627,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Center Frequency f (MHz) & Wire Velocity Factor k (0.95)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dip-freq">Center Frequency f (MHz)</label>
          <input class="tool-textarea" id="dip-freq" type="number" step="any" value="14.175" placeholder="14.175 MHz (20m Ham Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dip-vf">End Velocity Factor (k)</label>
          <input class="tool-textarea" id="dip-vf" type="number" step="0.01" value="0.95" placeholder="0.95 (Insulated Copper Wire)" />
        </div>
      </div>
      <div id="dip-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dip-res-len" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10.05 m Total (33.0 ft)</span>
            <span class="stat-label">Total Resonant Half-Wave Dipole Tip-to-Tip Length</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dip-res-legs" style="font-weight:700;">5.02 m (16.5 ft) Each Leg | Radiation Res: 73.1 Ω (Gain: 2.15 dBi)</span>
            <span class="stat-label">Quarter-Wave Leg Lengths & Center Feed Impedance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('dip-freq'), vfEl = document.getElementById('dip-vf');
  const lResEl = document.getElementById('dip-res-len'), lgResEl = document.getElementById('dip-res-legs');

  const c = 2.99792458e8;

  function update() {
    const fMhz = parseFloat(fEl.value), vf = parseFloat(vfEl.value);
    if (isNaN(fMhz) || isNaN(vf) || fMhz <= 0 || vf <= 0 || vf > 1.0) return;

    const fHz = fMhz * 1e6;
    const lambda = c / fHz;

    const totalLenM = 0.5 * lambda * vf;
    const totalLenFt = totalLenM * 3.28084;
    const legLenM = totalLenM / 2;
    const legLenFt = totalLenFt / 2;

    lResEl.textContent = totalLenM.toFixed(2) + ' m Total (' + totalLenFt.toFixed(1) + ' ft Tip-to-Tip)';
    lgResEl.textContent = 'Each Quarter-Wave Leg: ' + legLenM.toFixed(2) + ' m (' + legLenFt.toFixed(1) + ' ft) | Feed Z: 73.1 Ω (2.15 dBi / 0 dBd)';
  }

  fEl.addEventListener('input', update);
  vfEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter target radio center frequency in MHz (e.g. 14.175 MHz for 20m amateur band, 98.5 MHz for FM radio).',
      'Enter wire end-effect velocity factor k (typically 0.95 for real-world insulated copper antenna wire).',
      'Inspect total tip-to-tip dipole wire length, individual quarter-wave leg cut lengths, and feedpoint radiation impedance (73.13 Ω).'
    ],
    benefitTitle: 'Heinrich Hertz 1887 Fundamental Dipole Resonator',
    benefitContent: 'A center-fed half-wave dipole establishes standing current and voltage waves, delivering an intrinsic radiation resistance of 73.13 Ω and a standard directivity gain of 2.15 dBi (0 dBd).',
    faqs: [{ q: 'Why is 468 / f(MHz) the famous American ham radio dipole rule of thumb?', a: '468 / f_MHz derives from 0.5 × 983.57 ft × 0.95 ≈ 468, giving total dipole length in feet directly from frequency in MHz.' }]
  },

  // 19. First Fresnel Zone Clearance Radius Calculator
  {
    slug: 'fresnel-zone-clearance-radius-calculator',
    name: 'First Fresnel Zone Clearance (r₁ = √(λ·d₁·d₂ / (d₁+d₂))) Calculator',
    description: 'Calculate RF microwave line-of-sight First Fresnel Zone radius (r₁ = √(λ · d₁ · d₂ / D)) and 60% minimum obstruction clearance to prevent diffraction signal fading.',
    category: 'Science',
    icon: 'text',
    keywords: ['fresnel zone calculator', 'first fresnel zone radius formula r1 online', '60 percent fresnel clearance microwave link calculator', 'rf line of sight fresnel obstruction calculator', 'wireless link fresnel zone online'],
    order: 628,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Frequency f (GHz), Distance to Obstacle d₁ (km) & Distance from Obstacle d₂ (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fz-freq">Frequency f (GHz)</label>
          <input class="tool-textarea" id="fz-freq" type="number" step="any" value="5.80" placeholder="5.80 GHz (5GHz WiFi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fz-d1">Distance d₁ (km)</label>
          <input class="tool-textarea" id="fz-d1" type="number" step="any" value="3.0" placeholder="3.0 km (Tx to Obstacle)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fz-d2">Distance d₂ (km)</label>
          <input class="tool-textarea" id="fz-d2" type="number" step="any" value="3.0" placeholder="3.0 km (Obstacle to Rx)" />
        </div>
      </div>
      <div id="fz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fz-res-r1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r₁ = 8.81 m (28.9 ft)</span>
            <span class="stat-label">1st Fresnel Zone Radius (r₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fz-res-60" style="font-weight:700;">60% Clearance Required: 5.28 m (17.3 ft)</span>
            <span class="stat-label">Minimum 60% Obstacle Clearance Height to Avoid Fading</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('fz-freq'), d1El = document.getElementById('fz-d1'), d2El = document.getElementById('fz-d2');
  const r1ResEl = document.getElementById('fz-res-r1'), c60ResEl = document.getElementById('fz-res-60');

  const c = 2.99792458e8;

  function update() {
    const fGhz = parseFloat(fEl.value), d1Km = parseFloat(d1El.value), d2Km = parseFloat(d2El.value);
    if (isNaN(fGhz) || isNaN(d1Km) || isNaN(d2Km) || fGhz <= 0 || d1Km <= 0 || d2Km <= 0) return;

    const fHz = fGhz * 1e9;
    const lambda = c / fHz;
    const d1_m = d1Km * 1000;
    const d2_m = d2Km * 1000;
    const D_total_m = d1_m + d2_m;

    const r1 = Math.sqrt((lambda * d1_m * d2_m) / D_total_m);
    const r1_ft = r1 * 3.28084;
    const r60 = r1 * 0.60;
    const r60_ft = r60 * 3.28084;

    r1ResEl.textContent = 'r₁ = ' + r1.toFixed(2) + ' m (' + r1_ft.toFixed(1) + ' ft Radius)';
    c60ResEl.textContent = '60% Clearance: ' + r60.toFixed(2) + ' m (' + r60_ft.toFixed(1) + ' ft) | Midpoint Total D = ' + (D_total_m/1000).toFixed(1) + ' km';
  }

  [fEl, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter microwave carrier frequency in GHz (e.g. 5.8 GHz, 24 GHz, 60 GHz).',
      'Enter distance from transmitter antenna to potential obstacle d₁ in km.',
      'Enter distance from obstacle to receiver antenna d₂ in km.',
      'Inspect 100% First Fresnel Zone radius r₁ and minimum 60% obstruction clearance required above trees, terrain, and buildings.'
    ],
    benefitTitle: 'Augustin-Jean Fresnel 1818 Wave Optics Clearance',
    benefitContent: 'Electromagnetic energy travels through a 3D ellipsoidal volume around the visual optical line of sight; obstructing more than 40% of the First Fresnel Zone causes destructive out-of-phase wave cancellation, severely attenuating radio signal strength.',
    faqs: [{ q: 'Why is 60% Fresnel clearance the industry standard?', a: 'Clearing 60% of the First Fresnel radius guarantees zero diffraction signal loss and provides equivalent performance to completely open free space.' }]
  },

  // 20. Urban Cellular Path Loss (Hata-Okumura Model) Calculator
  {
    slug: 'cellular-path-loss-hata-cost231-calculator',
    name: 'Urban Cellular Path Loss (Okumura-Hata Model) Calculator',
    description: 'Calculate 4G/5G mobile cellular empirical propagation path loss in dB (PL = 69.55 + 26.16·log₁₀f - 13.82·log₁₀h_b - a(h_m) + (44.9 - 6.55·log₁₀h_b)·log₁₀d) across urban, suburban, and open rural areas.',
    category: 'Science',
    icon: 'text',
    keywords: ['hata okumura path loss calculator', 'cellular path loss formula mobile height online', 'urban suburban rural cellular coverage calculator', 'cost 231 hata path loss online', 'telecom rf propagation model calculator'],
    order: 629,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Frequency f (150-1500 MHz), Base Station Height h_b (m), Mobile Height h_m (m) & Distance d (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ht-f">Carrier Freq (MHz)</label>
          <input class="tool-textarea" id="ht-f" type="number" step="any" value="900" placeholder="900 MHz (Cellular Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-hb">Tower Height h_b (m)</label>
          <input class="tool-textarea" id="ht-hb" type="number" step="any" value="30.0" placeholder="30.0 m Tower" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-hm">Mobile Height h_m (m)</label>
          <input class="tool-textarea" id="ht-hm" type="number" step="any" value="1.5" placeholder="1.5 m Handheld" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-d">Distance d (km)</label>
          <input class="tool-textarea" id="ht-d" type="number" step="any" value="3.0" placeholder="3.0 km Cell Radius" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-env">Environment</label>
          <select class="tool-textarea" id="ht-env">
            <option value="urban_medium" selected>Urban Medium City</option>
            <option value="suburban">Suburban Area (-10 dB Path Loss)</option>
            <option value="rural">Open Rural Area (-28 dB Path Loss)</option>
          </select>
        </div>
      </div>
      <div id="ht-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ht-res-pl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PL = 138.8 dB Path Loss</span>
            <span class="stat-label">Total Empirical RF Propagation Path Loss (PL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ht-res-sub" style="font-weight:700;">Urban Medium Model (Suburban: 128.9 dB | Rural: 110.4 dB)</span>
            <span class="stat-label">Comparative Environmental Propagation Losses</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ht-f'), hbEl = document.getElementById('ht-hb');
  const hmEl = document.getElementById('ht-hm'), dEl = document.getElementById('ht-d'), envEl = document.getElementById('ht-env');
  const plResEl = document.getElementById('ht-res-pl'), subResEl = document.getElementById('ht-res-sub');

  function update() {
    const f = parseFloat(fEl.value), hb = parseFloat(hbEl.value);
    const hm = parseFloat(hmEl.value), d = parseFloat(dEl.value);
    const env = envEl.value;

    if (isNaN(f) || isNaN(hb) || isNaN(hm) || isNaN(d) || f < 150 || f > 2000 || hb < 10 || hm <= 0 || d <= 0) return;

    const a_hm = ((1.1 * Math.log10(f) - 0.7) * hm) - ((1.56 * Math.log10(f)) - 0.8);
    const pl_urban = 69.55 + (26.16 * Math.log10(f)) - (13.82 * Math.log10(hb)) - a_hm + ((44.9 - (6.55 * Math.log10(hb))) * Math.log10(d));
    const pl_suburban = pl_urban - (2 * Math.pow(Math.log10(f / 28), 2)) - 5.4;
    const pl_rural = pl_urban - (4.78 * Math.pow(Math.log10(f), 2)) + (18.33 * Math.log10(f)) - 40.94;

    let selectedPL = pl_urban;
    if (env === 'suburban') selectedPL = pl_suburban;
    else if (env === 'rural') selectedPL = pl_rural;

    plResEl.textContent = 'PL = ' + selectedPL.toFixed(1) + ' dB Path Loss';
    subResEl.textContent = 'Urban: ' + pl_urban.toFixed(1) + ' dB | Suburban: ' + pl_suburban.toFixed(1) + ' dB | Rural: ' + pl_rural.toFixed(1) + ' dB';
  }

  [fEl, hbEl, hmEl, dEl].forEach(el => el.addEventListener('input', update));
  envEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter carrier frequency in MHz (150 MHz to 1,500 MHz).',
      'Enter cellular base station tower height h_b in meters (typically 20m to 50m).',
      'Enter mobile user handset antenna height h_m in meters (typically 1.5m).',
      'Enter cell site radius distance d in kilometers.',
      'Select clutter environment (Urban, Suburban, or Rural) and inspect total empirical propagation path loss in dB.'
    ],
    benefitTitle: 'Yoshihisa Okumura 1968 & Masaharu Hata 1980 Empirical Model',
    benefitContent: 'The Okumura-Hata model fits extensive Tokyo field measurements into closed-form equations, accounting for multi-path building clutter reflections and diffraction over urban rooftops.',
    faqs: [{ q: 'Why is path loss significantly lower in rural areas?', a: 'Open rural areas lack dense multi-story concrete structures, reducing destructive multipath fading and shadowing losses by ~25 to 30 dB.' }]
  },

  // --- Suite KKKK: Astrophysics, Relativity & Gravitation (751 - 755) ---
  // 21. Roche Limit Tidal Disruption Radius Calculator
  {
    slug: 'roche-limit-tidal-disruption-calculator',
    name: 'Roche Limit Tidal Disruption Radius & Planetary Ring Calculator',
    description: 'Calculate celestial Roche tidal disruption limit distance (d = R_M · (2 · ρ_M / ρ_m)^(1/3) for rigid bodies and d = 2.44 · R_M · (ρ_M / ρ_m)^(1/3) for fluid moons) to predict moon destruction and planetary ring formation.',
    category: 'Science',
    icon: 'text',
    keywords: ['roche limit calculator', 'tidal disruption radius formula roche limit', 'planetary ring formation roche distance calculator', 'fluid vs rigid satellite roche limit online', 'astrophysics tidal gravity moon breakup calculator'],
    order: 630,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Body Radius R_M (km), Primary Density ρ_M (g/cm³) & Satellite Density ρ_m (g/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-rm">Primary Radius R_M (km)</label>
          <input class="tool-textarea" id="rc-rm" type="number" step="any" value="60268" placeholder="60268 km (Saturn)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-rhom">Primary Density ρ_M</label>
          <input class="tool-textarea" id="rc-rhom" type="number" step="any" value="0.687" placeholder="0.687 g/cm³ (Saturn)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-rhos">Satellite Density ρ_m</label>
          <input class="tool-textarea" id="rc-rhos" type="number" step="any" value="1.00" placeholder="1.00 g/cm³ (Water Ice Moon)" />
        </div>
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-fluid" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">129,788 km (Fluid Limit)</span>
            <span class="stat-label">Fluid Satellite Roche Disruption Limit (d_fluid = 2.44·R·(ρ_M/ρ_m)^(1/3))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-rigid" style="font-weight:700;">Rigid Limit: 66,953 km (1.11 Saturn Radii)</span>
            <span class="stat-label">Rigid Solid Rock Satellite Roche Limit (d_rigid = 1.26·R·(ρ_M/ρ_m)^(1/3))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rmEl = document.getElementById('rc-rm'), rhomEl = document.getElementById('rc-rhom'), rhosEl = document.getElementById('rc-rhos');
  const flResEl = document.getElementById('rc-res-fluid'), rgResEl = document.getElementById('rc-res-rigid');

  function update() {
    const RM = parseFloat(rmEl.value), rhoM = parseFloat(rhomEl.value), rhom = parseFloat(rhosEl.value);
    if (isNaN(RM) || isNaN(rhoM) || isNaN(rhom) || RM <= 0 || rhoM <= 0 || rhom <= 0) return;

    const densityRatio = rhoM / rhom;
    const cubeRoot = Math.cbrt(densityRatio);

    // Rigid body: d_rigid = RM * (2 * rhoM / rhom)^(1/3) approx = 1.260 * RM * (rhoM/rhom)^(1/3)
    const dRigid = RM * Math.cbrt(2 * densityRatio);
    // Fluid body: d_fluid = 2.44 * RM * (rhoM / rhom)^(1/3)
    const dFluid = 2.44 * RM * cubeRoot;

    flResEl.textContent = Math.round(dFluid).toLocaleString() + ' km (Fluid Moon Limit, ' + (dFluid / RM).toFixed(2) + ' R_M)';
    rgResEl.textContent = 'Rigid Limit: ' + Math.round(dRigid).toLocaleString() + ' km (' + (dRigid / RM).toFixed(2) + ' R_M | Rings form inside this zone)';
  }

  [rmEl, rhomEl, rhosEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter parent planet radius R_M in kilometers (e.g. 60,268 km for Saturn, 6,371 km for Earth).',
      'Enter parent planet average density in g/cm³.',
      'Enter orbiting moon/satellite density in g/cm³ (e.g. 1.0 g/cm³ for icy comets/moons, 3.3 g/cm³ for rocky bodies).',
      'Inspect the Fluid and Rigid Roche disruption boundary radii where planetary tidal shear forces overcome internal self-gravity to rip satellites into planetary ring systems.'
    ],
    benefitTitle: 'Édouard Roche 1848 Gravitational Tidal Limit',
    benefitContent: 'When a moon crosses inside its parent planet\'s Roche limit, the differential gravitational tidal pull across the moon\'s diameter exceeds its own self-gravitational binding force, tearing the moon apart into millions of fragments that spread into planar planetary ring discs.',
    faqs: [{ q: 'Why are Saturn\'s rings located inside its Roche limit?', a: 'Saturn\'s prominent main rings (A, B, C) lie entirely within Saturn\'s fluid Roche limit of ~140,000 km, preventing ring particles from coalescing into a single large moon.' }]
  },

  // 22. Schwarzschild Black Hole Event Horizon Radius & Hawking Temperature Calculator
  {
    slug: 'schwarzschild-black-hole-event-horizon-calculator',
    name: 'Schwarzschild Black Hole Event Horizon Radius & Hawking Temperature Calculator',
    description: 'Calculate non-rotating black hole Schwarzschild event horizon radius (r_s = 2·G·M / c²) and quantum Hawking radiation temperature (T_H = ℏ·c³ / (8π·G·M·k_B)).',
    category: 'Science',
    icon: 'text',
    keywords: ['schwarzschild black hole calculator', 'event horizon radius formula rs 2gm over c squared', 'hawking radiation temperature black hole calculator', 'black hole mass to radius online', 'astrophysics event horizon calculator'],
    order: 631,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Black Hole Mass M (Solar Masses M_☉ or Kilograms)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="bh-mass">Black Hole Mass</label>
        <select class="tool-textarea" id="bh-mass">
          <option value="1">1.0 Solar Mass M_☉ (Stellar Remnant)</option>
          <option value="10" selected>10.0 Solar Masses M_☉ (Cygnus X-1)</option>
          <option value="4150000">4.15 Million M_☉ (Sagittarius A* - Milky Way Center)</option>
          <option value="6500000000">6.5 Billion M_☉ (M87* - Event Horizon Telescope)</option>
          <option value="earth">Earth Mass Equivalent (1 M_earth)</option>
        </select>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-rs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r_s = 29.5 km Radius</span>
            <span class="stat-label">Schwarzschild Event Horizon Radius (r_s = 2GM/c²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-temp" style="font-weight:700;">Hawking Temp T_H = 6.17 nK (Nanokelvin)</span>
            <span class="stat-label">Quantum Hawking Radiation Temperature (T_H)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass');
  const rResEl = document.getElementById('bh-res-rs'), tResEl = document.getElementById('bh-res-temp');

  const G = 6.67430e-11;
  const c = 2.99792458e8;
  const hbar = 1.054571817e-34;
  const kB = 1.380649e-23;
  const M_sun = 1.989e30;
  const M_earth = 5.9722e24;

  function update() {
    const val = mEl.value;
    let M = 0;
    if (val === 'earth') M = M_earth;
    else M = parseFloat(val) * M_sun;

    const rs = (2 * G * M) / Math.pow(c, 2);
    const Th = (hbar * Math.pow(c, 3)) / (8 * Math.PI * G * M * kB);

    let rsStr = '';
    if (rs < 0.01) rsStr = (rs * 1000).toFixed(2) + ' mm';
    else if (rs < 1000) rsStr = rs.toFixed(1) + ' m';
    else if (rs < 1e9) rsStr = (rs / 1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + ' km';
    else rsStr = (rs / 1.496e11).toFixed(2) + ' AU (Astronomical Units)';

    let thStr = '';
    if (Th < 1e-6) thStr = (Th * 1e9).toFixed(2) + ' nK (Nanokelvin)';
    else if (Th < 1.0) thStr = (Th * 1000).toFixed(2) + ' mK';
    else thStr = Th.toExponential(2) + ' K';

    rResEl.textContent = 'r_s = ' + rsStr + ' (Horizon Diameter: ' + (rs >= 1000 ? ((2*rs)/1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + ' km' : ((2*rs)).toFixed(1) + ' m') + ')';
    tResEl.textContent = 'Hawking Temp T_H = ' + thStr + ' (Surface Gravity κ = ' + (Math.pow(c,4)/(4*G*M)).toExponential(2) + ' m/s²)';
  }

  mEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select black hole mass category (10 Solar Mass stellar black hole, Supermassive Sagittarius A*, or M87*).',
      'Inspect Schwarzschild event horizon radius r_s = 2GM/c² in mm, km, or Astronomical Units (AU).',
      'Inspect theoretical Hawking quantum evaporation blackbody radiation temperature in Kelvin.'
    ],
    benefitTitle: 'Karl Schwarzschild 1916 & Stephen Hawking 1974 Physics',
    benefitContent: 'The Schwarzschild radius defines the point of no return where escape velocity equals the speed of light; quantum virtual particle fluctuations at the horizon cause black holes to emit thermal Hawking radiation inversely proportional to their mass.',
    faqs: [{ q: 'What is the Schwarzschild radius of Earth?', a: 'If compressed into a black hole, Earth event horizon radius would measure just 8.87 millimeters (the size of a marble).' }]
  },

  // 23. Hubble-Lemaître Cosmological Expansion & Redshift Calculator
  {
    slug: 'hubble-lemaitre-expansion-redshift-velocity-calculator',
    name: 'Hubble-Lemaître Cosmological Expansion & Redshift (v = H₀·d) Calculator',
    description: 'Calculate cosmological universe expansion recession velocity (v = H₀ · d) in km/s, cosmological redshift z, and lookback light travel time across megaparsecs.',
    category: 'Science',
    icon: 'text',
    keywords: ['hubble lemaitre calculator', 'hubble law formula v equals h0 d online', 'cosmological redshift z recession velocity calculator', 'megaparsecs to light years expansion calculator', 'astrophysics universe expansion rate online'],
    order: 632,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Comoving Galaxy Distance d (Mpc or Millions of Light Years) & Hubble Constant H₀',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hub-dist">Distance d (Mpc)</label>
          <input class="tool-textarea" id="hub-dist" type="number" step="any" value="50.0" placeholder="50.0 Mpc (~163 Million Light Years)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hub-h0">Hubble Constant H₀</label>
          <input class="tool-textarea" id="hub-h0" type="number" step="0.5" value="70.0" placeholder="70.0 km/s/Mpc" />
        </div>
      </div>
      <div id="hub-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hub-res-vel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">v = 3,500 km / s (1.17% c)</span>
            <span class="stat-label">Recession Velocity (v = H₀ · d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hub-res-z" style="font-weight:700;">Redshift z = 0.0118 | Lookback Time: 163.1 Million Light-Years</span>
            <span class="stat-label">Cosmological Spectral Redshift (z ≈ v/c) & Lookback Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('hub-dist'), h0El = document.getElementById('hub-h0');
  const vResEl = document.getElementById('hub-res-vel'), zResEl = document.getElementById('hub-res-z');

  const c_kms = 299792.458;

  function update() {
    const dMpc = parseFloat(dEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(dMpc) || isNaN(H0) || dMpc <= 0 || H0 <= 0) return;

    const v_kms = H0 * dMpc;
    const beta = v_kms / c_kms;

    let z = 0;
    if (beta < 1.0) {
      z = Math.sqrt((1 + beta) / (1 - beta)) - 1;
    } else {
      z = beta;
    }

    const mly = dMpc * 3.26156;

    vResEl.textContent = 'v = ' + Math.round(v_kms).toLocaleString() + ' km / s (' + (beta * 100).toFixed(2) + '% Speed of Light)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' | Lookback: ' + mly.toFixed(1) + ' Million Light-Years (H₀ = ' + H0 + ' km/s/Mpc)';
  }

  dEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter extragalactic proper distance d in Megaparsecs (1 Mpc = 3.26 million light-years).',
      'Enter modern Hubble expansion constant H_0 in km/s/Mpc (typically ~70 km/s/Mpc).',
      'Inspect apparent recessional velocity in km/s and cosmological spectral redshift z.'
    ],
    benefitTitle: 'Edwin Hubble & Georges Lemaître 1929 Expanding Cosmos',
    benefitContent: 'Space itself is expanding homogeneously; distant galaxies are not traveling through space, but rather the fabric of spacetime between galaxies is stretching, causing cosmological redshift of emitted starlight.',
    faqs: [{ q: 'Can distant galaxies recede faster than the speed of light?', a: 'Yes! Beyond the Hubble radius, the expansion rate of intervening spacetime exceeds the speed of light without violating Special Relativity.' }]
  },

  // 24. Stellar Luminosity & Stefan-Boltzmann Radius Calculator
  {
    slug: 'stellar-luminosity-stefan-boltzmann-radius-calculator',
    name: 'Stellar Luminosity & Stefan-Boltzmann Radius (L = 4π·R²·σ·T⁴) Calculator',
    description: 'Calculate stellar radiant power luminosity (L/L_☉ = (R/R_☉)² · (T/T_☉)⁴) in Solar Luminosities and absolute bolometric magnitude from star radius and effective temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['stellar luminosity calculator', 'stefan boltzmann star radius formula l equals 4 pi r2 sigma t4', 'absolute bolometric magnitude star luminosity online', 'hertzsprung russell star temperature luminosity calculator', 'astrophysics stellar radius online'],
    order: 633,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stellar Radius R (Solar Radii R_☉) & Effective Surface Temp T_eff (Kelvin)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="st-r">Radius R (R_☉)</label>
          <input class="tool-textarea" id="st-r" type="number" step="any" value="1.0" placeholder="1.0 R_☉ (Solar Radius)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-t">Surface Temp T_eff (K)</label>
          <input class="tool-textarea" id="st-t" type="number" step="any" value="5778" placeholder="5778 K (Sun G2V Type)" />
        </div>
      </div>
      <div id="st-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="st-res-lum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = 1.00 L_☉ (3.828 × 10²⁶ W)</span>
            <span class="stat-label">Total Radiant Bolometric Luminosity (L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="st-res-mag" style="font-weight:700;">Absolute Magnitude M_bol = +4.74 | Spectral Class: G-Type Yellow Star</span>
            <span class="stat-label">Absolute Bolometric Magnitude & Spectral Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('st-r'), tEl = document.getElementById('st-t');
  const lResEl = document.getElementById('st-res-lum'), mResEl = document.getElementById('st-res-mag');

  const T_sun = 5778.0;
  const L_sun_watts = 3.828e26;

  function update() {
    const R_rel = parseFloat(rEl.value), Teff = parseFloat(tEl.value);
    if (isNaN(R_rel) || isNaN(Teff) || R_rel <= 0 || Teff <= 0) return;

    const L_rel = Math.pow(R_rel, 2) * Math.pow(Teff / T_sun, 4);
    const L_watts = L_rel * L_sun_watts;
    const M_bol = 4.74 - (2.5 * Math.log10(L_rel));

    let specClass = '';
    if (Teff >= 30000) specClass = 'O-Type Blue Supergiant';
    else if (Teff >= 10000) specClass = 'B-Type Blue-White Star (e.g. Rigel)';
    else if (Teff >= 7500) specClass = 'A-Type White Star (e.g. Sirius, Vega)';
    else if (Teff >= 6000) specClass = 'F-Type Yellow-White Star (e.g. Procyon)';
    else if (Teff >= 5200) specClass = 'G-Type Yellow Star (e.g. Sun, Alpha Centauri)';
    else if (Teff >= 3700) specClass = 'K-Type Orange Dwarf (e.g. Arcturus)';
    else specClass = 'M-Type Red Dwarf / Supergiant (e.g. Betelgeuse)';

    lResEl.textContent = 'L = ' + (L_rel >= 1000 ? L_rel.toExponential(2) : L_rel.toFixed(2)) + ' L_☉ (' + L_watts.toExponential(3) + ' W)';
    mResEl.textContent = 'M_bol = ' + (M_bol >= 0 ? '+' : '') + M_bol.toFixed(2) + ' | ' + specClass;
  }

  rEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter stellar radius R normalized to Solar Radii (R/R_☉).',
      'Enter stellar effective photosphere surface temperature T_eff in Kelvin.',
      'Inspect total emitted electromagnetic radiation luminosity in Solar Luminosities, Watts, absolute bolometric magnitude M_bol, and Morgan-Keenan spectral classification.'
    ],
    benefitTitle: 'The Stefan-Boltzmann T⁴ Law on the HR Diagram',
    benefitContent: 'Because thermal radiant flux scales with the fourth power of temperature, hot O-type and B-type stars radiate hundreds of thousands of times more energy than cooler red dwarf stars.',
    faqs: [{ q: 'Why is Betelgeuse over 100,000× more luminous than the Sun despite being cooler?', a: 'Betelgeuse has a lower surface temperature (~3,500K), but its colossal supergiant radius provides an enormous surface area that overwhelms the T⁴ temperature difference.' }]
  },

  // 25. Gravitational Wave Strain (Binary Black Hole Merger) Calculator
  {
    slug: 'gravitational-wave-strain-binary-inspiral-calculator',
    name: 'Gravitational Wave Strain (Binary Black Hole Inspiral) Calculator',
    description: 'Calculate LIGO/Virgo gravitational wave metric strain amplitude (h = (4/r) · (G·M_c / c²)^(5/3) · (π·f_gw / c)^(2/3)) and Chirp Mass M_c from binary inspirals.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational wave strain calculator', 'chirp mass formula binary merger online', 'ligo gravitational wave amplitude h calculator', 'binary black hole merger gw frequency calculator', 'astrophysics ligo virgo strain online'],
    order: 634,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Component Masses m₁, m₂ (Solar Masses M_☉), GW Frequency f_gw (Hz) & Distance r (Mpc)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gw-m1">Mass m₁ (M_☉)</label>
          <input class="tool-textarea" id="gw-m1" type="number" step="any" value="36.0" placeholder="36.0 M_☉ (GW150914)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-m2">Mass m₂ (M_☉)</label>
          <input class="tool-textarea" id="gw-m2" type="number" step="any" value="29.0" placeholder="29.0 M_☉" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-f">GW Freq f_gw (Hz)</label>
          <input class="tool-textarea" id="gw-f" type="number" step="any" value="100.0" placeholder="100.0 Hz (Peak Chirp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-dist">Distance r (Mpc)</label>
          <input class="tool-textarea" id="gw-dist" type="number" step="any" value="410.0" placeholder="410.0 Mpc (1.3 Gly)" />
        </div>
      </div>
      <div id="gw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gw-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">h ≈ 1.02 × 10⁻²¹ Strain</span>
            <span class="stat-label">Dimensionless Gravitational Wave Metric Strain (h = ΔL / L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gw-res-mc" style="font-weight:700;">Chirp Mass M_c = 28.1 M_☉ (LIGO 4km Arm Displacement: ΔL ≈ 4.1 × 10⁻¹⁸ m)</span>
            <span class="stat-label">Binary Chirp Mass (M_c = (m₁·m₂)^(3/5) / (m₁+m₂)^(1/5))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2');
  const fEl = document.getElementById('gw-f'), dEl = document.getElementById('gw-dist');
  const hResEl = document.getElementById('gw-res-h'), mcResEl = document.getElementById('gw-res-mc');

  const G = 6.67430e-11;
  const c = 2.99792458e8;
  const M_sun = 1.989e30;

  function update() {
    const m1_sol = parseFloat(m1El.value), m2_sol = parseFloat(m2El.value);
    const fgw = parseFloat(fEl.value), rMpc = parseFloat(dEl.value);

    if (isNaN(m1_sol) || isNaN(m2_sol) || isNaN(fgw) || isNaN(rMpc) || m1_sol <= 0 || m2_sol <= 0 || fgw <= 0 || rMpc <= 0) return;

    const m1 = m1_sol * M_sun;
    const m2 = m2_sol * M_sun;
    const r_meters = rMpc * 3.085677581e22;

    const Mc = Math.pow(m1 * m2, 3/5) / Math.pow(m1 + m2, 1/5);
    const Mc_solar = Mc / M_sun;

    const term1 = 4 / r_meters;
    const term2 = Math.pow((G * Mc) / Math.pow(c, 2), 5/3);
    const term3 = Math.pow((Math.PI * fgw) / c, 2/3);
    const h = term1 * term2 * term3;

    const deltaL = h * 4000;

    hResEl.textContent = 'h ≈ ' + h.toExponential(2) + ' Strain (ΔL/L)';
    mcResEl.textContent = 'Chirp Mass M_c = ' + Mc_solar.toFixed(1) + ' M_☉ (LIGO 4km Arm Shift ΔL ≈ ' + deltaL.toExponential(2) + ' m, ~1/1000th Proton Size)';
  }

  [m1El, m2El, fEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter individual binary black hole or neutron star component masses m₁ and m₂ in Solar Masses.',
      'Enter quadrupole gravitational wave signal frequency f_gw in Hz (f_gw = 2 × f_orbital).',
      'Enter luminosity distance to binary source in Megaparsecs (Mpc).',
      'Inspect dimensionless spacetime strain amplitude h and laser interferometer arm length perturbation (ΔL = h · L).'
    ],
    benefitTitle: 'LIGO 2015 Discovery of GW150914',
    benefitContent: 'Gravitational waves stretch and compress space perpendicularly as quadrupole tidal ripples; LIGO laser interferometers detect strain amplitudes as infinitesimal as h ~ 10⁻²¹, measuring mirror displacements thousands of times smaller than an atomic proton.',
    faqs: [{ q: 'What is the Chirp Mass (M_c)?', a: 'Chirp mass determines the rate of orbital frequency acceleration and allows astrophysicists to determine exact binary masses directly from the waveform.' }]
  }
];

pack19Tools.forEach(createTool);
console.log('Pack 19 complete: 25 tools created.');
