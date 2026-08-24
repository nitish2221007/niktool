(() => {
  'use strict';
  const grEl = document.getElementById('dg-grooves'), lamEl = document.getElementById('dg-lambda'), mEl = document.getElementById('dg-order');
  const thResEl = document.getElementById('dg-res-theta'), dResEl = document.getElementById('dg-res-d'), maxMResEl = document.getElementById('dg-res-max-m');

  function update() {
    const linesPerMm = parseFloat(grEl.value), lamNm = parseFloat(lamEl.value), m = parseInt(mEl.value, 10);
    if (isNaN(linesPerMm) || isNaN(lamNm) || linesPerMm <= 0 || lamNm <= 0 || m < 1) return;

    // Slit spacing d in meters = (1e-3 m) / linesPerMm
    const dM = 1e-3 / linesPerMm;
    const dUm = dM * 1e6;
    const lamM = lamNm * 1e-9;

    // Maximum possible order m_max = floor(d / lambda)
    const maxM = Math.floor(dM / lamM);
    maxMResEl.textContent = 'm_max = ' + maxM;

    // d * sin(theta) = m * lambda => sin(theta) = (m * lambda) / d
    const sinTheta = (m * lamM) / dM;
    if (sinTheta > 1.0) {
      thResEl.textContent = 'Order m=' + m + ' Exceeds 90° (Not Visible)';
      thResEl.style.color = '#c53030';
    } else {
      const rad = Math.asin(sinTheta);
      const deg = (rad * 180) / Math.PI;
      thResEl.textContent = deg.toFixed(2) + '°';
      thResEl.style.color = '#22543d';
    }

    dResEl.textContent = 'd = ' + dUm.toFixed(3) + ' μm (' + Math.round(linesPerMm).toLocaleString() + ' lines/mm)';
  }

  [grEl, lamEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();