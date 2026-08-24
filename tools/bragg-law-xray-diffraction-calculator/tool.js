(() => {
  'use strict';
  const lamEl = document.getElementById('brg-lam'), dEl = document.getElementById('brg-d'), nEl = document.getElementById('brg-n');
  const th2ResEl = document.getElementById('brg-res-2th'), thResEl = document.getElementById('brg-res-th');

  function update() {
    const lambda = parseFloat(lamEl.value), dAng = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(lambda) || isNaN(dAng) || isNaN(n) || lambda <= 0 || dAng <= 0 || n < 1) return;

    // n * lambda = 2 * d * sin(theta) => sin(theta) = (n * lambda) / (2 * d)
    const sinTheta = (n * lambda) / (2 * dAng);
    if (sinTheta > 1.0) {
      th2ResEl.textContent = 'No Diffraction (λ > 2d)';
      th2ResEl.style.color = '#c53030';
      return;
    }

    const rad = Math.asin(sinTheta);
    const deg = (rad * 180) / Math.PI;
    const twoTheta = deg * 2;

    th2ResEl.textContent = twoTheta.toFixed(2) + '° (2θ Peak)';
    th2ResEl.style.color = '#22543d';
    thResEl.textContent = 'θ = ' + deg.toFixed(2) + '° (Glancing Angle)';
  }

  [lamEl, dEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();