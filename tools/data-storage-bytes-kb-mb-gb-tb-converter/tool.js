(() => {
  'use strict';
  const valEl = document.getElementById('ds-val'), unitEl = document.getElementById('ds-unit');
  const bEl = document.getElementById('ds-res-bytes'), mbEl = document.getElementById('ds-res-mb'), gibEl = document.getElementById('ds-res-gib');

  const FACTORS = {
    'B': 1,
    'KB': 1e3, 'MB': 1e6, 'GB': 1e9, 'TB': 1e12,
    'KiB': 1024, 'MiB': 1048576, 'GiB': 1073741824, 'TiB': 1099511627776
  };

  function update() {
    const v = parseFloat(valEl.value);
    const unit = unitEl.value;
    if (isNaN(v) || v < 0) return;

    const totalBytes = v * (FACTORS[unit] || 1);
    const mb = totalBytes / 1e6;
    const gib = totalBytes / 1073741824;

    bEl.textContent = Math.round(totalBytes).toLocaleString() + ' Bytes';
    mbEl.textContent = mb.toFixed(2) + ' MB';
    gibEl.textContent = gib.toFixed(3) + ' GiB';
  }

  valEl.addEventListener('input', update);
  unitEl.addEventListener('change', update);
  update();
})();