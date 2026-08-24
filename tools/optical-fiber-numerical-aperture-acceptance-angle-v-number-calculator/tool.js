(() => {
  'use strict';
  const ncEl = document.getElementById('of-ncore'), ncdEl = document.getElementById('of-nclad');
  const aEl = document.getElementById('of-a'), lmEl = document.getElementById('of-lambda');
  const naResEl = document.getElementById('of-res-na'), vnResEl = document.getElementById('of-res-vnum');

  function update() {
    const n_core = parseFloat(ncEl.value), n_clad = parseFloat(ncdEl.value);
    const a_um = parseFloat(aEl.value), lambda_nm = parseFloat(lmEl.value);

    if (isNaN(n_core) || isNaN(n_clad) || isNaN(a_um) || isNaN(lambda_nm) || n_core <= n_clad || n_clad <= 0 || a_um <= 0 || lambda_nm <= 0) return;

    // Numerical Aperture: NA = sqrt( n_core^2 - n_clad^2 )
    const NA = Math.sqrt(Math.pow(n_core, 2) - Math.pow(n_clad, 2));

    // Acceptance angle in air (n0 = 1): theta_acc = asin(NA)  [rad -> deg]
    const theta_acc_rad = Math.asin(Math.min(1.0, NA));
    const theta_acc_deg = (theta_acc_rad * 180.0) / Math.PI;

    // Normalized frequency V-number: V = ( 2 * pi * a / lambda ) * NA
    const a_nm = a_um * 1000.0;
    const V = (2.0 * Math.PI * a_nm / lambda_nm) * NA;

    // Approximate number of guided spatial modes: M approx V^2 / 2 for multi-mode
    const is_smf = V < 2.4048;
    const num_modes = is_smf ? 1 : Math.round(Math.pow(V, 2) / 2.0);

    let status = '', color = '#22543d';
    if (is_smf) {
      status = 'SINGLE-MODE FIBER (V = ' + V.toFixed(3) + ' < 2.405: Zero intermodal dispersion ✓)';
      color = '#22543d';
    } else {
      status = 'MULTI-MODE FIBER (V = ' + V.toFixed(2) + ' ≥ 2.405: Guided modes M ≈ ' + num_modes + ')';
      color = '#ea580c';
    }

    naResEl.textContent = 'Numerical Aperture NA = ' + NA.toFixed(4) + ' (Acceptance θ = ' + theta_acc_deg.toFixed(2) + '°)';
    vnResEl.textContent = 'V-Number = ' + V.toFixed(3) + ' (' + status + ')';
    vnResEl.style.color = color;
  }

  [ncEl, ncdEl, aEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();