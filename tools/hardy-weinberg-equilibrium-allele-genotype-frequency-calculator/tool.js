(() => {
  'use strict';
  const q2El = document.getElementById('hw-q2'), popEl = document.getElementById('hw-pop');
  const alResEl = document.getElementById('hw-res-alleles'), gnResEl = document.getElementById('hw-res-geno');

  function update() {
    const q2 = parseFloat(q2El.value), N = parseFloat(popEl.value);
    if (isNaN(q2) || isNaN(N) || q2 <= 0 || q2 >= 1 || N <= 0) return;

    // Recessive allele frequency q = sqrt(q2)
    const q = Math.sqrt(q2);
    // Dominant allele frequency p = 1 - q
    const p = 1.0 - q;

    // Genotypes:
    const p2 = Math.pow(p, 2); // Homozygous dominant AA
    const two_pq = 2.0 * p * q; // Heterozygous carrier Aa

    const carrier_ratio = Math.round(1.0 / two_pq);
    const affected_ratio = Math.round(1.0 / q2);

    const count_AA = Math.round(p2 * N);
    const count_Aa = Math.round(two_pq * N);
    const count_aa = Math.round(q2 * N);

    alResEl.textContent = 'Alleles: p = ' + p.toFixed(4) + ' (' + (p*100).toFixed(2) + '%), q = ' + q.toFixed(4) + ' (' + (q*100).toFixed(2) + '%)';
    gnResEl.textContent = 'Carriers 2pq = ' + (two_pq * 100).toFixed(2) + '% (1 in ' + carrier_ratio + ' | Affected: 1 in ' + affected_ratio + ' | AA: ' + count_AA.toLocaleString() + ', Aa: ' + count_Aa.toLocaleString() + ', aa: ' + count_aa.toLocaleString() + ')';
  }

  q2El.addEventListener('input', update);
  popEl.addEventListener('input', update);
  update();
})();