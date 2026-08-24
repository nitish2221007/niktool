(() => {
  'use strict';
  const qEl = document.getElementById('cj-q'), rhoEl = document.getElementById('cj-rho'), gamEl = document.getElementById('cj-gamma');
  const dcjResEl = document.getElementById('cj-res-dcj'), pcjResEl = document.getElementById('cj-res-pcj');

  function update() {
    const qMkJ = parseFloat(qEl.value), rho0 = parseFloat(rhoEl.value), gamma = parseFloat(gamEl.value);
    if (isNaN(qMkJ) || isNaN(rho0) || isNaN(gamma) || qMkJ <= 0 || rho0 <= 0 || gamma <= 1.0) return;

    // Convert MJ/kg to J/kg: q * 1e6
    const q_j_kg = qMkJ * 1e6;

    // Chapman-Jouguet detonation velocity: D_CJ = sqrt( 2 * (gamma^2 - 1) * q )  [m / s]
    const D_CJ = Math.sqrt(2.0 * (Math.pow(gamma, 2) - 1.0) * q_j_kg);

    // Peak CJ detonation pressure: P_CJ = ( rho0 * D_CJ^2 ) / ( gamma + 1 )  [Pascals -> GPa]
    const P_CJ_pa = (rho0 * Math.pow(D_CJ, 2)) / (gamma + 1.0);
    const P_CJ_gpa = P_CJ_pa / 1e9;
    const P_CJ_bar = P_CJ_pa / 1e5;

    // Detonation Mach number in ambient air (c=343 m/s)
    const mach = D_CJ / 343.0;

    dcjResEl.textContent = 'D_CJ = ' + Math.round(D_CJ).toLocaleString() + ' m / s (Mach ' + mach.toFixed(1) + ' Supersonic Wave)';
    pcjResEl.textContent = 'P_CJ = ' + P_CJ_gpa.toFixed(2) + ' GPa (' + Math.round(P_CJ_bar).toLocaleString() + ' bar Shock Wave | ρ₀ = ' + rho0 + ' kg/m³)';
  }

  [qEl, rhoEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();