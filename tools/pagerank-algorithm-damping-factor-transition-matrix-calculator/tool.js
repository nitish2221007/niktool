(() => {
  'use strict';
  const nEl = document.getElementById('pr-n'), dEl = document.getElementById('pr-d'), inEl = document.getElementById('pr-inflow');
  const prResEl = document.getElementById('pr-res-pr'), tlResEl = document.getElementById('pr-res-tele');

  function update() {
    const N = parseFloat(nEl.value), d = parseFloat(dEl.value), inflow = parseFloat(inEl.value);
    if (isNaN(N) || isNaN(d) || isNaN(inflow) || N <= 0 || d < 0 || d >= 1 || inflow < 0) return;

    // PageRank formula: PR = ( (1 - d) / N ) + ( d * inflow )
    const teleport = (1.0 - d) / N;
    const link_contribution = d * inflow;
    const PR = teleport + link_contribution;

    prResEl.textContent = 'PageRank PR = ' + PR.toFixed(4) + ' (' + (PR * 100).toFixed(2) + '%)';
    tlResEl.textContent = 'Teleport = ' + teleport.toFixed(4) + ' ((1-d)/N) | Inflow = ' + link_contribution.toFixed(4) + ' (d=' + d + ' on N=' + N + ' pages)';
  }

  [nEl, dEl, inEl].forEach(el => el.addEventListener('input', update));
  update();
})();