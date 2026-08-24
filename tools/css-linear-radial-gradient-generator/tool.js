(() => {
  'use strict';
  const c1El = document.getElementById('grad-c1'), c2El = document.getElementById('grad-c2'), angEl = document.getElementById('grad-angle');
  const boxEl = document.getElementById('grad-preview-box'), outEl = document.getElementById('grad-output'), copyBtn = document.getElementById('copy-grad-btn');

  function update() {
    const c1 = c1El.value, c2 = c2El.value, ang = angEl.value || 135;
    const rule = 'background: linear-gradient(' + ang + 'deg, ' + c1 + ' 0%, ' + c2 + ' 100%);';

    boxEl.style.background = 'linear-gradient(' + ang + 'deg, ' + c1 + ' 0%, ' + c2 + ' 100%)';
    outEl.value = rule;
  }

  [c1El, c2El, angEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();