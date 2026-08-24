(() => {
  'use strict';
  const kEl = document.getElementById('dar-k'), aEl = document.getElementById('dar-area');
  const dhEl = document.getElementById('dar-dh'), lEl = document.getElementById('dar-l');
  const qResEl = document.getElementById('dar-res-q'), iResEl = document.getElementById('dar-res-i');

  function update() {
    const K = parseFloat(kEl.value), A = parseFloat(aEl.value), dh = parseFloat(dhEl.value), L = parseFloat(lEl.value);
    if (isNaN(K) || isNaN(A) || isNaN(dh) || isNaN(L) || K <= 0 || A <= 0 || dh <= 0 || L <= 0) return;

    // Hydraulic gradient i = dh / L
    const i = dh / L;
    // Q = K * A * i (m^3 / s)
    const qM3s = K * A * i;
    const qLps = qM3s * 1000;
    const qLph = qLps * 3600;

    qResEl.textContent = qLph >= 1000 ? (qLph / 1000).toFixed(2) + ' m³/hr' : qLph.toFixed(2) + ' L / hour (' + (qLps).toFixed(3) + ' L/s)';
    iResEl.textContent = 'i = ' + i.toFixed(4) + ' (' + (i * 100).toFixed(2) + '% Gradient)';
  }

  [kEl, aEl, dhEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();