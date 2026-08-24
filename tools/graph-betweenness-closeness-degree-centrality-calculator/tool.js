(() => {
  'use strict';
  const nEl = document.getElementById('gc-n'), kEl = document.getElementById('gc-k'), sdEl = document.getElementById('gc-sumd');
  const clResEl = document.getElementById('gc-res-close'), dgResEl = document.getElementById('gc-res-deg');

  function update() {
    const N = parseFloat(nEl.value), k = parseFloat(kEl.value), sum_d = parseFloat(sdEl.value);
    if (isNaN(N) || isNaN(k) || isNaN(sum_d) || N <= 1 || k < 0 || sum_d <= 0) return;

    // Normalized Degree Centrality: C_D = k / (N - 1)
    const C_D = k / (N - 1.0);

    // Normalized Closeness Centrality: C_C = (N - 1) / sum_d
    const C_C = (N - 1.0) / sum_d;

    // Average shortest path distance to all other nodes:
    const avg_dist = sum_d / (N - 1.0);

    clResEl.textContent = 'Closeness Centrality C_C = ' + C_C.toFixed(3);
    dgResEl.textContent = 'Degree C_D = ' + C_D.toFixed(3) + ' (' + k + ' / ' + (N - 1) + ' neighbors) | Mean Path Length = ' + avg_dist.toFixed(2) + ' Hops';
  }

  [nEl, kEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();