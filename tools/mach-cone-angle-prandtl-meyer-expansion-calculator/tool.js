(() => {
  'use strict';
  const mEl = document.getElementById('mc-mach');
  const muResEl = document.getElementById('mc-res-mu'), znResEl = document.getElementById('mc-res-zone');

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M <= 1.0) {
      muResEl.textContent = 'SUBSONIC (M ≤ 1.0: No shock cone forms)';
      znResEl.textContent = 'Mach number must be strictly greater than 1.0 for supersonic shock cone';
      return;
    }

    const mu_rad = Math.asin(1.0 / M);
    const mu_deg = (mu_rad * 180.0) / Math.PI;
    const fullCone = 2.0 * mu_deg;

    muResEl.textContent = 'Mach Angle μ = ' + mu_deg.toFixed(2) + '°';
    znResEl.textContent = 'Full Cone = ' + fullCone.toFixed(1) + '° | M = ' + M.toFixed(2) + ' (Acoustic disturbances swept downstream inside cone)';
  }

  mEl.addEventListener('input', update);
  update();
})();