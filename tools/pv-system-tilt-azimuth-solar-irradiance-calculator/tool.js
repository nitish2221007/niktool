(() => {
  'use strict';
  const latEl = document.getElementById('pv-lat'), optEl = document.getElementById('pv-opt');
  const tlResEl = document.getElementById('pv-res-tilt'), azResEl = document.getElementById('pv-res-azim');

  function update() {
    const lat = parseFloat(latEl.value);
    const mode = optEl.value;

    if (isNaN(lat) || Math.abs(lat) > 90) return;

    const absLat = Math.abs(lat);
    let optTilt = absLat;

    if (mode === 'year') {
      if (absLat < 25) optTilt = absLat * 0.87;
      else optTilt = (absLat * 0.76) + 3.1;
    } else if (mode === 'winter') {
      optTilt = Math.min(90, absLat + 15);
    } else if (mode === 'summer') {
      optTilt = Math.max(0, absLat - 15);
    }

    const hemisphere = lat >= 0 ? 'Northern' : 'Southern';
    const trueDirection = lat >= 0 ? '180° True South' : '0° True North';

    tlResEl.textContent = optTilt.toFixed(1) + '° Fixed Tilt from Horizontal';
    azResEl.textContent = 'Azimuth: ' + trueDirection + ' (' + hemisphere + ' Hemisphere | Winter: ' + Math.min(90, absLat + 15).toFixed(1) + '°, Summer: ' + Math.max(0, absLat - 15).toFixed(1) + '°)';
  }

  latEl.addEventListener('input', update);
  optEl.addEventListener('change', update);
  update();
})();