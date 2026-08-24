(() => {
  'use strict';
  const wsEl = document.getElementById('to-ws'), twEl = document.getElementById('to-tw');
  const clEl = document.getElementById('to-clmax'), rhEl = document.getElementById('to-rho');
  const sgResEl = document.getElementById('to-res-sg'), vlResEl = document.getElementById('to-res-vlof');

  const g = 9.80665;
  const mu_r = 0.03;

  function update() {
    const WS_kg_m2 = parseFloat(wsEl.value), TW = parseFloat(twEl.value);
    const CL_max = parseFloat(clEl.value), rho = parseFloat(rhEl.value);

    if (isNaN(WS_kg_m2) || isNaN(TW) || isNaN(CL_max) || isNaN(rho) || WS_kg_m2 <= 0 || TW <= mu_r || CL_max <= 0 || rho <= 0) return;

    const WS_N_m2 = WS_kg_m2 * g;
    const V_stall = Math.sqrt((2.0 * WS_N_m2) / (rho * CL_max));
    const V_LOF = 1.10 * V_stall;
    const S_G_m = (1.21 * WS_N_m2) / (g * rho * CL_max * (TW - mu_r));
    const S_G_ft = S_G_m * 3.28084;
    const V_LOF_kts = V_LOF * 1.94384;
    const V_stall_kts = V_stall * 1.94384;

    sgResEl.textContent = 'Ground Roll S_G = ' + Math.round(S_G_m).toLocaleString() + ' Meters (' + Math.round(S_G_ft).toLocaleString() + ' ft)';
    vlResEl.textContent = 'Liftoff Speed V_LOF = ' + V_LOF.toFixed(1) + ' m/s (' + V_LOF_kts.toFixed(1) + ' kts / ' + Math.round(V_LOF*3.6) + ' km/h) | V_stall = ' + V_stall_kts.toFixed(1) + ' kts (T/W=' + TW + ')';
  }

  [wsEl, twEl, clEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();