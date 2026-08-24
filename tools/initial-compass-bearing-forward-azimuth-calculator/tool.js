(() => {
  'use strict';
  const lat1El = document.getElementById('brg-lat1'), lon1El = document.getElementById('brg-lon1');
  const lat2El = document.getElementById('brg-lat2'), lon2El = document.getElementById('brg-lon2');
  const dResEl = document.getElementById('brg-res-deg'), qResEl = document.getElementById('brg-res-quad');

  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dLam = toRad(lon2 - lon1);

    // y = sin(dLam) * cos(phi2)
    // x = cos(phi1) * sin(phi2) - sin(phi1) * cos(phi2) * cos(dLam)
    const y = Math.sin(dLam) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLam);

    let bearingRad = Math.atan2(y, x);
    let bearingDeg = (bearingRad * 180) / Math.PI;
    bearingDeg = (bearingDeg + 360) % 360;

    const compassPoints = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const ptIdx = Math.round(bearingDeg / 22.5) % 16;
    const ptName = compassPoints[ptIdx];

    dResEl.textContent = bearingDeg.toFixed(1) + '° (' + ptName + ')';
    qResEl.textContent = (bearingDeg > 180 ? 'N ' + (360 - bearingDeg).toFixed(1) + '° W' : 'N ' + bearingDeg.toFixed(1) + '° E');
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();