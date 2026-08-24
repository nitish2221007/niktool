(() => {
  'use strict';
  const hEl = document.getElementById('nc-h'), aEl = document.getElementById('nc-area');
  const tsEl = document.getElementById('nc-ts'), tiEl = document.getElementById('nc-tinf');
  const qResEl = document.getElementById('nc-res-q'), rResEl = document.getElementById('nc-res-rth');

  function update() {
    const h = parseFloat(hEl.value), A = parseFloat(aEl.value), Ts = parseFloat(tsEl.value), Tinf = parseFloat(tiEl.value);
    if (isNaN(h) || isNaN(A) || isNaN(Ts) || isNaN(Tinf) || h <= 0 || A <= 0 || Ts <= Tinf) return;

    // q = h * A * (Ts - Tinf) (Watts)
    const qWatts = h * A * (Ts - Tinf);
    // R_conv = 1 / (h * A)
    const rConv = 1 / (h * A);

    qResEl.textContent = qWatts >= 1000 ? (qWatts / 1000).toFixed(2) + ' kW' : qWatts.toFixed(2) + ' Watts';
    rResEl.textContent = rConv.toFixed(3) + ' °C / W';
  }

  [hEl, aEl, tsEl, tiEl].forEach(el => el.addEventListener('input', update));
  update();
})();