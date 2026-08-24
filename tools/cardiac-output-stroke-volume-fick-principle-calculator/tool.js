(() => {
  'use strict';
  const hrEl = document.getElementById('co-hr'), svEl = document.getElementById('co-sv'), bsaEl = document.getElementById('co-bsa');
  const coResEl = document.getElementById('co-res-co'), ciResEl = document.getElementById('co-res-ci');

  function update() {
    const hr = parseFloat(hrEl.value), sv = parseFloat(svEl.value), bsa = parseFloat(bsaEl.value);
    if (isNaN(hr) || isNaN(sv) || isNaN(bsa) || hr <= 0 || sv <= 0 || bsa <= 0) return;

    const CO = (hr * sv) / 1000.0;
    const CI = CO / bsa;
    const daily_liters = CO * 60.0 * 24.0;

    let status = '', color = '#22543d';
    if (CI >= 2.5 && CI <= 4.2) {
      status = 'NORMAL CARDIAC INDEX (2.5 - 4.2 L/min/m²: Adequate tissue perfusion)';
      color = '#22543d';
    } else if (CI < 2.2) {
      status = 'CARDIOGENIC SHOCK RISK (CI < 2.2 L/min/m²: Hypoperfusion)';
      color = '#c53030';
    } else {
      status = 'HYPERDYNAMIC CIRCULATION (CI > 4.2 L/min/m²)';
      color = '#2563eb';
    }

    coResEl.textContent = 'Cardiac Output CO = ' + CO.toFixed(2) + ' L / min';
    ciResEl.textContent = 'Cardiac Index CI = ' + CI.toFixed(2) + ' L/min/m² (' + status.split(' (')[0] + ' | Daily: ' + Math.round(daily_liters).toLocaleString() + ' L/day)';
    ciResEl.style.color = color;
  }

  [hrEl, svEl, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();