(() => {
  'use strict';
  const hEl = document.getElementById('rnk-h'), gEl = document.getElementById('rnk-gamma'), pEl = document.getElementById('rnk-phi');
  const paResEl = document.getElementById('rnk-res-pa'), cfResEl = document.getElementById('rnk-res-coeffs');

  function update() {
    const H = parseFloat(hEl.value), gamma = parseFloat(gEl.value), phiDeg = parseFloat(pEl.value);
    if (isNaN(H) || isNaN(gamma) || isNaN(phiDeg) || H <= 0 || gamma <= 0 || phiDeg <= 0 || phiDeg >= 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;

    // Rankine active coefficient Ka = tan^2( 45° - phi/2 ) = (1 - sin(phi)) / (1 + sin(phi))
    const Ka = (1.0 - Math.sin(phiRad)) / (1.0 + Math.sin(phiRad));

    // Rankine passive coefficient Kp = tan^2( 45° + phi/2 ) = (1 + sin(phi)) / (1 - sin(phi)) = 1 / Ka
    const Kp = 1.0 / Ka;

    // At-rest coefficient K0 approx = 1 - sin(phi) (Jaky formula)
    const K0 = 1.0 - Math.sin(phiRad);

    // Total active thrust Pa = 0.5 * Ka * gamma * H^2  [kN / linear meter]
    const Pa = 0.5 * Ka * gamma * Math.pow(H, 2);

    // Overturning moment at base M_overturn = Pa * (H / 3)  [kN * m / m]
    const M_overturn = Pa * (H / 3.0);

    paResEl.textContent = 'P_a = ' + Pa.toFixed(1) + ' kN / m (Active Thrust @ H/3 = ' + (H/3).toFixed(2) + ' m)';
    cfResEl.textContent = 'K_a = ' + Ka.toFixed(3) + ' | K_0 = ' + K0.toFixed(3) + ' | K_p = ' + Kp.toFixed(3) + ' (Overturning Moment M_o = ' + M_overturn.toFixed(1) + ' kN·m/m)';
  }

  [hEl, gEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();