(() => {
  'use strict';
  const vEl = document.getElementById('cv-v'), hEl = document.getElementById('cv-h'), cpEl = document.getElementById('cv-cp');
  const sgResEl = document.getElementById('cv-res-sigma'), stResEl = document.getElementById('cv-res-stat');

  const rho_seawater = 1025.0, P_atm = 101325.0, g = 9.80665, P_vapor = 2338.0; // 20°C seawater

  function update() {
    const v_kts = parseFloat(vEl.value), h_m = parseFloat(hEl.value), Cp_min = parseFloat(cpEl.value);
    if (isNaN(v_kts) || isNaN(h_m) || isNaN(Cp_min) || v_kts <= 0 || h_m < 0) return;

    const v_mps = v_kts * 0.514444;

    // Ambient static pressure at depth h: P0 = P_atm + rho * g * h
    const P0 = P_atm + rho_seawater * g * h_m;

    // Dynamic pressure: q = 0.5 * rho * v^2
    const q_Pa = 0.5 * rho_seawater * Math.pow(v_mps, 2);

    // Cavitation number: sigma = (P0 - P_vapor) / q
    const sigma = (P0 - P_vapor) / q_Pa;
    const sigma_crit = Math.abs(Cp_min);

    let status = '', color = '#22543d';
    if (sigma > sigma_crit + 0.3) {
      status = 'NO CAVITATION (σ > |C_p_min|: Fully wetted subcavitating flow)';
      color = '#22543d';
    } else if (sigma >= sigma_crit) {
      status = 'INCEPTION THRESHOLD (σ ≈ |C_p_min|: Incipient vapor bubble formation)';
      color = '#ea580c';
    } else {
      status = 'SEVERE CAVITATION (σ < |C_p_min|: Vapor cavities, acoustic noise & erosion!)';
      color = '#c53030';
    }

    sgResEl.textContent = 'Cavitation Number σ = ' + sigma.toFixed(3);
    sgResEl.style.color = color;
    stResEl.textContent = status + ' [P₀ = ' + (P0/1000).toFixed(1) + ' kPa, q = ' + (q_Pa/1000).toFixed(1) + ' kPa @ ' + v_kts + ' kts]';
    stResEl.style.color = color;
  }

  [vEl, hEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();