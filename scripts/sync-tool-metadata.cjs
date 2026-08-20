const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const toolsRoot = path.join(root, 'tools');
const siteOrigin = 'https://niktool.in';
const requiredCatalogFields = [
  'name',
  'description',
  'path',
  'category',
  'icon',
  'keywords'
];

function fail(message) {
  throw new Error(message);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
}

function writeIfChanged(filePath, content) {
  const current = fs.existsSync(filePath) ? readText(filePath) : '';
  if (current === content) return false;
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function xmlValue(xml, tag, filePath) {
  const match = xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`));
  if (!match) fail(`${filePath}: missing <${tag}> value.`);
  return match[1].trim();
}

// Recursive catalog finder supporting arbitrarily deep nested folders (e.g. tools/class-11/chemistry/ch-1/slug)
function findToolFolderRelPaths(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const hasCatalog = entries.some(e => e.isFile() && e.name === 'catalog.json');
  if (hasCatalog) {
    const relPath = path.relative(baseDir, dir).replace(/\\/g, '/');
    results.push(relPath);
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      results = results.concat(findToolFolderRelPaths(path.join(dir, entry.name), baseDir));
    }
  }
  return results;
}

function loadTool(relPath) {
  const folder = path.join(toolsRoot, relPath);
  const catalogPath = path.join(folder, 'catalog.json');
  const sitemapPath = path.join(folder, 'sitemap.xml');
  const pagePath = path.join(folder, 'index.html');

  if (!fs.existsSync(pagePath)) fail(`${relPath}: missing index.html.`);
  if (!fs.existsSync(catalogPath)) fail(`${relPath}: missing catalog.json.`);
  if (!fs.existsSync(sitemapPath)) fail(`${relPath}: missing sitemap.xml.`);

  let source;
  try {
    source = JSON.parse(readText(catalogPath));
  } catch (error) {
    fail(`${catalogPath}: invalid JSON (${error.message}).`);
  }

  if (!source || Array.isArray(source) || typeof source !== 'object') {
    fail(`${catalogPath}: expected one catalog object.`);
  }

  for (const field of requiredCatalogFields) {
    if (!(field in source)) fail(`${catalogPath}: missing required field "${field}".`);
  }

  for (const field of requiredCatalogFields.filter((field) => field !== 'keywords')) {
    if (typeof source[field] !== 'string' || !source[field].trim()) {
      fail(`${catalogPath}: "${field}" must be a non-empty string.`);
    }
    if (/[<>]/.test(source[field])) {
      fail(`${catalogPath}: "${field}" must contain plain text only.`);
    }
  }

  if (!Array.isArray(source.keywords) || source.keywords.length === 0 ||
      source.keywords.some((keyword) =>
        typeof keyword !== 'string' || !keyword.trim() || /[<>]/.test(keyword)
      )) {
    fail(`${catalogPath}: "keywords" must be a non-empty array of strings.`);
  }

  const expectedPath = `/tools/${relPath}/`;
  if (source.path !== expectedPath) {
    fail(`${catalogPath}: path must be "${expectedPath}".`);
  }

  const order = source.order === undefined ? Number.MAX_SAFE_INTEGER : source.order;
  if (!Number.isInteger(order) || order < 0) {
    fail(`${catalogPath}: optional "order" must be a non-negative integer.`);
  }

  const sitemapSource = readText(sitemapPath);
  const urlEntries = sitemapSource.match(/<url(?:\s[^>]*)?>[\s\S]*?<\/url>/g) || [];
  if (!sitemapSource.includes('<urlset') || urlEntries.length !== 1) {
    fail(`${sitemapPath}: expected a valid urlset containing exactly one URL.`);
  }

  const url = urlEntries[0];
  const expectedUrl = `${siteOrigin}${expectedPath}`;
  const loc = xmlValue(url, 'loc', sitemapPath);
  if (loc !== expectedUrl) fail(`${sitemapPath}: loc must be "${expectedUrl}".`);

  const changefreq = xmlValue(url, 'changefreq', sitemapPath);
  const priority = xmlValue(url, 'priority', sitemapPath);
  if (!['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(changefreq)) {
    fail(`${sitemapPath}: invalid changefreq "${changefreq}".`);
  }
  if (!/^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(priority)) {
    fail(`${sitemapPath}: priority must be between 0.0 and 1.0.`);
  }

  const catalog = Object.fromEntries(
    requiredCatalogFields.map((field) => [field, source[field]])
  );

  return { catalog, changefreq, loc, order, priority };
}

const relFolderPaths = findToolFolderRelPaths(toolsRoot).sort();

if (relFolderPaths.length === 0) fail('No tool folders were found.');

const tools = relFolderPaths.map(loadTool).sort((left, right) =>
  left.order - right.order || left.catalog.name.localeCompare(right.catalog.name)
);

const duplicateNames = tools.filter((tool, index) =>
  tools.findIndex((candidate) => candidate.catalog.name === tool.catalog.name) !== index
);
const duplicatePaths = tools.filter((tool, index) =>
  tools.findIndex((candidate) => candidate.catalog.path === tool.catalog.path) !== index
);
if (duplicateNames.length) fail(`Duplicate catalog name: ${duplicateNames[0].catalog.name}.`);
if (duplicatePaths.length) fail(`Duplicate catalog path: ${duplicatePaths[0].catalog.path}.`);

const catalogOutput = `${JSON.stringify(tools.map((tool) => tool.catalog), null, 2)}\n`;
const sitemapEntries = tools.map((tool) => [
  '  <url>',
  `    <loc>${tool.loc}</loc>`,
  `    <changefreq>${tool.changefreq}</changefreq>`,
  `    <priority>${tool.priority}</priority>`,
  '  </url>'
].join('\n'));
const staticLegalPages = ['privacy', 'about', 'contact', 'terms', 'disclaimer'].map((page) => [
  '  <url>',
  `    <loc>${siteOrigin}/${page}/</loc>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.5</priority>',
  '  </url>'
].join('\n'));

