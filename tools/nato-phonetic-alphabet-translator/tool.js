(() => {
  'use strict';
  const inEl = document.getElementById('nato-input');
  const outEl = document.getElementById('nato-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-nato-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('nato-res-card');

  const NATO_MAP = {
    'A': 'Alfa', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
    'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
    'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
    'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
    'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
    'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
    '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Niner'
  };

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function translate() {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter text or serial numbers to translate.', true);
      resCard.style.display = 'none';
      return;
    }

    const words = raw.split(/\s+/);
    const result = words.map(word => {
      return word.toUpperCase().split('').map(ch => NATO_MAP[ch] || ch).join(' - ');
    }).join('\n[SPACE]\n');

    outEl.value = result;
    resCard.style.display = 'block';
    setMsg('Translated to NATO phonetic spelling.');
  }

  btn.addEventListener('click', translate);
  inEl.addEventListener('input', translate);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Phonetic spelling copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();