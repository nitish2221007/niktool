(() => {
  'use strict';
  const valEl = document.getElementById('rad-val'), fromEl = document.getElementById('rad-from'), toEl = document.getElementById('rad-to');
  const outEl = document.getElementById('rad-res-out');

  function update() {
    const val = valEl.value.trim();
    const fromBase = parseInt(fromEl.value, 10);
    const toBase = parseInt(toEl.value, 10);

    if (!val || isNaN(fromBase) || isNaN(toBase) || fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) return;

    try {
      const dec = parseInt(val, fromBase);
      if (isNaN(dec)) { outEl.textContent = 'Invalid characters for Base ' + fromBase; return; }
      outEl.textContent = dec.toString(toBase).toUpperCase();
    } catch (e) {
      outEl.textContent = 'Conversion Error';
    }
  }

  [valEl, fromEl, toEl].forEach(el => el.addEventListener('input', update));
  update();
})();