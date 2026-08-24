(() => {
  'use strict';
  const jEl = document.getElementById('en-j'), kwhEl = document.getElementById('en-kwh');
  const kcalEl = document.getElementById('en-kcal'), btuEl = document.getElementById('en-btu');

  function updateFromJ(j) {
    kwhEl.value = (j / 3600000).toFixed(4);
    kcalEl.value = (j / 4184).toFixed(2);
    btuEl.value = (j / 1055.06).toFixed(2);
  }

  jEl.addEventListener('input', () => {
    const v = parseFloat(jEl.value);
    if (!isNaN(v)) updateFromJ(v);
  });

  kwhEl.addEventListener('input', () => {
    const v = parseFloat(kwhEl.value);
    if (!isNaN(v)) {
      const j = v * 3600000;
      jEl.value = j.toFixed(0);
      kcalEl.value = (j / 4184).toFixed(2);
      btuEl.value = (j / 1055.06).toFixed(2);
    }
  });

  kcalEl.addEventListener('input', () => {
    const v = parseFloat(kcalEl.value);
    if (!isNaN(v)) {
      const j = v * 4184;
      jEl.value = j.toFixed(0);
      kwhEl.value = (j / 3600000).toFixed(4);
      btuEl.value = (j / 1055.06).toFixed(2);
    }
  });

  btuEl.addEventListener('input', () => {
    const v = parseFloat(btuEl.value);
    if (!isNaN(v)) {
      const j = v * 1055.06;
      jEl.value = j.toFixed(0);
      kwhEl.value = (j / 3600000).toFixed(4);
      kcalEl.value = (j / 4184).toFixed(2);
    }
  });

  updateFromJ(3600000);
})();