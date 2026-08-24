(() => {
  'use strict';
  const blurEl = document.getElementById('glass-blur');
  const opEl = document.getElementById('glass-opacity');
  const borderEl = document.getElementById('glass-border');
  const blurVal = document.getElementById('glass-blur-val');
  const opVal = document.getElementById('glass-opacity-val');
  const borderVal = document.getElementById('glass-border-val');
  const previewBox = document.getElementById('glass-preview-box');
  const cssOut = document.getElementById('glass-css-output');
  const copyBtn = document.getElementById('copy-glass-btn');

  function updateGlass() {
    const b = blurEl.value;
    const o = opEl.value;
    const bo = borderEl.value;

    blurVal.textContent = b + 'px';
    opVal.textContent = o;
    borderVal.textContent = bo;

    const bg = 'rgba(255, 255, 255, ' + o + ')';
    const border = '1px solid rgba(255, 255, 255, ' + bo + ')';
    const backdrop = 'blur(' + b + 'px)';
    const shadow = '0 8px 32px 0 rgba(0, 0, 0, 0.18)';

    previewBox.style.background = bg;
    previewBox.style.backdropFilter = backdrop;
    previewBox.style.webkitBackdropFilter = backdrop;
    previewBox.style.border = border;
    previewBox.style.boxShadow = shadow;

    cssOut.value = [
      'background: ' + bg + ';',
      'backdrop-filter: ' + backdrop + ';',
      '-webkit-backdrop-filter: ' + backdrop + ';',
      'border: ' + border + ';',
      'box-shadow: ' + shadow + ';',
      'border-radius: 16px;'
    ].join('\n');
  }

  blurEl.addEventListener('input', updateGlass);
  opEl.addEventListener('input', updateGlass);
  borderEl.addEventListener('input', updateGlass);

  updateGlass();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(cssOut.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(cssOut.value);
    }
  });
})();