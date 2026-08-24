(() => {
  'use strict';
  const lat1El = document.getElementById('rl-lat1'), lon1El = document.getElementById('rl-lon1');
  const lat2El = document.getElementById('rl-lat2'), lon2El = document.getElementById('rl-lon2');
  const hdgResEl = document.getElementById('rl-res-hdg'), dstResEl = document.getElementById('rl-res-dist');

  const R_Earth_km = 6371.0;
  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dPhi = phi2 - phi1;
    let dLam = toRad(lon2 - lon1);

    // Projected latitude change on Mercator chart: dPsi = ln( tan(pi/4 + phi2/2) / tan(pi/4 + phi1/2) )
    const dPsi = Math.log(Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2));

    // Wrap delta longitude between -pi and +pi
    if (Math.abs(dLam) > Math.PI) {
      dLam = dLam > 0 ? -(2 * Math.PI - dLam) : (2 * Math.PI + dLam);
    }

    // Bearing theta = atan2(dLam, dPsi)
    const bearingRad = Math.atan2(dLam, dPsi);
    let bearingDeg = (bearingRad * 180) / Math.PI;
    bearingDeg = (bearingDeg + 360) % 360;

    // Distance q = dPhi / dPsi (or cos(phi1) if dPsi -> 0 along parallel)
    const q = Math.abs(dPsi) > 1e-10 ? dPhi / dPsi : Math.cos(phi1);
    const distKm = Math.sqrt(dPhi * dPhi + q * q * dLam * dLam) * R_Earth_km;
    const distNm = distKm * 0.539957;

    hdgResEl.textContent = bearingDeg.toFixed(1) + '° True Heading';
    dstResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distNm).toLocaleString() + ' NM Sailing Distance)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();