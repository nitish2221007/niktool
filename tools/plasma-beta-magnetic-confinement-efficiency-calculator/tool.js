(() => {
  'use strict';
  const nEl = document.getElementById('beta-n'), tEl = document.getElementById('beta-t'), bEl = document.getElementById('beta-b');
  const bResEl = document.getElementById('beta-res-val'), pResEl = document.getElementById('beta-res-press');

  const mu0 = 4.0 * Math.PI * 1e-7;
  const e_charge = 1.602176634e-19;

  function update() {
    const n_factor = parseFloat(nEl.value), T_kev = parseFloat(tEl.value), B = parseFloat(bEl.value);
    if (isNaN(n_factor) || isNaN(T_kev) || isNaN(B) || n_factor <= 0 || T_kev <= 0 || B <= 0) return;

    const n_m3 = n_factor * 1e20;
    // Total kinetic pressure (ions + electrons): p = 2 * n * k_B * T  [Pa]
    const p_plasma_pa = 2.0 * n_m3 * (T_kev * 1000.0 * e_charge);
    const p_plasma_kpa = p_plasma_pa / 1000.0;
    const p_plasma_bar = p_plasma_pa / 1e5;

    // Magnetic field pressure p_mag = B^2 / (2 * mu0)  [Pa]
    const p_mag_pa = Math.pow(B, 2) / (2.0 * mu0);
    const p_mag_mpa = p_mag_pa / 1e6;
    const p_mag_bar = p_mag_pa / 1e5;

    // Plasma beta: beta = p_plasma / p_mag
    const beta = p_plasma_pa / p_mag_pa;
    const beta_pct = beta * 100.0;

    let rating = '';
    let color = '#22543d';

    if (beta_pct <= 5.0) {
      rating = 'STANDARD TOKAMAK REGIME (β ≤ 5%: Below Troyon MHD ballooning instability limit)';
      color = '#22543d';
    } else if (beta_pct <= 20.0) {
      rating = 'SPHERICAL TOKAMAK REGIME (5% < β ≤ 20%: High beta efficiency, requires close conducting wall)';
      color = '#2563eb';
    } else {
      rating = 'HIGH-BETA FIELD-REVERSED CONFIGURATION (β > 20%: Self-confining compact toroid)';
      color = '#d97706';
    }

    bResEl.textContent = 'β = ' + beta_pct.toFixed(2) + '% Confinement Ratio';
    bResEl.style.color = color;
    pResEl.textContent = 'p_plasma = ' + p_plasma_kpa.toFixed(0) + ' kPa (' + p_plasma_bar.toFixed(1) + ' bar) vs p_mag = ' + p_mag_mpa.toFixed(2) + ' MPa (' + Math.round(p_mag_bar) + ' bar) | ' + rating;
  }

  [nEl, tEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();