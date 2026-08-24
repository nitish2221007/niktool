(() => {
  'use strict';
  const vEl = document.getElementById('re-v'), dEl = document.getElementById('re-d');
  const rhoEl = document.getElementById('re-rho'), muEl = document.getElementById('re-mu');
  const reResEl = document.getElementById('re-res-val'), fResEl = document.getElementById('re-res-f');

  function update() {
    const v = parseFloat(vEl.value), D_mm = parseFloat(dEl.value);
    const rho = parseFloat(rhoEl.value), mu_mPas = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(D_mm) || isNaN(rho) || isNaN(mu_mPas) || v <= 0 || D_mm <= 0 || rho <= 0 || mu_mPas <= 0) return;

    const D = D_mm / 1000.0;
    const mu = mu_mPas / 1000.0;

    // Reynolds number: Re = ( rho * v * D ) / mu
    const Re = (rho * v * D) / mu;

    let f = 0, regime = '';
    let color = '#22543d';

    if (Re < 2300) {
      // Laminar: f = 64 / Re
      f = 64.0 / Re;
      regime = 'LAMINAR FLOW (Re < 2,300: Smooth streamline viscous flow, f = 64/Re)';
      color = '#22543d';
    } else if (Re <= 4000) {
      // Transitional
      f = 0.035;
      regime = 'TRANSITIONAL REGIME (2,300 ≤ Re ≤ 4,000: Intermittent turbulent bursts)';
      color = '#d97706';
    } else {
      // Turbulent Swamee-Jain for smooth pipe (epsilon = 0.0015 mm commercial steel):
      const eps_over_D = 0.000045 / D; // 0.045 mm commercial steel roughness
      f = 0.25 / Math.pow(Math.log10((eps_over_D / 3.7) + (5.74 / Math.pow(Re, 0.9))), 2);
      regime = 'FULLY TURBULENT (Re > 4,000: Chaotic vortex mixing & high momentum transfer)';
      color = '#2563eb';
    }

    reResEl.textContent = 'Re = ' + Math.round(Re).toLocaleString() + ' (' + regime.split(' (')[0] + ')';
    reResEl.style.color = color;
    fResEl.textContent = 'Darcy Friction Factor f = ' + f.toFixed(4) + ' | ' + regime;
    fResEl.style.color = color;
  }

  [vEl, dEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();