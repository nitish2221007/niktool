(() => {
  'use strict';
  const latEl = document.getElementById('tilt-lat');
  const yrResEl = document.getElementById('tilt-res-year'), winResEl = document.getElementById('tilt-res-winter'), sumResEl = document.getElementById('tilt-res-summer');

  function update() {
    const lat = parseFloat(latEl.value);
    if (isNaN(lat) || lat < 0 || lat > 65) return;

    // Standard year-round fixed optimal tilt rule: Latitude * 0.9 + 2.9 (or Lat * 0.9)
    const fixedTilt = Math.max(10, lat * 0.9);
    const winterTilt = Math.min(65, lat + 15);
    const summerTilt = Math.max(10, lat - 15);

    yrResEl.textContent = fixedTilt.toFixed(1) + '° Fixed Tilt';
    winResEl.textContent = winterTilt.toFixed(1) + '° Winter Tilt';
    sumResEl.textContent = summerTilt.toFixed(1) + '° Summer Tilt';
  }

  latEl.addEventListener('input', update);
  update();
})();