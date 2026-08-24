(() => {
  'use strict';
  const bEl = document.getElementById('tz-b'), dfEl = document.getElementById('tz-df'), phiEl = document.getElementById('tz-phi');
  const cEl = document.getElementById('tz-c'), gEl = document.getElementById('tz-gamma');
  const qallResEl = document.getElementById('tz-res-qall'), fctResEl = document.getElementById('tz-res-factors');

  function update() {
    const B = parseFloat(bEl.value), D_f = parseFloat(dfEl.value), phi_deg = parseFloat(phiEl.value);
    const c = parseFloat(cEl.value), gamma = parseFloat(gEl.value);

    if (isNaN(B) || isNaN(D_f) || isNaN(phi_deg) || isNaN(c) || isNaN(gamma) || B <= 0 || D_f < 0 || phi_deg < 0 || phi_deg >= 50 || c < 0 || gamma <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Surcharge at foundation base: q = gamma * D_f
    const q_surcharge = gamma * D_f;

    // Terzaghi Bearing Capacity Factors:
    // N_q = exp( (3*pi/2 - phi)*tan(phi) ) / ( 2 * cos^2(45 + phi/2) ) approx standard formula:
    const a_angle = (0.75 * Math.PI) - (phi_rad / 2.0);
    const N_q = (Math.exp(2.0 * ((0.75 * Math.PI) - (phi_rad / 2.0)) * Math.tan(phi_rad))) / (2.0 * Math.pow(Math.cos((Math.PI / 4.0) + (phi_rad / 2.0)), 2));
    const N_c = phi_deg > 0 ? (N_q - 1.0) / Math.tan(phi_rad) : 5.7;
    const K_pg = 1.0 + (phi_deg / 10.0); // empirical passive earth pressure coefficient
    const N_gamma = 0.5 * ( (K_pg / Math.pow(Math.cos(phi_rad), 2)) - 1.0 ) * Math.tan(phi_rad);

    // Terzaghi Strip Footing Ultimate Capacity:
    // q_ult = c * N_c + q_surcharge * N_q + 0.5 * gamma * B * N_gamma
    const q_ult = (c * N_c) + (q_surcharge * N_q) + (0.5 * gamma * B * Math.max(0.1, N_gamma));

    // Allowable bearing capacity with Safety Factor FS = 3.0:
    const FS = 3.0;
    const q_all = q_ult / FS;

    qallResEl.textContent = 'Allowable q_all = ' + q_all.toFixed(1) + ' kPa (FS = 3.0)';
    fctResEl.textContent = 'Ultimate q_ult = ' + q_ult.toFixed(1) + ' kPa | N_c = ' + N_c.toFixed(1) + ', N_q = ' + N_q.toFixed(1) + ', N_γ = ' + Math.max(0, N_gamma).toFixed(1) + ' (B = ' + B + 'm, D_f = ' + D_f + 'm)';
  }

  [bEl, dfEl, phiEl, cEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();