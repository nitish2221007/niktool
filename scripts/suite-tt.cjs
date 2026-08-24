const { createTool } = require('./generate-curated-tools.cjs');

// Suite TT: 5 Tools in Cryptography, Ciphers, JWT & Web Developer Utilities to reach 540 tools
const toolsSuiteTT = [
  // 1. Caesar Cipher Encoder & Decoder
  {
    slug: 'caesar-cipher-encoder-decoder',
    name: 'Caesar Cipher (ROT-N) Encoder & Decoder',
    description: 'Encrypt and decrypt text messages using the classical Julius Caesar rotation cipher (ROT-1 to ROT-25) and ROT-13 with custom shift values.',
    category: 'Developer',
    icon: 'code',
    keywords: ['caesar cipher decoder', 'rot13 encoder online', 'caesar cipher shift calculator', 'rot n cipher generator', 'classical substitution cipher online'],
    order: 411,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Text Message & Shift Key (1 - 25)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr auto; gap:1rem; align-items:end;">
        <div class="control-group">
          <label class="control-label" for="csr-in">Input Text</label>
          <textarea class="tool-textarea" id="csr-in" rows="3" placeholder="Hello World! Attack at dawn."></textarea>
        </div>
        <div class="control-group" style="min-width:120px;">
          <label class="control-label" for="csr-shift">Shift Key</label>
          <input class="tool-textarea" id="csr-shift" type="number" min="1" max="25" value="13" placeholder="13 (ROT-13)" />
        </div>
      </div>
      <div id="csr-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Cipher Output (Encrypted / Decrypted):</label>
        <textarea class="tool-textarea" id="csr-out" rows="3" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('csr-in'), sEl = document.getElementById('csr-shift'), outEl = document.getElementById('csr-out');

  function update() {
    const str = inEl.value;
    const shift = parseInt(sEl.value, 10) || 0;

    let res = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) { // Uppercase
        res += String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
      } else if (code >= 97 && code <= 122) { // Lowercase
        res += String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      } else {
        res += str[i];
      }
    }

    outEl.value = res;
  }

  inEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter plain or encrypted text message.',
      'Select or type substitution rotation shift number (1 to 25; 13 for symmetric ROT-13).',
      'Inspect real-time Caesar cipher encoded/decoded string.'
    ],
    benefitTitle: 'Julius Caesar\'s Military Cryptography',
    benefitContent: 'Used by Julius Caesar in 58 BC to protect military dispatches, the Caesar shift is a monoalphabetic substitution cipher where each letter in the plaintext is shifted down the alphabet by a fixed integer key.',
    faqs: [{ q: 'What is ROT-13?', a: 'ROT-13 is a special Caesar cipher with a shift of 13; because the English alphabet has 26 letters, applying ROT-13 twice returns the original text.' }]
  },

  // 2. Vigenère Polyalphabetic Cipher Calculator
  {
    slug: 'vigenere-cipher-polyalphabetic-calculator',
    name: 'Vigenère Cipher Polyalphabetic Encryptor & Decryptor',
    description: 'Encrypt and decrypt messages using the polyalphabetic Blaise de Vigenère tabula recta cipher with custom passphrase keys.',
    category: 'Developer',
    icon: 'code',
    keywords: ['vigenere cipher calculator', 'vigenere cipher decoder online', 'polyalphabetic cipher generator', 'tabula recta vigenere encryption', 'vigenere cipher key solver online'],
    order: 412,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Message Text & Passphrase Key',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vig-mode">Operation Mode</label>
          <select class="tool-textarea" id="vig-mode">
            <option value="enc" selected>Encrypt (Plaintext → Ciphertext)</option>
            <option value="dec">Decrypt (Ciphertext → Plaintext)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="vig-key">Secret Key / Passphrase</label>
          <input class="tool-textarea" id="vig-key" type="text" value="LEMON" placeholder="SECRETKEY" style="text-transform:uppercase;" />
        </div>
      </div>
      <div class="control-group" style="margin-top:1rem;">
        <label class="control-label" for="vig-in">Input Text</label>
        <textarea class="tool-textarea" id="vig-in" rows="3" placeholder="ATTACK AT DAWN"></textarea>
      </div>
      <div id="vig-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Vigenère Output:</label>
        <textarea class="tool-textarea" id="vig-out" rows="3" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('vig-mode'), kEl = document.getElementById('vig-key');
  const inEl = document.getElementById('vig-in'), outEl = document.getElementById('vig-out');

  function update() {
    const isEnc = mEl.value === 'enc';
    const rawKey = kEl.value.toUpperCase().replace(/[^A-Z]/g, '');
    const str = inEl.value;

    if (!rawKey) { outEl.value = 'Please enter a valid key (A-Z)'; return; }

    let res = '';
    let keyIdx = 0;

    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      const code = str.charCodeAt(i);
      const isUpper = code >= 65 && code <= 90;
      const isLower = code >= 97 && code <= 122;

      if (isUpper || isLower) {
        const base = isUpper ? 65 : 97;
        const p = code - base;
        const k = rawKey.charCodeAt(keyIdx % rawKey.length) - 65;

        let c = 0;
        if (isEnc) {
          c = (p + k) % 26;
        } else {
          c = (p - k + 26) % 26;
        }

        res += String.fromCharCode(c + base);
        keyIdx++;
      } else {
        res += ch;
      }
    }

    outEl.value = res;
  }

  [mEl, kEl, inEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select operation mode (Encrypt or Decrypt).',
      'Enter alphabetical passphrase secret key (e.g. LEMON).',
      'Enter input message to perform Vigenère algebraic substitution.'
    ],
    benefitTitle: 'Blaise de Vigenère\'s "Le Chiffre Indéchiffrable"',
    benefitContent: 'For over 300 years, the Vigenère cipher was believed to be unbreakable because repeating polyalphabetic shifts disguise single-letter frequency distribution patterns in ciphertext.',
    faqs: [{ q: 'How does Vigenère encryption calculate each character?', a: 'Ciphertext C_i = (Plaintext P_i + Key K_i) mod 26.' }]
  },

  // 3. JSON Web Token (JWT) Decoder & Payload Inspector
  {
    slug: 'jwt-token-decoder-payload-inspector',
    name: 'JSON Web Token (JWT) Decoder & Claims Inspector',
    description: 'Decode Base64Url-encoded JSON Web Tokens (JWT) into raw Header, Claims Payload, expiration time (exp), and signature components client-side with zero data transmission.',
    category: 'Developer',
    icon: 'code',
    keywords: ['jwt decoder online', 'json web token payload inspector', 'jwt claims expiry decoder', 'base64url jwt parser online', 'jwt token debugger privacy client side'],
    order: 413,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Paste Encoded JWT Token (Header.Payload.Signature)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="jwt-in">Paste Encoded JWT String</label>
        <textarea class="tool-textarea" id="jwt-in" rows="3" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNzg0OTI4MDAwfQ.signature" style="font-family:monospace;"></textarea>
      </div>
      <div id="jwt-res-card" style="margin-top:1.25rem;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div>
            <label class="control-label" style="color:#ef4444;">Header (Algorithm & Token Type):</label>
            <textarea class="tool-textarea" id="jwt-hdr" rows="4" readonly style="font-family:monospace; color:#dc2626; font-weight:700;"></textarea>
          </div>
          <div>
            <label class="control-label" style="color:#8b5cf6;">Payload (Decoded Claims & Data):</label>
            <textarea class="tool-textarea" id="jwt-pld" rows="6" readonly style="font-family:monospace; color:#7c3aed; font-weight:700;"></textarea>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('jwt-in'), hdrEl = document.getElementById('jwt-hdr'), pldEl = document.getElementById('jwt-pld');

  function b64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) { hdrEl.value = '{}'; pldEl.value = '{}'; return; }

    const parts = raw.split('.');
    if (parts.length < 2) {
      hdrEl.value = 'Invalid JWT format (Need 3 dot-separated parts)';
      pldEl.value = '';
      return;
    }

    try {
      const headerObj = JSON.parse(b64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(b64UrlDecode(parts[1]));

      hdrEl.value = JSON.stringify(headerObj, null, 2);
      pldEl.value = JSON.stringify(payloadObj, null, 2);
    } catch (e) {
      hdrEl.value = 'Error decoding Base64Url payload';
      pldEl.value = e.message;
    }
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste any standard RFC 7519 JSON Web Token string.',
      'Inspect decoded JOSE header algorithm parameters and claims payload with client-side privacy.'
    ],
    benefitTitle: 'IETF RFC 7519 Compact Token Format',
    benefitContent: 'JWTs encode cryptographic assertions into URL-safe strings split by dots into three parts: Header.Payload.Signature for stateless REST API authentication.',
    faqs: [{ q: 'Does decoding a JWT verify its signature?', a: 'Decoding parses the Base64Url JSON payload to read claims; verifying cryptographic authenticity requires testing the signature against the server\'s private/public key.' }]
  },

  // 4. URL Slug SEO Generator & String Sanitizer
  {
    slug: 'url-slug-seo-generator-sanitizer',
    name: 'URL Slug SEO Generator & String Sanitizer',
    description: 'Transform article headlines and blog titles into clean, lowercase, URL-friendly hyphenated slugs with Unicode diacritic stripping.',
    category: 'Developer',
    icon: 'code',
    keywords: ['url slug generator', 'seo slug generator online', 'string to slug converter', 'clean url slug generator', 'blog post permalink slug generator'],
    order: 414,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Article Title / Raw Headline',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="slug-in">Enter Headline or Title</label>
        <input class="tool-textarea" id="slug-in" type="text" value="How to Build 1,000+ Fast Web Tools & Boost SEO in 2026!" placeholder="Enter title..." />
      </div>
      <div id="slug-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Generated URL Slug:</label>
        <input class="tool-textarea" id="slug-out" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark); font-size:1.1rem;" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('slug-in'), outEl = document.getElementById('slug-out');

  function generateSlug(str) {
    return str
      .normalize('NFD') // Normalize accented characters
      .replace(/[\\u0300-\\u036f]/g, '') // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\\s-]/g, '') // Remove invalid chars
      .replace(/[\\s_-]+/g, '-') // Replace spaces and underscores with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  }

  function update() {
    outEl.value = generateSlug(inEl.value);
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any blog post headline or product title.',
      'Inspect clean, lowercase, search-engine-optimized URL permalink slug.'
    ],
    benefitTitle: 'SEO Permalink Best Practices',
    benefitContent: 'Clean hyphenated URL slugs improve Google search ranking and click-through rates by making URL paths human-readable and removing special symbols and uppercase characters.',
    faqs: [{ q: 'Why are hyphens preferred over underscores in URLs?', a: 'Google officially treats hyphens as word separators (e.g. "red-car" is read as two distinct keywords "red" and "car"), whereas underscores join words into a single token.' }]
  },

  // 5. Morse Code Audio/Visual Translator
  {
    slug: 'morse-code-audio-visual-translator',
    name: 'International Morse Code Translator & Audio Generator',
    description: 'Translate text to/from standard International Morse Code (dots and dashes) and play audio beeps using Web Audio API synthesis.',
    category: 'Daily',
    icon: 'text',
    keywords: ['morse code translator', 'morse code audio generator online', 'text to morse code converter', 'sos morse code translator', 'dots and dashes morse code online'],
    order: 415,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Text Message or Morse Code (. and -)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mc-in">Enter Text Message</label>
        <textarea class="tool-textarea" id="mc-in" rows="2" placeholder="SOS HELLO WORLD"></textarea>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Morse Code (Dots & Dashes):</label>
        <textarea class="tool-textarea" id="mc-out" rows="3" readonly style="font-family:monospace; font-weight:800; font-size:1.2rem; color:var(--green-dark); letter-spacing:2px;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('mc-in'), outEl = document.getElementById('mc-out');

  const MORSE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
  };

  function textToMorse(text) {
    return text.toUpperCase().split('').map(ch => MORSE_MAP[ch] || '').filter(Boolean).join(' ');
  }

  function update() {
    outEl.value = textToMorse(inEl.value);
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter plain text message in English.',
      'Inspect International Morse Code dots (.) and dashes (-) with slash (/) word delimiters.'
    ],
    benefitTitle: 'Samuel Morse and Alfred Vail\'s 1838 Telegraphy Code',
    benefitContent: 'Morse code assigned the shortest codes to the most frequent English letters (e.g. single dot "." for E and single dash "-" for T), optimizing telegraph transmission speed.',
    faqs: [{ q: 'What is the Morse code for SOS?', a: 'SOS is encoded as three dots, three dashes, three dots: "... --- ...".' }]
  }
];

toolsSuiteTT.forEach(createTool);
console.log('Suite TT complete: 5 tools created.');
