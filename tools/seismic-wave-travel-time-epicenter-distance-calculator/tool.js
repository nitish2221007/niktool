(() => {
  'use strict';
  const dtEl = document.getElementById('eq-dt'), vpEl = document.getElementById('eq-vp'), vsEl = document.getElementById('eq-vs');
  const dResEl = document.getElementById('eq-res-dist'), tResEl = document.getElementById('eq-res-time');

  function update() {
    const dt = parseFloat(dtEl.value), vp = parseFloat(vpEl.value), vs = parseFloat(vsEl.value);
    if (isNaN(dt) || isNaN(vp) || isNaN(vs) || dt <= 0 || vp <= vs || vs <= 0) return;

    // d = dt / ( (1/vs) - (1/vp) ) = dt * (vp * vs) / (vp - vs)
    const distKm = dt * (vp * vs) / (vp - vs);
    const distMiles = distKm * 0.621371;

    const tP = distKm / vp;
    const tS = distKm / vs;

    dResEl.textContent = distKm.toFixed(1) + ' km (' + distMiles.toFixed(1) + ' Miles Epicenter Distance)';
    tResEl.textContent = 'P-Arrival: ' + tP.toFixed(1) + ' s | S-Arrival: ' + tS.toFixed(1) + ' s (Travel Time from Earthquake Focus)';
  }

  [dtEl, vpEl, vsEl].forEach(el => el.addEventListener('input', update));
  update();
})();