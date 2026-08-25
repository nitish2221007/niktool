const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets', 'data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const dirs = fs.readdirSync(path.join(__dirname, '..', 'tools'));
const store = {};
let count = 0;

dirs.forEach(slug => {
  const htmlPath = path.join(__dirname, '..', 'tools', slug, 'index.html');
  const jsPath = path.join(__dirname, '..', 'tools', slug, 'tool.js');
  if (fs.existsSync(htmlPath) && fs.existsSync(jsPath)) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    // If it has specialized inputs or custom layout
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

console.log('Total handcrafted tools packed:', count);

// Split into 8 chunk files so each is ~700KB and loads instantly
const entries = Object.entries(store);
const numChunks = 8;
const chunkSize = Math.ceil(entries.length / numChunks);
const indexMap = {};

for (let i = 0; i < numChunks; i++) {
  const chunkEntries = entries.slice(i * chunkSize, (i + 1) * chunkSize);
  const chunkObj = Object.fromEntries(chunkEntries);
  const chunkFileName = `tools-chunk-${i}.json`;
  fs.writeFileSync(path.join(outDir, chunkFileName), JSON.stringify(chunkObj));
  
  chunkEntries.forEach(([slug]) => {
    indexMap[slug] = i;
  });
}

// Write the index map so client / worker knows which chunk to fetch
fs.writeFileSync(path.join(outDir, 'tools-index.json'), JSON.stringify(indexMap));
console.log('Successfully generated chunks and index map in assets/data/ !');
