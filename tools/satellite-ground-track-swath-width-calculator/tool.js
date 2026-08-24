(() => {
  'use strict';
  const hEl = document.getElementById('swth-h'), fovEl = document.getElementById('swth-fov');
  const swResEl = document.getElementById('swth-res-sw'), spResEl = document.getElementById('swth-res-spd');

  const R_earth = 6371.0; // km
  const mu_earth = 398600.4418; // km^3 / s^2

  function update() {
    const hKm = parseFloat(hEl.value), fovDeg = parseFloat(fovEl.value);
    if (isNaN(hKm) || isNaN(fovDeg) || hKm <= 0 || fovDeg <= 0 || fovDeg >= 180) return;

    const fovRad = (fovDeg * Math.PI) / 180;
    const halfFov = fovRad / 2;

    // Sensor swath calculation accounting for spherical Earth curvature:
    // sin(gamma) = ( (R_E + h) / R_E ) * sin(halfFov)
    const sinGamma = ((R_earth + hKm) / R_earth) * Math.sin(halfFov);
    if (sinGamma > 1.0) {
      swResEl.textContent = 'FOV Exceeds Horizon Limit (Wide Angle)';
      return;
    }
    const gamma = Math.asin(sinGamma);
    // Earth central angle lambda = gamma - halfFov
    const lambda = gamma - halfFov;
    // Ground swath width = 2 * R_earth * lambda
    const swathKm = 2 * R_earth * lambda;

    // Orbital speed v_orb = sqrt( mu / (R_E + h) )  [km / s]
    const v_orb = Math.sqrt(mu_earth / (R_earth + hKm));
    // Ground track speed v_ground = v_orb * (R_E / (R_E + h))
    const v_ground = v_orb * (R_earth / (R_earth + hKm));
    const v_ground_kmh = v_ground * 3600;

    swResEl.textContent = swathKm.toFixed(1) + ' km Swath (' + (swathKm * 0.539957).toFixed(1) + ' NM Width)';
    spResEl.textContent = 'Ground Track Speed: ' + v_ground.toFixed(2) + ' km/s (' + Math.round(v_ground_kmh).toLocaleString() + ' km/h | Orbit Speed: ' + v_orb.toFixed(2) + ' km/s)';
  }

  hEl.addEventListener('input', update);
  fovEl.addEventListener('input', update);
  update();
})();