const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch4 = [
  // 1. Morse Code Audio Translator
  {
    slug: 'morse-code-audio-translator',
    name: 'Morse Code Audio Translator',
    description: 'Convert plain text to International Morse Code and listen to realistic audio beeps generated in real time using the Web Audio API.',
    category: 'Text',
    icon: 'text',
    keywords: ['morse code translator', 'morse code audio', 'text to morse code', 'morse code beeper', 'morse code decoder', 'morse code generator audio'],
    order: 64,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Morse Code Audio Translator',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="morse-text-input">Text or Morse Code (Dots . and Dashes -)</label>
        <textarea class="tool-textarea" id="morse-text-input" rows="4" placeholder="Type text to convert to Morse code (e.g. SOS or Hello World)..."></textarea>
      </div>
      <div class="toolbar">
        <button class="button" id="morse-play-btn" type="button">🔊 Play Morse Audio</button>
        <button class="button secondary" id="morse-stop-btn" type="button">⏹ Stop Audio</button>
        <button class="button secondary" id="copy-morse-btn" type="button">Copy Morse</button>
      </div>
      <div id="morse-res-card" style="margin-top:1.25rem;">
        <label class="control-label">International Morse Code Output</label>
        <textarea class="tool-textarea" id="morse-output" rows="4" readonly style="font-family:monospace; font-size:1.1rem; letter-spacing:2px; font-weight:700;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('morse-text-input');
  const outEl = document.getElementById('morse-output');
  const playBtn = document.getElementById('morse-play-btn');
  const stopBtn = document.getElementById('morse-stop-btn');
  const copyBtn = document.getElementById('copy-morse-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/', '.': '.-.-.-', ',': '--..--',
    '?': '..--..', '!': '-.-.--'
  };

  const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]));

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function translate() {
    const raw = inEl.value.trim();
    if (!raw) { outEl.value = ''; return; }

    const isMorse = /^[.\\-\\s/]+$/.test(raw);
    if (isMorse) {
      // Decode Morse to text
      const words = raw.split('/');
      const decoded = words.map(w => {
        return w.trim().split(/\\s+/).map(ch => REVERSE_MORSE[ch] || '').join('');
      }).join(' ');
      outEl.value = decoded;
      setMsg('Decoded Morse code to plain text.');
    } else {
      // Encode Text to Morse
      const upper = raw.toUpperCase();
      const encoded = upper.split('').map(ch => MORSE_MAP[ch] || '').filter(Boolean).join(' ');
      outEl.value = encoded;
      setMsg('Encoded text to International Morse code.');
    }
  }

  inEl.addEventListener('input', translate);

  let audioCtx = null;
  let isPlaying = false;
  let audioTimeout = null;

  function stopAudio() {
    isPlaying = false;
    if (audioTimeout) clearTimeout(audioTimeout);
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
    setMsg('Audio stopped.');
  }

  function playMorse() {
    const morse = outEl.value || inEl.value;
    if (!morse) { setMsg('No Morse code to play.', true); return; }

    stopAudio();
    isPlaying = true;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const dotTime = 0.08; // seconds
    let curTime = audioCtx.currentTime + 0.1;

    for (let char of morse) {
      if (!isPlaying) break;
      if (char === '.') {
        playTone(curTime, dotTime);
        curTime += dotTime * 2;
      } else if (char === '-') {
        playTone(curTime, dotTime * 3);
        curTime += dotTime * 4;
      } else if (char === ' ' || char === '/') {
        curTime += dotTime * 4;
      }
    }

    setMsg('Playing Morse code audio...');
    audioTimeout = setTimeout(() => { isPlaying = false; setMsg('Playback finished.'); }, (curTime - audioCtx.currentTime) * 1000);
  }

  function playTone(startTime, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.005);
    gain.gain.setValueAtTime(0.3, startTime + duration - 0.005);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playBtn.addEventListener('click', playMorse);
  stopBtn.addEventListener('click', stopAudio);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Morse code copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; stopAudio();
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Type ordinary text to encode it into Morse code, or paste dots (.) and dashes (-) to decode.',
      'Click <strong>🔊 Play Morse Audio</strong> to generate and listen to 650Hz audio beeps in real time.',
      'Copy the Morse code symbols to your clipboard.'
    ],
    benefitTitle: 'Web Audio API Real-Time Synthesis',
    benefitContent: 'This tool uses the browser Web Audio API oscillator synthesis to generate authentic CW radio Morse code tones without downloading heavy MP3 audio files.',
    faqs: [
      { q: 'What is standard Morse code timing ratio?', a: 'A dash (-) is strictly 3 times the duration of a dot (.). The space between elements of the same letter is 1 dot, and between words is 7 dots.' }
    ]
  },

  // 2. NATO Phonetic Alphabet Translator
  {
    slug: 'nato-phonetic-alphabet-translator',
    name: 'NATO Phonetic Alphabet Translator',
    description: 'Spell out names, passwords, serial numbers, and flight codes into the standard ICAO / NATO phonetic alphabet (Alfa, Bravo, Charlie).',
    category: 'Text',
    icon: 'text',
    keywords: ['nato phonetic alphabet translator', 'spelling alphabet generator', 'aviation phonetic alphabet', 'alfa bravo charlie translator', 'phonetic spelling online'],
    order: 65,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'NATO Phonetic Spelling',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="nato-input">Enter Text or Code to Spell Out</label>
        <textarea class="tool-textarea" id="nato-input" rows="3" placeholder="e.g. Flight AI-102 or SecretPassword49"></textarea>
      </div>
      <div id="nato-res-card" style="display:none; margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Phonetic Alphabet Output</label>
          <button class="button secondary" id="copy-nato-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Phonetic Text</button>
        </div>
        <textarea class="tool-textarea" id="nato-output" rows="5" readonly style="font-size:1.05rem; font-weight:700; color:var(--green-dark); line-height:1.6;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('nato-input');
  const outEl = document.getElementById('nato-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-nato-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('nato-res-card');

  const NATO_MAP = {
    'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
    '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner'
  };

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function translate() {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter text or serial numbers to translate.', true);
      resCard.style.display = 'none';
      return;
    }

    const words = raw.split(/\\s+/);
    const result = words.map(word => {
      return word.toUpperCase().split('').map(ch => NATO_MAP[ch] || ch).join(' - ');
    }).join('\\n[SPACE]\\n');

    outEl.value = result;
    resCard.style.display = 'block';
    setMsg('Translated to NATO phonetic spelling.');
  }

  btn.addEventListener('click', translate);
  inEl.addEventListener('input', translate);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Phonetic spelling copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter any word, passport number, postal code, or flight callsign.',
      'The tool converts each character into its internationally recognized phonetic code word.',
      'Read the clear phonetic spelling during telephone calls or radio communication.'
    ],
    benefitTitle: 'ICAO and NATO Aviation Clarity',
    benefitContent: 'The International Radiotelephony Spelling Alphabet (NATO phonetic alphabet) prevents critical misunderstandings over radio and phone communications where letters like B and D or M and N sound nearly identical.',
    faqs: [
      { q: 'Why is 9 spelled "Niner"?', a: 'In German "Nein" means "no", so aviation standards adopted "Niner" to avoid fatal confusion over communication channels.' }
    ]
  },

  // 3. Water Intake & Daily Hydration Calculator
  {
    slug: 'water-intake-calculator',
    name: 'Daily Water Intake Calculator',
    description: 'Calculate your optimal daily water hydration goal in Liters and fluid ounces based on body weight, daily workout intensity, and climate.',
    category: 'Health',
    icon: 'text',
    keywords: ['water intake calculator', 'daily hydration calculator', 'how much water should i drink', 'hydration goal calculator', 'water requirements by weight'],
    order: 66,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Hydration Estimation Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="water-weight">Body Weight (kg)</label>
          <input class="tool-textarea" id="water-weight" type="number" step="any" placeholder="e.g. 70" />
        </div>
        <div class="control-group">
          <label class="control-label" for="water-exercise">Daily Exercise (Minutes)</label>
          <input class="tool-textarea" id="water-exercise" type="number" min="0" value="30" placeholder="e.g. 45" />
        </div>
        <div class="control-group">
          <label class="control-label" for="water-climate">Climate / Temperature</label>
          <select class="tool-textarea" id="water-climate">
            <option value="normal">Moderate / Air-Conditioned</option>
            <option value="hot">Hot / Humid Weather (+500 mL)</option>
            <option value="cold">Cold / Dry Climate</option>
          </select>
        </div>
      </div>
      <div id="water-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="water-res-liters" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Daily Goal in Liters (L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="water-res-glasses" style="font-weight:700;">-</span>
            <span class="stat-label">Glasses (250 mL each)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="water-res-oz">-</span>
            <span class="stat-label">Fluid Ounces (fl oz)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wtEl = document.getElementById('water-weight');
  const exEl = document.getElementById('water-exercise');
  const climEl = document.getElementById('water-climate');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('water-res-card');
  const resL = document.getElementById('water-res-liters');
  const resG = document.getElementById('water-res-glasses');
  const resOz = document.getElementById('water-res-oz');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const wt = parseFloat(wtEl.value);
    const exMin = parseFloat(exEl.value) || 0;
    const climate = climEl.value;

    if (isNaN(wt) || wt <= 0) {
      setMsg('Please enter a valid positive weight in kilograms.', true);
      resCard.style.display = 'none';
      return;
    }

    // Baseline: 35 mL per kg of body weight
    let totalMl = wt * 35;
    // Exercise: add ~350 mL per 30 mins of sweat
    totalMl += (exMin / 30) * 350;
    // Climate adjustment
    if (climate === 'hot') totalMl += 500;

    const liters = totalMl / 1000;
    const glasses = Math.round(totalMl / 250);
    const oz = totalMl * 0.033814;

    resL.textContent = liters.toFixed(2) + ' L / day';
    resG.textContent = glasses + ' Glasses';
    resOz.textContent = Math.round(oz) + ' fl oz';

    resCard.style.display = 'block';
    setMsg('Hydration target calculated.');
  });

  clearBtn.addEventListener('click', () => {
    wtEl.value = ''; exEl.value = '30'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your body weight in kilograms.',
      'Enter your average daily physical exercise time in minutes.',
      'Select your local weather conditions.',
      'Click <strong>Calculate</strong> to inspect your personalized daily water hydration target.'
    ],
    benefitTitle: 'Optimal Daily Hydration Benefits',
    benefitContent: 'Adequate hydration supports physical endurance, mental concentration, kidney filtration, and joint lubrication. The standard guideline recommends approximately 35 mL of water per kilogram of body weight.',
    faqs: [
      { q: 'Does tea or coffee count toward daily water intake?', a: 'Yes, moderate consumption of caffeinated beverages contributes to fluid intake, though plain water remains ideal.' }
    ]
  },

  // 4. Download & Bandwidth Time Calculator
  {
    slug: 'download-time-calculator',
    name: 'Download Time Calculator',
    description: 'Calculate exact file download and upload times across internet speeds (Mbps, Gbps, 4G, 5G, Fiber) for any file size.',
    category: 'Developer',
    icon: 'code',
    keywords: ['download time calculator', 'bandwidth time calculator', 'file transfer speed calculator', 'upload speed time', 'how long to download file'],
    order: 67,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Data Transfer Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dl-size">File Size</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="dl-size" type="number" step="any" placeholder="e.g. 50" style="flex:2;" />
            <select class="tool-textarea" id="dl-size-unit" style="flex:1;">
              <option value="MB">MB</option>
              <option value="GB" selected>GB</option>
              <option value="TB">TB</option>
            </select>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="dl-speed">Internet Speed</label>
          <div style="display:flex; gap:0.5rem;">
            <input class="tool-textarea" id="dl-speed" type="number" step="any" placeholder="e.g. 100" style="flex:2;" />
            <select class="tool-textarea" id="dl-speed-unit" style="flex:1;">
              <option value="Mbps" selected>Mbps</option>
              <option value="Gbps">Gbps</option>
              <option value="MBps">MB/s (MegaBytes)</option>
            </select>
          </div>
        </div>
      </div>
      <div id="dl-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dl-res-time" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">-</span>
            <span class="stat-label">Estimated Download Duration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dl-res-transfer-rate">-</span>
            <span class="stat-label">Actual Transfer Rate (MB/s)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sizeEl = document.getElementById('dl-size');
  const sizeUnitEl = document.getElementById('dl-size-unit');
  const speedEl = document.getElementById('dl-speed');
  const speedUnitEl = document.getElementById('dl-speed-unit');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dl-res-card');
  const resTime = document.getElementById('dl-res-time');
  const resRate = document.getElementById('dl-res-transfer-rate');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function formatDuration(sec) {
    if (sec < 60) return Math.ceil(sec) + ' Seconds';
    const min = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    if (min < 60) return min + ' Min ' + s + ' Sec';
    const hr = Math.floor(min / 60);
    const m = min % 60;
    if (hr < 24) return hr + ' Hours ' + m + ' Min';
    const days = Math.floor(hr / 24);
    const h = hr % 24;
    return days + ' Days ' + h + ' Hours';
  }

  btn.addEventListener('click', () => {
    const size = parseFloat(sizeEl.value);
    const speed = parseFloat(speedEl.value);

    if (isNaN(size) || isNaN(speed) || size <= 0 || speed <= 0) {
      setMsg('Please enter valid positive numbers for file size and connection speed.', true);
      resCard.style.display = 'none';
      return;
    }

    // Convert file size to MegaBytes (MB)
    let sizeMB = size;
    if (sizeUnitEl.value === 'GB') sizeMB = size * 1024;
    else if (sizeUnitEl.value === 'TB') sizeMB = size * 1024 * 1024;

    // Convert speed to MegaBytes per second (MB/s)
    let speedMBps = speed;
    if (speedUnitEl.value === 'Mbps') speedMBps = speed / 8;
    else if (speedUnitEl.value === 'Gbps') speedMBps = (speed * 1000) / 8;

    const totalSeconds = sizeMB / speedMBps;

    resTime.textContent = formatDuration(totalSeconds);
    resRate.textContent = speedMBps.toFixed(2) + ' MB/s';

    resCard.style.display = 'block';
    setMsg('Download duration calculated.');
  });

  clearBtn.addEventListener('click', () => {
    sizeEl.value = ''; speedEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the file size (e.g. 50 GB video game or 4 GB movie).',
      'Enter your internet connection speed (e.g. 100 Mbps fiber).',
      'Click <strong>Calculate</strong> to inspect the transfer duration.'
    ],
    benefitTitle: 'Megabits (Mbps) vs Megabytes (MB/s)',
    benefitContent: 'Internet service providers advertise bandwidth in Megabits per second (Mbps), while files are measured in MegaBytes (MB). Because 8 bits equal 1 Byte, a 100 Mbps connection yields a theoretical maximum download speed of 12.5 MB/s.',
    faqs: [
      { q: 'How long to download 100 GB on a 100 Mbps connection?', a: '100 GB takes approximately 2 hours and 16 minutes on a continuous 100 Mbps connection.' }
    ]
  },

  // 5. Hexagon Area & Geometry Calculator
  {
    slug: 'hexagon-calculator',
    name: 'Hexagon Area & Geometry Calculator',
    description: 'Calculate regular hexagon area, perimeter, inradius, circumradius, and short/long diagonals from side length.',
    category: 'Math',
    icon: 'text',
    keywords: ['hexagon calculator', 'hexagon area calculator', 'regular hexagon perimeter', 'hexagon diagonal calculator', 'hexagon geometry online'],
    order: 68,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hexagon Geometry Inputs',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hex-side">Side Length (a)</label>
        <input class="tool-textarea" id="hex-side" type="number" step="any" placeholder="e.g. 6" />
      </div>
      <div id="hex-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="hex-res-area" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Area (A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hex-res-peri" style="font-weight:800;">-</span>
            <span class="stat-label">Perimeter (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hex-res-long-diag">-</span>
            <span class="stat-label">Long Diagonal (d = 2a)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hex-res-short-diag">-</span>
            <span class="stat-label">Short Diagonal (s = a√3)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hex-res-inradius">-</span>
            <span class="stat-label">Inradius (r = a√3 / 2)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sideEl = document.getElementById('hex-side');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('hex-res-card');

  const resArea = document.getElementById('hex-res-area');
  const resPeri = document.getElementById('hex-res-peri');
  const resLong = document.getElementById('hex-res-long-diag');
  const resShort = document.getElementById('hex-res-short-diag');
  const resInrad = document.getElementById('hex-res-inradius');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(sideEl.value);
    if (isNaN(a) || a <= 0) {
      setMsg('Please enter a valid positive side length.', true);
      resCard.style.display = 'none';
      return;
    }

    const area = ((3 * Math.sqrt(3)) / 2) * Math.pow(a, 2);
    const peri = 6 * a;
    const longDiag = 2 * a;
    const shortDiag = a * Math.sqrt(3);
    const inrad = (a * Math.sqrt(3)) / 2;

    resArea.textContent = area.toFixed(4) + ' sq units';
    resPeri.textContent = peri.toFixed(4) + ' units';
    resLong.textContent = longDiag.toFixed(4);
    resShort.textContent = shortDiag.toFixed(4);
    resInrad.textContent = inrad.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Hexagon geometry calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    sideEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the side length (a) of the regular hexagon.',
      'Click <strong>Calculate</strong> to inspect the exact total area, perimeter, and inradius.'
    ],
    benefitTitle: 'Regular Hexagon Formulas',
    benefitContent: 'A regular hexagon consists of 6 congruent equilateral triangles. Its internal angles are each 120°, and its area equals (3√3 / 2) × a².',
    faqs: [
      { q: 'What is the sum of interior angles in a hexagon?', a: 'The sum of all 6 interior angles in any hexagon is 720 degrees.' }
    ]
  }
];

toolsBatch4.forEach(createTool);
console.log('Batch 4 complete.');
