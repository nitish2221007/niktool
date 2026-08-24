/**
 * Batch Uploader Script for Cloudflare R2
 * Uploads all files in tools/ to Cloudflare R2 bucket using S3 API (@aws-sdk/client-s3)
 *
 * Usage:
 *   $env:R2_ACCOUNT_ID="your_account_id"
 *   $env:R2_ACCESS_KEY_ID="your_access_key"
 *   $env:R2_SECRET_ACCESS_KEY="your_secret_key"
 *   $env:R2_BUCKET_NAME="niktool-tools"
 *   node scripts/upload-tools-to-r2.cjs
 */

const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'niktool-tools';

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
  console.error('\n❌ Missing required environment variables!');
  console.error('Please set the following before running:');
  console.error('  $env:R2_ACCOUNT_ID="<your-cloudflare-account-id>"');
  console.error('  $env:R2_ACCESS_KEY_ID="<your-r2-access-key-id>"');
  console.error('  $env:R2_SECRET_ACCESS_KEY="<your-r2-secret-access-key>"');
  console.error('  $env:R2_BUCKET_NAME="niktool-tools" (optional, default: niktool-tools)\n');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

function getContentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.js')) return 'application/javascript; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.json')) return 'application/json; charset=utf-8';
  if (filePath.endsWith('.xml')) return 'application/xml; charset=utf-8';
  if (filePath.endsWith('.svg')) return 'image/svg+xml';
  return 'application/octet-stream';
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }
  return arrayOfFiles;
}

async function uploadFile(filePath, rootDir) {
  const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
  const key = `tools/${relativePath}`;
  const fileStream = fs.createReadStream(filePath);
  const contentType = getContentType(filePath);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
    CacheControl: 'public, max-age=86400',
  });

  await s3.send(command);
}

async function main() {
  const toolsDir = path.join(__dirname, '..', 'tools');
  if (!fs.existsSync(toolsDir)) {
    console.error('❌ tools directory not found at:', toolsDir);
    process.exit(1);
  }

  console.log('🔍 Scanning tools directory...');
  const files = getAllFiles(toolsDir);
  console.log(`📦 Found ${files.length} files to upload to R2 bucket "${BUCKET_NAME}"...`);

  const CONCURRENCY = 50;
  let completed = 0;
  let errors = 0;
  const startTime = Date.now();

  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async (file) => {
        try {
          await uploadFile(file, toolsDir);
          completed++;
        } catch (err) {
          errors++;
          console.error(`Failed to upload ${file}:`, err.message);
        }
      })
    );

    if (completed % 500 === 0 || completed === files.length) {
      const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = (completed / (elapsedSec || 1)).toFixed(0);
      console.log(`🚀 Progress: ${completed}/${files.length} (${((completed / files.length) * 100).toFixed(1)}%) | Speed: ${rate} files/sec | Errors: ${errors}`);
    }
  }

  console.log(`\n🎉 Upload completed! ${completed} files uploaded, ${errors} errors in ${((Date.now() - startTime) / 1000).toFixed(1)}s.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
