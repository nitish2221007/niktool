(() => {
  'use strict';
  const seqEl = document.getElementById('dna-seq'), cEl = document.getElementById('dna-conc'), sEl = document.getElementById('dna-salt');
  const tmResEl = document.getElementById('dna-res-tm'), gcResEl = document.getElementById('dna-res-gc');

  function update() {
    const rawSeq = seqEl.value.trim().toUpperCase().replace(/[^ATGC]/g, '');
    const concNm = parseFloat(cEl.value), saltMm = parseFloat(sEl.value);

    if (rawSeq.length < 4 || isNaN(concNm) || isNaN(saltMm) || concNm <= 0 || saltMm <= 0) return;

    const n = rawSeq.length;
    let gcCount = 0;
    for (let char of rawSeq) {
      if (char === 'G' || char === 'C') gcCount++;
    }
    const atCount = n - gcCount;
    const gcPct = (gcCount / n) * 100;

    // Simple Wallace rule: 2*(A+T) + 4*(G+C)
    const wallaceTm = (2 * atCount) + (4 * gcCount);

    // Nearest-neighbor approximation formula (SantaLucia 1998):
    // Tm = 81.5 + 16.6 * log10([Na+]) + 0.41*(%GC) - (675 / N)
    const saltM = saltMm * 1e-3;
    const tm_nn = 81.5 + (16.6 * Math.log10(saltM)) + (0.41 * gcPct) - (675.0 / n);

    // Recommended PCR annealing temperature is typically Tm - 5°C
    const t_anneal = tm_nn - 5.0;

    tmResEl.textContent = 'T_m = ' + tm_nn.toFixed(1) + ' °C (Anneal: ' + t_anneal.toFixed(1) + ' °C)';
    gcResEl.textContent = 'GC: ' + gcPct.toFixed(1) + '% (' + gcCount + ' G/C, ' + atCount + ' A/T) | Length: ' + n + ' nt | Wallace Rule: ' + wallaceTm + '°C';
  }

  seqEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();