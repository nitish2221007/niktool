(() => {
  'use strict';
  const tlEl = document.getElementById('br-tl'), trEl = document.getElementById('br-tr');
  const brEl = document.getElementById('br-br'), blEl = document.getElementById('br-bl');
  const tlVal = document.getElementById('br-tl-val'), trVal = document.getElementById('br-tr-val');
  const brVal = document.getElementById('br-br-val'), blVal = document.getElementById('br-bl-val');
  const box = document.getElementById('br-preview-box'), outEl = document.getElementById('br-css-output');
  const copyBtn = document.getElementById('copy-br-btn');

  function update() {
    const tl = tlEl.value, tr = trEl.value, br = brEl.value, bl = blEl.value;
    tlVal.textContent = tl + '%'; trVal.textContent = tr + '%';
    brVal.textContent = br + '%'; blVal.textContent = bl + '%';

    const invTl = 100 - tl, invTr = 100 - tr, invBr = 100 - br, invBl = 100 - bl;
    const rule = tl + '% ' + invTl + '% ' + br + '% ' + invBr + '% / ' + tr + '% ' + bl + '% ' + invBl + '% ' + invTr + '%';

    box.style.borderRadius = rule;
    outEl.value = 'border-radius: ' + rule + ';';
  }

  [tlEl, trEl, brEl, blEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();