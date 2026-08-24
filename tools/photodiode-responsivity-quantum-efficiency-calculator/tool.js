(() => {
  'use strict';
  const lEl = document.getElementById('pd-lam'), qEl = document.getElementById('pd-qe');
  const rResEl = document.getElementById('pd-res-resp'), cResEl = document.getElementById('pd-res-curr');

  function update() {
    const lamNm = parseFloat(lEl.value), qePct = parseFloat(qEl.value);
    if (isNaN(lamNm) || isNaN(qePct) || lamNm <= 0 || qePct <= 0) return;

    const eta = qePct / 100;
    // Responsivity R = (eta * q * lambda) / (h * c) = (eta * lambda_nm) / 1239.841984  [A / W]
    const R = (eta * lamNm) / 1239.841984;
    const microAmpsPerMilliwatt = R * 1000;

    rResEl.textContent = R.toFixed(3) + ' A / W (Responsivity)';
    cResEl.textContent = microAmpsPerMilliwatt.toFixed(1) + ' μA per 1 mW Light (Photon Energy ' + (1239.84 / lamNm).toFixed(2) + ' eV)';
  }

  lEl.addEventListener('input', update);
  qEl.addEventListener('input', update);
  update();
})();