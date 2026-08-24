(() => {
  'use strict';
  const dbmEl = document.getElementById('rf-dbm'), mwEl = document.getElementById('rf-mw'), wEl = document.getElementById('rf-w');

  function updateFromDbm(dbm) {
    // P_mW = 10^(dBm / 10)
    const mw = Math.pow(10, dbm / 10);
    const w = mw / 1000;

    mwEl.value = mw >= 1000 ? (mw).toFixed(1) : mw.toFixed(3);
    wEl.value = w.toFixed(5);
  }

  dbmEl.addEventListener('input', () => {
    const v = parseFloat(dbmEl.value);
    if (!isNaN(v)) updateFromDbm(v);
  });

  mwEl.addEventListener('input', () => {
    const v = parseFloat(mwEl.value);
    if (!isNaN(v) && v > 0) {
      const dbm = 10 * Math.log10(v);
      dbmEl.value = dbm.toFixed(2);
      wEl.value = (v / 1000).toFixed(5);
    }
  });

  wEl.addEventListener('input', () => {
    const v = parseFloat(wEl.value);
    if (!isNaN(v) && v > 0) {
      const mw = v * 1000;
      const dbm = 10 * Math.log10(mw);
      dbmEl.value = dbm.toFixed(2);
      mwEl.value = mw.toFixed(3);
    }
  });

  updateFromDbm(20);
})();