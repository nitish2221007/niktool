(() => {
  'use strict';
  const inEl = document.getElementById('ip6-in');
  const compEl = document.getElementById('ip6-comp'), expEl = document.getElementById('ip6-exp');

  function expandIPv6(ip) {
    let clean = ip.trim().toLowerCase();
    if (clean.includes(':::')) return null;

    let parts = clean.split('::');
    if (parts.length > 2) return null;

    let left = parts[0] ? parts[0].split(':') : [];
    let right = parts[1] ? parts[1].split(':') : [];

    let missing = 8 - (left.length + right.length);
    if (missing < 0) return null;

    let middle = new Array(missing).fill('0000');
    let full = left.concat(parts.length === 2 ? middle : []).concat(right);

    if (full.length !== 8) return null;

    return full.map(g => g.padStart(4, '0'));
  }

  function compressIPv6(blocks) {
    let unpadded = blocks.map(b => parseInt(b, 16).toString(16));
    let str = unpadded.join(':');

    // Replace longest sequence of :0: with ::
    let bestStart = -1, bestLen = 0, curStart = -1, curLen = 0;
    for (let i = 0; i < unpadded.length; i++) {
      if (unpadded[i] === '0') {
        if (curStart === -1) { curStart = i; curLen = 1; }
        else { curLen++; }
        if (curLen > bestLen) { bestLen = curLen; bestStart = curStart; }
      } else {
        curStart = -1; curLen = 0;
      }
    }

    if (bestLen > 1) {
      let left = unpadded.slice(0, bestStart).join(':');
      let right = unpadded.slice(bestStart + bestLen).join(':');
      return (left ? left : '') + '::' + (right ? right : '');
    }
    return str;
  }

  function update() {
    const raw = inEl.value;
    const blocks = expandIPv6(raw);
    if (!blocks) {
      compEl.textContent = 'Invalid IPv6 Address';
      expEl.textContent = '-';
      return;
    }

    expEl.textContent = blocks.join(':');
    compEl.textContent = compressIPv6(blocks);
  }

  inEl.addEventListener('input', update);
  update();
})();