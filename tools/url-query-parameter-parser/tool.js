(() => {
  'use strict';
  const inEl = document.getElementById('url-param-in'), outEl = document.getElementById('url-param-out');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) { outEl.value = '{}'; return; }

    try {
      let search = raw;
      if (raw.includes('?')) {
        search = raw.slice(raw.indexOf('?'));
      }
      const params = new URLSearchParams(search);
      const obj = {};
      for (const [key, value] of params.entries()) {
        obj[key] = value;
      }
      outEl.value = JSON.stringify(obj, null, 2);
    } catch (e) {
      outEl.value = '{"error": "Invalid URL format"}';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();