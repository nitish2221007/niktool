(() => {
  'use strict';
  const xEl = document.getElementById('ts-x'), yEl = document.getElementById('ts-y');
  const bEl = document.getElementById('ts-blur'), cEl = document.getElementById('ts-color');
  const txtEl = document.getElementById('ts-sample-text'), outEl = document.getElementById('ts-output'), copyBtn = document.getElementById('copy-ts-btn');

  function update() {
    const x = xEl.value || 0, y = yEl.value || 0, blur = bEl.value || 0, color = cEl.value || '#000000';
    const rule = 'text-shadow: ' + x + 'px ' + y + 'px ' + blur + 'px ' + color + ';';

    txtEl.style.textShadow = x + 'px ' + y + 'px ' + blur + 'px ' + color;
    outEl.value = rule;
  }

  [xEl, yEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();