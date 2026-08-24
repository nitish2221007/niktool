const { createTool } = require('./generate-curated-tools.cjs');

// Suite MM: 5 Tools in Audio Engineering, Psychoacoustics, BPM Delay & Decibel Addition (Tools 501 to 505)
const toolsSuiteMM = [
  // 1. Inverse Square Sound Distance Loss (dB) Calculator
  {
    slug: 'sound-distance-attenuation-inverse-square-calculator',
    name: 'Sound Distance Inverse-Square Law (dB Loss) Calculator',
    description: 'Calculate acoustic sound pressure level drop (SPL₂ = SPL₁ - 20 · log₁₀(d₂ / d₁)) and inverse-square sound attenuation across distance.',
    category: 'Daily',
    icon: 'text',
    keywords: ['sound distance attenuation calculator', 'inverse square law sound calculator', 'spl decibel distance loss formula', 'audio db drop with distance online', 'acoustic distance 6 db rule'],
    order: 376,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Reference SPL (dB), Reference Distance & Target Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sd-spl1">Reference SPL₁ (dB)</label>
          <input class="tool-textarea" id="sd-spl1" type="number" step="any" value="95" placeholder="95 dB (Concert Speaker)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sd-d1">Reference Distance d₁ (m)</label>
          <input class="tool-textarea" id="sd-d1" type="number" step="any" value="1.0" placeholder="1.0 meter" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sd-d2">Target Distance d₂ (m)</label>
          <input class="tool-textarea" id="sd-d2" type="number" step="any" value="8.0" placeholder="8.0 meters" />
        </div>
      </div>
      <div id="sd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sd-res-spl2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">76.9 dB SPL</span>
            <span class="stat-label">Resulting Sound Pressure Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-loss" style="color:#c53030; font-weight:700;">-18.06 dB Drop</span>
            <span class="stat-label">Distance Attenuation Loss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spl1El = document.getElementById('sd-spl1'), d1El = document.getElementById('sd-d1'), d2El = document.getElementById('sd-d2');
  const spl2ResEl = document.getElementById('sd-res-spl2'), lossResEl = document.getElementById('sd-res-loss');

  function update() {
    const spl1 = parseFloat(spl1El.value), d1 = parseFloat(d1El.value), d2 = parseFloat(d2El.value);
    if (isNaN(spl1) || isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) return;

    // SPL2 = SPL1 - 20 * log10(d2 / d1)
    const dbLoss = 20 * Math.log10(d2 / d1);
    const spl2 = spl1 - dbLoss;

    spl2ResEl.textContent = spl2.toFixed(1) + ' dB SPL';
    lossResEl.textContent = '-' + dbLoss.toFixed(2) + ' dB (' + (d2 / d1).toFixed(1) + 'x Distance Factor)';
  }

  [spl1El, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reference sound level in dB SPL (measured at distance d₁).',
      'Enter reference distance d₁ (usually 1.0 meter) and target listener distance d₂.',
      'Inspect calculated sound pressure level and total decibel attenuation loss.'
    ],
    benefitTitle: 'The 6 dB Doubling Distance Rule',
    benefitContent: 'In a free-field acoustic environment without reflective boundaries, sound pressure level drops by exactly 6.02 dB for every doubling of distance from the source (20 · log₁₀(2) ≈ 6.02 dB).',
    faqs: [{ q: 'What is the dB loss from 1 meter to 4 meters?', a: 'Distance quadruples (2 doublings): attenuation loss is 20 · log₁₀(4) = exactly 12.04 dB.' }]
  },

  // 2. Audio BPM to Delay & Reverb Time (Milliseconds / Hz) Calculator
  {
    slug: 'audio-bpm-to-delay-time-calculator',
    name: 'Audio BPM to Delay & Reverb Time (ms / Hz) Calculator',
    description: 'Calculate tempo-synced delay times in milliseconds (ms) and LFO modulation frequencies (Hz) for whole, quarter, dotted, and triplet musical note subdivisions.',
    category: 'Daily',
    icon: 'text',
    keywords: ['bpm to delay time calculator', 'bpm to milliseconds calculator music', 'reverb pre delay time bpm calculator', 'audio tempo sync ms calculator', 'quarter note delay milliseconds formula'],
    order: 377,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Song Tempo (Beats Per Minute BPM)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="bpm-val">Tempo (BPM)</label>
        <input class="tool-textarea" id="bpm-val" type="number" min="20" max="300" value="120" placeholder="120 BPM" />
      </div>
      <div id="bpm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="bpm-res-1-4" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">500.0 ms</span>
            <span class="stat-label">1/4 Quarter Note (Standard)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bpm-res-1-8d" style="color:#2563eb; font-weight:800; font-size:1.4rem;">375.0 ms</span>
            <span class="stat-label">1/8 Dotted (U2 Edge Delay)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bpm-res-1-8" style="font-weight:700;">250.0 ms</span>
            <span class="stat-label">1/8 Eighth Note</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bpm-res-1-8t" style="font-weight:700;">166.7 ms</span>
            <span class="stat-label">1/8 Triplet</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bpmEl = document.getElementById('bpm-val');
  const qEl = document.getElementById('bpm-res-1-4'), d8El = document.getElementById('bpm-res-1-8d');
  const e8El = document.getElementById('bpm-res-1-8'), t8El = document.getElementById('bpm-res-1-8t');

  function update() {
    const bpm = parseFloat(bpmEl.value);
    if (isNaN(bpm) || bpm <= 0) return;

    // 1/4 note ms = (60,000 / BPM)
    const quarterMs = 60000 / bpm;
    const dotted8Ms = quarterMs * 0.75;
    const eighthMs = quarterMs * 0.5;
    const triplet8Ms = quarterMs * (2 / 3);

    qEl.textContent = quarterMs.toFixed(1) + ' ms';
    d8El.textContent = dotted8Ms.toFixed(1) + ' ms';
    e8El.textContent = eighthMs.toFixed(1) + ' ms';
    t8El.textContent = triplet8Ms.toFixed(1) + ' ms';
  }

  bpmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter music track tempo in Beats Per Minute (BPM).',
      'Inspect millisecond timing values for quarter notes, dotted eighth notes, and triplets for hardware delay pedals and VST reverb plugins.'
    ],
    benefitTitle: 'The Famous "Dotted Eighth" Rhythmic Delay',
    benefitContent: 'Setting delay repeats to a dotted 8th note (3/16 note = 0.75 · quarter note time) creates the signature galloping rhythmic delay popularized by Pink Floyd and U2.',
    faqs: [{ q: 'What is quarter-note delay time at 120 BPM?', a: '60,000 ms / 120 BPM = exactly 500.0 milliseconds.' }]
  },

  // 3. Acoustic Decibel Addition & Sound Level Summation Calculator
  {
    slug: 'decibel-addition-sound-level-summation-calculator',
    name: 'Decibel Addition (Sound Source Summation) Calculator',
    description: 'Calculate total combined sound pressure level (SPL_tot = 10 · log₁₀(Σ 10^(SPLᵢ / 10))) from multiple simultaneous uncorrelated noise sources.',
    category: 'Daily',
    icon: 'text',
    keywords: ['decibel addition calculator', 'sound level summation calculator', 'add multiple db sources online', 'uncorrelated noise decibel addition formula', 'spl sum calculator online'],
    order: 378,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Individual Sound Sources (dB Levels)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="db-in">Enter Decibel Levels in dB (Comma or space separated)</label>
        <input class="tool-textarea" id="db-in" type="text" value="85, 85" placeholder="85, 85, 80" />
      </div>
      <div id="db-sum-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="db-res-total" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">88.0 dB SPL</span>
            <span class="stat-label">Total Combined Decibel Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="db-res-boost" style="color:#2563eb; font-weight:700;">+3.0 dB Increase</span>
            <span class="stat-label">Increase Over Loudest Single Source</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('db-in');
  const totResEl = document.getElementById('db-res-total'), bstResEl = document.getElementById('db-res-boost');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const dbs = raw.split(/[,\\s\\t]+/).map(Number).filter(v => !isNaN(v) && v >= 0);
    if (dbs.length === 0) return;

    // Decibel addition formula: SPL_tot = 10 * log10( sum( 10^(dB_i / 10) ) )
    let sumPower = 0;
    let maxSingle = 0;
    for (const val of dbs) {
      sumPower += Math.pow(10, val / 10);
      if (val > maxSingle) maxSingle = val;
    }

    const totalDb = 10 * Math.log10(sumPower);
    const increase = totalDb - maxSingle;

    totResEl.textContent = totalDb.toFixed(1) + ' dB SPL';
    bstResEl.textContent = '+' + increase.toFixed(1) + ' dB (over max ' + maxSingle.toFixed(1) + ' dB)';
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter individual sound source levels in dB (comma or space separated).',
      'Inspect total logarithmic sound energy summation.'
    ],
    benefitTitle: 'Logarithmic Decibel Summation Physics',
    benefitContent: 'Because decibels are logarithmic (power ratios), two identical noise sources (e.g. two 85 dB machines) do NOT add to 170 dB; they add to exactly 85 + 3.01 = 88.0 dB.',
    faqs: [{ q: 'What is the sum of two 90 dB sound sources?', a: '90 dB + 90 dB = exactly 93.01 dB.' }]
  },

  // 4. Musical Note Equal Temperament Frequency Calculator
  {
    slug: 'musical-note-frequency-equal-temperament-calculator',
    name: 'Equal Temperament Musical Note Frequency Calculator',
    description: 'Calculate fundamental musical pitch frequencies (f = 440 · 2^((n - 69) / 12) Hz) and MIDI note numbers based on A4 = 440 Hz standard concert pitch.',
    category: 'Daily',
    icon: 'text',
    keywords: ['musical note frequency calculator', 'equal temperament pitch calculator', 'midi note number to hz formula', 'a4 440 hz frequency chart online', 'piano key frequency online'],
    order: 379,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Note Name & Octave',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mus-note">Musical Note</label>
          <select class="tool-textarea" id="mus-note">
            <option value="0">C</option>
            <option value="1">C# / Db</option>
            <option value="2">D</option>
            <option value="3">D# / Eb</option>
            <option value="4">E</option>
            <option value="5">F</option>
            <option value="6">F# / Gb</option>
            <option value="7">G</option>
            <option value="8">G# / Ab</option>
            <option value="9" selected>A</option>
            <option value="10">A# / Bb</option>
            <option value="11">B</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="mus-oct">Octave</label>
          <select class="tool-textarea" id="mus-oct">
            <option value="0">0 (Sub-bass)</option>
            <option value="1">1</option>
            <option value="2">2 (Bass)</option>
            <option value="3">3</option>
            <option value="4" selected>4 (Middle C = C4, Concert A4 = 440Hz)</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8 (High Treble)</option>
          </select>
        </div>
      </div>
      <div id="mus-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mus-res-hz" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">440.00 Hz</span>
            <span class="stat-label">Fundamental Frequency (f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mus-res-midi" style="font-weight:700;">MIDI Note #69 (A4)</span>
            <span class="stat-label">MIDI Note Identifier</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mus-res-wlen">78.3 cm</span>
            <span class="stat-label">Acoustic Wavelength (in air)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('mus-note'), oEl = document.getElementById('mus-oct');
  const hzResEl = document.getElementById('mus-res-hz'), mResEl = document.getElementById('mus-res-midi'), wlResEl = document.getElementById('mus-res-wlen');

  function update() {
    const noteVal = parseInt(nEl.value, 10);
    const octVal = parseInt(oEl.value, 10);

    // MIDI note number: C4 = 60 => C0 = 12
    const midiNum = 12 + (octVal * 12) + noteVal;
    // f = 440 * 2^((midi - 69) / 12)
    const freqHz = 440 * Math.pow(2, (midiNum - 69) / 12);
    // Wavelength in air (c = 344.5 m/s at 22°C): lambda = c / f
    const wlenM = 344.5 / freqHz;
    const wlenCm = wlenM * 100;

    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const fullNoteName = noteNames[noteVal] + octVal;

    hzResEl.textContent = freqHz.toFixed(2) + ' Hz';
    mResEl.textContent = 'MIDI Note #' + midiNum + ' (' + fullNoteName + ')';
    wlResEl.textContent = wlenM >= 1.0 ? wlenM.toFixed(2) + ' meters' : wlenCm.toFixed(1) + ' cm';
  }

  nEl.addEventListener('change', update);
  oEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select musical pitch (C through B) and octave number (0 through 8).',
      'Inspect fundamental pitch frequency in Hertz (Hz), standard MIDI note number, and physical acoustic sound wavelength in air.'
    ],
    benefitTitle: '12-Tone Equal Temperament Semitone Ratio (2^(1/12))',
    benefitContent: 'Equal temperament divides the octave into 12 semitones, each spaced by a frequency factor of 2^(1/12) ≈ 1.059463, enabling instruments to play in all 12 musical keys without retuning.',
    faqs: [{ q: 'What is the frequency of Middle C (C4)?', a: 'Middle C (MIDI #60) has a fundamental frequency of 261.63 Hz.' }]
  },

  // 5. Equalizer Filter Q-Factor to Bandwidth (Octaves) Calculator
  {
    slug: 'equalizer-q-factor-bandwidth-octaves-calculator',
    name: 'Audio Equalizer Q-Factor to Bandwidth (Octaves) Calculator',
    description: 'Convert parametric equalizer Q-factor (Quality factor) to bandwidth in musical octaves (N = 2 · log₂( (1/(2Q)) + √( (1/(2Q))² + 1 ) )) and center frequency cutoff span.',
    category: 'Daily',
    icon: 'text',
    keywords: ['eq q factor to octaves calculator', 'audio equalizer bandwidth calculator', 'q factor to octave formula', 'parametric eq bandwidth q calculator online', 'audio filter q factor chart'],
    order: 380,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Filter Q-Factor & Center Frequency (Hz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eq-q">Filter Q-Factor</label>
          <input class="tool-textarea" id="eq-q" type="number" step="any" value="1.414" placeholder="1.414 (Standard 1-Octave)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-fc">Center Frequency f₀ (Hz)</label>
          <input class="tool-textarea" id="eq-fc" type="number" step="any" value="1000" placeholder="1000 Hz" />
        </div>
      </div>
      <div id="eq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eq-res-oct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.00 Octaves</span>
            <span class="stat-label">Bandwidth in Octaves (N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eq-res-span" style="font-weight:700;">707 Hz to 1,414 Hz</span>
            <span class="stat-label">-3 dB Passband Range (f_L to f_H)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('eq-q'), fcEl = document.getElementById('eq-fc');
  const octResEl = document.getElementById('eq-res-oct'), spResEl = document.getElementById('eq-res-span');

  function update() {
    const Q = parseFloat(qEl.value), fc = parseFloat(fcEl.value);
    if (isNaN(Q) || isNaN(fc) || Q <= 0 || fc <= 0) return;

    // N (octaves) = (2 / ln(2)) * asinh(1 / (2*Q))
    const N = (2 / Math.LN2) * Math.asinh(1 / (2 * Q));

    // f_L and f_H bounds
    const fL = fc * (Math.sqrt(1 + (1 / (4 * Math.pow(Q, 2)))) - (1 / (2 * Q)));
    const fH = fc * (Math.sqrt(1 + (1 / (4 * Math.pow(Q, 2)))) + (1 / (2 * Q)));

    octResEl.textContent = N.toFixed(2) + ' Octaves';
    spResEl.textContent = Math.round(fL) + ' Hz to ' + Math.round(fH) + ' Hz (Δf = ' + Math.round(fH - fL) + ' Hz)';
  }

  qEl.addEventListener('input', update);
  fcEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter parametric equalizer Q-factor value (e.g. Q = 0.707 wide, Q = 1.414 one-octave, Q = 4.3 narrow notch).',
      'Enter filter center frequency f₀ in Hertz.',
      'Inspect bandwidth in musical octaves (N) and exact lower/upper -3 dB cutoff frequencies.'
    ],
    benefitTitle: 'Parametric Equalizer Audio Precision',
    benefitContent: 'Robert Bristow-Johnson\'s Audio EQ Cookbook formulas establish the mathematical link between filter sharpness Q and musical bandwidth: higher Q values narrow the filter to surgically remove resonant hum without affecting neighboring musical pitches.',
    faqs: [{ q: 'What Q-factor corresponds to a 1.0 octave bandwidth?', a: 'Q = 1 / (2 · sinh(ln(2)/2)) ≈ 1.4142 (√2).' }]
  }
];

toolsSuiteMM.forEach(createTool);
console.log('Suite MM complete: 5 tools created.');
