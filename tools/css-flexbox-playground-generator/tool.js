(() => {
  'use strict';
  const dirEl = document.getElementById('flx-dir'), justEl = document.getElementById('flx-just'), aliEl = document.getElementById('flx-align');
  const boxEl = document.getElementById('flx-preview'), outEl = document.getElementById('flx-output'), copyBtn = document.getElementById('copy-flx-btn');

  function update() {
    const dir = dirEl.value, just = justEl.value, ali = aliEl.value;
    boxEl.style.flexDirection = dir;
    boxEl.style.justifyContent = just;
    boxEl.style.alignItems = ali;

    const css = 'display: flex;\nflex-direction: ' + dir + ';\njustify-content: ' + just + ';\nalign-items: ' + ali + ';\ngap: 0.5rem;';
    outEl.value = css;
  }

  [dirEl, justEl, aliEl].forEach(el => el.addEventListener('change', update));
  update();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
  });
})();