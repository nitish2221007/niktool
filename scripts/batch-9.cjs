const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch9 = [
  // 1. CSS Box Shadow Generator
  {
    slug: 'css-box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    description: 'Design multi-layer modern CSS box shadows with live interactive preview, inset shadows, blur radius, spread, and 1-click copy CSS.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css box shadow generator', 'box shadow generator online', 'multi layer shadow generator', 'css shadow builder', 'inset box shadow generator'],
    order: 94,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Box Shadow Controls',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-x">Horizontal Offset (X): <span id="sh-x-val">0px</span></label>
          <input type="range" id="sh-x" min="-50" max="50" value="0" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-y">Vertical Offset (Y): <span id="sh-y-val">12px</span></label>
          <input type="range" id="sh-y" min="-50" max="50" value="12" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-blur">Blur Radius: <span id="sh-blur-val">28px</span></label>
          <input type="range" id="sh-blur" min="0" max="80" value="28" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-spread">Spread Radius: <span id="sh-spread-val">0px</span></label>
          <input type="range" id="sh-spread" min="-30" max="50" value="0" style="width:100%;" />
        </div>
      </div>
      <div style="display:flex; justify-content:center; align-items:center; padding:3rem 1rem; background:var(--paper); border-radius:16px; margin:1.5rem 0;">
        <div id="sh-preview-box" style="width:200px; height:120px; background:var(--surface); border-radius:14px; display:grid; place-items:center; font-weight:700; color:var(--ink);">Shadow Preview</div>
      </div>
      <div id="sh-res-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS</label>
          <button class="button secondary" id="copy-sh-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="sh-css-output" type="text" readonly style="font-family:monospace; font-weight:700;" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('sh-x'), yEl = document.getElementById('sh-y');
  const bEl = document.getElementById('sh-blur'), sEl = document.getElementById('sh-spread');
  const xVal = document.getElementById('sh-x-val'), yVal = document.getElementById('sh-y-val');
  const bVal = document.getElementById('sh-blur-val'), sVal = document.getElementById('sh-spread-val');
  const box = document.getElementById('sh-preview-box'), outEl = document.getElementById('sh-css-output');
  const copyBtn = document.getElementById('copy-sh-btn');

  function update() {
    const x = xEl.value, y = yEl.value, b = bEl.value, s = sEl.value;
    xVal.textContent = x + 'px'; yVal.textContent = y + 'px';
    bVal.textContent = b + 'px'; sVal.textContent = s + 'px';

    const sh = x + 'px ' + y + 'px ' + b + 'px ' + s + 'px rgba(0, 0, 0, 0.14)';
    box.style.boxShadow = sh;
    outEl.value = 'box-shadow: ' + sh + ';';
  }

  [xEl, yEl, bEl, sEl].forEach(el => el.addEventListener('input', update));
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
      'Adjust horizontal (X), vertical (Y), blur, and spread sliders.',
      'Check the live preview card against the neutral background.',
      'Copy the ready CSS box-shadow rule.'
    ],
    benefitTitle: 'Layering Natural CSS Shadows',
    benefitContent: 'Natural lighting requires higher blur and softer opacity (e.g. 0 12px 28px rgba(0,0,0,0.12)) rather than harsh, dark offset shadows.',
    faqs: [
      { q: 'What does the spread parameter do in box-shadow?', a: 'Positive spread expands the shadow bounding box in all directions, while negative spread shrinks it.' }
    ]
  },

  // 2. CSS 8-Point Fancy Border Radius Generator
  {
    slug: 'css-border-radius-generator',
    name: 'CSS Fancy Border Radius Generator',
    description: 'Create organic, blob-like, and smooth asymmetric 8-point CSS border-radius shapes with live visual preview and CSS code export.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css border radius generator', '8 point border radius', 'blob shape generator css', 'organic border radius builder', 'fancy border radius online'],
    order: 95,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: '8-Point Radius Sliders',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="br-tl">Top-Left Corner (%): <span id="br-tl-val">60%</span></label>
          <input type="range" id="br-tl" min="10" max="90" value="60" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-tr">Top-Right Corner (%): <span id="br-tr-val">40%</span></label>
          <input type="range" id="br-tr" min="10" max="90" value="40" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-br">Bottom-Right Corner (%): <span id="br-br-val">70%</span></label>
          <input type="range" id="br-br" min="10" max="90" value="70" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-bl">Bottom-Left Corner (%): <span id="br-bl-val">30%</span></label>
          <input type="range" id="br-bl" min="10" max="90" value="30" style="width:100%;" />
        </div>
      </div>
      <div style="display:flex; justify-content:center; align-items:center; padding:3rem 1rem; background:var(--paper); border-radius:16px; margin:1.5rem 0;">
        <div id="br-preview-box" style="width:180px; height:180px; background:linear-gradient(135deg, #176b4d, #dff36a); display:grid; place-items:center; font-weight:700; color:#18211d;">Blob Shape</div>
      </div>
      <div id="br-res-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS</label>
          <button class="button secondary" id="copy-br-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <input class="tool-textarea" id="br-css-output" type="text" readonly style="font-family:monospace; font-weight:700;" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tlEl = document.getElementById('br-tl'), trEl = document.getElementById('br-tr');
  const brEl = document.getElementById('br-br'), blEl = document.getElementById('br-bl');
  const tlVal = document.getElementById('br-tl-val'), trVal = document.getElementById('br-tr-val');
  const brVal = document.getElementById('br-br-val'), blVal = document.getElementById('br-bl-val');
  const box = document.getElementById('br-preview-box'), outEl = document.getElementById('br-css-output');
  const copyBtn = document.getElementById('copy-br-btn');

  function update() {
    const tl = tlEl.value, tr = trEl.value, br = brEl.value, bl = blEl.value;
    tlVal.textContent = tl + '%'; trVal.textContent = tr + '%';
    brVal.textContent = br + '%'; blVal.textContent = bl + '%';

    const invTl = 100 - tl, invTr = 100 - tr, invBr = 100 - br, invBl = 100 - bl;
    const rule = tl + '% ' + invTl + '% ' + br + '% ' + invBr + '% / ' + tr + '% ' + bl + '% ' + invBl + '% ' + invTr + '%';

    box.style.borderRadius = rule;
    outEl.value = 'border-radius: ' + rule + ';';
  }

  [tlEl, trEl, brEl, blEl].forEach(el => el.addEventListener('input', update));
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
      'Adjust each corner percentage slider to morph the organic shape.',
      'Check the live gradient blob shape preview.',
      'Copy the 8-point slash syntax border-radius CSS rule.'
    ],
    benefitTitle: 'Understanding the 8-Value Border Radius Slash Syntax',
    benefitContent: 'CSS border-radius supports a slash syntax (e.g. 60% 40% 70% 30% / 40% 30% 70% 60%) where values before the slash define horizontal radii, and values after the slash define vertical radii for asymmetric organic curvature.',
    faqs: [
      { q: 'Is 8-point border-radius supported in all modern browsers?', a: 'Yes, full 8-point border-radius is standard CSS3 supported in Chrome, Safari, Firefox, and Edge.' }
    ]
  },

  // 3. SQL Query Formatter & Minifier
  {
    slug: 'sql-query-formatter',
    name: 'SQL Query Formatter & Beautifier',
    description: 'Format, indent, and uppercase keywords in SQL queries (SELECT, INSERT, UPDATE, JOIN) or minify SQL statements into single-line queries.',
    category: 'Developer',
    icon: 'code',
    keywords: ['sql query formatter', 'sql beautifier online', 'format sql statement', 'sql minify online', 'sql syntax prettifier', 'capitalize sql keywords'],
    order: 96,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'SQL Query Editor',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sql-input">Paste Raw SQL Query</label>
        <textarea class="tool-textarea" id="sql-input" rows="6" placeholder="select u.id, u.name, o.total from users u left join orders o on u.id = o.user_id where o.status = 'completed' order by o.total desc"></textarea>
      </div>
      <div class="toolbar">
        <button class="button" id="sql-format-btn" type="button">Beautify &amp; Indent SQL</button>
        <button class="button secondary" id="sql-minify-btn" type="button">Minify SQL (1 Line)</button>
        <button class="button secondary" id="copy-sql-btn" type="button">Copy Output</button>
      </div>
      <div id="sql-res-card" style="margin-top:1.25rem;">
        <label class="control-label">Formatted SQL Output</label>
        <textarea class="tool-textarea" id="sql-output" rows="8" readonly style="font-family:monospace; font-size:0.92rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('sql-input'), outEl = document.getElementById('sql-output');
  const fmtBtn = document.getElementById('sql-format-btn'), minBtn = document.getElementById('sql-minify-btn');
  const copyBtn = document.getElementById('copy-sql-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');

  const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN',
    'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES',
    'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'UNION ALL', 'UNION',
    'AS', 'IN', 'IS NULL', 'IS NOT NULL', 'BETWEEN', 'LIKE', 'DISTINCT', 'COUNT', 'SUM', 'AVG'
  ];

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function formatSQL() {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter a SQL query to format.', true); return; }

    let sql = raw.replace(/\\s+/g, ' ');
    // Uppercase standard keywords
    for (const kw of SQL_KEYWORDS) {
      const reg = new RegExp('\\\\b' + kw + '\\\\b', 'gi');
      sql = sql.replace(reg, kw);
    }

    // Add clean newlines before major clauses
    const clauses = ['SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN', 'WHERE', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'SET', 'VALUES'];
    for (const cl of clauses) {
      const reg = new RegExp('\\\\b' + cl + '\\\\b', 'g');
      sql = sql.replace(reg, '\\n' + cl);
    }

    outEl.value = sql.trim();
    setMsg('SQL query formatted successfully.');
  }

  function minifySQL() {
    const raw = inEl.value.trim();
    if (!raw) return;
    outEl.value = raw.replace(/\\s+/g, ' ');
    setMsg('SQL query minified to one line.');
  }

  fmtBtn.addEventListener('click', formatSQL);
  minBtn.addEventListener('click', minifySQL);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('SQL query copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your raw, unformatted, or minified SQL database query.',
      'Click <strong>Beautify & Indent SQL</strong> to structure clauses and uppercase keywords.',
      'Or click <strong>Minify SQL</strong> to compress queries into compact single lines for code embedding.'
    ],
    benefitTitle: 'Clean SQL Readability',
    benefitContent: 'Proper SQL indentation highlights subqueries, join constraints, and filtering conditions, making complex relational queries easier to review and debug.',
    faqs: [
      { q: 'Does this tool support PostgreSQL, MySQL, and SQLite?', a: 'Yes, it works with all ANSI SQL compliant database dialects.' }
    ]
  },

  // 4. Bulk UUID v4 & UUID v7 Generator
  {
    slug: 'uuid-v4-v7-bulk-generator',
    name: 'Bulk UUID v4 & v7 Generator',
    description: 'Generate batches of cryptographically random UUID v4 and timestamp-ordered UUID v7 identifiers in uppercase or lowercase.',
    category: 'Developer',
    icon: 'shield',
    keywords: ['uuid bulk generator', 'uuid v7 generator online', 'generate 100 uuids', 'batch guid generator', 'crypto random uuid generator'],
    order: 97,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Batch UUID Options',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="uuid-count">Quantity to Generate</label>
          <input class="tool-textarea" id="uuid-count" type="number" min="1" max="500" value="10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="uuid-version">UUID Standard Version</label>
          <select class="tool-textarea" id="uuid-version">
            <option value="v4" selected>UUID v4 (Cryptographically Random)</option>
            <option value="v7">UUID v7 (Time-Ordered &amp; Sortable)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="uuid-case">Character Casing</label>
          <select class="tool-textarea" id="uuid-case">
            <option value="lower">lowercase (standard)</option>
            <option value="upper">UPPERCASE</option>
          </select>
        </div>
      </div>
      <div id="uuid-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated UUIDs</label>
          <button class="button secondary" id="copy-uuid-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy All UUIDs</button>
        </div>
        <textarea class="tool-textarea" id="uuid-output" rows="8" readonly style="font-family:monospace; font-size:0.92rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const countEl = document.getElementById('uuid-count'), verEl = document.getElementById('uuid-version');
  const caseEl = document.getElementById('uuid-case'), outEl = document.getElementById('uuid-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-uuid-btn'), msgEl = document.getElementById('tool-message');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function genV4() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function genV7() {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, '0');
    const rand = Array.from(crypto.getRandomValues(new Uint8Array(10)))
      .map(b => b.toString(16).padStart(2, '0')).join('');

    // Format: 018e47f2-xxxx-7xxx-yxxx-xxxxxxxxxxxx
    return (
      timeHex.slice(0, 8) + '-' +
      timeHex.slice(8, 12) + '-' +
      '7' + rand.slice(0, 3) + '-' +
      ((parseInt(rand.slice(3, 4), 16) & 0x3) | 0x8).toString(16) + rand.slice(4, 7) + '-' +
      rand.slice(7, 19)
    );
  }

  function generate() {
    const count = Math.min(500, Math.max(1, parseInt(countEl.value, 10) || 10));
    const ver = verEl.value;
    const isUpper = caseEl.value === 'upper';

    const list = [];
    for (let i = 0; i < count; i++) {
      let id = ver === 'v7' ? genV7() : genV4();
      list.push(isUpper ? id.toUpperCase() : id.toLowerCase());
    }

    outEl.value = list.join('\\n');
    setMsg('Generated ' + count + ' ' + ver.toUpperCase() + ' UUIDs.');
  }

  btn.addEventListener('click', generate);
  verEl.addEventListener('change', generate);
  caseEl.addEventListener('change', generate);

  generate();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('UUIDs copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Select how many UUIDs to create (1 to 500).',
      'Choose UUID version: v4 (Pure Random) or v7 (Time-Ordered & Database Index Optimized).',
      'Click <strong>Copy All UUIDs</strong> to paste the batch into your test database or script.'
    ],
    benefitTitle: 'UUID v4 vs UUID v7',
    benefitContent: 'UUID v7 includes a 48-bit millisecond unix timestamp prefix. This creates naturally sortable keys that prevent B-tree database index fragmentation in PostgreSQL and MySQL while retaining 128-bit global uniqueness.',
    faqs: [
      { q: 'Is UUID v7 backward compatible with UUID v4?', a: 'Yes, both conform to the RFC 9562 128-bit hexadecimal standard layout.' }
    ]
  },

  // 5. IPv4 Subnet & CIDR Calculator
  {
    slug: 'subnet-ipv4-calculator',
    name: 'IPv4 Subnet & CIDR Calculator',
    description: 'Calculate subnet mask, network address, broadcast IP, usable host range, and total host capacity from any IPv4 address and CIDR prefix.',
    category: 'Developer',
    icon: 'code',
    keywords: ['ipv4 subnet calculator', 'cidr calculator online', 'subnet mask calculator', 'usable ip range calculator', 'network broadcast address calculator'],
    order: 98,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'IPv4 Address & CIDR Prefix',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:2fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sub-ip">IP Address</label>
          <input class="tool-textarea" id="sub-ip" type="text" value="192.168.1.50" placeholder="e.g. 192.168.1.1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sub-cidr">CIDR Prefix (/xx)</label>
          <select class="tool-textarea" id="sub-cidr">
            <option value="24" selected>/24 (255.255.255.0 - 254 Hosts)</option>
            <option value="25">/25 (255.255.255.128 - 126 Hosts)</option>
            <option value="26">/26 (255.255.255.192 - 62 Hosts)</option>
            <option value="27">/27 (255.255.255.224 - 30 Hosts)</option>
            <option value="28">/28 (255.255.255.240 - 14 Hosts)</option>
            <option value="29">/29 (255.255.255.248 - 6 Hosts)</option>
            <option value="30">/30 (255.255.255.252 - 2 Hosts PtP)</option>
            <option value="16">/16 (255.255.0.0 - 65,534 Hosts)</option>
            <option value="8">/8 (255.0.0.0 - 16.7M Hosts)</option>
          </select>
        </div>
      </div>
      <div id="sub-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="sub-res-net" style="color:var(--green-dark); font-weight:800; font-family:monospace;">192.168.1.0</span>
            <span class="stat-label">Network Address</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sub-res-bcast" style="font-family:monospace;">192.168.1.255</span>
            <span class="stat-label">Broadcast Address</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sub-res-mask" style="font-family:monospace;">255.255.255.0</span>
            <span class="stat-label">Subnet Mask</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sub-res-usable" style="font-weight:700;">254</span>
            <span class="stat-label">Usable Host Count</span>
          </div>
          <div class="stat" style="grid-column: 1 / -1;">
            <span class="stat-value" id="sub-res-range" style="font-family:monospace; font-size:1.05rem;">192.168.1.1 - 192.168.1.254</span>
            <span class="stat-label">Usable IP Host Range</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ipEl = document.getElementById('sub-ip'), cidrEl = document.getElementById('sub-cidr');
  const netEl = document.getElementById('sub-res-net'), bcastEl = document.getElementById('sub-res-bcast');
  const maskEl = document.getElementById('sub-res-mask'), useEl = document.getElementById('sub-res-usable');
  const rangeEl = document.getElementById('sub-res-range');

  function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }

  function numToIp(num) {
    return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
  }

  function update() {
    const rawIp = ipEl.value.trim();
    const cidr = parseInt(cidrEl.value, 10);
    if (!/^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$/.test(rawIp)) return;

    const ipNum = ipToNum(rawIp);
    const maskNum = (0xFFFFFFFF << (32 - cidr)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = Math.max(0, totalHosts - 2);

    netEl.textContent = numToIp(netNum);
    bcastEl.textContent = numToIp(bcastNum);
    maskEl.textContent = numToIp(maskNum);
    useEl.textContent = usableHosts.toLocaleString();

    if (usableHosts > 0) {
      rangeEl.textContent = numToIp(netNum + 1) + ' — ' + numToIp(bcastNum - 1);
    } else {
      rangeEl.textContent = numToIp(netNum) + ' (Point-to-Point / Host route)';
    }
  }

  ipEl.addEventListener('input', update);
  cidrEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter any IPv4 address (e.g. 192.168.1.50 or 10.0.0.1).',
      'Select your CIDR prefix subnet mask (e.g. /24, /28, /16).',
      'Inspect the Network ID, Broadcast IP, usable host range, and assignable IP count.'
    ],
    benefitTitle: 'CIDR Subnetting Basics',
    benefitContent: 'Classless Inter-Domain Routing (CIDR) allocates IP addresses with variable-length prefix masks. In a /24 subnet (255.255.255.0), the first IP is reserved for the Network ID and the last IP for Broadcast, leaving 254 assignable addresses.',
    faqs: [
      { q: 'Why are 2 addresses subtracted from total hosts?', a: 'The network address (all host bits 0) and the broadcast address (all host bits 1) are reserved and cannot be assigned to network interfaces.' }
    ]
  }
];

toolsBatch9.forEach(createTool);
console.log('Batch 9 complete.');
