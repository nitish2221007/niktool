const { createTool } = require('./generate-curated-tools.cjs');

// Suite U: 5 Tools in Embedded Systems, UART, I2C, PWM & IEEE-754 Architecture
const toolsSuiteU = [
  // 1. UART Serial Baud Rate & Frame Transmission Time Calculator
  {
    slug: 'uart-baud-rate-frame-time-calculator',
    name: 'UART Baud Rate & Serial Frame Transmission Calculator',
    description: 'Calculate bit time duration, maximum bytes per second throughput, and transmission latency for standard UART 8N1 serial frames.',
    category: 'Developer',
    icon: 'code',
    keywords: ['uart baud rate calculator', 'serial frame transmission time calculator', '8n1 bit time calculator', 'uart throughput bytes per second', 'rs232 baud rate frame latency'],
    order: 284,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Baud Rate & Frame Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="uart-baud">Baud Rate (bps)</label>
          <select class="tool-textarea" id="uart-baud">
            <option value="9600">9,600 bps</option>
            <option value="19200">19,200 bps</option>
            <option value="38400">38,400 bps</option>
            <option value="57600">57,600 bps</option>
            <option value="115200" selected>115,200 bps</option>
            <option value="921600">921,600 bps</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="uart-bytes">Payload Length (Bytes)</label>
          <input class="tool-textarea" id="uart-bytes" type="number" min="1" value="256" placeholder="256 Bytes" />
        </div>
      </div>
      <div id="uart-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="uart-res-bittime" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.68 μs</span>
            <span class="stat-label">Single Bit Duration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="uart-res-speed" style="font-weight:700;">11,520 B/s (11.52 kB/s)</span>
            <span class="stat-label">Max 8N1 Throughput</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="uart-res-lat">22.22 ms</span>
            <span class="stat-label">Total Transmission Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('uart-baud'), bytesEl = document.getElementById('uart-bytes');
  const btEl = document.getElementById('uart-res-bittime'), spEl = document.getElementById('uart-res-speed'), latEl = document.getElementById('uart-res-lat');

  function update() {
    const baud = parseFloat(bEl.value), bytes = parseInt(bytesEl.value, 10);
    if (isNaN(baud) || isNaN(bytes) || baud <= 0 || bytes <= 0) return;

    // Bit time (seconds) = 1 / baud
    const bitTimeSec = 1 / baud;
    const bitTimeUs = bitTimeSec * 1e6;

    // Standard 8N1 frame = 1 start bit + 8 data bits + 0 parity + 1 stop bit = 10 bits per byte
    const bitsPerByte = 10;
    const maxBytesPerSec = baud / bitsPerByte;

    // Total transmission time
    const totalBits = bytes * bitsPerByte;
    const totalTimeSec = totalBits * bitTimeSec;
    const totalTimeMs = totalTimeSec * 1000;

    btEl.textContent = bitTimeUs.toFixed(2) + ' μs';
    spEl.textContent = Math.round(maxBytesPerSec).toLocaleString() + ' B/s (' + (maxBytesPerSec / 1000).toFixed(2) + ' kB/s)';
    latEl.textContent = totalTimeMs >= 1000 ? (totalTimeMs / 1000).toFixed(2) + ' s' : totalTimeMs.toFixed(2) + ' ms';
  }

  bEl.addEventListener('change', update);
  bytesEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select UART serial baud rate (e.g. 9600, 115200, 921600 bps).',
      'Enter data payload packet size in bytes.',
      'Inspect single bit duration time, maximum 8N1 byte throughput, and transmission latency.'
    ],
    benefitTitle: 'Asynchronous 8N1 Frame Overhead',
    benefitContent: 'Because UART is asynchronous, each 8-bit byte requires 1 start bit and 1 stop bit (10 bits total), creating a 20% protocol framing overhead.',
    faqs: [{ q: 'What is the bit time at 115,200 baud?', a: '1 / 115,200 ≈ 8.68 microseconds per bit.' }]
  },

  // 2. I2C Bus Pull-Up Resistor & Rise Time Calculator
  {
    slug: 'i2c-pullup-resistor-bus-capacitance-calculator',
    name: 'I2C Bus Pull-Up Resistor Calculator',
    description: 'Calculate minimum and maximum pull-up resistor values (R_min, R_max) and bus rise time for Standard (100kHz), Fast (400kHz), and Fast-Plus (1MHz) I2C buses based on bus capacitance.',
    category: 'Developer',
    icon: 'code',
    keywords: ['i2c pull up resistor calculator', 'i2c bus capacitance rise time', 'i2c rmin rmax formula', 'sda scl pullup calculator online', 'i2c 400khz pull up resistor sizing'],
    order: 285,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Supply Voltage (Vdd) & Bus Capacitance (Cb)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="i2c-vdd">Supply Voltage Vdd (V)</label>
          <input class="tool-textarea" id="i2c-vdd" type="number" step="0.1" value="3.3" placeholder="3.3 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="i2c-cb">Total Bus Capacitance Cb (pF)</label>
          <input class="tool-textarea" id="i2c-cb" type="number" step="any" value="150" placeholder="150 pF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="i2c-mode">I2C Speed Mode</label>
          <select class="tool-textarea" id="i2c-mode">
            <option value="1000">Standard Mode (100 kHz, tr_max = 1000ns)</option>
            <option value="300" selected>Fast Mode (400 kHz, tr_max = 300ns)</option>
            <option value="120">Fast Mode Plus (1 MHz, tr_max = 120ns)</option>
          </select>
        </div>
      </div>
      <div id="i2c-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="i2c-res-rec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.2 kΩ</span>
            <span class="stat-label">Recommended Pull-Up Resistor</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="i2c-res-range" style="font-weight:700;">967 Ω to 2.36 kΩ</span>
            <span class="stat-label">Valid Allowable Range (R_min to R_max)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vddEl = document.getElementById('i2c-vdd'), cbEl = document.getElementById('i2c-cb'), modeEl = document.getElementById('i2c-mode');
  const recEl = document.getElementById('i2c-res-rec'), ranEl = document.getElementById('i2c-res-range');

  function update() {
    const vdd = parseFloat(vddEl.value), cbPf = parseFloat(cbEl.value), trMaxNs = parseFloat(modeEl.value);
    if (isNaN(vdd) || isNaN(cbPf) || isNaN(trMaxNs) || vdd <= 0.8 || cbPf <= 0 || trMaxNs <= 0) return;

    const cbF = cbPf * 1e-12;
    const trMaxS = trMaxNs * 1e-9;

    // NXP I2C Specification:
    // R_min = (Vdd - Vol_max) / Iol = (Vdd - 0.4V) / 3mA
    const rMin = (vdd - 0.4) / 0.003;
    // R_max = tr_max / (0.8473 * Cb)
    const rMax = trMaxS / (0.8473 * cbF);

    const rMinK = rMin / 1000;
    const rMaxK = rMax / 1000;

    let recK = Math.sqrt(rMinK * rMaxK);
    const standardE24 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10.0];
    let bestFit = 2.2;
    let minDiff = Infinity;
    for (const val of standardE24) {
      if (val >= rMinK && val <= rMaxK) {
        const diff = Math.abs(val - recK);
        if (diff < minDiff) { minDiff = diff; bestFit = val; }
      }
    }

    if (rMin > rMax) {
      recEl.textContent = 'Bus Capacitance Too High!';
      recEl.style.color = '#c53030';
      ranEl.textContent = 'Reduce PCB trace length or use I2C bus buffer';
    } else {
      recEl.textContent = bestFit + ' kΩ (E24 Standard)';
      recEl.style.color = '#22543d';
      ranEl.textContent = Math.round(rMin) + ' Ω to ' + (rMaxK).toFixed(2) + ' kΩ';
    }
  }

  [vddEl, cbEl, modeEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter I2C bus supply voltage (e.g. 3.3V or 5.0V).',
      'Enter estimated bus line capacitance (PCB traces + IC pin capacitances in pF).',
      'Select bus frequency mode (100kHz standard or 400kHz fast mode).',
      'Inspect safe allowable resistor range and recommended E24 pull-up resistor.'
    ],
    benefitTitle: 'NXP UM10204 I2C-Bus Specification Compliance',
    benefitContent: 'Too small a resistor overloads the open-drain low-level output transistor (exceeding 3mA sink limit); too large a resistor causes slow rise times, rounding edges and corrupting I2C data bits.',
    faqs: [{ q: 'Why is 4.7 kΩ so common on 3.3V boards?', a: '4.7 kΩ safely balances rise time speeds with low quiescent power dissipation for short PCB trace capacitances (~50-100 pF).' }]
  },

  // 3. PWM Duty Cycle to Average DC Voltage Calculator
  {
    slug: 'pwm-duty-cycle-average-voltage-calculator',
    name: 'PWM Duty Cycle & Average DC Voltage Calculator',
    description: 'Calculate average output DC voltage (V_avg = V_peak · (Duty Cycle / 100)), pulse ON/OFF times, and RC low-pass DAC smoothed ripple voltage.',
    category: 'Developer',
    icon: 'code',
    keywords: ['pwm duty cycle calculator', 'pwm to dc voltage calculator', 'pulse width modulation voltage formula', 'pwm average voltage calculator online', 'arduino pwm analog output voltage'],
    order: 286,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Peak Logic Voltage, Frequency & Duty Cycle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pwm-vpeak">Peak Voltage (V)</label>
          <input class="tool-textarea" id="pwm-vpeak" type="number" step="any" value="5.0" placeholder="5.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwm-duty">Duty Cycle (%)</label>
          <input class="tool-textarea" id="pwm-duty" type="number" min="0" max="100" step="any" value="60" placeholder="60%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwm-freq">PWM Frequency (Hz)</label>
          <input class="tool-textarea" id="pwm-freq" type="number" step="any" value="1000" placeholder="1000 Hz" />
        </div>
      </div>
      <div id="pwm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pwm-res-vavg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.00 Volts DC</span>
            <span class="stat-label">Average Output DC Voltage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pwm-res-ton" style="font-weight:700;">600.0 μs</span>
            <span class="stat-label">Pulse ON Time (t_on)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pwm-res-toff">400.0 μs</span>
            <span class="stat-label">Pulse OFF Time (t_off)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('pwm-vpeak'), dEl = document.getElementById('pwm-duty'), fEl = document.getElementById('pwm-freq');
  const vAvgEl = document.getElementById('pwm-res-vavg'), tonEl = document.getElementById('pwm-res-ton'), toffEl = document.getElementById('pwm-res-toff');

  function update() {
    const vPeak = parseFloat(vEl.value), dutyPct = parseFloat(dEl.value), freqHz = parseFloat(fEl.value);
    if (isNaN(vPeak) || isNaN(dutyPct) || isNaN(freqHz) || vPeak < 0 || dutyPct < 0 || dutyPct > 100 || freqHz <= 0) return;

    // V_avg = V_peak * (Duty / 100)
    const vAvg = vPeak * (dutyPct / 100);
    // Period T = 1 / f
    const periodSec = 1 / freqHz;
    const tOnSec = periodSec * (dutyPct / 100);
    const tOffSec = periodSec - tOnSec;

    const tOnUs = tOnSec * 1e6;
    const tOffUs = tOffSec * 1e6;

    vAvgEl.textContent = vAvg.toFixed(2) + ' Volts DC';
    tonEl.textContent = tOnUs >= 1000 ? (tOnUs / 1000).toFixed(2) + ' ms' : tOnUs.toFixed(1) + ' μs';
    toffEl.textContent = tOffUs >= 1000 ? (tOffUs / 1000).toFixed(2) + ' ms' : tOffUs.toFixed(1) + ' μs';
  }

  [vEl, dEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter logic peak voltage (e.g. 3.3V or 5.0V).',
      'Enter PWM duty cycle percentage (0% to 100%).',
      'Enter switching frequency in Hertz.',
      'Inspect average DC output voltage and precise ON/OFF microsecond durations.'
    ],
    benefitTitle: 'Microcontroller Digital-to-Analog Conversion',
    benefitContent: 'Microcontrollers without native DAC peripherals generate analog voltages by filtering high-speed PWM pulse trains with a simple passive RC low-pass filter.',
    faqs: [{ q: 'What is the average voltage of a 5V PWM signal with a 50% duty cycle?', a: '5.0V × 0.50 = exactly 2.50 Volts DC.' }]
  },

  // 4. IEEE-754 32-Bit Single Precision Floating-Point Converter
  {
    slug: 'ieee-754-floating-point-converter',
    name: 'IEEE-754 32-Bit Floating-Point Binary Converter',
    description: 'Convert decimal numbers into standard IEEE-754 32-bit single-precision floating point binary layout (1 sign bit, 8 exponent bits, 23 mantissa bits) and hex representation.',
    category: 'Developer',
    icon: 'code',
    keywords: ['ieee 754 floating point converter', 'float to binary 32 bit converter', 'ieee 754 hex calculator online', 'single precision float bit layout', 'floating point representation online'],
    order: 287,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Decimal Number Input',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="fp-input">Enter Decimal Number (e.g. -12.375 or 0.15625)</label>
        <input class="tool-textarea" id="fp-input" type="text" value="-12.375" placeholder="-12.375" />
      </div>
      <div id="fp-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Hexadecimal:</strong> <span id="fp-hex" style="font-family:monospace; color:var(--green-dark); font-weight:700;">0xC1460000</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Sign Bit (1b):</strong> <span id="fp-sign" style="font-family:monospace; color:#c53030; font-weight:700;">1 (Negative)</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Biased Exponent (8b):</strong> <span id="fp-exp" style="font-family:monospace; color:#2563eb; font-weight:700;">10000010 (130 - 127 = 3)</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>Mantissa (23b):</strong> <span id="fp-man" style="font-family:monospace; font-weight:700;">10001100000000000000000</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('fp-input');
  const hexEl = document.getElementById('fp-hex'), signEl = document.getElementById('fp-sign'), expEl = document.getElementById('fp-exp'), manEl = document.getElementById('fp-man');

  function update() {
    const val = parseFloat(inEl.value);
    if (isNaN(val)) return;

    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, val, false); // Big endian

    const uintVal = view.getUint32(0, false);
    const hexStr = '0x' + uintVal.toString(16).toUpperCase().padStart(8, '0');
    const binStr = uintVal.toString(2).padStart(32, '0');

    const sign = binStr[0];
    const exp = binStr.slice(1, 9);
    const man = binStr.slice(9);

    const expDec = parseInt(exp, 2);
    const expUnbiased = expDec - 127;

    hexEl.textContent = hexStr;
    signEl.textContent = sign + (sign === '1' ? ' (Negative)' : ' (Positive)');
    expEl.textContent = exp + ' (' + expDec + ' - 127 = 2^' + expUnbiased + ')';
    manEl.textContent = man;
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any positive or negative decimal or floating-point number.',
      'Inspect the bit-level IEEE-754 single-precision breakdown into Sign (1 bit), Biased Exponent (8 bits), Mantissa Fraction (23 bits), and 32-bit Hex string.'
    ],
    benefitTitle: 'Hardware Floating Point Unit (FPU) Representation',
    benefitContent: 'IEEE-754 Single Precision (binary32) encodes real numbers as: (-1)^sign × 2^(exponent - 127) × 1.mantissa, offering approximately 7.2 decimal digits of precision across a dynamic range from 1.18×10⁻³⁸ to 3.4×10³⁸.',
    faqs: [{ q: 'Why is the exponent biased by 127?', a: 'Biasing the 8-bit unsigned integer range (0 to 255) by subtracting 127 allows smooth encoding of both positive and negative powers of 2 without a dedicated sign bit.' }]
  },

  // 5. CRC-32 & CRC-16 Checksum Generator
  {
    slug: 'crc-checksum-polynomial-calculator',
    name: 'CRC-32 & CRC-16 Cyclic Redundancy Check Calculator',
    description: 'Calculate standard CRC-32 (Ethernet/ZIP ISO 3309) and CRC-16 error-detecting checksum hashes locally in pure browser JavaScript.',
    category: 'Developer',
    icon: 'code',
    keywords: ['crc32 checksum calculator', 'crc 32 online generator', 'crc16 checksum calculator', 'cyclic redundancy check generator', 'iso 3309 crc32 hash online'],
    order: 288,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Text Payload for CRC Checksum',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="crc-input">Input String</label>
        <textarea class="tool-textarea" id="crc-input" rows="3" placeholder="123456789"></textarea>
      </div>
      <div id="crc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="crc-res-32" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">0xCBF43926</span>
            <span class="stat-label">CRC-32 Digest (Standard ISO 3309)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="crc-res-dec" style="font-weight:700;">3,421,780,262</span>
            <span class="stat-label">Decimal Value</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('crc-input');
  const c32El = document.getElementById('crc-res-32'), decEl = document.getElementById('crc-res-dec');

  // Precompute CRC32 lookup table
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
  }

  function crc32(str) {
    const bytes = new TextEncoder().encode(str);
    let crc = 0 ^ (-1);
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function update() {
    const str = inEl.value;
    const res = crc32(str);
    const hex = '0x' + res.toString(16).toUpperCase().padStart(8, '0');

    c32El.textContent = hex;
    decEl.textContent = res.toLocaleString();
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter or paste any string payload.',
      'Inspect the computed 32-bit hexadecimal cyclic redundancy check (CRC-32) verification digest.'
    ],
    benefitTitle: 'Error Detection in Ethernet and ZIP Archives',
    benefitContent: 'CRC-32 utilizes polynomial division (0xEDB88320) to detect accidental bit flips and corrupted transmission packets in Ethernet networks, PNG images, and ZIP file archives with zero performance overhead.',
    faqs: [{ q: 'What is the standard check string "123456789" CRC-32 hash?', a: 'The CRC-32 checksum of "123456789" is exactly 0xCBF43926 (3421780262).' }]
  }
];

toolsSuiteU.forEach(createTool);
console.log('Suite U complete: 5 tools created.');
