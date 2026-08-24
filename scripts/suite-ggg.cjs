const { createTool } = require('./generate-curated-tools.cjs');

// Suite GGG: 5 Tools in Acoustics, Building Noise Control, STC & OSHA Noise Dose to reach 605 tools
const toolsSuiteGGG = [
  // 1. Noise Reduction Coefficient (NRC) Room Acoustics Calculator
  {
    slug: 'noise-reduction-coefficient-nrc-calculator',
    name: 'Noise Reduction Coefficient (NRC) & Sound Absorption Calculator',
    description: 'Calculate average Noise Reduction Coefficient (NRC = (α₂₅₀ + α₅₀₀ + α₁₀₀₀ + α₂₀₀₀) / 4) and total room metric absorption Sabins (A = Σ S · α) for acoustic wall panels.',
    category: 'Science',
    icon: 'text',
    keywords: ['nrc calculator', 'noise reduction coefficient formula', 'sound absorption sabins calculator', 'acoustic panel nrc rating online', 'astm c423 sound absorption calculator'],
    order: 478,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sound Absorption Coefficients (α) across Octave Bands',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nrc-250">250 Hz (α)</label>
          <input class="tool-textarea" id="nrc-250" type="number" step="0.05" min="0" max="1.5" value="0.30" placeholder="0.30" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-500">500 Hz (α)</label>
          <input class="tool-textarea" id="nrc-500" type="number" step="0.05" min="0" max="1.5" value="0.75" placeholder="0.75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-1000">1000 Hz (α)</label>
          <input class="tool-textarea" id="nrc-1000" type="number" step="0.05" min="0" max="1.5" value="1.00" placeholder="1.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-2000">2000 Hz (α)</label>
          <input class="tool-textarea" id="nrc-2000" type="number" step="0.05" min="0" max="1.5" value="0.95" placeholder="0.95" />
        </div>
      </div>
      <div id="nrc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nrc-res-nrc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.75 NRC</span>
            <span class="stat-label">Calculated ASTM C423 NRC Rating</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nrc-res-perf" style="font-weight:700;">Class B Sound Absorber (Highly Effective)</span>
            <span class="stat-label">ISO 11654 Absorber Class</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a250El = document.getElementById('nrc-250'), a500El = document.getElementById('nrc-500');
  const a1000El = document.getElementById('nrc-1000'), a2000El = document.getElementById('nrc-2000');
  const nrcResEl = document.getElementById('nrc-res-nrc'), pResEl = document.getElementById('nrc-res-perf');

  function update() {
    const a250 = parseFloat(a250El.value), a500 = parseFloat(a500El.value);
    const a1000 = parseFloat(a1000El.value), a2000 = parseFloat(a2000El.value);

    if (isNaN(a250) || isNaN(a500) || isNaN(a1000) || isNaN(a2000) || a250 < 0 || a500 < 0 || a1000 < 0 || a2000 < 0) return;

    // NRC is arithmetic average rounded to nearest 0.05
    const rawNrc = (a250 + a500 + a1000 + a2000) / 4;
    const roundedNrc = Math.round(rawNrc / 0.05) * 0.05;

    nrcResEl.textContent = roundedNrc.toFixed(2) + ' NRC (Raw: ' + rawNrc.toFixed(3) + ')';

    if (roundedNrc >= 0.90) {
      pResEl.textContent = 'Class A Absorber (Maximum Echo & Reverberation Control)';
      pResEl.style.color = '#22543d';
    } else if (roundedNrc >= 0.70) {
      pResEl.textContent = 'Class B Absorber (Highly Effective Acoustic Foam/Fiberglass)';
      pResEl.style.color = '#22543d';
    } else if (roundedNrc >= 0.50) {
      pResEl.textContent = 'Class C Absorber (Moderate Acoustic Ceiling Tiles)';
      pResEl.style.color = '#2563eb';
    } else {
      pResEl.textContent = 'Hard Reflective Surface (Low Sound Absorption)';
      pResEl.style.color = '#c53030';
    }
  }

  [a250El, a500El, a1000El, a2000El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laboratory measured sound absorption coefficients α at 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.',
      'Inspect ASTM C423 Noise Reduction Coefficient (NRC) rounded to the standard nearest 0.05 increment and ISO sound absorption classification.'
    ],
    benefitTitle: 'ASTM C423 Single-Number Rating Standard',
    benefitContent: 'NRC simplifies complex frequency-dependent sound absorption curves into a single practical metric between 0.00 (perfect concrete acoustic reflection) and 1.00+ (100% sound absorption by dense mineral wool).',
    faqs: [{ q: 'Can an NRC rating exceed 1.00?', a: 'Yes, 3D laboratory test specimens absorb sound along exposed side edges, allowing thick acoustic panels to achieve test ratings of 1.05 to 1.15 NRC.' }]
  },

  // 2. Sound Transmission Class (STC) Mass Law Wall Partition Calculator
  {
    slug: 'sound-transmission-class-stc-mass-law-calculator',
    name: 'Sound Transmission Class (STC) Acoustic Mass Law Calculator',
    description: 'Estimate wall sound transmission loss (TL = 20 · log₁₀(m) + 20 · log₁₀(f) - 47.5) in decibels (dB) and approximate STC rating from surface mass density (lb/ft² or kg/m²).',
    category: 'Science',
    icon: 'text',
    keywords: ['stc calculator wall soundproofing', 'sound transmission class formula', 'acoustic mass law calculator online', 'wall surface density stc estimation', 'partition sound transmission loss calculator'],
    order: 479,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wall Surface Mass Density (lb/ft² or kg/m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stc-mass">Surface Mass (lb / ft²)</label>
          <input class="tool-textarea" id="stc-mass" type="number" step="any" value="5.5" placeholder="5.5 lb/ft² (Double Drywall)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="stc-freq">Frequency f (Hz)</label>
          <input class="tool-textarea" id="stc-freq" type="number" step="any" value="500" placeholder="500 Hz" />
        </div>
      </div>
      <div id="stc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stc-res-stc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">STC ~42</span>
            <span class="stat-label">Estimated Partition STC Rating</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stc-res-tl" style="font-weight:700;">38.3 dB Loss @ 500 Hz</span>
            <span class="stat-label">Transmission Loss (Mass Law)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('stc-mass'), fEl = document.getElementById('stc-freq');
  const stcResEl = document.getElementById('stc-res-stc'), tlResEl = document.getElementById('stc-res-tl');

  function update() {
    const massPsf = parseFloat(mEl.value), fHz = parseFloat(fEl.value);
    if (isNaN(massPsf) || isNaN(fHz) || massPsf <= 0 || fHz <= 0) return;

    // Imperial mass law: TL (dB) = 20 * log10(m_psf) + 20 * log10(f_Hz) - 33.5
    const tlDb = 20 * Math.log10(massPsf) + 20 * Math.log10(fHz) - 33.5;
    // Empirical STC estimate for homogeneous partitions: STC ≈ 20 * log10(m_psf) + 28
    const approxStc = Math.round(20 * Math.log10(massPsf) + 28);

    stcResEl.textContent = 'STC ~' + approxStc + ' (' + (approxStc >= 50 ? 'Loud Speech Inaudible' : (approxStc >= 40 ? 'Muffled Speech' : 'Normal Speech Audible')) + ')';
    tlResEl.textContent = tlDb.toFixed(1) + ' dB Transmission Loss @ ' + fHz + ' Hz (' + (massPsf * 4.8824).toFixed(1) + ' kg/m²)';
  }

  mEl.addEventListener('input', update);
  fEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter wall or barrier total surface weight in pounds per square foot (lb/ft² or PSF).',
      'Enter sound test frequency in Hertz (Hz) (typically 500 Hz speech midpoint).',
      'Inspect transmission loss in dB and estimated Sound Transmission Class (STC) privacy performance.'
    ],
    benefitTitle: 'Acoustic Mass Law (6 dB per Mass Doubling)',
    benefitContent: 'Doubling the physical mass of a monolithic single-leaf partition increases sound insulation transmission loss by approximately 6 dB across the entire audio frequency spectrum.',
    faqs: [{ q: 'What STC rating is required for luxury multifamily apartments?', a: 'Building codes (IBC Section 1206) require a minimum STC of 50 between dwelling units to ensure speech privacy.' }]
  },

  // 3. OSHA Daily Noise Dose & TWA (Time-Weighted Average) Calculator
  {
    slug: 'osha-daily-noise-dose-twa-calculator',
    name: 'OSHA Occupational Noise Dose & 8-Hour TWA Calculator',
    description: 'Calculate occupational daily noise exposure dose percentage (Dose % = 100 · Σ (C_i / T_i)) and 8-hour Time-Weighted Average (TWA = 16.61 · log₁₀(D / 100) + 90) per OSHA 29 CFR 1910.95.',
    category: 'Science',
    icon: 'text',
    keywords: ['osha noise dose calculator', 'twa noise exposure formula', 'time weighted average decibel calculator', 'daily noise dose percentage 1910 95', 'occupational hearing conservation calculator online'],
    order: 480,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Continuous Noise Exposure Level (dBA) & Duration (Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="osh-dba">Noise Level (dBA)</label>
          <input class="tool-textarea" id="osh-dba" type="number" step="any" value="95" placeholder="95 dBA (Workshop Machinery)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osh-hrs">Exposure Time (Hours)</label>
          <input class="tool-textarea" id="osh-hrs" type="number" step="any" value="4.0" placeholder="4.0 Hours" />
        </div>
      </div>
      <div id="osh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="osh-res-dose" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">100.0% Noise Dose</span>
            <span class="stat-label">Daily Permissible Noise Dose</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="osh-res-twa" style="font-weight:700;">90.0 dBA (8-Hr TWA)</span>
            <span class="stat-label">OSHA Permissible Exposure Limit (PEL)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dbaEl = document.getElementById('osh-dba'), hrsEl = document.getElementById('osh-hrs');
  const dsResEl = document.getElementById('osh-res-dose'), twResEl = document.getElementById('osh-res-twa');

  function update() {
    const L = parseFloat(dbaEl.value), C = parseFloat(hrsEl.value);
    if (isNaN(L) || isNaN(C) || L <= 0 || C < 0) return;

    // OSHA 5 dB exchange rate reference duration T = 8 / ( 2^( (L - 90) / 5 ) )  [hours]
    const T = 8 / Math.pow(2, (L - 90) / 5);
    // Dose % = (C / T) * 100
    const dosePct = (C / T) * 100;
    // 8-hour TWA = 16.61 * log10(Dose / 100) + 90
    const twa = dosePct > 0 ? 16.61 * Math.log10(dosePct / 100) + 90 : 0;

    dsResEl.textContent = dosePct.toFixed(1) + '% Daily Dose';

    if (dosePct > 100) {
      dsResEl.style.color = '#c53030';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (EXCEEDS 100% OSHA PEL: Hearing Protection Required)';
      twResEl.style.color = '#c53030';
    } else if (dosePct >= 50) {
      dsResEl.style.color = '#d97706';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (Exceeds 50% Action Level: Hearing Conservation Program)';
      twResEl.style.color = '#d97706';
    } else {
      dsResEl.style.color = '#22543d';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (Within Safe 8-Hour OSHA Limits)';
      twResEl.style.color = '#22543d';
    }
  }

  dbaEl.addEventListener('input', update);
  hrsEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter A-weighted sound level in dBA.',
      'Enter daily duration of exposure in hours.',
      'Inspect OSHA percentage noise dose and 8-hour Time-Weighted Average (TWA) compliance status.'
    ],
    benefitTitle: 'OSHA 5 dB Exchange Rate Standard',
    benefitContent: 'OSHA regulations enforce a 5 dB halving rule: maximum permissible daily exposure is 8 hours at 90 dBA, 4 hours at 95 dBA, 2 hours at 100 dBA, and only 1 hour at 105 dBA.',
    faqs: [{ q: 'What is the OSHA Action Level for hearing conservation?', a: 'An 8-hour TWA of 85 dBA (equivalent to a 50% daily noise dose) mandates mandatory annual audiometric hearing testing and employee training.' }]
  },

  // 4. Acoustic Loudness in Phons & Sones (ISO 226 Equal-Loudness) Calculator
  {
    slug: 'acoustic-loudness-phons-sones-calculator',
    name: 'Acoustic Loudness (Phons to Sones) Calculator',
    description: 'Convert subjective human loudness between Phons and linear Sones (Sones = 2^((Phon - 40) / 10)) according to ISO 226 psychoacoustic standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['phons to sones calculator', 'psychoacoustic loudness calculator online', 'sones formula 2 to the phon minus 40 over 10', 'iso 226 equal loudness calculator', 'bathroom fan sones to phons converter'],
    order: 481,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Loudness Level in Phons (40 to 120 Phons)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="ph-val">Loudness Level (Phons)</label>
        <input class="tool-textarea" id="ph-val" type="number" min="10" max="130" value="70" placeholder="70 Phons (Normal Conversation)" />
      </div>
      <div id="ph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ph-res-sone" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.00 Sones</span>
            <span class="stat-label">Linear Subjective Loudness</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-desc" style="font-weight:700;">8x as loud as 40 Phons (1 Sone)</span>
            <span class="stat-label">Human Perceived Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('ph-val');
  const sResEl = document.getElementById('ph-res-sone'), dResEl = document.getElementById('ph-res-desc');

  function update() {
    const phons = parseFloat(phEl.value);
    if (isNaN(phons) || phons < 0) return;

    // Sones = 2^( (Phons - 40) / 10 )
    const sones = Math.pow(2, (phons - 40) / 10);

    sResEl.textContent = sones >= 1.0 ? sones.toFixed(2) + ' Sones' : sones.toFixed(3) + ' Sones';
    dResEl.textContent = (sones).toFixed(1) + 'x as loud as reference 40 Phons (1 kHz @ 40 dB SPL)';
  }

  phEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter subjective loudness level in Phons (numerically equal to dB SPL at 1,000 Hz).',
      'Inspect linear psychoacoustic loudness in Sones.'
    ],
    benefitTitle: 'Stanley Smith Stevens\' Power Law of Hearing',
    benefitContent: 'While decibels and Phons are logarithmic, Sones provide a direct linear scale of human hearing perception: an 8-Sone sound is perceived by human listeners as exactly twice as loud as a 4-Sone sound.',
    faqs: [{ q: 'What is 1 Sone defined as?', a: '1 Sone is defined as the perceived loudness of a 1,000 Hz pure tone at a sound pressure level of 40 dB SPL (40 Phons).' }]
  },

  // 5. Equivalent Continuous Sound Level (L_eq) Time-Average Calculator
  {
    slug: 'equivalent-continuous-sound-level-leq-calculator',
    name: 'Equivalent Continuous Sound Level (L_eq) Calculator',
    description: 'Calculate energy-averaged equivalent continuous sound level (L_eq = 10 · log₁₀( 1/T · Σ t_i · 10^(L_i / 10) )) in dBA from fluctuating environmental noise intervals.',
    category: 'Science',
    icon: 'text',
    keywords: ['leq calculator acoustic', 'equivalent continuous sound level formula', 'energy average decibel leq calculator online', 'environmental noise leq calculator', 'time weighted sound energy average online'],
    order: 482,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Noise Event Levels in dBA (Comma Separated)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="leq-in">Sound Level Intervals in dBA (Equal Durations)</label>
        <input class="tool-textarea" id="leq-in" type="text" value="65, 80, 55, 92, 70" placeholder="65, 80, 55, 92, 70" />
      </div>
      <div id="leq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="leq-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">85.3 dBA (L_eq)</span>
            <span class="stat-label">Energy-Averaged Continuous Level (L_eq)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="leq-res-arith" style="font-weight:700;">72.4 dBA Simple Average</span>
            <span class="stat-label">Arithmetic Mean (Misleading Underestimate)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('leq-in');
  const leqResEl = document.getElementById('leq-res-val'), arResEl = document.getElementById('leq-res-arith');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const nums = raw.split(/[,\\s\\t]+/).map(Number).filter(v => !isNaN(v) && v > 0);
    if (nums.length === 0) return;

    // L_eq = 10 * log10( 1/N * sum( 10^(L_i / 10) ) )
    let sumEnergy = 0;
    let arithSum = 0;
    for (const val of nums) {
      sumEnergy += Math.pow(10, val / 10);
      arithSum += val;
    }

    const meanEnergy = sumEnergy / nums.length;
    const leq = 10 * Math.log10(meanEnergy);
    const arithMean = arithSum / nums.length;

    leqResEl.textContent = leq.toFixed(1) + ' dBA (L_eq)';
    arResEl.textContent = arithMean.toFixed(1) + ' dBA Arithmetic Mean (Energy Diff +' + (leq - arithMean).toFixed(1) + ' dB)';
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter sequence of measured sound pressure level samples in dBA (comma or space separated).',
      'Inspect true energy-averaged equivalent continuous sound level (L_eq).'
    ],
    benefitTitle: 'Why Simple Arithmetic Averages Fail in Acoustics',
    benefitContent: 'Because sound energy is logarithmic, brief intense noise spikes (e.g. a single 92 dBA passing truck) dominate the total acoustic energy exposure, making L_eq far higher than a misleading simple arithmetic mean.',
    faqs: [{ q: 'What is L_eq?', a: 'L_eq is the constant continuous sound level that contains the exact same total acoustic sound energy as the actual fluctuating noise over the measured time interval.' }]
  }
];

toolsSuiteGGG.forEach(createTool);
console.log('Suite GGG complete: 5 tools created.');
