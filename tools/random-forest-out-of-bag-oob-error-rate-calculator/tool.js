(() => {
  'use strict';
  const nEl = document.getElementById('rf-n'), bEl = document.getElementById('rf-b');
  const obResEl = document.getElementById('rf-res-oob'), trResEl = document.getElementById('rf-res-trees');

  function update() {
    const N = parseFloat(nEl.value), B = parseFloat(bEl.value);
    if (isNaN(N) || isNaN(B) || N <= 0 || B <= 0) return;

    // Probability of NOT being picked in N bootstrap draws with replacement:
    // P_OOB = ( 1 - 1/N )^N -> 1 / e approx 0.3678794
    const P_OOB = Math.pow(1.0 - (1.0 / N), N);
    const P_OOB_pct = P_OOB * 100.0;

    const oob_samples_per_tree = Math.round(P_OOB * N);
    const oob_trees_per_sample = Math.round(P_OOB * B);

    obResEl.textContent = 'OOB Fraction = ' + P_OOB_pct.toFixed(2) + '% (' + oob_samples_per_tree.toLocaleString() + ' Unsampled Samples / Tree)';
    trResEl.textContent = 'Each sample is OOB in ~' + oob_trees_per_sample + ' of ' + B + ' Trees (Eliminates need for external validation split)';
  }

  nEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();