(() => {
  'use strict';
  const fsEl = document.getElementById('fir-fs'), fcEl = document.getElementById('fir-fc');
  const dfEl = document.getElementById('fir-df'), winEl = document.getElementById('fir-win');
  const tResEl = document.getElementById('fir-res-taps'), dResEl = document.getElementById('fir-res-delay');

  const WINDOWS = {
    'hamming':  { c: 3.3, atten: '-53 dB' },
    'hann':     { c: 3.1, atten: '-44 dB' },
    'blackman': { c: 5.5, atten: '-74 dB' },
    'rect':     { c: 0.9, atten: '-21 dB' }
  };

  function update() {
    const Fs = parseFloat(fsEl.value), Fc = parseFloat(fcEl.value), df = parseFloat(dfEl.value);
    const win = WINDOWS[winEl.value];

    if (isNaN(Fs) || isNaN(Fc) || isNaN(df) || Fs <= 0 || Fc <= 0 || df <= 0 || Fc >= Fs / 2) return;

    const df_norm = df / Fs;
    let N = Math.ceil(win.c / df_norm);
    if (N % 2 === 0) N += 1;

    const delaySamples = (N - 1) / 2;
    const delayMs = (delaySamples / Fs) * 1000;

    tResEl.textContent = N + ' Taps (Order ' + (N - 1) + ' FIR Filter)';
    dResEl.textContent = 'Group Delay: ' + delayMs.toFixed(2) + ' ms (' + delaySamples + ' Samples) | Stopband: ' + win.atten;
  }

  [fsEl, fcEl, dfEl].forEach(el => el.addEventListener('input', update));
  winEl.addEventListener('change', update);
  update();
})();