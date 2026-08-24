(() => {
  'use strict';
  const hEl = document.getElementById('hy-head'), qEl = document.getElementById('hy-q'), efEl = document.getElementById('hy-eff');
  const mwResEl = document.getElementById('hy-res-mw'), gwResEl = document.getElementById('hy-res-gwh');

  const rho = 1000.0; // kg/m^3
  const g = 9.80665; // m/s^2

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), eta_pct = parseFloat(efEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(eta_pct) || H <= 0 || Q <= 0 || eta_pct <= 0 || eta_pct > 100) return;

    const eta = eta_pct / 100.0;

    // Power P = eta * rho * g * Q * H  [Watts]
    const P_watts = eta * rho * g * Q * H;
    const P_MW = P_watts / 1e6;

    // Annual energy GWh/yr = P_MW * 8760 hours / 1000
    const annual_GWh = (P_MW * 8760.0) / 1000.0;
    const homes = Math.round((annual_GWh * 1e6) / 10500); // 10,500 kWh/yr per home

    mwResEl.textContent = 'Power P = ' + P_MW.toFixed(2) + ' MW (' + Math.round(P_MW * 1000).toLocaleString() + ' kW)';
    gwResEl.textContent = 'Annual Generation = ' + Math.round(annual_GWh).toLocaleString() + ' GWh/year (Powers ~' + homes.toLocaleString() + ' Homes @ ' + eta_pct + '% Eff)';
  }

  [hEl, qEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();