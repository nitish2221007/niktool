const { createTool } = require('./generate-curated-tools.cjs');

// Suite Y: 5 Tools in Lighting Lux, Room Acoustics, Audio Engineering & Speaker Sizing
const toolsSuiteY = [
  // 1. Lux to Foot-Candles & Illuminance Converter
  {
    slug: 'lux-to-foot-candles-lumens-converter',
    name: 'Lux to Foot-Candles Illuminance Converter',
    description: 'Convert surface illumination light levels across Lux (lx, Lumens/m²), Foot-Candles (fc, Lumens/ft²), and Watts/m² for architectural lighting design.',
    category: 'Daily',
    icon: 'text',
    keywords: ['lux to foot candles converter', 'foot candles to lux calculator', 'illuminance converter online', 'lumens per square foot to lux', 'office lighting lux standards'],
    order: 304,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Simultaneous Illuminance Matrix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lx-lux">Illuminance in Lux (lx = lm/m²)</label>
          <input class="tool-textarea" id="lx-lux" type="number" step="any" value="500" placeholder="500 lx (Office Standard)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lx-fc">Foot-Candles (fc = lm/ft²)</label>
          <input class="tool-textarea" id="lx-fc" type="number" step="any" placeholder="fc" />
        </div>
      </div>
      <div id="lx-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lx-res-desc" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">Office Workstation / Classroom</span>
            <span class="stat-label">IES Recommended Environment</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lx-res-sun">0.50% of Direct Sunlight</span>
            <span class="stat-label">Sunlight Comparison (100k lx)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const luxEl = document.getElementById('lx-lux'), fcEl = document.getElementById('lx-fc');
  const descEl = document.getElementById('lx-res-desc'), sunEl = document.getElementById('lx-res-sun');

  function updateFromLux(lux) {
    // 1 fc = 10.7639 lux => fc = lux / 10.7639
    const fc = lux / 10.7639;
    fcEl.value = fc.toFixed(2);

    if (lux < 20) descEl.textContent = 'Night / Emergency Lighting (<20 lx)';
    else if (lux < 150) descEl.textContent = 'Hallway / Corridor (50 - 150 lx)';
    else if (lux < 300) descEl.textContent = 'Living Room / Casual Retail (150 - 300 lx)';
    else if (lux < 750) descEl.textContent = 'Office Workstation / Classroom (500 lx)';
    else if (lux < 2000) descEl.textContent = 'Precision Drafting / Surgery (1,000 - 2,000 lx)';
    else descEl.textContent = 'Direct Sunlight / Television Studio (10,000+ lx)';

    sunEl.textContent = ((lux / 100000) * 100).toFixed(2) + '% of Direct Sunlight (100,000 lx)';
  }

  luxEl.addEventListener('input', () => {
    const v = parseFloat(luxEl.value);
    if (!isNaN(v)) updateFromLux(v);
  });

  fcEl.addEventListener('input', () => {
    const v = parseFloat(fcEl.value);
    if (!isNaN(v)) {
      const lux = v * 10.7639;
      luxEl.value = lux.toFixed(1);
      updateFromLux(lux);
    }
  });

  updateFromLux(500);
})();`,
    howToSteps: [
      'Enter illumination in Lux or Foot-Candles.',
      'Inspect standard Illuminating Engineering Society (IES) architectural workplace lighting classifications.'
    ],
    benefitTitle: 'Photometric SI vs Imperial Standards',
    benefitContent: '1 Foot-Candle equals exactly 1 Lumen per square foot ≈ 10.7639 Lux (Lumens per square meter).',
    faqs: [{ q: 'What is standard office lighting in Lux?', a: 'Standard commercial desktop workspace lighting requires approximately 500 Lux (46.5 Foot-Candles).' }]
  },

  // 2. Sabine Reverberation Time (RT60) Room Acoustics Calculator
  {
    slug: 'reverberation-time-rt60-sabine-calculator',
    name: 'Sabine Reverberation Time (RT60) Acoustics Calculator',
    description: 'Calculate acoustic reverberation decay time (RT60 = 0.161 · V / A) in seconds from room volume and total Sabin absorption coefficients.',
    category: 'Science',
    icon: 'text',
    keywords: ['rt60 calculator', 'reverberation time calculator acoustics', 'sabine formula rt60 online', 'recording studio acoustics calculator', 'room echo absorption rt60'],
    order: 305,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Room Dimensions (Meters) & Absorption Coefficient',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rt-len">Length (m)</label>
          <input class="tool-textarea" id="rt-len" type="number" step="any" value="6.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-wid">Width (m)</label>
          <input class="tool-textarea" id="rt-wid" type="number" step="any" value="4.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-ht">Height (m)</label>
          <input class="tool-textarea" id="rt-ht" type="number" step="any" value="2.8" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-alpha">Average Absorption (α)</label>
          <select class="tool-textarea" id="rt-alpha">
            <option value="0.10">Bare Concrete / Hardwood (α = 0.10)</option>
            <option value="0.25" selected>Furnished Living Room (α = 0.25)</option>
            <option value="0.55">Acoustic Foam / Studio (α = 0.55)</option>
          </select>
        </div>
      </div>
      <div id="rt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rt-res-time" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.42 seconds</span>
            <span class="stat-label">Reverberation Time (RT60)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rt-res-vol">67.2 m³</span>
            <span class="stat-label">Total Room Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('rt-len'), wEl = document.getElementById('rt-wid'), hEl = document.getElementById('rt-ht'), aEl = document.getElementById('rt-alpha');
  const tEl = document.getElementById('rt-res-time'), vEl = document.getElementById('rt-res-vol');

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), H = parseFloat(hEl.value), alpha = parseFloat(aEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(H) || isNaN(alpha) || L <= 0 || W <= 0 || H <= 0 || alpha <= 0) return;

    // Room volume V = L * W * H
    const V = L * W * H;
    // Total boundary surface area S = 2*(LW + LH + WH)
    const S = 2 * (L * W + L * H + W * H);
    // Total absorption A = S * alpha (metric Sabins)
    const A = S * alpha;
    // RT60 = 0.161 * V / A
    const rt60 = (0.161 * V) / A;

    tEl.textContent = rt60.toFixed(2) + ' seconds';
    vEl.textContent = V.toFixed(1) + ' m³ (' + S.toFixed(1) + ' m² surfaces)';
  }

  [lEl, wEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter room length, width, and ceiling height in meters.',
      'Select acoustic absorption material treatment preset.',
      'Inspect the RT60 time required for sound energy to decay by 60 decibels.'
    ],
    benefitTitle: 'Wallace Clement Sabine\'s Formula',
    benefitContent: 'Sabine discovered in 1898 that acoustic clarity requires matching RT60 to purpose: 0.3-0.5s for speech/podcasts, 0.8-1.2s for chamber music, and 1.8-2.2s for symphonic concert halls.',
    faqs: [{ q: 'What does RT60 mean?', a: 'The time in seconds required for sound reflections to drop by 60 dB (1 millionth of original intensity).' }]
  },

  // 3. Audio File Size & Uncompressed Bitrate Calculator
  {
    slug: 'audio-sample-rate-file-size-calculator',
    name: 'Audio Bitrate & Uncompressed File Size Calculator',
    description: 'Calculate raw audio data bitrate (kbps) and file size (MB/GB) from Sample Rate (44.1kHz, 48kHz, 96kHz, 192kHz), Bit Depth (16b, 24b, 32b), and channel count.',
    category: 'Developer',
    icon: 'code',
    keywords: ['audio file size calculator', 'pcm audio bitrate calculator', 'wav file size sample rate formula', '24 bit 96khz file size calculator', 'uncompressed audio storage calculator online'],
    order: 306,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Sample Rate, Bit Depth & Track Duration',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="aud-sr">Sample Rate</label>
          <select class="tool-textarea" id="aud-sr">
            <option value="44100" selected>44.1 kHz (CD Audio)</option>
            <option value="48000">48.0 kHz (Video / Broadcast)</option>
            <option value="96000">96.0 kHz (Hi-Res Audio)</option>
            <option value="192000">192.0 kHz (Studio Master)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="aud-depth">Bit Depth</label>
          <select class="tool-textarea" id="aud-depth">
            <option value="16" selected>16-bit (Standard)</option>
            <option value="24">24-bit (Hi-Res Studio)</option>
            <option value="32">32-bit Float (DAW Recording)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="aud-ch">Channels</label>
          <select class="tool-textarea" id="aud-ch">
            <option value="1">1 (Mono)</option>
            <option value="2" selected>2 (Stereo)</option>
            <option value="6">5.1 Surround (6 Channels)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="aud-mins">Duration (Mins)</label>
          <input class="tool-textarea" id="aud-mins" type="number" step="any" value="5.0" placeholder="5.0 mins" />
        </div>
      </div>
      <div id="aud-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="aud-res-size" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.46 MB</span>
            <span class="stat-label">Uncompressed WAV File Size</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="aud-res-br" style="font-weight:700;">1,411.2 kbps</span>
            <span class="stat-label">Raw PCM Bitrate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const srEl = document.getElementById('aud-sr'), dEl = document.getElementById('aud-depth');
  const chEl = document.getElementById('aud-ch'), mEl = document.getElementById('aud-mins');
  const sResEl = document.getElementById('aud-res-size'), bResEl = document.getElementById('aud-res-br');

  function update() {
    const sr = parseFloat(srEl.value), depth = parseFloat(dEl.value), ch = parseFloat(chEl.value), mins = parseFloat(mEl.value);
    if (isNaN(sr) || isNaN(depth) || isNaN(ch) || isNaN(mins) || mins <= 0) return;

    // Bitrate = sample_rate * bit_depth * channels (bits per second)
    const bps = sr * depth * ch;
    const kbps = bps / 1000;

    // Total bytes = (bps / 8) * (mins * 60)
    const totalBytes = (bps / 8) * (mins * 60);
    const totalMb = totalBytes / (1024 * 1024);

    sResEl.textContent = totalMb >= 1000 ? (totalMb / 1024).toFixed(2) + ' GB' : totalMb.toFixed(2) + ' MB';
    bResEl.textContent = Math.round(kbps).toLocaleString() + ' kbps (' + (kbps / 8).toFixed(1) + ' kB/s)';
  }

  [srEl, dEl, chEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select sample rate (44.1 kHz to 192 kHz), bit depth (16-bit to 32-bit float), and channels.',
      'Enter audio duration in minutes.',
      'Inspect uncompressed WAV/PCM file size and streaming bitrate.'
    ],
    benefitTitle: 'Nyquist-Shannon Sampling Theorem',
    benefitContent: 'CD quality uses 44.1 kHz sampling to capture all audio frequencies up to the 20 kHz human hearing limit (f_nyquist = 22.05 kHz) at 1,411.2 kbps stereo bitrate.',
    faqs: [{ q: 'What is the bitrate of standard CD Audio?', a: '44,100 Hz × 16 bits × 2 channels = 1,411,200 bits/sec = 1,411.2 kbps.' }]
  },

  // 4. LED Lumens to Watts Equivalent Calculator
  {
    slug: 'led-lumens-to-watts-equivalent-calculator',
    name: 'LED Lumens to Watts Equivalent & Energy Savings Calculator',
    description: 'Compare luminous brightness (Lumens) across LED, CFL, and traditional Incandescent light bulbs with electricity energy savings.',
    category: 'Daily',
    icon: 'text',
    keywords: ['lumens to watts calculator', 'led wattage equivalent calculator', 'incandescent to led lumens chart', 'light bulb energy savings calculator', 'cfl led wattage replacement online'],
    order: 307,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Desired Luminous Brightness (Lumens)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="led-lumens">Target Brightness (Lumens lm)</label>
        <input class="tool-textarea" id="led-lumens" type="number" step="any" value="800" placeholder="800 lm (Standard 60W Replacement)" />
      </div>
      <div id="led-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="led-res-led" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9 Watts LED</span>
            <span class="stat-label">Modern LED Power Draw</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="led-res-inc" style="font-weight:700;">60 Watts</span>
            <span class="stat-label">Legacy Incandescent</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="led-res-cfl">14 Watts</span>
            <span class="stat-label">CFL Fluorescent</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('led-lumens');
  const ledEl = document.getElementById('led-res-led'), incEl = document.getElementById('led-res-inc'), cflEl = document.getElementById('led-res-cfl');

  function update() {
    const lumens = parseFloat(lEl.value);
    if (isNaN(lumens) || lumens <= 0) return;

    // Luminous Efficacy:
    // LED: ~90 lm/W
    // CFL: ~60 lm/W
    // Incandescent: ~14 lm/W
    const wattsLed = Math.round(lumens / 90);
    const wattsCfl = Math.round(lumens / 60);
    const wattsInc = Math.round(lumens / 14);

    ledEl.textContent = Math.max(1, wattsLed) + ' Watts LED';
    cflEl.textContent = Math.max(2, wattsCfl) + ' Watts CFL';
    incEl.textContent = Math.max(5, wattsInc) + ' Watts Incandescent';
  }

  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter target room light brightness in Lumens (e.g. 450 lm for desk lamp, 800 lm for bedroom, 1,600 lm for living room).',
      'Inspect equivalent power wattages required by LED, CFL, and Incandescent bulbs.'
    ],
    benefitTitle: '85% Energy Reduction with Solid-State LEDs',
    benefitContent: 'Incandescent tungsten filaments convert 90% of electricity into waste heat and only 10% into light. LEDs generate 80-100+ Lumens per Watt, reducing electric lighting bills by up to 85%.',
    faqs: [{ q: 'What LED wattage replaces a 60W incandescent bulb?', a: 'An 8 to 9 Watt LED bulb produces the same 800 Lumens as a traditional 60 Watt incandescent bulb.' }]
  },

  // 5. Speaker Wire Gauge & Line Resistance Calculator
  {
    slug: 'speaker-wire-gauge-power-loss-calculator',
    name: 'Speaker Wire Gauge (AWG) & Power Loss Calculator',
    description: 'Calculate speaker cable loop resistance (Ohms), damping factor loss, and audio decibel power attenuation across wire length and gauge (12 AWG to 18 AWG).',
    category: 'Daily',
    icon: 'text',
    keywords: ['speaker wire gauge calculator', 'awg speaker cable loss calculator', 'speaker wire damping factor formula', 'audio cable power loss decibels', 'speaker cable resistance online'],
    order: 308,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Wire Gauge (AWG), Run Length & Speaker Impedance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spk-awg">Wire Gauge (AWG)</label>
          <select class="tool-textarea" id="spk-awg">
            <option value="12">12 AWG (Heavy Audiophile / Long Run)</option>
            <option value="14">14 AWG (Standard High Quality)</option>
            <option value="16" selected>16 AWG (Typical Home Audio)</option>
            <option value="18">18 AWG (Thin / Short Run)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="spk-len">One-Way Length (Meters)</label>
          <input class="tool-textarea" id="spk-len" type="number" step="any" value="10" placeholder="10 meters (33 ft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spk-ohms">Speaker Impedance (Ω)</label>
          <select class="tool-textarea" id="spk-ohms">
            <option value="4">4 Ohms (Car Audio / Studio Monitor)</option>
            <option value="8" selected>8 Ohms (Standard Home Hi-Fi)</option>
          </select>
        </div>
      </div>
      <div id="spk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spk-res-res" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.264 Ω</span>
            <span class="stat-label">Total Loop Resistance (2x run)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spk-res-loss" style="font-weight:700;">-0.28 dB (3.2%)</span>
            <span class="stat-label">Signal Power Loss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const awgEl = document.getElementById('spk-awg'), lEl = document.getElementById('spk-len'), zEl = document.getElementById('spk-ohms');
  const resEl = document.getElementById('spk-res-res'), lossEl = document.getElementById('spk-res-loss');

  // Resistance per 1000m (Ohms / km) for copper
  const AWG_RES = { '12': 5.21, '14': 8.28, '16': 13.17, '18': 20.95 };

  function update() {
    const awg = awgEl.value;
    const lenM = parseFloat(lEl.value);
    const zSpk = parseFloat(zEl.value);
    if (isNaN(lenM) || isNaN(zSpk) || lenM <= 0 || zSpk <= 0) return;

    // Loop resistance = 2 conductors * length (km) * Ohms/km
    const rPerKm = AWG_RES[awg] || 13.17;
    const rLoop = 2 * (lenM / 1000) * rPerKm;

    // Voltage divider attenuation = zSpk / (zSpk + rLoop)
    const voltRatio = zSpk / (zSpk + rLoop);
    const dbLoss = 20 * Math.log10(voltRatio);
    const powerLossPct = (1 - Math.pow(voltRatio, 2)) * 100;

    resEl.textContent = rLoop.toFixed(3) + ' Ω';
    lossEl.textContent = dbLoss.toFixed(2) + ' dB (' + powerLossPct.toFixed(1) + '% Power Loss)';
  }

  [awgEl, lEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select speaker wire gauge (12, 14, 16, or 18 AWG).',
      'Enter distance from amplifier receiver to loudspeaker in meters.',
      'Select speaker impedance (4Ω or 8Ω).',
      'Inspect round-trip cable resistance and decibel audio signal attenuation.'
    ],
    benefitTitle: 'The 5% Wire Resistance Hi-Fi Rule',
    benefitContent: 'Acoustic engineers recommend keeping speaker cable loop resistance below 5% of speaker nominal impedance (less than 0.40 Ω for 8Ω speakers) to prevent audible bass damping degradation.',
    faqs: [{ q: 'What gauge wire is recommended for a 15-meter run to 4-ohm speakers?', a: 'For long runs to 4-ohm speakers, 12 AWG or 14 AWG heavy copper wire prevents audible power loss.' }]
  }
];

toolsSuiteY.forEach(createTool);
console.log('Suite Y complete: 5 tools created.');
