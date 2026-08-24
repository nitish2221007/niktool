(() => {
  'use strict';
  const p1El = document.getElementById('syn-p1'), p2El = document.getElementById('syn-p2');
  const dResEl = document.getElementById('syn-res-days'), yResEl = document.getElementById('syn-res-years');

  function update() {
    const P1 = parseFloat(p1El.value), P2 = parseFloat(p2El.value);
    if (isNaN(P1) || isNaN(P2) || P1 <= 0 || P2 <= 0 || P1 === P2) return;

    // 1/S = |1/P1 - 1/P2| => S = (P1 * P2) / |P1 - P2|
    const S = (P1 * P2) / Math.abs(P1 - P2);
    const sYears = S / 365.25;
    const sMonths = sYears * 12;

    dResEl.textContent = S.toFixed(1) + ' Days';
    yResEl.textContent = sYears.toFixed(2) + ' Years (' + sMonths.toFixed(1) + ' Months)';
  }

  p1El.addEventListener('input', update);
  p2El.addEventListener('input', update);
  update();
})();