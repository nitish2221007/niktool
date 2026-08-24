(() => {
  'use strict';
  const cEl = document.getElementById('tp-c'), fEl = document.getElementById('tp-f'), kEl = document.getElementById('tp-k');

  function updateFromC(c) {
    fEl.value = ((c * 9/5) + 32).toFixed(2);
    kEl.value = (c + 273.15).toFixed(2);
  }

  cEl.addEventListener('input', () => {
    const v = parseFloat(cEl.value);
    if (!isNaN(v)) updateFromC(v);
  });

  fEl.addEventListener('input', () => {
    const v = parseFloat(fEl.value);
    if (!isNaN(v)) {
      const c = (v - 32) * 5/9;
      cEl.value = c.toFixed(2);
      kEl.value = (c + 273.15).toFixed(2);
    }
  });

  kEl.addEventListener('input', () => {
    const v = parseFloat(kEl.value);
    if (!isNaN(v)) {
      const c = v - 273.15;
      cEl.value = c.toFixed(2);
      fEl.value = ((c * 9/5) + 32).toFixed(2);
    }
  });

  updateFromC(25);
})();