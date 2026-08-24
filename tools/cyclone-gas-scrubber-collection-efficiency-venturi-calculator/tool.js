(() => {
  'use strict';
  const vtEl = document.getElementById('vs-vt'), lgEl = document.getElementById('vs-lg'), dpEl = document.getElementById('vs-dp');
  const efResEl = document.getElementById('vs-res-eff'), dpResEl = document.getElementById('vs-res-dp');

  function update() {
    const v_t = parseFloat(vtEl.value), L_G = parseFloat(lgEl.value), d_p_um = parseFloat(dpEl.value);
    if (isNaN(v_t) || isNaN(L_G) || isNaN(d_p_um) || v_t <= 0 || L_G <= 0 || d_p_um <= 0) return;

    // Hesketh pressure drop approximation: Delta_P (cm H2O) approx 0.0005 * (v_t)^2 * L_G
    const dp_cm_h2o = 0.00055 * Math.pow(v_t, 2) * L_G * 10.0;
    const dp_in_wg = dp_cm_h2o / 2.54;
    const dp_kPa = dp_in_wg * 0.249089;

    // Calvert cut diameter d_50 (microns): d50 approx 2.0 / ( (v_t * L_G)^0.5 )
    const d50_um = 3.5 / Math.sqrt(v_t * L_G);

    // Collection efficiency for particle size d_p: eta = ( (d_p / d50)^2 ) / ( 1 + (d_p / d50)^2 )
    const ratio_sq = Math.pow(d_p_um / d50_um, 2.5);
    const eta = ratio_sq / (1.0 + ratio_sq);
    const eta_pct = Math.min(99.99, eta * 100.0);

    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(2) + '%';
    dpResEl.textContent = 'Pressure Drop ΔP = ' + dp_kPa.toFixed(2) + ' kPa (' + dp_in_wg.toFixed(1) + ' in. w.g.) | Cut d₅₀ = ' + d50_um.toFixed(2) + ' μm (v_t=' + v_t + ' m/s)';
  }

  [vtEl, lgEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();