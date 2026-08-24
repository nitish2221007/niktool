(() => {
  'use strict';
  const mEl = document.getElementById('gm-m'), lcEl = document.getElementById('gm-lc'), dcEl = document.getElementById('gm-dc');
  const qResEl = document.getElementById('gm-res-q'), evResEl = document.getElementById('gm-res-eval');

  function update() {
    const m = parseFloat(mEl.value), l_c = parseFloat(lcEl.value), d_c = parseFloat(dcEl.value);
    if (isNaN(m) || isNaN(l_c) || isNaN(d_c) || m <= 0 || l_c < 0 || l_c > m) return;

    // Modularity contribution for community: Q = ( l_c / m ) - ( d_c / (2*m) )^2
    const term1 = l_c / m;
    const term2 = Math.pow(d_c / (2.0 * m), 2);
    const Q = term1 - term2;

    let qual = '', color = '#22543d';
    if (Q >= 0.40) { qual = 'STRONG COMMUNITY STRUCTURE (Q > 0.4: Highly modular network partition)'; color = '#22543d'; }
    else if (Q >= 0.20) { qual = 'MODERATE COMMUNITY CLUSTERING (Q = 0.2 - 0.4)'; color = '#22543d'; }
    else if (Q >= 0.0) { qual = 'WEAK MODULARITY (Q < 0.2: Similar to random Erdos-Renyi graph)'; color = '#ea580c'; }
    else { qual = 'DISPERSED / BIPARTITE (Q < 0: More inter-community than intra-community edges)'; color = '#c53030'; }

    qResEl.textContent = 'Modularity Q = ' + Q.toFixed(3);
    qResEl.style.color = color;
    evResEl.textContent = qual + ' [Internal: ' + (term1*100).toFixed(1) + '% vs Expected: ' + (term2*100).toFixed(1) + '%]';
    evResEl.style.color = color;
  }

  [mEl, lcEl, dcEl].forEach(el => el.addEventListener('input', update));
  update();
})();