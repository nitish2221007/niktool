(() => {
  'use strict';
  const nEl = document.getElementById('fft-n');
  const sResEl = document.getElementById('fft-res-spd'), oResEl = document.getElementById('fft-res-ops');

  function update() {
    const N = parseInt(nEl.value, 10);
    if (isNaN(N) || N <= 0) return;

    const stages = Math.round(Math.log2(N));
    const dftOps = Math.pow(N, 2);
    const fftMults = (N / 2) * stages;
    const fftAdds = N * stages;
    const speedup = dftOps / fftMults;

    sResEl.textContent = speedup.toFixed(1) + '× Speedup (FFT O(N log N))';
    oResEl.textContent = fftMults.toLocaleString() + ' FFT Mults vs ' + dftOps.toLocaleString() + ' DFT Mults (' + stages + ' Butterfly Stages, ' + fftAdds.toLocaleString() + ' Additions)';
  }

  nEl.addEventListener('change', update);
  update();
})();