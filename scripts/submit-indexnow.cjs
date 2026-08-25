const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'niktool.in';
const KEY = '68e9f2832c3f4e19842f1b8a5d3c7104';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Read URLs from sitemap.xml
function getUrlsFromSitemap() {
  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found!');
    return [];
  }
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.match(/<loc>(https:\/\/niktool\.in\/[^<]+)<\/loc>/g) || [];
  return matches.map(m => m.replace(/<\/?loc>/g, ''));
}

async function submitBatch(urls) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({ status: res.statusCode, message: 'Success' });
        } else {
          resolve({ status: res.statusCode, message: data || res.statusMessage });
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log('Reading URLs for IndexNow submission...');
  const allUrls = getUrlsFromSitemap();
  console.log(`Found ${allUrls.length} URLs to submit.`);

  // IndexNow limit: up to 10,000 URLs per request
  const batchSize = 10000;
  for (let i = 0; i < allUrls.length; i += batchSize) {
    const batch = allUrls.slice(i, i + batchSize);
    console.log(`Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);
    try {
      const result = await submitBatch(batch);
      console.log(`Batch ${Math.floor(i / batchSize) + 1} response: HTTP ${result.status} (${result.message})`);
    } catch (err) {
      console.error(`Error submitting batch ${Math.floor(i / batchSize) + 1}:`, err.message);
    }
  }
  console.log('IndexNow submission complete!');
}

main();
