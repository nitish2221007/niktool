(() => {
  'use strict';
  const xEl = document.getElementById('ik-x'), yEl = document.getElementById('ik-y');
  const l1El = document.getElementById('ik-l1'), l2El = document.getElementById('ik-l2');
  const angResEl = document.getElementById('ik-res-angles'), solResEl = document.getElementById('ik-res-sol');

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value);
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);

    if (isNaN(x) || isNaN(y) || isNaN(l1) || isNaN(l2) || l1 <= 0 || l2 <= 0) return;

    const r2 = Math.pow(x, 2) + Math.pow(y, 2);
    const r = Math.sqrt(r2);

    if (r > (l1 + l2)) {
      angResEl.textContent = 'Out of Reach! (Distance ' + r.toFixed(1) + ' cm > Max ' + (l1+l2) + ' cm)';
      angResEl.style.color = '#c53030';
      solResEl.textContent = 'Unreachable Target (Beyond Envelope)';
      solResEl.style.color = '#c53030';
      return;
    }
    if (r < Math.abs(l1 - l2)) {
      angResEl.textContent = 'Too Close! (Inside Deadzone)';
      angResEl.style.color = '#c53030';
      return;
    }

    // Law of Cosines: cos(th2) = (x^2 + y^2 - l1^2 - l2^2) / (2 * l1 * l2)
    let cosTh2 = (r2 - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2);
    if (cosTh2 > 1) cosTh2 = 1;
    if (cosTh2 < -1) cosTh2 = -1;

    const th2Rad = Math.acos(cosTh2);
    // th1 = atan2(y, x) - atan2(l2 * sin(th2), l1 + l2 * cos(th2))
    const alpha = Math.atan2(y, x);
    const beta = Math.atan2(l2 * Math.sin(th2Rad), l1 + l2 * Math.cos(th2Rad));
    const th1Rad = alpha - beta;

    const th1Deg = (th1Rad * 180) / Math.PI;
    const th2Deg = (th2Rad * 180) / Math.PI;

    angResEl.textContent = 'θ₁ = ' + th1Deg.toFixed(1) + '°, θ₂ = ' + th2Deg.toFixed(1) + '°';
    angResEl.style.color = '#22543d';
    solResEl.textContent = 'Valid Reachable Target (r = ' + r.toFixed(1) + ' cm)';
    solResEl.style.color = '#22543d';
  }

  [xEl, yEl, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();