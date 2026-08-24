(() => {
  'use strict';
  const dtEl = document.getElementById('hm-data'), errEl = document.getElementById('hm-err');
  const cdResEl = document.getElementById('hm-res-code'), synResEl = document.getElementById('hm-res-syn');

  function update() {
    const raw = dtEl.value.trim();
    if (!/^[01]{4}$/.test(raw)) return;

    const d1 = parseInt(raw[0], 10);
    const d2 = parseInt(raw[1], 10);
    const d3 = parseInt(raw[2], 10);
    const d4 = parseInt(raw[3], 10);
    const errPos = parseInt(errEl.value, 10);

    // Hamming (7,4) standard parity equations (1-indexed positions 1, 2, 4):
    // p1 (pos 1): covers pos 1, 3, 5, 7 => p1 + d1 + d2 + d4 = 0 mod 2 => p1 = (d1 + d2 + d4) % 2
    // p2 (pos 2): covers pos 2, 3, 6, 7 => p2 + d1 + d3 + d4 = 0 mod 2 => p2 = (d1 + d3 + d4) % 2
    // p3 (pos 4): covers pos 4, 5, 6, 7 => p3 + d2 + d3 + d4 = 0 mod 2 => p3 = (d2 + d3 + d4) % 2
    const p1 = (d1 + d2 + d4) % 2;
    const p2 = (d1 + d3 + d4) % 2;
    const p3 = (d2 + d3 + d4) % 2;

    let codeword = [p1, p2, d1, p3, d2, d3, d4];
    let received = [...codeword];

    if (errPos >= 1 && errPos <= 7) {
      received[errPos - 1] = 1 - received[errPos - 1]; // flip bit
    }

    // Syndrome computation S = [s1, s2, s3]:
    const s1 = (received[0] + received[2] + received[4] + received[6]) % 2;
    const s2 = (received[1] + received[2] + received[5] + received[6]) % 2;
    const s3 = (received[3] + received[4] + received[5] + received[6]) % 2;

    // Error position = s3*4 + s2*2 + s1*1
    const detectedErr = s3 * 4 + s2 * 2 + s1;

    let corrected = [...received];
    if (detectedErr > 0) {
      corrected[detectedErr - 1] = 1 - corrected[detectedErr - 1];
    }

    const recData = [corrected[2], corrected[4], corrected[5], corrected[6]].join('');

    cdResEl.textContent = 'Transmitted: ' + codeword.join(' ') + ' | Received: ' + received.join(' ');
    synResEl.textContent = 'Syndrome S = [' + s3 + ',' + s2 + ',' + s1 + '] (Binary ' + detectedErr + ': ' + (detectedErr === 0 ? 'No Error' : 'Bit ' + detectedErr + ' flipped & CORRECTED') + ') | Recovered: [' + recData + ']';
  }

  dtEl.addEventListener('input', update);
  errEl.addEventListener('change', update);
  update();
})();