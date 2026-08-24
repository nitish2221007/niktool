(() => {
  'use strict';
  const th1El = document.getElementById('mal-th1'), th2El = document.getElementById('mal-th2');
  const pctResEl = document.getElementById('mal-res-pct'), unpResEl = document.getElementById('mal-res-unpol');

  function update() {
    const th1 = parseFloat(th1El.value), th2 = parseFloat(th2El.value);
    if (isNaN(th1) || isNaN(th2)) return;

    const angleDiffDeg = Math.abs(th2 - th1);
    const rad = (angleDiffDeg * Math.PI) / 180;

    // Malus's Law: I = I0 * cos^2(Delta_theta)
    const transFraction = Math.pow(Math.cos(rad), 2);
    const transPct = transFraction * 100;
    // For unpolarized initial light: first polarizer transmits 50%
    const unpolPct = transPct * 0.50;

    pctResEl.textContent = transPct.toFixed(1) + '% Transmission';
    if (Math.abs(angleDiffDeg - 90) < 0.1 || Math.abs(angleDiffDeg - 270) < 0.1) {
      pctResEl.textContent = '0.0% (Complete Extinction - Crossed Polarizers)';
      pctResEl.style.color = '#c53030';
    } else {
      pctResEl.style.color = '#22543d';
    }

    unpResEl.textContent = unpolPct.toFixed(1) + '% of Raw Unpolarized Light';
  }

  th1El.addEventListener('input', update);
  th2El.addEventListener('input', update);
  update();
})();