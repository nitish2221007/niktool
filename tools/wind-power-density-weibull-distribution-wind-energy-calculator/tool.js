(() => {
  'use strict';
  const vEl = document.getElementById('wp-v'), rhoEl = document.getElementById('wp-rho'), dEl = document.getElementById('wp-dia');
  const wpdResEl = document.getElementById('wp-res-wpd'), pwrResEl = document.getElementById('wp-res-pwr');

  function update() {
    const v = parseFloat(vEl.value), rho = parseFloat(rhoEl.value), dia = parseFloat(dEl.value);
    if (isNaN(v) || isNaN(rho) || isNaN(dia) || v <= 0 || rho <= 0 || dia <= 0) return;

    // Wind Power Density: WPD = 0.5 * rho * v^3  [W / m^2]
    const WPD = 0.5 * rho * Math.pow(v, 3);

    // Swept area A = pi * (dia / 2)^2
    const Area = Math.PI * Math.pow(dia / 2.0, 2);

    // Total kinetic power in wind stream P_total = WPD * Area  [Watts]
    const P_wind_kW = (WPD * Area) / 1000.0;

    // Practical turbine output with Betz limit (59.3%) and generator losses (~40% net efficiency):
    const P_elec_kW = P_wind_kW * 0.40;

    let nrelClass = '';
    let color = '#22543d';

    if (WPD >= 600) { nrelClass = 'CLASS 6/7 SUPERB (WPD ≥ 600 W/m²: Elite Offshore / Ridge Site)'; color = '#22543d'; }
    else if (WPD >= 400) { nrelClass = 'CLASS 4/5 EXCELLENT (WPD 400-600 W/m²: Highly Commercial)'; color = '#22543d'; }
    else if (WPD >= 300) { nrelClass = 'CLASS 3 FAIR (WPD 300-400 W/m²: Economic with Tall Hubs)'; color = '#2563eb'; }
    else if (WPD >= 200) { nrelClass = 'CLASS 2 MARGINAL (WPD 200-300 W/m²)'; color = '#d97706'; }
    else { nrelClass = 'CLASS 1 POOR (WPD < 200 W/m²: Non-viable for utility-scale)'; color = '#c53030'; }

    wpdResEl.textContent = 'WPD = ' + WPD.toFixed(1) + ' W / m² (' + nrelClass.split(' (')[0] + ')';
    wpdResEl.style.color = color;
    pwrResEl.textContent = 'Turbine Output = ' + Math.round(P_elec_kW).toLocaleString() + ' kW (' + (P_elec_kW/1000).toFixed(2) + ' MW @ Swept Area ' + Math.round(Area).toLocaleString() + ' m²)';
  }

  [vEl, rhoEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();