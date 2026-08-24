(() => {
  'use strict';
  const seqEl = document.getElementById('tm-seq'), naEl = document.getElementById('tm-na');
  const mgEl = document.getElementById('tm-mg'), cpEl = document.getElementById('tm-cp');
  const tmResEl = document.getElementById('tm-res-tm'), pcrResEl = document.getElementById('tm-res-pcr');

  function update() {
    let seq = seqEl.value.trim().toUpperCase().replace(/[^ATCG]/g, '');
    const na_mM = parseFloat(naEl.value), mg_mM = parseFloat(mgEl.value), cp_nM = parseFloat(cpEl.value);

    if (seq.length < 6 || isNaN(na_mM) || isNaN(mg_mM) || isNaN(cp_nM)) return;

    let countA = 0, countT = 0, countC = 0, countG = 0;
    for (let char of seq) {
      if (char === 'A') countA++;
      else if (char === 'T') countT++;
      else if (char === 'C') countC++;
      else if (char === 'G') countG++;
    }

    const len = seq.length;
    const gc_count = countG + countC;
    const gc_pct = (gc_count / len) * 100.0;

    // SantaLucia & von Ahsen salt correction: [Monovalent equivalent] = [Na+] + 120 * sqrt([Mg2+])
    const monovalent_eq = (na_mM * 1e-3) + (120.0 * Math.sqrt(mg_mM * 1e-3) * 1e-3);

    // Nearest-neighbor empirical formula:
    // Tm = 81.5 + 16.6 * log10([Na+]) + 0.41 * (%GC) - (675 / len)
    const Tm = 81.5 + (16.6 * Math.log10(Math.max(0.01, monovalent_eq))) + (0.41 * gc_pct) - (675.0 / len);
    const Ta = Tm - 5.0;

    tmResEl.textContent = 'Melting Temp Tm = ' + Tm.toFixed(1) + ' °C';
    pcrResEl.textContent = 'Optimal Annealing Ta ≈ ' + Ta.toFixed(1) + ' °C (Length: ' + len + ' bp | GC: ' + gc_pct.toFixed(1) + '% | [Mg²⁺] = ' + mg_mM + ' mM)';
  }

  [seqEl, naEl, mgEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();