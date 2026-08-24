(() => {
  'use strict';
  const m1El = document.getElementById('shk-m1'), gamEl = document.getElementById('shk-gam');
  const m2ResEl = document.getElementById('shk-res-m2'), ratResEl = document.getElementById('shk-res-ratios');

  function update() {
    const M1 = parseFloat(m1El.value), gamma = parseFloat(gamEl.value);
    if (isNaN(M1) || isNaN(gamma) || M1 < 1.0 || gamma <= 1.0) return;

    const M1_sq = Math.pow(M1, 2);

    // Downstream Mach M2: M2^2 = ( (gamma - 1)*M1^2 + 2 ) / ( 2*gamma*M1^2 - (gamma - 1) )
    const M2_sq = ((gamma - 1) * M1_sq + 2) / ((2 * gamma * M1_sq) - (gamma - 1));
    const M2 = Math.sqrt(Math.max(0, M2_sq));

    // Pressure ratio P2 / P1 = 1 + (2*gamma / (gamma + 1)) * (M1^2 - 1)
    const pRatio = 1.0 + (((2 * gamma) / (gamma + 1)) * (M1_sq - 1.0));

    // Density ratio rho2 / rho1 = ( (gamma + 1)*M1^2 ) / ( (gamma - 1)*M1^2 + 2 )
    const rhoRatio = ((gamma + 1) * M1_sq) / (((gamma - 1) * M1_sq) + 2);

    // Temperature ratio T2 / T1 = (P2/P1) / (rho2/rho1)
    const tRatio = pRatio / rhoRatio;

    // Stagnation pressure total recovery P02 / P01
    const p0Ratio = Math.pow(rhoRatio, gamma / (gamma - 1)) * Math.pow(1 / pRatio, 1 / (gamma - 1));

    m2ResEl.textContent = 'M₂ = ' + M2.toFixed(3) + ' Subsonic Exit';
    ratResEl.textContent = 'P₂/P₁ = ' + pRatio.toFixed(3) + '× | T₂/T₁ = ' + tRatio.toFixed(3) + '× | ρ₂/ρ₁ = ' + rhoRatio.toFixed(3) + '× (Total Pressure Recovery: ' + (p0Ratio * 100).toFixed(1) + '%)';
  }

  m1El.addEventListener('input', update);
  gamEl.addEventListener('input', update);
  update();
})();