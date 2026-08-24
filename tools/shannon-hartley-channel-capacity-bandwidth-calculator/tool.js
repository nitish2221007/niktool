(() => {
  'use strict';
  const bEl = document.getElementById('sh-b'), snrEl = document.getElementById('sh-snr');
  const cResEl = document.getElementById('sh-res-c'), spResEl = document.getElementById('sh-res-spec');

  function update() {
    const bMhz = parseFloat(bEl.value), snrDb = parseFloat(snrEl.value);
    if (isNaN(bMhz) || isNaN(snrDb) || bMhz <= 0) return;

    const bHz = bMhz * 1e6;
    const snrLinear = Math.pow(10, snrDb / 10);
    const cBps = bHz * (Math.log(1 + snrLinear) / Math.LN2);
    const cMbps = cBps / 1e6;
    const cGbps = cBps / 1e9;
    const specEff = Math.log(1 + snrLinear) / Math.LN2;

    cResEl.textContent = (cGbps >= 1.0 ? cGbps.toFixed(2) + ' Gbps' : cMbps.toFixed(1) + ' Mbps') + ' (Shannon Limit)';
    spResEl.textContent = 'Spectral Efficiency: ' + specEff.toFixed(2) + ' bits/sec/Hz (Linear SNR = ' + Math.round(snrLinear).toLocaleString() + ':1)';
  }

  bEl.addEventListener('input', update);
  snrEl.addEventListener('input', update);
  update();
})();