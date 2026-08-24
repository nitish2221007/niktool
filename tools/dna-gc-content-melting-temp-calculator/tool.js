(() => {
  'use strict';
  const seqEl = document.getElementById('dna-seq');
  const tmResEl = document.getElementById('dna-res-tm'), gcResEl = document.getElementById('dna-res-gc'), lenResEl = document.getElementById('dna-res-len');

  function update() {
    const raw = seqEl.value.toUpperCase().replace(/[^ATGC]/g, '');
    if (!raw) return;

    const len = raw.length;
    let a = 0, t = 0, g = 0, c = 0;
    for (const ch of raw) {
      if (ch === 'A') a++;
      else if (ch === 'T') t++;
      else if (ch === 'G') g++;
      else if (ch === 'C') c++;
    }

    const gcCount = g + c;
    const gcPct = (gcCount / len) * 100;

    // Wallace Rule for short oligos (<14bp): Tm = 2*(A+T) + 4*(G+C)
    // Marmur-Doty formula for standard oligos (>=14bp): Tm = 64.9 + 41 * (G+C - 16.4) / N
    let tm = 0;
    if (len < 14) {
      tm = (2 * (a + t)) + (4 * gcCount);
    } else {
      tm = 64.9 + 41 * (gcCount - 16.4) / len;
    }

    tmResEl.textContent = tm.toFixed(1) + ' °C (Anneal @ ' + (tm - 5).toFixed(1) + ' °C)';
    gcResEl.textContent = gcPct.toFixed(1) + '% GC';
    lenResEl.textContent = len + ' bp (A:' + a + ' T:' + t + ' G:' + g + ' C:' + c + ')';
  }

  seqEl.addEventListener('input', update);
  update();
})();