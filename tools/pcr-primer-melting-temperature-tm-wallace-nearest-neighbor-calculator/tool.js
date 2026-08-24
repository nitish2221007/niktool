(() => {
  'use strict';
  const seqEl = document.getElementById('pcr-seq');
  const tmResEl = document.getElementById('pcr-res-tm'), taResEl = document.getElementById('pcr-res-ta');

  function update() {
    const rawSeq = (seqEl.value || '').toUpperCase().replace(/[^ATGC]/g, '');
    if (!rawSeq || rawSeq.length === 0) return;

    let countA = 0, countT = 0, countG = 0, countC = 0;
    for (let char of rawSeq) {
      if (char === 'A') countA++;
      else if (char === 'T') countT++;
      else if (char === 'G') countG++;
      else if (char === 'C') countC++;
    }

    const totalLen = rawSeq.length;
    const gcCount = countG + countC;
    const atCount = countA + countT;
    const gc_pct = (gcCount / totalLen) * 100.0;

    let Tm = 0;
    if (totalLen <= 14) {
      // Wallace Rule for short oligo <= 14 bp: Tm = 2*(A+T) + 4*(G+C)
      Tm = (2.0 * atCount) + (4.0 * gcCount);
    } else {
      // SantaLucia / Marmur-Doty empirical formula for longer primers:
      // Tm = 64.9 + 41 * (gcCount - 16.4) / totalLen
      Tm = 64.9 + (41.0 * (gcCount - 16.4) / totalLen);
    }

    // Optimal annealing temperature Ta approx = Tm - 5 deg C
    const Ta = Tm - 5.0;

    let status = '';
    let color = '#22543d';

    if (gc_pct >= 40.0 && gc_pct <= 60.0 && totalLen >= 18 && totalLen <= 24) {
      status = 'OPTIMAL PRIMER DESIGN (18-24 bp, 40-60% GC Content: Strong specific binding)';
      color = '#22543d';
    } else if (totalLen < 18) {
      status = 'SHORT PRIMER (< 18 bp: Risk of non-specific annealing in genome)';
      color = '#d97706';
    } else {
      status = 'ACCEPTABLE (Check for primer-dimers or secondary hairpin loops)';
      color = '#2563eb';
    }

    tmResEl.textContent = 'Tm = ' + Tm.toFixed(1) + ' °C';
    tmResEl.style.color = color;
    taResEl.textContent = 'Optimal Annealing Ta = ' + Ta.toFixed(1) + ' °C (Length: ' + totalLen + ' bp | GC: ' + gc_pct.toFixed(1) + '% | ' + status.split(' (')[0] + ')';
    taResEl.style.color = color;
  }

  seqEl.addEventListener('input', update);
  update();
})();