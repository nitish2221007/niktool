(() => {
  'use strict';
  const inEl = document.getElementById('title-input');
  const styleEl = document.getElementById('title-style');
  const outEl = document.getElementById('title-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-title-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('title-res-card');

  const LOWER_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of', 'with', 'as']);

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function toTitleCase(str) {
    return str.split('\n').map(line => {
      const words = line.split(/(\s+)/);
      return words.map((w, idx) => {
        if (/^\s+$/.test(w) || !w) return w;
        const low = w.toLowerCase();
        // Capitalize first and last word or words longer than 3 letters not in lowercase list
        if (idx === 0 || idx === words.length - 1 || (!LOWER_WORDS.has(low) && low.length >= 4)) {
          return low.charAt(0).toUpperCase() + low.slice(1);
        }
        return low;
      }).join('');
    }).join('\n');
  }

  function format() {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter text to format.', true);
      resCard.style.display = 'none';
      return;
    }
    const style = styleEl.value;
    let res = '';
    if (style === 'upper') res = raw.toUpperCase();
    else if (style === 'lower') res = raw.toLowerCase();
    else res = toTitleCase(raw);

    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('Text formatted successfully.');
  }

  btn.addEventListener('click', format);
  inEl.addEventListener('input', format);
  styleEl.addEventListener('change', format);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Formatted title copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();