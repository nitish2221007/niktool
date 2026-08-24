(() => {
  'use strict';
  const inEl = document.getElementById('mac-in');
  const cEl = document.getElementById('mac-colon'), hEl = document.getElementById('mac-hyphen');
  const cisEl = document.getElementById('mac-cisco'), ouiEl = document.getElementById('mac-oui');

  function update() {
    const raw = inEl.value.trim().replace(/[^a-fA-F0-9]/g, '');
    if (raw.length !== 12) {
      cEl.textContent = 'Enter 12 hexadecimal characters';
      hEl.textContent = '-'; cisEl.textContent = '-'; ouiEl.textContent = '-';
      return;
    }

    const upper = raw.toUpperCase();
    const lower = raw.toLowerCase();

    // Colon: XX:XX:XX:XX:XX:XX
    const colon = upper.match(/.{2}/g).join(':');
    // Hyphen: XX-XX-XX-XX-XX-XX
    const hyphen = upper.match(/.{2}/g).join('-');
    // Cisco: xxxx.xxxx.xxxx
    const cisco = lower.match(/.{4}/g).join('.');
    // OUI: first 6 chars
    const oui = upper.slice(0, 6).match(/.{2}/g).join(':');

    cEl.textContent = colon;
    hEl.textContent = hyphen;
    cisEl.textContent = cisco;
    ouiEl.textContent = oui + ' (Manufacturer Prefix)';
  }

  inEl.addEventListener('input', update);
  update();
})();