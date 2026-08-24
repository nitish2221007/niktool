(() => {
  'use strict';
  const bEl = document.getElementById('daf-beta'), zEl = document.getElementById('daf-zeta');
  const dResEl = document.getElementById('daf-res-val'), dcResEl = document.getElementById('daf-res-desc');

  function update() {
    const beta = parseFloat(bEl.value), zetaPct = parseFloat(zEl.value);
    if (isNaN(beta) || isNaN(zetaPct) || beta < 0 || zetaPct <= 0) return;

    const zeta = zetaPct / 100;

    // DAF = 1 / sqrt( (1 - beta^2)^2 + (2 * zeta * beta)^2 )
    const term1 = Math.pow(1 - Math.pow(beta, 2), 2);
    const term2 = Math.pow(2 * zeta * beta, 2);
    const DAF = 1.0 / Math.sqrt(term1 + term2);

    // Phase angle phi = atan2( 2*zeta*beta, 1 - beta^2 )
    const phiRad = Math.atan2(2 * zeta * beta, 1 - Math.pow(beta, 2));
    const phiDeg = (phiRad * 180) / Math.PI;

    let regime = '';
    let color = '#22543d';

    if (Math.abs(beta - 1.0) < 0.05) {
      regime = 'PEAK HARMONIC RESONANCE (β ≈ 1.0): Dynamic Displacement = ' + DAF.toFixed(1) + '× Static (Phase Lag: ' + phiDeg.toFixed(1) + '°)';
      color = '#c53030';
    } else if (beta < 0.8) {
      regime = 'QUASI-STATIC REGIME (β < 0.8): Response in phase with excitation force (Phase: ' + phiDeg.toFixed(1) + '°)';
      color = '#22543d';
    } else if (beta > 1.25) {
      regime = 'ISOLATION REGIME (β > √2 = 1.414): Dynamic forces attenuated below static load (DAF < 1.0)';
      color = '#2563eb';
    } else {
      regime = 'NEAR RESONANCE TRANSITION REGIME';
      color = '#d97706';
    }

    dResEl.textContent = 'DAF = ' + DAF.toFixed(2) + '× Dynamic Multiplier';
    dcResEl.textContent = regime;
    dcResEl.style.color = color;
  }

  bEl.addEventListener('input', update);
  zEl.addEventListener('input', update);
  update();
})();