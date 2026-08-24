/**
 * Cloudflare Pages Advanced Mode Worker
 * Routes /tools/* requests to Cloudflare R2 Bucket (TOOLS_BUCKET)
 * Fallbacks to standard Cloudflare Pages static assets for all other routes
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Intercept requests starting with /tools/
    if (url.pathname.startsWith('/tools/')) {
      let key = url.pathname.slice(1); // Remove leading slash -> "tools/..."

      if (key.endsWith('/')) {
        key += 'index.html';
      }

      if (env.TOOLS_BUCKET) {
        try {
          let object = await env.TOOLS_BUCKET.get(key);

          // Fallback check: if /tools/slug without trailing slash, try appending /index.html
          if (!object && !key.includes('.')) {
            key = key.endsWith('/') ? key + 'index.html' : key + '/index.html';
            object = await env.TOOLS_BUCKET.get(key);
          }

          if (object) {
            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set('etag', object.httpEtag);

            // Determine content-type based on file extension
            if (key.endsWith('.html')) {
              headers.set('content-type', 'text/html; charset=utf-8');
            } else if (key.endsWith('.js')) {
              headers.set('content-type', 'application/javascript; charset=utf-8');
            } else if (key.endsWith('.css')) {
              headers.set('content-type', 'text/css; charset=utf-8');
            } else if (key.endsWith('.json')) {
              headers.set('content-type', 'application/json; charset=utf-8');
            } else if (key.endsWith('.xml')) {
              headers.set('content-type', 'application/xml; charset=utf-8');
            } else if (key.endsWith('.svg')) {
              headers.set('content-type', 'image/svg+xml');
            }

            headers.set('cache-control', 'public, max-age=86400');
            return new Response(object.body, { headers });
          }
        } catch (err) {
          console.error('Cloudflare R2 fetch error:', err);
        }
      }
    }

    // Default: Serve static assets deployed to Cloudflare Pages (Home, About, Privacy, Assets, Catalog, etc.)
    return env.ASSETS.fetch(request);
  }
};
