(() => {
  'use strict';
  const vEl = document.getElementById('hr-v'), zEl = document.getElementById('hr-z'), rnEl = document.getElementById('hr-rn');
  const qdResEl = document.getElementById('hr-res-qdot'), evResEl = document.getElementById('hr-res-eval');

  function update() {
    const v_kms = parseFloat(vEl.value), z_km = parseFloat(zEl.value), R_n_m = parseFloat(rnEl.value);
    if (isNaN(v_kms) || isNaN(z_km) || isNaN(R_n_m) || v_kms <= 0 || z_km < 0 || R_n_m <= 0) return;

    // Atmospheric density at altitude z: rho = 1.225 * exp(-z / 8.5)  [kg / m^3]
    const rho = 1.225 * Math.exp(-z_km / 8.5);
    const rho_ratio = rho / 1.225;

    // Detra-Kemp-Riddell empirical correlation for stagnation heat flux:
    // q_dot (W / cm^2) approx (17415 / sqrt(R_n)) * sqrt(rho / rho0) * (v / 7925)^3.15
    const q_dot_W_cm2 = (110.0 / Math.sqrt(R_n_m)) * Math.sqrt(rho_ratio) * Math.pow(v_kms / 7.5, 3.15) * 100.0;
    const q_dot_MW_m2 = q_dot_W_cm2 * 0.01;

    let tps = '', color = '#22543d';
    if (q_dot_W_cm2 >= 500.0) {
      tps = 'SEVERE LUNAR/INTERPLANETARY HEATING (Phenolic Carbon Ablator Mandatory)';
      color = '#c53030';
    } else if (q_dot_W_cm2 >= 100.0) {
      tps = 'TYPICAL LEO ORBITAL RE-ENTRY (PICA-X / Reinforced Carbon-Carbon)';
      color = '#22543d';
    } else {
      tps = 'MODERATE HEATING (Ceramic Silica Tiles / Flexible Thermal Blankets)';
      color = '#22543d';
    }

    qdResEl.textContent = 'Heat Flux q̇ = ' + q_dot_W_cm2.toFixed(1) + ' W / cm² (' + q_dot_MW_m2.toFixed(2) + ' MW/m²)';
    evResEl.textContent = tps + ' [v = ' + v_kms + ' km/s @ z = ' + z_km + ' km, Nose Radius R_n = ' + R_n_m + ' m]';
    evResEl.style.color = color;
  }

  [vEl, zEl, rnEl].forEach(el => el.addEventListener('input', update));
  update();
})();