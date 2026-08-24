(() => {
  'use strict';
  const m1El = document.getElementById('obs-m1'), thEl = document.getElementById('obs-th');
  const bResEl = document.getElementById('obs-res-beta'), m2ResEl = document.getElementById('obs-res-m2');

  const gamma = 1.40;

  function update() {
    const M1 = parseFloat(m1El.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(M1) || isNaN(thetaDeg) || M1 <= 1.0 || thetaDeg <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180;
    const muMachAngle = Math.asin(1 / M1);

    let betaRad = 0;
    let found = false;

    for (let b = muMachAngle + 0.001; b < Math.PI / 2; b += 0.0005) {
      const num = 2 * (1 / Math.tan(b)) * (Math.pow(M1, 2) * Math.pow(Math.sin(b), 2) - 1);
      const den = (Math.pow(M1, 2) * (gamma + Math.cos(2 * b))) + 2;
      const tanThetaCalc = num / den;

      if (tanThetaCalc >= Math.tan(thetaRad)) {
        betaRad = b;
        found = true;
        break;
      }
    }

    if (!found) {
      bResEl.textContent = 'Detached Bow Shock Wave';
      m2ResEl.textContent = 'Wedge angle θ exceeds maximum attachment angle θ_max for Mach ' + M1.toFixed(2);
      return;
    }

    const betaDeg = (betaRad * 180) / Math.PI;
    const Mn1 = M1 * Math.sin(betaRad);
    const p2_p1 = 1 + (((2 * gamma) / (gamma + 1)) * (Math.pow(Mn1, 2) - 1));

    const Mn2_sq = (Math.pow(Mn1, 2) + (2 / (gamma - 1))) / (((2 * gamma / (gamma - 1)) * Math.pow(Mn1, 2)) - 1);
    const Mn2 = Math.sqrt(Math.max(0.01, Mn2_sq));
    const M2 = Mn2 / Math.sin(betaRad - thetaRad);

    bResEl.textContent = 'β = ' + betaDeg.toFixed(1) + '° (Weak Attached Shock)';
    m2ResEl.textContent = 'M₂ = ' + M2.toFixed(2) + ' (' + (M2 >= 1 ? 'Supersonic' : 'Subsonic') + ') | Pressure Jump p₂/p₁ = ' + p2_p1.toFixed(2) + '×';
  }

  m1El.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();