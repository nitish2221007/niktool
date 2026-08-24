(() => {
  'use strict';
  const xEl = document.getElementById('sh-x'), yEl = document.getElementById('sh-y');
  const bEl = document.getElementById('sh-blur'), sEl = document.getElementById('sh-spread');
  const xVal = document.getElementById('sh-x-val'), yVal = document.getElementById('sh-y-val');
  const bVal = document.getElementById('sh-blur-val'), sVal = document.getElementById('sh-spread-val');
  const box = document.getElementById('sh-preview-box'), outEl = document.getElementById('sh-css-output');
  const copyBtn = document.getElementById('copy-sh-btn');

  function update() {
    const x = xEl.value, y = yEl.value, b = bEl.value, s = sEl.value;
    xVal.textContent = x + 'px'; yVal.textContent = y + 'px';
    bVal.textContent = b + 'px'; sVal.textContent = s + 'px';

    const sh = x + 'px ' + y + 'px ' + b + 'px ' + s + 'px rgba(0, 0, 0, 0.14)';
    box.style.boxShadow = sh;
    outEl.value = 'box-shadow: ' + sh + ';';
  }

  [xEl, yEl, bEl, sEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();