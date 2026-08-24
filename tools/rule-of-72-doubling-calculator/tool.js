(() => {
  'use strict';
  const rEl = document.getElementById('r72-rate');
  const yEl = document.getElementById('r72-res-years'), exEl = document.getElementById('r72-res-exact');

  function update() {
    const r = parseFloat(rEl.value);
    if (isNaN(r) || r <= 0) return;

    const r72Years = 72 / r;
    // Exact: ln(2) / ln(1 + r/100)
    const exactYears = Math.log(2) / Math.log(1 + (r / 100));

    yEl.textContent = r72Years.toFixed(2) + ' Years';
    exEl.textContent = exactYears.toFixed(2) + ' Years';
  }

  rEl.addEventListener('input', update);
  update();
})();