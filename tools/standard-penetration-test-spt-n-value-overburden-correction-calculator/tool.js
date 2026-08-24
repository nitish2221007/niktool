(() => {
  'use strict';
  const nEl = document.getElementById('sp-n'), emEl = document.getElementById('sp-em'), svEl = document.getElementById('sp-sv');
  const n60ResEl = document.getElementById('sp-res-n60'), dnResEl = document.getElementById('sp-res-dens');

  function update() {
    const N_field = parseFloat(nEl.value), E_m = parseFloat(emEl.value), sigma_v = parseFloat(svEl.value);
    if (isNaN(N_field) || isNaN(E_m) || isNaN(sigma_v) || N_field <= 0 || E_m <= 0 || sigma_v <= 0) return;

    // Standard N60 energy correction: N60 = N_field * (E_m / 60)
    const N60 = N_field * (E_m / 60.0);

    // Liao & Whitman overburden correction: C_N = sqrt( 100 / sigma_v ) <= 1.7
    const C_N = Math.min(1.70, Math.sqrt(100.0 / sigma_v));

    // (N1)60 = C_N * N60
    const N1_60 = C_N * N60;

    // Peck-Hanson-Thornburn estimated friction angle: phi = 27.1 + 0.3 * (N1)60 - 0.00054 * (N1)60^2
    const phi_est = 27.1 + (0.30 * N1_60) - (0.00054 * Math.pow(N1_60, 2));

    let density = '';
    if (N1_60 < 4) density = 'VERY LOOSE (N < 4)';
    else if (N1_60 <= 10) density = 'LOOSE SAND (4 - 10)';
    else if (N1_60 <= 30) density = 'MEDIUM DENSE SAND (10 - 30: Good foundation support)';
    else if (N1_60 <= 50) density = 'DENSE SAND (30 - 50)';
    else density = 'VERY DENSE (> 50)';

    n60ResEl.textContent = 'N₆₀ = ' + N60.toFixed(1) + ' | (N₁)₆₀ = ' + N1_60.toFixed(1);
    dnResEl.textContent = density + ' (Est φ' ≈ ' + phi_est.toFixed(1) + '° | Overburden C_N = ' + C_N.toFixed(2) + ' @ ' + sigma_v + ' kPa)';
  }

  [nEl, emEl, svEl].forEach(el => el.addEventListener('input', update));
  update();
})();