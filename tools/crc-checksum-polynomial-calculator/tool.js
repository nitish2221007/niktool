(() => {
  'use strict';
  const inEl = document.getElementById('crc-input');
  const c32El = document.getElementById('crc-res-32'), decEl = document.getElementById('crc-res-dec');

  // Precompute CRC32 lookup table
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c;
  }

  function crc32(str) {
    const bytes = new TextEncoder().encode(str);
    let crc = 0 ^ (-1);
    for (let i = 0; i < bytes.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function update() {
    const str = inEl.value;
    const res = crc32(str);
    const hex = '0x' + res.toString(16).toUpperCase().padStart(8, '0');

    c32El.textContent = hex;
    decEl.textContent = res.toLocaleString();
  }

  inEl.addEventListener('input', update);
  update();
})();