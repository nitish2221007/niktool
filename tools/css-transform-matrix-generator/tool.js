(() => {
  'use strict';
  const rotEl = document.getElementById('tr-rot'), scaEl = document.getElementById('tr-scale'), skEl = document.getElementById('tr-skew');
  const boxEl = document.getElementById('tr-box'), outEl = document.getElementById('tr-output'), copyBtn = document.getElementById('copy-tr-btn');

  function update() {
    const rot = rotEl.value || 0, scale = scaEl.value || 1, skew = skEl.value || 0;
    const rule = 'transform: rotate(' + rot + 'deg) scale(' + scale + ') skewX(' + skew + 'deg);';

    boxEl.style.transform = 'rotate(' + rot + 'deg) scale(' + scale + ') skewX(' + skew + 'deg)';
    outEl.value = rule;
  }

  [rotEl, scaEl, skEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();