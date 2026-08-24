(() => {
  'use strict';
  const phEl = document.getElementById('mz-phi'), pinEl = document.getElementById('mz-pin');
  const poResEl = document.getElementById('mz-res-pout'), mdResEl = document.getElementById('mz-res-mode');

  function update() {
    const delta_phi_deg = parseFloat(phEl.value), P_in_mW = parseFloat(pinEl.value);
    if (isNaN(delta_phi_deg) || isNaN(P_in_mW) || P_in_mW < 0) return;

    const delta_phi_rad = (delta_phi_deg * Math.PI) / 180.0;

    // Ideal balanced MZI transmission: T = cos^2( delta_phi / 2 )
    const transmission = Math.pow(Math.cos(delta_phi_rad / 2.0), 2);
    const P_out_mW = P_in_mW * transmission;
    const trans_pct = transmission * 100.0;

    let state = '';
    if (trans_pct >= 98.0) state = 'CONSTRUCTIVE ON-STATE (T ≈ 100%: Constructive wave interference)';
    else if (trans_pct <= 2.0) state = 'DESTRUCTIVE OFF-STATE (T ≈ 0%: Dark port null)';
    else if (Math.abs(trans_pct - 50.0) < 5.0) state = 'QUADRATURE BIAS (T ≈ 50%: Maximum linear electro-optic modulation)';
    else state = 'PARTIAL TRANSMISSION';

    poResEl.textContent = 'Output P_out = ' + P_out_mW.toFixed(2) + ' mW (' + trans_pct.toFixed(1) + '% Transmission)';
    mdResEl.textContent = state + ' [Δφ = ' + delta_phi_deg + '° @ P_in = ' + P_in_mW + ' mW]';
  }

  phEl.addEventListener('input', update);
  pinEl.addEventListener('input', update);
  update();
})();