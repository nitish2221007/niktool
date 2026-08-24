(() => {
  'use strict';
  const dpEl = document.getElementById('poi-dp'), rEl = document.getElementById('poi-radius');
  const lEl = document.getElementById('poi-length'), vEl = document.getElementById('poi-visc');
  const qEl = document.getElementById('poi-flow-res-q'), lpsEl = document.getElementById('poi-flow-res-lps');

  function update() {
    const dpKpa = parseFloat(dpEl.value), rMm = parseFloat(rEl.value);
    const lM = parseFloat(lEl.value), etaMpa = parseFloat(vEl.value);

    if (isNaN(dpKpa) || isNaN(rMm) || isNaN(lM) || isNaN(etaMpa) || dpKpa <= 0 || rMm <= 0 || lM <= 0 || etaMpa <= 0) return;

    const dpPa = dpKpa * 1000;
    const rM = rMm / 1000;
    const etaPaS = etaMpa * 1e-3;

    // Q = (pi * dp * r^4) / (8 * eta * L)  [m^3 / s]
    const qM3s = (Math.PI * dpPa * Math.pow(rM, 4)) / (8 * etaPaS * lM);
    const qLps = qM3s * 1000;
    const qLpm = qLps * 60;

    qEl.textContent = qLpm >= 1000 ? (qLpm / 1000).toFixed(2) + ' m³/min' : qLpm.toFixed(2) + ' L/min';
    lpsEl.textContent = qLps.toFixed(2) + ' L/s';
  }

  [dpEl, rEl, lEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();