(() => {
  'use strict';
  const aEl = document.getElementById('gl-alt'), ldEl = document.getElementById('gl-ld');
  const rResEl = document.getElementById('gl-res-range'), mResEl = document.getElementById('gl-res-metric');

  function update() {
    const altFt = parseFloat(aEl.value), LD = parseFloat(ldEl.value);
    if (isNaN(altFt) || isNaN(LD) || altFt <= 0 || LD <= 0) return;

    const distFt = altFt * LD;
    const distNm = distFt / 6076.12;
    const distStatuteMiles = distFt / 5280;
    const distKm = (distFt * 0.3048) / 1000;
    const slopeDeg = (Math.atan(1 / LD) * 180) / Math.PI;

    rResEl.textContent = distNm.toFixed(1) + ' Nautical Miles (Glide Range)';
    mResEl.textContent = distKm.toFixed(1) + ' km (' + distStatuteMiles.toFixed(1) + ' Statute Miles) | Glide Angle: ' + slopeDeg.toFixed(2) + '° (L/D ' + LD.toFixed(1) + ':1)';
  }

  aEl.addEventListener('input', update);
  ldEl.addEventListener('input', update);
  update();
})();