const { createTool } = require('./generate-curated-tools.cjs');

const tools13 = [
  // 1. SHA-256 Hash Generator
  {
    slug: 'hash-sha256-generator',
    name: 'SHA-256 Cryptographic Hash Generator',
    description: 'Generate standard 256-bit SHA-256 cryptographic hashes instantly using the browser native Web Cryptography API with zero server uploads.',
    category: 'Security',
    icon: 'shield',
    keywords: ['sha256 hash generator', 'sha 256 online', 'generate sha256 hash', 'crypto sha256 checksum', 'sha256 string hasher'],
    order: 164,
    schemaCategory: 'SecurityApplication',
    workspaceHeading: 'Input Text String',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sha-input">Text String to Hash</label>
        <textarea class="tool-textarea" id="sha-input" rows="4" placeholder="Enter text to generate SHA-256 hash..."></textarea>
      </div>
      <div id="sha-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">SHA-256 Hash Digest (64 Hex Characters)</label>
          <button class="button secondary" id="copy-sha-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Hash</button>
        </div>
        <input class="tool-textarea" id="sha-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('sha-input'), outEl = document.getElementById('sha-output');
  const copyBtn = document.getElementById('copy-sha-btn');

  async function update() {
    const text = inEl.value;
    if (!text) { outEl.value = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; return; }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    outEl.value = hashHex;
  }

  inEl.addEventListener('input', update);
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
      'Type or paste text into the input field.',
      'The 64-character hexadecimal SHA-256 digest is generated instantly.',
      'Click <strong>Copy Hash</strong> to copy to your clipboard.'
    ],
    benefitTitle: 'Hardware Accelerated Web Crypto API',
    benefitContent: 'This tool uses window.crypto.subtle.digest to compute cryptographic hashes directly in your browser CPU hardware without transmitting sensitive data over the internet.',
    faqs: [{ q: 'What is the empty string SHA-256 hash?', a: 'The SHA-256 hash of an empty string is e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.' }]
  },

  // 2. SHA-512 Hash Generator
  {
    slug: 'hash-sha512-generator',
    name: 'SHA-512 Cryptographic Hash Generator',
    description: 'Generate high-security 512-bit SHA-512 cryptographic hashes (128 hex characters) locally via the native browser Web Crypto API.',
    category: 'Security',
    icon: 'shield',
    keywords: ['sha512 hash generator', 'sha 512 online', 'generate sha512 checksum', 'crypto sha512 hasher', 'secure sha512 generator'],
    order: 165,
    schemaCategory: 'SecurityApplication',
    workspaceHeading: 'Input Text String',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sha512-input">Text String to Hash</label>
        <textarea class="tool-textarea" id="sha512-input" rows="4" placeholder="Enter text to generate SHA-512 hash..."></textarea>
      </div>
      <div id="sha512-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">SHA-512 Hash Digest (128 Hex Characters)</label>
          <button class="button secondary" id="copy-sha512-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Hash</button>
        </div>
        <textarea class="tool-textarea" id="sha512-output" rows="3" readonly style="font-family:monospace; font-weight:700; font-size:0.88rem; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('sha512-input'), outEl = document.getElementById('sha512-output');
  const copyBtn = document.getElementById('copy-sha512-btn');

  async function update() {
    const text = inEl.value;
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    outEl.value = hashHex;
  }

  inEl.addEventListener('input', update);
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
      'Enter text into the input box.',
      'The full 128-character cryptographic SHA-512 digest updates dynamically.'
    ],
    benefitTitle: 'Why Use SHA-512?',
    benefitContent: 'SHA-512 offers 256 bits of collision resistance against brute-force and quantum attacks, making it the preferred standard for certificate authorities and digital signatures.',
    faqs: [{ q: 'Is SHA-512 faster than SHA-256 on 64-bit CPUs?', a: 'Yes, because SHA-512 operates on native 64-bit arithmetic words, it often executes faster on modern 64-bit processors than SHA-256.' }]
  },

  // 3. RFC 4648 Base32 Encoder & Decoder
  {
    slug: 'base32-encoder-decoder',
    name: 'Base32 Encoder & Decoder (RFC 4648)',
    description: 'Encode plain text into standard uppercase Base32 (A-Z, 2-7) format or decode Base32 strings back to UTF-8 text for 2FA TOTP secret keys.',
    category: 'Developer',
    icon: 'code',
    keywords: ['base32 encoder decoder', 'base32 online converter', 'rfc 4648 base32 decoder', 'totp base32 key converter', 'base32 string encoder'],
    order: 166,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Base32 Converter',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="b32-input">Text or Base32 Input</label>
        <textarea class="tool-textarea" id="b32-input" rows="4" placeholder="Hello World!"></textarea>
      </div>
      <div class="toolbar">
        <button class="button" id="b32-encode-btn" type="button">Encode to Base32</button>
        <button class="button secondary" id="b32-decode-btn" type="button">Decode Base32</button>
        <button class="button secondary" id="copy-b32-btn" type="button">Copy Result</button>
      </div>
      <div id="b32-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Result Output</label>
        <textarea class="tool-textarea" id="b32-output" rows="4" readonly style="font-family:monospace; font-weight:700;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('b32-input'), outEl = document.getElementById('b32-output');
  const encBtn = document.getElementById('b32-encode-btn'), decBtn = document.getElementById('b32-decode-btn');
  const copyBtn = document.getElementById('copy-b32-btn'), msgEl = document.getElementById('tool-message');

  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function encode(str) {
    const bytes = new TextEncoder().encode(str);
    let bits = 0, value = 0, output = '';
    for (let i = 0; i < bytes.length; i++) {
      value = (value << 8) | bytes[i];
      bits += 8;
      while (bits >= 5) {
        output += ALPHABET[(value >>> (bits - 5)) & 31];
        bits -= 5;
      }
    }
    if (bits > 0) {
      output += ALPHABET[(value << (5 - bits)) & 31];
    }
    while (output.length % 8 !== 0) output += '=';
    return output;
  }

  function decode(str) {
    const clean = str.replace(/=+$/, '').toUpperCase();
    let bits = 0, value = 0;
    const bytes = [];
    for (let i = 0; i < clean.length; i++) {
      const idx = ALPHABET.indexOf(clean[i]);
      if (idx === -1) throw new Error('Invalid Base32 character: ' + clean[i]);
      value = (value << 5) | idx;
      bits += 5;
      if (bits >= 8) {
        bytes.push((value >>> (bits - 8)) & 255);
        bits -= 8;
      }
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  }

  encBtn.addEventListener('click', () => {
    try {
      outEl.value = encode(inEl.value);
      setMsg('Text encoded to Base32.');
    } catch (e) { setMsg(e.message, true); }
  });

  decBtn.addEventListener('click', () => {
    try {
      outEl.value = decode(inEl.value);
      setMsg('Base32 decoded successfully.');
    } catch (e) { setMsg(e.message, true); }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Copied to clipboard.');
  });
})();`,
    howToSteps: [
      'Enter text or Base32 formatted string.',
      'Click <strong>Encode to Base32</strong> or <strong>Decode Base32</strong>.',
      'Copy the output.'
    ],
    benefitTitle: 'Why Base32 in Two-Factor Authentication (2FA)?',
    benefitContent: 'Base32 avoids visually ambiguous characters like 0/O and 1/I, making it easy for humans to manually read and transcribe 2FA secret seeds into authenticator apps.',
    faqs: [{ q: 'What characters are used in RFC 4648 Base32?', a: 'Uppercase letters A through Z and digits 2 through 7 (total 32 symbols).' }]
  },

  // 4. CSV to Markdown Table Converter
  {
    slug: 'csv-to-markdown-table-converter',
    name: 'CSV to Markdown Table Converter',
    description: 'Convert comma-separated CSV spreadsheets and tabular data into cleanly aligned GitHub Flavored Markdown (GFM) tables.',
    category: 'Developer',
    icon: 'code',
    keywords: ['csv to markdown table', 'csv to gfm table converter', 'convert spreadsheet to markdown', 'markdown table generator from csv', 'csv to md online'],
    order: 167,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'CSV Input Data',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="csv-input">Paste CSV Data</label>
        <textarea class="tool-textarea" id="csv-input" rows="5" placeholder="Name, Age, City&#10;Alice, 28, New York&#10;Bob, 34, London&#10;Charlie, 22, Tokyo"></textarea>
      </div>
      <div class="toolbar">
        <button class="button" id="conv-csv-btn" type="button">Convert to Markdown Table</button>
        <button class="button secondary" id="copy-csv-md-btn" type="button">Copy Markdown</button>
      </div>
      <div id="csv-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Formatted Markdown Table</label>
        <textarea class="tool-textarea" id="csv-output" rows="6" readonly style="font-family:monospace; font-size:0.9rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('csv-input'), outEl = document.getElementById('csv-output');
  const btn = document.getElementById('conv-csv-btn'), copyBtn = document.getElementById('copy-csv-md-btn');
  const msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function convert() {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please paste CSV data.', true); return; }

    const lines = raw.split('\\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    const rows = lines.map(line => line.split(',').map(c => c.trim()));
    if (rows.length === 0) return;

    const header = rows[0];
    const sep = header.map(() => '---');

    const md = [];
    md.push('| ' + header.join(' | ') + ' |');
    md.push('| ' + sep.join(' | ') + ' |');
    for (let i = 1; i < rows.length; i++) {
      md.push('| ' + rows[i].join(' | ') + ' |');
    }

    outEl.value = md.join('\\n');
    setMsg('Converted ' + rows.length + ' rows to Markdown table.');
  }

  btn.addEventListener('click', convert);
  convert();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Markdown table copied.');
  });
})();`,
    howToSteps: [
      'Paste comma-separated CSV rows into the input field.',
      'Click <strong>Convert to Markdown Table</strong>.',
      'Copy the formatted Markdown table directly into your GitHub README or documentation.'
    ],
    benefitTitle: 'GitHub Flavored Markdown (GFM) Compatibility',
    benefitContent: 'Converts raw database CSV extracts into standard Markdown table syntax supported by GitHub, GitLab, Notion, and static site generators.',
    faqs: [{ q: 'Does it support custom row counts?', a: 'Yes, it automatically parses any number of columns and rows.' }]
  },

  // 5. CSS Clamp() Fluid Typography Calculator
  {
    slug: 'css-clamp-fluid-typography-calculator',
    name: 'CSS clamp() Fluid Typography Calculator',
    description: 'Calculate responsive fluid CSS clamp(min, val, max) font sizes and spacing that scale smoothly between mobile and desktop viewports.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css clamp calculator', 'fluid typography calculator', 'clamp font size generator', 'responsive fluid text css', 'css clamp generator online'],
    order: 168,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Viewport & Font Size Constraints',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cl-min-vp">Min Viewport (px)</label>
          <input class="tool-textarea" id="cl-min-vp" type="number" value="360" placeholder="360" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-max-vp">Max Viewport (px)</label>
          <input class="tool-textarea" id="cl-max-vp" type="number" value="1200" placeholder="1200" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-min-font">Min Font (px)</label>
          <input class="tool-textarea" id="cl-min-font" type="number" value="16" placeholder="16" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-max-font">Max Font (px)</label>
          <input class="tool-textarea" id="cl-max-font" type="number" value="32" placeholder="32" />
        </div>
      </div>
      <div id="cl-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated Fluid CSS clamp()</label>
          <button class="button secondary" id="copy-clamp-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="cl-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const minVpEl = document.getElementById('cl-min-vp'), maxVpEl = document.getElementById('cl-max-vp');
  const minFontEl = document.getElementById('cl-min-font'), maxFontEl = document.getElementById('cl-max-font');
  const outEl = document.getElementById('cl-output'), copyBtn = document.getElementById('copy-clamp-btn');

  function update() {
    const minVp = parseFloat(minVpEl.value);
    const maxVp = parseFloat(maxVpEl.value);
    const minFont = parseFloat(minFontEl.value);
    const maxFont = parseFloat(maxFontEl.value);

    if (isNaN(minVp) || isNaN(maxVp) || isNaN(minFont) || isNaN(maxFont) || minVp >= maxVp || minFont >= maxFont) return;

    // Linear slope: slope = (maxFont - minFont) / (maxVp - minVp)
    const slope = (maxFont - minFont) / (maxVp - minVp);
    const yIntercept = -minVp * slope + minFont;

    const slopeVw = (slope * 100).toFixed(2) + 'vw';
    const interceptRem = (yIntercept / 16).toFixed(3) + 'rem';
    const minRem = (minFont / 16).toFixed(3) + 'rem';
    const maxRem = (maxFont / 16).toFixed(3) + 'rem';

    const rule = 'font-size: clamp(' + minRem + ', ' + interceptRem + ' + ' + slopeVw + ', ' + maxRem + ');';
    outEl.value = rule;
  }

  [minVpEl, maxVpEl, minFontEl, maxFontEl].forEach(el => el.addEventListener('input', update));
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
      'Enter minimum viewport width (mobile, e.g. 360px) and maximum viewport (desktop, e.g. 1200px).',
      'Enter minimum and maximum target font sizes in pixels.',
      'Copy the mathematical CSS clamp() formula.'
    ],
    benefitTitle: 'Why Fluid Typography Eliminates Media Queries',
    benefitContent: 'Using CSS clamp() creates a continuous linear scaling gradient across every screen size without requiring dozens of hardcoded @media breakpoints.',
    faqs: [{ q: 'Is CSS clamp supported in modern browsers?', a: 'Yes, CSS clamp() has over 97% global browser support across all modern platforms.' }]
  }
];

tools13.forEach(createTool);
console.log('Mega pack 13 complete.');
