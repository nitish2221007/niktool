const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync('tools');
const store = {};
let count = 0;

dirs.forEach(slug => {
  const htmlPath = path.join('tools', slug, 'index.html');
  const jsPath = path.join('tools', slug, 'tool.js');
  if (fs.existsSync(htmlPath) && fs.existsSync(jsPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (html.includes('<input') && !html.includes('img-file-input') && !html.includes('pdf-file-input')) {
      const wsMatch = html.match(/<section class="tool-workspace"[\s\S]*?<\/section>/);
      const js = fs.readFileSync(jsPath, 'utf8');
      if (wsMatch) {
        store[slug] = {
          ws: wsMatch[0],
          js: js
        };
        count++;
      }
    }
  }
});

const str = JSON.stringify(store);
console.log('Extracted handcrafted tools:', count);
console.log('Total JSON size:', (str.length / 1024 / 1024).toFixed(2), 'MB');
