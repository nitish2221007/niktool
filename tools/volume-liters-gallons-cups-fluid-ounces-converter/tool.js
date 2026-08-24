(() => {
  'use strict';
  const lEl = document.getElementById('vol-l'), galEl = document.getElementById('vol-gal');
  const flozEl = document.getElementById('vol-floz'), cupEl = document.getElementById('vol-cups');

  function updateFromL(l) {
    galEl.value = (l / 3.78541).toFixed(3);
    flozEl.value = (l * 33.814).toFixed(2);
    cupEl.value = (l * 4.22675).toFixed(2);
  }

  lEl.addEventListener('input', () => {
    const v = parseFloat(lEl.value);
    if (!isNaN(v)) updateFromL(v);
  });

  galEl.addEventListener('input', () => {
    const v = parseFloat(galEl.value);
    if (!isNaN(v)) {
      const l = v * 3.78541;
      lEl.value = l.toFixed(3);
      flozEl.value = (l * 33.814).toFixed(2);
      cupEl.value = (l * 4.22675).toFixed(2);
    }
  });

  updateFromL(3.785);
})();