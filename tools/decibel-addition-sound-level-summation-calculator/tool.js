(() => {
  'use strict';
  const inEl = document.getElementById('db-in');
  const totResEl = document.getElementById('db-res-total'), bstResEl = document.getElementById('db-res-boost');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const dbs = raw.split(/[,\s\t]+/).map(Number).filter(v => !isNaN(v) && v >= 0);
    if (dbs.length === 0) return;

    // Decibel addition formula: SPL_tot = 10 * log10( sum( 10^(dB_i / 10) ) )
    let sumPower = 0;
    let maxSingle = 0;
    for (const val of dbs) {
      sumPower += Math.pow(10, val / 10);
      if (val > maxSingle) maxSingle = val;
    }

    const totalDb = 10 * Math.log10(sumPower);
    const increase = totalDb - maxSingle;

    totResEl.textContent = totalDb.toFixed(1) + ' dB SPL';
    bstResEl.textContent = '+' + increase.toFixed(1) + ' dB (over max ' + maxSingle.toFixed(1) + ' dB)';
  }

  inEl.addEventListener('input', update);
  update();
})();