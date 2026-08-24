(() => {
  'use strict';
  const nEl = document.getElementById('fc-n'), lbfEl = document.getElementById('fc-lbf');
  const kgfEl = document.getElementById('fc-kgf'), dynEl = document.getElementById('fc-dyn');

  function updateFromN(n) {
    lbfEl.value = (n * 0.224809).toFixed(3);
    kgfEl.value = (n / 9.80665).toFixed(3);
    dynEl.value = (n * 1e5).toExponential(2);
  }

  nEl.addEventListener('input', () => {
    const v = parseFloat(nEl.value);
    if (!isNaN(v)) updateFromN(v);
  });

  lbfEl.addEventListener('input', () => {
    const v = parseFloat(lbfEl.value);
    if (!isNaN(v)) {
      const n = v / 0.224809;
      nEl.value = n.toFixed(2);
      kgfEl.value = (n / 9.80665).toFixed(3);
      dynEl.value = (n * 1e5).toExponential(2);
    }
  });

  kgfEl.addEventListener('input', () => {
    const v = parseFloat(kgfEl.value);
    if (!isNaN(v)) {
      const n = v * 9.80665;
      nEl.value = n.toFixed(2);
      lbfEl.value = (n * 0.224809).toFixed(3);
      dynEl.value = (n * 1e5).toExponential(2);
    }
  });

  updateFromN(100);
})();