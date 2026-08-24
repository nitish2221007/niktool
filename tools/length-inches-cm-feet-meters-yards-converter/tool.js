(() => {
  'use strict';
  const mEl = document.getElementById('len-m'), cmEl = document.getElementById('len-cm');
  const inEl = document.getElementById('len-in'), ftEl = document.getElementById('len-ft'), ydEl = document.getElementById('len-yd');

  function updateFromM(m) {
    cmEl.value = (m * 100).toFixed(2);
    inEl.value = (m * 39.3701).toFixed(2);
    ftEl.value = (m * 3.28084).toFixed(3);
    ydEl.value = (m * 1.09361).toFixed(3);
  }

  mEl.addEventListener('input', () => {
    const v = parseFloat(mEl.value);
    if (!isNaN(v)) updateFromM(v);
  });

  cmEl.addEventListener('input', () => {
    const v = parseFloat(cmEl.value);
    if (!isNaN(v)) {
      const m = v / 100;
      mEl.value = m.toFixed(4);
      inEl.value = (m * 39.3701).toFixed(2);
      ftEl.value = (m * 3.28084).toFixed(3);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  inEl.addEventListener('input', () => {
    const v = parseFloat(inEl.value);
    if (!isNaN(v)) {
      const m = v * 0.0254;
      mEl.value = m.toFixed(4);
      cmEl.value = (m * 100).toFixed(2);
      ftEl.value = (m * 3.28084).toFixed(3);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  ftEl.addEventListener('input', () => {
    const v = parseFloat(ftEl.value);
    if (!isNaN(v)) {
      const m = v * 0.3048;
      mEl.value = m.toFixed(4);
      cmEl.value = (m * 100).toFixed(2);
      inEl.value = (m * 39.3701).toFixed(2);
      ydEl.value = (m * 1.09361).toFixed(3);
    }
  });

  updateFromM(1.0);
})();