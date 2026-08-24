(() => {
  'use strict';
  const zEl = document.getElementById('cz-z');
  const scResEl = document.getElementById('cz-res-scale'), cmResEl = document.getElementById('cz-res-cmb');

  const T_CMB_today = 2.7255; // K

  function update() {
    const z = parseFloat(zEl.value);
    if (isNaN(z) || z < 0) return;

    // Scale factor: a = 1 / (1 + z)
    const a = 1.0 / (1.0 + z);
    const stretch = 1.0 + z;

    // CMB temperature at redshift z: T(z) = T0 * (1 + z)  [K]
    const T_z = T_CMB_today * (1.0 + z);

    // Lyman-alpha (121.6 nm) and H-alpha (656.3 nm) shifted:
    const halpha_obs_nm = 656.3 * (1.0 + z);

    let era = '';
    if (z > 1000) era = 'RECOMBINATION EPOCH (z ~ 1100: Universe becomes transparent, CMB released)';
    else if (z > 6) era = 'REIONIZATION ERA (First stars and primeval galaxies formed)';
    else if (z > 1) era = 'COSMIC NOON (Peak star formation rate in the universe)';
    else era = 'MODERN COSMIC ERA (Dark energy accelerated expansion dominant)';

    scResEl.textContent = 'Scale Factor a(t) = ' + a.toFixed(3) + ' (Universe was 1/' + (1/a).toFixed(1) + ' its current size)';
    cmResEl.textContent = 'CMB Temp T(z) = ' + T_z.toFixed(2) + ' K | Stretch = ' + stretch.toFixed(2) + '× (H-α shifted to ' + Math.round(halpha_obs_nm) + ' nm | ' + era.split(' (')[0] + ')';
  }

  zEl.addEventListener('input', update);
  update();
})();