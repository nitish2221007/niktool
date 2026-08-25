const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync('tools');
console.log('Total tools in directory:', dirs.length);

const categories = {
  pdf: [],
  image: [],
  text: [],
  marks: [],
  finance: [],
  electrical_physics: [],
  developer: [],
  math_general: [],
  date_age: [],
  security: [],
  other: []
};

dirs.forEach(slug => {
  const s = slug.toLowerCase();
  if (s.includes('pdf')) categories.pdf.push(slug);
  else if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize') || s.includes('compress-jpg') || s.includes('compress-image') || s.includes('webp') || s.includes('png') || s.includes('thumbnail') || s.includes('kakaotalk') || s.includes('flip-image') || s.includes('rotate-image') || s.includes('grayscale') || s.includes('invert-image')) categories.image.push(slug);
  else if (s.includes('best-of') || s.includes('marks-calculator') || s.includes('grade') || s.includes('gpa') || s.includes('cgpa') || s.includes('sgpa')) categories.marks.push(slug);
  else if (s.includes('age-calculator') || s.includes('born-in') || s.includes('days-between') || s.includes('date') || s.includes('time-between')) categories.date_age.push(slug);
  else if (s.includes('loan') || s.includes('emi') || s.includes('mortgage') || s.includes('interest') || s.includes('sip') || s.includes('fd') || s.includes('rd') || s.includes('gst') || s.includes('vat') || s.includes('salary') || s.includes('tax')) categories.finance.push(slug);
  else if (s.includes('555-timer') || s.includes('ohms-law') || s.includes('reactance') || s.includes('impedance') || s.includes('voltage') || s.includes('current') || s.includes('power') || s.includes('resistor') || s.includes('capacitor') || s.includes('inductor') || s.includes('transistor') || s.includes('op-amp') || s.includes('rlc') || s.includes('led-resistor')) categories.electrical_physics.push(slug);
  else if (s.includes('json') || s.includes('xml') || s.includes('yaml') || s.includes('sql') || s.includes('base64') || s.includes('jwt') || s.includes('url-encode') || s.includes('url-decode') || s.includes('html-entity') || s.includes('css-') || s.includes('regex') || s.includes('cron') || s.includes('uuid')) categories.developer.push(slug);
  else if (s.includes('password') || s.includes('hash') || s.includes('md5') || s.includes('sha') || s.includes('encrypt') || s.includes('decrypt') || s.includes('hmac')) categories.security.push(slug);
  else if (s.includes('word-count') || s.includes('words-count') || s.includes('word-length') || s.includes('character-count') || s.includes('case-convert') || s.includes('sort-lines') || s.includes('reverse-') || s.includes('duplicate') || s.includes('email') || s.includes('lorem-ipsum') || s.includes('text-')) categories.text.push(slug);
  else if (s.includes('calc') || s.includes('math') || s.includes('percentage') || s.includes('ratio') || s.includes('area') || s.includes('volume') || s.includes('pyung') || s.includes('convert-')) categories.math_general.push(slug);
  else categories.other.push(slug);
});

console.log('\n--- Tool Breakdown ---');
Object.keys(categories).forEach(cat => {
  console.log(`${cat.padEnd(20)}: ${categories[cat].length} tools`);
});

// Let's inspect some sample tools from each category to see their on-disk HTML and JS
console.log('\n--- Sample Tools Inspect ---');
['developer', 'finance', 'electrical_physics', 'text', 'security'].forEach(cat => {
  if (categories[cat].length > 0) {
    const sampleSlug = categories[cat][0];
    const htmlPath = path.join('tools', sampleSlug, 'index.html');
    const jsPath = path.join('tools', sampleSlug, 'tool.js');
    console.log(`\nCategory [${cat}] -> Sample: ${sampleSlug}`);
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const wsMatch = html.match(/<section class="tool-workspace"[\s\S]*?<\/section>/);
      console.log('Workspace preview:', wsMatch ? wsMatch[0].slice(0, 180).replace(/\n/g, ' ') : 'None');
    }
  }
});
