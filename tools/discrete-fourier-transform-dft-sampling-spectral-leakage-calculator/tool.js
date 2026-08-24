(() => {
  'use strict';
  const fsEl = document.getElementById('dft-fs'), nEl = document.getElementById('dft-n'), winEl = document.getElementById('dft-win');
  const dfResEl = document.getElementById('dft-res-df'), nqResEl = document.getElementById('dft-res-nyq');

  const WINDOWS = {
    'hann':     { sidelobe_db: -31.5, enbw: 1.50, name: 'Hanning' },
    'hamming':  { sidelobe_db: -42.7, enbw: 1.36, name: 'Hamming' },
    'blackman': { sidelobe_db: -58.1, enbw: 1.73, name: 'Blackman' },
    'rect':     { sidelobe_db: -13.3, enbw: 1.00, name: 'Rectangular' }
  };

  function update() {
    const fsKhz = parseFloat(fsEl.value), N = parseInt(nEl.value, 10);
    const win = WINDOWS[winEl.value];

    if (isNaN(fsKhz) || isNaN(N) || fsKhz <= 0 || N <= 0) return;

    const fsHz = fsKhz * 1000.0;

    // Frequency resolution delta_f = fs / N  [Hz]
    const delta_f = fsHz / N;
    // Effective Noise Bandwidth ENBW = delta_f * window_enbw
    const enbw_hz = delta_f * win.enbw;

    // Time record length T = N / fs  [seconds -> ms]
    const T_rec_sec = N / fsHz;
    const T_rec_ms = T_rec_sec * 1000.0;

    // Nyquist frequency = fs / 2
    const f_nyq_khz = fsKhz / 2.0;

    dfResEl.textContent = 'Δf = ' + delta_f.toFixed(2) + ' Hz (ENBW = ' + enbw_hz.toFixed(2) + ' Hz)';
    nqResEl.textContent = 'Record T = ' + T_rec_ms.toFixed(1) + ' ms | Nyquist f_Nyq = ' + f_nyq_khz.toFixed(1) + ' kHz (' + win.name + ' Rejection: ' + win.sidelobe_db + ' dB)';
  }

  [fsEl, nEl, winEl].forEach(el => el.addEventListener('input', update));
  winEl.addEventListener('change', update);
  update();
})();