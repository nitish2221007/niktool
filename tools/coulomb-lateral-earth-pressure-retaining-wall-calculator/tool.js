(() => {
  'use strict';
  const phiEl = document.getElementById('cl-phi'), dlEl = document.getElementById('cl-delta'), btEl = document.getElementById('cl-beta');
  const kaResEl = document.getElementById('cl-res-ka'), dsResEl = document.getElementById('cl-res-desc');

  function update() {
    const phi_deg = parseFloat(phiEl.value), delta_deg = parseFloat(dlEl.value), beta_deg = parseFloat(btEl.value);
    if (isNaN(phi_deg) || isNaN(delta_deg) || isNaN(beta_deg) || phi_deg <= 0 || delta_deg < 0 || beta_deg < 0 || beta_deg >= phi_deg) return;

    const phi = (phi_deg * Math.PI) / 180.0;
    const delta = (delta_deg * Math.PI) / 180.0;
    const beta = (beta_deg * Math.PI) / 180.0;

    // Coulomb Ka formula for vertical wall (theta = 0):
    // Ka = cos^2(phi) / [ cos(delta) * ( 1 + sqrt( sin(phi+delta)*sin(phi-beta) / (cos(delta)*cos(beta)) ) )^2 ]
    const num = Math.pow(Math.cos(phi), 2);
    const inner_term = Math.sqrt( (Math.sin(phi + delta) * Math.sin(phi - beta)) / (Math.cos(delta) * Math.cos(beta)) );
    const den = Math.cos(delta) * Math.pow(1.0 + inner_term, 2);
    const K_a = num / den;

    // Rankine comparison (delta = 0, beta = 0):
    const K_a_rankine = (1.0 - Math.sin(phi)) / (1.0 + Math.sin(phi));
    const diff_pct = ((K_a - K_a_rankine) / K_a_rankine) * 100.0;

    kaResEl.textContent = 'Coulomb K_a = ' + K_a.toFixed(3);
    dsResEl.textContent = 'Wall Friction δ = ' + delta_deg + '° (K_a=' + K_a.toFixed(3) + ' vs Rankine K_a=' + K_a_rankine.toFixed(3) + ' | ' + (diff_pct < 0 ? diff_pct.toFixed(1) + '% lower thrust' : '+' + diff_pct.toFixed(1) + '% thrust due to slope) + ')';
  }

  [phiEl, dlEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();