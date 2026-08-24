const { createTool } = require('./generate-curated-tools.cjs');

// Suite V: 5 Tools in Web Development, IPv4/IPv6 Networking & HTTP Protocols
const toolsSuiteV = [
  // 1. CIDR to Subnet Mask & Usable Hosts Calculator
  {
    slug: 'cidr-subnet-mask-ipv4-converter',
    name: 'CIDR to Subnet Mask & Usable Hosts Calculator',
    description: 'Convert CIDR slash prefixes (/0 to /32) to dotted-decimal IPv4 subnet masks, wildcard masks, and calculate total usable host IP capacities.',
    category: 'Developer',
    icon: 'code',
    keywords: ['cidr to subnet mask calculator', 'cidr notation converter', 'usable hosts per subnet calculator', 'wildcard mask calculator online', 'ipv4 slash prefix converter'],
    order: 289,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'CIDR Slash Prefix (/1 to /32)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cidr-prefix">Select CIDR Prefix:</label>
        <select class="tool-textarea" id="cidr-prefix">
          <option value="24" selected>/24 (Standard Class C - 256 IPs)</option>
          <option value="28">/28 (Small Office - 16 IPs)</option>
          <option value="26">/26 (Medium Subnet - 64 IPs)</option>
          <option value="20">/20 (Corporate Campus - 4,096 IPs)</option>
          <option value="16">/16 (Large Enterprise - 65,536 IPs)</option>
          <option value="8">/8 (Class A - 16.7M IPs)</option>
          <option value="30">/30 (Point-to-Point Link - 4 IPs)</option>
          <option value="32">/32 (Single Host IP)</option>
        </select>
      </div>
      <div id="cidr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cidr-res-mask" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">255.255.255.0</span>
            <span class="stat-label">Subnet Mask</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cidr-res-hosts" style="font-weight:700;">254 Usable Hosts</span>
            <span class="stat-label">Usable Host Capacity (2^(32-n) - 2)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cidr-res-wild">0.0.0.255</span>
            <span class="stat-label">Wildcard Mask</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cidr-prefix');
  const mEl = document.getElementById('cidr-res-mask'), hEl = document.getElementById('cidr-res-hosts'), wEl = document.getElementById('cidr-res-wild');

  function update() {
    const prefix = parseInt(pEl.value, 10);
    if (isNaN(prefix) || prefix < 0 || prefix > 32) return;

    // Mask integer = ~((1 << (32 - prefix)) - 1)
    const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
    const wildInt = (~maskInt) >>> 0;

    const m1 = (maskInt >>> 24) & 255, m2 = (maskInt >>> 16) & 255, m3 = (maskInt >>> 8) & 255, m4 = maskInt & 255;
    const w1 = (wildInt >>> 24) & 255, w2 = (wildInt >>> 16) & 255, w3 = (wildInt >>> 8) & 255, w4 = wildInt & 255;

    const totalIps = Math.pow(2, 32 - prefix);
    const usable = prefix === 32 ? 1 : (prefix === 31 ? 2 : Math.max(0, totalIps - 2));

    mEl.textContent = m1 + '.' + m2 + '.' + m3 + '.' + m4;
    hEl.textContent = usable.toLocaleString() + ' Usable Hosts (' + totalIps.toLocaleString() + ' Total IPs)';
    wEl.textContent = w1 + '.' + w2 + '.' + w3 + '.' + w4;
  }

  pEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select or change CIDR prefix notation (/8 to /32).',
      'Inspect dotted-decimal subnet mask, Cisco wildcard mask, and usable host count.'
    ],
    benefitTitle: 'Classless Inter-Domain Routing (CIDR)',
    benefitContent: 'Introduced in 1993 by RFC 1519, CIDR replaced rigid Class A/B/C address blocks with flexible variable-length subnetting (VLSM) to prevent IPv4 address exhaustion.',
    faqs: [{ q: 'Why are 2 IP addresses subtracted from total subnet hosts?', a: 'The first address is reserved as the Network Identifier, and the last address is reserved as the Subnet Broadcast Address.' }]
  },

  // 2. IPv6 Compression and Expansion Tool
  {
    slug: 'ipv6-compression-expansion-tool',
    name: 'IPv6 Address Compression & Expansion Tool',
    description: 'Compress IPv6 addresses into standard canonical RFC 5952 format with :: zero-suppression or fully expand into 8 complete 4-hex groups.',
    category: 'Developer',
    icon: 'code',
    keywords: ['ipv6 compression tool', 'ipv6 expander online', 'ipv6 canonical form rfc 5952', 'compress ipv6 address online', 'expand ipv6 to 8 blocks'],
    order: 290,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'IPv6 Address String',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="ip6-in">Enter IPv6 Address (Full or Compressed)</label>
        <input class="tool-textarea" id="ip6-in" type="text" value="2001:0db8:0000:0000:0000:ff00:0042:8329" placeholder="2001:db8::ff00:42:8329" />
      </div>
      <div id="ip6-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <div style="padding:0.4rem 0; border-bottom:1px solid var(--line);">
            <strong style="display:block; font-size:0.85rem; color:var(--text-muted);">RFC 5952 Canonical Compressed:</strong>
            <span id="ip6-comp" style="font-family:monospace; color:var(--green-dark); font-weight:700; font-size:1.1rem;">2001:db8::ff00:42:8329</span>
          </div>
          <div style="padding:0.4rem 0;">
            <strong style="display:block; font-size:0.85rem; color:var(--text-muted);">Fully Expanded (32 Hex Characters):</strong>
            <span id="ip6-exp" style="font-family:monospace; font-weight:700; font-size:0.95rem;">2001:0db8:0000:0000:0000:ff00:0042:8329</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('ip6-in');
  const compEl = document.getElementById('ip6-comp'), expEl = document.getElementById('ip6-exp');

  function expandIPv6(ip) {
    let clean = ip.trim().toLowerCase();
    if (clean.includes(':::')) return null;

    let parts = clean.split('::');
    if (parts.length > 2) return null;

    let left = parts[0] ? parts[0].split(':') : [];
    let right = parts[1] ? parts[1].split(':') : [];

    let missing = 8 - (left.length + right.length);
    if (missing < 0) return null;

    let middle = new Array(missing).fill('0000');
    let full = left.concat(parts.length === 2 ? middle : []).concat(right);

    if (full.length !== 8) return null;

    return full.map(g => g.padStart(4, '0'));
  }

  function compressIPv6(blocks) {
    let unpadded = blocks.map(b => parseInt(b, 16).toString(16));
    let str = unpadded.join(':');

    // Replace longest sequence of :0: with ::
    let bestStart = -1, bestLen = 0, curStart = -1, curLen = 0;
    for (let i = 0; i < unpadded.length; i++) {
      if (unpadded[i] === '0') {
        if (curStart === -1) { curStart = i; curLen = 1; }
        else { curLen++; }
        if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
      } else {
        curStart = -1; curLen = 0;
      }
    }

    if (bestLen > 1) {
      let left = unpadded.slice(0, bestStart).join(':');
      let right = unpadded.slice(bestStart + bestLen).join(':');
      return (left ? left : '') + '::' + (right ? right : '');
    }
    return str;
  }

  function update() {
    const raw = inEl.value;
    const blocks = expandIPv6(raw);
    if (!blocks) {
      compEl.textContent = 'Invalid IPv6 Address';
      expEl.textContent = '-';
      return;
    }

    expEl.textContent = blocks.join(':');
    compEl.textContent = compressIPv6(blocks);
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter an IPv6 address in compressed or uncompressed notation.',
      'Inspect the standard RFC 5952 canonical compressed string and the fully expanded 128-bit hexadecimal form.'
    ],
    benefitTitle: 'RFC 5952 IPv6 Representation Rules',
    benefitContent: 'RFC 5952 standardizes IPv6 text representation: leading zeroes in each 16-bit field MUST be suppressed, hexadecimal characters MUST be lowercase, and the longest contiguous run of zeros MUST be compressed into "::".',
    faqs: [{ q: 'What is the localhost IPv6 address?', a: '::1 (expanded as 0000:0000:0000:0000:0000:0000:0000:0001).' }]
  },

  // 3. MAC Address Format & Vendor OUI Inspector
  {
    slug: 'mac-address-formatter-lookup',
    name: 'MAC Address Formatter & OUI Parser',
    description: 'Format MAC hardware addresses into Colon (00:1A:2B:3C:4D:5E), Hyphen (00-1A-2B-3C-4D-5E), Cisco Dot (001a.2b3c.4d5e), and Bare Hex notations.',
    category: 'Developer',
    icon: 'code',
    keywords: ['mac address formatter', 'mac address converter', 'cisco mac address format', 'mac oui prefix lookup online', 'network hardware mac address cleaner'],
    order: 291,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'MAC Address String',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mac-in">Enter MAC Address</label>
        <input class="tool-textarea" id="mac-in" type="text" value="001A2B3C4D5E" placeholder="00:1A:2B:3C:4D:5E" />
      </div>
      <div id="mac-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Standard Colon:</strong> <span id="mac-colon" style="font-family:monospace; color:var(--green-dark); font-weight:700;">00:1A:2B:3C:4D:5E</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Windows Hyphen:</strong> <span id="mac-hyphen" style="font-family:monospace; font-weight:700;">00-1A-2B-3C-4D-5E</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Cisco Dotted:</strong> <span id="mac-cisco" style="font-family:monospace; font-weight:700;">001a.2b3c.4d5e</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>OUI Prefix (24b):</strong> <span id="mac-oui" style="font-family:monospace; font-weight:700; color:#2563eb;">00:1A:2B (Organization Unique Identifier)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('mac-in');
  const cEl = document.getElementById('mac-colon'), hEl = document.getElementById('mac-hyphen');
  const cisEl = document.getElementById('mac-cisco'), ouiEl = document.getElementById('mac-oui');

  function update() {
    const raw = inEl.value.trim().replace(/[^a-fA-F0-9]/g, '');
    if (raw.length !== 12) {
      cEl.textContent = 'Enter 12 hexadecimal characters';
      hEl.textContent = '-'; cisEl.textContent = '-'; ouiEl.textContent = '-';
      return;
    }

    const upper = raw.toUpperCase();
    const lower = raw.toLowerCase();

    // Colon: XX:XX:XX:XX:XX:XX
    const colon = upper.match(/.{2}/g).join(':');
    // Hyphen: XX-XX-XX-XX-XX-XX
    const hyphen = upper.match(/.{2}/g).join('-');
    // Cisco: xxxx.xxxx.xxxx
    const cisco = lower.match(/.{4}/g).join('.');
    // OUI: first 6 chars
    const oui = upper.slice(0, 6).match(/.{2}/g).join(':');

    cEl.textContent = colon;
    hEl.textContent = hyphen;
    cisEl.textContent = cisco;
    ouiEl.textContent = oui + ' (Manufacturer Prefix)';
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any 12-character MAC hardware address with or without delimiters.',
      'Inspect automatically formatted Colon, Hyphen, Cisco, and OUI hardware identifiers.'
    ],
    benefitTitle: 'IEEE 802 MAC Address Structure',
    benefitContent: 'A 48-bit MAC address consists of a 24-bit Organizationally Unique Identifier (OUI) assigned to network card manufacturers (e.g. Intel, Apple, Cisco) and a 24-bit Network Interface Controller (NIC) serial identifier.',
    faqs: [{ q: 'What is a Broadcast MAC Address?', a: 'FF:FF:FF:FF:FF:FF sends packets to all connected devices on the local Layer 2 broadcast domain.' }]
  },

  // 4. URL Query Parameter Parser & JSON Builder
  {
    slug: 'url-query-parameter-parser',
    name: 'URL Search Query Parameters Parser to JSON',
    description: 'Parse URL search queries (e.g. ?id=10&tab=profile&utm_source=google) into decoded JSON key-value objects and formatted query strings.',
    category: 'Developer',
    icon: 'code',
    keywords: ['url query parameter parser', 'parse url search params online', 'url query string to json converter', 'extract url parameters tool', 'decode url query string online'],
    order: 292,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'URL or Query String',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="url-param-in">Paste URL or Query String</label>
        <textarea class="tool-textarea" id="url-param-in" rows="3" placeholder="https://example.com/search?q=quantum+physics&category=science&page=2&sort=desc"></textarea>
      </div>
      <div id="url-param-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Parsed JSON Query Object:</label>
        <textarea class="tool-textarea" id="url-param-out" rows="6" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('url-param-in'), outEl = document.getElementById('url-param-out');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) { outEl.value = '{}'; return; }

    try {
      let search = raw;
      if (raw.includes('?')) {
        search = raw.slice(raw.indexOf('?'));
      }
      const params = new URLSearchParams(search);
      const obj = {};
      for (const [key, value] of params.entries()) {
        obj[key] = value;
      }
      outEl.value = JSON.stringify(obj, null, 2);
    } catch (e) {
      outEl.value = '{"error": "Invalid URL format"}';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste any web URL or query string snippet.',
      'Inspect parsed JSON object with auto-decoded URI components.'
    ],
    benefitTitle: 'Native URLSearchParams API',
    benefitContent: 'Utilizes modern Web APIs to automatically decode percent-encoded UTF-8 characters (e.g. %20 to space, %26 to &) and construct valid structured JSON.',
    faqs: [{ q: 'Can it handle multiple parameters?', a: 'Yes, it iterates through all key-value search pairs seamlessly.' }]
  },

  // 5. HTTP Status Code Inspector & Reference Tool
  {
    slug: 'http-status-code-checker',
    name: 'HTTP Status Code Reference & Response Inspector',
    description: 'Lookup HTTP REST API response status codes (200, 201, 301, 400, 401, 403, 404, 500, 503) with RFC specifications, caching rules, and browser behaviors.',
    category: 'Developer',
    icon: 'code',
    keywords: ['http status code checker', 'http status codes reference', 'rest api response codes guide', '404 500 301 http code meaning', 'http status code lookup online'],
    order: 293,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Search or Select HTTP Status Code',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="http-select">Select HTTP Code:</label>
        <select class="tool-textarea" id="http-select">
          <option value="200" selected>200 OK - Successful GET/POST response</option>
          <option value="201">201 Created - Resource created successfully</option>
          <option value="204">204 No Content - Action succeeded, no body returned</option>
          <option value="301">301 Moved Permanently - Permanent URL redirect (SEO)</option>
          <option value="302">302 Found - Temporary redirect</option>
          <option value="304">304 Not Modified - Cached response revalidation</option>
          <option value="400">400 Bad Request - Malformed payload or validation failure</option>
          <option value="401">401 Unauthorized - Missing/invalid authentication token</option>
          <option value="403">403 Forbidden - Authenticated but lacks permissions</option>
          <option value="404">404 Not Found - Requested endpoint does not exist</option>
          <option value="429">429 Too Many Requests - Rate limit exceeded</option>
          <option value="500">500 Internal Server Error - Unhandled backend exception</option>
          <option value="502">502 Bad Gateway - Upstream reverse proxy error</option>
          <option value="503">503 Service Unavailable - Server overloaded / maintenance</option>
        </select>
      </div>
      <div id="http-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
            <span id="http-badge" style="background:#22c55e; color:#fff; padding:0.25rem 0.6rem; border-radius:6px; font-weight:800; font-size:1.1rem;">200 OK</span>
            <span id="http-cat" style="font-weight:700; color:var(--text-muted);">2xx Success</span>
          </div>
          <p id="http-desc" style="margin:0; font-size:0.95rem; line-height:1.5;">The standard response for successful HTTP requests. The payload returned depends on the request method (GET returns data, POST returns action result).</p>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const selEl = document.getElementById('http-select');
  const badgeEl = document.getElementById('http-badge'), catEl = document.getElementById('http-cat'), descEl = document.getElementById('http-desc');

  const DATA = {
    '200': { cat: '2xx Success', color: '#22c55e', desc: 'Standard successful HTTP response. GET returns data payload, POST returns action result.' },
    '201': { cat: '2xx Success', color: '#22c55e', desc: 'The request succeeded and led to the creation of a new resource (usually returned on POST/PUT with a Location header).' },
    '204': { cat: '2xx Success', color: '#22c55e', desc: 'The server successfully processed the request, but is not returning any content (commonly used for DELETE operations).' },
    '301': { cat: '3xx Redirection', color: '#3b82f6', desc: 'Permanent Redirect. Search engines transfer SEO link juice to the target URL provided in the Location header.' },
    '302': { cat: '3xx Redirection', color: '#3b82f6', desc: 'Temporary Redirect. The resource is temporarily located at another URI; search engines do not transfer link equity.' },
    '304': { cat: '3xx Redirection', color: '#3b82f6', desc: 'Not Modified. Informs the browser that its cached copy (via ETag or If-Modified-Since) is still valid, saving bandwidth.' },
    '400': { cat: '4xx Client Error', color: '#ef4444', desc: 'Bad Request. The server cannot process the request due to invalid syntax, malformed JSON, or missing required fields.' },
    '401': { cat: '4xx Client Error', color: '#ef4444', desc: 'Unauthorized. The client must authenticate itself by providing valid credentials or a Bearer token.' },
    '403': { cat: '4xx Client Error', color: '#ef4444', desc: 'Forbidden. The client identity is recognized, but does not have permission access rights to the requested resource.' },
    '404': { cat: '4xx Client Error', color: '#ef4444', desc: 'Not Found. The server cannot find the requested URL endpoint.' },
    '429': { cat: '4xx Client Error', color: '#f59e0b', desc: 'Too Many Requests. The user has sent too many requests in a given time window (Rate Limiting triggered).' },
    '500': { cat: '5xx Server Error', color: '#dc2626', desc: 'Internal Server Error. The backend application encountered an unexpected crash or uncaught exception.' },
    '502': { cat: '5xx Server Error', color: '#dc2626', desc: 'Bad Gateway. The reverse proxy (Nginx, Cloudflare) received an invalid or failed response from the upstream origin server.' },
    '503': { cat: '5xx Server Error', color: '#dc2626', desc: 'Service Unavailable. The server is temporarily unable to handle the request due to maintenance or extreme traffic overload.' }
  };

  function update() {
    const code = selEl.value;
    const info = DATA[code] || DATA['200'];

    badgeEl.textContent = code + ' ' + selEl.options[selEl.selectedIndex].text.split(' - ')[0].replace(/^[0-9]+\s*/, '');
    badgeEl.style.background = info.color;
    catEl.textContent = info.cat;
    descEl.textContent = info.desc;
  }

  selEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select any standard HTTP status code.',
      'Inspect semantic meaning, client vs server classification, and caching implications.'
    ],
    benefitTitle: 'IETF RFC 9110 HTTP Semantics Standard',
    benefitContent: 'HTTP status codes standardize communication between web clients, proxies, CDNs, and backend servers across 5 distinct classes (1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error).',
    faqs: [{ q: 'What is the difference between 401 and 403?', a: '401 means "Unauthenticated" (login credentials missing/invalid); 403 means "Forbidden" (you are logged in, but lack administrative permission).' }]
  }
];

toolsSuiteV.forEach(createTool);
console.log('Suite V complete: 5 tools created.');
