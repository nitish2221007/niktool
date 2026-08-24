(() => {
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

    badgeEl.textContent = code + ' ' + selEl.options[selEl.selectedIndex].text.split(' - ')[0].replace(/^[0-9]+s*/, '');
    badgeEl.style.background = info.color;
    catEl.textContent = info.cat;
    descEl.textContent = info.desc;
  }

  selEl.addEventListener('change', update);
  update();
})();