const sitemapOutput = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<!-- Generated from tools/*/sitemap.xml by scripts/sync-tool-metadata.cjs. -->',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '  <url>',
  `    <loc>${siteOrigin}/</loc>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>1.0</priority>',
  '  </url>',
  ...staticLegalPages,
  ...sitemapEntries,
  '</urlset>',
  ''
].join('\n');

const catalogChanged = writeIfChanged(path.join(root, 'catalog.json'), catalogOutput);
const sitemapChanged = writeIfChanged(path.join(root, 'sitemap.xml'), sitemapOutput);

// High-scale scalability chunks generation (assets/catalogs/)
const catalogsDir = path.join(root, 'assets', 'catalogs');
const pagesDir = path.join(catalogsDir, 'pages');
if (!fs.existsSync(pagesDir)) {
  fs.mkdirSync(pagesDir, { recursive: true });
}

const catalogList = tools.map((tool) => tool.catalog);
const pageSize = 24;
const totalPages = Math.ceil(catalogList.length / pageSize) || 1;

for (let p = 1; p <= totalPages; p++) {
  const pageItems = catalogList.slice((p - 1) * pageSize, p * pageSize);
  writeIfChanged(path.join(pagesDir, `page-${p}.json`), `${JSON.stringify(pageItems, null, 2)}\n`);
}

const categories = ['All', ...new Set(catalogList.map((item) => item.category))];
writeIfChanged(path.join(catalogsDir, 'categories.json'), `${JSON.stringify(categories, null, 2)}\n`);

console.log(
  `Validated ${tools.length} tools. ` +
  `catalog.json ${catalogChanged ? 'updated' : 'unchanged'}; ` +
  `sitemap.xml ${sitemapChanged ? 'updated' : 'unchanged'}.`
);
