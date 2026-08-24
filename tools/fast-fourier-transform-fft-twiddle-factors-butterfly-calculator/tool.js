(() => {
  'use strict';
  const nEl = document.getElementById('fft-n'), kEl = document.getElementById('fft-k');
  const wResEl = document.getElementById('fft-res-w'), cpResEl = document.getElementById('fft-res-comp');

  function update() {
    const N = parseInt(nEl.value, 10);
    let k = parseInt(kEl.value, 10);

    if (isNaN(N) || isNaN(k) || N <= 0 || k < 0) return;
    k = k % N;

    // Twiddle factor: W_N^k = exp( -j * 2 * pi * k / N ) = cos( 2*pi*k/N ) - j * sin( 2*pi*k/N )
    const angle_rad = (2.0 * Math.PI * k) / N;
    const real = Math.cos(angle_rad);
    const imag = -Math.sin(angle_rad);
    const angle_deg = -(angle_rad * 180.0) / Math.PI;

    // Computational comparison:
    // DFT = N^2 complex multiplications
    // FFT = (N / 2) * log2(N) complex multiplications
    const dft_ops = Math.pow(N, 2);
    const stages = Math.round(Math.log2(N));
    const fft_ops = (N / 2) * stages;
    const savings = ((dft_ops - fft_ops) / dft_ops) * 100.0;

    wResEl.textContent = 'W_' + N + '^' + k + ' = ' + real.toFixed(3) + (imag >= 0 ? ' + ' : ' - ') + Math.abs(imag).toFixed(3) + ' j (∠ ' + angle_deg.toFixed(1) + '°)';
    cpResEl.textContent = 'FFT: ' + fft_ops + ' Butterflies in ' + stages + ' stages (' + savings.toFixed(1) + '% faster than ' + dft_ops + ' direct DFT mults)';
  }

  nEl.addEventListener('change', update);
  kEl.addEventListener('input', update);
  update();
})();