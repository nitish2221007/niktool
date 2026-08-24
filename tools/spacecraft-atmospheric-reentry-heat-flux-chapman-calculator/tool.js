(() => {
  'use strict';
  const vEl = document.getElementById('re-v'), rnEl = document.getElementById('re-rn'), rEl = document.getElementById('re-rho');
  const qdResEl = document.getElementById('re-res-qdot'), tpsResEl = document.getElementById('re-res-tps');

  const sigma_sb = 5.670374419e-8; // Stefan-Boltzmann

  function update() {
    const v_kms = parseFloat(vEl.value), R_n = parseFloat(rnEl.value), rho = parseFloat(rEl.value);
    if (isNaN(v_kms) || isNaN(R_n) || isNaN(rho) || v_kms <= 0 || R_n <= 0 || rho <= 0) return;

    // Sutton-Graves stagnation convective heat flux formula:
    // q_dot = k * sqrt( rho / R_n ) * v^3  where k approx 1.7415e-4 (for Earth air)
    // q_dot in W / m^2:
    const v_mps = v_kms * 1000.0;
    const q_dot_W_m2 = 1.7415e-4 * Math.sqrt(rho / R_n) * Math.pow(v_mps, 3);
    const q_dot_MW_m2 = q_dot_W_m2 / 1e6;
    const q_dot_W_cm2 = q_dot_W_m2 / 1e4;

    // Radiative equilibrium surface temperature: q_dot = eps * sigma * T^4 (assume emissivity eps = 0.85)
    const T_rad_K = Math.pow(q_dot_W_m2 / (0.85 * sigma_sb), 0.25);
    const T_rad_C = T_rad_K - 273.15;

    let tpsType = '';
    if (T_rad_C <= 1260) tpsType = 'HRSI Silica Ceramic Tiles (Space Shuttle Belly)';
    else if (T_rad_C <= 1650) tpsType = 'Reinforced Carbon-Carbon (RCC Nose Cone)';
    else tpsType = 'Ablative PICA-X / Phenolic Carbon (Mars / Lunar Return)';

    qdResEl.textContent = 'Heat Flux q̇ = ' + q_dot_W_cm2.toFixed(1) + ' W / cm² (' + q_dot_MW_m2.toFixed(2) + ' MW/m²)';
    tpsResEl.textContent = 'Surface Temp T ≈ ' + Math.round(T_rad_C).toLocaleString() + ' °C (' + Math.round(T_rad_K).toLocaleString() + ' K | ' + tpsType + ')';
  }

  [vEl, rnEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();