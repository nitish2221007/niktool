(() => {
  'use strict';
  const bEl = document.getElementById('uart-baud'), bytesEl = document.getElementById('uart-bytes');
  const btEl = document.getElementById('uart-res-bittime'), spEl = document.getElementById('uart-res-speed'), latEl = document.getElementById('uart-res-lat');

  function update() {
    const baud = parseFloat(bEl.value), bytes = parseInt(bytesEl.value, 10);
    if (isNaN(baud) || isNaN(bytes) || baud <= 0 || bytes <= 0) return;

    // Bit time (seconds) = 1 / baud
    const bitTimeSec = 1 / baud;
    const bitTimeUs = bitTimeSec * 1e6;

    // Standard 8N1 frame = 1 start bit + 8 data bits + 0 parity + 1 stop bit = 10 bits per byte
    const bitsPerByte = 10;
    const maxBytesPerSec = baud / bitsPerByte;

    // Total transmission time
    const totalBits = bytes * bitsPerByte;
    const totalTimeSec = totalBits * bitTimeSec;
    const totalTimeMs = totalTimeSec * 1000;

    btEl.textContent = bitTimeUs.toFixed(2) + ' μs';
    spEl.textContent = Math.round(maxBytesPerSec).toLocaleString() + ' B/s (' + (maxBytesPerSec / 1000).toFixed(2) + ' kB/s)';
    latEl.textContent = totalTimeMs >= 1000 ? (totalTimeMs / 1000).toFixed(2) + ' s' : totalTimeMs.toFixed(2) + ' ms';
  }

  bEl.addEventListener('change', update);
  bytesEl.addEventListener('input', update);
  update();
})();