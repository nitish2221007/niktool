(() => {
  'use strict';
  const n1El = document.getElementById('sn-n1'), deg1El = document.getElementById('sn-deg1'), n2El = document.getElementById('sn-n2');
  const d2El = document.getElementById('sn-res-deg2'), critEl = document.getElementById('sn-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), deg1 = parseFloat(deg1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(deg1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || deg1 < 0 || deg1 > 90) return;

    const rad1 = (deg1 * Math.PI) / 180;
    const sinTheta2 = (n1 * Math.sin(rad1)) / n2;

    if (sinTheta2 > 1.0) {
      d2El.textContent = 'Total Internal Reflection (TIR)';
      d2El.style.color = '#c53030';
    } else {
      const rad2 = Math.asin(sinTheta2);
      const deg2 = (rad2 * 180) / Math.PI;
      d2El.textContent = deg2.toFixed(2) + '°';
      d2El.style.color = '#22543d';
    }

    if (n1 > n2) {
      const critRad = Math.asin(n2 / n1);
      const critDeg = (critRad * 180) / Math.PI;
      critEl.textContent = critDeg.toFixed(2) + '°';
    } else {
      critEl.textContent = 'None (Light moving into denser medium)';
    }
  }

  [n1El, deg1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();