(() => {
  'use strict';
  const ttEl = document.getElementById('bg-two-theta'), lamEl = document.getElementById('bg-lam'), nEl = document.getElementById('bg-n');
  const dResEl = document.getElementById('bg-res-d'), thResEl = document.getElementById('bg-res-theta');

  function update() {
    const two_theta = parseFloat(ttEl.value), lambda_ang = parseFloat(lamEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(two_theta) || isNaN(lambda_ang) || isNaN(n) || two_theta <= 0 || two_theta >= 180 || lambda_ang <= 0 || n < 1) return;

    // Bragg angle theta = 2theta / 2
    const theta_deg = two_theta / 2.0;
    const theta_rad = (theta_deg * Math.PI) / 180.0;

    const sin_theta = Math.sin(theta_rad);
    if (sin_theta <= 0) return;

    // Bragg's Law: n * lambda = 2 * d * sin(theta) => d = (n * lambda) / (2 * sin(theta))
    const d_ang = (n * lambda_ang) / (2.0 * sin_theta);
    const d_nm = d_ang / 10.0;

    dResEl.textContent = 'd-Spacing = ' + d_ang.toFixed(3) + ' Å (' + d_nm.toFixed(4) + ' nm)';
    thResEl.textContent = 'Bragg Angle θ = ' + theta_deg.toFixed(2) + '° | sin(θ) = ' + sin_theta.toFixed(4) + ' (2θ = ' + two_theta + '° @ λ = ' + lambda_ang + ' Å)';
  }

  [ttEl, lamEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();