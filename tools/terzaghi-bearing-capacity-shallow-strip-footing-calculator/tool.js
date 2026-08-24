(() => {
  'use strict';
  const bEl = document.getElementById('bg-b'), dfEl = document.getElementById('bg-df');
  const cEl = document.getElementById('bg-c'), phiEl = document.getElementById('bg-phi');
  const gmEl = document.getElementById('bg-gamma'), fsEl = document.getElementById('bg-fs');
  const quResEl = document.getElementById('bg-res-qult'), fcResEl = document.getElementById('bg-res-factors');

  function update() {
    const B = parseFloat(bEl.value), D_f = parseFloat(dfEl.value);
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const gamma = parseFloat(gmEl.value), FS = parseFloat(fsEl.value);

    if (isNaN(B) || isNaN(D_f) || isNaN(c) || isNaN(phi_deg) || isNaN(gamma) || isNaN(FS) || B <= 0 || D_f < 0 || phi_deg < 0 || phi_deg >= 45 || gamma <= 0 || FS <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Terzaghi / Meyerhof bearing capacity factors:
    // N_q = exp( pi * tan(phi) ) * tan^2( 45° + phi/2 )
    const N_q = Math.exp(Math.PI * Math.tan(phi_rad)) * Math.pow(Math.tan((Math.PI / 4.0) + (phi_rad / 2.0)), 2);
    // N_c = (N_q - 1) / tan(phi)  (or 5.14 for phi = 0)
    const N_c = phi_deg > 0 ? (N_q - 1.0) / Math.tan(phi_rad) : 5.14;
    // N_gamma approx 2 * (N_q + 1) * tan(phi) (Vesic / Meyerhof)
    const N_gamma = 2.0 * (N_q + 1.0) * Math.tan(phi_rad);

    // Surcharge pressure q = gamma * D_f
    const q_surcharge = gamma * D_f;

    // Terzaghi ultimate bearing capacity for strip footing:
    // q_ult = c * N_c + q * N_q + 0.5 * gamma * B * N_gamma
    const term_c = c * N_c;
    const term_q = q_surcharge * N_q;
    const term_gamma = 0.5 * gamma * B * N_gamma;

    const q_ult = term_c + term_q + term_gamma;
    const q_all = q_ult / FS;

    quResEl.textContent = 'Ultimate q_ult = ' + Math.round(q_ult).toLocaleString() + ' kPa (Allowable q_all = ' + Math.round(q_all).toLocaleString() + ' kPa)';
    fcResEl.textContent = 'Factors: N_c=' + N_c.toFixed(1) + ', N_q=' + N_q.toFixed(1) + ', N_γ=' + N_gamma.toFixed(1) + ' (Cohesion: ' + Math.round(term_c) + ', Surcharge: ' + Math.round(term_q) + ', Wedge: ' + Math.round(term_gamma) + ' kPa)';
  }

  [bEl, dfEl, cEl, phiEl, gmEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();