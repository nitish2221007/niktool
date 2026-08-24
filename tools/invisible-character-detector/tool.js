(() => {
  'use strict';
  const inEl = document.getElementById('invis-input'), outEl = document.getElementById('invis-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-invis-btn'), msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('invis-res-card'), countEl = document.getElementById('invis-count');

  // Regex matching zero-width spaces, joiners, BOM, and unusual non-printing unicode
  const INVIS_REGEX = /[\u200B-\u200D\uFEFF\u200E\u200F\u202A-\u202E\u00AD\u2060]/g;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value;
    if (!raw) { setMsg('Please enter text to inspect.', true); resCard.style.display = 'none'; return; }

    const matches = raw.match(INVIS_REGEX) || [];
    const cleaned = raw.replace(INVIS_REGEX, '');

    countEl.textContent = matches.length.toString();
    outEl.value = cleaned;
    resCard.style.display = 'block';

    if (matches.length > 0) {
      setMsg('Detected and removed ' + matches.length + ' hidden invisible characters!', true);
    } else {
      setMsg('Clean! No invisible zero-width characters found.');
    }
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Clean text copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();