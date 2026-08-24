(() => {
  'use strict';
  const inEl = document.getElementById('slug-input');
  const sepEl = document.getElementById('slug-sep');
  const stopEl = document.getElementById('slug-remove-stopwords');
  const outEl = document.getElementById('slug-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-slug-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('slug-res-card');

  const STOP_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were']);

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function generateSlug() {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter a title or text to slugify.', true);
      resCard.style.display = 'none';
      return;
    }
    const sep = sepEl.value;
    let words = raw.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9\s-_]/g, '')
      .split(/[\s-_]+/);

    if (stopEl.checked) {
      words = words.filter(w => w && !STOP_WORDS.has(w));
    } else {
      words = words.filter(Boolean);
    }

    const slug = words.join(sep);
    outEl.value = slug;
    resCard.style.display = 'block';
    setMsg('Generated clean URL slug.');
  }

  btn.addEventListener('click', generateSlug);
  inEl.addEventListener('input', generateSlug);
  sepEl.addEventListener('change', generateSlug);
  stopEl.addEventListener('change', generateSlug);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Slug copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();