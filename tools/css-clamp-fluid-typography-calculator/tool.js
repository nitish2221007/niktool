(() => {
  'use strict';
  const minVpEl = document.getElementById('cl-min-vp'), maxVpEl = document.getElementById('cl-max-vp');
  const minFontEl = document.getElementById('cl-min-font'), maxFontEl = document.getElementById('cl-max-font');
  const outEl = document.getElementById('cl-output'), copyBtn = document.getElementById('copy-clamp-btn');

  function update() {
    const minVp = parseFloat(minVpEl.value);
    const maxVp = parseFloat(maxVpEl.value);
    const minFont = parseFloat(minFontEl.value);
    const maxFont = parseFloat(maxFontEl.value);

    if (isNaN(minVp) || isNaN(maxVp) || isNaN(minFont) || isNaN(maxFont) || minVp >= maxVp || minFont >= maxFont) return;

    // Linear slope: slope = (maxFont - minFont) / (maxVp - minVp)
    const slope = (maxFont - minFont) / (maxVp - minVp);
    const yIntercept = -minVp * slope + minFont;

    const slopeVw = (slope * 100).toFixed(2) + 'vw';
    const interceptRem = (yIntercept / 16).toFixed(3) + 'rem';
    const minRem = (minFont / 16).toFixed(3) + 'rem';
    const maxRem = (maxFont / 16).toFixed(3) + 'rem';

    const rule = 'font-size: clamp(' + minRem + ', ' + interceptRem + ' + ' + slopeVw + ', ' + maxRem + ');';
    outEl.value = rule;
  }

  [minVpEl, maxVpEl, minFontEl, maxFontEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();