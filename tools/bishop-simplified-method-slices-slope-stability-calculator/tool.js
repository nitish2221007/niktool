(() => {
  'use strict';
  const cEl = document.getElementById('bs-c'), phiEl = document.getElementById('bs-phi');
  const wEl = document.getElementById('bs-w'), alEl = document.getElementById('bs-alpha'), ruEl = document.getElementById('bs-ru');
  const fsResEl = document.getElementById('bs-res-fs'), drResEl = document.getElementById('bs-res-drive');

  function update() {
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const W = parseFloat(wEl.value), alpha_deg = parseFloat(alEl.value), r_u = parseFloat(ruEl.value);

    if (isNaN(c) || isNaN(phi_deg) || isNaN(W) || isNaN(alpha_deg) || isNaN(r_u) || c < 0 || phi_deg < 0 || W <= 0 || alpha_deg <= 0 || r_u < 0) return;

    const phi = (phi_deg * Math.PI) / 180.0;
    const alpha = (alpha_deg * Math.PI) / 180.0;

    // Driving force: T_driving = W * sin(alpha)
    const driving = W * Math.sin(alpha);

    // Iterative solution for Bishop's FS:
    // FS = [ sum( c'*b + (W - u*b)*tan(phi) ) * 1/m_alpha ] / sum( W*sin(alpha) )
    // where m_alpha = cos(alpha) * ( 1 + tan(alpha)*tan(phi)/FS )
    let FS = 1.30;
    for (let iter = 0; iter < 10; iter++) {
      const m_alpha = Math.cos(alpha) * (1.0 + (Math.tan(alpha) * Math.tan(phi)) / FS);
      // Effective normal force: N_prime = ( W * (1 - r_u) ) / m_alpha
      const N_prime = (W * (1.0 - r_u)) / m_alpha;
      const resisting = (c * 15.0) + (N_prime * Math.tan(phi)); // 15m arc length
      FS = resisting / driving;
    }

    const resisting_total = FS * driving;

    let status = '', color = '#22543d';
    if (FS >= 1.5) { status = 'ADEQUATELY SAFE (FS ≥ 1.5)'; color = '#22543d'; }
    else if (FS >= 1.3) { status = 'ACCEPTABLE STABILITY (1.3 ≤ FS < 1.5)'; color = '#22543d'; }
    else if (FS >= 1.0) { status = 'MARGINAL (1.0 ≤ FS < 1.3)'; color = '#ea580c'; }
    else { status = 'UNSTABLE (FS < 1.0: Slope Failure)'; color = '#c53030'; }

    fsResEl.textContent = 'Bishop FS = ' + FS.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    fsResEl.style.color = color;
    drResEl.textContent = 'Driving = ' + driving.toFixed(1) + ' kN | Resisting = ' + resisting_total.toFixed(1) + ' kN (r_u = ' + r_u + ')';
  }

  [cEl, phiEl, wEl, alEl, ruEl].forEach(el => el.addEventListener('input', update));
  update();
})();