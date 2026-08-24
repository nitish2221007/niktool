(() => {
  'use strict';
  const tEl = document.getElementById('sh-txt');
  const bResEl = document.getElementById('sh-res-bits'), eResEl = document.getElementById('sh-res-eff');

  function update() {
    const text = tEl.value;
    if (!text || text.length === 0) {
      bResEl.textContent = '0.00 Bits / Symbol';
      eResEl.textContent = 'Enter text to calculate';
      return;
    }

    const totalChars = text.length;
    const freqs = {};
    for (let i = 0; i < totalChars; i++) {
      const ch = text[i];
      freqs[ch] = (freqs[ch] || 0) + 1;
    }

    const uniqueChars = Object.keys(freqs).length;
    let H = 0;
    for (const ch in freqs) {
      const p = freqs[ch] / totalChars;
      H += -p * (Math.log(p) / Math.LN2);
    }

    const H_max = uniqueChars > 1 ? (Math.log(uniqueChars) / Math.LN2) : 1;
    const redundancyPct = uniqueChars > 1 ? Math.max(0, (1 - (H / H_max)) * 100) : 0;
    const minCompressedBytes = Math.ceil((H * totalChars) / 8);

    bResEl.textContent = H.toFixed(2) + ' Bits / Character (H(X))';
    eResEl.textContent = 'Unique Symbols: ' + uniqueChars + ' | Min Compressed: ' + minCompressedBytes + ' Bytes (' + redundancyPct.toFixed(1) + '% Redundancy)';
  }

  tEl.addEventListener('input', update);
  update();
})();