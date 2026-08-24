(() => {
  'use strict';
  const latEl = document.getElementById('ecef-lat'), lonEl = document.getElementById('ecef-lon'), hEl = document.getElementById('ecef-h');
  const xyzResEl = document.getElementById('ecef-res-xyz'), nResEl = document.getElementById('ecef-res-n');

  // WGS84 Ellipsoid constants:
  const a = 6378137.0; // semi-major axis (meters)
  const f = 1 / 298.257223563; // flattening
  const e2 = (2 * f) - (Math.pow(f, 2)); // first eccentricity squared = 0.00669437999014

  function update() {
    const latDeg = parseFloat(latEl.value), lonDeg = parseFloat(lonEl.value), h = parseFloat(hEl.value);
    if (isNaN(latDeg) || isNaN(lonDeg) || isNaN(h) || Math.abs(latDeg) > 90) return;

    const phi = (latDeg * Math.PI) / 180;
    const lambda = (lonDeg * Math.PI) / 180;

    // Radius of curvature in the prime vertical: N(phi) = a / sqrt( 1 - e^2 * sin^2(phi) )
    const N = a / Math.sqrt(1 - (e2 * Math.pow(Math.sin(phi), 2)));

    // ECEF coordinates:
    // X = (N + h) * cos(phi) * cos(lambda)
    // Y = (N + h) * cos(phi) * sin(lambda)
    // Z = (N * (1 - e^2) + h) * sin(phi)
    const X = (N + h) * Math.cos(phi) * Math.cos(lambda);
    const Y = (N + h) * Math.cos(phi) * Math.sin(lambda);
    const Z = ((N * (1 - e2)) + h) * Math.sin(phi);

    xyzResEl.textContent = 'X: ' + Math.round(X).toLocaleString() + ' m | Y: ' + Math.round(Y).toLocaleString() + ' m | Z: ' + Math.round(Z).toLocaleString() + ' m';
    nResEl.textContent = 'Prime Vertical N(φ) = ' + Math.round(N).toLocaleString() + ' m (Geocentric Radius R = ' + Math.round(Math.sqrt(X*X + Y*Y + Z*Z)).toLocaleString() + ' m)';
  }

  [latEl, lonEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();