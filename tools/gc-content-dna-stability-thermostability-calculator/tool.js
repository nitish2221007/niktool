(() => {
  'use strict';
  const sEl = document.getElementById('gc-seq');
  const pcResEl = document.getElementById('gc-res-pct'), dtResEl = document.getElementById('gc-res-details');

  function update() {
    const seq = sEl.value.trim().toUpperCase().replace(/[^ATGC]/g, '');
    if (seq.length === 0) return;

    let countA = 0, countT = 0, countG = 0, countC = 0;
    for (let nt of seq) {
      if (nt === 'A') countA++;
      else if (nt === 'T') countT++;
      else if (nt === 'G') countG++;
      else if (nt === 'C') countC++;
    }

    const total = seq.length;
    const gc = countG + countC;
    const gc_pct = (gc / total) * 100.0;

    // GC skew = (G - C) / (G + C)
    const gc_skew = gc > 0 ? (countG - countC) / gc : 0;

    pcResEl.textContent = 'GC Content = ' + gc_pct.toFixed(1) + '%';
    dtResEl.textContent = 'Length: ' + total + ' bp (G: ' + countG + ', C: ' + countC + ', A: ' + countA + ', T: ' + countT + ') | GC Skew = ' + gc_skew.toFixed(3);
  }

  sEl.addEventListener('input', update);
  update();
})();