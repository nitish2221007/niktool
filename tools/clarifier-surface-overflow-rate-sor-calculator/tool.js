(() => {
  'use strict';
  const qEl = document.getElementById('sor-q'), dEl = document.getElementById('sor-diam');
  const sorResEl = document.getElementById('sor-res-sor'), metResEl = document.getElementById('sor-res-metric'), wResEl = document.getElementById('sor-res-weir');

  function update() {
    const qMgd = parseFloat(qEl.value), dFt = parseFloat(dEl.value);
    if (isNaN(qMgd) || isNaN(dFt) || qMgd <= 0 || dFt <= 0) return;

    const qGpd = qMgd * 1e6;
    // Surface Area A = pi * (d^2) / 4 (sq ft)
    const areaSqFt = (Math.PI * Math.pow(dFt, 2)) / 4;
    // Surface Overflow Rate (SOR) = Q / A (gpd / sq ft)
    const sorGpdSqFt = qGpd / areaSqFt;
    // Convert to m^3 / (m^2 * day): 1 gpd/sq ft = 0.04074 m^3/(m^2*d)
    const sorMetric = sorGpdSqFt * 0.0407458;

    // Peripheral weir perimeter = pi * D (ft)
    const weirPerimFt = Math.PI * dFt;
    const weirLoadingGpdFt = qGpd / weirPerimFt;

    sorResEl.textContent = Math.round(sorGpdSqFt).toLocaleString() + ' gpd / ft²';

    if (sorGpdSqFt <= 800) {
      sorResEl.style.color = '#22543d';
    } else if (sorGpdSqFt <= 1200) {
      sorResEl.style.color = '#d97706';
    } else {
      sorResEl.style.color = '#c53030';
    }

    metResEl.textContent = sorMetric.toFixed(1) + ' m³ / (m²·day) (' + (sorGpdSqFt <= 800 ? 'Within EPA Standard' : 'High Rate') + ')';
    wResEl.textContent = Math.round(weirLoadingGpdFt).toLocaleString() + ' gpd / linear ft (Max 20,000 limit)';
  }

  qEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();