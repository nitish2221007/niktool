(() => {
  'use strict';
  const kwEl = document.getElementById('pw-kw'), hpEl = document.getElementById('pw-hp');
  const wEl = document.getElementById('pw-w'), btuEl = document.getElementById('pw-btu');

  function updateFromKw(kw) {
    hpEl.value = (kw * 1.34102).toFixed(2);
    wEl.value = (kw * 1000).toFixed(0);
    btuEl.value = (kw * 3412.142).toFixed(0);
  }

  kwEl.addEventListener('input', () => {
    const v = parseFloat(kwEl.value);
    if (!isNaN(v)) updateFromKw(v);
  });

  hpEl.addEventListener('input', () => {
    const v = parseFloat(hpEl.value);
    if (!isNaN(v)) {
      const kw = v / 1.34102;
      kwEl.value = kw.toFixed(2);
      wEl.value = (kw * 1000).toFixed(0);
      btuEl.value = (kw * 3412.142).toFixed(0);
    }
  });

  updateFromKw(100);
})();