(() => {
  'use strict';
  const dEl = document.getElementById('yds-d'), lamEl = document.getElementById('yds-lambda'), lEl = document.getElementById('yds-l');
  const dyResEl = document.getElementById('yds-res-dy'), thResEl = document.getElementById('yds-res-theta');

  function update() {
    const dMm = parseFloat(dEl.value), lamNm = parseFloat(lamEl.value), lM = parseFloat(lEl.value);
    if (isNaN(dMm) || isNaN(lamNm) || isNaN(lM) || dMm <= 0 || lamNm <= 0 || lM <= 0) return;

    const dM = dMm * 1e-3;
    const lamM = lamNm * 1e-9;

    // Fringe spacing Delta_y = (lambda * L) / d
    const dyM = (lamM * lM) / dM;
    const dyMm = dyM * 1000;

    // Angular spacing theta = lambda / d (radians)
    const thRad = lamM / dM;
    const thDeg = (thRad * 180) / Math.PI;

    dyResEl.textContent = dyMm.toFixed(2) + ' mm';
    thResEl.textContent = thDeg.toFixed(3) + '° (' + (thRad * 1000).toFixed(2) + ' mrad)';
  }

  [dEl, lamEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();