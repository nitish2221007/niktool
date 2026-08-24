(() => {
  'use strict';
  const inEl = document.getElementById('hhi-in');
  const hResEl = document.getElementById('hhi-res-val'), eResEl = document.getElementById('hhi-res-eval');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const shares = raw.split(/[,\s\t]+/).map(Number).filter(v => !isNaN(v) && v > 0);
    if (shares.length === 0) return;

    // HHI = sum( s_i^2 ) where s_i are in whole percentages (e.g. 35 -> 35^2 = 1225)
    let hhi = 0;
    let totalShare = 0;
    for (const s of shares) {
      hhi += Math.pow(s, 2);
      totalShare += s;
    }

    hResEl.textContent = Math.round(hhi).toLocaleString() + ' HHI (Total ' + Math.round(totalShare) + '% Market)';

    if (hhi < 1500) {
      eResEl.textContent = 'Unconcentrated Competitive Market (HHI < 1,500)';
      eResEl.style.color = '#22543d';
    } else if (hhi >= 1500 && hhi <= 1800) {
      eResEl.textContent = 'Moderately Concentrated Market (1,500 ≤ HHI ≤ 1,800)';
      eResEl.style.color = '#d97706';
    } else {
      eResEl.textContent = 'Highly Concentrated Oligopoly (HHI > 1,800: Strict DOJ/FTC Review)';
      eResEl.style.color = '#c53030';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();