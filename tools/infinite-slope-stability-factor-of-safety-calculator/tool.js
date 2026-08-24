(() => {
  'use strict';
  const btEl = document.getElementById('is-beta'), hEl = document.getElementById('is-h');
  const cEl = document.getElementById('is-c'), phiEl = document.getElementById('is-phi'), hwEl = document.getElementById('is-hw');
  const fsResEl = document.getElementById('is-res-fs'), bkResEl = document.getElementById('is-res-break');

  const gamma = 19.0; // kN / m^3
  const gamma_w = 9.81; // kN / m^3

  function update() {
    const beta_deg = parseFloat(btEl.value), H = parseFloat(hEl.value);
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value), hw_ratio = parseFloat(hwEl.value);

    if (isNaN(beta_deg) || isNaN(H) || isNaN(c) || isNaN(phi_deg) || isNaN(hw_ratio) || beta_deg <= 0 || beta_deg >= 90 || H <= 0 || c < 0 || phi_deg < 0 || hw_ratio < 0 || hw_ratio > 1) return;

    const beta = (beta_deg * Math.PI) / 180.0;
    const phi = (phi_deg * Math.PI) / 180.0;

    // Driving shear stress: tau_d = gamma * H * sin(beta) * cos(beta)
    const tau_driving = gamma * H * Math.sin(beta) * Math.cos(beta);

    // Cohesion component: c / tau_d
    const FS_c = c / tau_driving;

    // Frictional component: ( tan(phi) / tan(beta) ) * ( 1 - (gamma_w / gamma) * hw_ratio )
    const FS_phi = (Math.tan(phi) / Math.tan(beta)) * (1.0 - ((gamma_w / gamma) * hw_ratio));

    const FS = FS_c + FS_phi;

    // Full saturation FS (hw_ratio = 1):
    const FS_sat = FS_c + (Math.tan(phi) / Math.tan(beta)) * (1.0 - (gamma_w / gamma));

    let status = '', color = '#22543d';
    if (FS >= 1.5) { status = 'STABLE (FS ≥ 1.5: Adequate safety margin)'; color = '#22543d'; }
    else if (FS >= 1.0) { status = 'MARGINALLY STABLE (1.0 ≤ FS < 1.5: Landslide risk if saturated)'; color = '#ea580c'; }
    else { status = 'ACTIVE LANDSLIDE SLOPE FAILURE (FS < 1.0)'; color = '#c53030'; }

    fsResEl.textContent = 'Factor of Safety FS = ' + FS.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    fsResEl.style.color = color;
    bkResEl.textContent = 'Cohesion = +' + FS_c.toFixed(2) + ' | Friction = +' + FS_phi.toFixed(2) + ' (If fully saturated h_w=H: FS drops to ' + FS_sat.toFixed(2) + ')';
  }

  [btEl, hEl, cEl, phiEl, hwEl].forEach(el => el.addEventListener('input', update));
  update();
})();