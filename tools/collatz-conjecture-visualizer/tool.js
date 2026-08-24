(() => {
  'use strict';
  const nEl = document.getElementById('col-n');
  const stEl = document.getElementById('col-res-steps'), pkEl = document.getElementById('col-res-peak'), seqEl = document.getElementById('col-res-seq');

  function update() {
    let n = parseInt(nEl.value, 10);
    if (isNaN(n) || n < 1) return;

    const seq = [n];
    let peak = n;

    while (n !== 1 && seq.length < 1000) {
      if (n % 2 === 0) {
        n = n / 2;
      } else {
        n = 3 * n + 1;
      }
      seq.push(n);
      if (n > peak) peak = n;
    }

    stEl.textContent = (seq.length - 1) + ' Steps';
    pkEl.textContent = peak.toLocaleString();
    seqEl.value = seq.join(' → ');
  }

  nEl.addEventListener('input', update);
  update();
})();