(() => {
  'use strict';
  const cEl = document.getElementById('shn-counts');
  const hResEl = document.getElementById('shn-res-h'), evResEl = document.getElementById('shn-res-even');

  function update() {
    const raw = cEl.value;
    const counts = raw.split(/[,\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);

    if (counts.length < 2) return;

    const S = counts.length; // Species richness
    const N_total = counts.reduce((a, b) => a + b, 0);

    // Relative proportions p_i = n_i / N_total
    // Shannon Index H' = - sum( p_i * ln(p_i) )
    let H = 0;
    for (let count of counts) {
      const p_i = count / N_total;
      H += p_i * Math.log(p_i);
    }
    H = -H;

    // Maximum theoretical diversity H_max = ln(S)
    const H_max = Math.log(S);

    // Pielou's Evenness J' = H' / H_max
    const J_prime = H / H_max;

    // Simpson's Index D = sum( p_i^2 )
    let D = 0;
    for (let count of counts) {
      const p_i = count / N_total;
      D += Math.pow(p_i, 2);
    }
    const GiniSimpson = 1.0 - D;

    hResEl.textContent = 'H' = ' + H.toFixed(3) + ' (Richness S = ' + S + ' Species, N = ' + N_total + ')';
    evResEl.textContent = 'Pielou J' = ' + J_prime.toFixed(3) + ' (' + (J_prime * 100).toFixed(1) + '% Evenness | Gini-Simpson 1-D = ' + GiniSimpson.toFixed(3) + ')';
  }

  cEl.addEventListener('input', update);
  update();
})();