(() => {
  'use strict';
  const stEl = document.getElementById('plc-steps'), exEl = document.getElementById('plc-exec');
  const ioEl = document.getElementById('plc-io'), cmEl = document.getElementById('plc-comm');
  const scResEl = document.getElementById('plc-res-scan'), fqResEl = document.getElementById('plc-res-freq');

  function update() {
    const kSteps = parseFloat(stEl.value), usPerInst = parseFloat(exEl.value);
    const tIO = parseFloat(ioEl.value), tComm = parseFloat(cmEl.value);

    if (isNaN(kSteps) || isNaN(usPerInst) || isNaN(tIO) || isNaN(tComm) || kSteps <= 0 || usPerInst <= 0 || tIO < 0 || tComm < 0) return;

    // Logic execution time in ms: (kSteps * 1000 * usPerInst) / 1000 = kSteps * usPerInst
    const tLogic = kSteps * usPerInst;

    // Total scan time in ms
    const tScan = tIO + tLogic + tComm;

    // Nyquist condition for PLC input scanning: pulse width must exceed 2 * tScan
    const minPulseMs = 2 * tScan;
    const maxFreqHz = 1000 / minPulseMs;

    scResEl.textContent = 'T_scan = ' + tScan.toFixed(2) + ' ms (Scan Rate: ' + Math.round(1000/tScan) + ' Hz)';
    fqResEl.textContent = 'Max Input Freq: ' + maxFreqHz.toFixed(1) + ' Hz | Logic: ' + tLogic.toFixed(2) + 'ms, I/O: ' + tIO.toFixed(2) + 'ms, Comm: ' + tComm.toFixed(2) + 'ms';
  }

  [stEl, exEl, ioEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();