(() => {
  'use strict';
  const lat1El = document.getElementById('hav-lat1'), lon1El = document.getElementById('hav-lon1');
  const lat2El = document.getElementById('hav-lat2'), lon2El = document.getElementById('hav-lon2');
  const kmResEl = document.getElementById('hav-res-km'), nmResEl = document.getElementById('hav-res-nm');

  const R_Earth_km = 6371.0;

  function toRad(deg) { return (deg * Math.PI) / 180; }

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = toRad(lat1), phi2 = toRad(lat2);
    const dPhi = toRad(lat2 - lat1);
    const dLam = toRad(lon2 - lon1);

    // a = sin^2(dPhi/2) + cos(phi1) * cos(phi2) * sin^2(dLam/2)
    const a = Math.pow(Math.sin(dPhi / 2), 2) + Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(dLam / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distKm = R_Earth_km * c;
    const distMiles = distKm * 0.621371;
    const distNm = distKm * 0.539957;

    kmResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distMiles).toLocaleString() + ' Miles)';
    nmResEl.textContent = Math.round(distNm).toLocaleString() + ' Nautical Miles (Flight Path)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();