(() => {
  'use strict';

  const inputEl = document.getElementById('jwt-input');
  const decodeBtn = document.getElementById('primary-action-btn');
  const sampleBtn = document.getElementById('sample-token-btn');
  const clearBtn = document.getElementById('clear-btn');
  const msgEl = document.getElementById('jwt-message');
  const detailsCard = document.getElementById('jwt-details-card');

  const statusBadge = document.getElementById('jwt-status-badge');
  const algBadge = document.getElementById('jwt-alg-badge');
  const expBadge = document.getElementById('jwt-exp-badge');
  const iatBadge = document.getElementById('jwt-iat-badge');

  const headerOutput = document.getElementById('jwt-header-output');
  const payloadOutput = document.getElementById('jwt-payload-output');
  const signatureOutput = document.getElementById('jwt-signature-output');

  const copyHeaderBtn = document.getElementById('copy-header-btn');
  const copyPayloadBtn = document.getElementById('copy-payload-btn');

  if (!inputEl || !decodeBtn || !msgEl) {
    console.error('JWT Debugger: Missing required elements.');
    return;
  }

  function setMsg(text, type = '') {
    msgEl.textContent = text;
    msgEl.className = `message${type ? ` ${type}` : ''}`;
  }

  function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const rawBinary = atob(base64);
    const bytes = new Uint8Array(rawBinary.length);
    for (let i = 0; i < rawBinary.length; i++) {
      bytes[i] = rawBinary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  }

  function base64UrlEncode(str) {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function formatTimestamp(timestampInSeconds) {
    if (!timestampInSeconds || isNaN(timestampInSeconds)) return 'N/A';
    const date = new Date(timestampInSeconds * 1000);
    return date.toLocaleString();
  }

  function decodeJWT() {
    const raw = inputEl.value.trim();
    if (!raw) {
      setMsg('Please paste a JWT token to decode.', 'error');
      detailsCard.style.display = 'none';
      return;
    }

    const parts = raw.split('.');
    if (parts.length !== 3) {
      setMsg('Invalid JWT format. A valid token must have 3 parts separated by dots (header.payload.signature).', 'error');
      detailsCard.style.display = 'none';
      return;
    }

    try {
      const headerStr = base64UrlDecode(parts[0]);
      const headerObj = JSON.parse(headerStr);
      headerOutput.value = JSON.stringify(headerObj, null, 2);

      const payloadStr = base64UrlDecode(parts[1]);
      const payloadObj = JSON.parse(payloadStr);
      payloadOutput.value = JSON.stringify(payloadObj, null, 2);

      signatureOutput.value = parts[2] || '(None / Unsigned)';

      // Badges
      algBadge.textContent = headerObj.alg || 'None';

      const nowSec = Math.floor(Date.now() / 1000);
      if (payloadObj.exp) {
        expBadge.textContent = formatTimestamp(payloadObj.exp);
        if (payloadObj.exp < nowSec) {
          statusBadge.textContent = 'Expired';
          statusBadge.style.color = '#c53030';
        } else {
          statusBadge.textContent = 'Active (Valid)';
          statusBadge.style.color = '#22543d';
        }
      } else {
        expBadge.textContent = 'No Expiration (exp)';
        statusBadge.textContent = 'Valid (No Exp)';
        statusBadge.style.color = '#22543d';
      }

      if (payloadObj.iat) {
        iatBadge.textContent = formatTimestamp(payloadObj.iat);
      } else {
        iatBadge.textContent = 'N/A';
      }

      detailsCard.style.display = 'block';
      setMsg('Token decoded successfully.', 'success');
    } catch (err) {
      console.error(err);
      setMsg('Failed to parse token. Invalid Base64URL encoding or corrupted JSON.', 'error');
      detailsCard.style.display = 'none';
    }
  }

  function createSampleToken() {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      sub: 'usr_987654321',
      name: 'Alex Developer',
      role: 'admin',
      iss: 'https://niktool.in',
      iat: now,
      exp: now + 3600
    };

    const headerB64 = base64UrlEncode(JSON.stringify(header));
    const payloadB64 = base64UrlEncode(JSON.stringify(payload));
    const sampleSig = 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk';

    inputEl.value = `${headerB64}.${payloadB64}.${sampleSig}`;
    decodeJWT();
  }

  decodeBtn.addEventListener('click', decodeJWT);
  sampleBtn.addEventListener('click', createSampleToken);

  inputEl.addEventListener('input', () => {
    if (inputEl.value.trim().split('.').length === 3) {
      decodeJWT();
    }
  });

  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    headerOutput.value = '';
    payloadOutput.value = '';
    signatureOutput.value = '';
    detailsCard.style.display = 'none';
    setMsg('Cleared.');
  });

  copyHeaderBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(headerOutput.value, copyHeaderBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(headerOutput.value);
    }
    setMsg('Header JSON copied to clipboard.', 'success');
  });

  copyPayloadBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(payloadOutput.value, copyPayloadBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(payloadOutput.value);
    }
    setMsg('Payload JSON copied to clipboard.', 'success');
  });
})();
