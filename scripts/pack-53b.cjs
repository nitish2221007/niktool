'use strict';
const fs = require('fs');
const path = require('path');
const TOOLS_DIR = path.join(__dirname, '..', 'tools');

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const tool = {
  slug: 'eye-diagram-jitter-ber-floor-high-speed-serial-calculator',
  name: 'Eye Diagram Jitter & BER Floor High-Speed Serial Link Calculator',
  description: 'Estimate BER floor from random jitter (RJ) and deterministic jitter (DJ) for high-speed serial links: total jitter TJ = DJ + n×RJ. Covers USB, PCIe, SATA, Ethernet, and SerDes signal integrity courses.',
  category: 'Signal Integrity',
  keywords: ['eye diagram jitter', 'BER floor', 'random jitter RJ DJ', 'high speed serial', 'signal integrity PCIe'],
  grade: 'undergraduate',
  formula: 'TJ = DJ + n×RJ (n=Q factor for target BER)',
  inputs: [
    { id: 'RJ_ps', label: 'Random Jitter RJ_rms (ps)', placeholder: '5', unit: 'ps' },
    { id: 'DJ_ps', label: 'Deterministic Jitter DJ_pp (ps)', placeholder: '20', unit: 'ps' },
    { id: 'UI_ps', label: 'Unit Interval UI (ps)', placeholder: '400', unit: 'ps' },
    { id: 'target_BER_eye', label: 'Target BER (e.g. 1e-12)', placeholder: '0.000000000001', unit: '' }
  ],
  calcFn: `
    const RJ=parseFloat(document.getElementById('RJ_ps').value);
    const DJ=parseFloat(document.getElementById('DJ_ps').value);
    const UI=parseFloat(document.getElementById('UI_ps').value);
    const BER=parseFloat(document.getElementById('target_BER_eye').value)||1e-12;
    if(isNaN(RJ)||isNaN(DJ)||isNaN(UI)||RJ<=0||UI<=0){document.getElementById('result').textContent='Enter valid values.';return;}
    const Q=Math.sqrt(2)*erfcInv_approx(2*BER);
    function erfcInv_approx(p){const a=0.147;const lnp=Math.log(p*(2-p));const t1=2/(Math.PI*a)+lnp/2;return Math.sign(1-p)*Math.sqrt(Math.sqrt(t1*t1-lnp/a)-t1);}
    const n_factor=Q>0?Q:7.03;
    const TJ=DJ+2*n_factor*RJ;
    const eyeOpen=UI-TJ;
    document.getElementById('result').textContent='Q = '+n_factor.toFixed(2)+' | TJ_pp = '+TJ.toFixed(2)+' ps | Eye opening = '+Math.max(0,eyeOpen).toFixed(2)+' ps ('+(Math.max(0,eyeOpen)/UI*100).toFixed(1)+'% of UI)';
  `,
  howToSteps: ['Enter random jitter RJ (rms) in picoseconds.', 'Enter deterministic jitter DJ (peak-to-peak) in ps.', 'Enter unit interval (UI = 1/data_rate in ps).', 'Enter target BER (1e-12 for typical SerDes).', 'Click Calculate.'],
  useCases: 'PCIe 5.0/6.0 signal integrity analysis, USB 3.2 compliance testing, 100G Ethernet, DDR5 timing margin, JEDEC/USB-IF test.',
  countries: ['US', 'IN', 'TW', 'KR', 'DE', 'JP', 'CN']
};

const dir = path.join(TOOLS_DIR, tool.slug);
fs.mkdirSync(dir, { recursive: true });

const inputsHtml = tool.inputs.map(inp =>
  `<div class="input-group">
    <label for="${inp.id}">${escapeHtml(inp.label)}</label>
    <input type="number" id="${inp.id}" placeholder="${inp.placeholder}" step="any" />
    ${inp.unit ? `<span class="unit">${escapeHtml(inp.unit)}</span>` : ''}
  </div>`
).join('\n');

const stepsHtml = tool.howToSteps.map(s => `<li>${escapeHtml(s)}</li>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(tool.name)}</title>
<meta name="description" content="${escapeHtml(tool.description)}"/>
<meta name="keywords" content="${escapeHtml(tool.keywords.join(', '))}"/>
<link rel="stylesheet" href="/assets/tool.css"/>
</head>
<body>
<header><a href="/">&#8592; All Tools</a></header>
<main>
<h1>${escapeHtml(tool.name)}</h1>
<p class="desc">${escapeHtml(tool.description)}</p>
<div class="formula-box"><strong>Formula:</strong> ${escapeHtml(tool.formula)}</div>
<div class="calculator">
${inputsHtml}
<button onclick="calculate()">Calculate</button>
<div id="result" class="result"></div>
</div>
<section class="how-to">
<h2>How to Use</h2>
<ol>${stepsHtml}</ol>
</section>
<section class="use-cases">
<h2>Use Cases</h2>
<p>${escapeHtml(tool.useCases)}</p>
</section>
</main>
<script src="tool.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(dir, 'index.html'), html);

const js = `'use strict';
function calculate() {
  try {
    ${tool.calcFn.trim()}
  } catch(e) {
    document.getElementById('result').textContent = 'Error: ' + e.message;
  }
}`;
fs.writeFileSync(path.join(dir, 'tool.js'), js);

console.log('Created tool:', tool.slug);
console.log('Pack 53 bonus tool complete.');
