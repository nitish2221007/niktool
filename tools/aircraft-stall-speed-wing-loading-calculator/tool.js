(() => {
  'use strict';
  const wEl = document.getElementById('st-w'), sEl = document.getElementById('st-s');
  const clEl = document.getElementById('st-clmax'), bkEl = document.getElementById('st-bank');
  const vsResEl = document.getElementById('st-res-vs'), wlResEl = document.getElementById('st-res-wl');

  const rho_sl = 1.225, g = 9.80665;

  function update() {
    const W_kg = parseFloat(wEl.value), S_m2 = parseFloat(sEl.value);
    const CL_max = parseFloat(clEl.value), bank_deg = parseFloat(bkEl.value);

    if (isNaN(W_kg) || isNaN(S_m2) || isNaN(CL_max) || isNaN(bank_deg) || W_kg <= 0 || S_m2 <= 0 || CL_max <= 0 || bank_deg < 0 || bank_deg >= 90) return;

    // Load factor in coordinated level turn: n = 1 / cos(phi)
    const bank_rad = (bank_deg * Math.PI) / 180.0;
    const n_load = 1.0 / Math.cos(bank_rad);

    // Wing loading: W/S in kg/m^2
    const wingLoading = W_kg / S_m2;
    const wingLoading_lbft2 = wingLoading * 0.204816;

    // Weight force W_N = W_kg * g
    const W_N = W_kg * g;

    // Level stall speed: v_s0 = sqrt( (2 * W_N) / (rho * S * CL_max) )  [m / s]
    const v_s0_mps = Math.sqrt((2.0 * W_N) / (rho_sl * S_m2 * CL_max));

    // Accelerated stall speed in turn: v_s = v_s0 * sqrt(n)
    const v_s_mps = v_s0_mps * Math.sqrt(n_load);
    const v_s_kts = v_s_mps * 1.94384;
    const v_s_kmh = v_s_mps * 3.6;

    vsResEl.textContent = 'Stall Speed v_s = ' + v_s_kts.toFixed(1) + ' Knots (' + v_s_kmh.toFixed(1) + ' km/h)';
    wlResEl.textContent = 'Wing Loading W/S = ' + wingLoading.toFixed(1) + ' kg/m² (' + wingLoading_lbft2.toFixed(1) + ' lb/ft²) | Load Factor n = ' + n_load.toFixed(2) + ' g (@ ' + bank_deg + '° Bank)';
  }

  [wEl, sEl, clEl, bkEl].forEach(el => el.addEventListener('input', update));
  update();
})();