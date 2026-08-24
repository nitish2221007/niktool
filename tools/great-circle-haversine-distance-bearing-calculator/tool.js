(() => {
  'use strict';
  const lat1El = document.getElementById('hav-lat1'), lon1El = document.getElementById('hav-lon1');
  const lat2El = document.getElementById('hav-lat2'), lon2El = document.getElementById('hav-lon2');
  const dResEl = document.getElementById('hav-res-dist'), bResEl = document.getElementById('hav-res-brg');

  const R_earth = 6371.0; // Mean Earth radius in km

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLam = ((lon2 - lon1) * Math.PI) / 180;

    // Haversine formula:
    // a = sin^2(dPhi/2) + cos(phi1)*cos(phi2)*sin^2(dLam/2)
    // c = 2 * atan2( sqrt(a), sqrt(1-a) )
    const a = Math.pow(Math.sin(deltaPhi / 2), 2) + (Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLam / 2), 2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distKm = R_earth * c;
    const distNm = distKm * 0.539957;
    const distMiles = distKm * 0.621371;

    // Initial bearing theta = atan2( sin(dLam)*cos(phi2), cos(phi1)*sin(phi2) - sin(phi1)*cos(phi2)*cos(dLam) )
    const y = Math.sin(deltaLam) * Math.cos(phi2);
    const x = (Math.cos(phi1) * Math.sin(phi2)) - (Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLam));
    let brgDeg = (Math.atan2(y, x) * 180) / Math.PI;
    brgDeg = (brgDeg + 360) % 360; // normalize to 0-360°

    dResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distNm).toLocaleString() + ' NM / ' + Math.round(distMiles).toLocaleString() + ' Miles)';
    bResEl.textContent = 'Initial Heading: ' + brgDeg.toFixed(1) + '° True Azimuth (Great Circle Arc)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();