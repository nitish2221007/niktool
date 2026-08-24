(() => {
  'use strict';
  const kEl = document.getElementById('fc-k'), aEl = document.getElementById('fc-area');
  const dtEl = document.getElementById('fc-dt'), lEl = document.getElementById('fc-l');
  const qResEl = document.getElementById('fc-res-q'), fResEl = document.getElementById('fc-res-flux'), rResEl = document.getElementById('fc-res-rth');

  function update() {
    const k = parseFloat(kEl.value), A = parseFloat(aEl.value), dt = parseFloat(dtEl.value), lMm = parseFloat(lEl.value);
    if (isNaN(k) || isNaN(A) || isNaN(dt) || isNaN(lMm) || k <= 0 || A <= 0 || dt <= 0 || lMm <= 0) return;

    const lM = lMm * 1e-3;

    // q = (k * A * dt) / L (Watts)
    const qWatts = (k * A * dt) / lM;
    const qKw = qWatts / 1000;
    // Heat flux q" = q / A (W / m^2)
    const flux = qWatts / A;
    const fluxMw = flux / 1e6;
    // R_th = L / (k * A) (K / W)
    const rTh = lM / (k * A);

    qResEl.textContent = qKw >= 1.0 ? qKw.toFixed(2) + ' kW (' + Math.round(qWatts).toLocaleString() + ' W)' : qWatts.toFixed(1) + ' Watts';
    fResEl.textContent = fluxMw >= 1.0 ? fluxMw.toFixed(2) + ' MW / m²' : (flux / 1000).toFixed(1) + ' kW / m²';
    rResEl.textContent = rTh.toExponential(3) + ' K / W';
  }

  [kEl, aEl, dtEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();