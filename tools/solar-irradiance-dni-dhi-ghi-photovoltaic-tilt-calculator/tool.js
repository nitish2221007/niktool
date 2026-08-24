(() => {
  'use strict';
  const dniEl = document.getElementById('sol-dni'), dhiEl = document.getElementById('sol-dhi'), zenEl = document.getElementById('sol-zen');
  const ghiResEl = document.getElementById('sol-res-ghi'), tltResEl = document.getElementById('sol-res-tilt');

  function update() {
    const DNI = parseFloat(dniEl.value), DHI = parseFloat(dhiEl.value), theta_z_deg = parseFloat(zenEl.value);
    if (isNaN(DNI) || isNaN(DHI) || isNaN(theta_z_deg) || DNI < 0 || DHI < 0 || theta_z_deg < 0 || theta_z_deg > 90) return;

    const theta_z_rad = (theta_z_deg * Math.PI) / 180.0;

    // GHI = DHI + DNI * cos(theta_z)
    const GHI = DHI + (DNI * Math.cos(theta_z_rad));
    const sunElevation = 90.0 - theta_z_deg;

    ghiResEl.textContent = 'GHI = ' + GHI.toFixed(1) + ' W / m²';
    tltResEl.textContent = 'Optimal Fixed Tilt ≈ ' + theta_z_deg.toFixed(0) + '° | Sun Elevation = ' + sunElevation.toFixed(1) + '° (Direct Beam: ' + (DNI * Math.cos(theta_z_rad)).toFixed(1) + ' W/m² + Diffuse: ' + DHI + ' W/m²)';
  }

  [dniEl, dhiEl, zenEl].forEach(el => el.addEventListener('input', update));
  update();
})();