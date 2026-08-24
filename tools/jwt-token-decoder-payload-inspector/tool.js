(() => {
  'use strict';
  const inEl = document.getElementById('jwt-in'), hdrEl = document.getElementById('jwt-hdr'), pldEl = document.getElementById('jwt-pld');

  function b64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) { hdrEl.value = '{}'; pldEl.value = '{}'; return; }

    const parts = raw.split('.');
    if (parts.length < 2) {
      hdrEl.value = 'Invalid JWT format (Need 3 dot-separated parts)';
      pldEl.value = '';
      return;
    }

    try {
      const headerObj = JSON.parse(b64UrlDecode(parts[0]));
      const payloadObj = JSON.parse(b64UrlDecode(parts[1]));

      hdrEl.value = JSON.stringify(headerObj, null, 2);
      pldEl.value = JSON.stringify(payloadObj, null, 2);
    } catch (e) {
      hdrEl.value = 'Error decoding Base64Url payload';
      pldEl.value = e.message;
    }
  }

  inEl.addEventListener('input', update);
  update();
})();