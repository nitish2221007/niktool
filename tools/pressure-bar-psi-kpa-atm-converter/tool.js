(() => {
  'use strict';
  const barEl = document.getElementById('pr-bar'), psiEl = document.getElementById('pr-psi');
  const kpaEl = document.getElementById('pr-kpa'), atmEl = document.getElementById('pr-atm');

  function updateFromBar(bar) {
    psiEl.value = (bar * 14.50377).toFixed(3);
    kpaEl.value = (bar * 100).toFixed(2);
    atmEl.value = (bar * 0.986923).toFixed(4);
  }

  barEl.addEventListener('input', () => {
    const v = parseFloat(barEl.value);
    if (!isNaN(v)) updateFromBar(v);
  });

  psiEl.addEventListener('input', () => {
    const v = parseFloat(psiEl.value);
    if (!isNaN(v)) {
      const bar = v / 14.50377;
      barEl.value = bar.toFixed(4);
      kpaEl.value = (bar * 100).toFixed(2);
      atmEl.value = (bar * 0.986923).toFixed(4);
    }
  });

  kpaEl.addEventListener('input', () => {
    const v = parseFloat(kpaEl.value);
    if (!isNaN(v)) {
      const bar = v / 100;
      barEl.value = bar.toFixed(4);
      psiEl.value = (bar * 14.50377).toFixed(3);
      atmEl.value = (bar * 0.986923).toFixed(4);
    }
  });

  atmEl.addEventListener('input', () => {
    const v = parseFloat(atmEl.value);
    if (!isNaN(v)) {
      const bar = v / 0.986923;
      barEl.value = bar.toFixed(4);
      psiEl.value = (bar * 14.50377).toFixed(3);
      kpaEl.value = (bar * 100).toFixed(2);
    }
  });

  updateFromBar(1.0);
})();