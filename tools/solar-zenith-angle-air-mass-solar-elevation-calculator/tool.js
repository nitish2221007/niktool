(() => {
  'use strict';
  const latEl = document.getElementById('am-lat'), decEl = document.getElementById('am-dec'), omEl = document.getElementById('am-omega');
  const amResEl = document.getElementById('am-res-am'), znResEl = document.getElementById('am-res-zenith');

  function update() {
    const latDeg = parseFloat(latEl.value), decDeg = parseFloat(decEl.value), omDeg = parseFloat(omEl.value);
    if (isNaN(latDeg) || isNaN(decDeg) || isNaN(omDeg)) return;

    const latRad = (latDeg * Math.PI) / 180;
    const decRad = (decDeg * Math.PI) / 180;
    const omRad = (omDeg * Math.PI) / 180;

    // cos(theta_z) = sin(phi)*sin(delta) + cos(phi)*cos(delta)*cos(omega)
    const cos_theta_z = (Math.sin(latRad) * Math.sin(decRad)) + (Math.cos(latRad) * Math.cos(decRad) * Math.cos(omRad));

    if (cos_theta_z <= 0) {
      amResEl.textContent = 'NIGHT (Sun Below Horizon)';
      znResEl.textContent = 'Solar Elevation < 0° (Sun set)';
      return;
    }

    const theta_z_rad = Math.acos(Math.min(1.0, cos_theta_z));
    const theta_z_deg = (theta_z_rad * 180.0) / Math.PI;
    const elevation_deg = 90.0 - theta_z_deg;

    // Kasten-Young 1989 empirical air mass formula for curved atmosphere:
    // AM = 1 / [ cos(theta_z) + 0.50572 * (96.07995 - theta_z)^(-1.6364) ]
    const term = Math.pow(96.07995 - theta_z_deg, -1.6364);
    const AM = 1.0 / (cos_theta_z + (0.50572 * term));

    amResEl.textContent = 'AM = ' + AM.toFixed(2) + ' (' + (Math.abs(AM - 1.5) < 0.1 ? 'Standard Test STC AM1.5' : 'Air Mass') + ')';
    znResEl.textContent = 'Zenith θ_z = ' + theta_z_deg.toFixed(1) + '° | Elevation α = ' + elevation_deg.toFixed(1) + '° above horizon (Hour: ' + (omDeg/15).toFixed(1) + 'h from noon)';
  }

  [latEl, decEl, omEl].forEach(el => el.addEventListener('input', update));
  update();
})();