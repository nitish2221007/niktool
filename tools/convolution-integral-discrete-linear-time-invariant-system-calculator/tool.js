(() => {
  'use strict';
  const xEl = document.getElementById('cnv-x'), hEl = document.getElementById('cnv-h');
  const yResEl = document.getElementById('cnv-res-y'), lenResEl = document.getElementById('cnv-res-len');

  function update() {
    const x = (xEl.value || '').split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const h = (hEl.value || '').split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));

    if (x.length === 0 || h.length === 0) return;

    const N_x = x.length;
    const N_h = h.length;
    const N_y = N_x + N_h - 1;

    const y = new Array(N_y).fill(0);

    // Convolution sum: y[n] = sum_k x[k] * h[n - k]
    for (let n = 0; n < N_y; n++) {
      for (let k = 0; k < N_x; k++) {
        if (n - k >= 0 && n - k < N_h) {
          y[n] += x[k] * h[n - k];
        }
      }
    }

    const yStr = y.map(v => Number.isInteger(v) ? v : v.toFixed(2)).join(', ');

    yResEl.textContent = 'y[n] = [ ' + yStr + ' ]';
    lenResEl.textContent = 'Output Length N_y = ' + N_y + ' (N_x: ' + N_x + ' + N_h: ' + N_h + ' - 1 = ' + N_y + ' Samples)';
  }

  xEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();