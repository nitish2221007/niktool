(() => {
  'use strict';
  const bEl = document.getElementById('cy-b'), viEl = document.getElementById('cy-vi');
  const neEl = document.getElementById('cy-ne'), dpEl = document.getElementById('cy-dp');
  const dpcResEl = document.getElementById('cy-res-dpc'), effResEl = document.getElementById('cy-res-eff');

  const mu_gas = 1.8e-5; // Pa * s (Air)
  const rho_p = 2000.0; // kg/m^3 (Dust)
  const rho_g = 1.2; // kg/m^3 (Air)

  function update() {
    const B = parseFloat(bEl.value), v_i = parseFloat(viEl.value);
    const N_e = parseFloat(neEl.value), d_p_um = parseFloat(dpEl.value);

    if (isNaN(B) || isNaN(v_i) || isNaN(N_e) || isNaN(d_p_um) || B <= 0 || v_i <= 0 || N_e <= 0 || d_p_um <= 0) return;

    // Lapple cut diameter: d_pc = sqrt( (9 * mu * B) / (2 * pi * N_e * v_i * (rho_p - rho_g)) )  [m -> um]
    const num = 9.0 * mu_gas * B;
    const den = 2.0 * Math.PI * N_e * v_i * (rho_p - rho_g);
    const d_pc_m = Math.sqrt(num / den);
    const d_pc_um = d_pc_m * 1e6;

    // Lapple fractional collection efficiency: eta = 1 / ( 1 + (d_pc / d_p)^2 )
    const eta = 1.0 / (1.0 + Math.pow(d_pc_um / d_p_um, 2));
    const eta_pct = eta * 100.0;

    dpcResEl.textContent = 'Cut Size d_pc = ' + d_pc_um.toFixed(2) + ' μm';
    effResEl.textContent = 'Collection Efficiency η = ' + eta_pct.toFixed(1) + '% (d_p = ' + d_p_um + ' μm @ v_i = ' + v_i + ' m/s, ' + N_e + ' turns)';
  }

  [bEl, viEl, neEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();