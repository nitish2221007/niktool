(() => {
  'use strict';
  const colsEl = document.getElementById('grd-cols'), gapEl = document.getElementById('grd-gap');
  const boxEl = document.getElementById('grd-preview'), outEl = document.getElementById('grd-output'), copyBtn = document.getElementById('copy-grd-btn');

  function update() {
    const cols = parseInt(colsEl.value, 10) || 3, gap = parseInt(gapEl.value, 10) || 12;

    boxEl.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
    boxEl.style.gap = gap + 'px';

    boxEl.innerHTML = '';
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    for (let i = 1; i <= cols; i++) {
      const d = document.createElement('div');
      d.style.background = colors[(i - 1) % colors.length];
      d.style.color = '#fff';
      d.style.padding = '1rem';
      d.style.borderRadius = '6px';
      d.style.textAlign = 'center';
      d.style.fontWeight = '700';
      d.textContent = 'Col ' + i;
      boxEl.appendChild(d);
    }

    const css = 'display: grid;\ngrid-template-columns: repeat(' + cols + ', 1fr);\ngap: ' + gap + 'px;';
    outEl.value = css;
  }

  [colsEl, gapEl].forEach(el => el.addEventListener('input', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();