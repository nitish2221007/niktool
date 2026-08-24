(() => {
  'use strict';
  const cEl = document.getElementById('slp-c'), phiEl = document.getElementById('slp-phi');
  const hEl = document.getElementById('slp-h'), bEl = document.getElementById('slp-beta'), ruEl = document.getElementById('slp-ru');
  const fsResEl = document.getElementById('slp-res-fs'), stResEl = document.getElementById('slp-res-stat');

  const gamma_soil = 19.0; // kN / m^3

  function update() {
    const c = parseFloat(cEl.value), phiDeg = parseFloat(phiEl.value);
    const H = parseFloat(hEl.value), betaDeg = parseFloat(bEl.value), ru = parseFloat(ruEl.value);

    if (isNaN(c) || isNaN(phiDeg) || isNaN(H) || isNaN(betaDeg) || isNaN(ru) || H <= 0 || betaDeg <= 0 || betaDeg >= 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const betaRad = (betaDeg * Math.PI) / 180;

    // Dimensionless stability number Taylor/Bishop correlation:
    // N_s = c / (gamma * H)
    const N_s = c / (gamma_soil * H);

    // Friction term component:
    const tanPhi = Math.tan(phiRad);
    const tanBeta = Math.tan(betaRad);

    // Bishop circular slip approximation:
    // FS approx = ( (c / (gamma * H * sin(beta)*cos(beta))) + (tan(phi)/tan(beta)) * (1 - ru / cos^2(beta)) )
    const termCohesion = c / (gamma_soil * H * Math.sin(betaRad) * Math.cos(betaRad));
    const termFriction = (tanPhi / tanBeta) * (1.0 - (ru / Math.pow(Math.cos(betaRad), 2)));
    const FS = termCohesion + Math.max(0, termFriction);

    let status = '';
    let color = '#22543d';

    if (FS >= 1.50) {
      status = 'STABLE (FS = ' + FS.toFixed(2) + ' ≥ 1.50: Meets highway embankment & civil engineering safety standard)';
      color = '#22543d';
    } else if (FS >= 1.00) {
      status = 'MARGINALLY STABLE (1.00 ≤ FS < 1.50: Risk of creep or rain-induced landslide triggering)';
      color = '#d97706';
    } else {
      status = 'UNSTABLE / ACTIVE FAILURE (FS < 1.00: Slope undergoes catastrophic rotational shear collapse!)';
      color = '#c53030';
    }

    fsResEl.textContent = 'FS = ' + FS.toFixed(2);
    fsResEl.style.color = color;
    stResEl.textContent = status + ' | Cohesion Contribution: +' + termCohesion.toFixed(2) + ', Friction: +' + termFriction.toFixed(2);
  }

  [cEl, phiEl, hEl, bEl, ruEl].forEach(el => el.addEventListener('input', update));
  update();
})();