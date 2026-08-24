(() => {
  'use strict';
  const stEl = document.getElementById('bel-state'), vEl = document.getElementById('bel-vis');
  const fResEl = document.getElementById('bel-res-fid'), cResEl = document.getElementById('bel-res-conc');

  function update() {
    const V_pct = parseFloat(vEl.value);
    if (isNaN(V_pct) || V_pct < 0 || V_pct > 100) return;

    const V = V_pct / 100;
    const F = (1 + (3 * V)) / 4;
    const F_pct = F * 100;
    const concurrence = Math.max(0, (3 * V - 1) / 2);
    const S = 2 * Math.SQRT2 * V;

    fResEl.textContent = 'Fidelity F = ' + F_pct.toFixed(1) + '% (Target: ' + stEl.options[stEl.selectedIndex].text.split('=')[0].trim() + ')';

    if (S > 2.0) {
      cResEl.textContent = 'Concurrence C = ' + concurrence.toFixed(3) + ' | NON-LOCAL CHSH S = ' + S.toFixed(2) + ' > 2.0 (Entangled)';
      cResEl.style.color = '#22543d';
    } else {
      cResEl.textContent = 'Concurrence C = ' + concurrence.toFixed(3) + ' | CLASSICAL LIMIT S = ' + S.toFixed(2) + ' ≤ 2.0 (No Non-Locality)';
      cResEl.style.color = '#c53030';
    }
  }

  stEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  update();
})();